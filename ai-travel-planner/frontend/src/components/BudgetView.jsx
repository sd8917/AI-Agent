import React from 'react';
import { DollarSign, Home, Utensils, Ticket, Compass, ShieldAlert, Sparkles, TrendingDown, PiggyBank } from 'lucide-react';

export default function BudgetView({ budget, travelers = 2 }) {
  if (!budget) return null;

  const total = budget.total_estimated_usd || 1;
  const categories = [
    {
      name: "Accommodation",
      amount: budget.accommodation_usd,
      icon: Home,
      color: "from-blue-500 to-indigo-600",
      textColor: "text-blue-400",
      desc: "Hotels, boutique stays & local lodgings"
    },
    {
      name: "Food & Dining",
      amount: budget.food_and_dining_usd,
      icon: Utensils,
      color: "from-amber-500 to-orange-600",
      textColor: "text-amber-400",
      desc: "Local bistros, street food markets & drinks"
    },
    {
      name: "Activities & Tickets",
      amount: budget.activities_and_tickets_usd,
      icon: Ticket,
      color: "from-emerald-500 to-teal-600",
      textColor: "text-emerald-400",
      desc: "Museums, observation decks & tours"
    },
    {
      name: "Transportation",
      amount: budget.transportation_usd,
      icon: Compass,
      color: "from-purple-500 to-pink-600",
      textColor: "text-purple-400",
      desc: "Metro passes, trains & transit"
    },
    {
      name: "Contingency Buffer",
      amount: budget.contingency_usd,
      icon: ShieldAlert,
      color: "from-slate-500 to-slate-600",
      textColor: "text-slate-400",
      desc: "Unexpected opportunities & buffer"
    }
  ];

  const perPerson = Math.round(total / (travelers || 1));

  return (
    <div className="space-y-6">
      
      {/* Total Overview Hero */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 text-center relative overflow-hidden">
        <div className="max-w-xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-400 bg-brand-500/10 px-3 py-1 rounded-full border border-brand-500/20 inline-flex items-center space-x-1.5">
            <PiggyBank className="w-3.5 h-3.5" />
            <span>AI Budget & Cost Breakdown</span>
          </span>

          <h3 className="text-3xl sm:text-4xl font-extrabold text-white">
            ${budget.total_estimated_usd} <span className="text-sm font-medium text-slate-400">USD Total Est.</span>
          </h3>

          <p className="text-sm text-slate-300">
            Approximately <span className="text-emerald-400 font-bold">${perPerson} USD per person</span> for {travelers} traveler(s).
          </p>

          {/* Stacked Progress Bar Visualizer */}
          <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden flex shadow-inner mt-4">
            {categories.map((cat) => {
              const pct = Math.round((cat.amount / total) * 100);
              return (
                <div
                  key={cat.name}
                  style={{ width: `${pct}%` }}
                  title={`${cat.name}: ${pct}%`}
                  className={`h-full bg-gradient-to-r ${cat.color} transition-all duration-500`}
                />
              );
            })}
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-[11px] text-slate-400">
            {categories.map((cat) => (
              <div key={cat.name} className="flex items-center space-x-1">
                <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${cat.color}`} />
                <span>{cat.name} ({Math.round((cat.amount / total) * 100)}%)</span>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Category Breakdown Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => {
          const IconComp = cat.icon;
          const percentage = Math.round((cat.amount / total) * 100);

          return (
            <div
              key={cat.name}
              className="glass-card glass-card-hover p-5 rounded-xl border border-slate-800 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2.5 rounded-lg bg-slate-900 border border-slate-800 ${cat.textColor}`}>
                    <IconComp className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-md bg-slate-900 text-slate-400 border border-slate-800">
                    {percentage}%
                  </span>
                </div>
                <h4 className="text-base font-bold text-white">{cat.name}</h4>
                <p className="text-xs text-slate-400 mt-0.5">{cat.desc}</p>
              </div>

              <div className="pt-4 mt-3 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-xs text-slate-400">Estimated</span>
                <span className="text-lg font-bold text-white">
                  ${cat.amount} <span className="text-xs text-slate-400 font-normal">USD</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Money-Saving Tips Box */}
      {budget.budget_saving_tips && budget.budget_saving_tips.length > 0 && (
        <div className="glass-panel p-6 rounded-2xl border border-emerald-500/20 bg-emerald-950/10 space-y-3">
          <div className="flex items-center space-x-2 text-emerald-400">
            <TrendingDown className="w-5 h-5" />
            <h4 className="text-base font-bold">Local Money-Saving Secrets</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
            {budget.budget_saving_tips.map((tip, idx) => (
              <div key={idx} className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 text-xs text-slate-300 leading-relaxed flex items-start space-x-2">
                <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center flex-shrink-0 text-[10px]">
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
