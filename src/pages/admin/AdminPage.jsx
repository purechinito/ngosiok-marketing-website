import { useEffect, useState } from 'react';
import { Loader2, AlertTriangle } from 'lucide-react';

import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { Seo } from '@/components/common/Seo';
import { AdminLogin } from '@/pages/admin/AdminLogin';
import { AdminDashboard } from '@/pages/admin/AdminDashboard';

/**
 * Admin entry point.
 *
 * Note that this gate is convenience, not security: anyone can read the
 * bundle and call Supabase directly. The real protection is row level
 * security - see supabase/migrations/0001_feedback.sql. A non-admin who
 * bypassed this screen would still get zero rows back.
 */
export const AdminPage = () => {
  const [session, setSession] = useState(null);
  // Seeded from config so the effect never has to setState synchronously
  // on its first run (which triggers a cascading render).
  const [checking, setChecking] = useState(isSupabaseConfigured);

  useEffect(() => {
    if (!isSupabaseConfigured) return undefined;

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setChecking(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  return (
    <>
      {/* Never index the admin area, and keep it out of sitemap.xml. */}
      <Seo
        title="Admin"
        description="Internal feedback dashboard."
        noindex
        canonical=""
      />
      {!isSupabaseConfigured ? (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
          <div className="max-w-md text-center">
            <div className="mx-auto w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center mb-5">
              <AlertTriangle className="w-6 h-6 text-amber-600" />
            </div>
            <h1 className="text-xl font-bold font-heading text-gray-900 mb-3">
              Supabase is not configured
            </h1>
            <p className="text-sm text-gray-600 leading-relaxed">
              Set <code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded">VITE_SUPABASE_URL</code>{' '}
              and{' '}
              <code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded">
                VITE_SUPABASE_ANON_KEY
              </code>{' '}
              in your environment, then redeploy. See{' '}
              <code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded">docs/FEEDBACK-SETUP.md</code>.
            </p>
          </div>
        </div>
      ) : checking ? (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
        </div>
      ) : session ? (
        <AdminDashboard session={session} />
      ) : (
        <AdminLogin />
      )}
    </>
  );
};
