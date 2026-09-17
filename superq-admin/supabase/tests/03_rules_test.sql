-- =============================================================================
-- Behavioural test of every guarantee the business asked for.
-- Each assertion is a claim made in the README; if one fails, the README lies.
-- =============================================================================

create table _t (id serial primary key, name text, passed boolean, detail text);

create or replace function t_ok(_name text, _cond boolean, _detail text default '')
returns void language plpgsql security definer as $$
begin
  insert into _t(name, passed, detail) values (_name, _cond, _detail);
end $$;

-- ---- People -----------------------------------------------------------------
insert into auth.users (id) values
  ('11111111-1111-1111-1111-111111111111'),  -- Rey, line operator (reporter)
  ('22222222-2222-2222-2222-222222222222'),  -- Lina, production lead
  ('33333333-3333-3333-3333-333333333333'),  -- Dina, decision maker
  ('44444444-4444-4444-4444-444444444444');  -- Bong, unrelated colleague

insert into public.profiles (id, full_name, department_id)
select u.id, v.name, (select id from public.departments where code = 'PRD')
from auth.users u
join (values
  ('11111111-1111-1111-1111-111111111111'::uuid, 'Rey'),
  ('22222222-2222-2222-2222-222222222222'::uuid, 'Lina'),
  ('33333333-3333-3333-3333-333333333333'::uuid, 'Dina'),
  ('44444444-4444-4444-4444-444444444444'::uuid, 'Bong')
) as v(id, name) on v.id = u.id;

insert into public.role_assignments (user_id, role, department_id)
select '22222222-2222-2222-2222-222222222222', 'DEPT_LEAD', id
  from public.departments where code = 'PRD';
insert into public.role_assignments (user_id, role, department_id)
select '33333333-3333-3333-3333-333333333333', 'DECISION_MAKER', id
  from public.departments where code = 'PRD';

-- =============================================================================
-- Rey posts a problem
-- =============================================================================
set role authenticated;
select set_config('request.jwt.claim.sub', '11111111-1111-1111-1111-111111111111', false);

do $$
declare ref text;
begin
  insert into public.tickets (title, body, current_condition, department_id, reporter_id, reference)
  values ('Sealer on Line 2 keeps skipping',
          'Packs come out unsealed about twice an hour.',
          'We stop the line ~10 minutes every shift to re-run them.',
          (select id from public.departments where code = 'PRD'),
          '11111111-1111-1111-1111-111111111111', 'pending')
  returning reference into ref;

  perform t_ok('T01  reporter can post, reference auto-assigned', ref = 'PRD-1', ref);
end $$;

-- =============================================================================
-- Bong (no role on this ticket) tries to close it
-- =============================================================================
select set_config('request.jwt.claim.sub', '44444444-4444-4444-4444-444444444444', false);

do $$
declare n int;
begin
  update public.tickets set status = 'CLOSED' where reference = 'PRD-1';
  get diagnostics n = row_count;
  perform t_ok('T02  unrelated colleague cannot close', n = 0, format('%s rows updated', n));
end $$;

do $$
declare n int;
begin
  select count(*) into n from public.tickets;
  perform t_ok('T03  everyone can SEE the board (transparency)', n = 1, format('%s visible', n));
end $$;

-- =============================================================================
-- Lina triages
-- =============================================================================
select set_config('request.jwt.claim.sub', '22222222-2222-2222-2222-222222222222', false);

do $$
declare ok boolean := false; msg text := 'no error raised';
begin
  begin
    update public.tickets set status = 'TRIAGED' where reference = 'PRD-1';
  exception when others then ok := (sqlstate = '23514'); msg := sqlerrm;
  end;
  perform t_ok('T04  triage without a named decision maker is refused', ok, msg);
end $$;

do $$
declare s public.ticket_status;
begin
  update public.tickets
     set status = 'TRIAGED',
         decision_maker_id = '33333333-3333-3333-3333-333333333333',
         owner_id = '11111111-1111-1111-1111-111111111111',
         severity = 'HIGH',
         tier = 'TIER_2'
   where reference = 'PRD-1';
  select status into s from public.tickets where reference = 'PRD-1';
  perform t_ok('T05  lead can triage with driver + decider + severity + tier', s = 'TRIAGED', s::text);
end $$;

-- =============================================================================
-- Rey proposes a solution
-- =============================================================================
select set_config('request.jwt.claim.sub', '11111111-1111-1111-1111-111111111111', false);

do $$
declare v int; s public.ticket_status;
begin
  insert into public.proposals (ticket_id, author_id, summary, actions, status, submitted_at)
  values ((select id from public.tickets where reference = 'PRD-1'),
          '11111111-1111-1111-1111-111111111111',
          'Replace the sealer belt',
          'Order a new belt and swap it during Saturday downtime.',
          'SUBMITTED', now())
  returning version into v;

  select status into s from public.tickets where reference = 'PRD-1';
  perform t_ok('T06  anyone can propose; version auto-numbers to 1', v = 1, format('v%s', v));
  perform t_ok('T07  a submitted proposal moves the ticket to PROPOSING', s = 'PROPOSING', s::text);
end $$;

-- =============================================================================
-- Bong tries to give the go signal
-- =============================================================================
select set_config('request.jwt.claim.sub', '44444444-4444-4444-4444-444444444444', false);

do $$
declare n int;
begin
  update public.proposals set status = 'APPROVED' where version = 1;
  get diagnostics n = row_count;
  perform t_ok('T08  a colleague cannot give the go signal', n = 0, format('%s rows updated', n));
end $$;

-- =============================================================================
-- Dina rules on it
-- =============================================================================
select set_config('request.jwt.claim.sub', '33333333-3333-3333-3333-333333333333', false);

do $$
declare ok boolean := false; msg text := 'no error raised';
begin
  begin
    update public.proposals set status = 'CHANGES_REQUESTED' where version = 1;
  exception when others then ok := (sqlstate = '23514'); msg := sqlerrm;
  end;
  perform t_ok('T09  rejecting without a written reason is refused', ok, msg);
end $$;

do $$
declare st public.proposal_status;
begin
  update public.proposals
     set status = 'CHANGES_REQUESTED',
         decision_reason = 'Belt is not the root cause — the same belt failed in March. Check the timing cam.'
   where version = 1;
  select status into st from public.proposals where version = 1;
  perform t_ok('T10  rejecting WITH a reason is accepted', st = 'CHANGES_REQUESTED', st::text);
end $$;

-- =============================================================================
-- Rey proposes again — the loop the business asked for
-- =============================================================================
select set_config('request.jwt.claim.sub', '11111111-1111-1111-1111-111111111111', false);

do $$
declare v int;
begin
  insert into public.proposals (ticket_id, author_id, summary, root_cause, actions, status, submitted_at)
  values ((select id from public.tickets where reference = 'PRD-1'),
          '11111111-1111-1111-1111-111111111111',
          'Re-time the sealing cam and replace the belt',
          'Cam drifts as the machine heats up.',
          'Re-time cam at operating temperature, then fit a new belt.',
          'SUBMITTED', now())
  returning version into v;
  perform t_ok('T11  author can keep proposing; version auto-increments', v = 2, format('v%s', v));
end $$;

-- =============================================================================
-- Dina gives the go signal
-- =============================================================================
select set_config('request.jwt.claim.sub', '33333333-3333-3333-3333-333333333333', false);

do $$
declare ts public.ticket_status; v1 public.proposal_status; approved uuid;
begin
  update public.proposals set status = 'APPROVED' where version = 2;

  select status, approved_proposal_id into ts, approved
    from public.tickets where reference = 'PRD-1';
  select status into v1 from public.proposals where version = 1;

  perform t_ok('T12  the go signal moves the ticket to APPROVED', ts = 'APPROVED', ts::text);
  perform t_ok('T13  the winning proposal is recorded on the ticket', approved is not null, approved::text);
  perform t_ok('T14  losing versions are kept as SUPERSEDED, not deleted', v1 = 'SUPERSEDED', v1::text);
end $$;

do $$
declare ok boolean := false; msg text := 'no error raised';
begin
  begin
    update public.tickets set status = 'CLOSED' where reference = 'PRD-1';
  exception when others then ok := (sqlstate = '42501'); msg := sqlerrm;
  end;
  perform t_ok('T15  cannot close before verification (the CAPA step)', ok, msg);
end $$;

-- =============================================================================
-- Rey implements, then sends it for verification
-- =============================================================================
select set_config('request.jwt.claim.sub', '11111111-1111-1111-1111-111111111111', false);

do $$
declare s public.ticket_status;
begin
  update public.tickets set status = 'IN_PROGRESS' where reference = 'PRD-1';
  update public.tickets set status = 'VERIFYING'   where reference = 'PRD-1';
  select status into s from public.tickets where reference = 'PRD-1';
  perform t_ok('T16  the driver can implement and send for verification', s = 'VERIFYING', s::text);
end $$;

-- =============================================================================
-- Lina (the LEAD, not the decision maker) tries to close it
-- =============================================================================
select set_config('request.jwt.claim.sub', '22222222-2222-2222-2222-222222222222', false);

do $$
declare ok boolean := false; msg text := 'no error raised';
begin
  begin
    update public.tickets set status = 'CLOSED' where reference = 'PRD-1';
  exception when others then ok := (sqlstate = '42501'); msg := sqlerrm;
  end;
  perform t_ok('T17  a department lead CANNOT close — only the decision maker', ok, msg);
end $$;

-- =============================================================================
-- Dina closes it
-- =============================================================================
select set_config('request.jwt.claim.sub', '33333333-3333-3333-3333-333333333333', false);

do $$
declare s public.ticket_status; closer uuid; closed_ts timestamptz;
begin
  update public.tickets set status = 'CLOSED' where reference = 'PRD-1';
  select status, closed_by, closed_at into s, closer, closed_ts
    from public.tickets where reference = 'PRD-1';
  perform t_ok('T18  the decision maker can close', s = 'CLOSED', s::text);
  perform t_ok('T19  closure is attributed and timestamped',
               closer = '33333333-3333-3333-3333-333333333333' and closed_ts is not null,
               closer::text);
end $$;

do $$
declare n int;
begin
  select count(*) into n from public.ticket_events
   where ticket_id = (select id from public.tickets where reference = 'PRD-1');
  perform t_ok('T20  every status change is in the audit trail', n >= 6, format('%s events', n));
end $$;

do $$
declare rounds int;
begin
  select proposal_rounds into rounds from public.ticket_metrics
   where reference = 'PRD-1';
  perform t_ok('T21  metrics view reports proposal rounds', rounds = 2, format('%s rounds', rounds));
end $$;

-- =============================================================================
-- The "three staff standing with nothing to do" scenario.
--
-- This is the problem the board exists for: nobody owns it, saying it out loud
-- sounds like an accusation, and it has been true for a month. It must beat a
-- fresh, identical report — otherwise the board buries exactly what it was
-- built to surface.
-- =============================================================================
reset role;

-- An old, ignored report of idle staff.
insert into public.tickets
  (title, body, waste, people_affected, hours_lost_each, happens,
   raised_before, department_id, reporter_id, reference)
values
  ('Three staff idle at the start of every shift',
   'Packing crew waits for the first batch with nothing to do.',
   'WAITING', 3, 2, 'EVERY_SHIFT',
   'I told my supervisor three times. Nothing happened.',
   (select id from public.departments where code = 'PRD'),
   '11111111-1111-1111-1111-111111111111', 'pending');

-- The same problem, reported fresh today, with nobody having raised it before.
insert into public.tickets
  (title, body, waste, people_affected, hours_lost_each, happens,
   department_id, reporter_id, reference)
values
  ('Packing crew idle at shift start',
   'Same situation, reported today.',
   'WAITING', 3, 2, 'EVERY_SHIFT',
   (select id from public.departments where code = 'PRD'),
   '11111111-1111-1111-1111-111111111111', 'pending');

-- Age the first one by 30 days, events included.
update public.tickets set created_at = now() - interval '30 days' where reference = 'PRD-2';
update public.ticket_events set created_at = now() - interval '30 days'
 where ticket_id = (select id from public.tickets where reference = 'PRD-2');

do $$
declare hrs numeric; quiet int;
begin
  select hours_lost_per_week, days_quiet into hrs, quiet
    from public.ticket_priority where reference = 'PRD-2';
  -- 3 people x 2 hours x 10 shifts a week
  perform t_ok('T22  waste is costed: 3 people x 2h x every shift = 60h/week',
               hrs = 60, format('%s h/week', hrs));
  perform t_ok('T23  days_quiet counts how long it has been ignored',
               quiet >= 29, format('%s days quiet', quiet));
end $$;

do $$
declare old_score numeric; new_score numeric;
begin
  select priority_score into old_score from public.ticket_priority where reference = 'PRD-2';
  select priority_score into new_score from public.ticket_priority where reference = 'PRD-3';
  perform t_ok('T24  a forgotten problem OUTRANKS an identical fresh one',
               old_score > new_score, format('%s vs %s', old_score, new_score));
end $$;

-- ---- "I see this too" -------------------------------------------------------
set role authenticated;

select set_config('request.jwt.claim.sub', '44444444-4444-4444-4444-444444444444', false);
do $$
declare n int;
begin
  insert into public.confirmations (ticket_id, user_id)
  values ((select id from public.tickets where reference = 'PRD-3'),
          '44444444-4444-4444-4444-444444444444');
  select confirmations into n from public.ticket_priority where reference = 'PRD-3';
  perform t_ok('T25  anyone can say "I see this too"', n = 1, format('%s confirmations', n));
end $$;

do $$
declare ok boolean := false; msg text := 'no error raised';
begin
  begin
    insert into public.confirmations (ticket_id, user_id)
    values ((select id from public.tickets where reference = 'PRD-3'),
            '44444444-4444-4444-4444-444444444444');
  exception when others then ok := (sqlstate = '23505'); msg := sqlerrm;
  end;
  perform t_ok('T26  the same person cannot confirm twice (no ballot stuffing)', ok, msg);
end $$;

select set_config('request.jwt.claim.sub', '22222222-2222-2222-2222-222222222222', false);
do $$
declare n int;
begin
  delete from public.confirmations
   where user_id = '44444444-4444-4444-4444-444444444444';
  get diagnostics n = row_count;
  perform t_ok('T27  nobody can withdraw someone else''s confirmation',
               n = 0, format('%s rows deleted', n));
end $$;

do $$
declare before_score numeric; after_score numeric;
begin
  select priority_score into before_score from public.ticket_priority where reference = 'PRD-3';
  insert into public.confirmations (ticket_id, user_id)
  values ((select id from public.tickets where reference = 'PRD-3'),
          '22222222-2222-2222-2222-222222222222');
  select priority_score into after_score from public.ticket_priority where reference = 'PRD-3';
  perform t_ok('T28  each confirmation raises priority',
               after_score > before_score, format('%s -> %s', before_score, after_score));
end $$;

-- =============================================================================
-- Results
-- =============================================================================
reset role;

select
  case when passed then '  PASS' else '* FAIL' end as result,
  name,
  left(coalesce(detail, ''), 62) as detail
from _t order by id;

select count(*) filter (where passed) as passed,
       count(*) filter (where not passed) as failed,
       count(*) as total
from _t;
