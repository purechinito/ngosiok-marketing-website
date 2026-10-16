import { Link } from 'react-router-dom';
import { Seo } from '@/components/common/Seo';
import { Section } from '@/components/common/Section';
import { StockReport } from '@/components/common/StockReport';
import { SEO_CONFIG, COMPANY_INFO } from '@/utils/constants';
import { organizationNode } from '@/utils/schema';
import { ChevronRight, Store, Truck, Globe } from 'lucide-react';

const faqs = [
  {
    question: 'Where can I buy Super Q bihon?',
    answer:
      'Super Q noodles are sold in wet markets and grocery stores across the Philippines. Ask for Super Q Golden Bihon by name. For bulk, distributor or food-service orders, see our wholesale page.',
  },
  {
    question: 'My store has run out of Super Q. What should I do?',
    answer:
      'Tell us where. Use the report form on this page with the store name and city, and it goes straight to our sales team so the store can be restocked.',
  },
  {
    question: 'Can I buy Super Q in bulk for my business?',
    answer:
      'Yes. Ngosiok Marketing supplies distributors, food-service buyers and export importers, and accepts private label orders at volume. See the wholesale page for pack formats and how to order.',
  },
  {
    question: 'Is Super Q sold outside the Philippines?',
    answer:
      `Yes. Super Q noodles are sold in many countries abroad, including the United States, Canada and Australia. For export orders or to find out about availability in your country, contact our sales team at ${COMPANY_INFO.email}.`,
  },
];

export const WhereToBuy = () => {
  const canonicalUrl = `${SEO_CONFIG.siteUrl}/where-to-buy`;

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SEO_CONFIG.siteUrl },
      { '@type': 'ListItem', position: 2, name: 'Where to Buy', item: canonicalUrl },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  return (
    <>
      <Seo
        title="Where to Buy Super Q Bihon in the Philippines"
        description="Super Q is sold in wet markets and grocery stores across the Philippines. Store run out? Tell us where and we will get it restocked. Bulk orders welcome."
        canonical={canonicalUrl}
        ogImage={SEO_CONFIG.defaultOgImage}
        schema={[organizationNode, breadcrumbSchema, faqSchema]}
      />

      <main className="pt-20 bg-gray-50">
        <Section className="pb-0 pt-10">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8 flex-wrap">
            <Link to="/" className="hover:text-primary-600 transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium">Where to Buy</span>
          </nav>
        </Section>

        <Section className="pt-0">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-gray-900 mb-6 leading-tight">
              Where to Buy Super Q Bihon
            </h1>
            <p className="text-xl text-gray-700 leading-relaxed font-medium mb-4">
              Super Q noodles are sold in wet markets and grocery stores across the
              Philippines. Ask for Super Q Golden Bihon by name.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Sometimes a store sells out before the next delivery. If yours has, tell us
              where. Your report goes straight to our sales team.
            </p>
          </div>
        </Section>

        <Section className="pt-0">
          <div className="grid md:grid-cols-3 gap-5 max-w-6xl">
            <div className="rounded-2xl bg-white border border-gray-100 p-6">
              <Store className="w-6 h-6 text-primary-600 mb-3" />
              <h2 className="text-xl font-bold text-gray-900 mb-2">In stores</h2>
              <p className="text-gray-600 leading-relaxed">
                Wet markets and grocery stores across the Philippines. In the Visayas and
                Mindanao, look for our second bihon brand too:{' '}
                <Link to="/best-bihon-brand-philippines#golden-q" className="text-primary-600 font-semibold hover:underline">
                  Golden Q
                </Link>
                .
              </p>
            </div>
            <div className="rounded-2xl bg-white border border-gray-100 p-6">
              <Truck className="w-6 h-6 text-primary-600 mb-3" />
              <h2 className="text-xl font-bold text-gray-900 mb-2">For your business</h2>
              <p className="text-gray-600 leading-relaxed">
                Distributor, food-service and private label orders go through our{' '}
                <Link to="/wholesale" className="text-primary-600 font-semibold hover:underline">
                  wholesale team
                </Link>
                .
              </p>
            </div>
            <div className="rounded-2xl bg-white border border-gray-100 p-6">
              <Globe className="w-6 h-6 text-primary-600 mb-3" />
              <h2 className="text-xl font-bold text-gray-900 mb-2">Outside the Philippines</h2>
              <p className="text-gray-600 leading-relaxed">
                Super Q is sold in many countries, including the United States, Canada
                and Australia. Email{' '}
                <a href={`mailto:${COMPANY_INFO.email}`} className="text-primary-600 font-semibold hover:underline break-all">
                  {COMPANY_INFO.email}
                </a>{' '}
                about availability in your country.
              </p>
            </div>
          </div>
        </Section>

        <Section className="pt-0" id="report">
          <div className="grid lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-10 max-w-6xl">
            <div>
              <h2 className="text-3xl font-bold font-heading text-gray-900 mb-4">
                Can't find Super Q? Tell us where.
              </h2>
              <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
                <p>
                  Every report tells us exactly which store, in which city, has run out of
                  which noodle, so we can get it back on the shelf.
                </p>
                <p>
                  It takes under a minute. Fill in the form and your email app opens with the
                  report ready to send.
                </p>
              </div>
            </div>
            <StockReport />
          </div>
        </Section>

        <Section className="pt-0 pb-24">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold font-heading text-gray-900 mb-8">Frequently asked questions</h2>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <details key={faq.question} className="group bg-white rounded-2xl border border-gray-100 p-6">
                  <summary className="font-bold text-gray-900 cursor-pointer list-none flex items-center justify-between gap-4">
                    <span>{faq.question}</span>
                    <ChevronRight className="w-5 h-5 flex-shrink-0 text-primary-600 transition-transform group-open:rotate-90" />
                  </summary>
                  <p className="text-gray-600 leading-relaxed mt-4">{faq.answer}</p>
                </details>
              ))}
            </div>
            <p className="text-lg text-gray-600 leading-relaxed mt-8">
              Choosing between brands?{' '}
              <Link to="/best-bihon-brand-philippines" className="text-primary-600 font-semibold hover:underline">
                Here is how to pick the best bihon
              </Link>
              , and how to check every claim yourself.
            </p>
          </div>
        </Section>
      </main>
    </>
  );
};
