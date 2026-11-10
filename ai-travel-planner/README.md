# VoyageAI - Autonomous Multi-Agent AI Travel Planner

VoyageAI is a real-world, full-stack travel planner powered by a collaborative **CrewAI 1.15** multi-agent team and **Google Gemini 2.5 Flash**, with a modern **React + Tailwind CSS v3** frontend.

---

## Architecture Overview

### 1. Backend (`/backend`)
- **Framework**: FastAPI + Uvicorn
- **Agentic Engine**: CrewAI 1.15
- **LLM**: Google Gemini 2.5 Flash (`google.genai` SDK with `v1beta` options)
- **Collaborative 4-Agent Team**:
  1. **Senior Destination & Cultural Specialist**: Uncovers iconic landmarks, hidden gems, and local cultural etiquette.
  2. **City Routing & Logistics Coordinator**: Optimizes morning, afternoon, and evening blocks, minimizing commute fatigue.
  3. **Travel Budget & Dining Strategist**: Calculates itemized daily expenses (stay, food, tickets, transit, buffer) and local culinary specialties.
  4. **Safety, Weather & Packing Concierge**: Prepares destination-tailored packing checklists, climate notes, and essential apps.
- **REST Endpoints**:
  - `POST /api/plan-trip`: Triggers multi-agent trip planning crew.
  - `GET /api/sample-trips`: Catalog of pre-configured sample trips (Tokyo, Paris, Bali).
  - `GET /api/sample-trips/{slug}`: Retrieves full structured itinerary.
  - `POST /api/chat`: Live AI travel concierge assistant for follow-up questions.
  - `GET /api/health`: Health status & API configuration check.

### 2. Frontend (`/frontend`)
- **Framework**: React 19 (Vite)
- **Styling**: Tailwind CSS v3 with custom glassmorphism and Plus Jakarta Sans / Outfit typography
- **Icons**: Lucide React
- **Core Features**:
  - **Hero Trip Configurator**: Destination search, trip duration (1-10 days), travel style, budget tier, traveler count, and interest tags.
  - **CrewAI Live Agent Visualizer**: Animated status indicator showing real-time agent phases.
  - **Day-by-Day Itinerary Tab**: Morning, afternoon, and evening timeline cards with time slots, cost estimates, category tags, insider local tips, and direct Google Maps links.
  - **Budget & Expenses Tab**: Visual percentage allocation bar, category cards, and money-saving secrets.
  - **Places & Attractions Gallery**: Filterable category cards with "Must Try" highlights and admission costs.
  - **Smart Packing & Weather Tab**: Interactive checklist with progress counter, custom item adding, weather insights, and cultural etiquette tips.
  - **Live AI Travel Concierge**: Floating slide-out chat drawer for asking custom questions about your trip.
  - **Export PDF / Print**: Formatted layout for clean browser printing or saving to PDF.

---

## Running Locally

### Prerequisites
- Node.js (v18+)
- Python (v3.12 or v3.14) with `uv` or `pip`
- Google Gemini API Key in `.env` (`GOOGLE_API_KEY=...`)

### 1. Start the Backend
```bash
cd backend
# Using the pre-configured virtual environment:
.venv\Scripts\activate
uvicorn main:app --host 127.0.0.1 --port 8000 --reload
```
Backend API will be live at: `http://127.0.0.1:8000` (Docs at `http://127.0.0.1:8000/docs`).

### 2. Start the Frontend
```bash
cd frontend
npm install
npm run dev
```
Frontend will be live at: `http://localhost:5173`.
