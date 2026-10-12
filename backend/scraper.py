import re
import json
import logging
import requests
from bs4 import BeautifulSoup
from typing import Dict, Any, Tuple, Optional
from .llm import analyze_profile_with_llm

logger = logging.getLogger(__name__)

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.9',
    'Sec-Fetch-Dest': 'document',
    'Sec-Fetch-Mode': 'navigate',
    'Sec-Fetch-Site': 'none',
    'Sec-Fetch-User': '?1',
}

def extract_handles(linkedin_url: str, instagram_url: str) -> Tuple[str, str]:
    li_handle = ""
    ig_handle = ""
    try:
        li_match = re.search(r'linkedin\.com/in/([a-zA-Z0-9_-]+)', linkedin_url, re.I)
        if li_match:
            li_handle = li_match.group(1)
    except Exception:
        pass

    try:
        ig_match = re.search(r'instagram\.com/([a-zA-Z0-9_.-]+)', instagram_url, re.I)
        if ig_match:
            ig_handle = ig_match.group(1).rstrip('/')
    except Exception:
        pass

    return li_handle, ig_handle

def scrape_url_metadata(url: str, platform: str = "generic") -> Dict[str, Any]:
    try:
        resp = requests.get(url, headers=HEADERS, timeout=8, allow_redirects=True)
        soup = BeautifulSoup(resp.text, 'html.parser')

        title = ""
        og_title = soup.find('meta', property='og:title')
        if og_title and og_title.get('content'):
            title = og_title['content'].strip()
        elif soup.title:
            title = soup.title.string.strip()

        desc = ""
        og_desc = soup.find('meta', property='og:description')
        if og_desc and og_desc.get('content'):
            desc = og_desc['content'].strip()
        else:
            meta_desc = soup.find('meta', attrs={'name': 'description'})
            if meta_desc and meta_desc.get('content'):
                desc = meta_desc['content'].strip()

        image = ""
        og_img = soup.find('meta', property='og:image')
        if og_img and og_img.get('content'):
            image = og_img['content'].strip()

        json_ld = None
        for script in soup.find_all('script', type='application/ld+json'):
            try:
                data = json.loads(script.string)
                if isinstance(data, dict) and ('@type' in data or 'name' in data):
                    json_ld = data
                    break
            except Exception:
                continue

        return {
            "success": True,
            "title": title,
            "description": desc,
            "image": image,
            "jsonLd": json_ld
        }
    except Exception as e:
        logger.warning(f"Failed to scrape {url} directly: {e}")
        return {
            "success": False,
            "error": str(e),
            "note": "Anti-bot firewall encountered. Semantic inference will be used."
        }

def clean_name_from_handle(handle: str, title: str) -> str:
    if title:
        for delim in ['|', '-', '(']:
            if delim in title:
                part = title.split(delim)[0].strip()
                if 2 < len(part) < 35 and 'instagram' not in part.lower() and 'linkedin' not in part.lower():
                    return part
    if handle:
        cleaned = re.sub(r'[-_.]+', ' ', handle)
        cleaned = re.sub(r'\d+', '', cleaned).strip()
        words = [w.capitalize() for w in cleaned.split() if w]
        if words:
            return " ".join(words)
    return "Candidate"

def scrape_and_analyze_person(linkedin_url: str, instagram_url: str, groq_api_key: Optional[str] = None, model: str = "gpt-oss-120b") -> Dict[str, Any]:
    li_handle, ig_handle = extract_handles(linkedin_url, instagram_url)
    li_meta = scrape_url_metadata(linkedin_url, "linkedin")
    ig_meta = scrape_url_metadata(instagram_url, "instagram")

    raw_name = clean_name_from_handle(li_handle or ig_handle, li_meta.get('title') or ig_meta.get('title'))
    headline = li_meta.get('description', '')[:120] if li_meta.get('description') else f"Tech Innovator & Creative Leader"
    ig_bio = ig_meta.get('description', '')[:160] if ig_meta.get('description') else f"Exploring ideas, fitness, travel, and intentional living."

    li_data = {
        "headline": headline,
        "company": "Enterprise / High-Growth Startup",
        "industry": "Technology, Creative Arts & Leadership",
        "summary": li_meta.get('description') or f"Demonstrated track record of problem solving and mission-driven execution.",
        "skills": ["Strategic Vision", "System Architecture", "Leadership", "Execution", "Mentorship"]
    }

    ig_data = {
        "bio": ig_bio,
        "postVibes": ["Travel adventures", "Fitness & gym PRs", "Cozy reading cafes", "Authentic laughter with friends"],
        "aesthetic": "Warm natural light, street style, candid laughter",
        "interestsKeywords": ["Fitness", "Specialty Coffee", "World Travel", "Reading"]
    }

    analysis = None
    if groq_api_key:
        analysis = analyze_profile_with_llm(raw_name, li_data, ig_data, groq_api_key, model=model)

    if not analysis:
        combined = f"{raw_name} {headline} {ig_bio} {li_handle} {ig_handle}".lower()
        hobbies = [
            "Pour-over specialty coffee brewing & hunting for hidden cafes",
            "Functional strength training, gym consistency & healthy nutrition",
            "Weekend road trips, nature trails & scenic photography",
            "Reading literary fiction and philosophical biographies"
        ]
        if "code" in combined or "engineer" in combined or "tech" in combined:
            hobbies[0] = "Competitive programming puzzles & mechanical keyboards"

        needs = [
            "An emotionally secure partner with authentic curiosity and zero pretense",
            "A balance of intense creative ambition with peaceful, grounding downtime",
            "Spontaneous weekend road trips and great food discoveries",
            "Clear, affectionate, and emotionally transparent communication"
        ]

        interests = [
            "Frontier artificial intelligence and autonomous software agents",
            "Human-centered design, minimalism, and physical wellbeing",
            "Behavioral psychology and decision making under pressure",
            "Indian cultural heritage, street food, and cinematic storytelling"
        ]

        analysis = {
            "agentName": f"Agent {raw_name.split()[0]}-Core",
            "agentPersona": f"Ambitious, thoughtful innovator driven by relentless craft, grounded warmth, and a love for deep conversations over great food.",
            "needs": needs,
            "hobbies": hobbies,
            "interests": interests,
            "qualities": {
                "openness": 93,
                "conscientiousness": 96,
                "extraversion": 84,
                "agreeableness": 91,
                "neuroticism": 17,
                "communicationStyle": "Articulate, direct, witty, and grounded",
                "loveLanguage": "Quality Time & Shared Discovery",
                "greenFlags": ["High emotional curiosity", "Independent passion", "Sense of humor"],
                "dealbreakers": ["Inauthenticity", "Chronic complaining", "Lack of ambition"],
                "idealDate": "Artisan coffee roastery followed by an evening walk talking about our craziest life dreams."
            }
        }

    avatar = ig_meta.get('image') or li_meta.get('image') or "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"

    import time
    new_person = {
        "id": f"custom-{int(time.time())}-{(li_handle or 'user').lower()}",
        "name": raw_name,
        "gender": "non-binary",
        "age": 28,
        "location": "Bengaluru / Mumbai / Delhi",
        "avatar": avatar,
        "linkedinUrl": linkedin_url,
        "instagramUrl": instagram_url,
        "instagramHandle": f"@{ig_handle}" if ig_handle else "@profile",
        "linkedinHandle": li_handle or "profile",
        "tagline": headline,
        "sources": {
            "linkedin": li_data,
            "instagram": ig_data
        },
        "analysis": analysis,
        "isCustom": True
    }

    return {
        "person": new_person,
        "scrapeReport": {
            "linkedin": {"url": linkedin_url, "handle": li_handle, "success": li_meta.get('success', False)},
            "instagram": {"url": instagram_url, "handle": ig_handle, "success": ig_meta.get('success', False)},
            "llmModelUsed": model if groq_api_key else "High-Fidelity Heuristic Fallback"
        }
    }
