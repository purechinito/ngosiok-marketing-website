import { useCallback, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Users,
  Gavel,
  CheckCircle2,
  RotateCcw,
  Send,
  Hand,
  Hourglass,
} from 'lucide-react';
import { supabase, readableError } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';
import { StatusBadge } from '@/components/StatusBadge';
import { ageLabel } from '@/lib/time';
import {
  SEVERITIES,
  TIERS,
  TICKET_STATUS,
  WASTE_KINDS,
  MAX_PROPOSAL_ROUNDS_BEFORE_HUDDLE,
} from '@/lib/constants';

export function TicketDetail() {
  const { reference } = useParams();
  const { profile, hasRole, isAdmin } = useAuth();

  const [ticket, setTicket] = useState(null);
  const [proposals, setProposals] = useState([]);
  const [comments, setComments] = useState([]);
  const [confirmations, setConfirmations] = useState([]);
  const [people, setPeople] = useState([]);
  const [error, setError] = useState(null);
  const [busy, setBusy] = useState(false);

  const fetchAll = useCallback(async () => {
    const { data: t } = await supabase
      .from('tickets')
      .select(
        '*, department:departments(id,name,code), reporter:profiles!tickets_reporter_id_fkey(id,full_name), owner:profiles!tickets_owner_id_fkey(id,full_name), decider:profiles!tickets_decision_maker_id_fkey(id,full_name)'
      )
      .eq('reference', reference)
      .maybeSingle();

    if (!t) return null;

    const [{ data: p }, { data: c }, { data: conf }, { data: prio }] = await Promise.all([
      supabase
        .from('proposals')
        .select('*, author:profiles!proposals_author_id_fkey(id,full_name)')
        .eq('ticket_id', t.id)
        .order('version', { ascending: false }),
      supabase
        .from('comments')
        .select('*, author:profiles!comments_author_id_fkey(id,full_name)')
        .eq('ticket_id', t.id)
        .order('created_at', { ascending: true }),
      supabase
        .from('confirmations')
        .select('user_id, author:profiles!confirmations_user_id_fkey(id,full_name)')
        .eq('ticket_id', t.id),
      supabase.from('ticket_priority').select('*').eq('id', t.id).maybeSingle(),
    ]);

    return {
      ticket: { ...t, ...(prio ?? {}), department: t.department },
      proposals: p ?? [],
      comments: c ?? [],
      confirmations: conf ?? [],
    };
  }, [reference]);

  const apply = useCallback((result) => {
    if (!result) return;
    setTicket(result.ticket);
    setProposals(result.proposals);
    setComments(result.comments);
    setConfirmations(result.confirmations);
  }, []);

  /** Re-read everything after a mutation, so the UI always reflects what the database allowed. */
  const load = useCallback(async () => apply(await fetchAll()), [fetchAll, apply]);

  useEffect(() => {
    let cancelled = false;
    fetchAll().then((result) => {
      if (!cancelled) apply(result);
    });
    return () => {
      cancelled = true;
    };
  }, [fetchAll, apply]);

  useEffect(() => {
    supabase
      .from('profiles')
      .select('id, full_name')
      .eq('is_active', true)
      .order('full_name')
      .then(({ data }) => setPeople(data ?? []));
  }, []);

  if (!ticket) return <p className="text-sm text-slate-500">Loading…</p>;

  const canTriage =
    isAdmin ||
    hasRole('DEPT_LEAD', ticket.department_id) ||
    hasRole('DECISION_MAKER', ticket.department_id);

  const canDecide =
    isAdmin ||
    profile?.id === ticket.decision_maker_id ||
    hasRole('DECISION_MAKER', ticket.department_id);

  const isOwner = profile?.id === ticket.owner_id;

  const run = async (fn) => {
    setBusy(true);
    setError(null);
    const { error: err } = await fn();
    setBusy(false);
    if (err) return setError(readableError(err));
    await load();
  };

  const patchTicket = (patch) => () =>
    supabase.from('tickets').update(patch).eq('id', ticket.id);

  const rejectedRounds = proposals.filter((p) => p.status === 'CHANGES_REQUESTED').length;

  return (
    <div className="space-y-5">
      <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800">
        <ArrowLeft size={16} /> Board
      </Link>

      {/* ---- Problem ---- */}
      <div className="card">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="font-mono text-xs font-semibold text-slate-400">{ticket.reference}</p>
            <h1 className="mt-0.5 text-lg font-bold leading-snug">{ticket.title}</h1>
          </div>
          <StatusBadge status={ticket.status} />
        </div>
        <p className="mt-1 text-xs text-slate-500">
          {ticket.department?.name} · {ticket.reporter?.full_name} · {ageLabel(ticket.created_at)}
        </p>

        {(ticket.waste || ticket.hours_lost_per_week > 0) && (
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {ticket.waste && (
              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
                {WASTE_KINDS.find((w) => w.value === ticket.waste)?.label ?? ticket.waste}
              </span>
            )}
            {ticket.hours_lost_per_week > 0 && (
              <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-800">
                ~{Number(ticket.hours_lost_per_week).toLocaleString()} hours lost each week
              </span>
            )}
          </div>
        )}

        <p className="mt-4 whitespace-pre-wrap text-sm text-slate-700">{ticket.body}</p>

        {ticket.raised_before && (
          <div className="mt-4 rounded-lg border border-rose-200 bg-rose-50 p-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-rose-700">
              Already tried to raise this
            </p>
            <p className="mt-1 whitespace-pre-wrap text-sm text-slate-700">{ticket.raised_before}</p>
            <p className="mt-1 text-xs text-rose-700">
              The normal way of asking did not work. That is why this is here.
            </p>
          </div>
        )}

        {ticket.current_condition && (
          <div className="mt-4 rounded-lg bg-slate-50 p-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              What happens today
            </p>
            <p className="mt-1 whitespace-pre-wrap text-sm text-slate-700">
              {ticket.current_condition}
            </p>
          </div>
        )}

        {ticket.suggested_fix && (
          <div className="mt-3 rounded-lg bg-amber-50 p-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-amber-700">
              Reporter&apos;s idea
            </p>
            <p className="mt-1 whitespace-pre-wrap text-sm text-slate-700">{ticket.suggested_fix}</p>
          </div>
        )}

        {(ticket.owner || ticket.decider) && (
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1 border-t border-slate-100 pt-3 text-xs text-slate-600">
            {ticket.owner && (
              <span className="inline-flex items-center gap-1.5">
                <Users size={13} /> Driver: <strong>{ticket.owner.full_name}</strong>
              </span>
            )}
            {ticket.decider && (
              <span className="inline-flex items-center gap-1.5">
                <Gavel size={13} /> Decides: <strong>{ticket.decider.full_name}</strong>
              </span>
            )}
            {ticket.tier && <span>{TIERS.find((t) => t.value === ticket.tier)?.label}</span>}
          </div>
        )}

        {ticket.decline_reason && (
          <p className="mt-3 rounded-lg bg-slate-100 p-3 text-sm text-slate-700">
            <strong>Declined:</strong> {ticket.decline_reason}
          </p>
        )}

        {ticket.days_quiet >= 14 && !['CLOSED', 'DECLINED'].includes(ticket.status) && (
          <p className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-rose-50 px-2.5 py-1.5 text-xs font-semibold text-rose-800">
            <Hourglass size={13} />
            Nothing has happened here in {ticket.days_quiet} days
          </p>
        )}
      </div>

      {/*
        "I see this too" — one direction only. It measures how many people
        experience the problem, which is exactly what a chronic buried problem
        has and a one-off complaint does not. There is no downvote: rejecting a
        colleague's report is done at triage, by a named person, with a written
        reason.
      */}
      <Confirmations
        ticket={ticket}
        confirmations={confirmations}
        profile={profile}
        run={run}
        busy={busy}
      />

      {error && <p className="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</p>}

      {/* ---- Triage: name the decision maker up front, not at the end ---- */}
      {canTriage && ['NEW', 'RETURNED'].includes(ticket.status) && (
        <TriagePanel ticket={ticket} people={people} run={run} busy={busy} />
      )}

      {/* ---- Proposals ---- */}
      <section>
        <h2 className="text-sm font-bold uppercase tracking-wide text-slate-500">
          Proposed solutions
        </h2>

        {rejectedRounds >= MAX_PROPOSAL_ROUNDS_BEFORE_HUDDLE && ticket.status === 'PROPOSING' && (
          <p className="mt-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2.5 text-sm text-amber-900">
            <strong>{rejectedRounds} rounds without a decision.</strong> That is the signal to stop
            typing and book a 15-minute huddle. Some loops need to leave the software — that is
            design, not failure.
          </p>
        )}

        <div className="mt-3 space-y-3">
          {proposals.length === 0 && (
            <p className="rounded-xl border border-dashed border-slate-300 bg-white px-4 py-6 text-center text-sm text-slate-500">
              No solution proposed yet. Anyone can propose one.
            </p>
          )}
          {proposals.map((p) => (
            <ProposalCard
              key={p.id}
              proposal={p}
              canDecide={canDecide}
              isAuthor={p.author_id === profile?.id}
              run={run}
              busy={busy}
            />
          ))}
        </div>

        {!['CLOSED', 'DECLINED', 'NEW'].includes(ticket.status) && (
          <NewProposalForm ticket={ticket} profile={profile} run={run} busy={busy} />
        )}
      </section>

      {/* ---- Lifecycle after the go signal ---- */}
      {(isOwner || canDecide) && (
        <section className="card space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-wide text-slate-500">Next step</h2>

          {ticket.status === 'APPROVED' && (
            <button
              className="btn-primary w-full"
              disabled={busy}
              onClick={() => run(patchTicket({ status: 'IN_PROGRESS' }))}
            >
              Start implementing
            </button>
          )}

          {ticket.status === 'IN_PROGRESS' && (
            <button
              className="btn-primary w-full"
              disabled={busy}
              onClick={() => run(patchTicket({ status: 'VERIFYING' }))}
            >
              Done — send for verification
            </button>
          )}

          {ticket.status === 'VERIFYING' && canDecide && (
            <div className="space-y-2">
              <p className="text-sm text-slate-600">
                Did it actually work? Skipping this check is the most-cited gap in food-safety
                audits.
              </p>
              <button
                className="btn-primary w-full"
                disabled={busy}
                onClick={() => run(patchTicket({ status: 'CLOSED' }))}
              >
                <CheckCircle2 size={16} /> Verified — close it
              </button>
              <button
                className="btn-danger w-full"
                disabled={busy}
                onClick={() => run(patchTicket({ status: 'REOPENED' }))}
              >
                <RotateCcw size={16} /> Did not work — reopen
              </button>
            </div>
          )}

          {ticket.status === 'CLOSED' && (
            <p className="text-sm text-emerald-700">
              Closed by {ticket.closed_by === profile?.id ? 'you' : 'the decision maker'} ·{' '}
              {ageLabel(ticket.closed_at)}
            </p>
          )}

          {!['APPROVED', 'IN_PROGRESS', 'VERIFYING', 'CLOSED'].includes(ticket.status) && (
            <p className="text-sm text-slate-500">{TICKET_STATUS[ticket.status]?.hint}</p>
          )}
        </section>
      )}

      {/* ---- Conversation ---- */}
      <Discussion ticket={ticket} comments={comments} profile={profile} run={run} busy={busy} />
    </div>
  );
}

/* ------------------------------------------------------------------ */

function Confirmations({ ticket, confirmations, profile, run, busy }) {
  const mine = confirmations.some((c) => c.user_id === profile?.id);
  const others = confirmations
    .filter((c) => c.user_id !== profile?.id)
    .map((c) => c.author?.full_name)
    .filter(Boolean);

  const toggle = () =>
    run(() =>
      mine
        ? supabase
            .from('confirmations')
            .delete()
            .eq('ticket_id', ticket.id)
            .eq('user_id', profile.id)
        : supabase
            .from('confirmations')
            .insert({ ticket_id: ticket.id, user_id: profile.id })
    );

  return (
    <div className="card">
      <button
        type="button"
        onClick={toggle}
        disabled={busy}
        className={`w-full ${mine ? 'btn-secondary' : 'btn-primary'}`}
      >
        <Hand size={16} />
        {mine ? 'You said you see this too' : 'I see this too'}
      </button>

      <p className="mt-2 text-center text-xs text-slate-500">
        {confirmations.length === 0
          ? 'Nobody else has confirmed this yet.'
          : `${confirmations.length} ${
              confirmations.length === 1 ? 'person sees' : 'people see'
            } this too${others.length ? ` — ${others.slice(0, 3).join(', ')}` : ''}${
              others.length > 3 ? ` and ${others.length - 3} more` : ''
            }.`}
      </p>
      <p className="mt-1 text-center text-xs text-slate-400">
        Confirming raises its priority. There is no way to vote a colleague&apos;s report down.
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */

function TriagePanel({ ticket, people, run, busy }) {
  const { profile } = useAuth();
  const [form, setForm] = useState({
    owner_id: ticket.owner_id ?? '',
    decision_maker_id: ticket.decision_maker_id ?? '',
    severity: ticket.severity ?? 'MEDIUM',
    tier: ticket.tier ?? 'TIER_1',
  });
  const [reason, setReason] = useState('');

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <div className="card space-y-4 border-brand-500/40 bg-brand-50/40">
      <div>
        <h2 className="text-sm font-bold uppercase tracking-wide text-slate-600">Triage</h2>
        <p className="mt-1 text-xs text-slate-600">
          Name the decision maker now, not later. Tickets stall when &ldquo;who decides?&rdquo; is
          answered at the end.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="owner">
            Driver (does the work)
          </label>
          <select id="owner" className="field" value={form.owner_id} onChange={set('owner_id')}>
            <option value="">Unassigned</option>
            {people.map((p) => (
              <option key={p.id} value={p.id}>
                {p.full_name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="label" htmlFor="decider">
            Decision maker <span className="text-rose-500">*</span>
          </label>
          <select
            id="decider"
            className="field"
            value={form.decision_maker_id}
            onChange={set('decision_maker_id')}
          >
            <option value="">Choose…</option>
            {people.map((p) => (
              <option key={p.id} value={p.id}>
                {p.full_name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="label" htmlFor="sev">
            Severity
          </label>
          <select id="sev" className="field" value={form.severity} onChange={set('severity')}>
            {SEVERITIES.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="label" htmlFor="tier">
            Decision tier
          </label>
          <select id="tier" className="field" value={form.tier} onChange={set('tier')}>
            {TIERS.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
          <p className="hint">{TIERS.find((t) => t.value === form.tier)?.hint}</p>
        </div>
      </div>

      <button
        className="btn-primary w-full"
        disabled={busy || !form.decision_maker_id}
        onClick={() =>
          run(() =>
            supabase
              .from('tickets')
              .update({
                ...form,
                owner_id: form.owner_id || null,
                status: 'TRIAGED',
              })
              .eq('id', ticket.id)
          )
        }
      >
        Accept into the queue
      </button>

      <div className="border-t border-slate-200 pt-3">
        <label className="label" htmlFor="reason">
          Or send it back / decline — with a reason
        </label>
        <textarea
          id="reason"
          className="field"
          rows={2}
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Tell them what is missing, or why this is not proceeding. Never leave it silent."
        />
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          <button
            className="btn-secondary"
            disabled={busy || reason.trim().length < 10}
            onClick={() =>
              run(async () => {
                const { error } = await supabase
                  .from('comments')
                  .insert({ ticket_id: ticket.id, author_id: profile.id, body: reason });
                if (error) return { error };
                return supabase.from('tickets').update({ status: 'RETURNED' }).eq('id', ticket.id);
              })
            }
          >
            Need more info
          </button>
          <button
            className="btn-danger"
            disabled={busy || reason.trim().length < 10}
            onClick={() =>
              run(() =>
                supabase
                  .from('tickets')
                  .update({ status: 'DECLINED', decline_reason: reason })
                  .eq('id', ticket.id)
              )
            }
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

function ProposalCard({ proposal, canDecide, isAuthor, run, busy }) {
  const [reason, setReason] = useState('');
  const [showRuling, setShowRuling] = useState(false);

  const patch = (body) => () =>
    supabase.from('proposals').update(body).eq('id', proposal.id);

  return (
    <div className="card">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold text-slate-400">
            v{proposal.version} · {proposal.author?.full_name}
          </p>
          <p className="mt-0.5 font-semibold">{proposal.summary}</p>
        </div>
        <StatusBadge status={proposal.status} kind="proposal" />
      </div>

      {proposal.root_cause && (
        <p className="mt-3 text-sm text-slate-700">
          <span className="font-semibold">Root cause:</span> {proposal.root_cause}
        </p>
      )}
      <p className="mt-2 whitespace-pre-wrap text-sm text-slate-700">{proposal.actions}</p>

      {(proposal.cost_estimate != null || proposal.effort_days != null) && (
        <p className="mt-2 text-xs text-slate-500">
          {proposal.cost_estimate != null && `Cost ≈ ₱${Number(proposal.cost_estimate).toLocaleString()}`}
          {proposal.cost_estimate != null && proposal.effort_days != null && ' · '}
          {proposal.effort_days != null && `${proposal.effort_days} day(s)`}
        </p>
      )}

      {proposal.decision_reason && (
        <p className="mt-3 rounded-lg bg-slate-50 p-3 text-sm text-slate-700">
          <strong>Decision note:</strong> {proposal.decision_reason}
        </p>
      )}

      {isAuthor && proposal.status === 'DRAFT' && (
        <button className="btn-primary mt-3 w-full" disabled={busy} onClick={() => run(patch({ status: 'SUBMITTED' }))}>
          <Send size={15} /> Submit for decision
        </button>
      )}

      {canDecide && proposal.status === 'SUBMITTED' && (
        <div className="mt-4 border-t border-slate-100 pt-3">
          {!showRuling ? (
            <div className="grid gap-2 sm:grid-cols-2">
              <button
                className="btn-primary"
                disabled={busy}
                onClick={() => run(patch({ status: 'APPROVED' }))}
              >
                <CheckCircle2 size={16} /> Go — approve this
              </button>
              <button className="btn-secondary" onClick={() => setShowRuling(true)}>
                Not yet…
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <label className="label" htmlFor={`reason-${proposal.id}`}>
                What needs to change? <span className="text-rose-500">*</span>
              </label>
              <textarea
                id={`reason-${proposal.id}`}
                className="field"
                rows={2}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Be specific enough that the next version can be better."
              />
              <p className="hint">
                A rejection without words is what stops people proposing. The database will not
                accept one.
              </p>
              <div className="grid gap-2 sm:grid-cols-2">
                <button
                  className="btn-secondary"
                  disabled={busy || reason.trim().length < 10}
                  onClick={() =>
                    run(patch({ status: 'CHANGES_REQUESTED', decision_reason: reason }))
                  }
                >
                  Request changes
                </button>
                <button
                  className="btn-danger"
                  disabled={busy || reason.trim().length < 10}
                  onClick={() => run(patch({ status: 'REJECTED', decision_reason: reason }))}
                >
                  Reject outright
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */

function NewProposalForm({ ticket, profile, run, busy }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    summary: '',
    root_cause: '',
    actions: '',
    cost_estimate: '',
    effort_days: '',
  });

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  if (!open) {
    return (
      <button className="btn-secondary mt-3 w-full" onClick={() => setOpen(true)}>
        Propose a solution
      </button>
    );
  }

  return (
    <div className="card mt-3 space-y-3">
      <div>
        <label className="label" htmlFor="summary">
          In one line, what do you propose? <span className="text-rose-500">*</span>
        </label>
        <input id="summary" className="field" value={form.summary} onChange={set('summary')} required />
      </div>
      <div>
        <label className="label" htmlFor="root">
          Why is this happening?
        </label>
        <textarea id="root" className="field" rows={2} value={form.root_cause} onChange={set('root_cause')} />
        <p className="hint">Treating the symptom is how the same ticket comes back next month.</p>
      </div>
      <div>
        <label className="label" htmlFor="actions">
          What exactly will be done? <span className="text-rose-500">*</span>
        </label>
        <textarea id="actions" className="field" rows={3} value={form.actions} onChange={set('actions')} required />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="cost">
            Rough cost (₱)
          </label>
          <input id="cost" className="field" inputMode="decimal" value={form.cost_estimate} onChange={set('cost_estimate')} />
        </div>
        <div>
          <label className="label" htmlFor="days">
            Days of work
          </label>
          <input id="days" className="field" inputMode="decimal" value={form.effort_days} onChange={set('effort_days')} />
        </div>
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        <button
          className="btn-primary"
          disabled={busy || !form.summary.trim() || !form.actions.trim()}
          onClick={() =>
            run(async () => {
              const result = await supabase.from('proposals').insert({
                ticket_id: ticket.id,
                author_id: profile.id,
                summary: form.summary,
                root_cause: form.root_cause || null,
                actions: form.actions,
                cost_estimate: form.cost_estimate ? Number(form.cost_estimate) : null,
                effort_days: form.effort_days ? Number(form.effort_days) : null,
                status: 'SUBMITTED',
                submitted_at: new Date().toISOString(),
              });
              if (!result.error) setOpen(false);
              return result;
            })
          }
        >
          Submit for decision
        </button>
        <button className="btn-secondary" onClick={() => setOpen(false)}>
          Cancel
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

function Discussion({ ticket, comments, profile, run, busy }) {
  const [body, setBody] = useState('');

  return (
    <section>
      <h2 className="text-sm font-bold uppercase tracking-wide text-slate-500">Discussion</h2>
      <div className="mt-3 space-y-3">
        {comments.map((c) => (
          <div key={c.id} className="card py-3">
            <p className="text-xs font-semibold text-slate-500">
              {c.author?.full_name ?? 'System'} · {ageLabel(c.created_at)}
            </p>
            <p className="mt-1 whitespace-pre-wrap text-sm text-slate-700">{c.body}</p>
          </div>
        ))}
        {comments.length === 0 && <p className="text-sm text-slate-500">No messages yet.</p>}
      </div>

      <div className="mt-3 flex gap-2">
        <input
          className="field flex-1"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Add a note…"
          aria-label="Add a comment"
        />
        <button
          className="btn-primary"
          disabled={busy || !body.trim()}
          onClick={() =>
            run(async () => {
              const result = await supabase
                .from('comments')
                .insert({ ticket_id: ticket.id, author_id: profile.id, body });
              if (!result.error) setBody('');
              return result;
            })
          }
        >
          Send
        </button>
      </div>
    </section>
  );
}
