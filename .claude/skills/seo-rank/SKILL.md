---
name: seo-rank
description: Autonomous SEO research, content, and distribution engine for the Super Q / Ngosiok Marketing site (superq.ph). Use when working on search rankings, keyword research, competitor analysis, blog or recipe content, product page SEO, schema markup, meta tags, sitemap updates, internal linking, or social captions for this repo. Triggers on "SEO", "rank", "ranking", "keywords", "organic traffic", "blog post", "schema", "meta description", "sitemap", "backlinks", "Google", "search visibility".
---

# Super Q SEO Rank Engine

Drive superq.ph to #1 for Philippine bihon and pancit noodle searches. This is a
food manufacturer's site, not a blog farm — every claim must be true, every page
must serve a real buyer (household cook, distributor, or export importer).

## The competitive reality

Head terms like "pancit bihon brand" and "best bihon" are currently owned by
**user-generated content** (Facebook cooking groups, r/filipinofood) and
**marketplace listings** (Citimart), not manufacturer sites. Competing brands
that surface: Wai Wai, Hobe.

You will not beat a 210-comment Facebook thread by writing a better product spec
sheet. The winning strategy is three-pronged:

1. **Own the long tail first.** Comparison, how-to, and recipe intent, where
   manufacturer authority actually wins. Rank there, build topical authority,
   then climb toward head terms.
2. **Win the rich result.** Schema-driven SERP real estate (product cards, FAQ
   accordions, breadcrumbs, review stars) beats a plain blue link even at
   position 3.
3. **Be the cited source.** Publish the definitive, factual reference on bihon
   (what cornstarch-based bihon is, how it differs from rice bihon, why yield
   matters) so bloggers and AI answer engines cite superq.ph.

## Non-negotiables

This is a food business with real barcodes, real export customers, and real
regulatory exposure. Violating these causes actual harm, not just a ranking dip.

- **Never invent a fact.** No made-up nutrition figures, certifications (HACCP,
  FDA, halal, ISO), awards, ingredient lists, shelf life, prices, or customer
  quotes. If it is not in `references/brand-facts.md` or already in the repo,
  it does not get published — flag the gap and ask instead.
- **Never invent a barcode, weight, or box dimension.** These live in
  `src/data/products.js` and are shipped on real packaging.
- **Never fabricate reviews or ratings.** `AggregateRating` schema without
  genuine collected reviews is a Google structured-data violation and can earn a
  manual penalty. Build the review collection mechanism first.
- **Never claim health benefits.** "Premium," "high yield," "quality" are safe.
  "Healthy," "low-fat," "gluten-free" are regulated claims — omit unless verified.
- **Never invent search volumes.** You do not have keyword-tool access. Label
  every estimate as unverified and route confirmation through Google Search
  Console. Fake numbers produce fake strategy.
- **No keyword stuffing, cloaking, doorway pages, or AI filler.** Copy is written
  for a Filipino home cook or a purchasing manager, and it must read that way.

## Repo map — where SEO actually lives

| Concern | File |
|---|---|
| Static fallback meta + OG (what non-JS scrapers see) | `index.html` |
| Runtime meta, canonical, OG, JSON-LD injection | `src/components/common/Seo.jsx` |
| Site URL, default title/description/OG image, socials | `src/utils/constants.js` |
| Product catalog, barcodes, packaging | `src/data/products.js` |
| Routes (every new page needs one) | `src/App.jsx` |
| Page-level schema + copy | `src/pages/*.jsx` |
| Crawl directives | `public/robots.txt` |
| URL discovery | `public/sitemap.xml` |
| SPA rewrite config | `vercel.json` |

**Critical architectural constraint:** this is a client-rendered Vite SPA.
`Seo.jsx` injects tags via `useEffect` **after** JavaScript runs. Googlebot
renders JS, but **Facebook, X, LinkedIn, and WhatsApp scrapers do not**. Any
og:/twitter: tag that exists only in `Seo.jsx` is invisible to social sharing.
Static fallbacks in `index.html` are therefore load-bearing, not redundant.

## Phase 1 — Research before writing

1. Read `references/keyword-map.md` for the current cluster plan and what is
   already claimed.
2. Identify the target query's **search intent**: informational, commercial
   comparison, transactional, or B2B/wholesale. Intent dictates page type.
3. Inspect who currently ranks and *why* — UGC thread, marketplace, competitor
   brand, or recipe blog. Name the format you must beat.
4. Find the content gap. Never publish a page that merely restates what the
   current #1 already says better.

## Phase 2 — Titles and keyword targets

Produce, per proposed page:
- Primary keyword (one, unambiguous)
- 3–6 supporting/semantic keywords
- Search intent classification
- Target URL slug (lowercase, hyphenated, no stop words)
- Internal link targets (which existing pages link in, which it links out to)

Titles must be click-worthy without clickbait, ≤60 characters where possible,
and must not promise anything the page does not deliver.

## Phase 3 — Content production

House rules for any new content page:
- One `<h1>`, then a logical `<h2>`/`<h3>` outline. Never skip levels.
- Answer the query in the **first 100 words**. No throat-clearing preamble.
- Write in the brand's register: heritage-confident, plainly factual, never hype.
  Filipino culinary terms (pancit, palabok, sotanghon, guisado) stay untranslated.
- Every product mention links to its `/products/<slug>` page.
- Every page must earn at least two internal links pointing **to** it.
- Add an FAQ block with `FAQPage` schema when the query has clear sub-questions.

**Page scaffolding checklist** (all five, or the page is not done):
1. Component in `src/pages/`
2. Route in `src/App.jsx`
3. `<Seo>` with title, description, canonical, ogImage, and schema
4. Entry in `public/sitemap.xml` with correct `lastmod`
5. Internal links wired in from existing pages

## Phase 4 — On-page and technical

- Descriptions: 140–160 chars, one concrete benefit, one call to action.
- Canonical on every page, absolute, built from `SEO_CONFIG.siteUrl`.
- Schema per page type: `Organization` (home), `LocalBusiness` (contact),
  `Product` + `BreadcrumbList` (product detail), `BreadcrumbList` (section
  pages), `Article` + `BreadcrumbList` (content), `Recipe` (recipes),
  `FAQPage` (FAQ blocks). Validate mentally against schema.org before shipping.
- Images: descriptive `alt` naming the product, `loading="lazy"` below the fold.
  Only reference images that exist under `public/images/` — verify the path.
- Keep Core Web Vitals honest: this site already ships `three`, `gsap`, and
  `framer-motion`. Do not add heavy dependencies to a content page.

## Phase 5 — Distribution

Live channels are in `src/utils/constants.js` (`SOCIAL_LINKS`): Facebook,
Instagram `@superq_bihon`, YouTube. For each published page, draft 1–2 caption
variants per platform: value-first, skimmable, soft CTA, no engagement bait.

Visual rules: use **real** images from `public/images/` only. Never invent or
describe product visuals that do not exist. If no suitable image exists, say so
and stop rather than shipping a placeholder.

Off-site priorities, in order: Google Business Profile (Cebu City + Talisay
factory), genuine presence in the Facebook/Reddit threads already ranking,
Filipino food-blogger outreach, and retailer/distributor listing accuracy.

## Phase 6 — Quality gates

Before any commit:
```bash
npm run lint
npm run build
```
Then verify by reading the diff:
- No fabricated fact, figure, barcode, rating, or certification.
- Every new route is in both `App.jsx` and `sitemap.xml`.
- Every referenced image path exists.
- Facts agree with `references/brand-facts.md` — especially dates. The
  1943/1945 distinction is real and frequently gotten wrong (see brand-facts).
- No `keywords` meta reintroduced. Google has ignored it since 2009.

## Phase 7 — Ship

Commit with a clear message, push to the working branch, open a draft PR
summarizing: what was targeted, what was published, and what needs human
verification (facts you could not confirm, reviews to collect, GBP actions).

## Measurement and the long game

Track in Google Search Console, not vibes: impressions → average position →
clicks, per query cluster. Impressions rising while position is still 20+ is
**success in progress**, not failure — it means Google has begun trusting the
page for that query.

Realistic horizon: long-tail wins in 4–10 weeks, head terms in 6–12 months.
Rankings dip during reindexing. That is weather, not climate. The compounding
only works if publishing stays consistent — one solid page shipped per week
beats ten drafted in a burst and abandoned.

## Open items requiring a human decision

Carry these forward; do not silently resolve them:
- **Prerendering/SSR.** Client-only rendering slows indexing and breaks social
  scrapers. Fixing properly means adding prerendering to the Vite build — an
  architecture change that needs sign-off.
- **Review collection.** Needed before any `AggregateRating` schema is legitimate.
- **Google Business Profile.** Off-repo, owner-only action.
