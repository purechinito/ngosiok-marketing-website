import { Link } from 'react-router-dom';
import { Seo } from '@/components/common/Seo';
import { Section } from '@/components/common/Section';
import { MapPin, Globe, Ship, Mail, Phone, Info } from 'lucide-react';
import { COMPANY_INFO, SEO_CONFIG } from '@/utils/constants';
import { exportMarkets, uaeStockists, availabilityFaqs } from '@/data/availability';
import { seoRoutes } from '@/data/seo-routes';

const route = seoRoutes.find((entry) => entry.path === '/where-to-buy');

export const WhereToBuy = () => {
  return (
    <>
      <Seo
        title={route.title}
        description={route.description}
        canonical={`${SEO_CONFIG.siteUrl}/where-to-buy`}
        ogImage={route.ogImage}
        schema={route.schema}
      />
      <main className="pt-20 bg-gray-50 min-h-screen">
        {/* Header */}
        <Section className="relative overflow-hidden pt-20 pb-12">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
            style={{ backgroundImage: 'url(/images/superqprods.jpg)' }}
          />
          <div className="absolute inset-0 bg-black/70 z-0" />

          <div className="text-center max-w-4xl mx-auto relative z-10">
            <div className="inline-block bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-bold mb-6 border border-white/30 shadow-sm">
              Global Availability
            </div>
            <h1 className="text-5xl md:text-6xl font-bold font-heading text-white mb-6 drop-shadow-lg">
              Where to Buy <span className="text-primary-400">Super Q</span>
            </h1>
            <p className="text-xl text-white/90 font-medium max-w-2xl mx-auto drop-shadow-md">
              Made in Cebu, shipped worldwide. Here is where shoppers are finding Super Q
              &mdash; and how retailers can order direct from us.
            </p>
          </div>
        </Section>

        {/* UAE / Dubai */}
        <Section className="pt-12 pb-12">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <MapPin className="w-7 h-7 text-primary-600" />
              <h2 className="text-3xl font-bold font-heading text-gray-900">
                Super Q in the UAE &amp; Dubai
              </h2>
            </div>

            <p className="text-gray-600 leading-relaxed mb-4">
              Demand for Super Q among the Filipino community in the UAE regularly outpaces
              supply. In September 2025, a restock in Dubai sold out within hours of being shared
              in the Food Trip UAE community group. Because Super Q ships from Cebu by container
              rather than continuously, shelves can empty between arrivals.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              {uaeStockists.map((stockist) => (
                <div
                  key={stockist.name}
                  className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                >
                  <h3 className="font-bold text-gray-900 mb-2">{stockist.name}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{stockist.detail}</p>
                  {stockist.community && (
                    <p className="text-xs text-gray-400 mt-3 italic">
                      Shopper-reported sighting, not an official listing.
                    </p>
                  )}
                </div>
              ))}
            </div>

            <div className="flex gap-3 bg-amber-50 border border-amber-200 rounded-2xl p-5">
              <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-sm text-amber-900 leading-relaxed">
                Stock moves fast. Call the branch before travelling. If you run a UAE retailer and
                want reliable supply instead of intermittent stock,{' '}
                <a href={`mailto:${COMPANY_INFO.email}`} className="font-semibold underline">
                  contact us directly
                </a>
                .
              </p>
            </div>
          </div>
        </Section>

        {/* Export markets */}
        <Section className="py-12 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <Globe className="w-7 h-7 text-primary-600" />
              <h2 className="text-3xl font-bold font-heading text-gray-900">Export Markets</h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {exportMarkets.map((market) => (
                <div key={market.region} className="bg-gray-50 rounded-2xl p-6">
                  <h3 className="font-bold text-gray-900 mb-3">{market.region}</h3>
                  <ul className="space-y-1.5">
                    {market.countries.map((country) => (
                      <li key={country} className="text-sm text-gray-600">
                        {country}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* Distributor CTA */}
        <Section className="py-12">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-primary-600 to-primary-700 text-white rounded-3xl p-8 md:p-12 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl translate-x-16 -translate-y-16" />
            <div className="relative z-10">
              <Ship className="w-10 h-10 mb-5" />
              <h2 className="text-3xl font-bold font-heading mb-4">
                Become a Stockist or Distributor
              </h2>
              <p className="text-primary-100 leading-relaxed mb-6 max-w-2xl">
                We work directly with importers, distributors and retail groups, and accept
                private label packing at qualifying order volumes. Super Q Golden Bihon export
                packs are produced in 227&nbsp;g, 454&nbsp;g and 500&nbsp;g formats.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="inline-flex items-center gap-2 bg-white text-primary-700 font-bold px-6 py-3 rounded-xl hover:bg-primary-50 transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  {COMPANY_INFO.email}
                </a>
                <a
                  href={`tel:${COMPANY_INFO.phone}`}
                  className="inline-flex items-center gap-2 bg-white/15 border border-white/30 font-bold px-6 py-3 rounded-xl hover:bg-white/25 transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  {COMPANY_INFO.phone}
                </a>
              </div>
            </div>
          </div>
        </Section>

        {/* FAQ - mirrors the FAQPage schema emitted above */}
        <Section className="py-12 pb-24 bg-white">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold font-heading text-gray-900 mb-8 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {availabilityFaqs.map((faq) => (
                <details
                  key={faq.question}
                  className="group bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden"
                >
                  <summary className="cursor-pointer list-none px-6 py-5 font-bold text-gray-900 flex justify-between items-center gap-4">
                    {faq.question}
                    <span className="text-primary-600 text-xl shrink-0 transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="px-6 pb-5 text-gray-600 leading-relaxed">{faq.answer}</p>
                </details>
              ))}
            </div>

            <p className="text-center text-gray-500 mt-10">
              Looking for something specific?{' '}
              <Link to="/products" className="text-primary-600 font-semibold hover:underline">
                Browse all our noodles
              </Link>{' '}
              or{' '}
              <Link to="/contact" className="text-primary-600 font-semibold hover:underline">
                get in touch
              </Link>
              .
            </p>
          </div>
        </Section>
      </main>
    </>
  );
};
