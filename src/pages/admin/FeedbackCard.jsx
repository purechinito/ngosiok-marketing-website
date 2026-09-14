import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import {
  Mail, MapPin, Package, Store, User, ImageOff, Loader2, Save,
} from 'lucide-react';

import { supabase, FEEDBACK_BUCKET } from '@/lib/supabase';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { FEEDBACK_KINDS, FEEDBACK_STATUSES } from '@/data/feedback-options';

const kindLabel = (value) =>
  FEEDBACK_KINDS.find((kind) => kind.value === value)?.label ?? value;

const statusMeta = (value) => FEEDBACK_STATUSES.find((s) => s.value === value) ?? FEEDBACK_STATUSES[0];

const formatDate = (iso) =>
  new Date(iso).toLocaleString(undefined, {
    year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
  });

const Detail = (props) =>
  props.children ? (
    <span className="inline-flex items-center gap-1.5 text-sm text-gray-600">
      <props.icon className="h-3.5 w-3.5 text-gray-400 shrink-0" />
      {props.children}
    </span>
  ) : null;

export const FeedbackCard = ({ entry, onChange }) => {
  const [photoUrl, setPhotoUrl] = useState(null);
  const [photoFailed, setPhotoFailed] = useState(false);
  const [notes, setNotes] = useState(entry.admin_notes ?? '');
  const [savingNotes, setSavingNotes] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  // The bucket is private, so images are fetched through a short-lived signed
  // URL rather than a public link.
  useEffect(() => {
    let cancelled = false;
    if (!entry.photo_path) return undefined;

    supabase.storage
      .from(FEEDBACK_BUCKET)
      .createSignedUrl(entry.photo_path, 3600)
      .then(({ data, error }) => {
        if (cancelled) return;
        if (error || !data?.signedUrl) setPhotoFailed(true);
        else setPhotoUrl(data.signedUrl);
      });

    return () => {
      cancelled = true;
    };
  }, [entry.photo_path]);

  const updateStatus = async (status) => {
    setUpdatingStatus(true);
    const { error } = await supabase.from('feedback').update({ status }).eq('id', entry.id);
    setUpdatingStatus(false);

    if (error) {
      toast.error('Could not update status', { description: error.message });
      return;
    }
    onChange({ ...entry, status });
    toast.success(`Marked as ${statusMeta(status).label.toLowerCase()}`);
  };

  const saveNotes = async () => {
    setSavingNotes(true);
    const value = notes.trim() === '' ? null : notes.trim();
    const { error } = await supabase.from('feedback').update({ admin_notes: value }).eq('id', entry.id);
    setSavingNotes(false);

    if (error) {
      toast.error('Could not save notes', { description: error.message });
      return;
    }
    onChange({ ...entry, admin_notes: value });
    toast.success('Notes saved');
  };

  const notesDirty = (entry.admin_notes ?? '') !== notes;
  const meta = statusMeta(entry.status);

  return (
    <article className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <Badge variant={meta.variant}>{meta.label}</Badge>
          <Badge variant="outline">{kindLabel(entry.kind)}</Badge>
          <span className="text-xs text-gray-400 ml-auto">{formatDate(entry.created_at)}</span>
        </div>

        <p className="text-gray-900 leading-relaxed whitespace-pre-wrap break-words mb-4">
          {entry.message}
        </p>

        {(entry.product || entry.store || entry.location || entry.name || entry.email) && (
          <div className="flex flex-wrap gap-x-5 gap-y-2 mb-4 pb-4 border-b border-gray-100">
            <Detail icon={Package}>{entry.product}</Detail>
            <Detail icon={Store}>{entry.store}</Detail>
            <Detail icon={MapPin}>{entry.location}</Detail>
            <Detail icon={User}>{entry.name}</Detail>
            {entry.email && (
              <a
                href={`mailto:${entry.email}`}
                className="inline-flex items-center gap-1.5 text-sm text-primary-600 hover:underline"
              >
                <Mail className="h-3.5 w-3.5 shrink-0" />
                {entry.email}
              </a>
            )}
          </div>
        )}

        {entry.photo_path && (
          <div className="mb-4">
            {photoUrl ? (
              <a href={photoUrl} target="_blank" rel="noopener noreferrer">
                <img
                  src={photoUrl}
                  alt="Attached by the reporter"
                  loading="lazy"
                  className="h-44 w-auto max-w-full rounded-xl border border-gray-200 object-cover hover:opacity-90 transition-opacity"
                />
              </a>
            ) : photoFailed ? (
              <span className="inline-flex items-center gap-2 text-sm text-gray-400">
                <ImageOff className="h-4 w-4" />
                Photo could not be loaded
              </span>
            ) : (
              <span className="inline-flex items-center gap-2 text-sm text-gray-400">
                <Loader2 className="h-4 w-4 animate-spin" />
                Loading photo...
              </span>
            )}
          </div>
        )}

        <div className="flex flex-col sm:flex-row sm:items-end gap-3">
          <div className="sm:w-48">
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">Status</label>
            <Select value={entry.status} onValueChange={updateStatus} disabled={updatingStatus}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {FEEDBACK_STATUSES.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1">
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">
              Internal notes
            </label>
            <Textarea
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              placeholder="Not visible to the reporter."
              className="min-h-[42px] h-[42px] py-2 resize-y"
            />
          </div>

          {notesDirty && (
            <Button variant="outline" onClick={saveNotes} disabled={savingNotes}>
              {savingNotes ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              Save
            </Button>
          )}
        </div>
      </div>
    </article>
  );
};
