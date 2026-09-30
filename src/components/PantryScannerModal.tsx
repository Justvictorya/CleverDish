import React, { useState, useRef } from 'react';
import { UserProfile } from '../types';
import { Camera, Sparkles, Check, X, Upload, ShoppingBag, ArrowDownRight, AlertCircle } from 'lucide-react';
import { COUNTRIES } from '../data/countries';
import { soundFX } from '../utils/sound';

interface PantryScannerModalProps {
  profile: UserProfile;
  isOpen: boolean;
  onClose: () => void;
  onSubtractBudget: (amount: number, detectedItems: any[]) => void;
}

export const PantryScannerModal: React.FC<PantryScannerModalProps> = ({
  profile,
  isOpen,
  onClose,
  onSubtractBudget
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [scanResult, setScanResult] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  if (!isOpen) return null;

  const country = COUNTRIES[profile.country] || COUNTRIES.NG;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader.result as string);
      setScanResult(null);
      setError(null);
    };
    reader.readAsDataURL(file);
  };

  const handleScanPantry = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/ai/pantry-scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: selectedImage,
          currency: country.currencySymbol,
          country: country.name
        })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Pantry scan failed');
      }

      setScanResult(data.result);
      soundFX.playInflationSwap();
    } catch (err: any) {
      setError(err.message || 'Error processing pantry inventory.');
    } finally {
      setLoading(false);
    }
  };

  const handleApplyDeduction = () => {
    if (!scanResult) return;
    onSubtractBudget(scanResult.totalBudgetSaved, scanResult.detectedItems);
    soundFX.playStreakCelebration();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden">
        {/* Brand Banner */}
        <div className="bg-[#7A1C2C] text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
              <Camera className="w-5 h-5 text-[#2ECC71]" />
            </div>
            <div>
              <h3 className="font-bold text-base tracking-tight">Pantry-Aware AI Scanner 📸</h3>
              <p className="text-xs text-white/80">Audit kitchen inventory & slash grocery bills</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg text-white/80 hover:text-white hover:bg-white/10 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {!scanResult ? (
            <div className="space-y-4">
              <p className="text-xs text-stone-600">
                Snap or upload a photo of your fridge, dry food shelf, or kitchen basket. Our AI vision detects in-stock staples and automatically deducts their value from this month's grocery shopping budget.
              </p>

              {selectedImage ? (
                <div className="relative rounded-xl overflow-hidden aspect-4/3 bg-stone-100 border border-stone-200">
                  <img
                    src={selectedImage}
                    alt="Pantry Upload"
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="absolute top-3 right-3 px-2 py-1 bg-black/60 text-white text-xs rounded-lg backdrop-blur-sm"
                  >
                    Change Photo
                  </button>
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-stone-300 rounded-2xl p-6 text-center hover:border-[#7A1C2C]/50 transition-colors bg-stone-50 cursor-pointer"
                >
                  <div className="w-12 h-12 mx-auto rounded-full bg-[#7A1C2C]/10 text-[#7A1C2C] flex items-center justify-center mb-2">
                    <Upload className="w-6 h-6" />
                  </div>
                  <h4 className="font-semibold text-stone-900 text-sm">Upload Kitchen / Pantry Snapshot</h4>
                  <p className="text-xs text-stone-500 mt-1">
                    Supports JPEG, PNG, WebP shelf pictures
                  </p>
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>
              )}

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <button
                onClick={handleScanPantry}
                disabled={loading}
                className="w-full py-3 px-4 bg-[#7A1C2C] hover:bg-[#631623] text-white font-bold text-sm rounded-xl shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Analyzing Pantry Ingredients...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-[#2ECC71]" />
                    <span>Scan Pantry with Gemini Vision</span>
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                    Total Grocery Savings Detected
                  </div>
                  <div className="text-2xl font-black text-[#2ECC71] font-mono mt-0.5">
                    {country.currencySymbol}{scanResult.totalBudgetSaved.toLocaleString()}
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#2ECC71] text-white flex items-center justify-center shadow-sm">
                  <ArrowDownRight className="w-6 h-6" />
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                  Detected On-Hand Kitchen Staples:
                </h4>
                <div className="border border-stone-200 rounded-xl divide-y divide-stone-100 overflow-hidden bg-white">
                  {scanResult.detectedItems.map((item: any, idx: number) => (
                    <div key={idx} className="p-3 text-xs flex items-center justify-between hover:bg-stone-50">
                      <div>
                        <div className="font-bold text-stone-900">{item.name}</div>
                        <div className="text-stone-500">{item.quantity} · Category: {item.category}</div>
                      </div>
                      <div className="text-right">
                        <span className="font-mono font-bold text-emerald-600">
                          -{country.currencySymbol}{item.estimatedValue.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <p className="text-xs text-stone-600 italic">
                "{scanResult.summary}"
              </p>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setScanResult(null)}
                  className="flex-1 py-2.5 px-4 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-xs rounded-xl"
                >
                  Scan Another Shelf
                </button>
                <button
                  type="button"
                  onClick={handleApplyDeduction}
                  className="flex-1 py-2.5 px-4 bg-[#2ECC71] hover:bg-[#27ae60] text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Deduct From Budget</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
