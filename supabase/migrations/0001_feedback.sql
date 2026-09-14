-- Stock-out and product feedback.
--
-- SECURITY MODEL - read this before changing any policy below.
--
-- The Supabase anon key ships inside the browser bundle. It is public by
-- design: anyone can read it out of our JavaScript and call the REST API with
-- it directly. So "only our admin page queries this table" is not a security
-- boundary, and neither is putting the admin page on a hard-to-guess URL.
--
-- That means: if anon were granted SELECT on this table, every customer name,
-- email, message and photo would be readable by anyone on the internet.
--
-- Therefore:
--   * anon may INSERT and nothing else. A visitor can file a report and can
--     never read one back, not even their own.
--   * SELECT and UPDATE require an authenticated user who is listed in
--     public.admin_users. Plain `authenticated` is deliberately NOT enough,
--     because if signups are ever left open, anyone could register and read
--     the table.
--   * Photos live in a PRIVATE storage bucket. The admin UI mints short-lived
--     signed URLs to display them. A public bucket would make every uploaded
--     photo world-readable.
--
-- Also turn OFF public signups in the Supabase dashboard
-- (Authentication -> Sign In / Providers -> disable "Allow new users to sign
-- up"), and create admin accounts by invitation only.

-- ---------------------------------------------------------------------------
-- Admin allowlist
-- ---------------------------------------------------------------------------
create table if not exists public.admin_users (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  email      text,
  created_at timestamptz not null default now()
);

alter table public.admin_users enable row level security;

-- An admin may confirm their own membership; nobody can list the others.
drop policy if exists "admins read own row" on public.admin_users;
create policy "admins read own row"
  on public.admin_users for select
  to authenticated
  using (user_id = auth.uid());

-- Helper used by the feedback policies. SECURITY DEFINER so the check itself
-- is not subject to the RLS policy above.
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (select 1 from public.admin_users where user_id = auth.uid());
$$;

-- ---------------------------------------------------------------------------
-- Feedback
-- ---------------------------------------------------------------------------
create table if not exists public.feedback (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),

  -- What kind of report this is. Constrained so the admin filters stay honest.
  kind        text not null default 'other'
              check (kind in ('stock_out', 'product_quality', 'packaging',
                              'where_to_buy', 'distributor', 'other')),

  message     text not null check (char_length(message) between 5 and 2000),

  -- All optional: a shopper reporting an empty shelf should not be forced to
  -- identify themselves.
  name        text check (name is null or char_length(name) <= 120),
  email       text check (email is null or char_length(email) <= 200),
  product     text check (product is null or char_length(product) <= 160),
  store       text check (store is null or char_length(store) <= 200),
  location    text check (location is null or char_length(location) <= 200),

  -- Object path inside the private bucket, not a URL.
  photo_path  text check (photo_path is null or char_length(photo_path) <= 400),

  -- Admin-side triage.
  status      text not null default 'new'
              check (status in ('new', 'in_review', 'resolved', 'spam')),
  admin_notes text check (admin_notes is null or char_length(admin_notes) <= 4000)
);

create index if not exists feedback_created_at_idx on public.feedback (created_at desc);
create index if not exists feedback_status_idx     on public.feedback (status);
create index if not exists feedback_kind_idx       on public.feedback (kind);

alter table public.feedback enable row level security;

-- Anyone may file a report...
drop policy if exists "anyone can submit feedback" on public.feedback;
create policy "anyone can submit feedback"
  on public.feedback for insert
  to anon, authenticated
  with check (
    -- Submitters never get to set triage fields.
    status = 'new' and admin_notes is null
  );

-- ...but only admins may read or triage.
drop policy if exists "admins read feedback" on public.feedback;
create policy "admins read feedback"
  on public.feedback for select
  to authenticated
  using (public.is_admin());

drop policy if exists "admins update feedback" on public.feedback;
create policy "admins update feedback"
  on public.feedback for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "admins delete feedback" on public.feedback;
create policy "admins delete feedback"
  on public.feedback for delete
  to authenticated
  using (public.is_admin());

-- ---------------------------------------------------------------------------
-- Photo storage - PRIVATE bucket, signed URLs only
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'feedback-photos',
  'feedback-photos',
  false,
  5242880, -- 5 MB, matched by the client-side check in FeedbackForm.jsx
  array['image/jpeg', 'image/png', 'image/webp', 'image/heic']
)
on conflict (id) do update
  set public             = false,
      file_size_limit    = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "anyone can upload a feedback photo" on storage.objects;
create policy "anyone can upload a feedback photo"
  on storage.objects for insert
  to anon, authenticated
  with check (bucket_id = 'feedback-photos');

-- No anon SELECT policy: uploads are write-only for the public. The admin UI
-- reads them through createSignedUrl().
drop policy if exists "admins read feedback photos" on storage.objects;
create policy "admins read feedback photos"
  on storage.objects for select
  to authenticated
  using (bucket_id = 'feedback-photos' and public.is_admin());

drop policy if exists "admins delete feedback photos" on storage.objects;
create policy "admins delete feedback photos"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'feedback-photos' and public.is_admin());

-- ---------------------------------------------------------------------------
-- Granting yourself admin
-- ---------------------------------------------------------------------------
-- 1. Create the user in Authentication -> Users -> Add user (invite by email).
-- 2. Run, with that user's email:
--
--      insert into public.admin_users (user_id, email)
--      select id, email from auth.users where email = 'you@example.com'
--      on conflict (user_id) do nothing;
--
-- Repeat per admin. Removing a row revokes access immediately.
