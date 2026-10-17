-- =============================================================================
-- Seed data — departments and the storage bucket for problem photos.
--
-- Edit the department list to match your real org chart, then run this after
-- schema.sql. Roles are granted per person in the app's Admin screen (or here,
-- once you know the real auth user ids).
-- =============================================================================

insert into public.departments (code, name) values
  ('PRD', 'Production'),
  ('QA',  'Quality Assurance'),
  ('MNT', 'Maintenance'),
  ('WHS', 'Warehouse & Logistics'),
  ('SAL', 'Sales & Distribution'),
  ('FIN', 'Finance & Accounting'),
  ('HR',  'Human Resources'),
  ('IT',  'IT & Systems')
on conflict (code) do nothing;

-- Photos of the problem. On a factory floor a photo beats three paragraphs.
insert into storage.buckets (id, name, public)
values ('ticket-photos', 'ticket-photos', false)
on conflict (id) do nothing;

create policy "ticket photos are readable by staff"
  on storage.objects for select to authenticated
  using (bucket_id = 'ticket-photos');

create policy "staff can upload ticket photos"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'ticket-photos');

-- -----------------------------------------------------------------------------
-- After your first real users sign in, grant roles like this
-- (find the uuid in Supabase → Authentication → Users):
--
--   insert into public.role_assignments (user_id, role, department_id)
--   select '<user-uuid>', 'DEPT_LEAD', id from public.departments where code = 'PRD';
--
--   insert into public.role_assignments (user_id, role, department_id)
--   select '<user-uuid>', 'DECISION_MAKER', id from public.departments where code = 'PRD';
--
-- A company-wide Tier 3 decision maker gets a NULL department:
--   insert into public.role_assignments (user_id, role, department_id)
--   values ('<user-uuid>', 'DECISION_MAKER', null);
--
-- Your first admin:
--   insert into public.role_assignments (user_id, role, department_id)
--   values ('<user-uuid>', 'ADMIN', null);
-- -----------------------------------------------------------------------------
