import React, { useState } from 'react';
import { CheckSquare, Square, CloudSun, Compass, ShieldCheck, Smartphone, Plus, Sparkles } from 'lucide-react';

export default function PackingView({ packingList = [], logistics = {} }) {
  const [packedItems, setPackedItems] = useState({});
  const [customItemText, setCustomItemText] = useState("");
  const [localItems, setLocalItems] = useState(packingList);

  const toggleItem = (key) => {
    setPackedItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleAddCustomItem = (e) => {
    e.preventDefault();
    if (!customItemText.trim()) return;
    const newItem = {
      category: "Personal Gear",
      item: customItemText.trim(),
      is_essential: false
    };
    setLocalItems([...localItems, newItem]);
    setCustomItemText("");
  };

  const totalItems = localItems.length;
  const completedCount = localItems.filter((item, idx) => packedItems[`${item.item}_${idx}`]).length;
  const progressPct = totalItems > 0 ? Math.round((completedCount / totalItems) * 100) : 0;

  // Group items by category
  const categories = [...new Set(localItems.map(i => i.category))];

  return (
    <div className="space-y-6">
      
      {/* Weather & Climate Overview Card */}
      {logistics && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Weather card */}
          <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center space-x-2 text-brand-400">
              <CloudSun className="w-5 h-5" />
              <h4 className="text-base font-bold text-white">Seasonal Weather & Climate</h4>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {logistics.typical_weather || "Mild seasonal conditions with pleasant exploring temperatures."}
            </p>
            <div className="pt-2 text-xs text-brand-300 font-medium">
              <span className="text-slate-400">Optimal Window: </span>
              <span>{logistics.best_season_summary}</span>
            </div>
          </div>

          {/* Transit and Apps */}
          <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center space-x-2 text-accent-400">
              <Compass className="w-5 h-5" />
              <h4 className="text-base font-bold text-white">Transit & Navigation</h4>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {logistics.transit_advice || "Public transit and walking are the fastest ways around."}
            </p>
            {logistics.recommended_apps && logistics.recommended_apps.length > 0 && (
              <div className="pt-2 flex flex-wrap gap-1.5 items-center">
                <span className="text-xs text-slate-400 mr-1 flex items-center">
                  <Smartphone className="w-3.5 h-3.5 mr-1 text-slate-400" />
                  Apps:
                </span>
                {logistics.recommended_apps.map((app, i) => (
                  <span key={i} className="text-[11px] bg-slate-900 text-slate-300 border border-slate-800 px-2.5 py-0.5 rounded-md">
                    {app}
                  </span>
                ))}
              </div>
            )}
          </div>

        </div>
      )}

      {/* Interactive Packing Checklist */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-6">
        
        {/* Progress Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center space-x-2">
              <CheckSquare className="w-5 h-5 text-emerald-400" />
              <h3 className="text-xl font-bold text-white">Smart Packing Checklist</h3>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Curated for your travel style and destination climate. Check off items as you pack.
            </p>
          </div>

          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <div className="flex-1 sm:w-36 bg-slate-900 h-2.5 rounded-full overflow-hidden border border-slate-800">
              <div 
                className="h-full bg-gradient-to-r from-brand-500 to-emerald-400 transition-all duration-300"
                style={{ width: `${progressPct}%` }}
              />
            </div>
            <span className="text-xs font-mono font-bold text-emerald-400 whitespace-nowrap">
              {completedCount} / {totalItems} ({progressPct}%)
            </span>
          </div>
        </div>

        {/* Add custom item form */}
        <form onSubmit={handleAddCustomItem} className="flex gap-2 no-print">
          <input
            type="text"
            value={customItemText}
            onChange={(e) => setCustomItemText(e.target.value)}
            placeholder="Add custom packing item (e.g. camera tripod, sunglasses)..."
            className="flex-1 px-4 py-2 bg-slate-900/90 border border-slate-700/80 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-all"
          >
            <Plus className="w-4 h-4 text-brand-400" />
            <span>Add Item</span>
          </button>
        </form>

        {/* Grouped Checklist by Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {categories.map((cat) => (
            <div key={cat} className="space-y-2 bg-slate-900/50 p-4 rounded-xl border border-slate-800/80">
              <h4 className="text-xs font-bold uppercase tracking-wider text-brand-400 flex items-center space-x-1.5 pb-1 border-b border-slate-800">
                <span>{cat}</span>
              </h4>

              <div className="space-y-1.5 pt-1">
                {localItems.map((item, idx) => {
                  if (item.category !== cat) return null;
                  const itemKey = `${item.item}_${idx}`;
                  const isChecked = !!packedItems[itemKey];

                  return (
                    <div
                      key={itemKey}
                      onClick={() => toggleItem(itemKey)}
                      className={`flex items-start space-x-2.5 p-2 rounded-lg cursor-pointer transition-all ${
                        isChecked
                          ? 'bg-emerald-950/20 text-slate-400 line-through'
                          : 'hover:bg-slate-800/60 text-slate-200'
                      }`}
                    >
                      <button type="button" className="mt-0.5 flex-shrink-0 text-brand-400">
                        {isChecked ? (
                          <CheckSquare className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <Square className="w-4 h-4 text-slate-500" />
                        )}
                      </button>
                      <div className="flex-1 text-xs">
                        <span>{item.item}</span>
                        {item.is_essential && !isChecked && (
                          <span className="ml-2 text-[10px] uppercase font-bold text-accent-400 bg-accent-500/10 px-1.5 py-0.2 rounded border border-accent-500/20">
                            Essential
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Local Etiquette Tips */}
      {logistics.local_etiquette_tips && logistics.local_etiquette_tips.length > 0 && (
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-3">
          <div className="flex items-center space-x-2 text-brand-400">
            <ShieldCheck className="w-5 h-5" />
            <h4 className="text-base font-bold text-white">Local Etiquette & Cultural Tips</h4>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {logistics.local_etiquette_tips.map((tip, idx) => (
              <div key={idx} className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 text-xs text-slate-300 leading-relaxed flex items-start space-x-2">
                <span className="w-4 h-4 rounded-full bg-brand-500/20 text-brand-400 flex items-center justify-center font-bold flex-shrink-0 text-[10px]">
                  {idx + 1}
                </span>
                <span>{tip}</span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
