import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';
import { TicketCard, EmptyState } from '@/components/TicketCard';

/**
 * The decision maker's home screen.
 *
 * Not "all tickets" — only the ones where the organisation is stopped, waiting
 * on this one person. Keeping this list short is the job. If it is never short,
 * the decision tiers are set too high and Tier 1 needs to move down to the
 * department leads.
 */
export function WaitingOnYou() {
  const { profile } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!profile?.id) return;
    let active = true;

    supabase
      .from('tickets')
      .select('*, department:departments(id,name,code), proposals(id,status)')
      .eq('decision_maker_id', profile.id)
      .not('status', 'in', '("CLOSED","DECLINED")')
      .order('created_at', { ascending: true })
      .then(({ data }) => {
        if (!active) return;
        const rows = (data ?? [])
          .map((t) => ({
            ...t,
            proposal_count: t.proposals?.length ?? 0,
            awaiting: t.proposals?.some((p) => p.status === 'SUBMITTED') || t.status === 'VERIFYING',
          }))
          .filter((t) => t.awaiting);
        setTickets(rows);
        setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [profile?.id]);

  return (
    <div>
      <h1 className="text-xl font-bold tracking-tight">Waiting on you</h1>
      <p className="mt-1 text-sm text-slate-600">
        Work that is stopped until you give a signal. Nothing else is listed here on purpose.
      </p>

      <div className="mt-4 space-y-3">
        {loading && <p className="text-sm text-slate-500">Loading…</p>}
        {!loading && tickets.length === 0 && (
          <EmptyState
            title="Nothing is blocked on you"
            body="No proposals are waiting for a decision and nothing needs verifying."
          />
        )}
        {tickets.map((t) => (
          <TicketCard key={t.id} ticket={t} />
        ))}
      </div>
    </div>
  );
}
