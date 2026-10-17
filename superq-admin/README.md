# Super Q · Internal Problem Board

Lives in the website repo as its own app, deployed separately to
**`admin.superq.ph`**. It shares the repo with the marketing site but not the
build, the bundle, or the deploy — a bug in here can never take down
`superq.ph`, and the ERP is untouched by any of it.

Anyone in the company posts a problem, anyone can propose a solution, and a
named decision maker gives the go signal. Only that decision maker can close a
ticket.

> **Mental model:** this is GitHub for factory problems.
> Ticket = issue · Proposal = pull request · Decision maker = the person with
> merge rights · "Go signal" = approval.

---

## What this is actually for

Not every problem. Problems with a **weak communication path** — the ones that
get forgotten and buried.

A problem with an obvious owner already gets solved by phone: you call
purchasing and it is handled. This board does not compete with the phone. It
catches what the phone structurally cannot:

- **chronic** — it has been true so long it reads as normal
- **ownerless** — it sits between two departments, so neither picks it up
- **socially awkward** — saying it out loud sounds like an accusation

The example that shaped the design: *three staff standing with nothing to do at
the start of every shift.* Everyone sees it. Nobody reports it. It costs about
30 hours a week.

Three mechanics exist specifically to catch that problem:

**1. You file a waste type, not a complaint.**
"Three staff idle" is `WAITING`. Picking a waste category names the situation
without naming a person or their supervisor. Without this field, that report
never gets written at all.

**2. Being ignored raises priority.**
Every other ticket system lets old items sink. `days_quiet` — time since
anything happened — *adds* to the score here. A chronic problem always loses a
recency contest, so recency is not allowed to run the queue.

**3. "Have you raised this before?"**
An answer like *"I told my supervisor three times"* is the weak-communication
signal itself, and it jumps the queue.

## Priority

```
priority_score =
      confirmations        x 3        how many people say they see it too
    + days_quiet           x 0.5      how long it has been ignored (capped 60d)
    + hours_lost_per_week             measured waste (capped 40h)
    + severity weight                 triage's judgement of the stakes
    + 8 if they already tried to raise it through normal channels
```

`hours_lost_per_week` = people × hours each × times per week. Three people, two
hours, every shift = 60 hours a week. That is a number a decision maker can act
on; *"the line keeps stopping"* is not.

**Popularity alone never ranks the queue.** If it did, the loudest department
would win and the quiet buried problems would lose again — the exact failure
this board exists to correct.

### "I see this too" — and no downvote

Confirmations are one-directional by design. An upvote measures how many people
experience a problem, which is precisely what a chronic buried problem has and
a one-off complaint does not.

There is no downvote. An anonymous, unaccountable rejection of a colleague's
report is corrosive on a floor where everyone knows everyone, and *"my report
disappeared and nobody said why"* is the best-documented way to kill
participation. The accountable version already exists: **triage decline**, which
requires a name and a written reason.

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

A **second Vercel project** on this same repo — separate from the one that
serves `superq.ph`.

| Setting | Value |
|---|---|
| Root directory | `superq-admin` |
| Build command | `npm run build` |
| Output directory | `dist` |
| Domain | `admin.superq.ph` |
| Environment variables | `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` |

Sharing the repo but not the deploy is the point: the marketing site and this
board build independently, so a mistake in here cannot take down `superq.ph`.

`vercel.json` already sends `noindex, nofollow` plus `X-Frame-Options: DENY` —
this must never reach Google.

Two choices keep it portable if it ever moves again:

- **`base: './'`** — assets load by relative path, so the same build works at a
  domain root or under a subdirectory.
- **HashRouter** — deep links look like `/#/t/PRD-1`. No rewrite rules and
  nothing to configure on the host, so a missed server directive cannot 404 the
  app. The cost is a `#` in the URL, which is a fair trade for an internal tool
  that has already changed homes once.

> `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are baked in at build time,
> so Vercel needs them set before the first build. The anon key is safe to ship —
> Row Level Security is what protects the data.

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

Currently **28/28 passing**. Re-run it after any change to `schema.sql`.

The assertions that cover the mechanics above:

| Test | Claim |
|---|---|
| `T17` | A department lead **cannot** close — only the decision maker |
| `T22` | 3 people × 2h × every shift is costed at 60 h/week |
| `T24` | A 30-day-old problem **outranks an identical fresh one** (63.0 vs 40.0) |
| `T26` | The same person cannot confirm twice |
| `T27` | Nobody can withdraw someone else's confirmation |

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
