import { Link } from 'react-router-dom';
import { Clock, MessageSquare, AlertTriangle } from 'lucide-react';
import { StatusBadge } from '@/components/StatusBadge';
import { FIRST_RESPONSE_SLA_HOURS } from '@/lib/constants';
import { ageLabel, hoursSince } from '@/lib/time';

export function TicketCard({ ticket }) {
  // A visible clock is what stops a ticket quietly dying in someone's queue.
  const breachingSla =
    ticket.status === 'NEW' && hoursSince(ticket.created_at) > FIRST_RESPONSE_SLA_HOURS;

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

      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
        <span>{ticket.department?.name}</span>
        <span className="inline-flex items-center gap-1">
          <Clock size={12} />
          {ageLabel(ticket.created_at)}
        </span>
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
