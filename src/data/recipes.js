/**
 * Recipe library.
 *
 * This is the site's scale axis: products are a fixed set of nine, but recipes
 * are unbounded, and recipe intent is what people search before they buy
 * noodles. Each entry becomes an indexed /recipes/<slug> page with Recipe
 * structured data.
 *
 * Accuracy rules (see .claude/skills/seo-rank/references/brand-facts.md):
 * - No nutrition figures, calorie counts or health claims. None are verified.
 * - Super Q Golden Bihon has an official method, published on the brand's own
 *   YouTube channel (@SuperQBihon): no soaking; 1 liter of soup stock for every
 *   250 g of bihon; boil 4 minutes before loosening. Golden Bihon steps follow it.
 * - Every other noodle has no published method, so steps defer to the pack.
 * - `image` must be a real file under public/ and `imageAlt` must describe
 *   what that photo actually shows, not what the recipe is about.
 * - `forBusiness` may only put a peso figure on the page when it is derived
 *   from verified facts (SRP and owner-confirmed yield). Never invent costs.
 */

export const recipes = [
  {
    slug: 'pancit-bihon-guisado',
    name: 'Pancit Bihon Guisado',
    headline: 'Pancit Bihon Guisado',
    seoTitle: 'Pancit Bihon Recipe for Long Life, Love & Negosyo',
    tagline: 'The long-life noodle. Cook it for someone you want around for a long time, or sell it by the bilao.',
    description:
      'Pancit bihon guisado with pork, chicken and vegetables. One 500 g pack of Super Q Golden Bihon serves at least five, at about ₱10 of noodles per plate.',
    image: '/images/products/ngosiok (1).jpg',
    imageAlt:
      'A pack of Super Q Golden Bihon beside a plate of pancit bihon with Chinese sausage, shrimp, meat, cabbage and spring onions',
    product: { name: 'Super Q Golden Bihon', slug: 'super-q-golden-bihon' },
    category: 'Main course',
    cuisine: 'Filipino',
    servings: '5 servings',
    prepMinutes: 20,
    cookMinutes: 25,
    published: '2026-10-16',
    intro: `Pancit bihon guisado is the dish most Filipino households mean when they say "pancit" — fine bihon strands folded through a seasoned broth with pork, chicken and vegetables. It is served at birthdays for long life, and it is what Super Q Golden Bihon was made for.\n\nThe technique that separates good pancit from mushy pancit is order of operations: the sauce is finished before the noodles ever touch the pan.`,
    ingredientGroups: [
      {
        title: null,
        items: [
          '500 g Super Q Golden Bihon',
          '250 g pork belly or shoulder, sliced thin',
          '250 g chicken breast, boiled and shredded (keep the broth)',
          '200 g shrimp, peeled (optional)',
          '4 cloves garlic, minced',
          '1 medium onion, sliced',
          '2 medium carrots, cut into matchsticks',
          '1 cup green beans, sliced on the diagonal',
          '¼ small cabbage, shredded',
          '2 liters (about 8 cups) chicken broth or soup stock',
          '4 tbsp soy sauce',
          '2 tbsp oyster sauce (optional)',
          '2 tbsp cooking oil',
          'Salt and ground pepper, to taste',
          'Spring onions and calamansi wedges, to serve',
        ],
      },
    ],
    steps: [
      {
        name: 'Prepare the chicken',
        text: 'Boil the chicken breast until cooked through. Reserve the broth, then shred the meat.',
      },
      {
        name: 'Sauté the aromatics and meat',
        text: 'Heat the oil in a wide pan. Sauté the garlic and onion until fragrant. Add the pork and cook until browned, then add the shredded chicken and the shrimp.',
      },
      {
        name: 'Cook the vegetables separately',
        text: 'Add the carrots and green beans and stir-fry for about two minutes, then add the cabbage and toss briefly. Remove the vegetables from the pan and set them aside so they stay crisp.',
      },
      {
        name: 'Build the sauce',
        text: 'Pour the broth into the same pan. That is the Super Q ratio: 1 liter of soup stock for every 250 g of Golden Bihon. Add the soy sauce and oyster sauce, season with salt and pepper, and bring to a boil. Taste now — the noodles will absorb whatever this liquid tastes like.',
      },
      {
        name: 'Add the noodles',
        text: 'Add the Super Q Golden Bihon straight from the pack. No soaking is needed. Let it boil for 4 minutes before you start loosening the strands, then fold it through with tongs until it has taken up the liquid. Toss gently rather than stirring hard, which shreds the strands.',
      },
      {
        name: 'Finish',
        text: 'Return the vegetables and toss through. Pull the pan off the heat while the noodles still have bite — residual heat keeps cooking them. Serve with spring onions and calamansi.',
      },
    ],
    tips: [
      'Never soak Super Q Golden Bihon. It goes into the boiling stock straight from the pack: 1 liter for every 250 g, 4 minutes before you loosen it.',
      'Cooking for a buffet or handaan? Stop a minute early. Pancit keeps softening on the serving table.',
      'Super Q Golden Bihon is cornstarch-based, so it holds its bite longer than rice bihon once the sauce goes in.',
    ],
    forLove: {
      title: 'Cooking it for someone you love',
      body: [
        'Pancit is served at Filipino birthdays because long noodles stand for long life. That makes a plate of pancit bihon the most Filipino way to say "I want you around for a long time."',
        'Cook it for a birthday, an anniversary, or the Sunday after a fight. Do not cut the noodles short. The length is the whole point.',
      ],
    },
    forBusiness: {
      title: 'Selling it: pancit bihon pang-negosyo',
      body: [
        'At the ₱50 SRP for a 500 g pack of Super Q Golden Bihon, and at least five servings per pack, the noodles cost about ₱10 or less per plate. Your meat, vegetables, gas and labour make up the rest. Price those from your own suppliers, then set your selling price.',
      ],
      points: [
        'Cook the sauce in batches and add the noodles per order, so every plate still has bite.',
        'For bilao and party orders, stop cooking a minute early. Pancit keeps softening on the table.',
        'The ½ kg pack is 500 g. Weigh it yourself on your shop scale and cost your plates from the real weight.',
      ],
    },
  },

  {
    slug: 'pancit-bilao',
    name: 'Pancit Bilao',
    headline: 'Pancit Bilao (Party Tray Pancit Bihon)',
    seoTitle: 'Pancit Bilao Recipe for Parties & Pang-Negosyo',
    tagline: 'The party tray that feeds the whole handaan, made to share or made to sell.',
    description:
      'Pancit bihon for a party tray. One kilo of Super Q Golden Bihon feeds at least ten, lined with banana leaves and ready for the handaan or your customer.',
    image: '/images/products/ngosiok (9).jpg',
    imageAlt:
      'A pack of Super Q Golden Bihon labeled "Cornstarch Sticks" beside a plate of pancit bihon with Chinese sausage, shrimp, meat, cabbage and spring onions',
    product: { name: 'Super Q Golden Bihon', slug: 'super-q-golden-bihon' },
    category: 'Main course',
    cuisine: 'Filipino',
    servings: '10 servings',
    prepMinutes: 30,
    cookMinutes: 35,
    published: '2026-10-16',
    intro: `A bilao is the round woven tray that pancit arrives in at Filipino parties, and a favourite way to sell pancit from home. This is our pancit bihon guisado scaled up for a crowd, with the steps that matter when the noodles have to sit, travel and still look good when the cling wrap comes off.\n\nThe rule of the bilao is timing. Cook the noodles slightly underdone, because they keep softening in the tray.`,
    ingredientGroups: [
      {
        title: 'Pancit',
        items: [
          '1 kg Super Q Golden Bihon (two 500 g packs)',
          '500 g pork belly or shoulder, sliced thin',
          '500 g chicken breast, boiled and shredded (keep the broth)',
          '300 g shrimp, peeled',
          '3 pieces Chinese sausage, sliced on the diagonal',
          '8 cloves garlic, minced',
          '2 medium onions, sliced',
          '3 medium carrots, cut into matchsticks',
          '2 cups green beans, sliced on the diagonal',
          '½ medium cabbage, shredded',
          '4 liters (about 16 cups) chicken broth or soup stock',
          '½ cup soy sauce',
          '¼ cup oyster sauce',
          '¼ cup cooking oil',
          'Salt and ground pepper, to taste',
        ],
      },
      {
        title: 'For the bilao',
        items: [
          'Banana leaves, wiped clean and passed briefly over a low flame to soften',
          '4 hard-boiled eggs, sliced',
          'Calamansi, halved',
          'Spring onions, chopped',
          'Cling wrap',
        ],
      },
    ],
    steps: [
      {
        name: 'Line the bilao',
        text: 'Wipe the banana leaves clean and pass them briefly over a low flame until they turn glossy and flexible. Line the bilao with them, shiny side up, letting the edges overlap.',
      },
      {
        name: 'Cook the meats',
        text: 'Heat the oil in your widest pan. Sauté the garlic and onions until fragrant, then brown the pork. Add the shredded chicken and the Chinese sausage. Add the shrimp and cook just until pink. Lift everything out and set it aside, keeping the shrimp separate for the top.',
      },
      {
        name: 'Cook the vegetables separately',
        text: 'Stir-fry the carrots and green beans for about two minutes, then add the cabbage and toss briefly. Set the vegetables aside so they stay crisp and bright for the tray.',
      },
      {
        name: 'Build the sauce',
        text: 'In a large pot, combine the broth, soy sauce and oyster sauce, season with salt and pepper and bring to a boil. Taste it now; the noodles will take on exactly this flavour. Super Q Golden Bihon takes 1 liter of stock for every 250 g, so a full kilo needs all 4 liters.',
      },
      {
        name: 'Cook the noodles in two batches',
        text: 'A full kilo rarely fits one pan. Ladle half the hot stock into your wide pan and bring it back to the boil. Add one 500 g pack of Super Q Golden Bihon straight from the pack, with no soaking. Let it boil for 4 minutes before you start loosening the strands, then fold in half of the meats with tongs until the liquid is absorbed. Take it off the heat while the noodles are still slightly firm. Repeat with the second pack, the rest of the stock and the rest of the meats.',
      },
      {
        name: 'Assemble the bilao',
        text: 'Spread the noodles over the banana leaves. Arrange the vegetables, shrimp and egg slices on top in neat rows or wedges, tuck calamansi halves around the edge and scatter the spring onions.',
      },
      {
        name: 'Wrap it',
        text: 'Let the steam escape for a few minutes before covering with cling wrap. Wrapping it while it is still steaming traps water that drips back onto the noodles.',
      },
    ],
    tips: [
      'Two batches beat one crowded pan. Crowded noodles steam instead of stir-fry and turn soft.',
      'A bilao is judged the moment the wrap comes off. Clear rows of toppings look generous; a heap looks rushed.',
    ],
    forLove: {
      title: 'Cooking it for someone you love',
      body: [
        "Turning up at your partner's family party with a full bilao is the Filipino way of bringing flowers to every relative at once.",
        'It is also one of the kindest things to bring a family with a new baby, a wake or a big move: food for everyone, and no plates to return.',
      ],
    },
    forBusiness: {
      title: 'Selling it: pancit bilao pang-negosyo',
      body: [
        'Using two 500 g packs of Super Q Golden Bihon at the ₱50 SRP, the noodles for this bilao cost about ₱100, or ₱10 or less per serving for at least ten. Add your meat, vegetables, banana leaves, tray, gas and labour, then set your price per bilao.',
      ],
      points: [
        'Take bilao orders at least a day ahead, so you buy exactly what each order needs.',
        'Cook slightly underdone. The noodles keep softening during delivery.',
        'Tape a small bag of calamansi and your contact card to the cling wrap. Every bilao at a party can bring in the next order.',
        'Photograph every bilao before it leaves and post it. Your next customer is often someone who saw the last one.',
      ],
    },
  },

  {
    slug: 'pancit-bam-i',
    name: 'Pancit Bam-i',
    headline: 'Pancit Bam-i (Cebuano Mixed Pancit)',
    seoTitle: "Pancit Bam-i Recipe: Cebu's Two-Noodle Pancit",
    tagline: 'Two noodles, one pan. The Cebuano pancit that tells everyone at the handaan you know what you are doing.',
    description:
      'The Cebuano pancit that mixes bihon and pancit canton in one pan, with pork, shrimp and Chinese sausage. Two textures, one bilao.',
    image: '/images/superqpancit.jpg',
    imageAlt:
      'A pack of Super Q Special Pancit Canton beside a plate of cooked pancit canton topped with vegetables',
    product: { name: 'Super Q Pancit Canton', slug: 'super-q-pancit-canton' },
    alsoUses: ['super-q-golden-bihon'],
    category: 'Main course',
    cuisine: 'Filipino',
    servings: '6 servings',
    prepMinutes: 25,
    cookMinutes: 30,
    published: '2026-10-16',
    intro: `Bam-i is Cebu's own pancit, and the thing that defines it is using two noodles at once: fine bihon for the soft base and pancit canton for the chew. Our factory is in Talisay, just outside Cebu City, where bam-i is a staple.\n\nThe two noodles cook at different rates, which is the whole trick — the canton goes in first and the bihon follows.`,
    ingredientGroups: [
      {
        title: null,
        items: [
          '250 g Super Q Golden Bihon',
          '250 g Super Q Pancit Canton',
          '250 g pork belly, sliced thin',
          '200 g shrimp, peeled',
          '2 pieces Chinese sausage, sliced on the diagonal',
          '1 cup dried wood ear mushrooms, soaked and sliced',
          '4 cloves garlic, minced',
          '1 medium onion, sliced',
          '2 medium carrots, cut into matchsticks',
          '¼ small cabbage, shredded',
          '1.5 liters (about 6 cups) pork or chicken broth',
          '4 tbsp soy sauce',
          '2 tbsp oyster sauce',
          '2 tbsp cooking oil',
          'Salt and ground pepper, to taste',
          'Spring onions and calamansi wedges, to serve',
        ],
      },
    ],
    steps: [
      {
        name: 'Soak the mushrooms, not the noodles',
        text: 'Soak the dried wood ear mushrooms in warm water until soft, then slice. Keep both noodles dry: Super Q Golden Bihon needs no soaking and goes in straight from the pack.',
      },
      {
        name: 'Render the sausage and pork',
        text: 'Heat the oil and cook the Chinese sausage briefly to release its fat. Add the pork and cook until browned, then add the shrimp and cook just until pink. Remove the shrimp so it does not overcook.',
      },
      {
        name: 'Sauté and cook the vegetables',
        text: 'Add the garlic and onion to the same pan and cook until fragrant. Add the carrots, wood ear mushrooms and cabbage, toss for two minutes, then set the vegetables aside.',
      },
      {
        name: 'Build the sauce',
        text: 'Pour in the broth, add the soy sauce and oyster sauce, season, and bring to a boil. The broth covers both noodles: 1 liter for the 250 g of bihon, following the Super Q ratio, plus extra for the canton.',
      },
      {
        name: 'Cook the canton first',
        text: 'Add the Super Q Pancit Canton to the boiling sauce. It is the thicker noodle and needs the longer time — let it soften and take up some liquid before the bihon joins it.',
      },
      {
        name: 'Add the bihon',
        text: 'Add the Super Q Golden Bihon straight from the pack. Let it boil for 4 minutes before you start loosening it, then fold the two noodles together with tongs. Add a little more broth if the pan goes dry.',
      },
      {
        name: 'Finish',
        text: 'Return the vegetables and shrimp, toss through, and take the pan off the heat while both noodles still have bite. Serve with spring onions and calamansi.',
      },
    ],
    tips: [
      'The ratio is a matter of household preference. Equal parts bihon and canton is a good starting point; adjust toward whichever texture your family likes.',
      'Add the shrimp back at the very end. Shrimp cooked twice turns rubbery.',
    ],
    forLove: {
      title: 'Cooking it for someone you love',
      body: [
        'Dating someone from Cebu? Learn bam-i. Turning up to their family handaan with the right pancit says more than any speech.',
        'Bam-i is generous by design: two noodles, plenty of toppings, enough for the whole table. It is a dish for people you want to feed well.',
      ],
    },
    forBusiness: {
      title: 'Selling it: bam-i pang-negosyo',
      body: [
        'Bam-i sells on looks. Two noodle textures and colourful toppings make a bilao that photographs well, which matters when your orders come from Facebook and Messenger.',
      ],
      points: [
        'Cook the canton first and the bihon second, so both are right when the order goes out.',
        'Post a photo of every bilao you send. Your customers are your best advertising.',
      ],
    },
  },

  {
    slug: 'pancit-palabok',
    name: 'Pancit Palabok',
    headline: 'Pancit Palabok',
    seoTitle: 'Pancit Palabok Recipe for Merienda & Negosyo',
    tagline: 'The merienda that sells itself, and the dish to make when you want them to know you tried.',
    description:
      'Thick palabok noodles under an annatto shrimp sauce with chicharon, egg and smoked fish flakes. Assembled to order, made for merienda and for selling.',
    image: '/images/products/newproducts/specialpalabok.jpg',
    imageAlt:
      'A plate of pancit palabok topped with shrimp, squid rings, boiled egg and crushed chicharon, beside a pack of Super Q Special Palabok',
    product: { name: 'Super Q Special Palabok', slug: 'super-q-special-palabok' },
    category: 'Main course',
    cuisine: 'Filipino',
    servings: '5 servings',
    prepMinutes: 25,
    cookMinutes: 30,
    published: '2026-10-16',
    intro: `Palabok is the celebration pancit — the noodles stay plain and the sauce and toppings do all the work. Super Q Special Palabok uses the same cornstarch base as our Golden Bihon but with a noticeably thicker strand, which is why it stands up to a heavy sauce instead of disappearing into it.\n\nThe thicker strand also means it needs longer in the water than bihon does.`,
    ingredientGroups: [
      {
        title: 'Noodles',
        items: ['500 g Super Q Special Palabok'],
      },
      {
        title: 'Sauce',
        items: [
          '250 g ground pork',
          '4 cups shrimp or pork broth',
          '2 tbsp annatto (atsuete) seeds, steeped in ¼ cup warm water',
          '4 cloves garlic, minced',
          '1 medium onion, chopped',
          '3 tbsp fish sauce',
          '¼ cup cornstarch, dissolved in ½ cup water',
          '2 tbsp cooking oil',
          'Ground pepper, to taste',
        ],
      },
      {
        title: 'Toppings',
        items: [
          '200 g shrimp, boiled and peeled',
          '100 g squid rings, boiled (optional)',
          '3 hard-boiled eggs, sliced',
          '1 cup crushed chicharon',
          '½ cup smoked fish (tinapa) flakes',
          '¼ cup fried garlic',
          'Spring onions, chopped',
          'Calamansi wedges, to serve',
        ],
      },
    ],
    steps: [
      {
        name: 'Cook the noodles',
        text: 'Cook the Super Q Special Palabok following the pack instructions. The strand is thicker than bihon and needs longer, so give it the full time. Drain and arrange on a serving platter.',
      },
      {
        name: 'Start the sauce',
        text: 'Heat the oil and sauté the garlic and onion until fragrant. Add the ground pork and cook until it loses its pink colour.',
      },
      {
        name: 'Colour and season',
        text: 'Strain the steeped annatto water into the pan, discarding the seeds. Add the broth and fish sauce, season with pepper, and bring to a simmer.',
      },
      {
        name: 'Thicken',
        text: 'Pour in the dissolved cornstarch slowly while stirring. Keep stirring until the sauce thickens enough to coat the back of a spoon. Thin it with a little broth if it goes too far.',
      },
      {
        name: 'Assemble',
        text: 'Pour the hot sauce over the drained noodles. Arrange the shrimp, squid, egg slices, chicharon, tinapa flakes, fried garlic and spring onions on top.',
      },
      {
        name: 'Serve',
        text: 'Serve immediately with calamansi wedges on the side. Palabok is assembled to order — the chicharon loses its crunch once it sits in the sauce.',
      },
    ],
    tips: [
      'Add the chicharon at the table rather than in the kitchen if the dish will not be eaten straight away.',
      'The sauce should pour, not hold its shape. If it stiffens while standing, loosen it with a splash of hot broth.',
    ],
    forLove: {
      title: 'Cooking it for someone you love',
      body: [
        'Palabok is a show-off dish: orange sauce, sliced egg, shrimp, crunch on top. Nobody makes palabok by accident. Serve it and they will know you made an effort.',
      ],
    },
    forBusiness: {
      title: 'Selling it: palabok pang-negosyo',
      body: [
        'Palabok is assembled to order, which suits a carinderia, a food stall or a merienda business. Cook the noodles and the sauce ahead, then top each order as it is served.',
      ],
      points: [
        'Keep the chicharon separate and add it last, so every order arrives crunchy.',
        'The thick Super Q Special Palabok strand stands up to a heavy sauce instead of disappearing into it.',
        'Keep a pot of hot broth nearby to loosen sauce that has thickened during a busy service.',
      ],
    },
  },

  {
    slug: 'pancit-canton-guisado',
    name: 'Pancit Canton Guisado',
    headline: 'Pancit Canton Guisado',
    seoTitle: 'Pancit Canton Recipe for Handaan & Negosyo',
    tagline: 'The handaan centrepiece: glossy, chewy, and the first plate to empty.',
    description:
      'Stir-fried pancit canton with pork, shrimp, squid, Chinese sausage and vegetables, made with Super Q Pancit Canton. For birthdays, bilao orders and selling.',
    image: '/images/products/newproducts/specialpancitcanton.jpg',
    imageAlt:
      'Two packs of Super Q Special Pancit Canton beside a plate of pancit canton with shrimp, squid, pork, Chinese sausage and cabbage',
    product: { name: 'Super Q Pancit Canton', slug: 'super-q-pancit-canton' },
    category: 'Main course',
    cuisine: 'Filipino',
    servings: '6 servings',
    prepMinutes: 20,
    cookMinutes: 25,
    published: '2026-10-16',
    intro: `Pancit canton is the pancit on the birthday table, and the one most people picture when they hear "handaan." Super Q Pancit Canton is a wheat-based noodle, puffed by deep frying the cooked noodles, which gives it a firm texture that stays chewy under a glossy sauce.\n\nThe skill is in the liquid. Canton drinks broth fast, so add it gradually and stop when the noodles are tender, not when the pan is dry.`,
    ingredientGroups: [
      {
        title: null,
        items: [
          '500 g Super Q Pancit Canton',
          '250 g pork belly, sliced thin',
          '200 g shrimp, peeled',
          '100 g squid, sliced into rings (optional)',
          '2 pieces Chinese sausage, sliced on the diagonal',
          '4 cloves garlic, minced',
          '1 medium onion, sliced',
          '2 medium carrots, cut into matchsticks',
          '1 cup snow peas (sitsaro), trimmed (optional)',
          '¼ small cabbage, shredded',
          '3 to 4 cups chicken or pork broth',
          '4 tbsp soy sauce',
          '2 tbsp oyster sauce',
          '2 tbsp cooking oil',
          'Salt and ground pepper, to taste',
          'Spring onions and calamansi wedges, to serve',
        ],
      },
    ],
    steps: [
      {
        name: 'Check the pack',
        text: 'Pancit canton usually goes into the broth dry, with no soaking. Check the instructions on your Super Q Pancit Canton pack before you start.',
      },
      {
        name: 'Cook the meat and seafood',
        text: 'Heat the oil and cook the Chinese sausage briefly to release its fat. Add the pork and cook until browned. Add the shrimp and squid and cook just until done, then lift the seafood out so it does not overcook.',
      },
      {
        name: 'Cook the vegetables',
        text: 'Add the garlic and onion and cook until fragrant. Add the carrots, snow peas and cabbage and toss for about two minutes, then set the vegetables aside.',
      },
      {
        name: 'Build the sauce',
        text: 'Pour three cups of the broth into the pan. Add the soy sauce and oyster sauce, season with salt and pepper, and bring to a simmer.',
      },
      {
        name: 'Cook the canton',
        text: 'Add the Super Q Pancit Canton and loosen the strands with tongs as they soften. Let the noodles take up the liquid, adding more broth a little at a time until they are tender.',
      },
      {
        name: 'Finish',
        text: 'Return the vegetables and seafood and toss everything together. Serve hot with spring onions and calamansi.',
      },
    ],
    tips: [
      'Add the broth gradually. You can always loosen pancit canton with more broth, but you cannot take liquid back out.',
      'For a bilao that will travel, take it off the heat while it is still slightly firm. It keeps cooking in the tray.',
    ],
    forLove: {
      title: 'Cooking it for someone you love',
      body: [
        'Pancit canton is on almost every Filipino birthday table. Make it for someone on their birthday and you have given them the long-life noodles and the party on one plate.',
      ],
    },
    forBusiness: {
      title: 'Selling it: pancit canton pang-negosyo',
      body: [
        'Super Q Pancit Canton has a firm texture, which suits bilao, party and delivery orders where the noodles wait before they are eaten.',
      ],
      points: [
        'Cook slightly underdone for anything that has to travel.',
        'Send a small cup of extra hot broth with large orders so customers can loosen the noodles at the table.',
        'Make one generous sample bilao for your page photo. Pancit canton sells on how it looks.',
      ],
    },
  },
  {
    slug: 'chicken-sotanghon-soup',
    name: 'Chicken Sotanghon Soup',
    headline: 'Chicken Sotanghon Soup',
    seoTitle: 'Chicken Sotanghon Soup Recipe for Someone You Love',
    tagline: 'The bowl you bring to someone you love when the weather turns.',
    description:
      'Clear chicken soup with Super Q Sotanghon mung bean vermicelli, carrots and cabbage, finished with fried garlic. The Filipino way of looking after someone.',
    image: '/images/products/newproducts/sotanghon_vermicelli.jpg',
    imageAlt:
      'Three packs of Super Q Sotanghon mung bean vermicelli beside a bowl of chicken sotanghon soup with shredded chicken, carrots and fried shallots',
    product: { name: 'Super Q Sotanghon', slug: 'super-q-sotanghon' },
    category: 'Soup',
    cuisine: 'Filipino',
    servings: '5 servings',
    prepMinutes: 15,
    cookMinutes: 35,
    published: '2026-10-16',
    intro: `Sotanghon soup is what gets cooked when someone in the house is unwell, and when the weather turns. Super Q Sotanghon is a mung bean vermicelli — the strands turn translucent and slippery rather than soft, and they hold their shape in hot broth instead of dissolving into it.\n\nIts flavour is neutral, so the broth has to carry the dish.`,
    ingredientGroups: [
      {
        title: null,
        items: [
          '200 g Super Q Sotanghon',
          '1 whole chicken leg quarter, or 500 g chicken pieces',
          '8 cups water',
          '1 cup dried wood ear mushrooms, soaked and sliced (optional)',
          '4 cloves garlic, minced',
          '1 medium onion, chopped',
          '1 thumb ginger, sliced',
          '2 medium carrots, cut into matchsticks',
          '2 cups cabbage or pechay, chopped',
          '1 tbsp annatto (atsuete) oil, for colour (optional)',
          '2 tbsp fish sauce',
          '2 tbsp cooking oil',
          'Salt and ground pepper, to taste',
          'Fried garlic, spring onions and hard-boiled egg, to serve',
        ],
      },
    ],
    steps: [
      {
        name: 'Make the broth',
        text: 'Simmer the chicken in the water with the ginger until tender, about 30 minutes. Remove the chicken, shred the meat, and keep the broth.',
      },
      {
        name: 'Soak the sotanghon',
        text: 'Soak the Super Q Sotanghon following the pack instructions until the strands turn translucent and pliable. Drain and set aside.',
      },
      {
        name: 'Sauté',
        text: 'Heat the oil in a pot and sauté the garlic and onion until fragrant. Add the shredded chicken and the wood ear mushrooms and stir for a minute.',
      },
      {
        name: 'Season the broth',
        text: 'Pour the reserved broth back in. Add the fish sauce and the annatto oil if using, season with salt and pepper, and bring to a simmer.',
      },
      {
        name: 'Add vegetables and noodles',
        text: 'Add the carrots and cook until just tender. Add the cabbage, then the drained sotanghon, and simmer only until heated through — a minute or two is enough.',
      },
      {
        name: 'Serve',
        text: 'Ladle into bowls and top with fried garlic, spring onions and egg.',
      },
    ],
    tips: [
      'Sotanghon keeps absorbing broth while it sits. If you are making it ahead, keep the noodles and the soup separate and combine in the bowl.',
      'Fried garlic at the end is not optional in most Filipino kitchens — it is most of the aroma.',
    ],
    forLove: {
      title: 'Cooking it for someone you love',
      body: [
        'Sotanghon soup is how Filipino families look after each other. When someone you love needs looking after, a pot of this says it without anyone having to say it.',
        'Bring the noodles and the soup in separate containers and combine them in the bowl. That way it is just as good when it arrives.',
      ],
    },
    forBusiness: {
      title: 'Selling it: sotanghon soup pang-negosyo',
      body: [
        'Soup sells when it rains. Sotanghon soup is easy to batch: make the broth and vegetables ahead, and soak the noodles in small lots through the day.',
      ],
      points: [
        'Store the noodles and broth separately and combine them per bowl, so the last order is as good as the first.',
        'Offer it as a rainy-day special on your page. Timing does the marketing for you.',
      ],
    },
  },
  {
    slug: 'birthday-misua-soup',
    name: 'Birthday Misua Soup',
    headline: 'Birthday Misua Soup with Chicken and Patola',
    seoTitle: 'Misua Soup Recipe for Birthdays and Long Life',
    tagline: 'Long strands for long life, a round coil for family coming together. The bowl to cook on a birthday.',
    description:
      'Misua soup with chicken and patola, made with Super Q Misua. Long strands for long life, and a whole egg in every bowl for the birthday celebrant.',
    image: '/images/products/newproducts/misua2.jpg',
    imageAlt:
      'Two packs of Super Q Misua beside a bowl of misua soup with shredded chicken, patola and spring onions',
    product: { name: 'Super Q Misua', slug: 'super-q-misua' },
    category: 'Soup',
    cuisine: 'Filipino',
    servings: '4 servings',
    prepMinutes: 15,
    cookMinutes: 35,
    published: '2026-10-16',
    intro: `Misua is a birthday noodle. In Chinese tradition its long strands stand for long life, and the round coil it is formed into stands for family coming together. Super Q Misua is a fine wheat-flour noodle shaped exactly that way.\n\nIt cooks very quickly, so the whole soup is built first and the misua goes in last, just before everyone sits down.`,
    ingredientGroups: [
      {
        title: null,
        items: [
          '160 g Super Q Misua (one pack)',
          '1 chicken breast or 2 chicken thighs',
          '7 cups water',
          '1 medium patola (sponge gourd), peeled and sliced',
          '4 cloves garlic, minced',
          '1 medium onion, sliced',
          '1 thumb ginger, sliced',
          '2 tbsp fish sauce',
          '2 tbsp cooking oil',
          'Salt and ground pepper, to taste',
          '4 hard-boiled eggs, peeled, one for each bowl',
          'Spring onions and fried garlic, to serve',
        ],
      },
    ],
    steps: [
      {
        name: 'Make the broth',
        text: 'Simmer the chicken with the ginger in the water until tender, about 25 minutes. Lift the chicken out, shred the meat and keep the broth.',
      },
      {
        name: 'Sauté',
        text: 'Heat the oil in a pot and sauté the garlic and onion until fragrant. Add the shredded chicken and stir for a minute.',
      },
      {
        name: 'Season the soup',
        text: 'Pour the broth back in, add the fish sauce, season with salt and pepper and bring to a boil.',
      },
      {
        name: 'Add the patola',
        text: 'Add the patola and simmer until just tender, two to three minutes. It should still hold its shape.',
      },
      {
        name: 'Add the misua last',
        text: 'Lower the heat and add the Super Q Misua whole. Stir gently so the strands stay long, and cook only as long as the pack directs. Misua cooks very fast.',
      },
      {
        name: 'Serve straight away',
        text: 'Ladle into bowls, put a whole peeled egg in each one, and finish with spring onions and fried garlic.',
      },
    ],
    tips: [
      'On a birthday, do not break or cut the misua. The long, unbroken strands are the wish.',
      'Misua keeps drinking the broth as it sits, and the soup thickens. Cook the noodles only when everyone is ready to eat.',
    ],
    forLove: {
      title: 'Cooking it for someone you love',
      body: [
        'Wake someone up on their birthday with a bowl of misua and an egg. It is a small breakfast that says a big thing: live long, and keep coming home to us.',
        'Cook it for a parent, a lola or a lolo. For the people who taught you this tradition, it is the bowl that means the most.',
      ],
    },
    forBusiness: {
      title: 'Selling it: misua soup pang-negosyo',
      body: [
        'Misua soup is quick to serve because the noodle cooks so fast. Keep the broth hot through service and cook the misua per bowl as orders come in.',
      ],
      points: [
        'Offer a "birthday bowl" with a whole egg for customers ordering for a celebrant.',
        'Keep the broth and the misua apart until each order, so the last bowl is as good as the first.',
      ],
    },
  },
];

export const getRecipe = (slug) => recipes.find((r) => r.slug === slug);

export const recipesForProduct = (productSlug) =>
  recipes.filter(
    (r) => r.product.slug === productSlug || (r.alsoUses || []).includes(productSlug),
  );
