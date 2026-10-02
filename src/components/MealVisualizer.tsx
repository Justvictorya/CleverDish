import React, { useState } from 'react';
import { Meal } from '../types';
import { getDishArt, type BaseKind } from '../data/dishArt';
import { Camera, Utensils, Sparkles } from 'lucide-react';

interface MealVisualizerProps {
  visualType: Meal['visualType'];
  title: string;
  proteinSource: Meal['proteinSourceType'];
  imageUrl?: string;
}

/** Shape of the starch on the plate, drawn large enough to be recognisable. */
function BaseShape({ kind, accent }: { kind: BaseKind; accent: string }) {
  switch (kind) {
    case 'flatbread':
      return (
        <div className="relative w-28 h-28 rounded-full bg-gradient-to-br from-amber-200 via-amber-100 to-stone-200 border-4 border-stone-300/70 shadow-inner">
          <span className="absolute inset-3 rounded-full border-2 border-dashed border-amber-700/25" />
        </div>
      );
    case 'rice':
      return (
        <div className="relative w-24 h-20 rounded-[45%_45%_50%_50%] bg-gradient-to-b from-white to-stone-200 border-4 border-stone-200 shadow-md">
          <span className="absolute inset-2 rounded-[40%_40%_50%_50%] bg-[radial-gradient(circle,rgba(0,0,0,0.10)_1px,transparent_1px)] [background-size:6px_6px]" />
        </div>
      );
    case 'swallow':
      return (
        <div className="relative w-24 h-20 rounded-[50%_50%_45%_45%] bg-gradient-to-b from-white to-stone-200 border-4 border-stone-200 shadow-md">
          <span className="absolute inset-3 rounded-full bg-gradient-to-b from-stone-50 to-stone-100 shadow-inner" />
        </div>
      );
    case 'oats':
      return (
        <div className="relative w-24 h-20 rounded-[50%_50%_45%_45%] bg-gradient-to-b from-amber-100 to-amber-200 border-4 border-amber-300/60 shadow-md" />
      );
    case 'beans':
      return (
        <div className="relative w-24 h-20 rounded-[50%_50%_45%_45%] bg-gradient-to-b from-amber-800 to-amber-950 border-4 border-amber-900/40 shadow-md">
          <span className="absolute inset-2 rounded-[45%] bg-[radial-gradient(circle,rgba(255,255,255,0.16)_1.5px,transparent_1.5px)] [background-size:7px_7px]" />
        </div>
      );
    case 'pasta':
      return (
        <div className="relative w-24 h-20 rounded-[50%_50%_45%_45%] bg-gradient-to-b from-amber-200 to-amber-400 border-4 border-amber-500/40 shadow-md">
          <span className="absolute inset-2 rounded-[45%] bg-[repeating-linear-gradient(45deg,rgba(255,255,255,0.28)_0_4px,transparent_4px_9px)]" />
        </div>
      );
    case 'greens':
      return (
        <div className="relative w-24 h-20 rounded-[50%_50%_45%_45%] bg-gradient-to-b from-emerald-400 to-emerald-600 border-4 border-emerald-700/40 shadow-md">
          <span className="absolute inset-2 rounded-[45%] bg-[repeating-radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.22)_0_6px,transparent_6px_13px)]" />
        </div>
      );
    case 'egg':
      return (
        <div className="relative w-24 h-20 rounded-[50%_50%_45%_45%] bg-gradient-to-b from-orange-400 to-red-500 border-4 border-red-700/40 shadow-md" />
      );
    case 'plantain':
    case 'root':
      return (
        <div className="relative w-24 h-20 rounded-[45%_45%_45%_45%] bg-gradient-to-b from-amber-400 to-amber-600 border-4 border-amber-700/40 shadow-md">
          <span className="absolute inset-3 rounded-[40%] border-2 border-amber-200/50" />
        </div>
      );
    default:
      return <div className="w-24 h-20 rounded-[50%] bg-stone-200 border-4 border-stone-300" style={{ background: accent }} />;
  }
}

export const MealVisualizer: React.FC<MealVisualizerProps> = ({
  visualType,
  title,
  proteinSource,
  imageUrl
}) => {
  const [displayMode, setDisplayMode] = useState<'photo' | 'art'>(imageUrl ? 'photo' : 'art');
  const art = getDishArt({ title, proteinSourceType: proteinSource });

  return (
    <div
      className="relative w-full rounded-2xl overflow-hidden border border-stone-200/90 shadow-sm group"
      role="img"
      aria-label={art.alt}
    >
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
            <span>Your Photo</span>
          </button>
          <button
            type="button"
            onClick={() => setDisplayMode('art')}
            className={`px-2.5 py-1 text-[11px] font-bold rounded-lg flex items-center gap-1.5 transition-all ${
              displayMode === 'art'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-white/80 hover:text-white'
            }`}
          >
            <Utensils className="w-3.5 h-3.5 text-[#7A1C2C]" />
            <span>Dish</span>
          </button>
        </div>
      )}

      {displayMode === 'photo' && imageUrl ? (
        <div className="relative w-full h-56 sm:h-64 overflow-hidden bg-stone-950">
          <img
            src={imageUrl}
            alt={title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30 pointer-events-none" />

          <div className="absolute bottom-3 inset-x-3 flex items-center justify-between text-xs text-white">
            <div className="flex items-center gap-1.5 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 max-w-[75%] truncate">
              <Sparkles className="w-3.5 h-3.5 text-[#2ECC71] shrink-0" />
              <span className="font-bold truncate">{title}</span>
            </div>
            <span className="text-[10px] font-mono bg-[#2ECC71] text-white font-extrabold px-2 py-1 rounded-lg">
              Your Photo
            </span>
          </div>
        </div>
      ) : (
        /* Dish art: big, literal food so the plate reads without any words. */
        <div className="relative w-full h-64 sm:h-72 bg-gradient-to-b from-stone-50 to-stone-100 flex items-center justify-center select-none">
          <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#7A1C2C_1px,transparent_1px)] [background-size:18px_18px]" />

          {/* Steam */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-5 pointer-events-none opacity-45 z-20">
            <span className="inline-block w-3 h-8 bg-white/80 rounded-full blur-[3px] animate-pulse" />
            <span className="inline-block w-3.5 h-10 bg-white/70 rounded-full blur-[3px] animate-pulse [animation-delay:400ms]" />
            <span className="inline-block w-3 h-7 bg-white/80 rounded-full blur-[3px] animate-pulse [animation-delay:800ms]" />
          </div>

          {/* The plate */}
          <div className="relative w-56 h-56 sm:w-60 sm:h-60 rounded-full bg-white shadow-[0_18px_40px_rgba(0,0,0,0.10),inset_0_3px_6px_rgba(0,0,0,0.05)] border-[6px] border-stone-100 flex items-center justify-center">
            <div className="absolute inset-2 rounded-full border border-dashed border-stone-200/80 pointer-events-none" />

            {/* Stew / sauce pooled in the bowl */}
            <div
              className="absolute inset-6 rounded-full shadow-inner"
              style={{
                background: art.soupy
                  ? `radial-gradient(circle at 40% 35%, ${art.sauceTo}, ${art.sauceFrom})`
                  : `radial-gradient(circle at 50% 50%, ${art.sauceTo}55, transparent 70%)`
              }}
            />

            {/* Starch */}
            <div className="absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2 z-10">
              <BaseShape kind={art.base} accent={art.sauceFrom} />
            </div>

            {/* Protein: the single largest glyph so it reads at a glance */}
            <span
              className="absolute left-1/2 top-[36%] -translate-x-1/2 -translate-y-1/2 text-[68px] leading-none z-20 drop-shadow-[0_4px_6px_rgba(0,0,0,0.30)]"
              role="presentation"
            >
              {art.protein}
            </span>

            {/* Sides */}
            {art.sides.slice(0, 2).map((side, i) => (
              <span
                key={`${side}-${i}`}
                className="absolute text-[40px] leading-none z-20 drop-shadow-[0_3px_5px_rgba(0,0,0,0.25)]"
                style={{
                  bottom: i === 0 ? '12%' : '16%',
                  left: i === 0 ? '16%' : '62%'
                }}
                role="presentation"
              >
                {side}
              </span>
            ))}

            {/* Garnish */}
            <span
              className="absolute text-[26px] leading-none z-20 opacity-90"
              style={{ top: '18%', right: '18%' }}
              role="presentation"
            >
              {art.garnish}
            </span>
          </div>

          {/* Dish name for readers; the picture carries the same information for everyone else. */}
          <div className="absolute bottom-2 inset-x-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-stone-200/80 shadow-xs">
            <span className="font-semibold text-[#7A1C2C] truncate block">{title}</span>
          </div>
        </div>
      )}
    </div>
  );
};