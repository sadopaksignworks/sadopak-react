import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';

import Navigation from './Navigation';
import AuthPage from '@/sections/AuthPage';

export default function SiteLayout() {
  const navigate = useNavigate();
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');

  const openAuth = (mode: 'signin' | 'signup') => {
    setAuthMode(mode);
    setAuthOpen(true);
  };

  return (
    <>
      <Navigation
        onBookConsultation={() => navigate('/book-consultation')}
        onOpenAuth={openAuth}
      />

      <main className="relative">
        <Outlet />
      </main>

      {/* Grain Overlay */}
      <div className="grain-overlay" />

      <Toaster position="top-center" richColors />

      <AuthPage
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
        initialMode={authMode}
      />
    </>
  );
}
