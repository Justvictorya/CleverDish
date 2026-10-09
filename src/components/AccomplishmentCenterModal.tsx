import React, { useState } from 'react';
import { UserProfile, CleverBadge, DailyQuest, CommunityChallenge, Meal } from '../types';
import {
  X,
  Flame,
  Sparkles,
  CheckCircle2,
  Lock,
  ChevronDown,
  ChevronUp,
  Award,
  Crown,
  Zap,
  Target,
  Swords,
  ChevronRight,
  Calendar,
  Gift
} from 'lucide-react';
import { getChefTier, getNextTier, CHEF_TIERS, getDefaultChallenges } from '../utils/gamification';
import { soundFX } from '../utils/sound';
import { fireMealStreakConfetti } from '../utils/confetti';

interface AccomplishmentCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
  quests: DailyQuest[];
  badges: CleverBadge[];
  challenges?: CommunityChallenge[];
  experienceMode?: 'clean' | 'chef';
  onSetExperienceMode?: (mode: 'clean' | 'chef') => void;
  todaysMeals?: Meal[];
  onClaimQuest: (questId: string) => void;
  onJoinChallenge?: (challengeId: string) => void;
  onLeaveChallenge?: (challengeId: string) => void;
  onClaimChallengeReward?: (challengeId: string) => void;
  onTriggerAction?: (actionKey: string) => void;
}

export const AccomplishmentCenterModal: React.FC<AccomplishmentCenterModalProps> = ({
  isOpen,
  onClose,
  profile,
  quests,
  badges,
  challenges: initialChallenges,
  experienceMode = 'clean',
  onSetExperienceMode,
  todaysMeals = [],
  onClaimQuest,
  onJoinChallenge,
  onLeaveChallenge,
  onClaimChallengeReward
}) => {
  const [activeTab, setActiveTab] = useState<'challenges' | 'quests' | 'trophies' | 'tiers'>('challenges');
  const [selectedBadge, setSelectedBadge] = useState<CleverBadge | null>(null);

  // Community Challenges State with fallback
  const [challenges, setChallenges] = useState<CommunityChallenge[]>(() => {
    return initialChallenges && initialChallenges.length > 0
      ? initialChallenges
      : getDefaultChallenges();
  });

  // Collapsible accordion states to keep the UI uncrowded
  const [expandedGuidelinesId, setExpandedGuidelinesId] = useState<string | null>(null);
  const [isPerksDrawerOpen, setIsPerksDrawerOpen] = useState(false);

  if (!isOpen) return null;

  // ── Clean mode ─────────────────────────────────────────────────────────
  // No ranks, no XP, no leaderboards. Just the handful of numbers a person
  // actually wants to see, plus a one-tap way into the game if they choose it.
  if (experienceMode === 'clean') {
    const verifiedToday = todaysMeals.filter(m => m.photoVerified).length;
    const mealsToday = todaysMeals.length;
    const daysOnPlan = (() => {
      if (!profile.planStartDate) return null;
      const [y, m, d] = profile.planStartDate.split('T')[0].split('-').map(Number);
      if (!Number.isFinite(y) || !Number.isFinite(m) || !Number.isFinite(d)) return null;
      const start = Date.UTC(y, m - 1, d);
      const now = new Date();
      const today = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
      return Math.max(0, Math.floor((today - start) / 86_400_000)) + 1;
    })();

    return (
      <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
        <div className="bg-white dark:bg-[#18181B] rounded-3xl max-w-md w-full border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden">
          <div className="flex items-center justify-between px-6 pt-6 pb-4">
            <h2 className="text-lg font-black text-zinc-900 dark:text-white tracking-tight">Your Progress</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>

          <div className="px-6 pb-6 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 p-4">
                <div className="text-2xl font-black text-zinc-900 dark:text-white">{profile.streak}</div>
                <div className="text-[11px] font-semibold uppercase tracking-wide text-zinc-500 mt-1">Day streak</div>
              </div>
              <div className="rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 p-4">
                <div className="text-2xl font-black text-zinc-900 dark:text-white">{daysOnPlan ?? '—'}</div>
                <div className="text-[11px] font-semibold uppercase tracking-wide text-zinc-500 mt-1">Days on plan</div>
              </div>
            </div>

            <div className="rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 p-4">
              <div className="text-2xl font-black text-zinc-900 dark:text-white">
                {mealsToday > 0 ? `${verifiedToday}/${mealsToday}` : '—'}
              </div>
              <div className="text-[11px] font-semibold uppercase tracking-wide text-zinc-500 mt-1">
                Plates logged today
              </div>
            </div>

            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed pt-1">
              This is your quiet view — just the essentials. Want levels, badges and daily quests?
              You can turn on the game whenever you like.
            </p>

            {onSetExperienceMode && (
              <button
                onClick={() => onSetExperienceMode('chef')}
                className="w-full mt-1 py-3 rounded-2xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-sm font-bold hover:opacity-90 transition-opacity cursor-pointer"
              >
                Turn on Chef Mode
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  const currentXp = profile.xp ?? profile.cleverPoints ?? 380;
  const currentTier = getChefTier(currentXp);
  const nextTier = getNextTier(currentXp);

  // Progress in current level
  const tierRange = (nextTier?.minXp ?? 5000) - currentTier.minXp;
  const xpInTier = currentXp - currentTier.minXp;
  const tierProgressPercent = Math.min(100, Math.max(0, Math.round((xpInTier / tierRange) * 100)));

  const completedQuestsCount = quests.filter(q => q.isCompleted).length;
  const allQuestsDone = completedQuestsCount === quests.length && quests.length > 0;
  const unlockedBadgesCount = badges.filter(b => b.isUnlocked).length;
  const activeChallengesCount = challenges.filter(c => c.isJoined && !c.isCompleted).length;

  const handleQuestClick = (quest: DailyQuest) => {
    if (!quest.isCompleted) {
      soundFX.playQuestComplete();
      fireMealStreakConfetti();
      onClaimQuest(quest.id);
    }
  };

  const handleToggleJoin = (challengeId: string) => {
    soundFX.playTap();
    setChallenges(prev =>
      prev.map(c => {
        if (c.id === challengeId) {
          const nextJoined = !c.isJoined;
          if (nextJoined) {
            soundFX.playBadgeUnlocked();
            fireMealStreakConfetti();
          }
          return { ...c, isJoined: nextJoined };
        }
        return c;
      })
    );
    const target = challenges.find(c => c.id === challengeId);
    if (target?.isJoined) {
      onLeaveChallenge?.(challengeId);
    } else {
      onJoinChallenge?.(challengeId);
    }
  };

  const handleClaimChallenge = (challenge: CommunityChallenge) => {
    soundFX.playLevelUp();
    fireMealStreakConfetti();
    setChallenges(prev =>
      prev.map(c => (c.id === challenge.id ? { ...c, isCompleted: true } : c))
    );
    onClaimChallengeReward?.(challenge.id);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#18181B] rounded-3xl max-w-5xl w-full border border-stone-200 dark:border-zinc-800 shadow-2xl overflow-hidden transition-colors my-auto max-h-[92vh] flex flex-col md:flex-row">
        
        {/* ======================================================== */}
        {/* LEFT SIDEBAR: CHEF PROFILE & NAVIGATION (Compact & Clean) */}
        {/* ======================================================== */}
        <div className="w-full md:w-72 lg:w-80 bg-stone-50 dark:bg-zinc-900 border-b md:border-b-0 md:border-r border-stone-200 dark:border-zinc-800 flex flex-col justify-between shrink-0">
          <div>
            {/* User Identity Header */}
            <div className="p-5 border-b border-stone-200/80 dark:border-zinc-800 bg-white dark:bg-[#18181B]/50">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-300 text-stone-950 flex items-center justify-center text-2xl font-black shadow-md shadow-amber-500/20 shrink-0">
                  {currentTier.badgeEmoji}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-extrabold text-sm text-stone-900 dark:text-zinc-100 truncate">
                      {profile.name || 'Chef'}
                    </h4>
                    <span className="text-[10px] font-mono font-bold uppercase bg-amber-100 dark:bg-amber-950/70 text-amber-700 dark:text-amber-400 px-1.5 py-0.2 rounded border border-amber-300/40">
                      Lv.{currentTier.level}
                    </span>
                  </div>
                  <p className="text-xs text-stone-500 dark:text-zinc-400 truncate">
                    {currentTier.title}
                  </p>
                </div>
              </div>

              {/* Habit Streak & Total XP Badges */}
              <div className="mt-3.5 grid grid-cols-2 gap-2 text-xs">
                <div className="p-2 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-600 dark:text-orange-400 flex items-center gap-1.5">
                  <Flame className="w-4 h-4 fill-orange-500 shrink-0 animate-pulse" />
                  <span className="font-extrabold font-mono text-[11px]">{profile.streak}d Streak</span>
                </div>
                <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-[#2ECC71] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="font-extrabold font-mono text-[11px]">{currentXp.toLocaleString()} XP</span>
                </div>
              </div>

              {/* Progress to next level mini bar */}
              <div className="mt-3 space-y-1">
                <div className="flex justify-between text-[10px] font-mono text-stone-400">
                  <span>To Rank {nextTier?.level ?? 'Max'}</span>
                  <span className="text-amber-600 dark:text-amber-400 font-bold">{tierProgressPercent}%</span>
                </div>
                <div className="w-full h-1.5 bg-stone-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-400 to-[#2ECC71] rounded-full transition-all duration-500"
                    style={{ width: `${tierProgressPercent}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Vertical Clean Navigation Tabs */}
            <div className="p-3 space-y-1">
              {/* Tab 1: Challenges */}
              <button
                onClick={() => {
                  soundFX.playTap();
                  setActiveTab('challenges');
                }}
                className={`w-full p-2.5 rounded-2xl flex items-center justify-between text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'challenges'
                    ? 'bg-[#7A1C2C] text-white shadow-xs'
                    : 'text-stone-600 dark:text-zinc-400 hover:bg-stone-200/60 dark:hover:bg-zinc-800'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Swords className={`w-4 h-4 ${activeTab === 'challenges' ? 'text-amber-300' : 'text-stone-500'}`} />
                  <span>Challenges</span>
                </div>
                {activeChallengesCount > 0 && (
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                    activeTab === 'challenges'
                      ? 'bg-white/20 text-white'
                      : 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300'
                  }`}>
                    {activeChallengesCount} Active
                  </span>
                )}
              </button>

              {/* Tab 2: Quests */}
              <button
                onClick={() => {
                  soundFX.playTap();
                  setActiveTab('quests');
                }}
                className={`w-full p-2.5 rounded-2xl flex items-center justify-between text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'quests'
                    ? 'bg-[#7A1C2C] text-white shadow-xs'
                    : 'text-stone-600 dark:text-zinc-400 hover:bg-stone-200/60 dark:hover:bg-zinc-800'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Target className={`w-4 h-4 ${activeTab === 'quests' ? 'text-amber-300' : 'text-stone-500'}`} />
                  <span>Daily Quests</span>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                  activeTab === 'quests'
                    ? 'bg-white/20 text-white'
                    : 'bg-stone-200 dark:bg-zinc-800 text-stone-700 dark:text-zinc-300'
                }`}>
                  {completedQuestsCount}/{quests.length}
                </span>
              </button>

              {/* Tab 3: Trophies */}
              <button
                onClick={() => {
                  soundFX.playTap();
                  setActiveTab('trophies');
                }}
                className={`w-full p-2.5 rounded-2xl flex items-center justify-between text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'trophies'
                    ? 'bg-[#7A1C2C] text-white shadow-xs'
                    : 'text-stone-600 dark:text-zinc-400 hover:bg-stone-200/60 dark:hover:bg-zinc-800'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Award className={`w-4 h-4 ${activeTab === 'trophies' ? 'text-amber-300' : 'text-stone-500'}`} />
                  <span>Trophy Cabinet</span>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                  activeTab === 'trophies'
                    ? 'bg-white/20 text-white'
                    : 'bg-stone-200 dark:bg-zinc-800 text-stone-700 dark:text-zinc-300'
                }`}>
                  {unlockedBadgesCount}/{badges.length}
                </span>
              </button>

              {/* Tab 4: Chef Tiers */}
              <button
                onClick={() => {
                  soundFX.playTap();
                  setActiveTab('tiers');
                }}
                className={`w-full p-2.5 rounded-2xl flex items-center justify-between text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'tiers'
                    ? 'bg-[#7A1C2C] text-white shadow-xs'
                    : 'text-stone-600 dark:text-zinc-400 hover:bg-stone-200/60 dark:hover:bg-zinc-800'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Crown className={`w-4 h-4 ${activeTab === 'tiers' ? 'text-amber-300' : 'text-stone-500'}`} />
                  <span>Chef Ranks</span>
                </div>
                <span className="text-[10px] font-mono text-stone-400">8 Tiers</span>
              </button>
            </div>
          </div>

          {/* Collapsible Perks Drawer at Bottom of Sidebar */}
          <div className="p-3 border-t border-stone-200/80 dark:border-zinc-800">
            <button
              onClick={() => setIsPerksDrawerOpen(!isPerksDrawerOpen)}
              className="w-full p-2 rounded-xl text-stone-600 dark:text-zinc-400 hover:text-stone-900 dark:hover:text-zinc-200 flex items-center justify-between text-xs font-semibold cursor-pointer"
            >
              <div className="flex items-center gap-1.5">
                <Gift className="w-3.5 h-3.5 text-amber-500" />
                <span>Rank Perks</span>
              </div>
              {isPerksDrawerOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>

            {isPerksDrawerOpen && (
              <div className="mt-2 p-2.5 rounded-xl bg-white dark:bg-zinc-850 border border-stone-200 dark:border-zinc-800 text-[11px] space-y-1.5 animate-in fade-in duration-150">
                <div className="font-bold text-stone-900 dark:text-zinc-100 flex items-center gap-1">
                  <span>Current Perk:</span>
                </div>
                <p className="text-stone-600 dark:text-zinc-400 leading-snug">{currentTier.perk}</p>
                {nextTier && (
                  <div className="pt-1.5 border-t border-stone-100 dark:border-zinc-800 text-stone-500">
                    <strong className="text-amber-600 dark:text-amber-400">Rank {nextTier.level}:</strong> {nextTier.perk}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* ======================================================== */}
        {/* RIGHT MAIN CANVAS: ACTIVE TAB CONTENT (Clean & Spacious) */}
        {/* ======================================================== */}
        <div className="flex-1 flex flex-col min-w-0 bg-white dark:bg-[#18181B] overflow-hidden">
          {/* Canvas Top Bar */}
          <div className="px-6 py-4 border-b border-stone-100 dark:border-zinc-800 flex items-center justify-between bg-stone-50/50 dark:bg-zinc-900/30">
            <div>
              <h3 className="font-black text-base sm:text-lg text-stone-900 dark:text-zinc-100 flex items-center gap-2">
                {activeTab === 'challenges' && 'Personal Challenges'}
                {activeTab === 'quests' && 'Daily Habit Quests'}
                {activeTab === 'trophies' && 'Trophy & Accomplishment Cabinet'}
                {activeTab === 'tiers' && 'Chef Mastery Tier Ladder'}
              </h3>
              <p className="text-xs text-stone-500 dark:text-zinc-400">
                {activeTab === 'challenges' && 'Join group habits, stay consistent, and lock in milestone XP.'}
                {activeTab === 'quests' && 'Complete your 3 daily rituals to earn bonus streak multipliers and XP.'}
                {activeTab === 'trophies' && 'Permanent badges unlocked through nutritional discipline and market savvy.'}
                {activeTab === 'tiers' && 'Climb from Kitchen Scout to Sovereign Nutrition Legend.'}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0 ml-2">
              {onSetExperienceMode && (
                <button
                  onClick={() => onSetExperienceMode('clean')}
                  className="hidden sm:inline text-[11px] font-bold text-stone-500 hover:text-stone-900 dark:hover:text-zinc-100 px-3 py-1.5 rounded-lg border border-stone-200 dark:border-zinc-800 cursor-pointer transition-colors"
                >
                  Switch to Clean Mode
                </button>
              )}
              <button
                onClick={() => {
                  soundFX.playTap();
                  onClose();
                }}
                className="w-8 h-8 rounded-full bg-stone-100 dark:bg-zinc-800 text-stone-500 hover:text-stone-900 dark:hover:text-zinc-100 flex items-center justify-center cursor-pointer transition-colors shrink-0"
                title="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Canvas Scrollable Content Area */}
          <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-4">
            
            {/* ---------------------------------------------------- */}
            {/* TAB 1: COMMUNITY CHALLENGES WITH GLOBAL LEADERBOARDS */}
            {/* ---------------------------------------------------- */}
            {activeTab === 'challenges' && (
              <div className="space-y-4 animate-in fade-in duration-200">
                {challenges.map(challenge => {
                  const isGuidelinesOpen = expandedGuidelinesId === challenge.id;
                  const progressPct = Math.min(100, Math.round((challenge.currentDays / challenge.durationDays) * 100));
                  const isReadyToClaim = challenge.isJoined && challenge.currentDays >= challenge.durationDays && !challenge.isCompleted;

                  return (
                    <div
                      key={challenge.id}
                      className={`p-5 rounded-3xl border transition-all ${
                        challenge.isJoined
                          ? 'bg-stone-50/80 dark:bg-zinc-850/80 border-stone-300 dark:border-zinc-700 shadow-xs'
                          : 'bg-white dark:bg-zinc-900 border-stone-200 dark:border-zinc-800 opacity-90'
                      }`}
                    >
                      {/* Challenge Header Row */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-start gap-3.5">
                          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center text-2xl font-bold shadow-2xs shrink-0">
                            {challenge.icon}
                          </div>
                          <div>
                            <div className="flex items-center flex-wrap gap-2">
                              <h4 className="font-extrabold text-sm sm:text-base text-stone-900 dark:text-zinc-100">
                                {challenge.title}
                              </h4>
                              {challenge.isJoined && !challenge.isCompleted && (
                                <span className="text-[10px] font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-300/40">
                                  In Progress
                                </span>
                              )}
                              {challenge.isCompleted && (
                                <span className="text-[10px] font-bold text-amber-800 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/60 px-2 py-0.5 rounded-full border border-amber-300/40">
                                  ✓ Completed
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-stone-500 dark:text-zinc-400 mt-0.5">
                              {challenge.subtitle}
                            </p>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
                          {isReadyToClaim ? (
                            <button
                              onClick={() => handleClaimChallenge(challenge)}
                              className="px-4 py-2 bg-[#2ECC71] hover:bg-[#27ae60] text-white font-black text-xs rounded-xl shadow-md cursor-pointer animate-pulse"
                            >
                              Claim +{challenge.rewardXp} XP 🎁
                            </button>
                          ) : challenge.isJoined ? (
                            <button
                              onClick={() => handleToggleJoin(challenge.id)}
                              className="px-3.5 py-1.5 bg-stone-200 dark:bg-zinc-800 hover:bg-rose-100 dark:hover:bg-rose-950/50 hover:text-rose-600 text-stone-600 dark:text-zinc-300 font-bold text-xs rounded-xl transition-colors cursor-pointer"
                            >
                              Leave
                            </button>
                          ) : (
                            <button
                              onClick={() => handleToggleJoin(challenge.id)}
                              className="px-4 py-2 bg-[#7A1C2C] hover:bg-[#631623] text-white font-black text-xs rounded-xl shadow-xs transition-transform active:scale-95 cursor-pointer flex items-center gap-1.5"
                            >
                              <Swords className="w-3.5 h-3.5 text-amber-300" />
                              <span>Join Challenge</span>
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Progress Bar & Rewards Strip (if joined) */}
                      {challenge.isJoined && (
                        <div className="mt-4 pt-3 border-t border-stone-200/70 dark:border-zinc-800 space-y-2">
                          <div className="flex items-center justify-between text-xs font-mono">
                            <span className="text-stone-500 dark:text-zinc-400">
                              Your Progress: <strong className="text-stone-900 dark:text-zinc-100">{challenge.currentDays} of {challenge.durationDays} Days</strong>
                            </span>
                            <span className="text-[#2ECC71] font-bold">{progressPct}%</span>
                          </div>
                          <div className="w-full h-2 bg-stone-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-amber-400 via-[#2ECC71] to-[#27ae60] rounded-full transition-all duration-500"
                              style={{ width: `${progressPct}%` }}
                            />
                          </div>
                        </div>
                      )}

                      {/* Meta badges: Reward & Guidelines toggle */}
                      <div className="mt-3.5 flex flex-wrap items-center justify-between gap-2 text-xs pt-1">
                        <span className="text-[11px] font-mono font-bold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2.5 py-1 rounded-lg border border-amber-200 dark:border-amber-800">
                          Reward: +{challenge.rewardXp} XP · {challenge.rewardBadge}
                        </span>

                        <button
                          onClick={() => setExpandedGuidelinesId(isGuidelinesOpen ? null : challenge.id)}
                          className="text-stone-600 dark:text-zinc-400 hover:text-stone-900 dark:hover:text-zinc-100 flex items-center gap-1 text-[11px] font-bold cursor-pointer transition-colors"
                        >
                          <span>Guidelines</span>
                          {isGuidelinesOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                        </button>
                      </div>

                      {/* COLLAPSIBLE 1: GUIDELINES & NUTRITIONAL LOGIC */}
                      {isGuidelinesOpen && (
                        <div className="mt-3 p-3.5 rounded-2xl bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 text-xs space-y-2 animate-in zoom-in-95 duration-150">
                          <div className="font-bold text-stone-800 dark:text-zinc-200">
                            Challenge Guidelines & Nutritional Rationale:
                          </div>
                          <p className="text-stone-600 dark:text-zinc-400 leading-relaxed">
                            {challenge.description}
                          </p>
                          <ul className="space-y-1 pt-1 text-stone-600 dark:text-zinc-400">
                            {challenge.guidelines.map((rule, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span className="text-[#2ECC71] font-bold">✓</span>
                                <span>{rule}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* ---------------------------------------------------- */}
            {/* TAB 2: DAILY HABIT QUESTS */}
            {/* ---------------------------------------------------- */}
            {activeTab === 'quests' && (
              <div className="space-y-4 animate-in fade-in duration-200">
                {allQuestsDone && (
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/20 via-emerald-500/20 to-amber-500/20 border border-amber-300 dark:border-amber-700 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2.5">
                      <span className="text-2xl">👑</span>
                      <div>
                        <h5 className="font-black text-stone-900 dark:text-zinc-100">
                          Daily Trifecta Crown Claimed!
                        </h5>
                        <p className="text-[11px] text-stone-600 dark:text-zinc-400">
                          All 3 daily quests completed today. +100 bonus streak multiplier applied.
                        </p>
                      </div>
                    </div>
                    <span className="font-black font-mono text-[#2ECC71] text-sm">+100 XP</span>
                  </div>
                )}

                <div className="space-y-2.5">
                  {quests.map(quest => (
                    <div
                      key={quest.id}
                      className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-3 text-xs ${
                        quest.isCompleted
                          ? 'bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800 text-stone-700 dark:text-zinc-300'
                          : 'bg-stone-50 dark:bg-zinc-850 border-stone-200 dark:border-zinc-750 text-stone-900 dark:text-zinc-100 hover:border-stone-300'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg font-bold shrink-0 ${
                            quest.isCompleted
                              ? 'bg-[#2ECC71]/20 text-[#2ECC71]'
                              : 'bg-stone-200 dark:bg-zinc-750 text-stone-700 dark:text-zinc-300'
                          }`}
                        >
                          {quest.isCompleted ? '✓' : quest.icon}
                        </div>

                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className={`font-bold truncate ${quest.isCompleted ? 'line-through text-stone-400 dark:text-zinc-500' : ''}`}>
                              {quest.title}
                            </span>
                            <span className="text-[10px] font-mono font-bold text-[#2ECC71] bg-white dark:bg-zinc-900 px-1.5 py-0.2 rounded border border-emerald-200 dark:border-emerald-800">
                              +{quest.xpReward} XP
                            </span>
                          </div>
                          <p className="text-[11px] text-stone-500 dark:text-zinc-400 mt-0.5 truncate">
                            {quest.description}
                          </p>
                        </div>
                      </div>

                      <div className="shrink-0 flex items-center gap-2">
                        {quest.isCompleted ? (
                          <span className="px-3 py-1.5 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300 font-bold text-xs flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Done</span>
                          </span>
                        ) : (
                          <button
                            onClick={() => handleQuestClick(quest)}
                            className="px-3.5 py-1.5 bg-[#7A1C2C] hover:bg-[#631623] text-white font-bold rounded-xl shadow-xs cursor-pointer flex items-center gap-1 transition-colors"
                          >
                            <Zap className="w-3 h-3 text-amber-300" />
                            <span>Claim</span>
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ---------------------------------------------------- */}
            {/* TAB 3: TROPHY CABINET & BADGES */}
            {/* ---------------------------------------------------- */}
            {activeTab === 'trophies' && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {badges.map(badge => (
                    <button
                      key={badge.id}
                      onClick={() => {
                        soundFX.playTap();
                        setSelectedBadge(badge);
                      }}
                      className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-between gap-2 relative ${
                        badge.isUnlocked
                          ? 'bg-amber-50/50 dark:bg-amber-950/20 border-amber-300 dark:border-amber-800 shadow-xs hover:scale-102'
                          : 'bg-stone-50 dark:bg-zinc-850/60 border-stone-200 dark:border-zinc-800 opacity-60 hover:opacity-90'
                      }`}
                    >
                      {!badge.isUnlocked && (
                        <div className="absolute top-2 right-2 text-stone-400">
                          <Lock className="w-3 h-3" />
                        </div>
                      )}

                      <div className="text-3xl my-1">{badge.icon}</div>
                      <div className="w-full">
                        <div className="font-extrabold text-xs text-stone-900 dark:text-zinc-100 truncate">
                          {badge.title}
                        </div>
                        <div className="text-[10px] text-stone-500 dark:text-zinc-400 font-mono mt-0.5">
                          {badge.isUnlocked ? (
                            <span className="text-[#2ECC71] font-bold">Unlocked</span>
                          ) : (
                            `${badge.progress}/${badge.maxProgress}`
                          )}
                        </div>
                      </div>

                      <div className="w-full h-1.5 bg-stone-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${badge.isUnlocked ? 'bg-amber-400' : 'bg-stone-400'}`}
                          style={{ width: `${Math.min(100, (badge.progress / badge.maxProgress) * 100)}%` }}
                        />
                      </div>
                    </button>
                  ))}
                </div>

                {/* Selected Badge Lore View */}
                {selectedBadge && (
                  <div className="p-4 rounded-2xl bg-stone-50 dark:bg-zinc-850 border border-stone-200 dark:border-zinc-750 text-xs space-y-2 animate-in zoom-in-95 duration-150">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-stone-900 dark:text-zinc-100 flex items-center gap-2">
                        <span className="text-xl">{selectedBadge.icon}</span>
                        <span>{selectedBadge.title}</span>
                      </span>
                      <span className="text-[10px] uppercase font-bold text-amber-700 dark:text-amber-400 bg-amber-100 dark:bg-amber-950/60 px-2 py-0.5 rounded">
                        {selectedBadge.tier} trophy · +{selectedBadge.rewardXp} XP
                      </span>
                    </div>
                    <p className="text-stone-700 dark:text-zinc-300 font-medium">{selectedBadge.description}</p>
                    <p className="text-[11px] text-stone-500 dark:text-zinc-400 italic bg-white dark:bg-zinc-900 p-2.5 rounded-xl border border-stone-200 dark:border-zinc-800">
                      "{selectedBadge.lore}"
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* ---------------------------------------------------- */}
            {/* TAB 4: CHEF TIERS LADDER */}
            {/* ---------------------------------------------------- */}
            {activeTab === 'tiers' && (
              <div className="space-y-3 animate-in fade-in duration-200 text-xs">
                {CHEF_TIERS.map(tier => {
                  const isReached = currentXp >= tier.minXp;
                  const isCurrent = currentTier.level === tier.level;

                  return (
                    <div
                      key={tier.level}
                      className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                        isCurrent
                          ? 'bg-amber-500/10 border-amber-500 text-amber-950 dark:text-amber-200 ring-2 ring-amber-400/30'
                          : isReached
                          ? 'bg-stone-50 dark:bg-zinc-850 border-stone-200 dark:border-zinc-750 text-stone-800 dark:text-zinc-200'
                          : 'bg-stone-50/40 dark:bg-zinc-900/40 border-stone-200/60 dark:border-zinc-800/60 opacity-60 text-stone-500'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{tier.badgeEmoji}</div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-extrabold text-sm">
                              Level {tier.level}: {tier.title}
                            </span>
                            {isCurrent && (
                              <span className="text-[9px] font-bold text-amber-700 dark:text-amber-400 bg-amber-100 dark:bg-amber-950 px-1.5 py-0.2 rounded uppercase">
                                Current Rank
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-stone-500 dark:text-zinc-400 mt-0.5">
                            {tier.perk}
                          </div>
                        </div>
                      </div>

                      <div className="font-mono font-bold text-right shrink-0">
                        <div>{tier.minXp.toLocaleString()} XP</div>
                        <div className="text-[10px] text-stone-400">{isReached ? '✓ Unlocked' : 'Locked'}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-stone-100 dark:border-zinc-800 bg-stone-50/50 dark:bg-zinc-900 flex items-center justify-between text-xs">
            <span className="text-stone-500 dark:text-zinc-400 font-mono text-[11px]">
              CleverDish Community Challenges · Real indigenous food, real macro science
            </span>

            <button
              onClick={() => {
                soundFX.playTap();
                onClose();
              }}
              className="px-5 py-2 bg-stone-900 dark:bg-zinc-800 hover:bg-stone-800 text-white font-bold rounded-xl cursor-pointer"
            >
              Back to Kitchen
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
