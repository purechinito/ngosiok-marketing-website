import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';
import { TicketCard, EmptyState } from '@/components/TicketCard';

/**
 * Linear's triage inbox, borrowed wholesale.
 *
 * Everything unhandled lands in one list. One role decides: accept, return for
 * more information, or decline. This is the view that keeps the board honest
 * at 200 problems a week — and the one that stays empty if nobody opens it,
 * which is why it belongs in a standing shift huddle, not in someone's
 * good intentions.
 */
export function Triage() {
  const { leadOf, decidesFor, isAdmin } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  const scopes = [...new Set([...leadOf, ...decidesFor])];
  const companyWide = isAdmin || scopes.includes(null);

  useEffect(() => {
    let active = true;

    let query = supabase
      .from('tickets')
      .select('*, department:departments(id,name,code), proposals(count)')
      .in('status', ['NEW', 'RETURNED'])
      .order('created_at', { ascending: true }); // oldest first: age is the priority

    const departmentIds = scopes.filter(Boolean);
    if (!companyWide && departmentIds.length > 0) {
      query = query.in('department_id', departmentIds);
    }

    query.then(({ data }) => {
      if (!active) return;
      setTickets(
        (data ?? []).map((t) => ({ ...t, proposal_count: t.proposals?.[0]?.count ?? 0 }))
      );
      setLoading(false);
    });

    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(scopes), companyWide]);

  return (
    <div>
      <h1 className="text-xl font-bold tracking-tight">Triage inbox</h1>
      <p className="mt-1 text-sm text-slate-600">
        Oldest first. Accept it, send it back for more detail, or decline it with a reason.
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
