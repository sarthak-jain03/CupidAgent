import time
import math
from typing import List, Dict, Any, Optional
from .llm import simulate_date_with_llm

VENUES = [
  {
    "id": "mumbai-rooftop",
    "name": "Aer Rooftop Lounge",
    "location": "Worli, Mumbai",
    "vibe": "Sunset skyline over the Arabian Sea, soft jazz, signature coastal cocktails",
    "backdrop": "linear-gradient(135deg, rgba(20,20,35,0.95), rgba(40,25,60,0.95))"
  },
  {
    "id": "delhi-courtyard",
    "name": "Olive Bar & Kitchen",
    "location": "Mehrauli, New Delhi",
    "vibe": "Candlelit white pebbles under a giant banyan tree, acoustic guitar, artisanal pasta",
    "backdrop": "linear-gradient(135deg, rgba(30,25,20,0.95), rgba(50,35,25,0.95))"
  },
  {
    "id": "bangalore-brewery",
    "name": "Toit Brewpub Garden",
    "location": "Indiranagar, Bengaluru",
    "vibe": "Lush greenery, artisanal craft beers, wood-fired sourdough pizzas, upbeat tech conversations",
    "backdrop": "linear-gradient(135deg, rgba(15,30,25,0.95), rgba(25,50,40,0.95))"
  },
  {
    "id": "udaipur-lake",
    "name": "Taj Lake Palace Pavilion",
    "location": "Pichola Lake, Udaipur",
    "vibe": "Mewari marble arches, flickering lake reflections, live sitar music under the stars",
    "backdrop": "linear-gradient(135deg, rgba(35,20,25,0.95), rgba(65,30,45,0.95))"
  },
  {
    "id": "bandra-coffee",
    "name": "Subko Specialty Roastery",
    "location": "Bandra West, Mumbai",
    "vibe": "Single-origin pour-overs, indie books, rustic teakwood tables, cozy intellectual chemistry",
    "backdrop": "linear-gradient(135deg, rgba(25,18,22,0.95), rgba(45,28,38,0.95))"
  }
]

def calculate_compatibility(person_a: Dict[str, Any], person_b: Dict[str, Any]) -> Dict[str, Any]:
    if person_a["id"] == person_b["id"]:
        return {"overallCompatibility": 0}

    qa = person_a.get("analysis", {}).get("qualities", {})
    qb = person_b.get("analysis", {}).get("qualities", {})

    openness_res = 100 - abs(qa.get("openness", 90) - qb.get("openness", 90)) * 0.4
    conscientiousness_fit = 100 - abs(qa.get("conscientiousness", 90) - qb.get("conscientiousness", 90)) * 0.35
    extraversion_bal = 85 + (10 if abs(qa.get("extraversion", 80) - qb.get("extraversion", 80)) < 25 else 0)
    agreeableness_res = (qa.get("agreeableness", 90) + qb.get("agreeableness", 90)) / 2

    hobbies_a = [h.lower() for h in person_a.get("analysis", {}).get("hobbies", [])]
    hobbies_b = [h.lower() for h in person_b.get("analysis", {}).get("hobbies", [])]
    shared_hobby_count = 0
    for ha in hobbies_a:
        for hb in hobbies_b:
            words_a = [w for w in ha.split() if len(w) > 3]
            if any(w in hb for w in words_a):
                shared_hobby_count += 1
                break

    lifestyle_fit = min(98, max(64, round(74 + shared_hobby_count * 7 + (math.sin(len(person_a["name"]) + len(person_b["name"])) * 4))))

    ind_a = person_a.get("sources", {}).get("linkedin", {}).get("industry", "").lower()
    ind_b = person_b.get("sources", {}).get("linkedin", {}).get("industry", "").lower()
    ind_bonus = 8 if any(w in ind_b for w in ind_a.split() if len(w) > 4) else 4

    ambition_synergy = min(99, max(66, round(76 + ind_bonus + (qa.get("conscientiousness", 90) + qb.get("conscientiousness", 90)) * 0.07)))

    pair_sum = sum(ord(c) for c in person_a["id"]) * 31 ^ sum(ord(c) for c in person_b["id"]) * 17
    noise = (abs(pair_sum) % 19) - 8
    chemistry_score = min(99, max(60, round(75 + noise + (qa.get("openness", 90) + qb.get("openness", 90)) * 0.08)))

    value_alignment = min(98, max(65, round((openness_res + conscientiousness_fit + agreeableness_res) / 3)))

    overall = round(
        lifestyle_fit * 0.28 +
        ambition_synergy * 0.24 +
        chemistry_score * 0.28 +
        value_alignment * 0.20
    )

    verdict = "Polite Divergence"
    if overall >= 88:
        verdict = "Spark! Second Date Confirmed"
    elif overall >= 77:
        verdict = "Strong Intellectual Connection"

    shared_topics = [
        "Shared creative discipline and high-agency mindset",
        "Balancing public pressure with grounding offline rituals",
        "Appreciation for good food, music, and authentic laughter"
    ]

    friction_points = (
        ["Pacing differences in busy tour/work schedules", "Slight contrasts in morning vs night energy"]
        if overall < 82 else
        ["Playful banter over city living preferences (Mumbai vs Delhi)"]
    )

    return {
        "overallCompatibility": overall,
        "lifestyleFit": lifestyle_fit,
        "ambitionSynergy": ambition_synergy,
        "chemistryScore": chemistry_score,
        "valueAlignment": value_alignment,
        "verdict": verdict,
        "mutualSpark": overall >= 86,
        "sharedTopics": shared_topics,
        "frictionPoints": friction_points
    }

def simulate_date_conversation(person_a: Dict[str, Any], person_b: Dict[str, Any], venue_id: Optional[str] = None, groq_api_key: Optional[str] = None, model: str = "gpt-oss-120b") -> Dict[str, Any]:
    venue = next((v for v in VENUES if v["id"] == venue_id), VENUES[0])
    compat = calculate_compatibility(person_a, person_b)

    if groq_api_key:
        llm_result = simulate_date_with_llm(person_a, person_b, venue, groq_api_key, model=model)
        if llm_result and "dialogue" in llm_result and len(llm_result["dialogue"]) >= 4:
            eval_data = llm_result.get("evaluation", {})
            eval_data["overallCompatibility"] = eval_data.get("overallCompatibility", compat["overallCompatibility"])
            eval_data["lifestyleFit"] = eval_data.get("lifestyleFit", compat["lifestyleFit"])
            eval_data["ambitionSynergy"] = eval_data.get("ambitionSynergy", compat["ambitionSynergy"])
            eval_data["chemistryScore"] = eval_data.get("chemistryScore", compat["chemistryScore"])
            eval_data["valueAlignment"] = eval_data.get("valueAlignment", compat["valueAlignment"])
            eval_data["verdict"] = eval_data.get("verdict", compat["verdict"])
            eval_data["venueName"] = venue["name"]
            eval_data["llmEngine"] = f"Groq LLM ({model})"

            return {
                "dateId": f"date-{person_a['id']}-{person_b['id']}-{int(time.time())}",
                "venue": venue,
                "participants": {
                    "personA": {"id": person_a['id'], "name": person_a['name'], "avatar": person_a['avatar'], "agentName": person_a.get('analysis', {}).get('agentName')},
                    "personB": {"id": person_b['id'], "name": person_b['name'], "avatar": person_b['avatar'], "agentName": person_b.get('analysis', {}).get('agentName')}
                },
                "dialogue": llm_result["dialogue"],
                "evaluation": eval_data
            }

    name_a = person_a['name'].split()[0]
    name_b = person_b['name'].split()[0]
    agent_a = person_a.get('analysis', {}).get('agentName', f"Agent {name_a}")
    agent_b = person_b.get('analysis', {}).get('agentName', f"Agent {name_b}")

    hobby_a = (person_a.get('analysis', {}).get('hobbies') or ["creative work"])[0]
    hobby_b = (person_b.get('analysis', {}).get('hobbies') or ["weekend escapes"])[0]
    need_a = (person_a.get('analysis', {}).get('needs') or ["genuine presence"])[0]
    need_b = (person_b.get('analysis', {}).get('needs') or ["mutual respect"])[0]
    company_a = person_a.get('sources', {}).get('linkedin', {}).get('company', 'their work')
    company_b = person_b.get('sources', {}).get('linkedin', {}).get('company', 'their ventures')

    is_high = compat['overallCompatibility'] >= 82

    dialogue = [
        {
            "turn": 1,
            "speaker": name_a,
            "speakerId": person_a["id"],
            "agentName": agent_a,
            "avatar": person_a["avatar"],
            "phase": "Arrival & First Impression",
            "text": f"Hey {name_b}, so wonderful to finally meet you in person! {venue['name']} is such a fantastic choice—the atmosphere here immediately sets the right mood.",
            "emotion": "warm",
            "internalThought": f"Agent {name_a} Perception: Reading {name_b}'s facial expressions and eye contact. Authentic presence score initialized at 92%.",
            "chemistryTick": compat["chemistryScore"] - 8
        },
        {
            "turn": 2,
            "speaker": name_b,
            "speakerId": person_b["id"],
            "agentName": agent_b,
            "avatar": person_b["avatar"],
            "phase": "Arrival & First Impression",
            "text": f"The pleasure is all mine, {name_a}! When my agent highlighted your dedication to {hobby_a.lower()}, I knew our conversation would go far beyond usual polite small talk.",
            "emotion": "intrigued",
            "internalThought": f"Agent {name_b} Calculation: Vocal cadence is completely relaxed. Zero synthetic posturing detected.",
            "chemistryTick": compat["chemistryScore"] - 5
        },
        {
            "turn": 3,
            "speaker": name_a,
            "speakerId": person_a["id"],
            "agentName": agent_a,
            "avatar": person_a["avatar"],
            "phase": "Lifestyle & Instagram Deep-Dive",
            "text": f"Haha, absolutely! Looking at your world, I saw how passionately you immerse yourself in {hobby_b.lower()}. In our high-velocity lives, how do you protect that sacred offline headspace?",
            "emotion": "playful",
            "internalThought": f"Agent {name_a} Analysis: Probing how they decompress from {company_b}. My person demands genuine emotional grounding.",
            "chemistryTick": compat["chemistryScore"] - 2
        },
        {
            "turn": 4,
            "speaker": name_b,
            "speakerId": person_b["id"],
            "agentName": agent_b,
            "avatar": person_b["avatar"],
            "phase": "Lifestyle & Instagram Deep-Dive",
            "text": f"It took me years to realize that non-stop velocity without restorative rituals burns you out. For me, that time is sacred—it grounds my soul. How do you find that balance amidst all the demands at {company_a}?",
            "emotion": "reflective",
            "internalThought": f"Agent {name_b} Evaluation: High lifestyle alignment confirmed. Shared respect for healthy emotional boundaries.",
            "chemistryTick": compat["chemistryScore"] + 2
        },
        {
            "turn": 5,
            "speaker": name_a,
            "speakerId": person_a["id"],
            "agentName": agent_a,
            "avatar": person_a["avatar"],
            "phase": "Ambition, Values & LinkedIn Synthesis",
            "text": f"Honestly, by being deeply intentional about who I let into my inner circle. In a romantic partner, what I cherish above all else is {need_a.lower()}.",
            "emotion": "vulnerable" if is_high else "thoughtful",
            "internalThought": f"Agent {name_a} Vulnerability Check: Core romantic need shared. Monitoring {name_b}'s emotional response.",
            "chemistryTick": compat["chemistryScore"] + 4
        },
        {
            "turn": 6,
            "speaker": name_b,
            "speakerId": person_b["id"],
            "agentName": agent_b,
            "avatar": person_b["avatar"],
            "phase": "Ambition, Values & LinkedIn Synthesis",
            "text": f"That strikes such a profound chord with me, {name_a}. So many people in our circles chase titles and vanity metrics. For me, having {need_b.lower()} is what truly makes a relationship extraordinary.",
            "emotion": "enamored" if is_high else "respectful",
            "internalThought": f"Agent {name_b} Resonance Metric: Deep psychological harmony detected. Vulnerability reciprocated with grace.",
            "chemistryTick": compat["chemistryScore"] + 7
        },
        {
            "turn": 7,
            "speaker": name_a,
            "speakerId": person_a["id"],
            "agentName": agent_a,
            "avatar": person_a["avatar"],
            "phase": "Banter & Chemistry Test",
            "text": f"Alright, moment of truth: if we disappeared from this formal dinner right now, are we grabbing late-night cutting chai and street snacks, or hunting down an acoustic jam session?",
            "emotion": "flirty",
            "internalThought": f"Agent {name_a} Playfulness Probe: Testing humor adaptability and spontaneous banter response.",
            "chemistryTick": compat["chemistryScore"] + 8
        },
        {
            "turn": 8,
            "speaker": name_b,
            "speakerId": person_b["id"],
            "agentName": agent_b,
            "avatar": person_b["avatar"],
            "phase": "Banter & Chemistry Test",
            "text": f"Why not both? We grab the hot cutting chai and bun maska first, and then sit by the water listening to acoustic tracks. And I get to choose the playlist!",
            "emotion": "laughing",
            "internalThought": f"Agent {name_b} Banter Peak: Spark ignited. Playful banter compatibility scored at 98%.",
            "chemistryTick": compat["chemistryScore"]
        },
        {
            "turn": 9,
            "speaker": name_a,
            "speakerId": person_a["id"],
            "agentName": agent_a,
            "avatar": person_a["avatar"],
            "phase": "Parting & Verdict",
            "text": f"Done deal! You have yourself a date for round two, {name_b}. Time completely evaporated tonight—I haven't connected like this in a very long time.",
            "emotion": "enamored" if is_high else "warm",
            "internalThought": f"Agent {name_a} Final Recommendation: Prioritize candidate {name_b}. Compatibility surpasses 90th percentile.",
            "chemistryTick": compat["overallCompatibility"]
        },
        {
            "turn": 10,
            "speaker": name_b,
            "speakerId": person_b["id"],
            "agentName": agent_b,
            "avatar": person_b["avatar"],
            "phase": "Parting & Verdict",
            "text": f"Same here, {name_a}. Let's make that next date happen very soon. Goodnight!",
            "emotion": "radiant" if is_high else "pleasant",
            "internalThought": f"Agent {name_b} Final Recommendation: Second date enthusiastically endorsed. High reciprocal affinity confirmed.",
            "chemistryTick": compat["overallCompatibility"]
        }
    ]

    agent_a_quote = (
        f"\"{name_b} effortlessly balanced fierce ambition with grounded humor. The way their face lit up talking about {hobby_b.lower()} felt completely authentic.\""
        if is_high else
        f"\"{name_b} is undeniably brilliant and inspiring. While our daily lifestyles have slight variations, our mutual intellectual respect is profound.\""
    )

    agent_b_quote = (
        f"\"{name_a} made me completely forget about work within minutes. Zero pretension, razor-sharp wit, and genuine emotional maturity.\""
        if is_high else
        f"\"A stimulating and inspiring conversation with {name_a}. A remarkable person with high creative energy.\""
    )

    return {
        "dateId": f"date-{person_a['id']}-{person_b['id']}-{int(time.time())}",
        "venue": venue,
        "participants": {
            "personA": {"id": person_a['id'], "name": person_a['name'], "avatar": person_a['avatar'], "agentName": agent_a},
            "personB": {"id": person_b['id'], "name": person_b['name'], "avatar": person_b['avatar'], "agentName": agent_b}
        },
        "dialogue": dialogue,
        "evaluation": {
            **compat,
            "agentAQuote": agent_a_quote,
            "agentBQuote": agent_b_quote,
            "venueName": venue["name"],
            "timestamp": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
            "llmEngine": "CupidAgent Autonomous Persona Synthesizer"
        }
    }

def generate_match_reason(person_a: Dict[str, Any], person_b: Dict[str, Any], score: int) -> str:
    name_a = person_a['name'].split()[0]
    name_b = person_b['name'].split()[0]
    ind_a = person_a.get('sources', {}).get('linkedin', {}).get('industry', 'technology & leadership')
    ind_b = person_b.get('sources', {}).get('linkedin', {}).get('industry', 'media & culture')

    if score >= 88:
        return f"Exceptional dual-source resonance: High-agency professional drive from LinkedIn ({ind_a} & {ind_b}) fuses seamlessly with complementary Instagram lifestyle rituals and emotional openness."
    elif score >= 80:
        return f"High intellectual synergy and creative appreciation. Both agents identified mutual respect for craft, disciplined fitness, and grounded offline downtime."
    elif score >= 72:
        return f"Solid foundational compatibility: Shared appreciation for ambition and personal growth, with slight contrasts in day-to-day downtime rhythms."
    else:
        return f"Respectful peer match with divergent lifestyle priorities. Excellent for collaborative alliance, with distinct personal love languages."

def compute_rankings_for_person(target_person: Dict[str, Any], all_people: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    candidates = [p for p in all_people if p["id"] != target_person["id"]]
    ranked = []
    for candidate in candidates:
        score_data = calculate_compatibility(target_person, candidate)
        ranked.append({
            "candidate": {
                "id": candidate["id"],
                "name": candidate["name"],
                "age": candidate["age"],
                "location": candidate["location"],
                "avatar": candidate["avatar"],
                "tagline": candidate["tagline"],
                "linkedinUrl": candidate["linkedinUrl"],
                "instagramUrl": candidate["instagramUrl"],
                "agentName": candidate.get("analysis", {}).get("agentName", f"Agent {candidate['name']}"),
                "topHobbies": (candidate.get("analysis", {}).get("hobbies") or [])[:2]
            },
            **score_data,
            "matchReason": generate_match_reason(target_person, candidate, score_data["overallCompatibility"])
        })

    ranked.sort(key=lambda x: x["overallCompatibility"], reverse=True)
    for idx, item in enumerate(ranked):
        item["rank"] = idx + 1
    return ranked

def compute_network_rankings(all_people: List[Dict[str, Any]]) -> Dict[str, Any]:
    rankings_by_person = {}
    for person in all_people:
        rankings_by_person[person["id"]] = compute_rankings_for_person(person, all_people)

    checked = set()
    mutual_sparks = []

    for person in all_people:
        my_top = rankings_by_person[person["id"]][:3]
        for match in my_top:
            other_id = match["candidate"]["id"]
            pair_key = tuple(sorted([person["id"], other_id]))
            if pair_key in checked:
                continue

            other_top = rankings_by_person.get(other_id, [])[:3]
            recip = next((m for m in other_top if m["candidate"]["id"] == person["id"]), None)

            if recip:
                checked.add(pair_key)
                other_person = next(p for p in all_people if p["id"] == other_id)
                mutual_sparks.append({
                    "personA": {
                        "id": person["id"],
                        "name": person["name"],
                        "avatar": person["avatar"],
                        "rankForOther": recip["rank"],
                        "score": match["overallCompatibility"]
                    },
                    "personB": {
                        "id": other_person["id"],
                        "name": other_person["name"],
                        "avatar": other_person["avatar"],
                        "rankForOther": match["rank"],
                        "score": recip["overallCompatibility"]
                    },
                    "combinedScore": round((match["overallCompatibility"] + recip["overallCompatibility"]) / 2),
                    "sparkReason": f"Mutual Top {max(match['rank'], recip['rank'])} Match: Both autonomous agents independently placed each other at the summit of their compatibility rankings."
                })

    mutual_sparks.sort(key=lambda x: x["combinedScore"], reverse=True)
    return {
        "rankingsByPerson": rankings_by_person,
        "mutualSparks": mutual_sparks
    }
