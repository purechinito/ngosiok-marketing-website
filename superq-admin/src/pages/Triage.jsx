import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { TicketCard, EmptyState } from '@/components/TicketCard';
import { fetchTicketsWithPriority, SORTS } from '@/lib/tickets';

/**
 * Linear's triage inbox, borrowed wholesale.
 *
 * Everything unhandled lands in one list. One role decides: accept, return for
 * more information, or decline. This is the view that keeps the board honest
 * at 200 problems a week — and the one that stays empty if nobody opens it,
 * which is why it belongs in a standing shift huddle, not in someone's
 * good intentions.
 *
 * Ordered by priority, so the report that five people confirmed and nobody has
 * touched in three weeks sits above the one filed this morning.
 */
export function Triage() {
  const { leadOf, decidesFor, isAdmin } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  const scopes = [...new Set([...leadOf, ...decidesFor])];
  const companyWide = isAdmin || scopes.includes(null);
  const departmentIds = scopes.filter(Boolean);
  const scopeKey = JSON.stringify(departmentIds);

  useEffect(() => {
    let active = true;
    fetchTicketsWithPriority({
      statuses: ['NEW', 'RETURNED'],
      departmentIds: companyWide ? undefined : JSON.parse(scopeKey),
    }).then((rows) => {
      if (!active) return;
      setTickets(rows.sort(SORTS.priority.compare));
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, [scopeKey, companyWide]);

  return (
    <div>
      <h1 className="text-xl font-bold tracking-tight">Triage inbox</h1>
      <p className="mt-1 text-sm text-slate-600">
        Highest priority first. Accept it, send it back for more detail, or decline it with a
        reason.
      </p>

      <div className="mt-4 space-y-3">
        {loading && <p className="text-sm text-slate-500">Loading…</p>}
        {!loading && tickets.length === 0 && (
          <EmptyState
            title="Inbox zero"
            body="Every problem in your department has been picked up. That is the whole goal."
          />
        )}
        {tickets.map((t) => (
          <TicketCard key={t.id} ticket={t} />
        ))}
      </div>
    </div>
  );
}
