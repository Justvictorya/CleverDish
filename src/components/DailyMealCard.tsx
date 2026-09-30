import React, { useState, useRef } from 'react';
import { Meal, UserProfile } from '../types';
import { COUNTRIES } from '../data/countries';
import { MealVisualizer } from './MealVisualizer';
import {
  Flame,
  Camera,
  RefreshCw,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Clock,
  Sparkles,
  Lock,
  CheckCircle2,
  ChefHat,
  ShoppingBag,
  Store,
  Bookmark,
  Upload,
  Zap,
  X,
  Maximize2,
  Share2,
  Hand,
  Snowflake,
  Refrigerator,
  Utensils
} from 'lucide-react';
import { soundFX } from '../utils/sound';
import { fireMealStreakConfetti } from '../utils/confetti';
import { shareMealToWhatsApp } from '../utils/whatsappShare';

interface DailyMealCardProps {
  meal: Meal;
  profile: UserProfile;
  isFavorite?: boolean;
  onToggleFavorite?: (meal: Meal) => void;
  onOpenPhotoLock: (meal: Meal) => void;
  onDirectPhotoVerified?: (mealId: string, photoUrl: string) => void;
  onOpenInflationSwap: (meal: Meal) => void;
  onOpenFridgeRescue?: (meal: Meal) => void;
  onOpenHandPortion?: (meal: Meal) => void;
  onSendToFreezerVault?: (meal: Meal, portions: number) => void;
  onLogMealStreak: (meal: Meal) => void;
  onOrderFromVendors?: (meal: Meal) => void;
}

export const DailyMealCard: React.FC<DailyMealCardProps> = ({
  meal,
  profile,
  isFavorite = false,
  onToggleFavorite,
  onOpenPhotoLock,
  onDirectPhotoVerified,
  onOpenInflationSwap,
  onOpenFridgeRescue,
  onOpenHandPortion,
  onSendToFreezerVault,
  onLogMealStreak,
  onOrderFromVendors
}) => {
  const [showPrepSteps, setShowPrepSteps] = useState(true);
  const [showAiVisual, setShowAiVisual] = useState(false);
  const [visualDetails, setVisualDetails] = useState<any | null>(null);
  const [isLoadingVisual, setIsLoadingVisual] = useState(false);

  // Big Pot Batch Multiplier (1x, 4x, 8x)
  const [potMultiplier, setPotMultiplier] = useState<1 | 4 | 8>(1);
  const [stashedSuccess, setStashedSuccess] = useState(false);

  // Inline compact snap tray state
  const [isInlineSnapOpen, setIsInlineSnapOpen] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isVerifyingInline, setIsVerifyingInline] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const country = COUNTRIES[profile.country] || COUNTRIES.NG;
  const isMorning = meal.type === 'morning';
  const isAfternoon = meal.type === 'afternoon';
  const isEvening = meal.type === 'evening';

  const mealIcon = isMorning ? '🌅' : isAfternoon ? '☀️' : '🌙';
  const mealPeriodLabel = isMorning
    ? 'Morning / Breakfast'
    : isAfternoon
    ? 'Afternoon / Lunch'
    : 'Evening / Dinner';

  const handleFetchAiVisual = async () => {
    if (visualDetails) {
      setShowAiVisual(!showAiVisual);
      return;
    }

    setIsLoadingVisual(true);
    setShowAiVisual(true);
    try {
      const res = await fetch('/api/ai/meal-visual', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mealTitle: meal.title,
          ingredients: meal.ingredients,
          style: meal.style,
          proteinType: meal.proteinSourceType
        })
      });
      if (res.ok) {
        const data = await res.json();
        setVisualDetails(data.visualDetails);
      }
    } catch (e) {
      console.warn('Failed to fetch AI visual plating details:', e);
    } finally {
      setIsLoadingVisual(false);
    }
  };

  // Inline Camera Handlers
  const handleStartInlineCamera = async () => {
    try {
      setIsCameraActive(true);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (e) {
      console.warn('Camera error:', e);
      setIsCameraActive(false);
      fileInputRef.current?.click();
    }
  };

  const handleStopInlineCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  };

  const handleCaptureInlinePhoto = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth || 640;
    canvas.height = videoRef.current.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
      handleStopInlineCamera();
      processInlineVerification(dataUrl);
    }
  };

  const handleInlineFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        processInlineVerification(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInstantQuickMatch = () => {
    const sample = isMorning
      ? 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80'
      : 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80';
    processInlineVerification(sample);
  };

  const processInlineVerification = (photoUrl: string) => {
    setIsVerifyingInline(true);
    soundFX.playTap();

    setTimeout(() => {
      setIsVerifyingInline(false);
      setIsInlineSnapOpen(false);
      soundFX.playStreakCelebration();
      fireMealStreakConfetti();

      if (onDirectPhotoVerified) {
        onDirectPhotoVerified(meal.id, photoUrl);
      } else {
        onOpenPhotoLock(meal);
      }
    }, 900);
  };

  const handleAteThisClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;
    fireMealStreakConfetti(x, y);
    onLogMealStreak(meal);
  };

  const handleSendToVault = () => {
    if (potMultiplier <= 1 || !onSendToFreezerVault) return;
    soundFX.playStreakCelebration();
    const extraPortions = potMultiplier - 1;
    onSendToFreezerVault(meal, extraPortions);
    setStashedSuccess(true);
    setTimeout(() => setStashedSuccess(false), 3000);
  };

  return (
    <div className="bg-white dark:bg-[#18181B] rounded-3xl border border-stone-200/90 dark:border-zinc-800 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      {/* Top Card Kicker */}
      <div className="px-6 pt-5 pb-3 border-b border-stone-100 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xl select-none">{mealIcon}</span>
          <div>
            <div className="text-[11px] font-bold text-stone-400 dark:text-zinc-400 uppercase tracking-widest">
              {mealPeriodLabel}
            </div>
            <div className="text-xs text-stone-500 dark:text-zinc-400 font-medium capitalize">
              Protein: {meal.proteinSourceType.replace('_', ' ')}
            </div>
          </div>
        </div>

        {/* Action Controls Bar */}
        <div className="flex flex-wrap items-center gap-1.5">
          {/* WhatsApp Share Button */}
          <button
            type="button"
            onClick={() => {
              soundFX.playTap();
              shareMealToWhatsApp(meal, country);
            }}
            className="p-2 rounded-xl border border-emerald-200 dark:border-emerald-800/80 bg-emerald-50/70 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 transition-colors cursor-pointer"
            title="Share Recipe & Market Buying List to WhatsApp"
          >
            <Share2 className="w-3.5 h-3.5" />
          </button>

          {/* Hand-Size Portion Guide Trigger */}
          {onOpenHandPortion && (
            <button
              type="button"
              onClick={() => {
                soundFX.playTap();
                onOpenHandPortion(meal);
              }}
              className="px-2.5 py-1.5 rounded-xl border border-amber-200 dark:border-amber-800/80 bg-amber-50/70 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 hover:bg-amber-100 text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
              title="View Hand-Size Portion Breakdown (Zero scale needed)"
            >
              <Hand className="w-3.5 h-3.5 text-amber-600" />
              <span>Hand Guide 🖐️</span>
            </button>
          )}

          {/* Fridge Rescue Trigger CTA */}
          {onOpenFridgeRescue && (
            <button
              type="button"
              onClick={() => {
                soundFX.playTap();
                onOpenFridgeRescue(meal);
              }}
              className="px-2.5 py-1.5 rounded-xl border border-stone-200 dark:border-zinc-700 bg-stone-50 dark:bg-zinc-800/80 hover:bg-stone-100 text-stone-700 dark:text-zinc-300 text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
              title="Missing items? Generate an instant swap from what is in your fridge"
            >
              <Refrigerator className="w-3.5 h-3.5 text-[#2ECC71]" />
              <span>Fridge Rescue 🔄</span>
            </button>
          )}

          {/* Inflation Swap Trigger CTA */}
          <button
            type="button"
            onClick={() => onOpenInflationSwap(meal)}
            className="px-2.5 py-1.5 rounded-xl text-xs font-bold text-[#7A1C2C] dark:text-rose-300 bg-[#7A1C2C]/5 dark:bg-[#7A1C2C]/20 hover:bg-[#7A1C2C]/10 border border-[#7A1C2C]/20 dark:border-[#7A1C2C]/40 flex items-center gap-1 transition-colors cursor-pointer"
            title="Swap high inflation ingredient for cheaper macro equivalent"
          >
            <RefreshCw className="w-3.5 h-3.5 text-[#2ECC71]" />
            <span>Inflation Swap</span>
          </button>

          {/* Favorite Bookmark Button */}
          {onToggleFavorite && (
            <button
              type="button"
              onClick={() => {
                soundFX.playTap();
                onToggleFavorite(meal);
              }}
              className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                isFavorite
                  ? 'bg-[#7A1C2C] text-white border-[#7A1C2C]'
                  : 'bg-stone-50 dark:bg-zinc-800/80 hover:bg-stone-100 dark:hover:bg-zinc-800 text-stone-500 dark:text-zinc-400 border-stone-200 dark:border-zinc-700'
              }`}
              title={isFavorite ? 'Saved in Cookbook' : 'Save to Cookbook'}
            >
              <Bookmark className="w-3.5 h-3.5" fill={isFavorite ? 'currentColor' : 'none'} />
            </button>
          )}
        </div>
      </div>

      {/* Visual Food Preview Image / Visualizer */}
      <div className="p-6 pb-2">
        <MealVisualizer
          visualType={meal.visualType}
          title={meal.title}
          proteinSource={meal.proteinSourceType}
          imageUrl={meal.imageUrl}
        />

        {/* AI Visual Plating Representation Trigger */}
        <div className="mt-2.5 flex items-center justify-between">
          <button
            type="button"
            onClick={handleFetchAiVisual}
            className="text-xs font-bold text-[#7A1C2C] dark:text-rose-400 hover:text-[#631623] dark:hover:text-rose-300 flex items-center gap-1.5 cursor-pointer bg-stone-50 dark:bg-zinc-800/60 hover:bg-stone-100 dark:hover:bg-zinc-800 px-3 py-1.5 rounded-xl border border-stone-200/80 dark:border-zinc-700/80 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#2ECC71]" />
            <span>{showAiVisual ? 'Hide Plating Aesthetics' : 'AI Culinary Plating Representation ✨'}</span>
          </button>

          <span className="text-[11px] text-stone-400 dark:text-zinc-500 font-mono">
            {meal.style === 'indigenous' ? '🇳🇬 Authentic Local' : '🌾 Continental'}
          </span>
        </div>

        {/* Expanded AI Visual Representation Details */}
        {showAiVisual && (
          <div className="mt-3 p-4 bg-stone-900 dark:bg-zinc-950 text-white rounded-2xl border border-stone-800 dark:border-zinc-800 text-xs space-y-3 animate-in fade-in duration-200">
            {isLoadingVisual ? (
              <div className="flex items-center gap-2 text-stone-300 py-2">
                <span className="w-4 h-4 border-2 border-[#2ECC71] border-t-transparent rounded-full animate-spin" />
                <span>Generating culinary plating & sensory presentation...</span>
              </div>
            ) : visualDetails ? (
              <>
                <div className="flex items-center justify-between border-b border-stone-800 dark:border-zinc-800 pb-2">
                  <span className="font-bold text-[#2ECC71] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{visualDetails.visualTitle || `${meal.title} Plating`}</span>
                  </span>
                  <span className="text-[10px] text-stone-400 font-mono">Gastronomic Visual</span>
                </div>

                <div className="space-y-1.5 text-stone-200 dark:text-zinc-300 text-[11px]">
                  <div>
                    <strong className="text-white">Plating Aesthetics: </strong>
                    {visualDetails.platingStyle}
                  </div>
                  <div>
                    <strong className="text-white">Visual Texture: </strong>
                    {visualDetails.visualTextures}
                  </div>
                  <div>
                    <strong className="text-white">Garnish & Finishing: </strong>
                    {visualDetails.garnishAndFinishing}
                  </div>
                </div>

                {visualDetails.aromaAndSensoryNotes && (
                  <div className="pt-2 border-t border-stone-800 dark:border-zinc-800 flex flex-wrap gap-2 text-[10px]">
                    {visualDetails.aromaAndSensoryNotes.map((note: string, idx: number) => (
                      <span key={idx} className="bg-stone-800 dark:bg-zinc-800 px-2 py-0.5 rounded-md text-stone-300">
                        💨 {note}
                      </span>
                    ))}
                  </div>
                )}
              </>
            ) : null}
          </div>
        )}
      </div>

      <div className="px-6 pb-6 pt-2 space-y-5">
        {/* Title and Description */}
        <div>
          <h3 className="text-lg font-bold text-stone-900 dark:text-zinc-100 leading-snug">{meal.title}</h3>
          <p className="text-xs text-stone-600 dark:text-zinc-400 mt-1 line-clamp-2">{meal.description}</p>
        </div>

        {/* Clean Unboxed Metadata Line */}
        <div className="flex items-center flex-wrap gap-2 text-xs text-stone-500 dark:text-zinc-400 font-mono py-1 border-y border-stone-100 dark:border-zinc-800">
          <span className="font-bold text-stone-800 dark:text-zinc-200">{meal.calories} kcal</span>
          <span aria-hidden="true" className="text-stone-300 dark:text-zinc-700">·</span>
          <span>{meal.protein}g protein</span>
          <span aria-hidden="true" className="text-stone-300 dark:text-zinc-700">·</span>
          <span>{meal.carbs}g carbs</span>
          <span aria-hidden="true" className="text-stone-300 dark:text-zinc-700">·</span>
          <span>{meal.fat}g fat</span>
          <span aria-hidden="true" className="text-stone-300 dark:text-zinc-700">·</span>
          <span className="text-stone-400 dark:text-zinc-500">{meal.fiber}g fiber</span>
          <span aria-hidden="true" className="text-stone-300 dark:text-zinc-700">·</span>
          <span className="font-bold text-[#7A1C2C] dark:text-rose-400">
            {country.currencySymbol}{(meal.estimatedCost * potMultiplier).toLocaleString()}
            {potMultiplier > 1 && ` (${potMultiplier}x Pot)`}
          </span>
        </div>

        {/* Swap Alert Badge if meal was swapped */}
        {meal.isSwapped && meal.swapInfo && (
          <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl text-xs flex items-center justify-between text-emerald-900 dark:text-emerald-200">
            <span className="flex items-center gap-1.5 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-[#2ECC71]" />
              Swapped to: <strong>{meal.swapInfo.swappedIngredient}</strong>
            </span>
            <span className="font-bold text-[#2ECC71] bg-white dark:bg-zinc-900 px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-800">
              Saved {meal.swapInfo.costSavingsPercent}%
            </span>
          </div>
        )}

        {/* CLEAN SLEEK LINK TO ORDER FROM VERIFIED VENDORS */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 p-3 bg-amber-50/70 dark:bg-amber-950/30 rounded-2xl border border-amber-200/80 dark:border-amber-800/50 text-xs">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-700 dark:text-amber-300 flex items-center justify-center shrink-0">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <div className="font-extrabold text-stone-900 dark:text-zinc-100 text-xs">
                Want to order this food or fresh ingredients?
              </div>
              <div className="text-[11px] text-stone-500 dark:text-zinc-400">
                Vetted hygiene & price stability partners in {country.name}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              soundFX.playTap();
              if (onOrderFromVendors) {
                onOrderFromVendors(meal);
              } else {
                const partner = country.deliveryPartners[0];
                const url = partner ? `${partner.urlPrefix}${encodeURIComponent(meal.readyToEatDeliveryQuery)}` : 'https://chowdeck.com/';
                window.open(url, '_blank', 'noopener,noreferrer');
              }
            }}
            className="px-3.5 py-2 bg-[#7A1C2C] hover:bg-[#631623] text-white font-bold text-xs rounded-xl shadow-xs flex items-center justify-center gap-1.5 cursor-pointer shrink-0 transition-transform active:scale-95"
          >
            <span>Order from Verified Vendors</span>
            <ExternalLink className="w-3.5 h-3.5 text-amber-200" />
          </button>
        </div>

        {/* COOKING & ROUTINE SECTION */}
        <div className="space-y-4">
            {/* 1. Big Pot Cooking Scaler Bar */}
            <div className="p-3 bg-stone-50 dark:bg-zinc-850 rounded-2xl border border-stone-200 dark:border-zinc-750 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div>
                <span className="font-bold text-stone-900 dark:text-zinc-100 flex items-center gap-1.5">
                  <Utensils className="w-3.5 h-3.5 text-[#7A1C2C] dark:text-rose-400" />
                  <span>Pot Cooking Scaler:</span>
                </span>
                <p className="text-[11px] text-stone-500 dark:text-zinc-400">
                  Scale quantities for single meal, family pot, or weekly freezer prep.
                </p>
              </div>

              <div className="flex items-center gap-1.5">
                {[
                  { mult: 1 as const, label: '1x Single' },
                  { mult: 4 as const, label: '4x Big Pot' },
                  { mult: 8 as const, label: '8x Freezer Batch' }
                ].map(opt => (
                  <button
                    key={opt.mult}
                    type="button"
                    onClick={() => {
                      soundFX.playTap();
                      setPotMultiplier(opt.mult);
                    }}
                    className={`px-2.5 py-1.5 rounded-xl font-bold font-mono text-xs transition-all cursor-pointer border ${
                      potMultiplier === opt.mult
                        ? 'bg-[#7A1C2C] text-white border-[#7A1C2C] shadow-xs'
                        : 'bg-white dark:bg-zinc-800 text-stone-700 dark:text-zinc-300 border-stone-200 dark:border-zinc-700'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* If Big Pot Selected, offer 1-click Freezer Stash */}
            {potMultiplier > 1 && onSendToFreezerVault && (
              <div className="p-3 bg-cyan-50/70 dark:bg-cyan-950/30 border border-cyan-200 dark:border-cyan-800/80 rounded-2xl flex items-center justify-between gap-3 text-xs">
                <div>
                  <span className="font-bold text-cyan-950 dark:text-cyan-200 flex items-center gap-1">
                    <Snowflake className="w-3.5 h-3.5 text-cyan-600" />
                    <span>Freezer Prep Ready:</span>
                  </span>
                  <p className="text-[11px] text-cyan-800 dark:text-cyan-300">
                    Eat 1 portion today, stash {potMultiplier - 1} extra portions in your Freezer Vault.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleSendToVault}
                  className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1 cursor-pointer shrink-0"
                >
                  <Snowflake className="w-3.5 h-3.5" />
                  <span>{stashedSuccess ? '✓ Stashed!' : `Stash ${potMultiplier - 1} Portions`}</span>
                </button>
              </div>
            )}

            {/* 3. Scaled Gram Weights */}
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-stone-600 dark:text-zinc-400 uppercase tracking-wider mb-2">
                <span>Ingredient Gram-Weights {potMultiplier > 1 && `(${potMultiplier}x Scaled)`}</span>
                <span className="font-normal lowercase">current market prices</span>
              </div>

              <div className="border border-stone-200 dark:border-zinc-800 rounded-xl divide-y divide-stone-100 dark:divide-zinc-800 overflow-hidden bg-stone-50/50 dark:bg-zinc-900/50">
                {meal.ingredients.map((ing) => (
                  <div key={ing.id} className="p-2.5 text-xs flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-stone-800 dark:text-zinc-200">{ing.name}</span>
                      <span className="text-stone-400 dark:text-zinc-500 font-mono ml-1.5">
                        ({ing.gramWeight * potMultiplier}g)
                      </span>
                      <div className="text-[10px] text-stone-500 dark:text-zinc-400">Sourced from: {ing.sourcingLocation}</div>
                    </div>
                    <div className="text-right font-mono font-bold text-stone-800 dark:text-zinc-200">
                      {country.currencySymbol}{(ing.cost * potMultiplier).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Prep instructions */}
            <div className="border border-stone-200 dark:border-zinc-800 rounded-xl overflow-hidden">
              <button
                type="button"
                onClick={() => setShowPrepSteps(!showPrepSteps)}
                className="w-full p-3 bg-stone-50 dark:bg-zinc-900/80 hover:bg-stone-100 dark:hover:bg-zinc-850 text-xs font-bold text-stone-800 dark:text-zinc-200 flex items-center justify-between transition-colors cursor-pointer"
              >
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-stone-500 dark:text-zinc-400" />
                  <span>Step-by-Step Routine ({meal.cookTimeMinutes} mins prep)</span>
                </span>
                {showPrepSteps ? <ChevronUp className="w-4 h-4 text-stone-500" /> : <ChevronDown className="w-4 h-4 text-stone-500" />}
              </button>

              {showPrepSteps && (
                <div className="p-3.5 bg-white dark:bg-zinc-900 text-xs text-stone-700 dark:text-zinc-300 space-y-2.5 border-t border-stone-200 dark:border-zinc-800">
                  {meal.prepInstructions.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-[#7A1C2C]/10 dark:bg-[#7A1C2C]/30 text-[#7A1C2C] dark:text-rose-300 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <p className="flex-1 leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

        {/* INLINE COMPACT SNAP TRAY (EXPANDS RIGHT HERE UNDER MEAL CARD) */}
        {isInlineSnapOpen && !meal.photoVerified && (
          <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-zinc-900/90 border border-stone-200 dark:border-zinc-800 space-y-3 animate-in fade-in duration-200">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-stone-800 dark:text-zinc-200 flex items-center gap-1.5">
                <Camera className="w-4 h-4 text-[#2ECC71]" />
                <span>Snap Plate for {meal.title}</span>
              </span>
              <button
                type="button"
                onClick={() => {
                  handleStopInlineCamera();
                  setIsInlineSnapOpen(false);
                }}
                className="text-stone-400 hover:text-stone-700 dark:hover:text-zinc-200 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Live Camera Viewfinder if Camera is Active */}
            {isCameraActive ? (
              <div className="space-y-2">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full h-44 object-cover rounded-xl bg-black"
                />
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCaptureInlinePhoto}
                    className="flex-1 py-2 bg-[#2ECC71] hover:bg-[#27ae60] text-white font-black text-xs rounded-xl shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>Take Picture</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleStopInlineCamera}
                    className="px-3 py-2 bg-stone-200 dark:bg-zinc-800 text-stone-700 dark:text-zinc-300 text-xs font-bold rounded-xl cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : isVerifyingInline ? (
              <div className="py-4 text-center space-y-2">
                <span className="inline-block w-6 h-6 border-2 border-[#2ECC71] border-t-transparent rounded-full animate-spin" />
                <div className="text-xs font-bold text-stone-800 dark:text-zinc-200">
                  AI Authenticating Plate & Macros...
                </div>
              </div>
            ) : (
              /* Compact Snap Actions */
              <div className="space-y-2.5">
                <div className="grid grid-cols-3 gap-2">
                  {/* Action 1: Camera */}
                  <button
                    type="button"
                    onClick={handleStartInlineCamera}
                    className="p-2.5 bg-stone-900 dark:bg-zinc-800 hover:bg-stone-800 text-white rounded-xl text-xs font-bold flex flex-col items-center justify-center gap-1 cursor-pointer"
                  >
                    <Camera className="w-4 h-4 text-[#2ECC71]" />
                    <span>Camera</span>
                  </button>

                  {/* Action 2: Upload */}
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="p-2.5 bg-white dark:bg-zinc-850 hover:bg-stone-100 border border-stone-200 dark:border-zinc-700 text-stone-800 dark:text-zinc-200 rounded-xl text-xs font-bold flex flex-col items-center justify-center gap-1 cursor-pointer"
                  >
                    <Upload className="w-4 h-4 text-stone-500" />
                    <span>Upload</span>
                  </button>

                  {/* Action 3: Quick Test */}
                  <button
                    type="button"
                    onClick={handleInstantQuickMatch}
                    className="p-2.5 bg-[#7A1C2C]/5 dark:bg-[#7A1C2C]/20 hover:bg-[#7A1C2C]/10 border border-[#7A1C2C]/20 text-[#7A1C2C] dark:text-rose-400 rounded-xl text-xs font-bold flex flex-col items-center justify-center gap-1 cursor-pointer"
                  >
                    <Zap className="w-4 h-4 text-amber-500" />
                    <span>Instant Match</span>
                  </button>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleInlineFileChange}
                    className="hidden"
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] text-stone-500 dark:text-zinc-400 pt-1">
                  <span>Earns <strong>+50 Clever XP</strong></span>
                  <button
                    type="button"
                    onClick={() => onOpenPhotoLock(meal)}
                    className="text-[#7A1C2C] dark:text-rose-400 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>Full Screen View</span>
                    <Maximize2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* PHOTO-LOCKED DAILY RITUAL STREAK SECTION */}
        <div className="pt-2 border-t border-stone-100 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-stone-500 dark:text-zinc-400 flex items-center gap-2">
            {meal.photoVerified ? (
              <div className="flex items-center gap-2">
                {meal.photoUrl && (
                  <img
                    src={meal.photoUrl}
                    alt="Authenticated Plate"
                    className="w-8 h-8 rounded-lg object-cover border border-emerald-300 dark:border-emerald-700 shadow-2xs"
                  />
                )}
                <div>
                  <span className="inline-flex items-center gap-1 text-[#2ECC71] font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Plate Authenticated!
                  </span>
                  <div className="text-[10px] text-stone-400 font-mono">Streak unlocked · +25 pts</div>
                </div>
              </div>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-stone-500 dark:text-zinc-400">
                <Lock className="w-3.5 h-3.5 text-stone-400 dark:text-zinc-500" />
                <span>Streak Locked · Photo Required</span>
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {!meal.photoVerified ? (
              <button
                type="button"
                onClick={() => {
                  soundFX.playTap();
                  setIsInlineSnapOpen(!isInlineSnapOpen);
                }}
                className="flex-1 sm:flex-none px-4 py-2 bg-stone-900 dark:bg-zinc-800 hover:bg-stone-800 dark:hover:bg-zinc-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              >
                <Camera className="w-4 h-4 text-[#2ECC71]" />
                <span>{isInlineSnapOpen ? 'Close Camera' : 'Snap Food to Unlock Streak'}</span>
              </button>
            ) : (
              /* REWARDING GLOWING & CONFETTI-ENABLED 'I ATE THIS 🔥' BUTTON */
              <button
                type="button"
                onClick={handleAteThisClick}
                className="relative flex-1 sm:flex-none px-6 py-2.5 bg-[#2ECC71] hover:bg-[#27ae60] text-white font-black text-xs rounded-xl shadow-lg shadow-[#2ECC71]/40 ring-4 ring-[#2ECC71]/30 flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer animate-glow-pulse group"
                title="Tap to log meal and celebrate your nutrition streak!"
              >
                <span className="absolute -top-1 -right-1 flex h-3 w-3 pointer-events-none">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-300"></span>
                </span>
                <Flame className="w-4 h-4 text-amber-200 fill-amber-200 group-hover:scale-125 transition-transform" />
                <span className="tracking-wide">I ate this 🔥</span>
                <Sparkles className="w-3.5 h-3.5 text-amber-200 animate-spin [animation-duration:3s]" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
