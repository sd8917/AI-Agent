from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field

class TripRequest(BaseModel):
    destination: str = Field(..., description="Target destination city or region")
    duration_days: int = Field(3, ge=1, le=14, description="Trip duration in days")
    travel_style: str = Field("Cultural & Sightseeing", description="Travel style (e.g. Adventure, Relaxed, Foodie, Luxury, Budget)")
    budget_tier: str = Field("Moderate ($$)", description="Budget tier: Budget ($), Moderate ($$), Luxury ($$$)")
    travelers: int = Field(2, ge=1, le=20, description="Number of travelers")
    interests: List[str] = Field(default_factory=lambda: ["Top Sights", "Local Food", "Hidden Gems"])
    starting_location: Optional[str] = Field(None, description="Starting city / departure")

class ActivityItem(BaseModel):
    time_slot: str = Field(..., description="Morning, Afternoon, or Evening")
    title: str = Field(..., description="Short activity title")
    description: str = Field(..., description="Detailed description with local insights")
    location_name: str = Field(..., description="Name of the place, attraction, or restaurant")
    approx_duration_hours: float = Field(2.5, description="Expected time spent in hours")
    estimated_cost_usd: float = Field(25.0, description="Estimated cost in USD")
    insider_tip: str = Field(..., description="Local tip (e.g., best time to go, skip the line trick)")
    category: str = Field("Sightseeing", description="Sightseeing, Food & Dining, Adventure, Culture, Leisure")
    google_maps_query: Optional[str] = None

class DayPlan(BaseModel):
    day_number: int
    theme: str
    morning: ActivityItem
    afternoon: ActivityItem
    evening: ActivityItem
    daily_summary: str
    daily_estimated_cost_usd: float

class BudgetBreakdown(BaseModel):
    currency: str = "USD"
    total_estimated_usd: float
    accommodation_usd: float
    food_and_dining_usd: float
    activities_and_tickets_usd: float
    transportation_usd: float
    contingency_usd: float
    budget_saving_tips: List[str]

class PackingItem(BaseModel):
    category: str
    item: str
    is_essential: bool = True

class WeatherAndLogistics(BaseModel):
    best_season_summary: str
    typical_weather: str
    recommended_apps: List[str]
    local_etiquette_tips: List[str]
    transit_advice: str

class PlaceRecommendation(BaseModel):
    name: str
    category: str
    short_desc: str
    must_try: str
    estimated_cost: str

class TripPlanResponse(BaseModel):
    destination: str
    country: str
    tagline: str
    overview: str
    duration_days: int
    travel_style: str
    budget_tier: str
    days: List[DayPlan]
    budget: BudgetBreakdown
    packing_list: List[PackingItem]
    logistics: WeatherAndLogistics
    places_to_visit: List[PlaceRecommendation]
    created_at: str

class ChatMessage(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    destination: str
    history: List[ChatMessage]
    message: str
