import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Phone, Mail, ArrowRight, Check, Facebook, Youtube, Instagram } from 'lucide-react';
import { toast } from 'sonner';
import { submitLead } from '@/lib/sadopakApi';
import HcaptchaBox from '@/components/HcaptchaBox';

gsap.registerPlugin(ScrollTrigger);


interface ContactSectionProps {
  onBookConsultation: () => void;
}

const socialLinks = [
  { name: 'YouTube', icon: Youtube, href: 'https://youtube.com/@sadopaksignworks?si=4X1KXxg_i4j1nKIT' },
  { name: 'Instagram', icon: Instagram, href: 'https://www.instagram.com/sadopaksignworks?igsh=MWhtejRtZnkyMHBzNQ%3D%3D&utm_source=qr' },
  { name: 'Facebook', icon: Facebook, href: 'https://www.facebook.com/share/1XUJWaLPCg/?mibextid=wwXIfr' },
];

export default function ContactSection({ onBookConsultation }: ContactSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    location: '',
    contact: '',
    message: '',
  });
  const [hToken, setHToken] = useState('');
  const [captchaKey, setCaptchaKey] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Left column animation
      gsap.fromTo(leftRef.current,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Right column animation
      gsap.fromTo(rightRef.current,
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async () => {
    if (!formData.name || !formData.contact) return;

    if (!hToken) {
      toast.error('Please complete the verification (hCaptcha).');
      return;
    }
    try {
      await submitLead({
        type: 'contact',
        name: formData.name,
        phone: formData.contact,
        businessName: formData.businessName,
        location: formData.location,
        message: formData.message,
        hcaptchaToken: hToken,
      });
      setSubmitted(true);
      toast.success('Message sent. We will contact you shortly.');
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', businessName: '', location: '', contact: '', message: '' });
        setHToken('');
        setCaptchaKey((k) => k + 1);
      }, 2500);
    } catch (e: any) {
      toast.error(e?.message || 'Failed to send message');
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-brand-light"
    >
      <div className="flex flex-col lg:flex-row">
        {/* Left Column - Business Card */}
        <div
          ref={leftRef}
          className="w-full lg:w-[44vw] py-12 lg:py-[10vh] px-4 sm:px-6 lg:px-[7vw] flex flex-col justify-center"
        >
          <div className="bg-white rounded-[20px] p-6 sm:p-8 border border-brand-dark/8 shadow-card">
            {/* Logo */}
            <div className="mb-8 flex items-center gap-4">
              <img 
                src="/logo-light.png" 
                alt="SADOPAK SIGNWORKS" 
                className="logo-card"
              />
              <div>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-brand-dark mb-1">
                  SADOPAK SIGNWORKS
                </h3>
                <p className="micro-label text-brand-accent">
                  SIGNAGE CONSULTANCY & BROKERAGE
                </p>
              </div>
            </div>

            {/* Tagline */}
            <div className="mb-8">
              <p className="font-display text-lg sm:text-xl text-brand-dark mb-2">
                "Our DIRECTION is Your DEVELOPMENT"
              </p>
              <p className="body-text text-brand-text-muted">
                Growing businesses through outstanding, understandable, and contextual signage.
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-accent/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-brand-accent" />
                </div>
                <span className="text-brand-dark text-sm sm:text-base">Available nationwide</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-accent/10 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-brand-accent" />
                </div>
                <a className="text-brand-dark text-sm sm:text-base hover:underline" href="tel:+260573037125">+260573037125</a>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-accent/10 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-brand-accent" />
                </div>
                <a className="text-brand-dark text-sm sm:text-base hover:underline" href="mailto:sadopaksignworks@gmail.com">sadopaksignworks@gmail.com</a>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="mb-8">
              <p className="micro-label text-brand-text-muted mb-3">ACCEPTED PAYMENT METHODS</p>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 bg-brand-dark/5 rounded-lg text-sm text-brand-dark font-medium">
                  Airtel Money
                </span>
                <span className="px-4 py-2 bg-brand-dark/5 rounded-lg text-sm text-brand-dark font-medium">
                  Bank Transfer
                </span>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <p className="micro-label text-brand-text-muted mb-3">FOLLOW US</p>
              <div className="flex gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className="w-10 h-10 rounded-xl bg-brand-dark/5 flex items-center justify-center text-brand-dark hover:bg-brand-accent hover:text-white transition-all duration-200"
                      title={social.name}
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Form */}
        <div
          ref={rightRef}
          className="w-full lg:w-[56vw] py-12 lg:py-[10vh] px-4 sm:px-6 lg:px-[7vw] lg:pl-[4vw] flex flex-col justify-center"
        >
          <h2 className="font-display headline-2 text-brand-dark mb-4">
            Let's put your direction to work.
          </h2>
          <p className="body-text text-brand-text-muted mb-8">
            Tell us what you're building. We'll reply with next steps and a clear timeline.
          </p>

          {submitted ? (
            <div className="bg-green-50 rounded-[20px] p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-display text-xl text-brand-dark mb-2">
                Request Submitted!
              </h3>
              <p className="text-brand-text-muted">
                We'll be in touch within 24 hours.
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="micro-label text-brand-text-muted mb-2 block">
                    NAME
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    placeholder="Your business name"
                    className="form-input"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="micro-label text-brand-text-muted mb-2 block">
                    LOCATION
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
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
                    value={formData.contact}
                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
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
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about your project..."
                  rows={4}
                  className="form-input resize-none"
                />
              </div>

              <div>
                <label className="micro-label text-brand-text-muted mb-2 block">
                  VERIFICATION
                </label>
                <HcaptchaBox
                  key={captchaKey}
                  onToken={(t) => setHToken(t)}
                  helperText="Required to send this message."
                />
              </div>

              <div className="pt-4">
                <button
                  onClick={handleSubmit}
                  disabled={!formData.name || !formData.contact || !hToken}
                  className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Send Message
                  <ArrowRight className="ml-2 w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-brand-dark py-8 px-4 sm:px-6 lg:px-[7vw]">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-brand-text-secondary text-sm">
            © 2026 SADOPAK SIGNWORKS. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="/services" className="text-brand-text-secondary text-sm hover:text-brand-light transition-colors">
              Services
            </a>
            <a href="/industries" className="text-brand-text-secondary text-sm hover:text-brand-light transition-colors">
              Industries
            </a>
            <a href="/contact" className="text-brand-text-secondary text-sm hover:text-brand-light transition-colors">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </section>
  );
}
