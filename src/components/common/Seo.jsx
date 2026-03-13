import { Helmet } from 'react-helmet-async';
import { SEO_CONFIG } from '@/utils/constants';

/**
 * SEO Component - Manages all meta tags and structured data for pages
 * 
 * @param {string} title - Page title (will be appended with " | Ngosiok Marketing")
 * @param {string} description - Page description for search engines (write as compelling ad copy)
 * @param {string} canonical - Full canonical URL (defaults to current page)
 * @param {string} ogImage - Open Graph image URL (1200x630px recommended)
 * @param {Object} schema - Schema.org structured data object (JSON-LD)
 * @param {string} type - Open Graph type (default: "website")
 * @param {boolean} noindex - If true, prevents search engine indexing
 */
export const Seo = ({
  title = "",
  description = SEO_CONFIG.defaultDescription,
  canonical = "",
  ogImage = SEO_CONFIG.defaultOgImage,
  schema = null,
  type = "website",
  noindex = false,
}) => {
  // Build the full page title
  const pageTitle = title
    ? `${title} | ${SEO_CONFIG.defaultTitle}`
    : SEO_CONFIG.defaultTitle;

  // Build canonical URL
  const canonicalUrl = canonical || `${SEO_CONFIG.siteUrl}${window.location.pathname}`;

  // Ensure image is absolute URL
  const fullImageUrl = ogImage.startsWith('http') 
    ? ogImage 
    : `${SEO_CONFIG.siteUrl}${ogImage}`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{pageTitle}</title>
      <meta name="title" content={pageTitle} />
      <meta name="description" content={description} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Robots */}
      {noindex && <meta name="robots" content="noindex,nofollow" />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={SEO_CONFIG.defaultTitle} />
      <meta property="og:locale" content="en_PH" />
      
      {SEO_CONFIG.fbAppId && (
        <meta property="fb:app_id" content={SEO_CONFIG.fbAppId} />
      )}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      {SEO_CONFIG.twitterHandle && (
        <meta name="twitter:site" content={SEO_CONFIG.twitterHandle} />
      )}

      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#7e0f00" />
      <meta name="msapplication-TileColor" content="#7e0f00" />

      {/* Schema.org Structured Data (JSON-LD) */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
};
