import { useState } from 'react';
import { products } from '@/data/products';
import { COMPANY_INFO } from '@/utils/constants';
import { MapPin, Send, CheckCircle2 } from 'lucide-react';

const productOptions = [
  ...products.map((p) => p.name),
  'Golden Q Special Bihon',
  'Not sure / other',
];

const inputClass =
  'w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200';

const buildReport = (form) => {
  const location = [form.store, form.city, form.province].filter(Boolean).join(', ');
  const subject = `Stock report: ${form.product} not available at ${location}`;
  const lines = [
    'Out-of-stock report from superq.ph',
    '',
    `Product: ${form.product}`,
    `Store or market: ${form.store}`,
    `City / municipality: ${form.city}`,
    `Province: ${form.province || '-'}`,
    `Date noticed: ${form.noticed || '-'}`,
    `Notes: ${form.notes || '-'}`,
    `Reported by: ${form.contact || '-'}`,
  ];
  return { subject, body: lines.join('\n') };
};

export const StockReport = () => {
  const [form, setForm] = useState({
    product: productOptions[0],
    store: '',
    city: '',
    province: '',
    noticed: '',
    notes: '',
    contact: '',
  });
  const [sent, setSent] = useState(null);

  const update = (field) => (event) => setForm({ ...form, [field]: event.target.value });

  const handleSubmit = (event) => {
    event.preventDefault();
    const report = buildReport(form);
    setSent(report);
    window.location.href =
      `mailto:${COMPANY_INFO.email}` +
      `?subject=${encodeURIComponent(report.subject)}` +
      `&body=${encodeURIComponent(report.body)}`;
  };

  if (sent) {
    return (
      <div className="rounded-3xl border border-green-200 bg-green-50 p-7 md:p-9">
        <div className="flex items-center gap-3 mb-4">
          <CheckCircle2 className="w-7 h-7 text-green-600" />
          <h3 className="text-2xl font-bold font-heading text-gray-900">Thank you — your report is ready to send</h3>
        </div>
        <p className="text-gray-700 leading-relaxed mb-4">
          Your email app should have opened with the report filled in. Press send and it goes
          straight to our sales team. If nothing opened, copy the text below and email it to{' '}
          <a href={`mailto:${COMPANY_INFO.email}`} className="text-primary-600 font-semibold hover:underline">
            {COMPANY_INFO.email}
          </a>
          .
        </p>
        <label htmlFor="stock-report-text" className="sr-only">Report text</label>
        <textarea
          id="stock-report-text"
          readOnly
          rows={10}
          value={`${sent.subject}\n\n${sent.body}`}
          className={`${inputClass} font-mono text-sm`}
        />
        <button
          type="button"
          onClick={() => setSent(null)}
          className="mt-4 text-primary-600 font-semibold hover:underline"
        >
          Report another store
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl border border-gray-100 bg-white shadow-sm p-7 md:p-9 space-y-5">
      <div className="flex items-center gap-3">
        <span className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center text-primary-600">
          <MapPin className="w-5 h-5" />
        </span>
        <h3 className="text-2xl font-bold font-heading text-gray-900">Report a store that has run out</h3>
      </div>

      <div>
        <label htmlFor="sr-product" className="block text-sm font-semibold text-gray-800 mb-1.5">
          What were you looking for?
        </label>
        <select id="sr-product" value={form.product} onChange={update('product')} className={inputClass}>
          {productOptions.map((name) => (
            <option key={name} value={name}>{name}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="sr-store" className="block text-sm font-semibold text-gray-800 mb-1.5">
          Store or market name
        </label>
        <input
          id="sr-store"
          required
          value={form.store}
          onChange={update('store')}
          placeholder="e.g. a supermarket branch, or the stall area of your wet market"
          className={inputClass}
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="sr-city" className="block text-sm font-semibold text-gray-800 mb-1.5">
            City or municipality
          </label>
          <input id="sr-city" required value={form.city} onChange={update('city')} className={inputClass} />
        </div>
        <div>
          <label htmlFor="sr-province" className="block text-sm font-semibold text-gray-800 mb-1.5">
            Province <span className="font-normal text-gray-500">(optional)</span>
          </label>
          <input id="sr-province" value={form.province} onChange={update('province')} className={inputClass} />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="sr-noticed" className="block text-sm font-semibold text-gray-800 mb-1.5">
            When did you notice? <span className="font-normal text-gray-500">(optional)</span>
          </label>
          <input id="sr-noticed" type="date" value={form.noticed} onChange={update('noticed')} className={inputClass} />
        </div>
        <div>
          <label htmlFor="sr-contact" className="block text-sm font-semibold text-gray-800 mb-1.5">
            Your name or number <span className="font-normal text-gray-500">(optional)</span>
          </label>
          <input id="sr-contact" value={form.contact} onChange={update('contact')} className={inputClass} />
        </div>
      </div>

      <div>
        <label htmlFor="sr-notes" className="block text-sm font-semibold text-gray-800 mb-1.5">
          Anything else? <span className="font-normal text-gray-500">(optional)</span>
        </label>
        <textarea
          id="sr-notes"
          rows={3}
          value={form.notes}
          onChange={update('notes')}
          placeholder="e.g. the shelf has other bihon brands but no Super Q"
          className={inputClass}
        />
      </div>

      <p className="text-sm text-gray-500">
        We only use your name or number to follow up on this report.
      </p>

      <button
        type="submit"
        className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3.5 rounded-xl font-bold hover:bg-primary-700 transition-colors shadow-lg shadow-primary/20"
      >
        <Send className="w-5 h-5" />
        Send report
      </button>
    </form>
  );
};
