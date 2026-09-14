/**
 * Where-to-buy / market availability data.
 *
 * Single source of truth shared by the WhereToBuy page and the build-time
 * prerenderer, so the static HTML an AI crawler reads never drifts from what
 * a visitor sees.
 *
 * Sourcing note: entries marked `community: true` are sightings reported by
 * shoppers (e.g. the Food Trip UAE group), not distribution agreements. Keep
 * that distinction — claiming an official retail partnership we do not have
 * is both inaccurate and a trust problem if a shopper turns up to an empty
 * shelf.
 */

export const exportMarkets = [
  {
    region: 'Middle East',
    countries: ['United Arab Emirates', 'Qatar', 'Saudi Arabia', 'Kuwait', 'Bahrain'],
  },
  {
    region: 'North America',
    countries: ['United States', 'Canada'],
  },
  {
    region: 'Asia Pacific',
    countries: ['Hong Kong', 'Singapore', 'Japan', 'South Korea', 'Australia', 'New Zealand'],
  },
  {
    region: 'Europe',
    countries: ['United Kingdom', 'Italy', 'Spain', 'Germany'],
  },
];

export const uaeStockists = [
  {
    name: 'Carrefour UAE',
    detail: 'Super Q Golden Bihon 227 g and 500 g listed online and in-store.',
    community: false,
  },
  {
    name: 'Al Madina Supermarket — Salahuddin, Dubai',
    detail: 'Restocked in September 2025; reported to sell through quickly.',
    community: true,
  },
  {
    name: 'Golden Day Hypermarket — Dubai',
    detail: 'Shopper-reported stock of Super Q Golden Bihon.',
    community: true,
  },
  {
    name: 'Day to Day — Al Maktoum Road, Dubai',
    detail: 'Shopper-reported stock of Super Q Golden Bihon.',
    community: true,
  },
];

/**
 * Questions real shoppers and buyers actually type. These drive the FAQPage
 * schema, which is the format AI answer engines quote most readily.
 */
export const availabilityFaqs = [
  {
    question: 'Where can I buy Super Q Golden Bihon in Dubai?',
    answer:
      'Super Q Golden Bihon is stocked by Filipino and Asian grocery retailers across the UAE, including Carrefour UAE, which lists the 227 g and 500 g packs. Shoppers in Dubai have also reported stock at Al Madina Supermarket in Salahuddin, Golden Day Hypermarket, and the Day to Day branch on Al Maktoum Road. Stock moves quickly, so we recommend calling the branch before travelling.',
  },
  {
    question: 'Why was Super Q bihon hard to find in the UAE?',
    answer:
      'Super Q is made in Cebu, Philippines and shipped to the UAE in batches, so supply arrives in waves rather than continuously. When a shipment sells through, shelves can stay empty until the next container clears. In September 2025 a restock in Dubai sold out within hours of being posted in the Food Trip UAE community group.',
  },
  {
    question: 'Is Super Q bihon available outside the Philippines?',
    answer:
      'Yes. Ngosiok Marketing exports Super Q Golden Bihon, Special Palabok, Pancit Canton, Sotanghon, and Misua to the Middle East, North America, Europe, and the Asia Pacific. Export packs are produced in 227 g, 454 g, and 500 g formats sized for overseas retail.',
  },
  {
    question: 'What is Super Q Golden Bihon made from?',
    answer:
      'Super Q Golden Bihon is a cornstarch-based noodle with fine strands and a natural yellow colour that comes from the cornstarch itself, not from added colouring. It is dried in a controlled environment rather than sun-dried, which keeps the product clean and consistent batch to batch.',
  },
  {
    question: 'How do I become a Super Q distributor or stockist in my country?',
    answer:
      'Ngosiok Marketing works directly with importers, distributors, and retail groups, and accepts private label packing at qualifying order volumes. Email sales@ngosiokmarketing.com or call +63 (32) 2613233 to discuss territory, volumes, and export packaging.',
  },
  {
    question: 'Who makes Super Q noodles?',
    answer:
      'Super Q is manufactured by Ngosiok Marketing, a family-run noodle maker based in Cebu City, Philippines. The business traces its roots to Fujian, China, was founded in Cebu in 1943, re-established in 1945 after the war, and is now run by the third generation of the Ngosiok family.',
  },
];
