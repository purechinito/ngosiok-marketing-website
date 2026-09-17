import { TICKET_STATUS, PROPOSAL_STATUS } from '@/lib/constants';

export function StatusBadge({ status, kind = 'ticket' }) {
  const map = kind === 'proposal' ? PROPOSAL_STATUS : TICKET_STATUS;
  const meta = map[status] ?? { label: status, tone: 'bg-slate-100 text-slate-700' };
  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${meta.tone}`}>
      {meta.label}
    </span>
  );
}
