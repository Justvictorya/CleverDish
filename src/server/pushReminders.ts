/**
 * Meal-time push reminders.
 *
 * Users opt in from the app, which registers a Web Push subscription against
 * the VAPID public key. A scheduler walks the stored subscriptions once a
 * minute and fires a notification when a subscriber's *local* clock reaches
 * their chosen morning / afternoon / evening time, so the reminder lands at
 * breakfast in Lagos and dinner in London without any timezone bookkeeping on
 * the client.
 */
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import webpush from 'web-push';
import type { CountryCode, StaplePreference } from '../types';
import { generate28DayPlan } from '../data/rotationPlans';

export type MealSlot = 'morning' | 'afternoon' | 'evening';

export const DEFAULT_REMINDER_TIMES: Record<MealSlot, string> = {
  morning: '07:30',
  afternoon: '12:30',
  evening: '18:30'
};

const SLOT_LABEL: Record<MealSlot, string> = {
  morning: 'Breakfast',
  afternoon: 'Lunch',
  evening: 'Dinner'
};

interface PushSubscriptionRecord {
  subscription: webpush.PushSubscription;
  timezone: string;
  country: CountryCode;
  staplePreference: StaplePreference;
  planStartDate?: string;
  times: Record<MealSlot, string>;
  enabled: boolean;
  /** Local date (YYYY-MM-DD) per slot, so each reminder fires once per day. */
  lastSent: Partial<Record<MealSlot, string>>;
  createdAt: number;
}

type SubscriptionStore = Record<string, PushSubscriptionRecord>;

/** How late a reminder may still fire, e.g. after the server was asleep. */
const CATCH_UP_MINUTES = 45;
const TICK_MS = 60_000;

export class ReminderService {
  private storeFile: string;
  private vapidReady = false;
  private timer: NodeJS.Timeout | null = null;
  private sending = false;

  constructor(dataDir: string) {
    this.storeFile = path.resolve(dataDir, 'push-subscriptions.json');
  }

  /**
   * Prefer VAPID keys from the environment. Falling back to a generated pair
   * persisted on disk keeps local runs working, but those keys are only stable
   * while DATA_DIR survives — on Render the env vars are the real answer.
   */
  init(): { ready: boolean; source: string; publicKey: string | null } {
    let publicKey = process.env.VAPID_PUBLIC_KEY;
    let privateKey = process.env.VAPID_PRIVATE_KEY;
    let source = 'environment';

    if (!publicKey || !privateKey) {
      const keyFile = path.join(path.dirname(this.storeFile), '.vapid-keys.json');
      try {
        if (fs.existsSync(keyFile)) {
          const saved = JSON.parse(fs.readFileSync(keyFile, 'utf-8'));
          publicKey = publicKey || saved.publicKey;
          privateKey = privateKey || saved.privateKey;
          source = 'persisted';
        } else {
          const generated = webpush.generateVAPIDKeys();
          publicKey = publicKey || generated.publicKey;
          privateKey = privateKey || generated.privateKey;
          fs.writeFileSync(keyFile, JSON.stringify({ publicKey, privateKey }, null, 2), { mode: 0o600 });
          source = 'generated';
        }
      } catch (err: any) {
        console.warn('[push] could not resolve VAPID keys:', err?.message || err);
      }
    }

    const subject = process.env.VAPID_SUBJECT || 'mailto:support@cleverdish.app';
    if (publicKey && privateKey) {
      webpush.setVapidDetails(subject, publicKey, privateKey);
      this.vapidReady = true;
    } else {
      console.warn('[push] VAPID keys missing — push reminders are disabled.');
    }

    return { ready: this.vapidReady, source, publicKey: publicKey || null };
  }

  get isReady(): boolean {
    return this.vapidReady;
  }

  private load(): SubscriptionStore {
    try {
      if (!fs.existsSync(this.storeFile)) return {};
      return JSON.parse(fs.readFileSync(this.storeFile, 'utf-8'));
    } catch {
      return {};
    }
  }

  private save(store: SubscriptionStore): void {
    fs.writeFileSync(this.storeFile, JSON.stringify(store, null, 2), { mode: 0o600 });
  }

  isValidTimezone(tz: string): boolean {
    try {
      new Intl.DateTimeFormat('en-US', { timeZone: tz });
      return true;
    } catch {
      return false;
    }
  }

  normaliseTimes(input: unknown): Record<MealSlot, string> {
    const times = { ...DEFAULT_REMINDER_TIMES };
    if (input && typeof input === 'object') {
      for (const slot of Object.keys(times) as MealSlot[]) {
        const value = (input as Record<string, unknown>)[slot];
        if (typeof value === 'string' && /^([01]\d|2[0-3]):[0-5]\d$/.test(value)) {
          times[slot] = value;
        }
      }
    }
    return times;
  }

  subscribe(
    userId: string,
    data: {
      subscription: webpush.PushSubscription;
      timezone: string;
      country: CountryCode;
      staplePreference: StaplePreference;
      planStartDate?: string;
      times?: unknown;
    }
  ): PushSubscriptionRecord {
    const store = this.load();
    const existing = store[userId];
    const record: PushSubscriptionRecord = {
      subscription: data.subscription,
      timezone: data.timezone,
      country: data.country,
      staplePreference: data.staplePreference,
      planStartDate: data.planStartDate || existing?.planStartDate,
      times: this.normaliseTimes(data.times ?? existing?.times),
      enabled: true,
      lastSent: existing?.lastSent || {},
      createdAt: existing?.createdAt || Date.now()
    };
    store[userId] = record;
    this.save(store);
    return record;
  }

  /** Keep preferences in sync without re-registering the browser subscription. */
  update(userId: string, patch: Partial<Pick<PushSubscriptionRecord, 'country' | 'staplePreference' | 'planStartDate' | 'times' | 'timezone' | 'enabled'>>): PushSubscriptionRecord | null {
    const store = this.load();
    const record = store[userId];
    if (!record) return null;
    if (patch.timezone && this.isValidTimezone(patch.timezone)) record.timezone = patch.timezone;
    if (patch.country) record.country = patch.country;
    if (patch.staplePreference) record.staplePreference = patch.staplePreference;
    if (patch.planStartDate !== undefined) record.planStartDate = patch.planStartDate;
    if (patch.times) record.times = this.normaliseTimes(patch.times);
    if (typeof patch.enabled === 'boolean') record.enabled = patch.enabled;
    store[userId] = record;
    this.save(store);
    return record;
  }

  unsubscribe(userId: string): boolean {
    const store = this.load();
    if (!store[userId]) return false;
    delete store[userId];
    this.save(store);
    return true;
  }

  get(userId: string): PushSubscriptionRecord | null {
    return this.load()[userId] || null;
  }

  count(): number {
    return Object.values(this.load()).filter((r) => r.enabled).length;
  }

  start(): void {
    if (this.timer) return;
    this.timer = setInterval(() => {
      void this.tick();
    }, TICK_MS);
    // Never hold the process open just for reminders.
    this.timer.unref?.();
  }

  stop(): void {
    if (this.timer) clearInterval(this.timer);
    this.timer = null;
  }

  /**
   * Build today's real meals for a subscriber so the notification names the
   * dish, rather than a generic "time to eat".
   */
  private mealFor(record: PushSubscriptionRecord, slot: MealSlot, now: Date): string | null {
    try {
      const plan = generate28DayPlan(record.country, record.staplePreference);
      const dayNumber = cycleDayFor(record.timezone, record.planStartDate, now);
      const meal = plan.find((m) => m.dayNumber === dayNumber && m.type === slot);
      return meal ? meal.title : null;
    } catch (err: any) {
      console.warn('[push] meal lookup failed:', err?.message || err);
      return null;
    }
  }

  private async send(userId: string, record: PushSubscriptionRecord, slot: MealSlot, now: Date): Promise<boolean> {
    const dish = this.mealFor(record, slot, now);
    const label = SLOT_LABEL[slot];
    const body = dish
      ? `${label}: ${dish}`
      : `${label} time — open CleverDish to see today's plate.`;

    try {
      await webpush.sendNotification(
        record.subscription,
        JSON.stringify({
          title: 'CleverDish',
          body,
          slot,
          tag: `cleverdish-${slot}`,
          url: '/?tab=today'
        })
      );
      return true;
    } catch (err: any) {
      const status = err?.statusCode;
      if (status === 404 || status === 410) {
        // Browser dropped the subscription — clean it up.
        const store = this.load();
        if (store[userId]) {
          delete store[userId];
          this.save(store);
          console.warn(`[push] removed dead subscription for ${userId} (status ${status})`);
        }
      } else {
        console.warn(`[push] send failed for ${userId}: ${status || ''} ${err?.message || err}`);
      }
      return false;
    }
  }

  /** Exposed for tests: run one pass now. */
  async tick(now = new Date()): Promise<number> {
    if (!this.vapidReady || this.sending) return 0;
    this.sending = true;
    let sent = 0;

    try {
      const store = this.load();
      const entries = Object.entries(store).filter(([, r]) => r.enabled && r.subscription);

      for (const [userId, record] of entries) {
        const local = localNow(record.timezone, now);
        const localDate = local.date;

        for (const slot of Object.keys(record.times) as MealSlot[]) {
          if (record.lastSent[slot] === localDate) continue;

          const [h, m] = record.times[slot].split(':').map(Number);
          const slotMinutes = h * 60 + m;
          const due = local.minutes - slotMinutes;

          // Fire when due, and for a short while afterwards in case the
          // instance was asleep or the tick was missed.
          if (due < 0 || due > CATCH_UP_MINUTES) continue;

          const ok = await this.send(userId, record, slot, now);
          if (ok) {
            record.lastSent[slot] = localDate;
            sent++;
          } else {
            // Don't spin on a broken endpoint every minute.
            record.lastSent[slot] = localDate;
          }
          store[userId] = record;
        }
      }

      if (sent > 0) this.save(store);
    } catch (err: any) {
      console.warn('[push] tick failed:', err?.message || err);
    } finally {
      this.sending = false;
    }

    return sent;
  }
}

/** Wall-clock date/time in an IANA timezone, plus minutes since midnight. */
export function localNow(timezone: string, now: Date): { date: string; minutes: number; hour: number } {
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: timezone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });

  const parts = formatter.formatToParts(now).reduce<Record<string, string>>((acc, part) => {
    if (part.type !== 'literal') acc[part.type] = part.value;
    return acc;
  }, {});

  const hour = Number(parts.hour) % 24;
  const minute = Number(parts.minute);

  return {
    date: `${parts.year}-${parts.month}-${parts.day}`,
    hour,
    minutes: hour * 60 + minute
  };
}

/**
 * Which day of the 28-day rotation it is for a subscriber, mirroring the
 * client's getTodaysCycleDay() but evaluated in the subscriber's timezone.
 */
export function cycleDayFor(timezone: string, planStartDate: string | undefined, now: Date): number {
  const toUtcDays = (y: number, m: number, d: number) => Date.UTC(y, m - 1, d);
  const local = localNow(timezone, now);
  const [year, month, day] = local.date.split('-').map(Number);

  if (!planStartDate) {
    const dayOfYear = Math.floor((toUtcDays(year, month, day) - Date.UTC(year, 0, 1)) / 86_400_000);
    return ((dayOfYear % 28) + 1);
  }

  // Read the calendar parts straight out of the string. Going through
  // new Date(...) + getFullYear() would reinterpret the date in the
  // *server's* zone, which is wrong whenever the subscriber's zone differs.
  // Same parse as the client: onboarding stores a full ISO timestamp, and
  // Number('08T07:31:00.000Z') is NaN, which silently pinned every reminder to
  // day 1 of the rotation.
  const [sy, sm, sd] = planStartDate.split('T')[0].split('-').map(Number);
  const hasValidStart = Number.isFinite(sy) && Number.isFinite(sm) && Number.isFinite(sd);
  const diffDays = hasValidStart
    ? Math.floor((toUtcDays(year, month, day) - toUtcDays(sy, sm, sd)) / 86_400_000)
    : 0;

  if (diffDays < 0) return 1;
  return ((diffDays % 28) + 1);
}