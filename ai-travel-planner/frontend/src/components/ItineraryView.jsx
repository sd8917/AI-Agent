import React, { useState } from 'react';
import { Sun, Sunset, Moon, Clock, DollarSign, Lightbulb, MapPin, ExternalLink, Compass } from 'lucide-react';

const SLOT_META = {
  morning: {
    label: "Morning Exploration",
    time: "08:30 - 12:30",
    icon: Sun,
    color: "text-amber-400 bg-amber-400/10 border-amber-400/20"
  },
  afternoon: {
    label: "Afternoon Discovery",
    time: "13:30 - 17:30",
    icon: Sunset,
    color: "text-brand-400 bg-brand-400/10 border-brand-400/20"
  },
  evening: {
    label: "Evening Experience",
    time: "18:30 - 22:00",
    icon: Moon,
    color: "text-purple-400 bg-purple-400/10 border-purple-400/20"
  }
};

export default function ItineraryView({ trip }) {
  const [activeDayIdx, setActiveDayIdx] = useState(0);

  if (!trip || !trip.days || trip.days.length === 0) return null;

  const currentDay = trip.days[activeDayIdx] || trip.days[0];

  return (
    <div className="space-y-6">
      
      {/* Day Selector Pills */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none no-print">
        {trip.days.map((day, idx) => (
          <button
            key={day.day_number}
            onClick={() => setActiveDayIdx(idx)}
            className={`px-4 py-2.5 rounded-xl font-semibold text-sm transition-all flex items-center space-x-2 whitespace-nowrap ${
              activeDayIdx === idx
                ? 'bg-gradient-to-r from-brand-600 to-brand-500 text-white shadow-glow'
                : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800 hover:border-slate-700'
            }`}
          >
            <span className="w-5 h-5 rounded-full bg-slate-950/60 flex items-center justify-center text-xs">
              {day.day_number}
            </span>
            <span>Day {day.day_number}</span>
            <span className="text-xs opacity-75 hidden sm:inline truncate max-w-[120px]">
              - {day.theme}
            </span>
          </button>
        ))}
      </div>

      {/* Current Day Theme Banner */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-400 bg-brand-500/10 px-2.5 py-0.5 rounded-md border border-brand-500/20">
              Day {currentDay.day_number} Plan
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-white">
              {currentDay.theme}
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            {currentDay.daily_summary}
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-slate-900/80 px-3.5 py-2 rounded-xl border border-slate-800/80">
          <DollarSign className="w-4 h-4 text-emerald-400" />
          <span className="text-xs text-slate-400 font-medium">Est. Day Cost:</span>
          <span className="text-sm font-bold text-emerald-400">
            ${currentDay.daily_estimated_cost_usd || 75} USD
          </span>
        </div>
      </div>

      {/* Time Slots Cards: Morning, Afternoon, Evening */}
      <div className="grid grid-cols-1 gap-5">
        {['morning', 'afternoon', 'evening'].map((slotKey) => {
          const item = currentDay[slotKey];
          if (!item) return null;
          const meta = SLOT_META[slotKey];
          const SlotIcon = meta.icon;

          const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
            `${item.location_name} ${trip.destination}`
          )}`;

          return (
            <div
              key={slotKey}
              className="glass-card glass-card-hover p-6 rounded-2xl border border-slate-800/80 relative overflow-hidden"
            >
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
                
                {/* Slot Tag & Title */}
                <div className="flex items-start space-x-3.5">
                  <div className={`p-2.5 rounded-xl border ${meta.color} flex-shrink-0 mt-0.5`}>
                    <SlotIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                        {meta.label}
                      </span>
                      <span className="text-[11px] text-slate-500 font-mono">
                        ({meta.time})
                      </span>
                    </div>
                    <h4 className="text-base sm:text-lg font-bold text-white mt-0.5">
                      {item.title}
                    </h4>
                    <div className="flex items-center space-x-1.5 text-xs text-brand-300 mt-0.5">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{item.location_name}</span>
                    </div>
                  </div>
                </div>

                {/* Badges: Category, Duration, Cost */}
                <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
                  <span className="text-xs bg-slate-800 text-slate-300 px-2.5 py-1 rounded-lg border border-slate-700">
                    {item.category || "Sightseeing"}
                  </span>
                  <span className="text-xs bg-slate-800/80 text-slate-400 px-2.5 py-1 rounded-lg flex items-center space-x-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>~{item.approx_duration_hours || 2.5} hrs</span>
                  </span>
                  <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2.5 py-1 rounded-lg font-semibold flex items-center">
                    <DollarSign className="w-3 h-3" />
                    <span>${item.estimated_cost_usd}</span>
                  </span>
                </div>

              </div>

              {/* Activity Description */}
              <p className="text-sm text-slate-300 leading-relaxed pl-0 md:pl-12">
                {item.description}
              </p>

              {/* Insider Tip Box */}
              {item.insider_tip && (
                <div className="mt-4 md:ml-12 p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200 flex items-start space-x-2.5">
                  <Lightbulb className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-amber-300">Local Insider Tip: </span>
                    <span>{item.insider_tip}</span>
                  </div>
                </div>
              )}

              {/* Actions: Google Maps Link */}
              <div className="mt-4 md:ml-12 pt-3 border-t border-slate-800/60 flex items-center justify-end">
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 text-xs text-brand-400 hover:text-brand-300 font-semibold transition-colors"
                >
                  <span>View location on Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
