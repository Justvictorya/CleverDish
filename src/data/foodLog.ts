import { storageKey } from '../utils/storage';

/**
 * Off-plan eating.
 *
 * The meal plan only knows the three plates it invented, so anyone who buys
 * suya on the way home or shares a bottle of malt had nowhere to put it and the
 * day's calorie total quietly lied. These entries sit alongside photo-verified
 * plan meals and are summed into the same consumed figure, on the Today screen,
 * in Body Statistics, and in the seven-day history.
 */
export interface FoodLogEntry {
  id: string;
  /** Local calendar day, YYYY-MM-DD. */
  date: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  source: 'quick' | 'custom';
}

export interface NewFoodInput {
  name: string;
  calories: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  source?: 'quick' | 'custom';
}

/**
 * Tap-to-add favourites, so logging a snack does not need typing.
 *
 * These are typical serving estimates rather than weighed values — the portion
 * someone actually buys varies — so the sheet labels them as approximate and
 * the custom field is there for anything that needs a real number.
 */
export const QUICK_FOODS: ReadonlyArray<{
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}> = [
  { name: 'Suya skewer', calories: 260, protein: 22, carbs: 8, fat: 15 },
  { name: 'Puff-puff (3)', calories: 180, protein: 4, carbs: 30, fat: 5 },
  { name: 'Moi-moi (cup)', calories: 210, protein: 11, carbs: 18, fat: 10 },
  { name: 'Akara (2)', calories: 160, protein: 8, carbs: 14, fat: 8 },
  { name: 'Meat pie', calories: 290, protein: 9, carbs: 33, fat: 13 },
  { name: 'Sausage roll', calories: 165, protein: 6, carbs: 19, fat: 8 },
  { name: 'Chicken shawarma', calories: 450, protein: 28, carbs: 45, fat: 17 },
  { name: 'Indomie noodles', calories: 380, protein: 9, carbs: 48, fat: 16 },
  { name: 'Bole (roast plantain)', calories: 200, protein: 3, carbs: 44, fat: 2 },
  { name: 'Groundnuts (30g)', calories: 175, protein: 8, carbs: 6, fat: 15 },
  { name: 'Boiled egg', calories: 78, protein: 6, carbs: 1, fat: 5 },
  { name: 'Fried egg', calories: 90, protein: 6, carbs: 1, fat: 7 },
  { name: 'Chin chin (50g)', calories: 230, protein: 3, carbs: 32, fat: 10 },
  { name: 'Bread slice', calories: 80, protein: 3, carbs: 15, fat: 1 },
  { name: 'Malt drink (330ml)', calories: 150, protein: 2, carbs: 36, fat: 0 },
  { name: 'Soft drink (350ml)', calories: 140, protein: 0, carbs: 36, fat: 0 }
];

/** Local calendar day as YYYY-MM-DD, so keys never shift with timezone or DST. */
export function dateKey(date: Date): string {
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  return `${date.getFullYear()}-${month}-${day}`;
}

export function todayKey(): string {
  return dateKey(new Date());
}

/** The seven days ending today, oldest first. */
export function lastSevenDays(from: Date = new Date()): string[] {
  const keys: string[] = [];
  for (let back = 6; back >= 0; back -= 1) {
    const day = new Date(from.getFullYear(), from.getMonth(), from.getDate());
    day.setDate(day.getDate() - back);
    keys.push(dateKey(day));
  }
  return keys;
}

export function foodLogKey(profileId: string, date: string): string {
  return storageKey(`food_log_${profileId}_${date}`);
}

export function loadFoodLog(profileId: string, date: string): FoodLogEntry[] {
  try {
    const raw = localStorage.getItem(foodLogKey(profileId, date));
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as FoodLogEntry[]) : [];
  } catch {
    // Storage unavailable (private mode, quota, server render) — nothing logged.
    return [];
  }
}

function persist(profileId: string, date: string, entries: FoodLogEntry[]): void {
  try {
    localStorage.setItem(foodLogKey(profileId, date), JSON.stringify(entries));
  } catch {
    // Still return the entry in memory so the session keeps tracking.
  }
}

/** Append an entry and return the day's updated list. */
export function addFoodEntry(
  profileId: string,
  date: string,
  input: NewFoodInput,
  current: FoodLogEntry[]
): FoodLogEntry[] {
  const entry: FoodLogEntry = {
    id: `food_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`,
    date,
    name: input.name.trim().slice(0, 60),
    calories: Math.max(0, Math.round(input.calories)),
    protein: Math.max(0, Math.round(input.protein ?? 0)),
    carbs: Math.max(0, Math.round(input.carbs ?? 0)),
    fat: Math.max(0, Math.round(input.fat ?? 0)),
    source: input.source ?? 'custom'
  };
  const next = [...current, entry];
  persist(profileId, date, next);
  return next;
}

/** Remove one entry and return the day's updated list. */
export function removeFoodEntry(
  profileId: string,
  date: string,
  id: string,
  current: FoodLogEntry[]
): FoodLogEntry[] {
  const next = current.filter((entry) => entry.id !== id);
  persist(profileId, date, next);
  return next;
}

export function sumFoodEntries(entries: FoodLogEntry[]): {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  count: number;
} {
  return entries.reduce(
    (total, entry) => ({
      calories: total.calories + (entry.calories || 0),
      protein: total.protein + (entry.protein || 0),
      carbs: total.carbs + (entry.carbs || 0),
      fat: total.fat + (entry.fat || 0),
      count: total.count + 1
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0, count: 0 }
  );
}
