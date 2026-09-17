# Super Q · Internal Problem Board

The platform behind `admin.superq.ph`. Anyone in the company posts a problem,
anyone can propose a solution, and a named decision maker gives the go signal.
Only that decision maker can close a ticket.

> **Mental model:** this is GitHub for factory problems.
> Ticket = issue · Proposal = pull request · Decision maker = the person with
> merge rights · "Go signal" = approval.

---

## The flow

```
                        ┌──────────── RETURNED (needs info, with coaching)
                        │
NEW ──► TRIAGED ──► PROPOSING ──► APPROVED ──► IN_PROGRESS ──► VERIFYING ──► CLOSED
 │          │                                                      │
 └──────────┴──► DECLINED (written reason required)                └──► REOPENED
```

A proposal runs its own loop inside `PROPOSING`:

```
DRAFT ──► SUBMITTED ──► CHANGES_REQUESTED ──► (author resubmits as v2) ──► APPROVED
                    └──► REJECTED                                      └──► SUPERSEDED
```

Every version is kept. The record of *what was tried and why it was rejected*
is the asset that compounds — that history is why proposals are real rows and
not comments.

## Roles

| Role | Can do | Cannot do |
|---|---|---|
| `REPORTER` | Everyone. Post problems, comment, propose solutions. | Triage, decide, close |
| `DEPT_LEAD` | Triage their department's inbox; assign driver, severity, tier | **Close a ticket** |
| `DECISION_MAKER` | Approve/reject proposals, verify, close | — |
| `ADMIN` | Manage people and departments | — |

Roles are scoped per department. A `NULL` department means company-wide.

## Decision tiers

These exist so one executive never becomes the bottleneck. Set at triage.

| Tier | Scope | Who decides |
|---|---|---|
| Tier 1 | Cheap, reversible, no food-safety impact | Department lead |
| Tier 2 | Costly or cross-department | Department head |
| Tier 3 | One-way door: capex, food safety, customer-facing, legal | Exec / owner |

**If the Tier 3 queue exceeds ~10 items, the tiers are set wrong — not the people.**

---

## Setup

### 1. Supabase

Create a project, then in the SQL editor run, in order:

1. `supabase/schema.sql` — tables, triggers, Row Level Security
2. `supabase/seed.sql` — departments and the photo storage bucket

Then enable **Phone** auth under Authentication → Providers and connect an SMS
provider. Phone login is deliberate: most of the 200 people who need this have
no company email address.

### 2. App

```bash
npm install
cp .env.example .env.local   # fill in your project URL and anon key
npm run dev
```

### 3. Your first admin

Sign in once so an `auth.users` row exists, then in the Supabase SQL editor:

```sql
insert into public.role_assignments (user_id, role, department_id)
values ('<your-user-uuid>', 'ADMIN', null);
```

### 4. Deploy

Vercel project pointed at this repo, domain `admin.superq.ph`. Set
`VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` as environment variables.
`vercel.json` already sends `noindex` headers — this must never reach Google.

---

## Why the rules live in the database

`supabase/schema.sql` enforces every business guarantee in Postgres triggers and
RLS policies, not in React:

- **Only the decision maker can close.** A UI-only check is theatre — anyone
  with a browser console routes around it.
- **A ticket cannot be closed before `VERIFYING`.** Effectiveness verification is
  the most frequently skipped and most frequently cited step in food-safety
  audits.
- **Rejections require a written reason (min 10 characters).** Silent rejection
  is the single best-documented killer of these systems. The database refuses one.
- **Triage requires a decision maker, a severity and a tier.** Tickets stall when
  "who decides?" is answered at the end instead of the start.

The error messages are written to be read by a person on a phone, and the app
surfaces them as-is.

### Tests

`supabase/tests/` proves each of those claims against a real Postgres, using
stand-ins for Supabase's `auth` and `storage` schemas. **These assertions are
the business requirements** — a department lead being unable to close a ticket
is test `T17`, not a code comment.

```bash
chmod +x supabase/tests/run.sh
PGHOST=127.0.0.1 PGPORT=5432 PGUSER=postgres ./supabase/tests/run.sh
```

Currently 21/21 passing. Re-run it after any change to `schema.sql`.

---

## Metrics that tell you if this is working

Query the `ticket_metrics` view.

| Metric | Target | What it means if it drifts |
|---|---|---|
| Participation rate | Rising each quarter | Adoption problem, not an idea problem |
| Implementation rate | > 60% | Proposals are not getting decided |
| Time to first response | < 48h | The triage inbox is not being opened |
| Proposal rounds per ticket | ≤ 2 average | **Your decision criteria are unclear** |
| Reopen rate after verify | Low | Root causes are not being found |

`proposal_rounds` is the most interesting number in the system. A high average
is a signal about the organisation, not about the tool.

---

## Known failure modes, and the planned pivot for each

These are expected. They are **data, not a verdict.**

| What happens | Why | Pivot |
|---|---|---|
| Week 3: submissions fall off a cliff | Launch was a campaign, not a behaviour system | 10 minutes of the existing shift huddle, inbox open on a phone |
| One person becomes the bottleneck | Tiers set too high | Push Tier 1 down to department leads |
| First ticket is about a person, not a process | Inevitable | Board is for process problems; HR issues route elsewhere |
| Everyone complains, nobody proposes | No seed | Intake asks "what would fix it?"; reporter gets credit when it ships |
| Proposal loop never converges | Written debate has limits | After 2 rounds the UI says: book a 15-minute huddle |

---

## Roadmap

- [x] Phase 1 — auth, departments, post a problem with a photo, triage inbox
- [x] Phase 2 — versioned proposals, decision gates, go signal
- [x] Phase 3 — implement, verify, close, reopen
- [ ] Phase 4 — dashboards, SLA digests, weekly department summary
- [ ] Phase 5 — Tagalog / Bisaya interface strings
- [ ] Phase 6 — push notifications (PWA) for "waiting on you"
