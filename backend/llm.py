import os
import json
import logging
from typing import Dict, Any, Optional

logger = logging.getLogger(__name__)

DEFAULT_GROQ_MODEL = os.getenv("GROQ_MODEL", "gpt-oss-120b")
FALLBACK_GROQ_MODELS = ["openai/gpt-oss-120b", "llama-3.3-70b-versatile", "llama-3.1-70b-versatile", "llama3-70b-8192"]

def get_groq_client(api_key: Optional[str] = None):
    key = api_key or os.getenv("GROQ_API_KEY")
    if not key:
        return None
    try:
        from groq import Groq
        return Groq(api_key=key.strip())
    except Exception as e:
        logger.warning(f"Failed to initialize Groq client: {e}")
        return None

def verify_groq_connection(api_key: Optional[str] = None) -> Dict[str, Any]:
    client = get_groq_client(api_key)
    if not client:
        return {"connected": False, "error": "No GROQ_API_KEY provided"}
    try:
        response = client.chat.completions.create(
            messages=[{"role": "user", "content": "ping"}],
            model="llama-3.3-70b-versatile",
            max_tokens=5,
        )
        return {
            "connected": True,
            "message": "Groq API connected successfully!",
            "testResponse": response.choices[0].message.content
        }
    except Exception as e:
        return {"connected": False, "error": str(e)}

def call_groq_chat(prompt: str, system_prompt: str = "", api_key: Optional[str] = None, model: str = DEFAULT_GROQ_MODEL) -> Optional[str]:
    client = get_groq_client(api_key)
    if not client:
        return None

    models_to_try = [model] + [m for m in FALLBACK_GROQ_MODELS if m != model]

    for model_candidate in models_to_try:
        try:
            messages = []
            if system_prompt:
                messages.append({"role": "system", "content": system_prompt})
            messages.append({"role": "user", "content": prompt})

            completion = client.chat.completions.create(
                model=model_candidate,
                messages=messages,
                temperature=0.7,
                max_tokens=2048,
                response_format={"type": "json_object"} if "json" in prompt.lower() or "json" in system_prompt.lower() else None
            )
            return completion.choices[0].message.content
        except Exception as e:
            logger.warning(f"Groq inference failed on model '{model_candidate}': {e}. Trying next...")
            continue
    return None

def analyze_profile_with_llm(name: str, li_data: Dict[str, Any], ig_data: Dict[str, Any], api_key: Optional[str] = None, model: str = DEFAULT_GROQ_MODEL) -> Optional[Dict[str, Any]]:
    """Uses Groq LLM (gpt-oss-120b) to synthesize Needs, Hobbies, Interests, and Qualities."""
    system_prompt = (
        "You are an expert psychological profiler for an autonomous dating agent system. "
        "Your task is to analyze a real person's LinkedIn career data and public Instagram lifestyle signals, "
        "and synthesize an authentic dating agent persona with 4 pillars: Needs, Hobbies, Interests, and Qualities. "
        "Return strictly valid JSON."
    )

    prompt = f"""
Analyze this candidate for the autonomous dating network:
Name: {name}
LinkedIn Headline: {li_data.get('headline', '')}
LinkedIn Summary: {li_data.get('summary', '')}
LinkedIn Skills: {li_data.get('skills', [])}
LinkedIn Industry: {li_data.get('industry', '')}
Instagram Bio: {ig_data.get('bio', '')}
Instagram Post Vibes: {ig_data.get('postVibes', [])}
Instagram Aesthetic: {ig_data.get('aesthetic', '')}

Return a JSON object with this exact structure:
{{
  "agentName": "Agent <ShortDescriptor>",
  "agentPersona": "A 1-2 sentence core dating directive and voice.",
  "needs": ["Need 1 in romantic partner", "Need 2", "Need 3", "Need 4"],
  "hobbies": ["Hobby 1 derived from Instagram", "Hobby 2", "Hobby 3", "Hobby 4"],
  "interests": ["Interest 1 from LinkedIn/IG synthesis", "Interest 2", "Interest 3", "Interest 4"],
  "qualities": {{
    "openness": 90,
    "conscientiousness": 95,
    "extraversion": 80,
    "agreeableness": 92,
    "neuroticism": 18,
    "communicationStyle": "Description of voice and conversational tone",
    "loveLanguage": "Primary love language",
    "greenFlags": ["Flag 1", "Flag 2", "Flag 3"],
    "dealbreakers": ["Dealbreaker 1", "Dealbreaker 2", "Dealbreaker 3"],
    "idealDate": "Vivid description of ideal first date"
  }}
}}
"""
    raw_res = call_groq_chat(prompt, system_prompt, api_key, model)
    if not raw_res:
        return None
    try:
        return json.loads(raw_res)
    except Exception as e:
        logger.warning(f"Failed to parse LLM JSON response: {e}")
        return None

def simulate_date_with_llm(person_a: Dict[str, Any], person_b: Dict[str, Any], venue: Dict[str, Any], api_key: Optional[str] = None, model: str = DEFAULT_GROQ_MODEL) -> Optional[Dict[str, Any]]:
    """Uses Groq LLM (gpt-oss-120b) to generate real-time multi-stage date dialogue and private inner monologues."""
    system_prompt = (
        "You are CupidAgent's Multi-Agent Dating Simulation Engine. "
        "You simulate two autonomous AI agents going on a date on behalf of their real human counterparts. "
        "CRITICAL: For every turn, you MUST generate the spoken text AND the agent's private internal cognitive monologue "
        "('internalThought') evaluating chemistry, sincerity, and romantic alignment. Return strictly valid JSON."
    )

    name_a = person_a['name']
    name_b = person_b['name']
    agent_a = person_a.get('analysis', {}).get('agentName', f"Agent {name_a}")
    agent_b = person_b.get('analysis', {}).get('agentName', f"Agent {name_b}")

    prompt = f"""
Simulate an authentic multi-round date between:
Person A: {name_a} ({agent_a})
Tagline: {person_a.get('tagline', '')}
Needs: {person_a.get('analysis', {}).get('needs', [])}
Hobbies: {person_a.get('analysis', {}).get('hobbies', [])}

Person B: {name_b} ({agent_b})
Tagline: {person_b.get('tagline', '')}
Needs: {person_b.get('analysis', {}).get('needs', [])}
Hobbies: {person_b.get('analysis', {}).get('hobbies', [])}

Venue: {venue.get('name', 'Velvet Skylounge')} ({venue.get('location', 'Metropolis')})
Venue Vibe: {venue.get('vibe', 'Ambient romantic lighting, intimate conversation')}

Generate a JSON object with:
{{
  "dialogue": [
    {{
      "turn": 1,
      "speaker": "{name_a.split()[0]}",
      "speakerId": "{person_a['id']}",
      "agentName": "{agent_a}",
      "phase": "Arrival & First Impression",
      "text": "spoken greeting...",
      "emotion": "warm",
      "internalThought": "{agent_a} cognitive analysis of {name_b.split()[0]}...",
      "chemistryTick": 72
    }},
    ... up to 10 turns covering (1) Arrival, (2) Lifestyle & Instagram Hobbies, (3) Career Ambition & LinkedIn Core Values, (4) Playful Banter & Chemistry Test, (5) Parting & Final Verdict.
  ],
  "evaluation": {{
    "overallCompatibility": 89,
    "lifestyleFit": 91,
    "ambitionSynergy": 88,
    "chemistryScore": 90,
    "valueAlignment": 86,
    "verdict": "Spark! Second Date Confirmed",
    "agentAQuote": "{name_a}'s agent report...",
    "agentBQuote": "{name_b}'s agent report...",
    "sharedTopics": ["Topic 1", "Topic 2"],
    "frictionPoints": ["Minor difference 1"]
  }}
}}
"""
    raw_res = call_groq_chat(prompt, system_prompt, api_key, model)
    if not raw_res:
        return None
    try:
        return json.loads(raw_res)
    except Exception as e:
        logger.warning(f"Failed to parse LLM date simulation JSON: {e}")
        return None
