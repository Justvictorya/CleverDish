# 🍲 CleverDish — Smart Nutrition & Open-Market Budget Engine

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-7-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61dafb.svg)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38bdf8.svg)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-8.0-646cff.svg)](https://vitejs.dev/)

**CleverDish** is a culture-first, budget-intelligent nutrition web app designed for realistic everyday eating. Unlike traditional fitness apps that rely on Western barcodes and packaged goods, CleverDish calibrates **28-day rotational meal plans**, **real open-market food prices** (e.g., Mile 12, Bodija, Utako), **gamified plate photo verification**, and **batch-prep freezer economics**.

---

## 💡 The Core Problem It Solves

Mainstream fitness apps assume users shop at Whole Foods with pre-portioned calorie labels. They break down in emerging markets and multicultural households:
1. **Barcode Bias:** Most healthy meals in Africa, the Caribbean, and South Asia come from fresh open-air markets without barcodes.
2. **Food Inflation & Budget Volatility:** Food prices swing weekly; daily individual shopping bleeds disposable income.
3. **Fake Logging:** Users type in "1 bowl of soup" with zero accountability or accurate macro split.
4. **Prep Fatigue:** Cooking 3 individual meals daily is unsustainable for busy professionals and students.

**CleverDish bridges this gap** by anchoring authentic indigenous and continental meals to local currency purchasing power, photo-verified habit streaks, and batch-prep freezer vaults.

---

## 🌟 Key Features

### 1. 🍽️ 28-Day Rotational Meal Architecture
- **84 Sequenced Plates:** Full Morning 🌅, Afternoon ☀️, and Evening 🌙 culinary schedules designed with sequential protein alternation (Poultry 🍗, Fish 🐟, Legumes 🫘, Beef 🥩, Eggs 🥚).
- **Zero Monotony:** Eliminates "what should I eat today?" decision fatigue while preserving cultural comfort foods.
- **Portion & Macro Accuracy:** Every meal includes exact ingredient gram weights, calories, protein, carbs, fats, and step-by-step cooking prep instructions.

### 2. 📸 Habit Streak & Food Snap Verification
- **Anti-Cheat Plate Authentication:** Snap a photo of your plate before eating to verify your meal and keep your daily streak alive.
- **Instant Photo Matching:** Real-time client-side image processing ensures accountability and awards **+50 Clever XP**.
- **Streak Multipliers & Levels:** Progress from *Level 1 Kitchen Novice* to *Level 10 Grand Master Chef*.

### 3. 📊 Dedicated Body Statistics & Calorie Intake Dashboard
- **Mifflin-St Jeor Engine:** Scientifically calculates Basal Metabolic Rate (BMR) and Total Daily Energy Expenditure (TDEE).
- **Dynamic Energy Dial:** Real-time calorie gauge comparing daily consumed calories against target goals (Fat Shredder `-20%`, Zen Balance `100%`, Muscle Titan `+10%`).
- **Interactive Macro Visualizers:** 7-day Calorie & Macro AreaCharts and Weekly Adherence BarCharts powered by Recharts.
- **Hand-Size Portion Guide:** Scale-free measuring system (Palm = Protein, Fist = Veggies, Cupped Hand = Carbs, Thumb = Healthy Fats).

### 4. 🛒 Open-Market Solvency & Pocket Money Engine
- **Local Market Grounding:** Calibrated to real market hubs (Mile 12 Market Lagos, Bodija Ibadan, Utako Abuja, Oyingbo, etc.).
- **Saturday Bulk Market Run:** Aggregates a 7-day consolidated grocery shopping list to save ~18% compared to daily roadside purchases.
- **Big Pot Freezer Vault:** Log and manage portions from weekend batch cooking (Egusi, Stew, Jollof) for 5-minute reheating at **₦0 marginal daily spend**.
- **Crowdsourced Price Ledger:** Community-powered price verification with receipt audits to track market staple price shifts.

### 5. 🛍️ Verified Vendors Ecosystem
- Contextual **"Order from Verified Vendors"** links embedded inside each dish.
- One-tap handoff to regional on-demand food delivery networks (Chowdeck, Glovo) and vetted fresh food vendors.
- Transparent Hygiene Scores (98%+) and Price Stability ratings.

### 6. 🎮 Gamified Chef Induction & Community Quests
- **Character Archetypes:** Pick from 6 unique Chef Personas (Batch Prep Wizard, Flavor Alchemist, Turbo Shredder, Macro Zen Master, etc.).
- **Starter Loot Crate:** Interactive welcome chest with bonus Clever Coins and starter badges.
- **Daily Quests & Trophies:** Daily objectives (Log 3 meals, Check market ledger, Prep batch soup) that award unlockable badges and XP.
- **Web Audio Sound Effects:** Arcade chimes, celebratory fanfares, and tap feedback.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Frontend Framework** | React 19 (TypeScript) |
| **Build Tool & Bundler** | Vite 8 |
| **Styling** | Tailwind CSS v4 |
| **Data Visualization** | Recharts (AreaChart, BarChart, ResponsiveContainer) |
| **Icons** | Lucide React |
| **Animations & Confetti** | Canvas-Confetti, Tailwind transitions |
| **Audio Engine** | Web Audio API (Synthesized dynamic sound effects) |
| **Backend / Proxy** | Express.js (Node.js / TSX runtime) |
| **AI Integration** | Google GenAI SDK (`@google/genai`) |

---

## 📂 Project Structure

```
├── public/                     # Static assets & icons
├── src/
│   ├── components/             # Reusable UI components
│   │   ├── AccomplishmentCenterModal.tsx # Trophy room & badges
│   │   ├── BodyStatisticsTab.tsx         # Dedicated body stats & calorie intake tab
│   │   ├── DailyMealCard.tsx             # Interactive 3-plate meal cards with prep & snap
│   │   ├── HandPortionModal.tsx          # Scale-free hand portion guide
│   │   ├── MacroHistory.tsx              # 7-day calorie & macro trend charts
│   │   ├── MarketLedgerModal.tsx         # Crowdsourced open-market price ledger
│   │   ├── Navbar.tsx                    # Header with avatar, level, streak, & tabs
│   │   ├── PocketMoneyWallet.tsx         # Daily spend & solvency tracker
│   │   ├── SignUpOnboardingFlow.tsx      # Gamified 5-stage chef induction flow
│   │   ├── StreakMiniCard.tsx            # Daily snap ritual & habit tracker
│   │   ├── WeeklyMacroChart.tsx          # Adherence bar charts
│   │   └── WeeklyMarketRunModal.tsx      # 7-day consolidated grocery run
│   ├── data/                   # Initial seeds, meals, countries, vendors
│   │   ├── countries.ts        # Currency symbols, markets, conversion benchmarks
│   │   ├── defaultQuests.ts    # Gamified daily quests
│   │   ├── meals.ts            # 28-day rotational meals engine (84 plates)
│   │   └── vendors.ts          # Vetted restaurants & grocery delivery partners
│   ├── types/                  # Strict TypeScript definitions & interfaces
│   ├── utils/                  # Nutrition math, BMR formulas, Web Audio FX
│   │   ├── nutrition.ts        # Mifflin-St Jeor calculations & macro splits
│   │   └── sound.ts            # Web Audio synthesizer for gamified feedback
│   ├── App.tsx                 # Core application controller & view router
│   ├── main.tsx                # React DOM entry point
│   └── index.css               # Tailwind global imports
├── server.ts                   # Express API server & static asset delivery
├── metadata.json               # AI Studio application metadata
└── package.json                # Dependencies & scripts
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm package manager

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Justvictorya/CleverDish.git
   cd CleverDish
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment (optional):**
   ```bash
   cp .env.example .env
   ```
   Add a `GEMINI_API_KEY` from [Google AI Studio](https://aistudio.google.com/apikey) to enable
   real Gemini responses. Without it the app runs on its built-in local fallback engines.

3. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Typecheck & Lint:**
   ```bash
   npm run lint
   ```

---

## 🌍 Supported Territories
CleverDish comes pre-configured with native currencies, staple foods, and market hubs for:
- 🇳🇬 **Nigeria (NGN - ₦):** Mile 12, Bodija, Utako, Oyingbo Markets
- 🇬🇭 **Ghana (GHS - GH₵):** Makola, Kejetia Markets
- 🇰🇪 **Kenya (KES - KSh):** Wakulima, City Market Nairobi
- 🇺🇸 **United States (USD - $):** Whole Foods, Trader Joe's, Local Farmers Markets
- 🇬🇧 **United Kingdom (GBP - £):** Tesco, Sainsbury's, Borough Market
- 🇨🇦 **Canada (CAD - C$):** Loblaws, No Frills, St. Lawrence Market

---

## 🚀 Deployment

CleverDish ships as a single Node service that serves both the API and the built SPA.

**Build command**
```bash
npm ci && npm run build
```

**Start command**
```bash
npm start
```

`npm start` runs the server in production mode, serving the compiled assets from `dist/`.
A `render.yaml` and `railway.json` are included for one-click deploys.

### Environment variables

| Variable | Required | Purpose |
|---|---|---|
| `GEMINI_API_KEY` | optional | Enables real Gemini output. Omit to use local fallback engines. |
| `PORT` | no | HTTP port (default `3000`). |
| `DATA_DIR` | recommended in production | Path for persisted price ledger, auth tokens and plate photos. Point at a mounted disk. |
| `NODE_ENV` | set by `npm start` | `production` serves the built assets. |

> **Persistence:** price samples, overrides, auth tokens and uploaded photos are written to
> `DATA_DIR`. On hosts with an ephemeral filesystem (e.g. a free instance) this data resets on
> redeploy — attach a persistent disk and set `DATA_DIR` to keep it.

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
