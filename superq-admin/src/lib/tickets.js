import { supabase } from '@/lib/supabase';

/**
 * Tickets joined with their priority row.
 *
 * The priority lives in a view (ticket_priority) rather than in columns,
 * because days_quiet changes every day without anyone touching the ticket —
 * which is the whole point. A forgotten problem climbs on its own.
 */
export async function fetchTicketsWithPriority({ departmentId, departmentIds, statuses } = {}) {
  let query = supabase
    .from('tickets')
    .select('*, department:departments(id,name,code), proposals(count)')
    .limit(200);

  if (departmentId) query = query.eq('department_id', departmentId);
  if (departmentIds?.length) query = query.in('department_id', departmentIds);
  if (statuses?.length) query = query.in('status', statuses);

  const [{ data: tickets }, { data: priority }] = await Promise.all([
    query,
    supabase.from('ticket_priority').select('*'),
  ]);

  const priorityById = new Map((priority ?? []).map((row) => [row.id, row]));

  return (tickets ?? []).map((ticket) => ({
    ...ticket,
    ...(priorityById.get(ticket.id) ?? {}),
    department: ticket.department,
    proposal_count: ticket.proposals?.[0]?.count ?? 0,
  }));
}

export const SORTS = {
  priority: {
    label: 'Priority',
    hint: 'How many see it, how long it has been ignored, and what it costs.',
    compare: (a, b) => (b.priority_score ?? 0) - (a.priority_score ?? 0),
  },
  forgotten: {
    label: 'Most forgotten',
    hint: 'Longest since anything happened. The ones that fall through the cracks.',
    compare: (a, b) => (b.days_quiet ?? 0) - (a.days_quiet ?? 0),
  },
  costly: {
    label: 'Most costly',
    hint: 'Measured hours lost per week.',
    compare: (a, b) => (b.hours_lost_per_week ?? 0) - (a.hours_lost_per_week ?? 0),
  },
  newest: {
    label: 'Newest',
    hint: 'Most recently reported.',
    compare: (a, b) => new Date(b.created_at) - new Date(a.created_at),
  },
};
