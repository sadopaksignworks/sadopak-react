import { useNavigate } from 'react-router-dom';

import HeroSection from '@/sections/HeroSection';
import ReputationSection from '@/sections/ReputationSection';
import EfficiencySection from '@/sections/EfficiencySection';
import LoyaltySection from '@/sections/LoyaltySection';
import IndustriesSection from '@/sections/IndustriesSection';
import ConsultationSection from '@/sections/ConsultationSection';
import BrokerageSection from '@/sections/BrokerageSection';
import ContactSection from '@/sections/ContactSection';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <>
      <HeroSection onBookConsultation={() => navigate('/book-consultation')} />
      <ReputationSection onSeeHowItWorks={() => navigate('/how-it-works')} />
      <EfficiencySection onExploreImpact={() => navigate('/impact')} />
      <LoyaltySection onStartProject={() => navigate('/start-project')} />

      <IndustriesSection />
      <ConsultationSection onBookConsultation={() => navigate('/book-consultation')} />
      <BrokerageSection onSubmitTender={() => navigate('/start-project')} />
      <ContactSection onBookConsultation={() => navigate('/book-consultation')} />
    </>
  );
}
