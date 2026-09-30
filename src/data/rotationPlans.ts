import { Meal, MealBlueprint, CountryCode, StaplePreference } from '../types';
import { COUNTRIES } from './countries';
import { COUNTRY_CUISINES, resolveCuisineSources } from './cuisineCatalog';

// 5-stage sequential protein rotation cycle
const PROTEIN_ROTATION: Array<'fish' | 'poultry' | 'eggs_dairy' | 'legumes_plant' | 'beef_lean'> = [
  'fish',
  'poultry',
  'eggs_dairy',
  'legumes_plant',
  'beef_lean'
];

// Indigenous Morning Meal Prototypes
const INDIGENOUS_BREAKFASTS: Record<Meal['proteinSourceType'], MealBlueprint[]> = {
  fish: [
    {
      title: 'Boiled White Yam & Flaked Smoked Titus Pepper Sauce',
      description: 'Firm boiled white yam paired with rich flaked Atlantic mackerel simmered in crushed rodo, tatase, and cold-pressed palm oil.',
      visualType: 'yam_egg_skillet',
      style: 'indigenous',
      proteinSourceType: 'fish',
      calories: 580,
      protein: 38,
      carbs: 72,
      fat: 14,
      fiber: 9,
      cookTimeMinutes: 20,
      readyToEatQuery: 'Boiled Yam and Fish Stew',
      ingredients: [
        { name: 'White Yam Tuber', gramWeight: 250, baseNGNCost: 750, protein: 4, carbs: 68, fat: 0.5, fiber: 8, sourcingLocation: 'Mile 12 Market (Yam Sheds)' },
        { name: 'Smoked Titus (Mackerel) Fillet', gramWeight: 140, baseNGNCost: 1100, protein: 32, carbs: 0, fat: 12, fiber: 0, sourcingLocation: 'Smoked Fish Sellers Row' },
        { name: 'Habanero, Onion & Tomato Blend', gramWeight: 100, baseNGNCost: 300, protein: 2, carbs: 4, fat: 0.5, fiber: 1, sourcingLocation: 'Perishable Produce Corner' },
        { name: 'Red Palm Oil', gramWeight: 12, baseNGNCost: 150, protein: 0, carbs: 0, fat: 12, fiber: 0, sourcingLocation: 'Local Mill Gallons' }
      ],
      prepInstructions: [
        'Peel yam, cut into rounds, and boil in lightly salted water for 15 minutes until tender.',
        'Flake the smoked mackerel and discard pin-bones.',
        'Sauté coarse pepper blend in hot palm oil, add fish flakes, and simmer for 5 minutes.'
      ]
    }
  ],
  poultry: [
    {
      title: 'Whole Oats Porridge with Shredded Peppered Chicken Breast',
      description: 'Savoury cooked cereal paired with lean shredded chicken breast tossed in dry Cameroon pepper, ginger, and garlic.',
      visualType: 'oatmeal_parfait',
      style: 'indigenous',
      proteinSourceType: 'poultry',
      calories: 520,
      protein: 42,
      carbs: 64,
      fat: 10,
      fiber: 8,
      cookTimeMinutes: 15,
      readyToEatQuery: 'Oats with Chicken or Shredded Chicken Bowl',
      ingredients: [
        { name: 'Rolled Oats', gramWeight: 90, baseNGNCost: 450, protein: 12, carbs: 56, fat: 6, fiber: 8, sourcingLocation: 'Bodija Dry Grain Mart' },
        { name: 'Chicken Breast (Lean)', gramWeight: 150, baseNGNCost: 950, protein: 30, carbs: 0, fat: 3.5, fiber: 0, sourcingLocation: 'Cold Room Poultry Stand' },
        { name: 'Cameroon Pepper & Seasoning', gramWeight: 10, baseNGNCost: 100, protein: 0, carbs: 8, fat: 0.5, fiber: 0, sourcingLocation: 'Local Spice Market' }
      ],
      prepInstructions: [
        'Boil oats with 350ml water until thickened.',
        'Dice chicken breast into 1cm cubes and pan-sear with garlic, ginger, and Cameroon pepper for 6 minutes.',
        'Layer seasoned chicken over hot oats.'
      ]
    }
  ],
  eggs_dairy: [
    {
      title: 'Steamed Sweet Potato & 3-Egg Garden Egg Shakshuka',
      description: 'Slow-steamed orange-fleshed sweet potato discs paired with a 3-egg scramble infused with garden egg slices, scent leaves, and tomatoes.',
      visualType: 'yam_egg_skillet',
      style: 'indigenous',
      proteinSourceType: 'eggs_dairy',
      calories: 540,
      protein: 28,
      carbs: 66,
      fat: 18,
      fiber: 10,
      cookTimeMinutes: 18,
      readyToEatQuery: 'Sweet Potato and Scrambled Eggs',
      ingredients: [
        { name: 'Orange Sweet Potato', gramWeight: 240, baseNGNCost: 500, protein: 4, carbs: 60, fat: 0.5, fiber: 8, sourcingLocation: 'Local Roots Stall' },
        { name: 'Fresh Farm Eggs (3 Large)', gramWeight: 150, baseNGNCost: 650, protein: 21, carbs: 2, fat: 15, fiber: 0, sourcingLocation: 'Mile 12 Egg Depot' },
        { name: 'Garden Egg & Scent Leaves', gramWeight: 80, baseNGNCost: 200, protein: 3, carbs: 4, fat: 0.5, fiber: 2, sourcingLocation: 'Fresh Herb Stalls' }
      ],
      prepInstructions: [
        'Steam sweet potato chunks until fork tender (12 mins).',
        'Finely chop garden eggs and scent leaves.',
        'Whisk 3 eggs, pour into a lightly oiled pan with simmered garden eggs, and fold gently.'
      ]
    }
  ],
  legumes_plant: [
    {
      title: 'Steamed Moi-Moi Elewe with Fortified Brown Garri Crunch',
      description: 'Traditional leaf-wrapped steamed bean pudding packed with high-protein black-eyed peas, paired with crisp ice-cold Ijebu garri.',
      visualType: 'beans_plantain',
      style: 'indigenous',
      proteinSourceType: 'legumes_plant',
      calories: 510,
      protein: 31,
      carbs: 76,
      fat: 9,
      fiber: 14,
      cookTimeMinutes: 25,
      readyToEatQuery: 'Moi Moi and Garri',
      ingredients: [
        { name: 'Black Eyed Beans (Moi-Moi paste)', gramWeight: 160, baseNGNCost: 600, protein: 24, carbs: 54, fat: 2, fiber: 12, sourcingLocation: 'Mile 12 Grains Depot' },
        { name: 'Ijebu Garri', gramWeight: 45, baseNGNCost: 150, protein: 1, carbs: 38, fat: 0.2, fiber: 2, sourcingLocation: 'Cassava Merchants' },
        { name: 'Boiled Egg Whites (2 eggs)', gramWeight: 65, baseNGNCost: 260, protein: 6, carbs: 0, fat: 0.2, fiber: 0, sourcingLocation: 'Egg Depot' },
        { name: 'Pepper & Crayfish Blend', gramWeight: 30, baseNGNCost: 250, protein: 3, carbs: 2, fat: 1, fiber: 1, sourcingLocation: 'Dried Seafood Row' }
      ],
      prepInstructions: [
        'Blend peeled beans with peppers, crayfish, and warm broth into a fluffy batter.',
        'Fold in sliced boiled egg whites and steam inside plantain leaves for 35 minutes.',
        'Serve warm with chilled crispy garri.'
      ]
    }
  ],
  beef_lean: [
    {
      title: 'Grilled Plantain (Boli) & Lean Suya Beef Skewers',
      description: 'Ripe plantain fire-roasted to caramel perfection, served with thinly shaved lean beef strips rolled in kuli-kuli yaji spice.',
      visualType: 'beans_plantain',
      style: 'indigenous',
      proteinSourceType: 'beef_lean',
      calories: 590,
      protein: 36,
      carbs: 78,
      fat: 14,
      fiber: 8,
      cookTimeMinutes: 20,
      readyToEatQuery: 'Boli and Beef Suya',
      ingredients: [
        { name: 'Semi-Ripe Plantain (1 Large)', gramWeight: 220, baseNGNCost: 600, protein: 3, carbs: 70, fat: 0.5, fiber: 6, sourcingLocation: 'Plantain Corner Mile 12' },
        { name: 'Lean Beef Strips (Top Round)', gramWeight: 140, baseNGNCost: 1100, protein: 31, carbs: 0, fat: 10, fiber: 0, sourcingLocation: 'Oyingbo Abattoir Butcher' },
        { name: 'Suya Yaji Spice (Kuli-kuli, ginger, chili)', gramWeight: 15, baseNGNCost: 120, protein: 2, carbs: 8, fat: 3.5, fiber: 2, sourcingLocation: 'Northern Spice Stalls' }
      ],
      prepInstructions: [
        'Roast plantain in a heavy grill pan or oven at 200°C for 18 minutes until caramel spots appear.',
        'Coat beef strips in cold peanut oil and suya spice; sear on high heat for 3 minutes per side.',
        'Slice and assemble together with fresh red onions.'
      ]
    }
  ]
};

// Indigenous Afternoon/Evening Meal Prototypes
const INDIGENOUS_AFTERNOONS: Record<Meal['proteinSourceType'], MealBlueprint[]> = {
  fish: [
    {
      title: 'Village Parboiled Rice with Steamed Fresh Catfish & Ofada Stew',
      description: 'Unpolished local brown rice drenched in aromatic fermented locust-bean (iru) bleaching stew with whole fresh catfish steak.',
      visualType: 'jollof_bowl',
      style: 'indigenous',
      proteinSourceType: 'fish',
      calories: 680,
      protein: 44,
      carbs: 88,
      fat: 16,
      fiber: 7,
      cookTimeMinutes: 30,
      readyToEatQuery: 'Ofada Rice with Catfish',
      ingredients: [
        { name: 'Local Brown / Ofada Rice', gramWeight: 130, baseNGNCost: 700, protein: 8, carbs: 82, fat: 2, fiber: 6, sourcingLocation: 'Bodija Rice Depot' },
        { name: 'Fresh Farm Catfish Cut', gramWeight: 180, baseNGNCost: 1300, protein: 33, carbs: 0, fat: 10, fiber: 0, sourcingLocation: 'Fish Pond Cooperatives' },
        { name: 'Bleached Red Oil with Iru (Locust Beans)', gramWeight: 15, baseNGNCost: 200, protein: 2, carbs: 2, fat: 14, fiber: 1, sourcingLocation: 'Traditional Condiments' },
        { name: 'Green Bell Pepper & Rodo Bleached Sauce', gramWeight: 80, baseNGNCost: 250, protein: 1, carbs: 4, fat: 0, fiber: 1, sourcingLocation: 'Market Vegetable Stalls' }
      ],
      prepInstructions: [
        'Parboil unpolished ofada rice twice to remove excess starch and steam until tender.',
        'Simmer whole catfish steak in seasoned pepper broth for 12 minutes.',
        'Heat bleached palm oil, toss in fermented iru and crushed rodo, simmer, and spoon over the rice.'
      ]
    }
  ],
  poultry: [
    {
      title: 'Smoky Firewood Jollof Rice with Char-Grilled Chicken & Fried Plantain',
      description: 'Long-grain rice infused with roasted tomatoes, red bell peppers, bay leaves, and charred spice, topped with golden chicken.',
      visualType: 'jollof_bowl',
      style: 'indigenous',
      proteinSourceType: 'poultry',
      calories: 720,
      protein: 46,
      carbs: 92,
      fat: 18,
      fiber: 6,
      cookTimeMinutes: 35,
      readyToEatQuery: 'Jollof Rice with Grilled Chicken',
      ingredients: [
        { name: 'Parboiled Long Grain Rice', gramWeight: 130, baseNGNCost: 650, protein: 7, carbs: 85, fat: 1.5, fiber: 3, sourcingLocation: 'Mile 12 Rice Sheds' },
        { name: 'Chicken Thigh / Breast', gramWeight: 170, baseNGNCost: 1250, protein: 36, carbs: 0, fat: 12, fiber: 0, sourcingLocation: 'Poultry Cutters' },
        { name: 'Ripe Plantain (Dodo)', gramWeight: 70, baseNGNCost: 250, protein: 1, carbs: 22, fat: 0.3, fiber: 2, sourcingLocation: 'Plantain Row' },
        { name: 'Tomato Paste & Pepper Puree', gramWeight: 80, baseNGNCost: 300, protein: 2, carbs: 6, fat: 4, fiber: 1, sourcingLocation: 'Perishable Square' }
      ],
      prepInstructions: [
        'Reduce pepper mix with thyme, curry, and bay leaf until concentrated oil floats.',
        'Stir-in rice with seasoned stock and steam on low heat with foil cover to create classic bottom-pot smoke.',
        'Air-fry or grill chicken until skin is crackling.'
      ]
    }
  ],
  eggs_dairy: [
    {
      title: 'Pounded Yam Swallow with Egusi Spinach Soup & Hard-Boiled Eggs',
      description: 'Velvety smooth pounded yam paired with ground melon seed egusi, chopped wild spinach (efo shoko), and farm boiled eggs.',
      visualType: 'stew_swallow',
      style: 'indigenous',
      proteinSourceType: 'eggs_dairy',
      calories: 710,
      protein: 34,
      carbs: 96,
      fat: 20,
      fiber: 8,
      cookTimeMinutes: 25,
      readyToEatQuery: 'Pounded Yam Egusi with Eggs',
      ingredients: [
        { name: 'Yam Flour / Pounded Yam', gramWeight: 140, baseNGNCost: 700, protein: 4, carbs: 90, fat: 0.5, fiber: 5, sourcingLocation: 'Mile 12 Flour Mills' },
        { name: 'Melon Seed Egusi', gramWeight: 45, baseNGNCost: 450, protein: 12, carbs: 6, fat: 18, fiber: 3, sourcingLocation: 'Dry Seed Corner' },
        { name: 'Farm Boiled Eggs (2 Large)', gramWeight: 100, baseNGNCost: 440, protein: 14, carbs: 1, fat: 10, fiber: 0, sourcingLocation: 'Egg Depot' },
        { name: 'Efo Shoko / Ugu Greens', gramWeight: 100, baseNGNCost: 200, protein: 4, carbs: 3, fat: 0.5, fiber: 3, sourcingLocation: 'Vegetable Row' }
      ],
      prepInstructions: [
        'Pound boiled yam into an elastic, lump-free swallow.',
        'Form egusi paste balls in pepper stock and steam with chopped spinach and locust beans for 15 minutes.',
        'Add peeled hard-boiled eggs directly into the bubbling egusi.'
      ]
    }
  ],
  legumes_plant: [
    {
      title: 'Slow-Cooked Honey Beans (Ewa Oloyin) with Roasted Plantain & Fish Bits',
      description: 'Naturally sweet soft Nigerian honey beans cooked down to a rich creamy porridge with dried catfish and ripe dodo.',
      visualType: 'beans_plantain',
      style: 'indigenous',
      proteinSourceType: 'legumes_plant',
      calories: 670,
      protein: 38,
      carbs: 98,
      fat: 12,
      fiber: 21,
      cookTimeMinutes: 40,
      readyToEatQuery: 'Ewa Aganyin or Stewed Honey Beans',
      ingredients: [
        { name: 'Oloyin Honey Beans', gramWeight: 150, baseNGNCost: 650, protein: 26, carbs: 75, fat: 2, fiber: 18, sourcingLocation: 'Bodija Beans Row' },
        { name: 'Fried / Roasted Plantain', gramWeight: 90, baseNGNCost: 300, protein: 1, carbs: 28, fat: 0.4, fiber: 2, sourcingLocation: 'Market Yard' },
        { name: 'Dried Deboned Bonga / Catfish', gramWeight: 40, baseNGNCost: 400, protein: 11, carbs: 0, fat: 4, fiber: 0, sourcingLocation: 'Dried Fish Stalls' },
        { name: 'Palm Oil & Chili Reduction', gramWeight: 12, baseNGNCost: 150, protein: 0, carbs: 1, fat: 12, fiber: 0, sourcingLocation: 'Local Mills' }
      ],
      prepInstructions: [
        'Pressure cook or boil honey beans with onion until butter-soft.',
        'Stir in deboned fish bits, dried chili pepper, and palm oil, simmering until thick and glossy.',
        'Serve with roasted or air-fried plantain.'
      ]
    }
  ],
  beef_lean: [
    {
      title: 'Basmati Jollof with Lean Goat Meat (Asun Style) & Steamed Veggies',
      description: 'Long grain rice tossed in smoky tomato-habanero paste served with trimmed lean goat meat seared with diced rodo and onions.',
      visualType: 'jollof_bowl',
      style: 'indigenous',
      proteinSourceType: 'beef_lean',
      calories: 690,
      protein: 45,
      carbs: 84,
      fat: 17,
      fiber: 5,
      cookTimeMinutes: 30,
      readyToEatQuery: 'Jollof Rice with Asun Goat Meat',
      ingredients: [
        { name: 'Rice Grain', gramWeight: 120, baseNGNCost: 600, protein: 6, carbs: 78, fat: 1, fiber: 2, sourcingLocation: 'Grain Market' },
        { name: 'Lean Goat Meat (Trimmed)', gramWeight: 170, baseNGNCost: 1600, protein: 36, carbs: 0, fat: 12, fiber: 0, sourcingLocation: 'Mile 12 Abattoir' },
        { name: 'Steamed Green Beans & Carrots', gramWeight: 70, baseNGNCost: 200, protein: 2, carbs: 6, fat: 0.2, fiber: 3, sourcingLocation: 'Fresh Veggies Row' },
        { name: 'Asun Seasoning Blend', gramWeight: 20, baseNGNCost: 150, protein: 1, carbs: 3, fat: 4, fiber: 0, sourcingLocation: 'Spice Market' }
      ],
      prepInstructions: [
        'Steam goat meat with ginger, garlic, and onions until tender; sear in a hot skillet with crushed peppers.',
        'Cook rice in reduced goat stock and spicy tomato paste until fragrant.',
        'Garnish with crisp steamed vegetables.'
      ]
    }
  ]
};

// Continental Prototypes for Glocal Western preference
const CONTINENTAL_BREAKFASTS: Record<Meal['proteinSourceType'], MealBlueprint[]> = {
  fish: [
    {
      title: 'Smoked Salmon or Mackerel Toast with Poached Egg & Avocado',
      description: 'Crusty toasted whole grain bread topped with smashed avocado, flaked fish, and a soft golden poached egg.',
      visualType: 'yam_egg_skillet',
      style: 'continental',
      proteinSourceType: 'fish',
      calories: 520,
      protein: 34,
      carbs: 48,
      fat: 20,
      fiber: 8,
      cookTimeMinutes: 12,
      readyToEatQuery: 'Smoked Salmon Avocado Toast',
      ingredients: [
        { name: 'Whole Grain Sourdough / Toast', gramWeight: 90, baseNGNCost: 500, protein: 9, carbs: 42, fat: 2, fiber: 6, sourcingLocation: 'Bakery' },
        { name: 'Smoked Fish / Salmon', gramWeight: 90, baseNGNCost: 1400, protein: 19, carbs: 0, fat: 9, fiber: 0, sourcingLocation: 'Cold Counter' },
        { name: 'Farm Egg', gramWeight: 50, baseNGNCost: 220, protein: 6, carbs: 1, fat: 5, fiber: 0, sourcingLocation: 'Egg Stand' }
      ],
      prepInstructions: [
        'Toast whole grain bread until golden.',
        'Mash avocado with lemon, salt, and pepper.',
        'Poach egg for 3 minutes and assemble with fish flakes.'
      ]
    }
  ],
  poultry: [
    {
      title: 'High-Protein Rolled Oats Bowl with Whey & Grilled Turkey Bacon',
      description: 'Rolled oats cooked in unsweetened almond milk topped with sliced banana, chia seeds, and lean grilled turkey slices.',
      visualType: 'oatmeal_parfait',
      style: 'continental',
      proteinSourceType: 'poultry',
      calories: 490,
      protein: 36,
      carbs: 62,
      fat: 10,
      fiber: 9,
      cookTimeMinutes: 10,
      readyToEatQuery: 'Protein Oatmeal Bowl',
      ingredients: [
        { name: 'Rolled Oats', gramWeight: 80, baseNGNCost: 400, protein: 11, carbs: 54, fat: 5, fiber: 8, sourcingLocation: 'Supermarket' },
        { name: 'Lean Turkey Breast / Slices', gramWeight: 100, baseNGNCost: 900, protein: 22, carbs: 0, fat: 2.5, fiber: 0, sourcingLocation: 'Poultry Counter' },
        { name: 'Chia Seeds & Banana', gramWeight: 60, baseNGNCost: 300, protein: 3, carbs: 18, fat: 2.5, fiber: 4, sourcingLocation: 'Produce Aisle' }
      ],
      prepInstructions: [
        'Cook oats for 5 minutes with boiling water or milk.',
        'Crisp turkey slices in a non-stick pan.',
        'Top oats with sliced banana and seeds.'
      ]
    }
  ],
  eggs_dairy: [
    {
      title: 'Greek Yogurt Parfait with Mixed Berries, Walnuts & Honey',
      description: 'Thick strained Greek yogurt layered with fresh blueberries, chopped walnuts, and a light drizzle of raw honey.',
      visualType: 'oatmeal_parfait',
      style: 'continental',
      proteinSourceType: 'eggs_dairy',
      calories: 480,
      protein: 32,
      carbs: 45,
      fat: 16,
      fiber: 6,
      cookTimeMinutes: 5,
      readyToEatQuery: 'Greek Yogurt Berry Parfait',
      ingredients: [
        { name: 'Strained Greek Yogurt (0% or 2%)', gramWeight: 220, baseNGNCost: 1100, protein: 22, carbs: 9, fat: 4, fiber: 0, sourcingLocation: 'Dairy Chiller' },
        { name: 'Chopped Walnuts / Almonds', gramWeight: 25, baseNGNCost: 400, protein: 5, carbs: 4, fat: 12, fiber: 2, sourcingLocation: 'Nut Merchant' },
        { name: 'Mixed Berries & Honey', gramWeight: 80, baseNGNCost: 500, protein: 1, carbs: 24, fat: 0.2, fiber: 4, sourcingLocation: 'Fruit Section' }
      ],
      prepInstructions: [
        'Spoon Greek yogurt into a chilled bowl.',
        'Layer berries, chopped nuts, and finish with a drizzle of honey.'
      ]
    }
  ],
  legumes_plant: [
    {
      title: 'Mediterranean Chickpea & Avocado Power Bowl with Tahini',
      description: 'Warm roasted chickpeas tossed in cumin, lemon, cherry tomatoes, cucumbers, and a drizzle of rich tahini cream.',
      visualType: 'chicken_salad',
      style: 'continental',
      proteinSourceType: 'legumes_plant',
      calories: 510,
      protein: 24,
      carbs: 65,
      fat: 18,
      fiber: 14,
      cookTimeMinutes: 15,
      readyToEatQuery: 'Chickpea Mediterranean Bowl',
      ingredients: [
        { name: 'Cooked Chickpeas', gramWeight: 180, baseNGNCost: 650, protein: 17, carbs: 48, fat: 4, fiber: 12, sourcingLocation: 'Grain Store' },
        { name: 'Sesame Tahini Dressing', gramWeight: 25, baseNGNCost: 350, protein: 5, carbs: 3, fat: 13, fiber: 2, sourcingLocation: 'Specialty Aisle' },
        { name: 'Cucumber & Cherry Tomato Salad', gramWeight: 120, baseNGNCost: 300, protein: 2, carbs: 8, fat: 0.3, fiber: 3, sourcingLocation: 'Salad Stand' }
      ],
      prepInstructions: [
        'Roast chickpeas in a skillet with cumin, paprika, and sea salt.',
        'Toss cucumber and tomatoes with lemon juice.',
        'Drizzle tahini dressing on top.'
      ]
    }
  ],
  beef_lean: [
    {
      title: 'Lean Sirloin Beef Hash with Diced Russet Potatoes & Spinach',
      description: 'Pan-browned lean minced beef tossed with diced crispy potatoes, garlic, sweet peppers, and baby spinach.',
      visualType: 'yam_egg_skillet',
      style: 'continental',
      proteinSourceType: 'beef_lean',
      calories: 560,
      protein: 38,
      carbs: 52,
      fat: 18,
      fiber: 6,
      cookTimeMinutes: 20,
      readyToEatQuery: 'Steak & Potato Hash',
      ingredients: [
        { name: 'Lean Minced Sirloin (90/10)', gramWeight: 150, baseNGNCost: 1200, protein: 32, carbs: 0, fat: 12, fiber: 0, sourcingLocation: 'Butcher Counter' },
        { name: 'Diced Russet Potatoes', gramWeight: 180, baseNGNCost: 400, protein: 4, carbs: 46, fat: 0.2, fiber: 4, sourcingLocation: 'Produce Bin' },
        { name: 'Baby Spinach & Bell Peppers', gramWeight: 80, baseNGNCost: 250, protein: 2, carbs: 6, fat: 0.5, fiber: 2, sourcingLocation: 'Greens Shelf' }
      ],
      prepInstructions: [
        'Parboil diced potatoes for 5 mins, then crisp in olive oil.',
        'Brown minced sirloin with onion, rosemary, and garlic.',
        'Fold in baby spinach until wilted.'
      ]
    }
  ]
};

const CONTINENTAL_AFTERNOONS: Record<Meal['proteinSourceType'], MealBlueprint[]> = {
  fish: [
    {
      title: 'Pan-Seared Atlantic Salmon with Steamed Asparagus & Garlic Brown Rice',
      description: 'Crispy skin salmon fillet bursting with Omega-3s, served alongside tender asparagus spears and nutty brown rice.',
      visualType: 'chicken_salad',
      style: 'continental',
      proteinSourceType: 'fish',
      calories: 640,
      protein: 42,
      carbs: 62,
      fat: 22,
      fiber: 7,
      cookTimeMinutes: 22,
      readyToEatQuery: 'Salmon Bowl with Brown Rice',
      ingredients: [
        { name: 'Atlantic Salmon Fillet', gramWeight: 170, baseNGNCost: 2200, protein: 34, carbs: 0, fat: 18, fiber: 0, sourcingLocation: 'Fish Counter' },
        { name: 'Steamed Brown Rice', gramWeight: 120, baseNGNCost: 500, protein: 5, carbs: 54, fat: 2, fiber: 4, sourcingLocation: 'Grains Bin' },
        { name: 'Tender Asparagus / Greens', gramWeight: 90, baseNGNCost: 600, protein: 3, carbs: 5, fat: 0.2, fiber: 3, sourcingLocation: 'Produce' }
      ],
      prepInstructions: [
        'Season salmon with sea salt and cracked black pepper; sear skin-side down for 4 minutes.',
        'Steam asparagus for 3 minutes until vibrant green.',
        'Fluff brown rice with parsley and garlic olive oil.'
      ]
    }
  ],
  poultry: [
    {
      title: 'Herb-Roasted Chicken Breast with Quinoa & Steamed Broccoli',
      description: 'Juicy rosemary-marinated chicken breast served over fluffy quinoa with garlic-steamed broccoli crowns.',
      visualType: 'chicken_salad',
      style: 'continental',
      proteinSourceType: 'poultry',
      calories: 610,
      protein: 48,
      carbs: 64,
      fat: 14,
      fiber: 8,
      cookTimeMinutes: 25,
      readyToEatQuery: 'Grilled Chicken Quinoa Bowl',
      ingredients: [
        { name: 'Boneless Skinless Chicken Breast', gramWeight: 180, baseNGNCost: 1300, protein: 42, carbs: 0, fat: 5, fiber: 0, sourcingLocation: 'Poultry Bin' },
        { name: 'Organic Quinoa Grain', gramWeight: 80, baseNGNCost: 800, protein: 10, carbs: 52, fat: 4, fiber: 5, sourcingLocation: 'Health Food Shelf' },
        { name: 'Broccoli Florets', gramWeight: 110, baseNGNCost: 400, protein: 4, carbs: 8, fat: 0.5, fiber: 4, sourcingLocation: 'Greens Stalls' }
      ],
      prepInstructions: [
        'Cook quinoa in vegetable broth for 15 minutes.',
        'Pan-roast chicken breast with thyme and garlic until internal temperature reaches 74°C.',
        'Steam broccoli for 4 minutes.'
      ]
    }
  ],
  eggs_dairy: [
    {
      title: 'Whole Wheat Pasta Toss with Ricotta, Fresh Basil & Poached Eggs',
      description: 'Al dente penne pasta tossed with crushed Italian tomatoes, fresh basil, creamy ricotta, and soft runny farm eggs.',
      visualType: 'pasta_medley',
      style: 'continental',
      proteinSourceType: 'eggs_dairy',
      calories: 630,
      protein: 33,
      carbs: 82,
      fat: 17,
      fiber: 9,
      cookTimeMinutes: 18,
      readyToEatQuery: 'Pasta Pomodoro with Egg',
      ingredients: [
        { name: 'Whole Wheat Penne', gramWeight: 110, baseNGNCost: 600, protein: 12, carbs: 74, fat: 2, fiber: 8, sourcingLocation: 'Pasta Row' },
        { name: 'Part-Skim Ricotta / Parmesan', gramWeight: 60, baseNGNCost: 650, protein: 8, carbs: 3, fat: 8, fiber: 0, sourcingLocation: 'Cheese Cooler' },
        { name: 'Farm Eggs (2 Large)', gramWeight: 100, baseNGNCost: 440, protein: 13, carbs: 1, fat: 10, fiber: 0, sourcingLocation: 'Egg Depot' }
      ],
      prepInstructions: [
        'Boil pasta in salted water for 9 minutes.',
        'Simmer crushed plum tomatoes with garlic and fresh basil.',
        'Toss pasta into sauce, dollop ricotta, and crown with warm poached eggs.'
      ]
    }
  ],
  legumes_plant: [
    {
      title: 'Hearty French Green Lentil Ragout with Roasted Sweet Potato',
      description: 'Simmered Puy lentils with celery, carrots, bay leaf, and caramelized roasted sweet potato wedges.',
      visualType: 'beans_plantain',
      style: 'continental',
      proteinSourceType: 'legumes_plant',
      calories: 590,
      protein: 30,
      carbs: 94,
      fat: 8,
      fiber: 18,
      cookTimeMinutes: 30,
      readyToEatQuery: 'Lentil Stew with Sweet Potato',
      ingredients: [
        { name: 'Brown / Green Lentils', gramWeight: 130, baseNGNCost: 600, protein: 24, carbs: 68, fat: 2, fiber: 16, sourcingLocation: 'Legumes Row' },
        { name: 'Roasted Sweet Potato', gramWeight: 140, baseNGNCost: 350, protein: 3, carbs: 32, fat: 0.3, fiber: 4, sourcingLocation: 'Produce Stalls' },
        { name: 'Mirepoix (Onion, Celery, Carrot)', gramWeight: 80, baseNGNCost: 200, protein: 2, carbs: 8, fat: 0.3, fiber: 2, sourcingLocation: 'Vegetable Stalls' }
      ],
      prepInstructions: [
        'Roast sweet potato cubes with rosemary in the oven for 20 minutes.',
        'Sauté onions, celery, and carrots in olive oil; add lentils and vegetable broth.',
        'Simmer 25 minutes until lentils are rich and creamy.'
      ]
    }
  ],
  beef_lean: [
    {
      title: 'Grilled Lean Beef Steak with Baked Potato & Green Beans',
      description: 'Tender seared flank steak sliced thinly, served with a fluffy baked potato, Greek yogurt chive dip, and crisp green beans.',
      visualType: 'chicken_salad',
      style: 'continental',
      proteinSourceType: 'beef_lean',
      calories: 660,
      protein: 46,
      carbs: 58,
      fat: 19,
      fiber: 6,
      cookTimeMinutes: 20,
      readyToEatQuery: 'Steak & Baked Potato Meal',
      ingredients: [
        { name: 'Lean Beef Flank / Sirloin', gramWeight: 170, baseNGNCost: 1600, protein: 40, carbs: 0, fat: 12, fiber: 0, sourcingLocation: 'Butcher Shop' },
        { name: 'Russet Potato (1 Medium)', gramWeight: 200, baseNGNCost: 450, protein: 4, carbs: 50, fat: 0.2, fiber: 4, sourcingLocation: 'Produce Aisle' },
        { name: 'Green Beans & Olive Oil', gramWeight: 80, baseNGNCost: 300, protein: 2, carbs: 6, fat: 6, fiber: 2, sourcingLocation: 'Fresh Veggies' }
      ],
      prepInstructions: [
        'Bake potato at 200°C for 35 mins or microwave for 6 mins until soft.',
        'Sear flank steak 3 minutes per side on high heat, then rest for 5 minutes before slicing.',
        'Blanch green beans in salted water.'
      ]
    }
  ]
};

// Indigenous Evening Meal Prototypes (Light, restorative, high-protein dinners)
const INDIGENOUS_EVENING: Record<Meal['proteinSourceType'], MealBlueprint[]> = {
  fish: [
    {
      title: 'Fresh Catfish Pepper Soup with Boiled Unripe Plantain & Utazi Leaves',
      description: 'Slow-simmered fresh catfish in an aromatic broth infused with calabash nutmeg (ehuru), uda pods, and bitter utazi leaf slivers.',
      visualType: 'stew_swallow',
      style: 'indigenous',
      proteinSourceType: 'fish',
      calories: 420,
      protein: 38,
      carbs: 34,
      fat: 10,
      fiber: 5,
      cookTimeMinutes: 25,
      readyToEatQuery: 'Point and Kill Catfish Pepper Soup',
      ingredients: [
        { name: 'Fresh Catfish Steak', gramWeight: 200, baseNGNCost: 1400, protein: 34, carbs: 0, fat: 9, fiber: 0, sourcingLocation: 'Oyingbo Fish Market' },
        { name: 'Unripe Plantain', gramWeight: 120, baseNGNCost: 350, protein: 2, carbs: 32, fat: 0.3, fiber: 4, sourcingLocation: 'Plantain Stalls' },
        { name: 'Pepper Soup Herbs (Ehuru, Uda, Utazi)', gramWeight: 30, baseNGNCost: 200, protein: 2, carbs: 2, fat: 0.5, fiber: 1, sourcingLocation: 'Spice Shed' }
      ],
      prepInstructions: [
        'Clean fish gently with hot salted water to remove slime.',
        'Simmer with ground ehuru, uda, scent leaves, and broth for 15 minutes.',
        'Serve with fork-tender boiled green plantain.'
      ]
    }
  ],
  poultry: [
    {
      title: 'Smoked Chicken & Fresh Okra Soup with Light Oatmeal Swallow',
      description: 'Chopped crispy baby okra simmered in aromatic seafood stock with shredded smoked chicken breast, served with light oatmeal.',
      visualType: 'stew_swallow',
      style: 'indigenous',
      proteinSourceType: 'poultry',
      calories: 480,
      protein: 42,
      carbs: 46,
      fat: 12,
      fiber: 9,
      cookTimeMinutes: 20,
      readyToEatQuery: 'Ila Alasepo Okra with Chicken',
      ingredients: [
        { name: 'Shredded Smoked Chicken Breast', gramWeight: 160, baseNGNCost: 1100, protein: 36, carbs: 0, fat: 6, fiber: 0, sourcingLocation: 'Poultry Stalls' },
        { name: 'Crisp Baby Okra (Ila)', gramWeight: 150, baseNGNCost: 300, protein: 3, carbs: 8, fat: 0.2, fiber: 5, sourcingLocation: 'Vegetable Stalls' },
        { name: 'Oat Flour / Light Swallow', gramWeight: 70, baseNGNCost: 350, protein: 7, carbs: 38, fat: 3, fiber: 4, sourcingLocation: 'Grain Depot' },
        { name: 'Crayfish & Iru Blend', gramWeight: 20, baseNGNCost: 200, protein: 4, carbs: 0, fat: 2, fiber: 0, sourcingLocation: 'Dry Goods' }
      ],
      prepInstructions: [
        'Pulse fresh okra coarsely for high-viscosity crunch.',
        'Simmer smoked chicken with crayfish broth, then stir-in okra for 4 minutes maximum.',
        'Serve warm alongside freshly whisked oatmeal swallow.'
      ]
    }
  ],
  eggs_dairy: [
    {
      title: 'Steamed Moin-Moin Elewe with Boiled Egg & Warm Veggie Broth',
      description: 'Peeled brown cowpea pudding steamed in broad thaumatococcus leaves with whole boiled egg, flaked fish, and fresh peppers.',
      visualType: 'beans_plantain',
      style: 'indigenous',
      proteinSourceType: 'eggs_dairy',
      calories: 430,
      protein: 28,
      carbs: 48,
      fat: 12,
      fiber: 11,
      cookTimeMinutes: 30,
      readyToEatQuery: 'Moin Moin with Egg',
      ingredients: [
        { name: 'Brown Beans / Cowpeas (Peeled)', gramWeight: 120, baseNGNCost: 500, protein: 18, carbs: 46, fat: 1.5, fiber: 11, sourcingLocation: 'Mile 12 Grain Sheds' },
        { name: 'Boiled Farm Egg (1 Large)', gramWeight: 50, baseNGNCost: 220, protein: 7, carbs: 0.5, fat: 5, fiber: 0, sourcingLocation: 'Egg Crates' },
        { name: 'Peppers, Onions & Vegetable Oil', gramWeight: 50, baseNGNCost: 250, protein: 3, carbs: 2, fat: 5, fiber: 0, sourcingLocation: 'Produce Corner' }
      ],
      prepInstructions: [
        'Blend peeled beans with bell pepper and onions into silky batter.',
        'Fold in boiled egg slices and wrap tightly in clean banana or ewe leaves.',
        'Steam over boiling pot for 30 minutes.'
      ]
    }
  ],
  legumes_plant: [
    {
      title: 'Spiced Ewa Aganyin with Soft Steamed Plantain Medallions',
      description: 'Slow-stewed honey beans mashed buttery soft, accompanied by dark caramelized onion-chili aganyin oil and steamed ripe plantain.',
      visualType: 'beans_plantain',
      style: 'indigenous',
      proteinSourceType: 'legumes_plant',
      calories: 460,
      protein: 24,
      carbs: 68,
      fat: 9,
      fiber: 14,
      cookTimeMinutes: 20,
      readyToEatQuery: 'Ewa Aganyin with Plantain',
      ingredients: [
        { name: 'Nigerian Honey Beans (Oloyin)', gramWeight: 140, baseNGNCost: 550, protein: 20, carbs: 54, fat: 1.5, fiber: 12, sourcingLocation: 'Bodija Beans Shed' },
        { name: 'Steamed Ripe Plantain', gramWeight: 80, baseNGNCost: 250, protein: 1, carbs: 24, fat: 0.2, fiber: 2, sourcingLocation: 'Plantain Sellers' },
        { name: 'Aganyin Pepper & Caramelized Onion Sauce', gramWeight: 35, baseNGNCost: 300, protein: 3, carbs: 2, fat: 7, fiber: 1, sourcingLocation: 'Market Mill' }
      ],
      prepInstructions: [
        'Simmer honey beans until falling-apart soft, then lightly press with wooden spoon.',
        'Top with dark aganyin relish prepared from slow-fried crushed chili and onions.',
        'Garnish with steamed plantain.'
      ]
    }
  ],
  beef_lean: [
    {
      title: 'Char-Grilled Beef Suya Medallions with Cucumber & Tomato Salad',
      description: 'Lean tenderloin strips crusted in spiced kuli-kuli peanut powder, flash-grilled over glowing coals, served with crisp cucumbers.',
      visualType: 'yam_egg_skillet',
      style: 'indigenous',
      proteinSourceType: 'beef_lean',
      calories: 450,
      protein: 44,
      carbs: 18,
      fat: 14,
      fiber: 4,
      cookTimeMinutes: 15,
      readyToEatQuery: 'Beef Suya with Salad',
      ingredients: [
        { name: 'Lean Beef Tenderloin / Sirloin', gramWeight: 170, baseNGNCost: 1500, protein: 38, carbs: 0, fat: 9, fiber: 0, sourcingLocation: 'Abattoir Suya Spot' },
        { name: 'Yaji Suya Spice (Kuli-Kuli, Ginger, Pepper)', gramWeight: 25, baseNGNCost: 200, protein: 4, carbs: 6, fat: 4, fiber: 1, sourcingLocation: 'Mallam Spice Stand' },
        { name: 'Crisp Cucumber & Sweet Red Onion Ribbons', gramWeight: 100, baseNGNCost: 200, protein: 2, carbs: 12, fat: 0.3, fiber: 3, sourcingLocation: 'Perishable Square' }
      ],
      prepInstructions: [
        'Coat thinly sliced sirloin in pressed groundnut oil and yaji seasoning.',
        'Grill over coals or cast-iron skillet for 3 minutes until smokey edges form.',
        'Serve with cold sliced cucumbers and fresh onion rings.'
      ]
    }
  ]
};

// Continental Evening Meal Prototypes (Clean, light, modern dinners)
const CONTINENTAL_EVENING: Record<Meal['proteinSourceType'], MealBlueprint[]> = {
  fish: [
    {
      title: 'Pan-Roasted Sea Bass Fillet with Grilled Zucchini & Quinoa Pilaf',
      description: 'Crispy skin white fish fillet rested on fluffy herbed quinoa with char-grilled zucchini wheels and lemon vinaigrette.',
      visualType: 'chicken_salad',
      style: 'continental',
      proteinSourceType: 'fish',
      calories: 440,
      protein: 38,
      carbs: 36,
      fat: 12,
      fiber: 6,
      cookTimeMinutes: 20,
      readyToEatQuery: 'Sea Bass Quinoa Bowl',
      ingredients: [
        { name: 'White Fish Fillet (Sea Bass / Tilapia)', gramWeight: 180, baseNGNCost: 1300, protein: 34, carbs: 0, fat: 6, fiber: 0, sourcingLocation: 'Fish Counter' },
        { name: 'Cooked Quinoa / Wild Rice', gramWeight: 120, baseNGNCost: 600, protein: 5, carbs: 32, fat: 2, fiber: 4, sourcingLocation: 'Health Food Section' },
        { name: 'Zucchini & Extra Virgin Olive Oil', gramWeight: 90, baseNGNCost: 350, protein: 2, carbs: 4, fat: 4, fiber: 2, sourcingLocation: 'Fresh Produce' }
      ],
      prepInstructions: [
        'Score fish skin and pan-sear in hot skillet for 4 mins skin-side down.',
        'Warm herbed quinoa with parsley and lemon zest.',
        'Plate with grilled zucchini slices.'
      ]
    }
  ],
  poultry: [
    {
      title: 'Herb-Roasted Lemon Chicken Breast with Steamed Broccoli & Sweet Mash',
      description: 'Juicy roasted chicken breast rubbed with rosemary and garlic, served with blanched tenderstem broccoli and smooth sweet potato mash.',
      visualType: 'chicken_salad',
      style: 'continental',
      proteinSourceType: 'poultry',
      calories: 490,
      protein: 46,
      carbs: 38,
      fat: 11,
      fiber: 6,
      cookTimeMinutes: 25,
      readyToEatQuery: 'Roast Chicken Broccoli Meal',
      ingredients: [
        { name: 'Skinless Chicken Breast Fillet', gramWeight: 180, baseNGNCost: 1250, protein: 42, carbs: 0, fat: 4, fiber: 0, sourcingLocation: 'Butcher Shop' },
        { name: 'Orange Sweet Potato (Mashed)', gramWeight: 130, baseNGNCost: 350, protein: 2, carbs: 32, fat: 0.5, fiber: 4, sourcingLocation: 'Produce Aisle' },
        { name: 'Fresh Broccoli Florets', gramWeight: 100, baseNGNCost: 350, protein: 3, carbs: 6, fat: 6, fiber: 3, sourcingLocation: 'Vegetables' }
      ],
      prepInstructions: [
        'Sear chicken breast in olive oil with rosemary, then bake at 190°C for 15 mins.',
        'Steam broccoli for 3 minutes until vibrant emerald green.',
        'Mash sweet potato with sea salt and cracked black pepper.'
      ]
    }
  ],
  eggs_dairy: [
    {
      title: '3-Egg Veggie & Feta Frittata with Avocado Mixed Greens',
      description: 'Fluffy baked egg skillet packed with chopped spinach, cherry tomatoes, and crumbled feta cheese, accompanied by dressed greens.',
      visualType: 'yam_egg_skillet',
      style: 'continental',
      proteinSourceType: 'eggs_dairy',
      calories: 420,
      protein: 29,
      carbs: 14,
      fat: 20,
      fiber: 5,
      cookTimeMinutes: 18,
      readyToEatQuery: 'Spinach Feta Frittata',
      ingredients: [
        { name: 'Farm Fresh Eggs (3 Large)', gramWeight: 150, baseNGNCost: 660, protein: 20, carbs: 1, fat: 14, fiber: 0, sourcingLocation: 'Egg Depot' },
        { name: 'Feta Cheese & Baby Spinach', gramWeight: 70, baseNGNCost: 450, protein: 7, carbs: 3, fat: 6, fiber: 2, sourcingLocation: 'Dairy & Greens' },
        { name: 'Cherry Tomatoes & Avocado Slice', gramWeight: 70, baseNGNCost: 350, protein: 2, carbs: 10, fat: 5, fiber: 3, sourcingLocation: 'Salad Stand' }
      ],
      prepInstructions: [
        'Whisk eggs with a splash of milk, black pepper, and sea salt.',
        'Sauté spinach and tomatoes in oven-safe skillet, pour eggs over and top with feta.',
        'Bake for 10 minutes until set and golden on top.'
      ]
    }
  ],
  legumes_plant: [
    {
      title: 'Spiced Red Lentil & Spinach Curry Bowl with Brown Basmati Rice',
      description: 'Fragrant red lentils slow-simmered in coconut turmeric broth with baby spinach leaves, served over nutty brown basmati rice.',
      visualType: 'beans_plantain',
      style: 'continental',
      proteinSourceType: 'legumes_plant',
      calories: 470,
      protein: 26,
      carbs: 68,
      fat: 9,
      fiber: 13,
      cookTimeMinutes: 20,
      readyToEatQuery: 'Red Lentil Dahl Bowl',
      ingredients: [
        { name: 'Red Split Lentils', gramWeight: 120, baseNGNCost: 550, protein: 21, carbs: 52, fat: 2, fiber: 11, sourcingLocation: 'Pulses Counter' },
        { name: 'Brown Basmati Rice', gramWeight: 60, baseNGNCost: 300, protein: 4, carbs: 36, fat: 1, fiber: 2, sourcingLocation: 'Rice Aisle' },
        { name: 'Light Coconut Milk & Baby Spinach', gramWeight: 80, baseNGNCost: 300, protein: 2, carbs: 4, fat: 6, fiber: 2, sourcingLocation: 'Canned Goods' }
      ],
      prepInstructions: [
        'Simmer lentils with ground turmeric, cumin seeds, garlic, and coconut broth for 15 minutes.',
        'Fold in baby spinach until wilted.',
        'Serve atop steaming brown basmati rice.'
      ]
    }
  ],
  beef_lean: [
    {
      title: 'Tenderloin Steak Strips with Grilled Asparagus & Garlic Mushrooms',
      description: 'Thinly sliced tender sirloin beef flashed in a searing skillet with cracked peppercorn, grilled asparagus spears, and portobello mushrooms.',
      visualType: 'chicken_salad',
      style: 'continental',
      proteinSourceType: 'beef_lean',
      calories: 460,
      protein: 44,
      carbs: 16,
      fat: 15,
      fiber: 5,
      cookTimeMinutes: 15,
      readyToEatQuery: 'Steak & Asparagus Meal',
      ingredients: [
        { name: 'Lean Beef Sirloin / Tenderloin', gramWeight: 170, baseNGNCost: 1600, protein: 40, carbs: 0, fat: 10, fiber: 0, sourcingLocation: 'Butcher Shop' },
        { name: 'Fresh Asparagus Spears', gramWeight: 100, baseNGNCost: 500, protein: 2, carbs: 6, fat: 0.2, fiber: 3, sourcingLocation: 'Fresh Produce' },
        { name: 'Sliced Mushrooms & Garlic Olive Oil', gramWeight: 80, baseNGNCost: 350, protein: 2, carbs: 10, fat: 5, fiber: 2, sourcingLocation: 'Produce Aisle' }
      ],
      prepInstructions: [
        'Sear sirloin strips in garlic-infused olive oil for 2 minutes on high heat.',
        'Char asparagus spears in the same hot pan until grill marks appear.',
        'Toss sliced mushrooms with sea salt and fresh thyme.'
      ]
    }
  ]
};

function getMealPhoto(title: string, visualType: string): string {
  const t = title.toLowerCase();
  if (t.includes('salmon')) {
    return '/src/assets/images/grilled_salmon_1790642194407.jpg';
  }
  if (t.includes('suya') || t.includes('boli') || (t.includes('beef') && t.includes('plantain'))) {
    return '/src/assets/images/beef_suya_boli_1790642205230.jpg';
  }
  if (t.includes('sweet potato') || (t.includes('shakshuka') && t.includes('egg'))) {
    return '/src/assets/images/sweet_potato_eggs_1790642214701.jpg';
  }
  if (t.includes('jollof') || t.includes('rice') || t.includes('quinoa') || visualType === 'jollof_bowl') {
    return '/src/assets/images/jollof_chicken_1790641910111.jpg';
  }
  if (t.includes('swallow') || t.includes('egusi') || t.includes('soup') || visualType === 'stew_swallow') {
    return '/src/assets/images/pounded_yam_egusi_1790641933918.jpg';
  }
  if (t.includes('yam') || visualType === 'yam_egg_skillet') {
    return '/src/assets/images/yam_fish_stew_1790641922409.jpg';
  }
  if (t.includes('bean') || t.includes('moi') || t.includes('plantain') || visualType === 'beans_plantain') {
    return '/src/assets/images/beans_plantain_1790641943763.jpg';
  }
  if (t.includes('oat') || t.includes('parfait') || t.includes('yogurt') || visualType === 'oatmeal_parfait') {
    return '/src/assets/images/oatmeal_parfait_1790641955682.jpg';
  }
  return '/src/assets/images/jollof_chicken_1790641910111.jpg';
}

function getFoodstuffSourcing(countryCode: CountryCode, ingredients: Array<{ name: string; cost: number }>) {
  if (countryCode === 'NG') {
    return [
      {
        item: ingredients[0]?.name || 'Staple Carb',
        marketName: 'Mile 12 Market (Yam & Grains Sheds, Lagos)',
        onlineStoreName: 'Pricepally Direct Farm Delivery',
        onlineStoreUrl: 'https://pricepally.com/',
        unitPrice: `₦${ingredients[0]?.cost || 1200}`
      },
      {
        item: ingredients[1]?.name || 'Fresh Protein',
        marketName: 'Bodija Market / Oyingbo Abattoir & Fish Row',
        onlineStoreName: 'Supermart NG Groceries',
        onlineStoreUrl: 'https://www.supermart.ng/',
        unitPrice: `₦${ingredients[1]?.cost || 1800}`
      },
      {
        item: 'Fresh Pepper, Onion & Cold-Pressed Palm Oil',
        marketName: 'Local Wet Market / Utako Market Abuja',
        onlineStoreName: 'Chowdeck Quick Mart',
        onlineStoreUrl: 'https://chowdeck.com/',
        unitPrice: '₦850'
      }
    ];
  } else if (countryCode === 'UK') {
    return [
      {
        item: ingredients[0]?.name || 'Staple Carb',
        marketName: 'Brixton African Market / Borough Market London',
        onlineStoreName: 'Ocado Fresh Groceries',
        onlineStoreUrl: 'https://www.ocado.com/',
        unitPrice: `£${ingredients[0]?.cost || 3.50}`
      },
      {
        item: ingredients[1]?.name || 'Fresh Protein',
        marketName: 'Tesco / Lidl Meat & Seafood Counter',
        onlineStoreName: 'Tesco Online Grocery',
        onlineStoreUrl: 'https://www.tesco.com/groceries/',
        unitPrice: `£${ingredients[1]?.cost || 5.20}`
      }
    ];
  } else {
    // Every remaining country uses its own markets, currency and delivery partner
    const country = COUNTRIES[countryCode];
    const partner = country.deliveryPartners[0];
    const carbCost = ingredients[0]?.cost || 4.5;
    const proteinCost = ingredients[1]?.cost || 7;

    return [
      {
        item: ingredients[0]?.name || 'Staple Carb',
        marketName: country.defaultMarkets[0],
        onlineStoreName: partner.name,
        onlineStoreUrl: partner.urlPrefix,
        unitPrice: `${country.currencySymbol}${carbCost}`
      },
      {
        item: ingredients[1]?.name || 'Fresh Protein',
        marketName: country.defaultMarkets[1] || country.defaultMarkets[0],
        onlineStoreName: partner.name,
        onlineStoreUrl: partner.urlPrefix,
        unitPrice: `${country.currencySymbol}${proteinCost}`
      }
    ];
  }
}

// Generates the deterministic 28-day rotational plan
export function generate28DayPlan(countryCode: CountryCode, preference: StaplePreference): Meal[] {
  const country = COUNTRIES[countryCode] || COUNTRIES.NG;
  const currencyRateMultiplier = country.code === 'NG'
    ? 1
    : (1 / (COUNTRIES.NG.exchangeRateToUSD / country.exchangeRateToUSD));

  const meals: Meal[] = [];

  // Local cuisine catalogue (undefined for Nigeria, which uses the built-in pools)
  const localCuisine = COUNTRY_CUISINES[country.code] || null;

  for (let day = 1; day <= 28; day++) {
    // Sequential protein rotation: rotates through 5 protein types deterministically
    const proteinIndex = (day - 1) % PROTEIN_ROTATION.length;
    const proteinType = PROTEIN_ROTATION[proteinIndex];

    // Determine style based on user preference or alternate on balanced
    let morningStyle: 'indigenous' | 'continental' = 'indigenous';
    let afternoonStyle: 'indigenous' | 'continental' = 'indigenous';

    if (preference === 'continental') {
      morningStyle = 'continental';
      afternoonStyle = 'continental';
    } else if (preference === 'balanced') {
      // Indigenous mornings, continental afternoons or vice-versa
      morningStyle = day % 2 === 1 ? 'indigenous' : 'continental';
      afternoonStyle = day % 2 === 1 ? 'continental' : 'indigenous';
    } else {
      morningStyle = 'indigenous';
      afternoonStyle = 'indigenous';
    }

    // Prefer the user's own country catalogue for "local" styles; only fall back
    // to the Nigerian/continental pools when no local catalogue exists.
    const localSources = resolveCuisineSources(country.code, morningStyle, afternoonStyle);

    const morningSource = localSources.morning
      ?? (morningStyle === 'indigenous' ? INDIGENOUS_BREAKFASTS : CONTINENTAL_BREAKFASTS);
    const afternoonSource = localSources.afternoon
      ?? (afternoonStyle === 'indigenous' ? INDIGENOUS_AFTERNOONS : CONTINENTAL_AFTERNOONS);

    // Evening follows the morning style, and reuses the local mains when present
    const eveningSource = morningStyle === 'indigenous'
      ? (localCuisine?.mains ?? INDIGENOUS_EVENING)
      : CONTINENTAL_EVENING;

    const morningIsLocal = Boolean(localSources.morning);
    const afternoonIsLocal = Boolean(localSources.afternoon);
    const eveningIsLocal = morningStyle === 'indigenous' && Boolean(localCuisine);

    // Keep authentic in-country sourcing labels for catalogue meals
    const sourcingLabel = (ing: { name: string; sourcingLocation: string }, isLocal: boolean) =>
      isLocal ? ing.sourcingLocation : `${country.defaultMarkets[0]} (${ing.name})`;

    const morningPrototypes = morningSource[proteinType];
    const afternoonPrototypes = afternoonSource[proteinType];

    const morningProto = morningPrototypes[(day - 1) % morningPrototypes.length];
    const afternoonProto = afternoonPrototypes[(day - 1) % afternoonPrototypes.length];

    // Convert costs to regional currency. Every non-Nigerian pool is written on
    // a Naira reference basis, so each country applies its price index to the
    // whole basket — otherwise the shared continental pools land far below the
    // `minimumDailyFloor` declared in countries.ts.
    const priceIndex = localCuisine?.priceIndex ?? 1;
    const formatCost = (baseCost: number) => {
      if (country.code === 'NG') return baseCost;
      const converted = baseCost * currencyRateMultiplier * priceIndex;
      return Math.round(converted * 10) / 10;
    };

    const morningIngredients = morningProto.ingredients.map((ing, idx) => ({
      id: `ing_d${day}_m_${idx}`,
      name: ing.name,
      gramWeight: ing.gramWeight,
      cost: formatCost(ing.baseNGNCost),
      protein: ing.protein,
      carbs: ing.carbs,
      fat: ing.fat,
      fiber: ing.fiber,
      sourcingLocation: country.code === 'NG' ? ing.sourcingLocation : sourcingLabel(ing, morningIsLocal)
    }));

    const afternoonIngredients = afternoonProto.ingredients.map((ing, idx) => ({
      id: `ing_d${day}_a_${idx}`,
      name: ing.name,
      gramWeight: ing.gramWeight,
      cost: formatCost(ing.baseNGNCost),
      protein: ing.protein,
      carbs: ing.carbs,
      fat: ing.fat,
      fiber: ing.fiber,
      sourcingLocation: country.code === 'NG' ? ing.sourcingLocation : sourcingLabel(ing, afternoonIsLocal)
    }));

    const morningTotalCost = Math.round(morningIngredients.reduce((acc, i) => acc + i.cost, 0) * 100) / 100;
    const afternoonTotalCost = Math.round(afternoonIngredients.reduce((acc, i) => acc + i.cost, 0) * 100) / 100;

    // Morning Meal
    meals.push({
      id: `meal_d${day}_morning`,
      dayNumber: day,
      type: 'morning',
      title: morningProto.title,
      description: morningProto.description,
      proteinSourceType: morningProto.proteinSourceType,
      style: morningProto.style,
      visualType: morningProto.visualType,
      imageUrl: getMealPhoto(morningProto.title, morningProto.visualType),
      foodstuffMarketSourcing: getFoodstuffSourcing(country.code, morningIngredients),
      calories: morningProto.calories,
      protein: morningProto.protein,
      carbs: morningProto.carbs,
      fat: morningProto.fat,
      fiber: morningProto.fiber,
      estimatedCost: morningTotalCost,
      cookTimeMinutes: morningProto.cookTimeMinutes,
      readyToEatDeliveryQuery: morningProto.readyToEatQuery,
      ingredients: morningIngredients,
      prepInstructions: morningProto.prepInstructions,
      photoVerified: false
    });

    // Afternoon Meal
    meals.push({
      id: `meal_d${day}_afternoon`,
      dayNumber: day,
      type: 'afternoon',
      title: afternoonProto.title,
      description: afternoonProto.description,
      proteinSourceType: afternoonProto.proteinSourceType,
      style: afternoonProto.style,
      visualType: afternoonProto.visualType,
      imageUrl: getMealPhoto(afternoonProto.title, afternoonProto.visualType),
      foodstuffMarketSourcing: getFoodstuffSourcing(country.code, afternoonIngredients),
      calories: afternoonProto.calories,
      protein: afternoonProto.protein,
      carbs: afternoonProto.carbs,
      fat: afternoonProto.fat,
      fiber: afternoonProto.fiber,
      estimatedCost: afternoonTotalCost,
      cookTimeMinutes: afternoonProto.cookTimeMinutes,
      readyToEatDeliveryQuery: afternoonProto.readyToEatQuery,
      ingredients: afternoonIngredients,
      prepInstructions: afternoonProto.prepInstructions,
      photoVerified: false
    });

    // Evening Meal (Dinner) — eveningSource resolved above
    const eveningPrototypes = eveningSource[proteinType];
    const eveningProto = eveningPrototypes[(day - 1) % eveningPrototypes.length];

    const eveningIngredients = eveningProto.ingredients.map((ing, idx) => ({
      id: `ing_d${day}_e_${idx}`,
      name: ing.name,
      gramWeight: ing.gramWeight,
      cost: formatCost(ing.baseNGNCost),
      protein: ing.protein,
      carbs: ing.carbs,
      fat: ing.fat,
      fiber: ing.fiber,
      sourcingLocation: country.code === 'NG' ? ing.sourcingLocation : sourcingLabel(ing, eveningIsLocal)
    }));

    const eveningTotalCost = Math.round(eveningIngredients.reduce((acc, i) => acc + i.cost, 0) * 100) / 100;

    meals.push({
      id: `meal_d${day}_evening`,
      dayNumber: day,
      type: 'evening',
      title: eveningProto.title,
      description: eveningProto.description,
      proteinSourceType: eveningProto.proteinSourceType,
      style: eveningProto.style,
      visualType: eveningProto.visualType,
      imageUrl: getMealPhoto(eveningProto.title, eveningProto.visualType),
      foodstuffMarketSourcing: getFoodstuffSourcing(country.code, eveningIngredients),
      calories: eveningProto.calories,
      protein: eveningProto.protein,
      carbs: eveningProto.carbs,
      fat: eveningProto.fat,
      fiber: eveningProto.fiber,
      estimatedCost: eveningTotalCost,
      cookTimeMinutes: eveningProto.cookTimeMinutes,
      readyToEatDeliveryQuery: eveningProto.readyToEatQuery,
      ingredients: eveningIngredients,
      prepInstructions: eveningProto.prepInstructions,
      photoVerified: false
    });
  }

  return meals;
}
