/**
 * Demo mode — the app running on seeded data, with no database behind it.
 *
 * Why this exists: until a Supabase project is created there is literally
 * nothing to look at, which makes the board impossible to show anyone. A
 * decision maker cannot react to a README. This lets the real screens be
 * opened, clicked and shown in a meeting before any infrastructure exists.
 *
 * It implements only the slice of the supabase-js surface this app actually
 * calls. Nothing written here survives a refresh, and it is never used when
 * VITE_SUPABASE_URL is set.
 */

const now = Date.now();
const daysAgo = (n) => new Date(now - n * 86_400_000).toISOString();

/* ---------------------------------------------------------------- seed --- */

const departments = [
  { id: 'd1', code: 'PRD', name: 'Production', ticket_counter: 3, is_active: true },
  { id: 'd2', code: 'QA', name: 'Quality Assurance', ticket_counter: 1, is_active: true },
  { id: 'd3', code: 'MNT', name: 'Maintenance', ticket_counter: 1, is_active: true },
  { id: 'd4', code: 'WHS', name: 'Warehouse & Logistics', ticket_counter: 1, is_active: true },
];

const profiles = [
  { id: 'u1', full_name: 'Rey Salazar', department_id: 'd1', is_active: true },
  { id: 'u2', full_name: 'Lina Abad', department_id: 'd1', is_active: true },
  { id: 'u3', full_name: 'Dina Ocampo', department_id: 'd1', is_active: true },
  { id: 'u4', full_name: 'Bong Ramos', department_id: 'd4', is_active: true },
  { id: 'u5', full_name: 'Merly Tan', department_id: 'd2', is_active: true },
];

// The demo signs you in as Dina, who both triages and decides, so every screen
// in the app is reachable without switching accounts.
export const DEMO_USER_ID = 'u3';

const role_assignments = [
  { user_id: 'u2', role: 'DEPT_LEAD', department_id: 'd1' },
  { user_id: 'u3', role: 'DEPT_LEAD', department_id: 'd1' },
  { user_id: 'u3', role: 'DECISION_MAKER', department_id: 'd1' },
  { user_id: 'u3', role: 'DECISION_MAKER', department_id: null },
];

const tickets = [
  {
    id: 't1',
    reference: 'PRD-1',
    title: 'Three staff idle at the start of every shift',
    body: 'The packing crew clocks in at 6am but the first batch does not reach them until about 8. They stand around waiting. It has been like this since the line was re-sequenced.',
    current_condition: 'Three people wait roughly two hours at the start of every shift.',
    suggested_fix: 'Stagger the packing crew start time, or move the first mix earlier.',
    kind: 'PROCESS',
    waste: 'WAITING',
    raised_before:
      'I told my supervisor three times. He said he would look into it. That was in March.',
    people_affected: 3,
    hours_lost_each: 2,
    happens: 'EVERY_SHIFT',
    department_id: 'd1',
    reporter_id: 'u1',
    status: 'NEW',
    created_at: daysAgo(34),
    last_event_at: daysAgo(31),
  },
  {
    id: 't2',
    reference: 'PRD-2',
    title: 'Sealer on Line 2 keeps skipping',
    body: 'Packs come out unsealed roughly twice an hour and have to be re-run.',
    current_condition: 'We stop the line about 10 minutes every shift to re-run them.',
    kind: 'EQUIPMENT',
    waste: 'DEFECTS',
    people_affected: 2,
    hours_lost_each: 0.5,
    happens: 'DAILY',
    department_id: 'd1',
    reporter_id: 'u2',
    status: 'PROPOSING',
    severity: 'HIGH',
    tier: 'TIER_2',
    owner_id: 'u1',
    decision_maker_id: 'u3',
    triaged_at: daysAgo(9),
    created_at: daysAgo(11),
    last_event_at: daysAgo(2),
  },
  {
    id: 't3',
    reference: 'WHS-1',
    title: 'Pallets blocking the aisle to the mixing room',
    body: 'Incoming flour is dropped in the walkway because the racking is full, so the forklift has to go the long way round.',
    current_condition: 'Every trip to the mixing room takes an extra few minutes.',
    kind: 'PROCESS',
    waste: 'TRANSPORT',
    people_affected: 2,
    hours_lost_each: 1,
    happens: 'DAILY',
    department_id: 'd4',
    reporter_id: 'u4',
    status: 'NEW',
    created_at: daysAgo(17),
    last_event_at: daysAgo(17),
  },
  {
    id: 't4',
    reference: 'QA-1',
    title: 'Retort log signed but never read by anyone',
    body: 'We fill in the sheet every batch. As far as anyone knows nobody looks at it afterwards.',
    kind: 'PROCESS',
    waste: 'OVERPROCESSING',
    people_affected: 1,
    hours_lost_each: 0.5,
    happens: 'DAILY',
    department_id: 'd2',
    reporter_id: 'u5',
    status: 'VERIFYING',
    severity: 'LOW',
    tier: 'TIER_1',
    owner_id: 'u5',
    decision_maker_id: 'u3',
    triaged_at: daysAgo(20),
    created_at: daysAgo(24),
    last_event_at: daysAgo(1),
  },
  {
    id: 't5',
    reference: 'MNT-1',
    title: 'Spare belts stored in the office, not near the line',
    body: 'When a belt goes, whoever is on shift walks to the office and back to fetch one.',
    kind: 'PROCESS',
    waste: 'MOTION',
    people_affected: 1,
    hours_lost_each: 0.4,
    happens: 'WEEKLY',
    department_id: 'd3',
    reporter_id: 'u1',
    status: 'CLOSED',
    severity: 'LOW',
    tier: 'TIER_1',
    owner_id: 'u1',
    decision_maker_id: 'u3',
    triaged_at: daysAgo(40),
    closed_at: daysAgo(12),
    closed_by: 'u3',
    created_at: daysAgo(45),
    last_event_at: daysAgo(12),
  },
];

const proposals = [
  {
    id: 'p1',
    ticket_id: 't2',
    version: 1,
    author_id: 'u1',
    summary: 'Replace the sealer belt',
    actions: 'Order a new belt and swap it during Saturday downtime.',
    cost_estimate: 8500,
    effort_days: 0.5,
    status: 'CHANGES_REQUESTED',
    decision_reason:
      'The belt is not the root cause — the same belt failed in March. Please check the timing cam before we spend on parts.',
    decided_by: 'u3',
    submitted_at: daysAgo(7),
    decided_at: daysAgo(5),
    created_at: daysAgo(7),
  },
  {
    id: 'p2',
    ticket_id: 't2',
    version: 2,
    author_id: 'u1',
    summary: 'Re-time the sealing cam, then replace the belt',
    root_cause: 'The cam drifts out of time as the machine heats up through the shift.',
    actions:
      'Re-time the cam at operating temperature, run a full shift to confirm, then fit a new belt.',
    cost_estimate: 9200,
    effort_days: 1,
    status: 'SUBMITTED',
    submitted_at: daysAgo(2),
    created_at: daysAgo(2),
  },
];

const comments = [
  {
    id: 'c1',
    ticket_id: 't2',
    author_id: 'u3',
    body: 'Agreed on checking the cam first. Let us not buy parts until we know.',
    created_at: daysAgo(5),
  },
  {
    id: 'c2',
    ticket_id: 't1',
    author_id: 'u4',
    body: 'Same thing happens on the second shift.',
    created_at: daysAgo(31),
  },
];

const confirmations = [
  { id: 'k1', ticket_id: 't1', user_id: 'u2', created_at: daysAgo(30) },
  { id: 'k2', ticket_id: 't1', user_id: 'u4', created_at: daysAgo(29) },
  { id: 'k3', ticket_id: 't1', user_id: 'u5', created_at: daysAgo(28) },
  { id: 'k4', ticket_id: 't3', user_id: 'u1', created_at: daysAgo(14) },
];

const db = {
  departments,
  profiles,
  role_assignments,
  tickets,
  proposals,
  comments,
  confirmations,
  attachments: [],
  ticket_events: [],
};

/* ------------------------------------------------------------- priority --- */

const WEEKLY = { EVERY_SHIFT: 10, DAILY: 5, WEEKLY: 1, MONTHLY: 0.25, ONCE: 0 };
const SEVERITY_WEIGHT = { CRITICAL: 20, HIGH: 10, MEDIUM: 4, LOW: 0 };

/** Mirrors the ticket_priority view in schema.sql. */
function priorityOf(ticket) {
  const hours =
    (ticket.people_affected || 0) *
    (ticket.hours_lost_each || 0) *
    (WEEKLY[ticket.happens] ?? 0);

  const daysQuiet = Math.floor(
    (now - new Date(ticket.last_event_at || ticket.created_at).getTime()) / 86_400_000
  );

  const count = db.confirmations.filter((c) => c.ticket_id === ticket.id).length;

  const score =
    count * 3 +
    Math.min(daysQuiet, 60) * 0.5 +
    Math.min(hours, 40) +
    (SEVERITY_WEIGHT[ticket.severity] ?? 0) +
    (ticket.raised_before ? 8 : 0);

  return {
    id: ticket.id,
    reference: ticket.reference,
    title: ticket.title,
    department_id: ticket.department_id,
    status: ticket.status,
    severity: ticket.severity,
    waste: ticket.waste,
    confirmations: count,
    days_quiet: daysQuiet,
    hours_lost_per_week: Math.round(hours * 10) / 10,
    priority_score: Math.round(score * 10) / 10,
    created_at: ticket.created_at,
  };
}

/* -------------------------------------------------------------- joining --- */

const person = (id) => {
  const p = db.profiles.find((x) => x.id === id);
  return p ? { id: p.id, full_name: p.full_name } : null;
};

function hydrate(table, row, select = '') {
  if (table === 'tickets') {
    const out = {
      ...row,
      department: db.departments.find((d) => d.id === row.department_id) ?? null,
      reporter: person(row.reporter_id),
      owner: person(row.owner_id),
      decider: person(row.decision_maker_id),
    };
    const mine = db.proposals.filter((p) => p.ticket_id === row.id);
    // `proposals(count)` and `proposals(id,status)` are different shapes.
    out.proposals = select.includes('proposals(count)')
      ? [{ count: mine.length }]
      : mine.map((p) => ({ id: p.id, status: p.status }));
    return out;
  }
  if (table === 'proposals') return { ...row, author: person(row.author_id) };
  if (table === 'comments') return { ...row, author: person(row.author_id) };
  if (table === 'confirmations') return { ...row, author: person(row.user_id) };
  if (table === 'profiles') {
    return {
      ...row,
      department: db.departments.find((d) => d.id === row.department_id) ?? null,
    };
  }
  return { ...row };
}

/* --------------------------------------------------------- query engine --- */

let nextId = 1000;
const newId = () => `x${nextId++}`;

class DemoQuery {
  constructor(table) {
    this.table = table;
    this.selectStr = '';
    this.filters = [];
    this.orderBy = null;
    this.mode = 'select';
    this.singleMode = null;
    this.payload = null;
  }

  select(cols = '') {
    this.selectStr = cols;
    return this;
  }
  eq(col, val) {
    this.filters.push((r) => r[col] === val);
    return this;
  }
  in(col, vals) {
    this.filters.push((r) => vals.includes(r[col]));
    return this;
  }
  not(col, op, val) {
    if (op === 'in') {
      const list = String(val).replace(/[()"]/g, '').split(',');
      this.filters.push((r) => !list.includes(r[col]));
    }
    return this;
  }
  order(col, opts = {}) {
    this.orderBy = { col, asc: opts.ascending !== false };
    return this;
  }
  limit() {
    return this;
  }
  maybeSingle() {
    this.singleMode = 'maybe';
    return this;
  }
  single() {
    this.singleMode = 'one';
    return this;
  }
  insert(payload) {
    this.mode = 'insert';
    this.payload = payload;
    return this;
  }
  update(payload) {
    this.mode = 'update';
    this.payload = payload;
    return this;
  }
  delete() {
    this.mode = 'delete';
    return this;
  }

  _rows() {
    const source =
      this.table === 'ticket_priority' ? db.tickets.map(priorityOf) : db[this.table] ?? [];
    return source.filter((r) => this.filters.every((f) => f(r)));
  }

  _run() {
    if (this.mode === 'insert') {
      const rows = (Array.isArray(this.payload) ? this.payload : [this.payload]).map((r) => {
        const row = { id: newId(), created_at: new Date().toISOString(), ...r };
        if (this.table === 'tickets') {
          const dept = db.departments.find((d) => d.id === row.department_id);
          dept.ticket_counter += 1;
          row.reference = `${dept.code}-${dept.ticket_counter}`;
          row.status = 'NEW';
          row.last_event_at = row.created_at;
        }
        if (this.table === 'proposals') {
          row.version =
            Math.max(0, ...db.proposals.filter((p) => p.ticket_id === row.ticket_id).map((p) => p.version)) + 1;
        }
        db[this.table].push(row);
        return row;
      });
      const data = this.singleMode ? rows[0] : rows;
      return { data, error: null };
    }

    if (this.mode === 'update') {
      const matched = this._rows();
      matched.forEach((r) => {
        Object.assign(r, this.payload);
        r.last_event_at = new Date().toISOString();
        if (this.table === 'proposals' && this.payload.status === 'APPROVED') {
          const ticket = db.tickets.find((t) => t.id === r.ticket_id);
          if (ticket) {
            ticket.status = 'APPROVED';
            ticket.approved_proposal_id = r.id;
            ticket.last_event_at = r.last_event_at;
          }
          db.proposals
            .filter((p) => p.ticket_id === r.ticket_id && p.id !== r.id)
            .forEach((p) => {
              if (['DRAFT', 'SUBMITTED', 'CHANGES_REQUESTED'].includes(p.status)) {
                p.status = 'SUPERSEDED';
              }
            });
        }
        if (this.table === 'proposals' && this.payload.status === 'SUBMITTED') {
          const ticket = db.tickets.find((t) => t.id === r.ticket_id);
          if (ticket && ['TRIAGED', 'RETURNED', 'REOPENED'].includes(ticket.status)) {
            ticket.status = 'PROPOSING';
          }
        }
      });
      return { data: matched, error: null };
    }

    if (this.mode === 'delete') {
      const matched = this._rows();
      db[this.table] = db[this.table].filter((r) => !matched.includes(r));
      return { data: matched, error: null };
    }

    let rows = this._rows().map((r) => hydrate(this.table, r, this.selectStr));

    if (this.orderBy) {
      const { col, asc } = this.orderBy;
      rows.sort((a, b) => {
        const x = a[col] ?? '';
        const y = b[col] ?? '';
        return (x > y ? 1 : x < y ? -1 : 0) * (asc ? 1 : -1);
      });
    }

    if (this.singleMode) return { data: rows[0] ?? null, error: null };
    return { data: rows, error: null };
  }

  then(resolve) {
    resolve(this._run());
    return Promise.resolve(this._run());
  }
}

/* ----------------------------------------------------------- the client --- */

export function createDemoClient() {
  const session = {
    user: { id: DEMO_USER_ID, phone: '+639171234567' },
  };

  return {
    isDemo: true,
    from: (table) => new DemoQuery(table),
    auth: {
      getSession: async () => ({ data: { session }, error: null }),
      getUser: async () => ({ data: { user: session.user }, error: null }),
      onAuthStateChange: () => ({
        data: { subscription: { unsubscribe() {} } },
      }),
      signInWithOtp: async () => ({ data: {}, error: null }),
      verifyOtp: async () => ({ data: { user: session.user }, error: null }),
      signOut: async () => ({ error: null }),
    },
    storage: {
      from: () => ({
        upload: async () => ({ data: null, error: null }),
      }),
    },
  };
}
