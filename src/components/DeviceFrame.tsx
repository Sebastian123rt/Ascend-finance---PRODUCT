import React from 'react';
import { ScreenBrokerPanel } from './ScreenBrokerPanel';
import { ScreenPaymentReview } from './ScreenPaymentReview';
import { ScreenBrokerDecision } from './ScreenBrokerDecision';
import { VirtualCursor } from './VirtualCursor';
import { Wifi, Battery, Signal, Shield, Lock } from 'lucide-react';

interface DeviceFrameProps {
  deviceMode: 'mobile' | 'desktop';
  currentTime: number; // 0.0 - 10.0
}

export const DeviceFrame: React.FC<DeviceFrameProps> = ({
  deviceMode,
  currentTime,
}) => {
  const isMobile = deviceMode === 'mobile';

  // Determine active screen based on timeline:
  // 0.0 - 3.0: Screen 1 (Broker Console)
  // 3.0 - 7.0: Screen 2 (Payment Review)
  // 7.0 - 10.0: Screen 3 (Broker Decision)
  let activeScreenIndex = 1;
  if (currentTime >= 3.0 && currentTime < 7.0) {
    activeScreenIndex = 2;
  } else if (currentTime >= 7.0) {
    activeScreenIndex = 3;
  }

  return (
    <div className="relative flex items-center justify-center w-full max-w-full">
      {/* Device Shell */}
      {isMobile ? (
        /* Mobile Frame (9:16 aspect ratio, sleek modern phone bezel) */
        <div className="relative w-[385px] h-[780px] max-h-[88vh] bg-slate-950 rounded-[48px] p-3.5 shadow-[0_25px_70px_rgba(0,0,0,0.85)] border-4 border-slate-800 ring-1 ring-slate-700/50 flex flex-col overflow-hidden">
          {/* Dynamic Island / Notch */}
          <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-6 bg-slate-900 rounded-full z-40 border border-slate-800/80 flex items-center justify-between px-3">
            <div className="w-2.5 h-2.5 rounded-full bg-slate-950" />
            <div className="w-2 h-2 rounded-full bg-emerald-500/80 animate-pulse" />
          </div>

          {/* Mobile Screen Surface */}
          <div className="relative flex-1 bg-gradient-to-b from-slate-950 via-slate-900/90 to-slate-950 rounded-[38px] overflow-hidden flex flex-col border border-slate-800/60">
            {/* Status Bar */}
            <div className="flex items-center justify-between px-6 pt-3 pb-1 text-slate-400 text-xs font-semibold select-none z-30">
              <span className="font-mono-numbers">09:41</span>
              <div className="flex items-center gap-1.5 text-slate-400">
                <Signal className="w-3.5 h-3.5" />
                <Wifi className="w-3.5 h-3.5" />
                <Battery className="w-4 h-4" />
              </div>
            </div>

            {/* In-Screen Content Area */}
            <div className="relative flex-1 overflow-hidden">
              {/* Screen 1: Broker Console */}
              <div
                className={`absolute inset-0 transition-opacity duration-300 ease-in-out ${
                  activeScreenIndex === 1 ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none'
                }`}
              >
                <ScreenBrokerPanel currentTime={currentTime} isMobile={true} />
              </div>

              {/* Screen 2: Payment Review */}
              <div
                className={`absolute inset-0 transition-opacity duration-300 ease-in-out ${
                  activeScreenIndex === 2 ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none'
                }`}
              >
                <ScreenPaymentReview currentTime={currentTime} isMobile={true} />
              </div>

              {/* Screen 3: Broker Decision */}
              <div
                className={`absolute inset-0 transition-opacity duration-300 ease-in-out ${
                  activeScreenIndex === 3 ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none'
                }`}
              >
                <ScreenBrokerDecision currentTime={currentTime} isMobile={true} />
              </div>

              {/* Virtual Cursor Overlay (during Screen 3) */}
              <VirtualCursor currentTime={currentTime} isMobile={true} />
            </div>

            {/* Home Indicator Bar */}
            <div className="w-32 h-1 bg-slate-700/70 rounded-full mx-auto my-2" />

            {/* Fixed Unmovable Watermark Tag */}
            <div className="absolute bottom-2.5 right-3 bg-slate-950/90 border border-slate-800/90 rounded px-2 py-0.5 text-[9px] font-mono-numbers text-slate-400 select-none pointer-events-none z-30 shadow-md backdrop-blur-sm">
              Ascend Finance · Prototype · Sample Data
            </div>
          </div>
        </div>
      ) : (
        /* Desktop Frame (Sleek Browser Window / Executive Terminal) */
        <div className="relative w-full max-w-[940px] h-[640px] max-h-[82vh] bg-slate-950 rounded-2xl shadow-[0_30px_90px_rgba(0,0,0,0.9)] border border-slate-800 ring-1 ring-slate-700/50 flex flex-col overflow-hidden">
          {/* Desktop Browser Window Header */}
          <div className="bg-slate-900 border-b border-slate-800 px-4 py-2.5 flex items-center justify-between select-none">
            {/* Window controls */}
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              <span className="text-xs text-slate-400 font-medium ml-3 hidden sm:inline">
                Ascend Finance — Institutional Portal
              </span>
            </div>

            {/* Address Bar URL Simulation */}
            <div className="flex items-center gap-2 px-4 py-1 bg-slate-950 rounded-lg border border-slate-800 text-xs text-slate-300 font-mono-numbers w-1/2 max-w-md justify-center">
              <Lock className="w-3 h-3 text-emerald-400" />
              <span className="truncate">portal.ascendfinance.com/broker/approval-flow</span>
            </div>

            {/* Secure status */}
            <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
              <Shield className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Secure Connection</span>
            </div>
          </div>

          {/* Desktop Content Surface */}
          <div className="relative flex-1 bg-gradient-to-b from-slate-950 via-slate-900/90 to-slate-950 overflow-hidden">
            {/* Screen 1: Broker Console */}
            <div
              className={`absolute inset-0 transition-opacity duration-300 ease-in-out ${
                activeScreenIndex === 1 ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none'
              }`}
            >
              <ScreenBrokerPanel currentTime={currentTime} isMobile={false} />
            </div>

            {/* Screen 2: Payment Review */}
            <div
              className={`absolute inset-0 transition-opacity duration-300 ease-in-out ${
                activeScreenIndex === 2 ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none'
              }`}
            >
              <ScreenPaymentReview currentTime={currentTime} isMobile={false} />
            </div>

            {/* Screen 3: Broker Decision */}
            <div
              className={`absolute inset-0 transition-opacity duration-300 ease-in-out ${
                activeScreenIndex === 3 ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none'
              }`}
            >
              <ScreenBrokerDecision currentTime={currentTime} isMobile={false} />
            </div>

            {/* Virtual Cursor Overlay (during Screen 3) */}
            <VirtualCursor currentTime={currentTime} isMobile={false} />

            {/* Fixed Unmovable Watermark Tag */}
            <div className="absolute bottom-3 right-4 bg-slate-950/90 border border-slate-800/90 rounded-md px-2.5 py-1 text-[11px] font-mono-numbers text-slate-400 select-none pointer-events-none z-30 shadow-lg backdrop-blur-sm flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span>Ascend Finance · Prototype · Sample Data</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
