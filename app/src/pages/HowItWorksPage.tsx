import { ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const steps = [
  {
    title: '1) Brand & environment analysis',
    body: 'We learn your vision, values, customer flow, and the real-world context where signage must work.',
  },
  {
    title: '2) Signage strategy & specification',
    body: 'We define the right size, material, color, font, wording, and placement so directions are clear and consistent.',
  },
  {
    title: '3) Implementation support (optional)',
    body: 'If you need execution, we connect you to vetted manufacturers and installers and coordinate delivery to completion.',
  },
  {
    title: '4) Results',
    body: 'Less staff time wasted guiding people, faster customer movement, reduced congestion, and a stronger professional reputation.',
  },
];

export default function HowItWorksPage() {
  return (
    <section className="relative w-full bg-brand-dark pt-28 pb-16">
      <div className="px-4 sm:px-6 lg:px-[7vw]">
        <div className="max-w-4xl">
          <p className="micro-label text-brand-accent mb-3">PROCESS</p>
          <h1 className="font-display headline-2 text-brand-light mb-4">See How It Works</h1>
          <p className="body-text text-brand-text-secondary mb-10">
            SADOPAK SIGNWORKS helps businesses and institutions make signage outstanding, understandable, and contextual.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {steps.map((s, i) => (
            <div key={i} className="bg-brand-light/5 border border-brand-light/10 rounded-[20px] p-6 sm:p-8">
              <h3 className="font-display text-xl text-brand-light mb-2">{s.title}</h3>
              <p className="text-brand-text-secondary">{s.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 bg-white rounded-[20px] p-6 sm:p-8 border border-brand-dark/8 shadow-card max-w-4xl">
          <h2 className="font-display text-2xl text-brand-dark mb-4">What you get</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              'Clear directional flow for customers',
              'Reduced labour spent on guiding',
              'Improved reputation & trust',
              'Better organization and safety',
              'A report you can execute immediately',
              'Optional brokerage to implementation',
            ].map((b, i) => (
              <div key={i} className="flex items-start gap-3 text-brand-dark">
                <Check className="w-5 h-5 text-brand-accent mt-0.5" />
                <span className="text-sm">{b}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/book-consultation" className="btn-primary w-fit">
              Book Consultation
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
            <Link to="/start-project" className="btn-secondary w-fit">
              Start a Project
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
