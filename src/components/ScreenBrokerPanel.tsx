import React from 'react';
import { User, Clock, ShieldCheck, ArrowRight, Zap, Server, Activity } from 'lucide-react';
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
    <div className="flex flex-col h-full w-full justify-between p-6 sm:p-8 text-slate-100">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
        <div className="flex items-center gap-3">
          <AscendLogo size={32} />
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-400">
              Ascend Finance
            </div>
            <div className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <span>Broker Console</span>
            </div>
          </div>
        </div>

        {/* Live Broker Connection Badge */}
        <div className="flex items-center gap-2 px-3 py-1 bg-slate-900 border border-slate-800 rounded-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <div className="text-left">
            <span className="text-[10px] text-slate-400 font-mono-numbers block leading-none">Broker API Bridge</span>
            <span className="text-xs font-semibold text-emerald-300">Connected</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col justify-center py-3 space-y-4">
        {/* Dynamic Webhook Ingestion Notification (highlights connection from broker's withdrawal request) */}
        <div className="bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-900 border border-amber-500/30 rounded-xl px-4 py-2.5 flex items-center justify-between text-xs transition-all">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <Zap className="w-4 h-4 animate-pulse" />
            </div>
            <div>
              <span className="font-semibold text-white block">
                {isIncomingSync ? '⚡ Ingesting Trader Withdrawal Request' : '✓ Webhook Synced from Broker Portal'}
              </span>
              <span className="text-[11px] text-slate-400 font-mono-numbers">
                Source: MetaTrader 5 / Prop Portal Gateway · Latency: 32ms
              </span>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-950 border border-slate-800 font-mono-numbers text-[10px] text-amber-300">
            <Activity className="w-3 h-3 text-emerald-400" />
            <span>Event: #WD-94021</span>
          </div>
        </div>

        {/* Trader Details Card */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 sm:p-6 shadow-2xl backdrop-blur-sm">
          <div className="flex items-center justify-between border-b border-slate-800/70 pb-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-amber-400 border border-slate-700/60">
                <User className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 font-medium block">Trader Account</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 font-mono-numbers">TR-8819</span>
                </div>
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
              Nominal equivalent: $1,250.00 USD · Origin: Broker Trading Balance
            </p>
          </div>

          {/* Current Status */}
          <div className="mt-4 pt-3.5 border-t border-slate-800/70 flex flex-wrap items-center justify-between gap-3">
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
              Disbursements from broker accounts are evaluated instantly according to firm-level risk thresholds.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-2 text-center border-t border-slate-800/50">
        <span className="text-xs text-slate-500 tracking-wider">
          Phase 1 of 3 · Connected via Broker Webhook Bridge (Auto-Ingestion)
        </span>
      </div>
    </div>
  );
};
