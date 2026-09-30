import React, { useState, useEffect } from 'react';
import { UserProfile, PriceSample } from '../types';
import { Store, Plus, CheckCircle2, TrendingUp, Sparkles, X, ShieldAlert, Award } from 'lucide-react';
import { COUNTRIES } from '../data/countries';
import { soundFX } from '../utils/sound';
import { apiFetch } from '../utils/api';

interface MarketLedgerModalProps {
  profile: UserProfile;
  isOpen: boolean;
  onClose: () => void;
  onPointsAwarded: (pts: number) => void;
}

export const MarketLedgerModal: React.FC<MarketLedgerModalProps> = ({
  profile,
  isOpen,
  onClose,
  onPointsAwarded
}) => {
  const [samples, setSamples] = useState<PriceSample[]>([]);
  const [overrides, setOverrides] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(false);
  const [showSubmitForm, setShowSubmitForm] = useState(false);

  // Form states
  const [stapleId, setStapleId] = useState('garri_white');
  const [stapleName, setStapleName] = useState('White Garri (Paint Bucket / 4kg)');
  const [marketName, setMarketName] = useState('Mile 12 Market, Lagos');
  const [priceInput, setPriceInput] = useState('');
  const [submitSuccessMsg, setSubmitSuccessMsg] = useState<string | null>(null);

  const country = COUNTRIES[profile.country] || COUNTRIES.NG;

  const STAPLE_OPTIONS = [
    { id: 'garri_white', name: 'White Garri (Paint Bucket / 4kg)' },
    { id: 'yam_medium', name: 'Tubers of White Yam (5 Large Tubers)' },
    { id: 'chicken_breast', name: 'Fresh Chicken Breast (1kg)' },
    { id: 'eggs_crate', name: 'Crate of Large Eggs (30 eggs)' },
    { id: 'tomatoes_basket', name: 'Plum Tomatoes (Derica / 1.5kg)' },
    { id: 'honey_beans', name: 'Oloyin Honey Beans (Paint Bucket / 4kg)' },
    { id: 'palm_oil_litre', name: 'Fresh Red Palm Oil (5 Litre Jerrycan)' },
    { id: 'mackerel_fish', name: 'Fresh Frozen Titus / Mackerel (Carton / 10kg)' }
  ];

  const fetchLedger = async () => {
    try {
      setLoading(true);
      const [resSamples, resOverrides] = await Promise.all([
        fetch('/api/prices/samples'),
        fetch('/api/prices/overrides')
      ]);
      if (resSamples.ok) {
        const samplesData = await resSamples.json();
        setSamples(samplesData);
      }
      if (resOverrides.ok) {
        const overridesData = await resOverrides.json();
        setOverrides(overridesData);
      }
    } catch (err) {
      console.error('Failed to load market prices:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchLedger();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmitPrice = async (e: React.FormEvent) => {
    e.preventDefault();
    const priceNum = parseFloat(priceInput);
    if (!priceNum || priceNum <= 0) return;

    try {
      setLoading(true);
      const response = await apiFetch(profile.id, '/api/prices/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          stapleId,
          stapleName,
          marketName,
          country: profile.country,
          currency: country.currency,
          price: priceNum,
          reportedBy: profile.name || 'Verified Foodie Scout'
        })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit price');
      }

      setSubmitSuccessMsg(data.message);
      soundFX.playStreakCelebration();
      onPointsAwarded(50);
      setPriceInput('');
      setShowSubmitForm(false);
      fetchLedger();
      setTimeout(() => setSubmitSuccessMsg(null), 4000);
    } catch (err: any) {
      alert(err.message || 'Error submitting price sample');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Deep Maroon Brand Banner */}
        <div className="bg-[#7A1C2C] text-white px-5 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
              <Store className="w-5 h-5 text-[#2ECC71]" />
            </div>
            <div>
              <h3 className="font-bold text-base tracking-tight">Open-Market Crowdsourced Ledger 📊</h3>
              <p className="text-xs text-white/80">The "Mile 12 / Bodija / Utako" Community Price Engine</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg text-white/80 hover:text-white hover:bg-white/10 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {submitSuccessMsg && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#2ECC71]" />
              <span>{submitSuccessMsg}</span>
            </div>
          )}

          {/* Overview Banner */}
          <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <div className="text-xs font-bold text-stone-500 uppercase tracking-wider">Inflation Defense</div>
              <div className="font-bold text-stone-900 text-sm">Empower Local Food Economists</div>
              <p className="text-xs text-stone-600 mt-0.5">
                Submissions update the automated median overrides in real-time. Earn +50 Foodie Points for each verified sample.
              </p>
            </div>
            <button
              onClick={() => setShowSubmitForm(!showSubmitForm)}
              className="px-4 py-2 bg-[#2ECC71] hover:bg-[#27ae60] text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-1.5 shrink-0 transition-transform active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Submit Market Price</span>
            </button>
          </div>

          {/* Price Submission Form Drawer */}
          {showSubmitForm && (
            <form onSubmit={handleSubmitPrice} className="p-4 rounded-xl border border-stone-300 bg-stone-50/70 space-y-4 animate-in fade-in duration-200">
              <div className="font-bold text-xs uppercase tracking-wider text-[#7A1C2C] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>New Market Staple Report</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-stone-600 font-medium mb-1">Select Staple Metric</label>
                  <select
                    value={stapleId}
                    onChange={(e) => {
                      setStapleId(e.target.value);
                      const opt = STAPLE_OPTIONS.find(o => o.id === e.target.value);
                      if (opt) setStapleName(opt.name);
                    }}
                    className="w-full p-2 rounded-lg border border-stone-300 bg-white text-stone-800"
                  >
                    {STAPLE_OPTIONS.map(opt => (
                      <option key={opt.id} value={opt.id}>{opt.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-stone-600 font-medium mb-1">Market Location</label>
                  <input
                    type="text"
                    value={marketName}
                    onChange={(e) => setMarketName(e.target.value)}
                    placeholder="e.g. Mile 12 Market, Lagos"
                    className="w-full p-2 rounded-lg border border-stone-300 bg-white text-stone-800"
                    required
                  />
                </div>

                <div>
                  <label className="block text-stone-600 font-medium mb-1">
                    Price ({country.currencySymbol})
                  </label>
                  <input
                    type="number"
                    value={priceInput}
                    onChange={(e) => setPriceInput(e.target.value)}
                    placeholder={`e.g. 3500`}
                    className="w-full p-2 rounded-lg border border-stone-300 bg-white text-stone-800 font-mono"
                    required
                    min="1"
                  />
                </div>

                <div>
                  <label className="block text-stone-600 font-medium mb-1">Shopper Name / Pseudonym</label>
                  <input
                    type="text"
                    value={profile.name || 'Foodie Scout'}
                    disabled
                    className="w-full p-2 rounded-lg border border-stone-200 bg-stone-100 text-stone-600"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowSubmitForm(false)}
                  className="px-3 py-1.5 text-xs text-stone-600 hover:text-stone-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-[#7A1C2C] hover:bg-[#631623] text-white font-bold text-xs rounded-xl shadow-xs"
                >
                  {loading ? 'Logging Sample...' : 'Log & Earn +50 Pts'}
                </button>
              </div>
            </form>
          )}

          {/* Active Sanitised Median Overrides Table */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-bold text-stone-900 text-xs uppercase tracking-wider">
                Active Moderated Median Overrides (sanitiseSamples Engine)
              </h4>
              <span className="text-[11px] text-stone-500 font-mono">Outliers Sanitized</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {Object.entries(overrides).map(([key, data]: [string, any]) => {
                const stapleLabel = STAPLE_OPTIONS.find(o => o.id === key)?.name || key;
                return (
                  <div key={key} className="p-3 rounded-xl bg-stone-50 border border-stone-200/90 text-left">
                    <div className="text-[10px] text-stone-500 font-semibold truncate">{stapleLabel}</div>
                    <div className="text-base font-extrabold text-[#7A1C2C] font-mono mt-1">
                      {country.currencySymbol}{data.medianPrice?.toLocaleString()}
                    </div>
                    <div className="text-[10px] text-stone-500 mt-0.5">
                      {data.sampleCount} community reports
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Live Recent Ledger Feed */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-bold text-stone-900 text-xs uppercase tracking-wider">
                Live Submissions Feed (data/price-samples.json)
              </h4>
              <span className="text-[11px] text-stone-500">Immutable Ledger</span>
            </div>

            <div className="border border-stone-200 rounded-xl divide-y divide-stone-100 overflow-hidden bg-white">
              {samples.slice(0, 10).map((sample) => (
                <div key={sample.id} className="p-3 text-xs flex items-center justify-between hover:bg-stone-50/70 transition-colors">
                  <div className="space-y-0.5">
                    <div className="font-bold text-stone-800">{sample.stapleName}</div>
                    <div className="text-stone-500 flex items-center gap-1.5">
                      <span>{sample.marketName}</span>
                      <span>·</span>
                      <span className="text-stone-600 font-medium">By {sample.reportedBy}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono font-bold text-stone-900 text-sm">
                      {country.currencySymbol}{sample.price.toLocaleString()}
                    </div>
                    <div className="text-[10px] text-emerald-600 font-medium flex items-center justify-end gap-1">
                      <Award className="w-3 h-3 text-[#2ECC71]" />
                      <span>Verified Scout</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
