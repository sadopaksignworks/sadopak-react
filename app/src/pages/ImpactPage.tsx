import { Check, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ImpactPage() {
  return (
    <section className="relative w-full bg-brand-dark pt-28 pb-16">
      <div className="px-4 sm:px-6 lg:px-[7vw]">
        <div className="max-w-4xl">
          <p className="micro-label text-brand-accent mb-3">IMPACT</p>
          <h1 className="font-display headline-2 text-brand-light mb-4">Explore the Impact</h1>
          <p className="body-text text-brand-text-secondary mb-10">
            Better signage is not decoration. It’s a system that improves efficiency, reputation, and customer loyalty.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-brand-light/5 border border-brand-light/10 rounded-[20px] p-6 sm:p-8">
            <h3 className="font-display text-xl text-brand-light mb-3">Reduce labour cost</h3>
            <p className="text-brand-text-secondary">
              Employees spend less time guiding customers and more time doing productive work. Over time, this improves efficiency and can reduce staffing pressure.
            </p>
          </div>
          <div className="bg-brand-light/5 border border-brand-light/10 rounded-[20px] p-6 sm:p-8">
            <h3 className="font-display text-xl text-brand-light mb-3">Improve flow & safety</h3>
            <p className="text-brand-text-secondary">
              Clear direction reduces delays, overcrowding, and confusion. Organized movement reduces friction and lowers the risk of loss and theft.
            </p>
          </div>
          <div className="bg-brand-light/5 border border-brand-light/10 rounded-[20px] p-6 sm:p-8">
            <h3 className="font-display text-xl text-brand-light mb-3">Build reputation & loyalty</h3>
            <p className="text-brand-text-secondary">
              Customers feel respected when they can find what they want quickly. That impression sticks—making your business the first choice.
            </p>
          </div>
        </div>

        <div className="mt-10 bg-white rounded-[20px] p-6 sm:p-8 border border-brand-dark/8 shadow-card max-w-4xl">
          <h2 className="font-display text-2xl text-brand-dark mb-4">Where this matters most</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              'Shopping malls & centers',
              'Hospitals & clinics',
              'Schools & universities',
              'Government complexes',
              'Construction sites',
              'Sports & business complexes',
            ].map((b, i) => (
              <div key={i} className="flex items-start gap-3 text-brand-dark">
                <Check className="w-5 h-5 text-brand-accent mt-0.5" />
                <span className="text-sm">{b}</span>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <Link to="/book-consultation" className="btn-primary w-fit">
              Book Consultation
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
