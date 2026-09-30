import React, { useState } from 'react';
import { UserProfile, FitnessGoal } from '../types';
import { COUNTRIES } from '../data/countries';
import { TrendingDown, Scale, TrendingUp, DollarSign, Edit3, Check, RefreshCw } from 'lucide-react';
import { soundFX } from '../utils/sound';

interface GoalAndBudgetBarProps {
  profile: UserProfile;
  onChangeGoal: (goal: FitnessGoal) => void;
  onChangeBudget: (newBudget: number, period: 'day' | 'week' | 'month') => void;
  onOpenSignUpFlow: () => void;
}

export const GoalAndBudgetBar: React.FC<GoalAndBudgetBarProps> = ({
  profile,
  onChangeGoal,
  onChangeBudget,
  onOpenSignUpFlow
}) => {
  const [isEditingBudget, setIsEditingBudget] = useState(false);
  const [budgetVal, setBudgetVal] = useState<number>(profile.budgetAmount);
  const [period, setPeriod] = useState<'day' | 'week' | 'month'>(profile.budgetPeriod);

  const country = COUNTRIES[profile.country] || COUNTRIES.NG;
  const dailyAllowance = Math.round(profile.monthlyBudget / 30);

  const handleSaveBudget = (e: React.FormEvent) => {
    e.preventDefault();
    soundFX.playTap();
    onChangeBudget(Number(budgetVal), period);
    setIsEditingBudget(false);
  };

  return (
    <div className="bg-white dark:bg-[#18181B] rounded-3xl border border-stone-200/90 dark:border-zinc-800 shadow-xs p-5 space-y-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* SECTION 1: CHOOSE WEIGHT GOAL (Maintain, Gain, Lose) */}
        <div className="space-y-1.5 flex-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-500 dark:text-zinc-400 uppercase tracking-wider">
              Weight Objective: Choose Your Target
            </span>
            <button
              onClick={onOpenSignUpFlow}
              className="text-[11px] font-bold text-[#7A1C2C] dark:text-rose-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Full Setup Wizard</span>
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {/* 1. Lose Weight */}
            <button
              type="button"
              onClick={() => {
                soundFX.playTap();
                onChangeGoal('lose_weight');
              }}
              className={`p-2.5 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-1 cursor-pointer ${
                profile.goal === 'lose_weight'
                  ? 'border-[#7A1C2C] dark:border-rose-400 bg-[#7A1C2C]/5 dark:bg-[#7A1C2C]/20 font-black text-[#7A1C2C] dark:text-rose-300 shadow-xs ring-1 ring-[#7A1C2C] dark:ring-rose-400'
                  : 'border-stone-200 dark:border-zinc-800 hover:border-stone-300 dark:hover:border-zinc-700 text-stone-600 dark:text-zinc-400 bg-stone-50/50 dark:bg-zinc-850'
              }`}
            >
              <TrendingDown className="w-4 h-4 text-rose-600 dark:text-rose-400" />
              <span className="text-xs font-bold leading-none">Lose Weight</span>
              <span className="text-[10px] text-stone-500 dark:text-zinc-400 font-mono">-20% Cut</span>
            </button>

            {/* 2. Maintain Weight */}
            <button
              type="button"
              onClick={() => {
                soundFX.playTap();
                onChangeGoal('maintain');
              }}
              className={`p-2.5 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-1 cursor-pointer ${
                profile.goal === 'maintain'
                  ? 'border-[#7A1C2C] dark:border-rose-400 bg-[#7A1C2C]/5 dark:bg-[#7A1C2C]/20 font-black text-[#7A1C2C] dark:text-rose-300 shadow-xs ring-1 ring-[#7A1C2C] dark:ring-rose-400'
                  : 'border-stone-200 dark:border-zinc-800 hover:border-stone-300 dark:hover:border-zinc-700 text-stone-600 dark:text-zinc-400 bg-stone-50/50 dark:bg-zinc-850'
              }`}
            >
              <Scale className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span className="text-xs font-bold leading-none">Maintain Weight</span>
              <span className="text-[10px] text-stone-500 dark:text-zinc-400 font-mono">100% Balance</span>
            </button>

            {/* 3. Gain Weight */}
            <button
              type="button"
              onClick={() => {
                soundFX.playTap();
                onChangeGoal('gain_muscle');
              }}
              className={`p-2.5 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-1 cursor-pointer ${
                profile.goal === 'gain_muscle'
                  ? 'border-[#7A1C2C] dark:border-rose-400 bg-[#7A1C2C]/5 dark:bg-[#7A1C2C]/20 font-black text-[#7A1C2C] dark:text-rose-300 shadow-xs ring-1 ring-[#7A1C2C] dark:ring-rose-400'
                  : 'border-stone-200 dark:border-zinc-800 hover:border-stone-300 dark:hover:border-zinc-700 text-stone-600 dark:text-zinc-400 bg-stone-50/50 dark:bg-zinc-850'
              }`}
            >
              <TrendingUp className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span className="text-xs font-bold leading-none">Gain Weight</span>
              <span className="text-[10px] text-stone-500 dark:text-zinc-400 font-mono">+10% Surplus</span>
            </button>
          </div>
        </div>

        {/* SECTION 2: FOOD BUDGET & DAILY ALLOWANCE */}
        <div className="md:w-72 bg-stone-50 dark:bg-zinc-900/60 p-3.5 rounded-2xl border border-stone-200/90 dark:border-zinc-800 space-y-2 shrink-0">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-stone-700 dark:text-zinc-300 uppercase tracking-wider text-[11px]">
              Food Spending Budget
            </span>
            <button
              onClick={() => setIsEditingBudget(!isEditingBudget)}
              className="text-[#7A1C2C] dark:text-rose-400 hover:underline font-bold text-[11px] flex items-center gap-1 cursor-pointer"
            >
              <Edit3 className="w-3 h-3" />
              <span>{isEditingBudget ? 'Close' : 'Edit Budget'}</span>
            </button>
          </div>

          {!isEditingBudget ? (
            <div className="flex items-baseline justify-between">
              <div>
                <div className="text-base font-extrabold text-stone-900 dark:text-zinc-100 font-mono">
                  {country.currencySymbol}{profile.budgetAmount.toLocaleString()}
                  <span className="text-xs font-normal text-stone-500 dark:text-zinc-400 font-sans"> / {profile.budgetPeriod}</span>
                </div>
                <div className="text-[10px] text-stone-500 dark:text-zinc-400 font-mono">
                  Daily Allowance: <strong className="text-stone-800 dark:text-zinc-200">{country.currencySymbol}{dailyAllowance.toLocaleString()}</strong>/day
                </div>
              </div>
              <span className="text-[10px] font-bold text-[#2ECC71] bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md border border-emerald-100 dark:border-emerald-800">
                Active Cap
              </span>
            </div>
          ) : (
            <form onSubmit={handleSaveBudget} className="space-y-2 text-xs pt-1">
              <div className="flex gap-2">
                <input
                  type="number"
                  value={budgetVal}
                  onChange={(e) => setBudgetVal(Math.max(1, Number(e.target.value)))}
                  className="w-full p-2 rounded-xl border border-stone-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 font-mono font-bold text-stone-900 dark:text-zinc-100 text-sm"
                  min="1"
                  required
                />
                <select
                  value={period}
                  onChange={(e) => setPeriod(e.target.value as any)}
                  className="p-2 rounded-xl border border-stone-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-stone-900 dark:text-zinc-100 font-medium text-xs"
                >
                  <option value="day">/ Day</option>
                  <option value="week">/ Week</option>
                  <option value="month">/ Month</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full py-1.5 bg-[#7A1C2C] hover:bg-[#631623] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1 cursor-pointer"
              >
                <Check className="w-3.5 h-3.5" /> Save Budget
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
