import React, { useEffect, useState } from 'react';
import { Bell, BellOff, X, Check, Loader2, Clock, Apple, Smartphone } from 'lucide-react';
import type { UserProfile } from '../types';
import {
  enableReminders,
  disableReminders,
  getReminderStatus,
  updateReminderTimes,
  detectBlocker,
  blockerMessage,
  notificationPermission,
  slotLabel,
  type MealSlot,
  type ReminderStatus,
  type ReminderTimes
} from '../utils/notifications';
import { soundFX } from '../utils/sound';

const SLOTS: MealSlot[] = ['morning', 'afternoon', 'evening'];

const SLOT_HINT: Record<MealSlot, string> = {
  morning: 'Start the day with today’s breakfast',
  afternoon: 'Midday fuel for your afternoon',
  evening: 'Don’t skip dinner — today’s plate is waiting'
};

interface ReminderSettingsModalProps {
  profile: UserProfile;
  isOpen: boolean;
  onClose: () => void;
}

export const ReminderSettingsModal: React.FC<ReminderSettingsModalProps> = ({
  profile,
  isOpen,
  onClose
}) => {
  const [status, setStatus] = useState<ReminderStatus | null>(null);
  const [times, setTimes] = useState<ReminderTimes>({ morning: '07:30', afternoon: '12:30', evening: '18:30' });
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<{ tone: 'ok' | 'error'; text: string } | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    let cancelled = false;
    setLoaded(false);
    setMessage(null);

    getReminderStatus(profile.id).then((result) => {
      if (cancelled) return;
      setStatus(result);
      if (result?.times) setTimes(result.times);
      setLoaded(true);
    });

    return () => {
      cancelled = true;
    };
  }, [isOpen, profile.id]);

  if (!isOpen) return null;

  const blocker = detectBlocker();
  const permission = notificationPermission();
  const isActive = Boolean(status?.active);

  const handleToggle = async () => {
    soundFX.playTap();
    setBusy(true);
    setMessage(null);

    try {
      if (isActive) {
        await disableReminders(profile.id);
        setStatus((prev) => (prev ? { ...prev, active: false, subscribed: false } : prev));
        setMessage({ tone: 'ok', text: 'Meal reminders are off.' });
      } else {
        const result = await enableReminders(profile.id, {
          country: profile.country,
          staplePreference: profile.staplePreference,
          goal: profile.goal,
          planStartDate: profile.planStartDate,
          times
        });

        if (!result.ok) {
          setMessage({ tone: 'error', text: blockerMessage(result.reason!) });
        } else {
          setStatus(result.status ?? null);
          setMessage({ tone: 'ok', text: 'Reminders are on. We’ll nudge you at mealtimes.' });
        }
      }
    } catch (err: any) {
      setMessage({ tone: 'error', text: err?.message || 'Something went wrong. Please try again.' });
    } finally {
      setBusy(false);
    }
  };

  const handleTimeChange = async (slot: MealSlot, value: string) => {
    const next = { ...times, [slot]: value };
    setTimes(next);
    if (!isActive) return;

    const ok = await updateReminderTimes(profile.id, next);
    if (!ok) setMessage({ tone: 'error', text: 'Could not save that time. Try again.' });
  };

  const timezone = status?.timezone
    || Intl.DateTimeFormat().resolvedOptions().timeZone
    || 'your local time';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden">
        <div className="bg-[#7A1C2C] text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
              <Bell className="w-5 h-5 text-[#F4A261]" />
            </div>
            <div>
              <h3 className="font-bold text-base tracking-tight">Meal Reminders 🔔</h3>
              <p className="text-xs text-white/80">Never miss breakfast, lunch or dinner</p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg text-white/80 hover:text-white flex items-center justify-center" aria-label="Close">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {blocker && (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start gap-2">
              {blocker === 'needs-installed-app' ? (
                <Apple className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              ) : (
                <Smartphone className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              )}
              <div>
                <span className="font-bold">Not quite ready: </span>
                {blockerMessage(blocker)}
              </div>
            </div>
          )}

          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="font-bold text-sm text-stone-900">Push notifications</p>
                <p className="text-xs text-stone-500">
                  {isActive ? `Firing in ${timezone}` : 'Turn on to get reminded at mealtimes'}
                </p>
              </div>
              <button
                onClick={handleToggle}
                disabled={busy || Boolean(blocker)}
                className={`relative w-14 h-8 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed shrink-0 ${
                  isActive ? 'bg-[#2ECC71]' : 'bg-stone-300'
                }`}
                aria-label={isActive ? 'Turn reminders off' : 'Turn reminders on'}
                aria-pressed={isActive}
              >
                <span
                  className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow transition-transform ${
                    isActive ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
                {busy && (
                  <Loader2 className="absolute inset-0 m-auto w-4 h-4 text-stone-600 animate-spin" />
                )}
              </button>
            </div>

            {permission === 'denied' && !blocker && (
              <p className="mt-3 text-xs text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                Notifications are blocked for this site. Re-enable them in your browser settings, then switch this back on.
              </p>
            )}
          </div>

          <div>
            <div className="flex items-center gap-1.5 mb-2.5">
              <Clock className="w-4 h-4 text-stone-400" />
              <p className="text-xs font-bold text-stone-500 uppercase tracking-wide">Remind me at</p>
            </div>
            <div className="space-y-2.5">
              {SLOTS.map((slot) => (
                <div key={slot} className="flex items-center justify-between gap-3 p-3 rounded-xl border border-stone-200 bg-white">
                  <div className="min-w-0">
                    <p className="font-bold text-sm text-stone-900">{slotLabel(slot)}</p>
                    <p className="text-xs text-stone-500 truncate">{SLOT_HINT[slot]}</p>
                  </div>
                  <input
                    type="time"
                    value={times[slot]}
                    onChange={(e) => handleTimeChange(slot, e.target.value)}
                    disabled={!isActive || busy}
                    aria-label={`${slotLabel(slot)} reminder time`}
                    className="px-2.5 py-1.5 rounded-lg border border-stone-300 text-sm font-bold text-stone-800 bg-white disabled:bg-stone-100 disabled:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#7A1C2C]/30"
                  />
                </div>
              ))}
            </div>
          </div>

          {message && (
            <div
              className={`p-3 rounded-xl text-xs flex items-start gap-2 ${
                message.tone === 'ok'
                  ? 'bg-emerald-50 border border-emerald-200 text-emerald-900'
                  : 'bg-red-50 border border-red-200 text-red-900'
              }`}
            >
              {message.tone === 'ok' && <Check className="w-4 h-4 shrink-0 mt-0.5" />}
              <span>{message.text}</span>
            </div>
          )}

          <p className="text-[11px] text-stone-400 leading-relaxed">
            {isActive
              ? 'Each reminder names the actual dish on today’s plan. Times follow your device timezone, so travelling abroad keeps working automatically.'
              : 'Reminders use your device timezone and name the real dish from today’s plan.'}
            {!loaded && ' Checking your device…'}
          </p>
        </div>

        <div className="px-6 pb-5">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-2xl bg-[#7A1C2C] text-white font-bold text-sm hover:bg-[#5E1522] transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};