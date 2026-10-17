import { Link } from 'react-router-dom';
import { Clock, MessageSquare, AlertTriangle, Users, Hourglass } from 'lucide-react';
import { StatusBadge } from '@/components/StatusBadge';
import { FIRST_RESPONSE_SLA_HOURS, WASTE_KINDS } from '@/lib/constants';
import { ageLabel, hoursSince } from '@/lib/time';

export function TicketCard({ ticket }) {
  // A visible clock is what stops a ticket quietly dying in someone's queue.
  const breachingSla =
    ticket.status === 'NEW' && hoursSince(ticket.created_at) > FIRST_RESPONSE_SLA_HOURS;

  const waste = WASTE_KINDS.find((w) => w.value === ticket.waste);

  // Two weeks with nothing happening is the definition of "buried".
  const forgotten = (ticket.days_quiet ?? 0) >= 14 && !['CLOSED', 'DECLINED'].includes(ticket.status);

  return (
    <Link
      to={`/t/${ticket.reference}`}
      className="card block transition-shadow hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-mono font-semibold text-slate-400">{ticket.reference}</p>
          <p className="mt-0.5 truncate font-semibold text-slate-900">{ticket.title}</p>
        </div>
        <StatusBadge status={ticket.status} />
      </div>

      {(waste || ticket.hours_lost_per_week > 0) && (
        <div className="mt-2 flex flex-wrap items-center gap-2">
          {waste && (
            <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700">
              {waste.label}
            </span>
          )}
          {ticket.hours_lost_per_week > 0 && (
            <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-800">
              ~{Number(ticket.hours_lost_per_week).toLocaleString()} h/week
            </span>
          )}
        </div>
      )}

      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
        <span>{ticket.department?.name}</span>
        <span className="inline-flex items-center gap-1">
          <Clock size={12} />
          {ageLabel(ticket.created_at)}
        </span>
        {ticket.confirmations > 0 && (
          <span className="inline-flex items-center gap-1 font-semibold text-slate-700">
            <Users size={12} />
            {ticket.confirmations} see this too
          </span>
        )}
        {ticket.proposal_count > 0 && (
          <span className="inline-flex items-center gap-1">
            <MessageSquare size={12} />
            {ticket.proposal_count} proposal{ticket.proposal_count === 1 ? '' : 's'}
          </span>
        )}
        {breachingSla && (
          <span className="inline-flex items-center gap-1 font-semibold text-amber-600">
            <AlertTriangle size={12} />
            No reply in {FIRST_RESPONSE_SLA_HOURS}h
          </span>
        )}
      </div>

      {forgotten && (
        <p className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-rose-50 px-2.5 py-1.5 text-xs font-semibold text-rose-800">
          <Hourglass size={13} />
          Nothing has happened here in {ticket.days_quiet} days
        </p>
      )}
    </Link>
  );
}

export function EmptyState({ title, body }) {
  return (
    <div className="rounded-xl border border-dashed border-slate-300 bg-white px-6 py-10 text-center">
      <p className="font-semibold text-slate-700">{title}</p>
      <p className="mt-1 text-sm text-slate-500">{body}</p>
    </div>
  );
}
