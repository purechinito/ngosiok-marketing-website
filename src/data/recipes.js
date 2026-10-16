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
 * - No soak or cook time stated as official for a Super Q product. Soaking
 *   varies by pack and strand, so steps defer to the pack instructions.
 * - `image` must be a real file under public/ and `imageAlt` must describe
 *   what that photo actually shows, not what the recipe is about.
 */

export const recipes = [
  {
    slug: 'pancit-bihon-guisado',
    name: 'Pancit Bihon Guisado',
    headline: 'Pancit Bihon Guisado',
    description:
      'The classic Filipino stir-fried bihon with pork, chicken and vegetables. Uses one 500 g pack of Super Q Golden Bihon and serves at least five.',
    image: '/images/products/newproducts/goldenbihon.jpg',
    imageAlt:
      'A pack of Super Q Golden Bihon beside a plate of cooked bihon with shrimp, mussels, squid and vegetables',
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
          '3 to 4 cups chicken broth',
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
        name: 'Soften the bihon',
        text: 'Soak the Super Q Golden Bihon following the instructions on the pack, until the strands are pliable but not fully soft. Drain well and set aside. The noodles finish cooking in the sauce, not in the soaking water.',
      },
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
        text: 'Pour the broth into the same pan. Add the soy sauce and oyster sauce, season with salt and pepper, and bring to a simmer. Taste now — the noodles will absorb whatever this liquid tastes like.',
      },
      {
        name: 'Add the noodles',
        text: 'Add the drained bihon. Fold it through with tongs and let it take up the liquid, about three to five minutes. Toss gently rather than stirring hard, which shreds the strands.',
      },
      {
        name: 'Finish',
        text: 'Return the vegetables and toss through. Pull the pan off the heat while the noodles still have bite — residual heat keeps cooking them. Serve with spring onions and calamansi.',
      },
    ],
    tips: [
      'Cooking for a buffet or handaan? Stop a minute early. Pancit keeps softening on the serving table.',
      'Super Q Golden Bihon is cornstarch-based, so it holds its bite longer than rice bihon once the sauce goes in.',
    ],
  },

  {
    slug: 'pancit-bam-i',
    name: 'Pancit Bam-i',
    headline: 'Pancit Bam-i (Cebuano Mixed Pancit)',
    description:
      'The Cebuano pancit that mixes two noodles in one pan — bihon and pancit canton together, with pork, shrimp and Chinese sausage.',
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
          '4 to 5 cups pork or chicken broth',
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
        name: 'Soak the noodles and mushrooms',
        text: 'Soak the Super Q Golden Bihon following the pack instructions until pliable, then drain. Soak the dried wood ear mushrooms in warm water until soft, then slice. Keep the pancit canton dry for now.',
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
        text: 'Pour in the broth, add the soy sauce and oyster sauce, season, and bring to a simmer.',
      },
      {
        name: 'Cook the canton first',
        text: 'Add the Super Q Pancit Canton to the simmering sauce. It is the thicker noodle and needs the longer time — let it soften and take up liquid before the bihon joins it.',
      },
      {
        name: 'Add the bihon',
        text: 'Add the drained bihon and fold the two noodles together with tongs. Add a little more broth if the pan goes dry.',
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
  },

  {
    slug: 'pancit-palabok',
    name: 'Pancit Palabok',
    headline: 'Pancit Palabok',
    description:
      'Thick palabok noodles under an annatto-coloured shrimp sauce, finished with chicharon, egg and smoked fish flakes.',
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
  },

  {
    slug: 'chicken-sotanghon-soup',
    name: 'Chicken Sotanghon Soup',
    headline: 'Chicken Sotanghon Soup',
    description:
      'A clear chicken soup with translucent mung bean vermicelli, carrots and cabbage, finished with fried garlic.',
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
  },
];

export const getRecipe = (slug) => recipes.find((r) => r.slug === slug);

export const recipesForProduct = (productSlug) =>
  recipes.filter(
    (r) => r.product.slug === productSlug || (r.alsoUses || []).includes(productSlug),
  );
