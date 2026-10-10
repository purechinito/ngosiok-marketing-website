import { createContext } from 'react';

/**
 * Build-time head collector.
 *
 * During pre-rendering (scripts/prerender.mjs), the app is rendered on the
 * server with a collector object provided through this context. The <Seo>
 * component writes its resolved title, description, canonical, OG image and
 * JSON-LD into it, and the pre-render script turns that into real <head> tags
 * in the static HTML. In the browser the context is null and <Seo> keeps
 * updating the head at runtime as before.
 */
export const HeadCollectorContext = createContext(null);
