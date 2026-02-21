import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  onBookConsultation: () => void;
}

export default function HeroSection({ onBookConsultation }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;

    const ctx = gsap.context(() => {
      // Initial load animation
      gsap.fromTo(
        content.querySelectorAll('.animate-item'),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          delay: 0.3,
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const headlineText = "Our DIRECTION is Your DEVELOPMENT";
  const words = headlineText.split(' ');

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden bg-brand-dark"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: 'url(/hero_direction.jpg)',
          borderRadius: '0'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/40 via-brand-dark/60 to-brand-dark/90" />
      </div>

      {/* Content */}
      <div 
        ref={contentRef}
        className="relative z-10 min-h-screen flex flex-col justify-center px-4 sm:px-6 lg:px-[7vw] py-24"
      >
        {/* Headline */}
        <h1 className="font-display headline-1 text-brand-light max-w-full lg:max-w-[62vw] mb-6 animate-item">
          {words.map((word, i) => (
            <span key={i} className="inline-block mr-[0.25em]">
              {word}
            </span>
          ))}
        </h1>

        {/* Subheadline */}
        <p className="body-text text-brand-text-secondary max-w-full lg:max-w-[42vw] mb-8 animate-item">
          Grow reputation, cut labor costs, and keep customers coming back—through signage that actually works.
        </p>

        {/* CTA Button */}
        <button
          onClick={onBookConsultation}
          className="btn-primary w-fit group animate-item"
        >
          Book a Consultation
          <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>

        {/* Quick Links */}
        <div className="flex flex-wrap gap-4 mt-6 animate-item">
          <Link to="/services" className="text-brand-text-secondary hover:text-brand-light text-sm underline-offset-4 hover:underline">
            Services
          </Link>
          <Link to="/industries" className="text-brand-text-secondary hover:text-brand-light text-sm underline-offset-4 hover:underline">
            Industries
          </Link>
          <Link to="/contact" className="text-brand-text-secondary hover:text-brand-light text-sm underline-offset-4 hover:underline">
            Contact
          </Link>
        </div>

        {/* Left Edge Label - Hidden on mobile */}
        <div
          className="hidden lg:block absolute left-[2.2vw] top-[46vh] animate-item"
          style={{ transform: 'rotate(-90deg)', transformOrigin: 'left center' }}
        >
          <span className="micro-label text-brand-text-secondary whitespace-nowrap">
            SIGNAGE CONSULTANCY & BROKERAGE
          </span>
        </div>
      </div>
    </section>
  );
}
