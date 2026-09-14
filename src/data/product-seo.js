/**
 * Per-product search copy, keyed by slug.
 *
 * Why this is separate from products.js: that file is the product record
 * (barcodes, pack sizes, spec text). This is marketing copy written for search
 * results. Keeping them apart means rewriting a title never risks touching a
 * barcode.
 *
 * `title` is used verbatim - no " | Ngosiok Marketing" is appended - so keep
 * each one under roughly 60 characters or Google will truncate it.
 *
 * `alsoKnownAs` feeds schema.org `alternateName`. List what people actually
 * type, including the informal short forms, because resellers currently
 * outrank us on several of these.
 */

export const productSeo = {
  'super-q-golden-bihon': {
    title: 'Super Q Golden Bihon | Cornstarch Bihon Noodles',
    description:
      'Super Q Golden Bihon, made in Cebu since 1945. Cornstarch bihon with fine golden strands that stay bouncy, not mushy. Available in 227 g, 454 g and 500 g packs.',
    alsoKnownAs: ['Golden Bihon', 'Super Q Bihon', 'SuperQ Golden Bihon', 'Super Q rice sticks'],
    material: 'Cornstarch',
  },
  'super-q-special-palabok': {
    title: 'Super Q Special Palabok | Thick Cornstarch Noodles',
    description:
      'Super Q Special Palabok, the thicker cornstarch noodle built to hold a heavy sauce. Made in Cebu, available in 227 g, 454 g and 500 g packs for local and export.',
    alsoKnownAs: ['Special Palabok', 'Super Q Palabok', 'palabok noodles'],
    material: 'Cornstarch',
  },
  'super-q-pancit-canton': {
    title: 'Super Q Pancit Canton | Wheat Canton Noodles',
    description:
      'Super Q Pancit Canton, wheat noodles puffed by deep frying for a chewy bite that holds up in the pan. Made in Cebu in 227 g, 454 g, 500 g and 1 kg packs.',
    alsoKnownAs: ['Super Q Canton', 'pancit canton noodles', 'Super Q pansit canton'],
    material: 'Wheat flour',
  },
  'super-q-sotanghon': {
    title: 'Super Q Sotanghon | Glass Noodles / Vermicelli',
    description:
      'Super Q Sotanghon, the translucent glass noodle for sotanghon soup and lumpia filling. Stays smooth and slippery without going mushy. Made in Cebu, Philippines.',
    alsoKnownAs: ['Super Q glass noodles', 'sotanghon vermicelli', 'Super Q vermicelli'],
    material: 'Starch vermicelli',
  },
  'super-q-misua': {
    title: 'Super Q Misua | Fine Wheat Noodles, 160 g',
    description:
      'Super Q Misua, the very fine wheat noodle traditionally served at Chinese birthdays - long strands for long life. Cooks in under a minute. 160 g packs from Cebu.',
    alsoKnownAs: ['Super Q miswa', 'misua noodles', 'miswa'],
    material: 'Wheat flour',
  },
  'q1-misua': {
    title: 'Q1 Misua | Fine Wheat Misua Noodles',
    description:
      'Q1 Misua, fine wheat noodles in a 40 g x 12 pack for Philippine supermarkets. The birthday noodle - long strands for long life, made in Cebu since 1945.',
    alsoKnownAs: ['Q1 miswa', 'Q One misua'],
    material: 'Wheat flour',
  },
  'first-choice-fresh-japanese-ramen': {
    title: 'First Choice Fresh Japanese Ramen | Hokkien Noodles',
    description:
      'First Choice Fresh Japanese Ramen, also sold as Hokkien noodles. Fresh wheat noodles in Classic, Mami and Lomi cuts, distributed to Cebu-area markets.',
    alsoKnownAs: ['Hokkien noodles', 'fresh miki', 'First Choice ramen', 'miki noodles'],
    material: 'Wheat flour',
  },
  'first-choice-flat-japanese-noodles': {
    title: 'First Choice Flat Japanese Noodles | Mami Noodles',
    description:
      'First Choice Flat Japanese Noodles, steamed rather than fried, so they cook quickly without the oil of instant noodles. Made in Cebu in 250 g, 500 g and 1 kg packs.',
    alsoKnownAs: ['mami noodles', 'flat japanese noodles', 'First Choice mami'],
    material: 'Wheat flour',
  },
  'long-life-pancit-canton': {
    title: 'Long Life Pancit Canton | 150 g to 1 kg Packs',
    description:
      'Long Life Pancit Canton, wheat noodles puffed by deep frying, made in Cebu for the Philippine market. Six pack sizes from 150 g to 1 kg, plus private label.',
    alsoKnownAs: ['Long Life canton', 'Long Life pansit canton'],
    material: 'Wheat flour',
  },
};
