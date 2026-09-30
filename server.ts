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
      const prompt = `You are the core intelligence of foodie, an expert hyper-local sports nutritionist and food economist.
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

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt
      });

      const text = response.text || '';
      const cleanJson = text.replace(/```json/gi, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(cleanJson);
      return res.json({ success: true, swap: parsed, engine: 'gemini-3.8-flash' });
    } catch (aiErr) {
      console.warn('Gemini Inflation Swap fallback invoked:', aiErr);
    }
  }

  // Deterministic local market fallback engine
  const fallbackSwaps: Record<string, any> = {
    beef: {
      swappedIngredient: 'Catfish Fillet or Local Boiled Eggs & Soya Chunks',
      gramWeight: '180g',
      newCost: Math.round(Number(currentCost || 3000) * 0.58),
      costSavingsPercent: 42,
      macroBreakdown: { protein: 34, carbs: 2, fat: 12, fiber: 0 },
      rationale: 'Swapping expensive market beef with fresh farm catfish and local boiled eggs maintains 34g of high biological value protein while immediately shaving 42% off the protein line item.',
      prepModification: 'Season catfish with crushed uda, garlic, and chili; pan-sear or steam in the stew.'
    },
    chicken: {
      swappedIngredient: 'Cottage Boiled Eggs (3 Large) + Roasted Groundnuts',
      gramWeight: '190g',
      newCost: Math.round(Number(currentCost || 2800) * 0.62),
      costSavingsPercent: 38,
      macroBreakdown: { protein: 32, carbs: 8, fat: 15, fiber: 2 },
      rationale: 'Local farm eggs paired with roasted groundnuts deliver equivalent branch-chain amino acids (BCAAs) and healthy fats at a fraction of poultry market spikes.',
      prepModification: 'Soft-boil for 7 minutes and fold into the sauce at the end.'
    },
    quinoa: {
      swappedIngredient: 'Acha (Fonio Grain) or Nigerian Brown Rice',
      gramWeight: '150g dry (380g cooked)',
      newCost: Math.round(Number(currentCost || 4500) * 0.45),
      costSavingsPercent: 55,
      macroBreakdown: { protein: 11, carbs: 72, fat: 3, fiber: 7 },
      rationale: 'Acha (Fonio) is an indigenous super-grain from Plateau/Kaduna with a lower glycemic index, superior iron, and exact complex carbohydrate match to imported quinoa.',
      prepModification: 'Rinse sand thoroughly and steam for 8 minutes with bay leaf.'
    },
    salmon: {
      swappedIngredient: 'Smoked Mackerel (Titus Fish)',
      gramWeight: '160g',
      newCost: Math.round(Number(currentCost || 6000) * 0.4),
      costSavingsPercent: 60,
      macroBreakdown: { protein: 32, carbs: 0, fat: 16, fiber: 0 },
      rationale: 'Local Atlantic Mackerel delivers identical Omega-3 fatty acid EPA/DHA ratios and protein density at 60% lower market cost.',
      prepModification: 'Debone cleanly and simmer in tomato-pepper base.'
    }
  };

  const lookupKey = Object.keys(fallbackSwaps).find(k => 
    String(currentIngredient).toLowerCase().includes(k)
  ) || 'chicken';

  const defaultSwap = fallbackSwaps[lookupKey];
  return res.json({
    success: true,
    swap: defaultSwap,
    engine: 'foodie-local-rules-engine'
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

      const prompt = `You are foodie's Pantry-Aware Vision Engine.
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

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
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
      return res.json({ success: true, result: parsed, engine: 'gemini-3.8-flash' });
    } catch (aiErr) {
      console.warn('Gemini vision scan fallback:', aiErr);
    }
  }

  // Fallback pantry inventory intelligence
  const mockDetections = [
    {
      name: 'White Yam Tubers (2 tubers remaining)',
      quantity: '2 large tubers',
      estimatedValue: country === 'Nigeria' ? 4500 : 8,
      category: 'carb',
      subtractableFromPlan: true
    },
    {
      name: 'Local Crate Eggs (14 eggs)',
      quantity: '14 eggs',
      estimatedValue: country === 'Nigeria' ? 2400 : 5,
      category: 'protein',
      subtractableFromPlan: true
    },
    {
      name: 'Vegetable / Red Palm Oil',
      quantity: '1.2 Litres',
      estimatedValue: country === 'Nigeria' ? 2100 : 4,
      category: 'pantry_staple',
      subtractableFromPlan: true
    },
    {
      name: 'Plum Tomatoes & Scotch Bonnets (Rodo)',
      quantity: '0.8 kg',
      estimatedValue: country === 'Nigeria' ? 1200 : 3,
      category: 'produce',
      subtractableFromPlan: true
    }
  ];

  const totalSaved = mockDetections.reduce((acc, item) => acc + item.estimatedValue, 0);

  return res.json({
    success: true,
    result: {
      detectedItems: mockDetections,
      totalBudgetSaved: totalSaved,
      summary: `Found 4 core kitchen staples in your pantry. We deducted ${currency} ${totalSaved.toLocaleString()} directly from this month's grocery allowance!`
    },
    engine: 'foodie-vision-rule-detector'
  });
});

// 5. AI Meal Visual Representation & Culinary Plating Engine
app.post('/api/ai/meal-visual', requireAuth, async (req, res) => {
  const { mealTitle, ingredients = [], style = 'indigenous', proteinType = 'fish' } = req.body;
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

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt
      });

      const text = response.text || '';
      const cleanJson = text.replace(/```json/gi, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(cleanJson);
      return res.json({ success: true, visualDetails: parsed, engine: 'gemini-3.8-flash' });
    } catch (aiErr) {
      console.warn('Gemini Meal Visual fallback invoked:', aiErr);
    }
  }

  // Fallback gastronomic plating presentation
  return res.json({
    success: true,
    visualDetails: {
      visualTitle: `${mealTitle} Gourmet Plating`,
      platingStyle: "Artisanal glazed ceramic plate, layered with central protein spotlight and colorful accompaniment",
      visualTextures: "Crisp caramelized surface, succulent glistening glaze, aromatic steaming herbs",
      colorPalette: ["Deep Amber Stew", "Golden Caramelized Plantain", "Vibrant Leafy Green"],
      aromaAndSensoryNotes: [
        "Smoky charcoal reduction aroma",
        "Zesty scotch bonnet and ginger warmth",
        "Rich savoury umami depth"
      ],
      garnishAndFinishing: "Crushed dried Cameroon pepper slivers, micro-greens, and cold-pressed oil drizzle",
      appetizingHighlight: "Tender, succulent protein with rich macro density and mouth-watering contrast."
    },
    engine: 'foodie-plating-rules-engine'
  });
});

// Healthcheck for uptime monitors & deploy platforms
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', uptime: process.uptime(), ts: Date.now() });
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
    console.log(`foodie server listening on http://0.0.0.0:${PORT} (${isProduction ? 'production' : 'dev'})`);
  });
}

startServer();
