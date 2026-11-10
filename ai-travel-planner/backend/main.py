import os
import logging
from typing import Dict, Any, List
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())

from models import TripRequest, TripPlanResponse, ChatRequest
from sample_data import SAMPLE_TRIPS
from crew import plan_trip_with_crew, get_gemini_llm

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("voyage_api")

app = FastAPI(
    title="VoyageAI - CrewAI Travel Planner API",
    description="Intelligent multi-agent travel planner powered by CrewAI and Google Gemini",
    version="1.0.0"
)

# Enable CORS for frontend Vite dev server & production
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/health")
def health_check():
    api_key_present = bool(os.getenv("GOOGLE_API_KEY") or os.getenv("GEMINI_API_KEY"))
    return {
        "status": "healthy",
        "service": "VoyageAI Travel Planner Backend",
        "engine": "CrewAI 1.15 + Google Gemini 2.5 Flash",
        "gemini_api_configured": api_key_present
    }

@app.get("/api/sample-trips")
def get_sample_trips():
    """List available pre-computed trips for instant exploration."""
    return [
        {
            "slug": key,
            "destination": trip["destination"],
            "country": trip["country"],
            "tagline": trip["tagline"],
            "duration_days": trip["duration_days"],
            "travel_style": trip["travel_style"],
            "budget_tier": trip["budget_tier"],
            "total_estimated_usd": trip["budget"]["total_estimated_usd"],
            "highlight": trip["places_to_visit"][0]["name"] if trip.get("places_to_visit") else ""
        }
        for key, trip in SAMPLE_TRIPS.items()
    ]

@app.get("/api/sample-trips/{slug}")
def get_sample_trip_detail(slug: str):
    """Retrieve full details of a specific sample trip."""
    slug_clean = slug.strip().lower()
    if slug_clean in SAMPLE_TRIPS:
        return SAMPLE_TRIPS[slug_clean]
    for k, v in SAMPLE_TRIPS.items():
        if k in slug_clean or slug_clean in k:
            return v
    raise HTTPException(status_code=404, detail=f"Sample trip '{slug}' not found.")

@app.post("/api/plan-trip", response_model=TripPlanResponse)
def plan_trip(request: TripRequest):
    """Run CrewAI multi-agent workflow to build a comprehensive real-world travel plan."""
    logger.info(f"Generating travel plan for destination: {request.destination}, days: {request.duration_days}")
    try:
        plan_data = plan_trip_with_crew(request)
        return plan_data
    except Exception as e:
        logger.error(f"Error in plan_trip: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/chat")
def travel_chat(req: ChatRequest):
    """Live AI travel concierge for follow-up questions, restaurant recommendations, and itinerary adjustments."""
    try:
        llm = get_gemini_llm()
        system_instruction = (
            f"You are VoyageAI, a helpful, world-class travel concierge specialized in {req.destination}. "
            "Give practical, concise, and inspiring answers with specific neighborhood names, price ranges, and insider tips. "
            "Keep responses friendly and formatted with markdown bullet points."
        )
        
        # Build prompt from conversation history
        conversation_context = f"Destination: {req.destination}\n\n"
        for msg in req.history[-6:]:
            conversation_context += f"{msg.role.capitalize()}: {msg.content}\n"
        conversation_context += f"User: {req.message}\nAssistant:"

        # Call LLM directly
        response = llm.call(messages=[
            {"role": "system", "content": system_instruction},
            {"role": "user", "content": conversation_context}
        ])
        
        return {
            "reply": str(response),
            "destination": req.destination
        }
    except Exception as e:
        logger.warning(f"Chat error: {e}. Providing fallback response.")
        return {
            "reply": (
                f"For **{req.destination}**, here are top recommendations:\n\n"
                "- **Local Dining**: Look for busy neighborhood bistros/warungs away from main avenues for the best taste & value.\n"
                "- **Transit Tip**: Download the local transit map or use contactless cards for fast, affordable travel.\n"
                "- **Timing**: Schedule major monuments early in the morning or during sunset golden hour."
            ),
            "destination": req.destination
        }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
