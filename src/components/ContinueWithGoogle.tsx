import React, { useEffect, useRef, useState } from 'react';
import { Check, LogOut, Mail } from 'lucide-react';
import type { AccountUser } from '../utils/account';
import {
  accountAvailable,
  clearAccount,
  decodeGoogleCredential,
  getAccount,
  GOOGLE_CLIENT_ID,
  loadGoogleScript,
  reportSignup,
  saveAccount
} from '../utils/account';

interface ContinueWithGoogleProps {
  /** Called after a successful tap, with the verified email already stored. */
  onAccount: (user: AccountUser) => void;
  className?: string;
}

/**
 * A single "Continue with Google" tap. Renders Google's own button (their
 * branding rules) inside our card, and nothing at all when the build has no
 * client id — anonymous onboarding keeps working untouched.
 */
export const ContinueWithGoogle: React.FC<ContinueWithGoogleProps> = ({ onAccount, className = '' }) => {
  const holder = useRef<HTMLDivElement | null>(null);
  const [account, setAccount] = useState<AccountUser | null>(() => getAccount());
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (account || !accountAvailable() || !holder.current) return;
    let cancelled = false;

    loadGoogleScript()
      .then(() => {
        if (cancelled || !holder.current || !window.google?.accounts?.id) return;
        const width = Math.min(340, Math.max(200, holder.current.clientWidth || 320));

        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          auto_select: false,
          cancel_on_tap_outside: true,
          callback: (response: { credential?: string }) => {
            if (!response?.credential) return;
            try {
              const user = decodeGoogleCredential(response.credential);
              saveAccount(user);
              reportSignup(response.credential);
              setAccount(user);
              onAccount(user);
            } catch {
              setFailed(true);
            }
          }
        });

        window.google.accounts.id.renderButton(holder.current, {
          type: 'standard',
          theme: 'outline',
          size: 'large',
          text: 'continue_with',
          shape: 'pill',
          logo_alignment: 'left',
          width
        });
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });

    return () => {
      cancelled = true;
      if (holder.current) holder.current.innerHTML = '';
    };
  }, [account]);

  if (account) {
    return (
      <div className={`flex items-center justify-between gap-2 ${className}`}>
        <div className="flex items-center gap-2 min-w-0">
          <span className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <Check className="w-3.5 h-3.5" />
          </span>
          <div className="min-w-0">
            <div className="text-[11px] font-bold text-stone-500 dark:text-zinc-400 leading-none">
              Signed in
            </div>
            <div className="text-xs font-bold text-stone-800 dark:text-zinc-100 truncate flex items-center gap-1">
              <Mail className="w-3 h-3 shrink-0 text-stone-400" />
              <span className="truncate">{account.email}</span>
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            clearAccount();
            setAccount(null);
          }}
          className="text-[11px] font-bold text-stone-400 hover:text-stone-700 dark:hover:text-zinc-200 flex items-center gap-1 shrink-0 cursor-pointer"
          title="Use a different account"
        >
          <LogOut className="w-3 h-3" />
          Switch
        </button>
      </div>
    );
  }

  if (!accountAvailable() || failed) return null;

  return <div ref={holder} className={className} />;
};
