import { useEffect } from 'react';
import { SEO_CONFIG } from '@/utils/constants';

function setMetaTag(attr, key, content) {
  if (!content) return;
  let element = document.querySelector(`meta[${attr}="${key}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attr, key);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function setLinkTag(rel, href) {
  if (!href) return;
  let element = document.querySelector(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    document.head.appendChild(element);
  }
  element.setAttribute('href', href);
}

/**
* SEO Component - Manages all meta tags and structured data for pages.
*
* Implemented with direct DOM updates instead of react-helmet-async, which
* does not reliably commit head changes under React 19 / React Router 7 -
* titles and meta tags were silently failing to update in production.
* Same props and behavior as before, just a working implementation.
*
* @param {string} title - Page title (appended with " | Ngosiok Marketing")
* @param {string} description - Page description for search engines
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
  useEffect(() => {
    const pageTitle = title
    ? `${title} | ${SEO_CONFIG.defaultTitle}`
      : SEO_CONFIG.defaultTitle;

            const canonicalUrl = canonical || `${SEO_CONFIG.siteUrl}${window.location.pathname}`;

            const fullImageUrl = ogImage.startsWith('http')
    ? ogImage
              : `${SEO_CONFIG.siteUrl}${ogImage}`;

            document.title = pageTitle;

            setMetaTag('name', 'title', pageTitle);
    setMetaTag('name', 'description', description);
    setLinkTag('canonical', canonicalUrl);
    setMetaTag('name', 'robots', noindex ? 'noindex,nofollow' : 'index,follow');

            setMetaTag('property', 'og:type', type);
    setMetaTag('property', 'og:url', canonicalUrl);
    setMetaTag('property', 'og:title', pageTitle);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:image', fullImageUrl);
    setMetaTag('property', 'og:image:width', '1200');
    setMetaTag('property', 'og:image:height', '630');
    setMetaTag('property', 'og:site_name', SEO_CONFIG.defaultTitle);
    setMetaTag('property', 'og:locale', 'en_PH');

            if (SEO_CONFIG.fbAppId) {
              setMetaTag('property', 'fb:app_id', SEO_CONFIG.fbAppId);
            }

            setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:url', canonicalUrl);
    setMetaTag('name', 'twitter:title', pageTitle);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', fullImageUrl);
    if (SEO_CONFIG.twitterHandle) {
      setMetaTag('name', 'twitter:site', SEO_CONFIG.twitterHandle);
    }

            setMetaTag('name', 'theme-color', '#7e0f00');
    setMetaTag('name', 'msapplication-TileColor', '#7e0f00');

            let schemaScript = document.getElementById('seo-schema-jsonld');
    if (schema) {
      if (!schemaScript) {
        schemaScript = document.createElement('script');
        schemaScript.id = 'seo-schema-jsonld';
        schemaScript.type = 'application/ld+json';
        document.head.appendChild(schemaScript);
      }
      schemaScript.textContent = JSON.stringify(schema);
    } else if (schemaScript) {
      schemaScript.remove();
    }
  }, [title, description, canonical, ogImage, schema, type, noindex]);

  return null;
};
