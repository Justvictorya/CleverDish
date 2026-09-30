import React, { useState } from 'react';
import { UserProfile } from '../types';
import { HeartHandshake, ShieldCheck, CheckCircle2, Send, X, CreditCard, Sparkles } from 'lucide-react';
import { soundFX } from '../utils/sound';

interface SendFoodHomeModalProps {
  profile: UserProfile;
  isOpen: boolean;
  onClose: () => void;
}

export const SendFoodHomeModal: React.FC<SendFoodHomeModalProps> = ({
  profile,
  isOpen,
  onClose
}) => {
  const [recipientName, setRecipientName] = useState('Mama & Papa in Ibadan');
  const [targetCity, setTargetCity] = useState('Ibadan, Oyo State (Bodija Market Corridor)');
  const [planTier, setPlanTier] = useState<'vitality_box' | 'full_month_nutrition' | 'hypertensive_care'>('full_month_nutrition');
  const [isProcessing, setIsProcessing] = useState(false);
  const [successConfirmation, setSuccessConfirmation] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setSuccessConfirmation('Order dispatched to Bodija Agri-Hub Verified Vendor! Receipt #SFH-9824 dispatched to email.');
      soundFX.playStreakCelebration();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col">
        {/* Banner */}
        <div className="bg-[#7A1C2C] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
              <HeartHandshake className="w-5 h-5 text-[#2ECC71]" />
            </div>
            <div>
              <h3 className="font-bold text-base tracking-tight">"Send Food Home" Remittance 🌍</h3>
              <p className="text-xs text-white/80">Fund health-aligned grocery baskets for family</p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg text-white/80 hover:text-white flex items-center justify-center">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4 overflow-y-auto">
          {/* AML Compliance Badge */}
          <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-600 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#2ECC71] shrink-0" />
            <span>
              Licensed cross-border payment rails · Zero intermediary cash diversion · AML/KYC compliant direct farm fulfillment.
            </span>
          </div>

          {successConfirmation ? (
            <div className="p-6 text-center space-y-3 bg-emerald-50 rounded-2xl border border-emerald-200 animate-in zoom-in-95">
              <CheckCircle2 className="w-12 h-12 text-[#2ECC71] mx-auto animate-bounce" />
              <h4 className="font-bold text-stone-900 text-base">Meal Box Funded Successfully!</h4>
              <p className="text-xs text-emerald-800">{successConfirmation}</p>
              <button
                onClick={onClose}
                className="mt-3 px-6 py-2.5 bg-[#2ECC71] hover:bg-[#27ae60] text-white font-bold text-xs rounded-xl"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSend} className="space-y-4 text-xs">
              <div>
                <label className="block text-stone-700 font-bold mb-1">Family Recipient Name</label>
                <input
                  type="text"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-300 bg-white font-medium"
                  required
                />
              </div>

              <div>
                <label className="block text-stone-700 font-bold mb-1">Delivery Destination / Market Hub</label>
                <input
                  type="text"
                  value={targetCity}
                  onChange={(e) => setTargetCity(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-300 bg-white font-medium"
                  required
                />
              </div>

              <div>
                <label className="block text-stone-700 font-bold mb-1.5">Nutrition Tier</label>
                <div className="space-y-2">
                  {[
                    {
                      id: 'vitality_box',
                      name: 'Weekly Fresh Protein & Greens Basket',
                      costUSD: '$35',
                      details: '2 live scaled catfish, crate of 30 farm eggs, fresh ugu leaves, sweet potatoes.'
                    },
                    {
                      id: 'full_month_nutrition',
                      name: 'Full Month Balanced Nutrition Box',
                      costUSD: '$95',
                      details: 'Tubers of white yam, bag of Oloyin honey beans, garri, eggs, dried fish, pure red oil.'
                    },
                    {
                      id: 'hypertensive_care',
                      name: 'Low-Sodium / Cardiac Wellness Basket',
                      costUSD: '$65',
                      details: 'Acha (Fonio supergrain), unpolished ofada brown rice, natural iru, garden eggs, lean proteins.'
                    }
                  ].map((tier) => (
                    <div
                      key={tier.id}
                      onClick={() => setPlanTier(tier.id as any)}
                      className={`p-3 rounded-xl border cursor-pointer transition-all ${
                        planTier === tier.id
                          ? 'border-[#7A1C2C] bg-[#7A1C2C]/5 font-bold text-stone-900 shadow-xs'
                          : 'border-stone-200 bg-white text-stone-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs">{tier.name}</span>
                        <span className="font-mono font-extrabold text-[#7A1C2C]">{tier.costUSD}</span>
                      </div>
                      <p className="text-[11px] text-stone-500 font-normal mt-0.5">{tier.details}</p>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3 bg-[#7A1C2C] hover:bg-[#631623] text-white font-extrabold text-xs rounded-xl shadow-md flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Processing Cross-Border Settlement...</span>
                  </>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4 text-[#2ECC71]" />
                    <span>Authorize Nutrition Box Fulfillment</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
