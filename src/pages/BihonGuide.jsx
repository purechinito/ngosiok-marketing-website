import { Link } from 'react-router-dom';
import { Seo } from '@/components/common/Seo';
import { Section } from '@/components/common/Section';
import { UtensilsCrossed, Flame, HelpCircle, ArrowRight } from 'lucide-react';
import { SEO_CONFIG, COMPANY_INFO } from '@/utils/constants';
import { noodleComparison, cookingSteps, bihonFaqs } from '@/data/bihon-guide';
import { seoRoutes } from '@/data/seo-routes';

const route = seoRoutes.find((entry) => entry.path === '/bihon');

export const BihonGuide = () => {
  return (
    <>
      <Seo
        title={route.title}
        description={route.description}
        canonical={`${SEO_CONFIG.siteUrl}/bihon`}
        ogImage={route.ogImage}
        schema={route.schema}
        appendBrand={false}
        type="article"
      />
      <main className="pt-20 bg-gray-50 min-h-screen">
        <Section className="relative overflow-hidden pt-20 pb-12">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
            style={{ backgroundImage: 'url(/noodle-hero-bg.png)' }}
          />
          <div className="absolute inset-0 bg-black/75 z-0" />

          <div className="text-center max-w-4xl mx-auto relative z-10">
            <div className="inline-block bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-bold mb-6 border border-white/30 shadow-sm">
              The Bihon Guide
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-heading text-white mb-6 drop-shadow-lg">
              What Is <span className="text-primary-400">Bihon</span>?
            </h1>
            <p className="text-xl text-white/90 font-medium max-w-2xl mx-auto drop-shadow-md">
              Answered by the people who make it &mdash; a Cebu noodle
              manufacturer since {COMPANY_INFO.foundedYear}.
            </p>
          </div>
        </Section>

        {/* The definition - the part most sources get muddled */}
        <Section className="pt-12 pb-12">
          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-gray-700 leading-relaxed mb-5">
              <strong>Bihon is a very fine, round noodle used across Filipino cooking</strong>,
              most famously in pancit bihon. The word describes the <em>shape</em> of the noodle,
              not a single recipe &mdash; which is why you will find sources insisting bihon is
              made of rice and others insisting it is cornstarch.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-5">
              Both are right. Traditional bihon is milled from rice flour, which is why it is
              often sold in English as <em>rice sticks</em> or <em>rice vermicelli</em>. Many
              commercial Filipino bihon are made from cornstarch instead.{' '}
              <Link
                to="/products/super-q-golden-bihon"
                className="text-primary-600 font-semibold hover:underline"
              >
                Super Q Golden Bihon
              </Link>{' '}
              is cornstarch-based &mdash; its golden colour comes from the cornstarch itself, not
              from added colouring.
            </p>
            <div className="bg-white border-l-4 border-primary-500 rounded-r-2xl p-6 shadow-sm">
              <p className="text-gray-700 leading-relaxed">
                <strong>Why cornstarch?</strong> It gives a bouncier bite and holds together
                better under prolonged tossing in a hot pan. Rice bihon is more delicate and
                more prone to breaking up in a heavily loaded pancit.
              </p>
            </div>
          </div>
        </Section>

        {/* Comparison table - the section most likely to win a featured snippet */}
        <Section className="py-12 bg-white">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <UtensilsCrossed className="w-7 h-7 text-primary-600" />
              <h2 className="text-3xl font-bold font-heading text-gray-900">
                Bihon vs Canton vs Sotanghon vs Misua
              </h2>
            </div>
            <p className="text-gray-600 mb-6 leading-relaxed">
              These five get mixed up constantly. Here is what actually separates them.
            </p>

            <div className="overflow-x-auto rounded-2xl border border-gray-200">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-gray-700 font-bold border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3">Noodle</th>
                    <th className="px-4 py-3">Made from</th>
                    <th className="px-4 py-3">Strand</th>
                    <th className="px-4 py-3">Cooked texture</th>
                    <th className="px-4 py-3">Classic dish</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white">
                  {noodleComparison.map((row) => (
                    <tr key={row.noodle} className="hover:bg-gray-50/60 transition-colors">
                      <td className="px-4 py-3 font-bold text-gray-900">
                        <Link
                          to={`/products/${row.slug}`}
                          className="hover:text-primary-600 transition-colors"
                        >
                          {row.noodle}
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-gray-600">{row.base}</td>
                      <td className="px-4 py-3 text-gray-600">{row.strand}</td>
                      <td className="px-4 py-3 text-gray-600">{row.cooked}</td>
                      <td className="px-4 py-3 text-gray-600">{row.dish}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Section>

        {/* How to cook it */}
        <Section className="py-12">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <Flame className="w-7 h-7 text-primary-600" />
              <h2 className="text-3xl font-bold font-heading text-gray-900">
                How to Cook Bihon Without It Turning Mushy
              </h2>
            </div>
            <p className="text-gray-600 mb-8 leading-relaxed">
              The single most common mistake is boiling it. Bihon is not spaghetti. Here is the
              order that works.
            </p>

            <ol className="space-y-5">
              {cookingSteps.map((step, index) => (
                <li
                  key={step.title}
                  className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex gap-5"
                >
                  <span className="shrink-0 w-10 h-10 rounded-xl bg-primary-50 text-primary-700 font-bold flex items-center justify-center">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Section>

        {/* FAQ - mirrors the FAQPage schema */}
        <Section className="py-12 bg-white">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <HelpCircle className="w-7 h-7 text-primary-600" />
              <h2 className="text-3xl font-bold font-heading text-gray-900">
                Bihon Questions, Answered
              </h2>
            </div>

            <div className="space-y-4">
              {bihonFaqs.map((faq) => (
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
          </div>
        </Section>

        {/* Conversion */}
        <Section className="py-12 pb-24">
          <div className="max-w-3xl mx-auto bg-gradient-to-br from-primary-600 to-primary-700 text-white rounded-3xl p-8 md:p-12 shadow-xl text-center">
            <h2 className="text-3xl font-bold font-heading mb-4">Try It With Super Q</h2>
            <p className="text-primary-100 leading-relaxed mb-8 max-w-xl mx-auto">
              We have been making bihon in Cebu since {COMPANY_INFO.foundedYear}. Dried in a
              controlled environment rather than sun-dried, so every pack cooks the same way.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/products/super-q-golden-bihon"
                className="inline-flex items-center gap-2 bg-white text-primary-700 font-bold px-6 py-3 rounded-xl hover:bg-primary-50 transition-colors"
              >
                See Super Q Golden Bihon
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/where-to-buy"
                className="inline-flex items-center gap-2 bg-white/15 border border-white/30 font-bold px-6 py-3 rounded-xl hover:bg-white/25 transition-colors"
              >
                Where to buy
              </Link>
            </div>
          </div>
        </Section>
      </main>
    </>
  );
};
