import React from 'react';
import { Compass, Sparkles, Printer, RefreshCw, Cpu, Globe } from 'lucide-react';

export default function Navbar({ onReset, onPrint, currentTrip, onSelectSample, sampleTrips, backendStatus }) {
  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-800/80 px-4 lg:px-8 py-3.5 no-print">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Logo and Brand */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={onReset}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 via-brand-500 to-accent-500 p-0.5 shadow-glow flex items-center justify-center">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Compass className="w-5 h-5 text-brand-400 animate-spin-slow" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-100 to-brand-300 bg-clip-text text-transparent">
                Voyage<span className="text-brand-400">AI</span>
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-wider bg-brand-500/10 text-brand-400 border border-brand-500/30 px-2 py-0.5 rounded-full">
                CrewAI Engine
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Autonomous Multi-Agent Travel Planner
            </p>
          </div>
        </div>

        {/* Right Action Controls */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          
          {/* Quick Sample Selector Dropdown / Pills */}
          <div className="hidden md:flex items-center space-x-1.5 bg-slate-900/80 border border-slate-800 rounded-lg p-1 text-xs">
            <span className="text-slate-400 px-2 flex items-center">
              <Globe className="w-3.5 h-3.5 mr-1 text-slate-400" />
              Samples:
            </span>
            {sampleTrips && sampleTrips.slice(0, 3).map((sample) => (
              <button
                key={sample.slug}
                onClick={() => onSelectSample(sample.slug)}
                className={`px-2.5 py-1 rounded-md transition-all font-medium ${
                  currentTrip?.destination?.toLowerCase() === sample.destination.toLowerCase()
                    ? 'bg-brand-500 text-white shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                {sample.destination}
              </button>
            ))}
          </div>

          {/* Engine Status Indicator */}
          <div className="hidden lg:flex items-center space-x-1.5 bg-slate-900/60 border border-slate-800/80 px-2.5 py-1 rounded-full text-xs">
            <div className={`w-2 h-2 rounded-full ${backendStatus?.gemini_api_configured ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
            <span className="text-slate-300 font-medium">
              {backendStatus?.gemini_api_configured ? 'Gemini 2.5 Active' : 'Offline Engine'}
            </span>
          </div>

          {/* Print Button (active when viewing a trip) */}
          {currentTrip && (
            <button
              onClick={onPrint}
              className="flex items-center space-x-1.5 text-xs font-semibold px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all shadow-sm"
              title="Print or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5 text-brand-400" />
              <span className="hidden sm:inline">Export PDF</span>
            </button>
          )}

          {/* New Plan Button */}
          {currentTrip && (
            <button
              onClick={onReset}
              className="flex items-center space-x-1.5 text-xs font-semibold px-3.5 py-2 rounded-lg bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 text-white shadow-glow transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Plan New Trip</span>
            </button>
          )}
        </div>

      </div>
    </header>
  );
}
