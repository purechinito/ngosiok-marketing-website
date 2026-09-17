import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadProfile = useCallback(async (userId) => {
    if (!userId) {
      setProfile(null);
      setRoles([]);
      return;
    }
    const [{ data: p }, { data: r }] = await Promise.all([
      supabase.from('profiles').select('*, department:departments(*)').eq('id', userId).maybeSingle(),
      supabase.from('role_assignments').select('role, department_id').eq('user_id', userId),
    ]);
    setProfile(p ?? null);
    setRoles(r ?? []);
  }, []);

  useEffect(() => {
    let active = true;

    supabase.auth.getSession().then(async ({ data }) => {
      if (!active) return;
      setSession(data.session);
      await loadProfile(data.session?.user?.id);
      setLoading(false);
    });

    const { data: sub } = supabase.auth.onAuthStateChange(async (_event, next) => {
      if (!active) return;
      setSession(next);
      await loadProfile(next?.user?.id);
      setLoading(false);
    });

    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, [loadProfile]);

  const value = useMemo(() => {
    const hasRole = (role, departmentId) =>
      roles.some(
        (r) => r.role === role && (r.department_id === null || r.department_id === departmentId)
      );

    return {
      session,
      user: session?.user ?? null,
      profile,
      roles,
      loading,
      hasRole,
      isAdmin: roles.some((r) => r.role === 'ADMIN'),
      /** Departments where this person triages. */
      leadOf: roles.filter((r) => r.role === 'DEPT_LEAD').map((r) => r.department_id),
      /** Departments where this person gives the go signal. */
      decidesFor: roles.filter((r) => r.role === 'DECISION_MAKER').map((r) => r.department_id),
      isDecisionMaker: roles.some((r) => r.role === 'DECISION_MAKER'),
      refresh: () => loadProfile(session?.user?.id),
      signOut: () => supabase.auth.signOut(),
    };
  }, [session, profile, roles, loading, loadProfile]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
