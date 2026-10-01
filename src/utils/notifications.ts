// Meal-time push reminders.
//
// The browser owns permission and the push subscription; the server owns the
// schedule. Everything here degrades quietly: on iOS without an installed PWA,
// on denied permission, or on an unsupported browser, we simply report the
// reason instead of throwing at the user.
import { apiFetch } from './api';
import type { CountryCode, StaplePreference } from '../types';

export type MealSlot = 'morning' | 'afternoon' | 'evening';

export type ReminderTimes = Record<MealSlot, string>;

export interface ReminderStatus {
  enabled: boolean;
  subscribed: boolean;
  active: boolean;
  timezone: string | null;
  times: ReminderTimes;
}

export type SupportReason =
  | 'unsupported'
  | 'needs-https'
  | 'needs-installed-app'
  | 'denied'
  | 'server-disabled';

export function isPushSupported(): boolean {
  return typeof window !== 'undefined'
    && 'serviceWorker' in navigator
    && 'PushManager' in window
    && 'Notification' in window;
}

/**
 * iOS only exposes Web Push to PWAs that were added to the Home Screen, so we
 * detect that case up front and can explain it instead of failing silently.
 */
export function detectBlocker(): SupportReason | null {
  if (!isPushSupported()) return 'unsupported';
  if (!window.isSecureContext) return 'needs-https';

  const isIos = /iphone|ipad|ipod/i.test(navigator.userAgent)
    || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

  if (isIos && !window.matchMedia('(display-mode: standalone)').matches) {
    return 'needs-installed-app';
  }
  return null;
}

export function notificationPermission(): NotificationPermission | 'unsupported' {
  if (typeof Notification === 'undefined') return 'unsupported';
  return Notification.permission;
}

function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const raw = window.atob(base64);
  const output = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i += 1) {
    output[i] = raw.charCodeAt(i);
  }
  return output;
}

async function getVapidPublicKey(): Promise<string | null> {
  const res = await fetch('/api/notifications/config');
  if (!res.ok) return null;
  const data = await res.json();
  if (!data.enabled || !data.vapidPublicKey) return null;
  return data.vapidPublicKey;
}

export async function getReminderStatus(userId: string): Promise<ReminderStatus | null> {
  try {
    const res = await apiFetch(userId, '/api/notifications/status');
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

/**
 * Ask for permission (if needed) and register this browser with the server.
 * Safe to call repeatedly — an existing subscription is reused.
 */
export async function enableReminders(
  userId: string,
  options: {
    country: CountryCode;
    staplePreference: StaplePreference;
    planStartDate?: string;
    times?: ReminderTimes;
  }
): Promise<{ ok: boolean; reason?: SupportReason; status?: ReminderStatus }> {
  const blocker = detectBlocker();
  if (blocker) return { ok: false, reason: blocker };

  if (Notification.permission === 'denied') return { ok: false, reason: 'denied' };

  let permission: NotificationPermission = Notification.permission;
  if (permission === 'default') permission = await Notification.requestPermission();
  if (permission !== 'granted') return { ok: false, reason: 'denied' };

  const registration = await navigator.serviceWorker.ready;
  const vapidPublicKey = await getVapidPublicKey();
  if (!vapidPublicKey) return { ok: false, reason: 'server-disabled' };

  let subscription = await registration.pushManager.getSubscription();
  if (!subscription) {
    subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(vapidPublicKey) as BufferSource
    });
  }

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const res = await apiFetch(userId, '/api/notifications/subscribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      subscription: subscription.toJSON(),
      timezone,
      country: options.country,
      staplePreference: options.staplePreference,
      planStartDate: options.planStartDate,
      times: options.times
    })
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || 'Could not enable reminders.');
  }

  const status = await getReminderStatus(userId);
  return { ok: true, status: status || undefined };
}

export async function disableReminders(userId: string): Promise<void> {
  if (isPushSupported()) {
    const registration = await navigator.serviceWorker.getRegistration();
    const subscription = await registration?.pushManager.getSubscription();
    // Drop the local subscription too, otherwise the browser keeps a push
    // endpoint the server no longer knows about.
    await subscription?.unsubscribe();
  }
  await apiFetch(userId, '/api/notifications/unsubscribe', { method: 'POST' });
}

export async function updateReminderTimes(userId: string, times: ReminderTimes): Promise<boolean> {
  const res = await apiFetch(userId, '/api/notifications/preferences', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ times })
  });
  return res.ok;
}

/** Keeps the server's copy aligned when the user changes country or preference. */
export async function syncReminderPreferences(
  userId: string,
  patch: { country?: CountryCode; staplePreference?: StaplePreference; planStartDate?: string }
): Promise<void> {
  const res = await apiFetch(userId, '/api/notifications/preferences', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(patch)
  });
  if (!res.ok) throw new Error('Could not sync reminder preferences.');
}

const BLOCKER_COPY: Record<SupportReason, string> = {
  unsupported: 'This browser does not support notifications.',
  'needs-https': 'Notifications need a secure (https) connection.',
  'needs-installed-app': 'On iPhone and iPad, add CleverDish to your Home Screen first, then reopen it.',
  denied: 'Notifications are blocked. Enable them in your browser settings for this site.',
  'server-disabled': 'Reminders are not available right now. Please try again later.'
};

export function blockerMessage(reason: SupportReason): string {
  return BLOCKER_COPY[reason];
}

export function slotLabel(slot: MealSlot): string {
  return slot === 'morning' ? 'Breakfast' : slot === 'afternoon' ? 'Lunch' : 'Dinner';
}