import React from 'react';
import { Meal, UserProfile, DailyQuest } from '../types';
import { Flame, CheckCircle2, Camera, Sparkles, Trophy, Zap, ChevronRight } from 'lucide-react';
import { getChefTier, getNextTier } from '../utils/gamification';

interface StreakMiniCardProps {
  profile: UserProfile;
  todaysMeals: Meal[];
  quests?: DailyQuest[];
  onOpenPhotoSnapForMeal?: (meal: Meal) => void;
  onOpenAccomplishments?: () => void;
}

export const StreakMiniCard: React.FC<StreakMiniCardProps> = ({
  profile,
  todaysMeals,
  quests = [],
  onOpenPhotoSnapForMeal,
  onOpenAccomplishments
}) => {
  const verifiedCount = todaysMeals.filter(m => m.photoVerified).length;
  const totalCount = todaysMeals.length;
  const isAllVerified = totalCount > 0 && verifiedCount === totalCount;

  const currentXp = profile.xp ?? profile.cleverPoints ?? 380;
  const currentTier = getChefTier(currentXp);
  const nextTier = getNextTier(currentXp);
  const tierRange = (nextTier?.minXp ?? 5000) - currentTier.minXp;
  const xpInTier = currentXp - currentTier.minXp;
  const tierProgressPercent = Math.min(100, Math.max(0, Math.round((xpInTier / tierRange) * 100)));

  const completedQuestsCount = quests.filter(q => q.isCompleted).length;

  return (
    <div className="bg-white dark:bg-[#18181B] rounded-3xl border border-stone-200/90 dark:border-zinc-800 shadow-sm p-4 space-y-3.5 transition-colors">
      {/* Top Bar: Chef Level & Trophy Room CTA */}
      <div className="flex items-center justify-between pb-2 border-b border-stone-100 dark:border-zinc-800">
        <div
          onClick={onOpenAccomplishments}
          className="flex items-center gap-2 cursor-pointer group"
          title="Open Trophy Room & Chef Rank"
        >
          <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-base shadow-2xs group-hover:scale-105 transition-transform">
            {currentTier.badgeEmoji}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xs text-stone-900 dark:text-zinc-100 group-hover:text-[#7A1C2C] dark:group-hover:text-rose-400 transition-colors">
                Lv. {currentTier.level} {currentTier.title}
              </span>
              <Sparkles className="w-3 h-3 text-amber-500" />
            </div>
            <p className="text-[10px] text-stone-400 dark:text-zinc-500 font-mono">
              {currentXp} XP · {tierProgressPercent}% to next rank
            </p>
          </div>
        </div>

        {onOpenAccomplishments && (
          <button
            onClick={onOpenAccomplishments}
            className="px-2.5 py-1 rounded-xl bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-300 font-bold text-[10px] flex items-center gap-1 cursor-pointer transition-colors"
          >
            <Trophy className="w-3 h-3 text-amber-500" />
            <span>Trophies</span>
            <ChevronRight className="w-2.5 h-2.5" />
          </button>
        )}
      </div>

      {/* Mini XP Progress Track */}
      <div className="w-full h-1.5 bg-stone-100 dark:bg-zinc-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-amber-400 to-[#2ECC71] rounded-full transition-all duration-500"
          style={{ width: `${tierProgressPercent}%` }}
        />
      </div>

      {/* Habit Streak & Plates Authenticated Status */}
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-orange-500/10 text-orange-500 flex items-center justify-center font-bold">
            <Flame className="w-4 h-4 fill-orange-500 animate-pulse" />
          </div>
          <div>
            <div className="font-extrabold text-xs text-stone-900 dark:text-zinc-100 flex items-center gap-1.5">
              <span>{profile.streak} Days Habit Streak</span>
              {isAllVerified && (
                <span className="text-[10px] font-bold text-[#2ECC71] bg-emerald-50 dark:bg-emerald-950/40 px-1.5 py-0.2 rounded border border-emerald-200 dark:border-emerald-800">
                  Locked
                </span>
              )}
            </div>
            <p className="text-[10px] text-stone-400 dark:text-zinc-500 font-mono">
              +50 XP per photo authentication
            </p>
          </div>
        </div>

        <span className="text-[11px] font-mono font-bold text-stone-600 dark:text-zinc-300 bg-stone-100 dark:bg-zinc-800 px-2 py-0.5 rounded-lg">
          {verifiedCount}/{totalCount} Plates
        </span>
      </div>

      {/* Mini 2-Meal Status Strip */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        {todaysMeals.map((meal) => {
          const isVerified = meal.photoVerified;
          return (
            <div
              key={meal.id}
              onClick={() => !isVerified && onOpenPhotoSnapForMeal?.(meal)}
              className={`p-2 rounded-xl border flex items-center justify-between transition-all ${
                isVerified
                  ? 'bg-emerald-50/60 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300'
                  : 'bg-stone-50 dark:bg-zinc-850 border-stone-200 dark:border-zinc-750 text-stone-600 dark:text-zinc-400 cursor-pointer hover:border-[#7A1C2C]'
              }`}
            >
              <div className="truncate mr-1">
                <div className="font-bold text-[10px] uppercase truncate">
                  {meal.type === 'morning' ? '🌅 Breakfast' : '☀️ Dinner'}
                </div>
                <div className="text-[10px] truncate text-stone-500 dark:text-zinc-400 font-mono">
                  {isVerified ? 'Authenticated' : 'Snap photo'}
                </div>
              </div>

              {isVerified ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2ECC71] shrink-0" />
              ) : (
                <Camera className="w-3.5 h-3.5 text-stone-400 shrink-0" />
              )}
            </div>
          );
        })}
      </div>

      {/* Daily Quests Mini Pill */}
      {quests.length > 0 && onOpenAccomplishments && (
        <button
          onClick={onOpenAccomplishments}
          className="w-full p-2 rounded-xl bg-stone-50 dark:bg-zinc-850 hover:bg-stone-100 dark:hover:bg-zinc-800 border border-stone-200 dark:border-zinc-750 flex items-center justify-between text-xs cursor-pointer transition-colors"
        >
          <div className="flex items-center gap-1.5 font-bold text-stone-700 dark:text-zinc-300 text-[11px]">
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            <span>Today's Clever Quests</span>
          </div>
          <div className="flex items-center gap-1 font-mono text-[11px] text-stone-500 dark:text-zinc-400">
            <span className="text-[#2ECC71] font-bold">{completedQuestsCount}</span>/{quests.length} Done
            <ChevronRight className="w-3 h-3 text-stone-400" />
          </div>
        </button>
      )}
    </div>
  );
};
