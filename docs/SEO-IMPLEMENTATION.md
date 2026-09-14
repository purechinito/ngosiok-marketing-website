# SEO & AI SEO Implementation

How search visibility works on this site, what runs at build time, and what
still needs doing by hand.

---

## The problem this solves

This site is a client-rendered Vite SPA. Before prerendering, `npm run build`
produced a single 1 KB `index.html` containing an empty `<div id="root">`.
Every title, meta tag, canonical URL and JSON-LD block was injected later by
`Seo.jsx` inside a `useEffect`.

That is fine for Googlebot, which renders JavaScript in a second pass. It is
fatal for the crawlers behind AI answer engines:

| Crawler | Feeds | Executes JavaScript |
| --- | --- | --- |
| GPTBot, OAI-SearchBot, ChatGPT-User | ChatGPT | No |
| ClaudeBot, Claude-User | Claude | No |
| PerplexityBot | Perplexity | No |
| CCBot | Common Crawl (many models) | No |
| Googlebot | Google Search, AI Overviews | Yes (delayed second pass) |

They fetch the HTML once and move on. So to every AI engine, the entire site
was one blank page. No amount of schema tuning fixes that, because the schema
was never in the HTML response.

---

## What runs at build time

`npm run build` now has a `postbuild` step:

```
vite build            → dist/index.html (the usual empty SPA shell)
node scripts/prerender.mjs → a real HTML file per route + sitemap.xml
```

`scripts/prerender.mjs` walks every route in `src/data/seo-routes.js` and
writes `dist/<route>/index.html` containing:

- the route's `<title>`, meta description and canonical URL
- Open Graph and Twitter Card tags
- JSON-LD structured data, marked `data-prerendered="true"`
- a readable text version of the page inside `#root`

It also regenerates `dist/sitemap.xml` from the same route list, so the sitemap
cannot drift out of sync with the pages that actually exist. **Do not create a
`public/sitemap.xml`** — it would be overwritten anyway.

No extra dependencies. The prerenderer is plain Node with no headless browser,
so the Vercel build stays fast and cannot fail on a Chromium download.

### Why this is not cloaking

The prerendered text is a faithful summary of what the React app renders, not
different content shown only to bots. That is ordinary prerendering and is
explicitly supported by Google.

### How the handoff works

The static copy lives inside `#root`. `main.jsx` calls `createRoot().render()`,
which clears the container on mount, so a visitor with JavaScript never sees
it. `Seo.jsx` additionally removes any `script[data-prerendered]` from the head
before injecting the live schema, so a JS client never ends up holding two
copies of the same structured data.

### Adding a page

1. Add the route to `src/App.jsx` as usual.
2. Add an entry to `seoRoutes` in `src/data/seo-routes.js` with `path`,
   `title`, `description`, `ogImage`, `changefreq`, `priority`, `schema` and
   `content`.

The sitemap, the prerendered HTML and the meta tags all follow from that one
entry. Forgetting step 2 means the page ships invisible to AI crawlers.

---

## Structured data

| Route | Schema types |
| --- | --- |
| `/` | Organization, WebSite |
| `/products` | BreadcrumbList, ItemList |
| `/products/:slug` | BreadcrumbList, Product |
| `/where-to-buy` | BreadcrumbList, FAQPage |
| `/about` | BreadcrumbList, Organization |
| `/contact` | BreadcrumbList, LocalBusiness |

The Organization node is the important one: it carries our brands (Super Q,
Golden Q, First Choice, Eagle VSP, Long Life, Q1), `areaServed` for every
export market, and `sameAs` links. That is what lets an answer engine state
that Ngosiok Marketing makes Super Q.

Nodes are linked by `@id` (`#organization`, `#website`, `#localbusiness`) so
search engines treat them as one entity rather than several.

---

## Crawler access

`public/robots.txt` lists every major AI crawler with an explicit `Allow`,
split into training/indexing crawlers and live retrieval agents. The old
`Crawl-delay: 1` was removed — Google ignores it, and the bots that honour it
were being slowed down for no reason.

`public/llms.txt` is a markdown summary of the company, products and common
questions, in the emerging convention AI crawlers look for.

---

## Hosting

`vercel.json` sets `cleanUrls: true` and keeps the SPA rewrite as a fallback.
Vercel checks the filesystem before applying rewrites, so `/where-to-buy`
serves the prerendered `dist/where-to-buy/index.html` and only unknown paths
fall through to the SPA shell. Netlify's `_redirects` behaves the same way —
a `200` rewrite does not shadow an existing file unless forced with `!`.

---

## Verifying a change

After `npm run build`:

```bash
# Should print real content, not an empty <div id="root">
cat dist/where-to-buy/index.html

# Every prerendered page should have exactly one title/description/canonical
grep -c '<title>' dist/products/super-q-golden-bihon/index.html
```

Then check externally:

- Rich Results Test — https://search.google.com/test/rich-results
- Schema validator — https://validator.schema.org/
- Facebook sharing debugger — https://developers.facebook.com/tools/debug/

---

## Still to do (needs a human)

These cannot be done from the codebase:

1. **Submit the sitemap** in Google Search Console and Bing Webmaster Tools
   (`https://www.superq.ph/sitemap.xml`). Nothing gets indexed quickly without
   this.
2. **Claim the Google Business Profile** for the Cebu office. The
   LocalBusiness schema supports it but does not replace it.
3. **Create the OG images** referenced by the routes: `og-home.jpg`,
   `og-about.jpg`, `og-products.jpg`, `og-contact.jpg`, 1200x630px. Only
   `og-default.jpg` currently exists, so the others fall back to a 404 and
   social shares render without a preview image.
4. **Earn links from coverage.** Press mentions of Super Q are the strongest
   available ranking signal and the main way AI engines learn to associate the
   brand with the manufacturer.
5. **Keep `/where-to-buy` current.** Stockist data lives in
   `src/data/availability.js`. Entries marked `community: true` are
   shopper-reported sightings, not distribution agreements — keep that
   distinction honest, and promote an entry only once supply is actually
   reliable.
6. **Add `/privacy` and `/terms`.** The footer links to both and neither route
   exists, so they currently render the 404 page.
