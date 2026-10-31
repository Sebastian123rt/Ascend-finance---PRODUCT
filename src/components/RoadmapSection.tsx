import React from 'react';
import {
  MapPin,
  Rocket,
  Zap,
  Handshake,
  Flag,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Clock,
} from 'lucide-react';

interface RoadmapSectionProps {
  onScrollToEarlyAccess?: () => void;
  onOpenIntegrationModal?: () => void;
}

export const RoadmapSection: React.FC<RoadmapSectionProps> = ({
  onScrollToEarlyAccess,
  onOpenIntegrationModal,
}) => {
  const milestones = [
    {
      id: '01',
      stepLabel: 'Step 01 / Completed',
      icon: MapPin,
      badge: 'Completed',
      badgeColor: 'bg-slate-800 text-slate-300 border-slate-700',
      title: 'The Starting Point',
      subtitle: 'Understanding the Problem',
      description:
        'Analyzing broker payout friction, manual bottlenecks, and liquidity lag.',
      status: 'done',
    },
    {
      id: '02',
      stepLabel: 'Step 02 / Completed',
      icon: Rocket,
      badge: 'Completed',
      badgeColor: 'bg-slate-800 text-slate-300 border-slate-700',
      title: 'Month 1: Core Team Assembly',
      subtitle: 'Top-Tier Engineering & Risk',
      description:
        'Assembling top-tier product, compliance, and engineering talent.',
      status: 'done',
    },
    {
      id: '03',
      stepLabel: 'Step 03 / Completed',
      icon: Zap,
      badge: 'Completed',
      badgeColor: 'bg-slate-800 text-slate-300 border-slate-700',
      title: 'Month 3: Product Ready for Sandbox',
      subtitle: 'Institutional API Bridge',
      description:
        'Transitioning to a fully functional API bridge and broker console.',
      status: 'done',
    },
    {
      id: '04',
      stepLabel: 'Step 04 / Active Now',
      icon: Handshake,
      badge: 'Active Now',
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40 ring-2 ring-amber-400/20',
      title: 'Current Phase: Talking to Industry Leaders',
      subtitle: 'Prop Firms & Multi-Asset Desks',
      description:
        'Engaging with prop trading firms and multi-asset brokers.',
      status: 'current',
    },
    {
      id: '05',
      stepLabel: 'Step 05 / Upcoming',
      icon: Flag,
      badge: 'Upcoming',
      badgeColor: 'bg-violet-950 text-violet-300 border-violet-500/40',
      title: 'Next Stop: Official Launch',
      subtitle: 'Institutional Production Access',
      description:
        'Opening secure access to early institutional partners.',
      status: 'upcoming',
    },
  ];

  return (
    <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 pt-12 pb-16 space-y-10 select-none border-t border-slate-800/80">
      {/* Section Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs font-mono-numbers uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>EXECUTION VELOCITY · FROM PROBLEM TO LAUNCH</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase leading-tight">
          ON TRACK —{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-rose-400 to-violet-400">
            WE DON&apos;T LIKE MULTI-YEAR DELAYS.
          </span>
        </h2>

        <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
          Ascend Finance was forged in live brokerage environments, not back-office boardrooms. Here is our evolution:
        </p>
      </div>

      {/* Visual Roadmap Timeline Grid */}
      <div className="relative">
        {/* Connecting Line behind cards on desktop */}
        <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-slate-700 via-amber-500/50 to-violet-500/40 -translate-y-6 z-0" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 relative z-10">
          {milestones.map((item) => {
            const Icon = item.icon;
            const isCurrent = item.status === 'current';
            const isDone = item.status === 'done';

            return (
              <div
                key={item.id}
                className={`rounded-2xl p-5 border flex flex-col justify-between transition-all relative overflow-hidden backdrop-blur-sm ${
                  isCurrent
                    ? 'bg-gradient-to-b from-amber-950/40 via-slate-900 to-slate-950 border-amber-500/50 shadow-xl shadow-amber-500/10 ring-1 ring-amber-400/30'
                    : 'bg-slate-900/80 border-slate-800/90 hover:border-slate-700'
                }`}
              >
                {/* Subtle Glow for Current Phase */}
                {isCurrent && (
                  <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-xl pointer-events-none" />
                )}

                <div>
                  {/* Top Bar with Step Label & Badge */}
                  <div className="flex items-center justify-between gap-1 mb-4">
                    <span className="text-[10px] font-mono-numbers font-bold text-slate-400 uppercase tracking-tight">
                      {item.stepLabel}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-mono-numbers font-semibold border ${item.badgeColor}`}
                    >
                      {item.badge}
                    </span>
                  </div>

                  {/* Icon Circle */}
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center mb-3 border ${
                      isCurrent
                        ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                        : isDone
                        ? 'bg-slate-800 border-slate-700 text-slate-300'
                        : 'bg-violet-950/40 border-violet-500/30 text-violet-300'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* Title & Subtitle */}
                  <div className="mb-2">
                    <h3 className="text-base font-bold text-white tracking-tight leading-snug">
                      {item.title}
                    </h3>
                    <span className="text-xs font-semibold text-amber-400/90 block">
                      {item.subtitle}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Card Bottom Indicator */}
                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono-numbers">
                  {isCurrent ? (
                    <span className="text-amber-300 flex items-center gap-1 font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                      In Flight
                    </span>
                  ) : isDone ? (
                    <span className="text-slate-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      Delivered
                    </span>
                  ) : (
                    <span className="text-violet-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-violet-400" />
                      Next Milestone
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Bottom Banner for Prop Firms & Brokers */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950/30 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h4 className="text-base font-bold text-white">
            Are you a Prop Trading Firm or Multi-Asset Broker?
          </h4>
          <p className="text-xs text-slate-400 mt-0.5">
            Participate in our current private institutional feedback cohort before public release.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {onOpenIntegrationModal && (
            <button
              type="button"
              onClick={onOpenIntegrationModal}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors border border-slate-700"
            >
              Review Architecture
            </button>
          )}

          {onScrollToEarlyAccess && (
            <button
              type="button"
              onClick={onScrollToEarlyAccess}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-md"
            >
              <span>Join Current Phase</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
