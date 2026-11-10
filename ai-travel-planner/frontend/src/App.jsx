import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import TripForm from './components/TripForm';
import AgentProgressModal from './components/AgentProgressModal';
import ItineraryView from './components/ItineraryView';
import BudgetView from './components/BudgetView';
import PlacesView from './components/PlacesView';
import PackingView from './components/PackingView';
import ChatDrawer from './components/ChatDrawer';
import { checkBackendHealth, fetchSampleTrips, fetchSampleTripDetail, planTripWithAgents } from './services/api';
import { Calendar, DollarSign, MapPin, Backpack, Sparkles, Compass, AlertCircle, ArrowLeft } from 'lucide-react';

export default function App() {
  const [currentTrip, setCurrentTrip] = useState(null);
  const [sampleTrips, setSampleTrips] = useState([]);
  const [backendStatus, setBackendStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('itinerary');
  const [errorMessage, setErrorMessage] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [targetDestination, setTargetDestination] = useState("");

  // Initialize: Check backend health and load sample catalog
  useEffect(() => {
    async function init() {
      try {
        const health = await checkBackendHealth();
        setBackendStatus(health);
        const samples = await fetchSampleTrips();
        setSampleTrips(samples);

        // Preload Tokyo sample so user immediately sees a rich real-world trip!
        if (samples && samples.length > 0) {
          const defaultDetail = await fetchSampleTripDetail("tokyo");
          setCurrentTrip(defaultDetail);
        }
      } catch (err) {
        console.warn("Init error:", err);
      }
    }
    init();
  }, []);

  // Handle plan generation from form
  const handleFormSubmit = async (formData) => {
    setErrorMessage("");
    setTargetDestination(formData.destination);
    setIsLoading(true);

    try {
      const plan = await planTripWithAgents(formData);
      setCurrentTrip(plan);
      setActiveTab('itinerary');
    } catch (err) {
      console.error("Plan generation error:", err);
      setErrorMessage(
        err.message || "Failed to complete AI agent planning. Please check backend connection or API keys."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Handle sample selection
  const handleSelectSample = async (slug) => {
    setErrorMessage("");
    setIsLoading(true);
    setTargetDestination(slug);
    try {
      const trip = await fetchSampleTripDetail(slug);
      setCurrentTrip(trip);
      setActiveTab('itinerary');
    } catch (err) {
      setErrorMessage("Could not load sample trip detail.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleReset = () => {
    setCurrentTrip(null);
    setErrorMessage("");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-brand-500 selection:text-white">
      
      {/* Top Navbar */}
      <Navbar
        onReset={handleReset}
        onPrint={handlePrint}
        currentTrip={currentTrip}
        onSelectSample={handleSelectSample}
        sampleTrips={sampleTrips}
        backendStatus={backendStatus}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Error notification if any */}
        {errorMessage && (
          <div className="mb-6 p-4 rounded-xl bg-red-950/40 border border-red-500/30 text-red-300 text-xs sm:text-sm flex items-start space-x-2.5">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <span className="font-bold">Notice: </span>
              <span>{errorMessage}</span>
            </div>
          </div>
        )}

        {/* View Mode 1: No Trip Active (Show Hero & Configurator Form) */}
        {!currentTrip && (
          <TripForm
            onSubmit={handleFormSubmit}
            isLoading={isLoading}
            onSelectSample={handleSelectSample}
          />
        )}

        {/* View Mode 2: Trip Active (Display Full Trip Itinerary, Budget, Places, Packing) */}
        {currentTrip && (
          <div className="space-y-6">
            
            {/* Top Trip Banner Header */}
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 relative overflow-hidden">
              
              {/* Back to Planner button (no-print) */}
              <button
                onClick={handleReset}
                className="no-print inline-flex items-center space-x-1.5 text-xs text-slate-400 hover:text-white mb-4 transition-colors font-semibold"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Configure Another Trip</span>
              </button>

              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="space-y-2 max-w-3xl">
                  
                  {/* Badges */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-brand-400 bg-brand-500/10 border border-brand-500/20 px-3 py-1 rounded-full">
                      {currentTrip.country}
                    </span>
                    <span className="text-xs font-medium text-slate-300 bg-slate-900 border border-slate-800 px-3 py-1 rounded-full">
                      {currentTrip.duration_days} Days
                    </span>
                    <span className="text-xs font-medium text-slate-300 bg-slate-900 border border-slate-800 px-3 py-1 rounded-full">
                      {currentTrip.travel_style}
                    </span>
                    <span className="text-xs font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
                      {currentTrip.budget_tier}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
                    {currentTrip.destination}
                  </h2>
                  <p className="text-base sm:text-lg font-medium text-brand-300">
                    {currentTrip.tagline}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-1">
                    {currentTrip.overview}
                  </p>

                </div>

                {/* Quick Trip Stats Card */}
                <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 flex-shrink-0 lg:min-w-[260px] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">Total Est. Budget</span>
                    <span className="text-lg font-bold text-emerald-400">
                      ${currentTrip.budget?.total_estimated_usd || 700} USD
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-t border-slate-800/80 pt-2 text-xs">
                    <span className="text-slate-400">Planned Days</span>
                    <span className="text-slate-200 font-semibold">{currentTrip.duration_days} Days</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-slate-800/80 pt-2 text-xs">
                    <span className="text-slate-400">Curated Spots</span>
                    <span className="text-slate-200 font-semibold">{currentTrip.places_to_visit?.length || 4} Highlights</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-slate-800/80 pt-2 text-xs">
                    <span className="text-slate-400">Engine</span>
                    <span className="text-brand-400 font-mono text-[11px]">CrewAI 4-Agent</span>
                  </div>
                </div>

              </div>

              {/* Navigation Tabs (no-print) */}
              <div className="mt-8 pt-4 border-t border-slate-800/80 flex items-center space-x-2 sm:space-x-4 overflow-x-auto scrollbar-none no-print">
                <button
                  onClick={() => setActiveTab('itinerary')}
                  className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all whitespace-nowrap ${
                    activeTab === 'itinerary'
                      ? 'bg-brand-500 text-white shadow-glow'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <Calendar className="w-4 h-4" />
                  <span>Day-by-Day Itinerary</span>
                </button>

                <button
                  onClick={() => setActiveTab('budget')}
                  className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all whitespace-nowrap ${
                    activeTab === 'budget'
                      ? 'bg-brand-500 text-white shadow-glow'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <DollarSign className="w-4 h-4" />
                  <span>Budget Breakdown</span>
                </button>

                <button
                  onClick={() => setActiveTab('places')}
                  className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all whitespace-nowrap ${
                    activeTab === 'places'
                      ? 'bg-brand-500 text-white shadow-glow'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <MapPin className="w-4 h-4" />
                  <span>Places & Attractions</span>
                </button>

                <button
                  onClick={() => setActiveTab('packing')}
                  className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all whitespace-nowrap ${
                    activeTab === 'packing'
                      ? 'bg-brand-500 text-white shadow-glow'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <Backpack className="w-4 h-4" />
                  <span>Packing & Weather</span>
                </button>
              </div>

            </div>

            {/* Active Tab Component Render */}
            <div className="pt-2">
              {activeTab === 'itinerary' && <ItineraryView trip={currentTrip} />}
              {activeTab === 'budget' && <BudgetView budget={currentTrip.budget} />}
              {activeTab === 'places' && <PlacesView places={currentTrip.places_to_visit} destination={currentTrip.destination} />}
              {activeTab === 'packing' && <PackingView packingList={currentTrip.packing_list} logistics={currentTrip.logistics} />}
            </div>

          </div>
        )}

      </main>

      {/* Floating AI Concierge Chat Drawer */}
      <ChatDrawer
        destination={currentTrip?.destination || targetDestination}
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        onToggle={() => setIsChatOpen(!isChatOpen)}
      />

      {/* Animated CrewAI Progress Modal */}
      <AgentProgressModal
        destination={targetDestination}
        isOpen={isLoading}
      />

      {/* Footer */}
      <footer className="mt-16 border-t border-slate-900 py-6 text-center text-xs text-slate-500 no-print">
        <p>
          VoyageAI • Multi-Agent Travel Engine powered by CrewAI and Google Gemini 2.5 Flash
        </p>
      </footer>

    </div>
  );
}
