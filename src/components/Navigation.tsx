import { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, User } from 'lucide-react';

interface NavigationProps {
  onBookConsultation: () => void;
  onOpenAuth: (mode: 'signin' | 'signup') => void;
}

export default function Navigation({ onBookConsultation, onOpenAuth }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          isScrolled
            ? 'bg-brand-dark/95 backdrop-blur-md py-3'
            : 'bg-transparent py-4 lg:py-6'
        }`}
      >
        <div className="px-4 sm:px-6 lg:px-[7vw] flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 sm:gap-3"
          >
            <img 
              src="/logo-dark.png" 
              alt="SADOPAK SIGNWORKS" 
              className="w-8 h-8 sm:w-10 sm:h-10 object-contain rounded-lg"
            />
            <div className="hidden sm:flex flex-col items-start">
              <span className="font-display font-bold text-brand-light text-base lg:text-lg leading-tight">
                SADOPAK
              </span>
              <span className="micro-label text-brand-accent text-[9px] lg:text-[10px]">
                SIGNWORKS
              </span>
            </div>
          </button>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            <button
              onClick={() => scrollToSection('services')}
              className="text-brand-light/80 hover:text-brand-light transition-colors text-sm"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection('industries')}
              className="text-brand-light/80 hover:text-brand-light transition-colors text-sm"
            >
              Industries
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-brand-light/80 hover:text-brand-light transition-colors text-sm"
            >
              Contact
            </button>
            
            {/* Auth Buttons */}
            <div className="flex items-center gap-2 border-l border-brand-light/20 pl-6">
              <button
                onClick={() => onOpenAuth('signin')}
                className="text-brand-light/80 hover:text-brand-light transition-colors text-sm flex items-center gap-2"
              >
                <User className="w-4 h-4" />
                Sign In
              </button>
              <button
                onClick={() => onOpenAuth('signup')}
                className="text-brand-accent hover:text-brand-accent/80 transition-colors text-sm font-medium"
              >
                Sign Up
              </button>
            </div>

            <button
              onClick={onBookConsultation}
              className="btn-primary text-sm py-2 px-4"
            >
              Book Consultation
              <ArrowRight className="ml-2 w-3 h-3" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-brand-light p-2"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[99] bg-brand-dark/98 backdrop-blur-lg lg:hidden">
          <div className="flex flex-col items-center justify-center h-full gap-6 pt-20">
            <button
              onClick={() => scrollToSection('services')}
              className="text-brand-light text-2xl font-display"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection('industries')}
              className="text-brand-light text-2xl font-display"
            >
              Industries
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-brand-light text-2xl font-display"
            >
              Contact
            </button>
            
            <div className="flex gap-6 mt-4">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenAuth('signin');
                }}
                className="text-brand-light/80 text-lg flex items-center gap-2"
              >
                <User className="w-5 h-5" />
                Sign In
              </button>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenAuth('signup');
                }}
                className="text-brand-accent text-lg font-medium"
              >
                Sign Up
              </button>
            </div>

            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onBookConsultation();
              }}
              className="btn-primary mt-4"
            >
              Book Consultation
              <ArrowRight className="ml-2 w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
