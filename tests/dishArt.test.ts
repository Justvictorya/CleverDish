/**
 * Dish art tests.
 *
 * The plate has to be recognisable to someone who cannot read, so these pin
 * the things that quietly broke it before: a named starch losing to a
 * protein keyword, and the same glyph appearing twice on one plate.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { getDishArt } from '../src/data/dishArt';
import { generate28DayPlan } from '../src/data/rotationPlans';
import type { CountryCode, StaplePreference } from '../src/types';

const EVERY_COUNTRY: CountryCode[] = ['NG', 'GH', 'KE', 'US', 'CA', 'UK'];
const EVERY_PREFERENCE: StaplePreference[] = ['indigenous', 'continental', 'balanced'];

function allDishes() {
  const dishes = new Map<string, string>();
  for (const country of EVERY_COUNTRY) {
    for (const preference of EVERY_PREFERENCE) {
      for (const meal of generate28DayPlan(country, preference)) {
        dishes.set(meal.title, meal.proteinSourceType);
      }
    }
  }
  return dishes;
}

test('a named starch beats a protein keyword in the same title', () => {
  // Regression: the fish rule overrode the base, so a rice dish rendered on a
  // bed of greens.
  const rice = getDishArt({
    title: 'Village Parboiled Rice with Steamed Fresh Catfish & Ofada Stew',
    proteinSourceType: 'fish'
  });
  assert.equal(rice.base, 'rice');

  // Regression: "oatmeal swallow" resolved to an oatmeal bowl.
  const swallow = getDishArt({
    title: 'Smoked Chicken & Fresh Okra Soup with Light Oatmeal Swallow',
    proteinSourceType: 'poultry'
  });
  assert.equal(swallow.base, 'swallow');
});

test('bean cakes win over the flour they are served with', () => {
  // Regression: garri matched the swallow rule first, so a bean cake came out
  // as a dough mound.
  assert.equal(
    getDishArt({ title: 'Steamed Moi-Moin Elewe with Fortified Brown Garri Crunch', proteinSourceType: 'legumes_plant' }).base,
    'beans'
  );
  assert.equal(
    getDishArt({ title: 'Steamed Moin-Moin Elewe with Boiled Egg & Warm Veggie Broth', proteinSourceType: 'legumes_plant' }).base,
    'beans'
  );
});

test('well-known West African dishes resolve to their own plate', () => {
  const cases: Array<[string, string]> = [
    ['Smoky Firewood Jollof Rice with Char-Grilled Chicken & Fried Plantain', 'rice'],
    ['Waakye with Smoked Herring and Shito', 'rice'],
    ['Pounded Yam Swallow with Egusi Spinach Soup & Hard-Boiled Eggs', 'swallow'],
    ['Injera with Berbere and Tibs', 'flatbread'],
    ['Ugali with Creamy Chicken Stew', 'swallow'],
    ['Steamed Sweet Potato & 3-Egg Garden Egg Shakshuka', 'egg'],
    ['Boiled White Yam & Flaked Smoked Titus Pepper Sauce', 'root'],
    ['Whole Oats Porridge with Shredded Peppered Chicken Breast', 'oats']
  ];

  for (const [title, base] of cases) {
    assert.equal(getDishArt({ title, proteinSourceType: 'poultry' }).base, base, title);
  }
});

test('the protein in the title reaches the plate', () => {
  const fish = getDishArt({ title: 'Grilled Tilapia with Banku', proteinSourceType: 'fish' });
  assert.equal(fish.protein, '🐟');

  const chicken = getDishArt({ title: 'Char-Grilled Chicken with Fried Plantain', proteinSourceType: 'poultry' });
  assert.equal(chicken.protein, '🍗');

  const beef = getDishArt({ title: 'Beef Suya with Yoghurt', proteinSourceType: 'beef_lean' });
  assert.equal(beef.protein, '🥩');
});

test('no glyph appears twice on the same plate', () => {
  // Regression: the protein was repeated as a side, and the garnish collided
  // with a side, so plates showed the same picture twice.
  for (const [title, protein] of allDishes()) {
    const art = getDishArt({ title, proteinSourceType: protein });
    const onPlate = [art.protein, ...art.sides, art.garnish];
    assert.equal(
      new Set(onPlate).size,
      onPlate.length,
      `${title} repeats a glyph: ${onPlate.join(' ')}`
    );
  }
});

test('every dish in every market produces a usable, described plate', () => {
  const dishes = allDishes();
  assert.ok(dishes.size > 50, `expected a broad catalogue, got ${dishes.size}`);

  for (const [title, protein] of dishes) {
    const art = getDishArt({ title, proteinSourceType: protein });
    assert.ok(art.alt && art.alt.length >= 12, `${title} has no usable alt text`);
    assert.ok(art.sides.length >= 1, `${title} has no sides`);
    assert.match(art.sauceFrom, /^#[0-9A-F]{6}$/i, `${title} has a bad sauce colour`);
    assert.ok(art.base, `${title} has no base`);
  }
});

test('soupy dishes are distinguishable from dry plates', () => {
  assert.equal(getDishArt({ title: 'Fresh Catfish Pepper Soup', proteinSourceType: 'fish' }).soupy, true);
  assert.equal(getDishArt({ title: 'Fried Plantain with Grilled Chicken', proteinSourceType: 'poultry' }).soupy, false);
});

test('an unknown dish still renders something sensible', () => {
  const art = getDishArt({ title: 'Mystery Casserole', proteinSourceType: 'beef_lean' });
  assert.ok(art.base);
  assert.ok(art.protein);
  assert.ok(art.sides.length >= 1);
  assert.ok(art.alt.length >= 12);
});

test('an empty title does not crash', () => {
  const art = getDishArt({ title: '', proteinSourceType: 'fish' });
  assert.ok(art.base);
  assert.ok(art.protein);
});