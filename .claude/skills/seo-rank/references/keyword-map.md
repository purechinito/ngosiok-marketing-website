# Keyword Map & Content Roadmap

**Status:** initial strategic map. All volume/difficulty estimates below are
**unverified reasoning, not tool data.** Confirm against Google Search Console
before treating any of it as fact. Update this file as real data arrives.

## Observed SERP landscape

For the head term **"Pancit Bihon brand"** the first page is held by:

1. Facebook — Filipino Cooking Group thread, "What's the best brand of bihon do
   you use for your pancit?" (210+ comments)
2. Citimart — e-commerce collection page for bihon
3. Reddit — r/filipinofood, "Best Pancit in the Philippines"

Competing brands visible in those results: **Wai Wai**, **Hobe**.

**Read:** Google is answering this query with *community consensus*, not
manufacturer authority. No brand site ranks. That is simultaneously the bad news
(you cannot outrank a Facebook thread with a spec sheet) and the good news (no
competitor has solved this either — the lane is open).

## Cluster 1 — Bihon education (build authority here first)

Intent: informational. Manufacturer authority wins. Lowest competition.

| Target query | Page type | Priority |
|---|---|---|
| what is bihon | Guide | High |
| cornstarch bihon vs rice bihon | Comparison guide | High |
| bihon vs sotanghon vs canton | Comparison guide | High |
| how to cook bihon without breaking | How-to | Medium |
| why does my pancit get soggy | How-to / FAQ | Medium |
| bihon noodle types explained | Pillar guide | High |

**Angle:** Super Q's cornstarch base is a genuine technical differentiator most
competitors cannot claim. The definitive explainer on cornstarch vs rice bihon is
both honest content and a structural moat. This is the pillar page.

## Cluster 2 — Buyer comparison (where the money is)

Intent: commercial. Higher difficulty, highest conversion.

| Target query | Page type | Priority |
|---|---|---|
| best bihon brand philippines | Guide + brand case | High |
| best pancit canton brand | Guide | Medium |
| what brand of bihon for pancit | Guide / FAQ | High |
| bihon brand comparison | Comparison | Medium |

**Rule:** do not publish disparaging competitor comparisons. Compete on
verifiable attributes — cornstarch base, controlled-environment production,
yield, texture retention. Let the buyer conclude.

## Cluster 3 — Recipe intent (traffic volume + backlink magnet)

Intent: informational, high volume, recipe-rich-result eligible via `Recipe`
schema. Recipes attract the food-blogger links that lift the whole domain.

| Target query | Page type | Priority |
|---|---|---|
| pancit bihon recipe | Recipe | High |
| pancit bihon guisado recipe | Recipe | High |
| pancit palabok recipe | Recipe | Medium |
| sotanghon guisado recipe | Recipe | Medium |
| pancit canton recipe | Recipe | Medium |
| pancit for birthday / handaan | Seasonal recipe | Medium |

**Constraint:** recipes must be genuinely tested and accurate. Publish only
recipes the business can stand behind. Every recipe links to the product used.

## Cluster 4 — B2B / wholesale (low volume, highest value)

Intent: transactional B2B. Very low competition. Likely the fastest real revenue.

| Target query | Page type | Priority |
|---|---|---|
| bihon supplier philippines | Landing page | High |
| bihon manufacturer cebu | Landing page | High |
| noodle manufacturer philippines | Landing page | Medium |
| private label noodles philippines | Landing page | High |
| bihon wholesale supplier | Landing page | Medium |
| noodle exporter philippines | Landing page | Medium |

**Angle:** `products.js` already documents export packaging, box barcodes, and
box dimensions — exactly what an importer needs. Private-label capability is
stated on two products and is currently invisible to search. This cluster is
underserved and directly monetisable.

## Cluster 5 — Local / branded

Intent: navigational + local.

| Target query | Owner |
|---|---|
| super q bihon | Home + product pages (defend) |
| ngosiok marketing | Home + about |
| super q golden bihon | Product page |
| bihon cebu | Local / contact page |

Supported by `LocalBusiness` schema on contact plus Google Business Profile
(off-repo, owner action).

## Sequencing

Do not attack head terms first. Order of execution:

1. **Foundation** — fix technical leaks (static OG tags, meta accuracy).
2. **Cluster 1 pillar** — the bihon explainer. Everything else links to it.
3. **Cluster 4** — B2B pages. Low competition, fast wins, real revenue.
4. **Cluster 3** — recipes. Volume and backlinks.
5. **Cluster 2** — comparison pages, once domain authority exists to support them.
6. **Head terms** — only after 1–5 have compounded.

## Published — ranking targets claimed

Log each page here on publish with its target query and publish date so future
sessions do not duplicate or cannibalise.

| Page | URL | Target query | Published |
|---|---|---|---|
| Bihon Guide (Cluster 1 pillar) | `/bihon-guide` | what is bihon | 2026-09-15 |
| Wholesale & Private Label (Cluster 4 hub) | `/wholesale` | bihon supplier philippines | 2026-10-10 |
| Recipes hub (Cluster 3) | `/recipes` | filipino noodle recipes | 2026-10-16 |
| Pancit Bihon Guisado | `/recipes/pancit-bihon-guisado` | pancit bihon recipe | 2026-10-16 |
| Pancit Bam-i | `/recipes/pancit-bam-i` | pancit bam-i recipe | 2026-10-16 |
| Pancit Palabok | `/recipes/pancit-palabok` | pancit palabok recipe | 2026-10-16 |
| Chicken Sotanghon Soup | `/recipes/chicken-sotanghon-soup` | chicken sotanghon soup recipe | 2026-10-16 |
| Pancit Canton Guisado | `/recipes/pancit-canton-guisado` | pancit canton recipe | 2026-10-16 |
| Pancit Bilao | `/recipes/pancit-bilao` | pancit bilao recipe | 2026-10-16 |
| Birthday Misua Soup | `/recipes/birthday-misua-soup` | misua soup recipe | 2026-10-16 |
| Seafood Pancit Bihon | `/recipes/seafood-pancit-bihon` | seafood pancit bihon | 2026-10-16 |
| Misua with Sardines | `/recipes/misua-with-sardines` | misua with sardines | 2026-10-16 |
| Best Bihon Brand (buyer's guide) | `/best-bihon-brand-philippines` | best bihon brand in the philippines | 2026-10-16 |
| Where to Buy + stock report | `/where-to-buy` | where to buy super q bihon | 2026-10-16 |

**Claimed by the pillar** — do not build separate pages for these; they are
sections within `/bihon-guide` and should stay there:
`cornstarch bihon vs rice bihon`, `bihon vs sotanghon`, `bihon vs pancit canton`,
`how to tell good bihon`, `why does my pancit get soggy`, `do you soak bihon`.

If any of these earns significant impressions on its own in Search Console, that
is the signal to split it into a dedicated page — not before.

**Claimed by the wholesale hub** — sections within `/wholesale`, not separate pages
until Search Console shows they earn impressions on their own:
`bihon manufacturer cebu`, `bihon wholesale supplier`, `private label noodles philippines`,
`noodle exporter philippines`, `bihon bulk`, `bihon minimum order`.

**Recipe pages are the scale axis** (modelled on SeriousMD's per-doctor
`/doc/<name>` pages): one indexed page per dish, generated from
`src/data/recipes.js`. Adding a recipe = one entry there + one sitemap `<loc>`
(the sitemap also drives prerendering). One dish per page; never two recipes
targeting the same dish name. `pancit bihon guisado` lives in the recipe, not
in `/bihon-guide`, which links to it.

**Bilao vs guisado:** `/recipes/pancit-bilao` targets party-tray and selling
intent (`pancit bilao`, `pancit bilao pang negosyo`); `/recipes/pancit-bihon-guisado`
targets the home recipe (`pancit bihon recipe`). Keep them distinct: scaling,
tray assembly and delivery belong on bilao, never on guisado.

**Claimed by the buyer's guide** (sections, not separate pages):
`golden q bihon`, `super q vs golden q`, `super q bihon grams`,
`bihon price per gram`, `how many people does 500g bihon feed`.

**Claimed by where-to-buy:** `where to buy super q`, `super q out of stock`.
Per-city stockist pages stay blocked until the owner supplies the distributor
list. Do not create city pages without real stockists.

**Still blocked on owner input:**
- Head-to-head brand comparisons naming Wai Wai, Hobe or others: needs the
  owner's competitor pack facts.
- Any survey or popularity claim: needs source, sample size, date and method.

## Search Console evidence (owner screenshots, 2026-10-16)

Last 3 months: 115 clicks, 8.5K impressions, 1.4% CTR, average position 6.2.
Impressions climbed from near zero in July to roughly 200–250 a day by
October, after prerendering shipped. Top queries in the last 28 days:

| Query | Clicks | Note |
|---|---|---|
| super q | 6 | +20% |
| super q pancit canton | 3 | new; answered by `/recipes/pancit-canton-guisado` |
| best bihon brand in the philippines | 1 | new; answered by `/best-bihon-brand-philippines` |
| golden q bihon | 1 | new; answered by `#golden-q` on the buyer's guide |
| super q bihon | 1 | new |

**Rule:** before building a new page, check this table and the Search Console
export. Double down on queries that already earn impressions; a query with
impressions but no clicks is a title or description problem, not a content gap.


## Cannibalisation guard

Before creating any page, check this table. Two pages targeting the same primary
keyword split authority and both lose. One primary keyword, one page.
