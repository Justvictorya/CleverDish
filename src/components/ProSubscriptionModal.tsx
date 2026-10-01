import React from 'react';
import { UserProfile } from '../types';
import { Sparkles, Check, X, Shield, Crown, Zap } from 'lucide-react';
import { COUNTRIES, formatProPrice } from '../data/countries';
import { soundFX } from '../utils/sound';

interface ProSubscriptionModalProps {
  profile: UserProfile;
  isOpen: boolean;
  onClose: () => void;
  onUpgradePro: () => void;
}

export const ProSubscriptionModal: React.FC<ProSubscriptionModalProps> = ({
  profile,
  isOpen,
  onClose,
  onUpgradePro
}) => {
  if (!isOpen) return null;

  const country = COUNTRIES[profile.country] || COUNTRIES.NG;
  const proPrice = formatProPrice(profile.country);

  const handleUpgrade = () => {
    soundFX.playStreakCelebration();
    onUpgradePro();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden">
        {/* Banner */}
        <div className="bg-[#7A1C2C] text-white px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
              <Crown className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h3 className="font-extrabold text-base tracking-tight">CleverDish Pro Subscription</h3>
              <p className="text-xs text-white/80">Freemium Monetization Tier</p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg text-white/80 hover:text-white flex items-center justify-center">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <div className="text-center space-y-1">
            <div className="text-3xl font-black text-stone-900 font-mono tracking-tight">{proPrice}</div>
            <p className="text-xs text-stone-500">Cancel anytime · Free 7-day trial included</p>
          </div>

          <div className="space-y-2.5">
            {[
              { title: 'Unlimited AI Pantry Vision Scans 📸', desc: 'Scan any fridge or pantry shelf to shave money off your grocery plan.' },
              { title: 'Instant Inflation Swaps 🔄', desc: 'One-tap macro-equivalent swaps when market food prices surge.' },
              { title: 'Automated Travel Mode Sync ✈️', desc: 'Cross-border currency, purchasing power parity, and market reassignment.' },
              { title: 'Exclusive Verified Vendor Discounts 🛵', desc: 'Zero delivery fees on Chowdeck, Glovo, UberEats partner orders.' },
              { title: 'Open-Market Crowdsource Multiplier 📊', desc: 'Double reward points on Mile 12 & Bodija price contributions.' }
            ].map((f, i) => (
              <div key={i} className="flex items-start gap-3 p-2.5 rounded-xl bg-stone-50 border border-stone-200/80 text-xs">
                <div className="w-5 h-5 rounded-full bg-[#2ECC71]/10 text-[#2ECC71] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="font-bold text-stone-900">{f.title}</div>
                  <div className="text-stone-500 text-[11px] mt-0.5">{f.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={handleUpgrade}
            className="w-full py-3.5 bg-[#2ECC71] hover:bg-[#27ae60] text-white font-black text-sm rounded-2xl shadow-lg shadow-[#2ECC71]/25 flex items-center justify-center gap-2 transition-transform active:scale-98 cursor-pointer"
          >
            <Zap className="w-4 h-4 fill-current" />
            <span>{profile.isPro ? 'You are Already Pro' : 'Activate Pro Membership'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
