/**
 * Second and third main course per protein, per market.
 *
 * The original catalogue shipped one main per protein, so the rotation had
 * nothing to move between afternoon and evening and both slots rendered the
 * identical dish on all 28 days. These are merged into COUNTRY_CUISINES at
 * load so each protein pool holds three dishes: lunch takes one, dinner takes
 * the next, and the cycle has real variety instead of five repeats.
 */
import type { MealBlueprint } from '../types';

export type ProteinKey = MealBlueprint['proteinSourceType'];

export const EXTRA_MAINS: Record<string, Record<ProteinKey, MealBlueprint[]>> = {
  GH: {
    fish: [
      {
        title: 'Mackerel in Okro Stew with Banku & Pepper',
        description: 'Mackerel chunks simmered in a light okro stew, served with soft banku and shito pepper.',
        visualType: 'stew_swallow',
        style: 'indigenous',
        proteinSourceType: 'fish',
        calories: 600,
        protein: 40,
        carbs: 58,
        fat: 20,
        fiber: 8,
        cookTimeMinutes: 35,
        readyToEatQuery: 'Okro Steamed Mackerel with Banku',
        ingredients: [
          { name: 'Mackerel Fillet', gramWeight: 220, baseNGNCost: 1250, protein: 38, carbs: 0, fat: 8, fiber: 0, sourcingLocation: 'James Town Fish Market' },
          { name: 'Okro (Lady Fingers)', gramWeight: 150, baseNGNCost: 320, protein: 3, carbs: 14, fat: 1, fiber: 5, sourcingLocation: 'Makola Vegetable Stall' },
          { name: 'Banku (Corn Dough)', gramWeight: 180, baseNGNCost: 270, protein: 4, carbs: 55, fat: 1, fiber: 4, sourcingLocation: 'Makola Maize Vendors' },
          { name: 'Shito Pepper Blend', gramWeight: 8, baseNGNCost: 120, protein: 1, carbs: 3, fat: 4, fiber: 1, sourcingLocation: 'Makola Spice Stall' },
        ],
        prepInstructions: [
          'Simmer the mackerel in okro with tomato, onion and ginger until tender.',
          'Knead banku with warm water into a smooth dough and shape into fingers.',
          'Serve the okro stew over banku with shito on the side.',
        ]
      },
      {
        title: 'Grilled Sardines with Waakye & Shito',
        description: 'Small sardines grilled crisp and laid over waakye rice and beans with hot shito.',
        visualType: 'jollof_bowl',
        style: 'indigenous',
        proteinSourceType: 'fish',
        calories: 560,
        protein: 42,
        carbs: 58,
        fat: 18,
        fiber: 9,
        cookTimeMinutes: 30,
        readyToEatQuery: 'Grilled Sardines with Waakye',
        ingredients: [
          { name: 'Fresh Sardines', gramWeight: 250, baseNGNCost: 1100, protein: 44, carbs: 0, fat: 7, fiber: 0, sourcingLocation: 'James Town Fish Market' },
          { name: 'Waakye (Rice & Cowpea)', gramWeight: 220, baseNGNCost: 600, protein: 10, carbs: 66, fat: 3, fiber: 6, sourcingLocation: 'Makola Rice Millers' },
          { name: 'Shito Pepper Blend', gramWeight: 8, baseNGNCost: 120, protein: 1, carbs: 3, fat: 4, fiber: 1, sourcingLocation: 'Makola Spice Stall' },
          { name: 'Tomato & Onion Garnish', gramWeight: 80, baseNGNCost: 90, protein: 2, carbs: 9, fat: 0, fiber: 2, sourcingLocation: 'Makola Vegetable Stall' },
        ],
        prepInstructions: [
          'Grill the sardines over open flame until crisp on both sides.',
          'Reheat the waakye with a splash of water so it steams.',
          'Pile the sardines over the waakye and finish with shito and raw tomato.',
        ]
      }
    ],
    poultry: [
      {
        title: 'Okro Soup with Grilled Chicken & Banku',
        description: 'Chicken simmered in okro soup, served with a golden grilled chicken piece and banku.',
        visualType: 'stew_swallow',
        style: 'indigenous',
        proteinSourceType: 'poultry',
        calories: 640,
        protein: 44,
        carbs: 58,
        fat: 22,
        fiber: 8,
        cookTimeMinutes: 45,
        readyToEatQuery: 'Okro Soup with Grilled Chicken',
        ingredients: [
          { name: 'Chicken Thigh', gramWeight: 200, baseNGNCost: 1350, protein: 38, carbs: 0, fat: 10, fiber: 0, sourcingLocation: 'Makola Poultry Stalls' },
          { name: 'Okro (Lady Fingers)', gramWeight: 150, baseNGNCost: 320, protein: 3, carbs: 14, fat: 1, fiber: 5, sourcingLocation: 'Makola Vegetable Stall' },
          { name: 'Banku (Corn Dough)', gramWeight: 180, baseNGNCost: 270, protein: 4, carbs: 55, fat: 1, fiber: 4, sourcingLocation: 'Makola Maize Vendors' },
          { name: 'Tomato & Onion Base', gramWeight: 150, baseNGNCost: 180, protein: 3, carbs: 16, fat: 2, fiber: 3, sourcingLocation: 'Makola Vegetable Stall' },
        ],
        prepInstructions: [
          'Blend tomato, onion and pepper, then simmer with okro slices.',
          'Add the chicken and cook until the flesh slips off the bone.',
          'Grill one chicken piece until charred and serve with the soup and banku.',
        ]
      },
    ],
    eggs_dairy: [
      {
        title: 'Egg Stew with Boiled Egg & Bread',
        description: 'Eggs cooked to order in a rich tomato stew, served with a slice of bread and boiled egg.',
        visualType: 'beans_plantain',
        style: 'indigenous',
        proteinSourceType: 'eggs_dairy',
        calories: 470,
        protein: 24,
        carbs: 44,
        fat: 20,
        fiber: 6,
        cookTimeMinutes: 20,
        readyToEatQuery: 'Egg Stew with Boiled Egg',
        ingredients: [
          { name: 'Eggs', gramWeight: 150, baseNGNCost: 560, protein: 16, carbs: 1, fat: 11, fiber: 0, sourcingLocation: 'Makola Egg Vendors' },
          { name: 'Tomato Stew Base', gramWeight: 200, baseNGNCost: 260, protein: 5, carbs: 22, fat: 8, fiber: 4, sourcingLocation: 'Makola Vegetable Stall' },
          { name: 'Bread Slice', gramWeight: 60, baseNGNCost: 120, protein: 3, carbs: 26, fat: 1, fiber: 2, sourcingLocation: 'Makola Bakeries' },
          { name: 'Onion & Pepper', gramWeight: 80, baseNGNCost: 90, protein: 2, carbs: 9, fat: 1, fiber: 2, sourcingLocation: 'Makola Vegetable Stall' },
        ],
        prepInstructions: [
          'Fry sliced tomato, onion and pepper until the base thickens.',
          'Break the eggs into the stew and cook gently until just set.',
          'Serve in a bowl with bread for dipping.',
        ]
      },
      {
        title: 'Kontomire Stew with Omelette & Rice',
        description: 'A dark, spicy spinach and palm-nut stew with a folded omelette and white rice.',
        visualType: 'stew_swallow',
        style: 'indigenous',
        proteinSourceType: 'eggs_dairy',
        calories: 520,
        protein: 28,
        carbs: 48,
        fat: 22,
        fiber: 9,
        cookTimeMinutes: 35,
        readyToEatQuery: 'Kontomire Stew with Omelette',
        ingredients: [
          { name: 'Eggs', gramWeight: 150, baseNGNCost: 560, protein: 16, carbs: 1, fat: 11, fiber: 0, sourcingLocation: 'Makola Egg Vendors' },
          { name: 'Kontomire (Spinach)', gramWeight: 200, baseNGNCost: 300, protein: 7, carbs: 14, fat: 5, fiber: 8, sourcingLocation: 'Makola Vegetable Stall' },
          { name: 'White Rice', gramWeight: 180, baseNGNCost: 400, protein: 6, carbs: 58, fat: 1, fiber: 2, sourcingLocation: 'Makola Rice Millers' },
          { name: 'Palm Nut Paste', gramWeight: 40, baseNGNCost: 200, protein: 2, carbs: 4, fat: 8, fiber: 1, sourcingLocation: 'Makola Oil Palm Stall' },
        ],
        prepInstructions: [
          'Wilt the chopped spinach, then cook it with tomato, onion and palm nut paste.',
          'Beat the eggs with sliced onion and fold into a soft omelette.',
          'Serve the omelette over rice with the stew spooned alongside.',
        ]
      }
    ],
    legumes_plant: [
      {
        title: 'Bean Stew with Rice & Kelewele',
        description: 'Slow-cooked black-eyed bean stew in tomato, served with rice and fried plantain.',
        visualType: 'beans_plantain',
        style: 'indigenous',
        proteinSourceType: 'legumes_plant',
        calories: 560,
        protein: 22,
        carbs: 74,
        fat: 14,
        fiber: 16,
        cookTimeMinutes: 50,
        readyToEatQuery: 'Bean Stew with Kelewele',
        ingredients: [
          { name: 'Black-Eyed Beans', gramWeight: 220, baseNGNCost: 700, protein: 16, carbs: 42, fat: 2, fiber: 12, sourcingLocation: 'Makola Bean Vendors' },
          { name: 'Tomato & Onion Base', gramWeight: 200, baseNGNCost: 260, protein: 5, carbs: 22, fat: 8, fiber: 4, sourcingLocation: 'Makola Vegetable Stall' },
          { name: 'White Rice', gramWeight: 180, baseNGNCost: 400, protein: 6, carbs: 58, fat: 1, fiber: 2, sourcingLocation: 'Makola Rice Millers' },
          { name: 'Kelewele (Fried Plantain)', gramWeight: 120, baseNGNCost: 350, protein: 2, carbs: 28, fat: 7, fiber: 2, sourcingLocation: 'Makola Plantain Stall' },
        ],
        prepInstructions: [
          'Soak and simmer the beans until soft, then add a fried tomato and onion base.',
          'Season and simmer until the stew thickens around the beans.',
          'Serve over rice with kelewele fried plantain on the side.',
        ]
      },
      {
        title: 'Tomato Bean Stew with Banku & Pepper',
        description: 'A light, bright tomato bean stew for scooping with soft banku and pepper.',
        visualType: 'beans_plantain',
        style: 'indigenous',
        proteinSourceType: 'legumes_plant',
        calories: 540,
        protein: 20,
        carbs: 72,
        fat: 12,
        fiber: 14,
        cookTimeMinutes: 45,
        readyToEatQuery: 'Tomato Bean Stew with Banku',
        ingredients: [
          { name: 'Black-Eyed Beans', gramWeight: 220, baseNGNCost: 700, protein: 16, carbs: 42, fat: 2, fiber: 12, sourcingLocation: 'Makola Bean Vendors' },
          { name: 'Tomato & Onion Stew', gramWeight: 220, baseNGNCost: 300, protein: 6, carbs: 26, fat: 7, fiber: 5, sourcingLocation: 'Makola Vegetable Stall' },
          { name: 'Banku (Corn Dough)', gramWeight: 180, baseNGNCost: 270, protein: 4, carbs: 55, fat: 1, fiber: 4, sourcingLocation: 'Makola Maize Vendors' },
          { name: 'Shito Pepper Blend', gramWeight: 8, baseNGNCost: 120, protein: 1, carbs: 3, fat: 4, fiber: 1, sourcingLocation: 'Makola Spice Stall' },
        ],
        prepInstructions: [
          'Simmer beans with fresh tomato, onion and pepper until soft.',
          'Cook a smooth batch of banku from fermented corn dough.',
          'Serve the stew in a bowl and scoop with banku, shito on the side.',
        ]
      }
    ],
    beef_lean: [
      {
        title: 'Grilled Beef Khebab with Waakye & Onion',
        description: 'Charcoal-grilled marinated beef skewers with waakye rice and raw onion salad.',
        visualType: 'jollof_bowl',
        style: 'indigenous',
        proteinSourceType: 'beef_lean',
        calories: 690,
        protein: 48,
        carbs: 66,
        fat: 24,
        fiber: 8,
        cookTimeMinutes: 35,
        readyToEatQuery: 'Beef Khebab with Waakye',
        ingredients: [
          { name: 'Beef Sirloin', gramWeight: 200, baseNGNCost: 2200, protein: 44, carbs: 0, fat: 12, fiber: 0, sourcingLocation: 'Makola Butchers' },
          { name: 'Waakye (Rice & Cowpea)', gramWeight: 220, baseNGNCost: 600, protein: 10, carbs: 66, fat: 3, fiber: 6, sourcingLocation: 'Makola Rice Millers' },
          { name: 'Raw Onion Salad', gramWeight: 80, baseNGNCost: 90, protein: 2, carbs: 10, fat: 0, fiber: 2, sourcingLocation: 'Makola Vegetable Stall' },
          { name: 'Khebab Spice Blend', gramWeight: 10, baseNGNCost: 80, protein: 1, carbs: 2, fat: 1, fiber: 1, sourcingLocation: 'Makola Spice Stall' },
        ],
        prepInstructions: [
          'Cube the sirloin and marinate with onion, garlic and khebab spice.',
          'Grill over charcoal, turning often, until charred outside and pink inside.',
          'Serve the skewers with waakye and a dressed raw onion salad.',
        ]
      },
      {
        title: 'Beef Light Soup with Rice & Kelewele',
        description: 'Clear, peppery beef light soup with fine rice and fried plantain.',
        visualType: 'stew_swallow',
        style: 'indigenous',
        proteinSourceType: 'beef_lean',
        calories: 590,
        protein: 44,
        carbs: 58,
        fat: 20,
        fiber: 7,
        cookTimeMinutes: 60,
        readyToEatQuery: 'Beef Light Soup with Rice',
        ingredients: [
          { name: 'Beef Brisket', gramWeight: 200, baseNGNCost: 2100, protein: 42, carbs: 0, fat: 13, fiber: 0, sourcingLocation: 'Makola Butchers' },
          { name: 'Light Soup Spice Blend', gramWeight: 12, baseNGNCost: 150, protein: 2, carbs: 5, fat: 3, fiber: 2, sourcingLocation: 'Makola Spice Stall' },
          { name: 'Tomato & Onion', gramWeight: 150, baseNGNCost: 200, protein: 3, carbs: 16, fat: 4, fiber: 3, sourcingLocation: 'Makola Vegetable Stall' },
          { name: 'Kelewele (Fried Plantain)', gramWeight: 120, baseNGNCost: 350, protein: 2, carbs: 28, fat: 7, fiber: 2, sourcingLocation: 'Makola Plantain Stall' },
        ],
        prepInstructions: [
          'Simmer the brisket with tomato, onion and blended light soup spice until tender.',
          'Strain the broth, shred the beef back into it and skim the fat.',
          'Serve in a bowl with fine rice and kelewele on the side.',
        ]
      }
    ]
  },
  KE: {
    fish: [
      {
        title: 'Grilled Tilapia with Sukuma Wiki & Chapati',
        description: 'Whole tilapia grilled with masala, served with sautéed sukuma wiki and a warm chapati.',
        visualType: 'grilled_fish',
        style: 'indigenous',
        proteinSourceType: 'fish',
        calories: 620,
        protein: 44,
        carbs: 56,
        fat: 22,
        fiber: 8,
        cookTimeMinutes: 35,
        readyToEatQuery: 'Grilled Tilapia with Sukuma Wiki',
        ingredients: [
          { name: 'Whole Tilapia', gramWeight: 230, baseNGNCost: 1400, protein: 42, carbs: 0, fat: 7, fiber: 0, sourcingLocation: 'Lakeside Fish Market' },
          { name: 'Sukuma Wiki Greens', gramWeight: 200, baseNGNCost: 340, protein: 5, carbs: 10, fat: 7, fiber: 7, sourcingLocation: 'Wakulima Vegetable Aisle' },
          { name: 'Chapati', gramWeight: 100, baseNGNCost: 300, protein: 4, carbs: 48, fat: 5, fiber: 3, sourcingLocation: 'Local Bakeries' },
          { name: 'Swahili Masala Blend', gramWeight: 10, baseNGNCost: 110, protein: 1, carbs: 3, fat: 2, fiber: 1, sourcingLocation: 'City Market Spice Stalls' },
        ],
        prepInstructions: [
          'Score and season the tilapia with masala, garlic and lemon.',
          'Grill over charcoal until the skin crisps and the flesh flakes.',
          'Sauté the greens with onion and tomato, and serve everything with chapati.',
        ]
      },
      {
        title: 'Samaki Fish Curry with Rice & Sukuma',
        description: 'Tilapia simmered in fragrant coconut curry, served with rice and collard greens.',
        visualType: 'stew_swallow',
        style: 'indigenous',
        proteinSourceType: 'fish',
        calories: 640,
        protein: 42,
        carbs: 60,
        fat: 24,
        fiber: 8,
        cookTimeMinutes: 45,
        readyToEatQuery: 'Kenyan Fish Curry with Rice',
        ingredients: [
          { name: 'Tilapia Fillets', gramWeight: 220, baseNGNCost: 1350, protein: 40, carbs: 0, fat: 6, fiber: 0, sourcingLocation: 'Lakeside Fish Market' },
          { name: 'Coconut Milk', gramWeight: 150, baseNGNCost: 280, protein: 3, carbs: 8, fat: 20, fiber: 1, sourcingLocation: 'Wakulima Dairy Stalls' },
          { name: 'Rice', gramWeight: 180, baseNGNCost: 380, protein: 6, carbs: 56, fat: 1, fiber: 2, sourcingLocation: 'Wakulima Rice Vendors' },
          { name: 'Sukuma Wiki Greens', gramWeight: 180, baseNGNCost: 320, protein: 5, carbs: 10, fat: 7, fiber: 7, sourcingLocation: 'Wakulima Vegetable Aisle' },
        ],
        prepInstructions: [
          'Fry curry powder, garlic and ginger, then pour in the coconut milk.',
          'Add the tilapia and simmer gently until it flakes.',
          'Serve over rice with separately sautéed collard greens.',
        ]
      }
    ],
    poultry: [
      {
        title: 'Kienyeji Chicken with Rice & Sukuma Wiki',
        description: 'Free-range indigenous chicken braised in tomato and onion, with rice and greens.',
        visualType: 'stew_swallow',
        style: 'indigenous',
        proteinSourceType: 'poultry',
        calories: 650,
        protein: 46,
        carbs: 58,
        fat: 24,
        fiber: 8,
        cookTimeMinutes: 55,
        readyToEatQuery: 'Kienyeji Chicken with Rice',
        ingredients: [
          { name: 'Kienyeji Chicken', gramWeight: 200, baseNGNCost: 1650, protein: 44, carbs: 0, fat: 11, fiber: 0, sourcingLocation: 'City Market Poultry Stalls' },
          { name: 'Tomato & Onion Stew', gramWeight: 200, baseNGNCost: 280, protein: 5, carbs: 22, fat: 8, fiber: 4, sourcingLocation: 'Wakulima Vegetable Aisle' },
          { name: 'Rice', gramWeight: 180, baseNGNCost: 380, protein: 6, carbs: 56, fat: 1, fiber: 2, sourcingLocation: 'Wakulima Rice Vendors' },
          { name: 'Sukuma Wiki Greens', gramWeight: 180, baseNGNCost: 320, protein: 5, carbs: 10, fat: 7, fiber: 7, sourcingLocation: 'Wakulima Vegetable Aisle' },
        ],
        prepInstructions: [
          'Brown the seasoned chicken pieces, then stew them with tomato and onion.',
          'Simmer until the meat is tender and the sauce has reduced.',
          'Serve with rice and a side of sautéed sukuma wiki.',
        ]
      },
      {
        title: 'Chicken Stew with Mashed Potato & Kale',
        description: 'A home-style chicken stew served with smooth mashed potato and braised kale.',
        visualType: 'stew_swallow',
        style: 'indigenous',
        proteinSourceType: 'poultry',
        calories: 680,
        protein: 44,
        carbs: 62,
        fat: 24,
        fiber: 9,
        cookTimeMinutes: 50,
        readyToEatQuery: 'Chicken Stew with Mashed Potato',
        ingredients: [
          { name: 'Chicken Pieces', gramWeight: 200, baseNGNCost: 1500, protein: 42, carbs: 0, fat: 10, fiber: 0, sourcingLocation: 'City Market Poultry Stalls' },
          { name: 'Potatoes', gramWeight: 250, baseNGNCost: 400, protein: 5, carbs: 44, fat: 1, fiber: 5, sourcingLocation: 'Wakulima Vegetable Aisle' },
          { name: 'Carrot & Onion', gramWeight: 150, baseNGNCost: 220, protein: 3, carbs: 18, fat: 3, fiber: 4, sourcingLocation: 'Wakulima Vegetable Aisle' },
          { name: 'Kale', gramWeight: 120, baseNGNCost: 200, protein: 6, carbs: 10, fat: 5, fiber: 6, sourcingLocation: 'Wakulima Vegetable Aisle' },
        ],
        prepInstructions: [
          'Stew the chicken with carrot, onion and tomato until falling apart.',
          'Boil and mash the potatoes with a knob of butter until smooth.',
          'Braise the kale with tomato, then serve everything together.',
        ]
      }
    ],
    eggs_dairy: [
      {
        title: 'Mkate wa Mayai (Egg Curry) with Chapati',
        description: 'Boiled eggs simmered in a spiced tomato onion curry, with chapati for scooping.',
        visualType: 'beans_plantain',
        style: 'indigenous',
        proteinSourceType: 'eggs_dairy',
        calories: 500,
        protein: 22,
        carbs: 52,
        fat: 22,
        fiber: 7,
        cookTimeMinutes: 30,
        readyToEatQuery: 'Kenyan Egg Curry with Chapati',
        ingredients: [
          { name: 'Eggs', gramWeight: 180, baseNGNCost: 680, protein: 20, carbs: 2, fat: 13, fiber: 0, sourcingLocation: 'Wakulima Egg Vendors' },
          { name: 'Tomato & Onion Curry', gramWeight: 220, baseNGNCost: 320, protein: 6, carbs: 26, fat: 9, fiber: 5, sourcingLocation: 'Wakulima Vegetable Aisle' },
          { name: 'Chapati', gramWeight: 120, baseNGNCost: 360, protein: 5, carbs: 58, fat: 6, fiber: 4, sourcingLocation: 'Local Bakeries' },
          { name: 'Coriander & Curry Spice', gramWeight: 10, baseNGNCost: 100, protein: 1, carbs: 2, fat: 1, fiber: 1, sourcingLocation: 'City Market Spice Stalls' },
        ],
        prepInstructions: [
          'Boil the eggs until firm, then lower them into a spiced tomato onion curry.',
          'Simmer until the sauce coats the eggs and the yolks deepen in colour.',
          'Serve the curry with warm chapati and coriander.',
        ]
      },
      {
        title: 'Vegetable Omelette with Chapati & Fruit',
        description: 'A fluffy three-egg omelette folded with peppers and onion, with chapati and seasonal fruit.',
        visualType: 'yam_egg_skillet',
        style: 'indigenous',
        proteinSourceType: 'eggs_dairy',
        calories: 490,
        protein: 23,
        carbs: 44,
        fat: 22,
        fiber: 6,
        cookTimeMinutes: 20,
        readyToEatQuery: 'Vegetable Omelette with Chapati',
        ingredients: [
          { name: 'Eggs', gramWeight: 160, baseNGNCost: 620, protein: 18, carbs: 1, fat: 12, fiber: 0, sourcingLocation: 'Wakulima Egg Vendors' },
          { name: 'Bell Pepper & Onion', gramWeight: 150, baseNGNCost: 250, protein: 3, carbs: 18, fat: 4, fiber: 4, sourcingLocation: 'Wakulima Vegetable Aisle' },
          { name: 'Chapati', gramWeight: 100, baseNGNCost: 300, protein: 4, carbs: 48, fat: 5, fiber: 3, sourcingLocation: 'Local Bakeries' },
          { name: 'Seasonal Fruit', gramWeight: 150, baseNGNCost: 260, protein: 1, carbs: 30, fat: 1, fiber: 5, sourcingLocation: 'Wakulima Fruit Stall' },
        ],
        prepInstructions: [
          'Whisk the eggs with salt, then fold them around sautéed pepper and onion.',
          'Cook the omelette softly and fold it over on one side.',
          'Serve with chapati and a small portion of cut fruit.',
        ]
      },
      {
        title: 'Mayai Chapati Egg & Tomato Wrap',
        description: 'A soft omelette rolled up in warm chapati with fresh tomato, onion and coriander.',
        visualType: 'yam_egg_skillet',
        style: 'indigenous',
        proteinSourceType: 'eggs_dairy',
        calories: 510,
        protein: 24,
        carbs: 50,
        fat: 20,
        fiber: 7,
        cookTimeMinutes: 25,
        readyToEatQuery: 'Mayai Chapati Egg Wrap',
        ingredients: [
          { name: 'Eggs', gramWeight: 150, baseNGNCost: 560, protein: 16, carbs: 1, fat: 11, fiber: 0, sourcingLocation: 'Wakulima Egg Vendors' },
          { name: 'Chapati', gramWeight: 120, baseNGNCost: 360, protein: 5, carbs: 58, fat: 6, fiber: 4, sourcingLocation: 'Local Bakeries' },
          { name: 'Tomato, Onion & Coriander', gramWeight: 150, baseNGNCost: 240, protein: 2, carbs: 16, fat: 2, fiber: 4, sourcingLocation: 'Wakulima Vegetable Aisle' },
          { name: 'Butter & Milk', gramWeight: 20, baseNGNCost: 90, protein: 1, carbs: 1, fat: 7, fiber: 0, sourcingLocation: 'Wakulima Dairy Stalls' },
        ],
        prepInstructions: [
          'Whisk the eggs with a splash of milk, then cook them soft and fluffy.',
          'Warm and soften the chapati in a little butter.',
          'Spread the omelette over the chapati, add diced tomato and onion, and roll it up.',
        ]
      }
    ],
    legumes_plant: [
      {
        title: 'Githeri with Sukuma Wiki & Chapati',
        description: 'Maize and beans cooked together into a spiced githeri, served with greens and chapati.',
        visualType: 'beans_plantain',
        style: 'indigenous',
        proteinSourceType: 'legumes_plant',
        calories: 580,
        protein: 21,
        carbs: 78,
        fat: 14,
        fiber: 16,
        cookTimeMinutes: 45,
        readyToEatQuery: 'Githeri with Sukuma Wiki',
        ingredients: [
          { name: 'Maize Meal', gramWeight: 150, baseNGNCost: 300, protein: 5, carbs: 46, fat: 2, fiber: 4, sourcingLocation: 'Wakulima Maize Vendors' },
          { name: 'Cowpeas (Muthiara)', gramWeight: 160, baseNGNCost: 520, protein: 12, carbs: 32, fat: 2, fiber: 10, sourcingLocation: 'Wakulima Bean Vendors' },
          { name: 'Sukuma Wiki Greens', gramWeight: 180, baseNGNCost: 320, protein: 5, carbs: 10, fat: 7, fiber: 7, sourcingLocation: 'Wakulima Vegetable Aisle' },
          { name: 'Chapati', gramWeight: 80, baseNGNCost: 240, protein: 3, carbs: 38, fat: 4, fiber: 2, sourcingLocation: 'Local Bakeries' },
        ],
        prepInstructions: [
          'Simmer pre-soaked cowpeas, then fold in the maize meal.',
          'Cook together, stirring, until thick and slightly smoky.',
          'Serve with sautéed sukuma wiki and a warm chapati.',
        ]
      },
      {
        title: 'Kenyan Bean Stew with Rice & Sukuma',
        description: 'Slow-cooked beans in a spiced tomato gravy, with rice and collard greens.',
        visualType: 'beans_plantain',
        style: 'indigenous',
        proteinSourceType: 'legumes_plant',
        calories: 570,
        protein: 21,
        carbs: 76,
        fat: 13,
        fiber: 16,
        cookTimeMinutes: 50,
        readyToEatQuery: 'Kenyan Bean Stew with Rice',
        ingredients: [
          { name: 'Rosecoco Beans', gramWeight: 220, baseNGNCost: 720, protein: 16, carbs: 42, fat: 2, fiber: 12, sourcingLocation: 'Wakulima Bean Vendors' },
          { name: 'Tomato & Onion Stew', gramWeight: 220, baseNGNCost: 300, protein: 6, carbs: 26, fat: 7, fiber: 5, sourcingLocation: 'Wakulima Vegetable Aisle' },
          { name: 'Rice', gramWeight: 170, baseNGNCost: 360, protein: 6, carbs: 52, fat: 1, fiber: 2, sourcingLocation: 'Wakulima Rice Vendors' },
          { name: 'Sukuma Wiki Greens', gramWeight: 160, baseNGNCost: 300, protein: 5, carbs: 10, fat: 7, fiber: 7, sourcingLocation: 'Wakulima Vegetable Aisle' },
        ],
        prepInstructions: [
          'Fry the onion and tomato, add spice, then simmer with the soaked beans.',
          'Cook until the beans are soft and the gravy has reduced.',
          'Serve over rice with the greens on the side.',
        ]
      }
    ],
    beef_lean: [
      {
        title: 'Nyama Choma Beef with Sukuma Wiki & Chapati',
        description: 'Slow-roasted marinated beef shank with collard greens and chapati.',
        visualType: 'grilled_fish',
        style: 'indigenous',
        proteinSourceType: 'beef_lean',
        calories: 700,
        protein: 48,
        carbs: 60,
        fat: 26,
        fiber: 8,
        cookTimeMinutes: 70,
        readyToEatQuery: 'Nyama Choma Beef with Sukuma',
        ingredients: [
          { name: 'Beef Shank', gramWeight: 220, baseNGNCost: 2350, protein: 46, carbs: 0, fat: 15, fiber: 0, sourcingLocation: 'City Market Butchery' },
          { name: 'Choma Spice Blend', gramWeight: 12, baseNGNCost: 140, protein: 2, carbs: 4, fat: 3, fiber: 2, sourcingLocation: 'City Market Spice Stalls' },
          { name: 'Sukuma Wiki Greens', gramWeight: 180, baseNGNCost: 320, protein: 5, carbs: 10, fat: 7, fiber: 7, sourcingLocation: 'Wakulima Vegetable Aisle' },
          { name: 'Chapati', gramWeight: 100, baseNGNCost: 300, protein: 4, carbs: 48, fat: 5, fiber: 3, sourcingLocation: 'Local Bakeries' },
        ],
        prepInstructions: [
          'Marinate the beef for several hours in choma spice, garlic and ginger.',
          'Roast slowly over an open fire until browned and tender.',
          'Slice and serve with sautéed sukuma wiki and warm chapati.',
        ]
      },
      {
        title: 'Beef Stroganoff with Mashed Potato',
        description: 'Beef in a rich mushroom and cream sauce, served with buttery mashed potato.',
        visualType: 'stew_swallow',
        style: 'indigenous',
        proteinSourceType: 'beef_lean',
        calories: 720,
        protein: 44,
        carbs: 58,
        fat: 30,
        fiber: 6,
        cookTimeMinutes: 45,
        readyToEatQuery: 'Beef Stroganoff with Mashed Potato',
        ingredients: [
          { name: 'Beef Sirloin', gramWeight: 200, baseNGNCost: 2250, protein: 44, carbs: 0, fat: 13, fiber: 0, sourcingLocation: 'City Market Butchery' },
          { name: 'Mushrooms', gramWeight: 150, baseNGNCost: 300, protein: 5, carbs: 8, fat: 3, fiber: 3, sourcingLocation: 'Wakulima Vegetable Aisle' },
          { name: 'Sour Cream', gramWeight: 80, baseNGNCost: 220, protein: 2, carbs: 4, fat: 18, fiber: 0, sourcingLocation: 'Wakulima Dairy Stalls' },
          { name: 'Potatoes', gramWeight: 250, baseNGNCost: 400, protein: 5, carbs: 44, fat: 1, fiber: 5, sourcingLocation: 'Wakulima Vegetable Aisle' },
        ],
        prepInstructions: [
          'Sear the beef, then simmer with onion, mushrooms and a little stock.',
          'Stir in the sour cream away from the heat to keep it smooth.',
          'Serve over mashed potato with parsley scattered on top.',
        ]
      }
    ]
  },
  US: {
    fish: [
      {
        title: 'Baked Cod with Sweet Potato & Green Beans',
        description: 'Lemon-dressed cod baked until flaky, with roasted sweet potato and green beans.',
        visualType: 'grilled_fish',
        style: 'indigenous',
        proteinSourceType: 'fish',
        calories: 560,
        protein: 44,
        carbs: 54,
        fat: 16,
        fiber: 10,
        cookTimeMinutes: 35,
        readyToEatQuery: 'Baked Cod with Sweet Potato',
        ingredients: [
          { name: 'Cod Fillet', gramWeight: 220, baseNGNCost: 1900, protein: 42, carbs: 0, fat: 2, fiber: 0, sourcingLocation: 'Chelsea Fish Market' },
          { name: 'Sweet Potato', gramWeight: 220, baseNGNCost: 450, protein: 4, carbs: 48, fat: 1, fiber: 7, sourcingLocation: 'Union Square Produce' },
          { name: 'Green Beans', gramWeight: 150, baseNGNCost: 280, protein: 4, carbs: 18, fat: 1, fiber: 6, sourcingLocation: 'Union Square Produce' },
          { name: 'Lemon & Olive Oil', gramWeight: 30, baseNGNCost: 180, protein: 0, carbs: 2, fat: 16, fiber: 0, sourcingLocation: 'Whole Foods Oils' },
        ],
        prepInstructions: [
          'Dress the cod with lemon, olive oil and cracked pepper, then bake until flaky.',
          'Roast the sweet potato wedges until caramelised at the edges.',
          'Blanch the green beans and plate everything together.',
        ]
      },
      {
        title: 'Shrimp Tacos with Corn & Black Beans',
        description: 'Chilli-lime shrimp in soft corn tortillas with black beans, salsa and cabbage.',
        visualType: 'chicken_salad',
        style: 'indigenous',
        proteinSourceType: 'fish',
        calories: 590,
        protein: 42,
        carbs: 58,
        fat: 18,
        fiber: 14,
        cookTimeMinutes: 25,
        readyToEatQuery: 'Shrimp Tacos with Black Beans',
        ingredients: [
          { name: 'Jumbo Shrimp', gramWeight: 200, baseNGNCost: 1800, protein: 40, carbs: 0, fat: 2, fiber: 0, sourcingLocation: 'Chelsea Fish Market' },
          { name: 'Corn Tortillas', gramWeight: 90, baseNGNCost: 190, protein: 3, carbs: 38, fat: 2, fiber: 4, sourcingLocation: 'Fiesta Grocery' },
          { name: 'Black Beans', gramWeight: 120, baseNGNCost: 240, protein: 9, carbs: 26, fat: 1, fiber: 8, sourcingLocation: 'Fiesta Grocery' },
          { name: 'Cabbage Slaw & Salsa', gramWeight: 150, baseNGNCost: 220, protein: 2, carbs: 18, fat: 6, fiber: 4, sourcingLocation: 'Fiesta Grocery' },
        ],
        prepInstructions: [
          'Sauté the shrimp with chilli powder, lime and garlic until just pink.',
          'Warm the tortillas in a dry pan until pliable.',
          'Fill with beans, shrimp and slaw, then squeeze over lime.',
        ]
      }
    ],
    poultry: [
      {
        title: 'Roast Chicken with Brown Rice & Steamed Broccoli',
        description: 'Oven-roasted chicken breast with herby brown rice and crisp steamed broccoli.',
        visualType: 'grilled_fish',
        style: 'indigenous',
        proteinSourceType: 'poultry',
        calories: 620,
        protein: 48,
        carbs: 58,
        fat: 18,
        fiber: 10,
        cookTimeMinutes: 45,
        readyToEatQuery: 'Roast Chicken with Brown Rice',
        ingredients: [
          { name: 'Chicken Breast', gramWeight: 200, baseNGNCost: 1500, protein: 46, carbs: 0, fat: 5, fiber: 0, sourcingLocation: 'Pike Place Poultry' },
          { name: 'Brown Rice', gramWeight: 180, baseNGNCost: 420, protein: 7, carbs: 58, fat: 2, fiber: 4, sourcingLocation: 'Whole Foods Grains' },
          { name: 'Broccoli', gramWeight: 180, baseNGNCost: 320, protein: 7, carbs: 18, fat: 2, fiber: 7, sourcingLocation: 'Union Square Produce' },
          { name: 'Herbs & Garlic', gramWeight: 20, baseNGNCost: 110, protein: 1, carbs: 3, fat: 4, fiber: 1, sourcingLocation: 'Whole Foods Herbs' },
        ],
        prepInstructions: [
          'Rub the chicken with herbs, garlic and oil, then roast until the juices run clear.',
          'Cook the brown rice with stock and chopped parsley.',
          'Steam the broccoli until bright green and serve everything together.',
        ]
      },
      {
        title: 'Chicken Stir-Fry with Noodles & Bell Pepper',
        description: 'Tender chicken and vegetables tossed in soy-ginger sauce with lo mein noodles.',
        visualType: 'pasta_medley',
        style: 'indigenous',
        proteinSourceType: 'poultry',
        calories: 640,
        protein: 44,
        carbs: 66,
        fat: 20,
        fiber: 8,
        cookTimeMinutes: 25,
        readyToEatQuery: 'Chicken Stir-Fry with Noodles',
        ingredients: [
          { name: 'Chicken Breast', gramWeight: 190, baseNGNCost: 1450, protein: 44, carbs: 0, fat: 5, fiber: 0, sourcingLocation: 'Pike Place Poultry' },
          { name: 'Lo Mein Noodles', gramWeight: 180, baseNGNCost: 380, protein: 8, carbs: 60, fat: 3, fiber: 3, sourcingLocation: 'Whole Foods Grains' },
          { name: 'Bell Pepper & Broccoli', gramWeight: 200, baseNGNCost: 420, protein: 8, carbs: 22, fat: 4, fiber: 9, sourcingLocation: 'Union Square Produce' },
          { name: 'Soy & Ginger Sauce', gramWeight: 50, baseNGNCost: 190, protein: 2, carbs: 12, fat: 8, fiber: 2, sourcingLocation: 'Whole Foods Sauces' },
        ],
        prepInstructions: [
          'Cook the noodles and set aside.',
          'Stir-fry the chicken, then add pepper and broccoli until crisp-tender.',
          'Toss everything through the soy-ginger sauce and return to the noodles.',
        ]
      }
    ],
    eggs_dairy: [
      {
        title: 'Spinach & Feta Omelette with Toast & Fruit',
        description: 'A folded omelette filled with wilted spinach and feta, with buttered toast and berries.',
        visualType: 'yam_egg_skillet',
        style: 'indigenous',
        proteinSourceType: 'eggs_dairy',
        calories: 480,
        protein: 26,
        carbs: 40,
        fat: 21,
        fiber: 7,
        cookTimeMinutes: 20,
        readyToEatQuery: 'Spinach and Feta Omelette',
        ingredients: [
          { name: 'Eggs', gramWeight: 150, baseNGNCost: 560, protein: 17, carbs: 1, fat: 11, fiber: 0, sourcingLocation: 'Union Square Dairy' },
          { name: 'Spinach', gramWeight: 120, baseNGNCost: 240, protein: 5, carbs: 12, fat: 3, fiber: 7, sourcingLocation: 'Union Square Produce' },
          { name: 'Feta', gramWeight: 60, baseNGNCost: 240, protein: 4, carbs: 2, fat: 16, fiber: 0, sourcingLocation: 'Whole Foods Cheese' },
          { name: 'Toast & Mixed Berries', gramWeight: 160, baseNGNCost: 400, protein: 6, carbs: 46, fat: 7, fiber: 8, sourcingLocation: 'Bakery & Produce' },
        ],
        prepInstructions: [
          'Wilt the spinach with a little garlic.',
          'Beat the eggs with salt, fill with spinach and feta, and fold.',
          'Serve with buttered toast and a handful of berries.',
        ]
      },
      {
        title: 'Breakfast Burrito with Eggs & Black Beans',
        description: 'Scrambled eggs and black beans wrapped in a warm tortilla with salsa and avocado.',
        visualType: 'beans_plantain',
        style: 'indigenous',
        proteinSourceType: 'eggs_dairy',
        calories: 560,
        protein: 26,
        carbs: 56,
        fat: 22,
        fiber: 12,
        cookTimeMinutes: 20,
        readyToEatQuery: 'Breakfast Burrito with Black Beans',
        ingredients: [
          { name: 'Eggs', gramWeight: 150, baseNGNCost: 560, protein: 17, carbs: 1, fat: 11, fiber: 0, sourcingLocation: 'Union Square Dairy' },
          { name: 'Black Beans', gramWeight: 140, baseNGNCost: 280, protein: 10, carbs: 30, fat: 1, fiber: 10, sourcingLocation: 'Fiesta Grocery' },
          { name: 'Flour Tortilla', gramWeight: 80, baseNGNCost: 160, protein: 3, carbs: 32, fat: 3, fiber: 3, sourcingLocation: 'Fiesta Grocery' },
          { name: 'Avocado & Salsa', gramWeight: 120, baseNGNCost: 320, protein: 2, carbs: 14, fat: 22, fiber: 7, sourcingLocation: 'Union Square Produce' },
        ],
        prepInstructions: [
          'Scramble the eggs until softly set.',
          'Warm the tortilla, layer in the eggs, beans, avocado and salsa.',
          'Fold and toast briefly so it holds together.',
        ]
      },
      {
        title: 'Eggs Benedict with English Muffin & Spinach',
        description: 'Poached eggs and wilted spinach on a toasted muffin, with hollandaise poured over.',
        visualType: 'yam_egg_skillet',
        style: 'indigenous',
        proteinSourceType: 'eggs_dairy',
        calories: 560,
        protein: 28,
        carbs: 44,
        fat: 30,
        fiber: 6,
        cookTimeMinutes: 25,
        readyToEatQuery: 'Eggs Benedict with Spinach',
        ingredients: [
          { name: 'Eggs', gramWeight: 160, baseNGNCost: 600, protein: 18, carbs: 1, fat: 12, fiber: 0, sourcingLocation: 'Union Square Dairy' },
          { name: 'English Muffins', gramWeight: 100, baseNGNCost: 220, protein: 7, carbs: 42, fat: 2, fiber: 3, sourcingLocation: 'Bakery & Produce' },
          { name: 'Spinach', gramWeight: 120, baseNGNCost: 240, protein: 5, carbs: 12, fat: 3, fiber: 7, sourcingLocation: 'Union Square Produce' },
          { name: 'Hollandaise Sauce', gramWeight: 70, baseNGNCost: 290, protein: 2, carbs: 4, fat: 26, fiber: 0, sourcingLocation: 'Whole Foods Sauces' },
        ],
        prepInstructions: [
          'Toast the muffin halves, then wilt the spinach with butter and lemon.',
          'Poach the eggs until the whites are set and the yolks still run.',
          'Stack muffin, spinach and egg, then spoon over the hollandaise.',
        ]
      }
    ],
    legumes_plant: [
      {
        title: 'Lentil Soup with Wholemeal Bread & Side Salad',
        description: 'A hearty tomato and lentil soup with a dressed green salad and thick wholemeal bread.',
        visualType: 'beans_plantain',
        style: 'indigenous',
        proteinSourceType: 'legumes_plant',
        calories: 520,
        protein: 26,
        carbs: 68,
        fat: 14,
        fiber: 18,
        cookTimeMinutes: 50,
        readyToEatQuery: 'Lentil Soup with Wholemeal Bread',
        ingredients: [
          { name: 'Brown Lentils', gramWeight: 220, baseNGNCost: 520, protein: 20, carbs: 44, fat: 1, fiber: 16, sourcingLocation: 'Whole Foods Grains' },
          { name: 'Tomato & Carrot Soup Base', gramWeight: 250, baseNGNCost: 350, protein: 6, carbs: 28, fat: 8, fiber: 6, sourcingLocation: 'Union Square Produce' },
          { name: 'Wholemeal Bread Slice', gramWeight: 90, baseNGNCost: 190, protein: 5, carbs: 32, fat: 1, fiber: 4, sourcingLocation: 'Bakery & Produce' },
          { name: 'Green Salad & Olive Oil', gramWeight: 150, baseNGNCost: 280, protein: 3, carbs: 12, fat: 14, fiber: 5, sourcingLocation: 'Union Square Produce' },
        ],
        prepInstructions: [
          'Simmer lentils with tomato, carrot, onion and stock until soft.',
          'Toss the greens with olive oil and lemon.',
          'Serve the soup with bread and the salad alongside.',
        ]
      },
      {
        title: 'Chickpea Bowl with Brown Rice & Avocado',
        description: 'Roasted chickpeas and warm brown rice with avocado, cucumber and a lemon dressing.',
        visualType: 'chicken_salad',
        style: 'indigenous',
        proteinSourceType: 'legumes_plant',
        calories: 610,
        protein: 24,
        carbs: 74,
        fat: 20,
        fiber: 18,
        cookTimeMinutes: 30,
        readyToEatQuery: 'Chickpea Bowl with Brown Rice',
        ingredients: [
          { name: 'Chickpeas', gramWeight: 200, baseNGNCost: 560, protein: 16, carbs: 48, fat: 4, fiber: 14, sourcingLocation: 'Whole Foods Grains' },
          { name: 'Brown Rice', gramWeight: 180, baseNGNCost: 420, protein: 7, carbs: 58, fat: 2, fiber: 4, sourcingLocation: 'Whole Foods Grains' },
          { name: 'Avocado', gramWeight: 100, baseNGNCost: 300, protein: 3, carbs: 8, fat: 20, fiber: 7, sourcingLocation: 'Union Square Produce' },
          { name: 'Cucumber & Lemon Dressing', gramWeight: 150, baseNGNCost: 240, protein: 2, carbs: 12, fat: 6, fiber: 3, sourcingLocation: 'Union Square Produce' },
        ],
        prepInstructions: [
          'Roast the chickpeas with cumin until crisp at the edges.',
          'Layer warm rice, chickpeas and avocado in a bowl.',
          'Finish with cucumber and a lemon and olive oil dressing.',
        ]
      }
    ],
    beef_lean: [
      {
        title: 'Beef & Broccoli Stir-Fry with Brown Rice',
        description: 'Seared lean beef with broccoli in a light oyster sauce, over brown rice.',
        visualType: 'grilled_fish',
        style: 'indigenous',
        proteinSourceType: 'beef_lean',
        calories: 640,
        protein: 46,
        carbs: 58,
        fat: 20,
        fiber: 9,
        cookTimeMinutes: 25,
        readyToEatQuery: 'Beef and Broccoli Stir-Fry',
        ingredients: [
          { name: 'Lean Beef Sirloin', gramWeight: 190, baseNGNCost: 2200, protein: 44, carbs: 0, fat: 10, fiber: 0, sourcingLocation: 'Pike Place Butchers' },
          { name: 'Broccoli', gramWeight: 200, baseNGNCost: 360, protein: 8, carbs: 20, fat: 3, fiber: 8, sourcingLocation: 'Union Square Produce' },
          { name: 'Brown Rice', gramWeight: 170, baseNGNCost: 400, protein: 7, carbs: 54, fat: 2, fiber: 4, sourcingLocation: 'Whole Foods Grains' },
          { name: 'Oyster Sauce', gramWeight: 40, baseNGNCost: 170, protein: 1, carbs: 10, fat: 3, fiber: 1, sourcingLocation: 'Whole Foods Sauces' },
        ],
        prepInstructions: [
          'Sear the sliced beef quickly in a hot pan, then remove.',
          'Stir-fry the broccoli until bright, return the beef and add the sauce.',
          'Serve over brown rice.',
        ]
      },
      {
        title: 'Lean Beef Tacos with Corn & Salsa',
        description: 'Griddled lean beef in corn tortillas with charred corn salsa and pickled onion.',
        visualType: 'beans_plantain',
        style: 'indigenous',
        proteinSourceType: 'beef_lean',
        calories: 610,
        protein: 44,
        carbs: 56,
        fat: 20,
        fiber: 12,
        cookTimeMinutes: 25,
        readyToEatQuery: 'Lean Beef Tacos with Corn',
        ingredients: [
          { name: 'Lean Beef Sirloin', gramWeight: 190, baseNGNCost: 2150, protein: 44, carbs: 0, fat: 10, fiber: 0, sourcingLocation: 'Pike Place Butchers' },
          { name: 'Corn Tortillas', gramWeight: 90, baseNGNCost: 190, protein: 3, carbs: 38, fat: 2, fiber: 4, sourcingLocation: 'Fiesta Grocery' },
          { name: 'Charred Corn Salsa', gramWeight: 180, baseNGNCost: 320, protein: 6, carbs: 36, fat: 8, fiber: 7, sourcingLocation: 'Union Square Produce' },
          { name: 'Pickled Onion & Cilantro', gramWeight: 80, baseNGNCost: 130, protein: 1, carbs: 12, fat: 0, fiber: 2, sourcingLocation: 'Fiesta Grocery' },
        ],
        prepInstructions: [
          'Griddle-sear the seasoned beef, then slice it thinly.',
          'Char the corn with chilli and lime to make the salsa.',
          'Fill warmed tortillas with beef, corn salsa, onion and coriander.',
        ]
      }
    ]
  },
  CA: {
    fish: [
      {
        title: 'Baked Whitefish with Maple Peas & Quinoa',
        description: 'Maple-drizzled whitefish baked with lemon, alongside peas and herbed quinoa.',
        visualType: 'grilled_fish',
        style: 'indigenous',
        proteinSourceType: 'fish',
        calories: 600,
        protein: 46,
        carbs: 52,
        fat: 18,
        fiber: 10,
        cookTimeMinutes: 35,
        readyToEatQuery: 'Baked Whitefish with Maple Peas',
        ingredients: [
          { name: 'Whitefish Fillet', gramWeight: 220, baseNGNCost: 2100, protein: 44, carbs: 0, fat: 3, fiber: 0, sourcingLocation: 'St. Lawrence Fish Market' },
          { name: 'Maple Peas', gramWeight: 150, baseNGNCost: 320, protein: 7, carbs: 22, fat: 2, fiber: 7, sourcingLocation: 'St. Lawrence Market Produce' },
          { name: 'Quinoa', gramWeight: 150, baseNGNCost: 520, protein: 8, carbs: 40, fat: 4, fiber: 5, sourcingLocation: 'Whole Foods Canada' },
          { name: 'Maple Syrup Glaze', gramWeight: 25, baseNGNCost: 120, protein: 0, carbs: 8, fat: 0, fiber: 0, sourcingLocation: 'Ontario Maple Producers' },
        ],
        prepInstructions: [
          'Glaze the whitefish with maple syrup and lemon, then bake until opaque.',
          'Cook the quinoa with herbs and stock until fluffy.',
          'Serve the fish with the peas and quinoa, drizzling on more maple.',
        ]
      },
      {
        title: 'Garlic Prawn Bowl with Rice & Edamame',
        description: 'Garlic seared prawns over steamed rice with edamame, scallion and a soy drizzle.',
        visualType: 'jollof_bowl',
        style: 'indigenous',
        proteinSourceType: 'fish',
        calories: 580,
        protein: 42,
        carbs: 58,
        fat: 16,
        fiber: 9,
        cookTimeMinutes: 20,
        readyToEatQuery: 'Garlic Prawn Bowl with Rice',
        ingredients: [
          { name: 'Jumbo Prawns', gramWeight: 200, baseNGNCost: 1900, protein: 42, carbs: 0, fat: 3, fiber: 0, sourcingLocation: 'St. Lawrence Fish Market' },
          { name: 'Jasmine Rice', gramWeight: 170, baseNGNCost: 360, protein: 6, carbs: 54, fat: 1, fiber: 2, sourcingLocation: 'St. Lawrence Rice Importers' },
          { name: 'Edamame', gramWeight: 140, baseNGNCost: 380, protein: 13, carbs: 14, fat: 6, fiber: 9, sourcingLocation: 'St. Lawrence Market Produce' },
          { name: 'Garlic & Soy Glaze', gramWeight: 30, baseNGNCost: 130, protein: 1, carbs: 8, fat: 3, fiber: 1, sourcingLocation: 'St. Lawrence Market Pantry' },
        ],
        prepInstructions: [
          'Sear the prawns hard in a hot pan with garlic, then add a splash of soy.',
          'Steam the rice and boil the edamame in salted water.',
          'Serve the prawns over rice with edamame and sliced scallion.',
        ]
      }
    ],
    poultry: [
      {
        title: 'Roast Turkey with Sweet Potato & Brussels Sprouts',
        description: 'Herb roasted turkey breast with maple sweet potato wedges and crisp Brussels sprouts.',
        visualType: 'grilled_fish',
        style: 'indigenous',
        proteinSourceType: 'poultry',
        calories: 640,
        protein: 50,
        carbs: 58,
        fat: 20,
        fiber: 10,
        cookTimeMinutes: 60,
        readyToEatQuery: 'Roast Turkey with Sweet Potato',
        ingredients: [
          { name: 'Turkey Breast', gramWeight: 200, baseNGNCost: 2100, protein: 48, carbs: 0, fat: 5, fiber: 0, sourcingLocation: 'Boreal Game & Poultry' },
          { name: 'Sweet Potato', gramWeight: 220, baseNGNCost: 450, protein: 4, carbs: 48, fat: 1, fiber: 7, sourcingLocation: 'St. Lawrence Market Produce' },
          { name: 'Brussels Sprouts', gramWeight: 180, baseNGNCost: 340, protein: 8, carbs: 30, fat: 2, fiber: 7, sourcingLocation: 'St. Lawrence Market Produce' },
          { name: 'Maple Herb Glaze', gramWeight: 25, baseNGNCost: 130, protein: 1, carbs: 8, fat: 3, fiber: 1, sourcingLocation: 'Ontario Maple Producers' },
        ],
        prepInstructions: [
          'Roast the turkey with sage, thyme and a maple glaze until the juices run clear.',
          'Roast the sweet potato wedges until caramelised.',
          'Halve and roast the Brussels sprouts until the cut faces are golden, then serve.',
        ]
      },
      {
        title: 'Maple Chicken with Wild Rice & Peas',
        description: 'Chicken thighs roasted with a maple and mustard glaze, with wild rice and peas.',
        visualType: 'grilled_fish',
        style: 'indigenous',
        proteinSourceType: 'poultry',
        calories: 680,
        protein: 46,
        carbs: 62,
        fat: 24,
        fiber: 9,
        cookTimeMinutes: 45,
        readyToEatQuery: 'Maple Glazed Chicken with Wild Rice',
        ingredients: [
          { name: 'Chicken Thighs', gramWeight: 210, baseNGNCost: 1600, protein: 42, carbs: 0, fat: 12, fiber: 0, sourcingLocation: 'St. Lawrence Poultry' },
          { name: 'Wild Rice', gramWeight: 170, baseNGNCost: 520, protein: 8, carbs: 56, fat: 2, fiber: 4, sourcingLocation: 'Manitoba Grain Company' },
          { name: 'Green Peas', gramWeight: 150, baseNGNCost: 300, protein: 8, carbs: 24, fat: 2, fiber: 8, sourcingLocation: 'St. Lawrence Market Produce' },
          { name: 'Maple & Dijon Glaze', gramWeight: 30, baseNGNCost: 140, protein: 1, carbs: 10, fat: 2, fiber: 1, sourcingLocation: 'Ontario Maple Producers' },
        ],
        prepInstructions: [
          'Coat the chicken in maple syrup and Dijon, then roast until caramelised.',
          'Cook the wild rice until tender with its long grains intact.',
          'Plate with peas and the pan juices poured over.',
        ]
      }
    ],
    eggs_dairy: [
      {
        title: 'Spinach & Feta Quiche with Maple Salad',
        description: 'A savoury quiche of spinach, feta and egg, served with a maple-dressed side salad.',
        visualType: 'pasta_medley',
        style: 'indigenous',
        proteinSourceType: 'eggs_dairy',
        calories: 560,
        protein: 30,
        carbs: 40,
        fat: 28,
        fiber: 7,
        cookTimeMinutes: 55,
        readyToEatQuery: 'Spinach and Feta Quiche',
        ingredients: [
          { name: 'Eggs', gramWeight: 180, baseNGNCost: 680, protein: 20, carbs: 2, fat: 13, fiber: 0, sourcingLocation: 'St. Lawrence Dairy' },
          { name: 'Shortcrust Pastry', gramWeight: 120, baseNGNCost: 280, protein: 3, carbs: 30, fat: 10, fiber: 2, sourcingLocation: 'St. Lawrence Bakeries' },
          { name: 'Spinach & Feta', gramWeight: 150, baseNGNCost: 440, protein: 9, carbs: 14, fat: 19, fiber: 7, sourcingLocation: 'St. Lawrence Market Produce' },
          { name: 'Maple Dressed Salad', gramWeight: 150, baseNGNCost: 260, protein: 3, carbs: 12, fat: 14, fiber: 5, sourcingLocation: 'St. Lawrence Market Produce' },
        ],
        prepInstructions: [
          'Blind bake the pastry shell until lightly golden.',
          'Fill with a seasoned egg custard, spinach and crumbled feta.',
          'Bake until set, then serve with the maple-dressed salad.',
        ]
      },
      {
        title: 'Cheddar Cheese Omelette with Toast',
        description: 'A folded omelette loaded with aged cheddar, served with buttered toast.',
        visualType: 'yam_egg_skillet',
        style: 'indigenous',
        proteinSourceType: 'eggs_dairy',
        calories: 510,
        protein: 27,
        carbs: 38,
        fat: 25,
        fiber: 5,
        cookTimeMinutes: 15,
        readyToEatQuery: 'Cheddar Cheese Omelette',
        ingredients: [
          { name: 'Eggs', gramWeight: 170, baseNGNCost: 620, protein: 19, carbs: 1, fat: 12, fiber: 0, sourcingLocation: 'St. Lawrence Dairy' },
          { name: 'Aged Cheddar', gramWeight: 70, baseNGNCost: 340, protein: 8, carbs: 1, fat: 24, fiber: 0, sourcingLocation: 'St. Lawrence Cheese Counter' },
          { name: 'Toast & Butter', gramWeight: 100, baseNGNCost: 220, protein: 4, carbs: 32, fat: 5, fiber: 3, sourcingLocation: 'St. Lawrence Bakeries' },
          { name: 'Chives & Black Pepper', gramWeight: 10, baseNGNCost: 90, protein: 0, carbs: 2, fat: 2, fiber: 1, sourcingLocation: 'St. Lawrence Market Produce' },
        ],
        prepInstructions: [
          'Grate the cheddar and beat it into the eggs with chives.',
          'Cook the omelette over medium-low heat and fold while the inside is still glossy.',
          'Serve immediately with buttered toast.',
        ]
      }
    ],
    legumes_plant: [
      {
        title: 'Three-Bean Chili with Cornbread',
        description: 'A smoky three-bean chili with sweet corn, served with warm cornbread.',
        visualType: 'beans_plantain',
        style: 'indigenous',
        proteinSourceType: 'legumes_plant',
        calories: 580,
        protein: 24,
        carbs: 84,
        fat: 12,
        fiber: 20,
        cookTimeMinutes: 60,
        readyToEatQuery: 'Three Bean Chili with Cornbread',
        ingredients: [
          { name: 'Mixed Beans', gramWeight: 240, baseNGNCost: 760, protein: 20, carbs: 52, fat: 3, fiber: 16, sourcingLocation: 'St. Lawrence Market Beans' },
          { name: 'Tomato & Pepper Base', gramWeight: 250, baseNGNCost: 380, protein: 7, carbs: 30, fat: 10, fiber: 6, sourcingLocation: 'St. Lawrence Market Produce' },
          { name: 'Sweet Corn', gramWeight: 120, baseNGNCost: 240, protein: 4, carbs: 26, fat: 1, fiber: 4, sourcingLocation: 'St. Lawrence Market Produce' },
          { name: 'Cornbread', gramWeight: 110, baseNGNCost: 300, protein: 5, carbs: 44, fat: 8, fiber: 3, sourcingLocation: 'St. Lawrence Bakeries' },
        ],
        prepInstructions: [
          'Fry the onion and pepper, then add cumin, smoked paprika and chopped tomato.',
          'Simmer with the beans until thick and well seasoned.',
          'Serve over the top of warm cornbread.',
        ]
      },
      {
        title: 'Chickpea Curry with Basmati & Spinach',
        description: 'Chickpeas in a fragrant onion and tomato curry, with basmati rice and wilted spinach.',
        visualType: 'stew_swallow',
        style: 'indigenous',
        proteinSourceType: 'legumes_plant',
        calories: 600,
        protein: 22,
        carbs: 78,
        fat: 18,
        fiber: 16,
        cookTimeMinutes: 45,
        readyToEatQuery: 'Chickpea Curry with Basmati',
        ingredients: [
          { name: 'Chickpeas', gramWeight: 200, baseNGNCost: 600, protein: 16, carbs: 48, fat: 4, fiber: 14, sourcingLocation: 'St. Lawrence Market Beans' },
          { name: 'Tomato & Onion Curry', gramWeight: 220, baseNGNCost: 340, protein: 6, carbs: 28, fat: 9, fiber: 5, sourcingLocation: 'St. Lawrence Market Produce' },
          { name: 'Basmati Rice', gramWeight: 170, baseNGNCost: 380, protein: 6, carbs: 54, fat: 1, fiber: 2, sourcingLocation: 'St. Lawrence Rice Importers' },
          { name: 'Baby Spinach', gramWeight: 100, baseNGNCost: 240, protein: 5, carbs: 12, fat: 3, fiber: 7, sourcingLocation: 'St. Lawrence Market Produce' },
        ],
        prepInstructions: [
          'Build the curry base from onion, ginger, garlic and spices.',
          'Add chickpeas and simmer until the sauce thickens.',
          'Fold in the spinach, then serve over basmati rice.',
        ]
      }
    ],
    beef_lean: [
      {
        title: 'Montreal-Style Beef Stew with Rye Bread',
        description: 'A rich braised beef and root vegetable stew with a dark ale gravy and rye bread.',
        visualType: 'stew_swallow',
        style: 'indigenous',
        proteinSourceType: 'beef_lean',
        calories: 700,
        protein: 46,
        carbs: 60,
        fat: 26,
        fiber: 9,
        cookTimeMinutes: 90,
        readyToEatQuery: 'Montreal Beef Stew with Rye Bread',
        ingredients: [
          { name: 'Beef Chuck', gramWeight: 210, baseNGNCost: 2250, protein: 44, carbs: 0, fat: 14, fiber: 0, sourcingLocation: 'St. Lawrence Butchers' },
          { name: 'Carrot, Parsnip & Onion', gramWeight: 250, baseNGNCost: 400, protein: 6, carbs: 36, fat: 4, fiber: 10, sourcingLocation: 'St. Lawrence Market Produce' },
          { name: 'Dark Ale', gramWeight: 200, baseNGNCost: 300, protein: 1, carbs: 14, fat: 1, fiber: 0, sourcingLocation: 'Québec Brewers' },
          { name: 'Rye Bread', gramWeight: 90, baseNGNCost: 220, protein: 5, carbs: 34, fat: 2, fiber: 4, sourcingLocation: 'St. Lawrence Bakeries' },
        ],
        prepInstructions: [
          'Brown the beef, then braise with the chopped vegetables and dark ale.',
          'Cover and simmer until the beef is completely tender.',
          'Thicken the gravy and serve with rye bread.',
        ]
      },
      {
        title: 'Beef Flatbread with Roasted Peppers',
        description: 'Thinly sliced beef with roasted peppers and mozzarella on a crisp flatbread.',
        visualType: 'grilled_fish',
        style: 'indigenous',
        proteinSourceType: 'beef_lean',
        calories: 660,
        protein: 44,
        carbs: 58,
        fat: 24,
        fiber: 8,
        cookTimeMinutes: 30,
        readyToEatQuery: 'Beef Flatbread with Roasted Peppers',
        ingredients: [
          { name: 'Lean Beef Sirloin', gramWeight: 190, baseNGNCost: 2150, protein: 44, carbs: 0, fat: 10, fiber: 0, sourcingLocation: 'St. Lawrence Butchers' },
          { name: 'Flatbread', gramWeight: 140, baseNGNCost: 340, protein: 8, carbs: 48, fat: 8, fiber: 4, sourcingLocation: 'St. Lawrence Bakeries' },
          { name: 'Roasted Peppers', gramWeight: 160, baseNGNCost: 300, protein: 4, carbs: 20, fat: 6, fiber: 6, sourcingLocation: 'St. Lawrence Market Produce' },
          { name: 'Mozzarella', gramWeight: 60, baseNGNCost: 280, protein: 10, carbs: 4, fat: 18, fiber: 0, sourcingLocation: 'St. Lawrence Cheese Counter' },
        ],
        prepInstructions: [
          'Sear the seasoned beef and slice it thinly across the grain.',
          'Roast the peppers until charred at the edges.',
          'Top the flatbread with beef, peppers and mozzarella and bake until bubbling.',
        ]
      }
    ]
  },
  UK: {
    fish: [
      {
        title: 'Baked Salmon with Roast Potatoes & Lemon Greens',
        description: 'Oven-baked salmon with crisp roast potatoes and braised greens with lemon.',
        visualType: 'grilled_fish',
        style: 'indigenous',
        proteinSourceType: 'fish',
        calories: 650,
        protein: 46,
        carbs: 54,
        fat: 24,
        fiber: 9,
        cookTimeMinutes: 50,
        readyToEatQuery: 'Baked Salmon with Roast Potatoes',
        ingredients: [
          { name: 'Salmon Fillet', gramWeight: 220, baseNGNCost: 2100, protein: 44, carbs: 0, fat: 12, fiber: 0, sourcingLocation: 'Billingsgate Fish Market' },
          { name: 'Roast Potatoes', gramWeight: 250, baseNGNCost: 420, protein: 5, carbs: 46, fat: 10, fiber: 5, sourcingLocation: 'Borough Market Potatoes' },
          { name: 'Braised Greens', gramWeight: 180, baseNGNCost: 300, protein: 6, carbs: 12, fat: 8, fiber: 7, sourcingLocation: 'Borough Market Greens' },
          { name: 'Lemon & Butter', gramWeight: 30, baseNGNCost: 160, protein: 0, carbs: 2, fat: 14, fiber: 0, sourcingLocation: 'Borough Market Dairy' },
        ],
        prepInstructions: [
          'Roast the potatoes until golden and crisp.',
          'Bake the salmon with lemon and butter until just flaking.',
          'Braise the greens with a knob of butter and finish with lemon juice.',
        ]
      },
      {
        title: 'Smoked Haddock Chowder with Crusty Bread',
        description: 'A thick, creamy smoked haddock chowder with potato, corn and parsley.',
        visualType: 'stew_swallow',
        style: 'indigenous',
        proteinSourceType: 'fish',
        calories: 620,
        protein: 40,
        carbs: 58,
        fat: 22,
        fiber: 9,
        cookTimeMinutes: 55,
        readyToEatQuery: 'Smoked Haddock Chowder',
        ingredients: [
          { name: 'Smoked Haddock', gramWeight: 200, baseNGNCost: 1800, protein: 40, carbs: 0, fat: 6, fiber: 0, sourcingLocation: 'Billingsgate Fish Market' },
          { name: 'Potato & Sweet Corn', gramWeight: 250, baseNGNCost: 420, protein: 6, carbs: 54, fat: 2, fiber: 8, sourcingLocation: 'Borough Market Produce' },
          { name: 'Cream & Butter', gramWeight: 100, baseNGNCost: 280, protein: 3, carbs: 6, fat: 24, fiber: 0, sourcingLocation: 'Borough Market Dairy' },
          { name: 'Crusty Bread', gramWeight: 90, baseNGNCost: 200, protein: 4, carbs: 32, fat: 2, fiber: 4, sourcingLocation: 'Borough Market Bakeries' },
        ],
        prepInstructions: [
          'Simmer the haddock with milk to make a light stock, then strain.',
          'Add diced potato and corn to the stock, then return the flaked fish.',
          'Stir in cream and parsley, and serve with crusty bread.',
        ]
      }
    ],
    poultry: [
      {
        title: 'Chicken & Leek Pie with Mash',
        description: 'Chicken and leek in a creamy sauce under a golden pastry lid, with mashed potato.',
        visualType: 'stew_swallow',
        style: 'indigenous',
        proteinSourceType: 'poultry',
        calories: 720,
        protein: 44,
        carbs: 64,
        fat: 28,
        fiber: 8,
        cookTimeMinutes: 70,
        readyToEatQuery: 'Chicken and Leek Pie',
        ingredients: [
          { name: 'Chicken Breast', gramWeight: 200, baseNGNCost: 1450, protein: 44, carbs: 0, fat: 5, fiber: 0, sourcingLocation: 'Borough Market Poultry' },
          { name: 'Leeks', gramWeight: 150, baseNGNCost: 280, protein: 4, carbs: 16, fat: 2, fiber: 5, sourcingLocation: 'Borough Market Produce' },
          { name: 'Puff Pastry', gramWeight: 120, baseNGNCost: 320, protein: 4, carbs: 32, fat: 14, fiber: 2, sourcingLocation: 'Borough Market Bakeries' },
          { name: 'Mashed Potato', gramWeight: 250, baseNGNCost: 420, protein: 5, carbs: 44, fat: 11, fiber: 5, sourcingLocation: 'Borough Market Potatoes' },
        ],
        prepInstructions: [
          'Sweat the sliced leeks in butter, add diced chicken and a cream sauce.',
          'Fill a dish with the chicken and leek, then top with pastry and bake until golden.',
          'Serve with mashed potato.',
        ]
      },
      {
        title: 'Roast Chicken Traybake with Tenderstem & Gravy',
        description: 'A tray-roasted chicken with crispy potatoes, tenderstem broccoli and pan gravy.',
        visualType: 'grilled_fish',
        style: 'indigenous',
        proteinSourceType: 'poultry',
        calories: 680,
        protein: 48,
        carbs: 58,
        fat: 24,
        fiber: 10,
        cookTimeMinutes: 65,
        readyToEatQuery: 'Roast Chicken Traybake',
        ingredients: [
          { name: 'Chicken Breast', gramWeight: 200, baseNGNCost: 1500, protein: 46, carbs: 0, fat: 5, fiber: 0, sourcingLocation: 'Borough Market Poultry' },
          { name: 'Roast Potatoes', gramWeight: 240, baseNGNCost: 400, protein: 5, carbs: 44, fat: 10, fiber: 5, sourcingLocation: 'Borough Market Potatoes' },
          { name: 'Tenderstem Broccoli', gramWeight: 180, baseNGNCost: 340, protein: 8, carbs: 20, fat: 3, fiber: 8, sourcingLocation: 'Borough Market Greens' },
          { name: 'Pan Gravy', gramWeight: 120, baseNGNCost: 180, protein: 4, carbs: 12, fat: 8, fiber: 2, sourcingLocation: 'Borough Market Pantry' },
        ],
        prepInstructions: [
          'Roast the chicken and potatoes together until the skin is crisp and the juices run clear.',
          'Add the tenderstem for the last ten minutes so it stays bright.',
          'Pour the pan juices over everything as a gravy.',
        ]
      }
    ],
    eggs_dairy: [
      {
        title: 'Scrambled Eggs on Toast with Tomato & Mushrooms',
        description: 'Soft scrambled eggs on buttered toast with sautéed mushrooms and grilled tomato.',
        visualType: 'yam_egg_skillet',
        style: 'indigenous',
        proteinSourceType: 'eggs_dairy',
        calories: 490,
        protein: 26,
        carbs: 38,
        fat: 23,
        fiber: 7,
        cookTimeMinutes: 20,
        readyToEatQuery: 'Scrambled Eggs on Toast',
        ingredients: [
          { name: 'Eggs', gramWeight: 170, baseNGNCost: 620, protein: 19, carbs: 1, fat: 12, fiber: 0, sourcingLocation: 'Borough Market Dairy' },
          { name: 'Toast & Butter', gramWeight: 110, baseNGNCost: 240, protein: 4, carbs: 34, fat: 5, fiber: 3, sourcingLocation: 'Borough Market Bakeries' },
          { name: 'Mushrooms', gramWeight: 150, baseNGNCost: 280, protein: 5, carbs: 8, fat: 3, fiber: 3, sourcingLocation: 'Borough Market Produce' },
          { name: 'Grilled Tomato', gramWeight: 120, baseNGNCost: 180, protein: 2, carbs: 12, fat: 2, fiber: 4, sourcingLocation: 'Borough Market Produce' },
        ],
        prepInstructions: [
          'Beat the eggs and cook gently, stirring, until soft and creamy.',
          'Sauté the mushrooms in butter and grill the tomato halves.',
          'Pile the eggs onto buttered toast and top with the mushrooms and tomato.',
        ]
      },
      {
        title: 'Cheese & Onion Omelette with New Potatoes',
        description: 'A fluffy omelette filled with cheddar and caramelised onion, with boiled new potatoes.',
        visualType: 'yam_egg_skillet',
        style: 'indigenous',
        proteinSourceType: 'eggs_dairy',
        calories: 540,
        protein: 28,
        carbs: 46,
        fat: 26,
        fiber: 7,
        cookTimeMinutes: 25,
        readyToEatQuery: 'Cheese and Onion Omelette',
        ingredients: [
          { name: 'Eggs', gramWeight: 170, baseNGNCost: 620, protein: 19, carbs: 1, fat: 12, fiber: 0, sourcingLocation: 'Borough Market Dairy' },
          { name: 'Cheddar', gramWeight: 70, baseNGNCost: 330, protein: 8, carbs: 1, fat: 23, fiber: 0, sourcingLocation: 'Borough Market Cheese' },
          { name: 'Caramelised Onion', gramWeight: 150, baseNGNCost: 220, protein: 3, carbs: 20, fat: 6, fiber: 5, sourcingLocation: 'Borough Market Produce' },
          { name: 'Boiled New Potatoes', gramWeight: 200, baseNGNCost: 380, protein: 5, carbs: 40, fat: 1, fiber: 4, sourcingLocation: 'Borough Market Potatoes' },
        ],
        prepInstructions: [
          'Caramelise the sliced onions slowly in butter until deep golden.',
          'Beat the eggs with salt, fill with cheddar and onion, and fold.',
          'Serve with the warm new potatoes.',
        ]
      },
      {
        title: 'Creamy Baked Eggs with Spinach & Crusty Bread',
        description: 'Eggs baked softly in a rich cream and spinach sauce, served with buttered toast.',
        visualType: 'stew_swallow',
        style: 'indigenous',
        proteinSourceType: 'eggs_dairy',
        calories: 520,
        protein: 25,
        carbs: 42,
        fat: 27,
        fiber: 7,
        cookTimeMinutes: 40,
        readyToEatQuery: 'Creamy Baked Eggs with Spinach',
        ingredients: [
          { name: 'Eggs', gramWeight: 170, baseNGNCost: 620, protein: 19, carbs: 1, fat: 12, fiber: 0, sourcingLocation: 'Borough Market Dairy' },
          { name: 'Cream & Butter', gramWeight: 100, baseNGNCost: 280, protein: 3, carbs: 6, fat: 24, fiber: 0, sourcingLocation: 'Borough Market Dairy' },
          { name: 'Spinach', gramWeight: 140, baseNGNCost: 280, protein: 6, carbs: 14, fat: 4, fiber: 8, sourcingLocation: 'Borough Market Greens' },
          { name: 'Crusty Bread', gramWeight: 90, baseNGNCost: 200, protein: 4, carbs: 32, fat: 2, fiber: 4, sourcingLocation: 'Borough Market Bakeries' },
        ],
        prepInstructions: [
          'Wilt the spinach with butter, then stir in cream and season well.',
          'Crack the eggs into small ramekins of the cream, and bake until just set.',
          'Serve in the ramekin with buttered crusty bread for dipping.',
        ]
      }
    ],
    legumes_plant: [
      {
        title: 'Lentil Soup with Crusty Bread & Side Salad',
        description: 'A hearty brown lentil and vegetable soup with crusty bread and a dressed salad.',
        visualType: 'beans_plantain',
        style: 'indigenous',
        proteinSourceType: 'legumes_plant',
        calories: 530,
        protein: 25,
        carbs: 68,
        fat: 14,
        fiber: 18,
        cookTimeMinutes: 50,
        readyToEatQuery: 'Lentil Soup with Crusty Bread',
        ingredients: [
          { name: 'Brown Lentils', gramWeight: 220, baseNGNCost: 540, protein: 20, carbs: 44, fat: 1, fiber: 16, sourcingLocation: 'Borough Market Pulses' },
          { name: 'Carrot, Leek & Celery', gramWeight: 250, baseNGNCost: 380, protein: 6, carbs: 34, fat: 4, fiber: 10, sourcingLocation: 'Borough Market Produce' },
          { name: 'Crusty Bread', gramWeight: 90, baseNGNCost: 200, protein: 4, carbs: 32, fat: 2, fiber: 4, sourcingLocation: 'Borough Market Bakeries' },
          { name: 'Side Salad & Olive Oil', gramWeight: 150, baseNGNCost: 280, protein: 3, carbs: 12, fat: 14, fiber: 5, sourcingLocation: 'Borough Market Produce' },
        ],
        prepInstructions: [
          'Sweat the chopped vegetables, add lentils and stock, and simmer until soft.',
          'Toss the salad leaves with olive oil and lemon.',
          'Serve the soup with bread and the salad alongside.',
        ]
      },
      {
        title: 'Baked Bean & Potato Pie with Green Salad',
        description: 'A layered vegetarian pie of baked beans, potato and cheese, with a green salad.',
        visualType: 'beans_plantain',
        style: 'indigenous',
        proteinSourceType: 'legumes_plant',
        calories: 610,
        protein: 24,
        carbs: 82,
        fat: 18,
        fiber: 17,
        cookTimeMinutes: 75,
        readyToEatQuery: 'Baked Bean and Potato Pie',
        ingredients: [
          { name: 'Baked Beans', gramWeight: 240, baseNGNCost: 640, protein: 18, carbs: 50, fat: 2, fiber: 14, sourcingLocation: 'Borough Market Pantry' },
          { name: 'Potato Layer', gramWeight: 250, baseNGNCost: 420, protein: 5, carbs: 46, fat: 2, fiber: 6, sourcingLocation: 'Borough Market Potatoes' },
          { name: 'Cheddar', gramWeight: 70, baseNGNCost: 330, protein: 8, carbs: 1, fat: 23, fiber: 0, sourcingLocation: 'Borough Market Cheese' },
          { name: 'Green Salad', gramWeight: 150, baseNGNCost: 280, protein: 3, carbs: 12, fat: 14, fiber: 5, sourcingLocation: 'Borough Market Produce' },
        ],
        prepInstructions: [
          'Layer mashed potato, baked beans and grated cheddar in a dish.',
          'Top and bake until the crust is crisp and golden.',
          'Serve with a dressed green salad.',
        ]
      }
    ],
    beef_lean: [
      {
        title: 'Shepherd\'s Pie with Garden Peas',
        description: 'Minced beef under a fluffy mashed potato crust, with garden peas and gravy.',
        visualType: 'stew_swallow',
        style: 'indigenous',
        proteinSourceType: 'beef_lean',
        calories: 730,
        protein: 46,
        carbs: 66,
        fat: 28,
        fiber: 9,
        cookTimeMinutes: 75,
        readyToEatQuery: 'Shepherd\'s Pie with Garden Peas',
        ingredients: [
          { name: 'Minced Beef', gramWeight: 200, baseNGNCost: 2100, protein: 42, carbs: 0, fat: 14, fiber: 0, sourcingLocation: 'Borough Market Butchers' },
          { name: 'Potato Mash', gramWeight: 260, baseNGNCost: 440, protein: 6, carbs: 46, fat: 11, fiber: 6, sourcingLocation: 'Borough Market Potatoes' },
          { name: 'Carrot & Onion Gravy', gramWeight: 200, baseNGNCost: 300, protein: 4, carbs: 24, fat: 6, fiber: 6, sourcingLocation: 'Borough Market Produce' },
          { name: 'Garden Peas', gramWeight: 130, baseNGNCost: 260, protein: 7, carbs: 20, fat: 1, fiber: 7, sourcingLocation: 'Borough Market Produce' },
        ],
        prepInstructions: [
          'Brown the mince with onion, then add carrot, tomato and stock and simmer.',
          'Top with mashed potato, fork the surface and bake until golden.',
          'Serve with garden peas and the pan gravy.',
        ]
      },
      {
        title: 'Roast Beef Sandwich with Crisps & Salad',
        description: 'Sliced roast beef in a crusty roll with horseradish, salad and crisps on the side.',
        visualType: 'grilled_fish',
        style: 'indigenous',
        proteinSourceType: 'beef_lean',
        calories: 650,
        protein: 48,
        carbs: 58,
        fat: 22,
        fiber: 8,
        cookTimeMinutes: 25,
        readyToEatQuery: 'Roast Beef Sandwich',
        ingredients: [
          { name: 'Roast Beef', gramWeight: 190, baseNGNCost: 2250, protein: 46, carbs: 0, fat: 12, fiber: 0, sourcingLocation: 'Borough Market Butchers' },
          { name: 'Crusty Roll', gramWeight: 100, baseNGNCost: 210, protein: 7, carbs: 42, fat: 2, fiber: 3, sourcingLocation: 'Borough Market Bakeries' },
          { name: 'Horseradish & Lettuce', gramWeight: 100, baseNGNCost: 200, protein: 2, carbs: 12, fat: 10, fiber: 3, sourcingLocation: 'Borough Market Produce' },
          { name: 'Crisps', gramWeight: 60, baseNGNCost: 200, protein: 2, carbs: 18, fat: 8, fiber: 3, sourcingLocation: 'Borough Market Pantry' },
        ],
        prepInstructions: [
          'Slice the cold roast beef thinly against the grain.',
          'Fill a toasted crusty roll with beef, horseradish and crisp lettuce.',
          'Serve with crisps alongside.',
        ]
      }
    ]
  }
};
