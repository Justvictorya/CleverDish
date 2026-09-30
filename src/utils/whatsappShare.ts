import { Meal, CountryInfo } from '../types';

export const shareMealToWhatsApp = (meal: Meal, country: CountryInfo) => {
  const ingredientsList = meal.ingredients
    .map(i => `• ${i.name} (${i.gramWeight}g) — ${country.currencySymbol}${i.cost.toLocaleString()}`)
    .join('\n');

  const text = `🍽️ *CleverDish Daily Meal Plan*
*${meal.title}* (${meal.type === 'morning' ? 'Breakfast' : 'Dinner'})

⚡ *Macros & Calories:*
• Calories: ${meal.calories} kcal
• Protein: ${meal.protein}g | Carbs: ${meal.carbs}g | Fat: ${meal.fat}g

🛒 *Market Sourcing List (${country.name}):*
${ingredientsList}

💰 *Est. Total Spend:* ${country.currencySymbol}${meal.estimatedCost.toLocaleString()}
⏱️ *Prep Time:* ${meal.cookTimeMinutes} mins
📍 *Recommended Market:* ${country.defaultMarkets[0] || 'Local Open Market'}

_Sent via CleverDish Smart Nutrition & Local Budget Engine_`;

  const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
};

export const shareWeeklyMarketListToWhatsApp = (
  items: Array<{ name: string; bulkUnit: string; totalGrams: number; estimatedCost: number; stallCategory: string }>,
  totalCost: number,
  savings: number,
  country: CountryInfo
) => {
  // Group by stall category
  const categories: Record<string, string[]> = {};
  items.forEach(item => {
    if (!categories[item.stallCategory]) {
      categories[item.stallCategory] = [];
    }
    categories[item.stallCategory].push(
      `• ${item.name} (${item.bulkUnit}) — ${country.currencySymbol}${item.estimatedCost.toLocaleString()}`
    );
  });

  let categoryBreakdown = '';
  for (const [cat, lines] of Object.entries(categories)) {
    categoryBreakdown += `\n📍 *${cat}:*\n${lines.join('\n')}\n`;
  }

  const text = `🛒 *CleverDish 7-Day Saturday Open-Market Run List*
🌍 Market: *${country.defaultMarkets.join(' / ')}* (${country.name})
${categoryBreakdown}
💵 *Estimated Bulk Total:* ${country.currencySymbol}${totalCost.toLocaleString()}
🎁 *Estimated Bulk Market Savings:* ~${country.currencySymbol}${savings.toLocaleString()} (vs daily retail)

_Sent via CleverDish Weekly Market Run Engine_`;

  const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
};
