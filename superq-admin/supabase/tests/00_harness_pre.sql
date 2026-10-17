-- Stand-ins for the Supabase-managed pieces schema.sql depends on.
create extension if not exists "pgcrypto";

-- Roles are cluster-wide, so they survive a database drop.
do $$
begin
  if not exists (select 1 from pg_roles where rolname = 'anon') then create role anon; end if;
  if not exists (select 1 from pg_roles where rolname = 'authenticated') then create role authenticated; end if;
end $$;

create schema auth;
create table auth.users (
  id uuid primary key default gen_random_uuid(),
  phone text
);

-- In Supabase this reads the JWT. Here it reads a session setting so the test
-- can switch which person is acting.
create or replace function auth.uid() returns uuid
language sql stable as $$
  select nullif(current_setting('request.jwt.claim.sub', true), '')::uuid;
$$;

create schema storage;
create table storage.buckets (
  id text primary key,
  name text,
  public boolean default false
);
create table storage.objects (
  id uuid primary key default gen_random_uuid(),
  bucket_id text references storage.buckets(id)
);
alter table storage.objects enable row level security;

grant usage on schema public, auth, storage to anon, authenticated;
