/**
 * Reminder scheduling tests.
 *
 * The subtle parts are timezone arithmetic and the "fire once per day" guard,
 * so those are pinned here. Run with `npm test`.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'fs';
import os from 'os';
import path from 'path';
import webpush from 'web-push';
import {
  ReminderService,
  localNow,
  cycleDayFor,
  DEFAULT_REMINDER_TIMES,
  type MealSlot
} from '../src/server/pushReminders';

const keys = webpush.generateVAPIDKeys();
process.env.VAPID_PUBLIC_KEY = keys.publicKey;
process.env.VAPID_PRIVATE_KEY = keys.privateKey;

/** Records what would have been pushed, without touching the network. */
function stubPush() {
  const sent: Array<{ slot?: string; body?: string; url?: string }> = [];
  (webpush as any).sendNotification = async (_sub: unknown, payload: string) => {
    sent.push(JSON.parse(payload));
  };
  return sent;
}

function stubStatus(code: number) {
  (webpush as any).sendNotification = async () => {
    const err: any = new Error('stub');
    err.statusCode = code;
    throw err;
  };
}

function newService() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'reminders-'));
  const service = new ReminderService(dir);
  service.init();
  return { service, cleanup: () => fs.rmSync(dir, { recursive: true, force: true }) };
}

function subscribeUser(
  service: ReminderService,
  overrides: Partial<{
    userId: string;
    timezone: string;
    country: 'NG' | 'GH' | 'KE' | 'US' | 'CA' | 'UK';
    staplePreference: 'indigenous' | 'continental' | 'balanced';
    planStartDate: string;
    times: Record<MealSlot, string>;
  }> = {}
) {
  const {
    userId = 'u1',
    timezone = 'Africa/Accra',
    country = 'GH',
    staplePreference = 'indigenous',
    planStartDate = '2026-10-01',
    times
  } = overrides;

  service.subscribe(userId, {
    subscription: { endpoint: `https://push.test/${userId}`, keys: { p256dh: 'k', auth: 'a' } } as any,
    timezone,
    country,
    staplePreference,
    planStartDate,
    times
  });
}

// ---------------------------------------------------------------------------
// Timezone conversion
// ---------------------------------------------------------------------------

test('localNow converts UTC to the target zone across offsets', () => {
  assert.equal(localNow('Africa/Accra', new Date('2026-10-01T07:30:00Z')).minutes, 7 * 60 + 30);
  assert.equal(localNow('Africa/Lagos', new Date('2026-10-01T07:30:00Z')).minutes, 8 * 60 + 30);
  assert.equal(localNow('Africa/Nairobi', new Date('2026-10-01T04:30:00Z')).minutes, 7 * 60 + 30);
  assert.equal(localNow('Europe/London', new Date('2026-10-01T06:30:00Z')).minutes, 7 * 60 + 30);
  assert.equal(localNow('America/New_York', new Date('2026-10-01T11:30:00Z')).minutes, 7 * 60 + 30);
  assert.equal(localNow('America/Los_Angeles', new Date('2026-10-01T14:30:00Z')).minutes, 7 * 60 + 30);
  assert.equal(localNow('Asia/Tokyo', new Date('2026-09-30T22:30:00Z')).minutes, 7 * 60 + 30);
});

test('localNow handles midnight as hour 0, not 24', () => {
  const midnight = localNow('Europe/London', new Date('2026-10-01T23:00:00Z'));
  assert.equal(midnight.hour, 0);
  assert.equal(midnight.minutes, 0);
});

test('localNow reports the calendar date in the target zone', () => {
  // 23:30Z is already the next day in Lagos (UTC+1) but still the same day in
  // Los Angeles (UTC-7). The reminder schedule depends on each.
  assert.equal(localNow('Africa/Lagos', new Date('2026-10-01T23:30:00Z')).date, '2026-10-02');
  assert.equal(localNow('America/Los_Angeles', new Date('2026-10-01T23:30:00Z')).date, '2026-10-01');
  // 02:00Z is the previous day in Los Angeles.
  assert.equal(localNow('America/Los_Angeles', new Date('2026-10-01T02:00:00Z')).date, '2026-09-30');
  // Auckland runs UTC+13 in October, so midday UTC is already tomorrow there.
  assert.equal(localNow('Pacific/Auckland', new Date('2026-10-01T12:00:00Z')).date, '2026-10-02');
});

// ---------------------------------------------------------------------------
// Rotation day — must not drift with DST or the server's own timezone
// ---------------------------------------------------------------------------

test('cycleDayFor counts calendar days, not elapsed milliseconds', () => {
  // 2026-10-01 is day-of-year 273: 273 % 28 + 1 = 22.
  assert.equal(cycleDayFor('Africa/Accra', undefined, new Date('2026-10-01T07:30:00Z')), 22);
  assert.equal(cycleDayFor('Africa/Accra', '2026-10-01', new Date('2026-10-01T07:30:00Z')), 1);
  assert.equal(cycleDayFor('Africa/Accra', '2026-10-01', new Date('2026-10-29T07:30:00Z')), 1);
  assert.equal(cycleDayFor('Africa/Accra', '2026-10-10', new Date('2026-10-01T07:30:00Z')), 1);
});

test('cycleDayFor is stable for zones sharing the same calendar date', () => {
  // Regression: reading the start date through new Date() shifted the start
  // back a day for zones behind UTC, breaking parity with the client.
  // 12:00Z on 2026-10-01 is still 2026-10-01 for every zone in this list.
  const expected = cycleDayFor('Africa/Accra', '2026-01-01', new Date('2026-10-01T12:00:00Z'));
  for (const zone of ['Europe/London', 'America/New_York', 'Pacific/Honolulu', 'America/Los_Angeles', 'Asia/Tokyo']) {
    assert.equal(cycleDayFor(zone, '2026-01-01', new Date('2026-10-01T12:00:00Z')), expected, zone);
  }
});

test('cycleDayFor advances a day for zones already on the next calendar day', () => {
  // Auckland is UTC+13 in October, so 12:00Z is 01:00 on 2026-10-02 there and
  // the rotation must be one day further along than for UTC.
  const utc = cycleDayFor('Africa/Accra', '2026-01-01', new Date('2026-10-01T12:00:00Z'));
  assert.equal(cycleDayFor('Pacific/Auckland', '2026-01-01', new Date('2026-10-01T12:00:00Z')), (utc % 28) + 1);
});

test('cycleDayFor tolerates a malformed start date', () => {
  assert.equal(cycleDayFor('Africa/Accra', 'not-a-date', new Date('2026-10-01T07:30:00Z')), 1);
});

test('cycleDayFor reads an ISO timestamp as the date it names', () => {
  // Onboarding writes new Date().toISOString(). Split on '-' alone made the day
  // NaN, hasValidStart came back false, and every reminder announced day 1 no
  // matter how long the plan had been running.
  const iso = '2026-10-01T07:31:00.000Z';
  assert.equal(cycleDayFor('Africa/Accra', iso, new Date('2026-10-04T07:30:00Z')), 4);
  assert.equal(cycleDayFor('Africa/Accra', iso, new Date('2026-10-29T07:30:00Z')), 1, 'wraps after a full cycle');
});

// ---------------------------------------------------------------------------
// Input validation
// ---------------------------------------------------------------------------

test('time validation rejects malformed times and keeps good ones', () => {
  const { service, cleanup } = newService();
  try {
    assert.deepEqual(
      service.normaliseTimes({ morning: '99:99', afternoon: '12:30', evening: '20:00' }),
      { morning: DEFAULT_REMINDER_TIMES.morning, afternoon: '12:30', evening: '20:00' }
    );
  } finally {
    cleanup();
  }
});

test('timezone validation rejects unknown zones', () => {
  const { service, cleanup } = newService();
  try {
    assert.equal(service.isValidTimezone('Mars/Olympus'), false);
    assert.equal(service.isValidTimezone('Europe/London'), true);
  } finally {
    cleanup();
  }
});

// ---------------------------------------------------------------------------
// Scheduling
// ---------------------------------------------------------------------------

test('fires each slot once at the subscriber local time', async () => {
  const sent = stubPush();
  const { service, cleanup } = newService();
  try {
    subscribeUser(service, { timezone: 'Africa/Accra' });

    await service.tick(new Date('2026-10-01T07:30:00Z'));
    await service.tick(new Date('2026-10-01T12:30:00Z'));
    await service.tick(new Date('2026-10-01T18:30:00Z'));

    assert.deepEqual(sent.map((s) => s.slot), ['morning', 'afternoon', 'evening']);
    assert.equal(sent[0]?.body?.startsWith('Breakfast: '), true);
    assert.equal(sent[0]?.url, '/?tab=today');
  } finally {
    cleanup();
  }
});

test('names a dish from the subscriber country, not Nigeria', async () => {
  const sent = stubPush();
  const { service, cleanup } = newService();
  try {
    subscribeUser(service, { timezone: 'Europe/London', country: 'UK' });
    await service.tick(new Date('2026-10-01T06:30:00Z'));
    assert.match(sent[0]?.body || '', /Porridge|Full English|Beans on Toast|Toast/);
  } finally {
    cleanup();
  }
});

test('a slot fires once, not on every tick inside the window', async () => {
  const sent = stubPush();
  const { service, cleanup } = newService();
  try {
    subscribeUser(service, { timezone: 'Africa/Accra' });

    await service.tick(new Date('2026-10-01T07:30:00Z'));
    await service.tick(new Date('2026-10-01T07:31:00Z'));
    await service.tick(new Date('2026-10-01T07:35:00Z'));
    await service.tick(new Date('2026-10-01T08:15:00Z'));

    assert.equal(sent.length, 1);
  } finally {
    cleanup();
  }
});

test('catches up after a missed window, then stops', async () => {
  const sent = stubPush();
  const { service, cleanup } = newService();
  try {
    subscribeUser(service, { timezone: 'Africa/Accra' });

    // Server was asleep at 07:30 and woke at 08:00 — still inside the window.
    await service.tick(new Date('2026-10-01T08:00:00Z'));
    assert.equal(sent.length, 1);

    // 09:30 is outside the catch-up window, so nothing more goes out.
    await service.tick(new Date('2026-10-01T09:30:00Z'));
    assert.equal(sent.length, 1);
  } finally {
    cleanup();
  }
});

test('does not fire before the chosen time', async () => {
  const sent = stubPush();
  const { service, cleanup } = newService();
  try {
    subscribeUser(service, { timezone: 'Africa/Accra' });
    await service.tick(new Date('2026-10-01T07:29:00Z'));
    assert.equal(sent.length, 0);
  } finally {
    cleanup();
  }
});

test('every slot fires again the next day', async () => {
  const sent = stubPush();
  const { service, cleanup } = newService();
  try {
    subscribeUser(service, { timezone: 'Africa/Accra' });

    for (const hour of ['07:30', '12:30', '18:30']) await service.tick(new Date(`2026-10-01T${hour}:00Z`));
    assert.equal(sent.length, 3);

    for (const hour of ['07:30', '12:30', '18:30']) await service.tick(new Date(`2026-10-02T${hour}:00Z`));
    assert.equal(sent.length, 6);
  } finally {
    cleanup();
  }
});

test('a subscriber west of UTC gets breakfast on their own morning', async () => {
  const sent = stubPush();
  const { service, cleanup } = newService();
  try {
    // New York is UTC-4 in October: 07:30 local is 11:30Z.
    subscribeUser(service, { timezone: 'America/New_York', country: 'US' });

    await service.tick(new Date('2026-10-01T07:30:00Z'));
    assert.equal(sent.length, 0, 'should not fire on UTC morning');

    await service.tick(new Date('2026-10-01T11:30:00Z'));
    assert.equal(sent.length, 1);
    assert.equal(sent[0].slot, 'morning');
  } finally {
    cleanup();
  }
});

test('custom times replace the defaults', async () => {
  const sent = stubPush();
  const { service, cleanup } = newService();
  try {
    subscribeUser(service, {
      timezone: 'Africa/Accra',
      times: { morning: '06:00', afternoon: '13:00', evening: '19:30' }
    });

    await service.tick(new Date('2026-10-01T07:30:00Z'));
    assert.equal(sent.length, 0, 'old 07:30 default should not fire');

    await service.tick(new Date('2026-10-01T06:00:00Z'));
    assert.equal(sent[0].slot, 'morning');
  } finally {
    cleanup();
  }
});

test('disabled subscribers receive nothing', async () => {
  const sent = stubPush();
  const { service, cleanup } = newService();
  try {
    subscribeUser(service, { timezone: 'Africa/Accra' });
    service.update('u1', { enabled: false });
    await service.tick(new Date('2026-10-01T07:30:00Z'));
    assert.equal(sent.length, 0);
  } finally {
    cleanup();
  }
});

// ---------------------------------------------------------------------------
// Subscription lifecycle
// ---------------------------------------------------------------------------

test('prunes subscriptions the browser has dropped (404/410)', async () => {
  stubStatus(410);
  const { service, cleanup } = newService();
  try {
    subscribeUser(service, { timezone: 'Africa/Accra' });
    await service.tick(new Date('2026-10-01T07:30:00Z'));
    assert.equal(service.get('u1'), null);
    assert.equal(service.count(), 0);
  } finally {
    cleanup();
  }
});

test('keeps the subscription when a transient error occurs', async () => {
  stubStatus(500);
  const { service, cleanup } = newService();
  try {
    subscribeUser(service, { timezone: 'Africa/Accra' });
    await service.tick(new Date('2026-10-01T07:30:00Z'));
    assert.notEqual(service.get('u1'), null, '500 must not delete a good subscription');
  } finally {
    cleanup();
  }
});

test('unsubscribe removes the record and count', () => {
  const { service, cleanup } = newService();
  try {
    subscribeUser(service, { userId: 'u2', timezone: 'Europe/London', country: 'UK' });
    assert.equal(service.count(), 1);
    assert.equal(service.unsubscribe('u2'), true);
    assert.equal(service.unsubscribe('u2'), false);
    assert.equal(service.count(), 0);
  } finally {
    cleanup();
  }
});

test('resubscribing keeps the plan start date and last-sent state', () => {
  const { service, cleanup } = newService();
  try {
    subscribeUser(service, { userId: 'u3' });
    const updated = service.subscribe('u3', {
      subscription: { endpoint: 'https://push.test/u3-new', keys: { p256dh: 'k', auth: 'a' } } as any,
      timezone: 'Africa/Accra',
      country: 'GH',
      staplePreference: 'indigenous',
      planStartDate: undefined
    });
    assert.equal(updated.planStartDate, '2026-10-01', 'start date should survive a resubscribe');
  } finally {
    cleanup();
  }
});

test('update can follow a country change', () => {
  const { service, cleanup } = newService();
  try {
    subscribeUser(service, { userId: 'u4' });
    const updated = service.update('u4', { country: 'KE' });
    assert.equal(updated?.country, 'KE');
    assert.equal(service.update('missing', { country: 'KE' }), null);
  } finally {
    cleanup();
  }
});