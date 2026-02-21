import { useMemo, useState } from 'react';
import { ArrowRight, Check, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';
import { submitLead } from '@/lib/sadopakApi';
import HcaptchaBox from '@/components/HcaptchaBox';

type PlanKey = 'basic' | 'standard' | 'premium';

const PLANS: Record<PlanKey, {
  title: string;
  price: string;
  productId: number;
  bullets: string[];
}> = {
  basic: {
    title: 'Basic',
    price: 'K10,500',
    productId: 208,
    bullets: [
      'Business & brand vision analysis',
      'Assessment of operational workflow',
      'Customer movement evaluation',
      'Identify signage gaps & priorities',
      'Written summary report',
    ],
  },
  standard: {
    title: 'Standard',
    price: 'K14,999',
    productId: 210,
    bullets: [
      'Everything in Basic',
      'Detailed signage breakdown & evaluation',
      'Sign size, material, color & font recommendations',
      'Messaging accuracy review',
      'Placement strategy & quantity determination',
      'Professional consultation report',
    ],
  },
  premium: {
    title: 'Premium',
    price: 'K20,999',
    productId: 212,
    bullets: [
      'Everything in Standard',
      'Invitation-to-tender guidance',
      'Manufacturer & installer sourcing',
      'Project coordination support',
      'Structured communication between parties',
      'Oversight during implementation phase',
    ],
  },
};

export default function BookConsultationPage() {
  const [plan, setPlan] = useState<PlanKey>('standard');
  const [loading, setLoading] = useState(false);
  const [hToken, setHToken] = useState('');
  const [captchaKey, setCaptchaKey] = useState(0);
  const [form, setForm] = useState({
    name: '',
    businessName: '',
    location: '',
    phone: '',
    email: '',
    message: '',
  });

  const selected = useMemo(() => PLANS[plan], [plan]);

  const wpCheckoutUrl = (productId: number) =>
    `https://wp.sadopak.org/checkout/?add-to-cart=${productId}`;

  const onSubmit = async () => {
    if (!form.name || !form.phone || !form.email) {
      toast.error('Name, phone, and email are required.');
      return;
    }

    if (!hToken) {
      toast.error('Please complete the verification (hCaptcha).');
      return;
    }

    setLoading(true);
    try {
      await submitLead({
        type: 'consultation',
        plan,
        name: form.name,
        phone: form.phone,
        email: form.email,
        businessName: form.businessName,
        location: form.location,
        message: form.message,
        hcaptchaToken: hToken,
      });

      toast.success('Request received. Proceed to payment to confirm your booking.');
      // Reset captcha for safety before redirect
      setHToken('');
      setCaptchaKey((k) => k + 1);
      window.open(wpCheckoutUrl(selected.productId), '_self');
    } catch (e: any) {
      toast.error(e?.message || 'Submission failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative w-full bg-brand-dark pt-28 pb-16">
      <div className="px-4 sm:px-6 lg:px-[7vw]">
        <div className="max-w-5xl">
          <h1 className="font-display headline-2 text-brand-light mb-4">
            Book a Consultation
          </h1>
          <p className="body-text text-brand-text-secondary mb-10">
            Select a plan, share your details, then proceed to secure payment on our WordPress checkout.
          </p>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          {(Object.keys(PLANS) as PlanKey[]).map((key) => {
            const p = PLANS[key];
            const active = key === plan;
            return (
              <button
                key={key}
                onClick={() => setPlan(key)}
                className={`text-left rounded-[20px] p-6 border transition-all duration-200 ${
                  active
                    ? 'bg-white border-brand-accent shadow-card'
                    : 'bg-brand-light/5 border-brand-light/10 hover:border-brand-light/20'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className={`micro-label ${active ? 'text-brand-text-muted' : 'text-brand-text-secondary'}`}>
                      {p.title.toUpperCase()}
                    </p>
                    <p className={`font-display text-4xl font-bold mt-2 ${active ? 'text-brand-dark' : 'text-brand-light'}`}>
                      {p.price}
                    </p>
                  </div>
                  {active && (
                    <span className="px-3 py-1 rounded-full bg-brand-accent/10 text-brand-accent text-xs font-medium">
                      Selected
                    </span>
                  )}
                </div>

                <div className="mt-5 space-y-2">
                  {p.bullets.slice(0, 5).map((b, i) => (
                    <div key={i} className={`flex items-start gap-2 text-sm ${active ? 'text-brand-dark' : 'text-brand-text-secondary'}`}>
                      <Check className={`w-4 h-4 mt-0.5 ${active ? 'text-brand-accent' : 'text-brand-accent'}`} />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <a
                    href={wpCheckoutUrl(p.productId)}
                    className={`inline-flex items-center gap-2 text-sm font-medium ${
                      active ? 'text-brand-accent' : 'text-brand-light'
                    }`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    Pay this plan
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </button>
            );
          })}
        </div>

        {/* Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-brand-light/5 border border-brand-light/10 rounded-[20px] p-6 sm:p-8">
            <h2 className="font-display text-2xl text-brand-light mb-2">
              Your Details
            </h2>
            <p className="text-brand-text-secondary text-sm mb-6">
              We use this to contact you and prepare the consultation.
            </p>

            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="micro-label text-brand-text-secondary mb-2 block">NAME</label>
                  <input
                    className="form-input"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="micro-label text-brand-text-secondary mb-2 block">BUSINESS NAME</label>
                  <input
                    className="form-input"
                    value={form.businessName}
                    onChange={(e) => setForm({ ...form, businessName: e.target.value })}
                    placeholder="Business / organization"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="micro-label text-brand-text-secondary mb-2 block">PHONE</label>
                  <input
                    className="form-input"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+260..."
                  />
                </div>
                <div>
                  <label className="micro-label text-brand-text-secondary mb-2 block">EMAIL</label>
                  <input
                    className="form-input"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="micro-label text-brand-text-secondary mb-2 block">LOCATION</label>
                <input
                  className="form-input"
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  placeholder="Town / city"
                />
              </div>

              <div>
                <label className="micro-label text-brand-text-secondary mb-2 block">MESSAGE (OPTIONAL)</label>
                <textarea
                  className="form-input resize-none"
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell us what you need..."
                />
              </div>

              <div>
                <label className="micro-label text-brand-text-secondary mb-2 block">VERIFICATION</label>
                <HcaptchaBox
                  key={captchaKey}
                  onToken={(t) => setHToken(t)}
                  helperText="Required to submit this form."
                />
              </div>

              <button
                onClick={onSubmit}
                disabled={loading || !hToken}
                className="btn-primary w-full disabled:opacity-60"
              >
                {loading ? 'Submitting…' : `Continue with ${selected.title}`}
                <ArrowRight className="ml-2 w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="bg-white rounded-[20px] p-6 sm:p-8 border border-brand-dark/8 shadow-card">
            <p className="micro-label text-brand-text-muted mb-2">SELECTED PLAN</p>
            <h3 className="font-display text-2xl text-brand-dark mb-1">{selected.title}</h3>
            <p className="font-display text-4xl font-bold text-brand-dark mb-6">{selected.price}</p>

            <p className="text-sm text-brand-text-muted mb-4">
              After you submit your details, you’ll be taken to checkout to complete payment.
            </p>

            <div className="space-y-3">
              {selected.bullets.map((b, i) => (
                <div key={i} className="flex items-start gap-3 text-brand-dark">
                  <Check className="w-5 h-5 text-brand-accent mt-0.5" />
                  <span className="text-sm">{b}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-brand-dark/10 mt-6 pt-6">
              <p className="micro-label text-brand-text-muted mb-3">PAYMENT METHODS</p>
              <div className="flex gap-3 flex-wrap">
                <span className="px-4 py-2 bg-brand-dark/5 rounded-lg text-sm text-brand-dark font-medium">Airtel Money</span>
                <span className="px-4 py-2 bg-brand-dark/5 rounded-lg text-sm text-brand-dark font-medium">Bank Transfer</span>
                <span className="px-4 py-2 bg-brand-dark/5 rounded-lg text-sm text-brand-dark font-medium">Card</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
