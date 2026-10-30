import React, { useState } from 'react';
import { X, Check, Copy, ArrowRight, Zap, Shield, Server, Terminal, Layers } from 'lucide-react';
import { AscendLogo } from './AscendLogo';

interface BrokerIntegrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BrokerIntegrationModal: React.FC<BrokerIntegrationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const webhookPayload = `{
  "event": "trader.withdrawal_requested",
  "request_id": "WD-94021",
  "timestamp": "2026-10-30T11:24:00Z",
  "broker": {
    "firm_id": "prop_capital_prime",
    "trading_platform": "MetaTrader 5 / Prop Portal",
    "risk_policy": "manual_approval_medium_high"
  },
  "trader": {
    "account_id": "TR-8819",
    "name": "Carlos M.",
    "country": "MX"
  },
  "payout": {
    "amount": "1250.00",
    "currency": "USDC",
    "settlement_rail": "instant_digital_asset"
  }
}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(webhookPayload);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-[0_25px_80px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/50">
          <div className="flex items-center gap-3">
            <AscendLogo size={28} />
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                Broker & Prop Firm Architecture
              </div>
              <h2 className="text-lg font-bold text-white tracking-tight">
                How Ascend Finance Connects to Your Withdrawal Flow
              </h2>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 overflow-y-auto">
          {/* 4-Step Pipeline Flow */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>End-to-End Payout Journey</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              {/* Step 1 */}
              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] font-mono-numbers font-bold text-amber-400 uppercase tracking-wider mb-1">
                    Step 01 · Trader Portal
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1">Withdrawal Trigger</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Trader hits &quot;Withdraw&quot; on your broker portal (MT4/5, cTrader, or custom CRM).
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-800/80 text-[10px] text-slate-500 font-mono-numbers">
                  Latency: 0ms
                </div>
              </div>

              {/* Step 2 */}
              <div className="bg-slate-950/80 border border-amber-500/30 rounded-xl p-3.5 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] font-mono-numbers font-bold text-amber-400 uppercase tracking-wider mb-1">
                    Step 02 · Webhook Sync
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1">Ascend API Bridge</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Your backend sends a lightweight JSON webhook to Ascend Finance in real-time.
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-800/80 text-[10px] text-amber-400/90 font-mono-numbers">
                  Latency: ~35ms
                </div>
              </div>

              {/* Step 3 */}
              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] font-mono-numbers font-bold text-violet-400 uppercase tracking-wider mb-1">
                    Step 03 · Pre-Flight Risk
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1">AI Recommendation</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Scans account age, payout velocity, and deviation from trader baseline.
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-800/80 text-[10px] text-slate-500 font-mono-numbers">
                  AI Recommends
                </div>
              </div>

              {/* Step 4 */}
              <div className="bg-slate-950/80 border border-emerald-500/30 rounded-xl p-3.5 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] font-mono-numbers font-bold text-emerald-400 uppercase tracking-wider mb-1">
                    Step 04 · Broker Decision
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1">Human 1-Click</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Broker operator reviews and clicks &quot;Approve&quot;. Zero autonomous money movement.
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-800/80 text-[10px] text-emerald-400/90 font-mono-numbers">
                  Broker Decides
                </div>
              </div>
            </div>
          </div>

          {/* Compatibility Grid */}
          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-2">
              <Server className="w-4 h-4 text-amber-400" />
              <span>Compatible Broker Stacks</span>
            </div>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300">
                MetaTrader 5 (MT5 Manager API)
              </span>
              <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300">
                MetaTrader 4 (MT4 Webhooks)
              </span>
              <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300">
                cTrader Open API
              </span>
              <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300">
                Match-Trader API
              </span>
              <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300">
                DXtrade Broker Gateway
              </span>
              <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300">
                Custom Prop Firm Portals (REST / Webhooks)
              </span>
            </div>
          </div>

          {/* Webhook JSON Payload Preview */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-emerald-400" />
                <span>Broker Incoming Webhook Payload (POST /v1/withdrawals/incoming)</span>
              </div>
              <button
                type="button"
                onClick={handleCopy}
                className="px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1.5 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy Payload'}</span>
              </button>
            </div>

            <pre className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-[11px] sm:text-xs font-mono-numbers text-slate-300 overflow-x-auto leading-relaxed">
              {webhookPayload}
            </pre>
          </div>

          {/* Institutional Compliance Callout */}
          <div className="p-4 rounded-xl bg-violet-950/30 border border-violet-500/30 flex items-start gap-3">
            <Shield className="w-5 h-5 text-violet-400 shrink-0 mt-0.5" />
            <div className="text-xs text-slate-300 leading-relaxed">
              <strong className="text-white">Strict Enterprise Control:</strong> Ascend Finance integrates cleanly without requiring brokers to change their existing CRM or database. Your internal accounting remains authoritative; Ascend acts as the dedicated, auditable digital asset payout gateway with mandatory human approval.
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 border-t border-slate-800 bg-slate-950/70 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Ascend Finance · Institutional Infrastructure · Ready for Broker Integration
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all shadow-md"
          >
            Close & Back to Demo
          </button>
        </div>
      </div>
    </div>
  );
};
