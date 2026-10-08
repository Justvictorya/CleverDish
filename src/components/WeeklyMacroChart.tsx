import React, { useMemo, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceLine
} from 'recharts';
import { UserProfile, MacroTargets, Meal } from '../types';
import { buildWeekHistory } from '../data/mealHistory';
import { FoodLogEntry } from '../data/foodLog';
import { BarChart3, Info, CheckCircle2, AlertCircle } from 'lucide-react';

interface WeeklyMacroChartProps {
  profile: UserProfile;
  macros: MacroTargets;
  /** The whole plan, so each bar reflects the plates that day actually held. */
  meals: Meal[];
  /** Hand-logged food for the last seven days, keyed by YYYY-MM-DD. */
  logsByDate: Record<string, FoodLogEntry[]>;
}

export const WeeklyMacroChart: React.FC<WeeklyMacroChartProps> = ({ profile, macros, meals, logsByDate }) => {
  const [viewMode, setViewMode] = useState<'macros' | 'stacked' | 'calories'>('macros');

  // Brand Palette Constants
  const COLOR_PROTEIN = '#7A1C2C'; // Deep Maroon brand color
  const COLOR_CARBS = '#2ECC71';   // Vibrant Mint Green action/success color
  const COLOR_FAT = '#E67E22';     // Warm Amber
  const COLOR_FIBER = '#3498DB';   // Accent Blue

  const historyData = useMemo(
    () =>
      buildWeekHistory({
        today: new Date(),
        planStartDate: profile.planStartDate,
        meals,
        macros,
        logsByDate
      }),
    [profile.planStartDate, meals, macros, logsByDate]
  );

  // Bars plot what was eaten. A day nobody snapped or logged draws at zero,
  // which is what the chart used to hide by inventing a week instead.
  const weeklyData = historyData.map((record) => ({
    day: record.dayName,
    fullDay: record.fullDate,
    protein: record.proteinGrams,
    carbs: record.carbsGrams,
    fat: record.fatGrams,
    fiber: record.fiberGrams,
    calories: record.actualCalories,
    plannedCalories: record.plannedCalories,
    verifiedPlate: record.photoVerified,
    loggedCount: record.loggedEntries.length,
    recorded: record.actualCalories > 0
  }));

  const recordedDays = historyData.filter((day) => day.actualCalories > 0);
  const calorieHits = recordedDays.filter(
    (day) => Math.abs(day.actualCalories - macros.targetCalories) <= macros.targetCalories * 0.05
  ).length;
  const proteinHits = recordedDays.filter((day) => day.proteinGrams >= macros.proteinGrams * 0.9).length;
  const calorieAdherence = recordedDays.length ? Math.round((calorieHits / recordedDays.length) * 100) : null;
  const proteinAdherence = recordedDays.length ? Math.round((proteinHits / recordedDays.length) * 100) : null;
  const averageFiber = recordedDays.length
    ? Math.round(recordedDays.reduce((sum, day) => sum + day.fiberGrams, 0) / recordedDays.length)
    : null;

  // Custom high-contrast tooltip adhering to brand style
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const dataPoint = payload[0].payload as (typeof weeklyData)[number];
      return (
        <div className="bg-stone-900 text-white p-3.5 rounded-2xl shadow-xl border border-stone-700/80 text-xs font-sans space-y-2 min-w-[200px]">
          <div className="border-b border-stone-700 pb-1.5">
            <div className="font-bold text-sm text-stone-100">{dataPoint.fullDay}</div>
            <div className="text-[10px] text-stone-400 font-mono">
              Eaten: {dataPoint.calories} kcal · Planned: {dataPoint.plannedCalories} kcal · Target: {macros.targetCalories} kcal
            </div>
          </div>

          <div className="space-y-1 font-mono text-[11px]">
            <div className="flex justify-between items-center text-stone-200">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#7A1C2C]" />
                <span>Protein</span>
              </span>
              <span className="font-bold">{dataPoint.protein}g</span>
            </div>

            <div className="flex justify-between items-center text-stone-200">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#2ECC71]" />
                <span>Carbs</span>
              </span>
              <span className="font-bold">{dataPoint.carbs}g</span>
            </div>

            <div className="flex justify-between items-center text-stone-200">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#E67E22]" />
                <span>Fat</span>
              </span>
              <span className="font-bold">{dataPoint.fat}g</span>
            </div>

            <div className="flex justify-between items-center text-stone-200">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#3498DB]" />
                <span>Fiber</span>
              </span>
              <span className="font-bold">{dataPoint.fiber}g</span>
            </div>
          </div>

          <div className="pt-1.5 border-t border-stone-800 flex items-center justify-between text-[10px]">
            <span className="text-stone-400">Record:</span>
            {dataPoint.verifiedPlate ? (
              <span className="text-[#2ECC71] font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Plate snapped
              </span>
            ) : dataPoint.loggedCount > 0 ? (
              <span className="text-amber-400 font-medium flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {dataPoint.loggedCount} logged by hand
              </span>
            ) : (
              <span className="text-stone-400 font-medium">Nothing recorded</span>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-3xl border border-stone-200/90 shadow-xs p-6 space-y-5">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#7A1C2C]/10 text-[#7A1C2C] flex items-center justify-center font-bold">
              <BarChart3 className="w-4 h-4" />
            </div>
            <h3 className="font-extrabold text-base text-stone-900 tracking-tight">
              Weekly Macro Distribution
            </h3>
            <span className="text-stone-300">·</span>
            <span className="text-xs font-mono text-stone-500">{recordedDays.length}/7 days recorded</span>
          </div>
          <p className="text-xs text-stone-500">
            Protein, carbs and fat from the plates you snapped and the food you logged.
          </p>
        </div>

        {/* Interactive View Controls (Segmented Tabs) */}
        <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-xl self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setViewMode('macros')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
              viewMode === 'macros'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-500 hover:text-stone-900'
            }`}
          >
            Grouped Macros
          </button>

          <button
            type="button"
            onClick={() => setViewMode('stacked')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
              viewMode === 'stacked'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-500 hover:text-stone-900'
            }`}
          >
            Stacked Proportions
          </button>

          <button
            type="button"
            onClick={() => setViewMode('calories')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
              viewMode === 'calories'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-500 hover:text-stone-900'
            }`}
          >
            Calorie Variance
          </button>
        </div>
      </div>

      {/* Chart Canvas Container */}
      <div className="w-full h-72 sm:h-80 select-none">
        <ResponsiveContainer width="100%" height="100%">
          {viewMode === 'calories' ? (
            <BarChart data={weeklyData} margin={{ top: 15, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0F0F0" />
              <XAxis
                dataKey="day"
                tick={{ fill: '#78716C', fontSize: 11, fontFamily: 'Plus Jakarta Sans' }}
                axisLine={{ stroke: '#E7E5E4' }}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: '#78716C', fontSize: 11, fontFamily: 'JetBrains Mono' }}
                axisLine={false}
                tickLine={false}
                domain={[0, 'dataMax + 400']}
              />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine
                y={macros.targetCalories}
                stroke="#7A1C2C"
                strokeDasharray="4 4"
                label={{
                  value: `Target: ${macros.targetCalories} kcal`,
                  fill: '#7A1C2C',
                  fontSize: 10,
                  position: 'top',
                  fontFamily: 'JetBrains Mono'
                }}
              />
              <Bar
                dataKey="calories"
                name="Eaten (kcal)"
                fill={COLOR_PROTEIN}
                radius={[6, 6, 0, 0]}
                maxBarSize={45}
              />
            </BarChart>
          ) : (
            <BarChart
              data={weeklyData}
              margin={{ top: 15, right: 10, left: -20, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0F0F0" />
              <XAxis
                dataKey="day"
                tick={{ fill: '#78716C', fontSize: 11, fontFamily: 'Plus Jakarta Sans' }}
                axisLine={{ stroke: '#E7E5E4' }}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: '#78716C', fontSize: 11, fontFamily: 'JetBrains Mono' }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                verticalAlign="top"
                align="right"
                iconType="circle"
                wrapperStyle={{ paddingBottom: '12px', fontSize: '11px', fontFamily: 'Plus Jakarta Sans' }}
              />
              <ReferenceLine
                y={macros.proteinGrams}
                stroke={COLOR_PROTEIN}
                strokeDasharray="3 3"
                label={{
                  value: `Protein Floor: ${macros.proteinGrams}g`,
                  fill: COLOR_PROTEIN,
                  fontSize: 10,
                  position: 'insideTopLeft',
                  fontFamily: 'JetBrains Mono'
                }}
              />
              <Bar
                dataKey="protein"
                name="Protein (g)"
                fill={COLOR_PROTEIN}
                stackId={viewMode === 'stacked' ? 'macros' : undefined}
                radius={viewMode === 'stacked' ? [0, 0, 0, 0] : [4, 4, 0, 0]}
                maxBarSize={viewMode === 'stacked' ? 40 : 16}
              />
              <Bar
                dataKey="carbs"
                name="Carbs (g)"
                fill={COLOR_CARBS}
                stackId={viewMode === 'stacked' ? 'macros' : undefined}
                radius={viewMode === 'stacked' ? [0, 0, 0, 0] : [4, 4, 0, 0]}
                maxBarSize={viewMode === 'stacked' ? 40 : 16}
              />
              <Bar
                dataKey="fat"
                name="Fat (g)"
                fill={COLOR_FAT}
                stackId={viewMode === 'stacked' ? 'macros' : undefined}
                radius={viewMode === 'stacked' ? [0, 0, 0, 0] : [4, 4, 0, 0]}
                maxBarSize={viewMode === 'stacked' ? 40 : 16}
              />
              <Bar
                dataKey="fiber"
                name="Fiber (g)"
                fill={COLOR_FIBER}
                stackId={viewMode === 'stacked' ? 'macros' : undefined}
                radius={viewMode === 'stacked' ? [6, 6, 0, 0] : [4, 4, 0, 0]}
                maxBarSize={viewMode === 'stacked' ? 40 : 16}
              />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Metric Breakdown Badges */}
      <div className="pt-3 border-t border-stone-100 flex flex-wrap items-center justify-between gap-4 text-xs text-stone-600">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 font-semibold text-stone-900">
            <span className="w-2.5 h-2.5 rounded-full bg-[#7A1C2C]" />
            Protein hit on {proteinAdherence === null ? '—' : `${proteinAdherence}%`} of recorded days
          </span>
          <span className="text-stone-300">·</span>
          <span className="flex items-center gap-1.5 font-semibold text-stone-900">
            <span className="w-2.5 h-2.5 rounded-full bg-[#2ECC71]" />
            Within 5% of target on {calorieAdherence === null ? '—' : `${calorieAdherence}%`}
          </span>
          <span className="text-stone-300">·</span>
          <span className="flex items-center gap-1.5 text-stone-500 font-mono">
            Avg fiber: {averageFiber === null ? '—' : `${averageFiber}g`}/day (snapped plates)
          </span>
        </div>

        <div className="text-[11px] text-stone-400 font-mono flex items-center gap-1">
          <Info className="w-3.5 h-3.5 text-stone-400" />
          <span>{recordedDays.length === 0 ? 'Snap a plate or log food to fill this in' : 'Counted from recorded days only'}</span>
        </div>
      </div>
    </div>
  );
};
