from typing import Dict, Any

SAMPLE_TRIPS: Dict[str, Dict[str, Any]] = {
    "tokyo": {
        "destination": "Tokyo",
        "country": "Japan",
        "tagline": "Neon Horizons, Ancient Shrines & Culinary Mastery",
        "overview": "Tokyo is an exhilarating collision of ultra-modern high-tech energy and serene traditional heritage. From tranquil temple gardens and Tsukiji market street bites to bustling Shibuya crossings and world-class ramen alleyways, every neighborhood tells a unique story.",
        "duration_days": 3,
        "travel_style": "Cultural & Sightseeing",
        "budget_tier": "Moderate ($$)",
        "days": [
            {
                "day_number": 1,
                "theme": "Historic Edo Heritage & Electric Akihabara",
                "morning": {
                    "time_slot": "Morning",
                    "title": "Senso-ji Temple & Asakusa Nakamise Street",
                    "description": "Explore Tokyo's oldest Buddhist temple, wander through the historic Kaminarimon Gate, and browse traditional sweets and craft stalls along Nakamise-dori.",
                    "location_name": "Senso-ji Temple, Asakusa",
                    "approx_duration_hours": 3.0,
                    "estimated_cost_usd": 15.0,
                    "insider_tip": "Arrive before 8:30 AM to capture stunning crowd-free photos in the main courtyard.",
                    "category": "Culture",
                    "google_maps_query": "Senso-ji Temple Tokyo"
                },
                "afternoon": {
                    "time_slot": "Afternoon",
                    "title": "Sumida River Cruise to Hamarikyu Gardens",
                    "description": "Board the futuristic Water Bus down Sumida River to Hamarikyu Gardens, an imperial tidal garden featuring a 300-year-old pine and traditional tea house over the lake.",
                    "location_name": "Hamarikyu Gardens, Chuo City",
                    "approx_duration_hours": 2.5,
                    "estimated_cost_usd": 22.0,
                    "insider_tip": "Order matcha with traditional seasonal wagashi sweets at Nakajima Teahouse inside the garden.",
                    "category": "Sightseeing",
                    "google_maps_query": "Hamarikyu Gardens Tokyo"
                },
                "evening": {
                    "time_slot": "Evening",
                    "title": "Akihabara Electric Town & Izakaya Alley",
                    "description": "Immerse in neon-lit retro gaming arcades, multi-story anime shops, and cap off the night with yakitori skewers and draft beer in a cozy Kanda railway izakaya.",
                    "location_name": "Akihabara & Kanda Viaduct",
                    "approx_duration_hours": 3.0,
                    "estimated_cost_usd": 40.0,
                    "insider_tip": "Head to Radio Kaikan for the best vintage electronics and retro collectible floors.",
                    "category": "Nightlife",
                    "google_maps_query": "Akihabara Electric Town"
                },
                "daily_summary": "Journey from 7th-century Tokyo in Asakusa to the futuristic neon pulse of Akihabara.",
                "daily_estimated_cost_usd": 77.0
            },
            {
                "day_number": 2,
                "theme": "Forest Shrines, Youth Fashion & Shibuya Crossing",
                "morning": {
                    "time_slot": "Morning",
                    "title": "Meiji Jingu Shrine & Yoyogi Forest Walk",
                    "description": "Step into a quiet 170-acre evergreen forest in the heart of the metropolis. Pass under massive cypress Torii gates and witness traditional Shinto morning blessings.",
                    "location_name": "Meiji Jingu, Shibuya",
                    "approx_duration_hours": 2.5,
                    "estimated_cost_usd": 5.0,
                    "insider_tip": "Write an 'Ema' wooden wishing plaque and hang it on the sacred camphor tree.",
                    "category": "Culture",
                    "google_maps_query": "Meiji Jingu Shrine Tokyo"
                },
                "afternoon": {
                    "time_slot": "Afternoon",
                    "title": "Harajuku Takeshita Street to Cat Street Boutiques",
                    "description": "Experience vibrant Harajuku street trends, colorful marion crepes, and stroll through the trendy indie coffee boutiques of Cat Street towards Omotesando.",
                    "location_name": "Takeshita-dori & Cat Street",
                    "approx_duration_hours": 3.0,
                    "estimated_cost_usd": 30.0,
                    "insider_tip": "Check out Roastery by Nozy Coffee on Cat Street for single-origin cold brews.",
                    "category": "Food & Dining",
                    "google_maps_query": "Takeshita Street Harajuku"
                },
                "evening": {
                    "time_slot": "Evening",
                    "title": "Shibuya Scramble & Shibuya Sky 360 Observation Deck",
                    "description": "Watch thousands cross simultaneously at the iconic Shibuya Scramble, then head up 229 meters to Shibuya Sky rooftop for panoramic sunset views across Mount Fuji and Tokyo Tower.",
                    "location_name": "Shibuya Sky, Scramble Square",
                    "approx_duration_hours": 3.0,
                    "estimated_cost_usd": 45.0,
                    "insider_tip": "Book Shibuya Sky sunset slots 4 weeks in advance for breathtaking twilight lighting.",
                    "category": "Sightseeing",
                    "google_maps_query": "Shibuya Sky Tokyo"
                },
                "daily_summary": "Peaceful forest sacredness balanced with the vibrant global pop-culture epicenter of Shibuya.",
                "daily_estimated_cost_usd": 80.0
            },
            {
                "day_number": 3,
                "theme": "Tsukiji Delicacies, Imperial History & Shinjuku Nightlife",
                "morning": {
                    "time_slot": "Morning",
                    "title": "Tsukiji Outer Market Gourmet Breakfast Crawl",
                    "description": "Taste fresh sea urchin, flame-torched wagyu skewers, fluffy tamagoyaki omelettes, and hand-cut sashimi bowls from multi-generational vendors.",
                    "location_name": "Tsukiji Outer Market",
                    "approx_duration_hours": 2.5,
                    "estimated_cost_usd": 35.0,
                    "insider_tip": "Look for Yamachō for piping hot, freshly made sweet egg omelettes on a stick.",
                    "category": "Food & Dining",
                    "google_maps_query": "Tsukiji Outer Market"
                },
                "afternoon": {
                    "time_slot": "Afternoon",
                    "title": "Imperial Palace East Gardens & Ginza Stroll",
                    "description": "Walk among the moats and stone ramparts of ancient Edo Castle, then browse the architectural flagships and artisan stationers of high-fashion Ginza.",
                    "location_name": "Imperial Palace East Gardens, Chiyoda",
                    "approx_duration_hours": 3.0,
                    "estimated_cost_usd": 20.0,
                    "insider_tip": "Visit Itoya Ginza, a 12-story stationery wonderland with custom fountain pen and paper ateliers.",
                    "category": "Sightseeing",
                    "google_maps_query": "Imperial Palace East Gardens"
                },
                "evening": {
                    "time_slot": "Evening",
                    "title": "Shinjuku Omoide Yokocho & Golden Gai Exploration",
                    "description": "Navigate the atmospheric 1950s narrow alleyways of Memory Lane (Piss Alley) for robata grilled skewers, followed by miniature 6-seat themed bars in Golden Gai.",
                    "location_name": "Omoide Yokocho & Golden Gai, Shinjuku",
                    "approx_duration_hours": 3.5,
                    "estimated_cost_usd": 55.0,
                    "insider_tip": "Golden Gai bars with English menus outside usually welcome international guests with no seating fee.",
                    "category": "Nightlife",
                    "google_maps_query": "Golden Gai Shinjuku"
                },
                "daily_summary": "A culinary morning feast crowned with vintage mid-century Tokyo nightlife.",
                "daily_estimated_cost_usd": 110.0
            }
        ],
        "budget": {
            "currency": "USD",
            "total_estimated_usd": 745.0,
            "accommodation_usd": 330.0,
            "food_and_dining_usd": 185.0,
            "activities_and_tickets_usd": 115.0,
            "transportation_usd": 55.0,
            "contingency_usd": 60.0,
            "budget_saving_tips": [
                "Get a 72-Hour Tokyo Subway Ticket for unlimited metro rides at just ~$10 USD.",
                "Convenience stores (7-Eleven, Lawson) have restaurant-grade onigiri, bento, and egg salad sandwiches for quick $3-5 lunches.",
                "Tap water across Tokyo is delicious, safe, and available at all parks and dining spots."
            ]
        },
        "packing_list": [
            {"category": "Essentials & Documents", "item": "Passport with at least 6 months validity", "is_essential": True},
            {"category": "Essentials & Documents", "item": "Visit Japan Web QR code screenshot for fast customs entry", "is_essential": True},
            {"category": "Clothing & Weather", "item": "Comfortable slip-on walking shoes (for shrines & tatami floors)", "is_essential": True},
            {"category": "Clothing & Weather", "item": "Light breathable layers and compact windproof umbrella", "is_essential": False},
            {"category": "Electronics & Gear", "item": "High-capacity power bank (10,000+ mAh) for all-day navigation", "is_essential": True},
            {"category": "Electronics & Gear", "item": "eSIM or pocket WiFi for seamless Google Maps transit lookup", "is_essential": True},
            {"category": "Health & Comfort", "item": "Coin pouch (Japan still relies on 100 & 500 yen coins for vending & shrines)", "is_essential": True}
        ],
        "logistics": {
            "best_season_summary": "March to May (Cherry Blossoms) or October to November (Crisp autumn foliage & clear skies).",
            "typical_weather": "Mild and pleasant, daytime 16-22°C (60-72°F) with low rainfall in spring/autumn.",
            "recommended_apps": ["Google Maps (Transit routing)", "Suica / Pasmo (Apple Wallet / Google Pay transit card)", "Google Translate (Camera instant translation)"],
            "local_etiquette_tips": [
                "No tipping anywhere in restaurants, taxis, or hotels—good service is standard.",
                "Stand on the left side of escalators in Tokyo (walk on the right).",
                "Eat snacks near the vendor stall rather than walking down crowded streets."
            ],
            "transit_advice": "Tokyo Metro and JR Yamanote Loop Line connect 95% of sights. Avoid rush hours (7:45 - 9:00 AM) if traveling with large luggage."
        },
        "places_to_visit": [
            {"name": "Senso-ji Temple", "category": "Ancient Shrine", "short_desc": "Tokyo's oldest Buddhist temple dating to 645 AD.", "must_try": "Melonpan bread & Ningyo-yaki sweets", "estimated_cost": "Free admission"},
            {"name": "Shibuya Sky", "category": "Observation Deck", "short_desc": "Open-air rooftop overlooking the Scramble and cityscape.", "must_try": "Sunset booking over Mt. Fuji", "estimated_cost": "$16 USD"},
            {"name": "Tsukiji Outer Market", "category": "Street Food", "short_desc": "Vibrant market alleys filled with fresh seafood and snacks.", "must_try": "Fresh uni (sea urchin) & tamago skewers", "estimated_cost": "$25-40 USD"},
            {"name": "Meiji Jingu", "category": "Sacred Forest", "short_desc": "Tranquil Shinto shrine enclosed in dense evergreen woodland.", "must_try": "Morning prayer walk under giant Torii", "estimated_cost": "Free admission"}
        ],
        "created_at": "2026-11-10T15:00:00Z"
    },
    "paris": {
        "destination": "Paris",
        "country": "France",
        "tagline": "The City of Light: Haute Cuisine, Impressionism & River Boulevards",
        "overview": "Paris captivates with timeless Haussmannian architecture, world-renowned museums, sun-dappled terrace bistros, and iconic river walks along the Seine. A balanced journey through artistic masterpieces, artisanal boulangeries, and bohemian hilltop quarters.",
        "duration_days": 3,
        "travel_style": "Cultural & Sightseeing",
        "budget_tier": "Moderate ($$)",
        "days": [
            {
                "day_number": 1,
                "theme": "Monuments, Impressionism & Sunset River Cruise",
                "morning": {
                    "time_slot": "Morning",
                    "title": "Eiffel Tower & Champ de Mars Breakfast",
                    "description": "Start with warm croissants from an artisanal boulangerie, marvel at the Eiffel Tower from Trocadéro terrace, and walk the manicured Champ de Mars gardens.",
                    "location_name": "Trocadéro & Eiffel Tower",
                    "approx_duration_hours": 3.0,
                    "estimated_cost_usd": 32.0,
                    "insider_tip": "View the tower from Pont de Bir-Hakeim for incredible unobstructed river and ironwork photography.",
                    "category": "Sightseeing",
                    "google_maps_query": "Eiffel Tower Paris"
                },
                "afternoon": {
                    "time_slot": "Afternoon",
                    "title": "Musée d'Orsay & Tuileries Garden Stroll",
                    "description": "Explore Monet, Van Gogh, and Renoir masterpieces inside the transformed Beaux-Arts railway station, followed by an afternoon café seated by the Tuileries fountains.",
                    "location_name": "Musée d'Orsay, 7th Arrondissement",
                    "approx_duration_hours": 3.0,
                    "estimated_cost_usd": 25.0,
                    "insider_tip": "Walk up behind the giant station clock face on the top floor for an artistic vista of the Seine and Sacré-Cœur.",
                    "category": "Culture",
                    "google_maps_query": "Musée d'Orsay Paris"
                },
                "evening": {
                    "time_slot": "Evening",
                    "title": "Seine River Illuminated Cruise & Latin Quarter Bistro",
                    "description": "Glide past illuminated stone bridges, Notre-Dame, and the sparkling Eiffel Tower, then settle into a candlelit Latin Quarter bistro for duck confit.",
                    "location_name": "Pont Neuf & Saint-Germain",
                    "approx_duration_hours": 3.0,
                    "estimated_cost_usd": 65.0,
                    "insider_tip": "Board the cruise 30 minutes before twilight to see both golden hour and the hourly light sparkles.",
                    "category": "Food & Dining",
                    "google_maps_query": "Vedettes du Pont Neuf Paris"
                },
                "daily_summary": "Classic Parisian grandeur from iron landmark heights to Seine riverside reflections.",
                "daily_estimated_cost_usd": 122.0
            },
            {
                "day_number": 2,
                "theme": "The Louvre, Historic Le Marais & French Wine Cellars",
                "morning": {
                    "time_slot": "Morning",
                    "title": "Louvre Museum Curated Wing Walk",
                    "description": "Enter through the glass pyramid to witness the Mona Lisa, Winged Victory of Samothrace, and Venus de Milo in the historic royal palace.",
                    "location_name": "Musée du Louvre",
                    "approx_duration_hours": 3.5,
                    "estimated_cost_usd": 28.0,
                    "insider_tip": "Use the quieter Carrousel du Louvre underground mall entrance to bypass surface line queues.",
                    "category": "Culture",
                    "google_maps_query": "Louvre Museum Paris"
                },
                "afternoon": {
                    "time_slot": "Afternoon",
                    "title": "Le Marais Heritage, Place des Vosges & L'As du Fallafel",
                    "description": "Wander the cobbled streets of the aristocratic Marais district, eat famous pita sandwiches on Rue des Rosiers, and relax in Paris's oldest planned square, Place des Vosges.",
                    "location_name": "Place des Vosges & Rue des Rosiers",
                    "approx_duration_hours": 3.0,
                    "estimated_cost_usd": 22.0,
                    "insider_tip": "Grab a bench under the vaulted arcades of Place des Vosges with macarons from Carette.",
                    "category": "Food & Dining",
                    "google_maps_query": "Place des Vosges Paris"
                },
                "evening": {
                    "time_slot": "Evening",
                    "title": "Natural Wine Bar & Charcuterie in Canal Saint-Martin",
                    "description": "Experience modern Parisian evening vibes along the tranquil canals, iron footbridges, and trendy natural wine bars favored by local creatives.",
                    "location_name": "Canal Saint-Martin, 10th Arrondissement",
                    "approx_duration_hours": 2.5,
                    "estimated_cost_usd": 50.0,
                    "insider_tip": "Sit canal-side with a baguette, Comté cheese, and wine as the locks open and close.",
                    "category": "Nightlife",
                    "google_maps_query": "Canal Saint-Martin Paris"
                },
                "daily_summary": "World-class renaissance art transitioning into trendy Marais courtyards and romantic canal paths.",
                "daily_estimated_cost_usd": 100.0
            },
            {
                "day_number": 3,
                "theme": "Bohemian Montmartre, Sacré-Cœur & Artisanal Bakeries",
                "morning": {
                    "time_slot": "Morning",
                    "title": "Sacré-Cœur Basilica & Montmartre Hilltop Vistas",
                    "description": "Climb the steps of the white stone dome overlooking all of Paris, wander Place du Tertre where painters work, and find the quiet vine-covered Maison Rose.",
                    "location_name": "Montmartre & Sacré-Cœur",
                    "approx_duration_hours": 3.0,
                    "estimated_cost_usd": 10.0,
                    "insider_tip": "Walk behind the basilica along Rue de l'Abreuvoir—widely celebrated as the prettiest street in Paris.",
                    "category": "Culture",
                    "google_maps_query": "Sacre Coeur Basilica Paris"
                },
                "afternoon": {
                    "time_slot": "Afternoon",
                    "title": "Palais Garnier Opera & Galeries Lafayette Rooftop",
                    "description": "Tour the lavish Phantom of the Opera interiors, then take the elevator to the free rooftop terrace of Galeries Lafayette for sweeping skyline vistas.",
                    "location_name": "Palais Garnier & Boulevard Haussmann",
                    "approx_duration_hours": 2.5,
                    "estimated_cost_usd": 20.0,
                    "insider_tip": "The stained glass Art Nouveau dome inside Galeries Lafayette is completely free to photograph from the 3rd floor bridge.",
                    "category": "Sightseeing",
                    "google_maps_query": "Palais Garnier Paris"
                },
                "evening": {
                    "time_slot": "Evening",
                    "title": "Farewell Gourmet Dinner in Saint-Germain-des-Prés",
                    "description": "Celebrate the final night with steak frites or ratatouille in an authentic Belle Époque brasserie frequented by Hemingway and Sartre.",
                    "location_name": "Boulevard Saint-Germain",
                    "approx_duration_hours": 3.0,
                    "estimated_cost_usd": 75.0,
                    "insider_tip": "Order a soufflé for dessert—traditional Parisian brasseries bake them fresh to order.",
                    "category": "Food & Dining",
                    "google_maps_query": "Saint Germain des Pres Paris"
                },
                "daily_summary": "A bohemian morning among artist easels followed by grand opera architecture and timeless dining.",
                "daily_estimated_cost_usd": 105.0
            }
        ],
        "budget": {
            "currency": "USD",
            "total_estimated_usd": 860.0,
            "accommodation_usd": 420.0,
            "food_and_dining_usd": 220.0,
            "activities_and_tickets_usd": 110.0,
            "transportation_usd": 40.0,
            "contingency_usd": 70.0,
            "budget_saving_tips": [
                "Book museum tickets online in advance to skip hours of ticketing queues.",
                "Order the 'Formule Déjeuner' (lunch set menu) at bistros for 30-50% savings compared to dinner prices.",
                "Ask for 'Une carafe d'eau' in restaurants for free chilled tap water."
            ]
        },
        "packing_list": [
            {"category": "Essentials & Documents", "item": "Passport and international health card", "is_essential": True},
            {"category": "Clothing & Weather", "item": "Smart-casual attire (Parisian style leans tailored and neutral)", "is_essential": True},
            {"category": "Clothing & Weather", "item": "Sturdy walking loafers or sneakers for cobblestones", "is_essential": True},
            {"category": "Electronics & Gear", "item": "Type C / E European plug adapter", "is_essential": True},
            {"category": "Health & Comfort", "item": "Crossbody anti-theft bag for metro rides", "is_essential": True}
        ],
        "logistics": {
            "best_season_summary": "April to June or September to October for warm sunny days and manageable crowds.",
            "typical_weather": "Spring temperatures average 15-21°C (59-70°F) with light occasional showers.",
            "recommended_apps": ["Bonjour RATP (Metro navigation)", "TheFork (Bistro reservations & discounts)", "Citymapper Paris"],
            "local_etiquette_tips": [
                "Always say 'Bonjour Madame / Monsieur' upon entering any boutique, café, or bakery.",
                "Keep voices low and respectful on public transportation and inside restaurants.",
                "A 5-10% tip is appreciated for great service, though service is included (service compris)."
            ],
            "transit_advice": "The Paris Metro is dense and efficient. Buy a Navigo Easy card or 10-ticket carnet on your smartphone."
        },
        "places_to_visit": [
            {"name": "Musée d'Orsay", "category": "Art Museum", "short_desc": "World's premier Impressionist and Post-Impressionist collection.", "must_try": "Van Gogh self-portraits & giant clock view", "estimated_cost": "$18 USD"},
            {"name": "Place des Vosges", "category": "Historic Square", "short_desc": "Paris's oldest planned royal square bordered by red brick arcades.", "must_try": "Carette bakery macarons & park lawn relax", "estimated_cost": "Free admission"},
            {"name": "Sacré-Cœur & Montmartre", "category": "Hilltop Basilica", "short_desc": "Romano-Byzantine basilica commanding panoramic city horizons.", "must_try": "Sunset stairs listening to street harpists", "estimated_cost": "Free admission"},
            {"name": "Louvre Museum", "category": "Royal Palace", "short_desc": "Historic royal palace holding Mona Lisa and Winged Victory.", "must_try": "Sculpture courts in the Richelieu wing", "estimated_cost": "$24 USD"}
        ],
        "created_at": "2026-11-10T15:00:00Z"
    },
    "bali": {
        "destination": "Bali",
        "country": "Indonesia",
        "tagline": "Island of the Gods: Emerald Terraces, Sacred Temples & Coastal Sunsets",
        "overview": "Bali offers an intoxicating blend of spiritual tranquility, dramatic volcanic landscapes, world-class surf breaks, and lush tropical jungles. From the cultural heart of Ubud's rice paddies to Uluwatu's dramatic cliffside temples, this island rejuvenates body and soul.",
        "duration_days": 3,
        "travel_style": "Adventure & Nature",
        "budget_tier": "Budget ($)",
        "days": [
            {
                "day_number": 1,
                "theme": "Ubud Jungle, Sacred Monkeys & Sacred Water Temples",
                "morning": {
                    "time_slot": "Morning",
                    "title": "Tegalalang Rice Terraces & Sunrise Coffee",
                    "description": "Walk among the UNESCO-recognized emerald green stepped rice paddies as morning mist rises over the coconut palms. Sample locally harvested kopi and tropical fruits.",
                    "location_name": "Tegalalang Rice Terraces, Ubud",
                    "approx_duration_hours": 2.5,
                    "estimated_cost_usd": 8.0,
                    "insider_tip": "Enter from the lower valley trails to escape crowds and discover authentic irrigation subaks.",
                    "category": "Adventure",
                    "google_maps_query": "Tegalalang Rice Terrace Bali"
                },
                "afternoon": {
                    "time_slot": "Afternoon",
                    "title": "Sacred Monkey Forest Sanctuary & Ubud Palace",
                    "description": "Walk through ancient banyan tree canopies populated by playful long-tailed macaques, then visit the ornate 19th-century Ubud Royal Palace.",
                    "location_name": "Sacred Monkey Forest, Ubud",
                    "approx_duration_hours": 2.5,
                    "estimated_cost_usd": 10.0,
                    "insider_tip": "Secure all sunglasses, jewelry, and loose bag straps before entering the forest.",
                    "category": "Culture",
                    "google_maps_query": "Sacred Monkey Forest Sanctuary"
                },
                "evening": {
                    "time_slot": "Evening",
                    "title": "Traditional Balinese Legong Dance & Organic Warung Feast",
                    "description": "Watch intricate Balinese masked dance performances accompanied by hypnotic gamelan percussion, followed by Nasi Campur at a garden warung.",
                    "location_name": "Ubud Traditional Art Market Area",
                    "approx_duration_hours": 3.0,
                    "estimated_cost_usd": 18.0,
                    "insider_tip": "Dine at Warung BintangBali for charcoal-grilled satay and sambal matah.",
                    "category": "Culture",
                    "google_maps_query": "Ubud Palace Dance Bali"
                },
                "daily_summary": "Emerald green jungle canyons and living Balinese Hindu spiritual traditions.",
                "daily_estimated_cost_usd": 36.0
            },
            {
                "day_number": 2,
                "theme": "Hidden Waterfalls & Tirta Empul Holy Water Blessing",
                "morning": {
                    "time_slot": "Morning",
                    "title": "Tirta Empul Holy Spring Cleansing Ritual (Melukat)",
                    "description": "Partake in the sacred purification ritual at Tirta Empul temple, bathing in crystal-clear mountain spring fountains revered for over a thousand years.",
                    "location_name": "Tirta Empul Temple, Tampaksiring",
                    "approx_duration_hours": 3.0,
                    "estimated_cost_usd": 12.0,
                    "insider_tip": "Wear a temple sarong and bring a dry change of clothes; local guides explain the meaning of each water spout.",
                    "category": "Culture",
                    "google_maps_query": "Tirta Empul Temple Bali"
                },
                "afternoon": {
                    "time_slot": "Afternoon",
                    "title": "Tibumana & Kanto Lampo Cascading Waterfalls",
                    "description": "Hike down jungle ravines to swim in natural freshwater plunge pools surrounded by hanging moss, ferns, and dramatic rock formations.",
                    "location_name": "Tibumana Waterfall, Bangli",
                    "approx_duration_hours": 3.0,
                    "estimated_cost_usd": 15.0,
                    "insider_tip": "Water shoes are invaluable for walking on slick stone riverbeds at Kanto Lampo.",
                    "category": "Adventure",
                    "google_maps_query": "Tibumana Waterfall Bali"
                },
                "evening": {
                    "time_slot": "Evening",
                    "title": "Campuhan Ridge Walk & Organic Jungle Café",
                    "description": "Stroll the breezy grass ridge separating two rushing river valleys as the sky turns pastel violet, stopping at a peaceful hillside café.",
                    "location_name": "Campuhan Ridge, Ubud",
                    "approx_duration_hours": 2.0,
                    "estimated_cost_usd": 14.0,
                    "insider_tip": "Start the walk around 4:30 PM when the tropical heat drops and light turns golden.",
                    "category": "Sightseeing",
                    "google_maps_query": "Campuhan Ridge Walk"
                },
                "daily_summary": "Sacred water healing rituals and cooling waterfall swims deep in the Balinese forest.",
                "daily_estimated_cost_usd": 41.0
            },
            {
                "day_number": 3,
                "theme": "Uluwatu Cliffs, Sunset Kecak & Jimbaran Seafood",
                "morning": {
                    "time_slot": "Morning",
                    "title": "Scenic Coastal Drive to Padang Padang Beach",
                    "description": "Transfer to the southern Bukit Peninsula. Descend through a limestone cleft onto turquoise Padang Padang beach for swimming and watching pro surfers.",
                    "location_name": "Padang Padang Beach, Pecatu",
                    "approx_duration_hours": 3.0,
                    "estimated_cost_usd": 10.0,
                    "insider_tip": "Rent an umbrella for $3 and sip fresh whole coconuts on the sand.",
                    "category": "Sightseeing",
                    "google_maps_query": "Padang Padang Beach Bali"
                },
                "afternoon": {
                    "time_slot": "Afternoon",
                    "title": "Uluwatu Cliffside Temple Walk",
                    "description": "Perched 70 meters directly above crashing Indian Ocean waves on a sheer cliff, Pura Luhur Uluwatu is one of Bali's key directional protective temples.",
                    "location_name": "Uluwatu Temple, South Kuta",
                    "approx_duration_hours": 2.5,
                    "estimated_cost_usd": 8.0,
                    "insider_tip": "Walk both the north and south coastal cliff paths for breathtaking ocean horizon panoramas.",
                    "category": "Culture",
                    "google_maps_query": "Uluwatu Temple Bali"
                },
                "evening": {
                    "time_slot": "Evening",
                    "title": "Sunset Kecak Fire Dance & Jimbaran Bay Grilled Seafood",
                    "description": "Watch 50 chanting vocalists perform the dramatic Ramayana Fire Dance as the sun dips below the ocean, followed by candlelight grilled snapper on the sand.",
                    "location_name": "Uluwatu Amphitheatre & Jimbaran Beach",
                    "approx_duration_hours": 3.5,
                    "estimated_cost_usd": 35.0,
                    "insider_tip": "Arrive at the Kecak amphitheater by 5:00 PM for front-row seats facing the sunset.",
                    "category": "Food & Dining",
                    "google_maps_query": "Kecak Fire Dance Uluwatu"
                },
                "daily_summary": "Dramatic limestone coastal drama crowned with fire dance and beachside seafood dining.",
                "daily_estimated_cost_usd": 53.0
            }
        ],
        "budget": {
            "currency": "USD",
            "total_estimated_usd": 380.0,
            "accommodation_usd": 160.0,
            "food_and_dining_usd": 85.0,
            "activities_and_tickets_usd": 55.0,
            "transportation_usd": 50.0,
            "contingency_usd": 30.0,
            "budget_saving_tips": [
                "Hire a reliable private driver with car for ~$40-45 USD/day rather than booking separate tours.",
                "Local warungs serve delicious authentic meals (Nasi Goreng, Mie Goreng) for $2-4 USD.",
                "Always bargain respectfully at artisan markets with a warm smile."
            ]
        },
        "packing_list": [
            {"category": "Essentials & Documents", "item": "Passport and Visa on Arrival fee ($35 USD)", "is_essential": True},
            {"category": "Clothing & Weather", "item": "Lightweight linen clothing and breathable beachwear", "is_essential": True},
            {"category": "Clothing & Weather", "item": "Modest temple outfit or sarong (covering shoulders & knees)", "is_essential": True},
            {"category": "Electronics & Gear", "item": "Waterproof phone pouch for waterfalls and boat trips", "is_essential": True},
            {"category": "Health & Comfort", "item": "Reef-safe sunscreen and DEET mosquito repellent", "is_essential": True}
        ],
        "logistics": {
            "best_season_summary": "April to October (Dry season with sunny skies, low humidity, and calm seas).",
            "typical_weather": "Tropical warm, 27-31°C (81-88°F) year-round with refreshing sea breezes.",
            "recommended_apps": ["Grab / Gojek (Ride-hailing & food delivery)", "WhatsApp (Standard communication with drivers & hotels)"],
            "local_etiquette_tips": [
                "Do not step on the 'Canang Sari' flower offering baskets placed on sidewalks and doorsteps.",
                "Always use your right hand when giving or receiving money or items.",
                "Dress respectfully covering knees and shoulders when entering any temple."
            ],
            "transit_advice": "Traffic can be heavy between Ubud and Canggu/Seminyak. Download Grab or hire a licensed daily private driver."
        },
        "places_to_visit": [
            {"name": "Tegalalang Rice Terraces", "category": "Natural Wonder", "short_desc": "Lush cascading rice terraces with traditional subak irrigation.", "must_try": "Valley walk & coconut water", "estimated_cost": "$5 USD"},
            {"name": "Tirta Empul", "category": "Holy Water Temple", "short_desc": "Ancient sacred water temple with ceremonial purification baths.", "must_try": "Melukat cleansing ritual", "estimated_cost": "$5 USD"},
            {"name": "Uluwatu Temple & Kecak", "category": "Cliffside Landmark", "short_desc": "Perched on 70m ocean cliffs with legendary sunset fire dance.", "must_try": "Sunset Kecak performance", "estimated_cost": "$15 USD"},
            {"name": "Tibumana Waterfall", "category": "Jungle Waterfall", "short_desc": "Serene straight curtain waterfall in secluded forest canyon.", "must_try": "Cool freshwater swim", "estimated_cost": "$2 USD"}
        ],
        "created_at": "2026-11-10T15:00:00Z"
    }
}
