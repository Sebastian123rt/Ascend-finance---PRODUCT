/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AscendLogo } from './components/AscendLogo';
import { DeviceFrame } from './components/DeviceFrame';
import { TimelineController } from './components/TimelineController';
import { BrokerIntegrationModal } from './components/BrokerIntegrationModal';
import { EyeOff, Video, Server, Network } from 'lucide-react';

export default function App() {
  // Current playback time in seconds (0.0 to 10.0)
  const [currentTime, setCurrentTime] = useState<number>(0.0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [deviceMode, setDeviceMode] = useState<'mobile' | 'desktop'>('desktop');
  const [isCleanMode, setIsCleanMode] = useState<boolean>(false);
  const [isIntegrationModalOpen, setIsIntegrationModalOpen] = useState<boolean>(false);

  // High precision animation frame ref
  const lastTimestampRef = useRef<number | null>(null);
  const animFrameIdRef = useRef<number | null>(null);

  // 60fps precise playback loop using requestAnimationFrame
  const updateLoop = useCallback((timestamp: number) => {
    if (lastTimestampRef.current !== null) {
      const deltaSeconds = (timestamp - lastTimestampRef.current) / 1000;
      setCurrentTime((prev) => {
        const next = prev + deltaSeconds;
        if (next >= 10.0) {
          // Reached end of 10-second demo: pause at 10.0s
          setIsPlaying(false);
          return 10.0;
        }
        return next;
      });
    }
    lastTimestampRef.current = timestamp;
    animFrameIdRef.current = requestAnimationFrame(updateLoop);
  }, []);

  useEffect(() => {
    if (isPlaying) {
      lastTimestampRef.current = null;
      animFrameIdRef.current = requestAnimationFrame(updateLoop);
    } else {
      if (animFrameIdRef.current !== null) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
      lastTimestampRef.current = null;
    }

    return () => {
      if (animFrameIdRef.current !== null) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [isPlaying, updateLoop]);

  // Restart handler
  const handleRestart = () => {
    setCurrentTime(0.0);
    setIsPlaying(true);
    lastTimestampRef.current = null;
  };

  // Toggle play/pause
  const handleTogglePlay = () => {
    if (currentTime >= 10.0) {
      // If at end, restart and play
      setCurrentTime(0.0);
      setIsPlaying(true);
    } else {
      setIsPlaying((prev) => !prev);
    }
  };

  // Seek handler
  const handleSeek = (time: number) => {
    setCurrentTime(Math.max(0, Math.min(10.0, time)));
    lastTimestampRef.current = null;
  };

  // Keyboard shortcuts listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is in an input or textarea
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (e.code === 'Space') {
        e.preventDefault();
        handleTogglePlay();
      } else if (e.key === 'r' || e.key === 'R') {
        e.preventDefault();
        handleRestart();
      } else if (e.key === 'c' || e.key === 'C') {
        e.preventDefault();
        setIsCleanMode((prev) => !prev);
      } else if (e.key === 'm' || e.key === 'M') {
        e.preventDefault();
        setDeviceMode((prev) => (prev === 'mobile' ? 'desktop' : 'mobile'));
      } else if (e.key === 'i' || e.key === 'I') {
        e.preventDefault();
        setIsIntegrationModalOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentTime, isPlaying]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-between selection:bg-amber-500/20 selection:text-amber-300 relative overflow-x-hidden">
      {/* Background radial atmosphere */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,53,15,0.15),rgba(255,255,255,0))]" />
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_bottom_left,rgba(88,28,135,0.15),transparent_50%)]" />

      {/* Floating Exit Clean Mode Button (only visible when Clean Mode is active) */}
      {isCleanMode && (
        <div className="fixed top-4 right-4 z-50">
          <button
            type="button"
            onClick={() => setIsCleanMode(false)}
            className="px-4 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 shadow-2xl backdrop-blur-md flex items-center gap-2 text-xs font-semibold transition-all hover:scale-105"
          >
            <EyeOff className="w-4 h-4 text-amber-400" />
            <span>Exit Clean Screen</span>
            <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 font-mono-numbers">C</kbd>
          </button>
        </div>
      )}

      {/* Institutional Top Navbar (Hidden in Clean Mode) */}
      {!isCleanMode && (
        <header className="w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md px-6 py-4 flex items-center justify-between z-30">
          <div className="flex items-center gap-4">
            <AscendLogo size={38} showText={true} mottoText={true} />
          </div>

          <div className="flex items-center gap-3">
            {/* Broker & Prop Firm Integration Architecture Button */}
            <button
              type="button"
              onClick={() => setIsIntegrationModalOpen(true)}
              className="px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-850 border border-slate-700/80 text-slate-200 hover:text-white text-xs font-semibold flex items-center gap-2 transition-all shadow-sm"
              title="See how Ascend Finance integrates with your broker/prop firm withdrawal system (I)"
            >
              <Network className="w-3.5 h-3.5 text-amber-400" />
              <span>How It Connects to Broker</span>
            </button>

            <div className="hidden lg:flex px-3.5 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs font-medium items-center gap-2">
              <Video className="w-3.5 h-3.5 text-amber-400" />
              <span>10s Video Take · 60 FPS</span>
            </div>
          </div>
        </header>
      )}

      {/* Center Recording Stage */}
      <main
        className={`w-full flex-1 flex flex-col items-center justify-center p-4 sm:p-6 transition-all duration-300 ${
          isCleanMode ? 'py-8' : 'py-4'
        }`}
      >
        <DeviceFrame
          deviceMode={deviceMode}
          currentTime={currentTime}
        />
      </main>

      {/* Bottom Timeline & Investor Controls (Hidden in Clean Mode) */}
      {!isCleanMode && (
        <footer className="w-full px-4 sm:px-6 pb-6 pt-2 flex flex-col items-center z-30">
          <TimelineController
            currentTime={currentTime}
            isPlaying={isPlaying}
            onTogglePlay={handleTogglePlay}
            onRestart={handleRestart}
            onSeek={handleSeek}
            deviceMode={deviceMode}
            onChangeDeviceMode={setDeviceMode}
            isCleanMode={isCleanMode}
            onToggleCleanMode={() => setIsCleanMode(true)}
            onOpenIntegration={() => setIsIntegrationModalOpen(true)}
          />

          <div className="mt-3 text-center">
            <p className="text-[11px] text-slate-400">
              Infrastructure for Digital Assets. Built for Real-World Finance. · Interactive Executive Prototype for Brokers & Prop Firms
            </p>
          </div>
        </footer>
      )}

      {/* Broker Integration Architecture Modal */}
      <BrokerIntegrationModal
        isOpen={isIntegrationModalOpen}
        onClose={() => setIsIntegrationModalOpen(false)}
      />
    </div>
  );
}
