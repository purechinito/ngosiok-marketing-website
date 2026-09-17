export const TICKET_STATUS = {
  NEW: { label: 'New', tone: 'bg-slate-100 text-slate-700', hint: 'Waiting for triage' },
  TRIAGED: { label: 'Triaged', tone: 'bg-blue-100 text-blue-700', hint: 'Owner and decision maker assigned' },
  RETURNED: { label: 'Needs more info', tone: 'bg-amber-100 text-amber-800', hint: 'Sent back with coaching' },
  DECLINED: { label: 'Declined', tone: 'bg-slate-200 text-slate-600', hint: 'Not proceeding' },
  PROPOSING: { label: 'Proposing', tone: 'bg-violet-100 text-violet-700', hint: 'Solutions in review' },
  APPROVED: { label: 'Approved', tone: 'bg-emerald-100 text-emerald-700', hint: 'Go signal given' },
  IN_PROGRESS: { label: 'In progress', tone: 'bg-cyan-100 text-cyan-700', hint: 'Being implemented' },
  VERIFYING: { label: 'Verifying', tone: 'bg-orange-100 text-orange-700', hint: 'Checking it actually worked' },
  CLOSED: { label: 'Closed', tone: 'bg-green-100 text-green-800', hint: 'Verified and signed off' },
  REOPENED: { label: 'Reopened', tone: 'bg-rose-100 text-rose-700', hint: 'Verification failed' },
};

export const PROPOSAL_STATUS = {
  DRAFT: { label: 'Draft', tone: 'bg-slate-100 text-slate-600' },
  SUBMITTED: { label: 'Awaiting decision', tone: 'bg-blue-100 text-blue-700' },
  CHANGES_REQUESTED: { label: 'Changes requested', tone: 'bg-amber-100 text-amber-800' },
  APPROVED: { label: 'Approved — go', tone: 'bg-emerald-100 text-emerald-700' },
  REJECTED: { label: 'Rejected', tone: 'bg-rose-100 text-rose-700' },
  SUPERSEDED: { label: 'Superseded', tone: 'bg-slate-100 text-slate-500' },
};

export const PROBLEM_KINDS = [
  { value: 'PROCESS', label: 'Process / way of working' },
  { value: 'EQUIPMENT', label: 'Equipment / machine' },
  { value: 'QUALITY', label: 'Product quality' },
  { value: 'SAFETY', label: 'Safety' },
  { value: 'SUPPLY', label: 'Materials / supply' },
  { value: 'OTHER', label: 'Something else' },
];

export const SEVERITIES = [
  { value: 'LOW', label: 'Low' },
  { value: 'MEDIUM', label: 'Medium' },
  { value: 'HIGH', label: 'High' },
  { value: 'CRITICAL', label: 'Critical' },
];

/**
 * Decision tiers exist so one executive never becomes the bottleneck.
 * If the Tier 3 queue is over ~10 items, the tiers are set wrong — not the people.
 */
export const TIERS = [
  { value: 'TIER_1', label: 'Tier 1 — cheap and reversible', hint: 'Department lead decides' },
  { value: 'TIER_2', label: 'Tier 2 — costly or cross-department', hint: 'Department head decides' },
  { value: 'TIER_3', label: 'Tier 3 — one-way door', hint: 'Capex, food safety, legal → exec decides' },
];

/** Target: first human response inside 48 hours. */
export const FIRST_RESPONSE_SLA_HOURS = 48;

/**
 * After two rounds of changes-requested, the loop should leave the software
 * and become a 15-minute live huddle. That is design, not failure.
 */
export const MAX_PROPOSAL_ROUNDS_BEFORE_HUDDLE = 2;
