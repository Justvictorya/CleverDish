/**
 * Calendar Synchronization & Automated Daily Rotation Engine
 * CleverDish automatically shifts meals forward each calendar day at 00:00 (midnight local time)
 * based on a 28-day protein rotation cycle.
 */

export function getTodaysCycleDay(planStartDate?: string): number {
  if (!planStartDate) {
    // If no start date set, anchor to current day of the year (1-28)
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const dayOfYear = Math.floor((now.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24));
    return ((dayOfYear % 28) + 1);
  }

  const start = new Date(planStartDate);
  const now = new Date();

  // Normalize to local calendar midnight
  const startDay = new Date(start.getFullYear(), start.getMonth(), start.getDate()).getTime();
  const currentDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();

  const diffDays = Math.floor((currentDay - startDay) / (1000 * 60 * 60 * 24));
  if (diffDays < 0) return 1;

  // 1-indexed 28-day rotational loop
  return ((diffDays % 28) + 1);
}

export function getTimeUntilMidnight(): { hours: number; minutes: number; seconds: number; formatted: string } {
  const now = new Date();
  const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
  const diffMs = midnight.getTime() - now.getTime();

  const totalSeconds = Math.max(0, Math.floor(diffMs / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const pad = (n: number) => n.toString().padStart(2, '0');
  const formatted = `${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s`;

  return { hours, minutes, seconds, formatted };
}

export function formatCurrentDate(): string {
  const now = new Date();
  return now.toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}
