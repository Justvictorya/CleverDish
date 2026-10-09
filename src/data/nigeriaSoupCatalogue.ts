import type { MealBlueprint } from '../types';

/**
 * Nigerian soups, built as a catalogue rather than hand-written plates.
 *
 * An earlier version of this data treated "soup" as a dish type and filled it
 * with whatever went well next to rice. That produced plates like "Egg Roll
 * with Garden Egg Stew" and threw away the actual problem: a Nigerian meal is
 * built in two parts, a soup and the swallow you eat it with, and both halves
 * have to be named. The soups were missing, so they got invented.
 *
 * So each soup is defined once here by what actually goes in the pot, taken
 * from the sources in the module comment on SOUP_SOURCES, and then paired with
 * a protein and a swallow. The two are chosen per dish, not globally: the same
 * soup appears with different proteins across the rotation, because that is how
 * a real pot of soup is eaten, and because a user signing up as Nigerian should
 * meet afang, edikang ikong, egusi, ewedu and banga rather than one soup with
 * four relabelled fish.
 *
 * No soup here is labelled with the group it belongs to. The names are the
 * food's own, which is how they are sold and how they are recognised.
 */

/** [name, grams, naira, protein, carbs, fat, fiber, where it is bought] */
type Part = [string, number, number, number, number, number, number, string];

const PALM_OIL: Part = ['Palm Oil', 12, 150, 0, 0, 12, 0, 'Traditional Condiments'];
const CRAYFISH: Part = ['Ground Crayfish', 8, 320, 6, 0, 1, 0, 'Dried Fish Stall'];
const PERIWINKLE: Part = ['Periwinkle', 90, 900, 14, 2, 2, 0, 'Seafood Counter'];
const LOCUST_BEAN: Part = ['Locust Bean (Ogiri)', 10, 200, 3, 1, 0, 1, 'Traditional Condiments'];
const SMOKED_FISH: Part = ['Smoked Fish', 70, 700, 17, 0, 4, 0, 'Dried Fish Stall'];
const ONION_PEPPER: Part = ['Onion and Pepper', 20, 120, 1, 4, 0, 1, 'Vegetable Stalls'];
const STOCKFISH: Part = ['Stockfish', 60, 800, 16, 0, 2, 0, 'Dried Fish Stall'];
const SNAILS: Part = ['Giant Land Snail', 110, 1450, 23, 2, 8, 0, 'Seafood Counter'];

/** The swallow is not a garnish. It is half the meal, so it is always named. */
const SWALLOWS: Record<string, Part> = {
  'Pounded Yam': ['Pounded Yam', 200, 380, 3, 76, 0, 3, 'Yam Stall'],
  Eba: ['Eba (Cassava and Yam Swallow)', 180, 400, 3, 44, 0, 2, 'Grain Stall'],
  Fufu: ['Cassava and Plantain Fufu', 190, 520, 5, 46, 0, 2, 'Grain Stall'],
  Semo: ['Semo (Yam Flour Swallow)', 165, 380, 4, 39, 0, 1, 'Grain Stall'],
  Amala: ['Amala (Yam Flour Swallow)', 190, 430, 3, 46, 0, 2, 'Grain Stall'],
  Garri: ['Eba-Style Swallow with Okra', 170, 330, 3, 36, 1, 2, 'Grain Stall'],
  Kwacoco: ['Kwacoco (Cocoyam Pudding)', 190, 560, 2, 45, 0, 2, 'Market Stall'],
  Semovita: ['Semovita (Wheat Swallow)', 165, 450, 6, 36, 1, 2, 'Grain Stall'],
  Tuwo: ['Tuwo Masara (Millet Swallow)', 180, 340, 4, 58, 1, 3, 'Grain Stall'],
  'Swallow Rice': ['Swallow Rice', 200, 420, 5, 62, 2, 2, 'Rice Stall']
};

/**
 * Protein parts, kept separate from the soup so the pot is not defined by what
 * protein happens to be in it. Goat, mutton, snail, ponmo, gizzard and
 * grasscutter stay in beef_lean; that grouping is a limitation of the rotation,
 * not a claim about the animals.
 */
const PROTEINS: Record<string, Part> = {
  'Tilapia Fillet': ['Grilled Tilapia Fillet', 140, 1250, 27, 0, 6, 0, 'Fish Counter'],
  Catfish: ['Catfish Pepper Soup', 150, 1350, 24, 2, 7, 0, 'Fish Counter'],
  Prawns: ['Grilled Prawns', 130, 1900, 24, 1, 8, 0, 'Seafood Counter'],
  'Mackerel Whole': ['Braised Mackerel', 120, 1050, 21, 0, 8, 0, 'Fish Counter'],
  Chicken: ['Stewed Chicken', 130, 1450, 27, 0, 12, 0, 'Poultry Counter'],
  Turkey: ['Stewed Turkey', 130, 1500, 28, 0, 10, 0, 'Poultry Counter'],
  'Chicken Gizzard': ['Peppered Chicken Gizzard', 120, 1300, 24, 0, 8, 0, 'Poultry Counter'],
  'Boiled Egg': ['Boiled Egg', 60, 130, 6, 1, 5, 0, 'Market Stall'],
  'Bean Stew': ['Bean and Tomato Stew', 170, 620, 11, 24, 8, 9, 'Grain Stall'],
  'Cowpea Stew': ['Cowpea Leaf Stew', 170, 600, 12, 20, 9, 9, 'Vegetable Stalls'],
  'Goat Meat': ['Goat Meat Pepper Soup', 130, 1900, 30, 3, 15, 0, 'Mushroom Market'],
  Beef: ['Beef Pepper Soup', 130, 1750, 27, 2, 14, 0, 'Butcher Counter'],
  'Assorted Cow Parts': ['Assorted Cow Parts', 150, 2600, 32, 3, 20, 0, 'Butcher Counter'],
  Snail: ['Giant Land Snail Pepper Soup', 130, 1700, 27, 3, 10, 0, 'Seafood Counter'],
  'Cow Skin': ['Cow Skin in Pepper Stew', 120, 1150, 22, 1, 8, 0, 'Butcher Counter'],
  Ponmo: ['Ponmo Pepper Soup', 130, 1500, 26, 2, 9, 0, 'Butcher Counter'],
  'Shaki': ['Shaki (Cow Tripe)', 130, 1550, 25, 2, 10, 0, 'Butcher Counter']
};

type ProteinKey = MealBlueprint['proteinSourceType'];
type Slot = 'breakfasts' | 'afternoons' | 'evenings';

type Soup = {
  /** The name the food is sold under. Not a group label. */
  name: string;
  description: string;
  /** What actually goes in the pot, excluding the protein and the swallow. */
  pot: Part[];
  cookTimeMinutes: number;
};

const SOUP_SOURCES =
  'Ingredients taken from: AJOL/NJPPM review of traditional soups in Nigeria (a six-botanical survey); ' +
  'Piece Within Nigeria survey of twelve Nigerian soups with full methods; Google Arts and Culture, ' +
  'Pan-Atlantic University; Nsala/white soup method write-ups; and, for ogbono, the International Journal ' +
  'of Food Engineering and Technology characterization of Irvingia gabonensis soup alongside the dika ' +
  'kernel mix recipe in PMC and the Abubakar and Sopade formulation in Nigerian Food Journal.';

/** Build one dish from a soup, a protein and a swallow. Macros are summed. */
function build(
  soup: Soup,
  protein: string,
  swallow: string,
  steps: string[]
): MealBlueprint {
  const parts = [...soup.pot, PROTEINS[protein], SWALLOWS[swallow]];
  const round = (n: number) => Math.round(n);
  // A Part is a tuple, so parts[i] is a whole ingredient. Sum the field instead.
  const total = (field: number) => round(parts.reduce((a, p) => a + (Number(p[field]) || 0), 0));
  const proteinG = total(3);
  const carbs = total(4);
  const fat = total(5);
  const fiber = total(6);
  return {
    title: `${soup.name} with ${protein} and ${swallow}`,
    description: `${soup.description} Served over ${swallow.toLowerCase()}.`,
    visualType: 'stew_swallow',
    style: 'indigenous',
    proteinSourceType: (proteinBucket[protein] ?? 'beef_lean') as ProteinKey,
    calories: round((proteinG * 4 + carbs * 4 + fat * 9) * 0.92),
    protein: proteinG,
    carbs,
    fat,
    fiber,
    cookTimeMinutes: soup.cookTimeMinutes,
    readyToEatQuery: `${soup.name} with ${swallow}`,
    ingredients: parts.map(([name, gramWeight, baseNGNCost, p, c, f, fib, sourcingLocation]) => ({
      name,
      gramWeight,
      baseNGNCost,
      protein: p,
      carbs: c,
      fat: f,
      fiber: fib,
      sourcingLocation
    })),
    prepInstructions: steps
  };
}

/** Which rotation bucket each protein part belongs to. */
const proteinBucket: Record<string, ProteinKey> = {
  'Tilapia Fillet': 'fish',
  Catfish: 'fish',
  Prawns: 'fish',
  'Mackerel Whole': 'fish',
  Chicken: 'poultry',
  Turkey: 'poultry',
  'Chicken Gizzard': 'poultry',
  'Boiled Egg': 'eggs_dairy',
  'Bean Stew': 'legumes_plant',
  'Cowpea Stew': 'legumes_plant',
  'Goat Meat': 'beef_lean',
  Beef: 'beef_lean',
  'Assorted Cow Parts': 'beef_lean',
  Snail: 'beef_lean',
  'Cow Skin': 'beef_lean',
  Ponmo: 'beef_lean',
  Shaki: 'beef_lean'
};

const UGU_WATERLEAF: Part = ['Fluted Pumpkin Leaf and Waterleaf', 200, 480, 6, 9, 1, 6, 'Vegetable Stalls'];

/**
 * The catalogue. Each soup is stated once, then placed into the rotation with
 * the proteins and swallows that suit it.
 */
const SOUPS = {
  edikangIkong: {
    name: 'Edikang Ikong Soup',
    description:
      'Fluted pumpkin leaf and waterleaf cooked down until the leaves collapse and the palm oil turns the whole pot glossy, with periwinkle and crayfish through it.',
    pot: [UGU_WATERLEAF, PERIWINKLE, CRAYFISH, PALM_OIL, ONION_PEPPER],
    cookTimeMinutes: 60
  },
  afang: {
    name: 'Afang Soup',
    description:
      'Sliced afang leaf with waterleaf, cooked with palm oil, crayfish and periwinkle until the leaves go soft and dark.',
    pot: [['Sliced Afang Leaf and Waterleaf', 210, 620, 7, 10, 2, 7, 'Vegetable Stalls'], CRAYFISH, PERIWINKLE, PALM_OIL, ONION_PEPPER],
    cookTimeMinutes: 55
  },
  egusi: {
    name: 'Egusi Soup',
    description:
      'Ground melon seed stewed into a thick, nutty sauce with palm oil, fluted pumpkin leaf and dried prawns.',
    pot: [['Ground Melon Seed (Egusi)', 120, 780, 8, 12, 6, 4, 'Grain Stall'], UGU_WATERLEAF, ['Dried Prawns', 30, 900, 12, 1, 1, 0, 'Seafood Counter'], PALM_OIL, ONION_PEPPER],
    cookTimeMinutes: 60
  },
  ewedu: {
    name: 'Ewedu Soup',
    description:
      'Jute mallow leaves beaten until they turn slippery in the pot, finished with locust bean and a whole calabash of potash.',
    pot: [['Jute Mallow Leaves (Ewedu)', 200, 520, 5, 11, 2, 6, 'Vegetable Stalls'], LOCUST_BEAN, CRAYFISH, ['Potash', 3, 90, 0, 0, 0, 0, 'Traditional Condiments'], ONION_PEPPER],
    cookTimeMinutes: 40
  },
  banga: {
    name: 'Banga Soup',
    description:
      'Palm fruit boiled, pounded and strained into an orange-red gravy scented with scent leaf and dried fish, thickened a little with okra.',
    pot: [['Palm Fruit Extract', 190, 900, 3, 5, 22, 3, 'Palm Stall'], ['Scent Leaf and Okazi Spice', 12, 260, 1, 2, 1, 1, 'Traditional Condiments'], SMOKED_FISH, CRAYFISH, ONION_PEPPER],
    cookTimeMinutes: 75
  },
  efoRiro: {
    name: 'Efo Riro Soup',
    description:
      'An assortment of greens, celosia and amaranth cooked down with smoked fish and locust bean, the everyday leaf soup of the west.',
    pot: [['Assorted Efo Greens and Waterleaf', 210, 480, 6, 10, 1, 6, 'Vegetable Stalls'], SMOKED_FISH, LOCUST_BEAN, PALM_OIL, ONION_PEPPER],
    cookTimeMinutes: 50
  },
  gbegiri: {
    name: 'Gbegiri Soup',
    description:
      'Cowpea beans cooked down to a smooth brown bean stew, thickened with locust bean and finished with palm oil.',
    pot: [['Cooked Cowpea Beans (Gbegiri)', 230, 700, 15, 26, 6, 11, 'Grain Stall'], LOCUST_BEAN, PALM_OIL, ONION_PEPPER],
    cookTimeMinutes: 65
  },
  ofeOwerri: {
    name: 'Ofe Owerri Soup',
    description:
      'Assorted cow parts simmered with snail and dried fish, thickened with cocoyam and finished with uziza and pumpkin leaf. The most expensive soup in the country.',
    pot: [['Assorted Cow Parts', 140, 2700, 30, 3, 21, 0, 'Butcher Counter'], SNAILS, STOCKFISH, ['Cocoyam Thickener (Ede)', 60, 260, 2, 14, 0, 1, 'Market Stall'], ['Uziza and Pumpkin Leaf', 90, 320, 3, 5, 1, 3, 'Vegetable Stalls'], PALM_OIL],
    cookTimeMinutes: 120
  },
  nsala: {
    name: 'Nsala Soup',
    description:
      'White soup: catfish cooked with uziza seed, utazi and ogiri, thickened with pounded yam. Made without palm oil, which is why it is pale.',
    pot: [['Catfish in White Soup', 170, 1550, 27, 2, 7, 0, 'Fish Counter'], ['Pounded Yam Thickener', 90, 190, 2, 18, 0, 1, 'Yam Stall'], ['Uziza Seed and Utazi Leaf', 14, 240, 1, 2, 0, 1, 'Traditional Condiments'], LOCUST_BEAN, CRAYFISH],
    cookTimeMinutes: 70
  },
  fisherman: {
    name: 'Fisherman Soup',
    description:
      'A seafood pot of prawns, crab and assorted fish in a lightly thickened pepper broth, built for eating with your fingers.',
    pot: [['Assorted Seafood (Prawns, Crab, Fish)', 180, 2300, 34, 3, 12, 0, 'Seafood Counter'], PERIWINKLE, CRAYFISH, ONION_PEPPER],
    cookTimeMinutes: 55
  },
  efoShoko: {
    name: 'Efo Shoko Soup',
    description:
      'Spinach and tomato cooked down with smoked fish and palm oil into a soft, dark green stew.',
    pot: [['Spinach and Tomato', 210, 460, 6, 12, 2, 7, 'Vegetable Stalls'], SMOKED_FISH, PALM_OIL, LOCUST_BEAN],
    cookTimeMinutes: 45
  },
  ofeMmiri: {
    name: 'Waterleaf Soup',
    description:
      'Waterleaf cooked with assorted meat, palm oil and pepper until the pot turns glossy green.',
    pot: [['Waterleaf', 200, 420, 6, 9, 1, 6, 'Vegetable Stalls'], SMOKED_FISH, PALM_OIL, CRAYFISH, ONION_PEPPER],
    cookTimeMinutes: 50
  },
  ilaAlasepo: {
    name: 'Okoroenyeribe Soup',
    description:
      'Okra fruit cooked down with ground pepper and fish into a reddish, draw soup eaten with any swallow.',
    pot: [['Okra Fruit (Okoroenyeribe)', 200, 560, 5, 14, 2, 8, 'Vegetable Stalls'], SMOKED_FISH, CRAYFISH, PALM_OIL, ONION_PEPPER],
    cookTimeMinutes: 45
  },
  abacha: {
    name: 'Abacha',
    description:
      'Shredded cocoyam salad dressed with utazi, ogiri and pepper, served cold alongside hot fish.',
    pot: [['Shredded Cocoyam', 200, 620, 4, 30, 1, 4, 'Market Stall'], ['Utazi and Ogiri Dressing', 20, 260, 2, 4, 1, 2, 'Traditional Condiments'], ['Fried Fish (Abacha Style)', 130, 1250, 25, 1, 8, 0, 'Fish Counter']],
    cookTimeMinutes: 40
  },
  okazi: {
    name: 'Okazi Soup',
    description:
      'Finely sliced okazi leaf cooked with palm oil, snail and crayfish until tender.',
    pot: [['Sliced Okazi Leaf', 200, 560, 6, 10, 2, 6, 'Vegetable Stalls'], SMOKED_FISH, CRAYFISH, PALM_OIL],
    cookTimeMinutes: 45
  },
  // The catalogue was missing ogbono entirely, so it only appeared through a
  // single legacy fish plate that the sampler never reached. Ground dika kernel
  // is an oil seed and draws when it meets hot stock, which is the whole point of
  // the soup; the bitter leaf and okra behind it come from the same references as
  // the draw.
  ogbono: {
    name: 'Ogbono Soup',
    description:
      'Ground ogbono seed, the African wild mango, melted into palm oil until it draws, then simmered with bitter leaf, dried fish and crayfish.',
    pot: [
      // 45g of ground seed is a person's share of a family pot, which is how the
      // references above cook it — around 130g milled for a pot that feeds
      // several. A full 75g per plate, plus the swallow, put both ogbono plates
      // in the plan's top four, above nearly every other meal in the month.
      ['Ground Ogbono Seed (Dika Kernel)', 45, 570, 4, 7, 13, 2, 'Market Stall'],
      ['Bitter Leaf and Celosia', 120, 340, 4, 7, 1, 5, 'Vegetable Stalls'],
      ['Chopped Okra', 60, 160, 2, 4, 0, 2, 'Vegetable Stalls'],
      SMOKED_FISH,
      CRAYFISH,
      PALM_OIL,
      LOCUST_BEAN,
      ONION_PEPPER
    ],
    cookTimeMinutes: 55
  }
} satisfies Record<string, Soup>;

/**
 * Placement. Each entry is [soup, protein, swallow, slot]. Explicit rather than
 * generated so no two dishes collapse to the same title, which is how the
 * catalogue ended up with one soup wearing three names before.
 */
type Placement = [keyof typeof SOUPS, string, string, Slot];

const PLACEMENTS: Placement[] = [
  // Edikang ikong, which the catalogue was missing entirely.
  ['edikangIkong', 'Assorted Cow Parts', 'Pounded Yam', 'afternoons'],
  ['edikangIkong', 'Chicken', 'Eba', 'evenings'],
  ['edikangIkong', 'Prawns', 'Semo', 'afternoons'],
  ['edikangIkong', 'Goat Meat', 'Fufu', 'evenings'],
  ['edikangIkong', 'Tilapia Fillet', 'Kwacoco', 'afternoons'],
  ['edikangIkong', 'Turkey', 'Amala', 'evenings'],

  // Afang beyond the single chicken version that existed.
  ['afang', 'Assorted Cow Parts', 'Pounded Yam', 'evenings'],
  ['afang', 'Prawns', 'Eba', 'afternoons'],
  ['afang', 'Goat Meat', 'Fufu', 'evenings'],
  ['afang', 'Tilapia Fillet', 'Kwacoco', 'afternoons'],
  ['afang', 'Turkey', 'Semo', 'evenings'],
  ['afang', 'Catfish', 'Amala', 'afternoons'],

  // Egusi, absent by name even though melon seed soup is common.
  ['egusi', 'Goat Meat', 'Amala', 'afternoons'],
  ['egusi', 'Chicken', 'Pounded Yam', 'evenings'],
  ['egusi', 'Shaki', 'Eba', 'evenings'],
  ['egusi', 'Prawns', 'Semo', 'afternoons'],
  ['egusi', 'Beef', 'Fufu', 'evenings'],

  // Ewedu, eaten with amala more than anything else.
  ['ewedu', 'Goat Meat', 'Amala', 'afternoons'],
  ['ewedu', 'Chicken', 'Amala', 'evenings'],
  ['ewedu', 'Cow Skin', 'Amala', 'afternoons'],
  ['ewedu', 'Turkey', 'Amala', 'evenings'],
  ['ewedu', 'Snail', 'Amala', 'afternoons'],

  // Banga, eaten with cocoyam pudding.
  ['banga', 'Catfish', 'Kwacoco', 'afternoons'],
  ['banga', 'Goat Meat', 'Eba', 'evenings'],
  ['banga', 'Chicken', 'Fufu', 'evenings'],
  ['banga', 'Assorted Cow Parts', 'Pounded Yam', 'evenings'],

  ['efoRiro', 'Chicken', 'Fufu', 'evenings'],
  ['efoRiro', 'Goat Meat', 'Amala', 'afternoons'],
  ['efoRiro', 'Tilapia Fillet', 'Eba', 'afternoons'],

  ['gbegiri', 'Goat Meat', 'Amala', 'afternoons'],
  ['gbegiri', 'Chicken', 'Eba', 'evenings'],
  ['gbegiri', 'Prawns', 'Pounded Yam', 'evenings'],
  ['gbegiri', 'Cow Skin', 'Fufu', 'evenings'],

  ['ofeOwerri', 'Assorted Cow Parts', 'Fufu', 'evenings'],
  ['ofeOwerri', 'Snail', 'Eba', 'afternoons'],
  ['ofeOwerri', 'Ponmo', 'Pounded Yam', 'afternoons'],

  ['nsala', 'Catfish', 'Pounded Yam', 'afternoons'],
  ['nsala', 'Mackerel Whole', 'Eba', 'afternoons'],
  ['nsala', 'Goat Meat', 'Semovita', 'evenings'],
  ['nsala', 'Chicken', 'Amala', 'evenings'],

  ['fisherman', 'Prawns', 'Eba', 'afternoons'],
  ['fisherman', 'Catfish', 'Pounded Yam', 'afternoons'],
  ['fisherman', 'Mackerel Whole', 'Fufu', 'evenings'],

  ['efoShoko', 'Chicken', 'Fufu', 'evenings'],
  ['efoShoko', 'Goat Meat', 'Amala', 'afternoons'],

  ['ofeMmiri', 'Chicken', 'Eba', 'evenings'],
  ['ofeMmiri', 'Tilapia Fillet', 'Amala', 'afternoons'],
  ['ofeMmiri', 'Assorted Cow Parts', 'Pounded Yam', 'evenings'],

  ['ilaAlasepo', 'Tilapia Fillet', 'Eba', 'afternoons'],
  ['ilaAlasepo', 'Goat Meat', 'Pounded Yam', 'evenings'],
  ['ilaAlasepo', 'Catfish', 'Amala', 'afternoons'],

  ['abacha', 'Catfish', 'Eba', 'afternoons'],
  ['abacha', 'Mackerel Whole', 'Pounded Yam', 'afternoons'],
  ['abacha', 'Chicken', 'Fufu', 'evenings'],

  ['okazi', 'Goat Meat', 'Fufu', 'evenings'],
  ['okazi', 'Snail', 'Pounded Yam', 'afternoons'],
  ['okazi', 'Chicken', 'Eba', 'evenings'],

  // Second wave. The first wave piled almost every soup into beef_lean and
  // fish, which were already the fullest buckets, so the rotation drew them
  // rarely and a plan showed nineteen soups when the catalogue held sixty-four
  // dishes. These placements push soups into the thin buckets instead of adding
  // more of the same, which is also true to how lunch and dinner are actually
  // eaten: any soup, with whatever protein is in the pot.
  ['edikangIkong', 'Chicken Gizzard', 'Amala', 'afternoons'],
  ['edikangIkong', 'Mackerel Whole', 'Semovita', 'afternoons'],
  ['edikangIkong', 'Turkey', 'Semo', 'afternoons'],

  ['afang', 'Chicken Gizzard', 'Amala', 'afternoons'],
  ['afang', 'Mackerel Whole', 'Semovita', 'afternoons'],

  ['egusi', 'Turkey', 'Semovita', 'afternoons'],
  ['egusi', 'Chicken Gizzard', 'Pounded Yam', 'afternoons'],
  ['egusi', 'Mackerel Whole', 'Amala', 'afternoons'],

  ['ewedu', 'Turkey', 'Semovita', 'afternoons'],
  ['ewedu', 'Chicken Gizzard', 'Pounded Yam', 'afternoons'],
  ['ewedu', 'Mackerel Whole', 'Semovita', 'afternoons'],

  ['efoRiro', 'Turkey', 'Semovita', 'afternoons'],
  ['efoRiro', 'Chicken Gizzard', 'Amala', 'afternoons'],

  ['gbegiri', 'Turkey', 'Pounded Yam', 'afternoons'],
  ['gbegiri', 'Chicken Gizzard', 'Semovita', 'afternoons'],
  ['gbegiri', 'Mackerel Whole', 'Amala', 'afternoons'],

  ['banga', 'Turkey', 'Amala', 'afternoons'],
  ['banga', 'Chicken Gizzard', 'Kwacoco', 'afternoons'],
  ['banga', 'Mackerel Whole', 'Semo', 'afternoons'],

  ['efoShoko', 'Turkey', 'Semovita', 'afternoons'],
  ['efoShoko', 'Chicken Gizzard', 'Amala', 'afternoons'],

  ['ofeMmiri', 'Turkey', 'Semovita', 'afternoons'],
  ['ofeMmiri', 'Chicken Gizzard', 'Pounded Yam', 'afternoons'],

  ['ofeOwerri', 'Turkey', 'Eba', 'afternoons'],
  ['ofeOwerri', 'Chicken Gizzard', 'Fufu', 'afternoons'],

  ['nsala', 'Chicken Gizzard', 'Eba', 'afternoons'],
  ['nsala', 'Mackerel Whole', 'Semovita', 'afternoons'],

  ['fisherman', 'Chicken Gizzard', 'Amala', 'afternoons'],

  ['okazi', 'Turkey', 'Semovita', 'afternoons'],
  ['okazi', 'Chicken Gizzard', 'Amala', 'afternoons'],

  ['ilaAlasepo', 'Mackerel Whole', 'Semovita', 'afternoons'],
  ['ilaAlasepo', 'Chicken Gizzard', 'Amala', 'afternoons'],

  ['abacha', 'Chicken Gizzard', 'Semovita', 'afternoons'],

  // Fish and legume buckets in the evening slot were also short.
  ['afang', 'Tilapia Fillet', 'Amala', 'evenings'],
  ['afang', 'Mackerel Whole', 'Semo', 'evenings'],
  ['edikangIkong', 'Catfish', 'Garri', 'evenings'],
  ['edikangIkong', 'Tilapia Fillet', 'Amala', 'evenings'],
  ['egusi', 'Tilapia Fillet', 'Amala', 'evenings'],
  ['egusi', 'Prawns', 'Eba', 'evenings'],
  ['ewedu', 'Tilapia Fillet', 'Amala', 'evenings'],
  ['ewedu', 'Mackerel Whole', 'Amala', 'evenings'],
  ['efoRiro', 'Tilapia Fillet', 'Semovita', 'evenings'],
  ['efoShoko', 'Catfish', 'Eba', 'evenings'],
  ['ofeMmiri', 'Prawns', 'Semovita', 'evenings'],
  ['okazi', 'Catfish', 'Amala', 'evenings'],
  ['gbegiri', 'Catfish', 'Semovita', 'evenings'],
  ['gbegiri', 'Cowpea Stew', 'Amala', 'evenings'],
  ['gbegiri', 'Bean Stew', 'Eba', 'evenings'],
  ['efoRiro', 'Bean Stew', 'Fufu', 'evenings'],
  ['efoShoko', 'Bean Stew', 'Amala', 'evenings'],
  ['ofeMmiri', 'Cowpea Stew', 'Semovita', 'evenings'],
  ['okazi', 'Bean Stew', 'Pounded Yam', 'evenings'],
  ['gbegiri', 'Cowpea Stew', 'Fufu', 'afternoons'],

  // Ogbono, spread across four proteins rather than left in the fish bucket
  // alone. A soup sitting in one bucket meets it only on the days that protein
  // comes round, which is how the one legacy ogbono plate went unserved.
  ['ogbono', 'Beef', 'Eba', 'evenings'],
  ['ogbono', 'Chicken', 'Pounded Yam', 'evenings'],
  ['ogbono', 'Catfish', 'Fufu', 'evenings'],
  ['ogbono', 'Turkey', 'Garri', 'evenings'],
  ['ogbono', 'Goat Meat', 'Amala', 'afternoons'],
  ['ogbono', 'Mackerel Whole', 'Semo', 'afternoons'],

  // Three soups had a single evening plate each, and one plate in one protein
  // bucket is enough for a later addition to shove it out of reach: adding the
  // ogbono plates lengthened the beef bucket and pushed okoroenyeribe past the
  // index the plan ever visits. A second evening place in a different bucket
  // means losing one does not lose the soup.
  ['ilaAlasepo', 'Chicken', 'Eba', 'evenings'],
  ['fisherman', 'Prawns', 'Semo', 'evenings'],
  ['abacha', 'Tilapia Fillet', 'Garri', 'evenings'],

  // ...and a place in the afternoon slot, whose first draw of the month is
  // always index zero. A soup in that slot is met on day one rather than
  // waiting for a stride to land on it: Okoroenyeribe sat in the poultry and
  // beef evenings and served nothing until it had an afternoon door too.
  ['ilaAlasepo', 'Cowpea Stew', 'Amala', 'afternoons']
];

const PREP: Record<string, string[]> = {
  edikangIkong: [
    'Blitz the fluted pumpkin leaf and waterleaf, keeping a little back to add whole at the end.',
    'Cook the meat with onion, pepper and seasoning until tender, then add palm oil and crayfish.',
    'Stir in the blended leaves and let the palm oil do the cooking. The oil is the liquid, so add no water.',
    'Fold in the periwinkle and the reserved whole leaves, season, and turn off the heat.'
  ],
  afang: [
    'Slice the afang leaf thinly and rinse well.',
    'Cook the meat with onion and seasoning, then add palm oil, crayfish and the dried fish.',
    'Add the sliced leaf and waterleaf and cook hard for about five minutes so the leaves soften.',
    'Season, stir through the periwinkle, and serve with the swallow.'
  ],
  egusi: [
    'Blend the ground melon seed to a smooth paste.',
    'Fry the paste in palm oil until it thickens and the raw smell goes.',
    'Add stock, pepper and the dried prawns and simmer until the sauce coats a spoon.',
    'Stir in the pumpkin leaf at the end and serve with the swallow.'
  ],
  ewedu: [
    'Pluck the jute leaves from the stalk and chop them.',
    'Boil a little water, drop the leaves in and cook until tender.',
    'Blend the boiled leaves smooth, then return them to the pot.',
    'Season with locust bean, crayfish and potash, cook briefly, and serve with the swallow.'
  ],
  banga: [
    'Boil the palm fruit until soft, pound it and strain it to get the orange-red extract.',
    'Return the extract to the pot and reduce it with the scent leaf, onion and pepper.',
    'Add the smoked fish and crayfish and simmer until the gravy thickens.',
    'Stir in a little okra if you want it to draw, then serve with the swallow.'
  ],
  efoRiro: [
    'Chop and wash the assorted greens until the water runs clear.',
    'Cook the smoked fish with onion, pepper and seasoning, then add palm oil.',
    'Add the greens in batches and cook down until soft and glossy.',
    'Finish with locust bean and season, then serve with the swallow.'
  ],
  gbegiri: [
    'Cook the cowpeas until they break down completely.',
    'Blend some of the beans to thicken the stew, then return to the pot.',
    'Add locust bean, onion and pepper and cook until the stew is smooth.',
    'Finish with palm oil and serve with the swallow.'
  ],
  ofeOwerri: [
    'Simmer the assorted cow parts until completely tender. This takes the longest of any soup here.',
    'Grind the cocoyam into a paste and stir it into the stock.',
    'Add the dried fish, crayfish and snail.',
    'Finish with uziza, pumpkin leaf and palm oil, and serve with the swallow.'
  ],
  nsala: [
    'Cook the fish in water with onion, pepper and seasoning until it flakes.',
    'Add crayfish, ogiri and the ground uziza seed.',
    'Stir the pounded yam in a little at a time until the soup turns pale and thick.',
    'Add a single utazi leaf for a faint bitterness, season, and serve with the swallow.'
  ],
  fisherman: [
    'Cook the assorted seafood with onion, pepper and seasoning in a shallow broth.',
    'Add crayfish and periwinkle and simmer gently so the seafood does not toughen.',
    'Skim, season and ladle into a bowl.',
    'Serve hot with the swallow and eat with your hands.'
  ],
  efoShoko: [
    'Cook the spinach with tomato and a little water until it collapses.',
    'Fry the smoked fish with onion and pepper, then add the spinach.',
    'Stir in palm oil and locust bean and cook until the stew is thick and dark green.',
    'Season and serve with the swallow.'
  ],
  ofeMmiri: [
    'Wash and chop the waterleaf.',
    'Cook the smoked fish and crayfish with onion and pepper.',
    'Add palm oil, then the waterleaf, and cook until the leaves go soft.',
    'Season and serve with the swallow.'
  ],
  ilaAlasepo: [
    'Slice the okra fruit and cook it with ground pepper and onion.',
    'Add the smoked fish and crayfish and simmer until the okra breaks down.',
    'Stir in palm oil and let the pot reduce until it draws.',
    'Season and serve with the swallow.'
  ],
  abacha: [
    'Shred the cocoyam and soak it in cold water to wash out the starch.',
    'Mix with sliced utazi and a dressing of ogiri, uda and pepper.',
    'Leave to sit while you fry the fish.',
    'Serve the abacha cold beside the hot fish with the swallow.'
  ],
  okazi: [
    'Slice the okazi leaf as thinly as you can and rinse it well.',
    'Cook the smoked fish and crayfish with onion and pepper.',
    'Add palm oil and let the leaves soften in the oil.',
    'Season and serve with the swallow.'
  ],
  ogbono: [
    'Mill the dried ogbono seed fine and mix it with the ground crayfish.',
    'Fry the ground ogbono in palm oil over low heat until it smells toasted and runs smooth, not burned.',
    'Add hot stock a little at a time, stirring until the soup draws and pulls on the spoon.',
    'Drop in the dried fish and locust bean, season, and fold the okra and bitter leaf through at the end.'
  ]
};

type Buckets = Record<Slot, Record<ProteinKey, MealBlueprint[]>>;

const blank = (): Buckets => ({
  breakfasts: { fish: [], poultry: [], eggs_dairy: [], legumes_plant: [], beef_lean: [] },
  afternoons: { fish: [], poultry: [], eggs_dairy: [], legumes_plant: [], beef_lean: [] },
  evenings: { fish: [], poultry: [], eggs_dairy: [], legumes_plant: [], beef_lean: [] }
});

const built: Buckets = blank();
const seen = new Set<string>();

for (const [soupKey, protein, swallow, slot] of PLACEMENTS) {
  const soup = SOUPS[soupKey];
  const dish = build(soup, protein, swallow, PREP[soupKey]);
  if (seen.has(dish.title)) {
    throw new Error(`Nigerian soup catalogue produced a duplicate title: ${dish.title}`);
  }
  seen.add(dish.title);
  built[slot][dish.proteinSourceType].push(dish);
}

/**
 * Spread the soups within each bucket before handing it to the rotation.
 *
 * Placements are written soup by soup, so a bucket received them soup by soup:
 * six ogbono plates, then six afang, then whatever was added last. A bucket is
 * drawn about six times in a month, so a soup written at the end of one was
 * never reached at all — Abacha and Ogbono held five and six placements between
 * them and served nothing, and okoroenyeribe went missing the moment a later
 * addition lengthened its bucket.
 *
 * Interleaving means the six draws a bucket gets are six different soups.
 */
const soupTypeOf = (title: string): string =>
  Object.values(SOUPS).find((soup) => title.startsWith(soup.name))?.name ?? title;

const interleaveTypes = (dishes: MealBlueprint[], startAt: number): MealBlueprint[] => {
  const groups = new Map<string, MealBlueprint[]>();
  for (const dish of dishes) {
    const type = soupTypeOf(dish.title);
    const group = groups.get(type);
    if (group) group.push(dish);
    else groups.set(type, [dish]);
  }
  // Rotate which type leads. Without this the type written first in PLACEMENTS
  // leads every bucket it belongs to and the one written last trails all of
  // them, and a soup can carry five placements and still sit past the sixth
  // index a bucket ever draws. Leading different buckets means every type
  // arrives in the front of something.
  const queues = [...groups.values()];
  const rotation = ((startAt % queues.length) + queues.length) % queues.length;
  const ordered = queues.slice(rotation).concat(queues.slice(0, rotation));
  const out: MealBlueprint[] = [];
  while (ordered.some((q) => q.length > 0)) {
    for (const queue of ordered) if (queue.length > 0) out.push(queue.shift()!);
  }
  return out;
};

let bucketNumber = 0;
for (const slot of Object.keys(built) as Slot[]) {
  for (const protein of Object.keys(built[slot]) as ProteinKey[]) {
    built[slot][protein] = interleaveTypes(built[slot][protein], bucketNumber);
    bucketNumber += 1;
  }
}

/** The soup catalogue, already split by slot and rotation bucket. */
export const NIGERIA_SOUP_CATALOGUE: Buckets = built;

export const NIGERIA_SOUP_CATALOGUE_SIZE = seen.size;
