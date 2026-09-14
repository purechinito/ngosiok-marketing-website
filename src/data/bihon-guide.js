/**
 * Content for the /bihon pillar page.
 *
 * Why this page exists: the search results for "bihon" are entirely recipe
 * blogs, and they disagree with each other about what bihon is even made of
 * (some say rice, some say cornstarch, some say both). We manufacture it, so
 * we can answer that accurately in a way a recipe blog cannot. That is the one
 * durable advantage we have on this keyword.
 *
 * Accuracy rule for anything added here: bihon names a NOODLE FORM, not a
 * single recipe. It is made from rice flour, cornstarch, or a blend depending
 * on the maker. Super Q is cornstarch-based. Do not flatten that into "bihon
 * is cornstarch" - it would be wrong, and being the accurate source is the
 * whole point of the page.
 */

export const noodleComparison = [
  {
    noodle: 'Bihon',
    base: 'Cornstarch, rice flour, or a blend',
    strand: 'Very fine, round',
    cooked: 'Soft and bouncy, stays separate',
    dish: 'Pancit bihon',
    ours: 'Super Q Golden Bihon (cornstarch)',
    slug: 'super-q-golden-bihon',
  },
  {
    noodle: 'Palabok',
    base: 'Cornstarch',
    strand: 'Same as bihon but noticeably thicker',
    cooked: 'Firmer, holds heavy sauce',
    dish: 'Pancit palabok',
    ours: 'Super Q Special Palabok',
    slug: 'super-q-special-palabok',
  },
  {
    noodle: 'Pancit Canton',
    base: 'Wheat flour',
    strand: 'Flat and wide, pre-fried',
    cooked: 'Chewy with a slight bite',
    dish: 'Pancit canton',
    ours: 'Super Q Pancit Canton',
    slug: 'super-q-pancit-canton',
  },
  {
    noodle: 'Sotanghon',
    base: 'Starch vermicelli',
    strand: 'Fine, translucent when cooked',
    cooked: 'Slippery and smooth, nearly clear',
    dish: 'Sotanghon soup, lumpia filling',
    ours: 'Super Q Sotanghon',
    slug: 'super-q-sotanghon',
  },
  {
    noodle: 'Misua',
    base: 'Wheat flour',
    strand: 'Extremely fine, round',
    cooked: 'Very soft, cooks in under a minute',
    dish: 'Misua soup, birthday noodles',
    ours: 'Super Q Misua',
    slug: 'super-q-misua',
  },
];

export const cookingSteps = [
  {
    title: 'Soften it first, do not boil it',
    body: 'Soak dried bihon in room-temperature water until the strands turn pliable and separate, then drain well. Boiling is what turns bihon to paste - the strands keep cooking in the pan afterwards.',
  },
  {
    title: 'Build the sauce before the noodles go in',
    body: 'Cook your garlic, onion, meat and vegetables first, then add broth and soy sauce and bring it to a simmer. The noodles should meet a finished, seasoned liquid.',
  },
  {
    title: 'Let the noodles drink the broth',
    body: 'Add the drained bihon to the simmering liquid and toss constantly with tongs. Bihon has very little flavour of its own - everything it tastes like, it absorbs at this stage.',
  },
  {
    title: 'Pull it off while it still has bite',
    body: 'Stop when the liquid is nearly gone and the strands are tender but still springy. Carryover heat finishes it. Finish with calamansi or lemon at the table, not in the pan.',
  },
];

export const bihonFaqs = [
  {
    question: 'Is bihon made from rice or cornstarch?',
    answer:
      'Both, depending on the manufacturer. "Bihon" describes the noodle form - very fine, round strands - rather than a single recipe, which is why sources disagree. Traditional bihon is made from rice flour, which is why it is often sold in English as rice sticks or rice vermicelli. Many commercial Filipino bihon, including Super Q Golden Bihon, are cornstarch-based instead. Cornstarch gives a naturally golden strand, a bouncier bite, and better resistance to breaking up during stir-frying.',
  },
  {
    question: 'What is the difference between bihon and pancit?',
    answer:
      'Bihon is the noodle. Pancit is the dish. Pancit is the general Filipino term for a stir-fried noodle dish, and it is named after whichever noodle goes into it - pancit bihon uses bihon, pancit canton uses canton, pancit palabok uses palabok. So every pancit bihon contains bihon, but not every pancit does.',
  },
  {
    question: 'What is the difference between bihon and sotanghon?',
    answer:
      'Bihon is opaque and pale-to-golden when cooked and is usually stir-fried. Sotanghon is a starch vermicelli that turns translucent and slippery when cooked, which is why it is often called a glass noodle, and it is more common in soups and lumpia fillings. They are not interchangeable: sotanghon absorbs far more liquid and will go soft in a stir-fry meant for bihon.',
  },
  {
    question: 'Why does my bihon turn mushy or break apart?',
    answer:
      'Almost always because it was boiled. Dried bihon only needs soaking in room-temperature water until the strands are pliable, then draining. It finishes cooking in the pan as it absorbs the sauce. Boiling first means the strands are already fully cooked before they reach the heat, and they fall apart from there.',
  },
  {
    question: 'Is bihon gluten free?',
    answer:
      'Rice-based and cornstarch-based bihon contain no wheat, but that is not the same as a certified gluten-free product, and it does not cover the rest of the dish. Soy sauce, oyster sauce and wheat-based noodles like pancit canton and misua all contain gluten. Always check the pack, and check anything else going into the pancit.',
  },
  {
    question: 'How much dried bihon do I need per person?',
    answer:
      'Dried bihon roughly doubles in weight once it has absorbed liquid. As a working guide, 50 to 60 g of dried noodles per person makes a generous main-course portion, so a 227 g pack serves about four and a 500 g pack serves about eight to ten as part of a larger spread.',
  },
  {
    question: 'Can I substitute bihon for rice vermicelli?',
    answer:
      'Usually yes. Rice vermicelli sold for Vietnamese or Thai cooking is close enough in thickness to stand in for bihon in most pancit recipes. The texture differs slightly - cornstarch bihon is bouncier and holds up better to prolonged tossing in a hot pan - but the dish will work.',
  },
];
