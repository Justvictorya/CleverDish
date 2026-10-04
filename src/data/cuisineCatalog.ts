import { CountryCode, MealBlueprint } from '../types';
import { EXTRA_MAINS } from './cuisineMainsExtra';
import { COUNTRY_BREAKFAST_EXTRAS } from './breakfastsExtra';
import { GHANA_AUTHENTIC_POOLS } from './ghanaAuthenticPools';

/**
 * Country-specific local cuisines.
 *
 * Nigeria uses the indigenous pools defined in rotationPlans.ts. Every other
 * supported country has its own catalogue here so a user never sees another
 * country's "local" food. Breakfasts and mains are keyed by protein type to
 * match the engine's sequential rotation; mains serve both afternoon and
 * evening slots.
 */
export interface CountryCuisine {
  /** Market names used for local sourcing labels. */
  markets: string[];
  /** Local staple names shown in the onboarding copy. */
  staples: string[];
  /**
   * Ingredient prices in this catalogue are written as Naira reference values
   * (the same basis as the Nigerian pools) and then converted to local currency.
   * That conversion alone lands Ghana/Kenya prices sensibly but underprices
   * Western markets, so each country scales its reference basket by this index
   * to sit above the `minimumDailyFloor` declared in countries.ts.
   */
  priceIndex: number;
  breakfasts: Record<MealBlueprint['proteinSourceType'], MealBlueprint[]>;
  mains: Record<MealBlueprint['proteinSourceType'], MealBlueprint[]>;
}

type P = MealBlueprint['proteinSourceType'];

export const COUNTRY_CUISINES: Partial<Record<CountryCode, CountryCuisine>> = {
  // ─────────────────────────── GHANA ───────────────────────────
  GH: {
    markets: ['Makola Market, Accra', 'Kejetia Market, Kumasi', 'Kaneshie Market, Accra'],
    staples: ['Waakye', 'Banku', 'Fufu', 'Jollof', 'Tomato stew', 'Shito'],
    priceIndex: 1,
    breakfasts: {
      fish: [
        {
          title: 'Waakye with Smoked Herring & Shito',
          description: 'Rice and beans cooked together in burnt-taste jollof stock, served with flaked smoked herring and spicy shito pepper sauce.',
          visualType: 'jollof_bowl',
          style: 'indigenous',
          proteinSourceType: 'fish',
          calories: 560,
          protein: 34,
          carbs: 76,
          fat: 13,
          fiber: 9,
          cookTimeMinutes: 30,
          readyToEatQuery: 'Waakye with Fish',
          ingredients: [
            { name: 'Waakye Rice & Cowpea', gramWeight: 260, baseNGNCost: 700, protein: 10, carbs: 72, fat: 1.5, fiber: 7, sourcingLocation: 'Makola Market (Grain Sack Row)' },
            { name: 'Smoked Herring Flakes', gramWeight: 80, baseNGNCost: 900, protein: 24, carbs: 0, fat: 8, fiber: 0, sourcingLocation: 'Coastal Fish Sellers' },
            { name: 'Shito Pepper Sauce', gramWeight: 15, baseNGNCost: 180, protein: 1, carbs: 3, fat: 2, fiber: 1, sourcingLocation: 'Local Spice Stalls' }
          ],
          prepInstructions: [
            'Sparingly oil the rice, add washed cowpeas, water and a pinch of bicarbonate, then cook until the grains are tender and slightly smoky.',
            'Flake the smoked herring and discard pin-bones.',
            'Serve the waakye hot with shito sauce spooned over the top.'
          ]
        }
      ],
      poultry: [
      ],
      eggs_dairy: [
      ],
      legumes_plant: [
      ],
      beef_lean: [
      ]
    },
    mains: {
      fish: [
        {
          title: 'Grilled Tilapia with Banku & Pepper Sauce',
          description: 'Whole tilapia grilled over charcoal, served with fermented corn banku and a fresh shito-tomato pepper sauce.',
          visualType: 'grilled_fish',
          style: 'indigenous',
          proteinSourceType: 'fish',
          calories: 610,
          protein: 42,
          carbs: 62,
          fat: 18,
          fiber: 8,
          cookTimeMinutes: 35,
          readyToEatQuery: 'Grilled Tilapia with Banku',
          ingredients: [
            { name: 'Whole Tilapia', gramWeight: 220, baseNGNCost: 1500, protein: 40, carbs: 0, fat: 6, fiber: 0, sourcingLocation: 'Tema Fishing Harbour' },
            { name: 'Banku (Fermented Corn Dough)', gramWeight: 180, baseNGNCost: 350, protein: 6, carbs: 60, fat: 1.5, fiber: 5, sourcingLocation: 'Makola Market (Banku Stalls)' },
            { name: 'Shito-Tomato Pepper Sauce', gramWeight: 60, baseNGNCost: 250, protein: 2, carbs: 8, fat: 2, fiber: 3, sourcingLocation: 'Local Spice Stalls' }
          ],
          prepInstructions: [
            'Clean and score the tilapia, then grill over charcoal until the flesh lifts from the bone.',
            'Boil the banku until smooth and mould into rounds.',
            'Serve the fish hot with banku and pepper sauce for dipping.'
          ]
        }
      ],
      poultry: [
      ],
      eggs_dairy: [
      ],
      legumes_plant: [
        {
          title: 'Groundnut Soup with Rice & Sweet Plantain',
          description: 'Rich peanut-based soup simmered with tomato and greens, served over rice with caramelised plantain.',
          visualType: 'beans_plantain',
          style: 'indigenous',
          proteinSourceType: 'legumes_plant',
          calories: 640,
          protein: 24,
          carbs: 86,
          fat: 20,
          fiber: 14,
          cookTimeMinutes: 45,
          readyToEatQuery: 'Groundnut Soup with Rice',
          ingredients: [
            { name: 'Groundnut Soup Base', gramWeight: 250, baseNGNCost: 750, protein: 18, carbs: 22, fat: 14, fiber: 8, sourcingLocation: 'Local Nut & Legume Stalls' },
            { name: 'Steamed Rice', gramWeight: 220, baseNGNCost: 550, protein: 6, carbs: 68, fat: 0.5, fiber: 2, sourcingLocation: 'Makola Market (Rice Mills)' },
            { name: 'Caramelised Sweet Plantain', gramWeight: 90, baseNGNCost: 350, protein: 1, carbs: 22, fat: 4, fiber: 2, sourcingLocation: 'Fruit Sellers Row' }
          ],
          prepInstructions: [
            'Blend roasted groundnuts with tomato, ginger and Scotch bonnet, then simmer into a thick soup.',
            'Fold in wilted spinach and season to taste.',
            'Serve over steamed rice with caramelised plantain on the side.'
          ]
        }
      ],
      beef_lean: [
      ]
    }
  },

  // ─────────────────────────── KENYA ───────────────────────────
  KE: {
    markets: ['Wakulima (Marikiti) Market, Nairobi', 'Gikomba Market, Nairobi', 'City Market, Nairobi'],
    staples: ['Ugali', 'Sukuma wiki', 'Pilau', 'Githeri', 'Nyama choma', 'Chapati'],
    priceIndex: 1,
    breakfasts: {
      fish: [
        {
          title: 'Tilapia with Ugali & Sukuma Wiki',
          description: 'Pan-grilled Nile tilapia fillet served with soft steamed ugali and lightly sautéed sukuma wiki greens.',
          visualType: 'stew_swallow',
          style: 'indigenous',
          proteinSourceType: 'fish',
          calories: 590,
          protein: 40,
          carbs: 66,
          fat: 15,
          fiber: 9,
          cookTimeMinutes: 30,
          readyToEatQuery: 'Tilapia with Ugali',
          ingredients: [
            { name: 'Nile Tilapia Fillet', gramWeight: 200, baseNGNCost: 1300, protein: 38, carbs: 0, fat: 6, fiber: 0, sourcingLocation: 'Lakeside Fish Market' },
            { name: 'Ugali (Maizemeal)', gramWeight: 200, baseNGNCost: 300, protein: 4, carbs: 62, fat: 1, fiber: 5, sourcingLocation: 'Wakulima Maize Vendors' },
            { name: 'Sukuma Wiki Greens', gramWeight: 150, baseNGNCost: 300, protein: 5, carbs: 8, fat: 6, fiber: 6, sourcingLocation: 'Wakulima Vegetable Aisle' }
          ],
          prepInstructions: [
            'Season the tilapia with lemon, garlic and pepper, then pan-grill until it flakes.',
            'Stir the maizemeal with hot water until smooth, then roll into balls and steam.',
            'Sauté the collard greens with onion and tomato, and serve everything together.'
          ]
        }
      ],
      poultry: [
        {
          title: 'Chicken Omelet with Chai & Chapati',
          description: 'Fluffy onion-and-coriander chicken omelet served with masala chai and a warm chapati.',
          visualType: 'yam_egg_skillet',
          style: 'indigenous',
          proteinSourceType: 'poultry',
          calories: 520,
          protein: 34,
          carbs: 48,
          fat: 20,
          fiber: 5,
          cookTimeMinutes: 20,
          readyToEatQuery: 'Chicken Omelet with Chapati',
          ingredients: [
            { name: 'Shredded Chicken Breast', gramWeight: 120, baseNGNCost: 950, protein: 28, carbs: 0, fat: 3, fiber: 0, sourcingLocation: 'City Market Poultry Stalls' },
            { name: 'Eggs', gramWeight: 110, baseNGNCost: 550, protein: 16, carbs: 1, fat: 10, fiber: 0, sourcingLocation: 'Wakulima Egg Vendors' },
            { name: 'Chapati', gramWeight: 80, baseNGNCost: 300, protein: 4, carbs: 40, fat: 6, fiber: 3, sourcingLocation: 'Local Bakeries' },
            { name: 'Masala Chai', gramWeight: 200, baseNGNCost: 200, protein: 3, carbs: 18, fat: 4, fiber: 0, sourcingLocation: 'Tea Vendors' }
          ],
          prepInstructions: [
            'Cook the shredded chicken with onion and coriander until dry and fragrant.',
            'Fold the chicken into whisked eggs and fry until just set.',
            'Serve with a warm chapati and a cup of masala chai.'
          ]
        }
      ],
      eggs_dairy: [
        {
          title: 'Scrambled Eggs with Fried Plantain & Chapati',
          description: 'Soft-scrambled eggs with onion and tomato, alongside fried ripe plantain and chapati.',
          visualType: 'yam_egg_skillet',
          style: 'indigenous',
          proteinSourceType: 'eggs_dairy',
          calories: 560,
          protein: 24,
          carbs: 62,
          fat: 21,
          fiber: 7,
          cookTimeMinutes: 18,
          readyToEatQuery: 'Eggs with Fried Plantain',
          ingredients: [
            { name: 'Eggs', gramWeight: 140, baseNGNCost: 700, protein: 20, carbs: 1, fat: 13, fiber: 0, sourcingLocation: 'Wakulima Egg Vendors' },
            { name: 'Fried Ripe Plantain', gramWeight: 110, baseNGNCost: 350, protein: 2, carbs: 28, fat: 5, fiber: 3, sourcingLocation: 'Gikomba Fruit Stalls' },
            { name: 'Chapati', gramWeight: 70, baseNGNCost: 260, protein: 3, carbs: 34, fat: 5, fiber: 3, sourcingLocation: 'Local Bakeries' },
            { name: 'Tomato & Onion Relish', gramWeight: 70, baseNGNCost: 200, protein: 1, carbs: 6, fat: 0.4, fiber: 2, sourcingLocation: 'Wakulima Vegetable Aisle' }
          ],
          prepInstructions: [
            'Gently scramble the eggs with tomato and onion until soft and creamy.',
            'Fry the plantain slices until golden and crisp at the edges.',
            'Serve with a warm chapati for scooping.'
          ]
        }
      ],
      legumes_plant: [
        {
          title: 'Githeri with Banana & Vegetables',
          description: 'The Nairobi classic: spiced maize and cowpea mix with vegetables, served with ripe banana and avocado.',
          visualType: 'beans_plantain',
          style: 'indigenous',
          proteinSourceType: 'legumes_plant',
          calories: 520,
          protein: 18,
          carbs: 84,
          fat: 10,
          fiber: 15,
          cookTimeMinutes: 30,
          readyToEatQuery: 'Githeri',
          ingredients: [
            { name: 'Githeri (Maize & Cowpeas)', gramWeight: 280, baseNGNCost: 550, protein: 14, carbs: 74, fat: 3, fiber: 11, sourcingLocation: 'Wakulima Grain Vendors' },
            { name: 'Ripe Banana', gramWeight: 100, baseNGNCost: 200, protein: 1, carbs: 24, fat: 0.3, fiber: 3, sourcingLocation: 'Gikomba Fruit Stalls' },
            { name: 'Avocado & Tomato Salad', gramWeight: 110, baseNGNCost: 450, protein: 2, carbs: 8, fat: 8, fiber: 6, sourcingLocation: 'Wakulima Vegetable Aisle' }
          ],
          prepInstructions: [
            'Boil the maize and cowpeas with tomato, onion and curry powder until tender.',
            'Let the mixture dry out slightly so the grains separate.',
            'Serve warm with sliced banana and fresh avocado.'
          ]
        }
      ],
      beef_lean: [
        {
          title: 'Beef Sausage with Mandazi & Egg',
          description: 'Grilled beef sausage slices with a spiced fried egg and warm, sugar-dusted mandazi.',
          visualType: 'chicken_salad',
          style: 'indigenous',
          proteinSourceType: 'beef_lean',
          calories: 610,
          protein: 38,
          carbs: 56,
          fat: 24,
          fiber: 4,
          cookTimeMinutes: 18,
          readyToEatQuery: 'Beef Sausage and Mandazi',
          ingredients: [
            { name: 'Beef Sausages', gramWeight: 150, baseNGNCost: 1400, protein: 32, carbs: 4, fat: 16, fiber: 0, sourcingLocation: 'City Market Meat Stalls' },
            { name: 'Fried Egg', gramWeight: 70, baseNGNCost: 350, protein: 10, carbs: 1, fat: 7, fiber: 0, sourcingLocation: 'Wakulima Egg Vendors' },
            { name: 'Mandazi', gramWeight: 110, baseNGNCost: 300, protein: 4, carbs: 48, fat: 5, fiber: 2, sourcingLocation: 'Street Bakeries' }
          ],
          prepInstructions: [
            'Grill the sausage slices until browned on the edges.',
            'Fry the egg in the rendered fat until the edges crisp.',
            'Serve with warm mandazi dusted with cardamom sugar.'
          ]
        }
      ]
    },
    mains: {
      fish: [
        {
          title: 'Crispy Fried Tilapia with Sukuma Wiki & Ugali',
          description: 'Whole tilapia scored, fried crisp and drenched in tamarind gravy, with sukuma wiki and ugali.',
          visualType: 'stew_swallow',
          style: 'indigenous',
          proteinSourceType: 'fish',
          calories: 660,
          protein: 44,
          carbs: 64,
          fat: 24,
          fiber: 9,
          cookTimeMinutes: 40,
          readyToEatQuery: 'Fried Tilapia with Ugali',
          ingredients: [
            { name: 'Whole Tilapia', gramWeight: 230, baseNGNCost: 1400, protein: 42, carbs: 0, fat: 7, fiber: 0, sourcingLocation: 'Lakeside Fish Market' },
            { name: 'Ugali (Maizemeal)', gramWeight: 180, baseNGNCost: 280, protein: 4, carbs: 56, fat: 1, fiber: 4, sourcingLocation: 'Wakulima Maize Vendors' },
            { name: 'Sukuma Wiki Greens', gramWeight: 180, baseNGNCost: 320, protein: 6, carbs: 9, fat: 7, fiber: 7, sourcingLocation: 'Wakulima Vegetable Aisle' },
            { name: 'Tamarind Gravy', gramWeight: 90, baseNGNCost: 300, protein: 2, carbs: 10, fat: 1, fiber: 3, sourcingLocation: 'Local Spice Stalls' }
          ],
          prepInstructions: [
            'Score the fish, season, then deep-fry until the skin is crisp and the flesh flakes.',
            'Simmer tamarind with tomato and onion into a light gravy and spoon over the fish.',
            'Serve with steamed ugali and sautéed sukuma wiki.'
          ]
        }
      ],
      poultry: [
        {
          title: 'Nyama Choma Chicken with Pilau',
          description: 'Charcoal-roasted chicken coated in spiced masala, served with fragrant Kenyan pilau rice.',
          visualType: 'chicken_salad',
          style: 'indigenous',
          proteinSourceType: 'poultry',
          calories: 700,
          protein: 48,
          carbs: 70,
          fat: 24,
          fiber: 6,
          cookTimeMinutes: 45,
          readyToEatQuery: 'Nyama Choma with Pilau',
          ingredients: [
            { name: 'Chicken Thighs', gramWeight: 170, baseNGNCost: 1150, protein: 40, carbs: 0, fat: 9, fiber: 0, sourcingLocation: 'City Market Poultry Stalls' },
            { name: 'Pilau Rice (Spiced)', gramWeight: 260, baseNGNCost: 650, protein: 8, carbs: 70, fat: 6, fiber: 3, sourcingLocation: 'Wakulima Rice Vendors' },
            { name: 'Masala Spice Rub', gramWeight: 20, baseNGNCost: 250, protein: 1, carbs: 6, fat: 2, fiber: 2, sourcingLocation: 'Local Spice Stalls' }
          ],
          prepInstructions: [
            'Rub the chicken with masala, salt and oil, then marinate for at least 30 minutes.',
            'Roast over charcoal until the edges char and the juices run clear.',
            'Fluff fragrant pilau with fried onions and serve the chicken on top.'
          ]
        },
        {
          title: 'Ugali with Creamy Chicken Stew',
          description: 'Soft ugali scooped into a bowl of rich, peppery chicken stew with peas and carrots.',
          visualType: 'stew_swallow',
          style: 'indigenous',
          proteinSourceType: 'poultry',
          calories: 680,
          protein: 42,
          carbs: 68,
          fat: 22,
          fiber: 8,
          cookTimeMinutes: 45,
          readyToEatQuery: 'Ugali with Chicken Stew',
          ingredients: [
            { name: 'Chicken Breast Cubes', gramWeight: 160, baseNGNCost: 1050, protein: 36, carbs: 0, fat: 4, fiber: 0, sourcingLocation: 'City Market Poultry Stalls' },
            { name: 'Ugali (Maizemeal)', gramWeight: 190, baseNGNCost: 290, protein: 4, carbs: 58, fat: 1, fiber: 4, sourcingLocation: 'Wakulima Maize Vendors' },
            { name: 'Creamy Tomato Stew', gramWeight: 200, baseNGNCost: 600, protein: 8, carbs: 14, fat: 16, fiber: 5, sourcingLocation: 'Wakulima Vegetable Aisle' }
          ],
          prepInstructions: [
            'Brown the chicken, then simmer in a thickened tomato, carrot and pea stew.',
            'Stir the maizemeal with hot water and steam until smooth.',
            'Serve the stew in bowls with torn pieces of ugali soaking up the sauce.'
          ]
        }

      ],
      eggs_dairy: [
      ],
      legumes_plant: [
        {
          title: 'Muthiara with Steamed Vegetables',
          description: 'Sweet Kenyan coconut-millet pudding served with lightly steamed seasonal vegetables.',
          visualType: 'oatmeal_parfait',
          style: 'indigenous',
          proteinSourceType: 'legumes_plant',
          calories: 520,
          protein: 16,
          carbs: 78,
          fat: 12,
          fiber: 11,
          cookTimeMinutes: 40,
          readyToEatQuery: 'Muthiara',
          ingredients: [
            { name: 'Muthiara (Millet & Coconut)', gramWeight: 250, baseNGNCost: 450, protein: 8, carbs: 66, fat: 10, fiber: 6, sourcingLocation: 'Wakulima Grain Vendors' },
            { name: 'Steamed Vegetables', gramWeight: 200, baseNGNCost: 350, protein: 6, carbs: 16, fat: 2, fiber: 8, sourcingLocation: 'Wakulima Vegetable Aisle' },
            { name: 'Coconut Cream', gramWeight: 50, baseNGNCost: 250, protein: 1, carbs: 2, fat: 6, fiber: 1, sourcingLocation: 'Local Nut Vendors' }
          ],
          prepInstructions: [
            'Cook the millet in coconut milk until thick and sticky.',
            'Steam the vegetables until just tender, keeping a little bite.',
            'Serve the muthiara warm with the vegetables spooned alongside.'
          ]
        }
      ],
      beef_lean: [
        {
          title: 'Beef Stew with Rice & Green Vegetables',
          description: 'Slow-braised lean beef in tomato gravy, served with steamed rice and wilted sukuma greens.',
          visualType: 'stew_swallow',
          style: 'indigenous',
          proteinSourceType: 'beef_lean',
          calories: 670,
          protein: 46,
          carbs: 70,
          fat: 18,
          fiber: 10,
          cookTimeMinutes: 60,
          readyToEatQuery: 'Beef Stew with Rice',
          ingredients: [
            { name: 'Lean Beef Cubes', gramWeight: 160, baseNGNCost: 1700, protein: 44, carbs: 0, fat: 8, fiber: 0, sourcingLocation: 'City Market Meat Stalls' },
            { name: 'Steamed Rice', gramWeight: 220, baseNGNCost: 520, protein: 6, carbs: 68, fat: 0.5, fiber: 2, sourcingLocation: 'Wakulima Rice Vendors' },
            { name: 'Tomato Gravy & Sukuma', gramWeight: 200, baseNGNCost: 500, protein: 6, carbs: 16, fat: 6, fiber: 7, sourcingLocation: 'Wakulima Vegetable Aisle' }
          ],
          prepInstructions: [
            'Brown the beef and simmer with tomato, onion and bay leaf until tender.',
            'Cook the rice separately and keep it fluffy.',
            'Serve the stew over rice with wilted greens on the side.'
          ]
        }
      ]
    }
  },

  // ─────────────────────────── UNITED STATES ───────────────────────────
  US: {
    markets: ['Union Square Greenmarket, NYC', 'Pike Place Market, Seattle', 'Trader Joe’s', 'ALDI'],
    staples: ['Oats', 'Bagels', 'Sweet potato', 'Chicken breast', 'Quinoa', 'Black beans'],
    priceIndex: 3.6,
    breakfasts: {
      fish: [
        {
          title: 'Bagel with Lox, Cream Cheese & Dill',
          description: 'Toasted everything bagel layered with dill cream cheese, cured salmon and thinly sliced cucumber.',
          visualType: 'oatmeal_parfait',
          style: 'continental',
          proteinSourceType: 'fish',
          calories: 470,
          protein: 28,
          carbs: 46,
          fat: 16,
          fiber: 5,
          cookTimeMinutes: 8,
          readyToEatQuery: 'Lox Bagel',
          ingredients: [
            { name: 'Everything Bagel', gramWeight: 110, baseNGNCost: 300, protein: 11, carbs: 54, fat: 1.5, fiber: 3, sourcingLocation: 'Neighbourhood Bakery' },
            { name: 'Cured Salmon (Lox)', gramWeight: 90, baseNGNCost: 1100, protein: 22, carbs: 0, fat: 5, fiber: 0, sourcingLocation: 'Seafood Counter' },
            { name: 'Cream Cheese & Cucumber', gramWeight: 70, baseNGNCost: 400, protein: 6, carbs: 4, fat: 11, fiber: 1, sourcingLocation: 'Deli & Dairy Case' }
          ],
          prepInstructions: [
            'Toast the bagel halves until golden.',
            'Spread dill cream cheese generously on both halves.',
            'Layer with lox, cucumber ribbons and a squeeze of lemon.'
          ]
        }
      ],
      poultry: [
        {
          title: 'Turkey Breakfast Burrito',
          description: 'Scrambled eggs, turkey chorizo and roasted peppers folded in a warm flour tortilla with salsa.',
          visualType: 'yam_egg_skillet',
          style: 'continental',
          proteinSourceType: 'poultry',
          calories: 540,
          protein: 38,
          carbs: 44,
          fat: 22,
          fiber: 5,
          cookTimeMinutes: 15,
          readyToEatQuery: 'Breakfast Burrito',
          ingredients: [
            { name: 'Eggs', gramWeight: 130, baseNGNCost: 550, protein: 19, carbs: 1, fat: 12, fiber: 0, sourcingLocation: 'Dairy & Eggs Case' },
            { name: 'Turkey Chorizo', gramWeight: 70, baseNGNCost: 650, protein: 16, carbs: 2, fat: 9, fiber: 0, sourcingLocation: 'Deli & Chilled Meats' },
            { name: 'Flour Tortilla', gramWeight: 60, baseNGNCost: 200, protein: 2, carbs: 32, fat: 6, fiber: 2, sourcingLocation: 'Tortilla & Bakery Aisle' },
            { name: 'Roasted Peppers & Salsa', gramWeight: 90, baseNGNCost: 250, protein: 2, carbs: 9, fat: 3, fiber: 3, sourcingLocation: 'Produce Section' }
          ],
          prepInstructions: [
            'Brown the turkey chorizo until crisp, then add the peppers.',
            'Fold in softly scrambled eggs and season with hot sauce.',
            'Warm the tortilla, fill, and roll tightly.'
          ]
        }
      ],
      eggs_dairy: [
        {
          title: 'Spinach & Feta Omelet with Sourdough Toast',
          description: 'A three-egg omelet folded with wilted spinach and crumbled feta, beside buttered sourdough toast.',
          visualType: 'yam_egg_skillet',
          style: 'continental',
          proteinSourceType: 'eggs_dairy',
          calories: 500,
          protein: 30,
          carbs: 34,
          fat: 24,
          fiber: 5,
          cookTimeMinutes: 12,
          readyToEatQuery: 'Spinach Feta Omelet',
          ingredients: [
            { name: 'Eggs', gramWeight: 150, baseNGNCost: 620, protein: 21, carbs: 1, fat: 14, fiber: 0, sourcingLocation: 'Dairy & Eggs Case' },
            { name: 'Wilted Spinach & Feta', gramWeight: 110, baseNGNCost: 480, protein: 10, carbs: 4, fat: 11, fiber: 3, sourcingLocation: 'Produce & Cheese Case' },
            { name: 'Sourdough Bread', gramWeight: 70, baseNGNCost: 280, protein: 4, carbs: 30, fat: 3, fiber: 2, sourcingLocation: 'Neighbourhood Bakery' },
            { name: 'Butter', gramWeight: 10, baseNGNCost: 120, protein: 0, carbs: 0, fat: 11, fiber: 0, sourcingLocation: 'Dairy Case' }
          ],
          prepInstructions: [
            'Wilt the spinach with a pinch of salt and squeeze out the excess water.',
            'Whisk the eggs, cook gently, then fill with spinach and feta and fold.',
            'Toast sourdough and butter it for serving alongside.'
          ]
        }
      ],
      legumes_plant: [
        {
          title: 'Berry Greek Yogurt & Granola Bowl',
          description: 'Thick Greek yogurt layered with honey granola, mixed berries and a scatter of toasted almonds.',
          visualType: 'oatmeal_parfait',
          style: 'continental',
          proteinSourceType: 'legumes_plant',
          calories: 450,
          protein: 24,
          carbs: 58,
          fat: 13,
          fiber: 9,
          cookTimeMinutes: 5,
          readyToEatQuery: 'Yogurt and Granola Bowl',
          ingredients: [
            { name: 'Greek Yogurt', gramWeight: 220, baseNGNCost: 600, protein: 22, carbs: 14, fat: 5, fiber: 0, sourcingLocation: 'Dairy Case' },
            { name: 'Honey Granola', gramWeight: 60, baseNGNCost: 400, protein: 6, carbs: 40, fat: 5, fiber: 5, sourcingLocation: 'Cereal & Breakfast Aisle' },
            { name: 'Mixed Berries', gramWeight: 100, baseNGNCost: 550, protein: 1, carbs: 14, fat: 0.4, fiber: 5, sourcingLocation: 'Produce Section' },
            { name: 'Toasted Almonds', gramWeight: 15, baseNGNCost: 220, protein: 5, carbs: 2, fat: 5, fiber: 2, sourcingLocation: 'Nut & Dry Goods Aisle' }
          ],
          prepInstructions: [
            'Spoon the yogurt into a bowl.',
            'Scatter over the granola, berries and almonds.',
            'Finish with a drizzle of honey.'
          ]
        }
      ],
      beef_lean: [
        {
          title: 'Lean Beef Breakfast Burrito',
          description: 'Seasoned lean beef, scrambled eggs, black beans and avocado wrapped in a warm tortilla.',
          visualType: 'yam_egg_skillet',
          style: 'continental',
          proteinSourceType: 'beef_lean',
          calories: 590,
          protein: 40,
          carbs: 46,
          fat: 23,
          fiber: 9,
          cookTimeMinutes: 18,
          readyToEatQuery: 'Beef Burrito',
          ingredients: [
            { name: 'Lean Beef Strips', gramWeight: 110, baseNGNCost: 1400, protein: 26, carbs: 0, fat: 7, fiber: 0, sourcingLocation: 'Butcher Counter' },
            { name: 'Eggs', gramWeight: 110, baseNGNCost: 470, protein: 16, carbs: 1, fat: 10, fiber: 0, sourcingLocation: 'Dairy & Eggs Case' },
            { name: 'Black Beans', gramWeight: 90, baseNGNCost: 250, protein: 7, carbs: 16, fat: 1, fiber: 6, sourcingLocation: 'Canned Goods Aisle' },
            { name: 'Flour Tortilla & Avocado', gramWeight: 90, baseNGNCost: 500, protein: 4, carbs: 32, fat: 9, fiber: 5, sourcingLocation: 'Tortilla & Bakery Aisle' }
          ],
          prepInstructions: [
            'Sear the seasoned beef strips over high heat.',
            'Scramble the eggs and fold in the warmed black beans.',
            'Fill the warmed tortilla with beef, egg mixture and avocado, then roll.'
          ]
        }
      ]
    },
    mains: {
      fish: [
        {
          title: 'Grilled Salmon with Quinoa & Roasted Broccoli',
          description: 'Lemon-herb grilled salmon fillet over fluffy quinoa with charred broccoli and a drizzle of olive oil.',
          visualType: 'grilled_fish',
          style: 'continental',
          proteinSourceType: 'fish',
          calories: 620,
          protein: 46,
          carbs: 48,
          fat: 22,
          fiber: 9,
          cookTimeMinutes: 30,
          readyToEatQuery: 'Grilled Salmon with Quinoa',
          ingredients: [
            { name: 'Salmon Fillet', gramWeight: 180, baseNGNCost: 2200, protein: 40, carbs: 0, fat: 12, fiber: 0, sourcingLocation: 'Seafood Counter' },
            { name: 'Cooked Quinoa', gramWeight: 180, baseNGNCost: 600, protein: 8, carbs: 32, fat: 3, fiber: 5, sourcingLocation: 'Grain & Pasta Aisle' },
            { name: 'Roasted Broccoli', gramWeight: 150, baseNGNCost: 400, protein: 5, carbs: 14, fat: 3, fiber: 6, sourcingLocation: 'Produce Section' },
            { name: 'Olive Oil & Lemon', gramWeight: 15, baseNGNCost: 250, protein: 0, carbs: 1, fat: 7, fiber: 0, sourcingLocation: 'Produce & Oils Aisle' }
          ],
          prepInstructions: [
            'Season the salmon and grill skin-side down until it releases and chars slightly.',
            'Toss the broccoli with olive oil and roast until charred at the edges.',
            'Plate over quinoa and finish with lemon zest.'
          ]
        }
      ],
      poultry: [
        {
          title: 'Grilled Chicken Caesar Salad',
          description: 'Chargrilled chicken breast over crisp romaine, parmesan, croutons and a light lemon caesar dressing.',
          visualType: 'chicken_salad',
          style: 'continental',
          proteinSourceType: 'poultry',
          calories: 540,
          protein: 46,
          carbs: 24,
          fat: 26,
          fiber: 6,
          cookTimeMinutes: 20,
          readyToEatQuery: 'Chicken Caesar Salad',
          ingredients: [
            { name: 'Chicken Breast', gramWeight: 160, baseNGNCost: 1050, protein: 36, carbs: 0, fat: 4, fiber: 0, sourcingLocation: 'Meat Counter' },
            { name: 'Romaine Lettuce', gramWeight: 160, baseNGNCost: 400, protein: 4, carbs: 10, fat: 1, fiber: 4, sourcingLocation: 'Produce Section' },
            { name: 'Parmesan & Croutons', gramWeight: 45, baseNGNCost: 500, protein: 8, carbs: 14, fat: 10, fiber: 2, sourcingLocation: 'Dairy & Bakery Aisle' },
            { name: 'Lemon Caesar Dressing', gramWeight: 35, baseNGNCost: 300, protein: 1, carbs: 2, fat: 9, fiber: 0, sourcingLocation: 'Condiments Aisle' }
          ],
          prepInstructions: [
            'Grill the chicken with salt, pepper and lemon until marked and cooked through.',
            'Toss the romaine with dressing and top with croutons and shaved parmesan.',
            'Slice the chicken over the salad and finish with cracked black pepper.'
          ]
        },
        {
          title: 'Fresh Pasta with Alfredo Sauce & Grilled Chicken',
          description: 'Fettuccine tossed in a garlic cream alfredo, topped with sliced grilled chicken and fresh basil.',
          visualType: 'pasta_medley',
          style: 'continental',
          proteinSourceType: 'poultry',
          calories: 680,
          protein: 44,
          carbs: 62,
          fat: 26,
          fiber: 5,
          cookTimeMinutes: 25,
          readyToEatQuery: 'Chicken Alfredo Pasta',
          ingredients: [
            { name: 'Fettuccine Pasta', gramWeight: 200, baseNGNCost: 400, protein: 8, carbs: 62, fat: 2, fiber: 4, sourcingLocation: 'Grain & Pasta Aisle' },
            { name: 'Grilled Chicken Breast', gramWeight: 140, baseNGNCost: 950, protein: 32, carbs: 0, fat: 4, fiber: 0, sourcingLocation: 'Meat Counter' },
            { name: 'Cream & Parmesan Sauce', gramWeight: 90, baseNGNCost: 650, protein: 8, carbs: 6, fat: 18, fiber: 0, sourcingLocation: 'Dairy Case' },
            { name: 'Fresh Basil', gramWeight: 10, baseNGNCost: 120, protein: 0, carbs: 2, fat: 0, fiber: 1, sourcingLocation: 'Produce Section' }
          ],
          prepInstructions: [
            'Cook the fettuccine in salted water until al dente, reserving the pasta water.',
            'Whisk garlic into cream and parmesan, loosening with pasta water until glossy.',
            'Toss the pasta through the sauce, then top with sliced chicken and torn basil.'
          ]
        }

      ],
      eggs_dairy: [
      ],
      legumes_plant: [
        {
          title: 'Black Bean & Sweet Potato Bowl',
          description: 'Roasted sweet potato and black beans over quinoa, with charred corn, avocado and a lime-cilantro drizzle.',
          visualType: 'beans_plantain',
          style: 'continental',
          proteinSourceType: 'legumes_plant',
          calories: 590,
          protein: 22,
          carbs: 84,
          fat: 15,
          fiber: 20,
          cookTimeMinutes: 35,
          readyToEatQuery: 'Black Bean Sweet Potato Bowl',
          ingredients: [
            { name: 'Roasted Sweet Potato', gramWeight: 220, baseNGNCost: 450, protein: 4, carbs: 52, fat: 0.5, fiber: 8, sourcingLocation: 'Produce Section' },
            { name: 'Black Beans', gramWeight: 150, baseNGNCost: 380, protein: 12, carbs: 26, fat: 1, fiber: 10, sourcingLocation: 'Canned Goods Aisle' },
            { name: 'Cooked Quinoa', gramWeight: 130, baseNGNCost: 430, protein: 6, carbs: 24, fat: 2, fiber: 4, sourcingLocation: 'Grain & Pasta Aisle' },
            { name: 'Charred Corn & Avocado', gramWeight: 120, baseNGNCost: 550, protein: 3, carbs: 20, fat: 9, fiber: 8, sourcingLocation: 'Produce Section' }
          ],
          prepInstructions: [
            'Roast the sweet potato cubes with cumin until caramelised at the edges.',
            'Warm the beans with cumin and a splash of water.',
            'Build the bowl over quinoa and finish with lime, cilantro and avocado.'
          ]
        }
      ],
      beef_lean: [
        {
          title: 'Lean Beef Burger with Sweet Potato Fries',
          description: 'A grilled lean beef patty with lettuce, tomato and mustard, beside crisp sweet potato fries.',
          visualType: 'chicken_salad',
          style: 'continental',
          proteinSourceType: 'beef_lean',
          calories: 650,
          protein: 44,
          carbs: 52,
          fat: 24,
          fiber: 10,
          cookTimeMinutes: 30,
          readyToEatQuery: 'Lean Beef Burger',
          ingredients: [
            { name: 'Lean Beef Patty', gramWeight: 150, baseNGNCost: 1600, protein: 36, carbs: 0, fat: 12, fiber: 0, sourcingLocation: 'Butcher Counter' },
            { name: 'Wholegrain Burger Bun', gramWeight: 70, baseNGNCost: 300, protein: 8, carbs: 32, fat: 4, fiber: 4, sourcingLocation: 'Bakery Aisle' },
            { name: 'Sweet Potato Fries', gramWeight: 180, baseNGNCost: 450, protein: 3, carbs: 44, fat: 6, fiber: 7, sourcingLocation: 'Produce Section' },
            { name: 'Lettuce, Tomato & Mustard', gramWeight: 100, baseNGNCost: 320, protein: 2, carbs: 8, fat: 1, fiber: 3, sourcingLocation: 'Produce & Condiments' }
          ],
          prepInstructions: [
            'Grill the patty to your preferred doneness and let it rest.',
            'Bake the sweet potato fries until crisp, seasoning with smoked paprika.',
            'Assemble the burger and serve with the fries on the side.'
          ]
        }
      ]
    }
  },

  // ─────────────────────────── CANADA ───────────────────────────
  CA: {
    markets: ['St. Lawrence Market, Toronto', 'Jean-Talon Market, Montreal', 'No Frills / Loblaws'],
    staples: ['Maple oats', 'Poutine', 'Lentils', 'Salmon', 'Yogurt & berries', 'Wild rice'],
    priceIndex: 2.9,
    breakfasts: {
      fish: [
        {
          title: 'Smoked Salmon Bagel with Dill Cream Cheese',
          description: 'Toasted bagel with dill cream cheese, cold-smoked salmon, red onion and capers.',
          visualType: 'oatmeal_parfait',
          style: 'continental',
          proteinSourceType: 'fish',
          calories: 480,
          protein: 30,
          carbs: 44,
          fat: 17,
          fiber: 5,
          cookTimeMinutes: 8,
          readyToEatQuery: 'Smoked Salmon Bagel',
          ingredients: [
            { name: 'Bagel', gramWeight: 110, baseNGNCost: 300, protein: 11, carbs: 54, fat: 1.5, fiber: 3, sourcingLocation: 'Bakery Department' },
            { name: 'Cold-Smoked Salmon', gramWeight: 90, baseNGNCost: 1300, protein: 24, carbs: 0, fat: 5, fiber: 0, sourcingLocation: 'Seafood Counter' },
            { name: 'Dill Cream Cheese & Red Onion', gramWeight: 70, baseNGNCost: 420, protein: 6, carbs: 5, fat: 11, fiber: 1, sourcingLocation: 'Dairy & Produce' }
          ],
          prepInstructions: [
            'Toast the bagel halves until crisp.',
            'Spread the dill cream cheese thickly.',
            'Layer with salmon, thin red onion and a few capers.'
          ]
        }
      ],
      poultry: [
        {
          title: 'Maple Chicken Breakfast Wrap',
          description: 'Griddled maple-chicken strips with scrambled egg and spinach in a wholewheat wrap.',
          visualType: 'yam_egg_skillet',
          style: 'continental',
          proteinSourceType: 'poultry',
          calories: 550,
          protein: 40,
          carbs: 46,
          fat: 20,
          fiber: 6,
          cookTimeMinutes: 18,
          readyToEatQuery: 'Chicken Breakfast Wrap',
          ingredients: [
            { name: 'Chicken Strips', gramWeight: 130, baseNGNCost: 1000, protein: 30, carbs: 0, fat: 4, fiber: 0, sourcingLocation: 'Meat Counter' },
            { name: 'Eggs', gramWeight: 110, baseNGNCost: 470, protein: 16, carbs: 1, fat: 10, fiber: 0, sourcingLocation: 'Dairy & Eggs' },
            { name: 'Wholewheat Wrap', gramWeight: 70, baseNGNCost: 260, protein: 5, carbs: 30, fat: 4, fiber: 5, sourcingLocation: 'Bakery Department' },
            { name: 'Baby Spinach & Maple Syrup', gramWeight: 90, baseNGNCost: 400, protein: 3, carbs: 8, fat: 3, fiber: 2, sourcingLocation: 'Produce & Baking' }
          ],
          prepInstructions: [
            'Glaze the chicken with maple syrup and pepper, then griddle until caramelised.',
            'Scramble the eggs with wilted spinach.',
            'Fill the warmed wrap, roll tightly and toast the seam.'
          ]
        }
      ],
      eggs_dairy: [
        {
          title: 'Shakshuka with Feta & Sourdough',
          description: 'Eggs poached in a spiced tomato and pepper sauce, finished with feta and torn sourdough for dipping.',
          visualType: 'stew_swallow',
          style: 'continental',
          proteinSourceType: 'eggs_dairy',
          calories: 510,
          protein: 26,
          carbs: 40,
          fat: 24,
          fiber: 7,
          cookTimeMinutes: 25,
          readyToEatQuery: 'Shakshuka',
          ingredients: [
            { name: 'Eggs', gramWeight: 140, baseNGNCost: 600, protein: 20, carbs: 1, fat: 13, fiber: 0, sourcingLocation: 'Dairy & Eggs' },
            { name: 'Tomato & Pepper Sauce', gramWeight: 200, baseNGNCost: 500, protein: 6, carbs: 18, fat: 8, fiber: 6, sourcingLocation: 'Produce Section' },
            { name: 'Feta & Sourdough', gramWeight: 90, baseNGNCost: 520, protein: 12, carbs: 34, fat: 8, fiber: 4, sourcingLocation: 'Dairy & Bakery' }
          ],
          prepInstructions: [
            'Simmer diced tomato, onion and pepper with cumin and paprika until thick.',
            'Make wells and poach the eggs until the whites are set but the yolks still run.',
            'Crumble over the feta and serve with toasted sourdough.'
          ]
        }
      ],
      legumes_plant: [
        {
          title: 'Yogurt, Wild Rice & Berry Parfait',
          description: 'Greek yogurt layered with maple-cinnamon wild rice, berries and pumpkin seeds for crunch.',
          visualType: 'oatmeal_parfait',
          style: 'continental',
          proteinSourceType: 'legumes_plant',
          calories: 470,
          protein: 24,
          carbs: 60,
          fat: 12,
          fiber: 10,
          cookTimeMinutes: 10,
          readyToEatQuery: 'Yogurt Berry Parfait',
          ingredients: [
            { name: 'Greek Yogurt', gramWeight: 210, baseNGNCost: 570, protein: 21, carbs: 13, fat: 5, fiber: 0, sourcingLocation: 'Dairy Department' },
            { name: 'Wild Rice with Maple & Cinnamon', gramWeight: 140, baseNGNCost: 480, protein: 6, carbs: 30, fat: 1, fiber: 4, sourcingLocation: 'Grain Aisle' },
            { name: 'Mixed Berries', gramWeight: 100, baseNGNCost: 560, protein: 1, carbs: 14, fat: 0.4, fiber: 5, sourcingLocation: 'Produce Section' },
            { name: 'Pumpkin Seeds', gramWeight: 15, baseNGNCost: 220, protein: 5, carbs: 1, fat: 5, fiber: 1, sourcingLocation: 'Nut & Bulk Aisle' }
          ],
          prepInstructions: [
            'Warm the wild rice with maple syrup and cinnamon.',
            'Layer yogurt, rice and berries in a glass.',
            'Finish with pumpkin seeds.'
          ]
        }
      ],
      beef_lean: [
        {
          title: 'Peanut Butter Toast with Banana & Egg',
          description: 'Wholegrain toast with natural peanut butter, banana and a soft-boiled egg on the side.',
          visualType: 'oatmeal_parfait',
          style: 'continental',
          proteinSourceType: 'beef_lean',
          calories: 560,
          protein: 30,
          carbs: 58,
          fat: 20,
          fiber: 9,
          cookTimeMinutes: 12,
          readyToEatQuery: 'Peanut Butter Toast and Egg',
          ingredients: [
            { name: 'Lean Beef (Pepper Steak)', gramWeight: 90, baseNGNCost: 1200, protein: 24, carbs: 0, fat: 5, fiber: 0, sourcingLocation: 'Meat Counter' },
            { name: 'Wholegrain Bread', gramWeight: 80, baseNGNCost: 280, protein: 7, carbs: 32, fat: 3, fiber: 5, sourcingLocation: 'Bakery Department' },
            { name: 'Natural Peanut Butter', gramWeight: 25, baseNGNCost: 300, protein: 7, carbs: 7, fat: 8, fiber: 2, sourcingLocation: 'Baking & Spreads' },
            { name: 'Soft-Boiled Egg & Banana', gramWeight: 130, baseNGNCost: 450, protein: 10, carbs: 20, fat: 6, fiber: 3, sourcingLocation: 'Dairy & Produce' }
          ],
          prepInstructions: [
            'Toast the bread and spread with peanut butter.',
            'Top with sliced banana and a pinch of sea salt.',
            'Serve with the soft-boiled egg and seared pepper steak.'
          ]
        }
      ]
    },
    mains: {
      fish: [
        {
          title: 'Maple Glazed Atlantic Salmon with Wild Rice',
          description: 'Roasted salmon lacquered with maple and soy, served with wild rice and charred market vegetables.',
          visualType: 'grilled_fish',
          style: 'continental',
          proteinSourceType: 'fish',
          calories: 640,
          protein: 46,
          carbs: 52,
          fat: 22,
          fiber: 8,
          cookTimeMinutes: 35,
          readyToEatQuery: 'Maple Glazed Salmon',
          ingredients: [
            { name: 'Atlantic Salmon Fillet', gramWeight: 180, baseNGNCost: 2100, protein: 40, carbs: 0, fat: 13, fiber: 0, sourcingLocation: 'Seafood Counter' },
            { name: 'Wild Rice', gramWeight: 180, baseNGNCost: 620, protein: 10, carbs: 40, fat: 2, fiber: 4, sourcingLocation: 'Grain Aisle' },
            { name: 'Roasted Root Vegetables', gramWeight: 170, baseNGNCost: 450, protein: 4, carbs: 30, fat: 3, fiber: 7, sourcingLocation: 'Produce Section' },
            { name: 'Maple & Soy Glaze', gramWeight: 25, baseNGNCost: 300, protein: 2, carbs: 12, fat: 0.4, fiber: 0, sourcingLocation: 'Condiments & Baking' }
          ],
          prepInstructions: [
            'Roast the salmon and brush with maple-soy glaze in the last five minutes.',
            'Cook the wild rice until tender and nutty.',
            'Plate with roasted root vegetables and a final glaze drizzle.'
          ]
        }
      ],
      poultry: [
        {
          title: 'Chicken Tikka Masala with Basmati',
          description: 'Charred yogurt-marinated chicken in a spiced tomato-cream gravy, served with basmati rice.',
          visualType: 'stew_swallow',
          style: 'continental',
          proteinSourceType: 'poultry',
          calories: 670,
          protein: 46,
          carbs: 58,
          fat: 26,
          fiber: 6,
          cookTimeMinutes: 40,
          readyToEatQuery: 'Chicken Tikka Masala',
          ingredients: [
            { name: 'Chicken Thighs', gramWeight: 170, baseNGNCost: 1150, protein: 38, carbs: 0, fat: 10, fiber: 0, sourcingLocation: 'Meat Counter' },
            { name: 'Tomato-Cream Masala Sauce', gramWeight: 180, baseNGNCost: 650, protein: 8, carbs: 14, fat: 16, fiber: 4, sourcingLocation: 'Condiments & Produce' },
            { name: 'Basmati Rice', gramWeight: 200, baseNGNCost: 520, protein: 6, carbs: 62, fat: 0.5, fiber: 2, sourcingLocation: 'Grain Aisle' },
            { name: 'Coriander & Yoghurt', gramWeight: 30, baseNGNCost: 200, protein: 2, carbs: 2, fat: 3, fiber: 0, sourcingLocation: 'Produce & Dairy' }
          ],
          prepInstructions: [
            'Marinate the chicken in yogurt with garam masala and char in a hot pan.',
            'Simmer the charred chicken in a tomato, cream and spice gravy.',
            'Serve over basmati rice, finished with coriander and a yogurt drizzle.'
          ]
        }
      ],
      eggs_dairy: [
        {
          title: 'Fresh Pasta with Mushroom Alfredo',
          description: 'Fettuccine in a garlic-parmesan cream sauce with pan-seared mushrooms and cracked pepper.',
          visualType: 'pasta_medley',
          style: 'continental',
          proteinSourceType: 'eggs_dairy',
          calories: 660,
          protein: 28,
          carbs: 68,
          fat: 28,
          fiber: 5,
          cookTimeMinutes: 22,
          readyToEatQuery: 'Mushroom Alfredo Pasta',
          ingredients: [
            { name: 'Fettuccine', gramWeight: 200, baseNGNCost: 420, protein: 8, carbs: 62, fat: 2, fiber: 4, sourcingLocation: 'Grain & Pasta Aisle' },
            { name: 'Sliced Mushrooms', gramWeight: 150, baseNGNCost: 500, protein: 5, carbs: 8, fat: 2, fiber: 3, sourcingLocation: 'Produce Section' },
            { name: 'Cream & Parmesan Sauce', gramWeight: 90, baseNGNCost: 620, protein: 8, carbs: 6, fat: 18, fiber: 0, sourcingLocation: 'Dairy Department' },
            { name: 'Garlic & Black Pepper', gramWeight: 15, baseNGNCost: 180, protein: 1, carbs: 3, fat: 1, fiber: 0, sourcingLocation: 'Produce & Spice Aisle' }
          ],
          prepInstructions: [
            'Sear the mushrooms in a hot pan until browned and dry.',
            'Whisk garlic into the cream and parmesan to a smooth sauce.',
            'Toss the pasta through, then finish with cracked black pepper.'
          ]
        }
      ],
      legumes_plant: [
        {
          title: 'Lentil Shepherd’s Pie with Maple Peas',
          description: 'A vegetable and lentil casserole topped with mashed potato and baked until golden.',
          visualType: 'stew_swallow',
          style: 'continental',
          proteinSourceType: 'legumes_plant',
          calories: 590,
          protein: 26,
          carbs: 78,
          fat: 14,
          fiber: 18,
          cookTimeMinutes: 50,
          readyToEatQuery: 'Lentil Shepherds Pie',
          ingredients: [
            { name: 'Green Lentils', gramWeight: 160, baseNGNCost: 450, protein: 15, carbs: 30, fat: 1, fiber: 12, sourcingLocation: 'Bulk & Dry Goods' },
            { name: 'Mashed Potato Topping', gramWeight: 220, baseNGNCost: 480, protein: 5, carbs: 48, fat: 8, fiber: 5, sourcingLocation: 'Produce Section' },
            { name: 'Carrot, Celery & Peas', gramWeight: 160, baseNGNCost: 400, protein: 6, carbs: 26, fat: 2, fiber: 8, sourcingLocation: 'Produce Section' }
          ],
          prepInstructions: [
            'Simmer the lentils with carrot, celery and peas in a rich vegetable stock.',
            'Top with mashed potato and brush with milk or butter.',
            'Bake until the topping is golden and the filling bubbles.'
          ]
        }
      ],
      beef_lean: [
        {
          title: 'Maple Beef Stir-Fry with Noodles',
          description: 'Seared lean beef strips in a maple, ginger and soy glaze over stir-fried noodles and broccoli.',
          visualType: 'chicken_salad',
          style: 'continental',
          proteinSourceType: 'beef_lean',
          calories: 630,
          protein: 42,
          carbs: 62,
          fat: 18,
          fiber: 7,
          cookTimeMinutes: 25,
          readyToEatQuery: 'Beef Stir Fry Noodles',
          ingredients: [
            { name: 'Lean Beef Strips', gramWeight: 150, baseNGNCost: 1650, protein: 36, carbs: 0, fat: 8, fiber: 0, sourcingLocation: 'Meat Counter' },
            { name: 'Egg Noodles', gramWeight: 190, baseNGNCost: 450, protein: 9, carbs: 58, fat: 3, fiber: 4, sourcingLocation: 'Grain & Pasta Aisle' },
            { name: 'Broccoli & Bell Pepper', gramWeight: 180, baseNGNCost: 450, protein: 6, carbs: 22, fat: 2, fiber: 8, sourcingLocation: 'Produce Section' },
            { name: 'Maple, Ginger & Soy Glaze', gramWeight: 30, baseNGNCost: 350, protein: 3, carbs: 14, fat: 0.5, fiber: 1, sourcingLocation: 'Condiments & Baking' }
          ],
          prepInstructions: [
            'Sear the beef over high heat until caramelised, then remove.',
            'Stir-fry the vegetables until bright and just tender.',
            'Return the beef, add the glaze and noodles, and toss until glossy.'
          ]
        }
      ]
    }
  },

  // ─────────────────────────── UNITED KINGDOM ───────────────────────────
  UK: {
    markets: ['Borough Market, London', 'Brixton Market, London', 'Bullring Open Market, Birmingham', 'Lidl / Tesco'],
    staples: ['Porridge oats', 'Fish & chips', 'Beans on toast', 'Shepherd’s pie', 'Root veg', 'Yorkshire pudding'],
    priceIndex: 4.7,
    breakfasts: {
      fish: [
        {
          title: 'Kippers & Buttered Toast',
          description: 'Traditional smoked kippers fillets grilled crisp, served with buttered toast and squeeze of lemon.',
          visualType: 'grilled_fish',
          style: 'continental',
          proteinSourceType: 'fish',
          calories: 480,
          protein: 34,
          carbs: 38,
          fat: 18,
          fiber: 5,
          cookTimeMinutes: 12,
          readyToEatQuery: 'Kippers and Toast',
          ingredients: [
            { name: 'Smoked Kippers', gramWeight: 120, baseNGNCost: 1200, protein: 28, carbs: 0, fat: 9, fiber: 0, sourcingLocation: 'Fishmonger' },
            { name: 'Sourdough Toast', gramWeight: 80, baseNGNCost: 300, protein: 5, carbs: 36, fat: 3, fiber: 3, sourcingLocation: 'Bakery' },
            { name: 'Butter & Lemon', gramWeight: 15, baseNGNCost: 180, protein: 0, carbs: 1, fat: 12, fiber: 0, sourcingLocation: 'Dairy Aisle' }
          ],
          prepInstructions: [
            'Grill the kippers under a high heat until crisp and bronzed.',
            'Butter the toast while it is still hot.',
            'Serve the kippers on the toast with a wedge of lemon.'
          ]
        }
      ],
      poultry: [
        {
          title: 'Chicken Porridge with Toast',
          description: 'Savoury porridge with shredded chicken, leek and parsley, served with buttered toast.',
          visualType: 'oatmeal_parfait',
          style: 'continental',
          proteinSourceType: 'poultry',
          calories: 520,
          protein: 36,
          carbs: 58,
          fat: 14,
          fiber: 7,
          cookTimeMinutes: 18,
          readyToEatQuery: 'Chicken Porridge',
          ingredients: [
            { name: 'Shredded Chicken Breast', gramWeight: 130, baseNGNCost: 1000, protein: 30, carbs: 0, fat: 3, fiber: 0, sourcingLocation: 'Poultry Counter' },
            { name: 'Rolled Oats', gramWeight: 80, baseNGNCost: 220, protein: 10, carbs: 54, fat: 4, fiber: 6, sourcingLocation: 'Breakfast Aisle' },
            { name: 'Leek, Celery & Stock', gramWeight: 150, baseNGNCost: 300, protein: 3, carbs: 12, fat: 2, fiber: 4, sourcingLocation: 'Produce Section' },
            { name: 'Buttered Toast', gramWeight: 50, baseNGNCost: 180, protein: 2, carbs: 20, fat: 3, fiber: 2, sourcingLocation: 'Bakery' }
          ],
          prepInstructions: [
            'Sweat the leek and celery in butter until soft.',
            'Stir in the oats and stock and simmer until thick.',
            'Fold through the shredded chicken, season, and serve with buttered toast.'
          ]
        }
      ],
      eggs_dairy: [
        {
          title: 'Scrambled Eggs on Muffin Toast',
          description: 'Soft creamy scrambled eggs with chives piled onto toasted English muffins.',
          visualType: 'yam_egg_skillet',
          style: 'continental',
          proteinSourceType: 'eggs_dairy',
          calories: 500,
          protein: 28,
          carbs: 36,
          fat: 26,
          fiber: 4,
          cookTimeMinutes: 12,
          readyToEatQuery: 'Scrambled Eggs on Toast',
          ingredients: [
            { name: 'Eggs', gramWeight: 150, baseNGNCost: 620, protein: 21, carbs: 1, fat: 14, fiber: 0, sourcingLocation: 'Dairy & Eggs' },
            { name: 'English Muffins', gramWeight: 90, baseNGNCost: 320, protein: 7, carbs: 36, fat: 5, fiber: 4, sourcingLocation: 'Bakery' },
            { name: 'Butter & Chives', gramWeight: 20, baseNGNCost: 200, protein: 1, carbs: 1, fat: 12, fiber: 0, sourcingLocation: 'Produce & Dairy' }
          ],
          prepInstructions: [
            'Beat the eggs with a splash of milk and cook over low heat, stirring, until just set.',
            'Fold in chopped chives and season.',
            'Pile onto toasted, buttered English muffins.'
          ]
        }
      ],
      legumes_plant: [
        {
          title: 'Oat Porridge with Berries & Compote',
          description: 'Creamy Scottish-style porridge topped with stewed seasonal fruit and toasted almonds.',
          visualType: 'oatmeal_parfait',
          style: 'continental',
          proteinSourceType: 'legumes_plant',
          calories: 460,
          protein: 18,
          carbs: 68,
          fat: 12,
          fiber: 10,
          cookTimeMinutes: 12,
          readyToEatQuery: 'Oat Porridge with Berries',
          ingredients: [
            { name: 'Rolled Oats', gramWeight: 80, baseNGNCost: 220, protein: 10, carbs: 54, fat: 4, fiber: 6, sourcingLocation: 'Breakfast Aisle' },
            { name: 'Whole Milk', gramWeight: 180, baseNGNCost: 250, protein: 6, carbs: 9, fat: 6, fiber: 0, sourcingLocation: 'Dairy Aisle' },
            { name: 'Stewed Berries', gramWeight: 110, baseNGNCost: 520, protein: 1, carbs: 16, fat: 0.4, fiber: 5, sourcingLocation: 'Produce Section' },
            { name: 'Toasted Almonds', gramWeight: 15, baseNGNCost: 220, protein: 5, carbs: 2, fat: 5, fiber: 2, sourcingLocation: 'Baking Aisle' }
          ],
          prepInstructions: [
            'Simmer the oats in milk, stirring, until thick and creamy.',
            'Stew the berries with a spoonful of sugar until glossy.',
            'Serve topped with the compote and almonds.'
          ]
        }
      ],
      beef_lean: [
        {
          title: 'Beef Toastie with Tomato & Cheddar',
          description: 'Lean corned beef and mature cheddar grilled in buttered bread with tomato chutney.',
          visualType: 'chicken_salad',
          style: 'continental',
          proteinSourceType: 'beef_lean',
          calories: 560,
          protein: 36,
          carbs: 48,
          fat: 23,
          fiber: 5,
          cookTimeMinutes: 12,
          readyToEatQuery: 'Beef Toastie',
          ingredients: [
            { name: 'Lean Corned Beef', gramWeight: 110, baseNGNCost: 1100, protein: 30, carbs: 0, fat: 5, fiber: 0, sourcingLocation: 'Deli Counter' },
            { name: 'Mature Cheddar', gramWeight: 40, baseNGNCost: 500, protein: 10, carbs: 1, fat: 13, fiber: 0, sourcingLocation: 'Dairy Aisle' },
            { name: 'White Bread', gramWeight: 80, baseNGNCost: 220, protein: 6, carbs: 40, fat: 3, fiber: 3, sourcingLocation: 'Bakery' },
            { name: 'Butter & Tomato Chutney', gramWeight: 25, baseNGNCost: 280, protein: 0, carbs: 10, fat: 6, fiber: 1, sourcingLocation: 'Condiments' }
          ],
          prepInstructions: [
            'Butter the bread and layer with corned beef, cheddar and chutney.',
            'Griddle the toastie until the cheese melts and the bread is crisp.',
            'Rest briefly, then cut on the diagonal.'
          ]
        }
      ]
    },
    mains: {
      fish: [
        {
          title: 'Fish & Chips with Mushy Peas & Tartar Sauce',
          description: 'Beer-battered cod fillets with hand-cut chips, mushy peas and a lemon tartare sauce.',
          visualType: 'stew_swallow',
          style: 'continental',
          proteinSourceType: 'fish',
          calories: 780,
          protein: 40,
          carbs: 82,
          fat: 32,
          fiber: 9,
          cookTimeMinutes: 45,
          readyToEatQuery: 'Fish and Chips',
          ingredients: [
            { name: 'Beer-Battered Cod', gramWeight: 200, baseNGNCost: 1600, protein: 32, carbs: 34, fat: 12, fiber: 2, sourcingLocation: 'Fishmonger' },
            { name: 'Hand-Cut Chips', gramWeight: 220, baseNGNCost: 500, protein: 5, carbs: 62, fat: 16, fiber: 5, sourcingLocation: 'Produce Section' },
            { name: 'Mushy Peas & Tartar Sauce', gramWeight: 120, baseNGNCost: 450, protein: 4, carbs: 14, fat: 6, fiber: 5, sourcingLocation: 'Frozen & Condiments' }
          ],
          prepInstructions: [
            'Coat the cod in spiced beer batter and fry until crisp and golden.',
            'Double-cook the chips for fluffiness and crispness.',
            'Serve with mushy peas, salt, vinegar and tartar sauce.'
          ]
        }
      ],
      poultry: [
        {
          title: 'Sunday Roast Chicken with Roast Potatoes',
          description: 'Roast chicken breast with crisp roast potatoes, seasonal vegetables and pan gravy.',
          visualType: 'chicken_salad',
          style: 'continental',
          proteinSourceType: 'poultry',
          calories: 700,
          protein: 50,
          carbs: 62,
          fat: 26,
          fiber: 8,
          cookTimeMinutes: 60,
          readyToEatQuery: 'Sunday Roast Chicken',
          ingredients: [
            { name: 'Roast Chicken Breast', gramWeight: 170, baseNGNCost: 1300, protein: 44, carbs: 0, fat: 8, fiber: 0, sourcingLocation: 'Poultry Counter' },
            { name: 'Roast Potatoes', gramWeight: 220, baseNGNCost: 520, protein: 5, carbs: 56, fat: 14, fiber: 6, sourcingLocation: 'Produce Section' },
            { name: 'Roast Seasonal Vegetables', gramWeight: 170, baseNGNCost: 450, protein: 4, carbs: 24, fat: 4, fiber: 7, sourcingLocation: 'Produce Section' },
            { name: 'Pan Gravy', gramWeight: 60, baseNGNCost: 300, protein: 4, carbs: 3, fat: 6, fiber: 0, sourcingLocation: 'Butchery' }
          ],
          prepInstructions: [
            'Roast the chicken on a bed of potatoes until golden and cooked through.',
            'Rest the chicken, then slice and plate with the vegetables.',
            'Finish with pan gravy and fresh thyme.'
          ]
        }
      ],
      eggs_dairy: [
      ],
      legumes_plant: [
        {
          title: 'Bean & Vegetable Curry with Rice',
          description: 'A gently spiced red lentil and mixed vegetable curry finished with coconut milk, served with rice.',
          visualType: 'stew_swallow',
          style: 'continental',
          proteinSourceType: 'legumes_plant',
          calories: 610,
          protein: 26,
          carbs: 82,
          fat: 16,
          fiber: 18,
          cookTimeMinutes: 40,
          readyToEatQuery: 'Lentil Curry with Rice',
          ingredients: [
            { name: 'Red Lentils', gramWeight: 150, baseNGNCost: 400, protein: 15, carbs: 28, fat: 1, fiber: 10, sourcingLocation: 'World Foods Aisle' },
            { name: 'Mixed Vegetables', gramWeight: 180, baseNGNCost: 480, protein: 6, carbs: 28, fat: 3, fiber: 10, sourcingLocation: 'Produce Section' },
            { name: 'Coconut & Tomato Sauce', gramWeight: 100, baseNGNCost: 420, protein: 3, carbs: 12, fat: 10, fiber: 3, sourcingLocation: 'World Foods & Canned' },
            { name: 'Steamed Rice', gramWeight: 190, baseNGNCost: 400, protein: 5, carbs: 62, fat: 0.5, fiber: 2, sourcingLocation: 'Grain Aisle' }
          ],
          prepInstructions: [
            'Sweat the onions and spices, then add lentils, vegetables and stock.',
            'Simmer until the lentils collapse and the curry thickens.',
            'Stir through coconut milk and serve over steamed rice.'
          ]
        }
      ],
      beef_lean: [
        {
          title: 'Beef & Ale Stew with Yorkshire Puddings',
          description: 'Slow-cooked lean beef in a dark ale gravy, served with crisp Yorkshire puddings and greens.',
          visualType: 'stew_swallow',
          style: 'continental',
          proteinSourceType: 'beef_lean',
          calories: 730,
          protein: 46,
          carbs: 58,
          fat: 28,
          fiber: 6,
          cookTimeMinutes: 70,
          readyToEatQuery: 'Beef and Ale Stew',
          ingredients: [
            { name: 'Lean Beef Stewing Steak', gramWeight: 170, baseNGNCost: 1700, protein: 44, carbs: 0, fat: 8, fiber: 0, sourcingLocation: 'Butchery' },
            { name: 'Ale & Onion Gravy', gramWeight: 150, baseNGNCost: 550, protein: 6, carbs: 14, fat: 8, fiber: 1, sourcingLocation: 'Beverages & Produce' },
            { name: 'Yorkshire Puddings', gramWeight: 120, baseNGNCost: 380, protein: 6, carbs: 30, fat: 12, fiber: 1, sourcingLocation: 'Chilled Bakery' },
            { name: 'Wilted Greens', gramWeight: 140, baseNGNCost: 320, protein: 5, carbs: 7, fat: 6, fiber: 5, sourcingLocation: 'Produce Section' }
          ],
          prepInstructions: [
            'Brown the beef, then simmer in ale with onion and herbs until tender.',
            'Bake the Yorkshire puddings in the beef fat until risen and crisp.',
            'Serve the stew with the puddings and greens.'
          ]
        },
        {
          title: 'Shepherd’s Pie with Garden Peas',
          description: 'Minced beef and vegetable filling under a fluffy mashed potato crust, baked until golden.',
          visualType: 'stew_swallow',
          style: 'continental',
          proteinSourceType: 'beef_lean',
          calories: 720,
          protein: 36,
          carbs: 76,
          fat: 28,
          fiber: 10,
          cookTimeMinutes: 55,
          readyToEatQuery: 'Shepherds Pie',
          ingredients: [
            { name: 'Lean Minced Beef', gramWeight: 140, baseNGNCost: 1500, protein: 32, carbs: 0, fat: 8, fiber: 0, sourcingLocation: 'Butchery' },
            { name: 'Mashed Potato Crust', gramWeight: 250, baseNGNCost: 520, protein: 6, carbs: 52, fat: 12, fiber: 6, sourcingLocation: 'Produce Section' },
            { name: 'Carrot, Onion & Peas', gramWeight: 170, baseNGNCost: 450, protein: 7, carbs: 26, fat: 3, fiber: 8, sourcingLocation: 'Produce Section' },
            { name: 'Cheese & Butter', gramWeight: 25, baseNGNCost: 400, protein: 5, carbs: 1, fat: 10, fiber: 0, sourcingLocation: 'Dairy Aisle' }
          ],
          prepInstructions: [
            'Brown the mince with onion, carrot and peas in gravy, then simmer until thick.',
            'Spread into a baking dish and top with mashed potato.',
            'Scatter with cheese, brush with butter and bake until golden and bubbling.'
          ]
        }

      ]
    }
  }
};

/**
 * Identity of a dish for deduplication purposes.
 *
 * The pools were written at different times and mix "&" and "and", so an exact
 * title match treated "Kontomire Stew with Omelette & Rice" and "Kontomire
 * Stew with Omelette and Rice" as two dishes. Both then served in the same
 * plan under different wording. Fold case, the ampersand and punctuation.
 */
export function dishKey(title: string): string {
  return title.toLowerCase().replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, ' ').trim();
}

/**
 * Merge the extra mains into each country catalogue.
 *
 * Every local pool shipped with a single dish per protein, which meant the
 * afternoon and evening slots both resolved index 0 of the same one-item array
 * and rendered an identical plate on all 28 days. Adding further mains gives
 * the rotation something to move through.
 */
function mergeExtraMains(): void {
  for (const [code, pools] of Object.entries(EXTRA_MAINS)) {
    const cuisine = COUNTRY_CUISINES[code as CountryCode];
    if (!cuisine) continue;
    for (const [protein, dishes] of Object.entries(pools)) {
      const pool = cuisine.mains[protein as P];
      if (!pool) continue;
      for (const dish of dishes) {
        if (!pool.some((existing) => dishKey(existing.title) === dishKey(dish.title))) {
          pool.push(dish);
        }
      }
    }
    // Breakfasts were the same single-dish-per-protein story as the mains.
    const extras = COUNTRY_BREAKFAST_EXTRAS[code as CountryCode];
    if (extras) {
      for (const [protein, dishes] of Object.entries(extras)) {
        const pool = cuisine.breakfasts[protein as P];
        if (!pool) continue;
        for (const dish of dishes) {
          if (!pool.some((existing) => dishKey(existing.title) === dishKey(dish.title))) {
            pool.push(dish);
          }
        }
      }
    }
  }
}

mergeExtraMains();

/**
 * Ghana needed its own replacement layer, because the extras above had been
 * written from memory rather than sourced: they had chicken katsu, coleslaw,
 * grilled cheese, avocado, beef sandwiches, a dish called "Tomto stew", akara
 * (Nigerian — Ghana's bean fritter is koose, made from peeled cowpeas) and suya
 * beef rolls (suya is Nigerian). Those are gone, and this adds the soups,
 * stews and staples that were missing: kontomire, palm nut, groundnut, light,
 * okro, bra leaf and jute mallow soups, red-red, tubaani, kenkey, fufu, banku,
 * gari, kelewele, and goat, lamb and cow skin alongside the fish and poultry.
 */
function mergeGhanaAuthenticPools(): void {
  const cuisine = COUNTRY_CUISINES.GH;
  if (!cuisine) return;
  const targets: Array<[keyof typeof GHANA_AUTHENTIC_POOLS, Record<P, MealBlueprint[]>]> = [
    ['breakfasts', cuisine.breakfasts],
    ['mains', cuisine.mains]
  ];
  for (const [slot, pool] of targets) {
    for (const [protein, dishes] of Object.entries(GHANA_AUTHENTIC_POOLS[slot])) {
      const bucket = pool[protein as P];
      if (!bucket) continue;
      for (const dish of dishes) {
        if (!bucket.some((existing) => dishKey(existing.title) === dishKey(dish.title))) {
          bucket.push(dish);
        }
      }
    }
  }
}

mergeGhanaAuthenticPools();

/**
 * Resolve which pools feed the generator for a given country + preference.
 *
 * Nigeria keeps its existing indigenous/continental pools. Every other country
 * uses its own local catalogue for "local" styles and falls back to the
 * continental pools when the user explicitly asks for western meal prep.
 *
 * Afternoon and evening are handed back separately so the generator can walk
 * two different offsets through the same pool; returning one shared pool made
 * the two slots always land on the same dish.
 */
export function resolveCuisineSources(
  countryCode: CountryCode,
  morningStyle: 'indigenous' | 'continental',
  afternoonStyle: 'indigenous' | 'continental'
): {
  morning: Record<P, MealBlueprint[]> | null;
  afternoon: Record<P, MealBlueprint[]> | null;
  evening: Record<P, MealBlueprint[]> | null;
} {
  const cuisine = COUNTRY_CUISINES[countryCode];
  if (!cuisine) return { morning: null, afternoon: null, evening: null };
  return {
    morning: morningStyle === 'indigenous' ? cuisine.breakfasts : null,
    afternoon: afternoonStyle === 'indigenous' ? cuisine.mains : null,
    evening: afternoonStyle === 'indigenous' ? cuisine.mains : null
  };
}

/**
 * Stage-4 onboarding copy for the "local staples" choice. Nigeria is included
 * here even though its meals live in the built-in rotationPlans pools, so the
 * onboarding stage always describes the country the user actually picked.
 */
export const LOCAL_STAPLE_COPY: Record<CountryCode, { label: string; staples: string[] }> = {
  NG: {
    label: 'Indigenous Farm Staples',
    staples: ['Garri', 'Yam', 'Plantain', 'Beans', 'Catfish', 'Egusi']
  },
  GH: {
    label: 'Ghanaian Market Staples',
    staples: ['Waakye', 'Banku', 'Fufu', 'Jollof', 'Tomato stew', 'Shito']
  },
  KE: {
    label: 'Kenyan Market Staples',
    staples: ['Ugali', 'Sukuma wiki', 'Pilau', 'Githeri', 'Tilapia', 'Chapati']
  },
  US: {
    label: 'American Market Staples',
    staples: ['Bagels & lox', 'Salmon', 'Eggs & sourdough', 'Chicken breast', 'Sweet potato', 'Quinoa']
  },
  CA: {
    label: 'Canadian Market Staples',
    staples: ['Maple & salmon', 'Wild rice', 'Bagels', 'Poutine potatoes', 'Chicken', 'Lentils']
  },
  UK: {
    label: 'British Market Staples',
    staples: ['Porridge', 'Kippers', 'Yorkshire pudding', 'Shepherd’s pie', 'Chicken', 'Beans']
  }
};
