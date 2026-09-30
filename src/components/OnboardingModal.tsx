import React, { useState } from 'react';
import { UserProfile, CountryCode, FitnessGoal, StaplePreference } from '../types';
import { COUNTRIES } from '../data/countries';
import { calculateMacros, computeBudgetVerdict } from '../utils/nutrition';
import {
  Globe,
  Activity,
  DollarSign,
  Scale,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  X
} from 'lucide-react';
import { soundFX } from '../utils/sound';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveProfile: (profile: UserProfile) => void;
  initialProfile?: UserProfile;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onClose,
  onSaveProfile,
  initialProfile
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form State
  const [country, setCountry] = useState<CountryCode>(initialProfile?.country || 'NG');
  const [name, setName] = useState(initialProfile?.name || 'Victoria');
  const [age, setAge] = useState(initialProfile?.age || 26);
  const [gender, setGender] = useState<'male' | 'female'>(initialProfile?.gender || 'female');
  const [weightKg, setWeightKg] = useState(initialProfile?.weightKg || 65);
  const [heightCm, setHeightCm] = useState(initialProfile?.heightCm || 168);
  const [activityLevel, setActivityLevel] = useState<UserProfile['activityLevel']>(initialProfile?.activityLevel || 1.375);
  const [goal, setGoal] = useState<FitnessGoal>(initialProfile?.goal || 'lose_weight');
  const [staplePreference, setStaplePreference] = useState<StaplePreference>(initialProfile?.staplePreference || 'indigenous');
  const [budgetPeriod, setBudgetPeriod] = useState<'day' | 'week' | 'month'>(initialProfile?.budgetPeriod || 'month');
  const [budgetAmount, setBudgetAmount] = useState<number>(initialProfile?.budgetAmount || 90000);

  if (!isOpen) return null;

  const currentCountryConfig = COUNTRIES[country] || COUNTRIES.NG;

  // Compute live preview of macros and budget verdict
  const previewProfile: UserProfile = {
    id: initialProfile?.id || 'usr_1',
    name,
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
    isPro: initialProfile?.isPro || false,
    travelModeActive: initialProfile?.travelModeActive || false,
    homeCountry: initialProfile?.homeCountry || country,
    currentCountry: country,
    streak: initialProfile?.streak || 3,
    lastLoggedDate: initialProfile?.lastLoggedDate || null,
    foodiePoints: initialProfile?.foodiePoints || 150
  };

  const macros = calculateMacros(previewProfile);
  const verdict = computeBudgetVerdict(previewProfile);

  const handleFinish = () => {
    soundFX.playStreakCelebration();
    onSaveProfile(previewProfile);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Deep Maroon Brand Banner */}
        <div className="bg-[#7A1C2C] text-white px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-2xl select-none">🥗</span>
            <div>
              <h3 className="font-extrabold text-base tracking-tight">CleverDish Setup Engine</h3>
              <p className="text-xs text-white/80">Biometrics, Mifflin-St Jeor & Budget Verdict</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg text-white/80 hover:text-white hover:bg-white/10 flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progression Bar */}
        <div className="bg-stone-100 px-6 py-2 border-b border-stone-200 flex items-center justify-between text-xs font-semibold text-stone-600">
          <span className={step >= 1 ? 'text-[#7A1C2C] font-bold' : ''}>1. Country</span>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
          <span className={step >= 2 ? 'text-[#7A1C2C] font-bold' : ''}>2. Biometrics & Goal</span>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
          <span className={step >= 3 ? 'text-[#7A1C2C] font-bold' : ''}>3. Glocal Staples</span>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
          <span className={step >= 4 ? 'text-[#7A1C2C] font-bold' : ''}>4. Budget Verdict</span>
        </div>

        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* STEP 1: Country-First Selection */}
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div>
                <h4 className="font-bold text-stone-900 text-base">Select Your Active Country</h4>
                <p className="text-xs text-stone-500 mt-0.5">
                  Filters local markets, staple metrics, open-market pricing, and currency parameters.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {Object.values(COUNTRIES).map((c) => (
                  <button
                    key={c.code}
                    type="button"
                    onClick={() => {
                      setCountry(c.code);
                      // Adjust default budget scale for that currency
                      if (c.code === 'NG') setBudgetAmount(90000);
                      else if (c.code === 'US') setBudgetAmount(450);
                      else if (c.code === 'UK') setBudgetAmount(350);
                      else if (c.code === 'GH') setBudgetAmount(1400);
                      else if (c.code === 'KE') setBudgetAmount(12000);
                      else if (c.code === 'CA') setBudgetAmount(550);
                    }}
                    className={`p-3.5 rounded-2xl border text-left transition-all ${
                      country === c.code
                        ? 'border-[#7A1C2C] bg-[#7A1C2C]/5 shadow-sm font-bold text-[#7A1C2C]'
                        : 'border-stone-200 hover:border-stone-300 text-stone-700 bg-white'
                    }`}
                  >
                    <div className="text-2xl mb-1">{c.flag}</div>
                    <div className="text-xs font-bold text-stone-900">{c.name}</div>
                    <div className="text-[11px] text-stone-500 font-mono mt-0.5">
                      {c.currency} ({c.currencySymbol})
                    </div>
                  </button>
                ))}
              </div>

              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-600 flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#7A1C2C] shrink-0" />
                <span>
                  Active Markets: <strong>{currentCountryConfig.defaultMarkets.join(', ')}</strong>
                </span>
              </div>
            </div>
          )}

          {/* STEP 2: Biometrics & Goal Setup */}
          {step === 2 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div>
                <h4 className="font-bold text-stone-900 text-base">Biometrics & Mifflin-St Jeor Parameters</h4>
                <p className="text-xs text-stone-500 mt-0.5">
                  Calculates exact basal metabolic rate, activity expenditure, and protein floors.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <label className="block text-stone-600 font-semibold mb-1">Gender</label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl border border-stone-300 bg-white"
                  >
                    <option value="female">Female (-161 BMR)</option>
                    <option value="male">Male (+5 BMR)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-stone-600 font-semibold mb-1">Age (Years)</label>
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                    min="15"
                    max="100"
                    className="w-full p-2.5 rounded-xl border border-stone-300 bg-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-stone-600 font-semibold mb-1">Weight (kg)</label>
                  <input
                    type="number"
                    value={weightKg}
                    onChange={(e) => setWeightKg(Number(e.target.value))}
                    min="30"
                    max="220"
                    className="w-full p-2.5 rounded-xl border border-stone-300 bg-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-stone-600 font-semibold mb-1">Height (cm)</label>
                  <input
                    type="number"
                    value={heightCm}
                    onChange={(e) => setHeightCm(Number(e.target.value))}
                    min="120"
                    max="240"
                    className="w-full p-2.5 rounded-xl border border-stone-300 bg-white font-mono"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-stone-600 font-semibold mb-1">Activity Level</label>
                  <select
                    value={activityLevel}
                    onChange={(e) => setActivityLevel(Number(e.target.value) as any)}
                    className="w-full p-2.5 rounded-xl border border-stone-300 bg-white"
                  >
                    <option value={1.2}>Sedentary (Desk work, minimal exercise · 1.2x)</option>
                    <option value={1.375}>Lightly Active (1-3 gym/walk sessions/wk · 1.375x)</option>
                    <option value={1.55}>Moderately Active (3-5 vigorous workouts/wk · 1.55x)</option>
                    <option value={1.725}>Very Active (6-7 intense sessions/wk · 1.725x)</option>
                    <option value={1.9}>Extra Active (Athlete / physical labor · 1.9x)</option>
                  </select>
                </div>
              </div>

              {/* Core Objective */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">
                  Core Objective:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {[
                    { key: 'lose_weight', label: 'Lose Weight', desc: '-20% Caloric Cut (High Protein)' },
                    { key: 'maintain', label: 'Maintain Health', desc: '100% TDEE Balance' },
                    { key: 'gain_muscle', label: 'Gain Muscle', desc: '+10% Clean Caloric Surplus' }
                  ].map((g) => (
                    <button
                      key={g.key}
                      type="button"
                      onClick={() => setGoal(g.key as any)}
                      className={`p-3 rounded-xl border text-left text-xs transition-all ${
                        goal === g.key
                          ? 'border-[#7A1C2C] bg-[#7A1C2C]/5 font-bold text-[#7A1C2C]'
                          : 'border-stone-200 text-stone-700 bg-white'
                      }`}
                    >
                      <div className="font-bold">{g.label}</div>
                      <div className="text-[10px] text-stone-500 mt-0.5">{g.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Computed Macro preview */}
              <div className="p-3 bg-stone-50 border border-stone-200/90 rounded-2xl flex items-center justify-around text-center text-xs">
                <div>
                  <div className="text-[10px] text-stone-500 uppercase font-bold">Target Calories</div>
                  <div className="text-base font-extrabold text-[#7A1C2C] font-mono">{macros.targetCalories} kcal</div>
                </div>
                <div className="w-px h-6 bg-stone-200" />
                <div>
                  <div className="text-[10px] text-stone-500 uppercase font-bold">Protein Floor</div>
                  <div className="text-base font-extrabold text-stone-900 font-mono">{macros.proteinGrams}g</div>
                </div>
                <div className="w-px h-6 bg-stone-200" />
                <div>
                  <div className="text-[10px] text-stone-500 uppercase font-bold">Carbs</div>
                  <div className="text-base font-extrabold text-stone-900 font-mono">{macros.carbsGrams}g</div>
                </div>
                <div className="w-px h-6 bg-stone-200" />
                <div>
                  <div className="text-[10px] text-stone-500 uppercase font-bold">Healthy Fats</div>
                  <div className="text-base font-extrabold text-stone-900 font-mono">{macros.fatGrams}g</div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Glocal Toggle */}
          {step === 3 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div>
                <h4 className="font-bold text-stone-900 text-base">Glocal Staple Preference</h4>
                <p className="text-xs text-stone-500 mt-0.5">
                  Decide whether your 28-day plan prioritizes indigenous roots or continental grains.
                </p>
              </div>

              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => setStaplePreference('indigenous')}
                  className={`w-full p-4 rounded-2xl border text-left transition-all ${
                    staplePreference === 'indigenous'
                      ? 'border-[#7A1C2C] bg-[#7A1C2C]/5 shadow-sm'
                      : 'border-stone-200 bg-white hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-[#7A1C2C]">🇳🇬 Indigenous Staples First</span>
                    <span className="text-xs bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded-md">
                      Best Value
                    </span>
                  </div>
                  <p className="text-xs text-stone-600 mt-1">
                    Garri (Ijebu), White Yam, Semi-Ripe Plantain, Honey Beans (Oloyin), Brown Rice, Egusi, Titus & Catfish.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setStaplePreference('continental')}
                  className={`w-full p-4 rounded-2xl border text-left transition-all ${
                    staplePreference === 'continental'
                      ? 'border-[#7A1C2C] bg-[#7A1C2C]/5 shadow-sm'
                      : 'border-stone-200 bg-white hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-[#7A1C2C]">🌾 Western / Continental Staples</span>
                    <span className="text-xs bg-stone-100 text-stone-700 font-bold px-2 py-0.5 rounded-md">
                      Imported & Modern
                    </span>
                  </div>
                  <p className="text-xs text-stone-600 mt-1">
                    Rolled Oats, Whole Wheat Pasta, Russet Potatoes, Quinoa, Greek Yogurt, Chicken Breast, Salmon.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setStaplePreference('balanced')}
                  className={`w-full p-4 rounded-2xl border text-left transition-all ${
                    staplePreference === 'balanced'
                      ? 'border-[#7A1C2C] bg-[#7A1C2C]/5 shadow-sm'
                      : 'border-stone-200 bg-white hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-[#7A1C2C]">⚖️ Balanced Glocal Fusion</span>
                    <span className="text-xs bg-emerald-100 text-emerald-900 font-bold px-2 py-0.5 rounded-md">
                      Recommended
                    </span>
                  </div>
                  <p className="text-xs text-stone-600 mt-1">
                    Alternating daily rotation: Continental breakfasts (oats, eggs) paired with hearty indigenous afternoon dinners.
                  </p>
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Flexible Budget Tiers & Mathematical Verdict */}
          {step === 4 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div>
                <h4 className="font-bold text-stone-900 text-base">Flexible Spending Goals & Verdict</h4>
                <p className="text-xs text-stone-500 mt-0.5">
                  Input your budget per day, week, or month to compute your regional monthly baseline.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-stone-600 font-semibold mb-1">Budget Cadence</label>
                  <div className="flex rounded-xl bg-stone-100 p-1 border border-stone-200">
                    {(['day', 'week', 'month'] as const).map((period) => (
                      <button
                        key={period}
                        type="button"
                        onClick={() => setBudgetPeriod(period)}
                        className={`flex-1 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${
                          budgetPeriod === period ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500'
                        }`}
                      >
                        {period}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-stone-600 font-semibold mb-1">
                    Spending Goal ({currentCountryConfig.currencySymbol})
                  </label>
                  <input
                    type="number"
                    value={budgetAmount}
                    onChange={(e) => setBudgetAmount(Number(e.target.value))}
                    min="1"
                    className="w-full p-2.5 rounded-xl border border-stone-300 bg-white font-mono text-sm font-bold text-stone-900"
                  />
                </div>
              </div>

              {/* MATHEMATICAL BUDGET VERDICT CARD */}
              <div
                className={`p-4 rounded-2xl border text-xs space-y-2 ${
                  verdict.isDeficit
                    ? 'bg-amber-50/80 border-amber-300 text-amber-950'
                    : 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-sm">
                  {verdict.isDeficit ? (
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                  ) : (
                    <CheckCircle2 className="w-4 h-4 text-[#2ECC71] shrink-0" />
                  )}
                  <span>Mathematical Budget Verdict</span>
                </div>

                <p className="leading-relaxed">{verdict.message}</p>

                <div className="pt-2 border-t border-black/10 space-y-1">
                  <div className="font-bold">Automated Solvency Guidelines:</div>
                  {verdict.recommendations.map((rec, i) => (
                    <div key={i} className="flex items-start gap-1.5 text-[11px]">
                      <span className="text-[#7A1C2C]">•</span>
                      <span>{rec}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation Buttons */}
        <div className="px-6 py-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between shrink-0">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep((s) => (s - 1) as any)}
              className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900"
            >
              Back
            </button>
          ) : (
            <div />
          )}

          {step < 4 ? (
            <button
              type="button"
              onClick={() => {
                soundFX.playTap();
                setStep((s) => (s + 1) as any);
              }}
              className="px-5 py-2.5 bg-[#7A1C2C] hover:bg-[#631623] text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-sm transition-transform active:scale-95"
            >
              <span>Continue</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleFinish}
              className="px-6 py-2.5 bg-[#2ECC71] hover:bg-[#27ae60] text-white font-extrabold text-xs rounded-xl shadow-md shadow-[#2ECC71]/25 flex items-center gap-1.5 transition-transform active:scale-95"
            >
              <span>Lock In Plan & Start Day 1</span>
              <Sparkles className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
