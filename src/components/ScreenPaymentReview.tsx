import React from 'react';
import { ShieldAlert, Sparkles, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';
import { AscendLogo } from './AscendLogo';

interface ScreenPaymentReviewProps {
  currentTime: number; // 3.0 - 7.0
  isMobile?: boolean;
}

export const ScreenPaymentReview: React.FC<ScreenPaymentReviewProps> = ({
  currentTime,
  isMobile = false,
}) => {
  // Phase progress: 3.0s to 7.0s
  const elapsed = Math.max(0, Math.min(4.0, currentTime - 3.0));
  // Scanning animation runs from 0.0s to 1.5s (total 3.0s to 4.5s)
  const isScanning = elapsed < 1.5;
  // Scan progress percentage
  const scanProgress = isScanning ? Math.min(100, Math.round((elapsed / 1.5) * 100)) : 100;

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
              Payment Review
            </div>
          </div>
        </div>

        {/* Phase Badge */}
        <div className="flex items-center gap-2 px-3 py-1 bg-slate-900 border border-slate-800 rounded-md">
          {isScanning ? (
            <>
              <RefreshCw className="w-3.5 h-3.5 text-amber-400 animate-spin" />
              <span className="text-xs font-medium text-amber-300 font-mono-numbers">
                Scanning {scanProgress}%
              </span>
            </>
          ) : (
            <>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-xs font-medium text-slate-300">Analysis Complete</span>
            </>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col justify-center py-4 space-y-5">
        {/* Scanning Banner or Completed Result */}
        {isScanning ? (
          <div className="bg-slate-900/90 border border-amber-500/30 rounded-xl p-6 sm:p-8 text-center relative overflow-hidden shadow-2xl">
            {/* Animated Laser Scan Bar */}
            <div
              className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-transparent via-amber-500/20 to-transparent pointer-events-none"
              style={{
                width: '60%',
                left: `${(elapsed / 1.5) * 80}%`,
                transition: 'left 80ms linear',
              }}
            />

            <div className="relative z-10 flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mb-4 text-amber-400">
                <Sparkles className="w-8 h-8 animate-pulse" />
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
                Ascend Finance is reviewing the payment
              </h3>
              <p className="text-base text-slate-400 max-w-md">
                Evaluating trader historical patterns and compliance with broker rules...
              </p>

              {/* Progress bar */}
              <div className="w-full max-w-sm mt-6 bg-slate-800 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-amber-500 to-violet-500 h-2.5 rounded-full transition-all duration-100 ease-out"
                  style={{ width: `${scanProgress}%` }}
                />
              </div>
            </div>
          </div>
        ) : (
          /* Analysis Result with Accent Risk Tag & 2 Motivos */
          <div className="bg-slate-900/95 border border-slate-800 rounded-xl p-5 sm:p-6 shadow-2xl space-y-5">
            {/* Risk Accent Tag */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/40 flex items-center justify-center text-amber-400">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold block">
                    Estimated Risk Level
                  </span>
                  {/* Risk Tag in Accent Color: Medium risk */}
                  <span className="text-2xl sm:text-3xl font-extrabold text-amber-400 tracking-tight flex items-center gap-2">
                    Medium risk
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs text-slate-400 block font-medium">Assessed Request</span>
                <span className="text-base font-semibold text-white">Carlos M. (1,250 USDC)</span>
              </div>
            </div>

            {/* Two Simple Reasons */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-3">
                Key Assessment Factors
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-slate-950/70 border border-slate-800 rounded-lg p-3.5 flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-amber-400 mt-2 shrink-0" />
                  <div>
                    <span className="text-base sm:text-lg font-bold text-slate-100 block">
                      Amount higher than average
                    </span>
                    <span className="text-xs text-slate-400 mt-0.5 block">
                      Exceeds habitual payout requests for this trader account by 40%.
                    </span>
                  </div>
                </div>

                <div className="bg-slate-950/70 border border-slate-800 rounded-lg p-3.5 flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-amber-400 mt-2 shrink-0" />
                  <div>
                    <span className="text-base sm:text-lg font-bold text-slate-100 block">
                      First-time withdrawal for this trader
                    </span>
                    <span className="text-xs text-slate-400 mt-0.5 block">
                      No previous disbursement history on record for this profile.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Prominent Governance Motto */}
            <div className="bg-gradient-to-r from-violet-950/60 via-slate-900 to-amber-950/40 border border-violet-500/30 rounded-xl p-4 sm:p-5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-violet-500/20 border border-violet-500/40 flex items-center justify-center shrink-0 text-violet-300">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs uppercase font-bold text-violet-300 tracking-wider">
                  Governance Principle
                </div>
                <div className="text-lg sm:text-xl font-extrabold text-white tracking-tight leading-snug">
                  “AI recommends; the broker decides.”
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="pt-2 text-center border-t border-slate-800/50">
        <span className="text-xs text-slate-500 tracking-wider">
          Phase 2 of 3 · Automated assessment without autonomous execution
        </span>
      </div>
    </div>
  );
};
