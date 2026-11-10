import React, { useState, useEffect } from 'react';
import { Compass, CheckCircle2, Loader2, Sparkles, MapPin, DollarSign, ShieldAlert, BookOpen } from 'lucide-react';

const AGENT_STAGES = [
  {
    role: "Senior Destination & Cultural Specialist",
    action: "Curating iconic landmarks, hidden alleys & architectural gems",
    icon: Compass,
    color: "from-sky-500 to-blue-600",
    badge: "Agent 1 / 4"
  },
  {
    role: "City Routing & Logistics Coordinator",
    action: "Optimizing morning-to-night routes & minimizing transit fatigue",
    icon: MapPin,
    color: "from-blue-500 to-indigo-600",
    badge: "Agent 2 / 4"
  },
  {
    role: "Travel Budget & Dining Strategist",
    action: "Computing itemized expenses, local street food & money-saving tips",
    icon: DollarSign,
    color: "from-amber-500 to-orange-600",
    badge: "Agent 3 / 4"
  },
  {
    role: "Safety, Weather & Packing Concierge",
    action: "Finalizing climate packing list, etiquette notes & essential apps",
    icon: ShieldAlert,
    color: "from-emerald-500 to-teal-600",
    badge: "Agent 4 / 4"
  }
];

export default function AgentProgressModal({ destination, isOpen }) {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      setCurrentStep(0);
      return;
    }

    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev < 3 ? prev + 1 : prev));
    }, 4500);

    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-lg glass-panel p-6 sm:p-8 rounded-2xl border border-slate-700/80 shadow-2xl overflow-hidden">
        
        {/* Glow ambient background element */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-brand-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-accent-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 text-center space-y-4">
          
          {/* Animated Central Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand-600 to-accent-500 p-0.5 shadow-glow mx-auto">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <Loader2 className="w-8 h-8 text-brand-400 animate-spin" />
            </div>
          </div>

          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              CrewAI Multi-Agent Team at Work
            </h3>
            <p className="text-sm text-slate-300 mt-1">
              Autonomous agents collaborating on your trip to <span className="text-brand-400 font-semibold">{destination}</span>
            </p>
          </div>

          {/* Agent Steps Timeline */}
          <div className="mt-6 space-y-3 text-left">
            {AGENT_STAGES.map((stage, idx) => {
              const IconComponent = stage.icon;
              const isDone = idx < currentStep;
              const isActive = idx === currentStep;

              return (
                <div
                  key={stage.role}
                  className={`p-3.5 rounded-xl border transition-all duration-500 flex items-start space-x-3.5 ${
                    isActive
                      ? 'bg-slate-900/90 border-brand-500/50 shadow-glow'
                      : isDone
                      ? 'bg-slate-900/40 border-emerald-500/30 text-slate-400'
                      : 'bg-slate-900/20 border-slate-800 text-slate-600 opacity-60'
                  }`}
                >
                  <div className={`mt-0.5 w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    isDone 
                      ? 'bg-emerald-500/20 text-emerald-400' 
                      : isActive 
                      ? 'bg-brand-500/20 text-brand-400' 
                      : 'bg-slate-800 text-slate-500'
                  }`}>
                    {isDone ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : isActive ? (
                      <Loader2 className="w-4 h-4 animate-spin text-brand-400" />
                    ) : (
                      <IconComponent className="w-4 h-4" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className={`text-xs font-semibold uppercase tracking-wider ${isActive ? 'text-brand-300' : isDone ? 'text-emerald-400' : 'text-slate-500'}`}>
                        {stage.role}
                      </p>
                      <span className="text-[10px] text-slate-500 font-mono">
                        {stage.badge}
                      </span>
                    </div>
                    <p className={`text-xs mt-0.5 truncate ${isActive ? 'text-slate-200 font-medium' : 'text-slate-400'}`}>
                      {stage.action}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer note */}
          <div className="pt-2 text-xs text-slate-400 flex items-center justify-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5 text-brand-400" />
            <span>Generating structured itineraries, maps, packing & budget...</span>
          </div>

        </div>
      </div>
    </div>
  );
}
