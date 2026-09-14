import { createClient } from '@supabase/supabase-js';

/**
 * Supabase browser client.
 *
 * Both values are safe to expose - the anon key is designed to be public, and
 * every table is protected by row level security (see
 * supabase/migrations/0001_feedback.sql). Never put the service_role key in
 * here: it bypasses RLS entirely and would be readable in the bundle.
 */
const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(url && anonKey);

if (!isSupabaseConfigured && import.meta.env.DEV) {
  console.warn(
    'Supabase is not configured. Copy .env.example to .env.local and fill in ' +
      'VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY. The feedback form will ' +
      'show a configuration notice until you do.'
  );
}

export const supabase = isSupabaseConfigured
  ? createClient(url, anonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    })
  : null;

export const FEEDBACK_BUCKET = 'feedback-photos';
