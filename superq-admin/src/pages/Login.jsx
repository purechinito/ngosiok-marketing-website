import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase, readableError } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';

/**
 * Phone OTP, not email.
 *
 * Most of the 200 people who need this have no company email address. Every
 * platform that reaches 90%+ adoption on a factory floor lets people sign in
 * with something they already carry.
 */
export function Login() {
  const { session, loading } = useAuth();
  const [step, setStep] = useState('phone');
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [fullName, setFullName] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);

  if (loading) return null;
  if (session) return <Navigate to="/" replace />;

  const normalised = (value) => {
    const digits = value.replace(/[^\d+]/g, '');
    if (digits.startsWith('+')) return digits;
    if (digits.startsWith('0')) return `+63${digits.slice(1)}`;
    if (digits.startsWith('63')) return `+${digits}`;
    return `+63${digits}`;
  };

  const sendCode = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const { error: err } = await supabase.auth.signInWithOtp({ phone: normalised(phone) });
    setBusy(false);
    if (err) return setError(readableError(err));
    setStep('code');
  };

  const verify = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const { data, error: err } = await supabase.auth.verifyOtp({
      phone: normalised(phone),
      token: code,
      type: 'sms',
    });
    if (err) {
      setBusy(false);
      return setError(readableError(err));
    }

    // First sign-in: create the profile row so the person has a name on the board.
    const userId = data.user?.id;
    if (userId) {
      const { data: existing } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', userId)
        .maybeSingle();

      if (!existing) {
        await supabase.from('profiles').insert({
          id: userId,
          full_name: fullName.trim() || 'New teammate',
          phone: normalised(phone),
        });
      }
    }
    setBusy(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-sm">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold tracking-tight">Super Q Problem Board</h1>
          <p className="mt-2 text-sm text-slate-600">
            Post a problem. Propose a fix. Get a decision.
          </p>
        </div>

        <div className="card">
          {step === 'phone' ? (
            <form onSubmit={sendCode} className="space-y-4">
              <div>
                <label className="label" htmlFor="name">
                  Your name
                </label>
                <input
                  id="name"
                  className="field"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Juan dela Cruz"
                  autoComplete="name"
                />
                <p className="hint">Only needed the first time you sign in.</p>
              </div>
              <div>
                <label className="label" htmlFor="phone">
                  Mobile number
                </label>
                <input
                  id="phone"
                  className="field"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0917 123 4567"
                  inputMode="tel"
                  autoComplete="tel"
                  required
                />
              </div>
              <button className="btn-primary w-full" disabled={busy || !phone}>
                {busy ? 'Sending…' : 'Send me a code'}
              </button>
            </form>
          ) : (
            <form onSubmit={verify} className="space-y-4">
              <div>
                <label className="label" htmlFor="code">
                  6-digit code
                </label>
                <input
                  id="code"
                  className="field text-center text-2xl tracking-[0.4em]"
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  placeholder="······"
                  required
                />
                <p className="hint">Sent to {normalised(phone)}</p>
              </div>
              <button className="btn-primary w-full" disabled={busy || code.length < 6}>
                {busy ? 'Checking…' : 'Sign in'}
              </button>
              <button
                type="button"
                className="btn-secondary w-full"
                onClick={() => {
                  setStep('phone');
                  setCode('');
                  setError(null);
                }}
              >
                Use a different number
              </button>
            </form>
          )}

          {error && (
            <p className="mt-4 rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</p>
          )}
        </div>

        <p className="mt-6 text-center text-xs text-slate-500">
          This board is for process problems. Concerns about a person go to HR.
        </p>
      </div>
    </div>
  );
}
