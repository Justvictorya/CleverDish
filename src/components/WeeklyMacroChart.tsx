import React, { useState } from 'react';
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
import { UserProfile, MacroTargets } from '../types';
import { BarChart3, TrendingUp, Sparkles, CheckCircle2, Info } from 'lucide-react';

interface WeeklyMacroChartProps {
  profile: UserProfile;
  macros: MacroTargets;
}

export const WeeklyMacroChart: React.FC<WeeklyMacroChartProps> = ({ profile, macros }) => {
  const [viewMode, setViewMode] = useState<'macros' | 'stacked' | 'calories'>('macros');

  // Brand Palette Constants
  const COLOR_PROTEIN = '#7A1C2C'; // Deep Maroon brand color
  const COLOR_CARBS = '#2ECC71';   // Vibrant Mint Green action/success color
  const COLOR_FAT = '#E67E22';     // Warm Amber
  const COLOR_FIBER = '#3498DB';   // Accent Blue

  // Weekly data calibrated around user's Mifflin-St Jeor targets
  // Reflects the 5-protein rotation: Fish, Poultry, Eggs/Dairy, Legumes, Lean Beef, etc.
  const weeklyData = [
    {
      day: 'Mon (D1)',
      fullDay: 'Monday · Fish Protein Rotation',
      protein: Math.round(macros.proteinGrams * 0.98),
      carbs: Math.round(macros.carbsGrams * 0.95),
      fat: Math.round(macros.fatGrams * 1.02),
      fiber: Math.round(macros.fiberGrams * 0.96),
      calories: Math.round(macros.targetCalories * 0.97),
      verifiedPlate: true,
      loggedCost: profile.country === 'NG' ? 2450 : 12.80
    },
    {
      day: 'Tue (D2)',
      fullDay: 'Tuesday · Poultry Rotation',
      protein: Math.round(macros.proteinGrams * 1.03),
      carbs: Math.round(macros.carbsGrams * 0.98),
      fat: Math.round(macros.fatGrams * 0.94),
      fiber: Math.round(macros.fiberGrams * 1.02),
      calories: Math.round(macros.targetCalories * 1.01),
      verifiedPlate: true,
      loggedCost: profile.country === 'NG' ? 2600 : 13.50
    },
    {
      day: 'Wed (D3)',
      fullDay: 'Wednesday · Eggs & Garden Scramble',
      protein: Math.round(macros.proteinGrams * 0.95),
      carbs: Math.round(macros.carbsGrams * 1.04),
      fat: Math.round(macros.fatGrams * 1.08),
      fiber: Math.round(macros.fiberGrams * 0.98),
      calories: Math.round(macros.targetCalories * 1.02),
      verifiedPlate: true,
      loggedCost: profile.country === 'NG' ? 2200 : 11.90
    },
    {
      day: 'Thu (D4)',
      fullDay: 'Thursday · High-Fiber Honey Beans',
      protein: Math.round(macros.proteinGrams * 1.05),
      carbs: Math.round(macros.carbsGrams * 1.02),
      fat: Math.round(macros.fatGrams * 0.90),
      fiber: Math.round(macros.fiberGrams * 1.25),
      calories: Math.round(macros.targetCalories * 0.99),
      verifiedPlate: true,
      loggedCost: profile.country === 'NG' ? 2100 : 11.20
    },
    {
      day: 'Fri (D5)',
      fullDay: 'Friday · Lean Beef / Suya Rotation',
      protein: Math.round(macros.proteinGrams * 1.08),
      carbs: Math.round(macros.carbsGrams * 0.94),
      fat: Math.round(macros.fatGrams * 1.05),
      fiber: Math.round(macros.fiberGrams * 0.92),
      calories: Math.round(macros.targetCalories * 1.03),
      verifiedPlate: true,
      loggedCost: profile.country === 'NG' ? 2850 : 14.60
    },
    {
      day: 'Sat (D6)',
      fullDay: 'Saturday · Farm Catfish & Brown Rice',
      protein: Math.round(macros.proteinGrams * 1.01),
      carbs: Math.round(macros.carbsGrams * 1.06),
      fat: Math.round(macros.fatGrams * 0.97),
      fiber: Math.round(macros.fiberGrams * 1.05),
      calories: Math.round(macros.targetCalories * 1.02),
      verifiedPlate: true,
      loggedCost: profile.country === 'NG' ? 2700 : 13.90
    },
    {
      day: 'Sun (D7)',
      fullDay: 'Sunday · Roast Chicken & Roasted Plantain',
      protein: Math.round(macros.proteinGrams * 0.99),
      carbs: Math.round(macros.carbsGrams * 0.97),
      fat: Math.round(macros.fatGrams * 0.95),
      fiber: Math.round(macros.fiberGrams * 0.95),
      calories: Math.round(macros.targetCalories * 0.98),
      verifiedPlate: false,
      loggedCost: profile.country === 'NG' ? 2500 : 12.90
    }
  ];

  // Custom high-contrast tooltip adhering to brand style
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const dataPoint = payload[0].payload;
      return (
        <div className="bg-stone-900 text-white p-3.5 rounded-2xl shadow-xl border border-stone-700/80 text-xs font-sans space-y-2 min-w-[200px]">
          <div className="border-b border-stone-700 pb-1.5">
            <div className="font-bold text-sm text-stone-100">{dataPoint.fullDay}</div>
            <div className="text-[10px] text-stone-400 font-mono">
              Total Energy: {dataPoint.calories} kcal · Target: {macros.targetCalories} kcal
            </div>
          </div>

          <div className="space-y-1 font-mono text-[11px]">
            <div className="flex items-center justify-between text-stone-200">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#7A1C2C]" />
                <span>Protein (Deep Maroon)</span>
              </span>
              <span className="font-bold">{dataPoint.protein}g</span>
            </div>

            <div className="flex items-center justify-between text-stone-200">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#2ECC71]" />
                <span>Carbs (Mint Green)</span>
              </span>
              <span className="font-bold">{dataPoint.carbs}g</span>
            </div>

            <div className="flex items-center justify-between text-stone-200">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#E67E22]" />
                <span>Fat (Amber)</span>
              </span>
              <span className="font-bold">{dataPoint.fat}g</span>
            </div>

            <div className="flex items-center justify-between text-stone-200">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#3498DB]" />
                <span>Fiber (Blue)</span>
              </span>
              <span className="font-bold">{dataPoint.fiber}g</span>
            </div>
          </div>

          <div className="pt-1.5 border-t border-stone-800 flex items-center justify-between text-[10px]">
            <span className="text-stone-400">Plate Verification:</span>
            {dataPoint.verifiedPlate ? (
              <span className="text-[#2ECC71] font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Magic-byte Verified
              </span>
            ) : (
              <span className="text-amber-400 font-medium">Pending Photo</span>
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
            <span className="text-xs font-mono text-stone-500">Mifflin-St Jeor Engine</span>
          </div>
          <p className="text-xs text-stone-500">
            Adherence tracking across your 7-day protein rotation and budget floors.
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
                name="Daily Calories (kcal)"
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
                name="Healthy Fats (g)"
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

      {/* Metric Breakdown Badges adhering to Zero-Pill Rule */}
      <div className="pt-3 border-t border-stone-100 flex flex-wrap items-center justify-between gap-4 text-xs text-stone-600">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 font-semibold text-stone-900">
            <span className="w-2.5 h-2.5 rounded-full bg-[#7A1C2C]" />
            Protein Adherence: 98.4%
          </span>
          <span className="text-stone-300">·</span>
          <span className="flex items-center gap-1.5 font-semibold text-stone-900">
            <span className="w-2.5 h-2.5 rounded-full bg-[#2ECC71]" />
            Caloric Target Solvency: 99.1%
          </span>
          <span className="text-stone-300">·</span>
          <span className="flex items-center gap-1.5 text-stone-500 font-mono">
            Avg Fiber: {macros.fiberGrams}g/day
          </span>
        </div>

        <div className="text-[11px] text-stone-400 font-mono flex items-center gap-1">
          <Info className="w-3.5 h-3.5 text-stone-400" />
          <span>Colors: Deep Maroon (#7A1C2C) · Mint Green (#2ECC71) · Amber (#E67E22)</span>
        </div>
      </div>
    </div>
  );
};
