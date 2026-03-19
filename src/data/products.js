export const products = [
  {
    id: 1,
    name: 'Super Q Golden Bihon',
    category: 'Cornstarch-based Noodles',
    description: `This is a cornstarch-based noodle that has fine strands, natural yellow colour (from cornstarch), and rectangular, hard and compact shape. The compactness of our bihon allows for considerable yield.\n\nThe cooked product is soft, smooth, and bouncy while retaining its distinct bites. It is easy to cook that even a neophyte should have no problem cooking a delicious food for all to enjoy!\n\nOur bihon is made through the proprietary process that we developed, minimizing unwanted foreign matters due to human intervention and sun drying. The production in a controlled environment has allowed us to bring our products to a higher standard of quality unsurpassed by our competitors, thus, our bihon is the benchmark by which other bihon are compared to.\n\nSuper Q Golden Bihon is our premium brand that is sold locally and internationally. We accept private label packing with certain quantity of orders. We also cater to the budget conscious consumers in the Visayas and Mindanao regions through our secondary brand called Golden Q Bihon.`,
    features: [
      'Natural yellow color',
      'Fine strands',
      'High yield',
      'Soft and smooth when cooked',
    ],
    image: '/images/products/ngosiok (1).jpg',
    additionalImages: [
      '/images/products/newproducts/goldenbihon.jpg',
    ],
    // Example packaging data added here. You can copy this structure to other products.
    localPackaging: [
      { weight: '12 kg (in sack)', productBarcode: '', unitPerSack: '' },
      { weight: '12 kg (paper-wrapped)', productBarcode: '', unitPerSack: '' },
      { weight: '1 kg', productBarcode: '4806011812030', unitPerSack: '15' },
      { weight: '½ kg', productBarcode: '4806011812047', unitPerSack: '30' },
      { weight: '227 g or 8 oz', productBarcode: '4806011812054', unitPerSack: '60' },
    ],
    exportPackaging: [
      { weight: '500 g', productBarcode: '4806011812047', unitPerBox: '30', boxBarcode: '14806011812044', boxSize: '203 x 460 x 711' },
      { weight: '454 g', productBarcode: '4806011812061', unitPerBox: '30', boxBarcode: '14806011812068', boxSize: '203 x 460 x 699' },
      { weight: '227 g', productBarcode: '4806011812078', unitPerBox: '60', boxBarcode: '14806011812051', boxSize: '203 x 460 x 699' },
    ],
  },
  {
    id: 4,
    name: 'Super Q Special Palabok',
    category: 'Cornstarch-based Noodles',
    description: `This is also a cornstarch-based noodle that is very similar to our Super Q Golden Bihon. The only difference is the strand – palabok is much thicker. It needs longer time to cook due to its thickness.\n\nWhile this type of noodle is very popular among Filipinos, people in different countries around the globe have accepted it as a substitute to their own dishes. It is also attractive to those who have a preference for thick noodles.`,
    features: [
      'Enriched with eggs',
      'Rich flavor',
      'Golden color',
      'Premium quality',
    ],
    image: '/images/products/ngosiok (4).jpg',
    additionalImages: [
      '/images/products/newproducts/specialpalabok.jpg',
      '/images/products/newproducts/specialpalabok1.jpg',
      '/images/products/newproducts/specialpalabok2.jpg',
    ],
    localPackaging: [
      { weight: '500 g', productBarcode: '4806011813044', packing: '15 units / sack' },
      { weight: '227 g', productBarcode: '4806011813075', packing: '30 units / sack' },
    ],
    exportPackaging: [
      { weight: '500 g', productBarcode: '4806011812044', packing: '30 units / box', boxBarcode: '14806011813041', boxSize: '203 x 475 x 673' },
      { weight: '454 g', productBarcode: '4806011813068', packing: '30 units / box', boxBarcode: '14806011813058', boxSize: '205 x 460 x 660' },
      { weight: '227 g', productBarcode: '4806011813075', packing: '60 units / box', boxBarcode: '14806011813065', boxSize: '210 x 430 x 665' },
    ],
  },
  {
    id: 8,
    name: 'Super Q Pancit Canton',
    category: 'Wheat-based Noodles',
    description: `This is a wheat-based noodle. It is puffed up by deep frying the cooked noodles.\n\nWe produce this type of noodles for both the local and export markets. We also accept private label packing with certain quantity of orders.`,
    features: [
      'Stir-fry ready',
      'Classic taste',
      'Firm texture',
      'Party favorite',
    ],
    image: '/images/products/ngosiok (8).jpg',
    additionalImages: [
      '/images/products/newproducts/specialpancitcanton.jpg',
    ],
    localPackaging: [
      { weight: '1 kg', productBarcode: '4806011822411', unitPerBox: '12', boxBarcode: '14806011822418', boxSize: '580 x 300 x 640' },
      { weight: '500 g', productBarcode: '4806011822428', unitPerBox: '24', boxBarcode: '14806011822425', boxSize: '580 x 300 x 640' },
    ],
    exportPackaging: [
      { weight: '454 g', productBarcode: '4806011822473', unitPerBox: '24', boxBarcode: '14806011822470', boxSize: '416 x 416 x 651' },
      { weight: '227 g', productBarcode: '4806011822480', unitPerBox: '48', boxBarcode: '14806011822487', boxSize: '335 x 495 x 670' },
    ],
  },
  {
    id: 2,
    name: 'Super Q Sotanghon',
    category: 'Vermicelli Noodles',
    description: `Super Q Sotanghon, also known as glass noodles, is a delicate and versatile noodle appreciated for its translucent appearance and smooth, slippery texture when cooked. These fine strands are carefully processed to ensure they remain intact and do not easily become mushy during cooking.\n\nHighly versatile, Sotanghon is a favorite ingredient in many Southeast Asian cuisines. Whether used in hearty chicken soups, spring roll fillings, or stir-fried alongside fresh vegetables and savory meats, it imparts a light yet satisfying element to any dish. Its neutral flavor profile makes it an excellent canvas, easily absorbing the rich essences of the ingredients it is cooked with.\n\nOur Sotanghon is produced with a steadfast commitment to quality and hygiene, ensuring that you receive a clean, consistent, and superior product. From comforting home-cooked meals to professional culinary creations, Super Q Sotanghon provides a premium noodle experience you can always rely on.`,
    features: [
      'Premium quality',
      'Consistent texture',
      'Easy to cook',
      'Traditional Filipino favorite',
    ],
    image: '/images/products/ngosiok (2).jpg',
    additionalImages: [
      '/images/products/newproducts/sotanghon_vermicelli.jpg',
    ],
    customTables: [
      {
        title: 'Packaging Information',
        data: []
      }
    ]
  },
  {
    id: 3,
    name: 'Super Q Misua',
    category: 'Wheat-based Noodles',
    description: `This is a flour-based noodle that has fine strands and circular shape. This noodle is often used by Chinese people for birthdays; long strands to signify long life, circular shape to signify reunion of family.`,
    features: [
      'Authentic Chinese noodles',
      'Steamed process',
      'Versatile cooking',
      'Premium wheat base',
    ],
    image: '/images/products/newproducts/misua1.jpg',
    additionalImages: [
      '/images/products/newproducts/misua.jpg',
      '/images/products/newproducts/superqmisua.jpg',
      '/images/products/newproducts/misua2.jpg',
    ],
    sharedPackaging: [
      { weight: '160 g', productBarcode: '4806011827157', unitPerBox: '48', boxBarcode: '14806011827154', boxSize: '320 x 320 x 420' }
    ],
  },
  {
    id: 5,
    name: 'Q1 Misua',
    category: 'Wheat-based Noodles',
    description: `This is a flour-based noodle that has fine strands and circular shape. This noodle is often used by Chinese people for birthdays; long strands to signify long life, circular shape to signify reunion of family.`,
    features: [
      'Authentic Chinese noodles',
      'Fine strands',
      'Versatile cooking',
      'Premium wheat base',
    ],
    image: '/images/products/ngosiok (3).jpg',
    additionalImages: [
      '/images/products/ngosiok (3).jpg',
    ],
    localPackagingTitle: 'Local Only',
    localPackaging: [
      { weight: '40 g x 12', productBarcode: '4806011827041', unitPerBox: '24', boxBarcode: '14806011827048', boxSize: '395 x 318 x 445' }
    ],
  },
  {
    id: 6,
    name: 'First Choice Fresh Japanese Ramen',
    category: 'Wheat-based Noodles',
    description: `Another wheat-based noodle, it is also referred to as the Hokkien noodles. Its production process includes the preparation of the dough, cutting, cooking, oiling, cooling, and packing of the finished products.\n\nDue to their limited shelf-life, distribution is limited to wet markets and supermarkets within the province and the surrounding provinces with regular shipping schedule.\n\nThree variants of our fresh miki include regular noodles (Classic), flat noodles (Mami), and thick noodles (Lomi).`,
    features: [
      'Fresh egg noodles',
      'Rich texture',
      'Perfect for soups',
      'Absorbs flavor',
    ],
    image: '/images/products/ngosiok (6).jpg',
    additionalImages: [
      '/images/products/newproducts/japaneseramen.jpg',
    ],
    customTables: [
      {
        title: 'Fresh Japanese Ramen (Classic)',
        data: [
          { weight: '1 kg', barcode: '4809011226111', availability: 'Local supermarket only' },
          { weight: '½ kg', barcode: '4809011226128', availability: 'Local supermarket only' },
          { weight: '¼ kg', barcode: '4809011226135', availability: '' },
        ]
      }
    ]
  },
  {
    id: 7,
    name: 'First Choice Flat Japanese Noodles',
    category: 'Wheat-based Noodles',
    description: `This is another type of wheat-based noodle that we produce. The noodle is steamed cooked before final packing. This is similar to the instant noodles in appearance. However this does not undergo frying as required of the instant noodles.`,
    features: [
      'Delicate texture',
      'Quick cooking',
      'Traditional favorite',
      'Versatile usage',
    ],
    image: '/images/products/ngosiok (7).jpg',
    additionalImages: [
      '/images/products/newproducts/japanesenoodles.jpg',
    ],
    customTables: [
      {
        title: 'Flat Japanese Noodles (Mami)',
        data: [
          { weight: '1 kg', barcode: '4809011226319', availability: 'Local supermarket only' },
          { weight: '½ kg', barcode: '4809011226326', availability: 'Local supermarket only' },
          { weight: '¼ kg', barcode: '4809011226333', availability: '' },
        ]
      }
    ]
  },
  {
    id: 9,
    name: 'Long Life Pancit Canton',
    category: 'Wheat-based Noodles',
    description: `This is a wheat-based noodle. It is puffed up by deep frying the cooked noodles.\n\nWe produce this type of noodles for the local market only. We also accept private label packing with certain quantity of orders.`,
    features: [
      'Stir-fry ready',
      'Premium quality',
      'Firm texture',
      'Celebration favorite',
    ],
    image: '/images/products/newproducts/pansitcantonlonglife.jpg',
    additionalImages: [
      '/images/products/newproducts/pansitcantonlonglife1.jpg',
    ],
    localPackaging: [
      { weight: '1 kg', productBarcode: '4806011822015', unitPerBox: '12', boxBarcode: '14806011822012', boxSize: '346 x 476 x 690' },
      { weight: '½ kg', productBarcode: '4806011822022', unitPerBox: '24', boxBarcode: '14806011822029', boxSize: '346 x 476 x 690' },
      { weight: '500 g', productBarcode: '4806011822039', unitPerBox: '24', boxBarcode: '14806011822036', boxSize: '416 x 416 x 663' },
      { weight: '300 g', productBarcode: '4806011822046', unitPerBox: '36', boxBarcode: '14806011822043', boxSize: '416 x 416 x 618' },
      { weight: '250 g', productBarcode: '4806011822060', unitPerBox: '48', boxBarcode: '14806011822067', boxSize: '276 x 540 x 730' },
      { weight: '150 g', productBarcode: '4806011822053', unitPerBox: '60', boxBarcode: '14806011822050', boxSize: '334 x 480 x 638' },
    ],
  },
];