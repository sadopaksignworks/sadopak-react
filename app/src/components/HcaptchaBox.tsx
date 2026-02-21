import { useMemo, useRef } from 'react';
import HCaptcha from '@hcaptcha/react-hcaptcha';

type Props = {
  /** Called with the hCaptcha token when user passes. */
  onToken: (token: string) => void;
  /** Optional error message to show under widget */
  helperText?: string;
};

/**
 * Minimal hCaptcha widget wrapper.
 *
 * Requires VITE_HCAPTCHA_SITEKEY in your Vite env.
 */
export default function HcaptchaBox({ onToken, helperText }: Props) {
  const ref = useRef<any>(null);

  const sitekey = useMemo(() => {
    const key = (import.meta as any).env?.VITE_HCAPTCHA_SITEKEY;
    return (typeof key === 'string' && key.trim()) ? key.trim() : '';
  }, []);

  if (!sitekey) {
    return (
      <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
        <strong>Missing hCaptcha site key.</strong>
        <div className="opacity-90 mt-1">
          Set <code className="px-1 py-0.5 bg-black/20 rounded">VITE_HCAPTCHA_SITEKEY</code> in Coolify / your env.
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="rounded-xl border border-brand-light/10 bg-brand-light/5 p-3">
        <HCaptcha
          ref={ref}
          sitekey={sitekey}
          onVerify={(token) => onToken(token)}
          onExpire={() => onToken('')}
          onError={() => onToken('')}
        />
      </div>
      {helperText ? (
        <p className="text-xs text-brand-text-secondary">{helperText}</p>
      ) : null}
    </div>
  );
}
