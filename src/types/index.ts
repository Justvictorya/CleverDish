export type CountryCode = 'NG' | 'US' | 'UK' | 'GH' | 'KE' | 'CA';

export interface CountryInfo {
  code: CountryCode;
  name: string;
  currency: string;
  currencySymbol: string;
  exchangeRateToUSD: number; // For travel mode & remittance
  flag: string;
  defaultMarkets: string[];
  minimumDailyFloor: number; // Real lower-bound mathematical floor for nutritious food
  deliveryPartners: Array<{
    name: string;
    logo: string;
    urlPrefix: string;
    deepLinkApp: string;
  }>;
}

export type FitnessGoal = 'lose_weight' | 'maintain' | 'gain_muscle';

export type StaplePreference = 'indigenous' | 'continental' | 'balanced';

export interface UserProfile {
  id: string;
  name: string;
  country: CountryCode;
  age: number;
  gender: 'male' | 'female';
  weightKg: number;
  heightCm: number;
  activityLevel: 1.2 | 1.375 | 1.55 | 1.725 | 1.9;
  goal: FitnessGoal;
  staplePreference: StaplePreference;
  budgetPeriod: 'day' | 'week' | 'month';
  budgetAmount: number; // In user's regional currency
  monthlyBudget: number; // Computed regional monthly baseline
  isPro: boolean;
  travelModeActive: boolean;
  homeCountry: CountryCode;
  currentCountry: CountryCode;
  streak: number;
  lastLoggedDate: string | null;
  cleverPoints: number;
  xp?: number;
  level?: number;
  cleverCoins?: number;
  avatar?: string;
  kitchenTitle?: string;
  unlockedBadgeIds?: string[];
  hasOnboarded?: boolean;
  planStartDate?: string;
}

export interface CleverBadge {
  id: string;
  title: string;
  tier: 'bronze' | 'silver' | 'gold' | 'diamond';
  icon: string;
  description: string;
  lore: string;
  progress: number;
  maxProgress: number;
  isUnlocked: boolean;
  unlockedAt?: string;
  rewardXp: number;
}

export interface DailyQuest {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  isCompleted: boolean;
  icon: string;
  actionKey: 'log_meal' | 'photo_plate' | 'vault_stash' | 'market_view' | 'fridge_rescue' | 'hand_guide';
}

export interface LeaderboardEntry {
  rank: number;
  userName: string;
  avatar: string;
  country: CountryCode;
  progressValue: number;
  progressLabel: string;
  scoreXp: number;
  isCurrentUser?: boolean;
}

export interface CommunityChallenge {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  category: 'plant_based' | 'budget' | 'meal_prep' | 'photo_streak';
  description: string;
  guidelines: string[];
  durationDays: number;
  currentDays: number;
  isJoined: boolean;
  isCompleted: boolean;
  rewardXp: number;
  rewardBadge: string;
  participantsCount: number;
  leaderboard: LeaderboardEntry[];
  deadlineDate?: string;
}

export interface MacroTargets {
  bmr: number;
  tdee: number;
  targetCalories: number;
  proteinGrams: number;
  carbsGrams: number;
  fatGrams: number;
  fiberGrams: number;
  goalAdjustmentPct: number;
}

export interface BudgetVerdict {
  dailyAllowance: number;
  minimumDailyFloor: number;
  monthlyBudget: number;
  minimumMonthlyFloor: number;
  isDeficit: boolean;
  deficitPercent: number;
  message: string;
  recommendations: string[];
}

export interface IngredientItem {
  id: string;
  name: string;
  localName?: string;
  gramWeight: number;
  cost: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sourcingLocation: string;
  isPantryAvailable?: boolean;
}

/** Prototype used by the rotation-plan engine before per-country costing. */
export interface MealBlueprint {
  title: string;
  description: string;
  visualType: Meal['visualType'];
  style: Meal['style'];
  proteinSourceType: Meal['proteinSourceType'];
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  cookTimeMinutes: number;
  readyToEatQuery: string;
  ingredients: Array<{
    name: string;
    gramWeight: number;
    baseNGNCost: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
    sourcingLocation: string;
  }>;
  prepInstructions: string[];
}

export interface Meal {
  id: string;
  dayNumber: number; // 1 to 28
  type: 'morning' | 'afternoon' | 'evening';
  title: string;
  description: string;
  proteinSourceType: 'fish' | 'poultry' | 'eggs_dairy' | 'legumes_plant' | 'beef_lean';
  style: 'indigenous' | 'continental';
  visualType: 'jollof_bowl' | 'yam_egg_skillet' | 'oatmeal_parfait' | 'beans_plantain' | 'stew_swallow' | 'chicken_salad' | 'pasta_medley' | 'grilled_fish';
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  estimatedCost: number;
  ingredients: IngredientItem[];
  cookTimeMinutes: number;
  prepInstructions: string[];
  readyToEatDeliveryQuery: string;
  imageUrl?: string;
  foodstuffMarketSourcing?: Array<{
    item: string;
    marketName: string;
    onlineStoreUrl: string;
    onlineStoreName: string;
    unitPrice: string;
  }>;
  photoVerified?: boolean;
  photoUrl?: string;
  isSwapped?: boolean;
  originalCost?: number;
  swapInfo?: {
    swappedIngredient: string;
    newCost: number;
    costSavingsPercent: number;
    rationale: string;
  };
}

export interface PriceSample {
  id: string;
  stapleId: string;
  stapleName: string;
  marketName: string;
  country: CountryCode;
  currency: string;
  price: number;
  reportedBy: string;
  verified: boolean;
  timestamp: number;
}

export interface PriceOverride {
  medianPrice: number;
  sampleCount: number;
  lastUpdated: number;
}

export interface VerifiedVendor {
  id: string;
  name: string;
  category: 'restaurant' | 'bulk_grocer' | 'organic_farm';
  city: string;
  country: CountryCode;
  hygieneScore: number;
  priceStabilityScore: number;
  averageMealCost: number;
  currency: string;
  rating: number;
  specialty: string;
  partnerUrl: string;
  verifiedBadge: boolean;
}

export interface IngredientMapping {
  international: string;
  localEquivalent: string;
  country: CountryCode;
  nutritionEquivalence: string;
  costRatio: string;
  culinaryTip: string;
}

export interface FreezerVaultItem {
  id: string;
  mealId: string;
  mealTitle: string;
  proteinType: string;
  portionsRemaining: number;
  totalPortionsPrepared: number;
  datePrepared: string;
  caloriesPerPortion: number;
  proteinGrams: number;
  carbsGrams: number;
  fatGrams: number;
}
