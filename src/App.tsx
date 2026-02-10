import { useState } from 'react';
import { Toaster } from '@/components/ui/sonner';

import Navigation from './components/Navigation';
import HeroSection from './sections/HeroSection';
import ReputationSection from './sections/ReputationSection';
import EfficiencySection from './sections/EfficiencySection';
import LoyaltySection from './sections/LoyaltySection';
import IndustriesSection from './sections/IndustriesSection';
import ConsultationSection from './sections/ConsultationSection';
import BrokerageSection from './sections/BrokerageSection';
import ContactSection from './sections/ContactSection';
import AuthPage from './sections/AuthPage';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ArrowRight, Check } from 'lucide-react';
import { toast } from 'sonner';

function App() {
  const [consultDialogOpen, setConsultDialogOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [consultForm, setConsultForm] = useState({
    name: '',
    businessName: '',
    location: '',
    contact: '',
    message: '',
  });
  const [consultSubmitted, setConsultSubmitted] = useState(false);

  const handleConsultSubmit = () => {
    if (consultForm.name && consultForm.contact) {
      setConsultSubmitted(true);
      toast.success('Consultation booking received! We will contact you within 24 hours.');
      setTimeout(() => {
        setConsultDialogOpen(false);
        setConsultSubmitted(false);
        setConsultForm({ name: '', businessName: '', location: '', contact: '', message: '' });
      }, 2000);
    }
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openAuth = (mode: 'signin' | 'signup') => {
    setAuthMode(mode);
    setAuthOpen(true);
  };

  return (
    <>
      <Navigation 
        onBookConsultation={() => setConsultDialogOpen(true)} 
        onOpenAuth={openAuth}
      />

      <main className="relative">
        <HeroSection onBookConsultation={() => setConsultDialogOpen(true)} />
        <ReputationSection onSeeHowItWorks={scrollToContact} />
        <EfficiencySection onExploreImpact={scrollToContact} />
        <LoyaltySection onStartProject={scrollToContact} />
        <div id="industries">
          <IndustriesSection />
        </div>
        <div id="services">
          <ConsultationSection onBookConsultation={() => setConsultDialogOpen(true)} />
        </div>
        <BrokerageSection onSubmitTender={scrollToContact} />
        <div id="contact">
          <ContactSection onBookConsultation={() => setConsultDialogOpen(true)} />
        </div>
      </main>

      {/* Grain Overlay */}
      <div className="grain-overlay" />

      {/* Toaster for notifications */}
      <Toaster position="top-center" richColors />

      {/* Consultation Booking Dialog */}
      <Dialog open={consultDialogOpen} onOpenChange={setConsultDialogOpen}>
        <DialogContent className="bg-white rounded-[20px] p-8 max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl text-brand-dark">
              {consultSubmitted ? 'Booking Confirmed!' : 'Book a Consultation'}
            </DialogTitle>
          </DialogHeader>

          {consultSubmitted ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <p className="text-brand-text-muted">
                Your consultation request has been received. We'll contact you within 24 hours with next steps.
              </p>
            </div>
          ) : (
            <div className="space-y-5 mt-4">
              <div className="bg-brand-accent/5 rounded-xl p-4 mb-4">
                <p className="text-sm text-brand-dark">
                  <strong>Consultation Fee: $300</strong>
                </p>
                <p className="text-xs text-brand-text-muted mt-1">
                  Includes brand analysis, signage specifications, and placement recommendations.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="micro-label text-brand-text-muted mb-2 block">
                    NAME
                  </label>
                  <input
                    type="text"
                    value={consultForm.name}
                    onChange={(e) => setConsultForm({ ...consultForm, name: e.target.value })}
                    placeholder="Your full name"
                    className="form-input"
                  />
                </div>
                <div>
                  <label className="micro-label text-brand-text-muted mb-2 block">
                    BUSINESS NAME
                  </label>
                  <input
                    type="text"
                    value={consultForm.businessName}
                    onChange={(e) => setConsultForm({ ...consultForm, businessName: e.target.value })}
                    placeholder="Your business name"
                    className="form-input"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="micro-label text-brand-text-muted mb-2 block">
                    LOCATION
                  </label>
                  <input
                    type="text"
                    value={consultForm.location}
                    onChange={(e) => setConsultForm({ ...consultForm, location: e.target.value })}
                    placeholder="City, Country"
                    className="form-input"
                  />
                </div>
                <div>
                  <label className="micro-label text-brand-text-muted mb-2 block">
                    CONTACT DETAILS
                  </label>
                  <input
                    type="text"
                    value={consultForm.contact}
                    onChange={(e) => setConsultForm({ ...consultForm, contact: e.target.value })}
                    placeholder="Phone or email"
                    className="form-input"
                  />
                </div>
              </div>

              <div>
                <label className="micro-label text-brand-text-muted mb-2 block">
                  MESSAGE (OPTIONAL)
                </label>
                <textarea
                  value={consultForm.message}
                  onChange={(e) => setConsultForm({ ...consultForm, message: e.target.value })}
                  placeholder="Tell us about your project..."
                  rows={4}
                  className="form-input resize-none"
                />
              </div>

              <div className="border-t border-brand-dark/8 pt-4">
                <p className="micro-label text-brand-text-muted mb-3">PAYMENT METHODS</p>
                <div className="flex gap-3">
                  <span className="px-4 py-2 bg-brand-dark/5 rounded-lg text-sm text-brand-dark font-medium">
                    Airtel Money
                  </span>
                  <span className="px-4 py-2 bg-brand-dark/5 rounded-lg text-sm text-brand-dark font-medium">
                    Bank Transfer
                  </span>
                </div>
              </div>

              <button
                onClick={handleConsultSubmit}
                disabled={!consultForm.name || !consultForm.contact}
                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Book Consultation
                <ArrowRight className="ml-2 w-4 h-4" />
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Auth Dialog */}
      <AuthPage 
        isOpen={authOpen} 
        onClose={() => setAuthOpen(false)} 
        initialMode={authMode}
      />
    </>
  );
}

export default App;
