import React, { useState } from 'react';
import { UserProfile, CountryCode, FitnessGoal, StaplePreference } from '../types';
import { COUNTRIES } from '../data/countries';
import { calculateMacros, computeBudgetVerdict } from '../utils/nutrition';
import {
  Globe,
  TrendingDown,
  Scale,
  TrendingUp,
  Sparkles,
  ShieldCheck,
  Check,
  User,
  ChevronRight,
  Utensils,
  Flame,
  Award,
  Crown,
  Zap,
  Gift,
  KeyRound,
  CheckCircle2
} from 'lucide-react';
import { soundFX } from '../utils/sound';

interface SignUpOnboardingFlowProps {
  onComplete: (profile: UserProfile) => void;
  initialProfile?: UserProfile;
}

export const CHEF_AVATARS = [
  {
    id: 'quick_busy',
    emoji: '⚡',
    title: 'Quick & Busy',
    subtitle: '15-Minute Meals',
    desc: 'I have little time and need fast, simple meals with minimal cleanup.',
    badge: 'Fast & Easy'
  },
  {
    id: 'batch_prepper',
    emoji: '🍱',
    title: 'Sunday Prepper',
    subtitle: 'Cook Once, Eat 4 Days',
    desc: 'I like cooking big pots on weekends to store in the freezer for the week.',
    badge: 'Zero Weekday Stress'
  },
  {
    id: 'budget_saver',
    emoji: '💰',
    title: 'Budget Saver',
    subtitle: 'Smart Market Shopping',
    desc: 'I want healthy, satisfying meals that stretch my money at local markets.',
    badge: 'Max Value / Naira'
  },
  {
    id: 'fitness_fuel',
    emoji: '💪',
    title: 'Fitness & Protein',
    subtitle: 'Gym & Muscle Tone',
    desc: 'I workout or want high-protein meals to build tone and burn body fat.',
    badge: 'High Protein'
  },
  {
    id: 'traditional_soul',
    emoji: '🍲',
    title: 'Home & Soul Food',
    subtitle: 'Authentic Local Dishes',
    desc: 'I love authentic local soups, hearty swallows, and rich traditional spices.',
    badge: 'Rich Flavor'
  },
  {
    id: 'clean_light',
    emoji: '🥗',
    title: 'Light & Fresh',
    subtitle: 'Clean Everyday Eating',
    desc: 'I want wholesome, low-oil meals that leave me feeling energized and light.',
    badge: 'Wholesome'
  },
];

export const SignUpOnboardingFlow: React.FC<SignUpOnboardingFlowProps> = ({
  onComplete,
  initialProfile
}) => {
  // Session Mode: 'signup' (new induction) or 'signin' (returning quick login)
  const [sessionMode, setSessionMode] = useState<'signup' | 'signin'>('signup');
  const [loginIdentifier, setLoginIdentifier] = useState(initialProfile?.name || '');

  // Step state: 1: Identity/Avatar, 2: Goal/Biometrics, 3: Budget, 4: Staples & Crate, 5: Passport Reveal
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);

  // Form State
  const [name, setName] = useState(initialProfile?.name || '');
  const [selectedAvatar, setSelectedAvatar] = useState(initialProfile?.avatar || '🧑‍🍳');
  const [country, setCountry] = useState<CountryCode>(initialProfile?.country || 'NG');
  const [goal, setGoal] = useState<FitnessGoal>(initialProfile?.goal || 'lose_weight');
  const [gender, setGender] = useState<'male' | 'female'>('female');
  const [age, setAge] = useState(initialProfile?.age || 26);
  const [weightKg, setWeightKg] = useState(initialProfile?.weightKg || 68);
  const [heightCm, setHeightCm] = useState(initialProfile?.heightCm || 168);
  const [activityLevel, setActivityLevel] = useState<UserProfile['activityLevel']>(1.375);

  const [budgetPeriod, setBudgetPeriod] = useState<'day' | 'week' | 'month'>('month');
  const [budgetAmount, setBudgetAmount] = useState<number>(() => {
    return initialProfile?.country === 'NG' ? 90000 : 450;
  });

  const [staplePreference, setStaplePreference] = useState<StaplePreference>('indigenous');
  const [isCrateOpened, setIsCrateOpened] = useState(false);
  const [xpAnimation, setXpAnimation] = useState<string | null>(null);

  const countryConfig = COUNTRIES[country] || COUNTRIES.NG;

  // Active XP calculation based on progress
  const currentEarnedXp = 50 + (step >= 2 ? 50 : 0) + (step >= 3 ? 50 : 0) + (step >= 4 ? 50 : 0) + (isCrateOpened ? 150 : 0);

  // Real-time calculated profile
  const tempProfile: UserProfile = {
    id: initialProfile?.id || `usr_${Date.now()}`,
    name: name.trim() || 'CleverDish Member',
    country,
    age,
    gender,
    weightKg,
    heightCm,
    activityLevel,
    goal,
    staplePreference,
    budgetPeriod,
    budgetAmount,
    monthlyBudget: budgetPeriod === 'day' ? budgetAmount * 30 : budgetPeriod === 'week' ? Math.round((budgetAmount / 7) * 30) : budgetAmount,
    isPro: false,
    travelModeActive: false,
    homeCountry: country,
    currentCountry: country,
    streak: 1,
    lastLoggedDate: null,
    cleverPoints: currentEarnedXp,
    xp: currentEarnedXp,
    level: currentEarnedXp >= 250 ? 2 : 1,
    cleverCoins: 150,
    avatar: selectedAvatar,
    kitchenTitle: CHEF_AVATARS.find(a => a.emoji === selectedAvatar)?.title || 'Pioneer Chef',
    hasOnboarded: true,
    planStartDate: initialProfile?.planStartDate || new Date().toISOString()
  };

  const macros = calculateMacros(tempProfile);
  const verdict = computeBudgetVerdict(tempProfile);

  const triggerXpBurst = (amount: number, reason: string) => {
    soundFX.playQuestComplete();
    setXpAnimation(`+${amount} XP: ${reason}!`);
    setTimeout(() => setXpAnimation(null), 2500);
  };

  const handleRandomizeName = () => {
    soundFX.playTap();
    const titles = ['Chef', 'Iron Skillet', 'Spice Crafter', 'Macro Wizard', 'Golden Spoon', 'Flame Master'];
    const names = ['Victoria', 'Amara', 'Tunde', 'Kofi', 'Zainab', 'Nia', 'Chidi', 'Zara', 'Malik', 'Amina'];
    const chosenTitle = titles[Math.floor(Math.random() * titles.length)];
    const chosenName = names[Math.floor(Math.random() * names.length)];
    setName(`${chosenTitle} ${chosenName}`);
  };

  const handleNextStep = () => {
    soundFX.playTap();
    if (step === 1) {
      triggerXpBurst(50, 'Kitchen Persona Activated');
      setStep(2);
    } else if (step === 2) {
      triggerXpBurst(50, 'Caloric Blueprint Locked');
      setStep(3);
    } else if (step === 3) {
      triggerXpBurst(50, 'Market Solvency Calibrated');
      setStep(4);
    } else if (step === 4) {
      if (!isCrateOpened) {
        setIsCrateOpened(true);
      }
      soundFX.playLevelUp();
      setStep(5);
    } else if (step === 5) {
      soundFX.playStreakCelebration();
      onComplete(tempProfile);
    }
  };

  const handleOpenStarterCrate = () => {
    if (isCrateOpened) return;
    setIsCrateOpened(true);
    soundFX.playLevelUp();
    triggerXpBurst(150, 'Starter Loot Crate Claimed');
  };

  const handleReturningLogin = (e: React.FormEvent) => {
    e.preventDefault();
    soundFX.playStreakCelebration();
    const loadedProfile: UserProfile = {
      ...tempProfile,
      name: loginIdentifier.trim() || 'Returning Chef',
      hasOnboarded: true
    };
    onComplete(loadedProfile);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] dark:bg-[#121214] flex flex-col justify-center items-center p-3 sm:p-6 select-none font-sans relative overflow-x-hidden">
      {/* Decorative culinary background rings */}
      <div className="absolute top-0 right-1/4 -translate-y-1/2 w-96 h-96 rounded-full bg-[#7A1C2C]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 translate-y-1/2 w-96 h-96 rounded-full bg-[#2ECC71]/5 blur-3xl pointer-events-none" />

      {/* Floating XP Toast */}
      {xpAnimation && (
        <div className="fixed top-6 z-50 animate-bounce duration-300 pointer-events-none">
          <div className="bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-stone-950 font-black px-4 py-2 rounded-2xl shadow-xl border-2 border-amber-300 flex items-center gap-2 text-sm">
            <Sparkles className="w-4 h-4 fill-current text-stone-900" />
            <span>{xpAnimation}</span>
          </div>
        </div>
      )}

      <div className="w-full max-w-2xl bg-white dark:bg-[#18181B] rounded-3xl shadow-2xl border border-stone-200 dark:border-zinc-800 overflow-hidden flex flex-col relative z-10 transition-colors">
        
        {/* GAMIFIED HEADER BANNER */}
        <div className="bg-[#7A1C2C] text-white p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative overflow-hidden">
          <div className="absolute -right-8 -bottom-8 w-36 h-36 rounded-full bg-white/5 pointer-events-none" />

          <div className="flex items-center gap-3.5 relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-white dark:bg-zinc-800 text-[#7A1C2C] flex items-center justify-center font-black text-2xl shadow-lg ring-2 ring-white/20 shrink-0">
              {selectedAvatar}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-extrabold text-lg sm:text-xl tracking-tight text-white flex items-center gap-1.5">
                  <span>CleverDish</span>
                  <span className="text-[10px] font-mono font-bold bg-[#2ECC71] text-white px-2 py-0.5 rounded-full uppercase tracking-wider">
                    {sessionMode === 'signup' ? 'Chef Induction' : 'Chef Portal'}
                  </span>
                </h2>
              </div>
              <p className="text-xs text-stone-200 mt-0.5">
                {sessionMode === 'signup'
                  ? `Stage ${step} of 5 · Level 1 Pioneer Chef Calibration`
                  : 'Fast-track sign in to your rotational kitchen'}
              </p>
            </div>
          </div>

          {/* Gamified Live XP Counter & Mode Switcher */}
          <div className="flex items-center gap-2 self-start sm:self-center relative z-10">
            {sessionMode === 'signup' ? (
              <div className="flex items-center gap-2 bg-black/25 px-3 py-1.5 rounded-2xl border border-white/10">
                <Flame className="w-4 h-4 text-amber-300 fill-amber-300 animate-pulse" />
                <span className="text-xs font-mono font-bold text-amber-200">
                  {currentEarnedXp} XP
                </span>
                <span className="text-white/40">·</span>
                <span className="text-[11px] font-bold text-white/90">
                  Rank {tempProfile.level}
                </span>
              </div>
            ) : null}

            {/* Switch Sign Up vs Sign In */}
            <button
              type="button"
              onClick={() => {
                soundFX.playTap();
                setSessionMode(m => m === 'signup' ? 'signin' : 'signup');
              }}
              className="text-xs font-bold text-stone-200 hover:text-white bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-2xl transition-colors cursor-pointer border border-white/10"
            >
              {sessionMode === 'signup' ? 'Returning Chef? Sign In' : 'New? Sign Up Induction'}
            </button>
          </div>
        </div>

        {/* Level Progression Dots (Sign Up mode) */}
        {sessionMode === 'signup' && (
          <div className="w-full bg-stone-100 dark:bg-zinc-800 border-b border-stone-200 dark:border-zinc-700 px-6 py-2.5 flex items-center justify-between text-[11px] font-bold">
            {[
              { num: 1, label: 'Persona', icon: '👤' },
              { num: 2, label: 'Objective', icon: '🎯' },
              { num: 3, label: 'Budget', icon: '💰' },
              { num: 4, label: 'Staples', icon: '🍲' },
              { num: 5, label: 'Passport', icon: '🎖️' }
            ].map((s) => (
              <div
                key={s.num}
                onClick={() => {
                  if (s.num <= step) setStep(s.num as any);
                }}
                className={`flex items-center gap-1.5 cursor-pointer transition-colors ${
                  step === s.num
                    ? 'text-[#7A1C2C] dark:text-rose-400 font-black'
                    : step > s.num
                    ? 'text-emerald-600 dark:text-emerald-400'
                    : 'text-stone-400 dark:text-zinc-500 opacity-60'
                }`}
              >
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                  step === s.num
                    ? 'bg-[#7A1C2C] text-white'
                    : step > s.num
                    ? 'bg-emerald-500 text-white'
                    : 'bg-stone-200 dark:bg-zinc-700 text-stone-600'
                }`}>
                  {step > s.num ? '✓' : s.num}
                </span>
                <span className="hidden sm:inline">{s.label}</span>
              </div>
            ))}
          </div>
        )}

        {/* PROGRESS BAR */}
        {sessionMode === 'signup' && (
          <div className="w-full bg-stone-100 dark:bg-zinc-800 h-1.5">
            <div
              className="bg-gradient-to-r from-amber-400 via-[#2ECC71] to-[#27ae60] h-1.5 transition-all duration-300"
              style={{ width: `${(step / 5) * 100}%` }}
            />
          </div>
        )}

        {/* ========================================================================= */}
        {/* RETURNING CHEF QUICK SIGN IN SESSION                                       */}
        {/* ========================================================================= */}
        {sessionMode === 'signin' && (
          <div className="p-6 sm:p-8 space-y-6 animate-in fade-in duration-200">
            <div className="space-y-1.5 text-center">
              <div className="w-16 h-16 mx-auto rounded-3xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center text-3xl shadow-inner">
                🔑
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-stone-900 dark:text-zinc-100">
                Welcome Back, Chef!
              </h3>
              <p className="text-xs text-stone-500 dark:text-zinc-400 max-w-sm mx-auto">
                Sign in to sync your active habit streak, unlocked badges, and 28-day rotational meals.
              </p>
            </div>

            <form onSubmit={handleReturningLogin} className="space-y-4 max-w-md mx-auto">
              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-zinc-300 uppercase tracking-wider mb-1.5">
                  Chef Handle or Registered Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={loginIdentifier}
                    onChange={(e) => setLoginIdentifier(e.target.value)}
                    placeholder="e.g. Victoria John"
                    className="w-full pl-10 pr-4 py-3 rounded-2xl border border-stone-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 font-semibold text-stone-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-[#7A1C2C]/20"
                    required
                  />
                </div>
              </div>

              {/* Quick Pick Stored Profiles / Demo Chefs */}
              <div className="p-3 bg-stone-50 dark:bg-zinc-850 rounded-2xl border border-stone-200 dark:border-zinc-800 space-y-2">
                <div className="text-[10px] font-bold uppercase tracking-wider text-stone-500 dark:text-zinc-400">
                  Quick Access Profiles:
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    { name: 'Victoria John', avatar: '🧑‍🍳', role: 'Macro Strategist' },
                    { name: 'Chef Amara', avatar: '🥘', role: 'Bodija Market Hunter' },
                    { name: 'Tunde Ade', avatar: '⚡', role: 'Turbo Shredder' }
                  ].map((p) => (
                    <button
                      key={p.name}
                      type="button"
                      onClick={() => setLoginIdentifier(p.name)}
                      className="px-3 py-1.5 rounded-xl border border-stone-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:border-[#7A1C2C] text-xs font-semibold text-stone-800 dark:text-zinc-200 flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span>{p.avatar}</span>
                      <span>{p.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#2ECC71] hover:bg-[#27ae60] text-white font-black text-sm rounded-2xl shadow-lg shadow-[#2ECC71]/25 flex items-center justify-center gap-2 transition-transform active:scale-95 cursor-pointer"
              >
                <KeyRound className="w-4 h-4" />
                <span>Resume My Kitchen Streak & Load Meals 🚀</span>
              </button>
            </form>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SIGN UP / INDUCTION SESSION (5 GAMIFIED STAGES)                           */}
        {/* ========================================================================= */}
        {sessionMode === 'signup' && (
          <div className="p-6 sm:p-8 space-y-6 flex-1">

            {/* ----------------- STAGE 1: PERSONA & COUNTRY ----------------- */}
            {step === 1 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                {/* Header with clear gamified progress */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[#7A1C2C] dark:text-rose-400">
                      <span>🎮 Stage 1: Build Your Chef Character</span>
                    </span>
                    <span className="text-[11px] font-bold text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/60 px-2.5 py-0.5 rounded-full border border-amber-300/40">
                      ⚡ +50 XP Reward
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-stone-900 dark:text-zinc-100">
                    Who Is Stepping Into the Kitchen?
                  </h3>
                  <p className="text-xs text-stone-500 dark:text-zinc-400">
                    Set up your chef profile in 3 simple taps to calibrate your 28-day rotational meals.
                  </p>
                </div>

                {/* 1. INTERACTIVE LIVE CHEF ID BADGE (GAMIFIED PREVIEW) */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-[#7A1C2C]/10 via-amber-500/10 to-[#2ECC71]/10 border-2 border-stone-200 dark:border-zinc-700/80 shadow-xs flex items-center justify-between gap-3 relative overflow-hidden">
                  <div className="flex items-center gap-3.5">
                    <div className="w-14 h-14 rounded-2xl bg-white dark:bg-zinc-800 text-[#7A1C2C] dark:text-rose-400 flex items-center justify-center text-3xl shadow-md border-2 border-white dark:border-zinc-700 shrink-0 animate-pulse">
                      {selectedAvatar}
                    </div>
                    <div>
                      <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-400 dark:text-zinc-500">
                        Player Card · Level 1 Rookie Chef
                      </div>
                      <div className="text-base sm:text-lg font-black text-stone-900 dark:text-zinc-100 flex items-center gap-1.5">
                        <span>{name.trim() || 'Chef Victoria'}</span>
                        <span className="text-sm">{countryConfig.flag}</span>
                      </div>
                      <div className="text-xs text-[#7A1C2C] dark:text-rose-400 font-bold flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>{CHEF_AVATARS.find(a => a.emoji === selectedAvatar)?.title || 'Quick & Busy'}</span>
                        <span className="text-stone-400 font-normal">·</span>
                        <span className="text-stone-500 dark:text-zinc-400 font-normal text-[11px]">
                          {CHEF_AVATARS.find(a => a.emoji === selectedAvatar)?.subtitle || '15-Minute Meals'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="hidden sm:flex flex-col items-end text-right shrink-0">
                    <span className="text-[10px] uppercase font-bold text-stone-400">Active Market</span>
                    <span className="font-mono font-black text-stone-800 dark:text-zinc-200 text-xs">
                      {countryConfig.name} ({countryConfig.currency})
                    </span>
                    <span className="text-[10px] text-emerald-600 font-bold mt-0.5">🟢 Verified Hub</span>
                  </div>
                </div>

                {/* 2. STEP 1A: CHEF NAME OR FUN GENERATOR */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-black text-stone-800 dark:text-zinc-200 uppercase tracking-wider flex items-center gap-1.5">
                      <span className="w-4 h-4 rounded-full bg-[#7A1C2C] text-white flex items-center justify-center text-[10px] font-bold">1</span>
                      <span>Your Chef Alias or Name</span>
                    </label>
                    <button
                      type="button"
                      onClick={handleRandomizeName}
                      className="text-[11px] font-bold text-[#7A1C2C] dark:text-rose-400 hover:underline flex items-center gap-1 cursor-pointer bg-stone-100 dark:bg-zinc-800 px-2.5 py-1 rounded-xl border border-stone-200 dark:border-zinc-700"
                      title="Generate a playful chef handle"
                    >
                      <span>🎲 Roll Fun Chef Title</span>
                    </button>
                  </div>
                  <div className="relative">
                    <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Victoria John or Chef Vic"
                      className="w-full pl-10 pr-4 py-3 rounded-2xl border-2 border-stone-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 font-bold text-stone-900 dark:text-zinc-100 focus:outline-none focus:border-[#7A1C2C] transition-colors"
                      required
                    />
                  </div>
                </div>

                {/* 3. STEP 1B: CHOOSE YOUR COOKING STYLE */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-black text-stone-800 dark:text-zinc-200 uppercase tracking-wider flex items-center gap-1.5">
                      <span className="w-4 h-4 rounded-full bg-[#7A1C2C] text-white flex items-center justify-center text-[10px] font-bold">2</span>
                      <span>What's Your Cooking Style?</span>
                    </label>
                    <span className="text-[11px] text-stone-500 dark:text-zinc-400 font-semibold">
                      Pick the one that fits your real routine
                    </span>
                  </div>

                  {/* 1-Tap Quick Match Chips if they are not sure */}
                  <div className="p-2.5 bg-stone-100 dark:bg-zinc-850 rounded-2xl border border-stone-200/80 dark:border-zinc-800 flex flex-wrap items-center gap-1.5 text-xs">
                    <span className="text-[11px] font-bold text-stone-400 dark:text-zinc-400 pl-1">Quick match:</span>
                    <button
                      type="button"
                      onClick={() => {
                        soundFX.playTap();
                        setSelectedAvatar('⚡');
                      }}
                      className={`px-2.5 py-1 rounded-xl text-[11px] font-bold transition-all cursor-pointer ${
                        selectedAvatar === '⚡'
                          ? 'bg-[#7A1C2C] text-white shadow-xs'
                          : 'bg-white dark:bg-zinc-800 text-stone-700 dark:text-zinc-300 border border-stone-200 dark:border-zinc-700'
                      }`}
                    >
                      ⚡ Super Busy / Fast Meals
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        soundFX.playTap();
                        setSelectedAvatar('🍱');
                      }}
                      className={`px-2.5 py-1 rounded-xl text-[11px] font-bold transition-all cursor-pointer ${
                        selectedAvatar === '🍱'
                          ? 'bg-[#7A1C2C] text-white shadow-xs'
                          : 'bg-white dark:bg-zinc-800 text-stone-700 dark:text-zinc-300 border border-stone-200 dark:border-zinc-700'
                      }`}
                    >
                      🍱 Batch Cook on Sunday
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        soundFX.playTap();
                        setSelectedAvatar('💰');
                      }}
                      className={`px-2.5 py-1 rounded-xl text-[11px] font-bold transition-all cursor-pointer ${
                        selectedAvatar === '💰'
                          ? 'bg-[#7A1C2C] text-white shadow-xs'
                          : 'bg-white dark:bg-zinc-800 text-stone-700 dark:text-zinc-300 border border-stone-200 dark:border-zinc-700'
                      }`}
                    >
                      💰 Save Money at Market
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        soundFX.playTap();
                        setSelectedAvatar('💪');
                      }}
                      className={`px-2.5 py-1 rounded-xl text-[11px] font-bold transition-all cursor-pointer ${
                        selectedAvatar === '💪'
                          ? 'bg-[#7A1C2C] text-white shadow-xs'
                          : 'bg-white dark:bg-zinc-800 text-stone-700 dark:text-zinc-300 border border-stone-200 dark:border-zinc-700'
                      }`}
                    >
                      💪 Gym & High Protein
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                    {CHEF_AVATARS.map((av) => {
                      const isSelected = selectedAvatar === av.emoji;
                      return (
                        <button
                          key={av.id}
                          type="button"
                          onClick={() => {
                            soundFX.playTap();
                            setSelectedAvatar(av.emoji);
                          }}
                          className={`p-3.5 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between relative group ${
                            isSelected
                              ? 'border-[#7A1C2C] bg-[#7A1C2C]/5 dark:bg-rose-950/30 shadow-md ring-2 ring-[#7A1C2C]/20 scale-[1.01]'
                              : 'border-stone-200 dark:border-zinc-700/80 hover:border-stone-300 dark:hover:border-zinc-600 bg-white dark:bg-zinc-800'
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-2xl">{av.emoji}</span>
                              <div className="flex items-center gap-1.5">
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                                  isSelected
                                    ? 'bg-[#7A1C2C] text-white'
                                    : 'bg-stone-100 dark:bg-zinc-700 text-stone-600 dark:text-zinc-300'
                                }`}>
                                  {av.badge}
                                </span>
                                {isSelected && (
                                  <CheckCircle2 className="w-4 h-4 text-[#7A1C2C] dark:text-rose-400 shrink-0" />
                                )}
                              </div>
                            </div>
                            <div className={`text-xs font-black ${
                              isSelected ? 'text-[#7A1C2C] dark:text-rose-400' : 'text-stone-900 dark:text-zinc-100'
                            }`}>
                              {av.title}
                            </div>
                            <div className="text-[11px] font-bold text-stone-500 dark:text-zinc-400 mt-0.5">
                              {av.subtitle}
                            </div>
                            <p className="text-[11px] text-stone-600 dark:text-zinc-400 mt-1 leading-snug">
                              {av.desc}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 4. STEP 1C: CHOOSE YOUR COOKING REGION */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-black text-stone-800 dark:text-zinc-200 uppercase tracking-wider flex items-center gap-1.5">
                      <span className="w-4 h-4 rounded-full bg-[#7A1C2C] text-white flex items-center justify-center text-[10px] font-bold">3</span>
                      <span>Select Your Kitchen Country</span>
                    </label>
                    <span className="text-[11px] text-stone-400 dark:text-zinc-500 font-semibold">
                      Anchors currency & market prices
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {Object.values(COUNTRIES).map((c) => {
                      const isSelected = country === c.code;
                      return (
                        <button
                          key={c.code}
                          type="button"
                          onClick={() => {
                            soundFX.playTap();
                            setCountry(c.code);
                            if (c.code === 'NG') setBudgetAmount(90000);
                            else if (c.code === 'US') setBudgetAmount(450);
                            else if (c.code === 'UK') setBudgetAmount(350);
                            else if (c.code === 'GH') setBudgetAmount(1400);
                            else if (c.code === 'KE') setBudgetAmount(12000);
                            else if (c.code === 'CA') setBudgetAmount(550);
                          }}
                          className={`p-3 rounded-2xl border-2 text-left transition-all cursor-pointer flex items-center gap-2.5 ${
                            isSelected
                              ? 'border-[#7A1C2C] bg-[#7A1C2C]/5 dark:bg-rose-950/30 shadow-md ring-2 ring-[#7A1C2C]/20'
                              : 'border-stone-200 dark:border-zinc-700/80 hover:border-stone-300 dark:hover:border-zinc-600 bg-white dark:bg-zinc-800'
                          }`}
                        >
                          <span className="text-2xl shrink-0">{c.flag}</span>
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-extrabold text-stone-900 dark:text-zinc-100 truncate">
                              {c.name}
                            </div>
                            <div className="text-[10px] font-mono text-stone-500 dark:text-zinc-400">
                              {c.currency} ({c.currencySymbol})
                            </div>
                          </div>
                          {isSelected && (
                            <CheckCircle2 className="w-4 h-4 text-[#7A1C2C] dark:text-rose-400 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Sourcing market hint note */}
                <div className="p-3 bg-stone-50 dark:bg-zinc-850 rounded-2xl border border-stone-200 dark:border-zinc-800 text-xs text-stone-600 dark:text-zinc-300 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-[#7A1C2C] dark:text-rose-400 shrink-0" />
                    <span>
                      Live Prices Sourced From: <strong>{countryConfig.defaultMarkets.slice(0, 3).join(', ')}</strong>
                    </span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                    Ready
                  </span>
                </div>
              </div>
            )}

            {/* ----------------- STAGE 2: SUPERPOWER GOAL & BIOMETRICS ----------------- */}
            {step === 2 && (
              <div className="space-y-5 animate-in fade-in duration-200">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black uppercase tracking-wider text-[#7A1C2C] dark:text-rose-400">
                      Stage 2 · Caloric Blueprint
                    </span>
                    <span className="text-[10px] font-bold text-amber-700 dark:text-amber-400 bg-amber-100 dark:bg-amber-950/60 px-2 py-0.5 rounded-full">
                      +50 Blueprint XP
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-stone-900 dark:text-zinc-100">
                    Choose Your Nutrition Superpower
                  </h3>
                  <p className="text-xs text-stone-500 dark:text-zinc-400">
                    We adapt Mifflin-St Jeor formulas to fuel your body with zero artificial crash diets.
                  </p>
                </div>

                {/* 3 Gamified Goal Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* 1. Fat Shredder */}
                  <button
                    type="button"
                    onClick={() => {
                      soundFX.playTap();
                      setGoal('lose_weight');
                    }}
                    className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between cursor-pointer ${
                      goal === 'lose_weight'
                        ? 'border-[#7A1C2C] bg-[#7A1C2C]/5 dark:bg-rose-950/30 shadow-md ring-2 ring-[#7A1C2C]/30'
                        : 'border-stone-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:border-stone-300'
                    }`}
                  >
                    <div className="space-y-1.5">
                      <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold">
                        <TrendingDown className="w-5 h-5" />
                      </div>
                      <div className="font-extrabold text-stone-900 dark:text-zinc-100 text-sm flex items-center gap-1">
                        <span>Fat Shredder</span>
                        <span className="text-[10px] text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded">-20% Cut</span>
                      </div>
                      <p className="text-[11px] text-stone-600 dark:text-zinc-400 leading-snug">
                        High protein floor (2.1g/kg) protects muscle tone while burning fat steadily.
                      </p>
                    </div>
                    {goal === 'lose_weight' && (
                      <div className="mt-3 flex items-center gap-1 text-[11px] font-bold text-[#7A1C2C] dark:text-rose-400">
                        <Check className="w-3.5 h-3.5" /> Superpower Active
                      </div>
                    )}
                  </button>

                  {/* 2. Zen Equilibrium */}
                  <button
                    type="button"
                    onClick={() => {
                      soundFX.playTap();
                      setGoal('maintain');
                    }}
                    className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between cursor-pointer ${
                      goal === 'maintain'
                        ? 'border-[#7A1C2C] bg-[#7A1C2C]/5 dark:bg-rose-950/30 shadow-md ring-2 ring-[#7A1C2C]/30'
                        : 'border-stone-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:border-stone-300'
                    }`}
                  >
                    <div className="space-y-1.5">
                      <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                        <Scale className="w-5 h-5" />
                      </div>
                      <div className="font-extrabold text-stone-900 dark:text-zinc-100 text-sm flex items-center gap-1">
                        <span>Zen Balance</span>
                        <span className="text-[10px] text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">100% TDEE</span>
                      </div>
                      <p className="text-[11px] text-stone-600 dark:text-zinc-400 leading-snug">
                        Caloric harmony for stable daily stamina, metabolic longevity, and zero energy crashes.
                      </p>
                    </div>
                    {goal === 'maintain' && (
                      <div className="mt-3 flex items-center gap-1 text-[11px] font-bold text-[#7A1C2C] dark:text-rose-400">
                        <Check className="w-3.5 h-3.5" /> Superpower Active
                      </div>
                    )}
                  </button>

                  {/* 3. Titan Muscle Forge */}
                  <button
                    type="button"
                    onClick={() => {
                      soundFX.playTap();
                      setGoal('gain_muscle');
                    }}
                    className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between cursor-pointer ${
                      goal === 'gain_muscle'
                        ? 'border-[#7A1C2C] bg-[#7A1C2C]/5 dark:bg-rose-950/30 shadow-md ring-2 ring-[#7A1C2C]/30'
                        : 'border-stone-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:border-stone-300'
                    }`}
                  >
                    <div className="space-y-1.5">
                      <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                        <TrendingUp className="w-5 h-5" />
                      </div>
                      <div className="font-extrabold text-stone-900 dark:text-zinc-100 text-sm flex items-center gap-1">
                        <span>Muscle Titan</span>
                        <span className="text-[10px] text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">+10% Bulk</span>
                      </div>
                      <p className="text-[11px] text-stone-600 dark:text-zinc-400 leading-snug">
                        Clean surplus with rich indigenous carbs and amino acids for muscular strength.
                      </p>
                    </div>
                    {goal === 'gain_muscle' && (
                      <div className="mt-3 flex items-center gap-1 text-[11px] font-bold text-[#7A1C2C] dark:text-rose-400">
                        <Check className="w-3.5 h-3.5" /> Superpower Active
                      </div>
                    )}
                  </button>
                </div>

                {/* Biometrics Input Grid */}
                <div className="p-4 bg-stone-50 dark:bg-zinc-850 rounded-2xl border border-stone-200 dark:border-zinc-800 space-y-3">
                  <div className="text-xs font-bold text-stone-700 dark:text-zinc-300 uppercase tracking-wider">
                    Biometric Dials:
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    <div>
                      <label className="block text-stone-500 dark:text-zinc-400 font-semibold mb-1">Sex</label>
                      <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value as any)}
                        className="w-full p-2 rounded-xl border border-stone-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 font-medium text-stone-900 dark:text-zinc-100"
                      >
                        <option value="female">Female</option>
                        <option value="male">Male</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-stone-500 dark:text-zinc-400 font-semibold mb-1">Age</label>
                      <input
                        type="number"
                        value={age}
                        onChange={(e) => setAge(Number(e.target.value))}
                        className="w-full p-2 rounded-xl border border-stone-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 font-mono font-medium text-stone-900 dark:text-zinc-100"
                        min="15"
                        max="100"
                      />
                    </div>

                    <div>
                      <label className="block text-stone-500 dark:text-zinc-400 font-semibold mb-1">Weight (kg)</label>
                      <input
                        type="number"
                        value={weightKg}
                        onChange={(e) => setWeightKg(Number(e.target.value))}
                        className="w-full p-2 rounded-xl border border-stone-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 font-mono font-medium text-stone-900 dark:text-zinc-100"
                        min="30"
                        max="200"
                      />
                    </div>

                    <div>
                      <label className="block text-stone-500 dark:text-zinc-400 font-semibold mb-1">Height (cm)</label>
                      <input
                        type="number"
                        value={heightCm}
                        onChange={(e) => setHeightCm(Number(e.target.value))}
                        className="w-full p-2 rounded-xl border border-stone-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 font-mono font-medium text-stone-900 dark:text-zinc-100"
                        min="120"
                        max="230"
                      />
                    </div>
                  </div>
                </div>

                {/* Live Macro preview */}
                <div className="p-3 bg-stone-100 dark:bg-zinc-800 rounded-2xl flex items-center justify-around text-center text-xs">
                  <div>
                    <span className="text-[10px] text-stone-500 dark:text-zinc-400 font-bold uppercase">Daily Energy</span>
                    <div className="font-extrabold text-stone-900 dark:text-zinc-100 font-mono text-sm">{macros.targetCalories} kcal</div>
                  </div>
                  <div className="w-px h-6 bg-stone-300 dark:bg-zinc-700" />
                  <div>
                    <span className="text-[10px] text-[#7A1C2C] dark:text-rose-400 font-bold uppercase">Target Protein</span>
                    <div className="font-extrabold text-[#7A1C2C] dark:text-rose-400 font-mono text-sm">{macros.proteinGrams}g</div>
                  </div>
                  <div className="w-px h-6 bg-stone-300 dark:bg-zinc-700" />
                  <div>
                    <span className="text-[10px] text-stone-500 dark:text-zinc-400 font-bold uppercase">Clean Carbs</span>
                    <div className="font-extrabold text-stone-900 dark:text-zinc-100 font-mono text-sm">{macros.carbsGrams}g</div>
                  </div>
                </div>
              </div>
            )}

            {/* ----------------- STAGE 3: FOOD BUDGET & SOLVENCY ----------------- */}
            {step === 3 && (
              <div className="space-y-5 animate-in fade-in duration-200">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black uppercase tracking-wider text-[#7A1C2C] dark:text-rose-400">
                      Stage 3 · Market Coin Master
                    </span>
                    <span className="text-[10px] font-bold text-amber-700 dark:text-amber-400 bg-amber-100 dark:bg-amber-950/60 px-2 py-0.5 rounded-full">
                      +50 Solvency XP
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-stone-900 dark:text-zinc-100">
                    Calibrate Your Food Wallet
                  </h3>
                  <p className="text-xs text-stone-500 dark:text-zinc-400">
                    CleverDish calculates prices from open stalls like Mile 12 & Bodija so you eat healthy without overspending.
                  </p>
                </div>

                {/* Cadence Selector */}
                <div className="flex p-1 bg-stone-100 dark:bg-zinc-800 rounded-2xl border border-stone-200 dark:border-zinc-700">
                  {(['day', 'week', 'month'] as const).map((period) => (
                    <button
                      key={period}
                      type="button"
                      onClick={() => {
                        soundFX.playTap();
                        setBudgetPeriod(period);
                        if (period === 'day') setBudgetAmount(Math.round(tempProfile.monthlyBudget / 30));
                        else if (period === 'week') setBudgetAmount(Math.round((tempProfile.monthlyBudget / 30) * 7));
                        else setBudgetAmount(tempProfile.monthlyBudget);
                      }}
                      className={`flex-1 py-2 text-xs font-bold capitalize rounded-xl transition-all cursor-pointer ${
                        budgetPeriod === period
                          ? 'bg-white dark:bg-zinc-700 text-stone-900 dark:text-zinc-100 shadow-xs'
                          : 'text-stone-500 dark:text-zinc-400 hover:text-stone-900'
                      }`}
                    >
                      Per {period}
                    </button>
                  ))}
                </div>

                {/* Budget Input & Presets */}
                <div className="space-y-3">
                  <label className="block text-xs font-bold text-stone-700 dark:text-zinc-300 uppercase tracking-wider">
                    Spending Cap in {countryConfig.name} ({countryConfig.currencySymbol})
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-stone-500 text-lg">
                      {countryConfig.currencySymbol}
                    </span>
                    <input
                      type="number"
                      value={budgetAmount}
                      onChange={(e) => setBudgetAmount(Math.max(1, Number(e.target.value)))}
                      className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-stone-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 font-mono text-xl font-black text-stone-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-[#7A1C2C]/20"
                    />
                  </div>

                  {/* Preset chips */}
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="text-stone-400 font-medium py-1">Quick Select:</span>
                    {(country === 'NG'
                      ? [60000, 90000, 120000, 150000]
                      : [300, 450, 600, 800]
                    ).map((val) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => {
                          soundFX.playTap();
                          setBudgetAmount(val);
                        }}
                        className={`px-3 py-1 rounded-xl border text-xs font-mono font-semibold transition-colors cursor-pointer ${
                          budgetAmount === val
                            ? 'bg-[#7A1C2C] text-white border-[#7A1C2C]'
                            : 'bg-stone-50 dark:bg-zinc-800 border-stone-200 dark:border-zinc-700 text-stone-700 dark:text-zinc-300'
                        }`}
                      >
                        {countryConfig.currencySymbol}{val.toLocaleString()}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Live Solvency Verdict */}
                <div
                  className={`p-4 rounded-2xl border text-xs space-y-2 ${
                    verdict.isDeficit
                      ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800 text-amber-950 dark:text-amber-200'
                      : 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-950 dark:text-emerald-200'
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold text-sm">
                    <ShieldCheck className={`w-4 h-4 ${verdict.isDeficit ? 'text-amber-600' : 'text-[#2ECC71]'}`} />
                    <span>Budget Solvency Verification:</span>
                  </div>
                  <p className="leading-relaxed">{verdict.message}</p>
                  <div className="pt-2 border-t border-black/10 dark:border-white/10 flex items-center justify-between text-[11px] font-mono">
                    <span>Daily Spend Cap: <strong>{countryConfig.currencySymbol}{verdict.dailyAllowance.toLocaleString()}/day</strong></span>
                    <span>Safety Floor: <strong>{countryConfig.currencySymbol}{verdict.minimumDailyFloor.toLocaleString()}/day</strong></span>
                  </div>
                </div>
              </div>
            )}

            {/* ----------------- STAGE 4: GLOCAL STAPLES & STARTER CRATE ----------------- */}
            {step === 4 && (
              <div className="space-y-5 animate-in fade-in duration-200">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black uppercase tracking-wider text-[#7A1C2C] dark:text-rose-400">
                      Stage 4 · Glocal Staples & Starter Loot
                    </span>
                    <span className="text-[10px] font-bold text-amber-700 dark:text-amber-400 bg-amber-100 dark:bg-amber-950/60 px-2 py-0.5 rounded-full">
                      +50 Staples XP
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-stone-900 dark:text-zinc-100">
                    Choose Your Core Staples & Claim Loot
                  </h3>
                  <p className="text-xs text-stone-500 dark:text-zinc-400">
                    Select the foundational foods you love, then open your starter welcome crate!
                  </p>
                </div>

                <div className="space-y-2.5">
                  {[
                    {
                      id: 'indigenous',
                      title: '🇳🇬 Indigenous Farm Staples',
                      desc: 'Garri, Yam, Plantain, Beans, Fish, Egusi. Farm-fresh micronutrients and best local pricing.',
                      tag: 'High Value & Abundant'
                    },
                    {
                      id: 'continental',
                      title: '🌾 Continental Lean Staples',
                      desc: 'Oats, Pasta, Sweet Potatoes, Quinoa, Chicken Breast. Clean western meal prep.',
                      tag: 'Modern / Lean'
                    },
                    {
                      id: 'balanced',
                      title: '⚖️ Balanced Glocal Fusion (Recommended)',
                      desc: 'Smart alternation: light morning oatmeal & eggs paired with hearty afternoon/evening local plates.',
                      tag: 'Most Popular'
                    }
                  ].map((s) => (
                    <div
                      key={s.id}
                      onClick={() => {
                        soundFX.playTap();
                        setStaplePreference(s.id as any);
                      }}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                        staplePreference === s.id
                          ? 'border-[#7A1C2C] bg-[#7A1C2C]/5 dark:bg-rose-950/30 shadow-sm ring-2 ring-[#7A1C2C]/30'
                          : 'border-stone-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:border-stone-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs sm:text-sm text-stone-900 dark:text-zinc-100">{s.title}</span>
                        <span className="text-[10px] font-bold bg-stone-100 dark:bg-zinc-700 text-stone-700 dark:text-zinc-300 px-2 py-0.5 rounded-md">
                          {s.tag}
                        </span>
                      </div>
                      <p className="text-xs text-stone-600 dark:text-zinc-400 mt-1">{s.desc}</p>
                    </div>
                  ))}
                </div>

                {/* INTERACTIVE STARTER LOOT CRATE */}
                <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-amber-500/15 via-amber-400/10 to-amber-500/15 border-2 border-amber-400/60 text-stone-900 dark:text-zinc-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <button
                      type="button"
                      onClick={handleOpenStarterCrate}
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-lg transition-transform active:scale-95 cursor-pointer ${
                        isCrateOpened
                          ? 'bg-amber-400 text-stone-950 ring-4 ring-amber-300/40 animate-pulse'
                          : 'bg-gradient-to-tr from-amber-500 to-amber-400 text-stone-950 animate-bounce'
                      }`}
                      title="Click to Open Welcome Crate"
                    >
                      {isCrateOpened ? '🎉' : '🎁'}
                    </button>
                    <div>
                      <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                        {isCrateOpened ? 'Welcome Bonus Unlocked!' : 'Bonus Starter Crate Available'}
                      </div>
                      <h4 className="font-extrabold text-sm sm:text-base text-stone-900 dark:text-zinc-100">
                        {isCrateOpened ? '150 Clever Coins + Pioneer Badge' : 'Tap the Crate to Claim Starter Gear'}
                      </h4>
                      <p className="text-xs text-stone-600 dark:text-zinc-400 mt-0.5">
                        {isCrateOpened
                          ? '🔥 Day 1 Streak activated + 84 meals loaded in rotation'
                          : 'Free starter loot for joining the CleverDish kitchen today'}
                      </p>
                    </div>
                  </div>

                  {!isCrateOpened && (
                    <button
                      type="button"
                      onClick={handleOpenStarterCrate}
                      className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs rounded-xl shadow-md cursor-pointer transition-transform active:scale-95 flex items-center justify-center gap-1.5"
                    >
                      <Gift className="w-3.5 h-3.5" />
                      <span>Claim Free Crate</span>
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* ----------------- STAGE 5: CLEVERDISH PASSPORT REVEAL ----------------- */}
            {step === 5 && (
              <div className="space-y-5 animate-in zoom-in-95 duration-300 text-center">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-[#2ECC71] font-bold text-xs border border-emerald-200 dark:border-emerald-800">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Kitchen Induction Complete!</span>
                  </div>
                  <h3 className="text-2xl font-black text-stone-900 dark:text-zinc-100">
                    Your CleverDish Passport is Ready!
                  </h3>
                  <p className="text-xs text-stone-500 dark:text-zinc-400 max-w-sm mx-auto">
                    You are officially certified as a Level 1 Pioneer Chef in {countryConfig.name}.
                  </p>
                </div>

                {/* VIP KITCHEN PASSPORT CARD */}
                <div className="max-w-md mx-auto p-6 rounded-3xl bg-gradient-to-br from-[#7A1C2C] via-[#631623] to-[#450e18] text-white shadow-2xl border-2 border-amber-300/40 relative overflow-hidden text-left">
                  <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-36 h-36 rounded-full bg-white/5 pointer-events-none" />
                  
                  <div className="flex items-center justify-between pb-4 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">🍲</span>
                      <span className="font-black text-sm tracking-wider uppercase text-amber-300">
                        CleverDish Passport
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-white/70 bg-white/10 px-2 py-0.5 rounded-full">
                      ID: {tempProfile.id.slice(-6).toUpperCase()}
                    </span>
                  </div>

                  <div className="py-4 flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-white dark:bg-zinc-800 text-[#7A1C2C] flex items-center justify-center text-3xl shadow-lg ring-2 ring-amber-300/50 shrink-0">
                      {selectedAvatar}
                    </div>
                    <div>
                      <div className="text-lg font-black text-white">{tempProfile.name}</div>
                      <div className="text-xs text-amber-200 flex items-center gap-1.5 mt-0.5">
                        <Award className="w-3.5 h-3.5" />
                        <span>{tempProfile.kitchenTitle}</span>
                        <span>·</span>
                        <span>{countryConfig.flag} {countryConfig.name}</span>
                      </div>
                      <div className="text-[11px] text-white/70 font-mono mt-1">
                        Target: {macros.targetCalories} kcal · {macros.proteinGrams}g Protein
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/10 grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="bg-white/10 rounded-xl p-2">
                      <div className="text-[10px] text-white/70 uppercase">Streak</div>
                      <div className="font-black text-amber-300 font-mono text-sm">🔥 Day 1</div>
                    </div>
                    <div className="bg-white/10 rounded-xl p-2">
                      <div className="text-[10px] text-white/70 uppercase">Coins</div>
                      <div className="font-black text-amber-300 font-mono text-sm">💰 150</div>
                    </div>
                    <div className="bg-white/10 rounded-xl p-2">
                      <div className="text-[10px] text-white/70 uppercase">Rank</div>
                      <div className="font-black text-amber-300 font-mono text-sm">Level 1</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* FOOTER ACTIONS (Sign Up mode) */}
        {sessionMode === 'signup' && (
          <div className="p-5 sm:p-6 bg-stone-50 dark:bg-zinc-850 border-t border-stone-200 dark:border-zinc-800 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => {
                  soundFX.playTap();
                  setStep((s) => (s - 1) as any);
                }}
                className="px-4 py-2.5 text-xs font-bold text-stone-600 dark:text-zinc-400 hover:text-stone-900 cursor-pointer"
              >
                Back
              </button>
            ) : (
              <div />
            )}

            <button
              type="button"
              onClick={handleNextStep}
              className="px-6 py-3.5 bg-[#2ECC71] hover:bg-[#27ae60] text-white font-black text-xs sm:text-sm rounded-2xl shadow-lg shadow-[#2ECC71]/25 flex items-center gap-2 transition-transform active:scale-95 cursor-pointer group"
            >
              {step < 5 ? (
                <>
                  <span>Continue to Stage {step + 1}</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </>
              ) : (
                <>
                  <Utensils className="w-4 h-4" />
                  <span>Enter Kitchen & Reveal Today's 3 Plates 🍽️</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
