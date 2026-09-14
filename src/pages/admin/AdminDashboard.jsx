import { useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';
import { Inbox, LogOut, RefreshCw, Search, ShieldAlert, Loader2 } from 'lucide-react';

import { supabase } from '@/lib/supabase';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FeedbackCard } from '@/pages/admin/FeedbackCard';
import { FEEDBACK_KINDS, FEEDBACK_STATUSES } from '@/data/feedback-options';

const PAGE_SIZE = 50;

export const AdminDashboard = ({ session }) => {
  const [entries, setEntries] = useState([]);
  const [forbidden, setForbidden] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [kindFilter, setKindFilter] = useState('all');
  const [query, setQuery] = useState('');

  // Bumping this re-runs the fetch. Driving reloads through a key rather than
  // calling an async loader directly keeps the effect free of synchronous
  // setState, and the `cancelled` flag means a slow first response can never
  // land on top of a newer one.
  const [refreshKey, setRefreshKey] = useState(0);
  const reload = useCallback(() => setRefreshKey((key) => key + 1), []);

  // `loading` is derived rather than stored: we are loading whenever the fetch
  // that finished is older than the one we asked for. Starting at -1 means the
  // first render is already "loading" without the effect setting any state
  // synchronously.
  const [loadedKey, setLoadedKey] = useState(-1);
  const loading = loadedKey !== refreshKey;

  useEffect(() => {
    let cancelled = false;

    supabase
      .from('feedback')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(PAGE_SIZE)
      .then(({ data, error }) => {
        if (cancelled) return;
        setLoadedKey(refreshKey);
        if (error) {
          // RLS returns no rows rather than an error for a non-admin, but an
          // explicit permission error can still surface here.
          toast.error('Could not load reports', { description: error.message });
          return;
        }
        setEntries(data ?? []);
      });

    return () => {
      cancelled = true;
    };
  }, [refreshKey]);

  // A signed-in user who is not in admin_users sees an empty list because RLS
  // filters every row. Check membership directly so we can say so plainly
  // instead of showing a misleading "no reports yet".
  useEffect(() => {
    let cancelled = false;
    supabase
      .from('admin_users')
      .select('user_id')
      .eq('user_id', session.user.id)
      .maybeSingle()
      .then(({ data }) => {
        if (!cancelled) setForbidden(!data);
      });
    return () => {
      cancelled = true;
    };
  }, [session.user.id]);

  const counts = useMemo(() => {
    const base = { all: entries.length };
    for (const status of FEEDBACK_STATUSES) {
      base[status.value] = entries.filter((entry) => entry.status === status.value).length;
    }
    return base;
  }, [entries]);

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return entries.filter((entry) => {
      if (statusFilter !== 'all' && entry.status !== statusFilter) return false;
      if (kindFilter !== 'all' && entry.kind !== kindFilter) return false;
      if (!needle) return true;
      return [entry.message, entry.name, entry.email, entry.product, entry.store, entry.location]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(needle));
    });
  }, [entries, statusFilter, kindFilter, query]);

  const handleChange = (updated) =>
    setEntries((current) => current.map((entry) => (entry.id === updated.id ? updated : entry)));

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  if (forbidden) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <div className="mx-auto w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center mb-5">
            <ShieldAlert className="w-6 h-6 text-amber-600" />
          </div>
          <h1 className="text-xl font-bold font-heading text-gray-900 mb-3">
            This account is not an admin
          </h1>
          <p className="text-sm text-gray-600 leading-relaxed mb-6">
            You are signed in as <strong>{session.user.email}</strong>, but this account is not in
            the admin allowlist, so it cannot read reports. Add it to{' '}
            <code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded">public.admin_users</code>{' '}
            in Supabase.
          </p>
          <Button variant="outline" onClick={signOut}>
            <LogOut className="h-4 w-4" />
            Sign out
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-4">
          <div className="min-w-0">
            <h1 className="font-heading font-bold text-gray-900 leading-tight">Feedback</h1>
            <p className="text-xs text-gray-500 truncate">{session.user.email}</p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={reload} aria-label="Refresh" disabled={loading}>
              <RefreshCw className={cn('h-4 w-4', loading && 'animate-spin')} />
            </Button>
            <Button variant="outline" size="sm" onClick={signOut}>
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Sign out</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-5">
        {/* Status filters double as the at-a-glance counts */}
        <div className="flex flex-wrap gap-2">
          {[{ value: 'all', label: 'All' }, ...FEEDBACK_STATUSES].map((status) => (
            <button
              key={status.value}
              type="button"
              onClick={() => setStatusFilter(status.value)}
              className={cn(
                'px-3.5 py-2 rounded-lg text-sm font-semibold border transition-colors',
                statusFilter === status.value
                  ? 'bg-primary-600 border-primary-600 text-white'
                  : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
              )}
            >
              {status.label}
              <span
                className={cn(
                  'ml-2 text-xs',
                  statusFilter === status.value ? 'text-white/70' : 'text-gray-400'
                )}
              >
                {counts[status.value] ?? 0}
              </span>
            </button>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search messages, stores, cities, emails..."
              className="pl-9"
            />
          </div>
          <select
            value={kindFilter}
            onChange={(event) => setKindFilter(event.target.value)}
            className="h-10 rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-900 shadow-sm focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 sm:w-56"
          >
            <option value="all">All types</option>
            {FEEDBACK_KINDS.map((kind) => (
              <option key={kind.value} value={kind.value}>
                {kind.label}
              </option>
            ))}
          </select>
        </div>

        {loading ? (
          <div className="flex items-center justify-center gap-3 py-20 text-gray-500">
            <Loader2 className="h-5 w-5 animate-spin" />
            Loading reports...
          </div>
        ) : visible.length === 0 ? (
          <div className="text-center py-20">
            <Inbox className="h-10 w-10 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-900 font-semibold mb-1">
              {entries.length === 0 ? 'No reports yet' : 'Nothing matches those filters'}
            </p>
            <p className="text-sm text-gray-500">
              {entries.length === 0
                ? 'Submissions from the feedback form will appear here.'
                : 'Try clearing the search or switching the status filter.'}
            </p>
          </div>
        ) : (
          <>
            <p className="text-sm text-gray-500">
              Showing {visible.length} of {entries.length}
              {entries.length === PAGE_SIZE && ` (most recent ${PAGE_SIZE})`}
            </p>
            <div className="space-y-4">
              {visible.map((entry) => (
                <FeedbackCard key={entry.id} entry={entry} onChange={handleChange} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
