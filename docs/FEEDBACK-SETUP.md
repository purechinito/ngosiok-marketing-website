# Feedback & Admin Dashboard — Setup

Public form at `/feedback`. Admin dashboard at `admin.superq.ph` (and at
`/admin` on the main domain). Data lives in Supabase.

Nothing works until the steps below are done. Until then the form shows a
"not connected" notice rather than failing silently.

---

## How the security model works

Read this before changing any policy — it is the part that is easy to get
wrong in a way that is invisible until it matters.

**The Supabase anon key is public.** It ships inside the JavaScript bundle.
Anyone can read it out of the page source and call the Supabase REST API with
it directly. So neither "only our admin page queries this table" nor "the
admin URL is hard to guess" is a security boundary.

That single fact drives the whole design:

| Who | Can do |
| --- | --- |
| Anonymous visitor | Insert a report. Nothing else — cannot read even their own. |
| Signed-in user **not** in `admin_users` | Nothing. Reads return zero rows. |
| Signed-in user **in** `admin_users` | Read, triage, delete reports and photos. |

Photos go in a **private** bucket. The dashboard views them through
short-lived signed URLs. A public bucket would make every customer-uploaded
photo readable by anyone with the URL.

The login screen at `/admin` is convenience, not protection. The protection is
row level security in Postgres, which applies no matter how the API is called.

---

## 1. Create the Supabase project

1. Create a project at [supabase.com](https://supabase.com).
2. **Settings → API**: copy the **Project URL** and the **anon / public** key.
   Never copy the `service_role` key into this repo — it bypasses row level
   security entirely.

## 2. Run the migration

**SQL Editor → New query**, paste all of
`supabase/migrations/0001_feedback.sql`, and run it.

That creates the `feedback` table, the `admin_users` allowlist, every RLS
policy, and the private `feedback-photos` bucket.

## 3. Turn off public signup

**Authentication → Sign In / Providers → Email**, and disable *"Allow new
users to sign up"*.

Skipping this means anyone can register an account. They still could not read
reports — the `admin_users` check blocks that — but there is no reason to let
strangers create accounts on your project.

## 4. Create your admin account

1. **Authentication → Users → Add user**, with a real email and a strong
   password.
2. **SQL Editor**, substituting your email:

   ```sql
   insert into public.admin_users (user_id, email)
   select id, email from auth.users where email = 'you@example.com'
   on conflict (user_id) do nothing;
   ```

Repeat per admin. Deleting a row revokes that person's access immediately.

## 5. Set the environment variables

Locally:

```bash
cp .env.example .env.local
# then fill in both values
```

On Vercel: **Settings → Environment Variables**, add `VITE_SUPABASE_URL` and
`VITE_SUPABASE_ANON_KEY` for Production, Preview and Development, then
redeploy. Vite inlines `VITE_*` variables at build time, so a variable added
after a build does not apply until you rebuild.

## 6. Point `admin.superq.ph` at the site

1. In Vercel: **Settings → Domains → Add**, enter `admin.superq.ph`.
2. Add the CNAME record Vercel gives you at your DNS provider.

No separate project or build is needed — the app checks the hostname and
serves the admin shell on any `admin.*` domain. `/admin` on the main domain
keeps working too, which is useful for testing before DNS propagates.

---

## Using the dashboard

- **Status filters** double as counts: New, In review, Resolved, Spam.
- **Search** covers message text, store, city, name and email.
- **Type filter** narrows to stock-outs, quality issues and so on.
- Each report can be given a status and internal notes. Notes are never shown
  to the person who submitted.
- The dashboard loads the 50 most recent reports.

## Things worth knowing

**Anyone can submit, including bots.** The insert policy is open by design —
requiring an account would defeat the point of a stock-out form. If spam
becomes a problem, the options in rough order of effort are: mark them Spam in
the dashboard, add a honeypot field, or put submissions behind a Supabase Edge
Function with a captcha. Nothing is in place today.

**Reports are not emailed to anyone.** They appear in the dashboard only, so
someone has to check it. If you want an email or Slack ping per submission,
add a Supabase Database Webhook on insert against `public.feedback`.

**Photos count against storage.** The bucket caps uploads at 5 MB and accepts
JPG, PNG, WEBP and HEIC. The free tier includes 1 GB. Deleting a report does
not currently delete its photo — remove those in **Storage** if you need the
space.

**Personal data.** Name and email are optional but people will supply them.
Treat the table as personal data: keep the admin list short, and delete
reports you no longer need.

---

## Troubleshooting

**Form says "not connected yet"** — env vars missing or the site was built
before they were added. Set both and redeploy.

**"This account is not an admin"** — the user exists in Auth but not in
`admin_users`. Run the insert from step 4.

**Dashboard is empty but there should be reports** — you are signed in as a
non-admin, so RLS is filtering every row. Same fix as above.

**Photo will not upload** — over 5 MB, or an unsupported type. The form checks
both before uploading and says which.

**Photos show "could not be loaded"** — the signing call failed, which usually
means the storage policies from the migration did not apply. Re-run the
storage section of `0001_feedback.sql`.
