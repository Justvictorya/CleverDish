import React, { useEffect, useRef, useState } from 'react';
import { UserProfile } from '../types';
import { COUNTRIES } from '../data/countries';
import {
  Wallet,
  Globe,
  Settings,
  Store,
  BookOpen,
  HeartHandshake,
  Crown,
  Database,
  Camera,
  Sun,
  Moon,
  ShoppingCart,
  Snowflake,
  Trophy,
  Volume2,
  VolumeX
} from 'lucide-react';
import { getChefTier } from '../utils/gamification';

interface NavbarProps {
  profile: UserProfile;
  activeTab: 'today' | 'rotation' | 'analytics' | 'wallet' | 'vendors' | 'ledger';
  isDarkMode?: boolean;
  onToggleDarkMode?: () => void;
  soundEnabled?: boolean;
  onToggleSound?: () => void;
  onSelectTab: (tab: 'today' | 'rotation' | 'analytics' | 'wallet' | 'vendors' | 'ledger') => void;
  onOpenOnboarding: () => void;
  onOpenTravelMode: () => void;
  onOpenCookbook: () => void;
  onOpenSendFoodHome: () => void;
  onOpenPro: () => void;
  onOpenPantryScanner: () => void;
  onOpenMarketRun?: () => void;
  onOpenFreezerVault?: () => void;
  onOpenAccomplishments?: () => void;
  onOpenReminders?: () => void;
  remindersActive?: boolean;
  freezerCount?: number;
}

const PRIMARY_TABS: { id: NavbarProps['activeTab']; label: string; emoji: string }[] = [
  { id: 'today', label: 'Today', emoji: '🍽️' },
  { id: 'rotation', label: 'Plan', emoji: '🗓️' },
  { id: 'analytics', label: 'Progress', emoji: '📊' },
  { id: 'wallet', label: 'Market', emoji: '👛' }
];

export const Navbar: React.FC<NavbarProps> = ({
  profile,
  activeTab,
  isDarkMode = false,
  onToggleDarkMode,
  soundEnabled = false,
  onToggleSound,
  onSelectTab,
  onOpenOnboarding,
  onOpenTravelMode,
  onOpenCookbook,
  onOpenSendFoodHome,
  onOpenPro,
  onOpenPantryScanner,
  onOpenMarketRun,
  onOpenFreezerVault,
  onOpenAccomplishments,
  onOpenReminders,
  remindersActive = false,
  freezerCount = 0
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const country = COUNTRIES[profile.country] || COUNTRIES.NG;
  const currentXp = profile.xp ?? profile.cleverPoints ?? 380;
  const currentTier = getChefTier(currentXp);
  const isChefMode = profile.experienceMode === 'chef';

  useEffect(() => {
    if (!menuOpen) return;
    const onDocClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  // Runs a menu action and closes the menu in one motion.
  const run = (fn?: () => void) => () => {
    setMenuOpen(false);
    fn?.();
  };

  const itemClass =
    'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-sm font-semibold text-stone-700 dark:text-zinc-200 hover:bg-stone-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer';

  return (
    <header className="sticky top-0 z-40 bg-[#7A1C2C] text-white shadow-md select-none">
      {/* Brand bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-white text-[#7A1C2C] flex items-center justify-center font-black text-xl shadow-md relative overflow-hidden">
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
              {isChefMode && (
                <span className="text-[10px] font-black uppercase tracking-wider bg-white/15 text-amber-200 px-1.5 py-0.5 rounded-md hidden sm:inline">
                  Lv.{currentTier.level} {currentTier.badgeEmoji}
                </span>
              )}
            </div>
            <p className="text-[10px] text-white/75 font-mono hidden sm:block">
              Smart Nutrition · 28-Day Rotation · Local Market Budget Engine
            </p>
          </div>
        </div>

        {/* Single account control — everything else lives one tap in */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="flex items-center gap-2 pl-1.5 pr-2.5 py-1.5 bg-black/20 hover:bg-black/30 rounded-xl border border-white/10 text-xs font-bold transition-colors cursor-pointer"
            title="Account & settings"
            aria-haspopup="menu"
            aria-expanded={menuOpen}
          >
            <span className="text-base">{profile.avatar || '🧑‍🍳'}</span>
            <span className="hidden lg:inline max-w-[90px] truncate">{profile.name || 'You'}</span>
            {remindersActive && <span className="w-2 h-2 rounded-full bg-[#2ECC71]" title="Reminders on" />}
          </button>

          {menuOpen && (
            <div
              role="menu"
              className="absolute right-0 mt-2 z-50 w-72 max-h-[80vh] overflow-y-auto rounded-2xl bg-white dark:bg-[#18181B] text-stone-800 dark:text-zinc-100 shadow-2xl border border-stone-200 dark:border-zinc-800 p-3 space-y-3"
            >
              {/* Identity */}
              <div className="flex items-center gap-3 px-1 pb-3 border-b border-stone-100 dark:border-zinc-800">
                <div className="w-11 h-11 rounded-2xl bg-stone-100 dark:bg-zinc-800 flex items-center justify-center text-2xl">
                  {profile.avatar || '🧑‍🍳'}
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-sm truncate">{profile.name || 'Your kitchen'}</div>
                  <div className="text-[11px] text-stone-500 dark:text-zinc-400 truncate">
                    {country.flag} {country.name} · {profile.streak}d streak
                  </div>
                </div>
              </div>

              {/* Go to */}
              <div className="space-y-0.5">
                <MenuLabel>Go to</MenuLabel>
                {onOpenMarketRun && (
                  <button className={itemClass} onClick={run(onOpenMarketRun)} role="menuitem">
                    <ShoppingCart className="w-4 h-4 text-amber-500" /> Market Run
                  </button>
                )}
                <button className={itemClass} onClick={run(() => onSelectTab('vendors'))} role="menuitem">
                  <Store className="w-4 h-4 text-[#2ECC71]" /> Market Place
                </button>
                <button className={itemClass} onClick={run(() => onSelectTab('ledger'))} role="menuitem">
                  <Database className="w-4 h-4 text-cyan-500" /> Market Ledger
                </button>
                {onOpenFreezerVault && (
                  <button className={itemClass} onClick={run(onOpenFreezerVault)} role="menuitem">
                    <Snowflake className="w-4 h-4 text-cyan-400" /> Freezer Vault
                    {freezerCount > 0 && (
                      <span className="ml-auto text-[10px] font-mono bg-stone-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded-md">
                        {freezerCount}
                      </span>
                    )}
                  </button>
                )}
                <button className={itemClass} onClick={run(onOpenCookbook)} role="menuitem">
                  <BookOpen className="w-4 h-4 text-[#7A1C2C] dark:text-rose-400" /> Cookbook
                </button>
                <button className={itemClass} onClick={run(onOpenSendFoodHome)} role="menuitem">
                  <HeartHandshake className="w-4 h-4 text-amber-500" /> Send Food Home
                </button>
              </div>

              {/* Settings */}
              <div className="space-y-0.5 pt-2 border-t border-stone-100 dark:border-zinc-800">
                <MenuLabel>Settings</MenuLabel>
                <button className={itemClass} onClick={run(onOpenTravelMode)} role="menuitem">
                  <Globe className="w-4 h-4 text-stone-400" /> Country &amp; Travel
                </button>
                {onOpenReminders && (
                  <button className={itemClass} onClick={run(onOpenReminders)} role="menuitem">
                    <span className="w-4 h-4 flex items-center justify-center text-stone-400">🔔</span> Meal Reminders
                    {remindersActive && <span className="ml-auto text-[10px] font-bold text-[#2ECC71]">ON</span>}
                  </button>
                )}
                <button className={itemClass} onClick={run(onOpenPantryScanner)} role="menuitem">
                  <Camera className="w-4 h-4 text-[#2ECC71]" /> Scan Pantry
                </button>
                {onToggleSound && (
                  <button className={itemClass} onClick={run(onToggleSound)} role="menuitem" aria-pressed={soundEnabled}>
                    {soundEnabled ? <Volume2 className="w-4 h-4 text-[#2ECC71]" /> : <VolumeX className="w-4 h-4 text-stone-400" />}
                    Sound effects
                    <span className="ml-auto text-[10px] font-bold text-stone-400">{soundEnabled ? 'ON' : 'OFF'}</span>
                  </button>
                )}
                {onToggleDarkMode && (
                  <button className={itemClass} onClick={run(onToggleDarkMode)} role="menuitem">
                    {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-stone-400" />}
                    {isDarkMode ? 'Light mode' : 'Dark mode'}
                  </button>
                )}
                <button className={itemClass} onClick={run(onOpenOnboarding)} role="menuitem">
                  <Settings className="w-4 h-4 text-stone-400" /> Profile &amp; Goals
                </button>
              </div>

              {/* Account / game — only when relevant */}
              {(isChefMode || !profile.isPro) && (
                <div className="space-y-0.5 pt-2 border-t border-stone-100 dark:border-zinc-800">
                  {isChefMode && onOpenAccomplishments && (
                    <button className={itemClass} onClick={run(onOpenAccomplishments)} role="menuitem">
                      <Trophy className="w-4 h-4 text-amber-400" /> Trophy Room
                    </button>
                  )}
                  {!profile.isPro && (
                    <button
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-900 text-sm font-black transition-colors cursor-pointer"
                      onClick={run(onOpenPro)}
                      role="menuitem"
                    >
                      <Crown className="w-4 h-4" /> Get Pro
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Primary navigation — four places, nothing else */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-1 sm:gap-2 overflow-x-auto scrollbar-none py-1.5 text-xs font-bold">
        {PRIMARY_TABS.map((tab) => {
          const active =
            activeTab === tab.id ||
            (tab.id === 'wallet' && (activeTab === 'ledger' || activeTab === 'vendors'));
          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`px-3 sm:px-4 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                active ? 'bg-white text-[#7A1C2C] shadow-xs' : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              <span className="mr-1">{tab.emoji}</span>
              {tab.label}
            </button>
          );
        })}
        <div className="ml-auto hidden lg:flex items-center gap-2 pr-1 text-[11px] font-mono text-white/60">
          <Wallet className="w-3.5 h-3.5 text-[#2ECC71]" />
          {country.currencySymbol}
          {Math.round((profile.monthlyBudget || 0) / 30).toLocaleString()}/day
        </div>
      </nav>
    </header>
  );
};

const MenuLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="px-2 pt-1 pb-0.5 text-[10px] font-black uppercase tracking-wider text-stone-400 dark:text-zinc-500">
    {children}
  </div>
);
