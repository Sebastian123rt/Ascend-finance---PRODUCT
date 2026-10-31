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
    <div className="flex flex-col h-full w-full justify-between p-4 sm:p-6 lg:p-7 text-slate-100 overflow-hidden select-none">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <AscendLogo size={isMobile ? 28 : 32} />
          <div>
            <div className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-amber-400">
              Ascend Finance
            </div>
            <div className="text-lg sm:text-2xl font-bold tracking-tight text-white leading-tight">
              Payment Review
            </div>
          </div>
        </div>

        {/* Phase Badge */}
        <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 bg-slate-900 border border-slate-800 rounded-lg">
          {isScanning ? (
            <>
              <RefreshCw className="w-3.5 h-3.5 text-amber-400 animate-spin" />
              <span className="text-[11px] sm:text-xs font-medium text-amber-300 font-mono-numbers">
                Scanning {scanProgress}%
              </span>
            </>
          ) : (
            <>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-[11px] sm:text-xs font-medium text-slate-300">Analysis Complete</span>
            </>
          )}
        </div>
      </div>

      {/* Main Content Area - Strictly Contained */}
      <div className="flex-1 flex flex-col justify-center py-2 sm:py-3 space-y-2.5 sm:space-y-3.5 overflow-hidden">
        {/* Scanning Banner or Completed Result */}
        {isScanning ? (
          <div className="bg-slate-900/90 border border-amber-500/30 rounded-xl p-5 sm:p-7 text-center relative overflow-hidden shadow-xl">
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
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mb-3 text-amber-400">
                <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 animate-pulse" />
              </div>

              <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight mb-1.5">
                Ascend Finance is reviewing the payment
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 max-w-md leading-relaxed">
                Evaluating trader historical patterns and compliance with broker rules...
              </p>

              {/* Progress bar */}
              <div className="w-full max-w-xs mt-4 bg-slate-800 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-amber-500 to-violet-500 h-2 rounded-full transition-all duration-100 ease-out"
                  style={{ width: `${scanProgress}%` }}
                />
              </div>
            </div>
          </div>
        ) : (
          /* Analysis Result with Accent Risk Tag & 2 Reasons */
          <div className="bg-slate-900/95 border border-slate-800 rounded-xl p-3.5 sm:p-5 shadow-xl space-y-3 sm:space-y-4">
            {/* Risk Accent Tag */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-amber-500/15 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
                  <ShieldAlert className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <span className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-wider font-semibold block">
                    Estimated Risk Level
                  </span>
                  <span className="text-xl sm:text-2xl font-extrabold text-amber-400 tracking-tight flex items-center gap-1.5">
                    Medium risk
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] sm:text-xs text-slate-400 block font-medium">Assessed Request</span>
                <span className="text-xs sm:text-sm font-semibold text-white">Carlos M. (1,250 USDC)</span>
              </div>
            </div>

            {/* Two Simple Reasons */}
            <div>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                Key Assessment Factors
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
                <div className="bg-slate-950/70 border border-slate-800 rounded-lg p-2.5 sm:p-3 flex items-start gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                  <div>
                    <span className="text-xs sm:text-sm font-bold text-slate-100 block">
                      Amount higher than account average (+40%)
                    </span>
                    <span className="text-[10px] sm:text-xs text-slate-400 mt-0.5 block leading-tight">
                      Exceeds habitual payout requests for this trader account by 40%.
                    </span>
                  </div>
                </div>

                <div className="bg-slate-950/70 border border-slate-800 rounded-lg p-2.5 sm:p-3 flex items-start gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                  <div>
                    <span className="text-xs sm:text-sm font-bold text-slate-100 block">
                      First-time withdrawal for this trader
                    </span>
                    <span className="text-[10px] sm:text-xs text-slate-400 mt-0.5 block leading-tight">
                      No previous disbursement history on record for this profile.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Prominent Governance Motto */}
            <div className="bg-gradient-to-r from-violet-950/60 via-slate-900 to-amber-950/40 border border-violet-500/30 rounded-xl p-3 sm:p-3.5 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-violet-500/20 border border-violet-500/40 flex items-center justify-center shrink-0 text-violet-300">
                <AlertCircle className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[9px] sm:text-[10px] uppercase font-bold text-violet-300 tracking-wider">
                  Governance Principle
                </div>
                <div className="text-sm sm:text-base font-extrabold text-white tracking-tight leading-snug">
                  “AI recommends; the broker decides.”
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer / Phase Indicator: Flex-aligned with safe clearance so it NEVER collides with the corner watermark */}
      <div className="pt-2 flex items-center justify-between border-t border-slate-800/50 text-[10px] sm:text-xs text-slate-500 tracking-wider">
        <div className="flex items-center gap-1.5 truncate max-w-[calc(100%-165px)]">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400/70 shrink-0" />
          <span className="truncate">Phase 2 of 3 · Automated assessment without autonomous execution</span>
        </div>
      </div>
    </div>
  );
};
