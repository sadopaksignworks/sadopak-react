import { useMemo, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ArrowRight, ExternalLink } from 'lucide-react';

interface AuthPageProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'signin' | 'signup';
}

// Google Icon Component
const GoogleIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="currentColor"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="currentColor"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
    />
    <path
      fill="currentColor"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
);

export default function AuthPage({ isOpen, onClose, initialMode = 'signin' }: AuthPageProps) {
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);

  const wpBase = useMemo(() => (import.meta.env.VITE_WP_URL || 'https://wp.sadopak.org').replace(/\/$/, ''), []);
  const redirectTo = encodeURIComponent(window.location.href);

  // Nextend Social Login buttons are rendered on WordPress login/register screens.
  // Best-practice headless approach here: send users to WordPress for auth/account management.
  const wpLoginUrl = `${wpBase}/wp-login.php?redirect_to=${redirectTo}`;
  const wpRegisterUrl = `${wpBase}/wp-login.php?action=register&redirect_to=${redirectTo}`;
  const wpLostPasswordUrl = `${wpBase}/wp-login.php?action=lostpassword&redirect_to=${redirectTo}`;
  // Direct Google sign-in via Nextend Social Login (matches your authorized redirect URI)
  const wpGoogleUrl = `${wpBase}/wp-login.php?loginSocial=google&redirect_to=${redirectTo}`;
  const wpMyAccountUrl = `${wpBase}/my-account/`;

  const openWpAuth = (url: string) => {
    // open in same tab for better cookie/session reliability
    window.location.href = url;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white rounded-[20px] p-6 sm:p-8 max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl sm:text-3xl text-brand-dark text-center">
            {mode === 'signin' ? 'Sign In' : 'Create Account'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5 mt-4">
            <div className="rounded-[14px] border border-brand-dark/10 bg-brand-dark/[0.03] p-4 text-sm text-brand-text-muted">
              Account sign-in, Google login, registration, and password resets are securely handled by our WordPress backend.
              This keeps payments and customer records consistent.
            </div>

            {/* Google / Social login (via Nextend on WP login screen) */}
            <button
              onClick={() => openWpAuth(wpGoogleUrl)}
              className="w-full flex items-center justify-center gap-3 px-6 py-3 border border-brand-dark/15 rounded-[12px] text-brand-dark font-medium hover:bg-brand-dark/5 transition-colors"
            >
              <GoogleIcon className="w-5 h-5" />
              {mode === 'signin' ? 'Continue with Google' : 'Sign up with Google'}
              <ExternalLink className="w-4 h-4" />
            </button>

            {/* Email/password login on WP */}
            <button
              onClick={() => openWpAuth(mode === 'signin' ? wpLoginUrl : wpRegisterUrl)}
              className="btn-primary w-full"
            >
              {mode === 'signin' ? 'Sign in with Email' : 'Create Account with Email'}
              <ArrowRight className="ml-2 w-4 h-4" />
            </button>

            <div className="flex items-center justify-between text-sm">
              <button
                onClick={() => openWpAuth(wpLostPasswordUrl)}
                className="text-brand-accent font-medium hover:underline"
              >
                Forgot password?
              </button>

              <a
                href={wpMyAccountUrl}
                className="text-brand-dark/70 hover:text-brand-dark hover:underline"
                target="_blank"
                rel="noreferrer"
              >
                Open My Account
              </a>
            </div>

            {/* Toggle Mode */}
            <p className="text-center text-sm text-brand-text-muted">
              {mode === 'signin' ? "Don't have an account?" : 'Already have an account?'}{' '}
              <button
                onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
                className="text-brand-accent font-medium hover:underline"
              >
                {mode === 'signin' ? 'Sign up' : 'Sign in'}
              </button>
            </p>

            <p className="text-xs text-brand-text-muted text-center">
              By continuing, you agree to our Terms of Service and Privacy Policy.
            </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
