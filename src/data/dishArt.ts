/**
 * Dish art descriptors.
 *
 * CleverDish is used by people who cannot read, so the picture of the plate has
 * to be recognisable on its own. These descriptors turn a dish name into the
 * visible components of a plate: what the starch looks like, which protein
 * sits on top, the stew colour, and the garnish.
 *
 * Everything here is derived from the real dish, so a plate of Waakye renders
 * as rice and beans with fish rather than a generic orange bowl. Pure data, no
 * browser APIs, so it can also be used server-side.
 */

export type BaseKind =
  | 'rice'
  | 'swallow'
  | 'flatbread'
  | 'yam'
  | 'plantain'
  | 'oats'
  | 'pasta'
  | 'greens'
  | 'beans'
  | 'egg'
  | 'root';

export interface DishArt {
  /** How the starch/base is shaped. */
  base: BaseKind;
  /** Large protein glyph. */
  protein: string;
  /** Large side/garnish glyphs. */
  sides: string[];
  /** Stew or sauce gradient. */
  sauceFrom: string;
  sauceTo: string;
  /** True for loose soups and stews, where the liquid spreads across the plate. */
  soupy: boolean;
  /** Small finishing touch. */
  garnish: string;
  /** Words a screen reader announces for the plate. */
  alt: string;
}

interface BaseRecipe {
  base: BaseKind;
  emoji: string;
  sides: string[];
  garnish: string;
}

interface SauceRecipe {
  from: string;
  to: string;
  soupy?: boolean;
}

const PROTEIN_GLYPH: Record<string, string> = {
  fish: '🐟',
  poultry: '🍗',
  eggs_dairy: '🥚',
  legumes_plant: '🫘',
  beef_lean: '🥩'
};

const PROTEIN_WORD: Record<string, string> = {
  fish: 'fish',
  poultry: 'chicken',
  eggs_dairy: 'eggs',
  legumes_plant: 'beans',
  beef_lean: 'beef'
};

/**
 * Named dishes, most specific first. The order is load-bearing: "Moin-Moin
 * with Garri Crunch" must resolve to bean cake, not to the swallow that garri
 * suggests, and "Oatmeal Swallow" must resolve to dough, not to oatmeal.
 */
const NAMED_DISHES: Array<{ match: RegExp; recipe: BaseRecipe; alt: string }> = [
  {
    match: /\binjera\b|\bteff\b/i,
    recipe: { base: 'flatbread', emoji: '🫓', sides: ['🥩', '🍅'], garnish: '🌿' },
    alt: 'a flat injera spongy pancake with stews spooned on top'
  },
  {
    match: /\bwaakye\b/i,
    recipe: { base: 'rice', emoji: '🍚', sides: ['🫘', '🐟'], garnish: '🌶️' },
    alt: 'a plate of waakye rice and beans with fish and pepper'
  },
  {
    match: /\bjollof\b/i,
    recipe: { base: 'rice', emoji: '🍚', sides: ['🍗', '🍌'], garnish: '🌿' },
    alt: 'a bowl of red jollof rice with chicken and fried plantain'
  },
  {
    match: /\bbanku\b|\bkenkey\b|\bkelewele\b/i,
    recipe: { base: 'swallow', emoji: '🫓', sides: ['🐟', '🍅'], garnish: '🌶️' },
    alt: 'a hand-sized banku dough with pepper sauce and fried fish'
  },
  {
    match: /\battiéké\b|\battieke\b/i,
    recipe: { base: 'swallow', emoji: '🥣', sides: ['🐟', '🍅'], garnish: '🌿' },
    alt: 'a mound of attieke cassava couscous with grilled fish'
  },
  {
    match: /\bugali\b|\bposho\b|\bnsima\b/i,
    recipe: { base: 'swallow', emoji: '🥣', sides: ['🍲', '🥬'], garnish: '🍌' },
    alt: 'a mound of maize flour with greens and sauce'
  },
  {
    // Plain dough swallows, before any starch that happens to be mentioned.
    match: /\bswallow\b|\bfufu\b|\bsemolina\b|\bpounded yam\b|\beba\b|\bchuk\w*\b|\bmatapa\b/i,
    recipe: { base: 'swallow', emoji: '🥣', sides: ['🍲', '🥬'], garnish: '🥣' },
    alt: 'a smooth mound of dough swallow with a bowl of soup and greens'
  },
  {
    // Bean cakes win over the garri/cassava flour they may be served with.
    match: /\bmoi-?moin\b|\bmoin-?moi\b|\belewe\b|\bmoinmoi\b|\bewa\b|\bhoublion\b|\bboiled (white )?beans\b|\bhoney beans\b/i,
    recipe: { base: 'beans', emoji: '🫘', sides: ['🍅', '🌶️'], garnish: '🥬' },
    alt: 'a mound of steamed bean cake with tomato and pepper'
  },
  {
    match: /\bgarri\b|\bfufu\b/i,
    recipe: { base: 'swallow', emoji: '🥣', sides: ['🍲', '🥬'], garnish: '🥣' },
    alt: 'a smooth mound of dough swallow with a bowl of soup and greens'
  },
  {
    match: /\bpast[a|e]\b|\bspaghetti\b|\bpenne\b|\bnoodles?\b|\bmacaroni\b/i,
    recipe: { base: 'pasta', emoji: '🍝', sides: ['🍅', '🧀'], garnish: '🌿' },
    alt: 'a plate of pasta with tomato sauce'
  },
  {
    match: /\bsalad\b|\bslaw\b|\bcoleslaw\b/i,
    recipe: { base: 'greens', emoji: '🥗', sides: ['🍅', '🥒'], garnish: '🫒' },
    alt: 'a bowl of fresh green salad with tomato and cucumber'
  },
  {
    match: /\boat\w*\b|\bporridge\b|\bmuesli\b|\bgranola\b/i,
    recipe: { base: 'oats', emoji: '🥣', sides: ['🍌', '🫐'], garnish: '🥛' },
    alt: 'a bowl of oatmeal with sliced banana and berries'
  },
  {
    match: /\bshakshuka\b|\bomelette\b|\bomelet\b|\bboiled egg\b|\begg\b/i,
    recipe: { base: 'egg', emoji: '🍳', sides: ['🥚', '🌶️'], garnish: '🌿' },
    alt: 'eggs cooked in spiced tomato sauce'
  },
  {
    match: /\bplantain\b/i,
    recipe: { base: 'plantain', emoji: '🍌', sides: ['🐟', '🍅'], garnish: '🌶️' },
    alt: 'fried plantain served with fish and tomato'
  },
  {
    match: /\byam\b|\bubi\b|\bcassava\b|\bpotato\b|\bsweet potato\b/i,
    recipe: { base: 'root', emoji: '🍠', sides: ['🍲', '🥬'], garnish: '🌿' },
    alt: 'boiled root vegetable with a bowl of stew and greens'
  },
  {
    // Any dish built on rice, even when a protein is named alongside it.
    match: /\brice\b/i,
    recipe: { base: 'rice', emoji: '🍚', sides: ['🐖', '🍎'], garnish: '🌿' },
    alt: 'a plate of rice with a rich stew spooned over it'
  },
  {
    // Fish-led plates. Only reached when no starch rule above claimed the dish.
    match: /\btilapia\b|\bcatfish\b|\bherrings?\b|\bmackerel\b|\bsardine\b|\bgrilled fish\b|\bsmoked fish\b/i,
    recipe: { base: 'greens', emoji: '🐟', sides: ['🍚', '🍅'], garnish: '🌿' },
    alt: 'a whole grilled fish with rice and tomato'
  }
];

/** Fallback starch when no named dish matched. */
const GENERIC_BASES: BaseRecipe[] = [
  { base: 'rice', emoji: '🍚', sides: ['🍗', '🍅'], garnish: '🌿' },
  { base: 'swallow', emoji: '🥣', sides: ['🍲', '🥬'], garnish: '🌿' },
  { base: 'greens', emoji: '🥗', sides: ['🍅', '🥬'], garnish: '🫒' },
  { base: 'oats', emoji: '🥣', sides: ['🍌', '🥛'], garnish: '🫐' }
];

/** Stew colour by what the soup is actually made from. */
const SAUCE_RULES: Array<{ match: RegExp; sauce: SauceRecipe }> = [
  { match: /\begusi\b|\bokra\b|\bspinach\b|\bvegetable\b|\b greens\b|\bkwalo\b/i, sauce: { from: '#3F7D20', to: '#6BAF2A', soupy: true } },
  { match: /\bpepper soup\b|\bpepper stew\b|\blight stew\b|\bbanga\b/i, sauce: { from: '#B23A1E', to: '#E0762F', soupy: true } },
  { match: /\bgroundnut\b|\bpeanut\b|\bsatay\b/i, sauce: { from: '#A9702F', to: '#D79A55' } },
  { match: /\btomato\b|\bjollof\b|\bstew\b|\bsoup\b|\bsauce\b|\bcurry\b/i, sauce: { from: '#A02C1C', to: '#D4622A', soupy: true } },
  { match: /\bbroth\b/i, sauce: { from: '#C8A96B', to: '#EBD4A3', soupy: true } },
  { match: /\bspinach\b/i, sauce: { from: '#2F6B1F', to: '#5C9E2A', soupy: true } }
];

const DEFAULT_SAUCE: SauceRecipe = { from: '#A8542A', to: '#D08B4A' };

/**
 * Build the plate for a dish.
 *
 * Match order is deliberate: named dishes win, then a named protein, then a
 * starch keyword, and only then a generic base. That keeps "Jollof Rice with
 * Grilled Chicken" showing rice and chicken instead of a bowl of nothing.
 */
export function getDishArt(meal: {
  title: string;
  proteinSourceType: string;
}): DishArt {
  const title = meal.title || '';
  const protein = PROTEIN_GLYPH[meal.proteinSourceType] || '🥣';
  const proteinWord = PROTEIN_WORD[meal.proteinSourceType] || 'food';

  const named = NAMED_DISHES.find((entry) => entry.match.test(title));
  const sauceRule = SAUCE_RULES.find((entry) => entry.match.test(title));
  const sauce = sauceRule?.sauce || DEFAULT_SAUCE;

  const base = named?.recipe ?? GENERIC_BASES[0];

  // A protein named in the title always beats the recipe's default side.
  let sides = [...base.sides];
  if (/\bfish\b|\bcatfish\b|\btilapia\b|\bherring\b|\bmackerel\b|\bsardine\b|\bsmoked titus\b/i.test(title)) {
    sides = ['🐟', '🍅', ...sides];
  } else if (/\bchicken\b|\bturkey\b|\bguinea fowl\b/i.test(title)) {
    sides = ['🍗', '🍌', ...sides];
  } else if (/\bbeef\b|\bsteak\b/i.test(title)) {
    sides = ['🥩', '🍅', ...sides];
  } else if (/\begg\b/i.test(title)) {
    sides = ['🥚', '🌶️', ...sides];
  }

  // The protein already sits in the middle of the plate, so never repeat it
  // as a side — a fish plate showed the same fish twice.
  sides = [...new Set(sides)].filter((glyph) => glyph !== protein);
  if (sides.length === 0) sides = ['🍅'];
  if (sides.length === 1) sides = [...sides, '🌿'];

  // Keep the garnish distinct too, so no glyph appears twice on one plate.
  const garnishCandidates = [base.garnish, '🌿', '🌶️', '🍋', '🫒'];
  const onPlate = new Set([protein, ...sides]);
  const garnish = garnishCandidates.find((glyph) => !onPlate.has(glyph)) || '✨';

  const baseAlt = named?.alt || `a plate of ${title.toLowerCase()}`;

  // Only mention the protein when the dish description has not already named
  // it, otherwise a screen reader hears "with chicken ... with chicken".
  const mentionsProtein = baseAlt.toLowerCase().includes(proteinWord);
  const alt = mentionsProtein ? baseAlt : `${baseAlt}, with ${proteinWord}`;

  return {
    base: base.base,
    protein,
    sides,
    sauceFrom: sauce.from,
    sauceTo: sauce.to,
    soupy: sauce.soupy ?? false,
    garnish,
    alt
  };
}