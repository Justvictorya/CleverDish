/**
 * Off-plan food logging and the seven-day history built from it.
 *
 * The history chart used to fabricate its week, so the properties worth pinning
 * are that every figure comes from something recorded, and that a hand-logged
 * snack lands in the same total as a snapped plate. Run with `npm test`.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import {
  addFoodEntry,
  dateKey,
  lastSevenDays,
  loadFoodLog,
  removeFoodEntry,
  sumFoodEntries,
  todayKey,
  QUICK_FOODS
} from '../src/data/foodLog';
import { buildWeekHistory, cycleDayForDate } from '../src/data/mealHistory';
import { getTodaysCycleDay } from '../src/utils/calendarSync';
import type { MacroTargets, Meal } from '../src/types';

const dayMs = 86_400_000;

const makeMeal = (overrides: Partial<Meal> & Pick<Meal, 'dayNumber' | 'type' | 'calories'>): Meal => ({
  id: `${overrides.dayNumber}_${overrides.type}`,
  title: 'Test Plate',
  description: '',
  proteinSourceType: 'fish',
  style: 'indigenous',
  visualType: 'stew_swallow',
  protein: 20,
  carbs: 40,
  fat: 15,
  fiber: 5,
  estimatedCost: 1000,
  ingredients: [],
  cookTimeMinutes: 30,
  prepInstructions: [],
  readyToEatDeliveryQuery: 'test',
  ...overrides
});

const makeMacros = (targetCalories: number): MacroTargets => ({
  bmr: 1600,
  tdee: targetCalories,
  targetCalories,
  proteinGrams: 140,
  carbsGrams: 220,
  fatGrams: 70,
  fiberGrams: 30,
  goalAdjustmentPct: 0
});

test('date keys are plain local calendar days', () => {
  assert.match(dateKey(new Date(2026, 9, 8)), /^2026-10-08$/);
  assert.equal(dateKey(new Date(2026, 0, 5)), '2026-01-05');
});

test('the seven-day window ends today with no gaps or repeats', () => {
  const keys = lastSevenDays(new Date(2026, 9, 8));
  assert.equal(keys.length, 7);
  assert.equal(new Set(keys).size, 7, 'keys should be unique');
  assert.equal(keys[6], '2026-10-08', 'last key should be the day asked for');
  assert.equal(keys[0], '2026-10-02', 'window should start six days back');
});

test('logging normalises an entry and removal takes it back out', () => {
  const date = '2026-10-08';
  let entries = addFoodEntry('tester', date, { name: '  Suya skewer  ', calories: 264.4 }, []);
  assert.equal(entries.length, 1);
  assert.equal(entries[0].name, 'Suya skewer', 'name should be trimmed');
  assert.equal(entries[0].calories, 264, 'calories should be rounded');
  assert.equal(entries[0].date, date);

  const withSecond = addFoodEntry('tester', date, { name: 'Malt', calories: 150, source: 'quick' }, entries);
  assert.equal(withSecond.length, 2);

  const removed = removeFoodEntry('tester', date, entries[0].id, withSecond);
  assert.equal(removed.length, 1);
  assert.equal(removed[0].name, 'Malt');

  // Storage is absent under node, so persistence is best-effort: the returned
  // list still has to be right, or the ledger would lose entries silently.
  assert.deepEqual(loadFoodLog('tester', date), []);
});

test('logged entries sum into one day total', () => {
  const entries = [
    { id: 'a', date: '2026-10-08', name: 'Suya', calories: 260, protein: 22, carbs: 8, fat: 15, source: 'quick' as const },
    { id: 'b', date: '2026-10-08', name: 'Malt', calories: 150, protein: 2, carbs: 36, fat: 0, source: 'quick' as const }
  ];
  const total = sumFoodEntries(entries);
  assert.deepEqual(total, { calories: 410, protein: 24, carbs: 44, fat: 15, count: 2 });
  assert.deepEqual(sumFoodEntryGuard(), { calories: 0, count: 0 }, 'empty day totals zero');
});

test('quick picks are usable estimates, not placeholders', () => {
  assert.ok(QUICK_FOODS.length >= 12, 'a tap-to-add list needs enough to cover a snack run');
  for (const food of QUICK_FOODS) {
    assert.ok(food.name.length > 0, 'quick pick needs a name');
    assert.ok(food.calories > 0, `${food.name} needs calories`);
    assert.ok(food.protein >= 0 && food.carbs >= 0 && food.fat >= 0, `${food.name} macros should not be negative`);
  }
});

test('the rotation day for a date survives the ISO timestamp onboarding writes', () => {
  // Onboarding stores new Date().toISOString(); split('-') on it used to yield
  // NaN for the day, which pinned every profile to day 1 forever.
  assert.equal(cycleDayForDate('2026-10-04', '2026-10-01T07:31:00.000Z'), 4);
  assert.equal(cycleDayForDate('2026-10-04', '2026-10-01'), 4, 'bare dates keep working');
  assert.equal(cycleDayForDate('2026-10-29', '2026-10-01'), 1, 'the cycle wraps after 28 days');
  assert.equal(cycleDayForDate('2026-09-30', '2026-10-01'), null, 'before the plan started there is no plan day');
});

test('the Today screen reads an ISO plan start as the date it names', () => {
  // getTodaysCycleDay split('-') the raw ISO string, so the day came back NaN,
  // validStart was false and the function returned 1 for every onboarded
  // profile: the rotation stood still on the screen it was built for.
  const startedThreeDaysAgo = new Date();
  startedThreeDaysAgo.setDate(startedThreeDaysAgo.getDate() - 3);
  const pad = (n: number) => `${n}`.padStart(2, '0');
  const bare = `${startedThreeDaysAgo.getFullYear()}-${pad(startedThreeDaysAgo.getMonth() + 1)}-${pad(startedThreeDaysAgo.getDate())}`;

  assert.equal(getTodaysCycleDay(bare), 4, 'a bare date is day 4 after three days');
  assert.equal(getTodaysCycleDay(`${bare}T09:00:00.000Z`), 4, 'onboarding writes a timestamp');
});

test('a date without a plan start falls back the same way the Today screen does', () => {
  const today = dateKey(new Date());
  assert.equal(cycleDayForDate(today, undefined), getTodaysCycleDay(undefined));
});

test('a week of history is built only from snapped plates and logged food', () => {
  const today = new Date(2026, 9, 8);
  const todayKeyString = dateKey(today);
  const yesterday = dateKey(new Date(2026, 9, 7));
  const twoDaysAgo = dateKey(new Date(2026, 9, 6));
  const planStart = '2026-10-06T09:00:00.000Z'; // two days before "today"

  const meals: Meal[] = [
    // Day 1 of the plan: planned but never snapped.
    makeMeal({ dayNumber: 1, type: 'morning', calories: 500 }),
    makeMeal({ dayNumber: 1, type: 'afternoon', calories: 600 }),
    makeMeal({ dayNumber: 1, type: 'evening', calories: 700 }),
    // Day 2: one plate snapped.
    makeMeal({ dayNumber: 2, type: 'morning', calories: 500 }),
    makeMeal({ dayNumber: 2, type: 'afternoon', calories: 600, photoVerified: true }),
    makeMeal({ dayNumber: 2, type: 'evening', calories: 700 }),
    // Day 3 (today): all three snapped.
    makeMeal({ dayNumber: 3, type: 'morning', calories: 400, photoVerified: true }),
    makeMeal({ dayNumber: 3, type: 'afternoon', calories: 500, photoVerified: true }),
    makeMeal({ dayNumber: 3, type: 'evening', calories: 600, photoVerified: true })
  ];

  const logsByDate = {
    [todayKeyString]: [
      { id: 'f1', date: todayKeyString, name: 'Suya', calories: 260, protein: 22, carbs: 8, fat: 15, source: 'quick' as const }
    ],
    [yesterday]: [
      { id: 'f2', date: yesterday, name: 'Malt', calories: 150, protein: 2, carbs: 36, fat: 0, source: 'quick' as const }
    ]
  };

  const history = buildWeekHistory({
    today,
    planStartDate: planStart,
    meals,
    macros: makeMacros(2200),
    logsByDate
  });

  assert.equal(history.length, 7, 'a trailing week');
  assert.equal(history[6].date, todayKeyString, 'newest record is today');

  const [oldest] = history;
  assert.equal(oldest.plannedCalories, 0, 'days before the plan started planned nothing');
  assert.equal(oldest.actualCalories, 0);

  const dayOne = history.find((d) => d.date === twoDaysAgo)!;
  assert.equal(dayOne.plannedCalories, 1800, 'planned counts every plate the plan offered');
  assert.equal(dayOne.actualCalories, 0, 'nothing snapped, nothing logged');
  assert.equal(dayOne.photoVerified, false);

  const dayTwo = history.find((d) => d.date === yesterday)!;
  assert.equal(dayTwo.actualCalories, 750, 'one snapped plate plus one logged item');
  assert.equal(dayTwo.delta, 750 - 2200);
  assert.equal(dayTwo.loggedEntries[0].name, 'Malt');
  assert.equal(dayTwo.photoVerified, true);

  const todayRecord = history[6];
  assert.equal(todayRecord.plannedCalories, 1500);
  assert.equal(todayRecord.actualCalories, 1760, 'snapped plates plus the logged suya');
  assert.equal(todayRecord.proteinGrams, 60 + 22, 'macros from both sources add up');
  assert.equal(todayRecord.planPlates.length, 3);
  assert.equal(todayRecord.loggedEntries.length, 1);
  assert.equal(todayRecord.targetCalories, 2200);
});

test('the plan start date is read as the date it names, not as a timestamp', () => {
  const today = new Date(2026, 9, 8);
  const meals: Meal[] = [];
  const history = buildWeekHistory({
    today,
    planStartDate: '2026-10-08T07:31:00.000Z',
    meals,
    macros: makeMacros(2000),
    logsByDate: {}
  });
  assert.equal(history[6].planPlates.length, 0);
  assert.equal(cycleDayForDate('2026-10-08', '2026-10-08T07:31:00.000Z'), 1);
  assert.equal(cycleDayForDate('2026-11-04', '2026-10-08T07:31:00.000Z'), 28, 'a full cycle later');
});

/** sumFoodEntries on an empty day. */
function sumFoodEntryGuard() {
  const total = sumFoodEntries([]);
  return { calories: total.calories, count: total.count };
}
