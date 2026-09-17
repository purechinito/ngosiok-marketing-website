import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// HashRouter, not BrowserRouter, on purpose.
//
// This is served as plain static files from the same Apache that runs the ERP,
// at whatever path it ends up mounted on. Hash routing needs no rewrite rules,
// no .htaccess, and no knowledge of the mount path — so a deep link like
// /problems/#/t/PRD-1 cannot 404 because a server directive was missed.
import { HashRouter } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import { isSupabaseConfigured } from '@/lib/supabase';
import App from '@/App';
import './index.css';

function SetupNeeded() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="card max-w-md">
        <h1 className="text-lg font-bold">Almost there</h1>
        <p className="mt-2 text-sm text-slate-600">
          This build has no Supabase credentials, so it cannot reach the database yet.
        </p>
        <ol className="mt-4 list-decimal space-y-1 pl-5 text-sm text-slate-700">
          <li>
            Copy <code className="rounded bg-slate-100 px-1">.env.example</code> to{' '}
            <code className="rounded bg-slate-100 px-1">.env.local</code>
          </li>
          <li>
            Fill in <code className="rounded bg-slate-100 px-1">VITE_SUPABASE_URL</code> and{' '}
            <code className="rounded bg-slate-100 px-1">VITE_SUPABASE_ANON_KEY</code>
          </li>
          <li>Restart the dev server</li>
        </ol>
        <p className="mt-4 text-xs text-slate-500">
          On Vercel, set the same two variables in Project Settings → Environment Variables.
        </p>
      </div>
    </div>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {isSupabaseConfigured ? (
      <HashRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </HashRouter>
    ) : (
      <SetupNeeded />
    )}
  </StrictMode>
);
