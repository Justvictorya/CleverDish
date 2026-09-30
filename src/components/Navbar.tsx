import React from 'react';
import { UserProfile } from '../types';
import { COUNTRIES } from '../data/countries';
import {
  Flame,
  Wallet,
  Globe,
  Settings,
  Store,
  BookOpen,
  HeartHandshake,
  Crown,
  Database,
  Camera,
  Calendar,
  Sun,
  Moon,
  ShoppingCart,
  Snowflake,
  Trophy,
  Sparkles
} from 'lucide-react';
import { getChefTier } from '../utils/gamification';

interface NavbarProps {
  profile: UserProfile;
  activeTab: 'today' | 'rotation' | 'analytics' | 'wallet' | 'vendors' | 'ledger';
  isDarkMode?: boolean;
  onToggleDarkMode?: () => void;
  onSelectTab: (tab: 'today' | 'rotation' | 'analytics' | 'wallet' | 'vendors' | 'ledger') => void;
  onOpenOnboarding: () => void;
  onOpenTravelMode: () => void;
  onOpenCookbook: () => void;
  onOpenSendFoodHome: () => void;
  onOpenPro: () => void;
  onOpenSql: () => void;
  onOpenPantryScanner: () => void;
  onOpenMarketRun?: () => void;
  onOpenFreezerVault?: () => void;
  onOpenAccomplishments?: () => void;
  freezerCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  profile,
  activeTab,
  isDarkMode = false,
  onToggleDarkMode,
  onSelectTab,
  onOpenOnboarding,
  onOpenTravelMode,
  onOpenCookbook,
  onOpenSendFoodHome,
  onOpenPro,
  onOpenSql,
  onOpenPantryScanner,
  onOpenMarketRun,
  onOpenFreezerVault,
  onOpenAccomplishments,
  freezerCount = 0
}) => {
  const country = COUNTRIES[profile.country] || COUNTRIES.NG;
  const dailyAllowance = Math.round(profile.monthlyBudget / 30);
  const currentXp = profile.xp ?? profile.cleverPoints ?? 380;
  const currentTier = getChefTier(currentXp);

  return (
    <header className="sticky top-0 z-40 bg-[#7A1C2C] text-white shadow-md select-none">
      {/* Upper Brand Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between border-b border-white/10">
        {/* Brand Logo: CleverDish */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-white text-[#7A1C2C] flex items-center justify-center font-black text-xl shadow-md relative overflow-hidden group">
            <span className="text-xl">🍲</span>
            <span className="absolute bottom-0.5 right-0.5 w-2 h-2 rounded-full bg-[#2ECC71]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight flex items-center gap-1">
                <span>CleverDish</span>
                <span className="text-[#2ECC71] text-xs">✨</span>
              </span>
              {profile.isPro && (
                <span className="text-[10px] font-black uppercase tracking-wider bg-amber-400 text-stone-900 px-1.5 py-0.5 rounded-md">
                  PRO
                </span>
              )}
            </div>
            <p className="text-[10px] text-white/75 font-mono hidden sm:block">
              Smart Nutrition · 28-Day Rotation · Local Market Budget Engine
            </p>
          </div>
        </div>

        {/* Right metrics and tools */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Chef Level & Trophies Button (Gamified Accomplishment Center) */}
          {onOpenAccomplishments && (
            <button
              onClick={onOpenAccomplishments}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-500/20 to-amber-400/10 hover:from-amber-500/30 hover:to-amber-400/20 rounded-xl border border-amber-300/30 text-xs font-bold transition-all cursor-pointer shadow-xs active:scale-95"
              title="Open Accomplishment & Trophy Room"
            >
              <Trophy className="w-4 h-4 text-amber-300" />
              <span className="font-mono text-amber-200">
                Lv.{currentTier.level} {currentTier.badgeEmoji}
              </span>
              <span className="text-[10px] text-white/70 font-mono hidden md:inline">
                {currentXp} XP
              </span>
            </button>
          )}

          {/* Active Streak Flame Button */}
          <div
            onClick={onOpenAccomplishments}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-black/20 rounded-xl border border-white/10 text-xs font-bold cursor-pointer hover:bg-black/30 transition-colors"
            title="Current Streak"
          >
            <Flame className="w-4 h-4 text-orange-400 fill-orange-400 animate-pulse" />
            <span className="font-mono text-white">{profile.streak}d</span>
          </div>

          {/* Daily Pocket Money Quick Balance */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-black/20 rounded-xl border border-white/10 text-xs">
            <Wallet className="w-3.5 h-3.5 text-[#2ECC71]" />
            <span className="text-white/80 font-mono">
              Cap: <strong className="text-white">{country.currencySymbol}{dailyAllowance.toLocaleString()}</strong>/d
            </span>
          </div>

          {/* Country Selector / Travel Mode */}
          <button
            onClick={onOpenTravelMode}
            className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white/10 hover:bg-white/20 rounded-xl border border-white/10 text-xs font-medium transition-colors"
            title="Active Country / Travel Mode"
          >
            <span>{country.flag}</span>
            <span className="font-mono hidden md:inline">{country.currency}</span>
          </button>

          {/* Pantry Scanner Camera Button */}
          <button
            onClick={onOpenPantryScanner}
            className="px-2.5 py-1.5 bg-[#2ECC71] hover:bg-[#27ae60] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-transform active:scale-95"
            title="Scan Pantry to Deduct Budget"
          >
            <Camera className="w-4 h-4" />
            <span className="hidden md:inline">Scan Pantry</span>
          </button>

          {/* Dark Mode Toggle */}
          {onToggleDarkMode && (
            <button
              onClick={onToggleDarkMode}
              className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/90 hover:text-white transition-colors"
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-white" />}
            </button>
          )}

          {/* Chef Avatar & Profile Button */}
          <button
            onClick={onOpenOnboarding}
            className="flex items-center gap-1.5 px-2.5 py-1 bg-black/20 hover:bg-black/30 rounded-xl border border-white/10 text-xs font-bold transition-colors cursor-pointer"
            title={`${profile.name} · ${profile.kitchenTitle || 'Clever Chef'}`}
          >
            <span className="text-sm">{profile.avatar || '🧑‍🍳'}</span>
            <span className="text-white hidden lg:inline max-w-[90px] truncate">{profile.name}</span>
          </button>

          {/* Settings / Biometrics */}
          <button
            onClick={onOpenOnboarding}
            className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/90 hover:text-white transition-colors"
            title="Configure Biometrics & Budget Goals"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Primary Sub-Nav Bar (Clean typography & active indicators) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between overflow-x-auto scrollbar-none py-1.5 text-xs font-bold">
        <div className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => onSelectTab('today')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'today'
                ? 'bg-white text-[#7A1C2C] shadow-xs'
                : 'text-white/80 hover:text-white hover:bg-white/10'
            }`}
          >
            Today's Meals 🍽️
          </button>

          <button
            onClick={() => onSelectTab('analytics')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'analytics'
                ? 'bg-white text-[#7A1C2C] shadow-xs'
                : 'text-white/80 hover:text-white hover:bg-white/10'
            }`}
          >
            Body Statistics & Calories 📊
          </button>

          <button
            onClick={() => onSelectTab('vendors')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'vendors'
                ? 'bg-white text-[#7A1C2C] shadow-xs'
                : 'text-white/80 hover:text-white hover:bg-white/10'
            }`}
          >
            Verified Vendors 🛍️
          </button>

          <button
            onClick={() => onSelectTab('rotation')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'rotation'
                ? 'bg-white text-[#7A1C2C] shadow-xs'
                : 'text-white/80 hover:text-white hover:bg-white/10'
            }`}
          >
            28-Day Rotation 🗓️
          </button>

          <button
            onClick={() => onSelectTab('wallet')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'wallet'
                ? 'bg-white text-[#7A1C2C] shadow-xs'
                : 'text-white/80 hover:text-white hover:bg-white/10'
            }`}
          >
            Pocket Wallet 👛
          </button>

          <button
            onClick={() => onSelectTab('ledger')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'ledger'
                ? 'bg-white text-[#7A1C2C] shadow-xs'
                : 'text-white/80 hover:text-white hover:bg-white/10'
            }`}
          >
            Open-Market Ledger 🛒
          </button>
        </div>

        {/* Global / V2 Feature Quick Links */}
        <div className="hidden lg:flex items-center gap-2 text-white/80">
          {onOpenMarketRun && (
            <button
              onClick={onOpenMarketRun}
              className="hover:text-white flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold"
            >
              <ShoppingCart className="w-3.5 h-3.5 text-amber-300" />
              <span>Market Run 🛒</span>
            </button>
          )}

          {onOpenFreezerVault && (
            <button
              onClick={onOpenFreezerVault}
              className="hover:text-white flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold"
            >
              <Snowflake className="w-3.5 h-3.5 text-cyan-300" />
              <span>Freezer Vault {freezerCount > 0 && `(${freezerCount})`}</span>
            </button>
          )}

          <button
            onClick={onOpenCookbook}
            className="hover:text-white flex items-center gap-1 px-2 py-1 rounded hover:bg-white/10"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#2ECC71]" />
            <span>Cookbook</span>
          </button>

          <button
            onClick={onOpenSendFoodHome}
            className="hover:text-white flex items-center gap-1 px-2 py-1 rounded hover:bg-white/10"
          >
            <HeartHandshake className="w-3.5 h-3.5 text-amber-300" />
            <span>Send Food Home</span>
          </button>

          <button
            onClick={onOpenSql}
            className="hover:text-white flex items-center gap-1 px-2 py-1 rounded hover:bg-white/10 text-[11px] font-mono"
            title="View V2 SQL persistence schema"
          >
            <Database className="w-3 h-3 text-cyan-300" />
            <span>SQL V2</span>
          </button>

          {!profile.isPro && (
            <button
              onClick={onOpenPro}
              className="bg-amber-400 hover:bg-amber-300 text-stone-900 px-2.5 py-1 rounded-lg text-xs font-black flex items-center gap-1 ml-2 transition-transform active:scale-95"
            >
              <Crown className="w-3.5 h-3.5" />
              <span>Get Pro</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
