import React, { useState, useEffect } from 'react';
import { Meal, CountryInfo } from '../types';
import {
  X,
  ShoppingCart,
  Sparkles,
  Check,
  Share2,
  TrendingDown,
  Store,
  Printer,
  ChevronRight,
  BadgePercent
} from 'lucide-react';
import { soundFX } from '../utils/sound';
import { shareWeeklyMarketListToWhatsApp } from '../utils/whatsappShare';

interface WeeklyMarketRunModalProps {
  isOpen: boolean;
  onClose: () => void;
  meals: Meal[];
  country: CountryInfo;
}

interface ConsolidatedMarketItem {
  id: string;
  name: string;
  stallCategory: string;
  totalGrams: number;
  bulkUnit: string;
  estimatedCost: number;
  checked: boolean;
}

export const WeeklyMarketRunModal: React.FC<WeeklyMarketRunModalProps> = ({
  isOpen,
  onClose,
  meals,
  country
}) => {
  // Aggregate ingredients for first 7 days (or 14 meals)
  const [marketItems, setMarketItems] = useState<ConsolidatedMarketItem[]>(() => {
    try {
      const saved = localStorage.getItem(`foodie_market_run_${country.code}`);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }

    const first7DaysMeals = meals.filter(m => m.dayNumber <= 7);
    const aggMap: Record<string, { name: string; totalGrams: number; cost: number; category: string }> = {};

    first7DaysMeals.forEach(meal => {
      meal.ingredients.forEach(ing => {
        const key = ing.name.toLowerCase().trim();
        let category = 'Dry Staples & Seasonings';
        const lower = ing.name.toLowerCase();

        if (lower.includes('fish') || lower.includes('chicken') || lower.includes('meat') || lower.includes('beef') || lower.includes('turkey') || lower.includes('egg')) {
          category = '🥩 Butcher & Coldroom Wharf';
        } else if (lower.includes('pepper') || lower.includes('tomato') || lower.includes('onion') || lower.includes('spinach') || lower.includes('leaf') || lower.includes('ugu')) {
          category = '🍅 Fresh Produce & Pepper Shed';
        } else if (lower.includes('yam') || lower.includes('potato') || lower.includes('rice') || lower.includes('beans') || lower.includes('plantain') || lower.includes('garri') || lower.includes('oat')) {
          category = '🌾 Tubers, Grains & Swallow';
        } else if (lower.includes('oil') || lower.includes('butter') || lower.includes('egusi') || lower.includes('crayfish')) {
          category = '🛢️ Oils, Spices & Dry Staples';
        }

        if (!aggMap[key]) {
          aggMap[key] = {
            name: ing.name,
            totalGrams: 0,
            cost: 0,
            category
          };
        }
        aggMap[key].totalGrams += ing.gramWeight;
        aggMap[key].cost += ing.cost;
      });
    });

    return Object.entries(aggMap).map(([id, val]) => {
      // Format bulk purchase units
      let bulkUnit = `${(val.totalGrams / 1000).toFixed(1)} kg`;
      const lower = val.name.toLowerCase();

      if (lower.includes('egg')) {
        const count = Math.ceil(val.totalGrams / 55);
        bulkUnit = count > 15 ? '1 Crate (30 eggs)' : `${count} eggs`;
      } else if (lower.includes('yam')) {
        const tubers = Math.max(1, Math.ceil(val.totalGrams / 1200));
        bulkUnit = `${tubers} Medium Tubers`;
      } else if (lower.includes('plantain')) {
        const bunch = Math.max(1, Math.ceil(val.totalGrams / 600));
        bulkUnit = `${bunch} Fingers / Small Bunch`;
      } else if (lower.includes('rice') || lower.includes('beans') || lower.includes('garri')) {
        const congos = (val.totalGrams / 1500).toFixed(1);
        bulkUnit = `${congos} Congos (~${(val.totalGrams / 1000).toFixed(1)}kg)`;
      } else if (lower.includes('oil')) {
        const liters = (val.totalGrams / 900).toFixed(1);
        bulkUnit = `${liters} Liters (Bottle)`;
      }

      // Bulk purchasing typically gives ~18% discount over small daily purchases
      const bulkDiscount = 0.82;
      const estimatedCost = Math.round(val.cost * bulkDiscount);

      return {
        id,
        name: val.name,
        stallCategory: val.category,
        totalGrams: val.totalGrams,
        bulkUnit,
        estimatedCost,
        checked: false
      };
    });
  });

  useEffect(() => {
    localStorage.setItem(`foodie_market_run_${country.code}`, JSON.stringify(marketItems));
  }, [marketItems, country.code]);

  if (!isOpen) return null;

  const totalBulkSpend = marketItems.reduce((acc, curr) => acc + curr.estimatedCost, 0);
  const retailEquivalent = Math.round(totalBulkSpend / 0.82);
  const estimatedSavings = retailEquivalent - totalBulkSpend;

  const toggleItem = (id: string) => {
    soundFX.playTap();
    setMarketItems(prev => prev.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
  };

  const handleShareWhatsApp = () => {
    soundFX.playTap();
    shareWeeklyMarketListToWhatsApp(marketItems, totalBulkSpend, estimatedSavings, country);
  };

  const handleResetChecklist = () => {
    soundFX.playTap();
    setMarketItems(prev => prev.map(i => ({ ...i, checked: false })));
  };

  // Group items by category
  const categories = Array.from(new Set(marketItems.map(i => i.stallCategory)));

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#18181B] rounded-3xl max-w-2xl w-full border border-stone-200 dark:border-zinc-800 shadow-2xl overflow-hidden transition-colors my-6">
        {/* Header */}
        <div className="p-6 border-b border-stone-100 dark:border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#7A1C2C]/10 text-[#7A1C2C] dark:text-rose-400 flex items-center justify-center font-bold">
              <ShoppingCart className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base sm:text-lg text-stone-900 dark:text-zinc-100">
                  Saturday Open-Market Run List 🛒
                </h3>
                <span className="text-[10px] font-bold text-[#2ECC71] bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                  7-Day Consolidated
                </span>
              </div>
              <p className="text-xs text-stone-500 dark:text-zinc-400">
                Consolidated bulk purchase quantities for {country.defaultMarkets[0] || 'local open markets'} ({country.name}).
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

        {/* Savings & Bulk Spend Banner */}
        <div className="p-4 bg-emerald-50/70 dark:bg-emerald-950/30 border-b border-emerald-200/80 dark:border-emerald-900/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div>
            <span className="font-bold text-emerald-950 dark:text-emerald-200 flex items-center gap-1.5">
              <BadgePercent className="w-4 h-4 text-[#2ECC71]" />
              <span>Bulk Market Run Savings: ~18% Cheaper than Daily Pieces</span>
            </span>
            <div className="text-[11px] text-emerald-800 dark:text-emerald-300 font-mono mt-0.5">
              Est. Bulk Total: <strong>{country.currencySymbol}{totalBulkSpend.toLocaleString()}</strong> (Saves ~{country.currencySymbol}{estimatedSavings.toLocaleString()})
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShareWhatsApp}
              className="px-3.5 py-1.5 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>Share to WhatsApp</span>
              <Share2 className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={handleResetChecklist}
              className="px-2.5 py-1.5 bg-white dark:bg-zinc-800 border border-stone-200 dark:border-zinc-700 text-stone-600 dark:text-zinc-300 rounded-xl text-xs font-semibold hover:bg-stone-50 cursor-pointer"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Checklist Organised by Market Stall Category */}
        <div className="p-6 space-y-5 max-h-[60vh] overflow-y-auto">
          {categories.map(category => {
            const itemsInCat = marketItems.filter(i => i.stallCategory === category);
            return (
              <div key={category} className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-stone-700 dark:text-zinc-300 border-b border-stone-100 dark:border-zinc-800 pb-1">
                  <span>{category}</span>
                  <span className="text-[10px] text-stone-400 font-mono">{itemsInCat.length} items</span>
                </div>

                <div className="space-y-1.5">
                  {itemsInCat.map(item => (
                    <div
                      key={item.id}
                      onClick={() => toggleItem(item.id)}
                      className={`p-2.5 rounded-xl border text-xs flex items-center justify-between cursor-pointer transition-all ${
                        item.checked
                          ? 'bg-emerald-50/60 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800 text-stone-400 dark:text-zinc-500 line-through'
                          : 'bg-stone-50/80 dark:bg-zinc-850 hover:bg-stone-100 border-stone-200 dark:border-zinc-750 text-stone-800 dark:text-zinc-200'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <div
                          className={`w-4 h-4 rounded flex items-center justify-center border ${
                            item.checked
                              ? 'bg-[#2ECC71] border-[#2ECC71] text-white'
                              : 'border-stone-300 dark:border-zinc-600 bg-white dark:bg-zinc-900'
                          }`}
                        >
                          {item.checked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span className="font-semibold truncate">{item.name}</span>
                        <span className="text-[11px] text-stone-500 dark:text-zinc-400 font-mono">
                          ({item.bulkUnit})
                        </span>
                      </div>

                      <span className="font-mono font-bold text-stone-700 dark:text-zinc-300 shrink-0 ml-2">
                        {country.currencySymbol}{item.estimatedCost.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-stone-100 dark:border-zinc-800 bg-stone-50/50 dark:bg-zinc-900 flex items-center justify-between text-xs">
          <div className="text-[11px] text-stone-500 dark:text-zinc-400">
            Open Market prices calibrated against Mile 12, Bodija & Makola medians.
          </div>

          <button
            onClick={() => {
              soundFX.playTap();
              onClose();
            }}
            className="px-5 py-2 bg-stone-900 dark:bg-zinc-800 hover:bg-stone-800 text-white font-bold text-xs rounded-xl cursor-pointer"
          >
            Done Shopping
          </button>
        </div>
      </div>
    </div>
  );
};
