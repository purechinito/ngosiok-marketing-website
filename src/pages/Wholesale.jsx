import { Link } from 'react-router-dom';
import { Seo } from '@/components/common/Seo';
import { Section } from '@/components/common/Section';
import { SEO_CONFIG, COMPANY_INFO } from '@/utils/constants';
import { products } from '@/data/products';
import { ChevronRight } from 'lucide-react';

// Bulk packaging rows are built from src/data/products.js — the same data
// printed on real packaging — so nothing here can drift from the catalog.
const marketSets = [
  { key: 'localPackaging', market: 'Local' },
  { key: 'exportPackaging', market: 'Export' },
  { key: 'sharedPackaging', market: 'Local & export' },
];

const packagingRows = products.flatMap((product) =>
  marketSets.flatMap(({ key, market }) =>
    (product[key] || []).map((pkg) => ({
      product: product.name,
      slug: product.slug,
      market: product[`${key}Title`] || market,
      weight: pkg.weight,
      perCarton: pkg.unitPerBox
        ? `${pkg.unitPerBox} per box`
        : pkg.unitPerSack
          ? `${pkg.unitPerSack} per sack`
          : pkg.packing || '—',
      boxBarcode: pkg.boxBarcode || '—',
      boxSize: pkg.boxSize || '—',
    })),
  ),
);

const privateLabelProducts = products.filter((p) =>
  /private label/i.test(p.description),
);

const buyerTypes = [
  {
    title: 'Distributors and wholesalers',
    body: 'We distribute from Cebu across the Philippines. Super Q bihon, palabok, pancit canton and misua ship in sack and carton formats, each carton with its own barcode for warehouse and retail systems.',
  },
  {
    title: 'Food service and bulk buyers',
    body: 'For caterers, canteens, restaurants and commissaries, Super Q Golden Bihon comes in 12 kg sacks (in sack or paper-wrapped) as well as 1 kg packs. The compact cornstarch block gives considerable yield, which matters when you cook pancit by the tray.',
  },
  {
    title: 'Export importers',
    body: 'Super Q Golden Bihon, Special Palabok and Pancit Canton are produced in export pack sizes with their own carton barcodes and published carton dimensions, so an importer can plan container loads and register products before the first order.',
  },
  {
    title: 'Private label',
    body: 'We accept private label packing with certain order quantities for Super Q Golden Bihon, Super Q Pancit Canton and Long Life Pancit Canton.',
  },
];

const faqs = [
  {
    question: 'Is Ngosiok Marketing a bihon manufacturer or a trader?',
    answer:
      `A manufacturer. Ngosiok Marketing has made noodles in Cebu since 1945. Our office is at ${COMPANY_INFO.address} and our factory is in ${COMPANY_INFO.factory}.`,
  },
  {
    question: 'Do you supply bihon in bulk?',
    answer:
      'Yes. Super Q Golden Bihon is available in 12 kg sacks (in sack or paper-wrapped), plus 1 kg, 500 g and 227 g packs packed by the sack. Export cartons are available in 500 g, 454 g and 227 g sizes.',
  },
  {
    question: 'Do you accept private label orders?',
    answer:
      'Yes, with certain order quantities. Private label packing is offered for Super Q Golden Bihon, Super Q Pancit Canton and Long Life Pancit Canton. Contact sales with your product, pack size and expected volume to get the quantity required.',
  },
  {
    question: 'What is the minimum order quantity?',
    answer:
      'It depends on the product, pack size and whether the order is local, export or private label. Send sales your product and expected monthly volume and we will confirm the quantity and terms for your order.',
  },
  {
    question: 'Is Super Q bihon made from rice?',
    answer:
      'No. Super Q Golden Bihon is cornstarch-based. Its natural yellow colour comes from the cornstarch, not from added colouring. See our bihon guide for how cornstarch bihon differs from rice bihon.',
  },
  {
    question: 'Do you export?',
    answer:
      'Yes. Super Q Golden Bihon is sold locally and internationally, and Super Q Special Palabok and Super Q Pancit Canton are produced in export pack sizes with dedicated carton barcodes.',
  },
];

const inquiryChecklist = [
  'Product and pack size (for example, Super Q Golden Bihon 12 kg sack or 454 g export carton)',
  'Expected volume per month, or per shipment for export',
  'Delivery location, or destination country and port for export',
  'Whether you need private label packing',
  'Your business type: distributor, food service, retailer or importer',
];

export const Wholesale = () => {
  const canonicalUrl = `${SEO_CONFIG.siteUrl}/wholesale`;

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SEO_CONFIG.siteUrl },
      { '@type': 'ListItem', position: 2, name: 'Wholesale & Private Label', item: canonicalUrl },
    ],
  };

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SEO_CONFIG.siteUrl}/#organization`,
    name: COMPANY_INFO.name,
    url: SEO_CONFIG.siteUrl,
    logo: `${SEO_CONFIG.siteUrl}/logo.jpg`,
    foundingDate: String(COMPANY_INFO.foundedYear),
    email: COMPANY_INFO.email,
    telephone: COMPANY_INFO.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '325 B. Aranas Street',
      addressLocality: 'Cebu City',
      postalCode: '6000',
      addressCountry: 'PH',
    },
    brand: [
      { '@type': 'Brand', name: 'Super Q' },
      { '@type': 'Brand', name: 'Golden Q Bihon' },
      { '@type': 'Brand', name: 'Long Life' },
      { '@type': 'Brand', name: 'First Choice' },
      { '@type': 'Brand', name: 'Q1' },
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: COMPANY_INFO.email,
      telephone: COMPANY_INFO.mobile,
    },
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
        title="Bihon Supplier & Noodle Manufacturer in Cebu | Wholesale"
        description="Buy Super Q bihon direct from the Cebu manufacturer. Bulk sacks, export cartons and private label for distributors, food service and importers. Ask sales."
        canonical={canonicalUrl}
        ogImage={SEO_CONFIG.defaultOgImage}
        schema={[breadcrumbSchema, organizationSchema, faqSchema]}
      />

      <main className="pt-20 bg-white">
        <Section className="pb-0 pt-10">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8 flex-wrap">
            <Link to="/" className="hover:text-primary-600 transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium">Wholesale &amp; Private Label</span>
          </nav>
        </Section>

        <Section className="pt-0">
          <div className="max-w-3xl">
            <span className="text-primary-600 font-bold tracking-wider uppercase text-sm mb-3 block">
              For distributors, food service &amp; importers
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-gray-900 mb-8 leading-tight">
              Bihon Supplier and Noodle Manufacturer in Cebu, Philippines
            </h1>
            <p className="text-xl text-gray-700 leading-relaxed mb-6 font-medium">
              Ngosiok Marketing makes{' '}
              <Link to="/products/super-q-golden-bihon" className="text-primary-600 hover:underline">
                Super Q Golden Bihon
              </Link>{' '}
              and a full line of Filipino noodles in our own factory in Talisay City,
              Cebu, and has done so since 1945. We sell direct to distributors,
              wholesalers, food-service buyers and export importers, in bulk sacks,
              retail packs and export cartons, and we accept private label orders at
              volume.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              This page lists every bulk and export pack format we produce, with carton
              barcodes and dimensions, so you can plan an order before you contact us.
            </p>
          </div>
        </Section>

        <Section className="pt-0">
          <div className="max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-gray-900 mb-8">
              Who we supply
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {buyerTypes.map((type) => (
                <div key={type.title} className="border-l-4 border-primary-500 bg-gray-50 rounded-r-2xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{type.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{type.body}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        <Section className="pt-0">
          <div className="max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-gray-900 mb-4">
              Bulk and export packaging
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8 max-w-3xl">
              Pack sizes, units per sack or carton, carton barcodes and carton
              dimensions for each product. Sotanghon and fresh noodle formats are
              listed on their product pages.
            </p>
            <div className="overflow-x-auto rounded-2xl border border-gray-200">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-gray-700 font-bold border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3">Product</th>
                    <th className="px-4 py-3 whitespace-nowrap">Market</th>
                    <th className="px-4 py-3 whitespace-nowrap">Pack size</th>
                    <th className="px-4 py-3 whitespace-nowrap">Units</th>
                    <th className="px-4 py-3 whitespace-nowrap">Carton barcode</th>
                    <th className="px-4 py-3 whitespace-nowrap">Carton size (mm)*</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white">
                  {packagingRows.map((row) => (
                    <tr key={`${row.slug}-${row.market}-${row.weight}-${row.boxBarcode}`} className="align-top">
                      <td className="px-4 py-2.5 font-semibold">
                        <Link to={`/products/${row.slug}`} className="text-primary-600 hover:underline">
                          {row.product}
                        </Link>
                      </td>
                      <td className="px-4 py-2.5 text-gray-600 whitespace-nowrap">{row.market}</td>
                      <td className="px-4 py-2.5 text-gray-600 whitespace-nowrap">{row.weight}</td>
                      <td className="px-4 py-2.5 text-gray-600 whitespace-nowrap">{row.perCarton}</td>
                      <td className="px-4 py-2.5 text-gray-600 font-mono">{row.boxBarcode}</td>
                      <td className="px-4 py-2.5 text-gray-600 whitespace-nowrap">{row.boxSize}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-500 mt-2 italic">
              *Carton size: width × length × height, in millimetres.
            </p>
          </div>
        </Section>

        <Section className="pt-0">
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-gray-900 mb-6">
              Private label noodles
            </h2>
            <div className="space-y-5 text-lg text-gray-600 leading-relaxed">
              <p>
                We accept private label packing with certain order quantities for:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                {privateLabelProducts.map((p) => (
                  <li key={p.slug}>
                    <Link to={`/products/${p.slug}`} className="text-primary-600 hover:underline">
                      {p.name}
                    </Link>{' '}
                    — {p.category.toLowerCase()}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        <Section className="pt-0">
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-gray-900 mb-6">
              How to start a bulk or private label order
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              Email{' '}
              <a href={`mailto:${COMPANY_INFO.email}`} className="text-primary-600 font-semibold hover:underline">
                {COMPANY_INFO.email}
              </a>{' '}
              or call {COMPANY_INFO.phoneRange} with the following, and sales will
              come back with quantities and terms:
            </p>
            <ol className="space-y-4 list-none">
              {inquiryChecklist.map((item, i) => (
                <li key={item} className="flex gap-4 text-lg text-gray-600">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-600 text-white font-bold flex items-center justify-center text-sm">
                    {i + 1}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          </div>
        </Section>

        <Section className="pt-0">
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
            <p className="text-gray-600 mt-6">
              New to cornstarch bihon? Read{' '}
              <Link to="/bihon-guide" className="text-primary-600 font-semibold hover:underline">
                What Is Bihon? A Complete Guide
              </Link>
              .
            </p>
          </div>
        </Section>

        <Section className="pt-0 pb-24">
          <div className="bg-gradient-to-br from-primary-50 to-white border border-primary-100 rounded-3xl p-8 md:p-12 max-w-5xl">
            <h2 className="text-2xl md:text-3xl font-bold font-heading text-gray-900 mb-4">
              Talk to sales
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8 max-w-2xl">
              Distributor, food-service, export and private label inquiries go straight
              to our Cebu sales team.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={`mailto:${COMPANY_INFO.email}?subject=Wholesale%20inquiry`}
                className="inline-flex justify-center items-center gap-2 bg-primary-600 text-white px-6 py-3.5 rounded-xl font-bold hover:bg-primary-700 transition-colors shadow-lg shadow-primary/20"
              >
                Email Sales
              </a>
              <Link
                to="/contact"
                className="inline-flex justify-center items-center gap-2 bg-white text-gray-800 border-2 border-gray-200 px-6 py-3.5 rounded-xl font-bold hover:border-primary-600 hover:text-primary-600 transition-all"
              >
                Contact Details
              </Link>
            </div>
          </div>
        </Section>
      </main>
    </>
  );
};
