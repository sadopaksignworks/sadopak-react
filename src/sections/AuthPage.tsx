import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Mail, Lock, User, ArrowRight, Check, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';

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
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleGoogleAuth = () => {
    setIsLoading(true);
    // Simulate Google auth
    setTimeout(() => {
      setIsLoading(false);
      setSuccess(true);
      toast.success(mode === 'signin' ? 'Successfully signed in!' : 'Account created successfully!');
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 2000);
    }, 1500);
  };

  const handleEmailAuth = () => {
    if (!formData.email || !formData.password || (mode === 'signup' && !formData.name)) {
      toast.error('Please fill in all required fields');
      return;
    }
    setIsLoading(true);
    // Simulate email auth
    setTimeout(() => {
      setIsLoading(false);
      setSuccess(true);
      toast.success(mode === 'signin' ? 'Successfully signed in!' : 'Account created successfully!');
      setTimeout(() => {
        setSuccess(false);
        setFormData({ name: '', email: '', password: '' });
        onClose();
      }, 2000);
    }, 1500);
  };

  const toggleMode = () => {
    setMode(mode === 'signin' ? 'signup' : 'signin');
    setFormData({ name: '', email: '', password: '' });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white rounded-[20px] p-6 sm:p-8 max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl sm:text-3xl text-brand-dark text-center">
            {success 
              ? (mode === 'signin' ? 'Welcome Back!' : 'Welcome!') 
              : (mode === 'signin' ? 'Sign In' : 'Create Account')
            }
          </DialogTitle>
        </DialogHeader>

        {success ? (
          <div className="text-center py-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-green-600" />
            </div>
            <p className="text-brand-text-muted">
              {mode === 'signin' 
                ? 'You have successfully signed in to your account.' 
                : 'Your account has been created successfully.'}
            </p>
          </div>
        ) : (
          <div className="space-y-5 mt-4">
            {/* Google Auth Button */}
            <button
              onClick={handleGoogleAuth}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 px-6 py-3 border border-brand-dark/15 rounded-[12px] text-brand-dark font-medium hover:bg-brand-dark/5 transition-colors disabled:opacity-50"
            >
              <GoogleIcon className="w-5 h-5" />
              {mode === 'signin' ? 'Sign in with Google' : 'Sign up with Google'}
            </button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-brand-dark/10"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-brand-text-muted">or continue with email</span>
              </div>
            </div>

            {/* Name Field - Only for Sign Up */}
            {mode === 'signup' && (
              <div>
                <label className="micro-label text-brand-text-muted mb-2 block">
                  FULL NAME
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-text-muted" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your full name"
                    className="form-input pl-12"
                  />
                </div>
              </div>
            )}

            {/* Email Field */}
            <div>
              <label className="micro-label text-brand-text-muted mb-2 block">
                EMAIL ADDRESS
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-text-muted" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Enter your email"
                  className="form-input pl-12"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="micro-label text-brand-text-muted mb-2 block">
                PASSWORD
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-text-muted" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder={mode === 'signin' ? 'Enter your password' : 'Create a password'}
                  className="form-input pl-12 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-text-muted hover:text-brand-dark"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleEmailAuth}
              disabled={isLoading}
              className="btn-primary w-full disabled:opacity-50"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Please wait...
                </span>
              ) : (
                <>
                  {mode === 'signin' ? 'Sign In' : 'Create Account'}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </>
              )}
            </button>

            {/* Toggle Mode */}
            <p className="text-center text-sm text-brand-text-muted">
              {mode === 'signin' ? "Don't have an account?" : 'Already have an account?'}{' '}
              <button
                onClick={toggleMode}
                className="text-brand-accent font-medium hover:underline"
              >
                {mode === 'signin' ? 'Sign up' : 'Sign in'}
              </button>
            </p>

            {/* Terms */}
            <p className="text-xs text-brand-text-muted text-center">
              By continuing, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
