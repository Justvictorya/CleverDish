import React, { useState, useEffect } from 'react';
import { UserProfile, Meal } from '../types';
import { Wallet, Check, AlertCircle, ShoppingCart, TrendingUp, Sparkles, Plus, Minus } from 'lucide-react';
import { COUNTRIES } from '../data/countries';
import { soundFX } from '../utils/sound';

interface PocketMoneyWalletProps {
  profile: UserProfile;
  currentDayMeals: Meal[];
  onUpdateDailySpend: (amount: number) => void;
}

export const PocketMoneyWallet: React.FC<PocketMoneyWalletProps> = ({
  profile,
  currentDayMeals
}) => {
  const country = COUNTRIES[profile.country] || COUNTRIES.NG;
  const todayKey = `foodie_wallet_${profile.id}_${new Date().toISOString().slice(0, 10)}`;

  // Daily Allowance = monthly budget ÷ 30
  const dailyAllowance = Math.round(profile.monthlyBudget / 30);

  // Local-first persistent state for purchased ingredients and custom spending
  const [purchasedIds, setPurchasedIds] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem(`${todayKey}_purchased`);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [extraSpend, setExtraSpend] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(`${todayKey}_extra`);
      return saved ? Number(saved) : 0;
    } catch {
      return 0;
    }
  });

  // Extract all ingredients for today's meals
  const todaysIngredients = currentDayMeals.flatMap(m => m.ingredients);

  // Compute total spent today from checked ingredients + extra
  const ingredientsSpent = todaysIngredients
    .filter(i => purchasedIds[i.id])
    .reduce((sum, i) => sum + i.cost, 0);

  const totalSpentToday = ingredientsSpent + extraSpend;
  const remainingAllowance = dailyAllowance - totalSpentToday;
  const percentUsed = Math.min(Math.round((totalSpentToday / dailyAllowance) * 100), 100);

  useEffect(() => {
    localStorage.setItem(`${todayKey}_purchased`, JSON.stringify(purchasedIds));
  }, [purchasedIds, todayKey]);

  useEffect(() => {
    localStorage.setItem(`${todayKey}_extra`, String(extraSpend));
  }, [extraSpend, todayKey]);

  const togglePurchased = (id: string) => {
    soundFX.playTap();
    setPurchasedIds(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Sponsored open-market brand highlight
  const sponsoredBrand = profile.country === 'NG'
    ? { brand: 'Golden Penny Pure Soya Oil', tagline: 'Heart-healthy cholesterol-free pure cooking staple', discount: '5% off at Bodija & Mile 12 stalls' }
    : { brand: 'Kerrygold Pure Farm Butter', tagline: '100% grass-fed nutrient-dense staple', discount: 'Sponsored quality staple' };

  return (
    <div className="bg-white dark:bg-[#18181B] rounded-2xl border border-stone-200/90 dark:border-zinc-800 shadow-sm p-5 space-y-4 transition-colors">
      {/* Header with Local Wallet Badge */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#7A1C2C]/10 dark:bg-[#7A1C2C]/30 flex items-center justify-center text-[#7A1C2C] dark:text-rose-400">
            <Wallet className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-stone-900 dark:text-zinc-100">Local Pocket Money Wallet</h3>
            <p className="text-[11px] text-stone-500 dark:text-zinc-400 font-mono">Local-first allowance (Budget ÷ 30)</p>
          </div>
        </div>

        <div className="text-right">
          <div className="text-xs text-stone-500 dark:text-zinc-400 font-medium">Daily Cap</div>
          <div className="text-base font-extrabold text-[#7A1C2C] dark:text-rose-400 font-mono">
            {country.currencySymbol}{dailyAllowance.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Spend vs Allowance Progress Bar */}
      <div>
        <div className="flex justify-between items-baseline text-xs mb-1.5 font-medium">
          <span className="text-stone-600 dark:text-zinc-400">
            Spent Today: <strong className="font-mono text-stone-900 dark:text-zinc-100">{country.currencySymbol}{totalSpentToday.toLocaleString()}</strong>
          </span>
          <span className={remainingAllowance >= 0 ? 'text-[#2ECC71] font-bold font-mono' : 'text-red-600 dark:text-rose-400 font-bold font-mono'}>
            {remainingAllowance >= 0
              ? `${country.currencySymbol}${remainingAllowance.toLocaleString()} left`
              : `${country.currencySymbol}${Math.abs(remainingAllowance).toLocaleString()} over`}
          </span>
        </div>

        <div className="w-full h-3 bg-stone-100 dark:bg-zinc-800 rounded-full overflow-hidden p-0.5 border border-stone-200 dark:border-zinc-700">
          <div
            className={`h-full rounded-full transition-all duration-300 ${
              percentUsed > 90 ? 'bg-red-500' : 'bg-[#2ECC71]'
            }`}
            style={{ width: `${percentUsed}%` }}
          />
        </div>
      </div>

      {/* Tap-to-Buy Ingredient Checklist */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-zinc-400">
            Today's Tap-to-Buy Sourcing Checklist
          </span>
          <span className="text-[11px] text-stone-400 dark:text-zinc-500">Tap to log purchase</span>
        </div>

        <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
          {todaysIngredients.map((ing) => {
            const isDone = !!purchasedIds[ing.id];
            return (
              <div
                key={ing.id}
                onClick={() => togglePurchased(ing.id)}
                className={`p-2.5 rounded-xl border text-xs flex items-center justify-between cursor-pointer transition-all ${
                  isDone
                    ? 'bg-emerald-50/60 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800 text-stone-500 dark:text-zinc-400'
                    : 'bg-stone-50/80 dark:bg-zinc-850 hover:bg-stone-100 dark:hover:bg-zinc-800 border-stone-200 dark:border-zinc-750 text-stone-800 dark:text-zinc-200'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <div
                    className={`w-4 h-4 rounded-md flex items-center justify-center border ${
                      isDone
                        ? 'bg-[#2ECC71] border-[#2ECC71] text-white'
                        : 'border-stone-300 dark:border-zinc-600 bg-white dark:bg-zinc-900'
                    }`}
                  >
                    {isDone && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                  <span className={`truncate ${isDone ? 'line-through opacity-70' : 'font-medium'}`}>
                    {ing.name}
                  </span>
                </div>

                <span className="font-mono font-bold text-stone-700 dark:text-zinc-300 shrink-0 ml-2">
                  {country.currencySymbol}{ing.cost.toLocaleString()}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Extra Spend Quick Adjuster (+ / -) */}
      <div className="p-3 bg-stone-50 dark:bg-zinc-850 rounded-xl border border-stone-200 dark:border-zinc-750 flex items-center justify-between text-xs">
        <span className="text-stone-600 dark:text-zinc-400 font-medium">Extra Street Snacks / Spices:</span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setExtraSpend(p => Math.max(0, p - (country.code === 'NG' ? 200 : 1)))}
            className="w-6 h-6 rounded-lg bg-white dark:bg-zinc-800 border border-stone-200 dark:border-zinc-700 flex items-center justify-center text-stone-600 dark:text-zinc-300 hover:bg-stone-100 dark:hover:bg-zinc-700"
          >
            <Minus className="w-3 h-3" />
          </button>
          <span className="font-mono font-bold text-stone-900 dark:text-zinc-100 min-w-14 text-center">
            {country.currencySymbol}{extraSpend.toLocaleString()}
          </span>
          <button
            type="button"
            onClick={() => setExtraSpend(p => p + (country.code === 'NG' ? 200 : 1))}
            className="w-6 h-6 rounded-lg bg-white dark:bg-zinc-800 border border-stone-200 dark:border-zinc-700 flex items-center justify-center text-stone-600 dark:text-zinc-300 hover:bg-stone-100 dark:hover:bg-zinc-700"
          >
            <Plus className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Sponsored FMCG / Open-Market Staple Box */}
      <div className="p-3 rounded-xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/40 text-xs space-y-1">
        <div className="flex items-center justify-between">
          <span className="font-bold text-amber-900 dark:text-amber-300 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            {sponsoredBrand.brand}
          </span>
          <span className="text-[10px] font-bold text-amber-800 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/50 px-1.5 py-0.5 rounded">
            Partner
          </span>
        </div>
        <p className="text-[11px] text-amber-800 dark:text-amber-400/90 leading-tight">
          {sponsoredBrand.tagline} · <span className="font-semibold underline">{sponsoredBrand.discount}</span>
        </p>
      </div>
    </div>
  );
};
