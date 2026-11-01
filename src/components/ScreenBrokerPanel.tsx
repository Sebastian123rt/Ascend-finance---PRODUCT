import React from 'react';
import { User, Clock, ShieldCheck, ArrowRight, Zap, Activity } from 'lucide-react';
import { AscendLogo } from './AscendLogo';

interface ScreenBrokerPanelProps {
  currentTime?: number;
  isMobile?: boolean;
}

export const ScreenBrokerPanel: React.FC<ScreenBrokerPanelProps> = ({
  currentTime = 0,
  isMobile = false,
}) => {
  // First 1.4 seconds show the incoming webhook sync event from the broker platform
  const isIncomingSync = currentTime < 1.4;

  return (
    <div className="flex flex-col h-full w-full justify-between p-4 sm:p-6 lg:p-7 text-slate-100 overflow-hidden select-none">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <AscendLogo size={isMobile ? 28 : 32} />
          <div>
            <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-white">
              ASCEND FINANCE
            </div>
            <div className="text-lg sm:text-2xl font-bold tracking-tight text-white leading-tight">
              Broker Console
            </div>
          </div>
        </div>

        {/* Live Broker Connection Badge */}
        <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 bg-slate-900 border border-slate-800 rounded-lg">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <div className="text-left">
            <span className="text-[9px] text-slate-400 font-mono-numbers block leading-none">Broker API Bridge</span>
            <span className="text-[11px] sm:text-xs font-semibold text-emerald-300">Connected</span>
          </div>
        </div>
      </div>

      {/* Main Content Area - Strictly contained with zero overflow */}
      <div className="flex-1 flex flex-col justify-center py-2 sm:py-3 space-y-2.5 sm:space-y-3.5 overflow-hidden">
        {/* Dynamic Webhook Ingestion Notification */}
        <div className="bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-900 border border-amber-500/30 rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 flex items-center justify-between text-xs transition-all">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <Zap className="w-3.5 h-3.5 animate-pulse" />
            </div>
            <div className="leading-tight">
              <span className="font-semibold text-white block text-[11px] sm:text-xs">
                {isIncomingSync ? '⚡ Ingesting Trader Withdrawal Request' : '✓ Webhook Synced from Broker Portal'}
              </span>
              <span className="text-[10px] sm:text-[11px] text-slate-400 font-mono-numbers block">
                Source: MT5 Gateway · Latency: 32ms · Event: #WD-94021
              </span>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-950 border border-slate-800 font-mono-numbers text-[10px] text-amber-300">
            <Activity className="w-3 h-3 text-emerald-400" />
            <span>Synced</span>
          </div>
        </div>

        {/* Trader Details Card */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 sm:p-5 shadow-xl backdrop-blur-sm">
          <div className="flex items-center justify-between border-b border-slate-800/70 pb-3 mb-2.5">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-slate-800 flex items-center justify-center text-amber-400 border border-slate-700/60 shrink-0">
                <User className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <span className="text-[10px] sm:text-xs text-slate-400 font-medium block">Trader Profile</span>
                <span className="text-base sm:text-xl font-bold text-white tracking-tight">
                  Carlos M. <span className="text-xs sm:text-sm font-normal text-slate-400 font-mono-numbers">(TR-8819)</span>
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-right">
              <span className="text-xl sm:text-2xl" role="img" aria-label="Flag of Mexico">🇲🇽</span>
              <div>
                <span className="text-[10px] sm:text-xs text-slate-400 font-medium block">Destination</span>
                <span className="text-sm sm:text-base font-semibold text-slate-200">Mexico</span>
              </div>
            </div>
          </div>

          {/* Prominent Amount */}
          <div className="py-1 text-center sm:text-left">
            <div className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-slate-400 mb-0.5">
              Requested Payout
            </div>
            <div className="flex items-baseline justify-center sm:justify-start gap-2.5">
              <span className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-mono-numbers tracking-tight text-white drop-shadow-[0_2px_12px_rgba(255,255,255,0.15)]">
                1,250
              </span>
              <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-white drop-shadow-[0_2px_12px_rgba(255,255,255,0.15)]">
                USDC
              </span>
            </div>
            <p className="text-[10px] sm:text-xs text-slate-500 mt-0.5 font-mono-numbers">
              Nominal equivalent: $1,250.00 USD · Origin: Broker Balance
            </p>
          </div>

          {/* Current Status Badge */}
          <div className="mt-3 pt-2.5 border-t border-slate-800/70 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Clock className="w-4 h-4 text-white" />
              <span className="text-xs text-slate-400 font-medium">Status:</span>
              <span className="text-sm sm:text-base font-bold text-white">
                Ready to send
              </span>
            </div>

            <div className="text-[10px] sm:text-xs font-mono-numbers text-slate-400 flex items-center gap-1">
              <span>Automated verification</span>
              <ArrowRight className="w-3 h-3 text-slate-500" />
            </div>
          </div>
        </div>

        {/* Broker Policy Card */}
        <div className="bg-slate-900/60 border border-slate-800/90 rounded-xl p-3 sm:p-4 flex items-start gap-2.5 sm:gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0 mt-0.5 text-amber-400">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 mb-0.5">
              Broker Policy
            </div>
            <div className="text-xs sm:text-sm lg:text-base font-semibold text-slate-100 leading-snug">
              “Manual approval required if risk is medium or high.”
            </div>
            <p className="text-[10px] sm:text-xs text-slate-400 mt-0.5 leading-relaxed">
              Disbursements from broker accounts are evaluated instantly according to firm-level risk thresholds.
            </p>
          </div>
        </div>
      </div>

      {/* Footer / Phase Indicator: Flex-aligned with safe clearance so it NEVER collides with the corner watermark */}
      <div className="pt-2 flex items-center justify-between border-t border-slate-800/50 text-[10px] sm:text-xs text-slate-500 tracking-wider">
        <div className="flex items-center gap-1.5 truncate max-w-[calc(100%-165px)]">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400/70 shrink-0" />
          <span className="truncate">Phase 1 of 3 · Connected via Broker Webhook Bridge (Auto-Ingestion)</span>
        </div>
      </div>
    </div>
  );
};
