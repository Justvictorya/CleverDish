import React, { useState } from 'react';
import { Meal, CountryInfo, IngredientItem } from '../types';
import {
  X,
  Refrigerator,
  Sparkles,
  CheckCircle2,
  RefreshCw,
  Clock,
  ArrowRight,
  Flame,
  ChefHat
} from 'lucide-react';
import { soundFX } from '../utils/sound';

interface FridgeRescueModalProps {
  isOpen: boolean;
  onClose: () => void;
  meal: Meal | null;
  onApplyRescueMeal: (originalMealId: string, rescuedMeal: Meal) => void;
  country: CountryInfo;
}

export const FridgeRescueModal: React.FC<FridgeRescueModalProps> = ({
  isOpen,
  onClose,
  meal,
  onApplyRescueMeal,
  country
}) => {
  const [selectedProtein, setSelectedProtein] = useState<string>('Eggs (3 large)');
  const [selectedCarb, setSelectedCarb] = useState<string>('Ripe Plantain (Dodo / Boiled)');
  const [customPantryNote, setCustomPantryNote] = useState<string>('');

  if (!isOpen || !meal) return null;

  const proteinOptions = [
    { label: 'Eggs (3 large farm eggs)', type: 'eggs_dairy' as const, protein: 21, calories: 210, name: 'Fresh Farm Eggs' },
    { label: 'Canned Sardines in Vegetable Oil', type: 'fish' as const, protein: 24, calories: 230, name: 'Canned Sardines' },
    { label: 'Smoked Mackerel / Titus Fish', type: 'fish' as const, protein: 26, calories: 240, name: 'Smoked Mackerel' },
    { label: 'Leftover Chicken / Turkey cuts', type: 'poultry' as const, protein: 30, calories: 220, name: 'Cooked Chicken' },
    { label: 'Canned Red Kidney Beans / Honey Beans', type: 'legumes_plant' as const, protein: 18, calories: 250, name: 'Cooked Beans' },
    { label: 'Canned Corned Beef / Minced Meat', type: 'beef_lean' as const, protein: 25, calories: 270, name: 'Lean Minced Beef' }
  ];

  const carbOptions = [
    { label: 'Ripe Plantain (Dodo / Boiled)', carbs: 55, calories: 240, name: 'Ripe Plantain' },
    { label: 'Tubers of White / Sweet Potato', carbs: 50, calories: 220, name: 'Sweet Potato' },
    { label: 'White / Brown Basmati Rice', carbs: 60, calories: 260, name: 'Cooked Rice' },
    { label: 'White / Yellow Garri (Eba or Drinking)', carbs: 55, calories: 230, name: 'Garri' },
    { label: 'Rolled Oats / Oatmeal', carbs: 45, calories: 200, name: 'Whole Grain Oats' },
    { label: 'Yam Slices (Boiled or Roasted)', carbs: 52, calories: 230, name: 'Puna Yam' }
  ];

  const activeProteinObj = proteinOptions.find(p => p.label === selectedProtein) || proteinOptions[0];
  const activeCarbObj = carbOptions.find(c => c.label === selectedCarb) || carbOptions[0];

  // Calculated rescued meal title & nutrition
  const rescuedTitle = `Quick Pan-Seared ${activeProteinObj.name} with ${activeCarbObj.name}`;
  const totalCalories = activeProteinObj.calories + activeCarbObj.calories + 80; // plus cooking oil & seasoning
  const totalProtein = activeProteinObj.protein + 4;
  const totalCarbs = activeCarbObj.carbs + 2;
  const totalFat = Math.round((totalCalories - (totalProtein * 4 + totalCarbs * 4)) / 9);

  const handleApply = () => {
    soundFX.playStreakCelebration();

    const rescuedIngredients: IngredientItem[] = [
      {
        id: `ing_rescue_1_${Date.now()}`,
        name: activeProteinObj.name,
        gramWeight: 200,
        cost: Math.round(meal.estimatedCost * 0.45),
        protein: activeProteinObj.protein,
        carbs: 0,
        fat: 8,
        fiber: 0,
        sourcingLocation: 'Home Fridge / Pantry'
      },
      {
        id: `ing_rescue_2_${Date.now()}`,
        name: activeCarbObj.name,
        gramWeight: 220,
        cost: Math.round(meal.estimatedCost * 0.35),
        protein: 3,
        carbs: activeCarbObj.carbs,
        fat: 2,
        fiber: 4,
        sourcingLocation: 'Home Pantry Shelf'
      },
      {
        id: `ing_rescue_3_${Date.now()}`,
        name: 'Fresh Tomatoes & Scotch Bonnet',
        gramWeight: 80,
        cost: Math.round(meal.estimatedCost * 0.1),
        protein: 1,
        carbs: 2,
        fat: 0,
        fiber: 2,
        sourcingLocation: 'Pantry Pepper Basket'
      }
    ];

    const rescuedMeal: Meal = {
      ...meal,
      title: rescuedTitle,
      description: `Fridge rescue adaptation using available pantry staples: ${activeProteinObj.name} paired with ${activeCarbObj.name}. Calibrated to your target calories.`,
      proteinSourceType: activeProteinObj.type,
      calories: totalCalories,
      protein: totalProtein,
      carbs: totalCarbs,
      fat: Math.max(8, totalFat),
      fiber: 6,
      estimatedCost: Math.round(meal.estimatedCost * 0.8),
      cookTimeMinutes: 15,
      ingredients: rescuedIngredients,
      prepInstructions: [
        `Dice the ${activeCarbObj.name} and prepare for quick steam, boil, or light shallow pan-sear.`,
        `Gently sauté the peppers and onions, then fold in the ${activeProteinObj.name}.`,
        `Season lightly with local aromatics, simmer for 5 minutes, plate hot and serve.`
      ],
      isSwapped: true,
      swapInfo: {
        swappedIngredient: `${activeProteinObj.name} & ${activeCarbObj.name}`,
        newCost: Math.round(meal.estimatedCost * 0.8),
        costSavingsPercent: 20,
        rationale: 'Instant Pantry Rescue using items already available in your kitchen.'
      }
    };

    onApplyRescueMeal(meal.id, rescuedMeal);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#18181B] rounded-3xl max-w-xl w-full border border-stone-200 dark:border-zinc-800 shadow-2xl overflow-hidden transition-colors my-6">
        {/* Header */}
        <div className="p-6 border-b border-stone-100 dark:border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-[#2ECC71] flex items-center justify-center font-bold">
              <Refrigerator className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base sm:text-lg text-stone-900 dark:text-zinc-100">
                  "Fridge Rescue" Instant Meal Swap 🔄
                </h3>
                <span className="text-[10px] font-bold text-[#2ECC71] bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                  Pantry Match
                </span>
              </div>
              <p className="text-xs text-stone-500 dark:text-zinc-400">
                Missing ingredients? Select what you have in your kitchen to generate an instant macro-matched meal.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              soundFX.playTap();
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-stone-100 dark:bg-zinc-800 text-stone-500 hover:text-stone-900 dark:hover:text-zinc-100 flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto text-xs">
          {/* Current Scheduled Meal Being Rescued */}
          <div className="p-3.5 bg-stone-50 dark:bg-zinc-850 rounded-2xl border border-stone-200 dark:border-zinc-750">
            <div className="text-[10px] font-bold text-stone-400 dark:text-zinc-400 uppercase tracking-wider">
              Currently Scheduled Today:
            </div>
            <div className="font-bold text-sm text-stone-900 dark:text-zinc-100 mt-0.5">
              {meal.title} ({meal.calories} kcal)
            </div>
          </div>

          {/* Step 1: Select Available Protein */}
          <div className="space-y-1.5">
            <label className="font-bold text-stone-700 dark:text-zinc-300 uppercase tracking-wider text-[11px] block">
              1. What Protein is in Your Fridge / Freezer / Pantry?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {proteinOptions.map(p => (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => {
                    soundFX.playTap();
                    setSelectedProtein(p.label);
                  }}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                    selectedProtein === p.label
                      ? 'border-[#7A1C2C] dark:border-rose-400 bg-[#7A1C2C]/5 dark:bg-[#7A1C2C]/20 text-[#7A1C2C] dark:text-rose-300 font-bold ring-1 ring-[#7A1C2C]'
                      : 'border-stone-200 dark:border-zinc-750 bg-stone-50/60 dark:bg-zinc-850 text-stone-700 dark:text-zinc-300 hover:border-stone-300'
                  }`}
                >
                  <div className="truncate">{p.label}</div>
                  <div className="text-[10px] text-stone-400 font-mono mt-0.5">~{p.protein}g protein</div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Select Available Carb */}
          <div className="space-y-1.5">
            <label className="font-bold text-stone-700 dark:text-zinc-300 uppercase tracking-wider text-[11px] block">
              2. What Carbohydrate / Swallow Staple Do You Have?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {carbOptions.map(c => (
                <button
                  key={c.label}
                  type="button"
                  onClick={() => {
                    soundFX.playTap();
                    setSelectedCarb(c.label);
                  }}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                    selectedCarb === c.label
                      ? 'border-[#2ECC71] dark:border-emerald-400 bg-emerald-50/60 dark:bg-emerald-950/20 text-emerald-900 dark:text-emerald-300 font-bold ring-1 ring-[#2ECC71]'
                      : 'border-stone-200 dark:border-zinc-750 bg-stone-50/60 dark:bg-zinc-850 text-stone-700 dark:text-zinc-300 hover:border-stone-300'
                  }`}
                >
                  <div className="truncate">{c.label}</div>
                  <div className="text-[10px] text-stone-400 font-mono mt-0.5">~{c.carbs}g carbs</div>
                </button>
              ))}
            </div>
          </div>

          {/* Rescued Plating Live Preview Box */}
          <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/80 space-y-2">
            <div className="flex items-center justify-between text-emerald-900 dark:text-emerald-200 font-bold">
              <span className="flex items-center gap-1.5">
                <ChefHat className="w-4 h-4 text-[#2ECC71]" />
                <span>Rescued Recipe Preview:</span>
              </span>
              <span className="font-mono text-[11px] bg-white dark:bg-zinc-900 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-700">
                ⚡ 15 mins prep
              </span>
            </div>

            <div className="font-black text-sm text-stone-900 dark:text-zinc-100">
              {rescuedTitle}
            </div>

            <div className="flex items-center gap-2 font-mono text-[11px] text-emerald-900 dark:text-emerald-300">
              <span>{totalCalories} kcal</span>
              <span>·</span>
              <span>{totalProtein}g Protein</span>
              <span>·</span>
              <span>{totalCarbs}g Carbs</span>
              <span>·</span>
              <span>{Math.max(8, totalFat)}g Fat</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-stone-100 dark:border-zinc-800 bg-stone-50/50 dark:bg-zinc-900 flex items-center justify-between">
          <button
            onClick={() => {
              soundFX.playTap();
              onClose();
            }}
            className="text-xs text-stone-500 hover:text-stone-800 dark:hover:text-zinc-200 font-bold"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleApply}
            className="px-5 py-2.5 bg-[#2ECC71] hover:bg-[#27ae60] text-white font-black text-xs rounded-xl shadow-md flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Apply Rescue Swap to Today's Plan</span>
          </button>
        </div>
      </div>
    </div>
  );
};
