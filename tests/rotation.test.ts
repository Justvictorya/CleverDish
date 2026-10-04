/**
 * Meal rotation tests.
 *
 * The bug these pin: every local country catalogue shipped exactly one main per
 * protein type, and each slot indexed its own pool with `(day - 1) % length`.
 * With a one-item pool that is always index 0, so afternoon and evening rendered
 * the identical plate on all 28 days for every country except Nigeria.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync } from 'fs';
import path from 'path';
import { generate28DayPlan } from '../src/data/rotationPlans';
import { COUNTRY_CUISINES } from '../src/data/cuisineCatalog';
import type { CountryCode, Meal, StaplePreference } from '../src/types';

const EVERY_COUNTRY: CountryCode[] = ['NG', 'GH', 'KE', 'US', 'CA', 'UK'];
const EVERY_PREFERENCE: StaplePreference[] = ['indigenous', 'continental', 'balanced'];

function byDay(plan: Meal[]) {
  const days = new Map<number, Partial<Record<Meal['type'], string>>>();
  for (const meal of plan) {
    const day = days.get(meal.dayNumber) ?? {};
    day[meal.type] = meal.title;
    days.set(meal.dayNumber, day);
  }
  return days;
}

test('afternoon and evening are never the same dish', () => {
  for (const country of EVERY_COUNTRY) {
    for (const preference of EVERY_PREFERENCE) {
      const days = byDay(generate28DayPlan(country, preference));
      for (const [dayNumber, slots] of days) {
        assert.notEqual(
          slots.afternoon,
          slots.evening,
          `${country}/${preference} day ${dayNumber} served "${slots.afternoon}" twice`
        );
      }
    }
  }
});

test('morning, afternoon and evening are all different within a day', () => {
  for (const country of EVERY_COUNTRY) {
    for (const preference of EVERY_PREFERENCE) {
      const days = byDay(generate28DayPlan(country, preference));
      for (const [dayNumber, slots] of days) {
        const titles = [slots.morning, slots.afternoon, slots.evening];
        assert.equal(
          new Set(titles).size,
          titles.length,
          `${country}/${preference} day ${dayNumber} repeated a dish: ${titles.join(' / ')}`
        );
      }
    }
  }
});

test('every local main pool holds more than one dish per protein', () => {
  // A single-item pool is what made the two slots collapse onto one plate, so
  // guard the catalogue directly rather than only the rendered plan.
  for (const [code, cuisine] of Object.entries(COUNTRY_CUISINES)) {
    for (const [protein, pool] of Object.entries(cuisine!.mains)) {
      assert.ok(
        pool.length >= 2,
        `${code} mains.${protein} has ${pool.length} dish(es); needs at least 2`
      );
    }
  }
});

test('every pool gives each protein at least three choices', () => {
  // Both the local breakfasts and the shared continental pools used to hold one
  // dish per protein, so days 1-5 repeated verbatim as days 6-10.
  for (const [code, cuisine] of Object.entries(COUNTRY_CUISINES)) {
    for (const [slot, pools] of [
      ['breakfasts', cuisine!.breakfasts],
      ['mains', cuisine!.mains]
    ] as const) {
      for (const [protein, pool] of Object.entries(pools)) {
        assert.ok(
          pool.length >= 3,
          `${code} ${slot}.${protein} has ${pool.length} dish(es); needs at least 3`
        );
      }
    }
  }
});

test('no dish comes round more than once a week', () => {
  // Local plans share one mains pool across afternoon and evening, so with three
  // dishes per protein a plate lands four times in 28 days. That is the floor at
  // this pool size, and it still reads as a varied month.
  for (const country of EVERY_COUNTRY) {
    for (const preference of EVERY_PREFERENCE) {
      const counts = new Map<string, number>();
      for (const meal of generate28DayPlan(country, preference)) {
        counts.set(meal.title, (counts.get(meal.title) ?? 0) + 1);
      }
      for (const [title, times] of counts) {
        assert.ok(
          times <= 4,
          `${country}/${preference} serves "${title}" ${times} times in 28 days`
        );
      }
    }
  }
});

test('a dish never repeats on back-to-back days', () => {
  for (const country of EVERY_COUNTRY) {
    for (const preference of EVERY_PREFERENCE) {
      const days = byDay(generate28DayPlan(country, preference));
      const ordered = [...days.entries()].sort((a, b) => a[0] - b[0]);
      for (let i = 1; i < ordered.length; i += 1) {
        const previous = Object.values(ordered[i - 1][1]);
        const current = Object.values(ordered[i][1]);
        for (const title of current) {
          assert.ok(
            !previous.includes(title),
            `${country}/${preference} repeated "${title}" on days ${ordered[i - 1][0]} and ${ordered[i][0]}`
          );
        }
      }
    }
  }
});

test('local plans rotate through a meaningful number of distinct mains', () => {
  for (const country of EVERY_COUNTRY) {
    const titles = new Set<string>();
    for (const day of byDay(generate28DayPlan(country, 'indigenous')).values()) {
      if (day.afternoon) titles.add(day.afternoon);
      if (day.evening) titles.add(day.evening);
    }
    // Five proteins x at least two dishes each, never fewer than eight across
    // a 28-day cycle.
    assert.ok(
      titles.size >= 8,
      `${country} indigenous plan only offered ${titles.size} distinct mains`
    );
  }
});

test('every dish is reachable from the plan it belongs to', () => {
  // Guards against a main sitting in a pool that the rotation never selects.
  for (const [code, cuisine] of Object.entries(COUNTRY_CUISINES)) {
    const plan = byDay(generate28DayPlan(code as CountryCode, 'indigenous'));
    const served = new Set<string>();
    for (const slots of plan.values()) {
      if (slots.afternoon) served.add(slots.afternoon);
      if (slots.evening) served.add(slots.evening);
    }
    const unreachable = Object.values(cuisine!.mains)
      .flat()
      .filter((dish) => !served.has(dish.title))
      .map((dish) => dish.title);
    assert.deepEqual(unreachable, [], `${code} never served: ${unreachable.join(', ')}`);
  }
});

test('the Nigerian plan is no longer a five-day cycle', () => {
  // Every Nigerian pool held one dish per protein, so days 1-5 repeated as
  // days 6-10 and each plate came round about six times in 28 days.
  const plan = generate28DayPlan('NG', 'indigenous');
  const counts = new Map<string, number>();
  for (const meal of plan) counts.set(meal.title, (counts.get(meal.title) ?? 0) + 1);

  assert.equal(counts.size, 45, 'expected 45 distinct Nigerian dishes (15 original + 30 added)');
  const worst = Math.max(...counts.values());
  assert.ok(worst <= 3, `a Nigerian dish still repeats ${worst} times in 28 days`);
});

test('catfish no longer fills every Nigerian fish slot', () => {
  // Catfish was the only fish in the afternoon and evening pools, so it came
  // round constantly. It should stay available, it is a staple, but it must not
  // dominate the fish slots or turn up in unrelated dishes.
  const plan = generate28DayPlan('NG', 'indigenous');

  const catfishMeals = plan.filter((meal) => /catfish/i.test(meal.title));
  assert.ok(catfishMeals.length > 0, 'catfish should still be on the menu');
  assert.ok(
    catfishMeals.length <= 6,
    `catfish was the dish for ${catfishMeals.length} of 84 Nigerian meals; expected it to be diluted`
  );

  const withCatfishIngredient = plan.filter((meal) =>
    meal.ingredients.some((item) => /catfish/i.test(item.name))
  );
  assert.ok(
    withCatfishIngredient.length <= 8,
    `catfish appears in the ingredients of ${withCatfishIngredient.length} of 84 meals`
  );

  const fishDishes = new Set(
    plan.filter((meal) => meal.proteinSourceType === 'fish').map((meal) => meal.title)
  );
  assert.ok(
    fishDishes.size >= 8,
    `only ${fishDishes.size} distinct fish dishes across the cycle`
  );

  // A majority-catfish fish rotation is the failure mode being guarded against.
  const catfishFishDishes = [...fishDishes].filter((title) => /catfish/i.test(title));
  assert.ok(
    catfishFishDishes.length * 2 <= fishDishes.size,
    `${catfishFishDishes.length} of ${fishDishes.size} fish dishes are catfish`
  );
});

test('generated meals point at photos that are actually served', () => {
  // The photos used to live at /src/assets/images/*.jpg, which only the Vite dev
  // server resolves. Production returned index.html for those paths, so every
  // meal rendered a broken image and hid the dish art behind it.
  const photos = readdirSync(path.join(process.cwd(), 'public', 'images'));
  assert.ok(photos.length > 0, 'public/images is empty');
  for (const photo of photos) {
    assert.match(photo, /\.(jpg|jpeg|png|webp)$/i, `${photo} is not an image`);
  }

  const plan = generate28DayPlan('NG', 'indigenous');
  for (const meal of plan) {
    if (!meal.imageUrl) continue;
    assert.ok(
      meal.imageUrl.startsWith('/images/'),
      `${meal.title} points outside public/: ${meal.imageUrl}`
    );
    assert.ok(
      photos.includes(meal.imageUrl.replace('/images/', '')),
      `${meal.title} references a missing photo: ${meal.imageUrl}`
    );
  }
});

test("a day's three meals never share one protein", () => {
  // The rotation used to be indexed by day alone, so all three meals on a given
  // day drew the same protein: catfish breakfast, catfish lunch, catfish dinner.
  // One catfish dish therefore showed up three times a row and recurred every
  // fifth day. Proteins now step once per meal.
  const countries = ['NG', 'GH', 'KE', 'US', 'CA', 'UK'] as const;
  const preferences = ['indigenous', 'balanced', 'continental'] as const;

  for (const country of countries) {
    for (const preference of preferences) {
      const plan = generate28DayPlan(country, preference);
      const label = `${country}/${preference}`;

      for (let day = 0; day < 28; day++) {
        const dayMeals = plan.slice(day * 3, day * 3 + 3);
        const proteins = dayMeals.map((m) => m.proteinSourceType);

        assert.equal(
          new Set(proteins).size,
          3,
          `${label} day ${day + 1} repeated a protein: ${proteins.join(', ')}`
        );
      }
    }
  }
});

test('no protein repeats back to back within a slot', () => {
  // Complements the same fix: crossing a day boundary must not hand the same
  // protein to two consecutive meals either.
  const plan = generate28DayPlan('NG', 'indigenous');

  for (let i = 1; i < plan.length; i++) {
    assert.notEqual(
      plan[i].proteinSourceType,
      plan[i - 1].proteinSourceType,
      `meals ${i} and ${i + 1} share ${plan[i].proteinSourceType}`
    );
  }
});

test('catfish never lands twice in one day', () => {
  const plan = generate28DayPlan('NG', 'indigenous');

  for (let day = 0; day < 28; day++) {
    const catfishThatDay = plan
      .slice(day * 3, day * 3 + 3)
      .filter((m) => /catfish/i.test(m.title));
    assert.ok(
      catfishThatDay.length <= 1,
      `day ${day + 1} served catfish ${catfishThatDay.length} times`
    );
  }
});
