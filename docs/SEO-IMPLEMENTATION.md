# SEO Implementation Guide - Ngosiok Marketing

## 🎯 Complete SEO Strategy Implemented

This document outlines the comprehensive SEO implementation for the Ngosiok Marketing website, following industry best practices and modern search engine optimization techniques.

---

## ✅ What's Implemented

### 1. Schema.org Structured Data (JSON-LD)

Every page now includes rich structured data that helps search engines understand your content better.

#### **Homepage** - Organization Schema
- Establishes your brand in Google's Knowledge Graph
- Includes business details, contact info, social profiles
- Helps with brand recognition in search results

#### **About Page** - Breadcrumb Schema
- Shows site structure in search results
- Improves navigation visibility
- Can display breadcrumb trails in Google search

#### **Products Page** - Breadcrumb Schema
- Enhances product page visibility
- Shows clear path from homepage to products
- Improves user experience in search results

#### **Contact Page** - LocalBusiness Schema
- **Critical for local SEO and Google Maps**
- Includes:
  - Complete business address
  - Geo-coordinates for mapping
  - Business hours
  - Contact information
  - Social media profiles
- Helps you appear in:
  - Google Maps
  - Local search results ("noodles near me")
  - Google Business Profile

---

### 2. Optimized Meta Tags (No More Keywords!)

#### **Removed:**
- `keywords` meta tag (ignored by Google since 2009)

#### **Optimized:**
All titles and descriptions are now written as compelling "search ads":

**Home:**
- Title: "Premium Quality Noodles Since 1945"
- Description: "Taste 80+ years of quality. Ngosiok Marketing offers the best bihon, pancit canton, and Filipino noodles for your family. Explore our premium products today!"

**About:**
- Title: "Our Story - 80+ Years of Noodle Excellence"
- Description: "From humble beginnings in 1945 to becoming the Philippines' trusted noodle brand. Discover the Ngosiok Marketing story and our commitment to quality Filipino noodles."

**Products:**
- Title: "Premium Bihon & Pancit Canton | Our Products"
- Description: "Browse our complete range of premium Filipino noodles. Super Q Golden Bihon, Eagle VSP, First Choice, and more. Find the perfect noodles for your family's pancit today!"

**Contact:**
- Title: "Contact Us - Visit Our Cebu Office"
- Description: "Ready to partner or order? Contact Ngosiok Marketing today. Visit us in Cebu City or reach out for distributor inquiries and bulk orders. We're here to help!"

---

### 3. Site-Wide SEO Files

#### **`public/robots.txt`**
```
User-agent: *
Allow: /
Sitemap: https://www.superq.ph/sitemap.xml
```

**Purpose:**
- Tells search engines they can crawl all pages
- Points to your sitemap for faster indexing
- Polite crawl delay to prevent server overload

#### **`public/sitemap.xml`**
XML sitemap with all pages, including:
- Homepage (priority: 1.0)
- Products (priority: 0.9, updated weekly)
- About (priority: 0.8, updated monthly)
- Contact (priority: 0.7, updated monthly)

**Purpose:**
- Helps Google discover and index all pages faster
- Indicates update frequency and page importance
- Includes image references

---

## 🚀 SEO Component Features

### Updated `Seo.jsx` Component

**New Props:**
```jsx
<Seo
  title="Page Title"
  description="Compelling description with CTA"
  canonical="https://www.superq.ph/page"
  ogImage="https://www.superq.ph/og-image.jpg"
  schema={schemaObject}  // NEW: JSON-LD structured data
  type="website"
  noindex={false}
/>
```

**What It Does:**
- Dynamically sets page title with brand suffix
- Injects Schema.org JSON-LD for rich results
- Sets Open Graph tags for social sharing
- Twitter Card optimization
- Canonical URLs to prevent duplicate content
- Mobile theme colors

---

## 📊 Expected SEO Benefits

### 1. **Rich Search Results**
Your pages can now appear with:
- ⭐ Business information cards
- 📍 Location pins on Google Maps
- 🔗 Breadcrumb navigation in search
- 📱 Enhanced mobile previews

### 2. **Local SEO Boost**
The LocalBusiness schema helps you rank for:
- "bihon supplier Cebu"
- "noodles manufacturer Philippines"
- "pancit canton near me"

### 3. **Better Click-Through Rates**
Compelling titles and descriptions written for humans (not bots) will:
- Stand out in search results
- Include clear calls-to-action
- Highlight your 80+ year legacy

### 4. **Faster Indexing**
With robots.txt and sitemap.xml:
- Google finds your pages faster
- Updates are crawled more frequently
- Product changes are indexed quicker

---

## 🧪 Testing Your SEO

### 1. **Schema.org Validation**
Test your structured data:
- **Google Rich Results Test**: https://search.google.com/test/rich-results
- **Schema.org Validator**: https://validator.schema.org/

Paste your page URLs to verify JSON-LD is correctly formatted.

### 2. **Social Media Previews**
Test how your pages look when shared:
- **Facebook Debugger**: https://developers.facebook.com/tools/debug/
- **Twitter Card Validator**: https://cards-dev.twitter.com/validator
- **LinkedIn Post Inspector**: https://www.linkedin.com/post-inspector/

### 3. **Local SEO**
- **Google Business Profile**: Claim/update your listing
- **Google Maps**: Verify your business location appears
- Search "Ngosiok Marketing Cebu" to see your Knowledge Graph

### 4. **Site-Wide**
- **Google Search Console**: Submit your sitemap.xml
- **Bing Webmaster Tools**: Also submit there for Bing search
- **PageSpeed Insights**: Ensure fast loading times

---

## 📝 Best Practices Going Forward

### 1. **Update Sitemap When Adding Pages**
If you add new routes (e.g., `/blog`), update `public/sitemap.xml`:
```xml
<url>
  <loc>https://www.superq.ph/new-page</loc>
  <lastmod>2025-XX-XX</lastmod>
  <changefreq>weekly</changefreq>
  <priority>0.8</priority>
</url>
```

### 2. **Keep Descriptions Actionable**
Always write descriptions with a call-to-action:
- ❌ "This page shows our products."
- ✅ "Browse our complete range today! Find the perfect noodles for your family."

### 3. **Update Structured Data**
When business info changes (hours, address, phone):
- Update `COMPANY_INFO` in `src/utils/constants.js`
- Schema will automatically update everywhere

### 4. **Monitor Performance**
Use Google Search Console to track:
- Click-through rates (CTR)
- Average position in search
- Impressions and clicks
- Mobile usability issues

---

## 🎯 Quick Wins Checklist

- [x] Schema.org JSON-LD on all pages
- [x] Removed deprecated keywords meta tag
- [x] Optimized titles and descriptions
- [x] Created robots.txt
- [x] Created sitemap.xml
- [x] LocalBusiness schema for Google Maps
- [x] Organization schema for Knowledge Graph
- [x] Breadcrumb schema for site structure
- [x] Open Graph tags for social sharing
- [x] Canonical URLs for all pages

---

## 🧭 Known Gaps (as of this revision)

Honest status of what is **not** done, so nobody re-plans work that is already
shipped or assumes work that isn't.

### ⚠️ No prerendering / SSR
This is a client-rendered Vite SPA. `Seo.jsx` injects meta tags in a `useEffect`,
i.e. **after** JavaScript executes. Consequences:
- Googlebot renders JS, so indexing works — but it is slower and less reliable
  than server-rendered HTML.
- **Social scrapers (Facebook, X, LinkedIn, WhatsApp) do not execute JS.** They
  only ever see the static tags in `index.html`.

Because of this, the static fallback tags in `index.html` are load-bearing and
must be kept in sync with the Home page's `<Seo>` props. Adding prerendering to
the Vite build is the proper fix and needs sign-off.

### ⚠️ Per-page OG images not yet designed
Only `public/og-default.jpg` exists. All pages currently point at it. To give
each page its own social card, design 1200x630px images and re-point the
`ogImage` prop on the relevant page:
- `og-home.jpg` - Hero shot of products
- `og-about.jpg` - Factory or team photo
- `og-products.jpg` - Product grid
- `og-contact.jpg` - Cebu office exterior
- `og-careers.jpg` - Team or workplace photo

Do **not** reference these paths until the files actually exist in `public/` — a
missing OG image produces a broken social preview card.

### ⚠️ No review collection mechanism
`AggregateRating` / `Review` schema requires genuine, collected reviews.
Publishing rating markup without them violates Google's structured data
guidelines and risks a manual action. Build collection first.

---

## 🔥 Next Level SEO (Optional)

### 2. **Add FAQ Schema**
If you have an FAQ section, add FAQ schema:
```javascript
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "What makes Super Q Golden Bihon different?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Our bihon uses premium cornstarch..."
    }
  }]
}
```

### 3. **Add Review Schema**
If you have customer testimonials:
```javascript
{
  "@context": "https://schema.org",
  "@type": "Review",
  "itemReviewed": {
    "@type": "Product",
    "name": "Super Q Golden Bihon"
  },
  "reviewRating": {
    "@type": "Rating",
    "ratingValue": "5"
  },
  "author": {
    "@type": "Person",
    "name": "Customer Name"
  }
}
```

### 4. ~~**Add Product Schema**~~ ✅ DONE
Implemented in `src/pages/ProductDetail.jsx` — every `/products/:slug` page ships
`Product` + `BreadcrumbList` JSON-LD, built from `src/data/products.js`. Kept here
for reference only:
```javascript
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Super Q Golden Bihon",
  "image": "...",
  "description": "...",
  "brand": {
    "@type": "Brand",
    "name": "Super Q"
  }
}
```

---

## 📞 Need Help?

This implementation follows Google's official guidelines:
- [Google Search Central](https://developers.google.com/search)
- [Schema.org Documentation](https://schema.org/)
- [Structured Data Guidelines](https://developers.google.com/search/docs/advanced/structured-data/intro-structured-data)

---

**Last Updated:** September 15, 2026  
**Implementation Status:** Foundation shipped. See **Known Gaps** above for what
remains. Ongoing ranking work is driven by the `seo-rank` skill in
`.claude/skills/seo-rank/`.
