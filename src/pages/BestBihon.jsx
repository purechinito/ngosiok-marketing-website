import { Link } from 'react-router-dom';
import { Seo } from '@/components/common/Seo';
import { Section } from '@/components/common/Section';
import { SEO_CONFIG } from '@/utils/constants';
import { organizationNode, orgRef } from '@/utils/schema';
import { ChevronRight, Scale, Users, MapPin, Flame } from 'lucide-react';

const PUBLISHED = '2026-10-16';

const faqs = [
  {
    question: 'What is the best bihon brand in the Philippines?',
    answer:
      'There is no official ranking. Judge bihon on what you can check yourself: net weight, servings per pack, whether you can find it, and how it cooks. Super Q Golden Bihon’s ½ kg pack is 500 g, feeds at least five people, is made from cornstarch, and has been made in Cebu by Ngosiok Marketing since 1945.',
  },
  {
    question: 'How many grams is a pack of Super Q Golden Bihon?',
    answer:
      'The ½ kg pack is 500 g. In the Philippines, Super Q Golden Bihon also comes in 1 kg and 227 g packs and 12 kg sacks. Export packs come in 500 g, 454 g and 227 g.',
  },
  {
    question: 'How many people does 500 g of bihon feed?',
    answer: 'One 500 g pack of Super Q Golden Bihon feeds at least five people.',
  },
  {
    question: 'How much does Super Q Golden Bihon cost?',
    answer:
      'The suggested retail price of the 500 g pack is ₱50, which works out to ₱0.10 per gram or ₱10 per 100 g. Store prices can vary.',
  },
  {
    question: 'What is Golden Q bihon?',
    answer:
      'Golden Q is Ngosiok Marketing’s second bihon brand, made for budget-conscious buyers in the Visayas and Mindanao. Golden Q Special Bihon comes in a 200 g pack printed in Cebuano.',
  },
  {
    question: 'Where can I buy Super Q bihon?',
    answer:
      'Super Q is sold in wet markets and grocery stores across the Philippines. If your store has run out, you can report it on the Where to Buy page.',
  },
];

const checklist = [
  {
    title: 'Read the front of the pack',
    body: 'Find the net weight. The Super Q Golden Bihon ½ kg pack says 500 g. Many bihon packs on Metro Manila shelves say 454 g (16 oz) or less.',
  },
  {
    title: 'Put it on a scale',
    body: 'Weigh the unopened packs on a kitchen or shop scale. The bag itself adds a few grams, so compare packs of the same kind side by side.',
  },
  {
    title: 'Divide the price by the grams',
    body: 'Shelf price ÷ grams = price per gram. The lower number is the better buy. At its ₱50 suggested retail price, the 500 g Super Q pack is ₱0.10 per gram.',
  },
];

export const BestBihon = () => {
  const canonicalUrl = `${SEO_CONFIG.siteUrl}/best-bihon-brand-philippines`;
  const goldenQImage = '/images/products/newproducts/specialbihon.jpg';

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Best Bihon Brand in the Philippines: How to Choose',
    description:
      'How to choose bihon by what you can check: net weight, price per gram, servings per pack, availability and how it cooks.',
    image: SEO_CONFIG.defaultOgImage,
    author: orgRef,
    publisher: orgRef,
    datePublished: PUBLISHED,
    dateModified: PUBLISHED,
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonicalUrl },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SEO_CONFIG.siteUrl },
      { '@type': 'ListItem', position: 2, name: 'Best Bihon Brand', item: canonicalUrl },
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
        title="Best Bihon Brand in the Philippines: How to Choose"
        description="No official ranking exists, so check what you can measure: weight, price per gram, servings and availability. Super Q's ½ kg pack is 500 g. Weigh it yourself."
        canonical={canonicalUrl}
        ogImage={SEO_CONFIG.defaultOgImage}
        type="article"
        schema={[organizationNode, articleSchema, breadcrumbSchema, faqSchema]}
      />

      <main className="pt-20 bg-white">
        <Section className="pb-0 pt-10">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8 flex-wrap">
            <Link to="/" className="hover:text-primary-600 transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium">Best Bihon Brand</span>
          </nav>
        </Section>

        <Section className="pt-0">
          <div className="max-w-3xl">
            <span className="text-primary-600 font-bold tracking-wider uppercase text-sm mb-3 block">
              Buyer's guide
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-gray-900 mb-8 leading-tight">
              Best Bihon Brand in the Philippines: How to Choose
            </h1>
            <p className="text-xl text-gray-700 leading-relaxed font-medium mb-5">
              There is no official ranking of bihon brands in the Philippines. So judge bihon by
              what you can check yourself: how much is in the pack, how many people it feeds,
              whether you can find it, and how it cooks.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed border-l-4 border-primary-500 pl-5">
              We make Super Q, so read this knowing that. Then check every claim on this page
              yourself. That is the point of it.
            </p>
          </div>
        </Section>

        <Section className="pt-0">
          <div className="max-w-5xl">
            <div className="flex items-center gap-3 mb-6">
              <Scale className="w-7 h-7 text-primary-600" />
              <h2 className="text-3xl md:text-4xl font-bold font-heading text-gray-900">
                1. Weigh it: 500 g vs 454 g
              </h2>
            </div>

            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              <div className="rounded-3xl bg-primary-600 text-white p-6">
                <div className="text-5xl font-bold font-heading">500 g</div>
                <div className="mt-2 text-white/90">Super Q Golden Bihon, ½ kg pack</div>
              </div>
              <div className="rounded-3xl bg-gray-100 text-gray-900 p-6">
                <div className="text-5xl font-bold font-heading">454 g</div>
                <div className="mt-2 text-gray-600">Many bihon packs on Metro Manila shelves (16 oz) or less</div>
              </div>
              <div className="rounded-3xl bg-amber-50 border border-amber-200 text-gray-900 p-6">
                <div className="text-5xl font-bold font-heading text-amber-700">+10%</div>
                <div className="mt-2 text-gray-700">46 g more noodles than a 454 g pack</div>
              </div>
            </div>

            <p className="text-lg text-gray-700 leading-relaxed mb-8 max-w-3xl">
              Do not take our word for it. Put the packs on a scale. Here is how to compare any
              two bihon packs in under a minute:
            </p>

            <ol className="space-y-4 max-w-3xl list-none mb-8">
              {checklist.map((step, index) => (
                <li key={step.title} className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-600 text-white font-bold flex items-center justify-center text-sm">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{step.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="rounded-2xl bg-gray-50 border border-gray-200 p-6 max-w-3xl">
              <h3 className="font-bold text-gray-900 mb-2">The fine print, in the open</h3>
              <p className="text-gray-600 leading-relaxed">
                Super Q Golden Bihon also comes in other sizes, including 454 g and 227 g packs, so
                check that you are comparing the ½ kg pack. Net weights are printed as approximate,
                and some of our packs state a ±5% tolerance. Even at the bottom of that tolerance,
                a 500 g pack holds 475 g, which is still more than a 454 g pack at full weight.
              </p>
            </div>
          </div>
        </Section>

        <Section className="pt-0">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <Users className="w-7 h-7 text-primary-600" />
              <h2 className="text-3xl md:text-4xl font-bold font-heading text-gray-900">2. Count the servings</h2>
            </div>
            <div className="space-y-5 text-lg text-gray-600 leading-relaxed">
              <p>
                One 500 g pack of Super Q Golden Bihon feeds at least five people. The noodles come
                as a hard, compact rectangular block, which is why so much fits in one pack.
              </p>
              <p>
                At the ₱50 suggested retail price, that is about ₱10 of noodles per plate, a
                number that matters if you cook for a big family or sell pancit. Our{' '}
                <Link to="/recipes/pancit-bihon-guisado" className="text-primary-600 font-semibold hover:underline">
                  pancit bihon recipe
                </Link>{' '}
                is written for exactly one 500 g pack.
              </p>
            </div>
          </div>
        </Section>

        <Section className="pt-0">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <MapPin className="w-7 h-7 text-primary-600" />
              <h2 className="text-3xl md:text-4xl font-bold font-heading text-gray-900">3. Can you actually find it?</h2>
            </div>
            <div className="space-y-5 text-lg text-gray-600 leading-relaxed">
              <p>
                The best bihon is no use if your store never has it. Super Q is sold in wet markets
                and grocery stores across the Philippines, and exported internationally.
              </p>
              <p>
                Stores do sell out between deliveries. When yours has,{' '}
                <Link to="/where-to-buy" className="text-primary-600 font-semibold hover:underline">
                  tell us where
                </Link>{' '}
                and the report goes straight to our sales team.
              </p>
            </div>
          </div>
        </Section>

        <Section className="pt-0">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <Flame className="w-7 h-7 text-primary-600" />
              <h2 className="text-3xl md:text-4xl font-bold font-heading text-gray-900">4. How it cooks</h2>
            </div>
            <div className="space-y-5 text-lg text-gray-600 leading-relaxed">
              <p>
                Super Q Golden Bihon is made from cornstarch, not rice. Its natural yellow colour
                comes from the cornstarch itself. Cooked, it turns soft, smooth and bouncy while
                keeping a distinct bite, and it is produced in a controlled environment rather
                than sun-dried in the open.
              </p>
              <p>
                For what to look for in any brand, from strand consistency to how it was dried,
                read{' '}
                <Link to="/bihon-guide" className="text-primary-600 font-semibold hover:underline">
                  our guide to bihon
                </Link>
                .
              </p>
            </div>
          </div>
        </Section>

        <Section className="pt-0" id="golden-q">
          <div className="grid md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] gap-10 items-start max-w-5xl">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold font-heading text-gray-900 mb-6">
                Super Q or Golden Q?
              </h2>
              <div className="space-y-5 text-lg text-gray-600 leading-relaxed">
                <p>
                  Both are Ngosiok Marketing brands.{' '}
                  <Link to="/products/super-q-golden-bihon" className="text-primary-600 font-semibold hover:underline">
                    Super Q Golden Bihon
                  </Link>{' '}
                  is our premium bihon, sold across the Philippines and abroad.
                </p>
                <p>
                  <strong className="text-gray-900">Golden Q</strong> is our second bihon brand, made
                  for budget-conscious buyers in the Visayas and Mindanao. Golden Q Special Bihon
                  comes in a 200 g pack printed in Cebuano. It carries two lines worth reading:{' '}
                  <em>&ldquo;Lami kai&rsquo;ni!&rdquo;</em> and{' '}
                  <em>&ldquo;Saktong timbang&rdquo;</em>, exact weight.
                </p>
              </div>
            </div>
            <figure className="max-w-sm">
              <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm bg-gray-50">
                <img
                  src={goldenQImage}
                  alt="A pack of Golden Q Special Bihon, printed in Cebuano with 'Lami Kai'ni!', beside a plate of bihon with shrimp, mussels and squid"
                  loading="lazy"
                  className="w-full h-auto object-contain"
                />
              </div>
            </figure>
          </div>
        </Section>

        <Section className="pt-0 pb-24">
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-gray-900 mb-8">
              Frequently asked questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <details key={faq.question} className="group bg-gray-50 rounded-2xl border border-gray-100 p-6">
                  <summary className="font-bold text-gray-900 cursor-pointer list-none flex items-center justify-between gap-4">
                    <span>{faq.question}</span>
                    <ChevronRight className="w-5 h-5 flex-shrink-0 text-primary-600 transition-transform group-open:rotate-90" />
                  </summary>
                  <p className="text-gray-600 leading-relaxed mt-4">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </Section>
      </main>
    </>
  );
};
