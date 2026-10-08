import type { MacroTargets, Meal } from '../types';
import { dateKey, FoodLogEntry, sumFoodEntries } from './foodLog';

/**
 * The last seven days of eating, built from things that actually happened:
 * photo-verified plates from the plan, plus whatever was logged by hand.
 *
 * The chart this feeds used to invent its own week — target calories nudged by
 * a fixed variance per day — so it said the same thing whether or not anyone
 * ate anything. Nothing here is generated: a day with no verification and no
 * entries reads as zero, which is the truth and the reason to log.
 */
export interface DayHistoryRecord {
  id: string;
  /** YYYY-MM-DD local day. */
  date: string;
  dayLabel: string;
  dayName: string;
  fullDate: string;
  /** Snapped plan meals plus logged foods. */
  actualCalories: number;
  /** Everything the plan put on the table that day, verified or not. */
  plannedCalories: number;
  targetCalories: number;
  tdee: number;
  proteinGrams: number;
  carbsGrams: number;
  fatGrams: number;
  /**
   * Fiber from the day's photo-verified plates. Hand-logged food carries no
   * fiber figure (nobody weighs their suya), so this field is plan-only and
   * says so wherever it is shown.
   */
  fiberGrams: number;
  proteinSource: string;
  photoVerified: boolean;
  planPlates: Array<{ title: string; type: string; calories: number; verified: boolean }>;
  loggedEntries: Array<{ name: string; calories: number }>;
  delta: number;
}

/** Which day of the 28-day rotation a calendar date falls on, or null if the plan had not started. */
export function cycleDayForDate(date: string, planStartDate?: string): number | null {
  const [year, month, day] = date.split('-').map(Number);
  if (!Number.isFinite(year) || !Number.isFinite(month) || !Number.isFinite(day)) return null;
  const dateUtc = Date.UTC(year, month - 1, day);

  if (planStartDate) {
    // Onboarding stores a full ISO timestamp; take the date part.
    const [startYear, startMonth, startDay] = planStartDate.split('T')[0].split('-').map(Number);
    if (!Number.isFinite(startYear) || !Number.isFinite(startMonth) || !Number.isFinite(startDay)) return null;
    const startUtc = Date.UTC(startYear, startMonth - 1, startDay);
    const diffDays = Math.floor((dateUtc - startUtc) / 86_400_000);
    if (diffDays < 0) return null;
    return (diffDays % 28) + 1;
  }

  // No start date: the rotation anchors to day-of-year, exactly as the Today
  // screen does, so history and the tab agree on which plate was planned.
  const startOfYearUtc = Date.UTC(year, 0, 1);
  const dayOfYear = Math.floor((dateUtc - startOfYearUtc) / 86_400_000);
  return (dayOfYear % 28) + 1;
}

const WEEKDAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function buildWeekHistory(options: {
  today: Date;
  planStartDate?: string;
  meals: Meal[];
  macros: MacroTargets;
  logsByDate: Record<string, FoodLogEntry[]>;
}): DayHistoryRecord[] {
  const { today, planStartDate, meals, macros, logsByDate } = options;
  const records: DayHistoryRecord[] = [];

  for (let back = 6; back >= 0; back -= 1) {
    const day = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    day.setDate(day.getDate() - back);
    const date = dateKey(day);
    const cycleDay = cycleDayForDate(date, planStartDate);
    const planMeals = cycleDay ? meals.filter((meal) => meal.dayNumber === cycleDay) : [];
    const verified = planMeals.filter((meal) => meal.photoVerified);
    const logged = logsByDate[date] ?? [];

    const verifiedTotals = verified.reduce(
      (sum, meal) => ({
        calories: sum.calories + meal.calories,
        protein: sum.protein + meal.protein,
        carbs: sum.carbs + meal.carbs,
        fat: sum.fat + meal.fat
      }),
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );
    const loggedTotals = sumFoodEntries(logged);
    const actualCalories = verifiedTotals.calories + loggedTotals.calories;

    const isToday = back === 0;
    const label = isToday ? 'Today' : day.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
    const dayName = isToday ? 'Today' : WEEKDAY_NAMES[day.getDay()];

    records.push({
      id: date,
      date,
      dayLabel: label,
      dayName,
      fullDate: day.toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' }),
      actualCalories,
      plannedCalories: planMeals.reduce((sum, meal) => sum + meal.calories, 0),
      targetCalories: macros.targetCalories,
      tdee: macros.tdee,
      proteinGrams: verifiedTotals.protein + loggedTotals.protein,
      carbsGrams: verifiedTotals.carbs + loggedTotals.carbs,
      fatGrams: verifiedTotals.fat + loggedTotals.fat,
      fiberGrams: verified.reduce((sum, meal) => sum + meal.fiber, 0),
      proteinSource: planMeals[0]?.proteinSourceType ?? '—',
      photoVerified: verified.length > 0,
      planPlates: planMeals.map((meal) => ({
        title: meal.title,
        type: meal.type,
        calories: meal.calories,
        verified: Boolean(meal.photoVerified)
      })),
      loggedEntries: logged.map((entry) => ({ name: entry.name, calories: entry.calories })),
      delta: actualCalories - macros.targetCalories
    });
  }

  return records;
}
