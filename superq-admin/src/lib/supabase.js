import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

/**
 * A missing key should say so out loud. A white screen with nothing in it is
 * how a working build gets mistaken for a broken one.
 */
export const isSupabaseConfigured = Boolean(url && anonKey);

export const supabase = createClient(
  url || 'https://not-configured.supabase.co',
  anonKey || 'not-configured',
  { auth: { persistSession: true, autoRefreshToken: true } }
);

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
