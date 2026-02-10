import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, FileText, Wallet, Handshake, Upload } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { toast } from 'sonner';

gsap.registerPlugin(ScrollTrigger);

interface BrokerageSectionProps {
  onSubmitTender?: () => void;
}

const steps = [
  {
    icon: FileText,
    title: 'Submit Invitation to Tender',
    description: 'Paste your document outlining project requirements',
  },
  {
    icon: Wallet,
    title: 'Client Payment',
    description: '5% of total project cost after installation',
  },
  {
    icon: Handshake,
    title: 'Manufacturer Commission',
    description: '5% of manufacturer profit for bringing clients',
  },
];

export default function BrokerageSection({ onSubmitTender: _onSubmitTender }: BrokerageSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [tenderDialogOpen, setTenderDialogOpen] = useState(false);
  const [tenderData, setTenderData] = useState({
    name: '',
    business: '',
    requirements: '',
  });

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

  const handleTenderSubmit = () => {
    if (tenderData.name && tenderData.business && tenderData.requirements) {
      toast.success('Tender submitted successfully! We will review and get back to you within 24 hours.');
      setTenderDialogOpen(false);
      setTenderData({ name: '', business: '', requirements: '' });
    }
  };

  return (
    <>
      <section ref={sectionRef} className="relative w-full bg-brand-dark py-16 lg:py-24">
        <div className="px-4 sm:px-6 lg:px-[7vw]">
          <div className="flex flex-col lg:flex-row items-stretch gap-8 lg:gap-0">
            {/* Image Side */}
            <div className="w-full lg:w-1/2 image-container">
              <div 
                className="w-full h-[300px] sm:h-[400px] lg:h-[600px] bg-cover bg-center"
                style={{ 
                  backgroundImage: 'url(/brokerage_install.jpg)',
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
                <h2 className="font-display headline-2 text-brand-light mb-4 reveal-item">
                  Sign Brokerage
                </h2>

                {/* Body */}
                <p className="body-text text-brand-text-secondary mb-8 reveal-item">
                  You share the tender. We match it to vetted manufacturers and installers—then coordinate until installation is complete.
                </p>

                {/* Steps */}
                <div className="space-y-5 mb-8">
                  {steps.map((step, i) => {
                    const Icon = step.icon;
                    return (
                      <div
                        key={i}
                        className="flex items-start gap-4 reveal-item"
                      >
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

                {/* CTA */}
                <button
                  onClick={() => setTenderDialogOpen(true)}
                  className="btn-primary w-fit group reveal-item"
                >
                  Submit a Tender
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tender Submission Dialog */}
      <Dialog open={tenderDialogOpen} onOpenChange={setTenderDialogOpen}>
        <DialogContent className="bg-white rounded-[20px] p-8 max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl text-brand-dark">
              Submit Invitation to Tender
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-5 mt-4">
            <div>
              <label className="micro-label text-brand-text-muted mb-2 block">
                YOUR NAME
              </label>
              <input
                type="text"
                value={tenderData.name}
                onChange={(e) => setTenderData({ ...tenderData, name: e.target.value })}
                placeholder="Enter your full name"
                className="form-input"
              />
            </div>

            <div>
              <label className="micro-label text-brand-text-muted mb-2 block">
                BUSINESS NAME
              </label>
              <input
                type="text"
                value={tenderData.business}
                onChange={(e) => setTenderData({ ...tenderData, business: e.target.value })}
                placeholder="Enter your business name"
                className="form-input"
              />
            </div>

            <div>
              <label className="micro-label text-brand-text-muted mb-2 block">
                PROJECT REQUIREMENTS
              </label>
              <textarea
                value={tenderData.requirements}
                onChange={(e) => setTenderData({ ...tenderData, requirements: e.target.value })}
                placeholder="Paste your tender document or describe your project requirements..."
                rows={6}
                className="form-input resize-none"
              />
            </div>

            <div className="border-t border-brand-dark/8 pt-4">
              <p className="text-sm text-brand-text-muted mb-4">
                <strong className="text-brand-dark">Payment Terms:</strong>
              </p>
              <ul className="text-sm text-brand-text-muted space-y-2">
                <li className="flex items-center gap-2">
                  <Wallet className="w-4 h-4 text-brand-accent" />
                  Client pays 5% of total project cost after installation
                </li>
                <li className="flex items-center gap-2">
                  <Handshake className="w-4 h-4 text-brand-accent" />
                  Manufacturer pays 5% commission on their profit
                </li>
              </ul>
            </div>

            <button
              onClick={handleTenderSubmit}
              disabled={!tenderData.name || !tenderData.business || !tenderData.requirements}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Upload className="w-4 h-4 mr-2" />
              Submit Tender
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
