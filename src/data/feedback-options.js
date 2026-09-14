/**
 * Shared taxonomy for the feedback feature, used by the public form and the
 * admin dashboard.
 *
 * Both lists must stay in sync with the `kind` and `status` check constraints
 * in supabase/migrations/0001_feedback.sql - adding a value here without a
 * matching migration will make writes fail.
 *
 * These live in a plain data module rather than beside a component so that
 * neither bundle drags in the other, and so Fast Refresh stays intact.
 */

export const FEEDBACK_KINDS = [
  { value: 'stock_out', label: "Can't find it in stores" },
  { value: 'product_quality', label: 'Product quality issue' },
  { value: 'packaging', label: 'Packaging problem' },
  { value: 'where_to_buy', label: 'Where to buy question' },
  { value: 'distributor', label: 'Distributor / bulk enquiry' },
  { value: 'other', label: 'Something else' },
];

export const FEEDBACK_STATUSES = [
  { value: 'new', label: 'New', variant: 'default' },
  { value: 'in_review', label: 'In review', variant: 'warning' },
  { value: 'resolved', label: 'Resolved', variant: 'success' },
  { value: 'spam', label: 'Spam', variant: 'neutral' },
];
