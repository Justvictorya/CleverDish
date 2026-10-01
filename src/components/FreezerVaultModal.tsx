import React, { useState } from 'react';
import { Meal, FreezerVaultItem, CountryInfo } from '../types';
import {
  X,
  Snowflake,
  Sparkles,
  Flame,
  Clock,
  Plus,
  Minus,
  CheckCircle2,
  Trash2,
  Utensils
} from 'lucide-react';
import { soundFX } from '../utils/sound';

interface FreezerVaultModalProps {
  isOpen: boolean;
  onClose: () => void;
  vaultItems: FreezerVaultItem[];
  onConsumePortion: (itemId: string) => void;
  onAddPortions: (meal: Meal, portions: number) => void;
  onDeleteVaultItem: (itemId: string) => void;
  todaysMeals: Meal[];
  country: CountryInfo;
}

export const FreezerVaultModal: React.FC<FreezerVaultModalProps> = ({
  isOpen,
  onClose,
  vaultItems,
  onConsumePortion,
  onAddPortions,
  onDeleteVaultItem,
  todaysMeals,
  country
}) => {
  const [selectedMealForStorage, setSelectedMealForStorage] = useState<string>(
    todaysMeals[0]?.id || ''
  );
  const [portionsToStore, setPortionsToStore] = useState<number>(4);

  if (!isOpen) return null;

  const totalPortionsInVault = vaultItems.reduce((acc, curr) => acc + curr.portionsRemaining, 0);
  const totalHoursSaved = (totalPortionsInVault * 0.75).toFixed(1); // avg 45 mins saved per meal

  const handleStoreNewPot = () => {
    const meal = todaysMeals.find(m => m.id === selectedMealForStorage);
    if (!meal) return;
    soundFX.playTap();
    onAddPortions(meal, portionsToStore);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#18181B] rounded-3xl max-w-xl w-full border border-stone-200 dark:border-zinc-800 shadow-2xl overflow-hidden transition-colors my-6">
        {/* Header */}
        <div className="p-6 border-b border-stone-100 dark:border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center font-bold">
              <Snowflake className="w-5 h-5 animate-spin [animation-duration:10s]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base sm:text-lg text-stone-900 dark:text-zinc-100">
                  Big Pot Meal Prep & Freezer Vault 🍲
                </h3>
                <span className="text-[10px] font-bold text-cyan-600 bg-cyan-50 dark:bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-200 dark:border-cyan-800">
                  {totalPortionsInVault} Ready Portions
                </span>
              </div>
              <p className="text-xs text-stone-500 dark:text-zinc-400">
                Cook once in family-sized pots, freeze portions, and eat in 5 minutes at zero grocery spend.
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

        {/* Executive Stats Banner */}
        <div className="p-4 bg-cyan-50/60 dark:bg-cyan-950/20 border-b border-cyan-200/80 dark:border-cyan-900/40 grid grid-cols-2 gap-3 text-xs">
          <div className="space-y-0.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-800 dark:text-cyan-300">
              Cooking Time Banked
            </span>
            <div className="font-black text-cyan-950 dark:text-cyan-100 text-base font-mono flex items-center gap-1">
              <Clock className="w-4 h-4 text-cyan-600" />
              <span>~{totalHoursSaved} Hours Saved</span>
            </div>
          </div>

          <div className="space-y-0.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-800 dark:text-cyan-300">
              Defrost Day Budget
            </span>
            <div className="font-black text-emerald-600 dark:text-emerald-400 text-base font-mono">
              {country.currencySymbol}0 Grocery Spend
            </div>
          </div>
        </div>

        {/* Stored Freezer Portions List */}
        <div className="p-6 space-y-4 max-h-[50vh] overflow-y-auto">
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-stone-500 dark:text-zinc-400 mb-2.5">
              Currently Stored in Freezer:
            </h4>

            {vaultItems.length === 0 ? (
              <div className="p-6 rounded-2xl border border-dashed border-stone-200 dark:border-zinc-800 text-center space-y-2">
                <Snowflake className="w-8 h-8 text-stone-300 mx-auto" />
                <p className="text-xs text-stone-500 dark:text-zinc-400">
                  Your freezer vault is currently empty. Cook a big pot below and stash 4 portions!
                </p>
              </div>
            ) : (
              <div className="space-y-2.5">
                {vaultItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-2xl border border-stone-200 dark:border-zinc-800 bg-stone-50/60 dark:bg-zinc-850 flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-stone-900 dark:text-zinc-100 text-sm truncate">
                          {item.mealTitle}
                        </span>
                        <span className="text-[10px] text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/40 px-2 py-0.5 rounded font-mono font-bold">
                          {item.portionsRemaining} portions left
                        </span>
                      </div>
                      <div className="text-[11px] text-stone-500 dark:text-zinc-400 font-mono mt-0.5">
                        {item.caloriesPerPortion} kcal · {item.proteinGrams}g P · Stashed on {item.datePrepared}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => {
                          soundFX.playTap();
                          onConsumePortion(item.id);
                        }}
                        className="px-3 py-1.5 bg-[#2ECC71] hover:bg-[#27ae60] text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1 cursor-pointer"
                        title="Defrost 1 portion for today (0 grocery cost, 5 min reheat)"
                      >
                        <Utensils className="w-3.5 h-3.5" />
                        <span>Defrost (5m)</span>
                      </button>

                      <button
                        onClick={() => {
                          soundFX.playTap();
                          onDeleteVaultItem(item.id);
                        }}
                        className="p-1.5 text-stone-400 hover:text-red-500 dark:hover:text-red-400 rounded-lg cursor-pointer"
                        title="Remove from vault"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Action: Store a Big Pot from Today's Meals */}
          <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/40 space-y-3 text-xs">
            <span className="font-bold text-amber-950 dark:text-amber-300 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Cook a Big Pot & Send Extra Portions to Vault</span>
            </span>

            <div className="space-y-2">
              <select
                value={selectedMealForStorage}
                onChange={(e) => setSelectedMealForStorage(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-stone-200 dark:border-zinc-700 bg-white dark:bg-zinc-850 text-stone-800 dark:text-zinc-200 font-medium text-xs cursor-pointer"
              >
                {todaysMeals.map(m => (
                  <option key={m.id} value={m.id}>
                    {m.type === 'morning' ? 'Breakfast' : 'Dinner'}: {m.title}
                  </option>
                ))}
              </select>

              <div className="flex items-center justify-between pt-1">
                <span className="text-stone-600 dark:text-zinc-400 font-medium">Extra Portions to Freeze:</span>
                <div className="flex items-center gap-2">
                  {[2, 4, 6].map(num => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setPortionsToStore(num)}
                      className={`px-3 py-1 rounded-lg font-mono font-bold text-xs cursor-pointer border ${
                        portionsToStore === num
                          ? 'bg-[#7A1C2C] text-white border-[#7A1C2C]'
                          : 'bg-white dark:bg-zinc-800 text-stone-700 dark:text-zinc-300 border-stone-200 dark:border-zinc-700'
                      }`}
                    >
                      +{num} Portions
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={handleStoreNewPot}
                className="w-full py-2.5 bg-[#7A1C2C] hover:bg-[#631623] text-white font-bold rounded-xl shadow-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors mt-2"
              >
                <Snowflake className="w-4 h-4" />
                <span>Store Extra Portions in Freezer Vault</span>
              </button>
            </div>
          </div>
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
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
