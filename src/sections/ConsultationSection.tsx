import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Check, Star } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

gsap.registerPlugin(ScrollTrigger);

interface ConsultationSectionProps {
  onBookConsultation: () => void;
}

const services = [
  'Brand & environment analysis',
  'Right size, material & color',
  'Accuracy of instruction / direction',
  'Design, font & text color',
  'Number of signs & placement plan',
  'Condition audit (existing signage)',
];

export default function ConsultationSection({ onBookConsultation }: ConsultationSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [promoDialogOpen, setPromoDialogOpen] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Image reveal
      gsap.fromTo(
        section.querySelector('.image-container'),
        { opacity: 0, scale: 1.05 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Content reveal
      gsap.fromTo(
        section.querySelectorAll('.reveal-item'),
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handlePromoSubmit = () => {
    if (promoCode.trim() && rating > 0) {
      setSubmitted(true);
      setTimeout(() => {
        setPromoDialogOpen(false);
        setSubmitted(false);
        setPromoCode('');
        setRating(0);
      }, 2000);
    }
  };

  return (
    <>
      <section ref={sectionRef} className="relative w-full bg-brand-dark py-16 lg:py-24">
        <div className="px-4 sm:px-6 lg:px-[7vw]">
          <div className="flex flex-col-reverse lg:flex-row items-stretch gap-8 lg:gap-0">
            {/* Content Side */}
            <div className="w-full lg:w-1/2 lg:pr-12 xl:pr-20 flex flex-col justify-center">
              <div className="bg-brand-light/5 backdrop-blur-sm rounded-[20px] p-6 sm:p-8 lg:p-10">
                {/* Headline */}
                <h2 className="font-display headline-2 text-brand-light mb-4 reveal-item">
                  Sign Consultation
                </h2>

                {/* Accent Rule */}
                <div className="accent-rule mb-6 reveal-item" />

                {/* Service List */}
                <ul className="space-y-3 mb-8">
                  {services.map((service, i) => (
                    <li key={i} className="flex items-start gap-3 body-text text-brand-text-secondary reveal-item">
                      <Check className="w-5 h-5 text-brand-accent flex-shrink-0 mt-0.5" />
                      <span>{service}</span>
                    </li>
                  ))}
                </ul>

                {/* Pricing Card */}
                <div className="bg-white rounded-[20px] p-6 border border-brand-dark/8 shadow-card mb-4 reveal-item">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <p className="micro-label text-brand-text-muted mb-1">CONSULTATION FEE</p>
                      <p className="font-display text-3xl font-bold text-brand-dark">$300</p>
                    </div>
                    <button
                      onClick={onBookConsultation}
                      className="btn-primary group w-full sm:w-auto"
                    >
                      Book Consultation
                      <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>

                {/* Promo Micro-card */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-sm reveal-item">
                  <span className="text-brand-text-secondary">
                    Have a promo code? Redeem a free consultation in exchange for a public review.
                  </span>
                  <button
                    onClick={() => setPromoDialogOpen(true)}
                    className="text-brand-accent font-medium hover:underline whitespace-nowrap flex items-center gap-1"
                  >
                    Enter promo code
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

            {/* Image Side */}
            <div className="w-full lg:w-1/2 image-container">
              <div 
                className="w-full h-[300px] sm:h-[400px] lg:h-[600px] bg-cover bg-center"
                style={{ 
                  backgroundImage: 'url(/consultation_architecture.jpg)',
                  borderRadius: '20px'
                }}
              >
                <div className="w-full h-full bg-gradient-to-l from-brand-dark/30 to-transparent rounded-[20px]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Promo Code Dialog */}
      <Dialog open={promoDialogOpen} onOpenChange={setPromoDialogOpen}>
        <DialogContent className="bg-white rounded-[20px] p-8 max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl text-brand-dark">
              {submitted ? 'Thank You!' : 'Redeem Free Consultation'}
            </DialogTitle>
          </DialogHeader>

          {submitted ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <p className="text-brand-text-muted">
                Your review has been submitted. You will receive your free consultation confirmation shortly.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <label className="micro-label text-brand-text-muted mb-2 block">
                  PROMO CODE
                </label>
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Enter your code"
                  className="form-input"
                />
              </div>

              <div>
                <label className="micro-label text-brand-text-muted mb-2 block">
                  RATE OUR SERVICE
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      className="transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-8 h-8 ${
                          star <= rating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handlePromoSubmit}
                disabled={!promoCode.trim() || rating === 0}
                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit Review & Redeem
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
