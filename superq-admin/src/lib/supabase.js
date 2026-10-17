import { createClient } from '@supabase/supabase-js';
import { createDemoClient } from '@/lib/demo';

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(url && anonKey);

/**
 * With no credentials, run on seeded demo data rather than showing a dead end.
 *
 * Until a Supabase project exists there is nothing to look at, which makes the
 * board impossible to show anyone — and a decision maker cannot react to a
 * README. Demo mode means the real screens can be opened and clicked today.
 * The moment VITE_SUPABASE_URL is set, this path is never taken again.
 */
export const isDemo = !isSupabaseConfigured;

export const supabase = isSupabaseConfigured
  ? createClient(url, anonKey, {
      auth: { persistSession: true, autoRefreshToken: true },
    })
  : createDemoClient();

/**
 * Postgres raises our business rules as exceptions (see schema.sql).
 * Surface the message as-is: it is written to be read by a human on a phone.
 */
export function readableError(error) {
  if (!error) return null;
  const message = error.message || String(error);
  return message
    .replace(/^.*?ERROR:\s*/i, '')
    .replace(/\s*\(SQLSTATE.*\)$/i, '')
    .trim();
}
