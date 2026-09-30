import { UserProfile, MacroTargets, BudgetVerdict } from '../types';
import { COUNTRIES } from '../data/countries';

export function calculateMacros(profile: UserProfile): MacroTargets {
  const { weightKg, heightCm, age, gender, activityLevel, goal } = profile;

  // Mifflin-St Jeor Equation
  let bmr = 10 * weightKg + 6.25 * heightCm - 5 * age;
  if (gender === 'male') {
    bmr += 5;
  } else {
    bmr -= 161;
  }

  const tdee = Math.round(bmr * activityLevel);

  // Goal adjustments: -20% cut, maintain 0%, +10% bulk
  let goalMultiplier = 1.0;
  let proteinPerKg = 1.8;

  if (goal === 'lose_weight') {
    goalMultiplier = 0.8; // -20% caloric deficit
    proteinPerKg = 2.1; // Higher protein floor during cut to preserve lean tissue
  } else if (goal === 'gain_muscle') {
    goalMultiplier = 1.1; // +10% surplus
    proteinPerKg = 2.0;
  } else {
    goalMultiplier = 1.0;
    proteinPerKg = 1.8;
  }

  const targetCalories = Math.round(tdee * goalMultiplier);

  // Macro distribution
  const proteinGrams = Math.round(weightKg * proteinPerKg);
  const proteinCalories = proteinGrams * 4;

  // Fat floor: at least 0.8g per kg bodyweight for lipid/endocrine health
  const fatGrams = Math.max(Math.round(weightKg * 0.85), 45);
  const fatCalories = fatGrams * 9;

  // Carbohydrate filler: remaining calories divided by 4 kcal/g
  const remainingCalories = Math.max(targetCalories - (proteinCalories + fatCalories), 400);
  const carbsGrams = Math.round(remainingCalories / 4);

  // Fiber target: 14g per 1,000 kcal
  const fiberGrams = Math.round((targetCalories / 1000) * 14);

  return {
    bmr: Math.round(bmr),
    tdee,
    targetCalories,
    proteinGrams,
    carbsGrams,
    fatGrams,
    fiberGrams,
    goalAdjustmentPct: Math.round((goalMultiplier - 1.0) * 100)
  };
}

export function computeBudgetVerdict(profile: UserProfile): BudgetVerdict {
  const country = COUNTRIES[profile.country] || COUNTRIES.NG;
  const minimumDailyFloor = country.minimumDailyFloor;
  const minimumMonthlyFloor = minimumDailyFloor * 30;

  let dailyAllowance = 0;
  let monthlyBudget = profile.monthlyBudget;

  if (profile.budgetPeriod === 'day') {
    dailyAllowance = profile.budgetAmount;
    monthlyBudget = profile.budgetAmount * 30;
  } else if (profile.budgetPeriod === 'week') {
    dailyAllowance = Math.round(profile.budgetAmount / 7);
    monthlyBudget = Math.round((profile.budgetAmount / 7) * 30);
  } else {
    monthlyBudget = profile.budgetAmount;
    dailyAllowance = Math.round(profile.budgetAmount / 30);
  }

  const isDeficit = dailyAllowance < minimumDailyFloor;
  const deficitPercent = isDeficit
    ? Math.round(((minimumDailyFloor - dailyAllowance) / minimumDailyFloor) * 100)
    : 0;

  let message = '';
  const recommendations: string[] = [];

  if (isDeficit) {
    message = `Mathematical Budget Verdict: Lower-Bound Financial Deficit Detected (${deficitPercent}% below nutritional floor). Baseline cost in ${country.name} for meeting lean protein and complex micronutrient requirements is ${country.currencySymbol}${minimumDailyFloor.toLocaleString()}/day. At ${country.currencySymbol}${dailyAllowance.toLocaleString()}/day, animal protein alone will exhaust ~75% of funds.`;
    recommendations.push('Deploy "Inflation Swap" 🔄: Switch from fresh beef/chicken to farm eggs, catfish, or local soya chunks.');
    recommendations.push('Use Pantry Scanner 📸: Audit leftover dry staples (garri, yam, rice) to reduce cash drain.');
    recommendations.push('Bulk buy at open markets (Mile 12, Bodija, local wet markets) rather than mini-marts.');
  } else {
    const surplus = dailyAllowance - minimumDailyFloor;
    message = `Mathematical Budget Verdict: Healthy Nutritional Solvency. Your daily allowance (${country.currencySymbol}${dailyAllowance.toLocaleString()}) exceeds the regional baseline floor (${country.currencySymbol}${minimumDailyFloor.toLocaleString()}) by ${country.currencySymbol}${surplus.toLocaleString()}/day.`;
    recommendations.push('Budget allows balanced inclusion of high-biological value proteins (fresh fish, lean cuts, dairy).');
    recommendations.push('Consider funneling surplus savings into the local pocket money wallet rollover.');
  }

  return {
    dailyAllowance,
    minimumDailyFloor,
    monthlyBudget,
    minimumMonthlyFloor,
    isDeficit,
    deficitPercent,
    message,
    recommendations
  };
}
