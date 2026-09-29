import { Link } from 'react-router-dom';
import { Seo } from '@/components/common/Seo';
import { Section } from '@/components/common/Section';
import { SEO_CONFIG, COMPANY_INFO } from '@/utils/constants';
import { ChevronRight } from 'lucide-react';

const faqs = [
  {
    question: 'What is bihon made of?',
    answer:
      'It depends on the maker. Bihon is traditionally a rice noodle, but a large share of the bihon sold in the Philippines today is cornstarch-based. Super Q Golden Bihon is cornstarch-based, which is where its natural yellow colour comes from — no colouring is needed to produce it.',
  },
  {
    question: 'Is bihon the same as rice noodles?',
    answer:
      'Not always. "Bihon" describes the noodle\'s form — very fine, thin strands used for pancit — rather than one fixed ingredient. Rice bihon and cornstarch bihon are both sold under the name, and they cook and taste noticeably different.',
  },
  {
    question: 'What is the difference between bihon and sotanghon?',
    answer:
      'Bihon strands are fine and opaque, and they carry a light colour once cooked. Sotanghon is a vermicelli-style glass noodle that turns translucent and slippery when cooked, with a neutral flavour that takes on whatever it is cooked with. Sotanghon is the usual choice for chicken soup and spring roll fillings; bihon is the backbone of pancit guisado.',
  },
  {
    question: 'What is the difference between bihon and pancit canton?',
    answer:
      'Pancit canton is a wheat-based noodle that is puffed up by deep frying the cooked noodles before packing, giving it a much thicker strand and a firmer, chewier bite. Bihon is finer and lighter. Many Filipino households cook both together in one pan — the dish is known as pancit bam-i.',
  },
  {
    question: 'Why does my pancit bihon turn mushy?',
    answer:
      'Usually over-soaking, or adding the noodles too early. Bihon continues to absorb liquid the entire time it sits in the pan, so it should go in near the end, once the sauce is seasoned and the meat and vegetables are already cooked. Noodle quality matters too: strands that were dried unevenly break down faster in the pan.',
  },
  {
    question: 'Do you need to soak bihon before cooking?',
    answer:
      'Most cooks soften bihon briefly before it goes into the pan, but soaking times vary by brand and strand thickness, so follow the instructions on the pack. The goal is pliable, not fully softened — the noodle should finish cooking in the sauce, not in the soaking water.',
  },
];

const comparison = [
  {
    noodle: 'Bihon',
    base: 'Cornstarch (Super Q) or rice',
    strand: 'Very fine, thin',
    cooked: 'Soft and smooth, keeps a distinct bite',
    dish: 'Pancit bihon guisado',
    slug: 'super-q-golden-bihon',
  },
  {
    noodle: 'Palabok',
    base: 'Cornstarch',
    strand: 'Noticeably thicker than bihon',
    cooked: 'Fuller, needs longer cooking',
    dish: 'Pancit palabok',
    slug: 'super-q-special-palabok',
  },
  {
    noodle: 'Sotanghon',
    base: 'Vermicelli-style glass noodle',
    strand: 'Fine, turns translucent',
    cooked: 'Smooth and slippery, neutral flavour',
    dish: 'Chicken sotanghon soup, lumpia filling',
    slug: 'super-q-sotanghon',
  },
  {
    noodle: 'Pancit canton',
    base: 'Wheat',
    strand: 'Thick, puffed by deep frying',
    cooked: 'Firm and chewy',
    dish: 'Pancit canton guisado',
    slug: 'super-q-pancit-canton',
  },
  {
    noodle: 'Misua',
    base: 'Wheat flour',
    strand: 'Very fine, circular shape',
    cooked: 'Delicate, softens quickly',
    dish: 'Misua soup, birthday noodles',
    slug: 'super-q-misua',
  },
];

const qualityMarkers = [
  {
    title: 'Strand consistency',
    body: 'Fine, even strands cook at the same rate. Uneven strands give you a pan where some noodles are still firm and others have already gone soft.',
  },
  {
    title: 'Compactness and yield',
    body: 'A denser, more compact block holds more noodle in the same pack. Super Q Golden Bihon is made rectangular, hard and compact specifically because that compactness allows for considerable yield — the practical test is how many servings a pack actually produces.',
  },
  {
    title: 'Colour without colouring',
    body: 'Cornstarch bihon carries a natural yellow colour that comes from the cornstarch itself. A yellow that comes from added colouring is a different thing entirely — worth checking the pack.',
  },
  {
    title: 'How it was dried',
    body: 'Sun-dried noodles are exposed to whatever is in the open air. Super Q is produced through a proprietary process in a controlled environment, which minimises the foreign matter that comes with human handling and open-air drying.',
  },
  {
    title: 'Behaviour in the pan',
    body: 'Good bihon absorbs sauce without disintegrating. It should finish soft, smooth and bouncy while still holding a distinct bite — not collapse into paste.',
  },
];

export const BihonGuide = () => {
  const canonicalUrl = `${SEO_CONFIG.siteUrl}/bihon-guide`;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'What Is Bihon? A Complete Guide to the Filipino Noodle',
    description:
      'A practical guide to bihon: what it is made from, how cornstarch bihon differs from rice bihon, how it compares to sotanghon and pancit canton, and how to cook it without it turning soggy.',
    image: SEO_CONFIG.defaultOgImage,
    author: {
      '@type': 'Organization',
      name: COMPANY_INFO.name,
      url: SEO_CONFIG.siteUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: COMPANY_INFO.name,
      logo: {
        '@type': 'ImageObject',
        url: `${SEO_CONFIG.siteUrl}/logo.jpg`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SEO_CONFIG.siteUrl },
      { '@type': 'ListItem', position: 2, name: 'Bihon Guide', item: canonicalUrl },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <Seo
        title="What Is Bihon? Complete Guide to the Filipino Noodle"
        description="What is bihon? Learn how cornstarch bihon differs from rice bihon, how it compares to sotanghon and pancit canton, and how to cook it without going soggy."
        canonical={canonicalUrl}
        ogImage={SEO_CONFIG.defaultOgImage}
        type="article"
        schema={[articleSchema, breadcrumbSchema, faqSchema]}
      />

      <main className="pt-20 bg-white">
        <Section className="pb-0 pt-10">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8 flex-wrap">
            <Link to="/" className="hover:text-primary-600 transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium">Bihon Guide</span>
          </nav>
        </Section>

        <Section className="pt-0">
          <div className="max-w-3xl">
            <span className="text-primary-600 font-bold tracking-wider uppercase text-sm mb-3 block">
              Noodle Guide
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-gray-900 mb-8 leading-tight">
              What Is Bihon? A Complete Guide to the Filipino Noodle
            </h1>

            <p className="text-xl text-gray-700 leading-relaxed mb-6 font-medium">
              Bihon is the fine, thin noodle at the heart of pancit — the stir-fried
              noodle dish served at nearly every Filipino birthday, fiesta and family
              gathering. The name describes the noodle&rsquo;s form rather than a single
              ingredient: bihon is traditionally made from rice, but a large share of
              the bihon sold in the Philippines today is <strong>cornstarch-based</strong>,
              which cooks and tastes noticeably different.
            </p>

            <p className="text-lg text-gray-600 leading-relaxed">
              This guide covers what separates the two, how bihon compares to sotanghon
              and pancit canton, how to judge quality before you buy, and how to keep it
              from turning soggy in the pan.
            </p>
          </div>
        </Section>

        <Section className="pt-0">
          <figure className="max-w-md">
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm bg-gray-50">
              <img
                src="/images/products/newproducts/goldenbihon.jpg"
                alt="A pack of Super Q Golden Bihon beside a plate of cooked bihon with shrimp, mussels, squid and vegetables"
                className="w-full h-auto object-contain"
              />
            </div>
            <figcaption className="text-sm text-gray-500 mt-3 italic">
              Super Q Golden Bihon — cornstarch-based, with the fine strands that give
              cooked bihon its bite.
            </figcaption>
          </figure>
        </Section>

        <Section className="pt-0">
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-gray-900 mb-6">
              Rice bihon vs cornstarch bihon
            </h2>
            <div className="space-y-5 text-lg text-gray-600 leading-relaxed">
              <p>
                Both are sold as &ldquo;bihon,&rdquo; and both belong in a pancit. The
                difference shows up in the pan.
              </p>
              <p>
                <strong className="text-gray-900">Rice bihon</strong> is the older form —
                fine white strands that soften quickly and carry a mild, clean flavour.
                It is less forgiving of a long cook: left too long in a wet pan, the
                strands break down.
              </p>
              <p>
                <strong className="text-gray-900">Cornstarch bihon</strong> is what
                Super Q produces. It has a natural yellow colour that comes from the
                cornstarch rather than from any added colouring, and it is formed into a
                rectangular, hard and compact block. Cooked, it turns soft, smooth and
                bouncy while still holding a distinct bite — the quality most cooks are
                describing when they say a pancit &ldquo;holds up&rdquo; on the serving
                table rather than going limp after twenty minutes.
              </p>
              <p>
                That compactness is not cosmetic. A denser block means more noodle per
                pack, which is why yield is one of the more practical things to compare
                between brands.
              </p>
            </div>
          </div>
        </Section>

        <Section className="pt-0">
          <div className="max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-gray-900 mb-8">
              How to tell good bihon from bad
            </h2>
            <div className="space-y-6">
              {qualityMarkers.map((marker) => (
                <div
                  key={marker.title}
                  className="border-l-4 border-primary-500 bg-gray-50 rounded-r-2xl p-6"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{marker.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{marker.body}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        <Section className="pt-0">
          <div className="max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-gray-900 mb-4">
              Bihon vs sotanghon vs pancit canton
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              These three get used interchangeably in conversation and are not
              interchangeable in a pan. Here is how they differ.
            </p>

            <div className="overflow-x-auto rounded-2xl border border-gray-200">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-gray-700 font-bold border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 whitespace-nowrap">Noodle</th>
                    <th className="px-4 py-3 whitespace-nowrap">Base</th>
                    <th className="px-4 py-3 whitespace-nowrap">Strand</th>
                    <th className="px-4 py-3">When cooked</th>
                    <th className="px-4 py-3">Typical dish</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white">
                  {comparison.map((row) => (
                    <tr key={row.noodle} className="hover:bg-gray-50/50 transition-colors align-top">
                      <td className="px-4 py-3 font-bold text-gray-900 whitespace-nowrap">
                        <Link
                          to={`/products/${row.slug}`}
                          className="text-primary-600 hover:text-primary-700 hover:underline"
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
            <p className="text-sm text-gray-500 mt-3 italic">
              Cook bihon and pancit canton together in one pan and you have pancit bam-i,
              a Visayan staple.
            </p>
          </div>
        </Section>

        <Section className="pt-0">
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-gray-900 mb-6">
              How to cook bihon without it going soggy
            </h2>
            <div className="space-y-5 text-lg text-gray-600 leading-relaxed">
              <p>
                Nearly every soggy pancit comes down to the same two mistakes: the
                noodles were soaked too long, or they went into the pan too early.
              </p>
              <ol className="space-y-4 list-none">
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-600 text-white font-bold flex items-center justify-center text-sm">1</span>
                  <span>
                    <strong className="text-gray-900">Soften, don&rsquo;t saturate.</strong>{' '}
                    Soaking times differ by brand and strand thickness, so follow the
                    pack. You want the strands pliable, not fully softened — they will
                    finish cooking in the sauce.
                  </span>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-600 text-white font-bold flex items-center justify-center text-sm">2</span>
                  <span>
                    <strong className="text-gray-900">Build the sauce first.</strong> Cook
                    the meat and vegetables and season the broth before the noodles are
                    anywhere near the pan. Bihon absorbs whatever it sits in, so the
                    liquid should already taste right.
                  </span>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-600 text-white font-bold flex items-center justify-center text-sm">3</span>
                  <span>
                    <strong className="text-gray-900">Add the noodles last.</strong> Fold
                    them through and let them take up the liquid. Toss with tongs rather
                    than stirring hard — aggressive stirring is what shreds the strands.
                  </span>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-600 text-white font-bold flex items-center justify-center text-sm">4</span>
                  <span>
                    <strong className="text-gray-900">Stop while it still has bite.</strong>{' '}
                    Residual heat keeps working after the pan comes off. Pull it slightly
                    early, especially if it is going onto a buffet table.
                  </span>
                </li>
              </ol>
            </div>
          </div>
        </Section>

        <Section className="pt-0">
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-gray-900 mb-8">
              Frequently asked questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="group bg-gray-50 rounded-2xl border border-gray-100 p-6"
                >
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

        <Section className="pt-0 pb-24">
          <div className="bg-gradient-to-br from-primary-50 to-white border border-primary-100 rounded-3xl p-8 md:p-12 max-w-5xl">
            <h2 className="text-2xl md:text-3xl font-bold font-heading text-gray-900 mb-4">
              The bihon we make
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8 max-w-2xl">
              Ngosiok Marketing has been making noodles in Cebu since 1945.{' '}
              <Link to="/products/super-q-golden-bihon" className="text-primary-600 font-semibold hover:underline">
                Super Q Golden Bihon
              </Link>{' '}
              is our cornstarch-based premium bihon, produced in a controlled environment
              and sold locally and internationally.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/products"
                className="inline-flex justify-center items-center gap-2 bg-primary-600 text-white px-6 py-3.5 rounded-xl font-bold hover:bg-primary-700 transition-colors shadow-lg shadow-primary/20"
              >
                Browse All Products
              </Link>
              <Link
                to="/contact"
                className="inline-flex justify-center items-center gap-2 bg-white text-gray-800 border-2 border-gray-200 px-6 py-3.5 rounded-xl font-bold hover:border-primary-600 hover:text-primary-600 transition-all"
              >
                Distributor &amp; Export Inquiries
              </Link>
            </div>
          </div>
        </Section>
      </main>
    </>
  );
};
