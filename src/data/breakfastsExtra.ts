/**
 * Extra breakfasts for the local country catalogues.
 *
 * The breakfast pools also held one dish per protein, so days 1-5 repeated as
 * days 6-10 and every breakfast came back about six times in 28 days. These add
 * two per protein so each pool holds three, matching the mains.
 */
import type { MealBlueprint } from '../types';

export type ProteinKey = MealBlueprint['proteinSourceType'];

export const COUNTRY_BREAKFAST_EXTRAS: Record<string, Record<ProteinKey, MealBlueprint[]>> = {
  GH: {
    fish: [
      {
        title: 'Grilled Mackerel with Waakye & Shito',
        description: 'Mackerel grilled crisp over waakye rice and beans, finished with hot shito.',
        visualType: 'jollof_bowl',
        style: 'indigenous',
        proteinSourceType: 'fish',
        calories: 560,
        protein: 42,
        carbs: 58,
        fat: 18,
        fiber: 9,
        cookTimeMinutes: 30,
        readyToEatQuery: 'Grilled Mackerel with Waakye',
        ingredients: [
          { name: 'Mackerel Fillet', gramWeight: 200, baseNGNCost: 1100, protein: 38, carbs: 0, fat: 7, fiber: 0, sourcingLocation: 'James Town Fish Market' },
          { name: 'Waakye (Rice & Cowpea)', gramWeight: 220, baseNGNCost: 600, protein: 10, carbs: 66, fat: 3, fiber: 6, sourcingLocation: 'Makola Maize Vendors' },
          { name: 'Shito Pepper Blend', gramWeight: 8, baseNGNCost: 120, protein: 1, carbs: 3, fat: 4, fiber: 1, sourcingLocation: 'Makola Spice Stall' },
          { name: 'Tomato & Onion', gramWeight: 80, baseNGNCost: 90, protein: 2, carbs: 9, fat: 0, fiber: 2, sourcingLocation: 'Makola Vegetable Stall' },
        ],
        prepInstructions: [
          'Grill the mackerel until crisp on both sides.',
          'Reheat the waakye.',
          'Serve the fish over the waakye with shito and raw tomato.',
        ]
      },
      {
        title: 'Smoked Herring with Bread & Soft-Boiled Egg',
        description: 'Flaked smoked herring over soft bread with a jammy egg and hot pepper.',
        visualType: 'yam_egg_skillet',
        style: 'indigenous',
        proteinSourceType: 'fish',
        calories: 470,
        protein: 34,
        carbs: 38,
        fat: 20,
        fiber: 5,
        cookTimeMinutes: 20,
        readyToEatQuery: 'Smoked Herring with Egg',
        ingredients: [
          { name: 'Smoked Herring', gramWeight: 120, baseNGNCost: 850, protein: 26, carbs: 0, fat: 5, fiber: 0, sourcingLocation: 'James Town Fish Market' },
          { name: 'Bread Slice', gramWeight: 80, baseNGNCost: 160, protein: 6, carbs: 32, fat: 2, fiber: 3, sourcingLocation: 'Makola Bakeries' },
          { name: 'Eggs', gramWeight: 100, baseNGNCost: 380, protein: 11, carbs: 1, fat: 8, fiber: 0, sourcingLocation: 'Makola Egg Vendors' },
          { name: 'Tomato Relish', gramWeight: 80, baseNGNCost: 120, protein: 2, carbs: 10, fat: 3, fiber: 4, sourcingLocation: 'Makola Vegetable Stall' },
        ],
        prepInstructions: [
          'Flake the herring and warm the bread.',
          'Boil the egg to six minutes for a jammy yolk.',
          'Serve together with tomato relish.',
        ]
      }
    ],
    poultry: [
      {
        title: 'Chicken Katsu Rice Bowl with Fried Egg',
        description: 'Crisp crumbed chicken over jollof rice with a fried egg and pickles.',
        visualType: 'jollof_bowl',
        style: 'indigenous',
        proteinSourceType: 'poultry',
        calories: 640,
        protein: 44,
        carbs: 66,
        fat: 22,
        fiber: 6,
        cookTimeMinutes: 35,
        readyToEatQuery: 'Chicken Katsu Rice Bowl',
        ingredients: [
          { name: 'Chicken Breast', gramWeight: 180, baseNGNCost: 1300, protein: 40, carbs: 0, fat: 5, fiber: 0, sourcingLocation: 'Makola Poultry Stalls' },
          { name: 'Jollof Rice', gramWeight: 200, baseNGNCost: 450, protein: 8, carbs: 62, fat: 4, fiber: 3, sourcingLocation: 'Makola Rice Millers' },
          { name: 'Breadcrumb Crust', gramWeight: 60, baseNGNCost: 180, protein: 3, carbs: 14, fat: 5, fiber: 1, sourcingLocation: 'Makola Bakeries' },
          { name: 'Egg & Pickles', gramWeight: 110, baseNGNCost: 420, protein: 11, carbs: 6, fat: 22, fiber: 1, sourcingLocation: 'Makola Egg Vendors' },
        ],
        prepInstructions: [
          'Coat the seasoned chicken in breadcrumbs and shallow-fry until golden.',
          'Serve over jollof rice.',
          'Top with a fried egg and pickles.',
        ]
      },
      {
        title: 'Waakye with Grilled Chicken & Boiled Egg',
        description: 'Waakye rice and beans topped with grilled chicken and a boiled egg.',
        visualType: 'jollof_bowl',
        style: 'indigenous',
        proteinSourceType: 'poultry',
        calories: 610,
        protein: 42,
        carbs: 62,
        fat: 21,
        fiber: 8,
        cookTimeMinutes: 30,
        readyToEatQuery: 'Waakye with Grilled Chicken',
        ingredients: [
          { name: 'Chicken Thigh', gramWeight: 170, baseNGNCost: 1200, protein: 38, carbs: 0, fat: 9, fiber: 0, sourcingLocation: 'Makola Poultry Stalls' },
          { name: 'Waakye (Rice & Cowpea)', gramWeight: 230, baseNGNCost: 620, protein: 10, carbs: 68, fat: 3, fiber: 6, sourcingLocation: 'Makola Rice Millers' },
          { name: 'Boiled Egg', gramWeight: 60, baseNGNCost: 230, protein: 7, carbs: 0, fat: 5, fiber: 0, sourcingLocation: 'Makola Egg Vendors' },
          { name: 'Tomato & Onion', gramWeight: 100, baseNGNCost: 120, protein: 2, carbs: 11, fat: 1, fiber: 4, sourcingLocation: 'Makola Vegetable Stall' },
        ],
        prepInstructions: [
          'Grill the marinated chicken until charred.',
          'Reheat the waakye with a splash of water.',
          'Serve with the boiled egg and tomato.',
        ]
      }
    ],
    eggs_dairy: [
      {
        title: 'Koko Rice with Boiled Egg & Pepper',
        description: 'Koko, a spiced rice-and-cowpea porridge, served with a boiled egg and pepper.',
        visualType: 'beans_plantain',
        style: 'indigenous',
        proteinSourceType: 'eggs_dairy',
        calories: 520,
        protein: 20,
        carbs: 70,
        fat: 13,
        fiber: 12,
        cookTimeMinutes: 35,
        readyToEatQuery: 'Koko Rice with Boiled Egg',
        ingredients: [
          { name: 'Rice & Cowpeas', gramWeight: 240, baseNGNCost: 700, protein: 12, carbs: 74, fat: 3, fiber: 12, sourcingLocation: 'Makola Rice Millers' },
          { name: 'Boiled Eggs', gramWeight: 120, baseNGNCost: 450, protein: 13, carbs: 1, fat: 9, fiber: 0, sourcingLocation: 'Makola Egg Vendors' },
          { name: 'Tomato & Onion', gramWeight: 150, baseNGNCost: 200, protein: 3, carbs: 17, fat: 4, fiber: 5, sourcingLocation: 'Makola Vegetable Stall' },
          { name: 'Pepper Blend', gramWeight: 10, baseNGNCost: 110, protein: 1, carbs: 3, fat: 4, fiber: 1, sourcingLocation: 'Makola Spice Stall' },
        ],
        prepInstructions: [
          'Boil the rice and cowpeas with tomato, onion and pepper until soft and thick.',
          'Boil the eggs for nine minutes.',
          'Serve together.',
        ]
      },
      {
        title: 'Tomato Scramble with Bread & Grated Cheese',
        description: 'Eggs softly scrambled with tomato and onion, served with bread and grated cheese.',
        visualType: 'yam_egg_skillet',
        style: 'indigenous',
        proteinSourceType: 'eggs_dairy',
        calories: 530,
        protein: 26,
        carbs: 42,
        fat: 24,
        fiber: 6,
        cookTimeMinutes: 20,
        readyToEatQuery: 'Tomato Scramble with Cheese',
        ingredients: [
          { name: 'Eggs', gramWeight: 160, baseNGNCost: 600, protein: 17, carbs: 1, fat: 12, fiber: 0, sourcingLocation: 'Makola Egg Vendors' },
          { name: 'Tomato & Onion', gramWeight: 180, baseNGNCost: 240, protein: 4, carbs: 20, fat: 5, fiber: 6, sourcingLocation: 'Makola Vegetable Stall' },
          { name: 'Bread Slice', gramWeight: 90, baseNGNCost: 180, protein: 6, carbs: 34, fat: 2, fiber: 3, sourcingLocation: 'Makola Bakeries' },
          { name: 'Grated Cheese', gramWeight: 40, baseNGNCost: 240, protein: 5, carbs: 1, fat: 18, fiber: 0, sourcingLocation: 'Makola Dairy Stalls' },
        ],
        prepInstructions: [
          'Soften the tomato and onion in oil, then add the whisked eggs and scramble softly.',
          'Toast the bread.',
          'Serve with grated cheese.',
        ]
      }
    ],
    legumes_plant: [
      {
        title: 'Bean Stew with Rice & Fried Egg',
        description: 'Slow-cooked bean stew over rice, with a fried egg on top.',
        visualType: 'beans_plantain',
        style: 'indigenous',
        proteinSourceType: 'legumes_plant',
        calories: 560,
        protein: 24,
        carbs: 66,
        fat: 16,
        fiber: 15,
        cookTimeMinutes: 45,
        readyToEatQuery: 'Bean Stew with Fried Egg',
        ingredients: [
          { name: 'Black-Eyed Beans', gramWeight: 200, baseNGNCost: 640, protein: 15, carbs: 38, fat: 2, fiber: 11, sourcingLocation: 'Makola Bean Vendors' },
          { name: 'Tomato & Onion Stew', gramWeight: 180, baseNGNCost: 240, protein: 5, carbs: 20, fat: 7, fiber: 5, sourcingLocation: 'Makola Vegetable Stall' },
          { name: 'Rice', gramWeight: 170, baseNGNCost: 380, protein: 6, carbs: 52, fat: 1, fiber: 2, sourcingLocation: 'Makola Rice Millers' },
          { name: 'Eggs', gramWeight: 110, baseNGNCost: 410, protein: 12, carbs: 1, fat: 9, fiber: 0, sourcingLocation: 'Makola Egg Vendors' },
        ],
        prepInstructions: [
          'Simmer the beans with a fried tomato and onion base until thick.',
          'Cook the rice.',
          'Top with a fried egg.',
        ]
      },
      {
        title: 'Akara with Rice & Tomato Stew',
        description: 'Crisp black-eyed bean fritters with rice and a peppery tomato stew.',
        visualType: 'beans_plantain',
        style: 'indigenous',
        proteinSourceType: 'legumes_plant',
        calories: 540,
        protein: 19,
        carbs: 68,
        fat: 15,
        fiber: 13,
        cookTimeMinutes: 35,
        readyToEatQuery: 'Akara with Rice and Tomato Stew',
        ingredients: [
          { name: 'Akara (Bean Fritters)', gramWeight: 160, baseNGNCost: 450, protein: 10, carbs: 28, fat: 11, fiber: 7, sourcingLocation: 'Makola Bean Vendors' },
          { name: 'Rice', gramWeight: 170, baseNGNCost: 380, protein: 6, carbs: 52, fat: 1, fiber: 2, sourcingLocation: 'Makola Rice Millers' },
          { name: 'Tomato Stew', gramWeight: 200, baseNGNCost: 260, protein: 5, carbs: 22, fat: 7, fiber: 5, sourcingLocation: 'Makola Vegetable Stall' },
          { name: 'Shito Pepper Blend', gramWeight: 8, baseNGNCost: 120, protein: 1, carbs: 3, fat: 4, fiber: 1, sourcingLocation: 'Makola Spice Stall' },
        ],
        prepInstructions: [
          'Fry spoonfuls of akara batter until golden.',
          'Simmer the tomato stew with pepper.',
          'Serve with rice and shito.',
        ]
      }
    ],
    beef_lean: [
      {
        title: 'Beef & Tomato Sandwich with Chilli',
        description: 'Sliced beef in a crusty roll with tomato, onion and hot chilli.',
        visualType: 'chicken_salad',
        style: 'indigenous',
        proteinSourceType: 'beef_lean',
        calories: 600,
        protein: 38,
        carbs: 52,
        fat: 24,
        fiber: 7,
        cookTimeMinutes: 25,
        readyToEatQuery: 'Beef and Tomato Sandwich',
        ingredients: [
          { name: 'Beef Sirloin', gramWeight: 150, baseNGNCost: 1800, protein: 34, carbs: 0, fat: 9, fiber: 0, sourcingLocation: 'Makola Butchers' },
          { name: 'Crusty Roll', gramWeight: 100, baseNGNCost: 210, protein: 7, carbs: 42, fat: 2, fiber: 3, sourcingLocation: 'Makola Bakeries' },
          { name: 'Tomato & Onion', gramWeight: 120, baseNGNCost: 170, protein: 2, carbs: 13, fat: 2, fiber: 4, sourcingLocation: 'Makola Vegetable Stall' },
          { name: 'Chilli & Lettuce', gramWeight: 60, baseNGNCost: 110, protein: 1, carbs: 5, fat: 3, fiber: 1, sourcingLocation: 'Makola Vegetable Stall' },
        ],
        prepInstructions: [
          'Slice the cooked beef thinly.',
          'Toast the roll and fill with beef, tomato, onion and chilli.',
          'Serve immediately.',
        ]
      },
      {
        title: 'Suya Beef Rolls with Waakye',
        description: 'Charcoal-grilled suya-spiced beef rolled with onion and served over waakye.',
        visualType: 'jollof_bowl',
        style: 'indigenous',
        proteinSourceType: 'beef_lean',
        calories: 640,
        protein: 42,
        carbs: 64,
        fat: 24,
        fiber: 8,
        cookTimeMinutes: 30,
        readyToEatQuery: 'Suya Beef Rolls with Waakye',
        ingredients: [
          { name: 'Beef Strips', gramWeight: 170, baseNGNCost: 1900, protein: 38, carbs: 0, fat: 10, fiber: 0, sourcingLocation: 'Makola Butchers' },
          { name: 'Waakye (Rice & Cowpea)', gramWeight: 200, baseNGNCost: 540, protein: 9, carbs: 60, fat: 3, fiber: 6, sourcingLocation: 'Makola Rice Millers' },
          { name: 'Suya Spice Blend', gramWeight: 12, baseNGNCost: 120, protein: 2, carbs: 4, fat: 4, fiber: 2, sourcingLocation: 'Makola Spice Stall' },
          { name: 'Raw Onion', gramWeight: 80, baseNGNCost: 90, protein: 2, carbs: 10, fat: 0, fiber: 2, sourcingLocation: 'Makola Vegetable Stall' },
        ],
        prepInstructions: [
          'Marinate the beef with suya spice and grill over charcoal.',
          'Slice the raw onion into thin rings.',
          'Roll the beef with onion and serve over waakye.',
        ]
      }
    ]
  },
  KE: {
    fish: [
      {
        title: 'Omelette with Smoked Tilapia & Sukuma',
        description: 'A folded omelette filled with flaked smoked tilapia and served with sukuma wiki.',
        visualType: 'yam_egg_skillet',
        style: 'indigenous',
        proteinSourceType: 'fish',
        calories: 530,
        protein: 34,
        carbs: 32,
        fat: 26,
        fiber: 7,
        cookTimeMinutes: 25,
        readyToEatQuery: 'Omelette with Smoked Tilapia',
        ingredients: [
          { name: 'Smoked Tilapia', gramWeight: 120, baseNGNCost: 880, protein: 26, carbs: 0, fat: 3, fiber: 0, sourcingLocation: 'Lakeside Fish Market' },
          { name: 'Eggs', gramWeight: 150, baseNGNCost: 560, protein: 16, carbs: 1, fat: 11, fiber: 0, sourcingLocation: 'Wakulima Egg Vendors' },
          { name: 'Sukuma Wiki Greens', gramWeight: 180, baseNGNCost: 320, protein: 5, carbs: 10, fat: 7, fiber: 7, sourcingLocation: 'Wakulima Vegetable Aisle' },
          { name: 'Chapati', gramWeight: 80, baseNGNCost: 240, protein: 3, carbs: 38, fat: 4, fiber: 2, sourcingLocation: 'Local Bakeries' },
        ],
        prepInstructions: [
          'Flake the smoked fish and fold it into whisked eggs with onion.',
          'Cook the omelette softly.',
          'Serve with sukuma wiki and chapati.',
        ]
      },
      {
        title: 'Fish Curry with Chapati & Chai',
        description: 'A mild coconut fish curry with chapati and a mug of spiced tea.',
        visualType: 'stew_swallow',
        style: 'indigenous',
        proteinSourceType: 'fish',
        calories: 560,
        protein: 38,
        carbs: 54,
        fat: 20,
        fiber: 8,
        cookTimeMinutes: 40,
        readyToEatQuery: 'Kenyan Fish Curry with Chapati',
        ingredients: [
          { name: 'Tilapia Fillets', gramWeight: 180, baseNGNCost: 1100, protein: 34, carbs: 0, fat: 5, fiber: 0, sourcingLocation: 'Lakeside Fish Market' },
          { name: 'Coconut Milk', gramWeight: 120, baseNGNCost: 220, protein: 2, carbs: 6, fat: 16, fiber: 1, sourcingLocation: 'Wakulima Dairy Stalls' },
          { name: 'Chapati', gramWeight: 110, baseNGNCost: 330, protein: 4, carbs: 52, fat: 6, fiber: 4, sourcingLocation: 'Local Bakeries' },
          { name: 'Chai (Spiced Tea)', gramWeight: 200, baseNGNCost: 240, protein: 2, carbs: 34, fat: 6, fiber: 1, sourcingLocation: 'Wakulima Tea Stalls' },
        ],
        prepInstructions: [
          'Simmer the tilapia in a light coconut curry with ginger.',
          'Toast the chapati.',
          'Serve with hot chai.',
        ]
      }
    ],
    poultry: [
      {
        title: 'Mandazi with Chicken Stew',
        description: 'Sweet, sugar-coated mandazi fried golden and served with a mild chicken stew.',
        visualType: 'yam_egg_skillet',
        style: 'indigenous',
        proteinSourceType: 'poultry',
        calories: 640,
        protein: 36,
        carbs: 64,
        fat: 24,
        fiber: 6,
        cookTimeMinutes: 50,
        readyToEatQuery: 'Mandazi with Chicken Stew',
        ingredients: [
          { name: 'Chicken Thigh', gramWeight: 170, baseNGNCost: 1250, protein: 38, carbs: 0, fat: 9, fiber: 0, sourcingLocation: 'City Market Poultry Stalls' },
          { name: 'Mandazi', gramWeight: 180, baseNGNCost: 420, protein: 7, carbs: 50, fat: 14, fiber: 2, sourcingLocation: 'Local Bakeries' },
          { name: 'Tomato & Onion Stew', gramWeight: 200, baseNGNCost: 280, protein: 5, carbs: 22, fat: 8, fiber: 4, sourcingLocation: 'Wakulima Vegetable Aisle' },
          { name: 'Sugar Glaze', gramWeight: 40, baseNGNCost: 120, protein: 0, carbs: 10, fat: 0, fiber: 0, sourcingLocation: 'Local Bakeries' },
        ],
        prepInstructions: [
          'Deep-fry the mandazi until puffed and golden, then coat with sugar.',
          'Simmer the chicken in a mild tomato stew.',
          'Serve the stew with the mandazi.',
        ]
      },
      {
        title: 'Chicken Samosa with Chapati & Salsa',
        description: 'Crisp triangular samosas packed with spiced chicken, served with chapati and tomato salsa.',
        visualType: 'yam_egg_skillet',
        style: 'indigenous',
        proteinSourceType: 'poultry',
        calories: 610,
        protein: 36,
        carbs: 60,
        fat: 24,
        fiber: 8,
        cookTimeMinutes: 45,
        readyToEatQuery: 'Chicken Samosa with Chapati',
        ingredients: [
          { name: 'Chicken Mince', gramWeight: 170, baseNGNCost: 1300, protein: 36, carbs: 0, fat: 8, fiber: 0, sourcingLocation: 'City Market Poultry Stalls' },
          { name: 'Samosa Pastry', gramWeight: 100, baseNGNCost: 300, protein: 5, carbs: 38, fat: 10, fiber: 3, sourcingLocation: 'Local Bakeries' },
          { name: 'Chapati', gramWeight: 90, baseNGNCost: 270, protein: 4, carbs: 42, fat: 5, fiber: 3, sourcingLocation: 'Local Bakeries' },
          { name: 'Tomato Salsa', gramWeight: 150, baseNGNCost: 200, protein: 3, carbs: 16, fat: 3, fiber: 5, sourcingLocation: 'Wakulima Vegetable Aisle' },
        ],
        prepInstructions: [
          'Season the mince with onion, garlic and cumin and cook until dry.',
          'Wrap in pastry and fold into triangles.',
          'Deep-fry until crisp and serve with chapati and salsa.',
        ]
      }
    ],
    eggs_dairy: [
      {
        title: 'Omelette with Mukuna Beans & Chapati',
        description: 'A soft omelette served with spiced mukuna beans and warm chapati.',
        visualType: 'yam_egg_skillet',
        style: 'indigenous',
        proteinSourceType: 'eggs_dairy',
        calories: 520,
        protein: 26,
        carbs: 46,
        fat: 22,
        fiber: 12,
        cookTimeMinutes: 30,
        readyToEatQuery: 'Omelette with Mukuna Beans',
        ingredients: [
          { name: 'Eggs', gramWeight: 150, baseNGNCost: 560, protein: 16, carbs: 1, fat: 11, fiber: 0, sourcingLocation: 'Wakulima Egg Vendors' },
          { name: 'Mukuna Beans', gramWeight: 170, baseNGNCost: 540, protein: 12, carbs: 34, fat: 2, fiber: 10, sourcingLocation: 'Wakulima Bean Vendors' },
          { name: 'Chapati', gramWeight: 100, baseNGNCost: 300, protein: 4, carbs: 48, fat: 5, fiber: 3, sourcingLocation: 'Local Bakeries' },
          { name: 'Tomato & Onion', gramWeight: 120, baseNGNCost: 200, protein: 3, carbs: 14, fat: 3, fiber: 4, sourcingLocation: 'Wakulima Vegetable Aisle' },
        ],
        prepInstructions: [
          'Simmer the mukuna beans with tomato, onion and pepper.',
          'Whisk and fry the eggs into a soft omelette.',
          'Serve with beans and chapati.',
        ]
      },
      {
        title: 'Egg Curry with Rice & Chapati',
        description: 'Boiled eggs simmered in a spiced tomato curry, with rice and chapati.',
        visualType: 'beans_plantain',
        style: 'indigenous',
        proteinSourceType: 'eggs_dairy',
        calories: 560,
        protein: 24,
        carbs: 60,
        fat: 22,
        fiber: 8,
        cookTimeMinutes: 35,
        readyToEatQuery: 'Kenyan Egg Curry with Rice',
        ingredients: [
          { name: 'Eggs', gramWeight: 150, baseNGNCost: 560, protein: 16, carbs: 1, fat: 11, fiber: 0, sourcingLocation: 'Wakulima Egg Vendors' },
          { name: 'Tomato & Onion Curry', gramWeight: 200, baseNGNCost: 300, protein: 5, carbs: 24, fat: 8, fiber: 5, sourcingLocation: 'Wakulima Vegetable Aisle' },
          { name: 'Rice', gramWeight: 150, baseNGNCost: 320, protein: 5, carbs: 46, fat: 1, fiber: 2, sourcingLocation: 'Wakulima Rice Vendors' },
          { name: 'Chapati', gramWeight: 90, baseNGNCost: 270, protein: 4, carbs: 42, fat: 5, fiber: 3, sourcingLocation: 'Local Bakeries' },
        ],
        prepInstructions: [
          'Boil the eggs, then lower them into a spiced tomato curry.',
          'Simmer until the sauce thickens.',
          'Serve with rice and chapati.',
        ]
      }
    ],
    legumes_plant: [
      {
        title: 'Mahagwa with Fried Egg & Chapati',
        description: 'Soft mahagwa bread cooked in spiced coconut milk, with a fried egg and chapati.',
        visualType: 'oatmeal_parfait',
        style: 'indigenous',
        proteinSourceType: 'legumes_plant',
        calories: 560,
        protein: 22,
        carbs: 62,
        fat: 22,
        fiber: 9,
        cookTimeMinutes: 50,
        readyToEatQuery: 'Mahagwa with Fried Egg',
        ingredients: [
          { name: 'Mahagwa Dough', gramWeight: 220, baseNGNCost: 480, protein: 9, carbs: 64, fat: 8, fiber: 5, sourcingLocation: 'Local Bakeries' },
          { name: 'Coconut Milk', gramWeight: 120, baseNGNCost: 220, protein: 2, carbs: 6, fat: 16, fiber: 1, sourcingLocation: 'Wakulima Dairy Stalls' },
          { name: 'Eggs', gramWeight: 110, baseNGNCost: 410, protein: 12, carbs: 1, fat: 9, fiber: 0, sourcingLocation: 'Wakulima Egg Vendors' },
          { name: 'Chapati', gramWeight: 80, baseNGNCost: 240, protein: 3, carbs: 38, fat: 4, fiber: 2, sourcingLocation: 'Local Bakeries' },
        ],
        prepInstructions: [
          'Simmer the mahagwa in spiced coconut milk until soft and glossy.',
          'Fry the egg until the edges are crisp.',
          'Serve with chapati.',
        ]
      },
      {
        title: 'Bean Stew with Ugali & Sukuma',
        description: 'Slow-cooked beans in tomato gravy, with soft ugali and collard greens.',
        visualType: 'beans_plantain',
        style: 'indigenous',
        proteinSourceType: 'legumes_plant',
        calories: 570,
        protein: 21,
        carbs: 74,
        fat: 14,
        fiber: 16,
        cookTimeMinutes: 50,
        readyToEatQuery: 'Bean Stew with Ugali and Sukuma',
        ingredients: [
          { name: 'Rosecoco Beans', gramWeight: 200, baseNGNCost: 660, protein: 15, carbs: 40, fat: 2, fiber: 11, sourcingLocation: 'Wakulima Bean Vendors' },
          { name: 'Ugali (Maizemeal)', gramWeight: 180, baseNGNCost: 280, protein: 4, carbs: 54, fat: 1, fiber: 4, sourcingLocation: 'Wakulima Maize Vendors' },
          { name: 'Tomato Stew', gramWeight: 180, baseNGNCost: 240, protein: 5, carbs: 20, fat: 7, fiber: 5, sourcingLocation: 'Wakulima Vegetable Aisle' },
          { name: 'Sukuma Wiki Greens', gramWeight: 160, baseNGNCost: 300, protein: 5, carbs: 10, fat: 7, fiber: 7, sourcingLocation: 'Wakulima Vegetable Aisle' },
        ],
        prepInstructions: [
          'Simmer the beans with tomato, onion and spice.',
          'Knead and cook the ugali until smooth.',
          'Sauté the greens and serve all three.',
        ]
      }
    ],
    beef_lean: [
      {
        title: 'Beef Sausage Omelette with Chapati',
        description: 'Sliced beef sausage folded into an omelette, with chapati and tomato.',
        visualType: 'yam_egg_skillet',
        style: 'indigenous',
        proteinSourceType: 'beef_lean',
        calories: 600,
        protein: 34,
        carbs: 48,
        fat: 28,
        fiber: 7,
        cookTimeMinutes: 30,
        readyToEatQuery: 'Beef Sausage Omelette',
        ingredients: [
          { name: 'Beef Sausage', gramWeight: 140, baseNGNCost: 1250, protein: 24, carbs: 2, fat: 17, fiber: 0, sourcingLocation: 'City Market Butchery' },
          { name: 'Eggs', gramWeight: 140, baseNGNCost: 520, protein: 15, carbs: 1, fat: 11, fiber: 0, sourcingLocation: 'Wakulima Egg Vendors' },
          { name: 'Chapati', gramWeight: 90, baseNGNCost: 270, protein: 4, carbs: 42, fat: 5, fiber: 3, sourcingLocation: 'Local Bakeries' },
          { name: 'Tomato & Onion', gramWeight: 120, baseNGNCost: 200, protein: 3, carbs: 14, fat: 3, fiber: 4, sourcingLocation: 'Wakulima Vegetable Aisle' },
        ],
        prepInstructions: [
          'Slice the cooked sausage and fold into whisked eggs with onion.',
          'Cook the omelette in a little oil.',
          'Serve with chapati and tomato.',
        ]
      },
      {
        title: 'Beef Stew with Rice & Chapati',
        description: 'A rich tomato beef stew served with rice and warm chapati.',
        visualType: 'stew_swallow',
        style: 'indigenous',
        proteinSourceType: 'beef_lean',
        calories: 620,
        protein: 36,
        carbs: 62,
        fat: 24,
        fiber: 9,
        cookTimeMinutes: 60,
        readyToEatQuery: 'Kenyan Beef Stew with Rice',
        ingredients: [
          { name: 'Beef Chuck', gramWeight: 180, baseNGNCost: 2000, protein: 40, carbs: 0, fat: 12, fiber: 0, sourcingLocation: 'City Market Butchery' },
          { name: 'Tomato & Onion Stew', gramWeight: 200, baseNGNCost: 300, protein: 5, carbs: 22, fat: 8, fiber: 5, sourcingLocation: 'Wakulima Vegetable Aisle' },
          { name: 'Rice', gramWeight: 150, baseNGNCost: 320, protein: 5, carbs: 46, fat: 1, fiber: 2, sourcingLocation: 'Wakulima Rice Vendors' },
          { name: 'Chapati', gramWeight: 90, baseNGNCost: 270, protein: 4, carbs: 42, fat: 5, fiber: 3, sourcingLocation: 'Local Bakeries' },
        ],
        prepInstructions: [
          'Stew the beef with tomato, onion and pepper until tender.',
          'Cook the rice.',
          'Serve with the stew and chapati.',
        ]
      }
    ]
  },
  US: {
    fish: [
      {
        title: 'Smoked Trout on Bagel with Lemon & Dill',
        description: 'Smoked trout with cream cheese on a toasted bagel, with lemon and dill.',
        visualType: 'yam_egg_skillet',
        style: 'indigenous',
        proteinSourceType: 'fish',
        calories: 470,
        protein: 30,
        carbs: 44,
        fat: 18,
        fiber: 6,
        cookTimeMinutes: 15,
        readyToEatQuery: 'Smoked Trout Bagel',
        ingredients: [
          { name: 'Smoked Trout', gramWeight: 120, baseNGNCost: 1500, protein: 26, carbs: 0, fat: 4, fiber: 0, sourcingLocation: 'Chelsea Fish Market' },
          { name: 'Bagel', gramWeight: 90, baseNGNCost: 190, protein: 10, carbs: 38, fat: 2, fiber: 3, sourcingLocation: 'Bakery & Produce' },
          { name: 'Cream Cheese', gramWeight: 50, baseNGNCost: 220, protein: 4, carbs: 3, fat: 16, fiber: 0, sourcingLocation: 'Union Square Dairy' },
          { name: 'Lemon & Dill', gramWeight: 20, baseNGNCost: 90, protein: 0, carbs: 2, fat: 5, fiber: 1, sourcingLocation: 'Union Square Produce' },
        ],
        prepInstructions: [
          'Toast the bagel halves.',
          'Spread the cream cheese and top with flaked trout.',
          'Finish with lemon zest and dill.',
        ]
      },
      {
        title: 'Salmon Breakfast Bowl with Rice & Soy',
        description: 'Cured salmon over seasoned rice with cucumber, avocado and soy.',
        visualType: 'jollof_bowl',
        style: 'indigenous',
        proteinSourceType: 'fish',
        calories: 540,
        protein: 34,
        carbs: 50,
        fat: 22,
        fiber: 8,
        cookTimeMinutes: 20,
        readyToEatQuery: 'Salmon Breakfast Rice Bowl',
        ingredients: [
          { name: 'Cured Salmon', gramWeight: 120, baseNGNCost: 1600, protein: 26, carbs: 0, fat: 6, fiber: 0, sourcingLocation: 'Chelsea Fish Market' },
          { name: 'Brown Rice', gramWeight: 180, baseNGNCost: 420, protein: 7, carbs: 58, fat: 2, fiber: 4, sourcingLocation: 'Whole Foods Grains' },
          { name: 'Cucumber & Avocado', gramWeight: 150, baseNGNCost: 300, protein: 3, carbs: 14, fat: 22, fiber: 7, sourcingLocation: 'Union Square Produce' },
          { name: 'Soy & Sesame', gramWeight: 30, baseNGNCost: 150, protein: 3, carbs: 6, fat: 8, fiber: 1, sourcingLocation: 'Whole Foods Sauces' },
        ],
        prepInstructions: [
          'Season the rice with a little soy and rice vinegar.',
          'Layer rice with cucumber and avocado.',
          'Top with cured salmon and sesame.',
        ]
      }
    ],
    poultry: [
      {
        title: 'Grilled Chicken Breakfast Plate with Hash Browns',
        description: 'Grilled chicken breast with crisp hash browns and a side of fresh fruit.',
        visualType: 'grilled_fish',
        style: 'indigenous',
        proteinSourceType: 'poultry',
        calories: 560,
        protein: 44,
        carbs: 44,
        fat: 20,
        fiber: 7,
        cookTimeMinutes: 30,
        readyToEatQuery: 'Grilled Chicken Breakfast Plate',
        ingredients: [
          { name: 'Chicken Breast', gramWeight: 170, baseNGNCost: 1280, protein: 40, carbs: 0, fat: 5, fiber: 0, sourcingLocation: 'Pike Place Poultry' },
          { name: 'Hash Browns', gramWeight: 200, baseNGNCost: 380, protein: 5, carbs: 44, fat: 10, fiber: 4, sourcingLocation: 'Union Square Produce' },
          { name: 'Fresh Fruit', gramWeight: 150, baseNGNCost: 260, protein: 1, carbs: 30, fat: 1, fiber: 5, sourcingLocation: 'Union Square Produce' },
          { name: 'Olive Oil & Pepper', gramWeight: 20, baseNGNCost: 140, protein: 0, carbs: 1, fat: 14, fiber: 0, sourcingLocation: 'Whole Foods Oils' },
        ],
        prepInstructions: [
          'Grill the seasoned chicken breast until cooked through.',
          'Hash browns until crisp and golden.',
          'Plate with fruit and a drizzle of olive oil.',
        ]
      },
      {
        title: 'Turkey & Egg White Scramble with Toast',
        description: 'Whipped egg whites scrambled with turkey and chives, on sourdough toast.',
        visualType: 'yam_egg_skillet',
        style: 'indigenous',
        proteinSourceType: 'poultry',
        calories: 430,
        protein: 38,
        carbs: 32,
        fat: 16,
        fiber: 5,
        cookTimeMinutes: 20,
        readyToEatQuery: 'Turkey Egg White Scramble',
        ingredients: [
          { name: 'Egg Whites', gramWeight: 250, baseNGNCost: 480, protein: 26, carbs: 4, fat: 0, fiber: 0, sourcingLocation: 'Union Square Dairy' },
          { name: 'Turkey Breast', gramWeight: 120, baseNGNCost: 1100, protein: 28, carbs: 0, fat: 3, fiber: 0, sourcingLocation: 'Pike Place Poultry' },
          { name: 'Sourdough Toast', gramWeight: 80, baseNGNCost: 180, protein: 7, carbs: 32, fat: 2, fiber: 3, sourcingLocation: 'Bakery & Produce' },
          { name: 'Chives & Spinach', gramWeight: 80, baseNGNCost: 160, protein: 4, carbs: 10, fat: 2, fiber: 5, sourcingLocation: 'Union Square Produce' },
        ],
        prepInstructions: [
          'Whisk the egg whites and scramble gently with diced turkey.',
          'Fold in spinach and chives.',
          'Serve on toast.',
        ]
      }
    ],
    eggs_dairy: [
      {
        title: 'Buttermilk Pancakes with Maple Syrup',
        description: 'Fluffy buttermilk pancakes with maple syrup and a knob of butter.',
        visualType: 'oatmeal_parfait',
        style: 'indigenous',
        proteinSourceType: 'eggs_dairy',
        calories: 600,
        protein: 18,
        carbs: 72,
        fat: 24,
        fiber: 4,
        cookTimeMinutes: 25,
        readyToEatQuery: 'Buttermilk Pancakes with Maple Syrup',
        ingredients: [
          { name: 'Buttermilk Pancakes', gramWeight: 250, baseNGNCost: 520, protein: 16, carbs: 66, fat: 14, fiber: 3, sourcingLocation: 'Bakery & Produce' },
          { name: 'Maple Syrup', gramWeight: 60, baseNGNCost: 320, protein: 0, carbs: 16, fat: 0, fiber: 0, sourcingLocation: 'Union Square Pantry' },
          { name: 'Butter', gramWeight: 25, baseNGNCost: 180, protein: 0, carbs: 0, fat: 20, fiber: 0, sourcingLocation: 'Union Square Dairy' },
          { name: 'Berries', gramWeight: 80, baseNGNCost: 180, protein: 1, carbs: 10, fat: 1, fiber: 4, sourcingLocation: 'Union Square Produce' },
        ],
        prepInstructions: [
          'Cook the pancakes on a hot griddle until bubbles form, then flip.',
          'Stack and top with maple syrup and butter.',
          'Serve with berries.',
        ]
      },
      {
        title: 'Cheese Omelet with Breakfast Potatoes',
        description: 'A three-cheese omelet with crispy cubed potatoes on the side.',
        visualType: 'yam_egg_skillet',
        style: 'indigenous',
        proteinSourceType: 'eggs_dairy',
        calories: 610,
        protein: 30,
        carbs: 42,
        fat: 32,
        fiber: 5,
        cookTimeMinutes: 25,
        readyToEatQuery: 'Cheese Omelet with Breakfast Potatoes',
        ingredients: [
          { name: 'Eggs', gramWeight: 160, baseNGNCost: 600, protein: 17, carbs: 1, fat: 12, fiber: 0, sourcingLocation: 'Union Square Dairy' },
          { name: 'Cheddar & Swiss', gramWeight: 70, baseNGNCost: 380, protein: 12, carbs: 1, fat: 28, fiber: 0, sourcingLocation: 'Union Square Cheese' },
          { name: 'Breakfast Potatoes', gramWeight: 220, baseNGNCost: 400, protein: 5, carbs: 46, fat: 10, fiber: 5, sourcingLocation: 'Union Square Produce' },
          { name: 'Chives', gramWeight: 10, baseNGNCost: 70, protein: 0, carbs: 2, fat: 1, fiber: 1, sourcingLocation: 'Union Square Produce' },
        ],
        prepInstructions: [
          'Crisp the diced potatoes in a hot pan.',
          'Whisk the eggs with chives, fill with cheese and fold.',
          'Serve with the potatoes.',
        ]
      }
    ],
    legumes_plant: [
      {
        title: 'Avocado Toast with Black Beans & Egg',
        description: 'Sourdough topped with smashed avocado, spiced black beans and a jammy egg.',
        visualType: 'beans_plantain',
        style: 'indigenous',
        proteinSourceType: 'legumes_plant',
        calories: 560,
        protein: 24,
        carbs: 52,
        fat: 26,
        fiber: 14,
        cookTimeMinutes: 20,
        readyToEatQuery: 'Avocado Toast with Black Beans',
        ingredients: [
          { name: 'Sourdough Toast', gramWeight: 90, baseNGNCost: 190, protein: 7, carbs: 34, fat: 2, fiber: 3, sourcingLocation: 'Bakery & Produce' },
          { name: 'Avocado', gramWeight: 110, baseNGNCost: 320, protein: 3, carbs: 10, fat: 24, fiber: 7, sourcingLocation: 'Union Square Produce' },
          { name: 'Black Beans', gramWeight: 130, baseNGNCost: 270, protein: 10, carbs: 28, fat: 1, fiber: 9, sourcingLocation: 'Fiesta Grocery' },
          { name: 'Egg', gramWeight: 60, baseNGNCost: 230, protein: 7, carbs: 0, fat: 5, fiber: 0, sourcingLocation: 'Union Square Dairy' },
        ],
        prepInstructions: [
          'Smash the avocado onto the toast and season it.',
          'Warm the spiced black beans and spoon them on top.',
          'Add a fried egg.',
        ]
      },
      {
        title: 'Overnight Oats with Chia & Berries',
        description: 'Oats soaked overnight with chia, milk and honey, topped with berries.',
        visualType: 'oatmeal_parfait',
        style: 'indigenous',
        proteinSourceType: 'legumes_plant',
        calories: 520,
        protein: 19,
        carbs: 66,
        fat: 17,
        fiber: 15,
        cookTimeMinutes: 10,
        readyToEatQuery: 'Overnight Oats with Chia and Berries',
        ingredients: [
          { name: 'Rolled Oats', gramWeight: 90, baseNGNCost: 240, protein: 8, carbs: 50, fat: 3, fiber: 7, sourcingLocation: 'Whole Foods Grains' },
          { name: 'Chia Seeds', gramWeight: 25, baseNGNCost: 180, protein: 4, carbs: 10, fat: 6, fiber: 7, sourcingLocation: 'Whole Foods Grains' },
          { name: 'Milk & Honey', gramWeight: 180, baseNGNCost: 260, protein: 7, carbs: 30, fat: 8, fiber: 0, sourcingLocation: 'Union Square Dairy' },
          { name: 'Mixed Berries', gramWeight: 120, baseNGNCost: 260, protein: 1, carbs: 26, fat: 1, fiber: 6, sourcingLocation: 'Union Square Produce' },
        ],
        prepInstructions: [
          'Stir oats, chia, milk and honey together and refrigerate overnight.',
          'Top with fresh berries before serving.',
        ]
      }
    ],
    beef_lean: [
      {
        title: 'Steak & Eggs with Home Fries',
        description: 'Grilled sirloin with fried eggs, home fries and a side of toast.',
        visualType: 'grilled_fish',
        style: 'indigenous',
        proteinSourceType: 'beef_lean',
        calories: 650,
        protein: 46,
        carbs: 46,
        fat: 28,
        fiber: 6,
        cookTimeMinutes: 30,
        readyToEatQuery: 'Steak and Eggs with Home Fries',
        ingredients: [
          { name: 'Sirloin Steak', gramWeight: 170, baseNGNCost: 2100, protein: 42, carbs: 0, fat: 12, fiber: 0, sourcingLocation: 'Pike Place Butchers' },
          { name: 'Eggs', gramWeight: 140, baseNGNCost: 520, protein: 15, carbs: 1, fat: 11, fiber: 0, sourcingLocation: 'Union Square Dairy' },
          { name: 'Home Fries', gramWeight: 220, baseNGNCost: 400, protein: 5, carbs: 48, fat: 10, fiber: 5, sourcingLocation: 'Union Square Produce' },
          { name: 'Butter & Toast', gramWeight: 60, baseNGNCost: 240, protein: 3, carbs: 22, fat: 10, fiber: 2, sourcingLocation: 'Bakery & Produce' },
        ],
        prepInstructions: [
          'Grill the steak to the desired doneness and rest it.',
          'Pan-fry the potatoes until crisp.',
          'Fry the eggs and serve everything with toast.',
        ]
      },
      {
        title: 'Beef Breakfast Burrito with Salsa',
        description: 'Scrambled egg, seasoned beef and beans wrapped in a warm tortilla with salsa.',
        visualType: 'beans_plantain',
        style: 'indigenous',
        proteinSourceType: 'beef_lean',
        calories: 640,
        protein: 38,
        carbs: 58,
        fat: 26,
        fiber: 13,
        cookTimeMinutes: 25,
        readyToEatQuery: 'Beef Breakfast Burrito with Salsa',
        ingredients: [
          { name: 'Seasoned Beef', gramWeight: 140, baseNGNCost: 1700, protein: 30, carbs: 0, fat: 10, fiber: 0, sourcingLocation: 'Pike Place Butchers' },
          { name: 'Eggs', gramWeight: 140, baseNGNCost: 520, protein: 15, carbs: 1, fat: 11, fiber: 0, sourcingLocation: 'Union Square Dairy' },
          { name: 'Flour Tortilla', gramWeight: 90, baseNGNCost: 180, protein: 3, carbs: 38, fat: 3, fiber: 3, sourcingLocation: 'Fiesta Grocery' },
          { name: 'Black Beans & Salsa', gramWeight: 150, baseNGNCost: 320, protein: 11, carbs: 32, fat: 5, fiber: 10, sourcingLocation: 'Fiesta Grocery' },
        ],
        prepInstructions: [
          'Brown the seasoned beef with the beans.',
          'Scramble the eggs and combine.',
          'Fill the warmed tortilla and fold.',
        ]
      }
    ]
  },
  CA: {
    fish: [
      {
        title: 'Smoked Trout Toast with Dill Cream Cheese',
        description: 'Smoked trout on rye with dill cream cheese and a squeeze of lemon.',
        visualType: 'yam_egg_skillet',
        style: 'indigenous',
        proteinSourceType: 'fish',
        calories: 480,
        protein: 30,
        carbs: 42,
        fat: 19,
        fiber: 6,
        cookTimeMinutes: 15,
        readyToEatQuery: 'Smoked Trout on Rye',
        ingredients: [
          { name: 'Smoked Trout', gramWeight: 120, baseNGNCost: 1600, protein: 26, carbs: 0, fat: 4, fiber: 0, sourcingLocation: 'St. Lawrence Fish Market' },
          { name: 'Rye Bread', gramWeight: 90, baseNGNCost: 220, protein: 5, carbs: 34, fat: 2, fiber: 4, sourcingLocation: 'St. Lawrence Bakeries' },
          { name: 'Dill Cream Cheese', gramWeight: 50, baseNGNCost: 240, protein: 4, carbs: 3, fat: 17, fiber: 0, sourcingLocation: 'St. Lawrence Dairy' },
          { name: 'Lemon', gramWeight: 20, baseNGNCost: 90, protein: 0, carbs: 2, fat: 5, fiber: 1, sourcingLocation: 'St. Lawrence Market Produce' },
        ],
        prepInstructions: [
          'Toast the rye.',
          'Spread the dill cream cheese and top with trout.',
          'Finish with lemon.',
        ]
      },
      {
        title: 'Salmon Breakfast Bowl with Wild Rice',
        description: 'Smoked salmon over wild rice with avocado and a lemon-dill dressing.',
        visualType: 'jollof_bowl',
        style: 'indigenous',
        proteinSourceType: 'fish',
        calories: 550,
        protein: 34,
        carbs: 50,
        fat: 22,
        fiber: 8,
        cookTimeMinutes: 20,
        readyToEatQuery: 'Salmon Breakfast Bowl with Wild Rice',
        ingredients: [
          { name: 'Smoked Salmon', gramWeight: 120, baseNGNCost: 1650, protein: 26, carbs: 0, fat: 6, fiber: 0, sourcingLocation: 'St. Lawrence Fish Market' },
          { name: 'Wild Rice', gramWeight: 170, baseNGNCost: 520, protein: 8, carbs: 56, fat: 2, fiber: 4, sourcingLocation: 'Manitoba Grain Company' },
          { name: 'Avocado', gramWeight: 100, baseNGNCost: 300, protein: 3, carbs: 8, fat: 20, fiber: 7, sourcingLocation: 'St. Lawrence Market Produce' },
          { name: 'Lemon Dill Dressing', gramWeight: 30, baseNGNCost: 140, protein: 0, carbs: 2, fat: 13, fiber: 1, sourcingLocation: 'St. Lawrence Market Pantry' },
        ],
        prepInstructions: [
          'Cook the wild rice until tender.',
          'Layer it with sliced avocado.',
          'Top with smoked salmon and spoon over the dressing.',
        ]
      }
    ],
    poultry: [
      {
        title: 'Chicken Breakfast Bowl with Greens',
        description: 'Grilled chicken over roasted potatoes with wilted greens.',
        visualType: 'grilled_fish',
        style: 'indigenous',
        proteinSourceType: 'poultry',
        calories: 570,
        protein: 42,
        carbs: 48,
        fat: 22,
        fiber: 9,
        cookTimeMinutes: 40,
        readyToEatQuery: 'Chicken Breakfast Bowl with Greens',
        ingredients: [
          { name: 'Chicken Breast', gramWeight: 170, baseNGNCost: 1280, protein: 40, carbs: 0, fat: 5, fiber: 0, sourcingLocation: 'St. Lawrence Poultry' },
          { name: 'Roast Potatoes', gramWeight: 200, baseNGNCost: 400, protein: 5, carbs: 44, fat: 10, fiber: 5, sourcingLocation: 'St. Lawrence Market Produce' },
          { name: 'Wilted Greens', gramWeight: 150, baseNGNCost: 280, protein: 6, carbs: 12, fat: 7, fiber: 7, sourcingLocation: 'St. Lawrence Market Produce' },
          { name: 'Maple Drizzle', gramWeight: 20, baseNGNCost: 110, protein: 0, carbs: 8, fat: 0, fiber: 0, sourcingLocation: 'Ontario Maple Producers' },
        ],
        prepInstructions: [
          'Roast the diced potatoes until golden.',
          'Grill the chicken breast.',
          'Wilt the greens in a little butter and plate everything with maple.',
        ]
      },
      {
        title: 'Turkey Wrap with Avocado & Egg',
        description: 'Sliced turkey with avocado and a soft egg rolled in a tortilla.',
        visualType: 'chicken_salad',
        style: 'indigenous',
        proteinSourceType: 'poultry',
        calories: 540,
        protein: 36,
        carbs: 44,
        fat: 23,
        fiber: 10,
        cookTimeMinutes: 20,
        readyToEatQuery: 'Turkey Wrap with Avocado',
        ingredients: [
          { name: 'Turkey Breast', gramWeight: 130, baseNGNCost: 1150, protein: 30, carbs: 0, fat: 4, fiber: 0, sourcingLocation: 'Boreal Game & Poultry' },
          { name: 'Flour Tortilla', gramWeight: 90, baseNGNCost: 190, protein: 3, carbs: 38, fat: 3, fiber: 3, sourcingLocation: 'St. Lawrence Bakeries' },
          { name: 'Avocado', gramWeight: 110, baseNGNCost: 320, protein: 3, carbs: 10, fat: 24, fiber: 7, sourcingLocation: 'St. Lawrence Market Produce' },
          { name: 'Egg', gramWeight: 120, baseNGNCost: 450, protein: 13, carbs: 1, fat: 10, fiber: 0, sourcingLocation: 'St. Lawrence Dairy' },
        ],
        prepInstructions: [
          'Warm the tortilla.',
          'Fill with turkey, avocado and a soft-boiled egg.',
          'Roll tightly and cut in half.',
        ]
      }
    ],
    eggs_dairy: [
      {
        title: 'Bacon & Cheddar Omelette with Toast',
        description: 'A cheese omelette with crisp bacon, served with buttered toast.',
        visualType: 'yam_egg_skillet',
        style: 'indigenous',
        proteinSourceType: 'eggs_dairy',
        calories: 620,
        protein: 30,
        carbs: 36,
        fat: 38,
        fiber: 4,
        cookTimeMinutes: 20,
        readyToEatQuery: 'Bacon and Cheddar Omelette',
        ingredients: [
          { name: 'Eggs', gramWeight: 160, baseNGNCost: 600, protein: 17, carbs: 1, fat: 12, fiber: 0, sourcingLocation: 'St. Lawrence Dairy' },
          { name: 'Bacon', gramWeight: 60, baseNGNCost: 620, protein: 10, carbs: 0, fat: 52, fiber: 0, sourcingLocation: 'St. Lawrence Butchers' },
          { name: 'Cheddar', gramWeight: 60, baseNGNCost: 300, protein: 7, carbs: 1, fat: 22, fiber: 0, sourcingLocation: 'St. Lawrence Cheese Counter' },
          { name: 'Toast', gramWeight: 80, baseNGNCost: 200, protein: 4, carbs: 32, fat: 2, fiber: 3, sourcingLocation: 'St. Lawrence Bakeries' },
        ],
        prepInstructions: [
          'Crisp the bacon and drain.',
          'Whisk the eggs, fill with cheddar and bacon, and fold.',
          'Serve with buttered toast.',
        ]
      },
      {
        title: 'Pancakes au Sirop d’Érable with Blueberries',
        description: 'Thin Québec-style pancakes with maple syrup, blueberries and crème fraîche.',
        visualType: 'oatmeal_parfait',
        style: 'indigenous',
        proteinSourceType: 'eggs_dairy',
        calories: 590,
        protein: 18,
        carbs: 72,
        fat: 23,
        fiber: 5,
        cookTimeMinutes: 25,
        readyToEatQuery: 'Québec Pancakes with Maple Syrup',
        ingredients: [
          { name: 'Buckwheat Pancakes', gramWeight: 250, baseNGNCost: 520, protein: 16, carbs: 66, fat: 14, fiber: 3, sourcingLocation: 'St. Lawrence Bakeries' },
          { name: 'Maple Syrup', gramWeight: 60, baseNGNCost: 340, protein: 0, carbs: 16, fat: 0, fiber: 0, sourcingLocation: 'Ontario Maple Producers' },
          { name: 'Crème Fraîche', gramWeight: 40, baseNGNCost: 210, protein: 1, carbs: 2, fat: 18, fiber: 0, sourcingLocation: 'St. Lawrence Dairy' },
          { name: 'Blueberries', gramWeight: 80, baseNGNCost: 210, protein: 1, carbs: 11, fat: 1, fiber: 5, sourcingLocation: 'St. Lawrence Market Produce' },
        ],
        prepInstructions: [
          'Cook the thin buckwheat pancakes until set, flipping once.',
          'Stack them and finish with crème fraîche and blueberries.',
          'Pour the maple syrup over at the table.',
        ]
      }
    ],
    legumes_plant: [
      {
        title: 'Bean & Avocado Toast with Poached Egg',
        description: 'Mashed beans and avocado on sourdough, topped with a poached egg.',
        visualType: 'beans_plantain',
        style: 'indigenous',
        proteinSourceType: 'legumes_plant',
        calories: 550,
        protein: 22,
        carbs: 50,
        fat: 24,
        fiber: 16,
        cookTimeMinutes: 20,
        readyToEatQuery: 'Bean and Avocado Toast',
        ingredients: [
          { name: 'Mashed Beans', gramWeight: 160, baseNGNCost: 520, protein: 12, carbs: 32, fat: 2, fiber: 10, sourcingLocation: 'St. Lawrence Market Beans' },
          { name: 'Sourdough Toast', gramWeight: 90, baseNGNCost: 200, protein: 7, carbs: 34, fat: 2, fiber: 3, sourcingLocation: 'St. Lawrence Bakeries' },
          { name: 'Avocado', gramWeight: 100, baseNGNCost: 300, protein: 3, carbs: 10, fat: 24, fiber: 7, sourcingLocation: 'St. Lawrence Market Produce' },
          { name: 'Poached Egg', gramWeight: 60, baseNGNCost: 230, protein: 7, carbs: 0, fat: 5, fiber: 0, sourcingLocation: 'St. Lawrence Dairy' },
        ],
        prepInstructions: [
          'Warm the beans with a little oil and season them.',
          'Mash the avocado onto the toast and spoon over the beans.',
          'Top with a poached egg.',
        ]
      },
      {
        title: 'Greek Yogurt & Granola Parfait',
        description: 'Thick Greek yogurt layered with granola, berries and honey.',
        visualType: 'oatmeal_parfait',
        style: 'indigenous',
        proteinSourceType: 'legumes_plant',
        calories: 500,
        protein: 20,
        carbs: 60,
        fat: 18,
        fiber: 8,
        cookTimeMinutes: 10,
        readyToEatQuery: 'Greek Yogurt Granola Parfait',
        ingredients: [
          { name: 'Greek Yogurt', gramWeight: 220, baseNGNCost: 420, protein: 20, carbs: 16, fat: 14, fiber: 0, sourcingLocation: 'St. Lawrence Dairy' },
          { name: 'Granola', gramWeight: 80, baseNGNCost: 280, protein: 4, carbs: 34, fat: 10, fiber: 5, sourcingLocation: 'Whole Foods Canada' },
          { name: 'Mixed Berries', gramWeight: 120, baseNGNCost: 260, protein: 1, carbs: 26, fat: 1, fiber: 6, sourcingLocation: 'St. Lawrence Market Produce' },
          { name: 'Honey', gramWeight: 30, baseNGNCost: 140, protein: 0, carbs: 16, fat: 0, fiber: 0, sourcingLocation: 'St. Lawrence Market Pantry' },
        ],
        prepInstructions: [
          'Layer the yogurt, granola and berries in a glass.',
          'Drizzle with honey and serve.',
        ]
      }
    ],
    beef_lean: [
      {
        title: 'Steak & Egg Breakfast Plate',
        description: 'A grilled strip of steak with fried eggs and maple roasted potatoes.',
        visualType: 'grilled_fish',
        style: 'indigenous',
        proteinSourceType: 'beef_lean',
        calories: 640,
        protein: 45,
        carbs: 46,
        fat: 28,
        fiber: 6,
        cookTimeMinutes: 35,
        readyToEatQuery: 'Steak and Egg Breakfast Plate',
        ingredients: [
          { name: 'Sirloin Steak', gramWeight: 170, baseNGNCost: 2150, protein: 42, carbs: 0, fat: 13, fiber: 0, sourcingLocation: 'St. Lawrence Butchers' },
          { name: 'Eggs', gramWeight: 140, baseNGNCost: 520, protein: 15, carbs: 1, fat: 11, fiber: 0, sourcingLocation: 'St. Lawrence Dairy' },
          { name: 'Maple Roast Potatoes', gramWeight: 220, baseNGNCost: 440, protein: 5, carbs: 48, fat: 10, fiber: 5, sourcingLocation: 'St. Lawrence Market Produce' },
          { name: 'Tomato', gramWeight: 100, baseNGNCost: 150, protein: 2, carbs: 10, fat: 2, fiber: 4, sourcingLocation: 'St. Lawrence Market Produce' },
        ],
        prepInstructions: [
          'Grill the steak and rest it before slicing.',
          'Roast the potatoes with a maple glaze.',
          'Fry the eggs and serve with tomato.',
        ]
      },
      {
        title: 'Beef Toastie with Cheddar & Tomato',
        description: 'Sliced roast beef and sharp cheddar pressed in a toasted roll with tomato.',
        visualType: 'grilled_fish',
        style: 'indigenous',
        proteinSourceType: 'beef_lean',
        calories: 620,
        protein: 42,
        carbs: 48,
        fat: 28,
        fiber: 6,
        cookTimeMinutes: 25,
        readyToEatQuery: 'Beef Toastie with Cheddar',
        ingredients: [
          { name: 'Roast Beef', gramWeight: 150, baseNGNCost: 1850, protein: 36, carbs: 0, fat: 9, fiber: 0, sourcingLocation: 'St. Lawrence Butchers' },
          { name: 'Cheddar', gramWeight: 60, baseNGNCost: 300, protein: 7, carbs: 1, fat: 22, fiber: 0, sourcingLocation: 'St. Lawrence Cheese Counter' },
          { name: 'Crusty Roll', gramWeight: 100, baseNGNCost: 220, protein: 7, carbs: 42, fat: 2, fiber: 3, sourcingLocation: 'St. Lawrence Bakeries' },
          { name: 'Tomato & Butter', gramWeight: 110, baseNGNCost: 220, protein: 3, carbs: 13, fat: 10, fiber: 4, sourcingLocation: 'St. Lawrence Market Produce' },
        ],
        prepInstructions: [
          'Layer the beef, cheddar and tomato in a buttered roll.',
          'Press in a hot pan until the cheese melts.',
          'Serve immediately.',
        ]
      }
    ]
  },
  UK: {
    fish: [
      {
        title: 'Smoked Haddock & Egg on Toast',
        description: 'Flaked smoked haddock scrambled with egg, served on buttered toast.',
        visualType: 'yam_egg_skillet',
        style: 'indigenous',
        proteinSourceType: 'fish',
        calories: 470,
        protein: 32,
        carbs: 36,
        fat: 20,
        fiber: 5,
        cookTimeMinutes: 20,
        readyToEatQuery: 'Smoked Haddock and Egg on Toast',
        ingredients: [
          { name: 'Smoked Haddock', gramWeight: 110, baseNGNCost: 1150, protein: 22, carbs: 0, fat: 4, fiber: 0, sourcingLocation: 'Billingsgate Fish Market' },
          { name: 'Eggs', gramWeight: 140, baseNGNCost: 520, protein: 15, carbs: 1, fat: 11, fiber: 0, sourcingLocation: 'Borough Market Dairy' },
          { name: 'Toast', gramWeight: 90, baseNGNCost: 200, protein: 4, carbs: 32, fat: 2, fiber: 4, sourcingLocation: 'Borough Market Bakeries' },
          { name: 'Butter & Pepper', gramWeight: 25, baseNGNCost: 170, protein: 0, carbs: 0, fat: 18, fiber: 0, sourcingLocation: 'Borough Market Dairy' },
        ],
        prepInstructions: [
          'Flake the haddock and add to softly scrambled eggs.',
          'Toast and butter the bread.',
          'Serve the eggs on toast with black pepper.',
        ]
      },
      {
        title: 'Grilled Mackerel with Toast & Tomato',
        description: 'A grilled mackerel fillet with buttered toast and sliced tomato.',
        visualType: 'grilled_fish',
        style: 'indigenous',
        proteinSourceType: 'fish',
        calories: 520,
        protein: 34,
        carbs: 34,
        fat: 26,
        fiber: 5,
        cookTimeMinutes: 20,
        readyToEatQuery: 'Grilled Mackerel with Toast',
        ingredients: [
          { name: 'Mackerel Fillet', gramWeight: 160, baseNGNCost: 1100, protein: 30, carbs: 0, fat: 8, fiber: 0, sourcingLocation: 'Billingsgate Fish Market' },
          { name: 'Toast', gramWeight: 90, baseNGNCost: 200, protein: 4, carbs: 32, fat: 2, fiber: 4, sourcingLocation: 'Borough Market Bakeries' },
          { name: 'Tomato', gramWeight: 120, baseNGNCost: 180, protein: 3, carbs: 12, fat: 2, fiber: 4, sourcingLocation: 'Borough Market Produce' },
          { name: 'Butter', gramWeight: 25, baseNGNCost: 180, protein: 0, carbs: 0, fat: 20, fiber: 0, sourcingLocation: 'Borough Market Dairy' },
        ],
        prepInstructions: [
          'Grill the mackerel until crisp and golden.',
          'Butter and toast the bread.',
          'Serve with sliced tomato.',
        ]
      }
    ],
    poultry: [
      {
        title: 'Chicken & Leek Muffin',
        description: 'Shredded chicken and leek tucked into a toasted English muffin.',
        visualType: 'yam_egg_skillet',
        style: 'indigenous',
        proteinSourceType: 'poultry',
        calories: 520,
        protein: 34,
        carbs: 44,
        fat: 20,
        fiber: 7,
        cookTimeMinutes: 20,
        readyToEatQuery: 'Chicken and Leek Muffin',
        ingredients: [
          { name: 'Chicken Breast', gramWeight: 140, baseNGNCost: 1020, protein: 32, carbs: 0, fat: 4, fiber: 0, sourcingLocation: 'Borough Market Poultry' },
          { name: 'Leek', gramWeight: 120, baseNGNCost: 220, protein: 3, carbs: 13, fat: 2, fiber: 4, sourcingLocation: 'Borough Market Produce' },
          { name: 'English Muffin', gramWeight: 100, baseNGNCost: 220, protein: 7, carbs: 42, fat: 2, fiber: 3, sourcingLocation: 'Borough Market Bakeries' },
          { name: 'Cheddar', gramWeight: 40, baseNGNCost: 210, protein: 5, carbs: 1, fat: 15, fiber: 0, sourcingLocation: 'Borough Market Cheese' },
        ],
        prepInstructions: [
          'Sweat the sliced leek in butter until soft.',
          'Mix with shredded chicken and grated cheddar.',
          'Fill a toasted muffin and grill until melted.',
        ]
      },
      {
        title: 'Chicken Sausage Wrap with Salad',
        description: 'A grilled chicken sausage in a warm wrap with salad and tomato.',
        visualType: 'chicken_salad',
        style: 'indigenous',
        proteinSourceType: 'poultry',
        calories: 540,
        protein: 32,
        carbs: 48,
        fat: 24,
        fiber: 7,
        cookTimeMinutes: 25,
        readyToEatQuery: 'Chicken Sausage Wrap',
        ingredients: [
          { name: 'Chicken Sausage', gramWeight: 140, baseNGNCost: 1150, protein: 24, carbs: 3, fat: 16, fiber: 0, sourcingLocation: 'Borough Market Poultry' },
          { name: 'Wrap', gramWeight: 100, baseNGNCost: 320, protein: 9, carbs: 42, fat: 4, fiber: 3, sourcingLocation: 'Borough Market Bakeries' },
          { name: 'Lettuce & Tomato', gramWeight: 150, baseNGNCost: 240, protein: 3, carbs: 14, fat: 3, fiber: 5, sourcingLocation: 'Borough Market Produce' },
          { name: 'Salad Cream', gramWeight: 30, baseNGNCost: 110, protein: 1, carbs: 2, fat: 8, fiber: 0, sourcingLocation: 'Borough Market Pantry' },
        ],
        prepInstructions: [
          'Grill the sausage until browned all over.',
          'Warm the wrap and fill with dressed salad.',
          'Roll tightly and serve.',
        ]
      }
    ],
    eggs_dairy: [
      {
        title: 'Egg & Cheese Muffin',
        description: 'A soft egg and cheddar muffin, toasted and served with butter.',
        visualType: 'yam_egg_skillet',
        style: 'indigenous',
        proteinSourceType: 'eggs_dairy',
        calories: 500,
        protein: 26,
        carbs: 38,
        fat: 26,
        fiber: 4,
        cookTimeMinutes: 20,
        readyToEatQuery: 'Egg and Cheese Muffin',
        ingredients: [
          { name: 'Eggs', gramWeight: 150, baseNGNCost: 560, protein: 16, carbs: 1, fat: 11, fiber: 0, sourcingLocation: 'Borough Market Dairy' },
          { name: 'Cheddar', gramWeight: 60, baseNGNCost: 300, protein: 7, carbs: 1, fat: 22, fiber: 0, sourcingLocation: 'Borough Market Cheese' },
          { name: 'English Muffin', gramWeight: 100, baseNGNCost: 220, protein: 7, carbs: 42, fat: 2, fiber: 3, sourcingLocation: 'Borough Market Bakeries' },
          { name: 'Butter', gramWeight: 25, baseNGNCost: 180, protein: 0, carbs: 0, fat: 20, fiber: 0, sourcingLocation: 'Borough Market Dairy' },
        ],
        prepInstructions: [
          'Beat the egg with grated cheddar and salt.',
          'Spoon into split muffin halves and bake until set.',
          'Toast and serve with butter.',
        ]
      },
      {
        title: 'Boiled Eggs with Soldiers & Tomato',
        description: 'Soft-boiled eggs with buttered toast soldiers and sliced tomato.',
        visualType: 'yam_egg_skillet',
        style: 'indigenous',
        proteinSourceType: 'eggs_dairy',
        calories: 480,
        protein: 24,
        carbs: 38,
        fat: 22,
        fiber: 5,
        cookTimeMinutes: 20,
        readyToEatQuery: 'Boiled Eggs with Soldiers',
        ingredients: [
          { name: 'Eggs', gramWeight: 160, baseNGNCost: 600, protein: 17, carbs: 1, fat: 12, fiber: 0, sourcingLocation: 'Borough Market Dairy' },
          { name: 'Toast', gramWeight: 110, baseNGNCost: 240, protein: 5, carbs: 38, fat: 2, fiber: 4, sourcingLocation: 'Borough Market Bakeries' },
          { name: 'Tomato', gramWeight: 120, baseNGNCost: 180, protein: 3, carbs: 12, fat: 2, fiber: 4, sourcingLocation: 'Borough Market Produce' },
          { name: 'Butter', gramWeight: 30, baseNGNCost: 210, protein: 0, carbs: 0, fat: 24, fiber: 0, sourcingLocation: 'Borough Market Dairy' },
        ],
        prepInstructions: [
          'Boil the eggs for six minutes for a jammy yolk.',
          'Butter and cut the toast into soldiers.',
          'Serve with sliced tomato.',
        ]
      }
    ],
    legumes_plant: [
      {
        title: 'Porridge with Apple & Cinnamon',
        description: 'Oat porridge cooked with apple, cinnamon and a little brown sugar.',
        visualType: 'oatmeal_parfait',
        style: 'indigenous',
        proteinSourceType: 'legumes_plant',
        calories: 480,
        protein: 14,
        carbs: 72,
        fat: 13,
        fiber: 10,
        cookTimeMinutes: 15,
        readyToEatQuery: 'Apple Cinnamon Porridge',
        ingredients: [
          { name: 'Rolled Oats', gramWeight: 90, baseNGNCost: 230, protein: 8, carbs: 48, fat: 3, fiber: 7, sourcingLocation: 'Borough Market Pulses' },
          { name: 'Apple', gramWeight: 150, baseNGNCost: 240, protein: 1, carbs: 32, fat: 1, fiber: 6, sourcingLocation: 'Borough Market Produce' },
          { name: 'Milk', gramWeight: 200, baseNGNCost: 240, protein: 7, carbs: 20, fat: 12, fiber: 0, sourcingLocation: 'Borough Market Dairy' },
          { name: 'Cinnamon & Sugar', gramWeight: 15, baseNGNCost: 90, protein: 0, carbs: 8, fat: 0, fiber: 1, sourcingLocation: 'Borough Market Pantry' },
        ],
        prepInstructions: [
          'Cook the oats in milk, stirring, until creamy.',
          'Stir through diced apple, cinnamon and sugar.',
          'Serve warm.',
        ]
      },
      {
        title: 'Tomato & Bean Toast with Mash',
        description: 'Baked beans in a rich tomato sauce on toast, with mashed potato alongside.',
        visualType: 'beans_plantain',
        style: 'indigenous',
        proteinSourceType: 'legumes_plant',
        calories: 520,
        protein: 18,
        carbs: 68,
        fat: 15,
        fiber: 14,
        cookTimeMinutes: 40,
        readyToEatQuery: 'Tomato and Bean Toast',
        ingredients: [
          { name: 'Baked Beans', gramWeight: 220, baseNGNCost: 520, protein: 14, carbs: 38, fat: 2, fiber: 10, sourcingLocation: 'Borough Market Pantry' },
          { name: 'Toast', gramWeight: 90, baseNGNCost: 200, protein: 4, carbs: 32, fat: 2, fiber: 4, sourcingLocation: 'Borough Market Bakeries' },
          { name: 'Mashed Potato', gramWeight: 200, baseNGNCost: 360, protein: 5, carbs: 38, fat: 9, fiber: 5, sourcingLocation: 'Borough Market Potatoes' },
          { name: 'Tomato & Onion', gramWeight: 120, baseNGNCost: 180, protein: 3, carbs: 14, fat: 3, fiber: 4, sourcingLocation: 'Borough Market Produce' },
        ],
        prepInstructions: [
          'Simmer the beans with tomato and onion until thick.',
          'Toast the bread and spoon over the beans.',
          'Serve with mashed potato.',
        ]
      }
    ],
    beef_lean: [
      {
        title: 'Steak Toastie with Chips',
        description: 'Sliced steak and cheese pressed in a toasted roll, with chips.',
        visualType: 'grilled_fish',
        style: 'indigenous',
        proteinSourceType: 'beef_lean',
        calories: 680,
        protein: 44,
        carbs: 54,
        fat: 28,
        fiber: 7,
        cookTimeMinutes: 35,
        readyToEatQuery: 'Steak Toastie with Chips',
        ingredients: [
          { name: 'Sirloin Steak', gramWeight: 160, baseNGNCost: 1950, protein: 38, carbs: 0, fat: 11, fiber: 0, sourcingLocation: 'Borough Market Butchers' },
          { name: 'Cheddar', gramWeight: 50, baseNGNCost: 260, protein: 6, carbs: 1, fat: 19, fiber: 0, sourcingLocation: 'Borough Market Cheese' },
          { name: 'Crusty Roll', gramWeight: 100, baseNGNCost: 220, protein: 7, carbs: 42, fat: 2, fiber: 3, sourcingLocation: 'Borough Market Bakeries' },
          { name: 'Chips', gramWeight: 220, baseNGNCost: 420, protein: 5, carbs: 46, fat: 12, fiber: 5, sourcingLocation: 'Borough Market Potatoes' },
        ],
        prepInstructions: [
          'Slice the cooked steak and layer it with cheddar in a buttered roll.',
          'Press until the cheese melts.',
          'Serve with chips.',
        ]
      },
      {
        title: 'Corned Beef Hash with Fried Egg',
        description: 'Corned beef hash with crisp potatoes, topped with a fried egg.',
        visualType: 'grilled_fish',
        style: 'indigenous',
        proteinSourceType: 'beef_lean',
        calories: 650,
        protein: 36,
        carbs: 52,
        fat: 30,
        fiber: 6,
        cookTimeMinutes: 30,
        readyToEatQuery: 'Corned Beef Hash with Fried Egg',
        ingredients: [
          { name: 'Corned Beef', gramWeight: 150, baseNGNCost: 1300, protein: 28, carbs: 0, fat: 12, fiber: 0, sourcingLocation: 'Borough Market Butchers' },
          { name: 'Potatoes', gramWeight: 240, baseNGNCost: 420, protein: 6, carbs: 48, fat: 10, fiber: 5, sourcingLocation: 'Borough Market Potatoes' },
          { name: 'Eggs', gramWeight: 110, baseNGNCost: 410, protein: 12, carbs: 1, fat: 9, fiber: 0, sourcingLocation: 'Borough Market Dairy' },
          { name: 'Onion & Butter', gramWeight: 80, baseNGNCost: 200, protein: 2, carbs: 10, fat: 14, fiber: 2, sourcingLocation: 'Borough Market Produce' },
        ],
        prepInstructions: [
          'Fry diced potatoes with onion until golden, then fold in the corned beef.',
          'Cook the hash until crisp at the edges.',
          'Top with a fried egg.',
        ]
      }
    ]
  }
};
