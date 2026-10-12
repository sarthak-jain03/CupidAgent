import os
import copy
from typing import Optional, Dict, Any
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv

load_dotenv()

from .people_data import PEOPLE_DATA
from .scraper import scrape_and_analyze_person
from .dating_engine import (
    VENUES,
    simulate_date_conversation,
    compute_rankings_for_person,
    compute_network_rankings
)
from .llm import verify_groq_connection

app = FastAPI(
    title="CupidAgent Python API",
    description="Autonomous Agentic Dating Network Backend powered by FastAPI and Groq LLM (gpt-oss-120b)"
)

frontend_url = os.getenv("FRONTEND_URL", "").strip()
allowed_origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000",
]
if frontend_url:
    allowed_origins.append(frontend_url.rstrip("/"))

cors_env = os.getenv("CORS_ORIGINS", "*").split(",")
if "*" in cors_env:
    allowed_origins = ["*"]
else:
    for o in cors_env:
        cleaned = o.strip().rstrip("/")
        if cleaned and cleaned not in allowed_origins:
            allowed_origins.append(cleaned)

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

active_people = copy.deepcopy(PEOPLE_DATA)
runtime_config = {
    "groqApiKey": os.getenv("GROQ_API_KEY", ""),
    "groqModel": os.getenv("GROQ_MODEL", "gpt-oss-120b")
}
cached_rankings = compute_network_rankings(active_people)

def refresh_rankings():
    global cached_rankings
    cached_rankings = compute_network_rankings(active_people)

class ScrapeRequest(BaseModel):
    linkedinUrl: str
    instagramUrl: str
    groqApiKey: Optional[str] = None
    model: Optional[str] = None

class DateRequest(BaseModel):
    personAId: str
    personBId: str
    venueId: Optional[str] = None
    groqApiKey: Optional[str] = None
    model: Optional[str] = None

class ConfigRequest(BaseModel):
    groqApiKey: Optional[str] = None
    groqModel: Optional[str] = None

@app.get("/api/health")
def health_check():
    has_key = bool(runtime_config["groqApiKey"] or os.getenv("GROQ_API_KEY"))
    return {
        "status": "healthy",
        "backend": "Python FastAPI",
        "peopleCount": len(active_people),
        "groqConfigured": has_key,
        "activeModel": runtime_config["groqModel"]
    }

@app.get("/api/config")
def get_config():
    key = runtime_config["groqApiKey"] or os.getenv("GROQ_API_KEY", "")
    masked_key = f"{key[:4]}...{key[-4:]}" if len(key) > 8 else ("Configured" if key else "Not set")
    return {
        "groqConfigured": bool(key),
        "maskedApiKey": masked_key,
        "activeModel": runtime_config["groqModel"],
        "recommendedModels": ["gpt-oss-120b", "openai/gpt-oss-120b", "llama-3.3-70b-versatile"]
    }

@app.post("/api/config")
def update_config(req: ConfigRequest):
    if req.groqApiKey is not None:
        runtime_config["groqApiKey"] = req.groqApiKey.strip()
    if req.groqModel is not None:
        runtime_config["groqModel"] = req.groqModel.strip()

    test_res = verify_groq_connection(runtime_config["groqApiKey"])
    return {
        "success": True,
        "message": "Groq configuration updated!",
        "config": {
            "groqConfigured": bool(runtime_config["groqApiKey"]),
            "activeModel": runtime_config["groqModel"],
            "connectionTest": test_res
        }
    }

@app.get("/api/people")
def get_people():
    return {
        "success": True,
        "total": len(active_people),
        "people": active_people
    }

@app.get("/api/people/{person_id}")
def get_person(person_id: str):
    person = next((p for p in active_people if p["id"] == person_id), None)
    if not person:
        raise HTTPException(status_code=404, detail="Person not found")
    return {"success": True, "person": person}

@app.post("/api/scrape")
def scrape_person(req: ScrapeRequest):
    if not req.linkedinUrl or not req.instagramUrl:
        raise HTTPException(status_code=400, detail="Both a valid LinkedIn URL and public Instagram URL are required.")

    api_key = req.groqApiKey or runtime_config["groqApiKey"] or os.getenv("GROQ_API_KEY")
    model = req.model or runtime_config["groqModel"]

    try:
        result = scrape_and_analyze_person(req.linkedinUrl, req.instagramUrl, groq_api_key=api_key, model=model)
        new_person = result["person"]
        active_people.insert(0, new_person)
        refresh_rankings()

        return {
            "success": True,
            "message": "Agent created and deployed into active dating pool!",
            "person": new_person,
            "scrapeReport": result["scrapeReport"]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to scrape and analyze: {str(e)}")

@app.post("/api/date")
def run_date(req: DateRequest):
    person_a = next((p for p in active_people if p["id"] == req.personAId), None)
    person_b = next((p for p in active_people if p["id"] == req.personBId), None)

    if not person_a or not person_b:
        raise HTTPException(status_code=404, detail="One or both candidates could not be found.")

    if person_a["id"] == person_b["id"]:
        raise HTTPException(status_code=400, detail="An agent cannot date themselves.")

    api_key = req.groqApiKey or runtime_config["groqApiKey"] or os.getenv("GROQ_API_KEY")
    model = req.model or runtime_config["groqModel"]

    date_res = simulate_date_conversation(person_a, person_b, req.venueId, groq_api_key=api_key, model=model)
    return {
        "success": True,
        "date": date_res
    }

@app.get("/api/venues")
def get_venues():
    return {
        "success": True,
        "venues": VENUES
    }

@app.get("/api/rankings/{person_id}")
def get_rankings(person_id: str):
    target = next((p for p in active_people if p["id"] == person_id), None)
    if not target:
        raise HTTPException(status_code=404, detail="Person not found")

    rankings = compute_rankings_for_person(target, active_people)
    return {
        "success": True,
        "personId": target["id"],
        "personName": target["name"],
        "rankings": rankings
    }

@app.get("/api/all-rankings")
def get_all_rankings():
    return {
        "success": True,
        "totalPeople": len(active_people),
        "rankingsByPerson": cached_rankings["rankingsByPerson"],
        "mutualSparks": cached_rankings["mutualSparks"]
    }

@app.post("/api/reset")
def reset_people():
    global active_people
    active_people = copy.deepcopy(PEOPLE_DATA)
    refresh_rankings()
    return {
        "success": True,
        "message": "Reset active pool to initial 25 verified individuals.",
        "total": len(active_people)
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.app:app", host="127.0.0.1", port=8000, reload=True)
