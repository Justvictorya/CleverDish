import React from 'react';
import { Flame, Sparkles, Trophy, X, Award, Crown } from 'lucide-react';
import { getChefTier } from '../utils/gamification';

interface StreakCelebrationProps {
  streak: number;
  foodiePoints: number;
  isOpen: boolean;
  onClose: () => void;
  onOpenAccomplishments?: () => void;
}

export const StreakCelebration: React.FC<StreakCelebrationProps> = ({
  streak,
  foodiePoints,
  isOpen,
  onClose,
  onOpenAccomplishments
}) => {
  if (!isOpen) return null;

  const currentTier = getChefTier(foodiePoints);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white dark:bg-[#18181B] rounded-3xl p-6 sm:p-8 shadow-2xl border border-stone-200 dark:border-zinc-800 text-center overflow-hidden animate-in zoom-in-95 duration-300">
        {/* Confetti & Particle background */}
        <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#2ECC71_1.5px,transparent_1.5px)] [background-size:16px_16px]" />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-600 dark:hover:text-zinc-200 p-1 rounded-full transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Animated Mint Green Flame Badge */}
        <div className="relative mx-auto w-24 h-24 mb-4 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-[#2ECC71]/20 animate-ping" />
          <div className="relative w-20 h-20 rounded-full bg-gradient-to-tr from-[#2ECC71] to-[#27ae60] text-white flex items-center justify-center shadow-lg shadow-[#2ECC71]/30">
            <Flame className="w-11 h-11 text-white animate-bounce" fill="currentColor" />
          </div>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-[#2ECC71] font-semibold text-xs mb-2 border border-emerald-200 dark:border-emerald-800">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Plate Authenticated · Daily Streak Active</span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-zinc-100 tracking-tight">
          {streak} Day Habit Streak! 🔥
        </h3>

        <p className="text-xs sm:text-sm text-stone-600 dark:text-zinc-400 mt-2 max-w-xs mx-auto leading-relaxed">
          You hit your macros and passed magic byte plate verification. Your culinary discipline is inspiring!
        </p>

        {/* Rewards Earned Box */}
        <div className="mt-5 p-4 rounded-2xl bg-stone-50 dark:bg-zinc-850 border border-stone-200/80 dark:border-zinc-750 flex items-center justify-around">
          <div>
            <div className="text-[11px] text-stone-500 dark:text-zinc-400 font-medium">Daily Streak</div>
            <div className="text-base font-black text-[#7A1C2C] dark:text-rose-400 flex items-center justify-center gap-1">
              <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
              <span>{streak} Days</span>
            </div>
          </div>

          <div className="w-px h-8 bg-stone-200 dark:bg-zinc-700" />

          <div>
            <div className="text-[11px] text-stone-500 dark:text-zinc-400 font-medium">Chef Rank</div>
            <div className="text-base font-black text-amber-600 dark:text-amber-400 flex items-center justify-center gap-1">
              <span>{currentTier.badgeEmoji}</span>
              <span>Lv. {currentTier.level}</span>
            </div>
          </div>

          <div className="w-px h-8 bg-stone-200 dark:bg-zinc-700" />

          <div>
            <div className="text-[11px] text-stone-500 dark:text-zinc-400 font-medium">Total Clever XP</div>
            <div className="text-base font-black text-[#2ECC71] flex items-center justify-center gap-1">
              <Trophy className="w-4 h-4 text-amber-500" />
              <span>{foodiePoints} XP</span>
            </div>
          </div>
        </div>

        <div className="mt-5 flex items-center gap-2">
          {onOpenAccomplishments && (
            <button
              onClick={() => {
                onClose();
                onOpenAccomplishments();
              }}
              className="flex-1 py-3 px-4 bg-stone-100 dark:bg-zinc-800 hover:bg-stone-200 dark:hover:bg-zinc-750 text-stone-800 dark:text-zinc-200 font-bold rounded-2xl text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Award className="w-4 h-4 text-amber-500" />
              <span>View Trophies</span>
            </button>
          )}

          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 bg-[#2ECC71] hover:bg-[#27ae60] text-white font-black rounded-2xl shadow-md shadow-[#2ECC71]/20 transition-transform active:scale-98 text-xs cursor-pointer"
          >
            Keep Crushing It
          </button>
        </div>
      </div>
    </div>
  );
};
