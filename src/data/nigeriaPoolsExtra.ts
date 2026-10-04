/**
 * Second and third dish per protein for each Nigerian indigenous slot.
 *
 * The Nigerian pools shipped one dish per protein per slot, so the 28-day plan
 * collapsed into a five-day cycle and every plate repeated about six times. Fish
 * was the worst case: catfish filled the afternoon and evening fish slots, so
 * catfish came round constantly. These extras rotate through tilapia, Nile
 * perch, mackerel, sardines and prawns alongside the traditional catfish
 * recipes, which stay in the plan.
 */
import type { MealBlueprint } from '../types';

export type NigeriaPool = Record<MealBlueprint['proteinSourceType'], MealBlueprint[]>;

export const NIGERIA_POOL_EXTRAS: Record<'breakfasts' | 'afternoons' | 'evenings', NigeriaPool> = {
  breakfasts: {
    fish: [
      {
        title: 'Grilled Nile Perch (Apo) with Akara & Pap',
        description: 'Nile perch grilled over charcoal with pepper spice, with bean fritters and smooth pap.',
        visualType: 'grilled_fish',
        style: 'indigenous',
        proteinSourceType: 'fish',
        calories: 590,
        protein: 44,
        carbs: 58,
        fat: 20,
        fiber: 8,
        cookTimeMinutes: 35,
        readyToEatQuery: 'Grilled Nile Perch with Akara',
        ingredients: [
          { name: 'Nile Perch Fillet', gramWeight: 200, baseNGNCost: 1450, protein: 42, carbs: 0, fat: 6, fiber: 0, sourcingLocation: 'Onitsha Main Market' },
          { name: 'Akara (Bean Fritters)', gramWeight: 150, baseNGNCost: 420, protein: 9, carbs: 26, fat: 10, fiber: 6, sourcingLocation: 'Balogun Market, Lagos' },
          { name: 'Corn Pap', gramWeight: 220, baseNGNCost: 380, protein: 6, carbs: 62, fat: 1, fiber: 3, sourcingLocation: 'Balogun Market, Lagos' },
          { name: 'Pepper Spice Rub', gramWeight: 10, baseNGNCost: 90, protein: 1, carbs: 3, fat: 2, fiber: 1, sourcingLocation: 'Balogun Market, Lagos' },
        ],
        prepInstructions: [
          'Rub the perch with pepper, ginger and salt, then grill until the flesh flakes.',
          'Fry the akara batter until golden and crisp.',
          'Serve the fish with warm pap and extra pepper sauce.',
        ]
      },
      {
        title: 'Mackerel Omelette with Plantain & Tomato Sauce',
        description: 'Flaked smoked mackerel folded into a soft omelette, with fried plantain and tomato relish.',
        visualType: 'yam_egg_skillet',
        style: 'indigenous',
        proteinSourceType: 'fish',
        calories: 530,
        protein: 32,
        carbs: 42,
        fat: 24,
        fiber: 6,
        cookTimeMinutes: 25,
        readyToEatQuery: 'Mackerel Omelette with Plantain',
        ingredients: [
          { name: 'Smoked Mackerel', gramWeight: 120, baseNGNCost: 900, protein: 24, carbs: 0, fat: 6, fiber: 0, sourcingLocation: 'Onitsha Main Market' },
          { name: 'Eggs', gramWeight: 130, baseNGNCost: 480, protein: 14, carbs: 1, fat: 10, fiber: 0, sourcingLocation: 'Balogun Market, Lagos' },
          { name: 'Fried Plantain', gramWeight: 110, baseNGNCost: 330, protein: 2, carbs: 26, fat: 8, fiber: 2, sourcingLocation: 'Balogun Market, Lagos' },
          { name: 'Tomato Relish', gramWeight: 120, baseNGNCost: 180, protein: 2, carbs: 14, fat: 3, fiber: 4, sourcingLocation: 'Balogun Market, Lagos' },
        ],
        prepInstructions: [
          'Flake the mackerel and fold it through the whisked eggs with sliced tomato.',
          'Cook the omelette softly and fold it in a pan.',
          'Serve with fried plantain and spoon over the remaining relish.',
        ]
      }
    ],
    poultry: [
      {
        title: 'Fried Chicken Breast with Akara Beans & Chilled Pap',
        description: 'A lightly spiced fried chicken breast served with chilled pap and bean fritters.',
        visualType: 'chicken_salad',
        style: 'indigenous',
        proteinSourceType: 'poultry',
        calories: 610,
        protein: 42,
        carbs: 52,
        fat: 22,
        fiber: 7,
        cookTimeMinutes: 40,
        readyToEatQuery: 'Fried Chicken Breast with Akara',
        ingredients: [
          { name: 'Chicken Breast', gramWeight: 170, baseNGNCost: 1300, protein: 38, carbs: 0, fat: 6, fiber: 0, sourcingLocation: 'Oyingbo Market, Lagos' },
          { name: 'Akara (Bean Fritters)', gramWeight: 150, baseNGNCost: 420, protein: 9, carbs: 26, fat: 10, fiber: 6, sourcingLocation: 'Balogun Market, Lagos' },
          { name: 'Chilled Corn Pap', gramWeight: 220, baseNGNCost: 360, protein: 6, carbs: 60, fat: 1, fiber: 3, sourcingLocation: 'Balogun Market, Lagos' },
          { name: 'Coleslaw', gramWeight: 100, baseNGNCost: 180, protein: 2, carbs: 10, fat: 6, fiber: 3, sourcingLocation: 'Balogun Market, Lagos' },
        ],
        prepInstructions: [
          'Marinate the chicken with ginger, garlic and mild pepper, then flour lightly.',
          'Fry until golden and drain on paper.',
          'Plate with chilled pap, akara and a little coleslaw.',
        ]
      }
    ],
    eggs_dairy: [
            {
        title: 'Boiled Eggs with Moin-Moin & Steamed Plantain',
        description: 'Hard-boiled eggs with soft steamed moin-moin and ripe plantain.',
        visualType: 'yam_egg_skillet',
        style: 'indigenous',
        proteinSourceType: 'eggs_dairy',
        calories: 520,
        protein: 24,
        carbs: 58,
        fat: 20,
        fiber: 9,
        cookTimeMinutes: 30,
        readyToEatQuery: 'Boiled Eggs with Moin-Moin',
        ingredients: [
          { name: 'Eggs', gramWeight: 150, baseNGNCost: 560, protein: 16, carbs: 1, fat: 11, fiber: 0, sourcingLocation: 'Balogun Market, Lagos' },
          { name: 'Moin-Moin Steamed', gramWeight: 180, baseNGNCost: 480, protein: 12, carbs: 38, fat: 8, fiber: 10, sourcingLocation: 'Balogun Market, Lagos' },
          { name: 'Steamed Ripe Plantain', gramWeight: 140, baseNGNCost: 360, protein: 2, carbs: 32, fat: 8, fiber: 3, sourcingLocation: 'Balogun Market, Lagos' },
          { name: 'Tomato & Pepper Relish', gramWeight: 100, baseNGNCost: 150, protein: 2, carbs: 12, fat: 3, fiber: 4, sourcingLocation: 'Balogun Market, Lagos' },
        ],
        prepInstructions: [
          'Blend the moin-moin batter and steam in wrapped leaves until set.',
          'Boil the eggs for nine minutes, then cool and peel.',
          'Serve the eggs with moin-moin, plantain and tomato relish.',
        ]
      }
    ],
    legumes_plant: [
      {
        title: 'Akara Bean Fritters with Pap & Pepper Sauce',
        description: 'Golden, spiced black-eyed bean fritters with soft pap and a fiery pepper sauce.',
        visualType: 'beans_plantain',
        style: 'indigenous',
        proteinSourceType: 'legumes_plant',
        calories: 510,
        protein: 18,
        carbs: 66,
        fat: 14,
        fiber: 12,
        cookTimeMinutes: 30,
        readyToEatQuery: 'Akara Fritters with Pap',
        ingredients: [
          { name: 'Black-Eyed Beans', gramWeight: 180, baseNGNCost: 560, protein: 13, carbs: 38, fat: 2, fiber: 10, sourcingLocation: 'Onitsha Main Market' },
          { name: 'Onion & Pepper', gramWeight: 120, baseNGNCost: 200, protein: 2, carbs: 16, fat: 3, fiber: 4, sourcingLocation: 'Balogun Market, Lagos' },
          { name: 'Corn Pap', gramWeight: 220, baseNGNCost: 380, protein: 6, carbs: 62, fat: 1, fiber: 3, sourcingLocation: 'Balogun Market, Lagos' },
          { name: 'Pap Spice & Pepper Sauce', gramWeight: 40, baseNGNCost: 140, protein: 1, carbs: 6, fat: 4, fiber: 2, sourcingLocation: 'Balogun Market, Lagos' },
        ],
        prepInstructions: [
          'Blend soaked beans with onion and pepper into a thick batter.',
          'Fry spoonfuls in hot oil until puffed and golden.',
          'Serve with pap and pepper sauce.',
        ]
      },
      {
        title: 'Bean-Flecked Brown Garri Porridge with Boiled Egg',
        description: 'Nutty brown garri cooked into a smooth porridge with beans and a boiled egg.',
        visualType: 'oatmeal_parfait',
        style: 'indigenous',
        proteinSourceType: 'legumes_plant',
        calories: 500,
        protein: 20,
        carbs: 64,
        fat: 13,
        fiber: 10,
        cookTimeMinutes: 25,
        readyToEatQuery: 'Bean Garri Porridge with Egg',
        ingredients: [
          { name: 'Brown Garri', gramWeight: 180, baseNGNCost: 420, protein: 7, carbs: 66, fat: 2, fiber: 6, sourcingLocation: 'Onitsha Main Market' },
          { name: 'Cowpeas', gramWeight: 120, baseNGNCost: 380, protein: 9, carbs: 24, fat: 2, fiber: 8, sourcingLocation: 'Onitsha Main Market' },
          { name: 'Egg', gramWeight: 60, baseNGNCost: 230, protein: 7, carbs: 0, fat: 5, fiber: 0, sourcingLocation: 'Balogun Market, Lagos' },
          { name: 'Palm Oil & Ginger', gramWeight: 15, baseNGNCost: 180, protein: 0, carbs: 2, fat: 15, fiber: 0, sourcingLocation: 'Balogun Market, Lagos' },
        ],
        prepInstructions: [
          'Whisk the garri into boiling water, stirring, until it thickens.',
          'Fold in pre-soaked cowpeas and a spoon of palm oil.',
          'Serve with a boiled egg alongside.',
        ]
      }
    ],
    beef_lean: [
      {
        title: 'Suya-Spiced Beef Omelette with Fried Yam',
        description: 'Shredded suya-spiced beef folded into eggs, served with fried yam.',
        visualType: 'yam_egg_skillet',
        style: 'indigenous',
        proteinSourceType: 'beef_lean',
        calories: 640,
        protein: 38,
        carbs: 50,
        fat: 28,
        fiber: 6,
        cookTimeMinutes: 30,
        readyToEatQuery: 'Suya Beef Omelette with Yam',
        ingredients: [
          { name: 'Lean Beef Strips', gramWeight: 150, baseNGNCost: 1750, protein: 32, carbs: 0, fat: 10, fiber: 0, sourcingLocation: 'Ikeja GRA Market' },
          { name: 'Eggs', gramWeight: 130, baseNGNCost: 480, protein: 14, carbs: 1, fat: 10, fiber: 0, sourcingLocation: 'Balogun Market, Lagos' },
          { name: 'Fried Yam', gramWeight: 200, baseNGNCost: 520, protein: 6, carbs: 56, fat: 10, fiber: 5, sourcingLocation: 'Balogun Market, Lagos' },
          { name: 'Suya Spice Rub', gramWeight: 12, baseNGNCost: 120, protein: 2, carbs: 4, fat: 4, fiber: 2, sourcingLocation: 'Ikeja GRA Market' },
        ],
        prepInstructions: [
          'Sear the seasoned beef and shred it finely.',
          'Fold the shredded beef through whipped eggs and fry to a firm omelette.',
          'Serve with fried yam and more suya spice.',
        ]
      }
    ]
  },
  afternoons: {
    fish: [
      {
        title: 'Grilled Tilapia with Pepper Sauce & Yam',
        description: 'Whole tilapia grilled with pepper spice, served with boiled yam and a sharp pepper sauce.',
        visualType: 'grilled_fish',
        style: 'indigenous',
        proteinSourceType: 'fish',
        calories: 620,
        protein: 44,
        carbs: 56,
        fat: 20,
        fiber: 8,
        cookTimeMinutes: 35,
        readyToEatQuery: 'Grilled Tilapia with Yam',
        ingredients: [
          { name: 'Whole Tilapia', gramWeight: 220, baseNGNCost: 1350, protein: 40, carbs: 0, fat: 7, fiber: 0, sourcingLocation: 'Onitsha Main Market' },
          { name: 'Boiled Yam', gramWeight: 200, baseNGNCost: 480, protein: 6, carbs: 44, fat: 1, fiber: 5, sourcingLocation: 'Balogun Market, Lagos' },
          { name: 'Pepper Sauce', gramWeight: 50, baseNGNCost: 150, protein: 1, carbs: 6, fat: 5, fiber: 2, sourcingLocation: 'Balogun Market, Lagos' },
          { name: 'Tomato & Onion', gramWeight: 120, baseNGNCost: 180, protein: 2, carbs: 14, fat: 3, fiber: 4, sourcingLocation: 'Balogun Market, Lagos' },
        ],
        prepInstructions: [
          'Clean and score the tilapia, then rub with pepper, ginger and salt.',
          'Grill over charcoal until the skin crisps and the flesh flakes.',
          'Serve with boiled yam, pepper sauce and tomato.',
        ]
      },
          ],
    poultry: [
      {
        title: 'Chicken Afang Soup with Pounded Yam',
        description: 'Afang soup: a spinach-rich broth with sliced palm fruit and shredded chicken, over pounded yam.',
        visualType: 'stew_swallow',
        style: 'indigenous',
        proteinSourceType: 'poultry',
        calories: 640,
        protein: 44,
        carbs: 58,
        fat: 22,
        fiber: 9,
        cookTimeMinutes: 60,
        readyToEatQuery: 'Chicken Afang Soup with Yam',
        ingredients: [
          { name: 'Chicken Pieces', gramWeight: 200, baseNGNCost: 1450, protein: 42, carbs: 0, fat: 9, fiber: 0, sourcingLocation: 'Oyingbo Market, Lagos' },
          { name: 'Afang (Water Leaf)', gramWeight: 200, baseNGNCost: 420, protein: 8, carbs: 16, fat: 8, fiber: 10, sourcingLocation: 'Balogun Market, Lagos' },
          { name: 'Palm Fruit', gramWeight: 80, baseNGNCost: 300, protein: 3, carbs: 10, fat: 14, fiber: 4, sourcingLocation: 'Onitsha Main Market' },
          { name: 'Pounded Yam', gramWeight: 220, baseNGNCost: 500, protein: 7, carbs: 50, fat: 1, fiber: 5, sourcingLocation: 'Balogun Market, Lagos' },
        ],
        prepInstructions: [
          'Blend afang leaves with palm fruit and pepper.',
          'Simmer the chicken in stock, then add the afang paste and cook until thick.',
          'Serve over pounded yam.',
        ]
      },
      {
        title: 'Suya Chicken Wrap with Coleslaw & Grilled Corn',
        description: 'Suya-spiced grilled chicken in a warm wrap with coleslaw and charred corn.',
        visualType: 'chicken_salad',
        style: 'indigenous',
        proteinSourceType: 'poultry',
        calories: 610,
        protein: 40,
        carbs: 62,
        fat: 20,
        fiber: 9,
        cookTimeMinutes: 30,
        readyToEatQuery: 'Suya Chicken Wrap with Corn',
        ingredients: [
          { name: 'Chicken Breast', gramWeight: 180, baseNGNCost: 1380, protein: 42, carbs: 0, fat: 6, fiber: 0, sourcingLocation: 'Oyingbo Market, Lagos' },
          { name: 'Flour Wrap', gramWeight: 100, baseNGNCost: 320, protein: 9, carbs: 42, fat: 4, fiber: 3, sourcingLocation: 'Ikeja GRA Market' },
          { name: 'Coleslaw', gramWeight: 130, baseNGNCost: 190, protein: 2, carbs: 12, fat: 6, fiber: 3, sourcingLocation: 'Balogun Market, Lagos' },
          { name: 'Grilled Corn', gramWeight: 120, baseNGNCost: 280, protein: 5, carbs: 26, fat: 2, fiber: 5, sourcingLocation: 'Balogun Market, Lagos' },
        ],
        prepInstructions: [
          'Marinate the chicken with suya spice, then grill until charred.',
          'Warm the wrap and fill with sliced chicken, slaw and corn.',
          'Roll tightly and cut in half.',
        ]
      }
    ],
    eggs_dairy: [
      {
        title: 'Egg Fried Rice with Salad & Spring Onion',
        description: 'Day-old rice stir-fried with egg, carrot and peas, finished with spring onion.',
        visualType: 'jollof_bowl',
        style: 'indigenous',
        proteinSourceType: 'eggs_dairy',
        calories: 600,
        protein: 26,
        carbs: 76,
        fat: 18,
        fiber: 7,
        cookTimeMinutes: 20,
        readyToEatQuery: 'Egg Fried Rice with Salad',
        ingredients: [
          { name: 'Cooked Rice', gramWeight: 240, baseNGNCost: 560, protein: 9, carbs: 76, fat: 2, fiber: 4, sourcingLocation: 'Onitsha Main Market' },
          { name: 'Eggs', gramWeight: 150, baseNGNCost: 560, protein: 16, carbs: 1, fat: 11, fiber: 0, sourcingLocation: 'Balogun Market, Lagos' },
          { name: 'Carrot & Green Peas', gramWeight: 150, baseNGNCost: 260, protein: 5, carbs: 26, fat: 2, fiber: 8, sourcingLocation: 'Balogun Market, Lagos' },
          { name: 'Spring Onion & Salad', gramWeight: 120, baseNGNCost: 200, protein: 3, carbs: 12, fat: 3, fiber: 4, sourcingLocation: 'Balogun Market, Lagos' },
        ],
        prepInstructions: [
          'Heat oil and scramble the eggs, then add carrot and peas.',
          'Tip in the cold rice and stir-fry until piping hot.',
          'Finish with spring onion and serve with salad.',
        ]
      },
          ],
    legumes_plant: [
                ],
    beef_lean: [
            {
        title: 'Okpei Beef Pepper Soup with Boiled Plantain',
        description: 'Okpei: a fiery beef pepper soup with utazi and palm fruit, served with boiled plantain.',
        visualType: 'stew_swallow',
        style: 'indigenous',
        proteinSourceType: 'beef_lean',
        calories: 670,
        protein: 46,
        carbs: 54,
        fat: 26,
        fiber: 7,
        cookTimeMinutes: 60,
        readyToEatQuery: 'Okpei Beef Pepper Soup',
        ingredients: [
          { name: 'Beef Shank', gramWeight: 200, baseNGNCost: 2300, protein: 44, carbs: 0, fat: 14, fiber: 0, sourcingLocation: 'Ikeja GRA Market' },
          { name: 'Utazi & Aju', gramWeight: 60, baseNGNCost: 260, protein: 3, carbs: 6, fat: 4, fiber: 5, sourcingLocation: 'Balogun Market, Lagos' },
          { name: 'Palm Fruit', gramWeight: 80, baseNGNCost: 300, protein: 3, carbs: 10, fat: 14, fiber: 4, sourcingLocation: 'Onitsha Main Market' },
          { name: 'Boiled Plantain', gramWeight: 200, baseNGNCost: 460, protein: 3, carbs: 50, fat: 9, fiber: 3, sourcingLocation: 'Balogun Market, Lagos' },
        ],
        prepInstructions: [
          'Blend utazi, aju, palm fruit and pepper into a paste.',
          'Simmer the beef shank with the paste until the broth is rich and red.',
          'Serve with boiled plantain.',
        ]
      }
    ]
  },
  evenings: {
    fish: [
      {
        title: 'Baked Mackerel with Okra Stew & Plantain',
        description: 'Mackerel baked with tomato and onion, served with a fresh okra stew and boiled plantain.',
        visualType: 'stew_swallow',
        style: 'indigenous',
        proteinSourceType: 'fish',
        calories: 600,
        protein: 42,
        carbs: 56,
        fat: 22,
        fiber: 9,
        cookTimeMinutes: 45,
        readyToEatQuery: 'Baked Mackerel with Okra Stew',
        ingredients: [
          { name: 'Mackerel Fillet', gramWeight: 200, baseNGNCost: 1250, protein: 40, carbs: 0, fat: 8, fiber: 0, sourcingLocation: 'Ajah Market, Lagos' },
          { name: 'Okra Stew', gramWeight: 200, baseNGNCost: 400, protein: 8, carbs: 20, fat: 14, fiber: 12, sourcingLocation: 'Balogun Market, Lagos' },
          { name: 'Boiled Plantain', gramWeight: 180, baseNGNCost: 420, protein: 3, carbs: 44, fat: 8, fiber: 3, sourcingLocation: 'Balogun Market, Lagos' },
          { name: 'Tomato & Onion', gramWeight: 150, baseNGNCost: 200, protein: 3, carbs: 16, fat: 4, fiber: 4, sourcingLocation: 'Balogun Market, Lagos' },
        ],
        prepInstructions: [
          'Bake the mackerel with tomato, onion and mild pepper until flaking.',
          'Simmer chopped okra with tomato, pepper and palm oil.',
          'Serve the fish with the okra stew and boiled plantain.',
        ]
      },
      {
        title: 'Grilled Sardines (Abadaye) with Pepper Sauce & Yam',
        description: 'Small sardines grilled crisp and piled onto boiled yam with a fiery pepper sauce.',
        visualType: 'grilled_fish',
        style: 'indigenous',
        proteinSourceType: 'fish',
        calories: 570,
        protein: 42,
        carbs: 52,
        fat: 20,
        fiber: 7,
        cookTimeMinutes: 30,
        readyToEatQuery: 'Grilled Sardines with Yam',
        ingredients: [
          { name: 'Fresh Sardines', gramWeight: 220, baseNGNCost: 1150, protein: 42, carbs: 0, fat: 7, fiber: 0, sourcingLocation: 'Ajah Market, Lagos' },
          { name: 'Boiled Yam', gramWeight: 220, baseNGNCost: 520, protein: 7, carbs: 50, fat: 1, fiber: 5, sourcingLocation: 'Balogun Market, Lagos' },
          { name: 'Pepper Sauce', gramWeight: 50, baseNGNCost: 150, protein: 1, carbs: 6, fat: 5, fiber: 2, sourcingLocation: 'Balogun Market, Lagos' },
          { name: 'Tomato & Onion', gramWeight: 120, baseNGNCost: 180, protein: 2, carbs: 14, fat: 3, fiber: 4, sourcingLocation: 'Balogun Market, Lagos' },
        ],
        prepInstructions: [
          'Grill the sardines over open flame until crisp on both sides.',
          'Boil the yam until soft and slice.',
          'Serve the sardines over yam with pepper sauce.',
        ]
      }
    ],
    poultry: [
      {
        title: 'Steamed Chicken Stew with Rice & Vegetables',
        description: 'A gentle, well-seasoned chicken stew simmered soft, served with rice and steamed vegetables.',
        visualType: 'stew_swallow',
        style: 'indigenous',
        proteinSourceType: 'poultry',
        calories: 650,
        protein: 44,
        carbs: 60,
        fat: 24,
        fiber: 9,
        cookTimeMinutes: 55,
        readyToEatQuery: 'Steamed Chicken Stew with Rice',
        ingredients: [
          { name: 'Chicken Pieces', gramWeight: 200, baseNGNCost: 1450, protein: 42, carbs: 0, fat: 9, fiber: 0, sourcingLocation: 'Oyingbo Market, Lagos' },
          { name: 'Tomato & Onion Stew', gramWeight: 200, baseNGNCost: 280, protein: 5, carbs: 22, fat: 8, fiber: 4, sourcingLocation: 'Balogun Market, Lagos' },
          { name: 'Rice', gramWeight: 180, baseNGNCost: 400, protein: 6, carbs: 56, fat: 1, fiber: 2, sourcingLocation: 'Onitsha Main Market' },
          { name: 'Steamed Vegetables', gramWeight: 150, baseNGNCost: 280, protein: 5, carbs: 20, fat: 6, fiber: 8, sourcingLocation: 'Balogun Market, Lagos' },
        ],
        prepInstructions: [
          'Stew the chicken with tomato, onion and ginger until the meat is very tender.',
          'Cook the rice and steam the vegetables separately.',
          'Serve the stew over rice with vegetables on the side.',
        ]
      },
          ],
    eggs_dairy: [
      {
        title: 'Bread & Custard with Boiled Egg & Steamed Yam',
        description: 'A soft custard with bread, accompanied by a boiled egg and steamed yam.',
        visualType: 'oatmeal_parfait',
        style: 'indigenous',
        proteinSourceType: 'eggs_dairy',
        calories: 520,
        protein: 22,
        carbs: 60,
        fat: 18,
        fiber: 5,
        cookTimeMinutes: 20,
        readyToEatQuery: 'Bread and Custard with Boiled Egg',
        ingredients: [
          { name: 'Egg Custard', gramWeight: 250, baseNGNCost: 600, protein: 14, carbs: 44, fat: 14, fiber: 0, sourcingLocation: 'Balogun Market, Lagos' },
          { name: 'Bread Slice', gramWeight: 90, baseNGNCost: 200, protein: 5, carbs: 34, fat: 2, fiber: 4, sourcingLocation: 'Ikeja GRA Market' },
          { name: 'Boiled Egg', gramWeight: 60, baseNGNCost: 230, protein: 7, carbs: 0, fat: 5, fiber: 0, sourcingLocation: 'Balogun Market, Lagos' },
          { name: 'Steamed Yam', gramWeight: 150, baseNGNCost: 360, protein: 5, carbs: 34, fat: 1, fiber: 4, sourcingLocation: 'Balogun Market, Lagos' },
        ],
        prepInstructions: [
          'Whisk egg, milk, sugar and vanilla, then steam gently until just set.',
          'Boil the egg and slice the bread.',
          'Serve the custard with bread, boiled egg and steamed yam.',
        ]
      }
    ],
    legumes_plant: [
      {
        title: 'Okpeh Agwoyo with Yam & Vegetables',
        description: 'Battered okra and grated yam fritters, fried crisp and served with vegetables.',
        visualType: 'beans_plantain',
        style: 'indigenous',
        proteinSourceType: 'legumes_plant',
        calories: 540,
        protein: 18,
        carbs: 64,
        fat: 18,
        fiber: 10,
        cookTimeMinutes: 35,
        readyToEatQuery: 'Okpeh Agwoyo with Yam',
        ingredients: [
          { name: 'Okra', gramWeight: 180, baseNGNCost: 340, protein: 7, carbs: 18, fat: 13, fiber: 11, sourcingLocation: 'Balogun Market, Lagos' },
          { name: 'Grated Yam', gramWeight: 200, baseNGNCost: 520, protein: 6, carbs: 52, fat: 1, fiber: 5, sourcingLocation: 'Balogun Market, Lagos' },
          { name: 'Seasoning & Batter', gramWeight: 80, baseNGNCost: 240, protein: 3, carbs: 18, fat: 8, fiber: 2, sourcingLocation: 'Balogun Market, Lagos' },
          { name: 'Steamed Vegetables', gramWeight: 150, baseNGNCost: 280, protein: 5, carbs: 20, fat: 6, fiber: 8, sourcingLocation: 'Balogun Market, Lagos' },
        ],
        prepInstructions: [
          'Slice the okra and combine with grated yam and seasoning.',
          'Form into fritters and fry until golden and crisp.',
          'Serve with steamed vegetables.',
        ]
      },
    ],
    beef_lean: [
      {
        title: 'Goat Meat Pepper Soup (Okpei) with Rice',
        description: 'Tender goat meat in a fiery pepper broth with utazi, served with white rice.',
        visualType: 'stew_swallow',
        style: 'indigenous',
        proteinSourceType: 'beef_lean',
        calories: 690,
        protein: 48,
        carbs: 54,
        fat: 28,
        fiber: 7,
        cookTimeMinutes: 70,
        readyToEatQuery: 'Goat Meat Pepper Soup',
        ingredients: [
          { name: 'Goat Meat', gramWeight: 200, baseNGNCost: 2500, protein: 46, carbs: 0, fat: 17, fiber: 0, sourcingLocation: 'Ikeja GRA Market' },
          { name: 'Utazi & Aju', gramWeight: 60, baseNGNCost: 260, protein: 3, carbs: 6, fat: 4, fiber: 5, sourcingLocation: 'Balogun Market, Lagos' },
          { name: 'Palm Fruit', gramWeight: 80, baseNGNCost: 300, protein: 3, carbs: 10, fat: 14, fiber: 4, sourcingLocation: 'Onitsha Main Market' },
          { name: 'Rice', gramWeight: 170, baseNGNCost: 380, protein: 6, carbs: 52, fat: 1, fiber: 2, sourcingLocation: 'Onitsha Main Market' },
        ],
        prepInstructions: [
          'Blend utazi, aju, palm fruit and red pepper into a smooth paste.',
          'Simmer the goat meat with the paste until the meat is tender and the broth is deep red.',
          'Serve with rice.',
        ]
      },
      {
        title: 'Beef and Bone Soup with Pounded Yam',
        description: 'Beef bones and shin simmered into a clear, rich broth, served with pounded yam.',
        visualType: 'stew_swallow',
        style: 'indigenous',
        proteinSourceType: 'beef_lean',
        calories: 660,
        protein: 46,
        carbs: 56,
        fat: 26,
        fiber: 6,
        cookTimeMinutes: 85,
        readyToEatQuery: 'Beef and Bone Soup with Yam',
        ingredients: [
          { name: 'Beef Bones & Shin', gramWeight: 220, baseNGNCost: 2100, protein: 44, carbs: 0, fat: 14, fiber: 0, sourcingLocation: 'Ikeja GRA Market' },
          { name: 'Pounded Yam', gramWeight: 220, baseNGNCost: 500, protein: 7, carbs: 50, fat: 1, fiber: 5, sourcingLocation: 'Balogun Market, Lagos' },
          { name: 'Tomato, Onion & Ginger', gramWeight: 180, baseNGNCost: 240, protein: 4, carbs: 20, fat: 5, fiber: 5, sourcingLocation: 'Balogun Market, Lagos' },
          { name: 'Pepper Spice', gramWeight: 12, baseNGNCost: 130, protein: 2, carbs: 4, fat: 4, fiber: 2, sourcingLocation: 'Ikeja GRA Market' },
        ],
        prepInstructions: [
          'Brown the bones, then simmer for a long time with tomato, onion and ginger.',
          'Strain the broth and season with pepper spice.',
          'Serve with pounded yam.',
        ]
      }
    ]
  }
};
