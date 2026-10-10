/**
 * Build-time pre-renderer.
 *
 * Why: the site is a client-rendered React SPA. Without this step every URL
 * serves an empty <div id="root"></div>, so search crawlers, social scrapers
 * and AI answer engines (ChatGPT, Perplexity, Claude, Gemini) that do not run
 * JavaScript see no content and no per-page meta. This script renders each
 * route to static HTML after `vite build`, with that page's own title,
 * description, canonical, Open Graph tags and JSON-LD written into <head>.
 *
 * Routes come from public/sitemap.xml so the sitemap stays the single list of
 * public pages: add a page to the sitemap and it gets pre-rendered.
 *
 * Browsers still load the normal client bundle, which re-renders the page and
 * keeps all interactivity.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distDir = path.join(root, 'dist');
const serverEntry = path.join(root, 'dist-ssr', 'entry-server.js');

const { render } = await import(pathToFileURL(serverEntry).href);

const template = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8');
const sitemap = fs.readFileSync(path.join(root, 'public', 'sitemap.xml'), 'utf8');

const routes = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)]
  .map((m) => new URL(m[1].trim()).pathname)
  .filter((p, i, all) => all.indexOf(p) === i);

if (routes.length === 0) {
  throw new Error('prerender: no <loc> entries found in public/sitemap.xml');
}

const escapeAttr = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

// JSON-LD must not be able to close its own <script> tag.
const safeJson = (obj) => JSON.stringify(obj).replace(/</g, '\\u003c');

function buildHead(head) {
  const tags = [
    `<title>${escapeAttr(head.title)}</title>`,
    `<meta name="title" content="${escapeAttr(head.title)}" />`,
    `<meta name="description" content="${escapeAttr(head.description)}" />`,
    `<link rel="canonical" href="${escapeAttr(head.canonical)}" />`,
    `<meta name="robots" content="${head.noindex ? 'noindex,nofollow' : 'index,follow'}" />`,
    `<meta property="og:type" content="${escapeAttr(head.type)}" />`,
    `<meta property="og:url" content="${escapeAttr(head.canonical)}" />`,
    `<meta property="og:title" content="${escapeAttr(head.title)}" />`,
    `<meta property="og:description" content="${escapeAttr(head.description)}" />`,
    `<meta property="og:image" content="${escapeAttr(head.ogImage)}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:site_name" content="Ngosiok Marketing" />`,
    `<meta property="og:locale" content="en_PH" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:url" content="${escapeAttr(head.canonical)}" />`,
    `<meta name="twitter:title" content="${escapeAttr(head.title)}" />`,
    `<meta name="twitter:description" content="${escapeAttr(head.description)}" />`,
    `<meta name="twitter:image" content="${escapeAttr(head.ogImage)}" />`,
  ];
  if (head.schema) {
    tags.push(
      `<script type="application/ld+json" id="seo-schema-jsonld">${safeJson(head.schema)}</script>`,
    );
  }
  return tags.join('\n    ');
}

// Remove the template's generic tags so each page carries only its own.
function stripTemplateHead(html) {
  return html
    .replace(/<title>[\s\S]*?<\/title>\s*/i, '')
    .replace(/<link\s+rel="canonical"[\s\S]*?\/>\s*/i, '')
    .replace(
      /<meta\s+(?:name|property)="(?:title|description|robots|og:[^"]+|twitter:[^"]+)"[\s\S]*?\/>\s*/gi,
      '',
    )
    .replace(/<!--\s*Static fallback tags[\s\S]*?-->\s*/i, '');
}

// Keep an untouched copy of the app shell as the fallback for unknown URLs
// (see vercel.json / public/_redirects). Without this, dist/index.html would
// hold the pre-rendered home page and every 404 would serve home content.
// Every real page is pre-rendered from the sitemap, so anything served from the
// fallback is an unknown URL: mark it noindex so Google never reports it as a
// soft 404. (A page missing from sitemap.xml would also get noindex — which is
// why every route must be listed there.)
fs.writeFileSync(
  path.join(distDir, 'spa-fallback.html'),
  template.replace(/<meta\s+name="robots"[^>]*>/i, '<meta name="robots" content="noindex,follow" />'),
);

const baseTemplate = stripTemplateHead(template);
let written = 0;
const missingHead = [];

for (const route of routes) {
  const { html, head } = render(route);

  if (!html || html.length < 200) {
    throw new Error(`prerender: ${route} rendered almost nothing (${html.length} chars)`);
  }
  if (!head) {
    missingHead.push(route);
  }

  const page = baseTemplate
    .replace('</head>', `    ${head ? buildHead(head) : ''}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`);

  const outFile =
    route === '/'
      ? path.join(distDir, 'index.html')
      : path.join(distDir, route.replace(/^\//, ''), 'index.html');

  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, page);
  written += 1;
}

console.log(`prerender: wrote ${written} static pages from sitemap.xml`);
if (missingHead.length) {
  console.warn(`prerender: no <Seo> data on ${missingHead.join(', ')} — page has no title/meta`);
}
