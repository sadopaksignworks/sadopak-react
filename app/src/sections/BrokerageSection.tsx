import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, FileText, Wallet, Handshake } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface BrokerageSectionProps {
  onSubmitTender?: () => void;
}

const steps = [
  {
    icon: FileText,
    title: 'Submit Invitation to Tender',
    description: 'Share your requirements for the project (scope, quantities, deadlines).',
  },
  {
    icon: Wallet,
    title: 'Client Payment',
    description: 'Client pays 5% of total project cost after installation.',
  },
  {
    icon: Handshake,
    title: 'Manufacturer Commission',
    description: 'Manufacturer pays 5% commission of profit for client sourcing.',
  },
];

export default function BrokerageSection({ onSubmitTender }: BrokerageSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
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

  return (
    <section ref={sectionRef} className="relative w-full bg-brand-dark py-16 lg:py-24">
      <div className="px-4 sm:px-6 lg:px-[7vw]">
        <div className="flex flex-col lg:flex-row items-stretch gap-8 lg:gap-0">
          {/* Image Side */}
          <div className="w-full lg:w-1/2 image-container">
            <div
              className="w-full h-[300px] sm:h-[400px] lg:h-[600px] bg-cover bg-center"
              style={{
                backgroundImage: 'url(/brokerage_install.jpg)',
                borderRadius: '20px',
              }}
            >
              <div className="w-full h-full bg-gradient-to-r from-brand-dark/30 to-transparent rounded-[20px]" />
            </div>
          </div>

          {/* Content Side */}
          <div className="w-full lg:w-1/2 lg:pl-12 xl:pl-20 flex flex-col justify-center">
            <div className="bg-brand-light/5 backdrop-blur-sm rounded-[20px] p-6 sm:p-8 lg:p-10">
              <h2 className="font-display headline-2 text-brand-light mb-4 reveal-item">Sign Brokerage</h2>

              <p className="body-text text-brand-text-secondary mb-8 reveal-item">
                You share the tender. We match it to vetted manufacturers and installers—then coordinate until installation is complete.
              </p>

              <div className="space-y-5 mb-8">
                {steps.map((step, i) => {
                  const Icon = step.icon;
                  return (
                    <div key={i} className="flex items-start gap-4 reveal-item">
                      <div className="w-10 h-10 rounded-xl bg-brand-accent/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-brand-accent" />
                      </div>
                      <div>
                        <h4 className="font-medium text-brand-light mb-1">{step.title}</h4>
                        <p className="text-sm text-brand-text-secondary">{step.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <button
                onClick={onSubmitTender}
                className="btn-primary w-fit group reveal-item"
              >
                Start a Project
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
