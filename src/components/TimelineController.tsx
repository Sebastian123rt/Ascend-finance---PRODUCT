import React from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Smartphone,
  Monitor,
  Eye,
} from 'lucide-react';

interface TimelineControllerProps {
  currentTime: number; // 0.0 - 10.0
  isPlaying: boolean;
  onTogglePlay: () => void;
  onRestart: () => void;
  onSeek: (time: number) => void;
  deviceMode: 'mobile' | 'desktop';
  onChangeDeviceMode: (mode: 'mobile' | 'desktop') => void;
  isCleanMode: boolean;
  onToggleCleanMode: () => void;
  onOpenIntegration?: () => void;
}

export const TimelineController: React.FC<TimelineControllerProps> = ({
  currentTime,
  isPlaying,
  onTogglePlay,
  onRestart,
  onSeek,
  deviceMode,
  onChangeDeviceMode,
  isCleanMode,
  onToggleCleanMode,
  onOpenIntegration,
}) => {
  // Markers on the timeline: 4 equal columns (0s, 3s, 7s, 10s) with strict symmetrical spacing
  const markers = [
    {
      time: 0.0,
      shortLabel: '0s: Webhook',
      fullLabel: '0s: Broker Webhook & Console',
      alignClass: 'items-start text-left',
      dotClass: 'ml-0.5',
    },
    {
      time: 3.0,
      shortLabel: '3s: Review',
      fullLabel: '3s: Risk Review',
      alignClass: 'items-center text-center',
      dotClass: 'mx-auto',
    },
    {
      time: 7.0,
      shortLabel: '7s: Decision',
      fullLabel: '7s: Broker Decision',
      alignClass: 'items-center text-center',
      dotClass: 'mx-auto',
    },
    {
      time: 10.0,
      shortLabel: '10s: Approved',
      fullLabel: '10s: Approved Payout',
      alignClass: 'items-end text-right',
      dotClass: 'mr-0.5',
    },
  ];

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSeek(parseFloat(e.target.value));
  };

  const currentPercentage = Math.min(100, (currentTime / 10.0) * 100);

  return (
    <div className="w-full max-w-4xl bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-2xl backdrop-blur-md flex flex-col gap-4">
      {/* Top Bar: Play/Pause, Time, Quick Step Buttons, Device Toggle, Clean Screen */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
        {/* Playback Controls */}
        <div className="flex items-center gap-2">
          {/* Play / Pause button */}
          <button
            type="button"
            onClick={onTogglePlay}
            className={`p-2.5 rounded-xl font-bold flex items-center gap-2 transition-all ${
              isPlaying
                ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20 hover:bg-amber-400'
                : 'bg-slate-800 text-white hover:bg-slate-700'
            }`}
            title="Play / Pause (Space)"
          >
            {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
            <span className="text-xs font-semibold hidden sm:inline">
              {isPlaying ? 'Pause' : 'Play'}
            </span>
          </button>

          {/* Discreet Restart Demo button (R key) */}
          <button
            type="button"
            onClick={onRestart}
            className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 transition-colors flex items-center gap-1.5"
            title="Restart to 0.0s (R)"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="text-xs font-medium hidden sm:inline">Restart Demo</span>
          </button>

          {/* High precision time badge */}
          <div className="px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg font-mono-numbers text-sm font-bold text-amber-400 flex items-center gap-1">
            <span>{currentTime.toFixed(2)}s</span>
            <span className="text-slate-500">/ 10.00s</span>
          </div>
        </div>

        {/* Phase Quick Jump buttons */}
        <div className="hidden lg:flex items-center gap-1 bg-slate-950/70 p-1 rounded-xl border border-slate-800">
          <button
            type="button"
            onClick={() => onSeek(0.0)}
            className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-colors ${
              currentTime < 3.0 ? 'bg-amber-500/20 text-amber-300' : 'text-slate-400 hover:text-white'
            }`}
          >
            1. Console (0s)
          </button>
          <button
            type="button"
            onClick={() => onSeek(3.0)}
            className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-colors ${
              currentTime >= 3.0 && currentTime < 7.0 ? 'bg-amber-500/20 text-amber-300' : 'text-slate-400 hover:text-white'
            }`}
          >
            2. Review (3s)
          </button>
          <button
            type="button"
            onClick={() => onSeek(7.0)}
            className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-colors ${
              currentTime >= 7.0 ? 'bg-amber-500/20 text-amber-300' : 'text-slate-400 hover:text-white'
            }`}
          >
            3. Decision (7s)
          </button>
        </div>

        {/* Device Switcher & Clean Screen Button */}
        <div className="flex items-center gap-2">
          {/* Viewport Frame Switcher */}
          <div className="flex items-center bg-slate-950 rounded-xl p-1 border border-slate-800">
            <button
              type="button"
              onClick={() => onChangeDeviceMode('mobile')}
              className={`p-1.5 sm:px-2.5 sm:py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                deviceMode === 'mobile'
                  ? 'bg-amber-500 text-slate-950 shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Mobile View (9:16)"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Mobile (9:16)</span>
            </button>
            <button
              type="button"
              onClick={() => onChangeDeviceMode('desktop')}
              className={`p-1.5 sm:px-2.5 sm:py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                deviceMode === 'desktop'
                  ? 'bg-amber-500 text-slate-950 shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Desktop View"
            >
              <Monitor className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Desktop</span>
            </button>
          </div>

          {/* Broker Integration Flow (Modal for LinkedIn viewers & prop firms) */}
          {onOpenIntegration && (
            <button
              type="button"
              onClick={onOpenIntegration}
              className="px-3 py-2 rounded-xl bg-slate-800/90 hover:bg-slate-750 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm"
              title="How Ascend connects to your broker/prop firm stack"
            >
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span className="hidden sm:inline">Broker API Architecture</span>
            </button>
          )}

          {/* Clean Screen Mode Button */}
          <button
            type="button"
            onClick={onToggleCleanMode}
            className="px-3 py-2 rounded-xl bg-violet-950/80 hover:bg-violet-900 border border-violet-500/40 text-violet-200 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm"
            title="Hide all controls for video screen recording (Press C)"
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Clean Screen Mode</span>
            <span className="px-1.5 py-0.5 rounded bg-violet-900/90 text-[10px] font-mono-numbers">C</span>
          </button>
        </div>
      </div>

      {/* Interactive Timeline Scrubber with Milestones */}
      <div className="space-y-2">
        <div className="relative pt-2 pb-2">
          {/* Custom Slider Input */}
          <input
            type="range"
            min="0"
            max="10"
            step="0.016" // 60fps resolution
            value={currentTime}
            onChange={handleSliderChange}
            className="w-full h-3 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-amber-400 focus:outline-none border border-slate-800"
          />

          {/* Progress fill bar */}
          <div
            className="absolute top-2 left-0 h-3 bg-gradient-to-r from-amber-500 to-[#F59E0B] rounded-lg pointer-events-none opacity-90 shadow-sm"
            style={{ width: `${currentPercentage}%` }}
          />

          {/* Strict 4-Column Equal Layout for Scrubber Labels (Symmetrical Spacing) */}
          <div className="grid grid-cols-4 w-full px-4 mt-2 select-none">
            {markers.map((marker) => {
              const isPassed = currentTime >= marker.time;

              return (
                <button
                  key={marker.time}
                  type="button"
                  onClick={() => onSeek(marker.time)}
                  className={`flex flex-col group focus:outline-none transition-all ${marker.alignClass}`}
                >
                  <div
                    className={`w-2.5 h-2.5 rounded-full transition-transform group-hover:scale-125 border ${
                      isPassed
                        ? 'bg-amber-400 border-amber-300 shadow-[0_0_8px_rgba(251,191,36,0.5)]'
                        : 'bg-slate-800 border-slate-600'
                    } ${marker.dotClass}`}
                  />
                  <span
                    className={`text-[10px] sm:text-[11px] lg:text-xs font-mono-numbers font-medium mt-1 whitespace-nowrap transition-colors ${
                      isPassed ? 'text-amber-300 font-semibold' : 'text-slate-400 group-hover:text-slate-300'
                    }`}
                  >
                    <span className="hidden sm:inline">{marker.fullLabel}</span>
                    <span className="sm:hidden">{marker.shortLabel}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom helper info for LinkedIn recording session */}
      <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800/60">
        <div className="flex items-center gap-3">
          <span>
            <strong className="text-slate-300">Shortcuts:</strong> Space (Pause/Play) · <kbd className="px-1 py-0.5 rounded bg-slate-800 text-slate-300 font-mono-numbers">R</kbd> (Restart 0s) · <kbd className="px-1 py-0.5 rounded bg-slate-800 text-slate-300 font-mono-numbers">C</kbd> (Clean Screen) · <kbd className="px-1 py-0.5 rounded bg-slate-800 text-slate-300 font-mono-numbers">M</kbd> (Toggle Viewport)
          </span>
        </div>
        <div className="flex items-center gap-2 text-slate-400">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          <span>Synchronized at 60 FPS</span>
        </div>
      </div>
    </div>
  );
};
