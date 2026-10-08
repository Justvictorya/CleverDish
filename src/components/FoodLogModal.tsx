import React, { useState } from 'react';
import { Plus, X, UtensilsCrossed, Trash2, ChefHat } from 'lucide-react';
import { soundFX } from '../utils/sound';
import { FoodLogEntry, NewFoodInput, QUICK_FOODS, sumFoodEntries } from '../data/foodLog';

interface FoodLogModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** e.g. "Tue, Oct 8" — the day entries are filed under. */
  dateLabel: string;
  entries: FoodLogEntry[];
  targetCalories: number;
  consumedCalories: number;
  onAdd: (input: NewFoodInput) => void;
  onRemove: (id: string) => void;
}

export const FoodLogModal: React.FC<FoodLogModalProps> = ({
  isOpen,
  onClose,
  dateLabel,
  entries,
  targetCalories,
  consumedCalories,
  onAdd,
  onRemove
}) => {
  const [name, setName] = useState('');
  const [calories, setCalories] = useState('');
  const [showCustom, setShowCustom] = useState(false);

  if (!isOpen) return null;

  const logged = sumFoodEntries(entries);
  const remaining = Math.max(0, targetCalories - consumedCalories);

  const submitCustom = () => {
    const kcal = Number(calories);
    if (!name.trim() || !Number.isFinite(kcal) || kcal <= 0) return;
    soundFX.playTap();
    onAdd({ name, calories: kcal, source: 'custom' });
    setName('');
    setCalories('');
    setShowCustom(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#18181B] rounded-3xl max-w-xl w-full border border-stone-200 dark:border-zinc-800 shadow-2xl overflow-hidden transition-colors my-8">
        {/* Header */}
        <div className="p-6 border-b border-stone-100 dark:border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#2ECC71]/10 text-[#2ECC71] flex items-center justify-center">
              <UtensilsCrossed className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg text-stone-900 dark:text-zinc-100">
                Log What You Ate
              </h3>
              <p className="text-xs text-stone-500 dark:text-zinc-400">
                {dateLabel} · counts toward today's total alongside your plan meals
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              soundFX.playTap();
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-stone-100 dark:bg-zinc-800 text-stone-500 hover:text-stone-900 dark:hover:text-zinc-100 flex items-center justify-center cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 sm:p-6 space-y-5 max-h-[70vh] overflow-y-auto">
          {/* Running total for the day */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-stone-50 dark:bg-zinc-850 border border-stone-200 dark:border-zinc-800 text-xs font-mono">
            <span className="text-stone-500 dark:text-zinc-400 font-sans font-bold">
              Logged today
            </span>
            <span className="text-stone-900 dark:text-zinc-100 font-black text-sm">
              {logged.calories} kcal
              <span className="text-stone-400 dark:text-zinc-500 font-normal">
                {' '}· {logged.count} {logged.count === 1 ? 'item' : 'items'} · {remaining} kcal left
              </span>
            </span>
          </div>

          {/* Today's entries */}
          <div className="space-y-2">
            {entries.length === 0 ? (
              <p className="text-xs text-stone-500 dark:text-zinc-400 text-center py-2">
                Nothing extra logged yet — tap a quick pick below, or add your own.
              </p>
            ) : (
              entries.map((entry) => (
                <div
                  key={entry.id}
                  className="flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-2xl border border-stone-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
                >
                  <div className="min-w-0">
                    <div className="text-sm font-bold text-stone-800 dark:text-zinc-200 truncate">
                      {entry.name}
                    </div>
                    <div className="text-[11px] text-stone-400 dark:text-zinc-500 font-mono">
                      {entry.source === 'quick' ? 'quick pick' : 'custom'}
                      {entry.protein || entry.carbs || entry.fat
                        ? ` · ${entry.protein}g P · ${entry.carbs}g C · ${entry.fat}g F`
                        : ''}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-sm font-black text-stone-900 dark:text-zinc-100 font-mono">
                      {entry.calories}
                    </span>
                    <button
                      onClick={() => {
                        soundFX.playTap();
                        onRemove(entry.id);
                      }}
                      className="w-7 h-7 rounded-lg bg-stone-100 dark:bg-zinc-800 text-stone-400 hover:text-rose-600 dark:hover:text-rose-400 flex items-center justify-center cursor-pointer"
                      aria-label={`Remove ${entry.name}`}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Quick picks */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-black uppercase tracking-wider text-stone-500 dark:text-zinc-400">
                Quick picks
              </span>
              <span className="text-[10px] text-stone-400 dark:text-zinc-500">≈ typical serving</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {QUICK_FOODS.map((food) => (
                <button
                  key={food.name}
                  type="button"
                  onClick={() => {
                    soundFX.playTap();
                    onAdd({ ...food, source: 'quick' });
                  }}
                  className="p-2.5 rounded-2xl border border-stone-200 dark:border-zinc-800 bg-stone-50 dark:bg-zinc-850 hover:border-[#2ECC71] hover:bg-[#2ECC71]/5 text-left transition-colors cursor-pointer"
                >
                  <div className="text-[11px] font-bold text-stone-800 dark:text-zinc-200 leading-tight">
                    {food.name}
                  </div>
                  <div className="text-[11px] font-mono font-black text-[#2ECC71] mt-0.5">
                    ≈{food.calories} kcal
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Custom entry */}
          {showCustom ? (
            <div className="p-3.5 rounded-2xl border border-stone-200 dark:border-zinc-800 bg-stone-50 dark:bg-zinc-850 space-y-3">
              <div className="grid grid-cols-3 gap-2">
                <div className="col-span-2">
                  <label className="block text-[11px] font-bold text-stone-500 dark:text-zinc-400 mb-1">
                    What was it?
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Roadside corn"
                    maxLength={60}
                    className="w-full p-2 rounded-xl border border-stone-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm text-stone-800 dark:text-zinc-200"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-stone-500 dark:text-zinc-400 mb-1">
                    kcal
                  </label>
                  <input
                    type="number"
                    inputMode="numeric"
                    value={calories}
                    onChange={(e) => setCalories(e.target.value)}
                    placeholder="250"
                    min={1}
                    className="w-full p-2 rounded-xl border border-stone-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm text-stone-800 dark:text-zinc-200 font-mono"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCustom(false)}
                  className="px-3 py-1.5 text-xs font-bold text-stone-500 dark:text-zinc-400 hover:text-stone-800 dark:hover:text-zinc-200 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={submitCustom}
                  disabled={!name.trim() || !(Number(calories) > 0)}
                  className="px-4 py-1.5 rounded-xl bg-[#7A1C2C] text-white text-xs font-black disabled:opacity-40 cursor-pointer"
                >
                  Add entry
                </button>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => {
                soundFX.playTap();
                setShowCustom(true);
              }}
              className="w-full py-2.5 rounded-2xl border border-dashed border-stone-300 dark:border-zinc-700 text-xs font-bold text-stone-600 dark:text-zinc-300 hover:border-stone-400 dark:hover:border-zinc-600 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Add something else by hand
            </button>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3.5 border-t border-stone-100 dark:border-zinc-800 flex items-center gap-2 text-[11px] text-stone-400 dark:text-zinc-500">
          <ChefHat className="w-3.5 h-3.5 shrink-0" />
          <span>
            Quick picks are serving estimates. Plan meals still count only once you snap them.
          </span>
        </div>
      </div>
    </div>
  );
};
