import { useState } from 'react';
import { ArrowRight, Upload, Wallet, Handshake, Check } from 'lucide-react';
import { toast } from 'sonner';
import { submitLead } from '@/lib/sadopakApi';
import HcaptchaBox from '@/components/HcaptchaBox';

export default function StartProjectPage() {
  const [loading, setLoading] = useState(false);
  const [hToken, setHToken] = useState('');
  const [captchaKey, setCaptchaKey] = useState(0);
  const [form, setForm] = useState({
    name: '',
    businessName: '',
    phone: '',
    email: '',
    requirements: '',
  });

  const onSubmit = async () => {
    if (!form.name || !form.businessName || !form.phone || !form.email || !form.requirements) {
      toast.error('Please fill in all required fields.');
      return;
    }

    if (!hToken) {
      toast.error('Please complete the verification (hCaptcha).');
      return;
    }

    setLoading(true);
    try {
      await submitLead({
        type: 'tender',
        name: form.name,
        phone: form.phone,
        email: form.email,
        businessName: form.businessName,
        message: form.requirements,
        hcaptchaToken: hToken,
      });
      toast.success('Tender submitted successfully. We will respond within 24 hours.');
      setForm({ name: '', businessName: '', phone: '', email: '', requirements: '' });
      setHToken('');
      setCaptchaKey((k) => k + 1);
    } catch (e: any) {
      toast.error(e?.message || 'Submission failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative w-full bg-brand-dark pt-28 pb-16">
      <div className="px-4 sm:px-6 lg:px-[7vw]">
        <div className="max-w-4xl">
          <p className="micro-label text-brand-accent mb-3">BROKERAGE</p>
          <h1 className="font-display headline-2 text-brand-light mb-4">Start a Project</h1>
          <p className="body-text text-brand-text-secondary mb-10">
            Submit your invitation to tender. We match you to vetted manufacturers and installers, then coordinate until installation is complete.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-brand-light/5 border border-brand-light/10 rounded-[20px] p-6 sm:p-8">
            <h2 className="font-display text-2xl text-brand-light mb-2">Submit Invitation to Tender</h2>
            <p className="text-brand-text-secondary text-sm mb-6">
              Paste your requirements. If you have a document, paste key sections here (scope, quantities, deadlines).
            </p>

            <div className="space-y-5">
              <div>
                <label className="micro-label text-brand-text-secondary mb-2 block">YOUR NAME</label>
                <input
                  className="form-input"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Full name"
                />
              </div>

              <div>
                <label className="micro-label text-brand-text-secondary mb-2 block">BUSINESS / INSTITUTION</label>
                <input
                  className="form-input"
                  value={form.businessName}
                  onChange={(e) => setForm({ ...form, businessName: e.target.value })}
                  placeholder="Organization name"
                />
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
                <label className="micro-label text-brand-text-secondary mb-2 block">PROJECT REQUIREMENTS</label>
                <textarea
                  className="form-input resize-none"
                  rows={7}
                  value={form.requirements}
                  onChange={(e) => setForm({ ...form, requirements: e.target.value })}
                  placeholder="Paste tender scope, sizes, materials, locations, deadlines, etc."
                />
              </div>

              <div>
                <label className="micro-label text-brand-text-secondary mb-2 block">VERIFICATION</label>
                <HcaptchaBox
                  key={captchaKey}
                  onToken={(t) => setHToken(t)}
                  helperText="Required to submit this tender."
                />
              </div>

              <button
                onClick={onSubmit}
                disabled={loading || !hToken}
                className="btn-primary w-full disabled:opacity-60"
              >
                <Upload className="w-4 h-4 mr-2" />
                {loading ? 'Submitting…' : 'Submit Tender'}
                <ArrowRight className="ml-2 w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="bg-white rounded-[20px] p-6 sm:p-8 border border-brand-dark/8 shadow-card">
            <p className="micro-label text-brand-text-muted mb-2">HOW BROKERAGE WORKS</p>
            <h3 className="font-display text-2xl text-brand-dark mb-4">From tender to installation</h3>

            <div className="space-y-3 mb-6">
              {[
                'You submit tender requirements',
                'We share to manufacturers & installers',
                'We compare proposals and support selection',
                'Coordination through fabrication and installation',
              ].map((b, i) => (
                <div key={i} className="flex items-start gap-3 text-brand-dark">
                  <Check className="w-5 h-5 text-brand-accent mt-0.5" />
                  <span className="text-sm">{b}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-brand-dark/10 pt-6">
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
          </div>
        </div>
      </div>
    </section>
  );
}
