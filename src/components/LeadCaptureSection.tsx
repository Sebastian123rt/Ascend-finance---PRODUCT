import React, { useState } from 'react';
import { AscendLogo } from './AscendLogo';
import {
  CheckCircle2,
  Mail,
  Linkedin,
  Share2,
  Sparkles,
  Shield,
} from 'lucide-react';

interface LeadCaptureSectionProps {
  onOpenIntegrationModal?: () => void;
}

type ContactType = 'email' | 'telegram' | 'whatsapp';

export const LeadCaptureSection: React.FC<LeadCaptureSectionProps> = ({
  onOpenIntegrationModal,
}) => {
  const [contactInput, setContactInput] = useState('');
  const [contactType, setContactType] = useState<ContactType>('email');
  const [hasConsented, setHasConsented] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedValue, setSubmittedValue] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    const trimmed = contactInput.trim();
    if (!trimmed) {
      setErrorMessage('Please enter your contact information.');
      setIsSubmitting(false);
      return;
    }

    if (!hasConsented) {
      setErrorMessage('Please authorize sending sandbox documentation.');
      setIsSubmitting(false);
      return;
    }

    if (contactType === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setErrorMessage('Please enter a valid email address.');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/v1/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contactInput: trimmed, contactType, hasConsented }),
      });

      // Validar si la respuesta viene vacía antes de parsear a JSON
      const text = await response.text();
      let data: any = {};
      try {
        data = text ? JSON.parse(text) : {};
      } catch {
        data = { message: text || `Error del servidor (${response.status})` };
      }

      if (!response.ok) {
        throw new Error(data.message || data.error || `Error del servidor (${response.status})`);
      }

      // Éxito: limpiar campo o mostrar estado completado
      setSubmittedValue(trimmed);
      setIsSubmitted(true);
    } catch (error: any) {
      console.error('Error al enviar registro:', error);
      setErrorMessage(error?.message || 'Ocurrió un error inesperado al enviar los datos.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setSubmittedValue('');
    setContactInput('');
    setErrorMessage(null);
  };

  return (
    <section className="w-full border-t border-slate-800/80 bg-slate-950 relative overflow-hidden pt-16 pb-12 select-none">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-72 bg-gradient-to-b from-amber-500/10 via-violet-500/5 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 space-y-12">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono-numbers uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Early Access Cohort · Prop Firms &amp; Institutional Brokers</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase leading-tight">
            FINANCE WILL{' '}
            <span className="text-[#F59E0B]">
              MOVE DIFFERENTLY.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
            Leave your business email or Telegram / WhatsApp to request early API sandbox access before public onboarding.
          </p>
        </div>

        <div className="max-w-2xl mx-auto bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-md relative overflow-hidden">
          {isSubmitted ? (
            <div className="text-center py-6 space-y-4 animate-in fade-in duration-300">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/10">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-1.5">
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Early Sandbox Access Requested!
                </h3>
                <p className="text-sm text-slate-300 max-w-md mx-auto">
                  Your request for <strong className="text-emerald-300 font-mono-numbers">{submittedValue}</strong> has been successfully saved.
                </p>
              </div>

              <div className="p-3.5 bg-slate-950/80 rounded-xl border border-slate-800/80 max-w-md mx-auto text-xs text-slate-400 font-mono-numbers">
                <span className="text-emerald-400">Status: Request received</span>
              </div>

              <button
                type="button"
                onClick={handleReset}
                className="text-xs text-slate-400 hover:text-white underline underline-offset-4 transition-colors"
              >
                Register another contact or account
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {([
                  ['email', 'Email'],
                  ['telegram', 'Telegram'],
                  ['whatsapp', 'WhatsApp'],
                ] as const).map(([type, label]) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => {
                      setContactType(type);
                      setErrorMessage(null);
                    }}
                    className={`px-4 py-2 rounded-lg border text-xs font-semibold transition-colors ${
                      contactType === type
                        ? 'bg-white/10 border-white/30 text-white shadow-sm'
                        : 'bg-slate-950 border-slate-700 text-slate-400 hover:text-white hover:border-slate-600'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-2.5">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={contactInput}
                    onChange={(e) => {
                      setContactInput(e.target.value);
                      if (errorMessage) setErrorMessage(null);
                    }}
                    placeholder={
                      contactType === 'email'
                        ? 'Enter your business email...'
                        : contactType === 'telegram'
                        ? 'Enter your Telegram username...'
                        : 'Enter your WhatsApp number...'
                    }
                    className="w-full pl-10 pr-4 py-3.5 bg-slate-950 rounded-xl border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30 transition-all font-mono-numbers"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-500/20 active:scale-95 disabled:opacity-50 shrink-0"
                >
                  {isSubmitting ? 'Sending...' : 'Request Early Access →'}
                </button>
              </div>

              {errorMessage && (
                <p className="text-xs text-rose-400 font-medium">{errorMessage}</p>
              )}

              <div className="pt-1 flex items-start gap-2.5">
                <input
                  type="checkbox"
                  id="consentCheckbox"
                  checked={hasConsented}
                  onChange={(e) => setHasConsented(e.target.checked)}
                  className="mt-0.5 rounded bg-slate-950 border-slate-800 text-emerald-500 focus:ring-emerald-500/30 accent-emerald-500 cursor-pointer"
                />
                <label
                  htmlFor="consentCheckbox"
                  className="text-xs text-slate-400 leading-snug cursor-pointer select-none"
                >
                  I authorize Ascend Finance to send API technical documentation and sandbox setup instructions.
                </label>
              </div>

              <div className="pt-2 flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-800/60">
                <div className="flex items-center gap-1.5">
                  <Shield className="w-3 h-3 text-emerald-400" />
                  <span>Institutional NDA-Compliant Sandbox</span>
                </div>
                {onOpenIntegrationModal && (
                  <button
                    type="button"
                    onClick={onOpenIntegrationModal}
                    className="text-amber-400 hover:text-amber-300 hover:underline transition-colors"
                  >
                    View API Webhook Payload →
                  </button>
                )}
              </div>
            </form>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4 px-6 rounded-2xl bg-slate-900/40 border border-slate-800/80">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-mono-numbers">Official Campaign Anchor:</span>
            <span className="text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-rose-400 font-mono-numbers">
              #InfrastructureForRealWorldFinance
            </span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="https://www.linkedin.com/company/ascendfinance/home/?viewAsMember=true"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors border border-slate-700"
              title="Share on LinkedIn"
            >
              <Linkedin className="w-3.5 h-3.5 text-[#0A66C2]" />
              <span>Share on LinkedIn</span>
            </a>

            <a
              href="https://x.com/AscendLabsFi"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors border border-slate-700"
              title="Share on X"
            >
              <Share2 className="w-3.5 h-3.5 text-slate-400" />
              <span>Share on X</span>
            </a>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800/80 space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <div className="flex items-center gap-3">
              <AscendLogo size={28} />
              <span className="font-bold text-white text-sm">Ascend Finance</span>
              <span className="text-slate-600 hidden sm:inline">|</span>
              <span className="text-slate-400 hidden sm:inline">
                Infrastructure for Digital Assets. Built for Real-World Finance.
              </span>
            </div>

            <div className="font-mono-numbers text-slate-500 text-center sm:text-right">
              © 2026 Ascend Finance Inc. All rights reserved.
            </div>
          </div>

          <div className="text-[11px] text-slate-500 text-center sm:text-left leading-relaxed">
            <strong className="text-slate-400">Institutional Data Sources Footnote:</strong> Data references based on global retail trading payout liquidity studies and OTC execution benchmarks. For sandbox integration and broker compliance inquiries, contact sebastianavila3525@gmail.com.
          </div>
        </div>
      </div>
    </section>
  );
};
