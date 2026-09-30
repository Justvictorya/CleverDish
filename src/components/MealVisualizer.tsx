import React, { useState } from 'react';
import { Meal } from '../types';
import { Camera, Layers, Sparkles } from 'lucide-react';

interface MealVisualizerProps {
  visualType: Meal['visualType'];
  title: string;
  proteinSource: Meal['proteinSourceType'];
  imageUrl?: string;
}

export const MealVisualizer: React.FC<MealVisualizerProps> = ({
  visualType,
  title,
  proteinSource,
  imageUrl
}) => {
  const [displayMode, setDisplayMode] = useState<'photo' | 'animated'>(imageUrl ? 'photo' : 'animated');

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-stone-200/90 shadow-sm bg-stone-900 group">
      {/* Switch between Real Photo and Layered Visualizer */}
      {imageUrl && (
        <div className="absolute top-3 right-3 z-30 flex items-center gap-1 bg-black/60 backdrop-blur-md p-1 rounded-xl border border-white/20">
          <button
            type="button"
            onClick={() => setDisplayMode('photo')}
            className={`px-2.5 py-1 text-[11px] font-bold rounded-lg flex items-center gap-1.5 transition-all ${
              displayMode === 'photo'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-white/80 hover:text-white'
            }`}
          >
            <Camera className="w-3.5 h-3.5 text-[#2ECC71]" />
            <span>Dish Photo</span>
          </button>
          <button
            type="button"
            onClick={() => setDisplayMode('animated')}
            className={`px-2.5 py-1 text-[11px] font-bold rounded-lg flex items-center gap-1.5 transition-all ${
              displayMode === 'animated'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-white/80 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-[#7A1C2C]" />
            <span>Layered Art</span>
          </button>
        </div>
      )}

      {/* MODE 1: High-Resolution Real Gourmet Dish Photography */}
      {displayMode === 'photo' && imageUrl ? (
        <div className="relative w-full h-56 sm:h-64 overflow-hidden bg-stone-950">
          <img
            src={imageUrl}
            alt={title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
          {/* Subtle gradient vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30 pointer-events-none" />

          {/* Bottom badge with meal title & true-to-life indicator */}
          <div className="absolute bottom-3 inset-x-3 flex items-center justify-between text-xs text-white">
            <div className="flex items-center gap-1.5 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 max-w-[75%] truncate">
              <Sparkles className="w-3.5 h-3.5 text-[#2ECC71] shrink-0" />
              <span className="font-bold truncate">{title}</span>
            </div>
            <span className="text-[10px] font-mono bg-[#2ECC71] text-white font-extrabold px-2 py-1 rounded-lg">
              Live Photo
            </span>
          </div>
        </div>
      ) : (
        /* MODE 2: Layered SVG/CSS Food Art Visualizer */
        <div className="relative w-full h-56 bg-gradient-to-b from-stone-50 to-stone-100/90 flex items-center justify-center p-3 select-none">
          {/* Background glow and subtle tablecloth texture */}
          <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#7A1C2C_1px,transparent_1px)] [background-size:16px_16px]" />

          {/* Steam animation puffs */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 flex gap-4 pointer-events-none opacity-50 z-20">
            <span className="inline-block w-2.5 h-6 bg-white/70 rounded-full blur-[2px] animate-pulse" />
            <span className="inline-block w-3 h-8 bg-white/60 rounded-full blur-[2px] animate-pulse [animation-delay:400ms]" />
            <span className="inline-block w-2.5 h-5 bg-white/70 rounded-full blur-[2px] animate-pulse [animation-delay:800ms]" />
          </div>

          {/* Ceramic plate container */}
          <div className="relative w-40 h-40 rounded-full bg-white shadow-[0_12px_30px_rgba(0,0,0,0.08),inset_0_2px_4px_rgba(0,0,0,0.04)] border-4 border-stone-100 flex items-center justify-center p-2.5 transition-transform hover:scale-105 duration-300">
            <div className="absolute inset-1.5 rounded-full border border-dashed border-stone-200/80 pointer-events-none" />

            {/* Visualizer Type 1: Jollof Bowl */}
            {visualType === 'jollof_bowl' && (
              <div className="relative w-full h-full rounded-full overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-tr from-amber-600 via-orange-500 to-amber-500 rounded-full flex items-center justify-center shadow-inner">
                  <div className="absolute inset-0 opacity-25 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:4px_4px]" />
                </div>
                <div className="absolute top-2 right-2 w-16 h-16 rounded-full bg-gradient-to-br from-red-600 to-amber-700 opacity-90 blur-[1px] shadow-sm transform rotate-12" />
                <div className="absolute top-5 left-5 z-10">
                  {proteinSource === 'poultry' ? (
                    <div className="w-12 h-10 bg-gradient-to-r from-amber-800 to-amber-700 rounded-xl shadow-md border border-amber-900/30 transform -rotate-12 flex items-center justify-center">
                      <span className="text-base">🍗</span>
                    </div>
                  ) : proteinSource === 'fish' ? (
                    <div className="w-13 h-9 bg-gradient-to-r from-stone-700 to-stone-600 rounded-lg shadow-md border border-stone-800/40 transform -rotate-6 flex items-center justify-center">
                      <span className="text-base">🐟</span>
                    </div>
                  ) : (
                    <div className="w-11 h-9 bg-gradient-to-r from-amber-900 to-red-950 rounded-xl shadow-md transform -rotate-12 flex items-center justify-center">
                      <span className="text-base">🥩</span>
                    </div>
                  )}
                </div>
                <div className="absolute bottom-3 right-4 z-10 flex -space-x-2 transform rotate-6">
                  <div className="w-6 h-4 bg-gradient-to-br from-amber-400 to-yellow-600 rounded-full shadow-sm border border-amber-600/30" />
                  <div className="w-6 h-4 bg-gradient-to-br from-amber-400 to-yellow-600 rounded-full shadow-sm border border-amber-600/30" />
                </div>
              </div>
            )}

            {/* Visualizer Type 2: Yam & Egg Skillet */}
            {visualType === 'yam_egg_skillet' && (
              <div className="relative w-full h-full rounded-full overflow-hidden flex items-center justify-center bg-stone-100">
                <div className="absolute top-2 left-3 w-11 h-11 rounded-full bg-gradient-to-br from-amber-50 to-stone-200 border border-stone-300/80 shadow-sm flex items-center justify-center font-bold text-stone-600 text-xs">
                  🍠
                </div>
                <div className="absolute bottom-3 left-4 w-10 h-10 rounded-full bg-gradient-to-br from-amber-50 to-stone-200 border border-stone-300/80 shadow-sm" />
                <div className="absolute top-4 right-3 w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-400 via-yellow-400 to-orange-500 shadow-md transform rotate-12 flex items-center justify-center">
                  <span className="text-sm">🍳</span>
                </div>
              </div>
            )}

            {/* Visualizer Type 3: Oatmeal / Parfait Bowl */}
            {visualType === 'oatmeal_parfait' && (
              <div className="relative w-full h-full rounded-full overflow-hidden flex items-center justify-center bg-stone-100">
                <div className="absolute inset-1 rounded-full bg-gradient-to-tr from-stone-200 via-amber-100 to-amber-50 shadow-inner" />
                <div className="absolute top-4 left-5 flex gap-1 z-10">
                  <div className="w-4 h-4 bg-red-600 rounded-full shadow-sm" />
                  <div className="w-3.5 h-3.5 bg-purple-700 rounded-full shadow-sm" />
                </div>
                <div className="absolute bottom-4 right-4 flex -space-x-1.5 z-10">
                  <div className="w-6 h-6 bg-amber-200 rounded-full border border-amber-300 flex items-center justify-center text-[9px]">🍌</div>
                  <div className="w-6 h-6 bg-amber-100 rounded-full border border-amber-300" />
                </div>
              </div>
            )}

            {/* Visualizer Type 4: Beans & Plantain Porridge */}
            {visualType === 'beans_plantain' && (
              <div className="relative w-full h-full rounded-full overflow-hidden flex items-center justify-center bg-gradient-to-tr from-amber-900 via-amber-800 to-amber-700">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:5px_5px]" />
                <div className="absolute top-3 left-4 flex gap-1 z-10">
                  <div className="w-7 h-5 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-lg shadow transform rotate-12" />
                  <div className="w-7 h-5 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-lg shadow transform -rotate-6" />
                </div>
                <div className="absolute bottom-3 right-4 z-10">
                  <span className="text-lg">🫘</span>
                </div>
              </div>
            )}

            {/* Visualizer Type 5: Swallow & Soup */}
            {visualType === 'stew_swallow' && (
              <div className="relative w-full h-full rounded-full overflow-hidden flex items-center justify-center bg-emerald-950">
                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-900 via-amber-700 to-yellow-600 opacity-95" />
                <div className="relative z-10 w-16 h-16 rounded-full bg-gradient-to-br from-stone-50 via-stone-100 to-amber-100/90 shadow-lg border border-stone-200/90 flex items-center justify-center">
                  <span className="text-xs font-bold text-amber-950">Yam</span>
                </div>
              </div>
            )}

            {/* Other types */}
            {(visualType === 'chicken_salad' || visualType === 'pasta_medley') && (
              <div className="relative w-full h-full rounded-full overflow-hidden flex items-center justify-center bg-stone-100">
                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-100 via-amber-50 to-emerald-50" />
                <span className="text-2xl">{proteinSource === 'poultry' ? '🥗' : '🍝'}</span>
              </div>
            )}
          </div>

          <div className="absolute bottom-2 inset-x-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-stone-200/80 shadow-xs flex items-center justify-between text-[11px] text-stone-700">
            <span className="font-semibold text-[#7A1C2C] truncate max-w-[140px]">{title}</span>
            <span className="text-stone-500 font-mono">Animated Visual</span>
          </div>
        </div>
      )}
    </div>
  );
};
