import { COMPANY_INFO, SEO_CONFIG, SOCIAL_LINKS } from '@/utils/constants';

/**
 * Shared structured-data nodes.
 *
 * Search engines and AI answer engines build an "entity" for a brand from
 * structured data, and they trust it more when every page describes the same
 * entity the same way. So the organization is defined once here, with a stable
 * @id, and other pages point to it by @id instead of redefining it.
 *
 * Every value here must be a verified fact (see
 * .claude/skills/seo-rank/references/brand-facts.md).
 */
export const ORG_ID = `${SEO_CONFIG.siteUrl}/#organization`;
export const WEBSITE_ID = `${SEO_CONFIG.siteUrl}/#website`;

export const orgRef = { '@id': ORG_ID };

export const postalAddress = {
  '@type': 'PostalAddress',
  streetAddress: '325 B. Aranas Street',
  addressLocality: 'Cebu City',
  addressRegion: 'Cebu',
  postalCode: '6000',
  addressCountry: 'PH',
};

export const organizationNode = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': ORG_ID,
  name: 'Ngosiok Marketing',
  alternateName: ['NGOSIOK MARKETING', 'Super Q', 'Super Q Bihon'],
  url: SEO_CONFIG.siteUrl,
  logo: {
    '@type': 'ImageObject',
    url: `${SEO_CONFIG.siteUrl}/logo.jpg`,
  },
  image: SEO_CONFIG.defaultOgImage,
  description: SEO_CONFIG.brandDescription,
  slogan: COMPANY_INFO.tagline,
  foundingDate: String(COMPANY_INFO.foundedYear),
  foundingLocation: {
    '@type': 'Place',
    name: 'Cebu City, Philippines',
  },
  address: postalAddress,
  email: COMPANY_INFO.email,
  telephone: COMPANY_INFO.phone,
  numberOfEmployees: {
    '@type': 'QuantitativeValue',
    value: COMPANY_INFO.employees,
  },
  knowsAbout: [
    'Bihon',
    'Cornstarch noodles',
    'Pancit canton',
    'Palabok',
    'Sotanghon',
    'Misua',
    'Filipino noodles',
    'Private label noodle manufacturing',
  ],
  brand: [
    { '@type': 'Brand', name: 'Super Q' },
    { '@type': 'Brand', name: 'Golden Q Bihon' },
    { '@type': 'Brand', name: 'Eagle VSP' },
    { '@type': 'Brand', name: 'First Choice' },
    { '@type': 'Brand', name: 'Long Life' },
    { '@type': 'Brand', name: 'Q1' },
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'sales',
    email: COMPANY_INFO.email,
    telephone: COMPANY_INFO.mobile,
  },
  sameAs: [
    // Wikidata item for the company — ties the site to the knowledge graph.
    'https://www.wikidata.org/wiki/Q141683048',
    SOCIAL_LINKS.facebook,
    SOCIAL_LINKS.instagram,
    SOCIAL_LINKS.youtube,
  ],
};

export const websiteNode = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  name: 'Super Q',
  alternateName: ['Ngosiok Marketing', 'superq.ph'],
  url: `${SEO_CONFIG.siteUrl}/`,
  publisher: orgRef,
  inLanguage: 'en-PH',
};
