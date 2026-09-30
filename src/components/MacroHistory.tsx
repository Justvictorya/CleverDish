import React, { useState, useEffect } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Legend
} from 'recharts';
import { UserProfile, MacroTargets } from '../types';
import {
  History,
  TrendingDown,
  TrendingUp,
  Target,
  Sparkles,
  Flame,
  CheckCircle2,
  AlertCircle,
  Calendar,
  Layers,
  Sliders,
  ChevronRight,
  Info
} from 'lucide-react';
import { soundFX } from '../utils/sound';

interface MacroHistoryProps {
  profile: UserProfile;
  macros: MacroTargets;
}

export interface DailyCalorieRecord {
  id: string;
  dayLabel: string;
  dayName: string;
  fullDate: string;
  actualCalories: number;
  targetCalories: number;
  tdee: number;
  proteinGrams: number;
  carbsGrams: number;
  fatGrams: number;
  proteinSource: string;
  photoVerified: boolean;
  delta: number;
}

export const MacroHistory: React.FC<MacroHistoryProps> = ({ profile, macros }) => {
  const [selectedDayId, setSelectedDayId] = useState<string | null>(null);
  const [chartView, setChartView] = useState<'area' | 'comparison' | 'split'>('area');
  const [activeMetric, setActiveMetric] = useState<'calories' | 'protein' | 'carbs' | 'fat'>('calories');

  const historyStorageKey = `foodie_macro_history_${profile.id}_${profile.goal}`;

  // Generate or load 7-day trailing records
  const [historyData, setHistoryData] = useState<DailyCalorieRecord[]>(() => {
    try {
      const saved = localStorage.getItem(historyStorageKey);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }

    // Generate calibrated last 7 days leading to today
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const proteins = [
      'Atlantic Mackerel (Fish)',
      'Char-Grilled Chicken (Poultry)',
      'Garden Shakshuka (Eggs)',
      'Honey Beans Porridge (Plant)',
      'Suya Beef Skewers (Lean Beef)',
      'Pan-Seared Salmon (Fish)',
      'Pepper Turkey (Poultry)'
    ];

    const today = new Date();
    const records: DailyCalorieRecord[] = [];

    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(today.getDate() - i);
      const dayName = i === 0 ? 'Today' : days[d.getDay() === 0 ? 6 : d.getDay() - 1];
      const monthDay = d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
      const fullDate = d.toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' });

      // Calibrate realistic variance around target (+/- 4%)
      const varianceFactors = [-0.03, 0.02, -0.01, 0.04, -0.02, 0.01, 0.0];
      const factor = varianceFactors[6 - i] ?? 0;
      const actualCal = Math.round(macros.targetCalories * (1 + factor));
      const delta = actualCal - macros.targetCalories;

      records.push({
        id: `day_${7 - i}`,
        dayLabel: i === 0 ? 'Today' : monthDay,
        dayName,
        fullDate,
        actualCalories: actualCal,
        targetCalories: macros.targetCalories,
        tdee: macros.tdee,
        proteinGrams: Math.round(macros.proteinGrams * (1 + factor * 0.8)),
        carbsGrams: Math.round(macros.carbsGrams * (1 + factor * 1.1)),
        fatGrams: Math.round(macros.fatGrams * (1 + factor * 0.9)),
        proteinSource: proteins[6 - i] || 'Indigenous Protein',
        photoVerified: i < 5,
        delta
      });
    }

    return records;
  });

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem(historyStorageKey, JSON.stringify(historyData));
  }, [historyData, historyStorageKey]);

  // Aggregate 7-Day calculations
  const totalActualCalories = historyData.reduce((acc, curr) => acc + curr.actualCalories, 0);
  const averageActualCalories = Math.round(totalActualCalories / historyData.length);
  const averageVariance = averageActualCalories - macros.targetCalories;
  const adherenceCount = historyData.filter(d => Math.abs(d.delta) <= (macros.targetCalories * 0.05)).length;
  const adherencePercent = Math.round((adherenceCount / historyData.length) * 100);

  const highestDay = [...historyData].sort((a, b) => b.actualCalories - a.actualCalories)[0];
  const lowestDay = [...historyData].sort((a, b) => a.actualCalories - b.actualCalories)[0];

  // Quick edit or simulation of intake for interactive adjustments
  const handleAdjustIntake = (dayId: string, newCalories: number) => {
    soundFX.playTap();
    setHistoryData(prev => prev.map(rec => {
      if (rec.id === dayId) {
        const delta = newCalories - rec.targetCalories;
        const ratio = newCalories / rec.targetCalories;
        return {
          ...rec,
          actualCalories: newCalories,
          delta,
          proteinGrams: Math.round(macros.proteinGrams * ratio),
          carbsGrams: Math.round(macros.carbsGrams * ratio),
          fatGrams: Math.round(macros.fatGrams * ratio)
        };
      }
      return rec;
    }));
  };

  // Custom Recharts Area Tooltip
  const CustomAreaTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data: DailyCalorieRecord = payload[0].payload;
      const isDeficit = data.delta < 0;
      const isSurplus = data.delta > 0;
      const absDelta = Math.abs(data.delta);

      return (
        <div className="bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md p-4 rounded-2xl border border-stone-200 dark:border-zinc-800 shadow-xl text-xs space-y-2.5 min-w-56 font-sans">
          <div className="flex items-center justify-between border-b border-stone-100 dark:border-zinc-800 pb-2">
            <div>
              <span className="font-extrabold text-stone-900 dark:text-zinc-100 text-sm">{data.dayName}</span>
              <div className="text-[10px] text-stone-400 dark:text-zinc-500 font-mono">{data.fullDate}</div>
            </div>
            {data.photoVerified ? (
              <span className="text-[10px] text-[#2ECC71] bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md font-bold flex items-center gap-1 border border-emerald-100 dark:border-emerald-800">
                <CheckCircle2 className="w-3 h-3" /> Verified
              </span>
            ) : (
              <span className="text-[10px] text-amber-600 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-md font-bold">
                Logged
              </span>
            )}
          </div>

          <div className="space-y-1.5 font-mono">
            <div className="flex justify-between items-center text-xs">
              <span className="text-stone-500 dark:text-zinc-400 font-sans">Actual Intake:</span>
              <strong className="text-emerald-600 dark:text-emerald-400 font-bold text-sm">
                {data.actualCalories.toLocaleString()} kcal
              </strong>
            </div>

            <div className="flex justify-between items-center text-xs">
              <span className="text-stone-500 dark:text-zinc-400 font-sans">Mifflin Target:</span>
              <strong className="text-[#7A1C2C] dark:text-rose-400">
                {data.targetCalories.toLocaleString()} kcal
              </strong>
            </div>

            <div className="flex justify-between items-center text-xs pt-1 border-t border-stone-100 dark:border-zinc-800">
              <span className="text-stone-500 dark:text-zinc-400 font-sans">Daily Variance:</span>
              <span className={`font-bold ${isDeficit ? 'text-blue-600 dark:text-blue-400' : isSurplus ? 'text-amber-600 dark:text-amber-400' : 'text-[#2ECC71]'}`}>
                {isDeficit ? `-${absDelta} kcal (Deficit)` : isSurplus ? `+${absDelta} kcal (Surplus)` : '0 kcal (Dead On)'}
              </span>
            </div>
          </div>

          <div className="pt-2 border-t border-stone-100 dark:border-zinc-800 flex items-center justify-between text-[11px] text-stone-500 dark:text-zinc-400 font-sans">
            <span className="truncate">Protein Cycle:</span>
            <span className="font-semibold text-stone-800 dark:text-zinc-200 truncate max-w-32">{data.proteinSource}</span>
          </div>

          <div className="grid grid-cols-3 gap-1 pt-1 text-[10px] text-center font-mono">
            <div className="bg-stone-50 dark:bg-zinc-800 p-1 rounded">
              <div className="text-stone-400">P</div>
              <div className="font-bold text-stone-800 dark:text-zinc-200">{data.proteinGrams}g</div>
            </div>
            <div className="bg-stone-50 dark:bg-zinc-800 p-1 rounded">
              <div className="text-stone-400">C</div>
              <div className="font-bold text-stone-800 dark:text-zinc-200">{data.carbsGrams}g</div>
            </div>
            <div className="bg-stone-50 dark:bg-zinc-800 p-1 rounded">
              <div className="text-stone-400">F</div>
              <div className="font-bold text-stone-800 dark:text-zinc-200">{data.fatGrams}g</div>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white dark:bg-[#18181B] rounded-3xl border border-stone-200/90 dark:border-zinc-800 shadow-sm p-6 space-y-6 transition-colors">
      {/* Header and Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-stone-400 dark:text-zinc-400 uppercase tracking-widest flex items-center gap-1.5">
              <History className="w-3.5 h-3.5 text-[#7A1C2C] dark:text-rose-400" />
              7-Day Macro History & Energy Balance
            </span>
            <span className="text-stone-300 dark:text-zinc-700">·</span>
            <span className="text-xs font-bold text-[#2ECC71] bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-800">
              Recharts AreaChart
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-stone-900 dark:text-zinc-100 tracking-tight mt-1">
            Daily Calorie Intake vs Target Baseline
          </h3>
          <p className="text-xs text-stone-500 dark:text-zinc-400 mt-0.5">
            Trailing 7-day adherence tracking calibrated against your Mifflin-St Jeor daily ceiling ({macros.targetCalories} kcal).
          </p>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-stone-100 dark:bg-zinc-800/80 rounded-2xl text-xs font-bold self-start md:self-auto">
          <button
            type="button"
            onClick={() => {
              soundFX.playTap();
              setChartView('area');
            }}
            className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
              chartView === 'area'
                ? 'bg-white dark:bg-zinc-900 text-stone-900 dark:text-zinc-100 shadow-xs'
                : 'text-stone-500 dark:text-zinc-400 hover:text-stone-900 dark:hover:text-zinc-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-[#2ECC71]" />
            <span>Smooth Area</span>
          </button>

          <button
            type="button"
            onClick={() => {
              soundFX.playTap();
              setChartView('comparison');
            }}
            className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
              chartView === 'comparison'
                ? 'bg-white dark:bg-zinc-900 text-stone-900 dark:text-zinc-100 shadow-xs'
                : 'text-stone-500 dark:text-zinc-400 hover:text-stone-900 dark:hover:text-zinc-200'
            }`}
          >
            <Sliders className="w-3.5 h-3.5 text-[#7A1C2C] dark:text-rose-400" />
            <span>Target Band</span>
          </button>
        </div>
      </div>

      {/* 4 Summary Scorecards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
        {/* 1. 7-Day Average */}
        <div className="p-4 rounded-2xl bg-stone-50 dark:bg-zinc-850 border border-stone-200/80 dark:border-zinc-800 space-y-1">
          <span className="text-[10px] font-bold text-stone-400 dark:text-zinc-400 uppercase tracking-wider">
            7-Day Calorie Average
          </span>
          <div className="text-xl font-black text-stone-900 dark:text-zinc-100 font-mono">
            {averageActualCalories.toLocaleString()} <span className="text-xs font-normal text-stone-500">kcal/d</span>
          </div>
          <div className="text-[11px] text-stone-500 dark:text-zinc-400 flex items-center gap-1 font-mono">
            <span>Target: {macros.targetCalories} kcal</span>
          </div>
        </div>

        {/* 2. Net Variance */}
        <div className="p-4 rounded-2xl bg-stone-50 dark:bg-zinc-850 border border-stone-200/80 dark:border-zinc-800 space-y-1">
          <span className="text-[10px] font-bold text-stone-400 dark:text-zinc-400 uppercase tracking-wider">
            Average Delta
          </span>
          <div className={`text-xl font-black font-mono flex items-center gap-1 ${
            averageVariance > 0 ? 'text-amber-600 dark:text-amber-400' : 'text-[#2ECC71]'
          }`}>
            {averageVariance > 0 ? `+${averageVariance}` : averageVariance} <span className="text-xs font-normal">kcal</span>
          </div>
          <div className="text-[11px] text-stone-500 dark:text-zinc-400 font-sans">
            {profile.goal === 'lose_weight'
              ? (averageVariance <= 0 ? 'Optimal Deficit Maintained' : 'Slight Surplus Above Cut')
              : profile.goal === 'gain_muscle'
              ? (averageVariance >= 0 ? 'Growth Surplus Active' : 'Slight Under Target')
              : 'Weight Equilibrium'}
          </div>
        </div>

        {/* 3. Goal Adherence */}
        <div className="p-4 rounded-2xl bg-stone-50 dark:bg-zinc-850 border border-stone-200/80 dark:border-zinc-800 space-y-1">
          <span className="text-[10px] font-bold text-stone-400 dark:text-zinc-400 uppercase tracking-wider">
            7-Day Adherence
          </span>
          <div className="text-xl font-black text-[#2ECC71] font-mono">
            {adherencePercent}%
          </div>
          <div className="text-[11px] text-stone-500 dark:text-zinc-400">
            {adherenceCount} of 7 days within ±5%
          </div>
        </div>

        {/* 4. Range Extreme */}
        <div className="p-4 rounded-2xl bg-stone-50 dark:bg-zinc-850 border border-stone-200/80 dark:border-zinc-800 space-y-1">
          <span className="text-[10px] font-bold text-stone-400 dark:text-zinc-400 uppercase tracking-wider">
            Weekly Range
          </span>
          <div className="text-base font-extrabold text-stone-800 dark:text-zinc-200 font-mono truncate">
            {lowestDay.actualCalories} - {highestDay.actualCalories} <span className="text-xs font-normal">kcal</span>
          </div>
          <div className="text-[11px] text-stone-500 dark:text-zinc-400 font-sans truncate">
            Peak: {highestDay.dayName} · Low: {lowestDay.dayName}
          </div>
        </div>
      </div>

      {/* RECHARTS AREA CHART CONTAINER */}
      <div className="w-full h-80 pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={historyData}
            margin={{ top: 15, right: 15, left: -10, bottom: 0 }}
          >
            <defs>
              {/* Vibrant Emerald Gradient for Actual Calorie Intake */}
              <linearGradient id="calorieActualGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2ECC71" stopOpacity={0.55} />
                <stop offset="95%" stopColor="#2ECC71" stopOpacity={0.02} />
              </linearGradient>

              {/* Deep Maroon Gradient for Target Calorie Ceiling */}
              <linearGradient id="calorieTargetGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7A1C2C" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#7A1C2C" stopOpacity={0.01} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#E5E7EB"
              className="dark:stroke-zinc-800"
            />

            <XAxis
              dataKey="dayLabel"
              tickLine={false}
              axisLine={{ stroke: '#E5E7EB' }}
              tick={{ fill: '#71717A', fontSize: 11, fontWeight: 600 }}
              dy={10}
            />

            <YAxis
              domain={['auto', 'auto']}
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#71717A', fontSize: 11, fontFamily: 'monospace' }}
              tickFormatter={(v) => `${v}`}
              dx={-5}
            />

            <Tooltip content={<CustomAreaTooltip />} />

            <Legend
              verticalAlign="top"
              align="right"
              iconType="circle"
              wrapperStyle={{ paddingBottom: 15, fontSize: 12, fontWeight: 600 }}
              formatter={(value) => {
                if (value === 'actualCalories') return <span className="text-stone-800 dark:text-zinc-200">Actual Intake (kcal)</span>;
                if (value === 'targetCalories') return <span className="text-stone-800 dark:text-zinc-200">Mifflin Target ({macros.targetCalories} kcal)</span>;
                return value;
              }}
            />

            {/* Target Baseline Reference Line */}
            <ReferenceLine
              y={macros.targetCalories}
              stroke="#7A1C2C"
              strokeDasharray="4 4"
              strokeWidth={2}
              label={{
                value: `Target: ${macros.targetCalories} kcal`,
                fill: '#7A1C2C',
                position: 'insideTopLeft',
                fontSize: 10,
                fontWeight: 700
              }}
            />

            {/* Target Band Area */}
            {chartView === 'comparison' && (
              <Area
                type="monotone"
                dataKey="targetCalories"
                stroke="#7A1C2C"
                strokeWidth={2}
                strokeDasharray="3 3"
                fill="url(#calorieTargetGradient)"
                name="targetCalories"
                isAnimationActive={true}
              />
            )}

            {/* Actual Daily Intake Area Curve */}
            <Area
              type="monotone"
              dataKey="actualCalories"
              stroke="#2ECC71"
              strokeWidth={3}
              fill="url(#calorieActualGradient)"
              activeDot={{
                r: 7,
                fill: '#2ECC71',
                stroke: '#FFFFFF',
                strokeWidth: 2,
                className: 'animate-pulse'
              }}
              name="actualCalories"
              isAnimationActive={true}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* 7-Day Interactive Day Breakdown Strip */}
      <div className="pt-2 border-t border-stone-100 dark:border-zinc-800 space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-stone-700 dark:text-zinc-300">
          <span className="uppercase tracking-wider text-[11px] text-stone-500 dark:text-zinc-400">
            Interactive Day Inspector & Simulated Intake Adjuster
          </span>
          <span className="text-[11px] text-stone-400 dark:text-zinc-500 font-normal">
            Click any day to inspect details or test variations
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
          {historyData.map((day) => {
            const isSelected = selectedDayId === day.id;
            const isOver = day.delta > (macros.targetCalories * 0.05);
            const isUnder = day.delta < -(macros.targetCalories * 0.05);

            return (
              <div
                key={day.id}
                onClick={() => {
                  soundFX.playTap();
                  setSelectedDayId(isSelected ? null : day.id);
                }}
                className={`p-3 rounded-2xl border text-xs cursor-pointer transition-all ${
                  isSelected
                    ? 'border-[#7A1C2C] dark:border-rose-400 bg-[#7A1C2C]/5 dark:bg-[#7A1C2C]/20 ring-1 ring-[#7A1C2C] dark:ring-rose-400 shadow-xs'
                    : 'border-stone-200 dark:border-zinc-800 bg-stone-50/60 dark:bg-zinc-850 hover:border-stone-300 dark:hover:border-zinc-700'
                }`}
              >
                <div className="flex items-center justify-between font-bold text-stone-800 dark:text-zinc-200">
                  <span>{day.dayName}</span>
                  {day.photoVerified ? (
                    <span className="text-[10px] text-[#2ECC71]">📸</span>
                  ) : (
                    <span className="text-[10px] text-stone-400">📝</span>
                  )}
                </div>

                <div className="text-sm font-extrabold font-mono mt-1 text-stone-900 dark:text-zinc-100">
                  {day.actualCalories}
                </div>

                <div className={`text-[10px] font-mono mt-0.5 font-bold ${
                  isOver ? 'text-amber-600 dark:text-amber-400' : isUnder ? 'text-blue-600 dark:text-blue-400' : 'text-[#2ECC71]'
                }`}>
                  {day.delta > 0 ? `+${day.delta}` : day.delta === 0 ? '0' : day.delta} kcal
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Day Quick Adjustment Drawer */}
        {selectedDayId && (
          <div className="p-4 bg-stone-50 dark:bg-zinc-850/80 rounded-2xl border border-stone-200 dark:border-zinc-850 space-y-3 animate-in fade-in duration-200">
            {(() => {
              const activeRec = historyData.find(d => d.id === selectedDayId);
              if (!activeRec) return null;

              return (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-sm text-stone-900 dark:text-zinc-100">
                        {activeRec.fullDate} ({activeRec.dayName})
                      </h4>
                      <p className="text-[11px] text-stone-500 dark:text-zinc-400">
                        Protein Rotation: <strong>{activeRec.proteinSource}</strong> · Target: {macros.targetCalories} kcal
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelectedDayId(null)}
                      className="text-xs text-stone-400 hover:text-stone-700 dark:hover:text-zinc-200 font-bold"
                    >
                      Close
                    </button>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-4 text-xs font-mono">
                    <span className="text-stone-600 dark:text-zinc-400 font-sans shrink-0">
                      Simulate / Adjust Calories:
                    </span>
                    <input
                      type="range"
                      min={Math.round(macros.targetCalories * 0.7)}
                      max={Math.round(macros.targetCalories * 1.3)}
                      step={25}
                      value={activeRec.actualCalories}
                      onChange={(e) => handleAdjustIntake(activeRec.id, Number(e.target.value))}
                      className="w-full accent-[#2ECC71] cursor-pointer"
                    />
                    <span className="font-extrabold text-stone-900 dark:text-zinc-100 text-sm shrink-0 min-w-20 text-right">
                      {activeRec.actualCalories} kcal
                    </span>
                  </div>
                </div>
              );
            })()}
          </div>
        )}
      </div>
    </div>
  );
};
