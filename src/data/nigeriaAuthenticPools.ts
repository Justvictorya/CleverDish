/**
 * Third layer of Nigerian dishes: the soups, meats and street foods that were
 * missing, plus replacements for plates that turned out not to be Nigerian.
 *
 * Naming rule, agreed with the product owner: every title is plain English for
 * what is in the bowl. No ethnic or regional badges ("Yoruba", "Igbo", "Hausa",
 * "Northern"), no "traditional/native/authentic" posturing, and no claims about
 * which community a dish belongs to. Those claims are contestable and add
 * nothing to a meal plan. Local food names are kept where they are simply the
 * name of the dish rather than a claim of ownership: akara, moi moi, pap, egusi,
 * ogbono, banga, suya, asun, nkwobi. Tests enforce this.
 *
 * Ingredients, methods and regional roots were checked against Nigerian food
 * sources rather than written from memory, which is how the earlier batch ended
 * up with sushi, couscous, shakshuka and an invented "saj" bread.
 */
import type { MealBlueprint } from '../types';

export type NigeriaAuthenticPool = Record<MealBlueprint['proteinSourceType'], MealBlueprint[]>;

export const NIGERIA_AUTHENTIC_POOLS: Record<
  'breakfasts' | 'afternoons' | 'evenings',
  NigeriaAuthenticPool
> = {
  breakfasts: {
    fish: [
      {
        title: 'Grilled Sardines with Onion Salad and Boiled Yam',
        description:
          'Small whole sardines grilled over charcoal until the skin crisps, served with a sharp onion and tomato salad and a thick slice of boiled yam.',
        visualType: 'grilled_fish',
        style: 'indigenous',
        proteinSourceType: 'fish',
        calories: 610,
        protein: 42,
        carbs: 52,
        fat: 22,
        fiber: 8,
        cookTimeMinutes: 30,
        readyToEatQuery: 'Grilled Sardines with Onion and Yam',
        ingredients: [
          { name: 'Whole Grilled Sardines', gramWeight: 140, baseNGNCost: 1200, protein: 32, carbs: 0, fat: 14, fiber: 0, sourcingLocation: 'Fish Counter' },
          { name: 'Red Onion & Tomato Salad', gramWeight: 100, baseNGNCost: 250, protein: 2, carbs: 9, fat: 1, fiber: 2, sourcingLocation: 'Vegetable Stalls' },
          { name: 'Boiled White Yam', gramWeight: 200, baseNGNCost: 600, protein: 4, carbs: 42, fat: 0, fiber: 3, sourcingLocation: 'Produce Aisle' },
          { name: 'Ground Pepper & Chili', gramWeight: 8, baseNGNCost: 80, protein: 1, carbs: 1, fat: 0, fiber: 1, sourcingLocation: 'Traditional Condiments' }
        ],
        prepInstructions: [
          'Grill the sardines over charcoal until crisp on both sides.',
          'Slice the onion and tomato thin, salt lightly and leave to soften.',
          'Boil the yam in water until a knife slides through with no resistance.',
          'Serve the fish with the salad and hot yam.'
        ]
      },
      {
        title: 'Smoked Titus Pepper Sauce with Akara and Pap',
        description:
          'Flaked smoked titus pepper sauce, the standard fish seasoning at Nigerian breakfast stalls, spooned over warm pap with crisp bean fritters.',
        visualType: 'beans_plantain',
        style: 'indigenous',
        proteinSourceType: 'fish',
        calories: 585,
        protein: 34,
        carbs: 61,
        fat: 18,
        fiber: 9,
        cookTimeMinutes: 35,
        readyToEatQuery: 'Smoked Titus Pepper Sauce with Akara and Pap',
        ingredients: [
          { name: 'Smoked Titus (Mackerel) Flakes', gramWeight: 90, baseNGNCost: 750, protein: 26, carbs: 0, fat: 6, fiber: 0, sourcingLocation: 'Fish Counter' },
          { name: 'Akara Bean Fritters', gramWeight: 110, baseNGNCost: 450, protein: 9, carbs: 16, fat: 10, fiber: 5, sourcingLocation: 'Street Kitchen' },
          { name: 'Smooth Pap (Corn Ferment)', gramWeight: 220, baseNGNCost: 150, protein: 5, carbs: 33, fat: 1, fiber: 2, sourcingLocation: 'Grain Stall' },
          { name: 'Pepper & Crayfish Blend', gramWeight: 25, baseNGNCost: 220, protein: 4, carbs: 2, fat: 1, fiber: 1, sourcingLocation: 'Traditional Condiments' }
        ],
        prepInstructions: [
          'Warm the flaked smoked titus in a small pan with pepper and crayfish.',
          'Loosen the pap with hot water to a pourable consistency.',
          'Fry the akara until golden and drain on paper.',
          'Pour the pepper sauce over the pap and serve alongside the akara.'
        ]
      },
      {
        title: 'Pap with Grilled Tilapia Pepper Sauce',
        description:
          'Grilled tilapia fillet drenched in a bright pepper sauce, eaten with smooth pap for a filling start to the day.',
        visualType: 'grilled_fish',
        style: 'indigenous',
        proteinSourceType: 'fish',
        calories: 600,
        protein: 40,
        carbs: 56,
        fat: 17,
        fiber: 7,
        cookTimeMinutes: 30,
        readyToEatQuery: 'Grilled Tilapia Pepper Sauce with Pap',
        ingredients: [
          { name: 'Grilled Tilapia Fillet', gramWeight: 170, baseNGNCost: 1250, protein: 34, carbs: 0, fat: 7, fiber: 0, sourcingLocation: 'Fish Counter' },
          { name: 'Peppered Tomato Sauce', gramWeight: 90, baseNGNCost: 220, protein: 3, carbs: 10, fat: 3, fiber: 2, sourcingLocation: 'Vegetable Stalls' },
          { name: 'Smooth Pap (Corn Ferment)', gramWeight: 200, baseNGNCost: 150, protein: 4, carbs: 31, fat: 1, fiber: 2, sourcingLocation: 'Grain Stall' },
          { name: 'Vegetable Oil', gramWeight: 12, baseNGNCost: 120, protein: 0, carbs: 0, fat: 12, fiber: 0, sourcingLocation: 'Traditional Condiments' }
        ],
        prepInstructions: [
          'Grill the tilapia until the flesh flakes and the skin chars.',
          'Simmer tomato, onion and pepper into a loose sauce.',
          'Stir the pap smooth with hot water.',
          'Plate the fish, spoon over the sauce and serve with pap.'
        ]
      }
    ],
    poultry: [
      {
        title: 'Suya Chicken Skewers with Onion, Tomato and Pap',
        description:
          'Chicken sliced thin, rubbed with yaji suya spice and grilled over an open charcoal fire, with fresh onion and tomato and a bowl of pap.',
        visualType: 'chicken_salad',
        style: 'indigenous',
        proteinSourceType: 'poultry',
        calories: 640,
        protein: 46,
        carbs: 46,
        fat: 22,
        fiber: 5,
        cookTimeMinutes: 35,
        readyToEatQuery: 'Suya Chicken Skewers with Onion and Tomato',
        ingredients: [
          { name: 'Chicken Breast Slices', gramWeight: 180, baseNGNCost: 1300, protein: 42, carbs: 0, fat: 5, fiber: 0, sourcingLocation: 'Butcher Shop' },
          { name: 'Yaji Suya Spice', gramWeight: 20, baseNGNCost: 140, protein: 2, carbs: 3, fat: 1, fiber: 1, sourcingLocation: 'Traditional Condiments' },
          { name: 'Sliced Onion & Tomato', gramWeight: 90, baseNGNCost: 220, protein: 2, carbs: 8, fat: 1, fiber: 2, sourcingLocation: 'Vegetable Stalls' },
          { name: 'Smooth Pap (Corn Ferment)', gramWeight: 180, baseNGNCost: 140, protein: 4, carbs: 28, fat: 1, fiber: 2, sourcingLocation: 'Grain Stall' }
        ],
        prepInstructions: [
          'Slice the chicken thin across the grain so it cooks evenly.',
          'Rub the yaji spice over the chicken and leave for fifteen minutes.',
          'Skewer and grill over charcoal, turning until charred outside and juicy inside.',
          'Serve with raw onion and tomato and a bowl of pap.'
        ]
      },
      {
        title: 'Pap with Shredded Peppered Chicken and Garden Egg',
        description:
          'Shredded chicken simmered with garden egg and pepper, spooned over warm pap for a hearty, low-cost breakfast.',
        visualType: 'oatmeal_parfait',
        style: 'indigenous',
        proteinSourceType: 'poultry',
        calories: 615,
        protein: 43,
        carbs: 54,
        fat: 18,
        fiber: 8,
        cookTimeMinutes: 40,
        readyToEatQuery: 'Shredded Peppered Chicken with Garden Egg',
        ingredients: [
          { name: 'Shredded Chicken Breast', gramWeight: 170, baseNGNCost: 1250, protein: 40, carbs: 0, fat: 6, fiber: 0, sourcingLocation: 'Butcher Shop' },
          { name: 'Garden Egg & Scent Leaves', gramWeight: 110, baseNGNCost: 260, protein: 3, carbs: 11, fat: 1, fiber: 4, sourcingLocation: 'Vegetable Stalls' },
          { name: 'Smooth Pap (Corn Ferment)', gramWeight: 200, baseNGNCost: 150, protein: 4, carbs: 31, fat: 1, fiber: 2, sourcingLocation: 'Grain Stall' },
          { name: 'Pepper, Ginger & Onion Paste', gramWeight: 25, baseNGNCost: 200, protein: 1, carbs: 4, fat: 1, fiber: 1, sourcingLocation: 'Traditional Condiments' }
        ],
        prepInstructions: [
          'Shred the cooked chicken and set the stock aside.',
          'Fry the pepper, ginger and onion paste until fragrant.',
          'Add diced garden egg and simmer until soft.',
          'Return the chicken with a splash of stock, then serve over pap.'
        ]
      },
      {
        title: 'Chicken Stew with Yam and Pepper Sauce',
        description:
          'A mild tomato chicken stew with peppers and ginger, eaten with boiled yam and a side of raw pepper sauce.',
        visualType: 'yam_egg_skillet',
        style: 'indigenous',
        proteinSourceType: 'poultry',
        calories: 655,
        protein: 45,
        carbs: 55,
        fat: 23,
        fiber: 7,
        cookTimeMinutes: 50,
        readyToEatQuery: 'Chicken Stew with Yam',
        ingredients: [
          { name: 'Chicken Thigh / Breast', gramWeight: 180, baseNGNCost: 1300, protein: 41, carbs: 0, fat: 8, fiber: 0, sourcingLocation: 'Butcher Shop' },
          { name: 'Tomato & Red Pepper Base', gramWeight: 130, baseNGNCost: 320, protein: 4, carbs: 14, fat: 2, fiber: 3, sourcingLocation: 'Vegetable Stalls' },
          { name: 'Boiled White Yam', gramWeight: 200, baseNGNCost: 600, protein: 4, carbs: 42, fat: 0, fiber: 3, sourcingLocation: 'Produce Aisle' },
          { name: 'Palm Oil', gramWeight: 12, baseNGNCost: 140, protein: 0, carbs: 0, fat: 12, fiber: 0, sourcingLocation: 'Traditional Condiments' }
        ],
        prepInstructions: [
          'Season and brown the chicken in the palm oil.',
          'Add the tomato and pepper base and simmer until the chicken is tender.',
          'Boil the yam until soft all the way through.',
          'Serve the stew over the yam with raw pepper sauce on the side.'
        ]
      }
    ],
    eggs_dairy: [
      {
        title: 'Custard Bun with Ogi and Boiled Egg',
        description:
          'A soft sweet custard bun soaked in fermented corn gruel alongside a firm boiled egg, a classic cheap breakfast.',
        visualType: 'oatmeal_parfait',
        style: 'indigenous',
        proteinSourceType: 'eggs_dairy',
        calories: 570,
        protein: 26,
        carbs: 68,
        fat: 19,
        fiber: 5,
        cookTimeMinutes: 20,
        readyToEatQuery: 'Custard Bun with Ogi and Boiled Egg',
        ingredients: [
          { name: 'Sweet Custard Bun', gramWeight: 110, baseNGNCost: 300, protein: 6, carbs: 19, fat: 7, fiber: 1, sourcingLocation: 'Bakery' },
          { name: 'Ogi (Fermented Corn Gruel)', gramWeight: 200, baseNGNCost: 140, protein: 4, carbs: 31, fat: 1, fiber: 2, sourcingLocation: 'Grain Stall' },
          { name: 'Boiled Farm Egg (1 Large)', gramWeight: 50, baseNGNCost: 220, protein: 6, carbs: 1, fat: 5, fiber: 0, sourcingLocation: 'Egg Depot' },
          { name: 'Sugar & Groundnut Sprinkle', gramWeight: 15, baseNGNCost: 90, protein: 3, carbs: 8, fat: 2, fiber: 1, sourcingLocation: 'Grain Stall' }
        ],
        prepInstructions: [
          'Boil the egg for ten minutes and cool in cold water.',
          'Stir the ogi smooth with hot water and add sugar.',
          'Split the bun and spoon the ogi into it.',
          'Serve with the boiled egg and a groundnut sprinkle.'
        ]
      },
      {
        title: 'Yam and Boiled Egg with Pepper Sauce',
        description:
          'Boiled yam with two boiled eggs and a fiery blended pepper sauce, the standard fuel for a long working day.',
        visualType: 'yam_egg_skillet',
        style: 'indigenous',
        proteinSourceType: 'eggs_dairy',
        calories: 590,
        protein: 24,
        carbs: 66,
        fat: 20,
        fiber: 6,
        cookTimeMinutes: 25,
        readyToEatQuery: 'Yam and Boiled Egg with Pepper Sauce',
        ingredients: [
          { name: 'Boiled White Yam', gramWeight: 250, baseNGNCost: 750, protein: 5, carbs: 53, fat: 0, fiber: 4, sourcingLocation: 'Produce Aisle' },
          { name: 'Farm Boiled Eggs (2 Large)', gramWeight: 100, baseNGNCost: 440, protein: 13, carbs: 1, fat: 9, fiber: 0, sourcingLocation: 'Egg Depot' },
          { name: 'Blended Pepper Sauce', gramWeight: 25, baseNGNCost: 150, protein: 1, carbs: 4, fat: 2, fiber: 1, sourcingLocation: 'Traditional Condiments' },
          { name: 'Vegetable Oil', gramWeight: 8, baseNGNCost: 90, protein: 0, carbs: 0, fat: 8, fiber: 0, sourcingLocation: 'Traditional Condiments' }
        ],
        prepInstructions: [
          'Boil the yam until a knife passes through without resistance.',
          'Boil the eggs for ten minutes and cool them in cold water.',
          'Blend the pepper sauce until smooth.',
          'Plate the yam, halve the eggs and spoon over the pepper sauce.'
        ]
      },
      {
        title: 'Egg Fried Rice with Garden Egg and Ugu',
        description:
          'Day-old rice fried hard with egg, garden egg and shredded ugu leaves, a cheap and filling one-pot breakfast.',
        visualType: 'jollof_bowl',
        style: 'indigenous',
        proteinSourceType: 'eggs_dairy',
        calories: 640,
        protein: 25,
        carbs: 72,
        fat: 22,
        fiber: 7,
        cookTimeMinutes: 25,
        readyToEatQuery: 'Egg Fried Rice with Garden Egg',
        ingredients: [
          { name: 'Cooked Rice (Day Old)', gramWeight: 200, baseNGNCost: 500, protein: 6, carbs: 44, fat: 1, fiber: 1, sourcingLocation: 'Grain Stall' },
          { name: 'Farm Fresh Eggs (2 Large)', gramWeight: 100, baseNGNCost: 440, protein: 13, carbs: 1, fat: 9, fiber: 0, sourcingLocation: 'Egg Depot' },
          { name: 'Garden Egg & Ugu Greens', gramWeight: 100, baseNGNCost: 250, protein: 3, carbs: 11, fat: 1, fiber: 4, sourcingLocation: 'Vegetable Stalls' },
          { name: 'Vegetable Oil & Seasoning', gramWeight: 14, baseNGNCost: 150, protein: 1, carbs: 2, fat: 11, fiber: 0, sourcingLocation: 'Traditional Condiments' }
        ],
        prepInstructions: [
          'Heat the oil in a wide pan until shimmering.',
          'Scramble the eggs lightly and set half aside.',
          'Fry the garden egg and ugu briefly, then add the rice.',
          'Toss over high heat until the rice is hot and slightly crisp, then fold the egg back through.'
        ]
      }
    ],
    legumes_plant: [
      {
        title: 'Mashed Beans with Agege Bread',
        description:
          'Soft mashed beans simmered in red oil with onion and pepper, served with a slice of soft chewy Agege bread to scoop it up.',
        visualType: 'beans_plantain',
        style: 'indigenous',
        proteinSourceType: 'legumes_plant',
        calories: 620,
        protein: 28,
        carbs: 74,
        fat: 20,
        fiber: 15,
        cookTimeMinutes: 45,
        readyToEatQuery: 'Mashed Beans with Agege Bread',
        ingredients: [
          { name: 'Mashed Black-eyed Beans', gramWeight: 200, baseNGNCost: 700, protein: 20, carbs: 34, fat: 2, fiber: 11, sourcingLocation: 'Grain Stall' },
          { name: 'Agege Bread', gramWeight: 100, baseNGNCost: 350, protein: 8, carbs: 18, fat: 3, fiber: 1, sourcingLocation: 'Bakery' },
          { name: 'Red Palm Oil & Pepper', gramWeight: 16, baseNGNCost: 200, protein: 2, carbs: 3, fat: 11, fiber: 1, sourcingLocation: 'Traditional Condiments' },
          { name: 'Sliced Onion & Tomato', gramWeight: 70, baseNGNCost: 180, protein: 2, carbs: 7, fat: 1, fiber: 2, sourcingLocation: 'Vegetable Stalls' }
        ],
        prepInstructions: [
          'Mash the cooked beans until smooth but not watery.',
          'Fry sliced onion and tomato in the palm oil with pepper.',
          'Fold the fried mixture through the beans and simmer until it thickens.',
          'Serve with thick slices of Agege bread.'
        ]
      },
      {
        title: 'Bean Dumplings with Pepper Sauce',
        description:
          'Soft flour-and-bean dumplings simmered in spiced red sauce, a hearty breakfast that stretches a little money a long way.',
        visualType: 'stew_swallow',
        style: 'indigenous',
        proteinSourceType: 'legumes_plant',
        calories: 610,
        protein: 24,
        carbs: 70,
        fat: 22,
        fiber: 10,
        cookTimeMinutes: 50,
        readyToEatQuery: 'Bean Dumplings with Pepper Sauce',
        ingredients: [
          { name: 'Flour Bean Dumplings', gramWeight: 200, baseNGNCost: 550, protein: 14, carbs: 40, fat: 4, fiber: 4, sourcingLocation: 'Grain Stall' },
          { name: 'Pepper Tomato Sauce', gramWeight: 110, baseNGNCost: 280, protein: 3, carbs: 13, fat: 4, fiber: 3, sourcingLocation: 'Vegetable Stalls' },
          { name: 'Red Palm Oil', gramWeight: 14, baseNGNCost: 170, protein: 0, carbs: 0, fat: 14, fiber: 0, sourcingLocation: 'Traditional Condiments' },
          { name: 'Washed Waterleaf', gramWeight: 80, baseNGNCost: 180, protein: 4, carbs: 5, fat: 1, fiber: 3, sourcingLocation: 'Vegetable Stalls' }
        ],
        prepInstructions: [
          'Shape the flour and bean mix into smooth dumplings.',
          'Fry sliced onion, ginger and pepper in palm oil until fragrant.',
          'Add tomato and waterleaf, season, then drop in the dumplings.',
          'Cover and simmer until the dumplings are tender and the sauce has reduced.'
        ]
      },
      {
        title: 'Spiced Millet Porridge with Bean Fritters',
        description:
          'A thick, peppery millet porridge stirred with ginger and spice, served with spiced bean fritters fried to order.',
        visualType: 'oatmeal_parfait',
        style: 'indigenous',
        proteinSourceType: 'legumes_plant',
        calories: 600,
        protein: 25,
        carbs: 68,
        fat: 21,
        fiber: 9,
        cookTimeMinutes: 40,
        readyToEatQuery: 'Spiced Millet Porridge with Bean Fritters',
        ingredients: [
          { name: 'Millet Flour Porridge', gramWeight: 220, baseNGNCost: 300, protein: 7, carbs: 46, fat: 2, fiber: 3, sourcingLocation: 'Grain Stall' },
          { name: 'Spiced Bean Fritters', gramWeight: 110, baseNGNCost: 450, protein: 10, carbs: 15, fat: 10, fiber: 5, sourcingLocation: 'Street Kitchen' },
          { name: 'Ginger, Pepper & Spice', gramWeight: 10, baseNGNCost: 110, protein: 1, carbs: 2, fat: 0, fiber: 1, sourcingLocation: 'Traditional Condiments' },
          { name: 'Vegetable Oil', gramWeight: 14, baseNGNCost: 150, protein: 0, carbs: 0, fat: 14, fiber: 0, sourcingLocation: 'Traditional Condiments' }
        ],
        prepInstructions: [
          'Whisk the millet flour with water and simmer, stirring constantly, until it thickens.',
          'Add grated ginger, pepper and spice near the end.',
          'Fry the bean fritters in hot oil until deep gold.',
          'Serve the porridge hot with the fritters on the side.'
        ]
      }
    ],
    beef_lean: [
      {
        title: 'Suya Beef Rolls with Yaji and Boli',
        description:
          'Thinly sliced beef rolled tightly, dusted with yaji suya spice and seared, served with roasted plantain and raw onion.',
        visualType: 'chicken_salad',
        style: 'indigenous',
        proteinSourceType: 'beef_lean',
        calories: 665,
        protein: 48,
        carbs: 40,
        fat: 27,
        fiber: 5,
        cookTimeMinutes: 40,
        readyToEatQuery: 'Suya Beef Rolls with Roasted Plantain',
        ingredients: [
          { name: 'Lean Beef Slices', gramWeight: 180, baseNGNCost: 1800, protein: 44, carbs: 0, fat: 8, fiber: 0, sourcingLocation: 'Butcher Shop' },
          { name: 'Yaji Suya Spice', gramWeight: 20, baseNGNCost: 140, protein: 2, carbs: 3, fat: 1, fiber: 1, sourcingLocation: 'Traditional Condiments' },
          { name: 'Boli (Roasted Plantain)', gramWeight: 130, baseNGNCost: 320, protein: 2, carbs: 30, fat: 1, fiber: 2, sourcingLocation: 'Fruit Stall' },
          { name: 'Sliced Red Onion & Tomato', gramWeight: 80, baseNGNCost: 190, protein: 2, carbs: 7, fat: 1, fiber: 2, sourcingLocation: 'Vegetable Stalls' }
        ],
        prepInstructions: [
          'Beat the beef thin and roll each slice tightly.',
          'Chill the rolls briefly so they hold their shape.',
          'Sear on a hot dry pan or over charcoal, then dust with yaji spice.',
          'Serve with boli and raw onion and tomato.'
        ]
      },
      {
        title: 'Beef and Bone Broth with Pepper Yam',
        description:
          'A clear, long-simmered beef and marrow broth seasoned with pepper and ginger, drunk with boiled yam.',
        visualType: 'stew_swallow',
        style: 'indigenous',
        proteinSourceType: 'beef_lean',
        calories: 595,
        protein: 42,
        carbs: 46,
        fat: 20,
        fiber: 4,
        cookTimeMinutes: 90,
        readyToEatQuery: 'Beef and Bone Broth with Yam',
        ingredients: [
          { name: 'Beef Bone & Marrow', gramWeight: 170, baseNGNCost: 1500, protein: 32, carbs: 0, fat: 12, fiber: 0, sourcingLocation: 'Butcher Shop' },
          { name: 'Boiled White Yam', gramWeight: 220, baseNGNCost: 660, protein: 4, carbs: 46, fat: 0, fiber: 3, sourcingLocation: 'Produce Aisle' },
          { name: 'Pepper, Ginger & Onion', gramWeight: 25, baseNGNCost: 200, protein: 1, carbs: 4, fat: 1, fiber: 1, sourcingLocation: 'Traditional Condiments' },
          { name: 'Salt & Seasoning', gramWeight: 8, baseNGNCost: 60, protein: 1, carbs: 1, fat: 0, fiber: 0, sourcingLocation: 'Traditional Condiments' }
        ],
        prepInstructions: [
          'Parboil the bones, then simmer them slowly until the marrow softens.',
          'Skim the foam and season with pepper, ginger and onion.',
          'Strain the broth and keep the marrow to eat.',
          'Serve in a deep bowl with boiled yam alongside.'
        ]
      },
      {
        title: 'Spicy Grilled Goat with Soft-Boiled Egg and Bread',
        description:
          'Suya-spiced grilled goat meat with its marrow, the traditional way to eat it, alongside a soft-boiled egg and bread.',
        visualType: 'chicken_salad',
        style: 'indigenous',
        proteinSourceType: 'beef_lean',
        calories: 700,
        protein: 50,
        carbs: 38,
        fat: 30,
        fiber: 4,
        cookTimeMinutes: 45,
        readyToEatQuery: 'Spicy Grilled Goat with Soft-Boiled Egg',
        ingredients: [
          { name: 'Goat Meat with Marrow', gramWeight: 180, baseNGNCost: 2000, protein: 45, carbs: 0, fat: 11, fiber: 0, sourcingLocation: 'Butcher Shop' },
          { name: 'Yaji Suya Spice', gramWeight: 20, baseNGNCost: 140, protein: 2, carbs: 3, fat: 1, fiber: 1, sourcingLocation: 'Traditional Condiments' },
          { name: 'Soft-Boiled Farm Egg', gramWeight: 50, baseNGNCost: 220, protein: 6, carbs: 1, fat: 5, fiber: 0, sourcingLocation: 'Egg Depot' },
          { name: 'Bread Roll', gramWeight: 90, baseNGNCost: 320, protein: 7, carbs: 16, fat: 2, fiber: 1, sourcingLocation: 'Bakery' }
        ],
        prepInstructions: [
          'Marinate the goat meat in suya spice for at least an hour.',
          'Grill over charcoal until the outside chars and the marrow softens.',
          'Boil the egg for six minutes only, so the yolk stays soft.',
          'Serve the meat hot with the egg and bread.'
        ]
      }
    ]
  },
  afternoons: {
    fish: [
      {
        title: 'Grilled Prawns in Coconut Sauce with Yam',
        description:
          'Grilled prawns in a fragrant palm and coconut sauce, served with boiled yam. Coastal cooking, lightly spiced.',
        visualType: 'grilled_fish',
        style: 'indigenous',
        proteinSourceType: 'fish',
        calories: 575,
        protein: 44,
        carbs: 38,
        fat: 21,
        fiber: 6,
        cookTimeMinutes: 30,
        readyToEatQuery: 'Grilled Prawns in Coconut Sauce',
        ingredients: [
          { name: 'Grilled King Prawns', gramWeight: 160, baseNGNCost: 2600, protein: 40, carbs: 0, fat: 4, fiber: 0, sourcingLocation: 'Fish Counter' },
          { name: 'Coconut & Palm Sauce', gramWeight: 90, baseNGNCost: 300, protein: 2, carbs: 5, fat: 11, fiber: 1, sourcingLocation: 'Traditional Condiments' },
          { name: 'Boiled White Yam', gramWeight: 180, baseNGNCost: 540, protein: 4, carbs: 38, fat: 0, fiber: 3, sourcingLocation: 'Produce Aisle' },
          { name: 'Pepper, Ginger & Onion', gramWeight: 20, baseNGNCost: 170, protein: 1, carbs: 3, fat: 1, fiber: 1, sourcingLocation: 'Traditional Condiments' }
        ],
        prepInstructions: [
          'Grill the prawns quickly over high heat so they stay succulent.',
          'Warm the coconut and palm sauce with sliced pepper, ginger and onion.',
          'Return the prawns to the sauce for a minute.',
          'Serve with boiled yam.'
        ]
      },
      {
        title: 'Grilled Shrimp with Pepper Sauce and Yam',
        description:
          'Whole shrimp grilled over charcoal with a fiery pepper sauce and a side of boiled yam.',
        visualType: 'grilled_fish',
        style: 'indigenous',
        proteinSourceType: 'fish',
        calories: 540,
        protein: 46,
        carbs: 40,
        fat: 15,
        fiber: 5,
        cookTimeMinutes: 25,
        readyToEatQuery: 'Grilled Shrimp with Pepper Sauce and Yam',
        ingredients: [
          { name: 'Whole Grilled Shrimp', gramWeight: 170, baseNGNCost: 2500, protein: 44, carbs: 0, fat: 4, fiber: 0, sourcingLocation: 'Fish Counter' },
          { name: 'Blended Pepper Sauce', gramWeight: 30, baseNGNCost: 180, protein: 1, carbs: 4, fat: 2, fiber: 1, sourcingLocation: 'Traditional Condiments' },
          { name: 'Boiled White Yam', gramWeight: 200, baseNGNCost: 600, protein: 4, carbs: 42, fat: 0, fiber: 3, sourcingLocation: 'Produce Aisle' },
          { name: 'Sliced Onion & Cucumber', gramWeight: 60, baseNGNCost: 140, protein: 1, carbs: 5, fat: 0, fiber: 1, sourcingLocation: 'Vegetable Stalls' }
        ],
        prepInstructions: [
          'Grill the shrimp over charcoal until the shells char.',
          'Blend the pepper sauce until smooth.',
          'Boil the yam until soft.',
          'Serve the shrimp with the pepper sauce, raw onion and cucumber.'
        ]
      },
      {
        title: 'Titus Pepper Soup with Yam Swallow',
        description:
          'A light, restorative smoked titus soup seasoned with pepper and utazi, drunk with soft yam swallow.',
        visualType: 'stew_swallow',
        style: 'indigenous',
        proteinSourceType: 'fish',
        calories: 555,
        protein: 40,
        carbs: 52,
        fat: 15,
        fiber: 7,
        cookTimeMinutes: 35,
        readyToEatQuery: 'Titus Pepper Soup with Yam',
        ingredients: [
          { name: 'Smoked Titus (Mackerel)', gramWeight: 130, baseNGNCost: 1000, protein: 32, carbs: 0, fat: 6, fiber: 0, sourcingLocation: 'Fish Counter' },
          { name: 'Pepper, Utazi & Ginger Broth', gramWeight: 200, baseNGNCost: 320, protein: 5, carbs: 8, fat: 2, fiber: 2, sourcingLocation: 'Traditional Condiments' },
          { name: 'Yam Flour / Yam Swallow', gramWeight: 150, baseNGNCost: 700, protein: 4, carbs: 40, fat: 1, fiber: 3, sourcingLocation: 'Grain Stall' },
          { name: 'Fresh Coriander', gramWeight: 15, baseNGNCost: 60, protein: 1, carbs: 2, fat: 0, fiber: 1, sourcingLocation: 'Vegetable Stalls' }
        ],
        prepInstructions: [
          'Simmer the smoked titus in water with sliced pepper and ginger.',
          'Add utazi and season to taste; do not overcook the fish.',
          'Knead the yam flour with warm water and cook to a smooth swallow.',
          'Serve the soup with the swallow and garnish with coriander.'
        ]
      }
    ],
    poultry: [
      {
        title: 'Barbecued Turkey Wing with Onion and Tomato',
        description:
          'A turkey wing marinated overnight and roasted over charcoal until the skin crackles, served with raw onion, tomato and dip.',
        visualType: 'chicken_salad',
        style: 'indigenous',
        proteinSourceType: 'poultry',
        calories: 645,
        protein: 49,
        carbs: 14,
        fat: 35,
        fiber: 3,
        cookTimeMinutes: 60,
        readyToEatQuery: 'Barbecued Turkey Wing with Onion and Tomato',
        ingredients: [
          { name: 'Turkey Wing Joint', gramWeight: 190, baseNGNCost: 2200, protein: 47, carbs: 0, fat: 10, fiber: 0, sourcingLocation: 'Butcher Shop' },
          { name: 'Suya & Pepper Marinade', gramWeight: 30, baseNGNCost: 220, protein: 3, carbs: 4, fat: 3, fiber: 1, sourcingLocation: 'Traditional Condiments' },
          { name: 'Sliced Onion & Tomato', gramWeight: 100, baseNGNCost: 230, protein: 2, carbs: 9, fat: 1, fiber: 2, sourcingLocation: 'Vegetable Stalls' },
          { name: 'Groundnut Dip', gramWeight: 40, baseNGNCost: 180, protein: 8, carbs: 3, fat: 7, fiber: 2, sourcingLocation: 'Grain Stall' }
        ],
        prepInstructions: [
          'Marinate the turkey wing overnight in suya spice, ginger and garlic.',
          'Roast over charcoal until the skin is dark and crisp.',
          'Rest the wing before pulling the meat apart.',
          'Serve with raw onion and tomato and a cooling groundnut dip.'
        ]
      },
      {
        title: 'Suya Chicken Wrap with Tomato and Onion',
        description:
          'Suya-spiced sliced chicken rolled in a soft wrap with onion, tomato and a little spicy sauce, the way it is sold at the roadside.',
        visualType: 'chicken_salad',
        style: 'indigenous',
        proteinSourceType: 'poultry',
        calories: 610,
        protein: 42,
        carbs: 46,
        fat: 22,
        fiber: 5,
        cookTimeMinutes: 30,
        readyToEatQuery: 'Suya Chicken Wrap with Tomato and Onion',
        ingredients: [
          { name: 'Sliced Chicken Breast', gramWeight: 170, baseNGNCost: 1250, protein: 40, carbs: 0, fat: 6, fiber: 0, sourcingLocation: 'Butcher Shop' },
          { name: 'Yaji Suya Spice', gramWeight: 20, baseNGNCost: 140, protein: 2, carbs: 3, fat: 1, fiber: 1, sourcingLocation: 'Traditional Condiments' },
          { name: 'Soft Wrap / Flatbread', gramWeight: 70, baseNGNCost: 260, protein: 6, carbs: 14, fat: 2, fiber: 1, sourcingLocation: 'Bakery' },
          { name: 'Sliced Tomato, Onion & Chili', gramWeight: 90, baseNGNCost: 210, protein: 2, carbs: 8, fat: 1, fiber: 2, sourcingLocation: 'Vegetable Stalls' }
        ],
        prepInstructions: [
          'Slice the chicken thin and rub it with the yaji spice.',
          'Sear over high heat until marked and cooked through.',
          'Warm the flatbread and lay it open.',
          'Fill with the chicken, tomato, onion and chili, then roll tightly.'
        ]
      },
      {
        title: 'Grilled Chicken with Pepper Sauce and Sweet Potato',
        description:
          'Charcoal-grilled chicken breast with a sharp pepper sauce and roasted sweet potato, lean and high protein.',
        visualType: 'chicken_salad',
        style: 'indigenous',
        proteinSourceType: 'poultry',
        calories: 585,
        protein: 46,
        carbs: 44,
        fat: 16,
        fiber: 8,
        cookTimeMinutes: 35,
        readyToEatQuery: 'Grilled Chicken with Pepper Sauce and Sweet Potato',
        ingredients: [
          { name: 'Grilled Chicken Breast', gramWeight: 175, baseNGNCost: 1300, protein: 42, carbs: 0, fat: 6, fiber: 0, sourcingLocation: 'Butcher Shop' },
          { name: 'Roasted Sweet Potato', gramWeight: 180, baseNGNCost: 450, protein: 4, carbs: 50, fat: 0, fiber: 7, sourcingLocation: 'Produce Aisle' },
          { name: 'Pepper & Onion Sauce', gramWeight: 70, baseNGNCost: 200, protein: 2, carbs: 7, fat: 3, fiber: 1, sourcingLocation: 'Traditional Condiments' },
          { name: 'Lemon Wedge & Coriander', gramWeight: 20, baseNGNCost: 70, protein: 1, carbs: 2, fat: 0, fiber: 1, sourcingLocation: 'Vegetable Stalls' }
        ],
        prepInstructions: [
          'Marinate the chicken in lemon, garlic and pepper for thirty minutes.',
          'Grill over charcoal, turning until marked on both sides.',
          'Roast the sweet potato in its skin until the flesh is soft.',
          'Serve the chicken with the pepper sauce and sweet potato.'
        ]
      }
    ],
    eggs_dairy: [
      {
        title: 'Egg Custard with Bread and Ogi',
        description:
          'A smooth egg custard set with milk, served over slices of bread with a bowl of fermented corn gruel alongside.',
        visualType: 'oatmeal_parfait',
        style: 'indigenous',
        proteinSourceType: 'eggs_dairy',
        calories: 560,
        protein: 27,
        carbs: 62,
        fat: 18,
        fiber: 5,
        cookTimeMinutes: 35,
        readyToEatQuery: 'Egg Custard with Bread and Ogi',
        ingredients: [
          { name: 'Egg Custard (Milk Set)', gramWeight: 160, baseNGNCost: 450, protein: 14, carbs: 16, fat: 8, fiber: 0, sourcingLocation: 'Dairy Counter' },
          { name: 'Bread Slices', gramWeight: 90, baseNGNCost: 320, protein: 7, carbs: 16, fat: 2, fiber: 1, sourcingLocation: 'Bakery' },
          { name: 'Ogi (Fermented Corn Gruel)', gramWeight: 180, baseNGNCost: 130, protein: 4, carbs: 28, fat: 1, fiber: 2, sourcingLocation: 'Grain Stall' },
          { name: 'Sugar & Cinnamon', gramWeight: 10, baseNGNCost: 60, protein: 0, carbs: 3, fat: 0, fiber: 0, sourcingLocation: 'Grain Stall' }
        ],
        prepInstructions: [
          'Whisk eggs, milk and sugar together and strain into a dish.',
          'Set over a low bain-marie until just firm.',
          'Toast the bread lightly.',
          'Stir the ogi smooth with hot water and serve everything together.'
        ]
      },
      {
        title: 'Garden Egg Soup with Boiled Egg and Garri',
        description:
          'A thickened garden egg and tomato soup with sweet peppers, served with garri and a boiled egg.',
        visualType: 'stew_swallow',
        style: 'indigenous',
        proteinSourceType: 'eggs_dairy',
        calories: 630,
        protein: 25,
        carbs: 74,
        fat: 22,
        fiber: 9,
        cookTimeMinutes: 45,
        readyToEatQuery: 'Garden Egg Soup with Egg and Garri',
        ingredients: [
          { name: 'Garden Egg & Tomato Soup', gramWeight: 170, baseNGNCost: 400, protein: 5, carbs: 20, fat: 8, fiber: 6, sourcingLocation: 'Vegetable Stalls' },
          { name: 'Garri (Cassava Granules)', gramWeight: 130, baseNGNCost: 220, protein: 2, carbs: 31, fat: 0, fiber: 2, sourcingLocation: 'Grain Stall' },
          { name: 'Boiled Farm Egg (1 Large)', gramWeight: 50, baseNGNCost: 220, protein: 6, carbs: 1, fat: 5, fiber: 0, sourcingLocation: 'Egg Depot' },
          { name: 'Palm Oil', gramWeight: 12, baseNGNCost: 140, protein: 0, carbs: 0, fat: 12, fiber: 0, sourcingLocation: 'Traditional Condiments' }
        ],
        prepInstructions: [
          'Fry sliced tomato and sweet pepper in the palm oil.',
          'Add diced garden egg and simmer until thick and glossy.',
          'Season and adjust the salt.',
          'Soak the garri in a little hot water and serve it beside the soup with the boiled egg.'
        ]
      },
      {
        title: 'Egg and Tomato Stew with Boiled Yam',
        description:
          'Browned egg simmered in a soft tomato and pepper stew, the classic cheap supper, served with boiled yam.',
        visualType: 'yam_egg_skillet',
        style: 'indigenous',
        proteinSourceType: 'eggs_dairy',
        calories: 590,
        protein: 27,
        carbs: 58,
        fat: 21,
        fiber: 7,
        cookTimeMinutes: 35,
        readyToEatQuery: 'Egg and Tomato Stew with Yam',
        ingredients: [
          { name: 'Farm Fresh Eggs (3 Large)', gramWeight: 150, baseNGNCost: 650, protein: 19, carbs: 1, fat: 13, fiber: 0, sourcingLocation: 'Egg Depot' },
          { name: 'Tomato, Pepper & Onion Stew', gramWeight: 150, baseNGNCost: 380, protein: 4, carbs: 18, fat: 7, fiber: 4, sourcingLocation: 'Vegetable Stalls' },
          { name: 'Boiled White Yam', gramWeight: 180, baseNGNCost: 540, protein: 4, carbs: 38, fat: 0, fiber: 3, sourcingLocation: 'Produce Aisle' },
          { name: 'Palm Oil', gramWeight: 12, baseNGNCost: 140, protein: 0, carbs: 0, fat: 12, fiber: 0, sourcingLocation: 'Traditional Condiments' }
        ],
        prepInstructions: [
          'Boil the eggs for seven minutes, then peel and halve them.',
          'Fry the eggs in palm oil until the edges brown.',
          'Add the tomato, pepper and onion mixture and simmer gently.',
          'Serve with boiled yam.'
        ]
      }
    ],
    legumes_plant: [
      {
        title: 'Akara in Agege Bread with Pepper Sauce',
        description:
          'Crisp bean fritters tucked into soft Agege bread with a hot pepper sauce, eaten like a sandwich on the go.',
        visualType: 'beans_plantain',
        style: 'indigenous',
        proteinSourceType: 'legumes_plant',
        calories: 595,
        protein: 24,
        carbs: 68,
        fat: 21,
        fiber: 10,
        cookTimeMinutes: 30,
        readyToEatQuery: 'Akara in Agege Bread with Pepper Sauce',
        ingredients: [
          { name: 'Akara Bean Fritters', gramWeight: 130, baseNGNCost: 520, protein: 11, carbs: 19, fat: 12, fiber: 6, sourcingLocation: 'Street Kitchen' },
          { name: 'Agege Bread', gramWeight: 110, baseNGNCost: 380, protein: 9, carbs: 20, fat: 3, fiber: 1, sourcingLocation: 'Bakery' },
          { name: 'Hot Pepper Sauce', gramWeight: 30, baseNGNCost: 170, protein: 1, carbs: 4, fat: 2, fiber: 1, sourcingLocation: 'Traditional Condiments' },
          { name: 'Vegetable Oil', gramWeight: 12, baseNGNCost: 130, protein: 0, carbs: 0, fat: 12, fiber: 0, sourcingLocation: 'Traditional Condiments' }
        ],
        prepInstructions: [
          'Fry the akara in hot oil until deeply golden and crisp.',
          'Split the bread and warm it briefly.',
          'Tuck the fritters into the bread.',
          'Spoon over the pepper sauce and eat straight away while it is hot.'
        ]
      },
      {
        title: 'Moi-Moi with Custard and Pap',
        description:
          'Steamed bean pudding sliced and fried in a little oil, served with sweet custard and smooth pap.',
        visualType: 'beans_plantain',
        style: 'indigenous',
        proteinSourceType: 'legumes_plant',
        calories: 615,
        protein: 27,
        carbs: 68,
        fat: 21,
        fiber: 11,
        cookTimeMinutes: 55,
        readyToEatQuery: 'Moi-Moi with Custard and Pap',
        ingredients: [
          { name: 'Steamed Moi-Moi Pudding', gramWeight: 160, baseNGNCost: 620, protein: 19, carbs: 26, fat: 4, fiber: 7, sourcingLocation: 'Grain Stall' },
          { name: 'Egg Custard (Milk Set)', gramWeight: 110, baseNGNCost: 320, protein: 10, carbs: 11, fat: 6, fiber: 0, sourcingLocation: 'Dairy Counter' },
          { name: 'Smooth Pap (Corn Ferment)', gramWeight: 170, baseNGNCost: 130, protein: 4, carbs: 26, fat: 1, fiber: 2, sourcingLocation: 'Grain Stall' },
          { name: 'Palm Oil (for frying)', gramWeight: 12, baseNGNCost: 140, protein: 0, carbs: 0, fat: 12, fiber: 0, sourcingLocation: 'Traditional Condiments' }
        ],
        prepInstructions: [
          'Wrap the bean paste in leaves and steam until set and firm.',
          'Slice into rounds and shallow-fry in palm oil until the edges crisp.',
          'Prepare the custard and stir the pap smooth.',
          'Serve the fried moi-moi with custard and pap.'
        ]
      },
      {
        title: 'Bean Sprouts and Pepper Salad with Rice',
        description:
          'Crunchy bean sprouts tossed with pepper, onion and palm oil, served over rice. Light and sharp.',
        visualType: 'jollof_bowl',
        style: 'indigenous',
        proteinSourceType: 'legumes_plant',
        calories: 565,
        protein: 25,
        carbs: 66,
        fat: 17,
        fiber: 10,
        cookTimeMinutes: 20,
        readyToEatQuery: 'Bean Sprout and Pepper Salad with Rice',
        ingredients: [
          { name: 'Fresh Bean Sprouts', gramWeight: 150, baseNGNCost: 350, protein: 12, carbs: 16, fat: 1, fiber: 5, sourcingLocation: 'Vegetable Stalls' },
          { name: 'Cooked Rice', gramWeight: 190, baseNGNCost: 480, protein: 5, carbs: 42, fat: 1, fiber: 1, sourcingLocation: 'Grain Stall' },
          { name: 'Pepper, Onion & Red Palm Oil', gramWeight: 40, baseNGNCost: 240, protein: 1, carbs: 5, fat: 6, fiber: 2, sourcingLocation: 'Traditional Condiments' },
          { name: 'Fresh Coriander', gramWeight: 15, baseNGNCost: 60, protein: 1, carbs: 2, fat: 0, fiber: 1, sourcingLocation: 'Vegetable Stalls' }
        ],
        prepInstructions: [
          'Wash the sprouts in cold water and drain well.',
          'Slice the onion and chili thin.',
          'Toss everything with the palm oil and season.',
          'Serve over warm rice with coriander scattered on top.'
        ]
      }
    ],
    beef_lean: [
      {
        title: 'Spicy Goat Head Soup with Utazi and Pounded Yam',
        description:
          'Goat head simmered until tender in a thickened palm oil sauce with utazi and onion, served with raw onion.',
        visualType: 'stew_swallow',
        style: 'indigenous',
        proteinSourceType: 'beef_lean',
        calories: 680,
        protein: 47,
        carbs: 12,
        fat: 42,
        fiber: 3,
        cookTimeMinutes: 120,
        readyToEatQuery: 'Spicy Goat Head Soup with Utazi',
        ingredients: [
          { name: 'Goat Head Meat & Bone', gramWeight: 200, baseNGNCost: 2100, protein: 45, carbs: 0, fat: 11, fiber: 0, sourcingLocation: 'Butcher Shop' },
          { name: 'Red Palm Oil & Potash Paste', gramWeight: 25, baseNGNCost: 300, protein: 1, carbs: 1, fat: 20, fiber: 0, sourcingLocation: 'Traditional Condiments' },
          { name: 'Utazi & Grated Onion', gramWeight: 30, baseNGNCost: 200, protein: 2, carbs: 4, fat: 1, fiber: 2, sourcingLocation: 'Vegetable Stalls' },
          { name: 'Calabash Nutmeg (Ehuru)', gramWeight: 5, baseNGNCost: 90, protein: 0, carbs: 1, fat: 0, fiber: 1, sourcingLocation: 'Traditional Condiments' },
          { name: 'Pounded Yam', gramWeight: 200, baseNGNCost: 600, protein: 5, carbs: 46, fat: 0, fiber: 4, sourcingLocation: 'Grain Stall' }
        ],
        prepInstructions: [
          'Pressure-cook the goat head until the meat pulls from the bone.',
          'Blend the brain and return it to the pot.',
          'Thicken the palm oil with potash, then fold in the meat.',
          'Finish with utazi and ehuru, and serve with rings of raw onion.'
        ]
      },
      {
        title: 'Spicy Cow Foot with Ugba and Onion',
        description:
          'Cow foot simmered until it gives up its gelatin, folded through spiced palm oil with ugba, ugu and raw onion.',
        visualType: 'stew_swallow',
        style: 'indigenous',
        proteinSourceType: 'beef_lean',
        calories: 655,
        protein: 42,
        carbs: 10,
        fat: 40,
        fiber: 3,
        cookTimeMinutes: 150,
        readyToEatQuery: 'Spicy Cow Foot with Ugba and Onion',
        ingredients: [
          { name: 'Cow Foot (Cleaned & Cut)', gramWeight: 220, baseNGNCost: 900, protein: 38, carbs: 0, fat: 9, fiber: 0, sourcingLocation: 'Butcher Shop' },
          { name: 'Ugba (Oil Bean Seed)', gramWeight: 20, baseNGNCost: 200, protein: 6, carbs: 3, fat: 7, fiber: 2, sourcingLocation: 'Grain Stall' },
          { name: 'Red Palm Oil & Pepper Paste', gramWeight: 25, baseNGNCost: 290, protein: 1, carbs: 2, fat: 19, fiber: 1, sourcingLocation: 'Traditional Condiments' },
          { name: 'Ugu Leaves & Sliced Onion', gramWeight: 40, baseNGNCost: 190, protein: 2, carbs: 4, fat: 1, fiber: 2, sourcingLocation: 'Vegetable Stalls' }
        ],
        prepInstructions: [
          'Boil the cow foot slowly until tender and gelatinous.',
          'Slice the ugba into thin strips.',
          'Fold the palm oil, pepper and ugba through the hot meat.',
          'Add ugu at the very end so it stays bright, and serve with raw onion.'
        ]
      },
      {
        title: 'Mutton Pepper Soup with Rice',
        description:
          'Bone-in mutton simmered slowly with pepper and ginger until the meat falls apart, served over rice.',
        visualType: 'jollof_bowl',
        style: 'indigenous',
        proteinSourceType: 'beef_lean',
        calories: 690,
        protein: 49,
        carbs: 44,
        fat: 30,
        fiber: 4,
        cookTimeMinutes: 110,
        readyToEatQuery: 'Mutton Pepper Soup with Rice',
        ingredients: [
          { name: 'Bone-in Mutton Shoulder', gramWeight: 190, baseNGNCost: 2600, protein: 45, carbs: 0, fat: 14, fiber: 0, sourcingLocation: 'Butcher Shop' },
          { name: 'Pepper Soup Herbs (Ehuru, Uda, Utazi)', gramWeight: 30, baseNGNCost: 210, protein: 2, carbs: 4, fat: 1, fiber: 2, sourcingLocation: 'Traditional Condiments' },
          { name: 'Cooked Rice', gramWeight: 180, baseNGNCost: 450, protein: 5, carbs: 40, fat: 1, fiber: 1, sourcingLocation: 'Grain Stall' },
          { name: 'Tomato & Onion Base', gramWeight: 80, baseNGNCost: 200, protein: 3, carbs: 9, fat: 3, fiber: 2, sourcingLocation: 'Vegetable Stalls' }
        ],
        prepInstructions: [
          'Season the mutton and brown it lightly.',
          'Add the tomato and onion base, cover and simmer for around two hours.',
          'Add the pepper herbs in the last twenty minutes so they stay fragrant.',
          'Serve over rice.'
        ]
      }
    ]
  },
  evenings: {
    fish: [
      {
        title: 'Okra and Ogbono Soup with Fish and Eba',
        description:
          'Okra and ground ogbono seeds thicken a broth with dried fish and crayfish, giving the characteristic draw.',
        visualType: 'stew_swallow',
        style: 'indigenous',
        proteinSourceType: 'fish',
        calories: 605,
        protein: 44,
        carbs: 46,
        fat: 18,
        fiber: 8,
        cookTimeMinutes: 60,
        readyToEatQuery: 'Okra and Ogbono Soup with Fish and Eba',
        ingredients: [
          { name: 'Dried Bonga / Catfish Bits', gramWeight: 60, baseNGNCost: 500, protein: 24, carbs: 0, fat: 4, fiber: 0, sourcingLocation: 'Fish Counter' },
          { name: 'Ground Ogbono Seed', gramWeight: 30, baseNGNCost: 320, protein: 5, carbs: 5, fat: 4, fiber: 4, sourcingLocation: 'Grain Stall' },
          { name: 'Fresh Okra', gramWeight: 120, baseNGNCost: 250, protein: 4, carbs: 12, fat: 1, fiber: 5, sourcingLocation: 'Vegetable Stalls' },
          { name: 'Pepper, Crayfish & Palm Oil', gramWeight: 30, baseNGNCost: 280, protein: 4, carbs: 3, fat: 12, fiber: 1, sourcingLocation: 'Traditional Condiments' },
          { name: 'Eba (Cassava Swallow)', gramWeight: 110, baseNGNCost: 300, protein: 1, carbs: 28, fat: 0, fiber: 1, sourcingLocation: 'Grain Stall' },
          { name: 'Eba (Cassava and Yam Swallow)', gramWeight: 170, baseNGNCost: 400, protein: 3, carbs: 41, fat: 0, fiber: 2, sourcingLocation: 'Grain Stall' }
        ],
        prepInstructions: [
          'Blend the ground ogbono with a little water.',
          'Cook the okra separately until it slips and thickens its own juices.',
          'Combine with the broth, dried fish and crayfish, and simmer.',
          'Serve in a bowl with eba to scoop it up.'
        ]
      },
      {
        title: 'Palm Fruit Soup with Fish and Garri',
        description:
          'A rich red soup made from palm fruit pulp with fish, periwinkle and scent leaf, deeply savoury.',
        visualType: 'stew_swallow',
        style: 'indigenous',
        proteinSourceType: 'fish',
        calories: 620,
        protein: 42,
        carbs: 40,
        fat: 24,
        fiber: 7,
        cookTimeMinutes: 90,
        readyToEatQuery: 'Palm Fruit Soup with Fish and Garri',
        ingredients: [
          { name: 'Fresh Fish Steak (Tilapia)', gramWeight: 170, baseNGNCost: 1300, protein: 34, carbs: 0, fat: 6, fiber: 0, sourcingLocation: 'Fish Counter' },
          { name: 'Palm Fruit Pulp', gramWeight: 120, baseNGNCost: 400, protein: 2, carbs: 6, fat: 12, fiber: 3, sourcingLocation: 'Traditional Condiments' },
          { name: 'Periwinkle & Crayfish', gramWeight: 60, baseNGNCost: 480, protein: 16, carbs: 1, fat: 2, fiber: 0, sourcingLocation: 'Fish Counter' },
          { name: 'Scent Leaf & Pepper', gramWeight: 20, baseNGNCost: 170, protein: 1, carbs: 3, fat: 1, fiber: 1, sourcingLocation: 'Vegetable Stalls' },
          { name: 'Eba (Cassava Swallow)', gramWeight: 110, baseNGNCost: 300, protein: 1, carbs: 28, fat: 0, fiber: 1, sourcingLocation: 'Grain Stall' },
          { name: 'Garri (Cassava Granules)', gramWeight: 130, baseNGNCost: 220, protein: 2, carbs: 31, fat: 0, fiber: 2, sourcingLocation: 'Grain Stall' }
        ],
        prepInstructions: [
          'Boil the palm fruit pulp to extract the juice, then strain and skim.',
          'Add fish, periwinkle and crayfish and simmer until the flavours marry.',
          'Season with scent leaf and pepper.',
          'Serve with eba.'
        ]
      },
      {
        title: 'Baked Fish with Okra Stew and Swallow',
        description:
          'Fish baked with pepper and ginger over a rich okra stew, served with a soft wheat or yam swallow.',
        visualType: 'stew_swallow',
        style: 'indigenous',
        proteinSourceType: 'fish',
        calories: 630,
        protein: 43,
        carbs: 48,
        fat: 21,
        fiber: 8,
        cookTimeMinutes: 55,
        readyToEatQuery: 'Baked Fish with Okra Stew',
        ingredients: [
          { name: 'Baked Fish Steak (Croaker)', gramWeight: 180, baseNGNCost: 1500, protein: 36, carbs: 0, fat: 7, fiber: 0, sourcingLocation: 'Fish Counter' },
          { name: 'Okra Stew with Tomato & Pepper', gramWeight: 140, baseNGNCost: 380, protein: 5, carbs: 16, fat: 8, fiber: 6, sourcingLocation: 'Vegetable Stalls' },
          { name: 'Yam Flour / Pounded Yam', gramWeight: 140, baseNGNCost: 700, protein: 4, carbs: 38, fat: 1, fiber: 3, sourcingLocation: 'Grain Stall' },
          { name: 'Ginger, Pepper & Lemon', gramWeight: 20, baseNGNCost: 150, protein: 1, carbs: 2, fat: 1, fiber: 1, sourcingLocation: 'Traditional Condiments' }
        ],
        prepInstructions: [
          'Rub the fish with ginger, pepper and lemon and bake until the flesh lifts.',
          'Cook the okra in tomato and palm oil until thick and glossy.',
          'Knead the yam flour to a smooth swallow.',
          'Serve the fish with the okra stew and swallow.'
        ]
      }
    ],
    poultry: [
      {
        title: 'Peppered Chicken Gizzard with Fried Plantain',
        description:
          'Bite-sized gizzard cooked until tender in a spicy tomato pepper sauce, served with fried plantain.',
        visualType: 'beans_plantain',
        style: 'indigenous',
        proteinSourceType: 'poultry',
        calories: 595,
        protein: 44,
        carbs: 46,
        fat: 18,
        fiber: 6,
        cookTimeMinutes: 70,
        readyToEatQuery: 'Peppered Chicken Gizzard with Fried Plantain',
        ingredients: [
          { name: 'Chicken Gizzard (Cleaned)', gramWeight: 170, baseNGNCost: 950, protein: 40, carbs: 0, fat: 3, fiber: 0, sourcingLocation: 'Butcher Shop' },
          { name: 'Tomato & Pepper Sauce', gramWeight: 120, baseNGNCost: 320, protein: 4, carbs: 14, fat: 6, fiber: 3, sourcingLocation: 'Vegetable Stalls' },
          { name: 'Ripe Plantain (Dodo)', gramWeight: 130, baseNGNCost: 330, protein: 2, carbs: 30, fat: 6, fiber: 2, sourcingLocation: 'Fruit Stall' },
          { name: 'Palm Oil & Onion', gramWeight: 20, baseNGNCost: 220, protein: 1, carbs: 3, fat: 12, fiber: 1, sourcingLocation: 'Traditional Condiments' }
        ],
        prepInstructions: [
          'Boil the gizzard until tender, then cut into bite-sized pieces.',
          'Fry sliced onion and pepper in palm oil, add tomato and simmer.',
          'Return the gizzard and cook until the sauce clings.',
          'Serve with fried plantain.'
        ]
      },
      {
        title: 'Suya Turkey Wing with Pepper Sauce',
        description:
          'Turkey wing grilled with suya spice and served with a cool pepper sauce and raw onion.',
        visualType: 'chicken_salad',
        style: 'indigenous',
        proteinSourceType: 'poultry',
        calories: 615,
        protein: 48,
        carbs: 12,
        fat: 33,
        fiber: 3,
        cookTimeMinutes: 50,
        readyToEatQuery: 'Suya Turkey Wing with Pepper Sauce',
        ingredients: [
          { name: 'Turkey Wing Joint', gramWeight: 190, baseNGNCost: 2200, protein: 47, carbs: 0, fat: 10, fiber: 0, sourcingLocation: 'Butcher Shop' },
          { name: 'Yaji Suya Spice', gramWeight: 20, baseNGNCost: 140, protein: 2, carbs: 3, fat: 1, fiber: 1, sourcingLocation: 'Traditional Condiments' },
          { name: 'Cool Pepper Sauce', gramWeight: 40, baseNGNCost: 200, protein: 1, carbs: 5, fat: 2, fiber: 1, sourcingLocation: 'Traditional Condiments' },
          { name: 'Sliced Onion & Tomato', gramWeight: 80, baseNGNCost: 190, protein: 2, carbs: 7, fat: 1, fiber: 2, sourcingLocation: 'Vegetable Stalls' }
        ],
        prepInstructions: [
          'Score the turkey wing and rub it with suya spice overnight.',
          'Grill over charcoal until crisp and cooked through.',
          'Blend the pepper sauce with tomato and a little oil.',
          'Rest the wing, then serve with the sauce and raw onion.'
        ]
      },
      {
        title: 'Grilled Chicken with Okazi Soup and Yam',
        description:
          'Charcoal-grilled chicken served with a deeply savoury okazi leaf soup and a slice of boiled yam.',
        visualType: 'stew_swallow',
        style: 'indigenous',
        proteinSourceType: 'poultry',
        calories: 590,
        protein: 45,
        carbs: 40,
        fat: 19,
        fiber: 7,
        cookTimeMinutes: 45,
        readyToEatQuery: 'Grilled Chicken with Okazi Soup and Yam',
        ingredients: [
          { name: 'Grilled Chicken Breast', gramWeight: 175, baseNGNCost: 1300, protein: 42, carbs: 0, fat: 6, fiber: 0, sourcingLocation: 'Butcher Shop' },
          { name: 'Okazi Leaf Soup', gramWeight: 160, baseNGNCost: 450, protein: 6, carbs: 8, fat: 9, fiber: 4, sourcingLocation: 'Vegetable Stalls' },
          { name: 'Boiled White Yam', gramWeight: 180, baseNGNCost: 540, protein: 4, carbs: 38, fat: 0, fiber: 3, sourcingLocation: 'Produce Aisle' },
          { name: 'Palm Oil & Crayfish', gramWeight: 18, baseNGNCost: 220, protein: 3, carbs: 2, fat: 11, fiber: 1, sourcingLocation: 'Traditional Condiments' }
        ],
        prepInstructions: [
          'Grill the chicken and rest it while you finish the soup.',
          'Cook the okazi leaves with palm oil, crayfish, fish and meat until tender.',
          'Blend some of the leaves for a smooth, thick soup.',
          'Serve the soup with the grilled chicken and yam.'
        ]
      }
    ],
    eggs_dairy: [
      {
        title: 'Egg Sauce with Rice and Boiled Egg',
        description:
          'A tomato and pepper egg sauce cooked soft, spooned over rice with a boiled egg cut in half.',
        visualType: 'jollof_bowl',
        style: 'indigenous',
        proteinSourceType: 'eggs_dairy',
        calories: 620,
        protein: 28,
        carbs: 70,
        fat: 21,
        fiber: 7,
        cookTimeMinutes: 30,
        readyToEatQuery: 'Egg Sauce with Rice and Boiled Egg',
        ingredients: [
          { name: 'Farm Fresh Eggs (3 Large)', gramWeight: 150, baseNGNCost: 650, protein: 19, carbs: 1, fat: 13, fiber: 0, sourcingLocation: 'Egg Depot' },
          { name: 'Cooked Rice', gramWeight: 200, baseNGNCost: 500, protein: 5, carbs: 44, fat: 1, fiber: 1, sourcingLocation: 'Grain Stall' },
          { name: 'Tomato, Pepper & Onion', gramWeight: 130, baseNGNCost: 340, protein: 4, carbs: 15, fat: 6, fiber: 3, sourcingLocation: 'Vegetable Stalls' },
          { name: 'Boiled Farm Egg (1 Large)', gramWeight: 50, baseNGNCost: 220, protein: 6, carbs: 1, fat: 5, fiber: 0, sourcingLocation: 'Egg Depot' }
        ],
        prepInstructions: [
          'Beat the eggs and pour them into hot seasoned tomato and onion.',
          'Stir gently over low heat until just set.',
          'Serve over rice with the boiled egg halved on top.'
        ]
      },
      {
        title: 'Steamed Egg Custard with Pepper Sauce and Yam',
        description:
          'A light steamed egg custard set with milk and pepper, served with a hot sauce and boiled yam.',
        visualType: 'yam_egg_skillet',
        style: 'indigenous',
        proteinSourceType: 'eggs_dairy',
        calories: 560,
        protein: 29,
        carbs: 56,
        fat: 19,
        fiber: 6,
        cookTimeMinutes: 40,
        readyToEatQuery: 'Steamed Egg Custard with Pepper Sauce and Yam',
        ingredients: [
          { name: 'Steamed Egg Custard', gramWeight: 180, baseNGNCost: 500, protein: 17, carbs: 14, fat: 9, fiber: 0, sourcingLocation: 'Dairy Counter' },
          { name: 'Boiled White Yam', gramWeight: 180, baseNGNCost: 540, protein: 4, carbs: 38, fat: 0, fiber: 3, sourcingLocation: 'Produce Aisle' },
          { name: 'Hot Pepper Sauce', gramWeight: 30, baseNGNCost: 170, protein: 1, carbs: 4, fat: 2, fiber: 1, sourcingLocation: 'Traditional Condiments' },
          { name: 'Vegetable Oil', gramWeight: 12, baseNGNCost: 130, protein: 0, carbs: 0, fat: 12, fiber: 0, sourcingLocation: 'Traditional Condiments' }
        ],
        prepInstructions: [
          'Whisk eggs, milk and sliced pepper, then steam gently until set.',
          'Boil the yam until tender.',
          'Blend the pepper sauce smooth.',
          'Serve the custard with the yam and pepper sauce.'
        ]
      },
      {
        title: 'Omelette with Tomato, Onion and Pepper Sauce',
        description:
          'A folded omelette with tomato, onion and green pepper, served with hot pepper sauce and bread.',
        visualType: 'yam_egg_skillet',
        style: 'indigenous',
        proteinSourceType: 'eggs_dairy',
        calories: 575,
        protein: 28,
        carbs: 46,
        fat: 25,
        fiber: 6,
        cookTimeMinutes: 20,
        readyToEatQuery: 'Omelette with Tomato and Pepper Sauce',
        ingredients: [
          { name: 'Farm Fresh Eggs (3 Large)', gramWeight: 150, baseNGNCost: 650, protein: 19, carbs: 1, fat: 13, fiber: 0, sourcingLocation: 'Egg Depot' },
          { name: 'Tomato, Onion & Green Pepper', gramWeight: 120, baseNGNCost: 300, protein: 3, carbs: 14, fat: 4, fiber: 3, sourcingLocation: 'Vegetable Stalls' },
          { name: 'Bread Slices', gramWeight: 80, baseNGNCost: 290, protein: 6, carbs: 14, fat: 2, fiber: 1, sourcingLocation: 'Bakery' },
          { name: 'Hot Pepper Sauce', gramWeight: 25, baseNGNCost: 150, protein: 1, carbs: 3, fat: 2, fiber: 1, sourcingLocation: 'Traditional Condiments' }
        ],
        prepInstructions: [
          'Beat the eggs with a little salt.',
          'Soften the tomato, onion and pepper in the pan first.',
          'Pour in the eggs and fold once they are just set.',
          'Serve with bread and pepper sauce.'
        ]
      }
    ],
    legumes_plant: [
      {
        title: 'Cassava Salad with Ugba and Cow Skin',
        description:
          'Shredded cassava tossed in palm oil with ugba and cow skin, peppery and intense. A staple at celebrations.',
        visualType: 'beans_plantain',
        style: 'indigenous',
        proteinSourceType: 'legumes_plant',
        calories: 600,
        protein: 22,
        carbs: 56,
        fat: 26,
        fiber: 10,
        cookTimeMinutes: 35,
        readyToEatQuery: 'Cassava Salad with Ugba and Cow Skin',
        ingredients: [
          { name: 'Shredded Cassava (Abacha)', gramWeight: 200, baseNGNCost: 550, protein: 4, carbs: 44, fat: 1, fiber: 6, sourcingLocation: 'Grain Stall' },
          { name: 'Ugba (Oil Bean Seed)', gramWeight: 30, baseNGNCost: 280, protein: 9, carbs: 4, fat: 10, fiber: 3, sourcingLocation: 'Grain Stall' },
          { name: 'Cow Skin (Kpomo)', gramWeight: 70, baseNGNCost: 350, protein: 12, carbs: 0, fat: 5, fiber: 0, sourcingLocation: 'Butcher Shop' },
          { name: 'Red Palm Oil, Pepper & Onion', gramWeight: 30, baseNGNCost: 300, protein: 1, carbs: 4, fat: 15, fiber: 1, sourcingLocation: 'Traditional Condiments' }
        ],
        prepInstructions: [
          'Soak the shredded cassava in water, then drain it dry.',
          'Blend the ugba into a paste and mix with sliced onion.',
          'Add the palm oil, pepper and cow skin, and toss thoroughly.',
          'Serve cold or at room temperature.'
        ]
      },
      {
        title: 'Black-eyed Pea Stew with Crayfish',
        description:
          'Cowpeas simmered until soft with crayfish and palm oil, thickened into a savoury stew. Eaten with bread or eba.',
        visualType: 'beans_plantain',
        style: 'indigenous',
        proteinSourceType: 'legumes_plant',
        calories: 620,
        protein: 26,
        carbs: 68,
        fat: 20,
        fiber: 16,
        cookTimeMinutes: 70,
        readyToEatQuery: 'Black-eyed Pea Stew with Crayfish',
        ingredients: [
          { name: 'Black-eyed Cowpeas', gramWeight: 200, baseNGNCost: 700, protein: 20, carbs: 36, fat: 2, fiber: 13, sourcingLocation: 'Grain Stall' },
          { name: 'Ground Crayfish & Iru', gramWeight: 25, baseNGNCost: 230, protein: 5, carbs: 3, fat: 1, fiber: 1, sourcingLocation: 'Traditional Condiments' },
          { name: 'Red Palm Oil & Pepper', gramWeight: 20, baseNGNCost: 240, protein: 1, carbs: 2, fat: 14, fiber: 1, sourcingLocation: 'Traditional Condiments' },
          { name: 'Bread Roll', gramWeight: 80, baseNGNCost: 290, protein: 6, carbs: 14, fat: 2, fiber: 1, sourcingLocation: 'Bakery' }
        ],
        prepInstructions: [
          'Soak and boil the cowpeas until completely soft.',
          'Fry the crayfish and iru blend in palm oil with pepper.',
          'Fold the fried mixture through the beans and simmer to thicken.',
          'Serve with bread or eba.'
        ]
      },
      {
        title: 'Peanut Soup with Chicken and Rice',
        description:
          'A thick groundnut soup simmered with chicken and pepper, sweetened slightly the way it is cooked for feasts.',
        visualType: 'jollof_bowl',
        style: 'indigenous',
        proteinSourceType: 'legumes_plant',
        calories: 650,
        protein: 40,
        carbs: 50,
        fat: 26,
        fiber: 9,
        cookTimeMinutes: 65,
        readyToEatQuery: 'Peanut Soup with Chicken and Rice',
        ingredients: [
          { name: 'Ground Peanut Paste', gramWeight: 80, baseNGNCost: 400, protein: 13, carbs: 7, fat: 12, fiber: 3, sourcingLocation: 'Grain Stall' },
          { name: 'Chicken Breast Slices', gramWeight: 170, baseNGNCost: 1250, protein: 40, carbs: 0, fat: 6, fiber: 0, sourcingLocation: 'Butcher Shop' },
          { name: 'Cooked Rice', gramWeight: 170, baseNGNCost: 430, protein: 4, carbs: 38, fat: 1, fiber: 1, sourcingLocation: 'Grain Stall' },
          { name: 'Pepper, Ginger & Palm Oil', gramWeight: 25, baseNGNCost: 260, protein: 2, carbs: 3, fat: 13, fiber: 1, sourcingLocation: 'Traditional Condiments' }
        ],
        prepInstructions: [
          'Blend the peanut paste smooth with warm water.',
          'Fry the chicken lightly with pepper and ginger in palm oil.',
          'Pour in the peanut mixture and simmer, stirring often, until thick.',
          'Serve over rice.'
        ]
      },
      {
        title: 'Bean Dumplings in Pepper Sauce',
        description:
          'Soft bean dumplings braised in a rich pepper and tomato sauce until they drink it up.',
        visualType: 'stew_swallow',
        style: 'indigenous',
        proteinSourceType: 'legumes_plant',
        calories: 585,
        protein: 23,
        carbs: 68,
        fat: 19,
        fiber: 9,
        cookTimeMinutes: 55,
        readyToEatQuery: 'Bean Dumplings in Pepper Sauce',
        ingredients: [
          { name: 'Flour Bean Dumplings', gramWeight: 200, baseNGNCost: 550, protein: 14, carbs: 40, fat: 4, fiber: 4, sourcingLocation: 'Grain Stall' },
          { name: 'Tomato & Pepper Sauce', gramWeight: 130, baseNGNCost: 330, protein: 4, carbs: 15, fat: 6, fiber: 3, sourcingLocation: 'Vegetable Stalls' },
          { name: 'Red Palm Oil', gramWeight: 14, baseNGNCost: 170, protein: 0, carbs: 0, fat: 14, fiber: 0, sourcingLocation: 'Traditional Condiments' },
          { name: 'Washed Waterleaf', gramWeight: 70, baseNGNCost: 160, protein: 4, carbs: 4, fat: 1, fiber: 3, sourcingLocation: 'Vegetable Stalls' }
        ],
        prepInstructions: [
          'Fry sliced onion, ginger and pepper in palm oil.',
          'Add tomato and waterleaf, season, then lower in the dumplings.',
          'Cover and simmer gently until the dumplings are soft.',
          'Serve the dumplings in the sauce.'
        ]
      }
    ],
    beef_lean: [
      {
        title: 'Spicy Grilled Goat (Asun) with Fried Plantain',
        description:
          'Chunks of goat meat marinated in pepper and spices, grilled over fire until charred, served with fried plantain. Asun is goat, not beef.',
        visualType: 'beans_plantain',
        style: 'indigenous',
        proteinSourceType: 'beef_lean',
        calories: 680,
        protein: 49,
        carbs: 44,
        fat: 28,
        fiber: 6,
        cookTimeMinutes: 60,
        readyToEatQuery: 'Asun Spicy Grilled Goat with Fried Plantain',
        ingredients: [
          { name: 'Goat Meat Chunks', gramWeight: 185, baseNGNCost: 2100, protein: 46, carbs: 0, fat: 11, fiber: 0, sourcingLocation: 'Butcher Shop' },
          { name: 'Asun Pepper & Spice Marinade', gramWeight: 25, baseNGNCost: 200, protein: 2, carbs: 5, fat: 3, fiber: 1, sourcingLocation: 'Traditional Condiments' },
          { name: 'Ripe Plantain (Dodo)', gramWeight: 130, baseNGNCost: 330, protein: 2, carbs: 30, fat: 6, fiber: 2, sourcingLocation: 'Fruit Stall' },
          { name: 'Sliced Onion & Tomato', gramWeight: 90, baseNGNCost: 210, protein: 2, carbs: 8, fat: 1, fiber: 2, sourcingLocation: 'Vegetable Stalls' }
        ],
        prepInstructions: [
          'Marinate the goat chunks in pepper, ginger, garlic and palm oil for several hours.',
          'Grill over open fire, shaking the skewers, until the outside is dark and charred.',
          'Rest the meat off the heat so the juices settle.',
          'Serve with fried plantain, onion and tomato.'
        ]
      },
      {
        title: 'Grasscutter Pepper Soup with Rice',
        description:
          'Grasscutter simmered with pepper and tomato until tender. Farmed, not hunted, and considered a great delicacy.',
        visualType: 'jollof_bowl',
        style: 'indigenous',
        proteinSourceType: 'beef_lean',
        calories: 640,
        protein: 47,
        carbs: 44,
        fat: 26,
        fiber: 5,
        cookTimeMinutes: 90,
        readyToEatQuery: 'Grasscutter Pepper Soup with Rice',
        ingredients: [
          { name: 'Grasscutter Meat', gramWeight: 180, baseNGNCost: 2800, protein: 46, carbs: 0, fat: 8, fiber: 0, sourcingLocation: 'Butcher Shop' },
          { name: 'Pepper, Tomato & Ginger Broth', gramWeight: 180, baseNGNCost: 400, protein: 6, carbs: 12, fat: 6, fiber: 3, sourcingLocation: 'Vegetable Stalls' },
          { name: 'Cooked Rice', gramWeight: 180, baseNGNCost: 450, protein: 5, carbs: 40, fat: 1, fiber: 1, sourcingLocation: 'Grain Stall' },
          { name: 'Utazi & Scallion', gramWeight: 20, baseNGNCost: 140, protein: 1, carbs: 3, fat: 0, fiber: 1, sourcingLocation: 'Vegetable Stalls' }
        ],
        prepInstructions: [
          'Clean the grasscutter thoroughly and cut into serving pieces.',
          'Simmer with tomato, ginger and pepper until it is soft and falls apart.',
          'Add utazi in the final minutes for fragrance.',
          'Serve over rice.'
        ]
      },
      {
        title: 'Cow Skin Soup with Pepper and Semo',
        description:
          'Ponmo and cow skin simmered until gelatinous, in a spiced broth with utazi and onion.',
        visualType: 'stew_swallow',
        style: 'indigenous',
        proteinSourceType: 'beef_lean',
        calories: 590,
        protein: 42,
        carbs: 18,
        fat: 26,
        fiber: 4,
        cookTimeMinutes: 120,
        readyToEatQuery: 'Cow Skin Soup with Pepper and Semo',
        ingredients: [
          { name: 'Cow Skin (Ponmo) & Beef', gramWeight: 200, baseNGNCost: 1100, protein: 40, carbs: 0, fat: 10, fiber: 0, sourcingLocation: 'Butcher Shop' },
          { name: 'Pepper, Utazi & Ginger Broth', gramWeight: 200, baseNGNCost: 350, protein: 5, carbs: 10, fat: 4, fiber: 2, sourcingLocation: 'Traditional Condiments' },
          { name: 'Eba (Cassava Swallow)', gramWeight: 110, baseNGNCost: 300, protein: 1, carbs: 28, fat: 0, fiber: 1, sourcingLocation: 'Grain Stall' },
          { name: 'Sliced Onion & Palm Oil', gramWeight: 25, baseNGNCost: 240, protein: 1, carbs: 3, fat: 13, fiber: 1, sourcingLocation: 'Traditional Condiments' },
          { name: 'Semo (Yam Flour Swallow)', gramWeight: 160, baseNGNCost: 380, protein: 4, carbs: 38, fat: 0, fiber: 1, sourcingLocation: 'Grain Stall' }
        ],
        prepInstructions: [
          'Scrub and boil the cow skin until it is soft and gives up its gelatin.',
          'Add the beef and simmer slowly until completely tender.',
          'Season with pepper, utazi and ginger.',
          'Serve with eba.'
        ]
      },
      {
        title: 'Giant Land Snail Pepper Soup with Yam',
        description:
          'Large land snails cooked down in a rich pepper and palm oil stew until tender, served with boiled yam.',
        visualType: 'stew_swallow',
        style: 'indigenous',
        proteinSourceType: 'beef_lean',
        calories: 625,
        protein: 46,
        carbs: 42,
        fat: 24,
        fiber: 7,
        cookTimeMinutes: 100,
        readyToEatQuery: 'Giant Land Snail Pepper Soup with Yam',
        ingredients: [
          { name: 'Giant Land Snails (Cleaned)', gramWeight: 180, baseNGNCost: 1600, protein: 42, carbs: 0, fat: 5, fiber: 0, sourcingLocation: 'Butcher Shop' },
          { name: 'Tomato, Pepper & Palm Oil Stew', gramWeight: 150, baseNGNCost: 400, protein: 5, carbs: 16, fat: 10, fiber: 4, sourcingLocation: 'Vegetable Stalls' },
          { name: 'Boiled White Yam', gramWeight: 180, baseNGNCost: 540, protein: 4, carbs: 38, fat: 0, fiber: 3, sourcingLocation: 'Produce Aisle' },
          { name: 'Utazi & Ginger', gramWeight: 15, baseNGNCost: 130, protein: 1, carbs: 2, fat: 0, fiber: 1, sourcingLocation: 'Vegetable Stalls' }
        ],
        prepInstructions: [
          'Clean and wash the snails thoroughly, then simmer them in water until tender.',
          'Fry pepper, ginger and tomato in palm oil until the oil splits.',
          'Add the snails and simmer until the sauce is thick and glossy.',
          'Serve with boiled yam.'
        ]
      },
      {
        title: 'White Yam Soup with Goat Meat',
        description:
          'A smooth white soup of yam and utazi with goat meat, cooked without palm oil so it stays pale and mild.',
        visualType: 'stew_swallow',
        style: 'indigenous',
        proteinSourceType: 'beef_lean',
        calories: 660,
        protein: 44,
        carbs: 52,
        fat: 24,
        fiber: 7,
        cookTimeMinutes: 80,
        readyToEatQuery: 'White Yam Soup with Goat Meat',
        ingredients: [
          { name: 'Goat Meat Pieces', gramWeight: 180, baseNGNCost: 2000, protein: 44, carbs: 0, fat: 10, fiber: 0, sourcingLocation: 'Butcher Shop' },
          { name: 'Yam Porridge Base', gramWeight: 200, baseNGNCost: 620, protein: 4, carbs: 46, fat: 1, fiber: 4, sourcingLocation: 'Produce Aisle' },
          { name: 'Ugu & Utazi Leaves', gramWeight: 50, baseNGNCost: 200, protein: 3, carbs: 5, fat: 1, fiber: 2, sourcingLocation: 'Vegetable Stalls' },
          { name: 'Seasoning (No Palm Oil)', gramWeight: 20, baseNGNCost: 180, protein: 2, carbs: 3, fat: 1, fiber: 1, sourcingLocation: 'Traditional Condiments' }
        ],
        prepInstructions: [
          'Boil the goat meat until tender and season it.',
          'Cook the yam in water, then mash some of it to thicken the broth.',
          'Add ugu and utazi, keeping the soup pale.',
          'Serve in a bowl with any swallow.'
        ]
      },
      {
        title: 'Jute Mallow Soup with Goat and Crayfish and Amala',
        description:
          'A slimy green soup of jute mallow leaves with goat meat and crayfish, thickened with potash.',
        visualType: 'stew_swallow',
        style: 'indigenous',
        proteinSourceType: 'beef_lean',
        calories: 610,
        protein: 45,
        carbs: 30,
        fat: 24,
        fiber: 8,
        cookTimeMinutes: 75,
        readyToEatQuery: 'Jute Mallow Soup with Goat and Crayfish with Amala',
        ingredients: [
          { name: 'Jute Mallow Leaves (Ewedu)', gramWeight: 180, baseNGNCost: 380, protein: 8, carbs: 12, fat: 2, fiber: 6, sourcingLocation: 'Vegetable Stalls' },
          { name: 'Goat Meat Pieces', gramWeight: 175, baseNGNCost: 1950, protein: 42, carbs: 0, fat: 10, fiber: 0, sourcingLocation: 'Butcher Shop' },
          { name: 'Ground Crayfish & Potash', gramWeight: 25, baseNGNCost: 260, protein: 6, carbs: 3, fat: 1, fiber: 1, sourcingLocation: 'Traditional Condiments' },
          { name: 'Amala (Yam Flour Swallow)', gramWeight: 130, baseNGNCost: 680, protein: 4, carbs: 36, fat: 1, fiber: 3, sourcingLocation: 'Grain Stall' }
        ],
        prepInstructions: [
          'Blitz some of the jute mallow leaves to a smooth paste.',
          'Simmer the goat meat until tender.',
          'Add the leaves, crayfish and potash and let it thicken.',
          'Serve with amala.'
        ]
      },
      {
        title: 'Palm Fruit Soup with Beef and Periwinkle',
        description:
          'Deep red palm fruit soup with beef and periwinkle, the classic celebratory bowl served with eba.',
        visualType: 'stew_swallow',
        style: 'indigenous',
        proteinSourceType: 'beef_lean',
        calories: 670,
        protein: 44,
        carbs: 38,
        fat: 30,
        fiber: 7,
        cookTimeMinutes: 100,
        readyToEatQuery: 'Palm Fruit Soup with Beef and Periwinkle',
        ingredients: [
          { name: 'Beef Chunks', gramWeight: 175, baseNGNCost: 1750, protein: 42, carbs: 0, fat: 9, fiber: 0, sourcingLocation: 'Butcher Shop' },
          { name: 'Palm Fruit Pulp', gramWeight: 120, baseNGNCost: 400, protein: 2, carbs: 6, fat: 12, fiber: 3, sourcingLocation: 'Traditional Condiments' },
          { name: 'Periwinkle & Crayfish', gramWeight: 60, baseNGNCost: 480, protein: 16, carbs: 1, fat: 2, fiber: 0, sourcingLocation: 'Fish Counter' },
          { name: 'Scent Leaf & Pepper', gramWeight: 20, baseNGNCost: 170, protein: 1, carbs: 3, fat: 1, fiber: 1, sourcingLocation: 'Vegetable Stalls' },
          { name: 'Eba (Cassava Swallow)', gramWeight: 110, baseNGNCost: 300, protein: 1, carbs: 28, fat: 0, fiber: 1, sourcingLocation: 'Grain Stall' }
        ],
        prepInstructions: [
          'Boil the palm fruit pulp for its juice, then strain and skim the oil.',
          'Add the beef and simmer until tender.',
          'Stir in the periwinkle, crayfish, scent leaf and pepper.',
          'Serve with eba.'
        ]
      },
      {
        title: 'Collard Green Stew with Crayfish and Meat and Eba',
        description:
          'Efo shoko greens cooked down with crayfish, assorted meat and pepper into a thick, peppery green stew.',
        visualType: 'stew_swallow',
        style: 'indigenous',
        proteinSourceType: 'beef_lean',
        calories: 645,
        protein: 43,
        carbs: 32,
        fat: 28,
        fiber: 10,
        cookTimeMinutes: 70,
        readyToEatQuery: 'Collard Green Stew with Crayfish and Meat with Eba',
        ingredients: [
          { name: 'Efo Shoko / Lagos Spinach', gramWeight: 200, baseNGNCost: 400, protein: 10, carbs: 14, fat: 2, fiber: 8, sourcingLocation: 'Vegetable Stalls' },
          { name: 'Assorted Meat (Beef & Chicken)', gramWeight: 170, baseNGNCost: 1900, protein: 42, carbs: 0, fat: 10, fiber: 0, sourcingLocation: 'Butcher Shop' },
          { name: 'Ground Crayfish & Iru', gramWeight: 25, baseNGNCost: 240, protein: 5, carbs: 3, fat: 1, fiber: 1, sourcingLocation: 'Traditional Condiments' },
          { name: 'Red Palm Oil & Pepper', gramWeight: 18, baseNGNCost: 230, protein: 1, carbs: 2, fat: 13, fiber: 1, sourcingLocation: 'Traditional Condiments' },
          { name: 'Amala (Yam Flour Swallow)', gramWeight: 120, baseNGNCost: 620, protein: 4, carbs: 33, fat: 1, fiber: 3, sourcingLocation: 'Grain Stall' },
        
        { name: 'Eba', gramWeight: 180, baseNGNCost: 400, protein: 3, carbs: 44, fat: 0, fiber: 2, sourcingLocation: 'Grain Stall' },],
        prepInstructions: [
          'Blend some of the greens to a smooth paste.',
          'Fry the crayfish, iru and pepper in palm oil until fragrant.',
          'Add the meat and simmer, then the greens, cooking until thick and dark.',
          'Serve with amala.'
        ]
      },
      {
        title: 'Bitter Leaf Soup with Beef and Stockfish and Fufu',
        description:
          'Bitter leaves cooked with beef, stockfish and palm oil until soft, one of the most requested soups in the country.',
        visualType: 'stew_swallow',
        style: 'indigenous',
        proteinSourceType: 'beef_lean',
        calories: 635,
        protein: 46,
        carbs: 26,
        fat: 26,
        fiber: 8,
        cookTimeMinutes: 85,
        readyToEatQuery: 'Bitter Leaf Soup with Beef and Stockfish with Fufu',
        ingredients: [
          { name: 'Bitter Leaves (Ofe Onugbu)', gramWeight: 190, baseNGNCost: 400, protein: 11, carbs: 12, fat: 2, fiber: 7, sourcingLocation: 'Vegetable Stalls' },
          { name: 'Beef Chunks', gramWeight: 170, baseNGNCost: 1700, protein: 41, carbs: 0, fat: 9, fiber: 0, sourcingLocation: 'Butcher Shop' },
          { name: 'Stockfish & Crayfish', gramWeight: 40, baseNGNCost: 480, protein: 20, carbs: 0, fat: 3, fiber: 0, sourcingLocation: 'Fish Counter' },
          { name: 'Red Palm Oil & Pepper', gramWeight: 18, baseNGNCost: 230, protein: 1, carbs: 2, fat: 13, fiber: 1, sourcingLocation: 'Traditional Condiments' },
          { name: 'Pounded Yam', gramWeight: 130, baseNGNCost: 680, protein: 4, carbs: 35, fat: 1, fiber: 3, sourcingLocation: 'Produce Aisle' },
        
        { name: 'Fufu', gramWeight: 190, baseNGNCost: 520, protein: 5, carbs: 46, fat: 0, fiber: 2, sourcingLocation: 'Grain Stall' },],
        prepInstructions: [
          'Wash the bitter leaves repeatedly in salt water until the bitterness is gone.',
          'Simmer the beef with stockfish until tender.',
          'Add the leaves and palm oil and cook until they soften and darken.',
          'Serve with pounded yam.'
        ]
      },
      {
        title: 'Food Gum Soup with Goat Meat',
        description:
          'A rare, clear soup made from the edible gum of the Cissus vine, thickened with meat and eaten with swallow.',
        visualType: 'stew_swallow',
        style: 'indigenous',
        proteinSourceType: 'beef_lean',
        calories: 620,
        protein: 45,
        carbs: 30,
        fat: 24,
        fiber: 7,
        cookTimeMinutes: 80,
        readyToEatQuery: 'Food Gum Soup with Goat Meat',
        ingredients: [
          { name: 'Food Gum (Cissus Vine Sap)', gramWeight: 60, baseNGNCost: 350, protein: 2, carbs: 14, fat: 0, fiber: 1, sourcingLocation: 'Grain Stall' },
          { name: 'Goat Meat Pieces', gramWeight: 175, baseNGNCost: 1950, protein: 42, carbs: 0, fat: 10, fiber: 0, sourcingLocation: 'Butcher Shop' },
          { name: 'Pepper, Tomato & Ginger', gramWeight: 90, baseNGNCost: 250, protein: 3, carbs: 11, fat: 4, fiber: 2, sourcingLocation: 'Vegetable Stalls' },
          { name: 'Yam Flour / Pounded Yam', gramWeight: 130, baseNGNCost: 680, protein: 4, carbs: 35, fat: 1, fiber: 3, sourcingLocation: 'Produce Aisle' }
        ],
        prepInstructions: [
          'Dissolve the food gum in a little warm water until smooth.',
          'Simmer the goat meat with tomato, ginger and pepper until tender.',
          'Stir the gum in slowly; it will stretch and thicken as it boils.',
          'Serve with pounded yam.'
        ]
      },
      {
        title: 'Baobab Leaf Soup with Beef',
        description:
          'Baobab leaves cooked with beef, pepper and palm oil into a dark, savoury soup, traditionally eaten with a millet swallow.',
        visualType: 'stew_swallow',
        style: 'indigenous',
        proteinSourceType: 'beef_lean',
        calories: 605,
        protein: 44,
        carbs: 32,
        fat: 24,
        fiber: 8,
        cookTimeMinutes: 80,
        readyToEatQuery: 'Baobab Leaf Soup with Beef',
        ingredients: [
          { name: 'Baobab Leaves (Miyan Kuka)', gramWeight: 180, baseNGNCost: 380, protein: 10, carbs: 13, fat: 2, fiber: 6, sourcingLocation: 'Vegetable Stalls' },
          { name: 'Beef Chunks', gramWeight: 170, baseNGNCost: 1700, protein: 41, carbs: 0, fat: 9, fiber: 0, sourcingLocation: 'Butcher Shop' },
          { name: 'Pepper, Onion & Crayfish', gramWeight: 30, baseNGNCost: 250, protein: 4, carbs: 4, fat: 2, fiber: 1, sourcingLocation: 'Traditional Condiments' },
          { name: 'Red Palm Oil', gramWeight: 16, baseNGNCost: 200, protein: 0, carbs: 0, fat: 16, fiber: 0, sourcingLocation: 'Traditional Condiments' },
          { name: 'Millet Swallow (Tuwo)', gramWeight: 140, baseNGNCost: 420, protein: 5, carbs: 36, fat: 1, fiber: 2, sourcingLocation: 'Grain Stall' }
        ],
        prepInstructions: [
          'Pick the leaves clean and blanch them briefly to take off any bitterness.',
          'Fry onion, pepper and crayfish in palm oil.',
          'Add the beef and simmer until soft, then add the leaves at the end.',
          'Serve with the millet swallow.'
        ]
      },
      {
        title: 'Pumpkin Leaf and Waterleaf Soup with Beef and Pounded Yam',
        description:
          'Pumpkin leaf and waterleaf cooked together with beef, dry fish and palm oil into a smooth, green soup.',
        visualType: 'stew_swallow',
        style: 'indigenous',
        proteinSourceType: 'beef_lean',
        calories: 615,
        protein: 44,
        carbs: 34,
        fat: 24,
        fiber: 9,
        cookTimeMinutes: 85,
        readyToEatQuery: 'Pumpkin Leaf and Waterleaf Soup with Beef with Pounded Yam',
        ingredients: [
          { name: 'Pumpkin Leaf & Waterleaf', gramWeight: 200, baseNGNCost: 420, protein: 11, carbs: 15, fat: 2, fiber: 7, sourcingLocation: 'Vegetable Stalls' },
          { name: 'Beef Chunks', gramWeight: 170, baseNGNCost: 1700, protein: 41, carbs: 0, fat: 9, fiber: 0, sourcingLocation: 'Butcher Shop' },
          { name: 'Dry Fish & Crayfish', gramWeight: 40, baseNGNCost: 460, protein: 18, carbs: 0, fat: 3, fiber: 0, sourcingLocation: 'Fish Counter' },
          { name: 'Red Palm Oil & Pepper', gramWeight: 18, baseNGNCost: 230, protein: 1, carbs: 2, fat: 13, fiber: 1, sourcingLocation: 'Traditional Condiments' },
          { name: 'Eba (Cassava Swallow)', gramWeight: 110, baseNGNCost: 300, protein: 1, carbs: 28, fat: 0, fiber: 1, sourcingLocation: 'Grain Stall' },
        
        { name: 'Pounded Yam', gramWeight: 200, baseNGNCost: 380, protein: 3, carbs: 76, fat: 0, fiber: 3, sourcingLocation: 'Yam Stall' },],
        prepInstructions: [
          'Blend some of the leaves to a smooth paste.',
          'Simmer the beef with the dry fish until the flavours combine.',
          'Add the leaves and palm oil and simmer until thick.',
          'Serve with eba.'
        ]
      },
      {
        title: 'Ora Leaf Soup with Assorted Meat',
        description:
          'Ora leaf soup with assorted meat, stockfish and palm oil, thickened and served with any swallow.',
        visualType: 'stew_swallow',
        style: 'indigenous',
        proteinSourceType: 'beef_lean',
        calories: 640,
        protein: 45,
        carbs: 30,
        fat: 26,
        fiber: 7,
        cookTimeMinutes: 85,
        readyToEatQuery: 'Ora Leaf Soup with Assorted Meat',
        ingredients: [
          { name: 'Ora Leaves (Oha)', gramWeight: 180, baseNGNCost: 400, protein: 10, carbs: 13, fat: 2, fiber: 6, sourcingLocation: 'Vegetable Stalls' },
          { name: 'Assorted Meat', gramWeight: 175, baseNGNCost: 1900, protein: 43, carbs: 0, fat: 10, fiber: 0, sourcingLocation: 'Butcher Shop' },
          { name: 'Stockfish & Crayfish', gramWeight: 40, baseNGNCost: 480, protein: 20, carbs: 0, fat: 3, fiber: 0, sourcingLocation: 'Fish Counter' },
          { name: 'Red Palm Oil & Pepper Paste', gramWeight: 18, baseNGNCost: 230, protein: 1, carbs: 2, fat: 13, fiber: 1, sourcingLocation: 'Traditional Condiments' },
          { name: 'Pounded Yam', gramWeight: 120, baseNGNCost: 620, protein: 4, carbs: 33, fat: 1, fiber: 3, sourcingLocation: 'Produce Aisle' }
        ],
        prepInstructions: [
          'Wash the ora leaves and blend a portion to a paste.',
          'Simmer the assorted meat with the stockfish until very tender.',
          'Add the leaf paste and palm oil, and cook until thick.',
          'Serve with pounded yam.'
        ]
      }
    ]
  }
};

/**
 * Garden egg soup with real swallows.
 *
 * The earlier batch dressed soups up as stew-and-rice plates and, in one case,
 * served garden egg soup with an egg roll. Egg roll is a party snack, and a
 * thick soup is eaten with a swallow: garri, semo, eba, fufu, pounded yam,
 * amala. Rice is not wrong for a stew, but pairing it with a soup this thick is
 * how the food stops reading as Nigerian at all.
 *
 * These four cover the swallows the pools were missing outright. Garri and
 * pounded yam were already there.
 */
export const NIGERIA_SWOWL_PAIRS: Record<
  'breakfasts' | 'afternoons' | 'evenings',
  Record<MealBlueprint['proteinSourceType'], MealBlueprint[]>
> = {
  breakfasts: {
    fish: [],
    poultry: [],
    eggs_dairy: [],
    legumes_plant: [
      {
        title: 'Garden Egg Soup with Pepper and Amala',
        description:
          'Garden egg soup spooned onto a smooth amala, the cassava and yam swallow rolled with pepper sauce.',
        visualType: 'stew_swallow',
        style: 'indigenous',
        proteinSourceType: 'legumes_plant',
        calories: 545,
        protein: 9,
        carbs: 78,
        fat: 22,
        fiber: 11,
        cookTimeMinutes: 45,
        readyToEatQuery: 'Garden Egg Soup with Amala',
        ingredients: [
          { name: 'Garden Egg & Tomato Soup', gramWeight: 170, baseNGNCost: 400, protein: 6, carbs: 21, fat: 9, fiber: 7, sourcingLocation: 'Vegetable Stalls' },
          { name: 'Amala (Cassava and Yam Swallow)', gramWeight: 190, baseNGNCost: 430, protein: 3, carbs: 46, fat: 0, fiber: 3, sourcingLocation: 'Grain Stall' },
          { name: 'Pepper Sauce', gramWeight: 20, baseNGNCost: 180, protein: 1, carbs: 3, fat: 2, fiber: 1, sourcingLocation: 'Spice Stall' },
          { name: 'Palm Oil', gramWeight: 12, baseNGNCost: 140, protein: 0, carbs: 0, fat: 12, fiber: 0, sourcingLocation: 'Traditional Condiments' }
        ],
        prepInstructions: [
          'Blend tomato, sweet pepper and garden egg, then simmer in palm oil until thick.',
          'Season the soup well.',
          'Roll the amala with hot water until smooth and pliable.',
          'Spoon the soup onto the amala and finish with pepper sauce.'
        ]
      }
    ],
    beef_lean: []
  },
  afternoons: {
    fish: [
      {
        title: 'Garden Egg Soup with Grilled Fish and Semo',
        description:
          'A thick garden egg and tomato soup served with grilled fish and semo, the smooth yam flour swallow.',
        visualType: 'stew_swallow',
        style: 'indigenous',
        proteinSourceType: 'fish',
        calories: 585,
        protein: 34,
        carbs: 62,
        fat: 20,
        fiber: 8,
        cookTimeMinutes: 50,
        readyToEatQuery: 'Garden Egg Soup with Grilled Fish and Semo',
        ingredients: [
          { name: 'Garden Egg & Tomato Soup', gramWeight: 180, baseNGNCost: 420, protein: 6, carbs: 22, fat: 9, fiber: 7, sourcingLocation: 'Vegetable Stalls' },
          { name: 'Grilled Tilapia Fillet', gramWeight: 140, baseNGNCost: 1250, protein: 27, carbs: 0, fat: 6, fiber: 0, sourcingLocation: 'Fish Counter' },
          { name: 'Semo (Yam Flour Swallow)', gramWeight: 160, baseNGNCost: 380, protein: 4, carbs: 38, fat: 0, fiber: 1, sourcingLocation: 'Grain Stall' },
          { name: 'Palm Oil', gramWeight: 10, baseNGNCost: 120, protein: 0, carbs: 0, fat: 10, fiber: 0, sourcingLocation: 'Traditional Condiments' }
        ],
        prepInstructions: [
          'Fry blended tomato and sweet pepper in the palm oil.',
          'Add diced garden egg and simmer until the soup thickens.',
          'Season, then knead the semo with hot water into a smooth dough.',
          'Serve the soup over the semo with the grilled fish on the side.'
        ]
      }
    ],
    poultry: [],
    eggs_dairy: [],
    legumes_plant: [],
    beef_lean: []
  },
  evenings: {
    fish: [],
    poultry: [
      {
        title: 'Garden Egg Soup with Chicken and Eba',
        description:
          'Garden egg soup thickened with palm oil and pepper, served with chicken and a ball of eba.',
        visualType: 'stew_swallow',
        style: 'indigenous',
        proteinSourceType: 'poultry',
        calories: 640,
        protein: 33,
        carbs: 60,
        fat: 27,
        fiber: 7,
        cookTimeMinutes: 55,
        readyToEatQuery: 'Garden Egg Soup with Chicken and Eba',
        ingredients: [
          { name: 'Garden Egg & Tomato Soup', gramWeight: 180, baseNGNCost: 420, protein: 6, carbs: 22, fat: 9, fiber: 7, sourcingLocation: 'Vegetable Stalls' },
          { name: 'Stewed Chicken', gramWeight: 130, baseNGNCost: 1450, protein: 27, carbs: 0, fat: 12, fiber: 0, sourcingLocation: 'Poultry Counter' },
          { name: 'Eba (Cassava and Yam Swallow)', gramWeight: 170, baseNGNCost: 400, protein: 3, carbs: 41, fat: 0, fiber: 2, sourcingLocation: 'Grain Stall' },
          { name: 'Palm Oil', gramWeight: 12, baseNGNCost: 140, protein: 0, carbs: 0, fat: 12, fiber: 0, sourcingLocation: 'Traditional Condiments' }
        ],
        prepInstructions: [
          'Blend tomato, sweet pepper and garden egg, then simmer in palm oil until thick.',
          'Season the soup and keep it warm.',
          'Knead the eba dough in hot water until smooth and mould it into balls.',
          'Serve the soup with the eba and the stewed chicken.'
        ]
      }
    ],
    eggs_dairy: [],
    legumes_plant: [],
    beef_lean: [
      {
        title: 'Garden Egg Soup with Goat and Fufu',
        description: 'A rich garden egg and palm oil soup served with goat and pounded fufu.',
        visualType: 'stew_swallow',
        style: 'indigenous',
        proteinSourceType: 'beef_lean',
        calories: 720,
        protein: 35,
        carbs: 58,
        fat: 38,
        fiber: 8,
        cookTimeMinutes: 85,
        readyToEatQuery: 'Garden Egg Soup with Goat and Fufu',
        ingredients: [
          { name: 'Garden Egg & Tomato Soup', gramWeight: 190, baseNGNCost: 430, protein: 6, carbs: 23, fat: 10, fiber: 7, sourcingLocation: 'Vegetable Stalls' },
          { name: 'Goat Meat Pepper Soup', gramWeight: 130, baseNGNCost: 1900, protein: 30, carbs: 3, fat: 15, fiber: 0, sourcingLocation: 'Mushroom Market' },
          { name: 'Cassava and Plantain Fufu', gramWeight: 180, baseNGNCost: 520, protein: 5, carbs: 42, fat: 0, fiber: 2, sourcingLocation: 'Grain Stall' },
          { name: 'Palm Oil', gramWeight: 15, baseNGNCost: 170, protein: 0, carbs: 0, fat: 15, fiber: 0, sourcingLocation: 'Traditional Condiments' }
        ],
        prepInstructions: [
          'Blend tomato, sweet pepper and garden egg, then simmer in palm oil until the soup is thick and glossy.',
          'Season generously and keep it warm.',
          'Pound the boiled cassava and plantain until smooth and elastic.',
          'Serve the soup over the fufu with the goat on the side.'
        ]
      }
    ]
  }
};
