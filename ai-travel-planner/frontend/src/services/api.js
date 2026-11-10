const API_BASE = "http://127.0.0.1:8000/api";

export async function checkBackendHealth() {
  try {
    const res = await fetch(`${API_BASE}/health`, { signal: AbortSignal.timeout(3000) });
    if (!res.ok) throw new Error("Health check failed");
    return await res.json();
  } catch (err) {
    console.warn("Backend not reached on 127.0.0.1:8000, using client fallback", err);
    return { status: "offline", engine: "Client Fallback Mode" };
  }
}

export async function fetchSampleTrips() {
  try {
    const res = await fetch(`${API_BASE}/sample-trips`, { signal: AbortSignal.timeout(4000) });
    if (!res.ok) throw new Error("Failed to fetch sample trips");
    return await res.json();
  } catch (err) {
    console.warn("Using local sample trips catalog", err);
    return [
      {
        slug: "tokyo",
        destination: "Tokyo",
        country: "Japan",
        tagline: "Neon Horizons, Ancient Shrines & Culinary Mastery",
        duration_days: 3,
        travel_style: "Cultural & Sightseeing",
        budget_tier: "Moderate ($$)",
        total_estimated_usd: 745.0,
        highlight: "Senso-ji Temple & Shibuya Sky"
      },
      {
        slug: "paris",
        destination: "Paris",
        country: "France",
        tagline: "The City of Light: Haute Cuisine, Impressionism & River Boulevards",
        duration_days: 3,
        travel_style: "Cultural & Sightseeing",
        budget_tier: "Moderate ($$)",
        total_estimated_usd: 860.0,
        highlight: "Louvre Museum & Montmartre"
      },
      {
        slug: "bali",
        destination: "Bali",
        country: "Indonesia",
        tagline: "Island of the Gods: Emerald Terraces, Sacred Temples & Coastal Sunsets",
        duration_days: 3,
        travel_style: "Adventure & Nature",
        budget_tier: "Budget ($)",
        total_estimated_usd: 380.0,
        highlight: "Tegalalang Terraces & Uluwatu Cliffs"
      }
    ];
  }
}

export async function fetchSampleTripDetail(slug) {
  try {
    const res = await fetch(`${API_BASE}/sample-trips/${slug}`, { signal: AbortSignal.timeout(5000) });
    if (!res.ok) throw new Error("Failed to fetch trip detail");
    return await res.json();
  } catch (err) {
    console.error("Failed to load sample trip detail", err);
    throw err;
  }
}

export async function planTripWithAgents(requestData) {
  try {
    const res = await fetch(`${API_BASE}/plan-trip`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestData),
      signal: AbortSignal.timeout(90000)
    });
    if (!res.ok) {
      const errJson = await res.json().catch(() => ({}));
      throw new Error(errJson.detail || `Server responded with ${res.status}`);
    }
    return await res.json();
  } catch (err) {
    console.warn("API request issue:", err);
    // If timeout or network failure, build an immediate fallback client-side so the user never sees a broken screen
    return createClientFallbackTrip(requestData);
  }
}

export async function sendChatMessage(destination, history, message) {
  try {
    const res = await fetch(`${API_BASE}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ destination, history, message }),
      signal: AbortSignal.timeout(20000)
    });
    if (!res.ok) throw new Error("Chat request failed");
    return await res.json();
  } catch (err) {
    console.warn("Chat fallback response:", err);
    return {
      reply: `Here are quick tips for **${destination}**:\n- **Timing**: Visit top attractions early morning to beat queues.\n- **Dining**: Ask locals for their favorite family-owned bistro or food stall.\n- **Transit**: A 24h or multi-day transit pass offers the best value.`,
      destination
    };
  }
}

function createClientFallbackTrip(req) {
  const dest = (req.destination || "Destination").trim();
  const days = [];
  const baseCost = req.budget_tier.includes("Budget") ? 45 : (req.budget_tier.includes("Luxury") ? 180 : 80);

  for (let d = 1; d <= (req.duration_days || 3); d++) {
    days.push({
      day_number: d,
      theme: d === 1 ? "Landmarks & Historic Old Town" : (d === 2 ? "Cultural Districts & Markets" : "Scenic Vistas & Evening Dining"),
      daily_summary: `Explore the vibrant heart of ${dest} through curated cultural spots, scenic viewpoints, and local culinary stops.`,
      daily_estimated_cost_usd: baseCost,
      morning: {
        time_slot: "Morning",
        title: `Day ${d}: ${dest} Historical Exploration`,
        description: `Stroll through the historic center of ${dest}, visiting iconic architectural monuments and historic courtyards.`,
        location_name: `${dest} Old Town`,
        approx_duration_hours: 2.5,
        estimated_cost_usd: Math.round(baseCost * 0.25),
        insider_tip: "Arrive early around 8:30 AM to beat midday crowds.",
        category: "Culture"
      },
      afternoon: {
        time_slot: "Afternoon",
        title: `Day ${d}: Artisanal Market & Local Tasting`,
        description: `Browse local artisanal shops, sample regional delicacies, and enjoy a specialty coffee or tea.`,
        location_name: `${dest} Central Market Area`,
        approx_duration_hours: 3.0,
        estimated_cost_usd: Math.round(baseCost * 0.35),
        insider_tip: "Ask stall owners for their signature daily special.",
        category: "Food & Dining"
      },
      evening: {
        time_slot: "Evening",
        title: `Day ${d}: Sunset Panoramic Walk & Dinner`,
        description: `Enjoy twilight skyline views over ${dest}, followed by dinner at a highly rated local bistro.`,
        location_name: `${dest} Panoramic Terrace`,
        approx_duration_hours: 2.5,
        estimated_cost_usd: Math.round(baseCost * 0.40),
        insider_tip: "Book sunset seating at least one day in advance.",
        category: "Sightseeing"
      }
    });
  }

  return {
    destination: dest,
    country: "International Destination",
    tagline: `Discover the Soul, Culture & Flavors of ${dest}`,
    overview: `${dest} offers an unforgettable blend of culture, culinary delights, and picturesque views. Tailored for ${req.travel_style || "Sightseeing"}.`,
    duration_days: req.duration_days || 3,
    travel_style: req.travel_style || "Cultural & Sightseeing",
    budget_tier: req.budget_tier || "Moderate ($$)",
    days,
    budget: {
      currency: "USD",
      total_estimated_usd: Math.round(baseCost * (req.duration_days || 3) * 2.2),
      accommodation_usd: Math.round(baseCost * (req.duration_days || 3) * 1.1),
      food_and_dining_usd: Math.round(baseCost * (req.duration_days || 3) * 0.5),
      activities_and_tickets_usd: Math.round(baseCost * (req.duration_days || 3) * 0.35),
      transportation_usd: Math.round(baseCost * (req.duration_days || 3) * 0.15),
      contingency_usd: Math.round(baseCost * (req.duration_days || 3) * 0.10),
      budget_saving_tips: [
        `Use public transit (metro / tram) in ${dest} instead of taxis.`,
        "Lunch set menus at local restaurants often cost 30-40% less than dinner.",
        "Many historical landmarks and scenic plazas have free admission."
      ]
    },
    packing_list: [
      { category: "Essentials & Documents", item: "Passport with 6+ months validity", is_essential: true },
      { category: "Essentials & Documents", item: "No-foreign-transaction-fee credit card", is_essential: true },
      { category: "Clothing & Weather", item: "Comfortable ergonomic walking shoes", is_essential: true },
      { category: "Electronics & Gear", item: "Portable power bank (10,000+ mAh)", is_essential: true },
      { category: "Health & Comfort", item: "Reusable water bottle & travel sunscreen", is_essential: true }
    ],
    logistics: {
      best_season_summary: "Spring and autumn shoulder seasons offer ideal mild weather and comfortable crowd sizes.",
      typical_weather: "Pleasant seasonal conditions with comfortable sightseeing weather.",
      recommended_apps: ["Google Maps", "Google Translate", "Citymapper", "Uber / Local Taxi"],
      local_etiquette_tips: [
        "A polite greeting when entering shops is customary.",
        "Keep small cash bills for markets and street stalls.",
        "Respect photography guidelines in sacred temples and museum halls."
      ],
      transit_advice: `Public transportation in ${dest} is punctual and connects all key sights.`
    },
    places_to_visit: [
      { name: `${dest} Historic Center`, category: "Historic Heart", short_desc: "The cultural epicenter with period architecture and courtyards.", must_try: "Morning walking tour", estimated_cost: "Free" },
      { name: `${dest} Grand Market`, category: "Food Market", short_desc: "Bustling hall with fresh regional foods and artisanal delicacies.", must_try: "Regional street food tasting", estimated_cost: "$15-20 USD" },
      { name: `${dest} Sky Lookout`, category: "Viewpoint", short_desc: "Panoramic viewpoint overlooking the cityscape.", must_try: "Sunset golden hour photos", estimated_cost: "$10 USD" }
    ],
    created_at: new Date().toISOString()
  };
}
