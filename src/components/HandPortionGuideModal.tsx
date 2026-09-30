import React, { useState } from 'react';
import { Meal } from '../types';
import { X, Sparkles, Hand, Scale, Info, CheckCircle2 } from 'lucide-react';
import { soundFX } from '../utils/sound';

interface HandPortionGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentMeal?: Meal | null;
}

export const HandPortionGuideModal: React.FC<HandPortionGuideModalProps> = ({
  isOpen,
  onClose,
  currentMeal
}) => {
  const [activeTab, setActiveTab] = useState<'universal' | 'meal'>('meal');

  if (!isOpen) return null;

  // Approximate conversions based on standard sports nutrition hand-portion method
  // 1 Palm = ~25-30g protein (~120-150g cooked meat/fish)
  // 1 Fist = ~35-40g carbs (~150-180g cooked yam/rice/sweet potato)
  // 1 Cupped Hand = ~5-10g fiber / veggies (~100g leafy greens)
  // 1 Thumb = ~12-15g fat (~1 tbsp oil/butter/egusi)
  const palmsCount = currentMeal ? (currentMeal.protein / 25).toFixed(1) : '1.0';
  const fistsCount = currentMeal ? (currentMeal.carbs / 35).toFixed(1) : '1.0';
  const thumbsCount = currentMeal ? (currentMeal.fat / 12).toFixed(1) : '1.0';
  const cuppedHandsCount = currentMeal && currentMeal.fiber > 6 ? '1.5' : '1.0';

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#18181B] rounded-3xl max-w-xl w-full border border-stone-200 dark:border-zinc-800 shadow-2xl overflow-hidden transition-colors my-8">
        {/* Modal Header */}
        <div className="p-6 border-b border-stone-100 dark:border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Hand className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg text-stone-900 dark:text-zinc-100">
                Hand-Size Portion Guide 🖐️
              </h3>
              <p className="text-xs text-stone-500 dark:text-zinc-400">
                Zero kitchen scale required: portion plates accurately anywhere.
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

        {/* Tab Switcher */}
        <div className="px-6 pt-4">
          <div className="p-1 bg-stone-100 dark:bg-zinc-800/80 rounded-2xl flex items-center gap-1 text-xs font-bold">
            <button
              onClick={() => {
                soundFX.playTap();
                setActiveTab('meal');
              }}
              className={`flex-1 py-2 px-3 rounded-xl transition-all ${
                activeTab === 'meal'
                  ? 'bg-white dark:bg-zinc-900 text-stone-900 dark:text-zinc-100 shadow-xs'
                  : 'text-stone-500 dark:text-zinc-400'
              }`}
            >
              {currentMeal ? `Plate Breakdown: ${currentMeal.title.slice(0, 18)}...` : 'Active Meal Breakdown'}
            </button>

            <button
              onClick={() => {
                soundFX.playTap();
                setActiveTab('universal');
              }}
              className={`flex-1 py-2 px-3 rounded-xl transition-all ${
                activeTab === 'universal'
                  ? 'bg-white dark:bg-zinc-900 text-stone-900 dark:text-zinc-100 shadow-xs'
                  : 'text-stone-500 dark:text-zinc-400'
              }`}
            >
              Universal Hand Metrics
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          {activeTab === 'meal' && currentMeal && (
            <div className="space-y-4">
              <div className="p-3.5 bg-stone-50 dark:bg-zinc-850 rounded-2xl border border-stone-200 dark:border-zinc-750">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-bold text-[#7A1C2C] dark:text-rose-400 uppercase tracking-wider text-[10px]">
                    Target Meal Plate
                  </span>
                  <span className="font-mono text-stone-500">{currentMeal.calories} kcal</span>
                </div>
                <h4 className="font-bold text-sm text-stone-900 dark:text-zinc-100">{currentMeal.title}</h4>
                <div className="text-[11px] text-stone-500 dark:text-zinc-400 font-mono mt-1">
                  {currentMeal.protein}g Protein · {currentMeal.carbs}g Carbs · {currentMeal.fat}g Fat · {currentMeal.fiber}g Fiber
                </div>
              </div>

              {/* Converted Hand Portions */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                {/* 1. Protein Palm */}
                <div className="p-3.5 rounded-2xl bg-rose-50/60 dark:bg-rose-950/20 border border-rose-200/80 dark:border-rose-900/40 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xl">✋</span>
                    <span className="font-black text-rose-800 dark:text-rose-300 font-mono text-sm">
                      {palmsCount} Palms
                    </span>
                  </div>
                  <div className="font-bold text-rose-900 dark:text-rose-200">Protein Portion</div>
                  <p className="text-[11px] text-rose-700 dark:text-rose-400 leading-tight">
                    {currentMeal.protein}g protein: size of your open palm (excluding fingers). Thickness of your palm.
                  </p>
                </div>

                {/* 2. Carbs Fist */}
                <div className="p-3.5 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/40 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xl">✊</span>
                    <span className="font-black text-amber-800 dark:text-amber-300 font-mono text-sm">
                      {fistsCount} Fists
                    </span>
                  </div>
                  <div className="font-bold text-amber-900 dark:text-amber-200">Carbs / Swallow</div>
                  <p className="text-[11px] text-amber-700 dark:text-amber-400 leading-tight">
                    {currentMeal.carbs}g carbs: volume of your clenched fist for rice, yam, plantain or swallow.
                  </p>
                </div>

                {/* 3. Veggies Cupped Hand */}
                <div className="p-3.5 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-900/40 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xl">🤲</span>
                    <span className="font-black text-emerald-800 dark:text-emerald-300 font-mono text-sm">
                      {cuppedHandsCount} Cupped Hands
                    </span>
                  </div>
                  <div className="font-bold text-emerald-900 dark:text-emerald-200">Leafy Veggies</div>
                  <p className="text-[11px] text-emerald-700 dark:text-emerald-400 leading-tight">
                    {currentMeal.fiber}g fiber: two open cupped hands heaped with Ugu, waterleaf, spinach or garden salad.
                  </p>
                </div>

                {/* 4. Healthy Fats Thumb */}
                <div className="p-3.5 rounded-2xl bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200/80 dark:border-blue-900/40 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xl">👍</span>
                    <span className="font-black text-blue-800 dark:text-blue-300 font-mono text-sm">
                      {thumbsCount} Thumbs
                    </span>
                  </div>
                  <div className="font-bold text-blue-900 dark:text-blue-200">Cooking Oil / Fat</div>
                  <p className="text-[11px] text-blue-700 dark:text-blue-400 leading-tight">
                    {currentMeal.fat}g fat: size from knuckle to tip of your thumb for red palm oil, pure soya oil, or peanut paste.
                  </p>
                </div>
              </div>

              {/* Buka / Restaurant Ordering Pro-Tip */}
              <div className="p-3 bg-stone-100 dark:bg-zinc-800 rounded-2xl text-xs space-y-1 text-stone-700 dark:text-zinc-300">
                <div className="font-bold text-stone-900 dark:text-zinc-100 flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-[#2ECC71]" />
                  <span>Ordering at a Local Buka or Canteen?</span>
                </div>
                <p className="text-[11px] leading-relaxed text-stone-600 dark:text-zinc-400">
                  Ask the server for <strong>1 fist of swallow or rice</strong> and <strong>1 to 2 palm-sized cuts of meat/fish</strong>, requesting "moderate oil on the soup spoon" to hit your target calories cleanly!
                </p>
              </div>
            </div>
          )}

          {activeTab === 'universal' && (
            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-2xl border border-stone-200 dark:border-zinc-800 bg-stone-50 dark:bg-zinc-850 flex items-start gap-3">
                <span className="text-2xl">✋</span>
                <div>
                  <h5 className="font-bold text-stone-900 dark:text-zinc-100">1 Palm = ~25-30g Protein</h5>
                  <p className="text-[11px] text-stone-500 dark:text-zinc-400 mt-0.5">
                    Equals 1 piece of Titus mackerel, 1 chicken thigh/breast, 3 medium eggs, or 2 large bean moi-moi.
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-2xl border border-stone-200 dark:border-zinc-800 bg-stone-50 dark:bg-zinc-850 flex items-start gap-3">
                <span className="text-2xl">✊</span>
                <div>
                  <h5 className="font-bold text-stone-900 dark:text-zinc-100">1 Fist = ~35-40g Complex Carbs</h5>
                  <p className="text-[11px] text-stone-500 dark:text-zinc-400 mt-0.5">
                    Equals 1 small tuber cut of boiled yam, 1 cup cooked smoky jollof, or 1 tennis-ball sized swallow (oat swallow or wheat).
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-2xl border border-stone-200 dark:border-zinc-800 bg-stone-50 dark:bg-zinc-850 flex items-start gap-3">
                <span className="text-2xl">🤲</span>
                <div>
                  <h5 className="font-bold text-stone-900 dark:text-zinc-100">1-2 Cupped Hands = Vegetables</h5>
                  <p className="text-[11px] text-stone-500 dark:text-zinc-400 mt-0.5">
                    Steamed pumpkin leaves (Ugu), Gboma, waterleaf, steamed green beans, shredded garden cabbage.
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-2xl border border-stone-200 dark:border-zinc-800 bg-stone-50 dark:bg-zinc-850 flex items-start gap-3">
                <span className="text-2xl">👍</span>
                <div>
                  <h5 className="font-bold text-stone-900 dark:text-zinc-100">1 Thumb = ~12-15g Healthy Fats</h5>
                  <p className="text-[11px] text-stone-500 dark:text-zinc-400 mt-0.5">
                    1 tablespoon red palm oil, pure vegetable soya oil, olive oil, or 1 tablespoon crushed roasted egusi seeds.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-stone-100 dark:border-zinc-800 bg-stone-50/50 dark:bg-zinc-900 flex justify-end">
          <button
            onClick={() => {
              soundFX.playTap();
              onClose();
            }}
            className="px-5 py-2 bg-stone-900 dark:bg-zinc-800 hover:bg-stone-800 text-white font-bold text-xs rounded-xl cursor-pointer"
          >
            Got it, Close
          </button>
        </div>
      </div>
    </div>
  );
};
