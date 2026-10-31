/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AscendLogo } from './components/AscendLogo';
import { DeviceFrame } from './components/DeviceFrame';
import { TimelineController } from './components/TimelineController';
import { BrokerIntegrationModal } from './components/BrokerIntegrationModal';
import { DataNarrativeSection } from './components/DataNarrativeSection';
import { LeadCaptureSection } from './components/LeadCaptureSection';
import { RoadmapSection } from './components/RoadmapSection';
import { EyeOff, Video, Network, Sparkles, MonitorPlay, BarChart2, Mail, Compass } from 'lucide-react';

export default function App() {
  // Current playback time in seconds (0.0 to 10.0)
  const [currentTime, setCurrentTime] = useState<number>(0.0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [deviceMode, setDeviceMode] = useState<'mobile' | 'desktop'>('desktop');
  const [isCleanMode, setIsCleanMode] = useState<boolean>(false);
  const [isIntegrationModalOpen, setIsIntegrationModalOpen] = useState<boolean>(false);

  const demoSectionRef = useRef<HTMLDivElement | null>(null);
  const roadmapRef = useRef<HTMLDivElement | null>(null);
  const leadSectionRef = useRef<HTMLDivElement | null>(null);

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

  const handleScrollToDemo = () => {
    demoSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToRoadmap = () => {
    roadmapRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToLeadCapture = () => {
    leadSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
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
        <header className="sticky top-0 w-full border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md px-4 sm:px-8 py-3.5 flex items-center justify-between z-40">
          <div className="flex items-center gap-6">
            <AscendLogo size={36} showText={true} mottoText={false} />
            <div className="hidden xl:block text-xs text-slate-400 pl-4 border-l border-slate-800 font-medium">
              Infrastructure for Digital Assets. Built for Real-World Finance.
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Navigation Links */}
            <button
              type="button"
              onClick={handleScrollToDemo}
              className="hidden md:flex px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-900 transition-colors items-center gap-1.5"
            >
              <MonitorPlay className="w-3.5 h-3.5 text-amber-400" />
              <span>10s Demo Studio</span>
            </button>

            {/* Roadmap / On Track Button */}
            <button
              type="button"
              onClick={handleScrollToRoadmap}
              className="hidden lg:flex px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-900 transition-colors items-center gap-1.5"
            >
              <Compass className="w-3.5 h-3.5 text-amber-400" />
              <span>On Track</span>
            </button>

            {/* Early Access Button */}
            <button
              type="button"
              onClick={handleScrollToLeadCapture}
              className="hidden sm:flex px-3 py-1.5 rounded-lg text-xs font-semibold text-emerald-400 hover:text-emerald-300 hover:bg-emerald-950/40 border border-emerald-500/30 transition-all items-center gap-1.5"
            >
              <Mail className="w-3.5 h-3.5 text-emerald-400" />
              <span>Early Access</span>
            </button>

            {/* Broker & Prop Firm Integration Architecture Button */}
            <button
              type="button"
              onClick={() => setIsIntegrationModalOpen(true)}
              className="px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-slate-200 hover:text-white text-xs font-semibold flex items-center gap-2 transition-all shadow-sm"
              title="See how Ascend Finance integrates with your broker/prop firm withdrawal system (I)"
            >
              <Network className="w-3.5 h-3.5 text-amber-400" />
              <span>Broker Integration</span>
              <kbd className="hidden sm:inline px-1 py-0.2 rounded bg-slate-800 text-[10px] text-slate-400 font-mono-numbers">I</kbd>
            </button>

            <div className="hidden lg:flex px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs font-medium items-center gap-1.5">
              <Video className="w-3.5 h-3.5 text-amber-400" />
              <span>60 FPS Sync</span>
            </div>
          </div>
        </header>
      )}

      {/* Main Content Area */}
      <main className="w-full flex-1 flex flex-col items-center">
        {/* If Clean Mode is active, render ONLY the DeviceFrame centered for screen recording */}
        {isCleanMode ? (
          <div className="w-full flex-1 flex items-center justify-center p-4">
            <DeviceFrame
              deviceMode={deviceMode}
              currentTime={currentTime}
            />
          </div>
        ) : (
          /* Normal Landing Flow: Narrative & Data Storytelling + 10s Demo Studio + Lead Capture Form */
          <>
            {/* 1. Narrative & Data Storytelling Section */}
            <DataNarrativeSection onScrollToDemo={handleScrollToDemo} />

            {/* 2. Interactive 10.0-Second Demo Studio Anchor */}
            <div
              ref={demoSectionRef}
              id="demo-studio"
              className="w-full max-w-6xl mx-auto px-4 sm:px-6 pt-10 pb-16 flex flex-col items-center space-y-6 border-t border-slate-800/80"
            >
              {/* Studio Header */}
              <div className="text-center space-y-2 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs font-mono-numbers uppercase tracking-wider">
                  <MonitorPlay className="w-3.5 h-3.5 text-amber-400" />
                  <span>Executive Demo Player · 10.0s at 60 FPS</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                  Automated 3-Screen Payout Lifecycle
                </h2>
                <p className="text-sm text-slate-400">
                  Built for LinkedIn screen captures and investor presentations. Zero real funds moved; 100% human governance.
                </p>
              </div>

              {/* Device Frame Display (Desktop or Mobile) */}
              <div className="w-full flex justify-center py-2">
                <DeviceFrame
                  deviceMode={deviceMode}
                  currentTime={currentTime}
                />
              </div>

              {/* Timeline Scrubber & Controller */}
              <div className="w-full flex justify-center">
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
              </div>
            </div>

            {/* 3. Roadmap / On Track Section */}
            <div ref={roadmapRef} id="on-track" className="w-full">
              <RoadmapSection
                onScrollToEarlyAccess={handleScrollToLeadCapture}
                onOpenIntegrationModal={() => setIsIntegrationModalOpen(true)}
              />
            </div>

            {/* 4. Institutional Lead Capture Form & Footer */}
            <div ref={leadSectionRef} id="early-access" className="w-full">
              <LeadCaptureSection onOpenIntegrationModal={() => setIsIntegrationModalOpen(true)} />
            </div>
          </>
        )}
      </main>

      {/* Broker Integration Architecture Modal */}
      <BrokerIntegrationModal
        isOpen={isIntegrationModalOpen}
        onClose={() => setIsIntegrationModalOpen(false)}
      />
    </div>
  );
}
