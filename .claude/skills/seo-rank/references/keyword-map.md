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

**Claimed by the pillar** — do not build separate pages for these; they are
sections within `/bihon-guide` and should stay there:
`cornstarch bihon vs rice bihon`, `bihon vs sotanghon`, `bihon vs pancit canton`,
`how to tell good bihon`, `why does my pancit get soggy`, `do you soak bihon`.

If any of these earns significant impressions on its own in Search Console, that
is the signal to split it into a dedicated page — not before.

## Cannibalisation guard

Before creating any page, check this table. Two pages targeting the same primary
keyword split authority and both lose. One primary keyword, one page.
