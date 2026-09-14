import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { ImagePlus, Loader2, Send, X, CheckCircle2 } from 'lucide-react';

import { supabase, isSupabaseConfigured, FEEDBACK_BUCKET } from '@/lib/supabase';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage,
} from '@/components/ui/form';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { FEEDBACK_KINDS } from '@/data/feedback-options';

const MAX_PHOTO_BYTES = 5 * 1024 * 1024; // matches the bucket's file_size_limit
const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/heic'];

const schema = z.object({
  kind: z.enum(FEEDBACK_KINDS.map((k) => k.value), {
    message: 'Please choose what this is about.',
  }),
  message: z
    .string()
    .trim()
    .min(5, 'Please tell us a little more - at least 5 characters.')
    .max(2000, 'Please keep it under 2000 characters.'),
  // Optional fields: a shopper reporting an empty shelf should not be forced
  // to hand over their identity. Empty strings are normalised to null on send.
  name: z.string().trim().max(120, 'That name is too long.').optional().or(z.literal('')),
  email: z
    .string()
    .trim()
    .max(200)
    .email('That does not look like an email address.')
    .optional()
    .or(z.literal('')),
  product: z.string().trim().max(160).optional().or(z.literal('')),
  store: z.string().trim().max(200).optional().or(z.literal('')),
  location: z.string().trim().max(200).optional().or(z.literal('')),
});

const blankToNull = (value) => {
  const trimmed = (value ?? '').trim();
  return trimmed === '' ? null : trimmed;
};

export const FeedbackForm = () => {
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef(null);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      kind: 'stock_out',
      message: '',
      name: '',
      email: '',
      product: '',
      store: '',
      location: '',
    },
  });

  const kind = form.watch('kind');
  const isStockOut = kind === 'stock_out' || kind === 'where_to_buy';

  const clearPhoto = () => {
    if (photoPreview) URL.revokeObjectURL(photoPreview);
    setPhoto(null);
    setPhotoPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!ACCEPTED_TYPES.includes(file.type)) {
      toast.error('That file type is not supported', {
        description: 'Please attach a JPG, PNG, WEBP or HEIC image.',
      });
      event.target.value = '';
      return;
    }

    if (file.size > MAX_PHOTO_BYTES) {
      toast.error('That photo is too large', {
        description: `Maximum size is 5 MB - yours is ${(file.size / 1024 / 1024).toFixed(1)} MB.`,
      });
      event.target.value = '';
      return;
    }

    if (photoPreview) URL.revokeObjectURL(photoPreview);
    setPhoto(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const onSubmit = async (values) => {
    if (!isSupabaseConfigured) {
      toast.error('The form is not connected yet', {
        description: 'Supabase credentials are missing. Please try again later.',
      });
      return;
    }

    let photoPath = null;

    try {
      // Upload first. If the photo fails we stop here rather than saving a
      // report that references an image which was never stored.
      if (photo) {
        const extension = photo.name.split('.').pop()?.toLowerCase() || 'jpg';
        const objectPath = `${new Date().getFullYear()}/${crypto.randomUUID()}.${extension}`;

        const { error: uploadError } = await supabase.storage
          .from(FEEDBACK_BUCKET)
          .upload(objectPath, photo, { contentType: photo.type, upsert: false });

        if (uploadError) throw uploadError;
        photoPath = objectPath;
      }

      const { error } = await supabase.from('feedback').insert({
        kind: values.kind,
        message: values.message.trim(),
        name: blankToNull(values.name),
        email: blankToNull(values.email),
        product: blankToNull(values.product),
        store: blankToNull(values.store),
        location: blankToNull(values.location),
        photo_path: photoPath,
        status: 'new',
      });

      if (error) throw error;

      toast.success('Thank you - we got it', {
        description: 'Your report is with our team in Cebu.',
      });
      form.reset();
      clearPhoto();
      setSubmitted(true);
    } catch (error) {
      // Surface something actionable without leaking internals to the visitor.
      console.error('Feedback submission failed:', error);
      toast.error('We could not send that', {
        description:
          error?.message?.includes('Failed to fetch') || error?.message?.includes('NetworkError')
            ? 'Please check your connection and try again.'
            : 'Something went wrong on our side. Please try again in a moment.',
      });
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-12 px-6">
        <div className="mx-auto w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center mb-6">
          <CheckCircle2 className="w-8 h-8 text-emerald-600" />
        </div>
        <h2 className="text-2xl font-bold font-heading text-gray-900 mb-3">Report received</h2>
        <p className="text-gray-600 max-w-md mx-auto mb-8 leading-relaxed">
          Thank you for telling us. Reports like yours are how we find out where Super Q is
          running short before our distributors do.
        </p>
        <Button variant="outline" onClick={() => setSubmitted(false)}>
          Send another report
        </Button>
      </div>
    );
  }

  const { isSubmitting } = form.formState;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" noValidate>
        <FormField
          control={form.control}
          name="kind"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What is this about?</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose one" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {FEEDBACK_KINDS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us what happened. For example: the 500 g Golden Bihon has been out of stock at my usual shop for three weeks."
                  {...field}
                />
              </FormControl>
              <FormDescription>
                {field.value?.length || 0} / 2000 characters
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Shown for the report kinds where location genuinely helps us act. */}
        {isStockOut && (
          <div className="grid sm:grid-cols-2 gap-5 rounded-xl bg-gray-50 border border-gray-100 p-5">
            <FormField
              control={form.control}
              name="store"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Store or supermarket</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Al Madina, Salahuddin" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City and country</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Dubai, UAE" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <p className="sm:col-span-2 text-xs text-gray-500 leading-relaxed">
              Knowing where helps us chase the right distributor. Both are optional.
            </p>
          </div>
        )}

        <FormField
          control={form.control}
          name="product"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Which product? <span className="font-normal text-gray-400">(optional)</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="e.g. Super Q Golden Bihon 500 g" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Photo */}
        <div className="space-y-2">
          <span className="text-sm font-semibold text-gray-900">
            Add a photo <span className="font-normal text-gray-400">(optional)</span>
          </span>

          {photoPreview ? (
            <div className="relative inline-block">
              <img
                src={photoPreview}
                alt="Attached preview"
                className="h-40 w-auto max-w-full rounded-xl border border-gray-200 object-cover"
              />
              <button
                type="button"
                onClick={clearPhoto}
                aria-label="Remove photo"
                className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-gray-900 text-white flex items-center justify-center shadow-lg hover:bg-gray-700 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
              <p className="mt-2 text-xs text-gray-500 truncate max-w-[16rem]">{photo?.name}</p>
            </div>
          ) : (
            <label
              className={cn(
                'flex flex-col items-center justify-center gap-2 w-full rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 px-6 py-8 cursor-pointer transition-colors',
                'hover:border-primary-400 hover:bg-primary-50/40'
              )}
            >
              <ImagePlus className="h-6 w-6 text-gray-400" />
              <span className="text-sm font-medium text-gray-700">Tap to attach a photo</span>
              <span className="text-xs text-gray-500">JPG, PNG, WEBP or HEIC &middot; up to 5 MB</span>
              <input
                ref={fileInputRef}
                type="file"
                accept={ACCEPTED_TYPES.join(',')}
                className="sr-only"
                onChange={handlePhotoChange}
              />
            </label>
          )}
        </div>

        {/* Contact - optional, but the only way we can reply */}
        <div className="grid sm:grid-cols-2 gap-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Your name <span className="font-normal text-gray-400">(optional)</span>
                </FormLabel>
                <FormControl>
                  <Input autoComplete="name" placeholder="Maria Santos" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Email <span className="font-normal text-gray-400">(optional)</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Only if you would like a reply.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-auto">
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              Send report
            </>
          )}
        </Button>
      </form>
    </Form>
  );
};
