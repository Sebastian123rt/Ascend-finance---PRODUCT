import React from 'react';
import { User, Clock, ShieldCheck, ArrowRight } from 'lucide-react';
import { AscendLogo } from './AscendLogo';

interface ScreenBrokerPanelProps {
  isMobile?: boolean;
}

export const ScreenBrokerPanel: React.FC<ScreenBrokerPanelProps> = ({ isMobile = false }) => {
  return (
    <div className="flex flex-col h-full w-full justify-between p-6 sm:p-8 text-slate-100">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
        <div className="flex items-center gap-3">
          <AscendLogo size={32} />
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-400">
              Ascend Finance
            </div>
            <div className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              Broker Console
            </div>
          </div>
        </div>

        {/* Live indicator */}
        <div className="flex items-center gap-2 px-3 py-1 bg-slate-900 border border-slate-800 rounded-md">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-xs font-medium text-slate-300">Incoming Request</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col justify-center py-4 space-y-6">
        {/* Trader Details Card */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 sm:p-6 shadow-2xl backdrop-blur-sm">
          <div className="flex items-center justify-between border-b border-slate-800/70 pb-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-amber-400 border border-slate-700/60">
                <User className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs text-slate-400 font-medium block">Trader Account</span>
                <span className="text-xl sm:text-2xl font-bold text-white tracking-tight">Carlos M.</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-right">
              <span className="text-2xl" role="img" aria-label="Flag of Mexico">🇲🇽</span>
              <div>
                <span className="text-xs text-slate-400 font-medium block">Destination</span>
                <span className="text-lg font-semibold text-slate-200">Mexico</span>
              </div>
            </div>
          </div>

          {/* Prominent Amount */}
          <div className="py-2 text-center sm:text-left">
            <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-400 mb-1">
              Requested Payout
            </div>
            <div className="flex items-baseline justify-center sm:justify-start gap-3">
              <span className="text-4xl sm:text-5xl font-extrabold font-mono-numbers tracking-tight text-white drop-shadow-[0_2px_12px_rgba(255,255,255,0.15)]">
                1,250
              </span>
              <span className="text-2xl sm:text-3xl font-bold text-amber-400">
                USDC
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1 font-mono-numbers">
              Nominal equivalent: $1,250.00 USD
            </p>
          </div>

          {/* Current Status */}
          <div className="mt-5 pt-4 border-t border-slate-800/70 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-amber-400" />
              <span className="text-sm text-slate-400 font-medium">Status:</span>
              <span className="text-base sm:text-lg font-bold text-amber-300">
                Ready to send
              </span>
            </div>

            <div className="text-xs font-mono-numbers text-slate-400 flex items-center gap-1.5">
              <span>Automated verification</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
            </div>
          </div>
        </div>

        {/* Broker Rules: Prominent Governance Policy */}
        <div className="bg-slate-900/60 border border-slate-800/90 rounded-xl p-4 sm:p-5 flex items-start gap-3.5">
          <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0 mt-0.5 text-amber-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
              Broker Rules
            </div>
            <div className="text-base sm:text-lg font-semibold text-slate-100 leading-snug">
              “Manual approval required if risk is medium or high.”
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Disbursements are evaluated in real-time according to institutional risk policies set by the broker.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-2 text-center border-t border-slate-800/50">
        <span className="text-xs text-slate-500 tracking-wider">
          Phase 1 of 3 · Incoming trader request awaiting review
        </span>
      </div>
    </div>
  );
};
