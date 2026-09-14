#!/usr/bin/env node
/**
 * Build-time prerenderer.
 *
 * Vite ships a single `index.html` with an empty `<div id="root">`. Googlebot
 * will render the JavaScript and eventually see the real page, but the AI
 * crawlers that feed ChatGPT, Claude, Perplexity and Gemini do not execute
 * JavaScript at all - they read the HTML response once. Without this step the
 * entire site is a blank page to them.
 *
 * For every route in `seoRoutes` this writes a real HTML file carrying the
 * correct title, meta, canonical, Open Graph tags, JSON-LD, and a readable
 * text version of the page inside #root. React calls createRoot().render(),
 * which clears the container on mount, so visitors still get the full app and
 * never see the static copy.
 *
 * It also regenerates sitemap.xml from the same route list, so the sitemap
 * cannot drift out of sync with the pages that actually exist.
 *
 * Run automatically via the `postbuild` npm script. No extra dependencies -
 * deliberately, so the Vercel build stays fast and cannot break on a
 * headless-browser install.
 */

import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { seoRoutes, escapeHtml } from '../src/data/seo-routes.js';
import { SEO_CONFIG } from '../src/utils/constants.js';

const projectRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const distDir = join(projectRoot, 'dist');
const SITE = SEO_CONFIG.siteUrl.replace(/\/$/, '');

/** Tags the template carries that we replace per route, so they never double up. */
const STRIP_PATTERNS = [
  /\s*<title>[\s\S]*?<\/title>/i,
  /\s*<meta\s+name="description"[\s\S]*?\/?>/i,
  /\s*<meta\s+name="keywords"[\s\S]*?\/?>/i,
  // index.html carries a default robots tag for dev and for the SPA fallback.
  // Without stripping it, every prerendered page shipped two robots metas, and
  // on /admin the runtime Seo component flipped only the first to noindex
  // while the second still said index,follow.
  /\s*<meta\s+name="robots"[\s\S]*?\/?>/i,
  /\s*<link\s+rel="canonical"[\s\S]*?\/?>/i,
  /\s*<script\s+type="application\/ld\+json"[\s\S]*?<\/script>/gi,
];

const meta = (attr, key, value) =>
  `    <meta ${attr}="${key}" content="${escapeHtml(value)}" />`;

const buildHead = (route) => {
  const canonical = `${SITE}${route.path === '/' ? '/' : route.path}`;
  const image = route.ogImage.startsWith('http') ? route.ogImage : `${SITE}${route.ogImage}`;
  const schemas = Array.isArray(route.schema) ? route.schema : [route.schema].filter(Boolean);

  const lines = [
    `    <title>${escapeHtml(route.title)}</title>`,
    meta('name', 'description', route.description),
    `    <link rel="canonical" href="${escapeHtml(canonical)}" />`,
    meta('name', 'robots', 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1'),
    meta('name', 'author', 'Ngosiok Marketing'),
    meta('property', 'og:type', route.path.startsWith('/products/') ? 'product' : 'website'),
    meta('property', 'og:site_name', 'Ngosiok Marketing'),
    meta('property', 'og:locale', 'en_PH'),
    meta('property', 'og:url', canonical),
    meta('property', 'og:title', route.title),
    meta('property', 'og:description', route.description),
    meta('property', 'og:image', image),
    meta('property', 'og:image:width', '1200'),
    meta('property', 'og:image:height', '630'),
    meta('name', 'twitter:card', 'summary_large_image'),
    meta('name', 'twitter:title', route.title),
    meta('name', 'twitter:description', route.description),
    meta('name', 'twitter:image', image),
    meta('name', 'theme-color', '#7e0f00'),
  ];

  if (SEO_CONFIG.twitterHandle) {
    lines.push(meta('name', 'twitter:site', SEO_CONFIG.twitterHandle));
  }

  for (const schema of schemas) {
    // `</` inside a JSON string would close the script tag early.
    const json = JSON.stringify(schema).replace(/<\//g, '<\\/');
    // `data-prerendered` lets the runtime Seo component clear these on mount,
    // so a JS client never ends up with both copies of the same schema.
    lines.push(
      `    <script type="application/ld+json" data-prerendered="true">${json}</script>`
    );
  }

  return lines.join('\n');
};

const renderRoute = (template, route) => {
  let html = template;
  for (const pattern of STRIP_PATTERNS) {
    html = html.replace(pattern, '');
  }

  html = html.replace('</head>', `${buildHead(route)}\n  </head>`);

  // The static copy lives inside #root. React clears the container on mount,
  // so this is what non-JS clients read and what nobody else ever sees.
  const replaced = html.replace(
    /<div id="root"><\/div>/,
    `<div id="root"><div id="prerendered-content">${route.content.trim()}</div></div>`
  );

  if (replaced === html) {
    throw new Error(
      'Could not find `<div id="root"></div>` in dist/index.html. ' +
        'If index.html changed, update the selector in scripts/prerender.mjs.'
    );
  }

  return replaced;
};

const outputPathFor = (routePath) =>
  routePath === '/'
    ? join(distDir, 'index.html')
    : join(distDir, routePath.replace(/^\//, ''), 'index.html');

const buildSitemap = () => {
  const today = new Date().toISOString().slice(0, 10);
  const entries = seoRoutes
    .map((route) => {
      const loc = `${SITE}${route.path === '/' ? '/' : route.path}`;
      return [
        '  <url>',
        `    <loc>${escapeHtml(loc)}</loc>`,
        `    <lastmod>${today}</lastmod>`,
        `    <changefreq>${route.changefreq}</changefreq>`,
        `    <priority>${route.priority}</priority>`,
        '  </url>',
      ].join('\n');
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<!-- Generated by scripts/prerender.mjs - do not edit by hand. -->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>
`;
};

const main = async () => {
  const templatePath = join(distDir, 'index.html');
  let template;
  try {
    template = await readFile(templatePath, 'utf8');
  } catch {
    throw new Error(`No build output at ${templatePath}. Run \`npm run build\` first.`);
  }

  for (const route of seoRoutes) {
    const outputPath = outputPathFor(route.path);
    await mkdir(dirname(outputPath), { recursive: true });
    await writeFile(outputPath, renderRoute(template, route), 'utf8');
  }

  await writeFile(join(distDir, 'sitemap.xml'), buildSitemap(), 'utf8');

  console.log(
    `Prerendered ${seoRoutes.length} routes and regenerated sitemap.xml with ${seoRoutes.length} URLs.`
  );
};

main().catch((error) => {
  console.error(`Prerender failed: ${error.message}`);
  process.exitCode = 1;
});
