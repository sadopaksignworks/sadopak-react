export type LeadType = 'consultation' | 'tender' | 'contact';

export interface LeadPayload {
  name: string;
  email?: string;
  phone: string;
  businessName?: string;
  location?: string;
  type: LeadType;
  message?: string;
  plan?: 'basic' | 'standard' | 'premium';
  /** hCaptcha token from frontend widget */
  hcaptchaToken?: string;
}

const WP_BASE = (import.meta as any).env?.VITE_WP_URL || 'https://wp.sadopak.org';

export async function submitLead(payload: LeadPayload) {
  const res = await fetch(`${WP_BASE}/wp-json/sadopak/v1/lead`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(json?.error || json?.message || 'Submission failed');
  }
  return json;
}
