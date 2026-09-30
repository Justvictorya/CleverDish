import React, { useState } from 'react';
import { UserProfile, CountryCode } from '../types';
import { COUNTRIES } from '../data/countries';
import { Plane, ShieldAlert, Check, X, ArrowRight, Sparkles, MapPin } from 'lucide-react';
import { soundFX } from '../utils/sound';

interface TravelModeModalProps {
  profile: UserProfile;
  isOpen: boolean;
  onClose: () => void;
  onUpdateCountry: (country: CountryCode, isTravelMode: boolean) => void;
}

export const TravelModeModal: React.FC<TravelModeModalProps> = ({
  profile,
  isOpen,
  onClose,
  onUpdateCountry
}) => {
  const [selectedTravelCountry, setSelectedTravelCountry] = useState<CountryCode>(
    profile.country === 'NG' ? 'UK' : 'NG'
  );
  const [activeTravelMode, setActiveTravelMode] = useState<boolean>(profile.travelModeActive);

  if (!isOpen) return null;

  const homeCountryConfig = COUNTRIES[profile.homeCountry] || COUNTRIES.NG;
  const destinationConfig = COUNTRIES[selectedTravelCountry] || COUNTRIES.UK;

  // Purchasing power parity comparison
  const pppMultiplier = (destinationConfig.exchangeRateToUSD / homeCountryConfig.exchangeRateToUSD);
  const homeDailyBudget = Math.round(profile.monthlyBudget / 30);
  const destinationEquivalentDaily = Math.round(
    (homeDailyBudget / homeCountryConfig.exchangeRateToUSD) * destinationConfig.exchangeRateToUSD
  );

  const handleApply = () => {
    soundFX.playTap();
    onUpdateCountry(activeTravelMode ? selectedTravelCountry : profile.homeCountry, activeTravelMode);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden">
        {/* Banner */}
        <div className="bg-[#7A1C2C] text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
              <Plane className="w-5 h-5 text-[#2ECC71]" />
            </div>
            <div>
              <h3 className="font-bold text-base tracking-tight">Secure Travel Mode (V2) ✈️</h3>
              <p className="text-xs text-white/80">Cross-border intelligence & non-disruptive currency sync</p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg text-white/80 hover:text-white flex items-center justify-center">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Security Principle Note */}
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Zero Silent Switch Guarantee: </span>
              CleverDish never silently updates your meal plan or budget based on GPS/IP detection. Your baseline home currency ({homeCountryConfig.currency}) remains anchored until you explicitly activate Travel Mode.
            </div>
          </div>

          {/* Toggle Travel Mode */}
          <div className="flex items-center justify-between p-3.5 bg-stone-50 border border-stone-200 rounded-2xl">
            <div>
              <div className="text-xs font-bold text-stone-900">Activate Travel Mode</div>
              <div className="text-[11px] text-stone-500">Temporarily reprices daily meals into destination currency</div>
            </div>
            <button
              type="button"
              onClick={() => setActiveTravelMode(!activeTravelMode)}
              className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                activeTravelMode ? 'bg-[#2ECC71]' : 'bg-stone-300'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-sm absolute top-0.5 transition-transform ${
                  activeTravelMode ? 'left-6.5' : 'left-0.5'
                }`}
              />
            </button>
          </div>

          {/* Choose Travel Destination */}
          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
              Select Current Travel Destination:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {Object.values(COUNTRIES).map((c) => (
                <button
                  key={c.code}
                  type="button"
                  onClick={() => setSelectedTravelCountry(c.code)}
                  className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                    selectedTravelCountry === c.code
                      ? 'border-[#7A1C2C] bg-[#7A1C2C]/5 font-bold text-[#7A1C2C]'
                      : 'border-stone-200 bg-white text-stone-700'
                  }`}
                >
                  <div className="text-xl mb-1">{c.flag}</div>
                  <div className="truncate">{c.name}</div>
                  <div className="text-[10px] text-stone-400 font-mono">{c.currency}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Cross-border Conversion Preview */}
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/90 space-y-2 text-xs">
            <div className="font-bold text-stone-700 uppercase tracking-wider text-[10px]">
              Purchasing Power & Daily Allowance Parity:
            </div>
            <div className="flex items-center justify-between text-sm">
              <div>
                <div className="text-[10px] text-stone-400">Home ({homeCountryConfig.code})</div>
                <div className="font-bold font-mono text-stone-800">
                  {homeCountryConfig.currencySymbol}{homeDailyBudget.toLocaleString()} / day
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-stone-400" />
              <div className="text-right">
                <div className="text-[10px] text-stone-400">Destination ({destinationConfig.code})</div>
                <div className="font-bold font-mono text-[#2ECC71]">
                  {destinationConfig.currencySymbol}{destinationEquivalentDaily.toLocaleString()} / day
                </div>
              </div>
            </div>
            <p className="text-[11px] text-stone-500 pt-1 border-t border-stone-200">
              Local market checklists automatically redirect to {destinationConfig.name}'s verified vendors and grocers.
            </p>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 px-4 bg-stone-100 text-stone-700 font-semibold text-xs rounded-xl"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleApply}
              className="flex-1 py-2.5 px-4 bg-[#7A1C2C] hover:bg-[#631623] text-white font-bold text-xs rounded-xl shadow-md"
            >
              Update Travel Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
