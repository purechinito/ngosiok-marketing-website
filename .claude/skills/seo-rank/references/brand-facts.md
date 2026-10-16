# Verified Brand Facts

Single source of truth for anything published about Ngosiok Marketing or Super Q.
Every fact here is traceable to the repo. **If a claim is not on this page and not
in `src/data/products.js`, it is unverified — ask before publishing it.**

## Company

| Fact | Value | Source |
|---|---|---|
| Company name | NGOSIOK MARKETING | `src/utils/constants.js` |
| Tagline | Quality Noodles Since 1945 | `src/utils/constants.js` |
| Founded (company) | 1945 | `src/utils/constants.js` |
| Office | 325 B. Aranas Street, Cebu City 6000, Philippines | `src/utils/constants.js` |
| Factory | Cansojong, Talisay City, Cebu, Philippines | `src/utils/constants.js` |
| Employees | ~200 | `src/utils/constants.js` |
| Email | sales@ngosiokmarketing.com | `src/utils/constants.js` |
| Phone | +63 (32) 2613233 to 2613235 | `src/utils/constants.js` |
| Fax | +63 (32) 2613577 to 2613578 | `src/utils/constants.js` |
| Mobile | +63 917 322 3234 | `src/utils/constants.js` |
| Site | https://www.superq.ph | `src/utils/constants.js` |

## The 1943 vs 1945 distinction — get this right

Both years are correct for **different events**. Do not use them interchangeably.

- **Early 1900s** — Lucio Ngosiok's father makes Chinese noodles in Fujian, China.
  He dies while his children are aged five and three; the business does not pass on.
- **1943** — Lucio Ngosiok ("Ngo Siok") starts noodle making in Cebu City during
  World War II, producing rice noodles by hand. This *heralded the start of the
  noodle industry in Cebu*.
- **Wartime** — business relocates repeatedly; briefly based in Bato, Leyte.
- **1945** — post-war **re-establishment** in Cebu. This is the company's stated
  founding year and the basis of "Since 1945" and "80+ years."
- **1973** — the patriarch passes; two descendants assume management.
- **Mid-1970s** — **Ngosiok Marketing** is established to represent four
  affiliated noodle companies.
- **Today** — nationwide distribution plus international export.

Source: `src/pages/About.jsx`.

**Rule:** public-facing heritage copy uses **1945** and "80+ years." Use 1943 only
when narrating the wartime origin story, and label it as such.

## Brand architecture

Ngosiok Marketing represents four affiliated companies:

- **Cornstarch-based noodles:** Super Q, Eagle VSP
- **Wheat-based Chinese noodles:** First Choice, Long Life

Additional brands in use:
- **Golden Q Bihon** — secondary/budget brand for Visayas and Mindanao.
- **Q1** — misua line.

Source: `src/pages/About.jsx`, `src/data/products.js`.

## Product catalog (canonical list)

Slugs must match `src/data/products.js` exactly.

| Product | Slug | Category |
|---|---|---|
| Super Q Golden Bihon | `super-q-golden-bihon` | Cornstarch-based Noodles |
| Super Q Special Palabok | `super-q-special-palabok` | Cornstarch-based Noodles |
| Super Q Pancit Canton | `super-q-pancit-canton` | Wheat-based Noodles |
| Super Q Sotanghon | `super-q-sotanghon` | Vermicelli Noodles |
| Super Q Misua | `super-q-misua` | Wheat-based Noodles |
| Q1 Misua | `q1-misua` | Wheat-based Noodles |
| First Choice Fresh Japanese Ramen | `first-choice-fresh-japanese-ramen` | Wheat-based Noodles |
| First Choice Flat Japanese Noodles | `first-choice-flat-japanese-noodles` | Wheat-based Noodles |
| Long Life Pancit Canton | `long-life-pancit-canton` | Wheat-based Noodles |

## Verified product differentiators

These are the defensible, repo-sourced claims — the raw material for content.

**Super Q Golden Bihon** (the flagship, and the SEO priority):
- Cornstarch-based, not rice-based. Fine strands, natural yellow colour from the
  cornstarch, rectangular and compact in shape.
- Compactness gives **considerable yield** — a genuine cost argument for both
  households and food service.
- Cooks soft, smooth, and bouncy while retaining distinct bite.
- Made via a **proprietary process** in a **controlled environment**, minimising
  foreign matter from human handling and sun drying.
- Positioned as "the benchmark by which other bihon are compared to."
- Sold locally and internationally; private label accepted at volume.

**Super Q Special Palabok** — same cornstarch base as Golden Bihon, thicker
strand, longer cook time.

**Super Q Pancit Canton / Long Life Pancit Canton** — wheat-based, puffed by deep
frying the cooked noodles. Super Q is local + export; Long Life is local only.

**Super Q Sotanghon** — glass noodles, translucent, smooth; holds up without
going mushy. Neutral flavour, absorbs the dish. The pack is labeled
**"Mung Bean Vermicelli"** (source: product photo
`public/images/products/newproducts/sotanghon_vermicelli.jpg`).

## Declared net weight tolerance — read before any weighing claim

The Super Q Special Palabok pack is printed **"APPROX. NET WT. 1/2 KILO (± 5%)"**
(source: `public/images/products/newproducts/specialpalabok.jpg`). The brand's
own packaging therefore declares a ±5% tolerance on at least one product.

Any "weighing accuracy" claim must be consistent with that printed tolerance.
Do not publish a claim that Super Q packs are more accurate than competitors'
unless it rests on actual measured weights (pack count, scale, date, method)
recorded by the owner. A declared tolerance is a maximum, not a measurement.

**Misua (Super Q / Q1)** — flour-based, fine strands, circular shape. Used by
Chinese families for birthdays: long strands for long life, circular shape for
family reunion.

**First Choice Fresh Japanese Ramen** — also called Hokkien noodles. Dough prep,
cutting, cooking, oiling, cooling, packing. Limited shelf life, so distribution is
restricted to wet markets and supermarkets within reach of regular shipping.
Three fresh miki variants: Classic (regular), Mami (flat), Lomi (thick).

**First Choice Flat Japanese Noodles** — steam-cooked before packing. Resembles
instant noodles but is **not fried**.

## Company commitments (verified positioning)

- Automated processes that eliminate foreign-matter exposure.
- Quality standards that changed consumer expectations for bihon in taste,
  colour, and texture.
- Distribution from Cebu across the Philippines and into international markets.
- Open feedback channels.

Source: `src/pages/About.jsx`.

## Social channels

- Facebook: https://www.facebook.com/p/Ngosiok-Marketing-Super-Q-Golden-Bihon-100063821509709/
- Instagram: https://www.instagram.com/superq_bihon/
- YouTube: https://www.youtube.com/c/SuperQBihon

## Owner-confirmed facts (Timothy, 2026-10-10)

- **Minimum order quantity:** one 20-foot container van, around 528 sacks.
  Sack contents differ by product (see `localPackaging` in `products.js`), so do
  not convert this to kilos or packs without asking.
- **Shelf life:** Super Q Golden Bihon is labeled 2 years from production. The
  product keeps far longer, but 2 years is the government's maximum for the
  label. **Publish "2 years" only** — never a longer figure. Not yet confirmed
  for other products; ask before stating shelf life for anything else.
- **SRP:** Super Q Golden Bihon 500 g pack, ₱50 (approximate, owner-confirmed).
- **Yield:** one 500 g pack of Super Q Golden Bihon feeds a minimum of 5 people
  (owner-confirmed 2026-10-10). Stored as `servings` in `products.js`. Phrase it
  as "at least 5"; do not extrapolate to other pack sizes or products.
  Stored as `srp` in `products.js`. No SRP is confirmed for any other product.

**Structured-data rule:** a product page emits `Product` JSON-LD only when its
entry in `products.js` has an `srp`. Without a price, review or rating Google
flags the Product snippet as invalid, and reviews must never be fabricated. To
give another product rich results, get its SRP confirmed and add `srp`.

## Owner-confirmed, 2026-10-16

- **Availability:** Super Q is sold in wet markets and grocery stores across the
  Philippines. Stores sometimes sell out between deliveries; the owner wants
  out-of-stock locations reported (form at `/where-to-buy`, emails sales@).
  Publish as "across the Philippines", not "every store".
- **Pack weight vs competitors:** in Metro Manila, competing bihon packs are
  usually 454 g (16 oz) or less. The Super Q Golden Bihon ½ kg pack is 500 g,
  about 10% (46 g) more. The owner invites the public to weigh packs themselves.
  Do not name competitor brands for this claim until the owner supplies
  brand-specific pack facts.
- **Scope the 500 g claim to the ½ kg pack.** Super Q Golden Bihon also ships a
  454 g pack: the photo `public/images/products/newproducts/goldenbihon.jpg`
  shows a Super Q "BUDGET PACK 16 oz" labeled 454 g, and export packaging lists
  454 g. Never write "Super Q packs are 500 g".
- **Tolerance math:** some packs print ±5%. 500 g × 0.95 = 475 g, still above a
  454 g pack at full weight. Safe to publish as worked arithmetic.
- **Price per gram:** ₱50 SRP ÷ 500 g = ₱0.10/g; ÷ 5 servings = ₱10 or less of
  noodles per serving. Derived only from the SRP and the owner-confirmed yield.

## Read off packaging photos, 2026-10-16

- **Golden Q Special Bihon** (`public/images/products/newproducts/specialbihon.jpg`):
  "APPROX. NET WT. 200g / 7.05 Oz (±5%)"; Cebuano taglines "Lami Kai'ni!" and
  "Saktong timbang, dekalidad ug limpyo" (exact weight, quality and clean).
  Composition is not stated — do not call it cornstarch or rice.
- **Super Q Golden Bihon "the Original!"** is printed on the pack in
  `public/images/products/ngosiok (1).jpg`.
- The Super Q Special Pancit Canton pack shows a **GMP mark** and another logo.
  **Not published.** Certifications stay unverified until the owner confirms.

## Not citable on the site

- The owner reports Gemini's AI Overview names Super Q for "best bihon"
  (2026-10-16). Useful signal, but AI Overviews change and are not a source.

## Known unverified — do NOT publish without owner confirmation

- Any certification (FDA, HACCP, ISO, halal, GMP)
- Nutrition facts, calorie counts, allergen statements
- Shelf life for products other than Super Q Golden Bihon
- Prices, SRP, or wholesale terms (other than the Golden Bihon SRP above)
- Specific export destination countries
- Awards, market-share figures, or production volumes
- Customer reviews, testimonials, or ratings
- Consumer surveys or popularity rankings. Cite a survey only with its source,
  sample size, date and method. Never imply one exists.
- Competitor product facts (Wai Wai, Hobe, others). The owner has committed to
  supplying these from actual packs; publish only what they supply.
- Founder birth/death dates beyond the 1973 succession
