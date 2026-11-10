import React, { useState } from 'react';
import { MapPin, ExternalLink, Sparkles, Star, Tag, DollarSign } from 'lucide-react';

export default function PlacesView({ places, destination }) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  if (!places || places.length === 0) return null;

  const categories = ["All", ...new Set(places.map(p => p.category))];
  const filteredPlaces = selectedCategory === "All"
    ? places
    : places.filter(p => p.category === selectedCategory);

  return (
    <div className="space-y-6">
      
      {/* Category Filter Chips */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none no-print">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
              selectedCategory === cat
                ? 'bg-brand-500 text-white shadow-sm'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Places Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredPlaces.map((place, idx) => {
          const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
            `${place.name} ${destination}`
          )}`;

          return (
            <div
              key={idx}
              className="glass-card glass-card-hover p-5 rounded-2xl border border-slate-800 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-400 bg-brand-500/10 px-2.5 py-0.5 rounded-md border border-brand-500/20">
                    {place.category}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    {place.estimated_cost}
                  </span>
                </div>

                <h4 className="text-lg font-bold text-white flex items-center space-x-2">
                  <span>{place.name}</span>
                </h4>

                <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                  {place.short_desc}
                </p>

                {place.must_try && (
                  <div className="mt-3.5 p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300 flex items-start space-x-2">
                    <Star className="w-3.5 h-3.5 text-accent-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-accent-300">Must Try: </span>
                      <span>{place.must_try}</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-xs text-slate-500">Destination Highlight</span>
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 text-xs text-brand-400 hover:text-brand-300 font-semibold"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Google Maps</span>
                  <ExternalLink className="w-3 h-3 ml-0.5" />
                </a>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
