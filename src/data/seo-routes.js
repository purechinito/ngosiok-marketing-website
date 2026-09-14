/**
 * Route-level SEO definitions and the static content emitted at build time.
 *
 * This module is imported by BOTH the Vite app and `scripts/prerender.mjs`
 * (plain Node, no bundler), so it must stay dependency-free and use relative
 * imports only - no `@/` alias, no JSX, no browser globals.
 *
 * Why the `content` strings exist: the site is a client-rendered SPA, so the
 * shipped HTML is an empty #root. Googlebot renders JavaScript, but the AI
 * crawlers (GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot) do not - they
 * read the HTML response once and move on. Prerendering a text summary of
 * each route into #root is what makes the site legible to them. React clears
 * the container on mount, so visitors still get the full app.
 */

import { products } from './products.js';
import { COMPANY_INFO, SEO_CONFIG, SOCIAL_LINKS } from '../utils/constants.js';
import { exportMarkets, uaeStockists, availabilityFaqs } from './availability.js';
import { noodleComparison, cookingSteps, bihonFaqs } from './bihon-guide.js';
import { productSeo } from './product-seo.js';

const SITE = SEO_CONFIG.siteUrl;

export const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

/** Collapse a product's multi-paragraph description into one clean sentence run. */
const flatten = (text) => String(text).replace(/\s*\n+\s*/g, ' ').trim();

const breadcrumb = (trail) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: trail.map((crumb, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: crumb.name,
    item: `${SITE}${crumb.path}`,
  })),
});

const faqSchema = (faqs) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: { '@type': 'Answer', text: faq.answer },
  })),
});

/**
 * Organization schema, enriched beyond the previous version with the brands
 * we own, the markets we ship to, and the export credentials - the entity
 * facts an answer engine needs to name us as the maker of Super Q.
 */
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE}/#organization`,
  name: COMPANY_INFO.name,
  alternateName: ['Ngosiok Marketing Corporation', 'Super Q Noodles'],
  url: SITE,
  logo: `${SITE}/logo.jpg`,
  image: `${SITE}/og-default.jpg`,
  description:
    'Ngosiok Marketing is a third-generation Filipino noodle manufacturer in Cebu City, maker of Super Q Golden Bihon, Special Palabok, Pancit Canton, Sotanghon, and Misua, exported worldwide.',
  foundingDate: '1943',
  numberOfEmployees: { '@type': 'QuantitativeValue', value: COMPANY_INFO.employees },
  slogan: COMPANY_INFO.tagline,
  email: COMPANY_INFO.email,
  telephone: COMPANY_INFO.phone,
  faxNumber: COMPANY_INFO.fax,
  address: {
    '@type': 'PostalAddress',
    streetAddress: '325 B. Aranas Street',
    addressLocality: 'Cebu City',
    addressRegion: 'Cebu',
    postalCode: '6000',
    addressCountry: 'PH',
  },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: COMPANY_INFO.phone,
      email: COMPANY_INFO.email,
      contactType: 'sales',
      areaServed: ['PH', 'AE', 'QA', 'SA', 'KW', 'BH', 'US', 'CA', 'GB', 'AU', 'HK', 'SG'],
      availableLanguage: ['English', 'Filipino'],
    },
  ],
  brand: [
    { '@type': 'Brand', name: 'Super Q' },
    { '@type': 'Brand', name: 'Golden Q' },
    { '@type': 'Brand', name: 'First Choice' },
    { '@type': 'Brand', name: 'Eagle VSP' },
    { '@type': 'Brand', name: 'Long Life' },
    { '@type': 'Brand', name: 'Q1' },
  ],
  areaServed: exportMarkets.flatMap((market) => market.countries),
  sameAs: [SOCIAL_LINKS.facebook, SOCIAL_LINKS.instagram, SOCIAL_LINKS.youtube],
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE}/#website`,
  url: SITE,
  name: COMPANY_INFO.name,
  publisher: { '@id': `${SITE}/#organization` },
  inLanguage: 'en',
};

/**
 * GS1 check digit for GTIN-8/12/13/14. Publishing an invalid GTIN is worse
 * than publishing none - search engines use it to merge product listings, so
 * a bad one either gets the markup rejected or ties us to someone else's
 * product. Everything here is validated before it reaches the page.
 */
export const isValidGtin = (code) => {
  if (typeof code !== 'string' || !/^\d+$/.test(code)) return false;
  if (![8, 12, 13, 14].includes(code.length)) return false;
  const digits = code.split('').map(Number);
  const check = digits.pop();
  let sum = 0;
  digits.reverse().forEach((digit, index) => {
    sum += digit * (index % 2 === 0 ? 3 : 1);
  });
  return (10 - (sum % 10)) % 10 === check;
};

/**
 * Our retail brands, longest first so that a prefix match cannot pick a
 * shorter name that happens to lead. Splitting on the first space (the
 * previous approach) produced "Super", "First" and "Long" - half a brand name
 * each, which is worse than useless in schema meant to establish who owns the
 * brand.
 */
const BRANDS = ['First Choice', 'Long Life', 'Eagle VSP', 'Golden Q', 'Super Q', 'Q1'].sort(
  (a, b) => b.length - a.length
);

export const brandOf = (productName) =>
  BRANDS.find((brand) => productName.startsWith(brand)) || COMPANY_INFO.name;

/** Which schema.org property a GTIN belongs in, by length. */
const gtinProperty = (code) =>
  ({ 8: 'gtin8', 12: 'gtin12', 13: 'gtin13', 14: 'gtin14' })[code.length];

/**
 * Flatten every packaging table on a product into one variant per barcode.
 *
 * Pack sizes carry their own GTINs, and a 227 g pack is a genuinely different
 * retail item from a 500 g pack. Modelling them as ProductGroup variants is
 * what lets a search engine match our page to a specific pack a shopper is
 * looking at, rather than guessing.
 */
export const productVariants = (product) => {
  const rows = [
    ...(product.localPackaging || []),
    ...(product.exportPackaging || []),
    ...(product.sharedPackaging || []),
    ...(product.customTables || []).flatMap((table) => table.data || []),
  ];

  const seen = new Set();
  const variants = [];

  for (const row of rows) {
    const code = row.productBarcode || row.barcode;
    if (!isValidGtin(code) || seen.has(code)) continue;
    seen.add(code);
    variants.push({
      '@type': 'Product',
      '@id': `${SITE}/products/${product.slug}#gtin-${code}`,
      name: `${product.name} ${row.weight}`,
      [gtinProperty(code)]: code,
      sku: code,
      size: String(row.weight),
      image: `${SITE}${product.image}`,
      brand: { '@type': 'Brand', name: brandOf(product.name) },
      manufacturer: { '@id': `${SITE}/#organization` },
      countryOfOrigin: { '@type': 'Country', name: 'Philippines' },
    });
  }

  return variants;
};

/** Product schema reused by the product detail routes and the product index. */
export const productSchema = (product) => {
  const seo = productSeo[product.slug] || {};
  const variants = productVariants(product);
  const images = [product.image, ...(product.additionalImages || [])].map(
    (path) => `${SITE}${path}`
  );

  const schema = {
    '@context': 'https://schema.org',
    '@type': variants.length > 1 ? 'ProductGroup' : 'Product',
    '@id': `${SITE}/products/${product.slug}#product`,
    name: product.name,
    description: seo.description || flatten(product.description),
    image: images,
    category: product.category,
    brand: { '@type': 'Brand', name: brandOf(product.name) },
    manufacturer: { '@id': `${SITE}/#organization` },
    countryOfOrigin: { '@type': 'Country', name: 'Philippines' },
    url: `${SITE}/products/${product.slug}`,
  };

  if (seo.alsoKnownAs) schema.alternateName = seo.alsoKnownAs;

  if (seo.material) {
    schema.material = seo.material;
    schema.additionalProperty = [
      { '@type': 'PropertyValue', name: 'Base ingredient', value: seo.material },
      { '@type': 'PropertyValue', name: 'Country of manufacture', value: 'Philippines' },
    ];
  }

  if (variants.length > 1) {
    schema.productGroupID = product.slug;
    schema.variesBy = 'https://schema.org/size';
    schema.hasVariant = variants;
  } else if (variants.length === 1) {
    Object.assign(schema, {
      sku: variants[0].sku,
      [gtinProperty(variants[0].sku)]: variants[0].sku,
      size: variants[0].size,
    });
  }

  return schema;
};

const listItem = (text) => `<li>${escapeHtml(text)}</li>`;

const productSummary = (product) => `
    <article>
      <h3>${escapeHtml(product.name)}</h3>
      <p><strong>Category:</strong> ${escapeHtml(product.category)}</p>
      <p>${escapeHtml(flatten(product.description))}</p>
      <ul>${(product.features || []).map(listItem).join('')}</ul>
      <p><a href="/products/${escapeHtml(product.slug)}">More about ${escapeHtml(product.name)}</a></p>
    </article>`;

const packagingRows = (rows, heading) => {
  if (!rows || rows.length === 0) return '';
  const cells = rows
    .map((row) => {
      const parts = [`${row.weight}`];
      if (row.productBarcode) parts.push(`barcode ${row.productBarcode}`);
      if (row.unitPerSack) parts.push(`${row.unitPerSack} units per sack`);
      if (row.unitPerBox) parts.push(`${row.unitPerBox} units per box`);
      if (row.packing) parts.push(String(row.packing));
      return listItem(parts.join(', '));
    })
    .join('');
  return `<h3>${escapeHtml(heading)}</h3><ul>${cells}</ul>`;
};

const faqBlock = (faqs) =>
  faqs
    .map(
      (faq) =>
        `<section><h3>${escapeHtml(faq.question)}</h3><p>${escapeHtml(faq.answer)}</p></section>`
    )
    .join('');

const companyFooterFacts = `
    <section>
      <h2>About Ngosiok Marketing</h2>
      <p>${escapeHtml(COMPANY_INFO.name)} is a family-run noodle manufacturer based at
      ${escapeHtml(COMPANY_INFO.address)}, with its production facility in
      ${escapeHtml(COMPANY_INFO.factory)}. Founded in Cebu in 1943 and re-established in 1945,
      the company is now run by the third generation of the Ngosiok family and employs around
      ${escapeHtml(COMPANY_INFO.employees)} people.</p>
      <p>Sales and distributor enquiries: ${escapeHtml(COMPANY_INFO.email)},
      ${escapeHtml(COMPANY_INFO.phoneRange)}.</p>
    </section>`;

const navBlock = `
    <nav>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/products">Products</a></li>
        <li><a href="/where-to-buy">Where to Buy</a></li>
        <li><a href="/bihon">What Is Bihon?</a></li>
        <li><a href="/feedback">Report a Problem</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </nav>`;

/** Every prerendered route. `content` lands inside #root for non-JS crawlers. */
export const seoRoutes = [
  {
    path: '/',
    title: 'Super Q Bihon & Filipino Noodles | Made in Cebu Since 1945',
    description:
      'Ngosiok Marketing makes Super Q Golden Bihon, Pancit Canton, Palabok, Sotanghon and Misua in Cebu, Philippines, and exports to the UAE, US, Europe and Asia. Find a stockist or become a distributor.',
    ogImage: `${SITE}/og-home.jpg`,
    changefreq: 'weekly',
    priority: '1.0',
    schema: [organizationSchema, websiteSchema],
    content: `
    <h1>Super Q: Premium Filipino Noodles, Made in Cebu Since 1945</h1>
    <p>Ngosiok Marketing is the Cebu-based manufacturer behind Super Q Golden Bihon, the
    cornstarch bihon that Filipino kitchens have trusted for three generations. We also produce
    Super Q Special Palabok, Pancit Canton, Sotanghon and Misua, plus the First Choice, Eagle VSP,
    Long Life and Golden Q lines.</p>
    <p>Our noodles are dried in a controlled environment rather than sun-dried, which is why
    Super Q bihon cooks up soft and bouncy without turning mushy, and why it has become the
    benchmark other bihon brands are measured against.</p>
    <h2>Our Noodles</h2>
    ${products.map(productSummary).join('')}
    <h2>Where to Buy Super Q</h2>
    <p>Super Q is sold nationwide across the Philippines and exported to the Middle East,
    North America, Europe and the Asia Pacific.
    <a href="/where-to-buy">See where to find Super Q in your country</a>.</p>
    ${companyFooterFacts}
    ${navBlock}`,
  },
  {
    path: '/products',
    title: 'Super Q Bihon, Pancit Canton, Palabok & Misua | Products',
    description:
      'Browse every noodle Ngosiok Marketing makes: Super Q Golden Bihon, Special Palabok, Pancit Canton, Sotanghon, Misua, First Choice Japanese ramen and more, with local and export pack sizes.',
    ogImage: `${SITE}/og-products.jpg`,
    changefreq: 'weekly',
    priority: '0.9',
    schema: [
      breadcrumb([
        { name: 'Home', path: '/' },
        { name: 'Products', path: '/products' },
      ]),
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Ngosiok Marketing noodle products',
        itemListElement: products.map((product, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          url: `${SITE}/products/${product.slug}`,
          name: product.name,
        })),
      },
    ],
    content: `
    <h1>Our Products</h1>
    <p>Ngosiok Marketing produces cornstarch-based, wheat-based and vermicelli noodles for the
    Philippine market and for export. Every line is available in retail pack sizes, and most are
    available for private label packing at qualifying volumes.</p>
    ${products.map(productSummary).join('')}
    <p><a href="/where-to-buy">Where to buy Super Q noodles worldwide</a></p>
    ${companyFooterFacts}
    ${navBlock}`,
  },
  {
    path: '/where-to-buy',
    title: 'Where to Buy Super Q Bihon | Dubai, UAE & Worldwide Stockists',
    description:
      'Looking for Super Q Golden Bihon in Dubai or the UAE? See which retailers stock Super Q, why supply arrives in waves, and how importers can order directly from the Cebu manufacturer.',
    ogImage: `${SITE}/og-default.jpg`,
    changefreq: 'weekly',
    priority: '0.9',
    schema: [
      breadcrumb([
        { name: 'Home', path: '/' },
        { name: 'Where to Buy', path: '/where-to-buy' },
      ]),
      faqSchema(availabilityFaqs),
    ],
    content: `
    <h1>Where to Buy Super Q Bihon</h1>
    <p>Super Q Golden Bihon is made in Cebu, Philippines by Ngosiok Marketing and exported to
    Filipino and Asian grocery retailers around the world. This page lists where shoppers are
    finding it, and how retailers and importers can order directly from us.</p>

    <h2>Super Q in the UAE and Dubai</h2>
    <p>Demand for Super Q among the Filipino community in the UAE regularly outpaces supply.
    In September 2025, a restock in Dubai sold out within hours of being shared in the Food Trip
    UAE community group. Because Super Q ships from Cebu in containers rather than continuously,
    shelves can empty between arrivals.</p>
    <ul>
      ${uaeStockists
        .map(
          (stockist) =>
            `<li><strong>${escapeHtml(stockist.name)}</strong> &mdash; ${escapeHtml(
              stockist.detail
            )}${stockist.community ? ' (shopper-reported, not an official listing)' : ''}</li>`
        )
        .join('')}
    </ul>
    <p>Stock moves quickly, so call the branch before travelling. If you run a UAE retailer and
    want reliable supply rather than intermittent stock, contact us directly at
    ${escapeHtml(COMPANY_INFO.email)}.</p>

    <h2>Export Markets</h2>
    ${exportMarkets
      .map(
        (market) =>
          `<section><h3>${escapeHtml(market.region)}</h3><ul>${market.countries
            .map(listItem)
            .join('')}</ul></section>`
      )
      .join('')}

    <h2>Export Pack Sizes</h2>
    <p>Super Q Golden Bihon export packs are produced in 227 g, 454 g and 500 g formats.</p>
    ${packagingRows(
      (products.find((product) => product.slug === 'super-q-golden-bihon') || {}).exportPackaging,
      'Super Q Golden Bihon export packaging'
    )}

    <h2>Become a Stockist or Distributor</h2>
    <p>Ngosiok Marketing works directly with importers, distributors and retail groups, and
    accepts private label packing at qualifying order volumes. Email
    ${escapeHtml(COMPANY_INFO.email)} or call ${escapeHtml(COMPANY_INFO.phoneRange)} to discuss
    territory, volumes and export packaging.</p>

    <h2>Frequently Asked Questions</h2>
    ${faqBlock(availabilityFaqs)}
    ${companyFooterFacts}
    ${navBlock}`,
  },
  {
    path: '/feedback',
    title: "Report a Problem | Can't Find Super Q? Tell Us",
    description:
      "Can't find Super Q on the shelf, or something wrong with a pack? Tell the Cebu team directly. No account needed, photos welcome, and stock-out reports go straight to our distributors.",
    ogImage: `${SITE}/og-default.jpg`,
    changefreq: 'monthly',
    priority: '0.6',
    schema: [
      breadcrumb([
        { name: 'Home', path: '/' },
        { name: 'Report a Problem', path: '/feedback' },
      ]),
      {
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        '@id': `${SITE}/feedback#contactpage`,
        name: 'Report a Problem',
        about: { '@id': `${SITE}/#organization` },
        inLanguage: 'en',
      },
    ],
    content: `
    <h1>Report a Problem</h1>
    <p>Cannot find Super Q on the shelf, or something wrong with a pack? Tell us directly and it
    goes straight to our team in Cebu.</p>
    <h2>What you can report</h2>
    <ul>
      <li>Stock-outs &mdash; a shop that has run out, and where it is</li>
      <li>Product quality issues</li>
      <li>Packaging problems</li>
      <li>Where-to-buy questions</li>
      <li>Distributor and bulk enquiries</li>
    </ul>
    <p>No account is needed and your name and email are optional. You can attach a photo if it
    helps explain the problem. Stock-out reports are the most useful thing you can send us:
    they tell us where supply is running short before our distributors do.</p>
    <p>Prefer to look for stockists first?
    <a href="/where-to-buy">See where to buy Super Q</a>.</p>
    ${companyFooterFacts}
    ${navBlock}`,
  },
  {
    path: '/bihon',
    title: 'What Is Bihon? Rice or Cornstarch, and How to Cook It',
    description:
      'Bihon explained by the people who make it. What bihon is actually made of, how it differs from canton, sotanghon and misua, and how to cook it without it turning mushy.',
    ogImage: `${SITE}/images/products/bihon.jpg`,
    changefreq: 'monthly',
    priority: '0.9',
    schema: [
      breadcrumb([
        { name: 'Home', path: '/' },
        { name: 'What Is Bihon?', path: '/bihon' },
      ]),
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        '@id': `${SITE}/bihon#article`,
        headline: 'What Is Bihon? Rice or Cornstarch, and How to Cook It',
        description:
          'A noodle manufacturer explains what bihon is made of, how it compares to other Filipino noodles, and how to cook it properly.',
        image: `${SITE}/images/products/bihon.jpg`,
        author: { '@id': `${SITE}/#organization` },
        publisher: { '@id': `${SITE}/#organization` },
        inLanguage: 'en',
        about: [
          { '@type': 'Thing', name: 'Bihon' },
          { '@type': 'Thing', name: 'Pancit' },
          { '@type': 'Thing', name: 'Filipino cuisine' },
        ],
      },
      faqSchema(bihonFaqs),
    ],
    content: `
    <h1>What Is Bihon?</h1>
    <p><strong>Bihon is a very fine, round noodle used across Filipino cooking</strong>, most
    famously in pancit bihon. The word describes the shape of the noodle, not a single recipe,
    which is why some sources say bihon is made of rice and others say cornstarch.</p>
    <p>Both are right. Traditional bihon is milled from rice flour, which is why it is often sold
    in English as rice sticks or rice vermicelli. Many commercial Filipino bihon are made from
    cornstarch instead. Super Q Golden Bihon is cornstarch-based; its golden colour comes from
    the cornstarch itself, not from added colouring. Cornstarch gives a bouncier bite and holds
    together better under prolonged tossing in a hot pan.</p>

    <h2>Bihon vs Canton vs Sotanghon vs Misua</h2>
    <table>
      <thead><tr><th>Noodle</th><th>Made from</th><th>Strand</th><th>Cooked texture</th><th>Classic dish</th></tr></thead>
      <tbody>
      ${noodleComparison
        .map(
          (row) =>
            `<tr><td><a href="/products/${escapeHtml(row.slug)}">${escapeHtml(
              row.noodle
            )}</a></td><td>${escapeHtml(row.base)}</td><td>${escapeHtml(
              row.strand
            )}</td><td>${escapeHtml(row.cooked)}</td><td>${escapeHtml(row.dish)}</td></tr>`
        )
        .join('')}
      </tbody>
    </table>

    <h2>How to Cook Bihon Without It Turning Mushy</h2>
    <p>The single most common mistake is boiling it. Bihon is not spaghetti.</p>
    <ol>
      ${cookingSteps
        .map(
          (step) =>
            `<li><strong>${escapeHtml(step.title)}</strong> ${escapeHtml(step.body)}</li>`
        )
        .join('')}
    </ol>

    <h2>Bihon Questions, Answered</h2>
    ${faqBlock(bihonFaqs)}
    <p><a href="/products/super-q-golden-bihon">See Super Q Golden Bihon</a> &middot;
    <a href="/where-to-buy">Where to buy</a></p>
    ${companyFooterFacts}
    ${navBlock}`,
  },
  {
    path: '/about',
    title: 'Our Story | Three Generations of Cebu Noodle Making',
    description:
      'From Fujian roots to a Cebu factory exporting worldwide: the story of Ngosiok Marketing, the family behind Super Q noodles, founded 1943 and re-established 1945.',
    ogImage: `${SITE}/og-about.jpg`,
    changefreq: 'monthly',
    priority: '0.8',
    schema: [
      breadcrumb([
        { name: 'Home', path: '/' },
        { name: 'About Us', path: '/about' },
      ]),
      organizationSchema,
    ],
    content: `
    <h1>Our Story</h1>
    <p>Ngosiok Marketing traces its roots to Fujian, China. Lucio Ngosiok started the business in
    Cebu in 1943, and re-established it in Cebu City in 1945 after the war. The second generation
    took over management in 1973, Ngosiok Marketing was formed in the mid-1970s, and the company
    is run today by the third generation.</p>
    <p>What began as a local noodle maker now supplies supermarkets across the Philippines and
    exports Super Q to the Middle East, North America, Europe and the Asia Pacific.</p>
    <h2>What Makes Our Noodles Different</h2>
    <ul>
      <li>Dried in a controlled environment rather than sun-dried, so batches stay clean and consistent.</li>
      <li>A proprietary production process developed in-house, minimising foreign matter from human handling.</li>
      <li>Compact bihon blocks that deliver a high cooked yield per pack.</li>
      <li>Around ${escapeHtml(COMPANY_INFO.employees)} employees across the Cebu City office and the Talisay City plant.</li>
    </ul>
    ${companyFooterFacts}
    ${navBlock}`,
  },
  {
    path: '/contact',
    title: 'Contact Ngosiok Marketing | Cebu Office & Distributor Enquiries',
    description:
      'Contact the makers of Super Q noodles. Cebu City office, phone, email and business hours, plus distributor, export and private label enquiries.',
    ogImage: `${SITE}/og-contact.jpg`,
    changefreq: 'monthly',
    priority: '0.7',
    schema: [
      breadcrumb([
        { name: 'Home', path: '/' },
        { name: 'Contact', path: '/contact' },
      ]),
      {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        '@id': `${SITE}/#localbusiness`,
        name: COMPANY_INFO.name,
        image: `${SITE}/logo.jpg`,
        logo: `${SITE}/logo.jpg`,
        description: 'Filipino noodle manufacturer in Cebu City, maker of Super Q noodles.',
        url: `${SITE}/contact`,
        telephone: COMPANY_INFO.phone,
        email: COMPANY_INFO.email,
        faxNumber: COMPANY_INFO.fax,
        priceRange: '$$',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '325 B. Aranas Street',
          addressLocality: 'Cebu City',
          addressRegion: 'Cebu',
          postalCode: '6000',
          addressCountry: 'PH',
        },
        geo: { '@type': 'GeoCoordinates', latitude: 10.2952342, longitude: 123.8829062 },
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            opens: '08:00',
            closes: '17:00',
          },
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: 'Saturday',
            opens: '08:00',
            closes: '12:00',
          },
        ],
        parentOrganization: { '@id': `${SITE}/#organization` },
        sameAs: [SOCIAL_LINKS.facebook, SOCIAL_LINKS.instagram, SOCIAL_LINKS.youtube],
      },
    ],
    content: `
    <h1>Contact Ngosiok Marketing</h1>
    <p><strong>Office:</strong> ${escapeHtml(COMPANY_INFO.address)}</p>
    <p><strong>Factory:</strong> ${escapeHtml(COMPANY_INFO.factory)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(COMPANY_INFO.phoneRange)}</p>
    <p><strong>Mobile:</strong> ${escapeHtml(COMPANY_INFO.mobile)}</p>
    <p><strong>Fax:</strong> ${escapeHtml(COMPANY_INFO.faxRange)}</p>
    <p><strong>Email:</strong> ${escapeHtml(COMPANY_INFO.email)}</p>
    <h2>Business Hours</h2>
    <ul>
      <li>Monday to Friday: 8:00 AM to 5:00 PM</li>
      <li>Saturday: 8:00 AM to 12:00 PM</li>
      <li>Sunday: Closed</li>
    </ul>
    <h2>Distributor and Export Enquiries</h2>
    <p>We work with importers, distributors and retail groups worldwide, and accept private label
    packing at qualifying order volumes. <a href="/where-to-buy">See our current markets</a>.</p>
    ${navBlock}`,
  },
  ...products.map((product) => ({
    path: `/products/${product.slug}`,
    // Titles and descriptions come from product-seo.js. The old fallback sliced
    // the spec text at 150 characters and appended "...", which cut mid-word
    // and read as a truncated paragraph in the search result.
    title: productSeo[product.slug]?.title || `${product.name} | Ngosiok Marketing`,
    description:
      productSeo[product.slug]?.description || flatten(product.description).slice(0, 155),
    ogImage: `${SITE}${product.image}`,
    changefreq: 'monthly',
    priority: '0.7',
    schema: [
      breadcrumb([
        { name: 'Home', path: '/' },
        { name: 'Products', path: '/products' },
        { name: product.name, path: `/products/${product.slug}` },
      ]),
      productSchema(product),
    ],
    content: `
    <h1>${escapeHtml(product.name)}</h1>
    <p><strong>Category:</strong> ${escapeHtml(product.category)}</p>
    <p><strong>Made by:</strong> ${escapeHtml(COMPANY_INFO.name)}, Cebu City, Philippines</p>
    ${
      productSeo[product.slug]?.material
        ? `<p><strong>Base ingredient:</strong> ${escapeHtml(
            productSeo[product.slug].material
          )}</p>`
        : ''
    }
    ${
      productSeo[product.slug]?.alsoKnownAs
        ? `<p><strong>Also known as:</strong> ${escapeHtml(
            productSeo[product.slug].alsoKnownAs.join(', ')
          )}</p>`
        : ''
    }
    <p>${escapeHtml(flatten(product.description))}</p>
    <h2>Key Features</h2>
    <ul>${(product.features || []).map(listItem).join('')}</ul>
    ${packagingRows(product.localPackaging, product.localPackagingTitle || 'Local Packaging')}
    ${packagingRows(product.exportPackaging, 'Export Packaging')}
    ${packagingRows(product.sharedPackaging, 'Packaging')}
    <p><a href="/where-to-buy">Where to buy ${escapeHtml(product.name)}</a> &middot;
    <a href="/products">All products</a></p>
    ${companyFooterFacts}
    ${navBlock}`,
  })),
];
