import { useNavigate } from 'react-router-dom';
import ContactSection from '@/sections/ContactSection';

export default function ContactPage() {
  const navigate = useNavigate();
  return (
    <>
      <div className="pt-24" />
      <ContactSection onBookConsultation={() => navigate('/book-consultation')} />
    </>
  );
}
