import { UserProfile, CleverBadge, DailyQuest, CommunityChallenge } from '../types';

export interface ChefTierInfo {
  level: number;
  title: string;
  badgeEmoji: string;
  minXp: number;
  maxXp: number;
  perk: string;
}

export const CHEF_TIERS: ChefTierInfo[] = [
  {
    level: 1,
    title: 'Kitchen Scout',
    badgeEmoji: '🥄',
    minXp: 0,
    maxXp: 150,
    perk: 'Unlocks Daily Habit Quests & Magic Byte Camera'
  },
  {
    level: 2,
    title: 'Macro Apprentice',
    badgeEmoji: '🔍',
    minXp: 150,
    maxXp: 350,
    perk: 'Unlocks Hand-Size Portion Estimator'
  },
  {
    level: 3,
    title: 'Market Strategist',
    badgeEmoji: '🛒',
    minXp: 350,
    maxXp: 650,
    perk: 'Unlocks Saturday Open-Market Run List'
  },
  {
    level: 4,
    title: 'Big Pot Alchemist',
    badgeEmoji: '🍲',
    minXp: 650,
    maxXp: 1050,
    perk: 'Unlocks Big Pot Freezer Vault Stash'
  },
  {
    level: 5,
    title: 'Inflation Slayer',
    badgeEmoji: '⚔️',
    minXp: 1050,
    maxXp: 1550,
    perk: 'Unlocks Advanced 1-Tap Inflation Swap Matrix'
  },
  {
    level: 6,
    title: 'Pantry Sorcerer',
    badgeEmoji: '🔄',
    minXp: 1550,
    maxXp: 2150,
    perk: 'Unlocks Instant Fridge Rescue Engine'
  },
  {
    level: 7,
    title: 'Clever Masterchef',
    badgeEmoji: '👨‍🍳',
    minXp: 2150,
    maxXp: 3000,
    perk: 'Unlocks AI Gastronomic Visual Plating Masterclass'
  },
  {
    level: 8,
    title: 'Sovereign Nutrition Legend',
    badgeEmoji: '👑',
    minXp: 3000,
    maxXp: 5000,
    perk: 'Highest Distinction: Platinum Chef of CleverDish'
  }
];

export const getChefTier = (xp: number): ChefTierInfo => {
  for (let i = CHEF_TIERS.length - 1; i >= 0; i--) {
    if (xp >= CHEF_TIERS[i].minXp) {
      return CHEF_TIERS[i];
    }
  }
  return CHEF_TIERS[0];
};

export const getNextTier = (xp: number): ChefTierInfo | null => {
  const current = getChefTier(xp);
  const next = CHEF_TIERS.find(t => t.level === current.level + 1);
  return next || null;
};

export const INITIAL_BADGES: CleverBadge[] = [
  {
    id: 'first_flame',
    title: 'First Flame 🔥',
    tier: 'bronze',
    icon: '🔥',
    description: 'Log your first daily meal ritual.',
    lore: 'Every legendary masterchef begins with their first deliberate plate.',
    progress: 1,
    maxProgress: 1,
    isUnlocked: true,
    unlockedAt: 'Unlocked',
    rewardXp: 50
  },
  {
    id: 'plate_verifier',
    title: 'Plate Authenticator 📸',
    tier: 'silver',
    icon: '📸',
    description: 'Authenticate 3 meals with live plate photos.',
    lore: 'Zero-dep magic byte verification confirms you eat real food, not empty promises.',
    progress: 1,
    maxProgress: 3,
    isUnlocked: false,
    rewardXp: 75
  },
  {
    id: 'vault_custodian',
    title: 'Vault Custodian ❄️',
    tier: 'gold',
    icon: '❄️',
    description: 'Stash or defrost 3 meals in the Big Pot Freezer Vault.',
    lore: 'True culinary wealth is having 4 prepped portions ready in 5 minutes at zero grocery spend.',
    progress: 1,
    maxProgress: 3,
    isUnlocked: false,
    rewardXp: 100
  },
  {
    id: 'inflation_ninja',
    title: 'Inflation Slayer ⚔️',
    tier: 'silver',
    icon: '🛡️',
    description: 'Complete an Inflation Swap or check open-market price cuts.',
    lore: 'Defeating rising retail prices by sourcing high-protein local staples.',
    progress: 1,
    maxProgress: 1,
    isUnlocked: true,
    unlockedAt: 'Unlocked',
    rewardXp: 60
  },
  {
    id: 'market_runner',
    title: 'Wholesale Mogul 🛒',
    tier: 'silver',
    icon: '🛒',
    description: 'Open the Saturday Market Run or share buying list on WhatsApp.',
    lore: 'Buying in crates and congos directly from open-market stalls saves ~18% every week.',
    progress: 0,
    maxProgress: 1,
    isUnlocked: false,
    rewardXp: 60
  },
  {
    id: 'hand_master',
    title: 'Master of the Palm 🖐️',
    tier: 'bronze',
    icon: '🖐️',
    description: 'Consult the Hand-Size Portion Guide for scale-free eating.',
    lore: 'Your hand is a custom sports nutrition scale you carry everywhere.',
    progress: 1,
    maxProgress: 1,
    isUnlocked: true,
    unlockedAt: 'Unlocked',
    rewardXp: 40
  },
  {
    id: 'streak_titan',
    title: '7-Day Habit Titan ⚡',
    tier: 'gold',
    icon: '⚡',
    description: 'Sustain a 7-day uninterrupted eating streak.',
    lore: 'Seven consecutive days of nutritional discipline puts you in the top 5% of eaters.',
    progress: 4,
    maxProgress: 7,
    isUnlocked: false,
    rewardXp: 150
  },
  {
    id: 'sovereign_chef',
    title: 'Sovereign Legend 👑',
    tier: 'diamond',
    icon: '👑',
    description: 'Reach Level 5 (Clever Masterchef) and complete 10 daily quests.',
    lore: 'The ultimate pinnacle of CleverDish mastery—unyielding discipline and market genius.',
    progress: 2,
    maxProgress: 10,
    isUnlocked: false,
    rewardXp: 300
  }
];

export const getDefaultDailyQuests = (): DailyQuest[] => [
  {
    id: 'quest_morning',
    title: 'Morning Fuel Anchor 🌅',
    description: 'Authenticate breakfast plate photo or review prep steps',
    xpReward: 50,
    isCompleted: false,
    icon: '🌅',
    actionKey: 'photo_plate'
  },
  {
    id: 'quest_market',
    title: 'Market & Budget Mastery 🛒',
    description: 'Open Saturday Market Run or inspect ingredient prices',
    xpReward: 50,
    isCompleted: false,
    icon: '🛒',
    actionKey: 'market_view'
  },
  {
    id: 'quest_vault',
    title: 'Freezer Stash or Rescue 🍲',
    description: 'Scale a pot for the freezer vault or test a fridge rescue',
    xpReward: 60,
    isCompleted: false,
    icon: '🍲',
    actionKey: 'vault_stash'
  }
];

export const getDefaultChallenges = (): CommunityChallenge[] => [
  {
    id: 'challenge_meatless',
    title: '7-Day Meatless Streak',
    subtitle: 'Indigenous plant-protein power: beans, moin-moin, egusi & lentils',
    icon: '🥗',
    category: 'plant_based',
    description: 'Nourish your body for 7 days with rich African plant-protein staples. Swap poultry and red meats for moin-moin, honey beans with plantain, egusi with wild mushrooms, or spiced lentil stews.',
    guidelines: [
      'Zero red meat, chicken, or pork for 7 continuous days.',
      'Hit at least 45g of clean plant-based protein daily.',
      'Authenticate your midday and evening plates via the magic-byte camera.'
    ],
    durationDays: 7,
    currentDays: 4,
    isJoined: true,
    isCompleted: false,
    rewardXp: 250,
    rewardBadge: 'Plant Pioneer 🌿',
  },
  {
    id: 'challenge_budget_mastery',
    title: 'Budget Mastery Month',
    subtitle: '30 days without exceeding your computed daily grocery floor',
    icon: '💰',
    category: 'budget',
    description: 'Beat retail food inflation through disciplined open-market procurement, bulk weekly crates, 1-tap inflation swaps, and zero takeout slip-ups.',
    guidelines: [
      'Keep your daily grocery burn rate below your computed daily floor allowance.',
      'Saturdays: inspect the Saturday Market Run bulk list for ~18% savings.',
      'Cook Big Pot batches and pull zero-cost defrosted meals on hectic weeknights.'
    ],
    durationDays: 30,
    currentDays: 12,
    isJoined: true,
    isCompleted: false,
    rewardXp: 500,
    rewardBadge: 'Budget Sovereign 👑',
  },
  {
    id: 'challenge_big_pot',
    title: 'Big Pot Meal Prep Marathon',
    subtitle: 'Stack the Freezer Vault: prep 3 communal batches',
    icon: '🍲',
    category: 'meal_prep',
    description: 'Transform your weeknight cooking into a high-leverage ritual. Cook 3 large pots (stew, soup, or grain bowl), portion them into airtight containers, and freeze.',
    guidelines: [
      'Cook each pot with at least 4 individual servings.',
      'Store batches into the Big Pot Freezer Vault.',
      'Log at least 2 defrosted 5-minute microwave reheats.'
    ],
    durationDays: 14,
    currentDays: 1,
    isJoined: false,
    isCompleted: false,
    rewardXp: 300,
    rewardBadge: 'Vault Architect ❄️',
  },
  {
    id: 'challenge_photo_blitz',
    title: '14-Day Plate Proof Blitz',
    subtitle: '14 uninterrupted days of zero-dep photo authentications',
    icon: '📸',
    category: 'photo_streak',
    description: 'Adherence is truth. Hold yourself accountable by taking a real plate photo for 14 straight days, verified by our client-side camera magic-byte validator.',
    guidelines: [
      'Take an authentic plate photo before your first bite.',
      'Avoid stock or duplicate photos (anti-tamper byte hash check).',
      'Maintain an unbroken habit streak without missing a day.'
    ],
    durationDays: 14,
    currentDays: 6,
    isJoined: false,
    isCompleted: false,
    rewardXp: 400,
    rewardBadge: 'True Plate Verified 🎖️',
  }
];

