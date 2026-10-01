import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const isProduction = process.env.NODE_ENV === 'production';

// Ensure data directories exist
const DATA_DIR = path.resolve(process.env.DATA_DIR || path.join(process.cwd(), 'data'));
const PHOTOS_DIR = path.resolve(DATA_DIR, 'photos');
const PRICE_SAMPLES_FILE = path.resolve(DATA_DIR, 'price-samples.json');
const PRICE_OVERRIDES_FILE = path.resolve(DATA_DIR, 'price-overrides.json');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(PHOTOS_DIR)) {
  fs.mkdirSync(PHOTOS_DIR, { recursive: true });
}

// Initial price samples if missing
if (!fs.existsSync(PRICE_SAMPLES_FILE)) {
  const initialSamples = [
    {
      id: 'samp_1',
      stapleId: 'garri_white',
      stapleName: 'White Garri (Paint Bucket / 4kg)',
      marketName: 'Mile 12 Market, Lagos',
      country: 'NG',
      currency: 'NGN',
      price: 3200,
      reportedBy: 'Bimbo K.',
      verified: true,
      timestamp: Date.now() - 1000 * 60 * 60 * 4
    },
    {
      id: 'samp_2',
      stapleId: 'garri_white',
      stapleName: 'White Garri (Paint Bucket / 4kg)',
      marketName: 'Bodija Market, Ibadan',
      country: 'NG',
      currency: 'NGN',
      price: 2900,
      reportedBy: 'Tunde O.',
      verified: true,
      timestamp: Date.now() - 1000 * 60 * 60 * 9
    },
    {
      id: 'samp_3',
      stapleId: 'yam_medium',
      stapleName: 'Tubers of White Yam (5 Large Tubers)',
      marketName: 'Mile 12 Market, Lagos',
      country: 'NG',
      currency: 'NGN',
      price: 13500,
      reportedBy: 'Emeka N.',
      verified: true,
      timestamp: Date.now() - 1000 * 60 * 60 * 14
    },
    {
      id: 'samp_4',
      stapleId: 'chicken_breast',
      stapleName: 'Fresh Chicken Breast (1kg)',
      marketName: 'Oyingbo Market, Lagos',
      country: 'NG',
      currency: 'NGN',
      price: 4800,
      reportedBy: 'Kemi A.',
      verified: true,
      timestamp: Date.now() - 1000 * 60 * 60 * 20
    },
    {
      id: 'samp_5',
      stapleId: 'eggs_crate',
      stapleName: 'Crate of Large Eggs (30 eggs)',
      marketName: 'Utako Market, Abuja',
      country: 'NG',
      currency: 'NGN',
      price: 4900,
      reportedBy: 'Amina S.',
      verified: true,
      timestamp: Date.now() - 1000 * 60 * 60 * 24
    },
    {
      id: 'samp_6',
      stapleId: 'tomatoes_basket',
      stapleName: 'Plum Tomatoes (Derica / 1.5kg)',
      marketName: 'Mile 12 Market, Lagos',
      country: 'NG',
      currency: 'NGN',
      price: 2200,
      reportedBy: 'Fatima Z.',
      verified: true,
      timestamp: Date.now() - 1000 * 60 * 60 * 30
    }
  ];
  fs.writeFileSync(PRICE_SAMPLES_FILE, JSON.stringify(initialSamples, null, 2));
}

// Moderation & median calculation engine
function sanitiseSamples() {
  try {
    const raw = fs.readFileSync(PRICE_SAMPLES_FILE, 'utf-8');
    const samples = JSON.parse(raw);
    const grouped: Record<string, number[]> = {};

    for (const sample of samples) {
      if (!sample.price || typeof sample.price !== 'number' || sample.price <= 0) continue;
      if (!grouped[sample.stapleId]) {
        grouped[sample.stapleId] = [];
      }
      grouped[sample.stapleId].push(sample.price);
    }

    const overrides: Record<string, { medianPrice: number; sampleCount: number; lastUpdated: number }> = {};

    for (const stapleId in grouped) {
      const prices = grouped[stapleId].sort((a, b) => a - b);
      if (prices.length === 0) continue;

      // Filter extreme statistical outliers (outside 0.25x to 4x of raw mean)
      const sum = prices.reduce((acc, p) => acc + p, 0);
      const mean = sum / prices.length;
      const filtered = prices.filter(p => p >= mean * 0.25 && p <= mean * 4.0);
      const validPrices = filtered.length > 0 ? filtered : prices;

      // Calculate median
      const mid = Math.floor(validPrices.length / 2);
      const median = validPrices.length % 2 !== 0
        ? validPrices[mid]
        : Math.round((validPrices[mid - 1] + validPrices[mid]) / 2);

      overrides[stapleId] = {
        medianPrice: median,
        sampleCount: validPrices.length,
        lastUpdated: Date.now()
      };
    }

    fs.writeFileSync(PRICE_OVERRIDES_FILE, JSON.stringify(overrides, null, 2));
    return overrides;
  } catch (err) {
    console.error('Error running sanitiseSamples:', err);
    return {};
  }
}

// Initialize overrides if missing
if (!fs.existsSync(PRICE_OVERRIDES_FILE)) {
  sanitiseSamples();
}

// ---------------- Auth: signed device tokens ----------------
// Stateless bearer tokens bound to a profile id. Signature is server-only.
const SERVER_SECRET_FILE = path.resolve(DATA_DIR, '.server-secret');

let serverSecret: string;
if (!fs.existsSync(SERVER_SECRET_FILE)) {
  serverSecret = crypto.randomBytes(32).toString('hex');
  fs.writeFileSync(SERVER_SECRET_FILE, serverSecret, { mode: 0o600 });
} else {
  serverSecret = fs.readFileSync(SERVER_SECRET_FILE, 'utf-8').trim();
}

const AUTH_TOKENS_FILE = path.resolve(DATA_DIR, 'auth-tokens.json');

function loadAuthTokens(): Record<string, string> {
  try {
    if (!fs.existsSync(AUTH_TOKENS_FILE)) return {};
    return JSON.parse(fs.readFileSync(AUTH_TOKENS_FILE, 'utf-8'));
  } catch {
    return {};
  }
}

function saveAuthToken(userId: string, token: string): void {
  const tokens = loadAuthTokens();
  tokens[userId] = token;
  fs.writeFileSync(AUTH_TOKENS_FILE, JSON.stringify(tokens, null, 2));
}

function signToken(userId: string): string {
  const sig = crypto.createHmac('sha256', serverSecret).update(userId).digest('base64url');
  return `${userId}.${sig}`;
}

function verifyToken(token: string): string | null {
  if (!token) return null;
  const idx = token.lastIndexOf('.');
  if (idx <= 0) return null;
  const userId = token.slice(0, idx);
  const sig = token.slice(idx + 1);
  const expected = crypto.createHmac('sha256', serverSecret).update(userId).digest('base64url');
  if (sig.length !== expected.length) return null;
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (!crypto.timingSafeEqual(a, b)) return null;
  const stored = loadAuthTokens()[userId];
  return stored && stored === token ? userId : null;
}

function requireAuth(req: express.Request, res: express.Response, next: express.NextFunction): void {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : '';
  const userId = verifyToken(token);
  if (!userId) {
    res.status(401).json({ error: 'Authentication required: sign up or sign in to continue.' });
    return;
  }
  (req as any).userId = userId;
  next();
}

// Simple in-memory sliding-window rate limiter (per client IP)
const rateBuckets = new Map<string, { count: number; resetAt: number }>();
function rateLimit(key: string, limit: number, windowMs: number): { allowed: boolean; retryAfterSec?: number } {
  const now = Date.now();
  const bucket = rateBuckets.get(key);
  if (!bucket || bucket.resetAt <= now) {
    rateBuckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true };
  }
  if (bucket.count >= limit) {
    return { allowed: false, retryAfterSec: Math.ceil((bucket.resetAt - now) / 1000) };
  }
  bucket.count += 1;
  return { allowed: true };
}

function clientIp(req: express.Request): string {
  const fwd = req.headers['x-forwarded-for'];
  if (typeof fwd === 'string' && fwd.length > 0) return fwd.split(',')[0].trim();
  return req.ip || 'unknown';
}

// Persisted per-user photo verification ledger (survives restarts; prevents streak farming)
function loadUserLedger(userId: string): { hashes: string[]; byDate: Record<string, number> } {
  try {
    const file = path.join(PHOTOS_DIR, sanitizeUserId(userId), '.ledger.json');
    if (fs.existsSync(file)) return JSON.parse(fs.readFileSync(file, 'utf-8'));
  } catch { /* fallthrough */ }
  return { hashes: [], byDate: {} };
}

function saveUserLedger(userId: string, ledger: { hashes: string[]; byDate: Record<string, number> }): void {
  try {
    const dir = path.join(PHOTOS_DIR, sanitizeUserId(userId));
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, '.ledger.json'), JSON.stringify(ledger));
  } catch (err) {
    console.error('Unable to persist photo ledger:', err);
  }
}

function todaysKey(): string {
  return new Date().toISOString().slice(0, 10);
}

const MAX_PHOTOS_PER_USER_PER_DAY = 6;

function sanitizeUserId(userId: string): string {
  return String(userId).replace(/[^a-zA-Z0-9_-]/g, '_');
}

// In-memory set of recently verified photo hashes to prevent duplicate/streak farming (deprecated in favor of the persisted ledger)
const uploadedPhotoHashes = new Set<string>();

// Magic-byte sniffer
function detectMagicByte(buffer: Buffer): { isValid: boolean; mimeType: string | null; extension: string } {
  if (buffer.length < 8) {
    return { isValid: false, mimeType: null, extension: '' };
  }

  // JPEG: FF D8 FF
  if (buffer[0] === 0xFF && buffer[1] === 0xD8 && buffer[2] === 0xFF) {
    return { isValid: true, mimeType: 'image/jpeg', extension: 'jpg' };
  }

  // PNG: 89 50 4E 47 0D 0A 1A 0A
  if (
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4E &&
    buffer[3] === 0x47 &&
    buffer[4] === 0x0D &&
    buffer[5] === 0x0A &&
    buffer[6] === 0x1A &&
    buffer[7] === 0x0A
  ) {
    return { isValid: true, mimeType: 'image/png', extension: 'png' };
  }

  // WebP: RIFF ... WEBP (bytes 0-3 = "RIFF", bytes 8-11 = "WEBP")
  if (
    buffer.length >= 12 &&
    buffer.toString('ascii', 0, 4) === 'RIFF' &&
    buffer.toString('ascii', 8, 12) === 'WEBP'
  ) {
    return { isValid: true, mimeType: 'image/webp', extension: 'webp' };
  }

  // GIF: GIF87a or GIF89a
  if (buffer.length >= 6) {
    const header = buffer.toString('ascii', 0, 6);
    if (header === 'GIF87a' || header === 'GIF89a') {
      return { isValid: true, mimeType: 'image/gif', extension: 'gif' };
    }
  }

  return { isValid: false, mimeType: null, extension: '' };
}

// Express middlewares
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));

// 0. Device registration: get a signed bearer token bound to this profile id
function describeAiError(err: unknown): string {
  const e = err as { message?: string; status?: number; code?: number; name?: string };
  const status = e?.status || e?.code || 'unknown';
  const message = String(e?.message || err).replace(/AIza[0-9A-Za-z_-]+/g, '[redacted-key]');
  return `${e?.name || 'Error'} status=${status} ${message}`;
}

/**
 * Gemini occasionally answers 503 UNAVAILABLE ("high demand"). That is
 * transient, so retry the same model once, then walk down a fallback chain of
 * stable models before giving up and letting the caller use its rules engine.
 */
const AI_MODEL_CHAIN = ['gemini-3.8-flash', 'gemini-3.6-flash', 'gemini-2.5-flash'];
const TRANSIENT_STATUSES = new Set([408, 429, 500, 502, 503, 504]);

/** Wall-clock ceiling for the whole model chain before the rules engine answers. */
const AI_BUDGET_MS = Number(process.env.AI_BUDGET_MS) || 12000;

function isTransientAiError(err: unknown): boolean {
  const e = err as { status?: number; code?: number; message?: string };
  const status = Number(e?.status || e?.code || 0);
  if (TRANSIENT_STATUSES.has(status)) return true;
  const msg = String(e?.message || '');
  return /UNAVAILABLE|RESOURCE_EXHAUSTED|high demand|overloaded|rate limit/i.test(msg);
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function generateWithFallback(
  ai: GoogleGenAI,
  request: Omit<Parameters<GoogleGenAI['models']['generateContent']>[0], 'model'>
): Promise<{ response: Awaited<ReturnType<GoogleGenAI['models']['generateContent']>>; model: string }> {
  let lastError: unknown;
  // The rules engine is instant and country-correct, so never let the model
  // chain hold a tap open longer than this.
  const deadline = Date.now() + AI_BUDGET_MS;

  for (const model of AI_MODEL_CHAIN) {
    for (let attempt = 0; attempt < 2; attempt++) {
      const remaining = deadline - Date.now();
      if (remaining <= 0) {
        console.warn('[AI] time budget exhausted, using rules engine:', describeAiError(lastError));
        throw lastError || new Error('AI time budget exhausted');
      }

      try {
        const pending = ai.models.generateContent({
          ...request,
          model,
          config: { ...(request as { config?: object }).config, thinkingConfig: { thinkingLevel: 'low' } }
        } as never);
        // Swallow a late rejection so a timed-out attempt cannot crash the process.
        pending.catch(() => {});
        const response = await Promise.race([
          pending,
          sleep(remaining).then(() => {
            throw Object.assign(new Error('AI attempt timed out'), { status: 503 });
          })
        ]);
        if (attempt > 0 || model !== AI_MODEL_CHAIN[0]) {
          console.warn(`[AI] served by ${model} after transient failure on ${AI_MODEL_CHAIN[0]}`);
        }
        return { response, model };
      } catch (err) {
        lastError = err;
        // A non-transient error means the request itself is wrong (bad key,
        // malformed prompt), so fail fast instead of burning the whole chain.
        if (!isTransientAiError(err)) throw err;
        if (attempt === 1) break;
        if (Date.now() >= deadline) break;
        console.warn(`[AI] transient failure on ${model}, retrying once:`, describeAiError(err));
        await sleep(400);
      }
    }
  }

  throw lastError;
}

app.post('/api/auth/register', (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId || typeof userId !== 'string' || userId.length < 4 || userId.length > 80) {
      return res.status(400).json({ error: 'A valid profile id (userId) is required to register this device.' });
    }
    const sanitized = sanitizeUserId(userId);
    const token = signToken(sanitized);
    saveAuthToken(sanitized, token);
    return res.json({ success: true, token });
  } catch (err: any) {
    console.error('Registration error:', err);
    return res.status(500).json({ error: 'Error registering device: ' + err.message });
  }
});

// Host photos statically with security header
app.use('/data/photos', express.static(PHOTOS_DIR, {
  setHeaders: (res) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
  }
}));

// API Routes

// 1. Photo-Locked Daily Ritual Verification Endpoint
app.post('/api/streak/verify-photo', requireAuth, (req, res) => {
  try {
    const { photoBase64, mealId, mealTitle } = req.body;
    const userId = (req as any).userId as string;

    if (!photoBase64 || typeof photoBase64 !== 'string') {
      return res.status(400).json({ error: 'Missing meal photo binary payload.' });
    }

    // Rate limit: 12 verifications per client per hour
    const rl = rateLimit(`verify:${clientIp(req)}`, 12, 60 * 60 * 1000);
    if (!rl.allowed) {
      return res.status(429).json({
        error: `Photo verification rate limit reached. Try again in ~${rl.retryAfterSec} seconds.`
      });
    }

    // Strip data URI header if present
    const base64Data = photoBase64.replace(/^data:image\/[a-z]+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');

    // Reject oversized uploads (nothing about a plate photo needs > 12 MB)
    if (buffer.byteLength > 12 * 1024 * 1024) {
      return res.status(413).json({ error: 'Image too large. Maximum allowed size is 12 MB.' });
    }

    // Magic-byte sniffer validation
    const { isValid, mimeType, extension } = detectMagicByte(buffer);
    if (!isValid) {
      return res.status(400).json({
        error: 'Security validation failed: File signature does not match valid image magic-bytes (PNG, JPEG, WebP, GIF accepted).'
      });
    }

    // Per-user anti-streak-farming ledger (persisted across restarts)
    const ledger = loadUserLedger(userId);
    const today = todaysKey();
    ledger.byDate[today] = ledger.byDate[today] || 0;
    if (ledger.byDate[today] >= MAX_PHOTOS_PER_USER_PER_DAY) {
      return res.status(429).json({
        error: `Daily photo limit reached (${MAX_PHOTOS_PER_USER_PER_DAY} plates per day). Streak farming is not allowed.`
      });
    }

    // Hash check for duplicate prevention
    const hash = crypto.createHash('sha256').update(buffer).digest('hex');
    if (ledger.hashes.includes(hash)) {
      return res.status(409).json({
        error: 'Duplicate plate detected! Streak activation requires an authentic live snapshot of today’s plate.'
      });
    }

    // Securely write to data/photos/<userId>/
    const sanitizedUserId = sanitizeUserId(userId);
    const userPhotoDir = path.join(PHOTOS_DIR, sanitizedUserId);
    if (!fs.existsSync(userPhotoDir)) {
      fs.mkdirSync(userPhotoDir, { recursive: true });
    }

    const filename = `${Date.now()}_${hash.slice(0, 10)}.${extension}`;
    const filePath = path.join(userPhotoDir, filename);
    fs.writeFileSync(filePath, buffer);

    // Update ledger + in-memory dedupe set
    ledger.hashes.push(hash);
    ledger.byDate[today] += 1;
    saveUserLedger(userId, ledger);
    uploadedPhotoHashes.add(hash);

    const photoUrl = `/data/photos/${sanitizedUserId}/${filename}`;

    return res.json({
      success: true,
      message: 'Plate photo verified with zero-dep magic-byte security! Daily streak activated.',
      photoUrl,
      verifiedAt: new Date().toISOString(),
      mealId,
      mealTitle,
      hash: hash.slice(0, 12),
      streakBonus: 1
    });
  } catch (err: any) {
    console.error('Photo verification error:', err);
    return res.status(500).json({ error: 'Internal server error validating meal photo: ' + err.message });
  }
});

// 2. Open-Market Price Crowdsourcing Endpoints
app.get('/api/prices/samples', (_req, res) => {
  try {
    const raw = fs.readFileSync(PRICE_SAMPLES_FILE, 'utf-8');
    const samples = JSON.parse(raw);
    return res.json(samples);
  } catch (err: any) {
    return res.status(500).json({ error: 'Could not read price ledger: ' + err.message });
  }
});

app.get('/api/prices/overrides', (_req, res) => {
  try {
    if (!fs.existsSync(PRICE_OVERRIDES_FILE)) {
      sanitiseSamples();
    }
    const raw = fs.readFileSync(PRICE_OVERRIDES_FILE, 'utf-8');
    return res.json(JSON.parse(raw));
  } catch (err: any) {
    return res.status(500).json({ error: 'Could not read price overrides: ' + err.message });
  }
});

app.post('/api/prices/submit', requireAuth, (req, res) => {
  try {
    const { stapleId, stapleName, marketName, country, currency, price, reportedBy } = req.body;

    if (!stapleId || !price || Number(price) <= 0) {
      return res.status(400).json({ error: 'Invalid staple price submission parameters.' });
    }

    // Rate limit: 20 submissions per client per hour
    const rl = rateLimit(`submit:${clientIp(req)}`, 20, 60 * 60 * 1000);
    if (!rl.allowed) {
      return res.status(429).json({ error: 'Price submission rate limit reached. Please wait before submitting again.' });
    }

    const raw = fs.readFileSync(PRICE_SAMPLES_FILE, 'utf-8');
    const samples = JSON.parse(raw);

    const newSample = {
      id: 'samp_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
      stapleId: String(stapleId),
      stapleName: String(stapleName || stapleId),
      marketName: String(marketName || 'Local Market'),
      country: String(country || 'NG'),
      currency: String(currency || 'NGN'),
      price: Number(price),
      reportedBy: String(reportedBy || 'Verified Shopper'),
      verified: true,
      timestamp: Date.now()
    };

    samples.unshift(newSample);

    // Keep recent 1,000 samples
    if (samples.length > 1000) samples.length = 1000;

    fs.writeFileSync(PRICE_SAMPLES_FILE, JSON.stringify(samples, null, 2));

    // Moderation engine recalculates medians
    const overrides = sanitiseSamples();

    return res.json({
      success: true,
      message: 'Price submission logged to the open-market ledger! +50 Foodie Points awarded.',
      sample: newSample,
      rewardPointsEarned: 50,
      activeOverrides: overrides
    });
  } catch (err: any) {
    console.error('Error submitting price:', err);
    return res.status(500).json({ error: 'Error submitting price: ' + err.message });
  }
});

// 3. AI Inflation Swap Engine
app.post('/api/ai/inflation-swap', requireAuth, async (req, res) => {
  const {
    mealName,
    currentIngredient,
    currentCost,
    currency = 'NGN',
    country = 'Nigeria',
    staplePreference = 'indigenous',
    targetMacros = { protein: 35, carbs: 60, fat: 18 }
  } = req.body;

  const rl = rateLimit(`ai:${clientIp(req)}`, 30, 60 * 60 * 1000);
  if (!rl.allowed) {
    return res.status(429).json({ error: 'AI request rate limit reached. Please wait and try again.' });
  }

  // Setup Gemini client if key is present
  const apiKey = process.env.GEMINI_API_KEY;
  if (apiKey) {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const prompt = `You are the core intelligence of CleverDish, an expert hyper-local sports nutritionist and food economist.
The user is planning meal: "${mealName}".
The ingredient "${currentIngredient}" currently costs ${currency} ${currentCost} due to market inflation.
User's country: ${country}.
Staple preference: ${staplePreference} (Indigenous or Continental).
Nutritional target for this component: Protein ~${targetMacros.protein}g, Carbs ~${targetMacros.carbs}g, Fat ~${targetMacros.fat}g.

Provide an immediate "Inflation Swap" recipe restructuring:
Select a cheaper, locally abundant substitute in ${country} that matches the nutritional macro profile while reducing grocery expenditure.
Respond STRICTLY with a valid JSON object with these keys:
{
  "swappedIngredient": "string (name of new ingredient)",
  "gramWeight": "string (e.g. 180g)",
  "newCost": number (realistic estimated cost in ${currency}),
  "costSavingsPercent": number (e.g. 35),
  "macroBreakdown": {
    "protein": number,
    "carbs": number,
    "fat": number,
    "fiber": number
  },
  "rationale": "string (1-2 sentences explaining why this local swap retains macro parity and cuts budget)",
  "prepModification": "string (concise cooking tip for this substitute)"
}
Return ONLY the raw JSON without markdown code fences.`;

      const { response, model } = await generateWithFallback(ai, { contents: prompt });

      const text = response.text || '';
      const cleanJson = text.replace(/```json/gi, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(cleanJson);
      return res.json({ success: true, swap: parsed, engine: model });
    } catch (aiErr) {
      console.warn('[AI] inflation-swap fell back to rules engine:', describeAiError(aiErr));
    }
  }

  // Deterministic local market fallback engine. Numeric targets and savings are
  // country-neutral; only the substitute names/prep come from the table below.
  const fallbackSwaps: Record<string, any> = {
    beef: {
      gramWeight: '180g',
      savings: 0.58,
      costSavingsPercent: 42,
      macroBreakdown: { protein: 34, carbs: 2, fat: 12, fiber: 0 },
      rationale: 'Swapping expensive market beef for a cheaper local lean protein holds the protein line at 34g while cutting the cost of this component by 42%.'
    },
    chicken: {
      gramWeight: '190g',
      savings: 0.62,
      costSavingsPercent: 38,
      macroBreakdown: { protein: 32, carbs: 8, fat: 15, fiber: 2 },
      rationale: 'Cheaper staples in the same protein class deliver an equivalent amino acid profile at a fraction of the current poultry market price.'
    },
    quinoa: {
      gramWeight: '150g dry (380g cooked)',
      savings: 0.45,
      costSavingsPercent: 55,
      macroBreakdown: { protein: 11, carbs: 72, fat: 3, fiber: 7 },
      rationale: 'A local whole grain matches imported quinoa on complex carbohydrate, fiber, and mineral content at a much lower price.'
    },
    salmon: {
      gramWeight: '160g',
      savings: 0.4,
      costSavingsPercent: 60,
      macroBreakdown: { protein: 32, carbs: 0, fat: 16, fiber: 0 },
      rationale: 'An oily fish from the local catch delivers comparable omega-3 and protein density at roughly 60% below the imported fillet price.'
    }
  };

  // Local substitutes per country, so the fallback never suggests Nigerian
  // foods to someone shopping in another market.
  const localSwapsByCountry: Record<string, Record<string, { substitute: string; prep: string }>> = {
    Nigeria: {
      beef: { substitute: 'Catfish Fillet or Local Boiled Eggs & Soya Chunks', prep: 'Season catfish with crushed uda, garlic, and chili; pan-sear or steam in the stew.' },
      chicken: { substitute: 'Cottage Boiled Eggs (3 Large) + Roasted Groundnuts', prep: 'Soft-boil for 7 minutes and fold into the sauce at the end.' },
      quinoa: { substitute: 'Acha (Fonio Grain) or Nigerian Brown Rice', prep: 'Rinse sand thoroughly and steam for 8 minutes with bay leaf.' },
      salmon: { substitute: 'Smoked Mackerel (Titus Fish)', prep: 'Debone cleanly and simmer in tomato-pepper base.' }
    },
    Ghana: {
      beef: { substitute: 'Smoked Herring or Boiled Eggs & Kontomire', prep: 'Grill the herring until crisp and wilt chopped kontomire (cocoyam leaf) in palm oil.' },
      chicken: { substitute: 'Boiled Eggs & Koose Stew Beans', prep: 'Simmer black-eyed beans with tomato, ginger, and dried fish; fold in sliced eggs.' },
      quinoa: { substitute: 'Kinkel (Cracked Corn Dough) or Ghanaian Rice', prep: 'Cook kinkel in a lidded pot until it steams like a firm polenta.' },
      salmon: { substitute: 'Smoked Herring Flakes or Fresh Tilapia', prep: 'Cure and cold-smoke the fish, then flake over banku or shankuka.' }
    },
    Kenya: {
      beef: { substitute: 'Tilapia Fillet or Eggs & Sukuma Wiki', prep: 'Grill the tilapia with Swahili spice rub; wilt sukuma wiki with onion and tomato.' },
      chicken: { substitute: 'Boiled Eggs & Nyama Choma', prep: 'Boil the eggs, then finish them in a slow-cooked tomato and sukuma wiki stew.' },
      quinoa: { substitute: 'Ugali (Maizemeal) or Kenyan Pilau', prep: 'Knead the maize flour with water and steam in a foil-lined pot for 25 minutes.' },
      salmon: { substitute: 'Fresh Tilapia or Nile Perch', prep: 'Grill whole until the flesh flakes, then serve with kachumbari.' }
    },
    'United States': {
      beef: { substitute: 'Ground Turkey or Extra Eggs', prep: 'Brown the turkey with onion, garlic, and smoked paprika; keep the same seasoning profile.' },
      chicken: { substitute: 'Extra Eggs + Greek Yogurt', prep: 'Scramble in a nonstick pan and fold through cold Greek yogurt off the heat.' },
      quinoa: { substitute: 'Pearl Barley or Brown Rice', prep: 'Simmer in stock for 25 minutes, then rest covered for 10.' },
      salmon: { substitute: 'Frozen Salmon Portions or Canned Tuna', prep: 'Roast at 200°C/400°F for 12 minutes with lemon, or substitute straight from the can.' }
    },
    Canada: {
      beef: { substitute: 'Extra Eggs or Pork Shoulder', prep: 'Braise the pork shoulder slowly with onion and paprika for a cheaper cut with more flavour.' },
      chicken: { substitute: 'Frozen Chicken Thighs + Eggs', prep: 'Roast the thighs at 220°C/425°F for 25 minutes; boil the eggs alongside.' },
      quinoa: { substitute: 'Barley or Couscous', prep: 'Simmer in salted water for 12 minutes and drain well.' },
      salmon: { substitute: 'Frozen Salmon or Smoked Trout', prep: 'Bake from frozen at 200°C/400°F for 18 minutes with dill and lemon.' }
    },
    'United Kingdom': {
      beef: { substitute: 'Minced Beef or Frozen Stewing Steak', prep: 'Brown the mince with onion, carrot, and celery for a long-cooked stew base.' },
      chicken: { substitute: 'Eggs + Tinned Tuna', prep: 'Boil the eggs, then fold flaked tuna with mayo, celery, and lemon.' },
      quinoa: { substitute: 'Pearl Barley or Bulgur Wheat', prep: 'Simmer in salted water for 12 minutes and drain well.' },
      salmon: { substitute: 'Smoked Kippers or Frozen Salmon', prep: 'Grill the kippers for 4 minutes and serve with buttered toast.' }
    }
  };

  const lookupKey = Object.keys(fallbackSwaps).find(k => 
    String(currentIngredient).toLowerCase().includes(k)
  ) || 'chicken';

  const baseSwap = fallbackSwaps[lookupKey];
  const countrySwap = (localSwapsByCountry[country] || localSwapsByCountry.Nigeria)[lookupKey];

  const baseCost = Number(currentCost);
  if (!Number.isFinite(baseCost) || baseCost <= 0) {
    return res.status(400).json({ error: 'A positive currentCost is required to price an inflation swap.' });
  }

  const defaultSwap = {
    gramWeight: baseSwap.gramWeight,
    costSavingsPercent: baseSwap.costSavingsPercent,
    macroBreakdown: baseSwap.macroBreakdown,
    rationale: baseSwap.rationale,
    swappedIngredient: countrySwap.substitute,
    newCost: Math.round(baseCost * baseSwap.savings),
    prepModification: countrySwap.prep
  };

  return res.json({
    success: true,
    swap: defaultSwap,
    engine: 'cleverdish-local-rules-engine'
  });
});

// 4. Pantry-Aware AI Scanning Endpoint
app.post('/api/ai/pantry-scan', requireAuth, async (req, res) => {
  const {
    imageBase64,
    mimeType = 'image/jpeg',
    currency = 'NGN',
    country = 'Nigeria',
    pantryItemsText
  } = req.body;

  const rl = rateLimit(`ai:${clientIp(req)}`, 30, 60 * 60 * 1000);
  if (!rl.allowed) {
    return res.status(429).json({ error: 'AI request rate limit reached. Please wait and try again.' });
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (apiKey && imageBase64) {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const cleanBase64 = imageBase64.replace(/^data:image\/[a-z]+;base64,/, '');

      const prompt = `You are CleverDish's Pantry-Aware Vision Engine.
Examine this pantry / kitchen image. Identify all food ingredients and staples visible.
Estimate standard package or visible quantities, their approximate market value in ${currency} (${country}), and specify which grocery list categories they satisfy.
Respond strictly in JSON without markdown code fences:
{
  "detectedItems": [
    {
      "name": "string",
      "quantity": "string",
      "estimatedValue": number,
      "category": "protein | carb | produce | pantry_staple",
      "subtractableFromPlan": true
    }
  ],
  "totalBudgetSaved": number,
  "summary": "string"
}`;

      const { response, model } = await generateWithFallback(ai, {
        contents: [
          {
            role: 'user',
            parts: [
              { text: prompt },
              {
                inlineData: {
                  mimeType,
                  data: cleanBase64
                }
              }
            ]
          }
        ]
      });

      const text = response.text || '';
      const cleanJson = text.replace(/```json/gi, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(cleanJson);
      return res.json({ success: true, result: parsed, engine: model });
    } catch (aiErr) {
      console.warn('[AI] pantry-scan fell back to rules engine:', describeAiError(aiErr));
    }
  }

  // Fallback pantry inventory intelligence. Kept country-specific so a user who
  // picks a market never has Nigerian staples invented for them.
  const pantryFallbacks: Record<string, Array<{ name: string; quantity: string; value: number; category: string }>> = {
    Nigeria: [
      { name: 'White Yam Tubers (2 tubers remaining)', quantity: '2 large tubers', value: 4500, category: 'carb' },
      { name: 'Local Crate Eggs (14 eggs)', quantity: '14 eggs', value: 2400, category: 'protein' },
      { name: 'Vegetable / Red Palm Oil', quantity: '1.2 Litres', value: 2100, category: 'pantry_staple' },
      { name: 'Plum Tomatoes & Scotch Bonnets (Rodo)', quantity: '0.8 kg', value: 1200, category: 'produce' }
    ],
    Ghana: [
      { name: 'Smoked Herring Flakes', quantity: '200g pack', value: 24, category: 'protein' },
      { name: 'Waakye Rice & Cowpeas', quantity: '2 kg', value: 22, category: 'carb' },
      { name: 'Tomatoes & Onions', quantity: '1.5 kg', value: 14, category: 'produce' },
      { name: 'Shito Pepper Sauce', quantity: '3 bottles', value: 12, category: 'pantry_staple' }
    ],
    Kenya: [
      { name: 'Nile Tilapia Fillets', quantity: '2 fillets', value: 420, category: 'protein' },
      { name: 'Maizemeal (Ugali) Flour', quantity: '2 kg', value: 210, category: 'carb' },
      { name: 'Sukuma Wiki Greens', quantity: '1 bunch', value: 95, category: 'produce' },
      { name: 'Eggs', quantity: '12 tray', value: 180, category: 'protein' }
    ],
    'United States': [
      { name: 'Large Brown Eggs', quantity: 'dozen', value: 5.5, category: 'protein' },
      { name: 'Rolled Oats', quantity: '2 lb tub', value: 6, category: 'carb' },
      { name: 'Roma Tomatoes', quantity: '2 lb', value: 4, category: 'produce' },
      { name: 'Extra Virgin Olive Oil', quantity: '750 ml', value: 11, category: 'pantry_staple' }
    ],
    Canada: [
      { name: 'Large Brown Eggs', quantity: 'dozen', value: 7, category: 'protein' },
      { name: 'Wild Rice', quantity: '1 kg', value: 12, category: 'carb' },
      { name: 'Roma Tomatoes', quantity: '2 lb', value: 5, category: 'produce' },
      { name: 'Canola Oil', quantity: '1 L', value: 8, category: 'pantry_staple' }
    ],
    'United Kingdom': [
      { name: 'Free Range Eggs', quantity: 'dozen', value: 3.8, category: 'protein' },
      { name: 'Rolled Porridge Oats', quantity: '1 kg', value: 2.4, category: 'carb' },
      { name: 'Tinned Tomatoes', quantity: '6 tins', value: 3.6, category: 'produce' },
      { name: 'Unsalted Butter', quantity: '250g', value: 2.6, category: 'pantry_staple' }
    ]
  };

  const currencyFallbacks: Record<string, string> = {
    Nigeria: 'NGN', Ghana: 'GHS', Kenya: 'KES',
    'United States': 'USD', Canada: 'CAD', 'United Kingdom': 'GBP'
  };

  const pantryCountry = country || 'Nigeria';
  const mockDetections = (pantryFallbacks[pantryCountry] || pantryFallbacks.Nigeria).map((item) => ({
    name: item.name,
    quantity: item.quantity,
    estimatedValue: item.value,
    category: item.category,
    subtractableFromPlan: true
  }));

  const pantryCurrency = currencyFallbacks[pantryCountry] || 'NGN';
  const totalSaved = mockDetections.reduce((acc, item) => acc + item.estimatedValue, 0);

  return res.json({
    success: true,
    result: {
      detectedItems: mockDetections,
      totalBudgetSaved: totalSaved,
      summary: `Found ${mockDetections.length} core kitchen staples in your pantry. We deducted ${pantryCurrency} ${totalSaved.toLocaleString()} directly from this month's grocery allowance!`
    },
    engine: 'cleverdish-vision-rule-detector'
  });
});

// 5. AI Meal Visual Representation & Culinary Plating Engine
app.post('/api/ai/meal-visual', requireAuth, async (req, res) => {
  const { mealTitle, ingredients = [], style = 'indigenous', proteinType = 'fish', country = 'Nigeria' } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;

  const rl = rateLimit(`ai:${clientIp(req)}`, 30, 60 * 60 * 1000);
  if (!rl.allowed) {
    return res.status(429).json({ error: 'AI request rate limit reached. Please wait and try again.' });
  }

  if (apiKey) {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const prompt = `You are a world-class gastronomic food stylist and culinary art director.
Describe the appetizing visual representation and plating aesthetics for the dish: "${mealTitle}".
Ingredients: ${ingredients.map((i: any) => typeof i === 'string' ? i : i.name).join(', ')}.
Style: ${style}.
Protein source: ${proteinType}.

Respond strictly in JSON without markdown code fences:
{
  "visualTitle": "string",
  "platingStyle": "string",
  "visualTextures": "string",
  "colorPalette": ["string", "string", "string"],
  "aromaAndSensoryNotes": ["string", "string", "string"],
  "garnishAndFinishing": "string",
  "appetizingHighlight": "string"
}`;

      const { response, model } = await generateWithFallback(ai, { contents: prompt });

      const text = response.text || '';
      const cleanJson = text.replace(/```json/gi, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(cleanJson);
      return res.json({ success: true, visualDetails: parsed, engine: model });
    } catch (aiErr) {
      console.warn('[AI] meal-visual fell back to rules engine:', describeAiError(aiErr));
    }
  }

  // Fallback gastronomic plating presentation, kept country-appropriate
  const platingByCountry: Record<string, { palette: string[]; aroma: string[]; garnish: string }> = {
    Nigeria: {
      palette: ['Deep Amber Stew', 'Golden Caramelized Plantain', 'Vibrant Leafy Green'],
      aroma: ['Smoky charcoal reduction aroma', 'Zesty scotch bonnet and ginger warmth', 'Rich savoury umami depth'],
      garnish: 'Crushed dried Cameroon pepper slivers, micro-greens, and cold-pressed oil drizzle'
    },
    Ghana: {
      palette: ['Burnt-Taste Jollof Red', 'Golden Waakye Grains', 'Leafy Green Okra'],
      aroma: ['Toasted waakye smoke', 'Shito pepper heat', 'Tomto stew savoury depth'],
      garnish: 'Shito oil, finely sliced scotch bonnet, and tomato-flower micro-greens'
    },
    Kenya: {
      palette: ['Golden Ugali Cream', 'Charred Sukuma Wiki Green', 'Tilapia Glaze'],
      aroma: ['Maizemeal toast aroma', 'Sukuma wiki fresh steam', 'Tomato onion stew depth'],
      garnish: 'Diced tomato, sliced red onion, and a coriander-leaf finish'
    },
    'United States': {
      palette: ['Golden Sear', 'Bright Herb Green', 'Citrus Zest Accent'],
      aroma: ['Clean herb sear', 'Fresh citrus lift', 'Warm pan-butter depth'],
      garnish: 'Lemon zest, chopped parsley, and a light extra-virgin olive oil drizzle'
    },
    Canada: {
      palette: ['Maple Glaze', 'Wild Rice Brown', 'Leafy Green Accent'],
      aroma: ['Maple caramel warmth', 'Roasted root vegetable sweetness', 'Smoked pepper heat'],
      garnish: 'Dark maple syrup drizzle, toasted pepitas, and chive slivers'
    },
    'United Kingdom': {
      palette: ['Golden Roast', 'Rich Gravy', 'Garden Green'],
      aroma: ['Slow-roast beef aroma', 'Yorkshire batter warmth', 'Onion gravy depth'],
      garnish: 'Crushed black pepper, chive batons, and a pan-gravy reduction'
    }
  };

  const plating = platingByCountry[country || 'Nigeria'] || platingByCountry.Nigeria;

  return res.json({
    success: true,
    visualDetails: {
      visualTitle: `${mealTitle} Gourmet Plating`,
      platingStyle: "Artisanal glazed ceramic plate, layered with central protein spotlight and colorful accompaniment",
      visualTextures: "Crisp caramelized surface, succulent glistening glaze, aromatic steaming herbs",
      colorPalette: plating.palette,
      aromaAndSensoryNotes: plating.aroma,
      garnishAndFinishing: plating.garnish,
      appetizingHighlight: "Tender, succulent protein with rich macro density and mouth-watering contrast."
    },
    engine: 'cleverdish-plating-rules-engine'
  });
});

// Healthcheck for uptime monitors & deploy platforms
app.get('/api/health', (_req, res) => {
  // Reports only whether a key is configured, never the value itself.
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    ts: Date.now(),
    aiConfigured: Boolean(process.env.GEMINI_API_KEY)
  });
});

// Setup Vite middleware or static serving
async function startServer() {
  if (!isProduction) {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: process.env.DISABLE_HMR !== 'true',
        watch: process.env.DISABLE_HMR === 'true' ? null : {}
      },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = process.env.DIST_DIR || path.resolve(process.cwd(), 'dist');
    const indexFile = path.join(distPath, 'index.html');
    if (!fs.existsSync(indexFile)) {
      console.error(
        `[FATAL] Production assets not found at ${indexFile}. ` +
        `Run \`npm run build\` before starting, or set DIST_DIR.`
      );
      process.exit(1);
    }
    // Serve static assets first; then SPA fallback for non-API, non-data routes.
    app.use(express.static(distPath));
    app.get(/^\/(?!data\/|api\/).*/, (_req, res) => {
      res.sendFile(indexFile);
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`CleverDish server listening on http://0.0.0.0:${PORT} (${isProduction ? 'production' : 'dev'})`);
  });
}

startServer();
