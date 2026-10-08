import React, { useState, useMemo } from 'react';
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
import { UserProfile, MacroTargets, Meal } from '../types';
import { buildWeekHistory, cycleDayForDate, DayHistoryRecord } from '../data/mealHistory';
import { FoodLogEntry } from '../data/foodLog';
import { History, CheckCircle2, Layers, Sliders } from 'lucide-react';
import { soundFX } from '../utils/sound';

interface MacroHistoryProps {
  profile: UserProfile;
  macros: MacroTargets;
  /** The whole 28-day plan, so each past day can show what was on it. */
  meals: Meal[];
  /** Food-log entries for the last seven days, keyed by YYYY-MM-DD. */
  logsByDate: Record<string, FoodLogEntry[]>;
}

export type DailyCalorieRecord = DayHistoryRecord;

const typeLabel: Record<string, string> = {
  morning: 'Morning',
  afternoon: 'Afternoon',
  evening: 'Evening'
};

export const MacroHistory: React.FC<MacroHistoryProps> = ({ profile, macros, meals, logsByDate }) => {
  const [selectedDayId, setSelectedDayId] = useState<string | null>(null);
  const [chartView, setChartView] = useState<'area' | 'comparison'>('area');

  // Real weeks only: snapped plates plus hand-logged food. Days nobody recorded
  // read as zero rather than as a plausible-looking guess.
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

  const totalActualCalories = historyData.reduce((acc, curr) => acc + curr.actualCalories, 0);
  const recordedDays = historyData.filter((day) => day.actualCalories > 0);
  const averageActualCalories = recordedDays.length
    ? Math.round(totalActualCalories / recordedDays.length)
    : 0;
  const averageVariance = averageActualCalories - macros.targetCalories;
  const adherenceCount = historyData.filter((day) => day.actualCalories > 0 && Math.abs(day.delta) <= macros.targetCalories * 0.05).length;
  const recordedCount = recordedDays.length || 1;
  const adherencePercent = Math.round((adherenceCount / recordedCount) * 100);

  const highestDay = [...historyData].sort((a, b) => b.actualCalories - a.actualCalories)[0];
  const lowestDay = [...historyData].sort((a, b) => a.actualCalories - b.actualCalories)[0];

  const CustomAreaTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data: DayHistoryRecord = payload[0].payload;
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
            {data.actualCalories > 0 ? (
              <span className="text-[10px] text-[#2ECC71] bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md font-bold flex items-center gap-1 border border-emerald-100 dark:border-emerald-800">
                <CheckCircle2 className="w-3 h-3" /> Recorded
              </span>
            ) : (
              <span className="text-[10px] text-stone-500 dark:text-zinc-400 bg-stone-100 dark:bg-zinc-800 px-2 py-0.5 rounded-md font-bold">
                No record
              </span>
            )}
          </div>

          <div className="space-y-1.5 font-mono">
            <div className="flex justify-between items-center text-xs">
              <span className="text-stone-500 dark:text-zinc-400 font-sans">Consumed:</span>
              <strong className="text-emerald-600 dark:text-emerald-400 font-bold text-sm">
                {data.actualCalories.toLocaleString()} kcal
              </strong>
            </div>

            <div className="flex justify-between items-center text-xs">
              <span className="text-stone-500 dark:text-zinc-400 font-sans">Planned:</span>
              <strong className="text-stone-700 dark:text-zinc-300">
                {data.plannedCalories.toLocaleString()} kcal
              </strong>
            </div>

            <div className="flex justify-between items-center text-xs">
              <span className="text-stone-500 dark:text-zinc-400 font-sans">Target:</span>
              <strong className="text-[#7A1C2C] dark:text-rose-400">
                {data.targetCalories.toLocaleString()} kcal
              </strong>
            </div>

            <div className="flex justify-between items-center text-xs pt-1 border-t border-stone-100 dark:border-zinc-800">
              <span className="text-stone-500 dark:text-zinc-400 font-sans">Against target:</span>
              <span className={`font-bold ${isDeficit ? 'text-blue-600 dark:text-blue-400' : isSurplus ? 'text-amber-600 dark:text-amber-400' : 'text-[#2ECC71]'}`}>
                {data.actualCalories === 0
                  ? 'nothing recorded'
                  : isDeficit ? `-${absDelta} kcal (under)` : isSurplus ? `+${absDelta} kcal (over)` : '0 kcal (dead on)'}
              </span>
            </div>
          </div>

          {data.loggedEntries.length > 0 && (
            <div className="pt-2 border-t border-stone-100 dark:border-zinc-800 space-y-1 text-[11px] text-stone-500 dark:text-zinc-400">
              <span className="font-bold text-stone-600 dark:text-zinc-300">Logged by hand:</span>
              {data.loggedEntries.map((entry, index) => (
                <div key={`${entry.name}_${index}`} className="flex justify-between gap-3">
                  <span className="truncate">{entry.name}</span>
                  <span className="font-mono shrink-0">{entry.calories} kcal</span>
                </div>
              ))}
            </div>
          )}

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
              7-Day Intake History
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-stone-900 dark:text-zinc-100 tracking-tight mt-1">
            What You Actually Ate This Week
          </h3>
          <p className="text-xs text-stone-500 dark:text-zinc-400 mt-0.5">
            Snapped plates and hand-logged food against your {macros.targetCalories} kcal target. Days with nothing
            recorded show as zero — snap a plate or log a bite to fill them in.
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
            <span>Consumed</span>
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
            <span>With target</span>
          </button>
        </div>
      </div>

      {/* 4 Summary Scorecards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
        {/* 1. Average over days that have a record */}
        <div className="p-4 rounded-2xl bg-stone-50 dark:bg-zinc-850 border border-stone-200/80 dark:border-zinc-800 space-y-1">
          <span className="text-[10px] font-bold text-stone-400 dark:text-zinc-400 uppercase tracking-wider">
            Daily Average (recorded)
          </span>
          <div className="text-xl font-black text-stone-900 dark:text-zinc-100 font-mono">
            {averageActualCalories.toLocaleString()} <span className="text-xs font-normal text-stone-500">kcal/d</span>
          </div>
          <div className="text-[11px] text-stone-500 dark:text-zinc-400 flex items-center gap-1 font-mono">
            <span>{recordedDays.length} of 7 days recorded</span>
          </div>
        </div>

        {/* 2. Net Variance */}
        <div className="p-4 rounded-2xl bg-stone-50 dark:bg-zinc-850 border border-stone-200/80 dark:border-zinc-800 space-y-1">
          <span className="text-[10px] font-bold text-stone-400 dark:text-zinc-400 uppercase tracking-wider">
            Average vs Target
          </span>
          <div className={`text-xl font-black font-mono flex items-center gap-1 ${
            recordedDays.length === 0
              ? 'text-stone-400 dark:text-zinc-500'
              : averageVariance > 0 ? 'text-amber-600 dark:text-amber-400' : 'text-[#2ECC71]'
          }`}>
            {recordedDays.length === 0
              ? '—'
              : `${averageVariance > 0 ? '+' : ''}${averageVariance} kcal`}
          </div>
          <div className="text-[11px] text-stone-500 dark:text-zinc-400 font-sans">
            {recordedDays.length === 0
              ? 'Snap or log something to start'
              : profile.goal === 'lose_weight'
              ? (averageVariance <= 0 ? 'Optimal Deficit Maintained' : 'Slight Surplus Above Cut')
              : profile.goal === 'gain_muscle'
              ? (averageVariance >= 0 ? 'Growth Surplus Active' : 'Slight Under Target')
              : 'Weight Equilibrium'}
          </div>
        </div>

        {/* 3. Goal Adherence */}
        <div className="p-4 rounded-2xl bg-stone-50 dark:bg-zinc-850 border border-stone-200/80 dark:border-zinc-800 space-y-1">
          <span className="text-[10px] font-bold text-stone-400 dark:text-zinc-400 uppercase tracking-wider">
            Adherence
          </span>
          <div className={`text-xl font-black font-mono ${
            recordedDays.length === 0 ? 'text-stone-400 dark:text-zinc-500' : 'text-[#2ECC71]'
          }`}>
            {recordedDays.length === 0 ? '—' : `${adherencePercent}%`}
          </div>
          <div className="text-[11px] text-stone-500 dark:text-zinc-400">
            {recordedDays.length === 0
              ? 'No recorded days yet'
              : `${adherenceCount} of ${recordedDays.length} recorded days within ±5%`}
          </div>
        </div>

        {/* 4. Range Extreme */}
        <div className="p-4 rounded-2xl bg-stone-50 dark:bg-zinc-850 border border-stone-200/80 dark:border-zinc-800 space-y-1">
          <span className="text-[10px] font-bold text-stone-400 dark:text-zinc-400 uppercase tracking-wider">
            Weekly Range
          </span>
          <div className="text-base font-extrabold text-stone-800 dark:text-zinc-200 font-mono truncate">
            {recordedDays.length === 0
              ? '—'
              : `${lowestDay.actualCalories} - ${highestDay.actualCalories} kcal`}
          </div>
          <div className="text-[11px] text-stone-500 dark:text-zinc-400 font-sans truncate">
            {recordedDays.length === 0
              ? 'Nothing recorded this week'
              : `Peak: ${highestDay.dayName} · Low: ${lowestDay.dayName}`}
          </div>
        </div>
      </div>

      {/* CHART CONTAINER */}
      <div className="w-full h-80 pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={historyData}
            margin={{ top: 15, right: 15, left: -10, bottom: 0 }}
          >
            <defs>
              <linearGradient id="calorieActualGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2ECC71" stopOpacity={0.55} />
                <stop offset="95%" stopColor="#2ECC71" stopOpacity={0.02} />
              </linearGradient>

              <linearGradient id="caloriePlannedGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#A8A29E" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#A8A29E" stopOpacity={0.02} />
              </linearGradient>

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
                if (value === 'actualCalories') return <span className="text-stone-800 dark:text-zinc-200">Consumed (kcal)</span>;
                if (value === 'plannedCalories') return <span className="text-stone-800 dark:text-zinc-200">Planned (kcal)</span>;
                if (value === 'targetCalories') return <span className="text-stone-800 dark:text-zinc-200">Target ({macros.targetCalories} kcal)</span>;
                return value;
              }}
            />

            {/* What the plan put on the table */}
            <Area
              type="monotone"
              dataKey="plannedCalories"
              stroke="#A8A29E"
              strokeWidth={1.5}
              strokeDasharray="4 4"
              fill="url(#caloriePlannedGradient)"
              name="plannedCalories"
              isAnimationActive={true}
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

            {/* Target band, only when asked for */}
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

            {/* What was actually eaten */}
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

      {/* 7-Day Breakdown Strip */}
      <div className="pt-2 border-t border-stone-100 dark:border-zinc-800 space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-stone-700 dark:text-zinc-300">
          <span className="uppercase tracking-wider text-[11px] text-stone-500 dark:text-zinc-400">
            Day by day
          </span>
          <span className="text-[11px] text-stone-400 dark:text-zinc-500 font-normal">
            Click a day to see what was on it
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
          {historyData.map((day) => {
            const isSelected = selectedDayId === day.id;
            const isOver = day.delta > macros.targetCalories * 0.05;
            const isUnder = day.delta < -(macros.targetCalories * 0.05);
            const hasRecord = day.actualCalories > 0;

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
                  <span className="text-[10px]">
                    {day.photoVerified ? '📸' : day.loggedEntries.length > 0 ? '📝' : '—'}
                  </span>
                </div>

                <div className="text-sm font-extrabold font-mono mt-1 text-stone-900 dark:text-zinc-100">
                  {hasRecord ? day.actualCalories : '—'}
                </div>

                <div className={`text-[10px] font-mono mt-0.5 font-bold ${
                  !hasRecord ? 'text-stone-400 dark:text-zinc-500' : isOver ? 'text-amber-600 dark:text-amber-400' : isUnder ? 'text-blue-600 dark:text-blue-400' : 'text-[#2ECC71]'
                }`}>
                  {!hasRecord ? 'no record' : day.delta > 0 ? `+${day.delta} kcal` : `${day.delta} kcal`}
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected day detail — read only, built from what happened */}
        {selectedDayId && (() => {
          const activeRec = historyData.find((d) => d.id === selectedDayId);
          if (!activeRec) return null;
          const planDay = cycleDayForDate(activeRec.date, profile.planStartDate);

          return (
            <div className="p-4 bg-stone-50 dark:bg-zinc-850/80 rounded-2xl border border-stone-200 dark:border-zinc-850 space-y-3 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-stone-900 dark:text-zinc-100">
                    {activeRec.fullDate} ({activeRec.dayName})
                  </h4>
                  <p className="text-[11px] text-stone-500 dark:text-zinc-400">
                    {planDay ? `Plan day ${planDay} of 28 · ` : 'Outside the plan · '}
                    Target: {macros.targetCalories} kcal
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedDayId(null)}
                  className="text-xs text-stone-400 hover:text-stone-700 dark:hover:text-zinc-200 font-bold cursor-pointer"
                >
                  Close
                </button>
              </div>

              <div className="space-y-1.5 text-xs">
                {activeRec.planPlates.length === 0 && activeRec.loggedEntries.length === 0 && (
                  <p className="text-stone-500 dark:text-zinc-400">
                    Nothing snapped and nothing logged on this day.
                  </p>
                )}

                {activeRec.planPlates.map((plate, index) => (
                  <div
                    key={`${plate.title}_${index}`}
                    className="flex items-center justify-between gap-3 px-3 py-1.5 rounded-xl bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800"
                  >
                    <span className="truncate text-stone-700 dark:text-zinc-300">
                      <span className="text-stone-400 dark:text-zinc-500 mr-1.5">{typeLabel[plate.type] ?? plate.type}</span>
                      {plate.title}
                    </span>
                    <span className="shrink-0 font-mono font-bold text-stone-900 dark:text-zinc-100">
                      {plate.calories} kcal
                      <span className={`ml-1.5 text-[10px] font-bold ${plate.verified ? 'text-[#2ECC71]' : 'text-stone-400 dark:text-zinc-500'}`}>
                        {plate.verified ? '✓ snapped' : 'not snapped'}
                      </span>
                    </span>
                  </div>
                ))}

                {activeRec.loggedEntries.map((entry, index) => (
                  <div
                    key={`${entry.name}_${index}`}
                    className="flex items-center justify-between gap-3 px-3 py-1.5 rounded-xl bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800"
                  >
                    <span className="truncate text-stone-700 dark:text-zinc-300">
                      <span className="text-stone-400 dark:text-zinc-500 mr-1.5">Logged</span>
                      {entry.name}
                    </span>
                    <span className="shrink-0 font-mono font-bold text-[#2ECC71]">
                      +{entry.calories} kcal
                    </span>
                  </div>
                ))}

                <div className="flex items-center justify-between px-3 pt-2 font-mono text-[11px] text-stone-500 dark:text-zinc-400">
                  <span>Consumed {activeRec.actualCalories} · Planned {activeRec.plannedCalories}</span>
                  <span className="font-bold text-stone-800 dark:text-zinc-200">Target {macros.targetCalories}</span>
                </div>
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  );
};
