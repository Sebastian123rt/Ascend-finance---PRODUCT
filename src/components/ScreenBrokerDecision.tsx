import React from 'react';
import { CheckCircle2, UserCheck, Clock, ShieldCheck, ChevronRight } from 'lucide-react';
import { AscendLogo } from './AscendLogo';

interface ScreenBrokerDecisionProps {
  currentTime: number; // 7.0 - 10.0
  isMobile?: boolean;
}

export const ScreenBrokerDecision: React.FC<ScreenBrokerDecisionProps> = ({
  currentTime,
  isMobile = false,
}) => {
  // 7.0s to 10.0s
  // Click occurs at 7.8s - 8.0s
  const isApproved = currentTime >= 7.8;
  const isButtonActive = currentTime >= 7.78 && currentTime <= 8.05;

  return (
    <div className="flex flex-col h-full w-full justify-between p-4 sm:p-6 lg:p-7 text-slate-100 relative overflow-hidden select-none">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <AscendLogo size={isMobile ? 28 : 32} />
          <div>
            <div className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-amber-400">
              Ascend Finance
            </div>
            <div className="text-lg sm:text-2xl font-bold tracking-tight text-white leading-tight">
              Broker Decision
            </div>
          </div>
        </div>

        {/* Status Badge in Header */}
        <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 bg-slate-900 border border-slate-800 rounded-lg">
          {isApproved ? (
            <>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-[11px] sm:text-xs font-semibold text-emerald-400">
                Approved by the broker
              </span>
            </>
          ) : (
            <>
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-[11px] sm:text-xs font-medium text-slate-300">
                Awaiting broker
              </span>
            </>
          )}
        </div>
      </div>

      {/* Main Content Area - Strictly Contained with zero overflow */}
      <div className="flex-1 flex flex-col justify-center py-2 sm:py-3 space-y-2.5 sm:space-y-3.5 overflow-hidden">
        {/* Assessed Request Summary Card */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 sm:p-5 shadow-xl backdrop-blur-sm">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800/70">
            <div>
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-slate-400 block">
                Applicant
              </span>
              <span className="text-sm sm:text-lg font-bold text-white">
                Carlos M. · Mexico 🇲🇽
              </span>
            </div>

            <div className="text-right">
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-slate-400 block">
                Amount
              </span>
              <span className="text-base sm:text-xl font-bold font-mono-numbers text-amber-400">
                1,250 USDC
              </span>
            </div>
          </div>

          {/* Dynamic Status: Strictly updates on click to "Approved by the broker" */}
          <div className="py-2.5 sm:py-3">
            <div className="text-[10px] sm:text-xs uppercase font-semibold text-slate-400 mb-1">
              Authorization Status
            </div>

            {isApproved ? (
              <div className="space-y-2 transition-all duration-300 ease-out">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    {/* Strict requirement: 'Approved by the broker' */}
                    <div className="text-lg sm:text-2xl font-extrabold text-emerald-400 tracking-tight leading-none">
                      Approved by the broker
                    </div>
                    {/* Strict requirement: 'Estimated arrival: Minutes' */}
                    <div className="text-xs sm:text-sm font-medium text-slate-300 flex items-center gap-1 mt-1">
                      <Clock className="w-3.5 h-3.5 text-emerald-400/80" />
                      <span>Estimated arrival: Minutes</span>
                    </div>
                  </div>
                </div>

                <div className="bg-emerald-950/30 border border-emerald-500/30 rounded-lg p-2 sm:p-2.5 text-[10px] sm:text-xs text-emerald-300 flex items-center gap-1.5 leading-tight">
                  <UserCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Manual decision confirmed by authorized broker. Immutable audit log recorded.</span>
                </div>
              </div>
            ) : (
              <div className="space-y-1">
                <div className="text-base sm:text-xl font-bold text-slate-200">
                  Pending human review
                </div>
                <p className="text-[10px] sm:text-xs text-slate-400 leading-tight">
                  Medium risk classified. In accordance with governance rules, final decision rests exclusively with the broker.
                </p>
              </div>
            )}
          </div>

          {/* Action Area: Broker's Approve Button */}
          <div className="pt-1 flex flex-col items-center justify-center">
            <div className="w-full max-w-sm relative">
              <button
                type="button"
                className={`w-full py-3 sm:py-3.5 px-5 sm:px-6 rounded-xl font-bold text-sm sm:text-base tracking-wide transition-all duration-150 flex items-center justify-center gap-2.5 shadow-xl ${
                  isApproved
                    ? 'bg-emerald-600 text-white border border-emerald-400/50 shadow-emerald-900/30'
                    : isButtonActive
                    ? 'bg-amber-400 text-slate-950 scale-95 ring-4 ring-amber-400/40 shadow-inner'
                    : 'bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 shadow-amber-500/20'
                }`}
              >
                {isApproved ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-white" />
                    <span>Approved by the broker</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-5 h-5 text-slate-950" />
                    <span>Approve</span>
                    <ChevronRight className="w-4 h-4 text-slate-950/70" />
                  </>
                )}
              </button>

              <span className="block text-center text-[10px] sm:text-[11px] text-slate-400 mt-1.5 font-medium">
                {isApproved
                  ? 'Human authorization signature confirmed'
                  : 'Automated operator virtual click'}
              </span>
            </div>
          </div>
        </div>

        {/* Strict Human Governance Guarantee */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-2.5 sm:p-3 text-center">
          <p className="text-[10px] sm:text-xs text-slate-400 leading-tight">
            <strong className="text-slate-300">Strict human governance:</strong> AI never approves autonomously; it only recommends. The final decision is always explicitly made by the broker.
          </p>
        </div>
      </div>

      {/* Footer / Phase Indicator: Flex-aligned with safe clearance so it NEVER collides with the corner watermark */}
      <div className="pt-2 flex items-center justify-between border-t border-slate-800/50 text-[10px] sm:text-xs text-slate-500 tracking-wider">
        <div className="flex items-center gap-1.5 truncate max-w-[calc(100%-165px)]">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400/70 shrink-0" />
          <span className="truncate">Phase 3 of 3 · Operator authorization completed</span>
        </div>
      </div>
    </div>
  );
};
