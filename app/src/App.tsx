import { Routes, Route, Navigate } from 'react-router-dom';

import SiteLayout from './components/SiteLayout';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import IndustriesPage from './pages/IndustriesPage';
import ContactPage from './pages/ContactPage';
import BookConsultationPage from './pages/BookConsultationPage';
import HowItWorksPage from './pages/HowItWorksPage';
import ImpactPage from './pages/ImpactPage';
import StartProjectPage from './pages/StartProjectPage';

export default function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/industries" element={<IndustriesPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/book-consultation" element={<BookConsultationPage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/impact" element={<ImpactPage />} />
        <Route path="/start-project" element={<StartProjectPage />} />

        {/* Legacy anchors from old single-page build */}
        <Route path="/services#" element={<Navigate to="/services" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
