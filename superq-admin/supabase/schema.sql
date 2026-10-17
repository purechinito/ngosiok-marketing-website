-- =============================================================================
-- Super Q Admin — Internal Problem-Solving Platform
-- Schema + Row Level Security
--
-- Design principles baked into this file:
--   1. "Only decision makers can close" is enforced by the DATABASE, not the UI.
--      A UI-only check is theatre — anyone with a browser console bypasses it.
--   2. Proposals are first-class, versioned objects (not comments), so the
--      history of what was tried and why it was rejected survives forever.
--   3. Every rejection requires a written reason. Silent rejection is the
--      documented killer of these systems.
--   4. Fields are structured, not free-text blobs, so the corpus stays
--      analysable as it compounds.
--
-- Run order: this file, then seed.sql.
-- =============================================================================

create extension if not exists "pgcrypto";

-- -----------------------------------------------------------------------------
-- Enums
-- -----------------------------------------------------------------------------

create type public.app_role as enum (
  'REPORTER',        -- everyone; posts problems, comments, proposes solutions
  'DEPT_LEAD',       -- triages their department's inbox. CANNOT close.
  'DECISION_MAKER',  -- approves proposals and closes tickets
  'ADMIN'            -- manages users and departments
);

create type public.ticket_status as enum (
  'NEW',          -- submitted, sitting in the department triage inbox
  'TRIAGED',      -- accepted: has decision maker, owner, severity, tier
  'RETURNED',     -- needs more info — returned WITH COACHING, never silently
  'DECLINED',     -- not proceeding; written reason required
  'PROPOSING',    -- at least one proposal in flight
  'APPROVED',     -- decision maker gave the go signal on a specific proposal
  'IN_PROGRESS',  -- approved solution is being implemented
  'VERIFYING',    -- implemented; checking it ACTUALLY worked (CAPA step)
  'CLOSED',       -- decision maker only
  'REOPENED'      -- verification failed; back into the loop
);

create type public.proposal_status as enum (
  'DRAFT',
  'SUBMITTED',
  'CHANGES_REQUESTED',  -- reason required; author resubmits as a new version
  'APPROVED',           -- the "go signal"
  'REJECTED',           -- reason required
  'SUPERSEDED'          -- a later version replaced this one
);

-- Decision tiers exist to stop one executive becoming the bottleneck.
-- If the Tier 3 queue exceeds ~10 items, the tiers are set wrong, not the people.
create type public.decision_tier as enum (
  'TIER_1',  -- cheap, reversible, no food-safety impact -> Dept Lead decides
  'TIER_2',  -- costly or cross-department        -> Department Head decides
  'TIER_3'   -- one-way door: capex, food safety, customer-facing, legal -> Exec
);

create type public.severity_level as enum ('LOW','MEDIUM','HIGH','CRITICAL');

-- Deliberately has no "PEOPLE" option. People/HR issues route elsewhere —
-- mixing them in is what destroys psychological safety on a process board.
create type public.problem_kind as enum (
  'PROCESS','EQUIPMENT','QUALITY','SAFETY','SUPPLY','OTHER'
);

-- The seven wastes — and the most important field in this schema.
--
-- "Three staff standing with nothing to do" is WAITING. Naming the waste lets
-- someone report the situation without accusing a colleague or a supervisor:
-- you file a waste type, not a complaint about a person. That is what makes the
-- socially awkward, chronically ignored problems reportable at all.
create type public.waste_kind as enum (
  'WAITING',         -- people or machines idle
  'MOTION',          -- unnecessary walking, reaching, searching
  'TRANSPORT',       -- moving material further than it needs to go
  'DEFECTS',         -- rework, rejects, re-runs
  'INVENTORY',       -- stock sitting, expiring, or in the way
  'OVERPRODUCTION',  -- making more, or sooner, than needed
  'OVERPROCESSING',  -- steps that add nothing
  'OTHER'
);

-- How often it happens. Turns a one-off observation into a weekly cost, which
-- is what lets a quiet chronic problem outrank a loud one-off.
create type public.occurrence as enum (
  'ONCE','MONTHLY','WEEKLY','DAILY','EVERY_SHIFT'
);

-- -----------------------------------------------------------------------------
-- Core tables
-- -----------------------------------------------------------------------------

create table public.departments (
  id              uuid primary key default gen_random_uuid(),
  code            text unique not null,        -- short prefix, e.g. 'PRD'
  name            text not null,
  ticket_counter  integer not null default 0,  -- drives PRD-1, PRD-2, ...
  is_active       boolean not null default true,
  created_at      timestamptz not null default now()
);

create table public.profiles (
  id            uuid primary key references auth.users(id) on delete cascade,
  employee_id   text unique,   -- badge number; factory staff have no company email
  full_name     text not null,
  phone         text,
  department_id uuid references public.departments(id),
  is_active     boolean not null default true,
  created_at    timestamptz not null default now()
);

-- A role is always scoped. department_id NULL means company-wide
-- (an ADMIN, or a Tier 3 DECISION_MAKER who can act across departments).
create table public.role_assignments (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references public.profiles(id) on delete cascade,
  role          public.app_role not null,
  department_id uuid references public.departments(id) on delete cascade,
  created_at    timestamptz not null default now(),
  unique (user_id, role, department_id)
);

create table public.tickets (
  id                  uuid primary key default gen_random_uuid(),
  reference           text unique not null,   -- PRD-104

  -- The Toyota submission gate: a valid report states the problem AND the
  -- current condition. Reports missing this get RETURNED with coaching.
  title               text not null,
  body                text not null,          -- what is wrong
  current_condition   text,                   -- what happens today
  suggested_fix       text,                   -- optional; seeds the first proposal

  kind                public.problem_kind not null default 'PROCESS',

  -- What kind of waste this is, so it can be reported without naming anyone.
  waste              public.waste_kind,

  -- "Have you tried to raise this before? What happened?"
  -- The weak-communication signal. An answer like "told my supervisor three
  -- times" is exactly the buried problem this board exists to surface, so it
  -- feeds the priority score directly.
  raised_before       text,

  -- Rough size of the waste. Three people idle for two hours every shift is
  -- 30 hours a week — a number a decision maker can act on, where "the line
  -- keeps stopping" is not.
  people_affected     integer,
  hours_lost_each     numeric(6,2),
  happens             public.occurrence,

  department_id       uuid not null references public.departments(id),
  reporter_id         uuid not null references public.profiles(id),

  status              public.ticket_status not null default 'NEW',
  severity            public.severity_level,
  tier                public.decision_tier,

  -- DACI: the Driver and the Approver, both named at triage rather than at the end.
  owner_id            uuid references public.profiles(id),
  decision_maker_id   uuid references public.profiles(id),

  approved_proposal_id uuid,   -- FK added after proposals table exists

  -- Timestamps that make the SLA clocks and the metrics possible.
  triaged_at          timestamptz,
  first_response_at   timestamptz,
  decided_at          timestamptz,
  closed_at           timestamptz,
  closed_by           uuid references public.profiles(id),
  close_note          text,
  decline_reason      text,

  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

create table public.proposals (
  id              uuid primary key default gen_random_uuid(),
  ticket_id       uuid not null references public.tickets(id) on delete cascade,
  version         integer not null,
  author_id       uuid not null references public.profiles(id),

  summary         text not null,
  root_cause      text,
  actions         text not null,
  cost_estimate   numeric(12,2),
  effort_days     numeric(5,1),

  status          public.proposal_status not null default 'DRAFT',
  decided_by      uuid references public.profiles(id),
  decision_reason text,          -- mandatory on CHANGES_REQUESTED and REJECTED

  submitted_at    timestamptz,
  decided_at      timestamptz,
  created_at      timestamptz not null default now(),

  unique (ticket_id, version)
);

alter table public.tickets
  add constraint tickets_approved_proposal_fk
  foreign key (approved_proposal_id) references public.proposals(id) on delete set null;

create table public.comments (
  id         uuid primary key default gen_random_uuid(),
  ticket_id  uuid not null references public.tickets(id) on delete cascade,
  author_id  uuid not null references public.profiles(id),
  body       text not null,
  created_at timestamptz not null default now()
);

-- "I see this too."
--
-- Deliberately one-directional. A confirmation measures how many people
-- experience a problem, which is precisely what a chronic buried problem has
-- and a one-off complaint does not.
--
-- There is no downvote, on purpose: an anonymous, unaccountable rejection of a
-- colleague's report is socially corrosive on a floor where everyone knows
-- everyone, and "my report disappeared and nobody said why" is the best
-- documented way to kill participation. The accountable version already exists
-- — triage DECLINE, which requires a name and a written reason.
create table public.confirmations (
  id         uuid primary key default gen_random_uuid(),
  ticket_id  uuid not null references public.tickets(id) on delete cascade,
  user_id    uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (ticket_id, user_id)
);

create table public.attachments (
  id          uuid primary key default gen_random_uuid(),
  ticket_id   uuid not null references public.tickets(id) on delete cascade,
  uploader_id uuid not null references public.profiles(id),
  storage_path text not null,   -- object path in the 'ticket-photos' bucket
  mime_type   text,
  created_at  timestamptz not null default now()
);

-- Append-only audit trail. Nothing here is ever updated or deleted.
create table public.ticket_events (
  id          uuid primary key default gen_random_uuid(),
  ticket_id   uuid not null references public.tickets(id) on delete cascade,
  actor_id    uuid references public.profiles(id),
  event_type  text not null,
  from_status public.ticket_status,
  to_status   public.ticket_status,
  detail      text,
  created_at  timestamptz not null default now()
);

create index tickets_department_status_idx on public.tickets (department_id, status);
create index tickets_decision_maker_idx    on public.tickets (decision_maker_id, status);
create index tickets_reporter_idx          on public.tickets (reporter_id);
create index proposals_ticket_idx          on public.proposals (ticket_id, version desc);
create index ticket_events_ticket_idx      on public.ticket_events (ticket_id, created_at desc);
create index confirmations_ticket_idx      on public.confirmations (ticket_id);
create index role_assignments_user_idx     on public.role_assignments (user_id);

-- -----------------------------------------------------------------------------
-- Helper functions
--
-- SECURITY DEFINER so RLS policies can call them without recursing back into
-- the policies on role_assignments.
-- -----------------------------------------------------------------------------

create or replace function public.has_role(
  _role public.app_role,
  _department uuid default null
) returns boolean
language sql stable security definer set search_path = public as $$
  select exists (
    select 1
    from public.role_assignments ra
    where ra.user_id = auth.uid()
      and ra.role = _role
      and (ra.department_id is null or ra.department_id = _department)
  );
$$;

create or replace function public.is_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.role_assignments ra
    where ra.user_id = auth.uid() and ra.role = 'ADMIN'
  );
$$;

-- Can the caller make the call on this ticket? Either they are the named
-- decision maker (the DACI Approver), or they hold DECISION_MAKER for the
-- department, or they are an admin.
create or replace function public.can_decide(_ticket_id uuid) returns boolean
language plpgsql stable security definer set search_path = public as $$
declare t public.tickets%rowtype;
begin
  select * into t from public.tickets where id = _ticket_id;
  if not found then return false; end if;
  return auth.uid() = t.decision_maker_id
      or public.has_role('DECISION_MAKER', t.department_id)
      or public.is_admin();
end;
$$;

create or replace function public.can_triage(_ticket_id uuid) returns boolean
language plpgsql stable security definer set search_path = public as $$
declare t public.tickets%rowtype;
begin
  select * into t from public.tickets where id = _ticket_id;
  if not found then return false; end if;
  return public.has_role('DEPT_LEAD', t.department_id)
      or public.has_role('DECISION_MAKER', t.department_id)
      or public.is_admin();
end;
$$;

-- -----------------------------------------------------------------------------
-- Reference numbers: PRD-1, PRD-2, ...
-- -----------------------------------------------------------------------------

create or replace function public.assign_ticket_reference() returns trigger
language plpgsql security definer set search_path = public as $$
declare d public.departments%rowtype;
begin
  update public.departments
     set ticket_counter = ticket_counter + 1
   where id = new.department_id
  returning * into d;

  if not found then
    raise exception 'Unknown department %', new.department_id;
  end if;

  new.reference := d.code || '-' || d.ticket_counter;
  return new;
end;
$$;

create trigger tickets_assign_reference
  before insert on public.tickets
  for each row execute function public.assign_ticket_reference();

-- -----------------------------------------------------------------------------
-- THE RULE ENGINE
--
-- This is the heart of the system. Every guarantee the business asked for is
-- enforced here, below the API, where no client can route around it.
-- -----------------------------------------------------------------------------

create or replace function public.enforce_ticket_rules() returns trigger
language plpgsql security definer set search_path = public as $$
declare
  actor uuid := auth.uid();
begin
  new.updated_at := now();

  -- ---- Closing: decision maker only, and only after verification ----------
  if new.status = 'CLOSED' and old.status is distinct from 'CLOSED' then
    if not public.can_decide(old.id) then
      raise exception 'Only the decision maker for % can close it', old.reference
        using errcode = '42501';
    end if;
    if old.status not in ('VERIFYING','DECLINED') then
      raise exception
        'Ticket % must reach VERIFYING (or be DECLINED) before closing — current: %',
        old.reference, old.status
        using errcode = '42501';
    end if;
    new.closed_at := now();
    new.closed_by := actor;
  end if;

  -- ---- Reopening a closed ticket is also a decision-maker act -------------
  if old.status = 'CLOSED' and new.status <> 'CLOSED' then
    if not public.can_decide(old.id) then
      raise exception 'Only the decision maker for % can reopen it', old.reference
        using errcode = '42501';
    end if;
    new.closed_at := null;
    new.closed_by := null;
  end if;

  -- ---- Triage requires the DACI answer up front --------------------------
  if new.status = 'TRIAGED' and old.status is distinct from 'TRIAGED' then
    if not public.can_triage(old.id) then
      raise exception 'Only a department lead can triage %', old.reference
        using errcode = '42501';
    end if;
    if new.decision_maker_id is null or new.severity is null or new.tier is null then
      raise exception
        'Triage of % requires a decision maker, a severity and a tier', old.reference
        using errcode = '23514';
    end if;
    new.triaged_at := coalesce(old.triaged_at, now());
  end if;

  -- ---- Declining always costs you a written reason -----------------------
  if new.status = 'DECLINED' and old.status is distinct from 'DECLINED' then
    if not public.can_decide(old.id) then
      raise exception 'Only the decision maker for % can decline it', old.reference
        using errcode = '42501';
    end if;
    if new.decline_reason is null or length(trim(new.decline_reason)) < 10 then
      raise exception
        'Declining % requires a written reason (min 10 chars). Silent rejection kills participation.',
        old.reference
        using errcode = '23514';
    end if;
  end if;

  -- ---- Returning for more info is coaching, so it needs words too --------
  if new.status = 'RETURNED' and old.status is distinct from 'RETURNED' then
    if not public.can_triage(old.id) then
      raise exception 'Only a department lead can return %', old.reference
        using errcode = '42501';
    end if;
  end if;

  -- ---- First response clock (target: under 48h) --------------------------
  if old.status = 'NEW' and new.status <> 'NEW' and old.first_response_at is null then
    new.first_response_at := now();
  end if;

  return new;
end;
$$;

create trigger tickets_enforce_rules
  before update on public.tickets
  for each row execute function public.enforce_ticket_rules();

create or replace function public.enforce_proposal_rules() returns trigger
language plpgsql security definer set search_path = public as $$
declare
  actor uuid := auth.uid();
begin
  -- Approving is the "go signal" and belongs to the decision maker alone.
  if new.status = 'APPROVED' and old.status is distinct from 'APPROVED' then
    if not public.can_decide(new.ticket_id) then
      raise exception 'Only the decision maker can approve a solution'
        using errcode = '42501';
    end if;
    new.decided_by := actor;
    new.decided_at := now();

    -- The go signal moves the ticket and records which proposal won.
    update public.tickets
       set status = 'APPROVED',
           approved_proposal_id = new.id,
           decided_at = now()
     where id = new.ticket_id;

    -- Everything else on this ticket is now history.
    update public.proposals
       set status = 'SUPERSEDED'
     where ticket_id = new.ticket_id
       and id <> new.id
       and status in ('DRAFT','SUBMITTED','CHANGES_REQUESTED');
  end if;

  -- Rejection and "changes requested" both require words. Always.
  if new.status in ('CHANGES_REQUESTED','REJECTED')
     and old.status is distinct from new.status then
    if not public.can_decide(new.ticket_id) then
      raise exception 'Only the decision maker can rule on a solution'
        using errcode = '42501';
    end if;
    if new.decision_reason is null or length(trim(new.decision_reason)) < 10 then
      raise exception
        'A rejection needs a written reason (min 10 chars) so the next version can be better'
        using errcode = '23514';
    end if;
    new.decided_by := actor;
    new.decided_at := now();
  end if;

  if new.status = 'SUBMITTED' and old.status is distinct from 'SUBMITTED' then
    new.submitted_at := now();
    update public.tickets
       set status = 'PROPOSING'
     where id = new.ticket_id
       and status in ('TRIAGED','RETURNED','REOPENED','PROPOSING');
  end if;

  return new;
end;
$$;

create trigger proposals_enforce_rules
  before update on public.proposals
  for each row execute function public.enforce_proposal_rules();

-- Auto-version proposals so "v2" is never a naming argument.
create or replace function public.assign_proposal_version() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if new.version is null then
    select coalesce(max(version), 0) + 1 into new.version
      from public.proposals where ticket_id = new.ticket_id;
  end if;
  return new;
end;
$$;

create trigger proposals_assign_version
  before insert on public.proposals
  for each row execute function public.assign_proposal_version();

-- A proposal submitted straight from the form (rather than saved as a draft
-- first) still has to move the ticket into PROPOSING.
create or replace function public.on_proposal_inserted() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if new.status = 'SUBMITTED' then
    update public.tickets
       set status = 'PROPOSING'
     where id = new.ticket_id
       and status in ('TRIAGED','RETURNED','REOPENED');
  end if;
  return null;
end;
$$;

create trigger proposals_after_insert
  after insert on public.proposals
  for each row execute function public.on_proposal_inserted();

-- -----------------------------------------------------------------------------
-- Audit trail
-- -----------------------------------------------------------------------------

create or replace function public.log_ticket_event() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if tg_op = 'INSERT' then
    insert into public.ticket_events (ticket_id, actor_id, event_type, to_status, detail)
    values (new.id, new.reporter_id, 'created', new.status, new.title);
  elsif new.status is distinct from old.status then
    insert into public.ticket_events (ticket_id, actor_id, event_type, from_status, to_status, detail)
    values (new.id, auth.uid(), 'status_changed', old.status, new.status,
            coalesce(new.decline_reason, new.close_note));
  end if;
  return null;
end;
$$;

create trigger tickets_log_event
  after insert or update on public.tickets
  for each row execute function public.log_ticket_event();

-- -----------------------------------------------------------------------------
-- Row Level Security
--
-- Posture: the whole company can SEE process problems (transparency is the
-- point), but acting on them is scoped by role.
-- -----------------------------------------------------------------------------

alter table public.departments      enable row level security;
alter table public.profiles         enable row level security;
alter table public.role_assignments enable row level security;
alter table public.tickets          enable row level security;
alter table public.proposals        enable row level security;
alter table public.comments         enable row level security;
alter table public.confirmations    enable row level security;
alter table public.attachments      enable row level security;
alter table public.ticket_events    enable row level security;

-- Departments — everyone reads, admins write.
create policy departments_read on public.departments
  for select to authenticated using (true);
create policy departments_write on public.departments
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- Profiles — everyone reads (you need to see who owns what), you edit your own.
create policy profiles_read on public.profiles
  for select to authenticated using (true);
create policy profiles_update_self on public.profiles
  for update to authenticated
  using (id = auth.uid() or public.is_admin())
  with check (id = auth.uid() or public.is_admin());
create policy profiles_insert_self on public.profiles
  for insert to authenticated with check (id = auth.uid() or public.is_admin());

-- Roles — readable so the UI can show who decides; only admins grant them.
create policy roles_read on public.role_assignments
  for select to authenticated using (true);
create policy roles_write on public.role_assignments
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- Tickets — anyone may post, everyone may read, only leads/deciders may change.
create policy tickets_read on public.tickets
  for select to authenticated using (true);

create policy tickets_insert on public.tickets
  for insert to authenticated
  with check (reporter_id = auth.uid());

create policy tickets_update on public.tickets
  for update to authenticated
  using (
    public.can_triage(id)
    or public.can_decide(id)
    or owner_id = auth.uid()
    -- the reporter may revise a ticket that was returned to them for coaching
    or (reporter_id = auth.uid() and status in ('NEW','RETURNED'))
  );

-- Proposals — anyone may propose (that is the point), the author edits their
-- own draft, and only the decision maker may rule on one.
create policy proposals_read on public.proposals
  for select to authenticated using (true);

create policy proposals_insert on public.proposals
  for insert to authenticated
  with check (author_id = auth.uid());

create policy proposals_update on public.proposals
  for update to authenticated
  using (
    (author_id = auth.uid() and status in ('DRAFT','CHANGES_REQUESTED'))
    or public.can_decide(ticket_id)
  );

-- Comments — everyone reads and writes, nobody edits someone else's words.
create policy comments_read on public.comments
  for select to authenticated using (true);
create policy comments_insert on public.comments
  for insert to authenticated with check (author_id = auth.uid());
create policy comments_update_own on public.comments
  for update to authenticated using (author_id = auth.uid());

-- Confirmations: everyone sees the count, you add and remove only your own.
-- Nobody can withdraw someone else's "I see this too".
create policy confirmations_read on public.confirmations
  for select to authenticated using (true);
create policy confirmations_insert on public.confirmations
  for insert to authenticated with check (user_id = auth.uid());
create policy confirmations_delete on public.confirmations
  for delete to authenticated using (user_id = auth.uid());

create policy attachments_read on public.attachments
  for select to authenticated using (true);
create policy attachments_insert on public.attachments
  for insert to authenticated with check (uploader_id = auth.uid());

-- Audit trail is append-only and read-only to everyone.
create policy events_read on public.ticket_events
  for select to authenticated using (true);

-- -----------------------------------------------------------------------------
-- Metrics view — the numbers that tell you whether this is working.
-- Watch proposal_rounds: an average above 2 means your decision criteria are
-- unclear, which is a signal about the organisation, not about the tool.
-- -----------------------------------------------------------------------------

-- -----------------------------------------------------------------------------
-- Priority — the mechanic this board exists for.
--
-- Every other ticket system lets old items sink. This one does the opposite:
-- days_quiet RAISES the score, because "the problem everyone forgot about" is
-- the exact thing we are hunting. A chronic problem always loses a recency
-- contest, so recency is not allowed to run the queue.
--
-- Four terms, each explainable to a person on the floor in one sentence:
--   confirmations  how many people say they see it too   (x3)
--   days_quiet     how long it has been ignored          (x0.5, capped at 60d)
--   hours_lost     measured waste per week               (capped at 40h)
--   severity       triage's judgement of the stakes
--
-- Popularity alone is never allowed to rank it. If it were, the loudest
-- department would win and the quiet buried problems would lose again — which
-- is the failure this whole system is meant to correct.
-- -----------------------------------------------------------------------------

create or replace view public.ticket_priority as
with activity as (
  select ticket_id, max(created_at) as last_event
    from public.ticket_events group by ticket_id
),
confirmed as (
  select ticket_id, count(*)::int as confirmations
    from public.confirmations group by ticket_id
)
select
  t.id,
  t.reference,
  t.title,
  t.department_id,
  t.status,
  t.severity,
  t.waste,
  coalesce(c.confirmations, 0) as confirmations,

  -- Days since anything at all happened on this ticket.
  floor(extract(epoch from (now() - coalesce(a.last_event, t.created_at))) / 86400)::int
    as days_quiet,

  -- people x hours x times per week
  round(
    coalesce(t.people_affected, 0) * coalesce(t.hours_lost_each, 0) *
    case t.happens
      when 'EVERY_SHIFT' then 10
      when 'DAILY'       then 5
      when 'WEEKLY'      then 1
      when 'MONTHLY'     then 0.25
      else 0
    end
  , 1) as hours_lost_per_week,

  round(
      coalesce(c.confirmations, 0) * 3
    + least(
        floor(extract(epoch from (now() - coalesce(a.last_event, t.created_at))) / 86400),
        60
      ) * 0.5
    + least(
        coalesce(t.people_affected, 0) * coalesce(t.hours_lost_each, 0) *
        case t.happens
          when 'EVERY_SHIFT' then 10
          when 'DAILY'       then 5
          when 'WEEKLY'      then 1
          when 'MONTHLY'     then 0.25
          else 0
        end,
        40
      )
    + case t.severity
        when 'CRITICAL' then 20
        when 'HIGH'     then 10
        when 'MEDIUM'   then 4
        else 0
      end
    -- Someone who already tried to raise this through normal channels and got
    -- nowhere IS the weak-communication signal. Weight it like a severity bump.
    + case when coalesce(length(trim(t.raised_before)), 0) > 0 then 8 else 0 end
  , 1) as priority_score,

  t.created_at
from public.tickets t
left join activity  a on a.ticket_id = t.id
left join confirmed c on c.ticket_id = t.id;

create or replace view public.ticket_metrics as
select
  t.id,
  t.reference,
  t.department_id,
  t.status,
  t.severity,
  t.tier,
  extract(epoch from (t.first_response_at - t.created_at)) / 3600 as hours_to_first_response,
  extract(epoch from (t.decided_at       - t.triaged_at)) / 3600  as hours_to_decision,
  extract(epoch from (t.closed_at        - t.created_at)) / 86400 as days_to_close,
  (select count(*) from public.proposals p where p.ticket_id = t.id) as proposal_rounds,
  t.created_at
from public.tickets t;
