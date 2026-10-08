import React, { useState } from 'react';
import { UserProfile, MacroTargets, Meal, FreezerVaultItem, CountryInfo } from '../types';
import { FoodLogEntry, sumFoodEntries, todayKey } from '../data/foodLog';
import { MacroHistory } from './MacroHistory';
import { WeeklyMacroChart } from './WeeklyMacroChart';
import { PocketMoneyWallet } from './PocketMoneyWallet';
import {
  Activity,
  Flame,
  Scale,
  Heart,
  Target,
  Zap,
  TrendingDown,
  TrendingUp,
  Sliders,
  ChevronRight,
  Hand,
  Snowflake,
  ShoppingCart,
  Store,
  Camera,
  Globe,
  Plus,
  Sparkles,
  Award,
  CheckCircle2,
  Clock,
  PieChart
} from 'lucide-react';
import { soundFX } from '../utils/sound';

interface BodyStatisticsTabProps {
  profile: UserProfile;
  macros: MacroTargets;
  todaysMeals: Meal[];
  /** The whole plan, so the week chart can show what each past day held. */
  meals: Meal[];
  /** Hand-logged off-plan food for the last seven days, keyed by YYYY-MM-DD. */
  foodLogs: Record<string, FoodLogEntry[]>;
  onOpenFoodLog: () => void;
  freezerVault: FreezerVaultItem[];
  country: CountryInfo;
  onOpenHandGuide: (meal: Meal | null) => void;
  onOpenMarketRun: () => void;
  onOpenFreezerVault: () => void;
  onOpenLedger: () => void;
  onOpenPantryScanner: () => void;
  onOpenSendFoodHome: () => void;
  onOpenOnboarding: () => void;
  onOpenAccomplishments?: () => void;
}

export const BodyStatisticsTab: React.FC<BodyStatisticsTabProps> = ({
  profile,
  macros,
  todaysMeals,
  meals,
  foodLogs,
  onOpenFoodLog,
  freezerVault,
  country,
  onOpenHandGuide,
  onOpenMarketRun,
  onOpenFreezerVault,
  onOpenLedger,
  onOpenPantryScanner,
  onOpenSendFoodHome,
  onOpenOnboarding,
  onOpenAccomplishments
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'charts' | 'tools'>('overview');

  // BMI Calculation
  const heightM = profile.heightCm / 100;
  const bmi = (profile.weightKg / (heightM * heightM)).toFixed(1);
  const bmiNum = parseFloat(bmi);
  const bmiCategory =
    bmiNum < 18.5
      ? { label: 'Underweight', color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800' }
      : bmiNum < 25
      ? { label: 'Healthy Weight', color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800' }
      : bmiNum < 30
      ? { label: 'Overweight', color: 'text-amber-600 bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800' }
      : { label: 'Obese', color: 'text-rose-600 bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800' };

  // Daily calorie calculations
  const morningMeal = todaysMeals.find(m => m.type === 'morning');
  const afternoonMeal = todaysMeals.find(m => m.type === 'afternoon');
  const eveningMeal = todaysMeals.find(m => m.type === 'evening');

  // Eaten means eaten: snapped plan plates plus whatever was logged by hand,
  // because someone who ate outside the plan was invisible here before.
  const todayLog = foodLogs[todayKey()] ?? [];
  const loggedCalories = sumFoodEntries(todayLog).calories;
  const consumedCalories =
    todaysMeals
      .filter(m => m.photoVerified)
      .reduce((sum, m) => sum + m.calories, 0) + loggedCalories;

  const plannedTotalCalories = todaysMeals.reduce((sum, m) => sum + m.calories, 0);
  const remainingAllowance = Math.max(0, macros.targetCalories - consumedCalories);
  const percentConsumed = Math.min(100, Math.round((consumedCalories / macros.targetCalories) * 100));

  const totalVaultPortions = freezerVault.reduce((acc, curr) => acc + curr.portionsRemaining, 0);

  return (
    <div className="space-y-6">
      {/* Top Header & Context */}
      <div className="bg-white dark:bg-[#18181B] rounded-3xl border border-stone-200/90 dark:border-zinc-800 shadow-xs p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-black uppercase tracking-wider text-[#7A1C2C] dark:text-rose-400 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5" />
              Body Statistics & Metabolic Health
            </span>
            <span className="text-stone-300 dark:text-zinc-600">·</span>
            <span className="text-xs text-stone-500 dark:text-zinc-400 font-medium">
              Mifflin-St Jeor Engine
            </span>
          </div>
          <h2 className="text-2xl font-black text-stone-900 dark:text-zinc-100 mt-1">
            Personal Health Profile & Calorie Intake
          </h2>
          <p className="text-xs text-stone-500 dark:text-zinc-400 mt-1">
            Tracking your basal metabolic rate, daily caloric expenditure, and macro distribution away from your daily food rotation.
          </p>
        </div>

        <button
          onClick={() => {
            soundFX.playTap();
            onOpenOnboarding();
          }}
          className="self-start md:self-center px-4 py-2 rounded-xl bg-stone-100 dark:bg-zinc-800 hover:bg-stone-200 dark:hover:bg-zinc-700 text-stone-800 dark:text-zinc-200 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer border border-stone-200/80 dark:border-zinc-700"
        >
          <Sliders className="w-3.5 h-3.5 text-[#7A1C2C] dark:text-rose-400" />
          <span>Edit Body Stats & Goal</span>
        </button>
      </div>

      {/* 4 Core Metabolic & Body Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Weight & BMI */}
        <div className="bg-white dark:bg-[#18181B] rounded-2xl border border-stone-200/90 dark:border-zinc-800 p-5 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-500 dark:text-zinc-400 uppercase tracking-wider">
              Weight & BMI
            </span>
            <Scale className="w-4 h-4 text-[#7A1C2C] dark:text-rose-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-stone-900 dark:text-zinc-100">
              {profile.weightKg} kg
            </span>
            <span className="text-xs text-stone-400 font-mono">
              ({(profile.weightKg * 2.20462).toFixed(1)} lbs)
            </span>
          </div>
          <div className="flex items-center gap-2 pt-1">
            <span className="text-xs font-mono font-bold text-stone-700 dark:text-zinc-300">
              BMI: {bmi}
            </span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${bmiCategory.color}`}>
              {bmiCategory.label}
            </span>
          </div>
          <div className="text-[11px] text-stone-400 dark:text-zinc-500">
            Height: {profile.heightCm} cm · {profile.age} yrs ({profile.gender})
          </div>
        </div>

        {/* Metric 2: Daily Calorie Target */}
        <div className="bg-white dark:bg-[#18181B] rounded-2xl border border-stone-200/90 dark:border-zinc-800 p-5 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-500 dark:text-zinc-400 uppercase tracking-wider">
              Daily Calorie Target
            </span>
            <Target className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-stone-900 dark:text-zinc-100">
              {macros.targetCalories.toLocaleString()}
            </span>
            <span className="text-xs text-stone-400 font-mono">kcal/day</span>
          </div>
          <div className="flex items-center gap-1.5 pt-1">
            <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-800">
              {profile.goal === 'lose_weight'
                ? 'Fat Loss Deficit'
                : profile.goal === 'gain_muscle'
                ? 'Muscle Hypertrophy'
                : 'Maintenance'}
            </span>
          </div>
          <div className="text-[11px] text-stone-400 dark:text-zinc-500">
            {macros.goalAdjustmentPct > 0
              ? `+${macros.goalAdjustmentPct}% surplus for lean growth`
              : macros.goalAdjustmentPct < 0
              ? `${macros.goalAdjustmentPct}% deficit for sustainable fat loss`
              : 'Calibrated at maintenance'}
          </div>
        </div>

        {/* Metric 3: BMR */}
        <div className="bg-white dark:bg-[#18181B] rounded-2xl border border-stone-200/90 dark:border-zinc-800 p-5 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-500 dark:text-zinc-400 uppercase tracking-wider">
              Basal Metabolic (BMR)
            </span>
            <Heart className="w-4 h-4 text-rose-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-stone-900 dark:text-zinc-100">
              {macros.bmr.toLocaleString()}
            </span>
            <span className="text-xs text-stone-400 font-mono">kcal/day</span>
          </div>
          <div className="text-xs font-medium text-stone-600 dark:text-zinc-400 pt-1">
            Resting metabolic energy
          </div>
          <div className="text-[11px] text-stone-400 dark:text-zinc-500">
            Baseline calories burned to stay alive without movement.
          </div>
        </div>

        {/* Metric 4: TDEE */}
        <div className="bg-white dark:bg-[#18181B] rounded-2xl border border-stone-200/90 dark:border-zinc-800 p-5 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-500 dark:text-zinc-400 uppercase tracking-wider">
              Total Expenditure (TDEE)
            </span>
            <Zap className="w-4 h-4 text-amber-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-stone-900 dark:text-zinc-100">
              {macros.tdee.toLocaleString()}
            </span>
            <span className="text-xs text-stone-400 font-mono">kcal/day</span>
          </div>
          <div className="text-xs font-medium text-stone-600 dark:text-zinc-400 pt-1">
            With activity multiplier ({profile.activityLevel}x)
          </div>
          <div className="text-[11px] text-stone-400 dark:text-zinc-500">
            Full energy expenditure based on your daily routine.
          </div>
        </div>
      </div>

      {/* TODAY'S DAILY CALORIE INTAKE TRACKER (Moved here from Home) */}
      <div className="bg-white dark:bg-[#18181B] rounded-3xl border border-stone-200/90 dark:border-zinc-800 shadow-xs p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 dark:border-zinc-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg">🔥</span>
              <h3 className="text-lg font-black text-stone-900 dark:text-zinc-100">
                Daily Calorie Intake & Macro Breakdown
              </h3>
            </div>
            <p className="text-xs text-stone-500 dark:text-zinc-400 mt-0.5">
              Live calculation of today's consumed nutrition against your Mifflin-St Jeor target.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                soundFX.playTap();
                onOpenFoodLog();
              }}
              className="px-3.5 py-2 rounded-xl bg-[#2ECC71] hover:bg-[#27ae60] text-white text-xs font-black flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              Log Food
            </button>
            <div className="text-right">
              <div className="text-xs text-stone-500 dark:text-zinc-400 font-mono">
                Allowance Remaining
              </div>
              <div className="text-lg font-black text-[#7A1C2C] dark:text-rose-400">
                {remainingAllowance} kcal
              </div>
            </div>
          </div>
        </div>

        {/* Progress Gauge */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="font-bold text-stone-700 dark:text-zinc-300">
              Consumed: <strong>{consumedCalories} kcal</strong> ({percentConsumed}%)
            </span>
            <span className="text-stone-500 dark:text-zinc-400">
              Target: <strong>{macros.targetCalories} kcal</strong> (Planned: {plannedTotalCalories} kcal
              {loggedCalories > 0 ? ` · Logged: ${loggedCalories} kcal` : ''})
            </span>
          </div>
          <div className="w-full h-3 bg-stone-100 dark:bg-zinc-800 rounded-full overflow-hidden flex">
            <div
              className="bg-gradient-to-r from-[#2ECC71] to-emerald-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${percentConsumed}%` }}
            />
          </div>
        </div>

        {/* 3 Meal Calorie Distribution */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {/* Morning */}
          <div className="p-4 rounded-2xl bg-stone-50 dark:bg-zinc-850 border border-stone-200 dark:border-zinc-800 text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-stone-700 dark:text-zinc-300 flex items-center gap-1.5">
                <span>🌅</span>
                <span>Morning Breakfast</span>
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                morningMeal?.photoVerified
                  ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400'
                  : 'bg-stone-200 dark:bg-zinc-700 text-stone-600 dark:text-zinc-400'
              }`}>
                {morningMeal?.photoVerified ? '✓ Logged' : 'Planned'}
              </span>
            </div>
            <div className="text-sm font-bold text-stone-900 dark:text-zinc-100 truncate">
              {morningMeal?.title || 'Breakfast Plate'}
            </div>
            <div className="flex items-center justify-between font-mono text-stone-600 dark:text-zinc-400 pt-1">
              <span>Calories:</span>
              <strong className="text-stone-900 dark:text-zinc-100">{morningMeal?.calories || 0} kcal</strong>
            </div>
            <div className="text-[11px] text-stone-500 dark:text-zinc-400 font-mono">
              {morningMeal?.protein || 0}g P · {morningMeal?.carbs || 0}g C · {morningMeal?.fat || 0}g F
            </div>
          </div>

          {/* Afternoon */}
          <div className="p-4 rounded-2xl bg-stone-50 dark:bg-zinc-850 border border-stone-200 dark:border-zinc-800 text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-stone-700 dark:text-zinc-300 flex items-center gap-1.5">
                <span>☀️</span>
                <span>Afternoon Lunch</span>
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                afternoonMeal?.photoVerified
                  ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400'
                  : 'bg-stone-200 dark:bg-zinc-700 text-stone-600 dark:text-zinc-400'
              }`}>
                {afternoonMeal?.photoVerified ? '✓ Logged' : 'Planned'}
              </span>
            </div>
            <div className="text-sm font-bold text-stone-900 dark:text-zinc-100 truncate">
              {afternoonMeal?.title || 'Lunch Plate'}
            </div>
            <div className="flex items-center justify-between font-mono text-stone-600 dark:text-zinc-400 pt-1">
              <span>Calories:</span>
              <strong className="text-stone-900 dark:text-zinc-100">{afternoonMeal?.calories || 0} kcal</strong>
            </div>
            <div className="text-[11px] text-stone-500 dark:text-zinc-400 font-mono">
              {afternoonMeal?.protein || 0}g P · {afternoonMeal?.carbs || 0}g C · {afternoonMeal?.fat || 0}g F
            </div>
          </div>

          {/* Evening */}
          <div className="p-4 rounded-2xl bg-stone-50 dark:bg-zinc-850 border border-stone-200 dark:border-zinc-800 text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-stone-700 dark:text-zinc-300 flex items-center gap-1.5">
                <span>🌙</span>
                <span>Evening Dinner</span>
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                eveningMeal?.photoVerified
                  ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400'
                  : 'bg-stone-200 dark:bg-zinc-700 text-stone-600 dark:text-zinc-400'
              }`}>
                {eveningMeal?.photoVerified ? '✓ Logged' : 'Planned'}
              </span>
            </div>
            <div className="text-sm font-bold text-stone-900 dark:text-zinc-100 truncate">
              {eveningMeal?.title || 'Dinner Plate'}
            </div>
            <div className="flex items-center justify-between font-mono text-stone-600 dark:text-zinc-400 pt-1">
              <span>Calories:</span>
              <strong className="text-stone-900 dark:text-zinc-100">{eveningMeal?.calories || 0} kcal</strong>
            </div>
            <div className="text-[11px] text-stone-500 dark:text-zinc-400 font-mono">
              {eveningMeal?.protein || 0}g P · {eveningMeal?.carbs || 0}g C · {eveningMeal?.fat || 0}g F
            </div>
          </div>
        </div>

        {/* 4 Macro Targets Dial Bar */}
        <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 bg-stone-50 dark:bg-zinc-850 rounded-xl border border-stone-200 dark:border-zinc-800">
            <div className="text-stone-500 dark:text-zinc-400 font-bold uppercase tracking-wider text-[10px]">
              Protein Target
            </div>
            <div className="text-lg font-black text-[#7A1C2C] dark:text-rose-400 font-mono">
              {macros.proteinGrams}g
            </div>
            <div className="text-[10px] text-stone-400">4 kcal/g · Muscle repair</div>
          </div>

          <div className="p-3 bg-stone-50 dark:bg-zinc-850 rounded-xl border border-stone-200 dark:border-zinc-800">
            <div className="text-stone-500 dark:text-zinc-400 font-bold uppercase tracking-wider text-[10px]">
              Carbs Target
            </div>
            <div className="text-lg font-black text-[#2ECC71] font-mono">
              {macros.carbsGrams}g
            </div>
            <div className="text-[10px] text-stone-400">4 kcal/g · Sustained energy</div>
          </div>

          <div className="p-3 bg-stone-50 dark:bg-zinc-850 rounded-xl border border-stone-200 dark:border-zinc-800">
            <div className="text-stone-500 dark:text-zinc-400 font-bold uppercase tracking-wider text-[10px]">
              Healthy Fats
            </div>
            <div className="text-lg font-black text-amber-600 dark:text-amber-400 font-mono">
              {macros.fatGrams}g
            </div>
            <div className="text-[10px] text-stone-400">9 kcal/g · Hormonal health</div>
          </div>

          <div className="p-3 bg-stone-50 dark:bg-zinc-850 rounded-xl border border-stone-200 dark:border-zinc-800">
            <div className="text-stone-500 dark:text-zinc-400 font-bold uppercase tracking-wider text-[10px]">
              Dietary Fiber
            </div>
            <div className="text-lg font-black text-cyan-600 dark:text-cyan-400 font-mono">
              {macros.fiberGrams}g
            </div>
            <div className="text-[10px] text-stone-400">Gut microbiome health</div>
          </div>
        </div>
      </div>

      {/* Historical Interactive Calorie Trend & Macro Adherence Charts */}
      <div className="space-y-6">
        <MacroHistory profile={profile} macros={macros} meals={meals} logsByDate={foodLogs} />
        <WeeklyMacroChart profile={profile} macros={macros} meals={meals} logsByDate={foodLogs} />
      </div>

      {/* NUTRITION & BODY COMPANION ENGINES (Moved from Home screen to Body Statistics) */}
      <div className="bg-white dark:bg-[#18181B] rounded-3xl border border-stone-200/90 dark:border-zinc-800 shadow-xs p-6 space-y-4">
        <div>
          <h3 className="text-lg font-black text-stone-900 dark:text-zinc-100 flex items-center gap-2">
            <span>🛠️</span>
            <span>Nutrition & Body Management Tools</span>
          </h3>
          <p className="text-xs text-stone-500 dark:text-zinc-400 mt-0.5">
            Companion tools for portion sizing, batch storage, market intelligence, and grocery savings.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
          {/* 1. Hand-Size Portion Guide */}
          <button
            onClick={() => {
              soundFX.playTap();
              onOpenHandGuide(todaysMeals[0] || null);
            }}
            className="p-4 rounded-2xl border border-stone-200 dark:border-zinc-800 hover:border-[#7A1C2C] dark:hover:border-rose-400 bg-stone-50/70 dark:bg-zinc-850 hover:bg-[#7A1C2C]/5 text-left flex items-start justify-between transition-colors group cursor-pointer"
          >
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#7A1C2C]/10 text-[#7A1C2C] dark:text-rose-400 flex items-center justify-center font-bold shrink-0">
                🖐️
              </div>
              <div>
                <div className="font-bold text-stone-900 dark:text-zinc-100 group-hover:text-[#7A1C2C] dark:group-hover:text-rose-400 text-sm">
                  Hand-Size Portion Guide
                </div>
                <div className="text-xs text-stone-500 dark:text-zinc-400 mt-0.5">
                  Zero scale needed: Palm (protein), Fist (veggies), Thumb (fats).
                </div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-[#7A1C2C] shrink-0" />
          </button>

          {/* 2. Big Pot Freezer Vault */}
          <button
            onClick={() => {
              soundFX.playTap();
              onOpenFreezerVault();
            }}
            className="p-4 rounded-2xl border border-stone-200 dark:border-zinc-800 hover:border-cyan-600 bg-stone-50/70 dark:bg-zinc-850 hover:bg-cyan-50/20 text-left flex items-start justify-between transition-colors group cursor-pointer"
          >
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center font-bold shrink-0">
                🍲
              </div>
              <div>
                <div className="font-bold text-stone-900 dark:text-zinc-100 group-hover:text-cyan-600 text-sm flex items-center gap-1.5">
                  <span>Big Pot Freezer Vault</span>
                  <span className="text-[10px] font-mono font-bold text-cyan-600 bg-cyan-50 dark:bg-cyan-950/40 px-1.5 rounded">
                    {totalVaultPortions} Portions
                  </span>
                </div>
                <div className="text-xs text-stone-500 dark:text-zinc-400 mt-0.5">
                  Batch cooking inventory: Reheat in 5 mins at zero daily spend.
                </div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-cyan-600 shrink-0" />
          </button>

          {/* 3. Saturday Open-Market Run List */}
          <button
            onClick={() => {
              soundFX.playTap();
              onOpenMarketRun();
            }}
            className="p-4 rounded-2xl border border-stone-200 dark:border-zinc-800 hover:border-amber-600 bg-stone-50/70 dark:bg-zinc-850 hover:bg-amber-50/20 text-left flex items-start justify-between transition-colors group cursor-pointer"
          >
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold shrink-0">
                🛒
              </div>
              <div>
                <div className="font-bold text-stone-900 dark:text-zinc-100 group-hover:text-amber-600 text-sm flex items-center gap-1.5">
                  <span>Saturday Market Run List</span>
                  <span className="text-[10px] font-bold text-[#2ECC71] bg-emerald-50 dark:bg-emerald-950/40 px-1.5 rounded">Bulk</span>
                </div>
                <div className="text-xs text-stone-500 dark:text-zinc-400 mt-0.5">
                  7-day consolidated grocery shopping list (Save ~18% in bulk).
                </div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-amber-600 shrink-0" />
          </button>

          {/* 4. Mile 12 / Bodija Ledger */}
          <button
            onClick={() => {
              soundFX.playTap();
              onOpenLedger();
            }}
            className="p-4 rounded-2xl border border-stone-200 dark:border-zinc-800 hover:border-[#7A1C2C] bg-stone-50/70 dark:bg-zinc-850 hover:bg-[#7A1C2C]/5 text-left flex items-start justify-between transition-colors group cursor-pointer"
          >
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#7A1C2C]/10 text-[#7A1C2C] dark:text-rose-400 flex items-center justify-center font-bold shrink-0">
                🏪
              </div>
              <div>
                <div className="font-bold text-stone-900 dark:text-zinc-100 group-hover:text-[#7A1C2C] text-sm">
                  Mile 12 / Bodija Ledger
                </div>
                <div className="text-xs text-stone-500 dark:text-zinc-400 mt-0.5">
                  Crowdsourced staple prices & inflation indices across markets.
                </div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-[#7A1C2C] shrink-0" />
          </button>

          {/* 5. Pantry-Aware AI Scanner */}
          <button
            onClick={() => {
              soundFX.playTap();
              onOpenPantryScanner();
            }}
            className="p-4 rounded-2xl border border-stone-200 dark:border-zinc-800 hover:border-[#2ECC71] bg-stone-50/70 dark:bg-zinc-850 hover:bg-emerald-50/40 text-left flex items-start justify-between transition-colors group cursor-pointer"
          >
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#2ECC71]/10 text-[#2ECC71] flex items-center justify-center font-bold shrink-0">
                📸
              </div>
              <div>
                <div className="font-bold text-stone-900 dark:text-zinc-100 group-hover:text-[#2ECC71] text-sm">
                  Pantry-Aware AI Scanner
                </div>
                <div className="text-xs text-stone-500 dark:text-zinc-400 mt-0.5">
                  Audit pantry items to slash unnecessary duplicate buying.
                </div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-[#2ECC71] shrink-0" />
          </button>

          {/* 6. Send Food Home Remittance */}
          <button
            onClick={() => {
              soundFX.playTap();
              onOpenSendFoodHome();
            }}
            className="p-4 rounded-2xl border border-stone-200 dark:border-zinc-800 hover:border-amber-500 bg-stone-50/70 dark:bg-zinc-850 hover:bg-amber-50/40 text-left flex items-start justify-between transition-colors group cursor-pointer"
          >
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold shrink-0">
                🌍
              </div>
              <div>
                <div className="font-bold text-stone-900 dark:text-zinc-100 group-hover:text-amber-600 text-sm">
                  Send Food Home Remittance
                </div>
                <div className="text-xs text-stone-500 dark:text-zinc-400 mt-0.5">
                  Fund curated fresh health food baskets for loved ones.
                </div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-amber-600 shrink-0" />
          </button>
        </div>
      </div>
    </div>
  );
};
