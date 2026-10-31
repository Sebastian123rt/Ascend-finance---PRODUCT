import React, { useState } from 'react';
import {
  TrendingUp,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Eye,
  DollarSign,
  Clock,
  Sparkles,
  BarChart3,
  CheckCircle2,
  XCircle,
  Zap,
  Globe,
  Building2,
  Quote,
} from 'lucide-react';

interface DataNarrativeSectionProps {
  onScrollToDemo: () => void;
}

export const DataNarrativeSection: React.FC<DataNarrativeSectionProps> = ({
  onScrollToDemo,
}) => {
  const [activeComparisonTab, setActiveComparisonTab] = useState<'all' | 'legacy' | 'ascend'>('all');

  return (
    <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 pt-10 pb-16 space-y-12 select-none">
      {/* 1. Founder Origin Quote Section ("Why We Exist") */}
      <div className="space-y-6 max-w-5xl">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs font-mono-numbers uppercase tracking-wider">
            <Quote className="w-3.5 h-3.5 text-amber-400" />
            <span>Why We Exist · Origin Story</span>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono-numbers text-slate-300 bg-slate-900 border border-slate-800 px-3 py-1 rounded-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Sebastian Avila — Founder, Ascend Finance</span>
          </div>
        </div>

        {/* Primary Founder Origin Headline */}
        <div className="relative pl-6 sm:pl-8 border-l-4 border-amber-400 space-y-4">
          <h1 className="text-2xl sm:text-4xl md:text-[40px] font-extrabold tracking-tight text-white leading-[1.25]">
            “When reviewing institutional trader payouts, we found two broken paths:{' '}
            <span className="text-amber-400">traditional bank wires taking days</span>, or{' '}
            <span className="text-rose-400">manual crypto transfers with zero audit trails</span>.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-amber-300">
              Nothing else.
            </span>”
          </h1>

          {/* Subtitle / Founder Note */}
          <p className="text-base sm:text-xl text-slate-300 leading-relaxed font-normal">
            “When we looked at the data, legacy banking handled only 31% of desired payout volume,
            while automated digital liquidity moved billions instantly. We realized: that&apos;s where the institutional opportunity is.”
          </p>

          <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-t border-slate-800/60 text-xs text-slate-400">
            <span className="font-semibold text-slate-200 text-sm">
              — Sebastian Avila, Founder &amp; CEO
            </span>
            <span className="font-mono-numbers">
              Ascend Finance Engineering &amp; Liquidity Research · Built for Real-World Broker Operations
            </span>
          </div>
        </div>
      </div>

      {/* 2. Financial Metric Cards (Real Broker Industry Baseline) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Card 1: $660M+ Daily OTC & Crypto Payouts */}
        <div className="bg-slate-900/90 border border-rose-500/30 rounded-2xl p-6 relative overflow-hidden shadow-2xl backdrop-blur-sm group hover:border-rose-500/50 transition-all">
          <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/5 rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-rose-400 mb-2">
            <span>Fragmented Payouts</span>
            <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 text-[10px] font-mono-numbers">Off-Grid Volume</span>
          </div>
          <div className="text-4xl sm:text-5xl font-extrabold font-mono-numbers text-white tracking-tight my-2">
            $660M+
          </div>
          <div className="text-sm font-semibold text-rose-200">
            Daily OTC &amp; Crypto Payouts
          </div>
          <p className="text-xs text-slate-400 mt-2 leading-relaxed">
            Fragmented payout channels used by global traders due to slow bank wires, weekend blackouts, and localized friction.
          </p>
        </div>

        {/* Card 2: 31% Settlement Rate */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 relative overflow-hidden shadow-2xl backdrop-blur-sm group hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            <span>Legacy Banking Rails</span>
            <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] font-mono-numbers">Same-Session</span>
          </div>
          <div className="text-4xl sm:text-5xl font-extrabold font-mono-numbers text-slate-100 tracking-tight my-2">
            31%
          </div>
          <div className="text-sm font-semibold text-slate-300">
            Settlement Rate
          </div>
          <p className="text-xs text-slate-400 mt-2 leading-relaxed">
            Traditional SWIFT/SEPA broker payout efficiency within the same trading session. 69% of requests stall in intermediary correspondent delays.
          </p>
        </div>

        {/* Card 3: 2 out of 3 Traders */}
        <div className="bg-gradient-to-br from-violet-950/40 via-slate-900/90 to-amber-950/30 border border-amber-500/30 rounded-2xl p-6 relative overflow-hidden shadow-2xl backdrop-blur-sm group hover:border-amber-500/50 transition-all">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
            <span>Trader Demand Shift</span>
            <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-mono-numbers">Global Preference</span>
          </div>
          <div className="text-4xl sm:text-5xl font-extrabold font-mono-numbers text-amber-300 tracking-tight my-2">
            2 out of 3
          </div>
          <div className="text-sm font-semibold text-white">
            Traders Demand Stablecoins
          </div>
          <p className="text-xs text-slate-400 mt-2 leading-relaxed">
            Demand instant stablecoin payouts over 3-day bank settlement times and unpredictable intermediary FX cuts.
          </p>
        </div>
      </div>

      {/* 3. Comparison Chart: Legacy Banking vs. Ascend API Bridge */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-md space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-mono-numbers uppercase tracking-wider text-amber-400 font-bold block mb-1">
              Structural Performance Matrix
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Legacy Banking Wires vs. Ascend API Bridge
            </h3>
          </div>

          {/* Interactive Filter Pills */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800 text-xs">
            <button
              type="button"
              onClick={() => setActiveComparisonTab('all')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                activeComparisonTab === 'all'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Side-by-Side View
            </button>
            <button
              type="button"
              onClick={() => setActiveComparisonTab('legacy')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                activeComparisonTab === 'legacy'
                  ? 'bg-rose-500/20 text-rose-300 font-bold border border-rose-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Legacy Banking Only
            </button>
            <button
              type="button"
              onClick={() => setActiveComparisonTab('ascend')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                activeComparisonTab === 'ascend'
                  ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Ascend API Bridge Only
            </button>
          </div>
        </div>

        {/* Detailed Comparison Table / Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Legacy Banking Wires */}
          {(activeComparisonTab === 'all' || activeComparisonTab === 'legacy') && (
            <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white">Traditional Bank Wires</h4>
                    <span className="text-[11px] text-slate-400">SWIFT / SEPA / Local ACH Batches</span>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded bg-rose-950 text-rose-400 border border-rose-800/50 text-[10px] font-mono-numbers">
                  High Friction
                </span>
              </div>

              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex items-start gap-2.5">
                  <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">3 to 5 Business Days Settlement</strong>
                    <span>Weekend lockouts, correspondent bank fees, and opaque clearing delays.</span>
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Manual Operator Batching</strong>
                    <span>Finance teams export CSVs manually; risk of typo and unrecoverable routing errors.</span>
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Hidden FX Spread &amp; Wire Deductions</strong>
                    <span>Traders receive less than requested due to intermediary bank charges.</span>
                  </div>
                </li>
              </ul>
            </div>
          )}

          {/* Ascend Instant API Bridge */}
          {(activeComparisonTab === 'all' || activeComparisonTab === 'ascend') && (
            <div className="bg-slate-950/70 border border-emerald-500/30 rounded-xl p-5 space-y-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-xl pointer-events-none" />
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white">Ascend Instant API Bridge</h4>
                    <span className="text-[11px] text-emerald-400 font-mono-numbers">32ms Webhook Ingestion</span>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800/50 text-[10px] font-mono-numbers">
                  Institutional Rail
                </span>
              </div>

              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Settlement in Minutes, 24/7/365</strong>
                    <span>Direct stablecoin disbursements (USDC) with instantaneous cryptographic delivery.</span>
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Automated Ingestion + 1-Click Human Approval</strong>
                    <span>Zero manual CSVs. MetaTrader/cTrader triggers webhook; operator approves with 1 click.</span>
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Deterministic Zero-Slippage Execution</strong>
                    <span>Exact dollar-for-dollar payout. Real-time pre-flight risk checks prevent unauthorized outflows.</span>
                  </div>
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Narrative Conclusion & Bridge to Live Demo */}
        <div className="p-4 sm:p-5 rounded-xl bg-gradient-to-r from-violet-950/40 via-slate-900 to-amber-950/30 border border-violet-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-wider font-bold text-amber-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Bridge Legacy Broker Systems to Modern Digital Liquidity</span>
            </span>
            <p className="text-sm text-slate-200 max-w-2xl leading-relaxed">
              Experience the 10-second automated demo below: watch how an incoming trader withdrawal webhook
              is analyzed in milliseconds and authorized with strict human governance.
            </p>
          </div>

          <button
            type="button"
            onClick={onScrollToDemo}
            className="shrink-0 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all shadow-lg shadow-amber-500/20"
          >
            <span>Launch Live Interactive Demo</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 4. Core Value Proposition Grid */}
      <div className="space-y-6">
        <div className="max-w-2xl">
          <span className="text-xs font-mono-numbers uppercase tracking-wider text-amber-400 font-bold block mb-1">
            Core Infrastructure Pillars
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Built for Real-World Broker &amp; Prop Firm Operations
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Designed to eliminate financial blind spots while keeping broker risk teams in total control.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* 01 / Know the Trader */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 relative overflow-hidden shadow-xl backdrop-blur-sm group hover:border-slate-700 transition-all flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono-numbers font-bold text-amber-400 uppercase tracking-widest mb-3">
                01 / Know the Trader
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight mb-2">
                Automated Identity Verification &amp; Risk Scanning
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Connects directly to your trader registry. Instantly flags account tenure, withdrawal velocity deviations,
                and geographic mismatch before funds ever leave firm accounts.
              </p>
            </div>
            <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center gap-2 text-xs text-slate-400">
              <Eye className="w-4 h-4 text-amber-400" />
              <span>Real-time trader attribution</span>
            </div>
          </div>

          {/* 02 / Transparent Execution */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 relative overflow-hidden shadow-xl backdrop-blur-sm group hover:border-slate-700 transition-all flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono-numbers font-bold text-amber-400 uppercase tracking-widest mb-3">
                02 / Transparent Execution
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight mb-2">
                Real-Time FX / USDC Conversions
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Execute payouts with zero hidden slippage, predictable on-chain transaction costs, and deterministic delivery times.
                What the trader requests is exactly what arrives in their account.
              </p>
            </div>
            <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center gap-2 text-xs text-slate-400">
              <DollarSign className="w-4 h-4 text-emerald-400" />
              <span>Zero hidden slippage model</span>
            </div>
          </div>

          {/* 03 / Predictable Execution */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 relative overflow-hidden shadow-xl backdrop-blur-sm group hover:border-slate-700 transition-all flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono-numbers font-bold text-amber-400 uppercase tracking-widest mb-3">
                03 / Predictable Execution
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight mb-2">
                AI-Assisted Pre-Flight Risk Checking
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                AI evaluates risk instantaneously and provides intelligent triage recommendations before disbursement,
                while human operators retain 100% execution authority. No funds move autonomously.
              </p>
            </div>
            <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-violet-400" />
              <span>AI recommends; the broker decides</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
