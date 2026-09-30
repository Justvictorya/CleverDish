import React, { useState } from 'react';
import { Meal, UserProfile } from '../types';
import { RefreshCw, ArrowRight, TrendingDown, Check, X, Sparkles, ChefHat } from 'lucide-react';
import { COUNTRIES } from '../data/countries';
import { soundFX } from '../utils/sound';
import { apiFetch } from '../utils/api';

interface InflationSwapModalProps {
  meal: Meal;
  profile: UserProfile;
  isOpen: boolean;
  onClose: () => void;
  onApplySwap: (mealId: string, swapData: any) => void;
}

export const InflationSwapModal: React.FC<InflationSwapModalProps> = ({
  meal,
  profile,
  isOpen,
  onClose,
  onApplySwap
}) => {
  const [loading, setLoading] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState<string>(
    meal.ingredients[0]?.name || 'Primary Protein'
  );
  const [swapResult, setSwapResult] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const country = COUNTRIES[profile.country] || COUNTRIES.NG;
  const currentCost = meal.ingredients.find(i => i.name === selectedIngredient)?.cost || Math.round(meal.estimatedCost * 0.5);

  const handleGenerateSwap = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiFetch(profile.id, '/api/ai/inflation-swap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mealName: meal.title,
          currentIngredient: selectedIngredient,
          currentCost,
          currency: country.currencySymbol,
          country: country.name,
          staplePreference: profile.staplePreference,
          targetMacros: {
            protein: meal.protein,
            carbs: meal.carbs,
            fat: meal.fat
          }
        })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to calculate inflation swap');
      }

      setSwapResult(data.swap);
      soundFX.playInflationSwap();
    } catch (err: any) {
      setError(err.message || 'Error executing AI inflation swap.');
    } finally {
      setLoading(false);
    }
  };

  const handleApply = () => {
    if (!swapResult) return;
    onApplySwap(meal.id, {
      swappedIngredient: swapResult.swappedIngredient,
      newCost: swapResult.newCost,
      costSavingsPercent: swapResult.costSavingsPercent,
      rationale: swapResult.rationale,
      macroBreakdown: swapResult.macroBreakdown
    });
    soundFX.playTap();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden">
        {/* Top Maroon Banner */}
        <div className="bg-[#7A1C2C] text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
              <RefreshCw className="w-5 h-5 text-[#2ECC71]" />
            </div>
            <div>
              <h3 className="font-bold text-base tracking-tight">The "Inflation Swap" Engine 🔄</h3>
              <p className="text-xs text-white/80">Macro-equivalent cost-slashing substitutions</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg text-white/80 hover:text-white hover:bg-white/10 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Target meal context */}
          <div>
            <div className="text-xs text-stone-500 font-semibold uppercase tracking-wider mb-1">Meal Target</div>
            <div className="text-base font-bold text-stone-900">{meal.title}</div>
            <div className="text-xs text-stone-600 mt-0.5">
              Current Est. Cost: {country.currencySymbol}{meal.estimatedCost.toLocaleString()} · Macros: {meal.protein}g P / {meal.carbs}g C / {meal.fat}g F
            </div>
          </div>

          {/* Select ingredient that experienced market spike */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">
              Select High-Cost or Inflated Ingredient:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {meal.ingredients.map((ing) => (
                <button
                  key={ing.id}
                  type="button"
                  onClick={() => {
                    setSelectedIngredient(ing.name);
                    setSwapResult(null);
                  }}
                  className={`p-2.5 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${
                    selectedIngredient === ing.name
                      ? 'border-[#7A1C2C] bg-[#7A1C2C]/5 font-semibold text-[#7A1C2C] shadow-xs'
                      : 'border-stone-200 hover:border-stone-300 text-stone-700 bg-white'
                  }`}
                >
                  <span className="truncate mr-2">{ing.name} ({ing.gramWeight}g)</span>
                  <span className="font-mono text-stone-500 shrink-0">{country.currencySymbol}{ing.cost.toLocaleString()}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Trigger AI Engine button */}
          {!swapResult && (
            <button
              onClick={handleGenerateSwap}
              disabled={loading}
              className="w-full py-3 px-4 bg-[#7A1C2C] hover:bg-[#631623] text-white font-bold text-sm rounded-xl shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-[#2ECC71]" />
                  <span>Analyzing Local {country.name} Market Equivalents...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-[#2ECC71]" />
                  <span>Compute Macro-Equivalent Inflation Swap</span>
                </>
              )}
            </button>
          )}

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl">
              {error}
            </div>
          )}

          {/* Swap Results Comparison */}
          {swapResult && (
            <div className="space-y-4 animate-in fade-in zoom-in-95 duration-200">
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/90 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-500">Restructured Swap</span>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-[#2ECC71] bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                    <TrendingDown className="w-3.5 h-3.5" />
                    <span>Save {swapResult.costSavingsPercent}%</span>
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3 text-sm">
                  <div className="flex-1 p-2.5 rounded-xl bg-white border border-stone-200">
                    <div className="text-[10px] text-stone-400 font-bold uppercase">Original</div>
                    <div className="font-semibold text-stone-800 text-xs line-through mt-0.5 truncate">{selectedIngredient}</div>
                    <div className="text-xs font-mono text-red-600 mt-1">{country.currencySymbol}{currentCost.toLocaleString()}</div>
                  </div>

                  <ArrowRight className="w-5 h-5 text-stone-400 shrink-0" />

                  <div className="flex-1 p-2.5 rounded-xl bg-emerald-50/80 border border-emerald-200">
                    <div className="text-[10px] text-emerald-700 font-bold uppercase">Local Swap</div>
                    <div className="font-bold text-stone-900 text-xs mt-0.5 truncate">{swapResult.swappedIngredient}</div>
                    <div className="text-xs font-mono font-bold text-[#2ECC71] mt-1">{country.currencySymbol}{swapResult.newCost.toLocaleString()}</div>
                  </div>
                </div>

                {/* Macro match verification */}
                <div className="pt-2 border-t border-stone-200 text-xs text-stone-600 space-y-1.5">
                  <div className="font-semibold text-stone-800">Macro Parity Verified:</div>
                  <div className="flex gap-4 text-xs font-mono text-stone-700">
                    <span>Protein: {swapResult.macroBreakdown?.protein || meal.protein}g</span>
                    <span>Carbs: {swapResult.macroBreakdown?.carbs || meal.carbs}g</span>
                    <span>Fat: {swapResult.macroBreakdown?.fat || meal.fat}g</span>
                  </div>
                </div>

                {/* Culinary Prep tip */}
                {swapResult.prepModification && (
                  <div className="p-2.5 bg-amber-50/80 border border-amber-200 rounded-xl flex items-start gap-2 text-xs text-amber-900">
                    <ChefHat className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold">Preparation note: </span>
                      {swapResult.prepModification}
                    </div>
                  </div>
                )}

                <p className="text-xs text-stone-500 italic">
                  "{swapResult.rationale}"
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setSwapResult(null)}
                  className="flex-1 py-2.5 px-4 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-xs rounded-xl transition-colors"
                >
                  Recalculate / Select Other
                </button>

                <button
                  type="button"
                  onClick={handleApply}
                  className="flex-1 py-2.5 px-4 bg-[#2ECC71] hover:bg-[#27ae60] text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 transition-transform active:scale-98"
                >
                  <Check className="w-4 h-4" />
                  <span>Apply Swap to Plan</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
