# CupidAgent - Agentic Dating App

A web application where autonomous AI agents represent real people, date each other, and generate personalized compatibility rankings based on their public LinkedIn and Instagram profiles.

- **Live Website**: [cupidagent.vercel.app](https://cupidagent.vercel.app/)
- **Demo Video**: [YouTube Walkthrough](https://youtu.be/ujVyPGbaKq0?si=WLyfDMAUgILm4F-S)

---

## How It Works

1. **Profile Analysis**: Each person is represented by an autonomous agent. The agent analyzes information extracted from their LinkedIn and public Instagram profiles to map out four core areas: **Needs**, **Hobbies**, **Interests**, and **Qualities**.
2. **Dating Arena**: Any two agents can go on a simulated date. The simulation runs turn-by-turn conversations across realistic stages (icebreaker, lifestyle, ambitions, chemistry, and final assessment) with real-time dialogue and compatibility scoring.
3. **Rankings & Mutual Sparks**: For every person in the system, the platform calculates a compatibility ranking against all other candidates. It also detects "Mutual Sparks" where two candidates mutually rank each other at the top.
4. **Custom Profiles**: You can add new candidates by submitting their public LinkedIn and Instagram profile links.

---

## Tech Stack

- **Frontend**: React 18, Vite, Vanilla CSS
- **Backend**: Python, FastAPI, Uvicorn
- **LLM**: Groq API (`gpt-oss-120b`)
- **Profile Extraction**: BeautifulSoup4, Requests (public metadata extraction)

---

## Verified Candidates

The app includes 25 real individuals with public profiles:

| # | Name | Role / Headline | LinkedIn | Instagram |
|---|------|-----------------|----------|-----------|
| 1 | **Raj Vikramaditya (Striver)** | Founder, takeUforward / Software Engineer | [LinkedIn](https://www.linkedin.com/in/rajstriver/) | [@striver_79](https://www.instagram.com/striver_79/) |
| 2 | **Love Babbar** | Founder, CodeHelp / Educator | [LinkedIn](https://www.linkedin.com/in/love-babbar-38ab2887/) | [@lovebabbar1](https://www.instagram.com/lovebabbar1/) |
| 3 | **Shradha Khapra** | Co-founder, Apna College / Tech Educator | [LinkedIn](https://www.linkedin.com/in/shradha-khapra/) | [@shradhakhapra](https://www.instagram.com/shradhakhapra/) |
| 4 | **Aman Dhattarwal** | Founder, Apni Kaksha & Apna College | [LinkedIn](https://www.linkedin.com/in/dhattarwalaman/) | [@amandhattarwal](https://www.instagram.com/amandhattarwal/) |
| 5 | **Ranveer Allahbadia** | Co-founder, Monk-E / The Ranveer Show | [LinkedIn](https://www.linkedin.com/in/beerbiceps/) | [@beerbiceps](https://www.instagram.com/beerbiceps/) |
| 6 | **Raj Shamani** | Entrepreneur & Host, Figuring Out | [LinkedIn](https://www.linkedin.com/in/rajshamani/) | [@rajshamani](https://www.instagram.com/rajshamani/) |
| 7 | **Aman Gupta** | Co-founder & CMO, boAt Lifestyle | [LinkedIn](https://www.linkedin.com/in/aman-gupta-7217a515/) | [@boatxaman](https://www.instagram.com/boatxaman/) |
| 8 | **Narendra Modi** | Prime Minister of India | [LinkedIn](https://www.linkedin.com/in/narendramodi/) | [@narendramodi](https://www.instagram.com/narendramodi/) |
| 9 | **Alakh Pandey** | Founder & CEO, Physics Wallah | [LinkedIn](https://www.linkedin.com/in/alakh-pandey-4baaa8227/) | [@alakhsir_pw](https://www.instagram.com/alakhsir_pw/) |
| 10 | **Suniel Shetty** | Actor, Investor & Entrepreneur | [LinkedIn](https://www.linkedin.com/in/suniel-shetty/) | [@suniel.shetty](https://www.instagram.com/suniel.shetty/) |
| 11 | **Anupam Mittal** | Founder & CEO, People Group (Shaadi.com) | [LinkedIn](https://www.linkedin.com/in/anupammittal007/) | [@anupammittal.me](https://www.instagram.com/anupammittal.me/) |
| 12 | **Shraddha Kapoor** | Actor & Environmentalist | [LinkedIn](https://www.linkedin.com/in/shraddha-kapoor-6a9228380/) | [@shraddhakapoor](https://www.instagram.com/shraddhakapoor/) |
| 13 | **Vineeta Singh** | Co-founder & CEO, SUGAR Cosmetics | [LinkedIn](https://www.linkedin.com/in/vineetasingh/) | [@vineetasng](https://www.instagram.com/vineetasng/) |
| 14 | **Namita Thapar** | Executive Director, Emcure Pharmaceuticals | [LinkedIn](https://www.linkedin.com/in/namita-thapar/) | [@namitathapar](https://www.instagram.com/namitathapar/) |
| 15 | **Deepinder Goyal** | Founder & CEO, Zomato | [LinkedIn](https://www.linkedin.com/in/deepigoyal/) | [@deepigoyal](https://www.instagram.com/deepigoyal/) |
| 16 | **Ananya Birla** | Musician, Entrepreneur & Founder, Svatantra | [LinkedIn](https://www.linkedin.com/in/ananyabirla/) | [@ananyabirla](https://www.instagram.com/ananyabirla/) |
| 17 | **Sundar Pichai** | CEO, Alphabet & Google | [LinkedIn](https://www.linkedin.com/in/sundarpichai/) | [@sundarpichai](https://www.instagram.com/sundarpichai/) |
| 18 | **Peyush Bansal** | Co-founder & CEO, Lenskart | [LinkedIn](https://www.linkedin.com/in/peyushbansal) | [@peyushbansal](https://www.instagram.com/peyushbansal/) |
| 19 | **Abhishek Upmanyu** | Stand-up Comedian & Writer | [LinkedIn](https://www.linkedin.com/in/abhishek-upmanyu-86009942/) | [@aupmanyu](https://www.instagram.com/aupmanyu/) |
| 20 | **Apoorva Mukhija** | Content Creator & Digital Storyteller | [LinkedIn](https://www.linkedin.com/in/apoorva2707/) | [@the.rebel.kid](https://www.instagram.com/the.rebel.kid/) |
| 21 | **Tanmay Bhat** | Comedian, Creator & Investor | [LinkedIn](https://www.linkedin.com/in/thetanmay/) | [@tanmaybhat](https://www.instagram.com/tanmaybhat/) |
| 22 | **Sahiba Bali** | Actor, Host & Creator | [LinkedIn](https://www.linkedin.com/in/sahibabali/) | [@sahibabali](https://www.instagram.com/sahibabali/) |
| 23 | **Ravi Gupta** | Stand-up Comedian | [LinkedIn](https://www.linkedin.com/in/raviguptacomedy/) | [@shudhdesicomic](https://www.instagram.com/shudhdesicomic/) |
| 24 | **Rahul Dua** | Stand-up Comedian & Host | [LinkedIn](https://www.linkedin.com/in/therahuldua/) | [@therahuldua](https://www.instagram.com/therahuldua/) |
| 25 | **Gaurav Kapoor** | Stand-up Comedian & Storyteller | [LinkedIn](https://www.linkedin.com/in/gaurav-kapoor-37b0b051/) | [@gauravkpoor](https://www.instagram.com/gauravkpoor/) |

---

## Core System Modules

### 1. Dual-Source Data Extraction (`backend/scraper.py`)
- Extracts public data from LinkedIn (headline, industry, company, and summary) and Instagram (bio, lifestyle highlights, aesthetic, and hobbies).
- Cleans and structures the information into baseline persona inputs.

### 2. Persona Synthesis (`backend/llm.py`)
- Uses Groq with `gpt-oss-120b` to synthesize the four profile pillars for each candidate:
  - **Needs**: Relationship values, communication preferences, and core emotional boundaries.
  - **Hobbies**: Outdoor pursuits, creative outlets, and leisure habits.
  - **Interests**: Reading, topics of curiosity, and creative projects.
  - **Qualities**: Personality traits, conversational style, green flags, and dealbreakers.

### 3. Dating Simulation (`backend/dating_engine.py`)
- Turn-by-turn conversation between two agents across five stages:
  1. *Arrival & First Impressions*
  2. *Lifestyle & Routines*
  3. *Ambition & Core Values*
  4. *Banter & Chemistry*
  5. *Closing & Date Verdict*
- Real-time compatibility tracking and inner thought logs for each agent.

### 4. Compatibility Rankings & Mutual Sparks
- Calculates pairwise compatibility using a balanced scoring model:
  - Lifestyle and hobby alignment
  - Ambition and long-term values
  - Conversational chemistry and banter
  - Communication style and mutual respect
- Produces an individualized ranking leaderboard for each candidate, ordering all potential matches from best fit to lowest.
- Identifies **Mutual Sparks**: candidates who reciprocally rank each other at the very top of their match preferences.

---

## Getting Started

### Prerequisites
- Python 3.9+
- Node.js 18+ and npm
- Groq API Key

### Installation

1. Install Python dependencies:
```bash
pip install -r requirements.txt
```

2. Install frontend dependencies:
```bash
npm install
```

3. Setup environment variables:
Create a `.env` file in the project root:
```env
GROQ_API_KEY=your_groq_api_key_here
GROQ_MODEL=gpt-oss-120b
```

### Running the App

Start both backend and frontend together:
```bash
npm run dev
```

Or start them separately:

```bash
# Terminal 1: Python Backend
python -m uvicorn backend.app:app --host 127.0.0.1 --port 8000 --reload

# Terminal 2: Frontend
npm run dev:frontend
```

Open `http://localhost:5173` in your browser.
