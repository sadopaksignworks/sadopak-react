import { useNavigate } from 'react-router-dom';
import ConsultationSection from '@/sections/ConsultationSection';
import BrokerageSection from '@/sections/BrokerageSection';

export default function ServicesPage() {
  const navigate = useNavigate();
  return (
    <>
      <div className="pt-24" />
      <ConsultationSection onBookConsultation={() => navigate('/book-consultation')} />
      <BrokerageSection onSubmitTender={() => navigate('/start-project')} />
    </>
  );
}
