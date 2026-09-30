import React, { useState, useRef } from 'react';
import { Meal } from '../types';
import { Camera, Upload, CheckCircle2, AlertCircle, Sparkles, X, ShieldCheck } from 'lucide-react';
import { soundFX } from '../utils/sound';

interface PhotoLockModalProps {
  meal: Meal;
  userId: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (photoUrl: string) => void;
}

export const PhotoLockModal: React.FC<PhotoLockModalProps> = ({
  meal,
  userId,
  isOpen,
  onClose,
  onSuccess
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [verificationResult, setVerificationResult] = useState<any | null>(null);
  const [useCameraMode, setUseCameraMode] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  if (!isOpen) return null;

  const startCamera = async () => {
    try {
      setErrorMessage(null);
      setUseCameraMode(true);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err: any) {
      console.warn('Camera access error:', err);
      setErrorMessage('Camera access was denied or is unavailable on this device. Please upload a photo from your gallery instead.');
      setUseCameraMode(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setUseCameraMode(false);
  };

  const captureCameraPhoto = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth || 640;
    canvas.height = videoRef.current.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
    stopCamera();
    setSelectedImage(dataUrl);
    setErrorMessage(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMessage('Invalid file type: Please choose an image file (JPEG, PNG, WebP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader.result as string);
      setErrorMessage(null);
      setVerificationResult(null);
    };
    reader.readAsDataURL(file);
  };

  const handleVerifyAndUnlock = async () => {
    if (!selectedImage) return;

    setIsVerifying(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/streak/verify-photo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          photoBase64: selectedImage,
          userId,
          mealId: meal.id,
          mealTitle: meal.title
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Verification failed');
      }

      setVerificationResult(data);
      soundFX.playStreakCelebration();

      setTimeout(() => {
        onSuccess(data.photoUrl || selectedImage);
        handleClose();
      }, 1200);
    } catch (err: any) {
      setErrorMessage(err.message || 'Error communicating with security validator.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleClose = () => {
    stopCamera();
    setSelectedImage(null);
    setErrorMessage(null);
    setVerificationResult(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden">
        {/* Deep Maroon Brand Banner */}
        <div className="bg-[#7A1C2C] text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white">
              <ShieldCheck className="w-5 h-5 text-[#2ECC71]" />
            </div>
            <div>
              <h3 className="font-bold text-base tracking-tight">The Photo-Locked Daily Ritual</h3>
              <p className="text-xs text-white/80">Magic-byte security & anti-farming plate verification</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-lg text-white/80 hover:text-white hover:bg-white/10 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body content */}
        <div className="p-6 space-y-5">
          <div className="bg-stone-50 border border-stone-200/80 rounded-xl p-3.5 flex items-start gap-3">
            <span className="text-2xl select-none">🍽️</span>
            <div>
              <div className="text-xs text-stone-500 font-medium uppercase tracking-wider">Verifying Meal</div>
              <div className="font-semibold text-stone-900 text-sm">{meal.title}</div>
              <div className="text-xs text-stone-600 mt-0.5">
                {meal.calories} kcal · {meal.protein}g protein · {meal.estimatedCost} est. cost
              </div>
            </div>
          </div>

          {/* Camera Viewfinder or Upload Box */}
          {useCameraMode ? (
            <div className="relative rounded-xl overflow-hidden bg-black aspect-4/3 flex items-center justify-center">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 border-2 border-dashed border-[#2ECC71]/70 pointer-events-none rounded-xl m-4 flex items-center justify-center">
                <span className="text-xs text-white/90 bg-black/60 px-3 py-1 rounded-full backdrop-blur-sm">
                  Align plate inside frame
                </span>
              </div>
              <div className="absolute bottom-4 inset-x-0 flex items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={stopCamera}
                  className="px-4 py-2 bg-stone-800/80 hover:bg-stone-800 text-white text-xs font-semibold rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={captureCameraPhoto}
                  className="px-6 py-2.5 bg-[#2ECC71] hover:bg-[#27ae60] text-white text-sm font-bold rounded-xl shadow-lg flex items-center gap-2"
                >
                  <Camera className="w-4 h-4" /> Snap Plate
                </button>
              </div>
            </div>
          ) : selectedImage ? (
            <div className="space-y-3">
              <div className="relative rounded-xl overflow-hidden aspect-4/3 bg-stone-100 border border-stone-200">
                <img
                  src={selectedImage}
                  alt="Meal Plate Preview"
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-3 right-3 px-2.5 py-1 bg-black/60 hover:bg-black/80 text-white text-xs font-medium rounded-lg backdrop-blur-sm transition-colors"
                >
                  Retake / Change
                </button>
                {verificationResult && (
                  <div className="absolute inset-0 bg-[#2ECC71]/90 flex flex-col items-center justify-center text-white p-4 text-center animate-in zoom-in-95 duration-200">
                    <CheckCircle2 className="w-12 h-12 mb-2 text-white animate-bounce" />
                    <h4 className="text-lg font-bold">Magic-Bytes Validated!</h4>
                    <p className="text-xs text-white/90 max-w-xs mt-1">
                      Zero-dep binary header verified ({verificationResult.hash}). Daily streak unlocked! 🔥
                    </p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="border-2 border-dashed border-stone-300 rounded-2xl p-6 text-center hover:border-[#7A1C2C]/50 transition-colors bg-stone-50/50">
              <div className="w-12 h-12 mx-auto rounded-full bg-[#7A1C2C]/10 text-[#7A1C2C] flex items-center justify-center mb-3">
                <Camera className="w-6 h-6" />
              </div>
              <h4 className="font-semibold text-stone-900 text-sm">Snap or Upload Your Meal Plate</h4>
              <p className="text-xs text-stone-500 max-w-xs mx-auto mt-1 mb-4">
                Streak activation is strictly photo-locked. Upload a live photo of your breakfast or lunch to prove plate compliance.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={startCamera}
                  className="w-full sm:w-auto px-4 py-2.5 bg-[#7A1C2C] hover:bg-[#631623] text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors"
                >
                  <Camera className="w-4 h-4" /> Open Camera
                </button>

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full sm:w-auto px-4 py-2.5 bg-white hover:bg-stone-100 text-stone-800 text-xs font-semibold rounded-xl border border-stone-300 flex items-center justify-center gap-2 transition-colors"
                >
                  <Upload className="w-4 h-4" /> Upload from Device
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
            </div>
          )}

          {errorMessage && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Action CTAs */}
          <div className="pt-2 flex items-center justify-between border-t border-stone-200">
            <div className="text-[11px] text-stone-500 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-stone-400" />
              <span>PNG, JPEG, WebP magic bytes enforced</span>
            </div>

            <button
              disabled={!selectedImage || isVerifying || !!verificationResult}
              onClick={handleVerifyAndUnlock}
              className={`px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 shadow-sm transition-all ${
                selectedImage && !isVerifying && !verificationResult
                  ? 'bg-[#2ECC71] hover:bg-[#27ae60] text-white cursor-pointer active:scale-95 shadow-md shadow-[#2ECC71]/20'
                  : 'bg-stone-200 text-stone-400 cursor-not-allowed'
              }`}
            >
              {isVerifying ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Checking Magic Bytes...</span>
                </>
              ) : verificationResult ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Streak Unlocked!</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Verify Plate & Activate 🔥</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
