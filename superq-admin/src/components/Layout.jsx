import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Inbox, Plus, ClipboardList, Gavel, LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

function Tab({ to, icon: Icon, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex flex-1 flex-col items-center gap-1 py-2 text-[11px] font-medium transition-colors ${
          isActive ? 'text-brand-600' : 'text-slate-500'
        }`
      }
    >
      <Icon size={20} />
      {label}
    </NavLink>
  );
}

export function Layout() {
  const { profile, signOut, leadOf, isDecisionMaker } = useAuth();
  const navigate = useNavigate();

  const showInbox = leadOf.length > 0 || isDecisionMaker;

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
          <div>
            <p className="text-sm font-bold tracking-tight">Super Q · Problem Board</p>
            <p className="text-xs text-slate-500">
              {profile?.full_name}
              {profile?.department?.name ? ` · ${profile.department.name}` : ''}
            </p>
          </div>
          <button
            type="button"
            onClick={async () => {
              await signOut();
              navigate('/login');
            }}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
            aria-label="Sign out"
          >
            <LogOut size={18} />
          </button>
        </div>
      </header>

      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-5 pb-24">
        <Outlet />
      </main>

      <nav className="fixed inset-x-0 bottom-0 z-10 border-t border-slate-200 bg-white pb-[env(safe-area-inset-bottom)]">
        <div className="mx-auto flex max-w-3xl">
          <Tab to="/" icon={ClipboardList} label="Board" />
          <Tab to="/report" icon={Plus} label="Report" />
          {showInbox && <Tab to="/triage" icon={Inbox} label="Triage" />}
          {isDecisionMaker && <Tab to="/decide" icon={Gavel} label="Decide" />}
        </div>
      </nav>
    </div>
  );
}
