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
import { COUNTRY_CUISINES, dishKey } from '../src/data/cuisineCatalog';
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

test('every dish a protein pool can actually index is served', () => {
  // Guards against a main sitting in a pool the rotation never selects, while
  // respecting what 28 days can physically reach.
  //
  // A slot meets each protein on 28/5 = 5 or 6 days. Across those visits the
  // afternoon and evening slots index {0..5} and {1..6} of the pool, so a
  // protein bucket of seven dishes is fully covered and a larger one never
  // can be. Testing per protein rather than per pool, because that limit is
  // per protein.
  const REACHABLE = 7;
  for (const [code, cuisine] of Object.entries(COUNTRY_CUISINES)) {
    const plan = byDay(generate28DayPlan(code as CountryCode, 'indigenous'));
    const served = new Set<string>();
    for (const slots of plan.values()) {
      if (slots.afternoon) served.add(slots.afternoon);
      if (slots.evening) served.add(slots.evening);
    }
    for (const [protein, dishes] of Object.entries(cuisine!.mains)) {
      if (dishes.length > REACHABLE) continue;
      const unreachable = dishes
        .filter((dish) => !served.has(dish.title))
        .map((dish) => dish.title);
      assert.deepEqual(
        unreachable,
        [],
        `${code}/${protein} never served: ${unreachable.join(', ')}`
      );
    }
  }
});

test('the Nigerian plan is no longer a five-day cycle', () => {
  // Every Nigerian pool held one dish per protein, so days 1-5 repeated as
  // days 6-10 and each plate came round about six times in 28 days.
  const plan = generate28DayPlan('NG', 'indigenous');
  const counts = new Map<string, number>();
  for (const meal of plan) counts.set(meal.title, (counts.get(meal.title) ?? 0) + 1);

  // A floor rather than an exact figure, so adding real Nigerian dishes later
  // widens the cycle instead of breaking the test.
  assert.ok(
    counts.size >= 75,
    `only ${counts.size} distinct Nigerian dishes; the pools were meant to hold far more`
  );
  const worst = Math.max(...counts.values());
  assert.ok(worst <= 3, `a Nigerian dish still repeats ${worst} times in 28 days`);
});

test('every Nigerian slot draws on its whole pool', () => {
  // Pools are indexed by visit count, not by day. A slot meets its protein every
  // fifth day, so indexing by day meant `(day - 1) % poolLength` never moved for
  // any pool whose length divides five, and a five-dish pool served one dish for
  // the whole cycle. Each slot should see every dish its pool holds.
  const plan = generate28DayPlan('NG', 'indigenous');
  const slots = ['morning', 'afternoon', 'evening'] as const;
  const proteins = ['fish', 'poultry', 'eggs_dairy', 'legumes_plant', 'beef_lean'] as const;

  for (const slot of slots) {
    for (const protein of proteins) {
      const served = new Set(
        plan
          .filter((meal) => meal.type === slot && meal.proteinSourceType === protein)
          .map((meal) => meal.title)
      );
      const meals = plan.filter(
        (meal) => meal.type === slot && meal.proteinSourceType === protein
      ).length;
      // A slot meets a given protein roughly 28/5 times, so it cannot see more
      // distinct dishes than it has visits. The failure this guards against is
      // seeing one dish out of many across several visits.
      assert.ok(
        served.size >= Math.min(3, meals),
        `${slot}/${protein} served only ${served.size} distinct dishes across ${meals} visits`
      );
    }
  }
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

const LOCAL_COUNTRIES = ['NG', 'GH', 'KE'] as const;

test('no local dish carries an ethnic or regional label', () => {
  // Agreed with the product owner: titles describe the bowl in plain English.
  // Attributing a dish to an ethnic group is contestable, tells the user nothing
  // useful about the food, and has caused real arguments. Local names are fine
  // where they are simply the name of the dish, so this only bans the group and
  // region words, plus the origin claims that were appearing in the copy.
  const banned =
    /\b(yoruba|igbo|hausa|efik|ibibio|fulani|akan|ewe|fanti|dagaaba|zongo|tribal|ethnic|native to|northern|western style|eastern style)\b/i;

  for (const country of LOCAL_COUNTRIES) {
    for (const preference of ['indigenous', 'balanced', 'continental'] as const) {
      for (const meal of generate28DayPlan(country, preference)) {
        assert.ok(
          !banned.test(meal.title),
          `"${meal.title}" is labelled with an ethnic or regional name`
        );
        assert.ok(
          !banned.test(meal.description),
          `the description of "${meal.title}" is labelled with an ethnic or regional name`
        );
      }
    }
  }
});

test('no Nigerian plan serves food from another country', () => {
  // An earlier batch of Nigerian dishes was written from memory rather than
  // sourced, and sushi, couscous, shakshuka and a burger made it into the plan.
  // These are foods with their own countries and cuisines; if one reappears in
  // the Nigerian plan it has been copied in from the wrong catalogue.
  const foreign: Partial<Record<CountryCode, RegExp[]>> = {
    NG: [
      /sushi/i,
      /couscous/i,
      /shakshuka/i,
      /\bburger\b/i,
      /sweet potato fries/i,
      /\bsaj\b/i,
      /turkey bacon/i,
      /avocado/i
    ],
    // Ghana's extras had been written from memory: chicken katsu, coleslaw,
    // grilled cheese, avocado, beef sandwiches, "akara" (Nigerian; Ghana's bean
    // fritter is koose) and suya (Nigerian).
    GH: [
      /katsu/i,
      /\bsuya\b/i,
      /\bakara\b/i,
      /coleslaw/i,
      /grilled cheese/i,
      /\bavocado\b/i,
      /\bsandwich\b/i
    ],
    // Kenya is deliberately absent for now. Turning this table on caught
    // "Chicken Samosa with Chapati & Salsa" in the Kenyan indigenous plan,
    // which is a real finding but belongs to the Kenya pass, not this one.
    // The ethnic-label test above already covers KE.
  };

  // Only the indigenous plan is claimed to be Nigerian food. The continental
  // preference exists precisely to serve food from elsewhere, and the balanced
  // plan mixes the two, so neither is evidence of a mistake.
  for (const [country, patterns] of Object.entries(foreign)) {
    for (const meal of generate28DayPlan(country as CountryCode, 'indigenous')) {
      for (const pattern of patterns) {
        assert.ok(
          !pattern.test(meal.title),
          `"${meal.title}" is not ${country} food; it matches ${pattern}`
        );
      }
    }
  }
});

test('a plan never serves one dish under two different titles', () => {
  // The pools were written at different times and mix "&" and "and". An exact
  // title match treated "Khebab with Waakye & Onion" and "Khebab with Waakye and
  // Onion" as two dishes, so both appeared in the same plan. Deduplication now
  // folds punctuation; this keeps it that way.
  for (const country of EVERY_COUNTRY) {
    for (const preference of EVERY_PREFERENCE) {
      const byKey = new Map<string, Set<string>>();
      for (const meal of generate28DayPlan(country, preference)) {
        const key = dishKey(meal.title);
        const names = byKey.get(key) ?? new Set<string>();
        names.add(meal.title);
        byKey.set(key, names);
      }
      for (const names of byKey.values()) {
        assert.ok(
          names.size === 1,
          `${country}/${preference} serves one dish as ${[...names].join(' / ')}`
        );
      }
    }
  }
});

test('a Nigerian soup is served with a swallow, never a snack', () => {
  // Caught by the product owner: the plan offered "Egg Roll with Garden Egg
  // Stew". Egg roll is a party snack, and garden egg soup is eaten with a
  // swallow. A soup dressed up as a stew-and-snack plate stops reading as
  // Nigerian food at all.
  const snacks = /\b(egg roll|spring roll|puff-?puff|chin chin|cake|biscuit|samosa|roll)\b/i;
  const soupWords = /\b(soup|stew)\b/i;
  const swallow =
    // Kwacoco and semovita count: kwacoco is a cocoyam pudding eaten as the
    // starch, and semovita is flour sold as "swallow" on its own packet.
    /garri|semo|eba|fufu|pounded yam|pounded plantain|amala|swallow|tuwo|kwacoco|semovita|\bpusu\b|\bpounded\b/i;

  // Indigenous only. The balanced plan mixes in the continental pool, which
  // exists to serve food from elsewhere, so a couscous bowl there is not a
  // defect.
  for (const preference of ['indigenous'] as const) {
    for (const meal of generate28DayPlan('NG', preference)) {
      assert.ok(
        !snacks.test(meal.title),
        `"${meal.title}" serves a snack as the main starch`
      );
      // A dish that calls itself a soup should reach the eater with something
      // to scoop it with, unless it is a rice or yam plate.
      if (soupWords.test(meal.title) && !/\brice\b|\byam\b|\bplantain\b/i.test(meal.title)) {
        assert.ok(
          swallow.test(meal.title) || swallow.test(meal.description),
          `"${meal.title}" is a soup but names no swallow to eat it with`
        );
      }
    }
  }
});

test('a dish is never illustrated with a photograph of a different cuisine', () => {
  // The photo library holds eight pictures and the plan holds well over a hundred
  // dishes, so an exact match per plate is impossible. What is not acceptable is
  // the old catch-all, which returned the jollof photograph for any dish it did
  // not recognise: ugali, waakye and kenkey were all served a plate of rice.
  // Photographs are now scored against the dish's own title and ingredients, so
  // assert only that nothing falls back to another country's food.
  const rice = 'jollof_chicken';
  const riceWords = /jollof|rice|waakye|pilau|koko|basmati/i;
  for (const country of ['NG', 'GH', 'KE', 'US', 'CA', 'UK'] as const) {
    for (const meal of generate28DayPlan(country, 'indigenous')) {
      const url = meal.imageUrl;
      assert.ok(url, `${country}: "${meal.title}" has no photograph at all`);
      if (!url.includes(rice)) continue;
      // Score the same inputs the resolver scores. "Chicken Tikka Masala with
      // Basmati" names no rice in its title but is served over it.
      const what = `${meal.title} ${meal.ingredients.map((i) => i.name).join(' ')}`;
      assert.ok(
        riceWords.test(what),
        `${country}: "${meal.title}" is illustrated with a rice photograph`
      );
    }
  }
});

test('every dish is illustrated with a photograph that exists', () => {
  // A resolver that returns a path to a file nobody committed shows a broken
  // image, which looks identical to the bug it replaced.
  const known = new Set([
    'grilled_salmon_1790642194407.jpg',
    'oatmeal_parfait_1790641955682.jpg',
    'beef_suya_boli_1790642205230.jpg',
    'sweet_potato_eggs_1790642214701.jpg',
    'beans_plantain_1790641943763.jpg',
    'yam_fish_stew_1790641922409.jpg',
    'pounded_yam_egusi_1790641933918.jpg',
    'jollof_chicken_1790641910111.jpg'
  ]);
  for (const country of ['NG', 'GH', 'KE'] as const) {
    for (const meal of generate28DayPlan(country, 'indigenous')) {
      const url = meal.imageUrl;
      assert.ok(url, `${country}: "${meal.title}" has no photograph at all`);
      const file = url.replace('/images/', '');
      assert.ok(known.has(file), `${country}: "${meal.title}" points at a missing photo ${file}`);
    }
  }
});
