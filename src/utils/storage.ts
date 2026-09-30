const LEGACY_PREFIX = 'foodie_';
export const STORAGE_PREFIX = 'cleverdish_';

/** Build a namespaced storage key. */
export function storageKey(name: string): string {
  return `${STORAGE_PREFIX}${name}`;
}

/**
 * One-time migration from the legacy `foodie_` namespace to `cleverdish_`.
 * Renames existing keys in place so returning users keep their data, and
 * upgrades the old `cleverPoints` profile field to `cleverPoints`.
 */
export function migrateLegacyStorage(): void {
  try {
    const legacyKeys: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(LEGACY_PREFIX)) legacyKeys.push(key);
    }

    for (const key of legacyKeys) {
      const value = localStorage.getItem(key);
      if (value === null) continue;
      const nextKey = storageKey(key.slice(LEGACY_PREFIX.length));
      if (localStorage.getItem(nextKey) === null) {
        localStorage.setItem(nextKey, value);
      }
      localStorage.removeItem(key);
    }

    const profileKey = storageKey('profile');
    const raw = localStorage.getItem(profileKey);
    if (raw) {
      try {
        const profile = JSON.parse(raw);
        if (profile && typeof profile.cleverPoints === 'number' && typeof profile.cleverPoints !== 'number') {
          profile.cleverPoints = profile.cleverPoints;
          delete profile.cleverPoints;
          localStorage.setItem(profileKey, JSON.stringify(profile));
        }
      } catch {
        // Leave malformed profile alone; App falls back to defaults.
      }
    }
  } catch {
    // Storage unavailable (private mode / quota) — app still works in-memory.
  }
}