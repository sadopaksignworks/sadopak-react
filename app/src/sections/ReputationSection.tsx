import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ReputationSectionProps {
  onSeeHowItWorks: () => void;
}

export default function ReputationSection({ onSeeHowItWorks }: ReputationSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

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
        { x: 50, opacity: 0 },
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

  const headlineLines = ["Grow your reputation", "with signage that", "speaks clearly."];

  return (
    <section ref={sectionRef} className="relative w-full bg-brand-dark py-16 lg:py-24">
      <div className="px-4 sm:px-6 lg:px-[7vw]">
        <div className="flex flex-col lg:flex-row items-stretch gap-8 lg:gap-0">
          {/* Image Side */}
          <div className="w-full lg:w-1/2 image-container">
            <div 
              className="w-full h-[300px] sm:h-[400px] lg:h-[600px] bg-cover bg-center"
              style={{ 
                backgroundImage: 'url(/reputation_city.jpg)',
                borderRadius: '20px'
              }}
            >
              <div className="w-full h-full bg-gradient-to-r from-brand-dark/30 to-transparent rounded-[20px]" />
            </div>
          </div>

          {/* Content Side */}
          <div className="w-full lg:w-1/2 lg:pl-12 xl:pl-20 flex flex-col justify-center">
            <div className="bg-brand-light/5 backdrop-blur-sm rounded-[20px] p-6 sm:p-8 lg:p-10">
              {/* Headline */}
              <h2 className="font-display headline-2 text-brand-light mb-6 reveal-item">
                {headlineLines.map((line, i) => (
                  <span key={i} className="block">
                    {line}
                  </span>
                ))}
              </h2>

              {/* Accent Rule */}
              <div className="accent-rule mb-6 reveal-item" />

              {/* Body */}
              <p className="body-text text-brand-text-secondary mb-8 reveal-item">
                We analyze your brand, environment, and customer flow—then specify size, color, materials, and placement so your identity feels intentional everywhere.
              </p>

              {/* CTA */}
              <button
                onClick={onSeeHowItWorks}
                className="btn-primary w-fit group reveal-item"
              >
                See How It Works
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
