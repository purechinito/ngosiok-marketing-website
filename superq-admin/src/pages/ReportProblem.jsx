import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, X } from 'lucide-react';
import { supabase, readableError } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';
import { PROBLEM_KINDS } from '@/lib/constants';

/**
 * The Toyota submission gate.
 *
 * A valid report states the problem AND the current condition. Asking for both
 * at intake is what lifted Toyota's implementation rate above 90% — it turns a
 * complaint into something a person can actually act on. The "what would fix
 * it?" field is optional on purpose: it seeds the first proposal without
 * blocking someone who only knows that something is wrong.
 */
export function ReportProblem() {
  const { profile } = useAuth();
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);
  const [photo, setPhoto] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    title: '',
    body: '',
    current_condition: '',
    suggested_fix: '',
    kind: 'PROCESS',
    department_id: '',
  });

  useEffect(() => {
    supabase
      .from('departments')
      .select('*')
      .eq('is_active', true)
      .order('name')
      .then(({ data }) => {
        setDepartments(data ?? []);
        setForm((f) => ({
          ...f,
          department_id: f.department_id || profile?.department_id || data?.[0]?.id || '',
        }));
      });
  }, [profile?.department_id]);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError(null);

    const { data, error: err } = await supabase
      .from('tickets')
      .insert({ ...form, reporter_id: profile.id, reference: 'pending' })
      .select('id, reference')
      .single();

    if (err) {
      setBusy(false);
      return setError(readableError(err));
    }

    if (photo) {
      const path = `${data.id}/${Date.now()}-${photo.name}`;
      const { error: upErr } = await supabase.storage
        .from('ticket-photos')
        .upload(path, photo, { upsert: false });

      if (!upErr) {
        await supabase.from('attachments').insert({
          ticket_id: data.id,
          uploader_id: profile.id,
          storage_path: path,
          mime_type: photo.type,
        });
      }
    }

    setBusy(false);
    navigate(`/t/${data.reference}`);
  };

  return (
    <div>
      <h1 className="text-xl font-bold tracking-tight">Report a problem</h1>
      <p className="mt-1 text-sm text-slate-600">
        Nothing here is a complaint about a person. This is about how the work runs.
      </p>

      <form onSubmit={submit} className="mt-5 space-y-5">
        <div className="card space-y-4">
          <div>
            <label className="label" htmlFor="title">
              What is the problem? <span className="text-rose-500">*</span>
            </label>
            <input
              id="title"
              className="field"
              value={form.title}
              onChange={set('title')}
              placeholder="Sealer on Line 2 keeps skipping"
              maxLength={120}
              required
            />
          </div>

          <div>
            <label className="label" htmlFor="body">
              Tell us more <span className="text-rose-500">*</span>
            </label>
            <textarea
              id="body"
              className="field"
              rows={3}
              value={form.body}
              onChange={set('body')}
              placeholder="What happened, when, and how often?"
              required
            />
          </div>

          <div>
            <label className="label" htmlFor="current">
              What happens today because of it?
            </label>
            <textarea
              id="current"
              className="field"
              rows={2}
              value={form.current_condition}
              onChange={set('current_condition')}
              placeholder="We stop the line about 10 minutes every shift to re-run the packs."
            />
            <p className="hint">
              This one field is what turns a complaint into something we can act on.
            </p>
          </div>
        </div>

        <div className="card space-y-4">
          <div>
            <label className="label" htmlFor="dept">
              Which department owns this?
            </label>
            <select id="dept" className="field" value={form.department_id} onChange={set('department_id')} required>
              {departments.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="label" htmlFor="kind">
              Type
            </label>
            <select id="kind" className="field" value={form.kind} onChange={set('kind')}>
              {PROBLEM_KINDS.map((k) => (
                <option key={k.value} value={k.value}>
                  {k.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="label" htmlFor="fix">
              What do you think would fix it? <span className="font-normal text-slate-400">(optional)</span>
            </label>
            <textarea
              id="fix"
              className="field"
              rows={2}
              value={form.suggested_fix}
              onChange={set('fix')}
              placeholder="Even a rough idea helps."
            />
          </div>

          <div>
            <span className="label">Photo</span>
            {photo ? (
              <div className="flex items-center gap-3 rounded-lg border border-slate-200 p-2">
                <img
                  src={URL.createObjectURL(photo)}
                  alt=""
                  className="h-16 w-16 rounded object-cover"
                />
                <span className="flex-1 truncate text-sm text-slate-600">{photo.name}</span>
                <button
                  type="button"
                  onClick={() => setPhoto(null)}
                  className="rounded p-2 text-slate-400 hover:bg-slate-100"
                  aria-label="Remove photo"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <label className="btn-secondary w-full cursor-pointer">
                <Camera size={18} />
                Take or choose a photo
                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  className="hidden"
                  onChange={(e) => setPhoto(e.target.files?.[0] ?? null)}
                />
              </label>
            )}
            <p className="hint">On the floor, a photo beats three paragraphs.</p>
          </div>
        </div>

        {error && <p className="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</p>}

        <button className="btn-primary w-full" disabled={busy}>
          {busy ? 'Posting…' : 'Post problem'}
        </button>
        <p className="pb-2 text-center text-xs text-slate-500">
          Someone will respond within 48 hours. You will see every step.
        </p>
      </form>
    </div>
  );
}
