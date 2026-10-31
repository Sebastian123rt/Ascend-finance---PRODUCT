import React, { useState } from 'react';
import { AscendLogo } from './AscendLogo';
import {
  ArrowRight,
  CheckCircle2,
  Lock,
  Mail,
  Send,
  Linkedin,
  Share2,
  Sparkles,
  Shield,
  ExternalLink,
} from 'lucide-react';

interface LeadCaptureSectionProps {
  onOpenIntegrationModal?: () => void;
}

export const LeadCaptureSection: React.FC<LeadCaptureSectionProps> = ({
  onOpenIntegrationModal,
}) => {
  const [contactInput, setContactInput] = useState('');
  const [hasConsented, setHasConsented] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedValue, setSubmittedValue] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactInput.trim()) {
      setErrorMsg('Please enter your business email or WhatsApp / Telegram number.');
      return;
    }
    if (!hasConsented) {
      setErrorMsg('Please authorize sending sandbox documentation.');
      return;
    }

    setErrorMsg('');
    setIsSubmitting(true);

    // Simulate instant secure submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setSubmittedValue(contactInput.trim());
      setContactInput('');
    }, 600);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setSubmittedValue('');
  };


  return (
    <section className="w-full border-t border-slate-800/80 bg-slate-950 relative overflow-hidden pt-16 pb-12 select-none">
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-72 bg-gradient-to-b from-amber-500/10 via-violet-500/5 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 space-y-12">
        {/* Section Headline */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono-numbers uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Early Access Cohort · Prop Firms &amp; Institutional Brokers</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase leading-tight">
            FINANCE WILL{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-rose-400 to-emerald-400">
              MOVE DIFFERENTLY.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
            Leave your business email or Telegram / WhatsApp to request early API sandbox access before public onboarding.
          </p>
        </div>

        {/* Interactive Lead Capture Form */}
        <div className="max-w-2xl mx-auto bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-md relative overflow-hidden">
          {isSubmitted ? (
            /* Success Feedback Card */
            <div className="text-center py-6 space-y-4 animate-in fade-in duration-300">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/10">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-1.5">
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Early Sandbox Access Requested!
                </h3>
                <p className="text-sm text-slate-300 max-w-md mx-auto">
                  We have registered <strong className="text-emerald-300 font-mono-numbers">{submittedValue}</strong> for priority sandbox onboarding.
                </p>
              </div>

              <div className="p-3.5 bg-slate-950/80 rounded-xl border border-slate-800/80 max-w-md mx-auto text-xs text-slate-400 font-mono-numbers flex items-center justify-between">
                <span>Access Ticket: #AF-SBX-8942</span>
                <span className="text-emerald-400">Status: Dispatched in 24h</span>
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
            /* Active Input Form */
            <form onSubmit={handleSubmit} className="space-y-4">
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
                      if (errorMsg) setErrorMsg('');
                    }}
                    placeholder="Enter your business email or Telegram / WhatsApp..."
                    className="w-full pl-10 pr-4 py-3.5 bg-slate-950 rounded-xl border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30 transition-all font-mono-numbers"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-500/20 active:scale-95 disabled:opacity-50 shrink-0"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Request Early Access →</span>
                    </>
                  )}
                </button>
              </div>

              {errorMsg && (
                <p className="text-xs text-rose-400 font-medium">
                  {errorMsg}
                </p>
              )}

              {/* Consent Checkbox & Legal Note */}
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

        {/* Social & Hashtag Anchor */}
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

        {/* Footer Metadata */}
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

          {/* Institutional Data Sources Footnote */}
          <div className="text-[11px] text-slate-500 text-center sm:text-left leading-relaxed">
            <strong className="text-slate-400">Institutional Data Sources Footnote:</strong> Data references based on global retail trading payout liquidity studies and OTC execution benchmarks. For sandbox integration and broker compliance inquiries, contact sebastianavila3525@gmail.com.
          </div>
        </div>
      </div>
    </section>
  );
};
