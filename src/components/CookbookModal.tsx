import React, { useState } from 'react';
import { Meal, UserProfile } from '../types';
import {
  BookOpen,
  Bookmark,
  ArrowRightLeft,
  Sparkles,
  X,
  ChevronRight,
  Clock,
  ExternalLink,
  Flame,
  Utensils,
  Plus,
  Check
} from 'lucide-react';
import { INGREDIENT_CONVERSIONS } from '../data/vendors';
import { COUNTRIES } from '../data/countries';
import { soundFX } from '../utils/sound';

interface CookbookModalProps {
  profile: UserProfile;
  favorites: Meal[];
  isOpen: boolean;
  onClose: () => void;
  onSelectMeal: (meal: Meal) => void;
  onAddFavorite?: (meal: Meal) => void;
}

// Curated signature dishes when favorites is empty
const CURATED_SIGNATURE_RECIPES: Partial<Meal>[] = [
  {
    id: 'curated_1',
    dayNumber: 2,
    title: 'Smoky Firewood Jollof Rice with Char-Grilled Chicken & Fried Plantain',
    description: 'Long-grain rice infused with roasted tomatoes, red bell peppers, bay leaves, and bottom-pot firewood smoke, topped with golden chicken.',
    calories: 720,
    protein: 46,
    carbs: 92,
    fat: 18,
    fiber: 6,
    cookTimeMinutes: 35,
    visualType: 'jollof_bowl',
    imageUrl: '/src/assets/images/jollof_chicken_1790641910111.jpg',
    proteinSourceType: 'poultry',
    estimatedCost: 2600
  },
  {
    id: 'curated_2',
    dayNumber: 1,
    title: 'Boiled White Yam & Flaked Smoked Titus Pepper Sauce',
    description: 'Firm boiled white yam paired with rich flaked Atlantic mackerel simmered in crushed rodo, tatase, and cold-pressed palm oil.',
    calories: 580,
    protein: 38,
    carbs: 72,
    fat: 14,
    fiber: 9,
    cookTimeMinutes: 20,
    visualType: 'yam_egg_skillet',
    imageUrl: '/src/assets/images/yam_fish_stew_1790641922409.jpg',
    proteinSourceType: 'fish',
    estimatedCost: 2300
  },
  {
    id: 'curated_3',
    dayNumber: 4,
    title: 'Slow-Cooked Honey Beans (Ewa Oloyin) with Roasted Plantain',
    description: 'Naturally sweet soft Nigerian honey beans cooked down to a rich creamy porridge with dried catfish and ripe dodo.',
    calories: 670,
    protein: 38,
    carbs: 98,
    fat: 12,
    fiber: 21,
    cookTimeMinutes: 40,
    visualType: 'beans_plantain',
    imageUrl: '/src/assets/images/beans_plantain_1790641943763.jpg',
    proteinSourceType: 'legumes_plant',
    estimatedCost: 1950
  },
  {
    id: 'curated_4',
    dayNumber: 3,
    title: 'Pounded Yam Swallow with Egusi Spinach Soup & Boiled Eggs',
    description: 'Velvety smooth pounded yam paired with ground melon seed egusi, wild spinach (efo shoko), and farm boiled eggs.',
    calories: 710,
    protein: 34,
    carbs: 96,
    fat: 20,
    fiber: 8,
    cookTimeMinutes: 25,
    visualType: 'stew_swallow',
    imageUrl: '/src/assets/images/pounded_yam_egusi_1790641933918.jpg',
    proteinSourceType: 'eggs_dairy',
    estimatedCost: 2450
  },
  {
    id: 'curated_5',
    dayNumber: 6,
    title: 'Pan-Seared Atlantic Salmon with Garlic Brown Rice & Steamed Greens',
    description: 'Crispy skin salmon fillet bursting with Omega-3s, served alongside nutty brown rice and steamed garden vegetables.',
    calories: 640,
    protein: 42,
    carbs: 62,
    fat: 22,
    fiber: 7,
    cookTimeMinutes: 22,
    visualType: 'chicken_salad',
    imageUrl: '/src/assets/images/grilled_salmon_1790642194407.jpg',
    proteinSourceType: 'fish',
    estimatedCost: 3100
  },
  {
    id: 'curated_6',
    dayNumber: 5,
    title: 'Grilled Plantain (Boli) & Lean Suya Beef Skewers',
    description: 'Ripe plantain fire-roasted to caramel perfection, served with thinly shaved lean beef strips rolled in kuli-kuli yaji spice.',
    calories: 590,
    protein: 36,
    carbs: 78,
    fat: 14,
    fiber: 8,
    cookTimeMinutes: 20,
    visualType: 'beans_plantain',
    imageUrl: '/src/assets/images/beef_suya_boli_1790642205230.jpg',
    proteinSourceType: 'beef_lean',
    estimatedCost: 2500
  }
];

export const CookbookModal: React.FC<CookbookModalProps> = ({
  profile,
  favorites,
  isOpen,
  onClose,
  onSelectMeal,
  onAddFavorite
}) => {
  const [activeTab, setActiveTab] = useState<'favorites' | 'converter'>('favorites');
  const [selectedMapping, setSelectedMapping] = useState<number>(0);
  const [activeVisualModalMeal, setActiveVisualModalMeal] = useState<any | null>(null);

  if (!isOpen) return null;

  const country = COUNTRIES[profile.country] || COUNTRIES.NG;
  const displayMeals = favorites.length > 0 ? favorites : (CURATED_SIGNATURE_RECIPES as Meal[]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Banner */}
        <div className="bg-[#7A1C2C] text-white px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-[#2ECC71]" />
            </div>
            <div>
              <h3 className="font-extrabold text-base tracking-tight">Smart Cookbook & Culinary Gallery</h3>
              <p className="text-xs text-white/80">Authentic meal photography, macro parity & local conversion engine</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg text-white/80 hover:text-white hover:bg-white/10 flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="px-6 pt-3 bg-stone-50 border-b border-stone-200 flex gap-4 text-xs font-bold text-stone-600 shrink-0">
          <button
            onClick={() => setActiveTab('favorites')}
            className={`pb-2.5 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'favorites'
                ? 'border-[#7A1C2C] text-[#7A1C2C]'
                : 'border-transparent hover:text-stone-900'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>
              {favorites.length > 0 ? `Saved Favorites (${favorites.length})` : 'Curated Signature Recipes (6)'}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('converter')}
            className={`pb-2.5 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'converter'
                ? 'border-[#7A1C2C] text-[#7A1C2C]'
                : 'border-transparent hover:text-stone-900'
            }`}
          >
            <ArrowRightLeft className="w-3.5 h-3.5 text-[#2ECC71]" />
            <span>Local Ingredient Converter</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {activeTab === 'favorites' && (
            <div className="space-y-4">
              {favorites.length === 0 && (
                <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200/80 text-xs text-amber-900 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>
                      You haven't bookmarked personal recipes yet. Explore our <strong>Curated Signature Showcase</strong> below with authentic food photography!
                    </span>
                  </div>
                </div>
              )}

              {/* Grid of Mouth-Watering Recipe Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {displayMeals.map((meal) => (
                  <div
                    key={meal.id}
                    className="bg-white rounded-2xl border border-stone-200/90 shadow-xs overflow-hidden flex flex-col justify-between hover:shadow-md transition-all group"
                  >
                    {/* Authentic Food Photo Banner */}
                    <div className="relative w-full h-44 overflow-hidden bg-stone-900">
                      <img
                        src={meal.imageUrl || '/src/assets/images/jollof_chicken_1790641910111.jpg'}
                        alt={meal.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                      <div className="absolute top-2.5 left-2.5 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] text-white font-mono font-bold flex items-center gap-1 border border-white/10">
                        <Clock className="w-3 h-3 text-[#2ECC71]" />
                        <span>{meal.cookTimeMinutes || 25} mins prep</span>
                      </div>

                      <div className="absolute top-2.5 right-2.5 bg-[#7A1C2C] text-white px-2 py-0.5 rounded-md text-[10px] font-bold">
                        Day {meal.dayNumber}
                      </div>

                      <div className="absolute bottom-2.5 inset-x-3 text-white">
                        <div className="font-extrabold text-sm leading-snug drop-shadow-sm truncate">
                          {meal.title}
                        </div>
                      </div>
                    </div>

                    {/* Body details */}
                    <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                      <p className="text-xs text-stone-600 line-clamp-2">
                        {meal.description}
                      </p>

                      {/* Clean Unboxed Macros */}
                      <div className="flex items-center gap-2 text-xs font-mono text-stone-600 pt-2 border-t border-stone-100">
                        <span className="font-bold text-stone-900">{meal.calories} kcal</span>
                        <span className="text-stone-300">·</span>
                        <span>{meal.protein}g protein</span>
                        <span className="text-stone-300">·</span>
                        <span>{meal.carbs}g carbs</span>
                        <span className="text-stone-300">·</span>
                        <span>{meal.fat}g fat</span>
                      </div>

                      {/* Actions */}
                      <div className="pt-2 flex items-center justify-between gap-2">
                        <button
                          type="button"
                          onClick={() => setActiveVisualModalMeal(meal)}
                          className="px-3 py-1.5 bg-stone-50 hover:bg-stone-100 text-[#7A1C2C] text-xs font-bold rounded-xl border border-stone-200 flex items-center gap-1.5 transition-colors"
                        >
                          <Sparkles className="w-3 h-3 text-[#2ECC71]" />
                          <span>AI Plating Visual</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            soundFX.playTap();
                            onSelectMeal(meal);
                            onClose();
                          }}
                          className="px-4 py-1.5 bg-[#7A1C2C] hover:bg-[#631623] text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
                        >
                          View in Plan
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'converter' && (
            <div className="space-y-4">
              <div className="text-xs text-stone-600 bg-stone-50 p-3.5 rounded-2xl border border-stone-200">
                Maps Western/Continental recipe items to abundant, budget-friendly local substitutes without altering your calorie or protein targets.
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {INGREDIENT_CONVERSIONS.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedMapping(idx)}
                    className={`p-4 rounded-2xl border text-xs cursor-pointer transition-all ${
                      selectedMapping === idx
                        ? 'border-[#7A1C2C] bg-[#7A1C2C]/5 shadow-xs ring-1 ring-[#7A1C2C]'
                        : 'border-stone-200 bg-white hover:border-stone-300'
                    }`}
                  >
                    <div className="flex items-center justify-between font-bold text-stone-800 mb-1.5">
                      <span className="text-stone-400 line-through text-xs">{item.international}</span>
                      <ArrowRightLeft className="w-3.5 h-3.5 text-[#2ECC71]" />
                      <span className="text-[#7A1C2C] font-extrabold text-sm">{item.localEquivalent}</span>
                    </div>

                    <div className="text-[11px] text-stone-600 space-y-1.5 mt-2">
                      <div>
                        <strong className="text-stone-800">Macro Match: </strong>
                        {item.nutritionEquivalence}
                      </div>
                      <div className="text-emerald-700 font-semibold font-mono">
                        Cost Advantage: {item.costRatio}
                      </div>
                      <div className="text-stone-500 italic">
                        "{item.culinaryTip}"
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* AI Visual Plating Modal Preview for Selected Recipe */}
        {activeVisualModalMeal && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="relative w-full max-w-lg bg-stone-900 text-white rounded-3xl p-6 border border-stone-800 space-y-4 shadow-2xl">
              <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#2ECC71]" />
                  <h4 className="font-extrabold text-sm">{activeVisualModalMeal.title}</h4>
                </div>
                <button
                  onClick={() => setActiveVisualModalMeal(null)}
                  className="text-stone-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Large Image Preview */}
              <div className="relative rounded-2xl overflow-hidden aspect-16/9 bg-black border border-stone-800">
                <img
                  src={activeVisualModalMeal.imageUrl || '/src/assets/images/jollof_chicken_1790641910111.jpg'}
                  alt={activeVisualModalMeal.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-2 text-xs text-stone-300">
                <div>
                  <strong className="text-white">Artisanal Presentation: </strong>
                  Vibrant natural food photography featuring rich caramelized contrasts, steaming herbs, and clean geometric portioning.
                </div>
                <div>
                  <strong className="text-white">Nutritional Alignment: </strong>
                  {activeVisualModalMeal.calories} kcal · {activeVisualModalMeal.protein}g protein · Prepared to meet your goal without excess saturated fat.
                </div>
              </div>

              <button
                onClick={() => setActiveVisualModalMeal(null)}
                className="w-full py-2.5 bg-[#2ECC71] hover:bg-[#27ae60] text-white font-bold rounded-xl text-xs"
              >
                Close Visual
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
