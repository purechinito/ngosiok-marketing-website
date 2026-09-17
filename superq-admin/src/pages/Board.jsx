import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { TicketCard, EmptyState } from '@/components/TicketCard';

const FILTERS = [
  { key: 'open', label: 'Open', match: (t) => !['CLOSED', 'DECLINED'].includes(t.status) },
  { key: 'mine', label: 'Mine', match: null },
  { key: 'closed', label: 'Closed', match: (t) => t.status === 'CLOSED' },
];

/**
 * The whole company can see every process problem. Transparency is the point —
 * a board people cannot see is a suggestion box, and suggestion boxes die.
 */
export function Board() {
  const [tickets, setTickets] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [filter, setFilter] = useState('open');
  const [departmentId, setDepartmentId] = useState('');
  const [me, setMe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setMe(data.user?.id ?? null));
    supabase
      .from('departments')
      .select('*')
      .eq('is_active', true)
      .order('name')
      .then(({ data }) => setDepartments(data ?? []));
  }, []);

  useEffect(() => {
    let active = true;

    let query = supabase
      .from('tickets')
      .select('*, department:departments(id,name,code), proposals(count)')
      .order('created_at', { ascending: false })
      .limit(100);

    if (departmentId) query = query.eq('department_id', departmentId);

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
  }, [departmentId]);

  const visible = tickets.filter((t) => {
    if (filter === 'mine') return t.reporter_id === me || t.owner_id === me;
    return FILTERS.find((f) => f.key === filter)?.match?.(t) ?? true;
  });

  return (
    <div>
      <h1 className="text-xl font-bold tracking-tight">Problem board</h1>

      <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={() => setFilter(f.key)}
            className={`whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium ${
              filter === f.key
                ? 'bg-slate-900 text-white'
                : 'border border-slate-300 bg-white text-slate-600'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <select
        className="field mt-3"
        value={departmentId}
        onChange={(e) => setDepartmentId(e.target.value)}
        aria-label="Filter by department"
      >
        <option value="">All departments</option>
        {departments.map((d) => (
          <option key={d.id} value={d.id}>
            {d.name}
          </option>
        ))}
      </select>

      <div className="mt-4 space-y-3">
        {loading && <p className="text-sm text-slate-500">Loading…</p>}
        {!loading && visible.length === 0 && (
          <EmptyState
            title="Nothing here yet"
            body="When someone posts a problem it shows up on this board for everyone to see."
          />
        )}
        {visible.map((t) => (
          <TicketCard key={t.id} ticket={t} />
        ))}
      </div>
    </div>
  );
}
