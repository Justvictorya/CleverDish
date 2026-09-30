import { VerifiedVendor } from '../types';

export const VERIFIED_VENDORS: VerifiedVendor[] = [
  // Nigeria Vendors
  {
    id: 'ven_ng_1',
    name: 'Mega Kitchens & Grills (Lekki / Victoria Island)',
    category: 'restaurant',
    city: 'Lagos',
    country: 'NG',
    hygieneScore: 99,
    priceStabilityScore: 96,
    averageMealCost: 3200,
    currency: 'NGN',
    rating: 4.9,
    specialty: 'Smoky Firewood Jollof, Grilled Titus & Ofada Rice',
    partnerUrl: 'https://chowdeck.com/search?q=Mega+Kitchens+Lagos',
    verifiedBadge: true
  },
  {
    id: 'ven_ng_2',
    name: 'Bodija Wholesale Agri-Depot',
    category: 'bulk_grocer',
    city: 'Ibadan',
    country: 'NG',
    hygieneScore: 95,
    priceStabilityScore: 98,
    averageMealCost: 1800,
    currency: 'NGN',
    rating: 4.8,
    specialty: 'Direct Farm Tubers of Yam, Honey Beans & Yellow Garri',
    partnerUrl: 'https://glovoapp.com/ng/en/ibadan/',
    verifiedBadge: true
  },
  {
    id: 'ven_ng_3',
    name: 'Mile 12 Direct Produce Hub',
    category: 'bulk_grocer',
    city: 'Lagos',
    country: 'NG',
    hygieneScore: 94,
    priceStabilityScore: 94,
    averageMealCost: 1500,
    currency: 'NGN',
    rating: 4.7,
    specialty: 'Plum Tomatoes, Rodo, Scotch Bonnets & Plantain Bunches',
    partnerUrl: 'https://chowdeck.com/search?q=Mile+12+Hub',
    verifiedBadge: true
  },
  {
    id: 'ven_ng_4',
    name: 'Utako Fresh Proteins Co-Op',
    category: 'organic_farm',
    city: 'Abuja',
    country: 'NG',
    hygieneScore: 98,
    priceStabilityScore: 97,
    averageMealCost: 2900,
    currency: 'NGN',
    rating: 4.9,
    specialty: 'Crates of Farm Fresh Eggs & Live Scaled Catfish',
    partnerUrl: 'https://food.bolt.eu/en/ng-abuja/',
    verifiedBadge: true
  },

  // US Vendors
  {
    id: 'ven_us_1',
    name: 'Sweetgreen Whole Foods Bar',
    category: 'restaurant',
    city: 'New York',
    country: 'US',
    hygieneScore: 100,
    priceStabilityScore: 92,
    averageMealCost: 15.50,
    currency: 'USD',
    rating: 4.8,
    specialty: 'Warm Quinoa Bowls, Salmon Plates & Protein Greens',
    partnerUrl: 'https://www.ubereats.com/search?q=Sweetgreen',
    verifiedBadge: true
  },
  {
    id: 'ven_us_2',
    name: 'ALDI Community Direct Market',
    category: 'bulk_grocer',
    city: 'National',
    country: 'US',
    hygieneScore: 97,
    priceStabilityScore: 99,
    averageMealCost: 8.20,
    currency: 'USD',
    rating: 4.9,
    specialty: 'Cage-Free Eggs, Steel Cut Oats & Russet Potatoes',
    partnerUrl: 'https://www.doordash.com/search/store/aldi',
    verifiedBadge: true
  },

  // UK Vendors
  {
    id: 'ven_uk_1',
    name: 'Leon Naturally Fast Health Food',
    category: 'restaurant',
    city: 'London',
    country: 'UK',
    hygieneScore: 99,
    priceStabilityScore: 95,
    averageMealCost: 9.80,
    currency: 'GBP',
    rating: 4.8,
    specialty: 'Chargrilled Chicken Aioli Box & Mediterranean Lentils',
    partnerUrl: 'https://deliveroo.co.uk/restaurants/london/centre?q=Leon',
    verifiedBadge: true
  },
  {
    id: 'ven_uk_2',
    name: 'Brixton African & Afro-Caribbean Foods',
    category: 'bulk_grocer',
    city: 'London',
    country: 'UK',
    hygieneScore: 96,
    priceStabilityScore: 93,
    averageMealCost: 6.50,
    currency: 'GBP',
    rating: 4.7,
    specialty: 'Direct Imported White Yam, Plantain & Titus Fish',
    partnerUrl: 'https://deliveroo.co.uk/restaurants/london/brixton?q=Afro+Caribbean',
    verifiedBadge: true
  }
];

export const INGREDIENT_CONVERSIONS = [
  {
    international: 'Asparagus',
    localEquivalent: 'Ugu (Fluted Pumpkin Leaves) or Waterleaf',
    country: 'NG' as const,
    nutritionEquivalence: 'Equal fiber & folate; Ugu delivers 4x iron & antioxidant content',
    costRatio: '₦300 vs ₦3,500 (91% cheaper)',
    culinaryTip: 'Lightly steam for 2 minutes to retain vitamin C and bright chlorophyll.'
  },
  {
    international: 'Russet Potatoes',
    localEquivalent: 'White Yam or Yellow Yam',
    country: 'NG' as const,
    nutritionEquivalence: 'Similar complex starchy carb curve; yam has lower glycemic load and higher potassium',
    costRatio: '₦800 per kg vs ₦2,800 per kg imported potato',
    culinaryTip: 'Boil or air-fry into wedges seasoned with coarse salt and dry pepper.'
  },
  {
    international: 'Organic Quinoa',
    localEquivalent: 'Acha (Fonio Grain) or Nigerian Brown Rice',
    country: 'NG' as const,
    nutritionEquivalence: 'Identical protein density (11g/100g); Acha is rich in methionine & cystine',
    costRatio: '₦1,200 per pack vs ₦5,200 imported quinoa',
    culinaryTip: 'Steam in a fine sieve for 8 minutes; pairs exceptionally with peppered proteins.'
  },
  {
    international: 'Curly Kale',
    localEquivalent: 'Efo Shoko (Lagos Spinach) or Gboma',
    country: 'NG' as const,
    nutritionEquivalence: 'Superior bio-available calcium, vitamins A & K',
    costRatio: '₦200 per bunch vs ₦3,800 imported kale',
    culinaryTip: 'Add at the very last minute of simmering into egusi or vegetable soup.'
  },
  {
    international: 'Greek Strained Yogurt',
    localEquivalent: 'Local Wara (Soya or Fresh Milk Curd)',
    country: 'NG' as const,
    nutritionEquivalence: '20g pure protein per 150g; zero preservatives',
    costRatio: '₦400 vs ₦3,200 imported Greek yogurt',
    culinaryTip: 'Pan-sear lightly or steam with crushed peppers and onions for breakfast.'
  }
];
