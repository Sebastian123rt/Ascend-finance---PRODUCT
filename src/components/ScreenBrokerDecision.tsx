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
    <div className="flex flex-col h-full w-full justify-between p-6 sm:p-8 text-slate-100 relative">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
        <div className="flex items-center gap-3">
          <AscendLogo size={32} />
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-400">
              Ascend Finance
            </div>
            <div className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              Broker Decision
            </div>
          </div>
        </div>

        {/* Status Badge in Header */}
        <div className="flex items-center gap-2 px-3 py-1 bg-slate-900 border border-slate-800 rounded-md">
          {isApproved ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-semibold text-emerald-400">
                Approved by the broker
              </span>
            </>
          ) : (
            <>
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-xs font-medium text-slate-300">
                Awaiting broker
              </span>
            </>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col justify-center py-4 space-y-6">
        {/* Assessed Request Summary */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 sm:p-6 shadow-2xl backdrop-blur-sm">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800/70">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">
                Applicant
              </span>
              <span className="text-lg sm:text-xl font-bold text-white">
                Carlos M. · Mexico 🇲🇽
              </span>
            </div>

            <div className="text-right">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">
                Amount
              </span>
              <span className="text-xl sm:text-2xl font-bold font-mono-numbers text-amber-400">
                1,250 USDC
              </span>
            </div>
          </div>

          {/* Dynamic Status: Strictly updates on click to "Approved by the broker" */}
          <div className="py-4">
            <div className="text-xs uppercase font-semibold text-slate-400 mb-1">
              Authorization Status
            </div>

            {isApproved ? (
              <div className="space-y-3 transition-all duration-300 ease-out">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    {/* Strict requirement: 'Approved by the broker' */}
                    <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 tracking-tight">
                      Approved by the broker
                    </div>
                    {/* Strict requirement: 'Estimated arrival: minutes' */}
                    <div className="text-base sm:text-lg font-medium text-slate-300 flex items-center gap-1.5 mt-0.5">
                      <Clock className="w-4 h-4 text-emerald-400/80" />
                      <span>Estimated arrival: minutes</span>
                    </div>
                  </div>
                </div>

                <div className="bg-emerald-950/30 border border-emerald-500/30 rounded-lg p-3 text-xs text-emerald-300 flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Manual decision confirmed by authorized broker. Immutable audit log recorded.</span>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="text-xl sm:text-2xl font-bold text-slate-200">
                  Pending human review
                </div>
                <p className="text-xs sm:text-sm text-slate-400">
                  Medium risk classified. In accordance with governance rules, final decision rests exclusively with the broker.
                </p>
              </div>
            )}
          </div>

          {/* Action Area: Broker's Approve Button */}
          <div className="pt-2 flex flex-col items-center justify-center">
            <div className="w-full max-w-sm relative">
              <button
                type="button"
                className={`w-full py-4 px-6 rounded-xl font-bold text-lg tracking-wide transition-all duration-150 flex items-center justify-center gap-3 shadow-xl ${
                  isApproved
                    ? 'bg-emerald-600 text-white border border-emerald-400/50 shadow-emerald-900/30'
                    : isButtonActive
                    ? 'bg-amber-400 text-slate-950 scale-95 ring-4 ring-amber-400/40 shadow-inner'
                    : 'bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 shadow-amber-500/20'
                }`}
              >
                {isApproved ? (
                  <>
                    <CheckCircle2 className="w-6 h-6 text-white" />
                    <span>Approved by the broker</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-6 h-6 text-slate-950" />
                    <span>Approve</span>
                    <ChevronRight className="w-5 h-5 text-slate-950/70" />
                  </>
                )}
              </button>

              <span className="block text-center text-xs text-slate-400 mt-2 font-medium">
                {isApproved
                  ? 'Human authorization signature confirmed'
                  : 'Automated operator virtual click'}
              </span>
            </div>
          </div>
        </div>

        {/* Strict Human Governance Guarantee */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-3 text-center">
          <p className="text-xs text-slate-400">
            <strong className="text-slate-300">Strict human governance:</strong> AI never approves autonomously; it only recommends. The final decision is always explicitly made by the broker.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-2 text-center border-t border-slate-800/50">
        <span className="text-xs text-slate-500 tracking-wider">
          Phase 3 of 3 · Operator authorization completed
        </span>
      </div>
    </div>
  );
};
