/**
 * Extra Ghanaian dishes for the breakfast and main pools, plus replacements for
 * plates that turned out not to be Ghanaian.
 *
 * What was wrong before. The Ghana pools held chicken katsu (Japanese), beef
 * sandwiches, coleslaw (American), avocado and grilled cheese, and "Suya Beef
 * Rolls" — suya is Nigerian, not Ghanaian. "Akara" was also Nigerian: Ghana's
 * bean fritter is koose, made from peeled cowpeas, where akara is made from
 * unpeeled ones. One dish was titled "Tomto Stew". None of that came from a
 * Ghanaian source; it was written from memory, which is how the Nigerian batch
 * ended up with sushi.
 *
 * Naming rule, agreed with the product owner: every title is plain English for
 * what is in the bowl. No ethnic or regional badges ("Ga", "Ewe", "Akan",
 * "Fanti", "Northern Ghana"), no "traditional/native/authentic" posturing, and no
 * claims about which community a dish belongs to. Those claims are contestable
 * and add nothing to a meal plan. Local food names are kept where they are
 * simply the name of the dish rather than a claim of ownership: banku, fufu,
 * waakye, kenkey, kelewele, kontomire, koose, red-red, tubaani, tuo zaafi,
 * shito, dawadawa. Tests enforce the rule.
 *
 * Ingredients, methods and names were checked against Ghanaian food sources
 * rather than written from memory: the University for Development Studies
 * recipe collection for the northern dishes, and Ghanaian cuisine references for
 * the soups and staples.
 *
 * Costs are on the same Naira reference basis as every other non-Nigerian pool;
 * rotationPlans converts them with the country price index.
 */
import type { MealBlueprint } from '../types';

type Part = [
  name: string,
  gramWeight: number,
  cost: number,
  protein: number,
  carbs: number,
  fat: number,
  fiber: number,
  sourcingLocation: string
];

type Spec = {
  title: string;
  description: string;
  visualType: MealBlueprint['visualType'];
  proteinSourceType: MealBlueprint['proteinSourceType'];
  cookTimeMinutes: number;
  readyToEatQuery: string;
  parts: Part[];
};

/**
 * Methods for each component, so every dish gets real instructions instead of
 * filler. Matched against the ingredient names a dish actually contains, and
 * ordered longest-cooking first, because the soup has to be ready before the
 * fufu is pounded.
 */
const METHODS: Array<[RegExp, string]> = [
  [/Light Soup/, 'Simmer the tomato, pepper and ginger in stock until the broth tastes clean and lightly spiced.'],
  [/Palm Nut/, 'Boil and pound the palm fruit, then simmer it with tomato, pepper and the meat until the oil rises and the soup turns deep red.'],
  [/Groundnut/, 'Blend the groundnuts to a paste, loosen with water, and simmer with tomato, onion and ginger until the oil separates on top.'],
  [/Kontomire/, 'Chop the cocoyam leaves and pound them with ground melon seeds, then cook with palm oil, tomato and smoked fish until the leaves go silky.'],
  [/Bra Leaves|Jute Mallow|Ayoyo/, 'Wash and chop the leaves, then cook them down with tomato, pepper and fish until they are soft and slippery.'],
  [/Okro(?!.*Stew with Smoked Fish and Rice$)|Okro Soup|Okro Stew/, 'Slice the okra and cook it with tomato, onion and pepper until it draws and turns thick.'],
  [/Garden Egg/, 'Slice and lightly fry the garden eggs, then stew them with tomato, onion and pepper until completely soft.'],
  [/Cow Skin/, 'Boil the cow skin until it is soft and gelatinous, then cook it through in a hot pepper broth.'],
  [/Ok( |r|ra)|Groundnut|Kontomire|Garden Egg|Red Red|Bra Leaves|Jute Mallow/, 'Cook the stew base until the liquid has reduced and coats a spoon.'],
  [/Smoked (Fish|Herring|Titus|Fish)/, 'Soak the smoked fish, strip the bones and pound it to flakes.'],
  [/Egg Tomato Stew|Egg Stew/, 'Fry onion and tomato, add the beaten eggs and stew gently until just set.'],
  [/Omelette/, 'Beat the eggs, pour into a hot oiled pan and fold them over once the underside sets.'],
  [/Fried Egg/, 'Fry the egg in a little oil until the white sets and the edge browns.'],
  [/Boiled Egg/, 'Hard boil the egg for nine minutes, then cool it in cold water and peel it.'],
  [/Khebab/, 'Cube the beef, marinate it in onion and spice, then grill over charcoal, turning often so the inside cooks through.'],
  [/Grilled Chicken|Grilled Beef/, 'Charcoal grill the meat over steady heat, turning and basting with the marinade until the juices run clear.'],
  [/Grilled( Whole)? (Tilapia|Snapper)|Fried Whole Tilapia|Fried Mackerel|Smoked Sardines/, 'Grill or fry the fish over charcoal until the skin crisps and the flesh lifts from the bone.'],
  [/Khebab|Goat|Lamb|Beef/, 'Brown the meat in hot oil, then simmer it in the soup base until it is tender enough to cut.'],
  [/Fufu/, 'Boil the cassava and plantain until soft, then pound them together until smooth and elastic.'],
  [/Banku/, 'Mix the fermented corn and cassava dough with warm water, then stir it over heat until it thickens to a smooth, pliable ball.'],
  [/Waakye/, 'Soak and rinse the rice and cowpeas, then cook them with dried sorghum leaves until the grains take on a reddish brown colour and begin to stick together.'],
  [/Jollof/, 'Fry onion in oil, add blended tomato, pepper and stock and simmer to a thick base, then cook the rice in it until the grains separate.'],
  [/Tuo Zaafi|Tubaani/, 'Wrap the dough in a leaf and steam until firm, then slice and serve.'],
  [/Tubaani/, 'Blend the cowpeas with ginger and pepper, spread in a lined pan and steam until firm.'],
  [/Koose/, 'Soak, peel and blend the cowpeas with onion and pepper, then fry spoonfuls until crisp and golden.'],
  [/Kenkey/, 'Wrap the fermented maize dough in a corn husk and steam until firm, then fry it until golden.'],
  [/Koko Rice/, 'Stir the fermented corn flour in a pan with fish and water until it thickens to a smooth porridge.'],
  [/Spiced Millet Porridge/, 'Stir the flour into water with ginger and cook, whisking, until smooth and creamy.'],
  [/Gari/, 'Toast the gari granules in a dry pan, then stir in hot water a little at a time until they soften.'],
  [/Boiled Rice/, 'Wash and boil the rice in salted water until tender, then drain well.'],
  [/Yam/, 'Slice the yam and boil it in salted water until a knife slides through with no resistance.'],
  [/Kelewele|Spiced Fried Plantain/, 'Slice the ripe plantain, fry it through, then fry it a second time with ginger and pepper until it caramelises and crisps.'],
  [/Red Red/, 'Cook the black-eyed peas with tomato, onion and palm oil until the stew is thick and deep red.'],
  [/Pepper Sauce|Pepper and Tomato Sauce|Pepper and Onion/, 'Blend the pepper with tomato and onion and season with salt.'],
  [/Pepper Sauce$/, 'Blend the pepper with tomato and onion and season with salt.'],
  [/Shito/, 'Stir a spoonful of ground shito through the sauce to taste.'],
  [/Ginger and Pepper|Pepper and Ginger/, 'Grate the ginger and crush the pepper with a little salt.'],
  [/Rice and Pepper Sauce|Pepper Sauce/, 'Blend the pepper with tomato and onion and season with salt.'],
  [/Pepper$/, 'Crush the fresh pepper with a little salt.'],
  [/Ginger and Sugar/, 'Grate the ginger and stir it into the porridge with the sugar.'],
  [/Tomato, Onion and Shito/, 'Chop the tomato and onion and fry them in oil with the shito.'],
  [/Tomato and Onion/, 'Chop the tomato and onion and fry them in oil until soft.'],
  [/Onion/, 'Slice the onion thin and salt it.'],
  [/Kpakpo/, 'Crush the fresh green pepper.'],
  [/Raw Onion/, 'Slice the onion thin and salt it.'],
  [/Boiled Plantain/, 'Slice the ripe plantain and fry it until golden.'],
  [/Waakye/, 'Soak and rinse the rice and cowpeas, then cook them with dried sorghum leaves until the grains take on a reddish brown colour.'],
  [/Rice/, 'Wash the rice and boil it in salted water until tender.'],
  [/Tomato/, 'Chop and stew the tomato with onion.'],
  [/Pepper/, 'Crush the pepper with salt.'],
  [/(Beans|Cowpea)/, 'Cook the cowpeas until tender.'],
  [/Egg/, 'Beat the egg with salt.'],
  [/Rice and/, 'Combine and serve.']
];

function stepsFor(spec: Spec): string[] {
  const names = spec.parts.map((part) => part[0]);
  const steps: string[] = [];
  for (const name of names) {
    for (const [pattern, method] of METHODS) {
      if (pattern.test(name) && !steps.includes(method)) {
        steps.push(method);
        break;
      }
    }
  }
  const soup = spec.parts.find((part) => /Soup|Stew/.test(part[0]));
  const staple = spec.parts.find((part) =>
    /Fufu|Banku|Waakye|Jollof|Rice$|Rice,|Yam|Gari|Kenkey|Koko/.test(part[0])
  );
  if (soup && staple && !steps.some((s) => s.startsWith('Serve'))) {
    steps.push(`Serve the ${soup[0].toLowerCase()} with the ${staple[0].toLowerCase()}.`);
  }
  return steps.length ? steps : ['Combine the ingredients and serve.'];
}

/**
 * Build a blueprint with its macros summed from the ingredients. The previous
 * batches wrote protein/carbs/fat twice, once at the top level and once per
 * ingredient, and the two drifted apart. Deriving them makes that impossible.
 */
function dish(spec: Spec): MealBlueprint {
  const ingredients = spec.parts.map((part) => ({
    name: part[0],
    gramWeight: part[1],
    baseNGNCost: part[2],
    protein: part[3],
    carbs: part[4],
    fat: part[5],
    fiber: part[6],
    sourcingLocation: part[7]
  }));
  const sum = (pick: (p: (typeof ingredients)[number]) => number) =>
    ingredients.reduce((total, item) => total + pick(item), 0);
  const protein = sum((i) => i.protein);
  const carbs = sum((i) => i.carbs);
  const fat = sum((i) => i.fat);

  return {
    title: spec.title,
    description: spec.description,
    visualType: spec.visualType,
    style: 'indigenous',
    proteinSourceType: spec.proteinSourceType,
    calories: Math.round(protein * 4 + carbs * 4 + fat * 9),
    protein,
    carbs,
    fat,
    fiber: sum((i) => i.fiber),
    cookTimeMinutes: spec.cookTimeMinutes,
    readyToEatQuery: spec.readyToEatQuery,
    prepInstructions: stepsFor(spec),
    ingredients
  };
}

const FISH = 'Fish Counter';
const POULTRY = 'Poultry Counter';
const DAIRY = 'Dairy & Eggs';
const PRODUCE = 'Produce Aisle';
const STAPLE = 'Grain & Flour Stall';
const MARKET = 'Local Market';
const SPICE = 'Spice Stall';

export const GHANA_AUTHENTIC_POOLS: Record<'breakfasts' | 'mains', Record<MealBlueprint['proteinSourceType'], MealBlueprint[]>> = {
  breakfasts: {
    fish: [
      dish({
        title: 'Kenkey with Fried Herring and Pepper Sauce',
        description:
          'Fermented maize dough wrapped in a corn husk and steamed until firm, then fried, with a whole fried herring and a fiery ground pepper sauce.',
        visualType: 'grilled_fish',
        proteinSourceType: 'fish',
        cookTimeMinutes: 40,
        readyToEatQuery: 'Kenkey with Fried Herring and Pepper',
        parts: [
          ['Steamed and Fried Kenkey', 200, 500, 7, 46, 3, 3, STAPLE],
          ['Whole Fried Herring', 130, 1100, 28, 0, 9, 0, FISH],
          ['Ground Pepper Sauce', 80, 300, 2, 7, 4, 2, SPICE]
        ]
      }),
      dish({
        title: 'Waakye with Fried Mackerel and Boiled Egg',
        description:
          'Rice and cowpeas cooked together with dried sorghum leaves until they take on a reddish brown colour, with a fried mackerel and a hard boiled egg.',
        visualType: 'jollof_bowl',
        proteinSourceType: 'fish',
        cookTimeMinutes: 50,
        readyToEatQuery: 'Waakye with Fried Mackerel and Egg',
        parts: [
          ['Waakye Rice and Cowpeas', 260, 900, 14, 56, 4, 7, STAPLE],
          ['Fried Mackerel', 110, 950, 24, 0, 8, 0, FISH],
          ['Boiled Egg', 55, 180, 6, 1, 4, 0, DAIRY],
          ['Shito Pepper', 10, 150, 0, 1, 0, 1, SPICE]
        ]
      }),
      dish({
        title: 'Smoked Sardines with Okro Soup and Fufu',
        description:
          'Small smoked sardines eaten straight from the tin with a sliced okra soup thickened by fresh okra, over pounded cassava and plantain.',
        visualType: 'stew_swallow',
        proteinSourceType: 'fish',
        cookTimeMinutes: 45,
        readyToEatQuery: 'Smoked Sardines with Okro Soup and Fufu',
        parts: [
          ['Smoked Sardines', 120, 800, 26, 0, 6, 0, FISH],
          ['Okro Soup with Tomato and Fish', 220, 800, 9, 12, 6, 3, MARKET],
          ['Cassava and Plantain Fufu', 180, 500, 4, 42, 0, 2, STAPLE]
        ]
      }),
      dish({
        title: 'Kontomire Soup with Grilled Tilapia',
        description:
          'Cocoyam leaves cooked down with smoked fish, palm oil and ground melon seeds until the leaves are silky, served with grilled tilapia.',
        visualType: 'stew_swallow',
        proteinSourceType: 'fish',
        cookTimeMinutes: 60,
        readyToEatQuery: 'Kontomire Soup with Grilled Tilapia',
        parts: [
          ['Kontomire Stew with Smoked Fish', 230, 950, 11, 14, 12, 6, MARKET],
          ['Grilled Tilapia Fillet', 150, 1250, 29, 0, 6, 0, FISH],
          ['Boiled Rice', 150, 400, 4, 33, 0, 1, STAPLE]
        ]
      }),
      dish({
        title: 'Fried Tilapia with Banku and Pepper',
        description:
          'Tilapia fried until the skin is crisp, with banku and a pepper sauce whisked from shito, tomato and onion.',
        visualType: 'grilled_fish',
        proteinSourceType: 'fish',
        cookTimeMinutes: 35,
        readyToEatQuery: 'Fried Tilapia with Banku and Pepper',
        parts: [
          ['Fried Whole Tilapia', 170, 1400, 32, 0, 9, 0, FISH],
          ['Banku', 200, 400, 6, 44, 1, 2, STAPLE],
          ['Shito Pepper Sauce', 80, 280, 1, 6, 4, 2, SPICE]
        ]
      })
    ],
    poultry: [
      dish({
        title: 'Waakye with Grilled Chicken and Boiled Egg',
        description:
          'Waakye served with charcoal grilled chicken, a hard boiled egg and sliced ripe plantain.',
        visualType: 'beans_plantain',
        proteinSourceType: 'poultry',
        cookTimeMinutes: 45,
        readyToEatQuery: 'Waakye with Grilled Chicken and Egg',
        parts: [
          ['Waakye Rice and Cowpeas', 260, 900, 14, 56, 4, 7, STAPLE],
          ['Charcoal Grilled Chicken', 150, 1600, 32, 0, 9, 0, POULTRY],
          ['Boiled Egg', 55, 180, 6, 1, 4, 0, DAIRY],
          ['Fried Ripe Plantain', 70, 300, 1, 18, 1, 1, PRODUCE]
        ]
      }),
      dish({
        title: 'Koko Rice with Fried Chicken and Pepper',
        description:
          'Fermented corn porridge cooked thin with fish, topped with fried chicken and a hot pepper sauce.',
        visualType: 'oatmeal_parfait',
        proteinSourceType: 'poultry',
        cookTimeMinutes: 25,
        readyToEatQuery: 'Koko Rice with Fried Chicken',
        parts: [
          ['Koko Rice Fermented Corn Porridge', 260, 650, 11, 44, 5, 4, STAPLE],
          ['Fried Chicken', 140, 1500, 30, 2, 11, 0, POULTRY],
          ['Pepper Sauce', 70, 250, 1, 5, 3, 1, SPICE]
        ]
      }),
      dish({
        title: 'Fufu with Chicken Light Soup',
        description:
          'Pounded cassava and plantain with a clear, lightly spiced tomato and chicken soup, the standard bowl for a tired day.',
        visualType: 'stew_swallow',
        proteinSourceType: 'poultry',
        cookTimeMinutes: 60,
        readyToEatQuery: 'Fufu with Chicken Light Soup',
        parts: [
          ['Cassava and Plantain Fufu', 200, 550, 5, 47, 0, 2, STAPLE],
          ['Chicken Light Soup', 260, 1400, 28, 10, 9, 2, MARKET],
          ['Ginger and Pepper', 10, 100, 0, 1, 0, 0, SPICE]
        ]
      }),
      dish({
        title: 'Jollof with Grilled Chicken and Fried Plantain',
        description:
          'Rice cooked in a tomato, onion and pepper base, served with charcoal grilled chicken and fried ripe plantain.',
        visualType: 'jollof_bowl',
        proteinSourceType: 'poultry',
        cookTimeMinutes: 50,
        readyToEatQuery: 'Jollof Rice with Grilled Chicken and Plantain',
        parts: [
          ['Jollof Rice', 250, 900, 8, 56, 6, 2, STAPLE],
          ['Charcoal Grilled Chicken', 150, 1600, 32, 0, 9, 0, POULTRY],
          ['Fried Ripe Plantain', 70, 300, 1, 18, 1, 1, PRODUCE]
        ]
      })
    ],
    eggs_dairy: [
      dish({
        title: 'Koko Rice with Boiled Egg and Pepper',
        description:
          'Thin fermented corn porridge with fish, served with a boiled egg, a spoon of ground pepper and a slice of fried ripe plantain.',
        visualType: 'oatmeal_parfait',
        proteinSourceType: 'eggs_dairy',
        cookTimeMinutes: 20,
        readyToEatQuery: 'Koko Rice with Boiled Egg and Pepper',
        parts: [
          ['Koko Rice Fermented Corn Porridge', 260, 650, 11, 44, 5, 4, STAPLE],
          ['Boiled Egg', 110, 350, 13, 1, 9, 0, DAIRY],
          ['Pepper Sauce', 70, 250, 1, 5, 3, 1, SPICE],
          ['Fried Ripe Plantain', 60, 260, 1, 16, 1, 1, PRODUCE]
        ]
      }),
      dish({
        title: 'Yam Pottage with Egg and Shito',
        description:
          'Yam cooked down soft in oil with tomato, onion and pepper, with a boiled egg and shito stirred through.',
        visualType: 'stew_swallow',
        proteinSourceType: 'eggs_dairy',
        cookTimeMinutes: 35,
        readyToEatQuery: 'Yam Pottage with Egg and Shito',
        parts: [
          ['Yam Pottage', 280, 750, 7, 52, 8, 4, PRODUCE],
          ['Boiled Egg', 110, 350, 13, 1, 9, 0, DAIRY],
          ['Tomato, Onion and Shito', 80, 250, 2, 8, 3, 2, SPICE]
        ]
      }),
      dish({
        title: 'Jollof with Boiled Egg and Pepper',
        description:
          'Rice cooked in a tomato and pepper base with a boiled egg, sliced onion and ground pepper.',
        visualType: 'jollof_bowl',
        proteinSourceType: 'eggs_dairy',
        cookTimeMinutes: 40,
        readyToEatQuery: 'Jollof Rice with Boiled Egg and Pepper',
        parts: [
          ['Jollof Rice', 250, 900, 8, 56, 6, 2, STAPLE],
          ['Boiled Egg', 110, 350, 13, 1, 9, 0, DAIRY],
          ['Sliced Onion and Pepper', 80, 220, 1, 7, 2, 2, PRODUCE]
        ]
      }),
      dish({
        title: 'Fufu with Egg Stew and Boiled Egg',
        description:
          'Pounded cassava and plantain with eggs cooked in tomato and pepper, plus a boiled egg.',
        visualType: 'stew_swallow',
        proteinSourceType: 'eggs_dairy',
        cookTimeMinutes: 45,
        readyToEatQuery: 'Fufu with Egg Stew and Boiled Egg',
        parts: [
          ['Cassava and Plantain Fufu', 190, 550, 5, 45, 0, 2, STAPLE],
          ['Egg Tomato Stew', 180, 900, 18, 9, 12, 2, MARKET],
          ['Boiled Egg', 55, 180, 6, 1, 4, 0, DAIRY]
        ]
      })
    ],
    legumes_plant: [
      dish({
        title: 'Koose with Tomato Stew and Boiled Egg',
        description:
          'Cowpea fritters made from peeled beans and fried crisp, with tomato stew and a boiled egg.',
        visualType: 'beans_plantain',
        proteinSourceType: 'legumes_plant',
        cookTimeMinutes: 35,
        readyToEatQuery: 'Koose Bean Fritters with Tomato Stew',
        parts: [
          ['Koose Peeled Cowpea Fritters', 130, 500, 10, 16, 10, 5, MARKET],
          ['Tomato and Pepper Stew', 170, 700, 5, 18, 8, 4, MARKET],
          ['Boiled Egg', 55, 180, 6, 1, 4, 0, DAIRY]
        ]
      }),
      dish({
        title: 'Tubaani with Groundnut Soup',
        description:
          'Steamed cowpea pudding, a soft spiced bean cake traditionally wrapped in banana leaf, with a thick groundnut soup.',
        visualType: 'stew_swallow',
        proteinSourceType: 'legumes_plant',
        cookTimeMinutes: 60,
        readyToEatQuery: 'Tubaani Steamed Bean Pudding with Groundnut Soup',
        parts: [
          ['Tubaani Steamed Cowpea Pudding', 180, 550, 12, 24, 6, 6, MARKET],
          ['Groundnut Soup with Smoked Fish', 220, 900, 13, 14, 12, 4, MARKET]
        ]
      }),
      dish({
        title: 'Waakye with Cowpea Stew and Boiled Egg',
        description:
          'Waakye topped with a stew of cowpeas in tomato and palm oil, plus a boiled egg.',
        visualType: 'beans_plantain',
        proteinSourceType: 'legumes_plant',
        cookTimeMinutes: 45,
        readyToEatQuery: 'Waakye with Cowpea Stew and Egg',
        parts: [
          ['Waakye Rice and Cowpeas', 250, 900, 14, 55, 4, 7, STAPLE],
          ['Cowpea Tomato Stew', 160, 700, 11, 14, 7, 6, MARKET],
          ['Boiled Egg', 55, 180, 6, 1, 4, 0, DAIRY]
        ]
      }),
      dish({
        title: 'Koose with Spiced Millet Porridge',
        description:
          'Cowpea fritters with a spiced millet porridge sweetened with ginger.',
        visualType: 'oatmeal_parfait',
        proteinSourceType: 'legumes_plant',
        cookTimeMinutes: 30,
        readyToEatQuery: 'Koose with Spiced Millet Porridge',
        parts: [
          ['Koose Peeled Cowpea Fritters', 120, 470, 9, 15, 9, 5, MARKET],
          ['Spiced Millet Porridge', 250, 500, 7, 44, 4, 4, STAPLE],
          ['Ginger and Sugar', 15, 120, 0, 4, 0, 0, SPICE]
        ]
      }),
      dish({
        title: 'Groundnut Stew with Rice and Boiled Egg',
        description:
          'Groundnuts simmered with tomato, ginger and pepper into a thick stew, served with rice and a boiled egg.',
        visualType: 'stew_swallow',
        proteinSourceType: 'legumes_plant',
        cookTimeMinutes: 50,
        readyToEatQuery: 'Groundnut Stew with Rice and Boiled Egg',
        parts: [
          ['Groundnut Stew with Smoked Fish', 220, 900, 13, 15, 11, 4, MARKET],
          ['Boiled Rice', 160, 430, 4, 36, 0, 1, STAPLE],
          ['Boiled Egg', 55, 180, 6, 1, 4, 0, DAIRY]
        ]
      })
    ],
    beef_lean: [
      dish({
        title: 'Waakye with Grilled Beef and Fried Egg',
        description:
          'Waakye with slices of charcoal grilled beef and a fried egg.',
        visualType: 'jollof_bowl',
        proteinSourceType: 'beef_lean',
        cookTimeMinutes: 40,
        readyToEatQuery: 'Waakye with Grilled Beef and Egg',
        parts: [
          ['Waakye Rice and Cowpeas', 250, 900, 14, 55, 4, 7, STAPLE],
          ['Charcoal Grilled Beef', 130, 1700, 30, 0, 11, 0, MARKET],
          ['Fried Egg', 55, 180, 6, 0, 5, 0, DAIRY]
        ]
      }),
      dish({
        title: 'Grilled Beef Khebab with Rice and Onion',
        description:
          'Cubes of beef marinated in onion and spice, grilled over charcoal and served with rice, raw onion and a pepper sauce.',
        visualType: 'grilled_fish',
        proteinSourceType: 'beef_lean',
        cookTimeMinutes: 35,
        readyToEatQuery: 'Grilled Beef Khebab with Rice and Onion',
        parts: [
          ['Grilled Beef Khebab', 140, 1750, 31, 1, 12, 0, MARKET],
          ['Boiled Rice', 160, 430, 4, 36, 0, 1, STAPLE],
          ['Raw Onion and Pepper Sauce', 90, 280, 1, 8, 2, 2, PRODUCE]
        ]
      }),
      dish({
        title: 'Goat Light Soup with Fufu and Pepper',
        description:
          'Goat simmered in a clear tomato and pepper broth, served with pounded cassava and plantain.',
        visualType: 'stew_swallow',
        proteinSourceType: 'beef_lean',
        cookTimeMinutes: 75,
        readyToEatQuery: 'Goat Light Soup with Fufu and Pepper',
        parts: [
          ['Goat Light Soup', 250, 1900, 34, 9, 11, 2, MARKET],
          ['Cassava and Plantain Fufu', 190, 550, 5, 45, 0, 2, STAPLE],
          ['Pepper and Ginger', 10, 100, 0, 1, 0, 0, SPICE]
        ]
      }),
      dish({
        title: 'Beef Stew with Yam and Pepper Sauce',
        description:
          'Beef stewed down with tomato, onion and pepper until the sauce thickens, with boiled yam and a spoon of shito.',
        visualType: 'stew_swallow',
        proteinSourceType: 'beef_lean',
        cookTimeMinutes: 70,
        readyToEatQuery: 'Beef Stew with Yam and Pepper Sauce',
        parts: [
          ['Goat and Beef Tomato Stew', 230, 1800, 32, 11, 12, 3, MARKET],
          ['Boiled Yam', 200, 600, 4, 42, 0, 3, PRODUCE],
          ['Shito Pepper', 10, 150, 0, 1, 0, 1, SPICE]
        ]
      }),
      dish({
        title: 'Jollof with Goat Stew and Kelewele',
        description:
          'Rice cooked in a tomato and pepper base with chunks of goat stew, served with spiced fried ripe plantain.',
        visualType: 'jollof_bowl',
        proteinSourceType: 'beef_lean',
        cookTimeMinutes: 65,
        readyToEatQuery: 'Jollof Rice with Goat Stew and Kelewele',
        parts: [
          ['Jollof Rice', 240, 900, 8, 54, 6, 2, STAPLE],
          ['Goat Tomato Stew', 150, 1850, 30, 8, 11, 2, MARKET],
          ['Kelewele Spiced Fried Plantain', 80, 340, 1, 20, 2, 2, PRODUCE]
        ]
      }),
      dish({
        title: 'Grilled Beef with Banku and Pepper',
        description:
          'Charcoal grilled beef with banku and a blended pepper and tomato sauce.',
        visualType: 'beans_plantain',
        proteinSourceType: 'beef_lean',
        cookTimeMinutes: 35,
        readyToEatQuery: 'Grilled Beef with Banku and Pepper',
        parts: [
          ['Charcoal Grilled Beef', 140, 1700, 31, 0, 12, 0, MARKET],
          ['Banku', 200, 400, 6, 44, 1, 2, STAPLE],
          ['Pepper and Tomato Sauce', 80, 280, 1, 6, 4, 2, SPICE]
        ]
      })
    ]
  },
  mains: {
    fish: [
      dish({
        title: 'Mackerel in Okro Stew with Banku and Pepper',
        description:
          'Mackerel simmered in a sliced okra and tomato stew, served with banku and a hot pepper sauce.',
        visualType: 'stew_swallow',
        proteinSourceType: 'fish',
        cookTimeMinutes: 45,
        readyToEatQuery: 'Mackerel in Okro Stew with Banku',
        parts: [
          ['Mackerel in Okro Stew', 180, 1350, 32, 9, 9, 3, FISH],
          ['Banku', 190, 400, 6, 42, 1, 2, STAPLE],
          ['Pepper Sauce', 70, 250, 1, 5, 3, 1, SPICE]
        ]
      }),
      dish({
        title: 'Shrimp with Fried Tanganyika Sardine and Banku',
        description:
          'Cooked shrimp with a fried sardine, served with banku and pepper. Sardines are the everyday fish; the pairing stretches them into a proper meal.',
        visualType: 'grilled_fish',
        proteinSourceType: 'fish',
        cookTimeMinutes: 35,
        readyToEatQuery: 'Shrimp with Fried Sardine and Banku',
        parts: [
          ['Cooked Shrimp', 130, 2100, 30, 1, 3, 0, FISH],
          ['Fried Tanganyika Sardine', 90, 600, 19, 0, 4, 0, FISH],
          ['Banku', 180, 380, 5, 40, 1, 2, STAPLE],
          ['Pepper Sauce', 70, 250, 1, 5, 3, 1, SPICE]
        ]
      }),
      dish({
        title: 'Red Snapper with Light Soup and Rice',
        description:
          'Red snapper fillet in a clear tomato and pepper broth, served with boiled rice.',
        visualType: 'grilled_fish',
        proteinSourceType: 'fish',
        cookTimeMinutes: 40,
        readyToEatQuery: 'Red Snapper with Light Soup and Rice',
        parts: [
          ['Red Snapper Fillet', 170, 2400, 35, 0, 6, 0, FISH],
          ['Light Soup with Tomato and Pepper', 220, 800, 6, 14, 5, 3, MARKET],
          ['Boiled Rice', 150, 400, 4, 33, 0, 1, STAPLE]
        ]
      }),
      dish({
        title: 'Bra Leaves Soup with Fish and Rice',
        description:
          'Jute mallow leaves cooked to a slippery consistency with fish, tomato and pepper, served with rice.',
        visualType: 'stew_swallow',
        proteinSourceType: 'fish',
        cookTimeMinutes: 55,
        readyToEatQuery: 'Bra Leaves Soup with Fish and Rice',
        parts: [
          ['Bra Leaves Soup with Fish', 240, 950, 14, 14, 7, 5, MARKET],
          ['Smoked Fish', 80, 700, 17, 0, 4, 0, FISH],
          ['Boiled Rice', 150, 400, 4, 33, 0, 1, STAPLE]
        ]
      }),
      dish({
        title: 'Okro Stew with Smoked Fish and Rice',
        description:
          'Okra cooked down with tomato, pepper and smoked fish into a thick stew, with boiled rice.',
        visualType: 'stew_swallow',
        proteinSourceType: 'fish',
        cookTimeMinutes: 50,
        readyToEatQuery: 'Okro Stew with Smoked Fish and Rice',
        parts: [
          ['Okro Stew with Smoked Fish', 230, 900, 15, 15, 8, 4, MARKET],
          ['Boiled Rice', 160, 430, 4, 36, 0, 1, STAPLE],
          ['Shito Pepper', 10, 150, 0, 1, 0, 1, SPICE]
        ]
      }),
      dish({
        title: 'Garden Egg Stew with Grilled Fish and Rice',
        description:
          'African eggplant stewed with tomato, onion and pepper, served with grilled tilapia and rice.',
        visualType: 'stew_swallow',
        proteinSourceType: 'fish',
        cookTimeMinutes: 50,
        readyToEatQuery: 'Garden Egg Stew with Grilled Fish and Rice',
        parts: [
          ['Garden Egg Tomato Stew', 220, 850, 8, 20, 8, 6, MARKET],
          ['Grilled Tilapia Fillet', 150, 1250, 29, 0, 6, 0, FISH],
          ['Boiled Rice', 140, 380, 4, 31, 0, 1, STAPLE]
        ]
      }),
      dish({
        title: 'Fried Tilapia with Groundnut Soup and Rice',
        description:
          'Fried tilapia with a thick groundnut soup flavoured with tomato and ginger, and boiled rice.',
        visualType: 'grilled_fish',
        proteinSourceType: 'fish',
        cookTimeMinutes: 55,
        readyToEatQuery: 'Fried Tilapia with Groundnut Soup and Rice',
        parts: [
          ['Fried Whole Tilapia', 160, 1350, 30, 0, 9, 0, FISH],
          ['Groundnut Soup', 220, 900, 13, 14, 11, 4, MARKET],
          ['Boiled Rice', 150, 400, 4, 33, 0, 1, STAPLE]
        ]
      }),
      dish({
        title: 'Smoked Herring with Okro Soup and Fufu',
        description:
          'Smoked herring with sliced okra soup over pounded cassava and plantain.',
        visualType: 'stew_swallow',
        proteinSourceType: 'fish',
        cookTimeMinutes: 45,
        readyToEatQuery: 'Smoked Herring with Okro Soup and Fufu',
        parts: [
          ['Smoked Herring', 130, 1100, 28, 0, 7, 0, FISH],
          ['Okro Soup with Tomato', 220, 800, 9, 12, 6, 3, MARKET],
          ['Cassava and Plantain Fufu', 180, 500, 4, 42, 0, 2, STAPLE]
        ]
      }),
      dish({
        title: 'Jute Mallow Soup with Fish and Rice',
        description:
          'Ayoyo leaves cooked with fish, tomato and pepper until silky, served with rice.',
        visualType: 'stew_swallow',
        proteinSourceType: 'fish',
        cookTimeMinutes: 55,
        readyToEatQuery: 'Ayoyo Jute Mallow Soup with Fish and Rice',
        parts: [
          ['Ayoyo Leaves Soup with Fish', 240, 950, 14, 15, 7, 6, MARKET],
          ['Smoked Fish', 80, 700, 17, 0, 4, 0, FISH],
          ['Boiled Rice', 150, 400, 4, 33, 0, 1, STAPLE]
        ]
      })
    ],
    poultry: [
      dish({
        title: 'Okro Soup with Grilled Chicken and Banku',
        description:
          'Charcoal grilled chicken with sliced okra soup thickened with fresh okra, and banku.',
        visualType: 'stew_swallow',
        proteinSourceType: 'poultry',
        cookTimeMinutes: 50,
        readyToEatQuery: 'Okro Soup with Grilled Chicken and Banku',
        parts: [
          ['Grilled Chicken', 160, 1650, 34, 0, 10, 0, POULTRY],
          ['Okro Soup with Tomato', 220, 800, 8, 12, 6, 3, MARKET],
          ['Banku', 180, 380, 5, 40, 1, 2, STAPLE]
        ]
      }),
      dish({
        title: 'Fufu with Chicken Groundnut Soup',
        description:
          'Pounded cassava and plantain with a thick groundnut soup made with chicken.',
        visualType: 'stew_swallow',
        proteinSourceType: 'poultry',
        cookTimeMinutes: 65,
        readyToEatQuery: 'Fufu with Chicken Groundnut Soup',
        parts: [
          ['Cassava and Plantain Fufu', 190, 550, 5, 45, 0, 2, STAPLE],
          ['Chicken Groundnut Soup', 250, 1500, 29, 14, 13, 4, MARKET],
          ['Ginger and Pepper', 10, 100, 0, 1, 0, 0, SPICE]
        ]
      }),
      dish({
        title: 'Chicken Light Soup with Fufu and Pepper',
        description:
          'A clear tomato and pepper broth with chicken, served with pounded cassava and plantain.',
        visualType: 'stew_swallow',
        proteinSourceType: 'poultry',
        cookTimeMinutes: 60,
        readyToEatQuery: 'Chicken Light Soup with Fufu and Pepper',
        parts: [
          ['Chicken Light Soup', 260, 1450, 30, 11, 10, 2, MARKET],
          ['Cassava and Plantain Fufu', 190, 550, 5, 45, 0, 2, STAPLE],
          ['Pepper and Ginger', 10, 100, 0, 1, 0, 0, SPICE]
        ]
      }),
      dish({
        title: 'Grilled Chicken with Kontomire Stew and Rice',
        description:
          'Charcoal grilled chicken with cocoyam leaf stew and boiled rice.',
        visualType: 'stew_swallow',
        proteinSourceType: 'poultry',
        cookTimeMinutes: 55,
        readyToEatQuery: 'Grilled Chicken with Kontomire Stew and Rice',
        parts: [
          ['Grilled Chicken', 150, 1600, 32, 0, 9, 0, POULTRY],
          ['Kontomire Stew with Smoked Fish', 220, 950, 11, 13, 12, 6, MARKET],
          ['Boiled Rice', 140, 380, 4, 31, 0, 1, STAPLE]
        ]
      }),
      dish({
        title: 'Jollof Rice with Grilled Chicken and Kelewele',
        description:
          'Rice cooked in a tomato, onion and pepper base, with charcoal grilled chicken and spiced fried ripe plantain.',
        visualType: 'jollof_bowl',
        proteinSourceType: 'poultry',
        cookTimeMinutes: 50,
        readyToEatQuery: 'Jollof Rice with Grilled Chicken and Kelewele',
        parts: [
          ['Jollof Rice', 250, 900, 8, 56, 6, 2, STAPLE],
          ['Charcoal Grilled Chicken', 150, 1600, 32, 0, 9, 0, POULTRY],
          ['Kelewele Spiced Fried Plantain', 80, 340, 1, 20, 2, 2, PRODUCE]
        ]
      }),
      dish({
        title: 'Waakye with Chicken Stew and Boiled Egg',
        description:
          'Waakye with chicken stewed in tomato and pepper, and a boiled egg.',
        visualType: 'beans_plantain',
        proteinSourceType: 'poultry',
        cookTimeMinutes: 55,
        readyToEatQuery: 'Waakye with Chicken Stew and Egg',
        parts: [
          ['Waakye Rice and Cowpeas', 250, 900, 14, 55, 4, 7, STAPLE],
          ['Chicken Tomato Stew', 150, 1450, 26, 8, 11, 2, MARKET],
          ['Boiled Egg', 55, 180, 6, 1, 4, 0, DAIRY]
        ]
      }),
      dish({
        title: 'Chicken Palm Nut Soup with Rice',
        description:
          'The deep red palm nut soup, simmered until the oil rises, with chicken and boiled rice.',
        visualType: 'stew_swallow',
        proteinSourceType: 'poultry',
        cookTimeMinutes: 70,
        readyToEatQuery: 'Chicken Palm Nut Soup with Rice',
        parts: [
          ['Chicken Palm Nut Soup', 250, 1600, 30, 13, 14, 3, MARKET],
          ['Boiled Rice', 160, 430, 4, 36, 0, 1, STAPLE],
          ['Tomato and Pepper', 60, 180, 1, 5, 2, 1, SPICE]
        ]
      }),
      dish({
        title: 'Banku with Grilled Chicken and Pepper',
        description:
          'Fermented corn and cassava dough with charcoal grilled chicken and pepper sauce.',
        visualType: 'beans_plantain',
        proteinSourceType: 'poultry',
        cookTimeMinutes: 40,
        readyToEatQuery: 'Banku with Grilled Chicken and Pepper',
        parts: [
          ['Banku', 190, 400, 6, 42, 1, 2, STAPLE],
          ['Charcoal Grilled Chicken', 150, 1600, 32, 0, 9, 0, POULTRY],
          ['Pepper and Tomato Sauce', 80, 280, 1, 6, 4, 2, SPICE]
        ]
      }),
      dish({
        title: 'Grilled Chicken with Gari and Tomato Stew',
        description:
          'Charcoal grilled chicken with toasted gari granules and a tomato and onion stew.',
        visualType: 'beans_plantain',
        proteinSourceType: 'poultry',
        cookTimeMinutes: 45,
        readyToEatQuery: 'Grilled Chicken with Gari and Tomato Stew',
        parts: [
          ['Grilled Chicken', 150, 1600, 32, 0, 9, 0, POULTRY],
          ['Gari Cassava Granules', 120, 350, 3, 28, 1, 1, STAPLE],
          ['Tomato and Onion Stew', 150, 600, 4, 14, 6, 3, MARKET]
        ]
      })
    ],
    eggs_dairy: [
      dish({
        title: 'Waakye with Egg Stew and Boiled Egg',
        description:
          'Waakye with eggs cooked down in tomato and onion, a boiled egg and shito.',
        visualType: 'jollof_bowl',
        proteinSourceType: 'eggs_dairy',
        cookTimeMinutes: 40,
        readyToEatQuery: 'Waakye with Egg Stew and Boiled Egg',
        parts: [
          ['Waakye Rice and Cowpeas', 250, 900, 14, 55, 4, 7, STAPLE],
          ['Egg Tomato Stew', 150, 800, 15, 8, 10, 2, MARKET],
          ['Boiled Egg', 55, 180, 6, 1, 4, 0, DAIRY]
        ]
      }),
      dish({
        title: 'Garden Egg Stew with Boiled Egg and Rice',
        description:
          'African eggplant stewed with tomato, onion and pepper, served with a boiled egg and rice.',
        visualType: 'stew_swallow',
        proteinSourceType: 'eggs_dairy',
        cookTimeMinutes: 45,
        readyToEatQuery: 'Garden Egg Stew with Boiled Egg and Rice',
        parts: [
          ['Garden Egg Tomato Stew', 220, 850, 8, 20, 8, 6, MARKET],
          ['Boiled Egg', 110, 350, 13, 1, 9, 0, DAIRY],
          ['Boiled Rice', 140, 380, 4, 31, 0, 1, STAPLE]
        ]
      }),
      dish({
        title: 'Jollof with Omelette and Pepper',
        description:
          'Rice cooked in a tomato and pepper base with a folded omelette and sliced onion.',
        visualType: 'jollof_bowl',
        proteinSourceType: 'eggs_dairy',
        cookTimeMinutes: 35,
        readyToEatQuery: 'Jollof Rice with Omelette and Pepper',
        parts: [
          ['Jollof Rice', 250, 900, 8, 56, 6, 2, STAPLE],
          ['Two Egg Omelette', 110, 400, 13, 1, 10, 0, DAIRY],
          ['Sliced Onion and Pepper', 70, 200, 1, 6, 2, 2, PRODUCE]
        ]
      }),
      dish({
        title: 'Tomato Stew with Boiled Egg and Fufu',
        description:
          'A plain tomato and onion stew with pepper, served with a boiled egg and pounded cassava and plantain.',
        visualType: 'stew_swallow',
        proteinSourceType: 'eggs_dairy',
        cookTimeMinutes: 45,
        readyToEatQuery: 'Tomato Stew with Boiled Egg and Fufu',
        parts: [
          ['Tomato and Onion Stew', 200, 700, 5, 18, 7, 3, MARKET],
          ['Boiled Egg', 110, 350, 13, 1, 9, 0, DAIRY],
          ['Cassava and Plantain Fufu', 180, 500, 4, 42, 0, 2, STAPLE]
        ]
      }),
      dish({
        title: 'Yam with Egg Stew and Shito',
        description:
          'Boiled yam with eggs cooked in tomato and pepper, finished with shito.',
        visualType: 'stew_swallow',
        proteinSourceType: 'eggs_dairy',
        cookTimeMinutes: 35,
        readyToEatQuery: 'Boiled Yam with Egg Stew and Shito',
        parts: [
          ['Boiled Yam', 220, 660, 5, 46, 0, 3, PRODUCE],
          ['Egg Tomato Stew', 160, 850, 16, 9, 11, 2, MARKET],
          ['Shito Pepper', 10, 150, 0, 1, 0, 1, SPICE]
        ]
      }),
      dish({
        title: 'Kelewele with Fried Egg and Rice',
        description:
          'Spiced fried ripe plantain, a fried egg and boiled rice.',
        visualType: 'beans_plantain',
        proteinSourceType: 'eggs_dairy',
        cookTimeMinutes: 30,
        readyToEatQuery: 'Kelewele with Fried Egg and Rice',
        parts: [
          ['Kelewele Spiced Fried Plantain', 120, 480, 2, 30, 3, 3, PRODUCE],
          ['Fried Egg', 110, 360, 13, 0, 10, 0, DAIRY],
          ['Boiled Rice', 150, 400, 4, 33, 0, 1, STAPLE]
        ]
      }),
      dish({
        title: 'Okro Soup with Boiled Egg and Fufu',
        description:
          'Sliced okra soup with tomato and pepper, a boiled egg and pounded cassava and plantain.',
        visualType: 'stew_swallow',
        proteinSourceType: 'eggs_dairy',
        cookTimeMinutes: 45,
        readyToEatQuery: 'Okro Soup with Boiled Egg and Fufu',
        parts: [
          ['Okro Soup with Tomato', 220, 800, 9, 12, 6, 3, MARKET],
          ['Boiled Egg', 110, 350, 13, 1, 9, 0, DAIRY],
          ['Cassava and Plantain Fufu', 180, 500, 4, 42, 0, 2, STAPLE]
        ]
      }),
      dish({
        title: 'Waakye with Egg Stew and Kelewele',
        description:
          'Waakye with eggs stewed in tomato and onion, and spiced fried ripe plantain.',
        visualType: 'beans_plantain',
        proteinSourceType: 'eggs_dairy',
        cookTimeMinutes: 40,
        readyToEatQuery: 'Waakye with Egg Stew and Kelewele',
        parts: [
          ['Waakye Rice and Cowpeas', 250, 900, 14, 55, 4, 7, STAPLE],
          ['Egg Tomato Stew', 150, 800, 15, 8, 10, 2, MARKET],
          ['Kelewele Spiced Fried Plantain', 80, 340, 1, 20, 2, 2, PRODUCE]
        ]
      }),
      dish({
        title: 'Kontomire Stew with Boiled Egg and Rice',
        description:
          'Cocoyam leaves stewed with smoked fish and palm oil, with a boiled egg and rice.',
        visualType: 'stew_swallow',
        proteinSourceType: 'eggs_dairy',
        cookTimeMinutes: 55,
        readyToEatQuery: 'Kontomire Stew with Boiled Egg and Rice',
        parts: [
          ['Kontomire Stew with Smoked Fish', 220, 950, 11, 13, 12, 6, MARKET],
          ['Boiled Egg', 110, 350, 13, 1, 9, 0, DAIRY],
          ['Boiled Rice', 140, 380, 4, 31, 0, 1, STAPLE]
        ]
      })
    ],
    legumes_plant: [
      dish({
        title: 'Groundnut Soup with Rice and Sweet Plantain',
        description:
          'A thick groundnut soup with tomato and ginger, served with rice and fried ripe plantain.',
        visualType: 'beans_plantain',
        proteinSourceType: 'legumes_plant',
        cookTimeMinutes: 55,
        readyToEatQuery: 'Groundnut Soup with Rice and Fried Plantain',
        parts: [
          ['Groundnut Soup with Smoked Fish', 230, 950, 14, 16, 12, 4, MARKET],
          ['Boiled Rice', 160, 430, 4, 36, 0, 1, STAPLE],
          ['Fried Ripe Plantain', 80, 340, 1, 21, 2, 2, PRODUCE]
        ]
      }),
      dish({
        title: 'Red Red with Fried Plantain and Rice',
        description:
          'Black-eyed peas stewed in palm oil and tomato until thick and red, with fried ripe plantain and boiled rice.',
        visualType: 'beans_plantain',
        proteinSourceType: 'legumes_plant',
        cookTimeMinutes: 50,
        readyToEatQuery: 'Red Red Bean Stew with Fried Plantain',
        parts: [
          ['Red Red Black-Eyed Pea Stew', 220, 750, 13, 24, 8, 9, MARKET],
          ['Fried Ripe Plantain', 90, 380, 1, 23, 2, 2, PRODUCE],
          ['Boiled Rice', 120, 320, 3, 27, 0, 1, STAPLE]
        ]
      }),
      dish({
        title: 'Palm Nut Soup with Rice and Kelewele',
        description:
          'The deep red palm nut soup with boiled rice and spiced fried ripe plantain.',
        visualType: 'stew_swallow',
        proteinSourceType: 'legumes_plant',
        cookTimeMinutes: 60,
        readyToEatQuery: 'Palm Nut Soup with Rice and Kelewele',
        parts: [
          ['Palm Nut Soup', 230, 1000, 9, 15, 13, 4, MARKET],
          ['Boiled Rice', 160, 430, 4, 36, 0, 1, STAPLE],
          ['Kelewele Spiced Fried Plantain', 80, 340, 1, 20, 2, 2, PRODUCE]
        ]
      }),
      dish({
        title: 'Tubaani with Groundnut Soup and Pepper',
        description:
          'Steamed cowpea pudding with a thick groundnut soup and a spoon of shito.',
        visualType: 'stew_swallow',
        proteinSourceType: 'legumes_plant',
        cookTimeMinutes: 60,
        readyToEatQuery: 'Tubaani Steamed Bean Pudding with Groundnut Soup',
        parts: [
          ['Tubaani Steamed Cowpea Pudding', 180, 550, 12, 24, 6, 6, MARKET],
          ['Groundnut Soup with Smoked Fish', 220, 900, 13, 14, 12, 4, MARKET],
          ['Shito Pepper', 10, 150, 0, 1, 0, 1, SPICE]
        ]
      }),
      dish({
        title: 'Garden Egg Stew with Rice and Groundnut Soup',
        description:
          'African eggplant stewed with tomato, onion and pepper, served with boiled rice and a spoon of groundnut soup.',
        visualType: 'stew_swallow',
        proteinSourceType: 'legumes_plant',
        cookTimeMinutes: 55,
        readyToEatQuery: 'Garden Egg Stew with Rice and Groundnut Soup',
        parts: [
          ['Garden Egg Tomato Stew', 210, 820, 8, 19, 8, 6, MARKET],
          ['Groundnut Soup', 120, 520, 6, 7, 6, 2, MARKET],
          ['Boiled Rice', 150, 400, 4, 33, 0, 1, STAPLE]
        ]
      }),
      dish({
        title: 'Koose with Tomato Stew and Rice',
        description:
          'Cowpea fritters made from peeled beans, with tomato stew and boiled rice.',
        visualType: 'beans_plantain',
        proteinSourceType: 'legumes_plant',
        cookTimeMinutes: 40,
        readyToEatQuery: 'Koose Bean Fritters with Tomato Stew and Rice',
        parts: [
          ['Koose Peeled Cowpea Fritters', 130, 500, 10, 16, 10, 5, MARKET],
          ['Tomato and Pepper Stew', 170, 700, 5, 18, 8, 4, MARKET],
          ['Boiled Rice', 130, 350, 3, 29, 0, 1, STAPLE]
        ]
      }),
      dish({
        title: 'Ayoyo Soup with Rice and Groundnut',
        description:
          'Jute mallow leaves cooked with tomato and pepper, served with rice and roasted groundnuts.',
        visualType: 'stew_swallow',
        proteinSourceType: 'legumes_plant',
        cookTimeMinutes: 55,
        readyToEatQuery: 'Ayoyo Jute Mallow Soup with Rice and Groundnut',
        parts: [
          ['Ayoyo Leaves Soup', 230, 900, 8, 17, 8, 6, MARKET],
          ['Boiled Rice', 160, 430, 4, 36, 0, 1, STAPLE],
          ['Roasted Groundnuts', 40, 200, 5, 3, 3, 2, MARKET]
        ]
      }),
      dish({
        title: 'Okro Stew with Rice and Boiled Egg',
        description:
          'Okra stewed with tomato, pepper and smoked fish, with boiled rice and a boiled egg.',
        visualType: 'stew_swallow',
        proteinSourceType: 'legumes_plant',
        cookTimeMinutes: 50,
        readyToEatQuery: 'Okro Stew with Rice and Boiled Egg',
        parts: [
          ['Okro Stew with Smoked Fish', 220, 900, 15, 15, 8, 4, MARKET],
          ['Boiled Rice', 150, 400, 4, 33, 0, 1, STAPLE],
          ['Boiled Egg', 55, 180, 6, 1, 4, 0, DAIRY]
        ]
      }),
      dish({
        title: 'Kontomire Stew with Rice and Boiled Egg',
        description:
          'Cocoyam leaves stewed with smoked fish and palm oil, served with rice and a boiled egg.',
        visualType: 'stew_swallow',
        proteinSourceType: 'legumes_plant',
        cookTimeMinutes: 55,
        readyToEatQuery: 'Kontomire Stew with Rice and Boiled Egg',
        parts: [
          ['Kontomire Stew with Smoked Fish', 220, 950, 11, 13, 12, 6, MARKET],
          ['Boiled Rice', 150, 400, 4, 33, 0, 1, STAPLE],
          ['Boiled Egg', 55, 180, 6, 1, 4, 0, DAIRY]
        ]
      })
    ],
    beef_lean: [
      dish({
        title: 'Beef Light Soup with Rice and Kelewele',
        description:
          'Beef simmered in a clear tomato and pepper broth, with rice and spiced fried ripe plantain.',
        visualType: 'stew_swallow',
        proteinSourceType: 'beef_lean',
        cookTimeMinutes: 70,
        readyToEatQuery: 'Beef Light Soup with Rice and Kelewele',
        parts: [
          ['Beef Light Soup', 250, 1850, 33, 10, 11, 2, MARKET],
          ['Boiled Rice', 160, 430, 4, 36, 0, 1, STAPLE],
          ['Kelewele Spiced Fried Plantain', 80, 340, 1, 20, 2, 2, PRODUCE]
        ]
      }),
      dish({
        title: 'Grilled Beef Khebab with Waakye and Onion',
        description:
          'Cubes of beef marinated in onion and spice, grilled over charcoal, with waakye, raw onion and pepper sauce.',
        visualType: 'grilled_fish',
        proteinSourceType: 'beef_lean',
        cookTimeMinutes: 40,
        readyToEatQuery: 'Grilled Beef Khebab with Waakye and Onion',
        parts: [
          ['Grilled Beef Khebab', 140, 1750, 31, 1, 12, 0, MARKET],
          ['Waakye Rice and Cowpeas', 220, 760, 12, 47, 3, 6, STAPLE],
          ['Raw Onion and Pepper Sauce', 90, 280, 1, 8, 2, 2, PRODUCE]
        ]
      }),
      dish({
        title: 'Goat Palm Nut Soup with Fufu',
        description:
          'Goat cooked in the deep red palm nut soup, served with pounded cassava and plantain.',
        visualType: 'stew_swallow',
        proteinSourceType: 'beef_lean',
        cookTimeMinutes: 80,
        readyToEatQuery: 'Goat Palm Nut Soup with Fufu',
        parts: [
          ['Goat Palm Nut Soup', 250, 1950, 34, 12, 15, 3, MARKET],
          ['Cassava and Plantain Fufu', 190, 550, 5, 45, 0, 2, STAPLE]
        ]
      }),
      dish({
        title: 'Goat Light Soup with Banku and Pepper',
        description:
          'Goat in a clear tomato and pepper broth, with banku and a spoon of shito.',
        visualType: 'stew_swallow',
        proteinSourceType: 'beef_lean',
        cookTimeMinutes: 75,
        readyToEatQuery: 'Goat Light Soup with Banku and Pepper',
        parts: [
          ['Goat Light Soup', 250, 1900, 34, 9, 11, 2, MARKET],
          ['Banku', 180, 380, 5, 40, 1, 2, STAPLE],
          ['Shito Pepper', 10, 150, 0, 1, 0, 1, SPICE]
        ]
      }),
      dish({
        title: 'Jollof Rice with Goat Stew and Pepper',
        description:
          'Rice cooked in a tomato and pepper base with chunks of goat stew and a spoon of shito.',
        visualType: 'jollof_bowl',
        proteinSourceType: 'beef_lean',
        cookTimeMinutes: 70,
        readyToEatQuery: 'Jollof Rice with Goat Stew and Pepper',
        parts: [
          ['Jollof Rice', 240, 900, 8, 54, 6, 2, STAPLE],
          ['Goat Tomato Stew', 150, 1850, 30, 8, 11, 2, MARKET],
          ['Shito Pepper', 10, 150, 0, 1, 0, 1, SPICE]
        ]
      }),
      dish({
        title: 'Beef Stew with Rice and Kelewele',
        description:
          'Beef stewed with tomato, onion and pepper until the sauce thickens, with rice and spiced fried ripe plantain.',
        visualType: 'stew_swallow',
        proteinSourceType: 'beef_lean',
        cookTimeMinutes: 75,
        readyToEatQuery: 'Beef Stew with Rice and Kelewele',
        parts: [
          ['Beef Tomato Stew', 230, 1800, 32, 11, 12, 3, MARKET],
          ['Boiled Rice', 160, 430, 4, 36, 0, 1, STAPLE],
          ['Kelewele Spiced Fried Plantain', 70, 300, 1, 18, 2, 2, PRODUCE]
        ]
      }),
      dish({
        title: 'Lamb Stew with Rice and Pepper Sauce',
        description:
          'Lamb stewed down with tomato, onion and pepper until tender, with boiled rice and a pepper sauce.',
        visualType: 'stew_swallow',
        proteinSourceType: 'beef_lean',
        cookTimeMinutes: 80,
        readyToEatQuery: 'Lamb Stew with Rice and Pepper Sauce',
        parts: [
          ['Lamb Tomato Stew', 230, 1950, 33, 11, 13, 3, MARKET],
          ['Boiled Rice', 160, 430, 4, 36, 0, 1, STAPLE],
          ['Pepper Sauce', 70, 250, 1, 5, 3, 1, SPICE]
        ]
      }),
      dish({
        title: 'Cow Skin Pepper Soup with Rice',
        description:
          'Cow skin cooked long until soft and gelatinous, in a hot pepper broth, served with rice.',
        visualType: 'stew_swallow',
        proteinSourceType: 'beef_lean',
        cookTimeMinutes: 90,
        readyToEatQuery: 'Cow Skin Pepper Soup with Rice',
        parts: [
          ['Cow Skin Pepper Soup', 250, 1700, 30, 10, 12, 1, MARKET],
          ['Boiled Rice', 160, 430, 4, 36, 0, 1, STAPLE],
          ['Shito Pepper', 10, 150, 0, 1, 0, 1, SPICE]
        ]
      }),
      dish({
        title: 'Goat Stew with Waakye and Boiled Egg',
        description:
          'Goat stewed in tomato and pepper, served with waakye and a boiled egg.',
        visualType: 'beans_plantain',
        proteinSourceType: 'beef_lean',
        cookTimeMinutes: 70,
        readyToEatQuery: 'Goat Stew with Waakye and Boiled Egg',
        parts: [
          ['Waakye Rice and Cowpeas', 250, 900, 14, 55, 4, 7, STAPLE],
          ['Goat Tomato Stew', 150, 1850, 30, 8, 11, 2, MARKET],
          ['Boiled Egg', 55, 180, 6, 1, 4, 0, DAIRY]
        ]
      })
    ]
  }
};
