/**
 * Extra dishes for the shared continental pools.
 *
 * These three pools are shared by every market using a continental or balanced
 * plan, and each also held one dish per protein per slot. Two extra per protein
 * per slot brings every one of them to three.
 */
import type { MealBlueprint } from '../types';

export type ProteinKey = MealBlueprint['proteinSourceType'];

export const CONTINENTAL_POOL_EXTRAS: Record<string, Record<ProteinKey, MealBlueprint[]>> = {
  morning: {
    fish: [
      {
        title: 'Smoked Salmon & Scrambled Eggs on Rye',
        description: 'Soft scrambled eggs topped with smoked salmon on buttered rye.',
        visualType: 'yam_egg_skillet',
        style: 'continental',
        proteinSourceType: 'fish',
        calories: 520,
        protein: 34,
        carbs: 34,
        fat: 26,
        fiber: 5,
        cookTimeMinutes: 20,
        readyToEatQuery: 'Smoked Salmon and Scrambled Eggs',
        ingredients: [
          { name: 'Eggs', gramWeight: 150, baseNGNCost: 560, protein: 16, carbs: 1, fat: 11, fiber: 0, sourcingLocation: 'St. Lawrence Dairy' },
          { name: 'Smoked Salmon', gramWeight: 90, baseNGNCost: 1200, protein: 20, carbs: 0, fat: 4, fiber: 0, sourcingLocation: 'St. Lawrence Fish Market' },
          { name: 'Rye Bread', gramWeight: 80, baseNGNCost: 190, protein: 5, carbs: 32, fat: 2, fiber: 4, sourcingLocation: 'St. Lawrence Bakeries' },
          { name: 'Butter & Chives', gramWeight: 25, baseNGNCost: 180, protein: 0, carbs: 0, fat: 19, fiber: 1, sourcingLocation: 'St. Lawrence Dairy' },
        ],
        prepInstructions: [
          'Scramble the eggs softly.',
          'Layer onto buttered rye and top with salmon and chives.',
        ]
      },
      {
        title: 'Grilled Trout with Herbed Potatoes & Lemon',
        description: 'A grilled trout fillet with buttered potatoes and a lemon dressing.',
        visualType: 'grilled_fish',
        style: 'continental',
        proteinSourceType: 'fish',
        calories: 540,
        protein: 36,
        carbs: 44,
        fat: 22,
        fiber: 7,
        cookTimeMinutes: 35,
        readyToEatQuery: 'Grilled Trout with Potatoes',
        ingredients: [
          { name: 'Trout Fillet', gramWeight: 180, baseNGNCost: 1900, protein: 36, carbs: 0, fat: 7, fiber: 0, sourcingLocation: 'St. Lawrence Fish Market' },
          { name: 'Potatoes', gramWeight: 220, baseNGNCost: 420, protein: 5, carbs: 44, fat: 10, fiber: 5, sourcingLocation: 'St. Lawrence Market Produce' },
          { name: 'Butter & Herbs', gramWeight: 30, baseNGNCost: 220, protein: 0, carbs: 0, fat: 24, fiber: 1, sourcingLocation: 'St. Lawrence Dairy' },
          { name: 'Lemon', gramWeight: 30, baseNGNCost: 120, protein: 0, carbs: 2, fat: 6, fiber: 1, sourcingLocation: 'St. Lawrence Market Produce' },
        ],
        prepInstructions: [
          'Grill the trout until the skin crisps.',
          'Boil the potatoes and toss them in herb butter.',
          'Serve with lemon.',
        ]
      }
    ],
    poultry: [
      {
        title: 'Turkey & Avocado Breakfast Wrap',
        description: 'Sliced turkey and avocado rolled in a warm tortilla.',
        visualType: 'chicken_salad',
        style: 'continental',
        proteinSourceType: 'poultry',
        calories: 520,
        protein: 32,
        carbs: 42,
        fat: 23,
        fiber: 10,
        cookTimeMinutes: 20,
        readyToEatQuery: 'Turkey and Avocado Wrap',
        ingredients: [
          { name: 'Turkey Breast', gramWeight: 130, baseNGNCost: 1150, protein: 30, carbs: 0, fat: 4, fiber: 0, sourcingLocation: 'Boreal Game & Poultry' },
          { name: 'Flour Tortilla', gramWeight: 90, baseNGNCost: 190, protein: 3, carbs: 38, fat: 3, fiber: 3, sourcingLocation: 'St. Lawrence Bakeries' },
          { name: 'Avocado', gramWeight: 110, baseNGNCost: 320, protein: 3, carbs: 10, fat: 24, fiber: 7, sourcingLocation: 'St. Lawrence Market Produce' },
          { name: 'Spinach & Tomato', gramWeight: 120, baseNGNCost: 200, protein: 3, carbs: 12, fat: 3, fiber: 5, sourcingLocation: 'St. Lawrence Market Produce' },
        ],
        prepInstructions: [
          'Warm the tortilla and fill with turkey, avocado, spinach and tomato.',
          'Roll tightly and serve.',
        ]
      },
      {
        title: 'Poached Eggs on Herbed Toast with Chicken',
        description: 'Poached eggs on herbed toast with shredded chicken and watercress.',
        visualType: 'yam_egg_skillet',
        style: 'continental',
        proteinSourceType: 'poultry',
        calories: 500,
        protein: 34,
        carbs: 36,
        fat: 24,
        fiber: 7,
        cookTimeMinutes: 30,
        readyToEatQuery: 'Poached Eggs with Chicken',
        ingredients: [
          { name: 'Eggs', gramWeight: 150, baseNGNCost: 560, protein: 16, carbs: 1, fat: 11, fiber: 0, sourcingLocation: 'St. Lawrence Dairy' },
          { name: 'Chicken Breast', gramWeight: 120, baseNGNCost: 900, protein: 28, carbs: 0, fat: 4, fiber: 0, sourcingLocation: 'St. Lawrence Poultry' },
          { name: 'Sourdough Toast', gramWeight: 80, baseNGNCost: 190, protein: 7, carbs: 34, fat: 2, fiber: 3, sourcingLocation: 'St. Lawrence Bakeries' },
          { name: 'Watercress & Herbs', gramWeight: 60, baseNGNCost: 140, protein: 3, carbs: 6, fat: 3, fiber: 3, sourcingLocation: 'St. Lawrence Market Produce' },
        ],
        prepInstructions: [
          'Poach the eggs until the whites are just set.',
          'Toast the bread and top with shredded chicken.',
          'Add the eggs and watercress.',
        ]
      }
    ],
    eggs_dairy: [
      {
        title: 'Ricotta & Berry Toast with Honey',
        description: 'Whipped ricotta on toast with warm berries and a drizzle of honey.',
        visualType: 'oatmeal_parfait',
        style: 'continental',
        proteinSourceType: 'eggs_dairy',
        calories: 490,
        protein: 17,
        carbs: 54,
        fat: 20,
        fiber: 7,
        cookTimeMinutes: 15,
        readyToEatQuery: 'Ricotta and Berry Toast',
        ingredients: [
          { name: 'Sourdough Toast', gramWeight: 90, baseNGNCost: 200, protein: 7, carbs: 34, fat: 2, fiber: 3, sourcingLocation: 'St. Lawrence Bakeries' },
          { name: 'Ricotta', gramWeight: 100, baseNGNCost: 340, protein: 11, carbs: 6, fat: 22, fiber: 0, sourcingLocation: 'St. Lawrence Dairy' },
          { name: 'Mixed Berries', gramWeight: 130, baseNGNCost: 270, protein: 1, carbs: 28, fat: 1, fiber: 6, sourcingLocation: 'St. Lawrence Market Produce' },
          { name: 'Honey', gramWeight: 30, baseNGNCost: 140, protein: 0, carbs: 16, fat: 0, fiber: 0, sourcingLocation: 'St. Lawrence Market Pantry' },
        ],
        prepInstructions: [
          'Whip the ricotta smooth and spread on toast.',
          'Top with warm berries and drizzle with honey.',
        ]
      },
      {
        title: 'Spinach & Ricotta Omelette with Toast',
        description: 'A soft omelette filled with spinach and ricotta, served with toast.',
        visualType: 'yam_egg_skillet',
        style: 'continental',
        proteinSourceType: 'eggs_dairy',
        calories: 520,
        protein: 27,
        carbs: 38,
        fat: 26,
        fiber: 7,
        cookTimeMinutes: 25,
        readyToEatQuery: 'Spinach and Ricotta Omelette',
        ingredients: [
          { name: 'Eggs', gramWeight: 160, baseNGNCost: 600, protein: 17, carbs: 1, fat: 12, fiber: 0, sourcingLocation: 'St. Lawrence Dairy' },
          { name: 'Spinach', gramWeight: 120, baseNGNCost: 240, protein: 5, carbs: 12, fat: 3, fiber: 7, sourcingLocation: 'St. Lawrence Market Produce' },
          { name: 'Ricotta', gramWeight: 80, baseNGNCost: 270, protein: 9, carbs: 5, fat: 18, fiber: 0, sourcingLocation: 'St. Lawrence Dairy' },
          { name: 'Toast', gramWeight: 80, baseNGNCost: 190, protein: 4, carbs: 32, fat: 2, fiber: 3, sourcingLocation: 'St. Lawrence Bakeries' },
        ],
        prepInstructions: [
          'Wilt the spinach and beat it into the eggs with the ricotta.',
          'Cook the omelette softly and fold.',
          'Serve with toast.',
        ]
      }
    ],
    legumes_plant: [
      {
        title: 'Chickpea Scramble with Feta & Toast',
        description: 'Chickpeas scrambled with eggs, feta and herbs, on toasted sourdough.',
        visualType: 'beans_plantain',
        style: 'continental',
        proteinSourceType: 'legumes_plant',
        calories: 540,
        protein: 24,
        carbs: 48,
        fat: 24,
        fiber: 15,
        cookTimeMinutes: 25,
        readyToEatQuery: 'Chickpea Scramble with Feta',
        ingredients: [
          { name: 'Eggs', gramWeight: 140, baseNGNCost: 520, protein: 15, carbs: 1, fat: 11, fiber: 0, sourcingLocation: 'St. Lawrence Dairy' },
          { name: 'Chickpeas', gramWeight: 150, baseNGNCost: 450, protein: 11, carbs: 36, fat: 3, fiber: 11, sourcingLocation: 'St. Lawrence Market Beans' },
          { name: 'Feta', gramWeight: 50, baseNGNCost: 210, protein: 5, carbs: 2, fat: 15, fiber: 0, sourcingLocation: 'St. Lawrence Cheese Counter' },
          { name: 'Sourdough Toast', gramWeight: 80, baseNGNCost: 190, protein: 7, carbs: 34, fat: 2, fiber: 3, sourcingLocation: 'St. Lawrence Bakeries' },
        ],
        prepInstructions: [
          'Fold the chickpeas into whisked eggs and scramble.',
          'Crumble in the feta and herbs.',
          'Serve on toast.',
        ]
      },
      {
        title: 'Black Bean & Avocado Bowl with Lime',
        description: 'Warm spiced black beans with avocado, tomato and lime on soft greens.',
        visualType: 'beans_plantain',
        style: 'continental',
        proteinSourceType: 'legumes_plant',
        calories: 520,
        protein: 19,
        carbs: 58,
        fat: 20,
        fiber: 20,
        cookTimeMinutes: 25,
        readyToEatQuery: 'Black Bean and Avocado Bowl',
        ingredients: [
          { name: 'Black Beans', gramWeight: 200, baseNGNCost: 440, protein: 15, carbs: 42, fat: 1, fiber: 13, sourcingLocation: 'St. Lawrence Market Beans' },
          { name: 'Avocado', gramWeight: 110, baseNGNCost: 330, protein: 3, carbs: 10, fat: 25, fiber: 7, sourcingLocation: 'St. Lawrence Market Produce' },
          { name: 'Tomato & Onion', gramWeight: 140, baseNGNCost: 200, protein: 3, carbs: 16, fat: 3, fiber: 5, sourcingLocation: 'St. Lawrence Market Produce' },
          { name: 'Lime & Coriander', gramWeight: 20, baseNGNCost: 110, protein: 0, carbs: 4, fat: 2, fiber: 1, sourcingLocation: 'St. Lawrence Market Produce' },
        ],
        prepInstructions: [
          'Warm the beans with cumin and salt.',
          'Spoon over greens with sliced avocado and tomato.',
          'Finish with lime and coriander.',
        ]
      }
    ],
    beef_lean: [
      {
        title: 'Sirloin & Scrambled Eggs with Hash Brown',
        description: 'Sliced sirloin with scrambled eggs and a crisp hash brown.',
        visualType: 'grilled_fish',
        style: 'continental',
        proteinSourceType: 'beef_lean',
        calories: 620,
        protein: 44,
        carbs: 42,
        fat: 30,
        fiber: 6,
        cookTimeMinutes: 30,
        readyToEatQuery: 'Sirloin with Scrambled Eggs',
        ingredients: [
          { name: 'Sirloin Steak', gramWeight: 160, baseNGNCost: 2050, protein: 40, carbs: 0, fat: 12, fiber: 0, sourcingLocation: 'St. Lawrence Butchers' },
          { name: 'Eggs', gramWeight: 140, baseNGNCost: 520, protein: 15, carbs: 1, fat: 11, fiber: 0, sourcingLocation: 'St. Lawrence Dairy' },
          { name: 'Hash Brown', gramWeight: 180, baseNGNCost: 340, protein: 4, carbs: 40, fat: 9, fiber: 4, sourcingLocation: 'St. Lawrence Market Produce' },
          { name: 'Chives & Butter', gramWeight: 25, baseNGNCost: 190, protein: 0, carbs: 0, fat: 18, fiber: 1, sourcingLocation: 'St. Lawrence Dairy' },
        ],
        prepInstructions: [
          'Grill and slice the sirloin.',
          'Scramble the eggs with chives.',
          'Serve with a crisp hash brown.',
        ]
      },
      {
        title: 'Beef Patty Melt with Pickles',
        description: 'A griddled beef patty with melted cheese and pickles in a bun.',
        visualType: 'chicken_salad',
        style: 'continental',
        proteinSourceType: 'beef_lean',
        calories: 640,
        protein: 40,
        carbs: 46,
        fat: 32,
        fiber: 6,
        cookTimeMinutes: 30,
        readyToEatQuery: 'Beef Patty Melt with Pickles',
        ingredients: [
          { name: 'Beef Patty', gramWeight: 170, baseNGNCost: 1800, protein: 36, carbs: 0, fat: 16, fiber: 0, sourcingLocation: 'St. Lawrence Butchers' },
          { name: 'Cheddar', gramWeight: 50, baseNGNCost: 260, protein: 6, carbs: 1, fat: 19, fiber: 0, sourcingLocation: 'St. Lawrence Cheese Counter' },
          { name: 'Brioche Bun', gramWeight: 90, baseNGNCost: 200, protein: 8, carbs: 38, fat: 5, fiber: 3, sourcingLocation: 'St. Lawrence Bakeries' },
          { name: 'Pickles & Mustard', gramWeight: 80, baseNGNCost: 140, protein: 1, carbs: 8, fat: 4, fiber: 2, sourcingLocation: 'St. Lawrence Market Pantry' },
        ],
        prepInstructions: [
          'Griddle the patty and melt the cheddar on top.',
          'Toast the bun and spread with mustard.',
          'Serve with pickles.',
        ]
      }
    ]
  },
  afternoon: {
    fish: [
      {
        title: 'Seared Tuna Niçoise Salad',
        description: 'Seared tuna with green beans, egg, olives and new potatoes.',
        visualType: 'chicken_salad',
        style: 'continental',
        proteinSourceType: 'fish',
        calories: 590,
        protein: 40,
        carbs: 36,
        fat: 28,
        fiber: 9,
        cookTimeMinutes: 40,
        readyToEatQuery: 'Seared Tuna Nicoise Salad',
        ingredients: [
          { name: 'Tuna Steak', gramWeight: 180, baseNGNCost: 2200, protein: 40, carbs: 0, fat: 6, fiber: 0, sourcingLocation: 'St. Lawrence Fish Market' },
          { name: 'Green Beans', gramWeight: 150, baseNGNCost: 300, protein: 6, carbs: 20, fat: 2, fiber: 6, sourcingLocation: 'St. Lawrence Market Produce' },
          { name: 'New Potatoes', gramWeight: 180, baseNGNCost: 340, protein: 5, carbs: 40, fat: 9, fiber: 5, sourcingLocation: 'St. Lawrence Market Produce' },
          { name: 'Egg, Olive & Lettuce', gramWeight: 130, baseNGNCost: 340, protein: 10, carbs: 7, fat: 20, fiber: 3, sourcingLocation: 'St. Lawrence Market Produce' },
        ],
        prepInstructions: [
          'Sear the tuna briefly on each side and slice.',
          'Boil the potatoes and blanch the beans.',
          'Arrange with sliced egg, olives and lettuce.',
        ]
      },
      {
        title: 'Baked Cod with Lemon Potatoes & Greens',
        description: 'Cod baked with lemon and herbs, with roasted potatoes and greens.',
        visualType: 'grilled_fish',
        style: 'continental',
        proteinSourceType: 'fish',
        calories: 570,
        protein: 44,
        carbs: 50,
        fat: 20,
        fiber: 9,
        cookTimeMinutes: 40,
        readyToEatQuery: 'Baked Cod with Lemon Potatoes',
        ingredients: [
          { name: 'Cod Fillet', gramWeight: 220, baseNGNCost: 2000, protein: 44, carbs: 0, fat: 2, fiber: 0, sourcingLocation: 'St. Lawrence Fish Market' },
          { name: 'Roast Potatoes', gramWeight: 220, baseNGNCost: 420, protein: 5, carbs: 46, fat: 10, fiber: 5, sourcingLocation: 'St. Lawrence Market Produce' },
          { name: 'Lemon & Herbs', gramWeight: 30, baseNGNCost: 150, protein: 0, carbs: 2, fat: 13, fiber: 1, sourcingLocation: 'St. Lawrence Market Pantry' },
          { name: 'Braised Greens', gramWeight: 150, baseNGNCost: 280, protein: 6, carbs: 12, fat: 7, fiber: 7, sourcingLocation: 'St. Lawrence Market Produce' },
        ],
        prepInstructions: [
          'Bake the cod with lemon, garlic and herbs until flaking.',
          'Roast the potatoes until golden.',
          'Braise the greens and serve alongside.',
        ]
      }
    ],
    poultry: [
      {
        title: 'Lemon Chicken Traybake with Couscous',
        description: 'Chicken and vegetables roasted on one tray, served with couscous.',
        visualType: 'grilled_fish',
        style: 'continental',
        proteinSourceType: 'poultry',
        calories: 620,
        protein: 44,
        carbs: 56,
        fat: 24,
        fiber: 9,
        cookTimeMinutes: 55,
        readyToEatQuery: 'Lemon Chicken Traybake',
        ingredients: [
          { name: 'Chicken Thighs', gramWeight: 200, baseNGNCost: 1500, protein: 42, carbs: 0, fat: 11, fiber: 0, sourcingLocation: 'St. Lawrence Poultry' },
          { name: 'Couscous', gramWeight: 180, baseNGNCost: 480, protein: 8, carbs: 62, fat: 2, fiber: 5, sourcingLocation: 'Whole Foods Canada' },
          { name: 'Pepper & Courgette', gramWeight: 200, baseNGNCost: 380, protein: 6, carbs: 22, fat: 10, fiber: 8, sourcingLocation: 'St. Lawrence Market Produce' },
          { name: 'Lemon & Olive Oil', gramWeight: 40, baseNGNCost: 200, protein: 0, carbs: 3, fat: 18, fiber: 1, sourcingLocation: 'St. Lawrence Market Pantry' },
        ],
        prepInstructions: [
          'Toss the chicken and vegetables in lemon and oil.',
          'Roast on one tray until browned.',
          'Serve over couscous.',
        ]
      },
      {
        title: 'Chicken Caesar Wrap with Parmesan',
        description: 'Grilled chicken, romaine and parmesan in a tortilla.',
        visualType: 'chicken_salad',
        style: 'continental',
        proteinSourceType: 'poultry',
        calories: 590,
        protein: 42,
        carbs: 48,
        fat: 26,
        fiber: 8,
        cookTimeMinutes: 25,
        readyToEatQuery: 'Chicken Caesar Wrap',
        ingredients: [
          { name: 'Chicken Breast', gramWeight: 170, baseNGNCost: 1280, protein: 40, carbs: 0, fat: 5, fiber: 0, sourcingLocation: 'St. Lawrence Poultry' },
          { name: 'Flour Tortilla', gramWeight: 100, baseNGNCost: 220, protein: 3, carbs: 42, fat: 3, fiber: 3, sourcingLocation: 'St. Lawrence Bakeries' },
          { name: 'Romaine & Parmesan', gramWeight: 150, baseNGNCost: 340, protein: 10, carbs: 8, fat: 20, fiber: 5, sourcingLocation: 'St. Lawrence Market Produce' },
          { name: 'Caesar Dressing', gramWeight: 50, baseNGNCost: 220, protein: 1, carbs: 3, fat: 20, fiber: 0, sourcingLocation: 'St. Lawrence Market Pantry' },
        ],
        prepInstructions: [
          'Grill the chicken and slice it.',
          'Toss the romaine with dressing and parmesan.',
          'Fill the warmed tortilla and roll.',
        ]
      }
    ],
    eggs_dairy: [
      {
        title: 'Spinach & Ricotta Cannelloni',
        description: 'Pasta tubes filled with spinach and ricotta, baked in tomato sauce.',
        visualType: 'pasta_medley',
        style: 'continental',
        proteinSourceType: 'eggs_dairy',
        calories: 640,
        protein: 28,
        carbs: 70,
        fat: 24,
        fiber: 10,
        cookTimeMinutes: 55,
        readyToEatQuery: 'Spinach and Ricotta Cannelloni',
        ingredients: [
          { name: 'Cannelloni Pasta', gramWeight: 180, baseNGNCost: 340, protein: 10, carbs: 64, fat: 2, fiber: 4, sourcingLocation: 'Whole Foods Canada' },
          { name: 'Ricotta', gramWeight: 150, baseNGNCost: 500, protein: 17, carbs: 9, fat: 33, fiber: 0, sourcingLocation: 'St. Lawrence Dairy' },
          { name: 'Spinach', gramWeight: 150, baseNGNCost: 300, protein: 6, carbs: 14, fat: 4, fiber: 7, sourcingLocation: 'St. Lawrence Market Produce' },
          { name: 'Tomato Sauce', gramWeight: 200, baseNGNCost: 280, protein: 5, carbs: 24, fat: 7, fiber: 5, sourcingLocation: 'St. Lawrence Market Pantry' },
        ],
        prepInstructions: [
          'Blanch the spinach and mix with the ricotta.',
          'Stuff the pasta tubes and lay them in the sauce.',
          'Bake until bubbling and set.',
        ]
      },
      {
        title: 'Three-Cheese Pasta Bake',
        description: 'Pasta baked with cheddar, mozzarella and parmesan in a tomato sauce.',
        visualType: 'pasta_medley',
        style: 'continental',
        proteinSourceType: 'eggs_dairy',
        calories: 680,
        protein: 30,
        carbs: 76,
        fat: 26,
        fiber: 9,
        cookTimeMinutes: 50,
        readyToEatQuery: 'Three Cheese Pasta Bake',
        ingredients: [
          { name: 'Pasta', gramWeight: 200, baseNGNCost: 360, protein: 12, carbs: 72, fat: 2, fiber: 5, sourcingLocation: 'Whole Foods Canada' },
          { name: 'Cheddar & Mozzarella', gramWeight: 110, baseNGNCost: 560, protein: 20, carbs: 6, fat: 42, fiber: 0, sourcingLocation: 'St. Lawrence Cheese Counter' },
          { name: 'Parmesan', gramWeight: 30, baseNGNCost: 200, protein: 6, carbs: 1, fat: 15, fiber: 0, sourcingLocation: 'St. Lawrence Cheese Counter' },
          { name: 'Tomato Sauce', gramWeight: 200, baseNGNCost: 280, protein: 5, carbs: 24, fat: 7, fiber: 5, sourcingLocation: 'St. Lawrence Market Pantry' },
        ],
        prepInstructions: [
          'Boil the pasta and mix through half the cheese and the sauce.',
          'Top with the remaining cheese.',
          'Bake until golden and bubbling.',
        ]
      }
    ],
    legumes_plant: [
      {
        title: 'Lentil & Roast Squash Bowl with Tahini',
        description: 'Roasted squash and lentils over grains, with a lemon tahini dressing.',
        visualType: 'chicken_salad',
        style: 'continental',
        proteinSourceType: 'legumes_plant',
        calories: 590,
        protein: 24,
        carbs: 72,
        fat: 22,
        fiber: 18,
        cookTimeMinutes: 45,
        readyToEatQuery: 'Lentil and Roast Squash Bowl',
        ingredients: [
          { name: 'Green Lentils', gramWeight: 200, baseNGNCost: 520, protein: 18, carbs: 40, fat: 2, fiber: 14, sourcingLocation: 'St. Lawrence Market Pulses' },
          { name: 'Roast Squash', gramWeight: 220, baseNGNCost: 380, protein: 5, carbs: 48, fat: 10, fiber: 8, sourcingLocation: 'St. Lawrence Market Produce' },
          { name: 'Grains', gramWeight: 150, baseNGNCost: 440, protein: 7, carbs: 58, fat: 3, fiber: 7, sourcingLocation: 'Manitoba Grain Company' },
          { name: 'Lemon Tahini Dressing', gramWeight: 50, baseNGNCost: 220, protein: 3, carbs: 4, fat: 20, fiber: 2, sourcingLocation: 'St. Lawrence Market Pantry' },
        ],
        prepInstructions: [
          'Roast the squash until caramelised.',
          'Cook the lentils and grains.',
          'Serve with the lemon tahini dressing.',
        ]
      },
      {
        title: 'Chickpea Stew with Couscous & Spinach',
        description: 'A slow-cooked chickpea and tomato stew, served with couscous and spinach.',
        visualType: 'stew_swallow',
        style: 'continental',
        proteinSourceType: 'legumes_plant',
        calories: 610,
        protein: 22,
        carbs: 76,
        fat: 20,
        fiber: 20,
        cookTimeMinutes: 45,
        readyToEatQuery: 'Chickpea Stew with Couscous',
        ingredients: [
          { name: 'Chickpeas', gramWeight: 200, baseNGNCost: 600, protein: 16, carbs: 48, fat: 4, fiber: 14, sourcingLocation: 'St. Lawrence Market Beans' },
          { name: 'Tomato & Onion Stew', gramWeight: 220, baseNGNCost: 340, protein: 6, carbs: 28, fat: 9, fiber: 5, sourcingLocation: 'St. Lawrence Market Produce' },
          { name: 'Couscous', gramWeight: 170, baseNGNCost: 460, protein: 8, carbs: 58, fat: 2, fiber: 5, sourcingLocation: 'Whole Foods Canada' },
          { name: 'Spinach', gramWeight: 120, baseNGNCost: 240, protein: 5, carbs: 12, fat: 3, fiber: 7, sourcingLocation: 'St. Lawrence Market Produce' },
        ],
        prepInstructions: [
          'Simmer the chickpeas with tomato, onion and spices until thick.',
          'Cook the couscous.',
          'Fold the spinach through and serve.',
        ]
      }
    ],
    beef_lean: [
      {
        title: 'Beef & Ale Flatbread with Onion',
        description: 'Spiced minced beef and caramelised onion on a crisp flatbread.',
        visualType: 'grilled_fish',
        style: 'continental',
        proteinSourceType: 'beef_lean',
        calories: 660,
        protein: 40,
        carbs: 62,
        fat: 26,
        fiber: 8,
        cookTimeMinutes: 40,
        readyToEatQuery: 'Beef and Ale Flatbread',
        ingredients: [
          { name: 'Lean Beef Mince', gramWeight: 170, baseNGNCost: 1850, protein: 38, carbs: 0, fat: 12, fiber: 0, sourcingLocation: 'St. Lawrence Butchers' },
          { name: 'Flatbread', gramWeight: 140, baseNGNCost: 340, protein: 8, carbs: 48, fat: 8, fiber: 4, sourcingLocation: 'St. Lawrence Bakeries' },
          { name: 'Caramelised Onion', gramWeight: 150, baseNGNCost: 240, protein: 3, carbs: 20, fat: 7, fiber: 5, sourcingLocation: 'St. Lawrence Market Produce' },
          { name: 'Dark Ale Glaze', gramWeight: 40, baseNGNCost: 140, protein: 1, carbs: 8, fat: 1, fiber: 0, sourcingLocation: 'St. Lawrence Market Pantry' },
        ],
        prepInstructions: [
          'Caramelise the onions slowly in fat.',
          'Add the spiced mince and the ale, then reduce.',
          'Spread over the flatbread and bake until crisp.',
        ]
      },
      {
        title: 'Steak Frites with Green Salad',
        description: 'Grilled sirloin with chips and a dressed green salad.',
        visualType: 'grilled_fish',
        style: 'continental',
        proteinSourceType: 'beef_lean',
        calories: 650,
        protein: 44,
        carbs: 52,
        fat: 28,
        fiber: 8,
        cookTimeMinutes: 35,
        readyToEatQuery: 'Steak Frites with Green Salad',
        ingredients: [
          { name: 'Sirloin Steak', gramWeight: 170, baseNGNCost: 2100, protein: 42, carbs: 0, fat: 13, fiber: 0, sourcingLocation: 'St. Lawrence Butchers' },
          { name: 'Chips', gramWeight: 230, baseNGNCost: 440, protein: 6, carbs: 50, fat: 12, fiber: 5, sourcingLocation: 'St. Lawrence Market Produce' },
          { name: 'Green Salad', gramWeight: 150, baseNGNCost: 280, protein: 3, carbs: 12, fat: 14, fiber: 5, sourcingLocation: 'St. Lawrence Market Produce' },
          { name: 'Garlic Butter', gramWeight: 30, baseNGNCost: 220, protein: 0, carbs: 0, fat: 24, fiber: 0, sourcingLocation: 'St. Lawrence Dairy' },
        ],
        prepInstructions: [
          'Grill the steak to taste and rest it.',
          'Fry the chips until crisp.',
          'Serve with salad and garlic butter.',
        ]
      }
    ]
  },
  evening: {
    fish: [
      {
        title: 'Miso Glazed Salmon with Sesame Greens',
        description: 'Salmon glazed with miso, served with sesame greens and rice.',
        visualType: 'grilled_fish',
        style: 'continental',
        proteinSourceType: 'fish',
        calories: 620,
        protein: 44,
        carbs: 50,
        fat: 26,
        fiber: 8,
        cookTimeMinutes: 30,
        readyToEatQuery: 'Miso Glazed Salmon',
        ingredients: [
          { name: 'Salmon Fillet', gramWeight: 200, baseNGNCost: 1950, protein: 42, carbs: 0, fat: 12, fiber: 0, sourcingLocation: 'St. Lawrence Fish Market' },
          { name: 'Miso Glaze', gramWeight: 40, baseNGNCost: 180, protein: 3, carbs: 12, fat: 10, fiber: 2, sourcingLocation: 'St. Lawrence Market Pantry' },
          { name: 'Sesame Greens', gramWeight: 180, baseNGNCost: 320, protein: 7, carbs: 14, fat: 14, fiber: 8, sourcingLocation: 'St. Lawrence Market Produce' },
          { name: 'Rice', gramWeight: 160, baseNGNCost: 340, protein: 6, carbs: 50, fat: 1, fiber: 2, sourcingLocation: 'St. Lawrence Rice Importers' },
        ],
        prepInstructions: [
          'Brush the salmon with the miso glaze and grill until caramelised.',
          'Sauté the greens with sesame.',
          'Serve with rice.',
        ]
      },
      {
        title: 'Seared Scallops with Pea Puree',
        description: 'Pan-seared scallops on a smooth pea puree with buttered greens.',
        visualType: 'grilled_fish',
        style: 'continental',
        proteinSourceType: 'fish',
        calories: 520,
        protein: 42,
        carbs: 34,
        fat: 22,
        fiber: 9,
        cookTimeMinutes: 25,
        readyToEatQuery: 'Seared Scallops with Pea Puree',
        ingredients: [
          { name: 'Scallops', gramWeight: 200, baseNGNCost: 2400, protein: 42, carbs: 0, fat: 2, fiber: 0, sourcingLocation: 'St. Lawrence Fish Market' },
          { name: 'Garden Peas', gramWeight: 200, baseNGNCost: 420, protein: 13, carbs: 36, fat: 2, fiber: 11, sourcingLocation: 'St. Lawrence Market Produce' },
          { name: 'Butter & Cream', gramWeight: 40, baseNGNCost: 280, protein: 1, carbs: 4, fat: 26, fiber: 0, sourcingLocation: 'St. Lawrence Dairy' },
          { name: 'Braised Greens', gramWeight: 120, baseNGNCost: 240, protein: 6, carbs: 12, fat: 7, fiber: 7, sourcingLocation: 'St. Lawrence Market Produce' },
        ],
        prepInstructions: [
          'Blend the peas with butter and cream, then pass through a sieve.',
          'Sear the scallops briefly on one side.',
          'Serve on the puree with braised greens.',
        ]
      }
    ],
    poultry: [
      {
        title: 'Coq au Vin with Mash',
        description: 'Chicken braised in red wine and bacon with pearl onions, over mash.',
        visualType: 'stew_swallow',
        style: 'continental',
        proteinSourceType: 'poultry',
        calories: 680,
        protein: 46,
        carbs: 58,
        fat: 30,
        fiber: 8,
        cookTimeMinutes: 75,
        readyToEatQuery: 'Coq au Vin with Mash',
        ingredients: [
          { name: 'Chicken Thighs', gramWeight: 200, baseNGNCost: 1500, protein: 42, carbs: 0, fat: 11, fiber: 0, sourcingLocation: 'Boreal Game & Poultry' },
          { name: 'Red Wine', gramWeight: 150, baseNGNCost: 450, protein: 1, carbs: 10, fat: 0, fiber: 0, sourcingLocation: 'Québec Wineries' },
          { name: 'Bacon & Pearl Onions', gramWeight: 120, baseNGNCost: 760, protein: 14, carbs: 12, fat: 52, fiber: 2, sourcingLocation: 'St. Lawrence Butchers' },
          { name: 'Mashed Potato', gramWeight: 250, baseNGNCost: 440, protein: 6, carbs: 46, fat: 12, fiber: 6, sourcingLocation: 'St. Lawrence Market Produce' },
        ],
        prepInstructions: [
          'Brown the chicken and bacon, then deglaze with wine.',
          'Simmer with the onions until the sauce coats a spoon.',
          'Serve over mash.',
        ]
      },
      {
        title: 'Chicken Katsu Curry with Rice',
        description: 'Crisp crumbed chicken over a mild Japanese curry sauce with rice.',
        visualType: 'pasta_medley',
        style: 'continental',
        proteinSourceType: 'poultry',
        calories: 690,
        protein: 42,
        carbs: 78,
        fat: 26,
        fiber: 7,
        cookTimeMinutes: 45,
        readyToEatQuery: 'Chicken Katsu Curry',
        ingredients: [
          { name: 'Chicken Breast', gramWeight: 190, baseNGNCost: 1400, protein: 44, carbs: 0, fat: 5, fiber: 0, sourcingLocation: 'Boreal Game & Poultry' },
          { name: 'Breadcrumb Crust', gramWeight: 70, baseNGNCost: 200, protein: 4, carbs: 16, fat: 6, fiber: 1, sourcingLocation: 'St. Lawrence Bakeries' },
          { name: 'Japanese Curry Sauce', gramWeight: 200, baseNGNCost: 340, protein: 6, carbs: 40, fat: 12, fiber: 6, sourcingLocation: 'St. Lawrence Market Pantry' },
          { name: 'Rice', gramWeight: 180, baseNGNCost: 380, protein: 6, carbs: 56, fat: 1, fiber: 2, sourcingLocation: 'St. Lawrence Rice Importers' },
        ],
        prepInstructions: [
          'Coat the chicken in breadcrumbs and fry until deep golden.',
          'Simmer the curry sauce until thick.',
          'Serve over rice with the cutlet.',
        ]
      }
    ],
    eggs_dairy: [
      {
        title: 'Baked Frittata with Asparagus & Feta',
        description: 'A golden baked frittata with asparagus, peas and feta.',
        visualType: 'yam_egg_skillet',
        style: 'continental',
        proteinSourceType: 'eggs_dairy',
        calories: 520,
        protein: 28,
        carbs: 30,
        fat: 30,
        fiber: 7,
        cookTimeMinutes: 40,
        readyToEatQuery: 'Baked Frittata with Asparagus',
        ingredients: [
          { name: 'Eggs', gramWeight: 180, baseNGNCost: 680, protein: 19, carbs: 1, fat: 13, fiber: 0, sourcingLocation: 'St. Lawrence Dairy' },
          { name: 'Asparagus', gramWeight: 150, baseNGNCost: 380, protein: 6, carbs: 18, fat: 5, fiber: 7, sourcingLocation: 'St. Lawrence Market Produce' },
          { name: 'Feta', gramWeight: 60, baseNGNCost: 240, protein: 6, carbs: 3, fat: 17, fiber: 0, sourcingLocation: 'St. Lawrence Cheese Counter' },
          { name: 'Garden Peas', gramWeight: 100, baseNGNCost: 220, protein: 7, carbs: 16, fat: 1, fiber: 6, sourcingLocation: 'St. Lawrence Market Produce' },
        ],
        prepInstructions: [
          'Whisk the eggs, then fold in the vegetables and feta.',
          'Pour into an ovenproof dish and bake until puffed and just set.',
          'Serve warm or at room temperature.',
        ]
      },
      {
        title: 'Three-Cheese Bake with Garlic Bread',
        description: 'A bubbling three-cheese pasta bake served with garlic bread.',
        visualType: 'pasta_medley',
        style: 'continental',
        proteinSourceType: 'eggs_dairy',
        calories: 700,
        protein: 32,
        carbs: 78,
        fat: 28,
        fiber: 9,
        cookTimeMinutes: 50,
        readyToEatQuery: 'Three Cheese Bake with Garlic Bread',
        ingredients: [
          { name: 'Pasta', gramWeight: 220, baseNGNCost: 400, protein: 13, carbs: 78, fat: 2, fiber: 5, sourcingLocation: 'Whole Foods Canada' },
          { name: 'Cheddar, Mozzarella & Parmesan', gramWeight: 120, baseNGNCost: 640, protein: 22, carbs: 7, fat: 45, fiber: 0, sourcingLocation: 'St. Lawrence Cheese Counter' },
          { name: 'Tomato Sauce', gramWeight: 180, baseNGNCost: 250, protein: 4, carbs: 22, fat: 6, fiber: 4, sourcingLocation: 'St. Lawrence Market Pantry' },
          { name: 'Garlic Bread', gramWeight: 120, baseNGNCost: 300, protein: 7, carbs: 38, fat: 12, fiber: 3, sourcingLocation: 'St. Lawrence Bakeries' },
        ],
        prepInstructions: [
          'Mix the pasta with the sauce and half the cheese.',
          'Top with the remaining cheese and bake until golden.',
          'Serve with garlic bread.',
        ]
      }
    ],
    legumes_plant: [
      {
        title: 'Red Lentil Dal with Basmati',
        description: 'A soft, spiced red lentil dal finished with butter and coriander.',
        visualType: 'stew_swallow',
        style: 'continental',
        proteinSourceType: 'legumes_plant',
        calories: 580,
        protein: 24,
        carbs: 72,
        fat: 20,
        fiber: 18,
        cookTimeMinutes: 40,
        readyToEatQuery: 'Red Lentil Dal with Basmati',
        ingredients: [
          { name: 'Red Lentils', gramWeight: 220, baseNGNCost: 540, protein: 20, carbs: 44, fat: 2, fiber: 14, sourcingLocation: 'St. Lawrence Market Pulses' },
          { name: 'Tomato & Onion', gramWeight: 180, baseNGNCost: 260, protein: 5, carbs: 20, fat: 6, fiber: 5, sourcingLocation: 'St. Lawrence Market Produce' },
          { name: 'Basmati Rice', gramWeight: 170, baseNGNCost: 380, protein: 6, carbs: 54, fat: 1, fiber: 2, sourcingLocation: 'St. Lawrence Rice Importers' },
          { name: 'Butter & Coriander', gramWeight: 30, baseNGNCost: 230, protein: 0, carbs: 0, fat: 25, fiber: 1, sourcingLocation: 'St. Lawrence Dairy' },
        ],
        prepInstructions: [
          'Simmer the lentils with tomato, onion and spices until collapsing.',
          'Finish with a knob of butter and coriander.',
          'Serve over basmati.',
        ]
      },
      {
        title: 'Chickpea & Spinach Curry with Naan',
        description: 'A chickpea and spinach curry with a warm garlic naan.',
        visualType: 'stew_swallow',
        style: 'continental',
        proteinSourceType: 'legumes_plant',
        calories: 640,
        protein: 24,
        carbs: 80,
        fat: 22,
        fiber: 20,
        cookTimeMinutes: 50,
        readyToEatQuery: 'Chickpea and Spinach Curry',
        ingredients: [
          { name: 'Chickpeas', gramWeight: 200, baseNGNCost: 600, protein: 16, carbs: 48, fat: 4, fiber: 14, sourcingLocation: 'St. Lawrence Market Beans' },
          { name: 'Tomato Curry Sauce', gramWeight: 220, baseNGNCost: 340, protein: 6, carbs: 30, fat: 10, fiber: 5, sourcingLocation: 'St. Lawrence Market Pantry' },
          { name: 'Spinach', gramWeight: 130, baseNGNCost: 260, protein: 6, carbs: 14, fat: 4, fiber: 8, sourcingLocation: 'St. Lawrence Market Produce' },
          { name: 'Garlic Naan', gramWeight: 140, baseNGNCost: 340, protein: 9, carbs: 44, fat: 9, fiber: 3, sourcingLocation: 'St. Lawrence Bakeries' },
        ],
        prepInstructions: [
          'Simmer the chickpeas in the tomato curry until thick.',
          'Wilt the spinach into the sauce.',
          'Serve with warm naan.',
        ]
      }
    ],
    beef_lean: [
      {
        title: 'Beef Wellington with Peas',
        description: 'Beef fillet wrapped in puff pastry, served with peas and gravy.',
        visualType: 'stew_swallow',
        style: 'continental',
        proteinSourceType: 'beef_lean',
        calories: 720,
        protein: 44,
        carbs: 52,
        fat: 38,
        fiber: 6,
        cookTimeMinutes: 80,
        readyToEatQuery: 'Beef Wellington with Peas',
        ingredients: [
          { name: 'Beef Fillet', gramWeight: 180, baseNGNCost: 2300, protein: 42, carbs: 0, fat: 13, fiber: 0, sourcingLocation: 'St. Lawrence Butchers' },
          { name: 'Puff Pastry', gramWeight: 120, baseNGNCost: 320, protein: 4, carbs: 32, fat: 14, fiber: 2, sourcingLocation: 'St. Lawrence Bakeries' },
          { name: 'Mushroom Duxelles', gramWeight: 100, baseNGNCost: 300, protein: 4, carbs: 10, fat: 5, fiber: 3, sourcingLocation: 'St. Lawrence Market Produce' },
          { name: 'Garden Peas', gramWeight: 160, baseNGNCost: 320, protein: 10, carbs: 28, fat: 2, fiber: 10, sourcingLocation: 'St. Lawrence Market Produce' },
        ],
        prepInstructions: [
          'Spread the fillet with duxelles and wrap tightly in pastry.',
          'Chill, then bake until the pastry is golden.',
          'Rest before carving and serve with peas.',
        ]
      },
      {
        title: 'Steak with Pepper Sauce & Chips',
        description: 'Grilled bavette steak with a rich peppercorn sauce and chips.',
        visualType: 'grilled_fish',
        style: 'continental',
        proteinSourceType: 'beef_lean',
        calories: 690,
        protein: 46,
        carbs: 50,
        fat: 32,
        fiber: 8,
        cookTimeMinutes: 45,
        readyToEatQuery: 'Steak with Pepper Sauce and Chips',
        ingredients: [
          { name: 'Bavette Steak', gramWeight: 180, baseNGNCost: 2050, protein: 44, carbs: 0, fat: 12, fiber: 0, sourcingLocation: 'St. Lawrence Butchers' },
          { name: 'Peppercorn Sauce', gramWeight: 80, baseNGNCost: 320, protein: 4, carbs: 10, fat: 28, fiber: 1, sourcingLocation: 'St. Lawrence Market Pantry' },
          { name: 'Chips', gramWeight: 230, baseNGNCost: 440, protein: 6, carbs: 50, fat: 12, fiber: 5, sourcingLocation: 'St. Lawrence Market Produce' },
          { name: 'Watercress', gramWeight: 80, baseNGNCost: 160, protein: 4, carbs: 8, fat: 2, fiber: 4, sourcingLocation: 'St. Lawrence Market Produce' },
        ],
        prepInstructions: [
          'Grill the steak and let it rest.',
          'Make a creamy peppercorn sauce.',
          'Serve with chips and watercress.',
        ]
      }
    ]
  }
};
