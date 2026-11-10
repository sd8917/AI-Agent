import React, { useState } from 'react';
import { Search, Calendar, Users, DollarSign, Sparkles, MapPin, Compass, Flame, Coffee, Camera, Shield } from 'lucide-react';

const POPULAR_DESTINATIONS = [
  { name: "Tokyo", country: "Japan", tag: "Temples & Neon" },
  { name: "Paris", country: "France", tag: "Art & Gastronomy" },
  { name: "Bali", country: "Indonesia", tag: "Jungle & Sunsets" },
  { name: "Rome", country: "Italy", tag: "Ancient Wonders" },
  { name: "New York", country: "USA", tag: "Broadway & Skyline" },
  { name: "Barcelona", country: "Spain", tag: "Gaudi & Tapas" }
];

const TRAVEL_STYLES = [
  { id: "Cultural & Sightseeing", label: "Cultural & Sights", icon: "🏛️" },
  { id: "Adventure & Nature", label: "Adventure & Nature", icon: "🌲" },
  { id: "Foodie & Culinary", label: "Foodie & Culinary", icon: "🍜" },
  { id: "Relaxed & Leisure", label: "Relaxed & Leisure", icon: "🌴" },
  { id: "Budget Backpacker", label: "Budget Explorer", icon: "🎒" },
  { id: "Luxury & Wellness", label: "Luxury & Wellness", icon: "✨" }
];

const AVAILABLE_INTERESTS = [
  "Top Landmarks", "Hidden Gems", "Local Street Food", "Photography Spots", 
  "Art Museums", "Specialty Coffee", "Historical Architecture", "Sunset Views"
];

export default function TripForm({ onSubmit, isLoading, onSelectSample }) {
  const [destination, setDestination] = useState("");
  const [durationDays, setDurationDays] = useState(3);
  const [travelStyle, setTravelStyle] = useState("Cultural & Sightseeing");
  const [budgetTier, setBudgetTier] = useState("Moderate ($$)");
  const [travelers, setTravelers] = useState(2);
  const [selectedInterests, setSelectedInterests] = useState(["Top Landmarks", "Hidden Gems", "Local Street Food"]);

  const toggleInterest = (interest) => {
    if (selectedInterests.includes(interest)) {
      if (selectedInterests.length > 1) {
        setSelectedInterests(selectedInterests.filter(i => i !== interest));
      }
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!destination.trim()) return;
    onSubmit({
      destination: destination.trim(),
      duration_days: Number(durationDays),
      travel_style: travelStyle,
      budget_tier: budgetTier,
      travelers: Number(travelers),
      interests: selectedInterests
    });
  };

  return (
    <div className="relative py-8 sm:py-12 px-4 max-w-5xl mx-auto">
      
      {/* Hero Headline */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-8 sm:mb-12">
        <div className="inline-flex items-center space-x-2 bg-slate-900/90 border border-brand-500/30 px-3.5 py-1.5 rounded-full text-xs font-semibold text-brand-300 shadow-glow">
          <Sparkles className="w-3.5 h-3.5 text-brand-400" />
          <span>Powered by CrewAI 1.15 & Google Gemini 2.5 Flash</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
          Where would you like your{' '}
          <span className="bg-gradient-to-r from-brand-400 via-sky-300 to-accent-400 bg-clip-text text-transparent">
            AI Crew
          </span>{' '}
          to take you?
        </h1>

        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto">
          Four autonomous AI specialists plan your attractions, optimize your daily routes, calculate realistic budgets, and curate your packing guide in seconds.
        </p>

        {/* Quick Sample Chips */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs text-slate-400 mr-1">Instant Previews:</span>
          {POPULAR_DESTINATIONS.map((dest) => (
            <button
              key={dest.name}
              type="button"
              onClick={() => {
                setDestination(dest.name);
                onSelectSample(dest.name.toLowerCase());
              }}
              className="text-xs bg-slate-900/80 hover:bg-brand-500/10 text-slate-300 hover:text-brand-300 border border-slate-800 hover:border-brand-500/40 px-3 py-1.5 rounded-lg transition-all flex items-center space-x-1"
            >
              <span>{dest.name}</span>
              <span className="text-[10px] text-slate-500">({dest.tag})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Form Card */}
      <form onSubmit={handleSubmit} className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-2xl space-y-6">
        
        {/* Destination Search Input */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
            Target Destination
          </label>
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-400 pointer-events-none" />
            <input
              type="text"
              required
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="e.g. Tokyo, Paris, Bali, Rome, Iceland, Kyoto, New York..."
              className="w-full pl-12 pr-4 py-3.5 bg-slate-900/90 border border-slate-700/80 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent text-base transition-all"
            />
          </div>
        </div>

        {/* Row: Duration, Travelers & Budget */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          {/* Duration */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Trip Duration
            </label>
            <div className="relative">
              <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <select
                value={durationDays}
                onChange={(e) => setDurationDays(Number(e.target.value))}
                className="w-full pl-10 pr-3 py-2.5 bg-slate-900/90 border border-slate-700/80 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                <option value={1}>1 Day (Express Sprint)</option>
                <option value={2}>2 Days (Weekend Getaway)</option>
                <option value={3}>3 Days (Ideal Discovery)</option>
                <option value={4}>4 Days (In-Depth Tour)</option>
                <option value={5}>5 Days (Full Experience)</option>
                <option value={7}>7 Days (One Full Week)</option>
              </select>
            </div>
          </div>

          {/* Travelers */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Travelers
            </label>
            <div className="relative">
              <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <select
                value={travelers}
                onChange={(e) => setTravelers(Number(e.target.value))}
                className="w-full pl-10 pr-3 py-2.5 bg-slate-900/90 border border-slate-700/80 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                <option value={1}>Solo Explorer (1 Person)</option>
                <option value={2}>Couple / 2 Travelers</option>
                <option value={3}>Small Group (3-4 People)</option>
                <option value={5}>Family / Group (5+ People)</option>
              </select>
            </div>
          </div>

          {/* Budget Tier */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Budget Tier
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <select
                value={budgetTier}
                onChange={(e) => setBudgetTier(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 bg-slate-900/90 border border-slate-700/80 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                <option value="Budget ($)">Budget ($ Backpacker / Value)</option>
                <option value="Moderate ($$)">Moderate ($$ Balanced Comfort)</option>
                <option value="Luxury ($$$)">Luxury ($$$ Premium & Fine Dining)</option>
              </select>
            </div>
          </div>

        </div>

        {/* Travel Style Selector */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
            Travel Style & Pace
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {TRAVEL_STYLES.map((style) => (
              <button
                key={style.id}
                type="button"
                onClick={() => setTravelStyle(style.id)}
                className={`p-3 rounded-xl border text-center transition-all ${
                  travelStyle === style.id
                    ? 'bg-brand-500/20 border-brand-500 text-white shadow-glow'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <span className="text-xl block mb-1">{style.icon}</span>
                <span className="text-xs font-medium block truncate">{style.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Interests Multi-Select */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
            Special Interests & Highlights
          </label>
          <div className="flex flex-wrap gap-2">
            {AVAILABLE_INTERESTS.map((interest) => {
              const isSelected = selectedInterests.includes(interest);
              return (
                <button
                  key={interest}
                  type="button"
                  onClick={() => toggleInterest(interest)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    isSelected
                      ? 'bg-brand-500 text-white shadow-sm'
                      : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  {isSelected ? "✓ " : "+ "}{interest}
                </button>
              );
            })}
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading || !destination.trim()}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-brand-600 via-brand-500 to-accent-500 hover:from-brand-500 hover:to-accent-400 text-white font-bold text-base shadow-glow flex items-center justify-center space-x-2 transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:pointer-events-none"
          >
            <Sparkles className="w-5 h-5 text-accent-200 animate-pulse" />
            <span>{isLoading ? "CrewAI Agents Planning Trip..." : "Deploy 4-Agent Crew to Plan Itinerary"}</span>
          </button>
        </div>

      </form>
    </div>
  );
}
