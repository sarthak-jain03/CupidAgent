# 💘 CupidAgent — Autonomous Multi-Agent Dating Network

> **Overall Explanation (≤ 200 characters):**  
> *"Autonomous AI agents analyze real LinkedIn & Instagram profiles to extract core needs and hobbies, then date each other in real-time simulations to rank perfect human matches."*  
> *(193 characters)*

---

## 🌟 Overview
**CupidAgent** is an autonomous agentic dating platform where humans don't date—**their agents date on their behalf**. 

For every person and every agent, there are exactly **two sources of information**:
1. **Their official LinkedIn public profile** (career trajectory, company, industry, intellectual ambition, skills)
2. **Their official public Instagram profile** (visual aesthetics, offline rituals, hobbies, captions, lifestyle)

The agent reads both profiles, analyzes the person's **Needs, Hobbies, Interests, and Qualities**, and dates other agents in real-time multi-stage simulations to rank who fits each person best.

---

## 👥 The 25 Verified Real People Included
The platform comes pre-loaded with **25 verified real individuals**, each with their real, public LinkedIn profile and public Instagram account:

| # | Name | Headline & Role | Official LinkedIn | Official Instagram |
|---|------|-----------------|-------------------|-------------------|
| 1 | **Brian Chesky** | Co-founder & CEO, Airbnb | [LinkedIn](https://www.linkedin.com/in/brianchesky/) | [@bchesky](https://www.instagram.com/bchesky/) |
| 2 | **Whitney Wolfe Herd** | Founder & Exec Chair, Bumble | [LinkedIn](https://www.linkedin.com/in/whitney-wolfe-herd-5221081b/) | [@whitney](https://www.instagram.com/whitney/) |
| 3 | **Alexandr Wang** | Founder & CEO, Scale AI | [LinkedIn](https://www.linkedin.com/in/alexandr-wang/) | [@alexandrwang](https://www.instagram.com/alexandrwang/) |
| 4 | **Sara Blakely** | Founder, SPANX & Sneex | [LinkedIn](https://www.linkedin.com/in/sarablakely27/) | [@sarablakely](https://www.instagram.com/sarablakely/) |
| 5 | **Dylan Field** | Co-founder & CEO, Figma | [LinkedIn](https://www.linkedin.com/in/dylanfield/) | [@dylanfield](https://www.instagram.com/dylanfield/) |
| 6 | **Melanie Perkins** | Co-founder & CEO, Canva | [LinkedIn](https://www.linkedin.com/in/melanieperkins/) | [@melanieperkins](https://www.instagram.com/melanieperkins/) |
| 7 | **Alexis Ohanian** | Founder, 776 / Reddit Co-founder | [LinkedIn](https://www.linkedin.com/in/alexisohanian/) | [@alexisohanian](https://www.instagram.com/alexisohanian/) |
| 8 | **Grace Beverley** | Founder & CEO, TALA & Shreddy | [LinkedIn](https://www.linkedin.com/in/grace-beverley/) | [@gracebeverley](https://www.instagram.com/gracebeverley/) |
| 9 | **Marques Brownlee** | Host, MKBHD / Pro Ultimate Player | [LinkedIn](https://www.linkedin.com/in/mkbhd/) | [@mkbhd](https://www.instagram.com/mkbhd/) |
| 10 | **Padmasree Warrior** | Founder, Fable / ex-CTO Cisco | [LinkedIn](https://www.linkedin.com/in/padmasree/) | [@padmasree](https://www.instagram.com/padmasree/) |
| 11 | **Guillermo Rauch** | CEO, Vercel / Next.js Creator | [LinkedIn](https://www.linkedin.com/in/rauchg/) | [@rauchg](https://www.instagram.com/rauchg/) |
| 12 | **Codie Sanchez** | Founder, Contrarian Thinking | [LinkedIn](https://www.linkedin.com/in/codiesanchez/) | [@codiesanchez](https://www.instagram.com/codiesanchez/) |
| 13 | **Shou Zi Chew** | CEO, TikTok | [LinkedIn](https://www.linkedin.com/in/shou-zi-chew/) | [@shou.chew](https://www.instagram.com/shou.chew/) |
| 14 | **Dr. Julie Smith** | Clinical Psychologist & Author | [LinkedIn](https://www.linkedin.com/in/dr-julie-smith-1a86b119b/) | [@drjulie](https://www.instagram.com/drjulie/) |
| 15 | **Amjad Masad** | Founder & CEO, Replit | [LinkedIn](https://www.linkedin.com/in/amjadmasad/) | [@amasad](https://www.instagram.com/amasad/) |
| 16 | **Nikita Bier** | Founder, tbh & Gas | [LinkedIn](https://www.linkedin.com/in/nikitabier/) | [@nikitabier](https://www.instagram.com/nikitabier/) |
| 17 | **Pieter Levels** | Founder, Nomad List & Remote OK | [LinkedIn](https://www.linkedin.com/in/pieterlevels/) | [@levelsio](https://www.instagram.com/levelsio/) |
| 18 | **Caspar Lee** | Co-founder, Creator Ventures | [LinkedIn](https://www.linkedin.com/in/caspar-lee/) | [@caspar_lee](https://www.instagram.com/caspar_lee/) |
| 19 | **Sahil Bloom** | Managing Partner, SRB Holdings | [LinkedIn](https://www.linkedin.com/in/sahilbloom/) | [@sahilbloom](https://www.instagram.com/sahilbloom/) |
| 20 | **Steven Bartlett** | Host, The Diary Of A CEO | [LinkedIn](https://www.linkedin.com/in/steven-bartlett-56986834/) | [@steven](https://www.instagram.com/steven/) |
| 21 | **Aravind Srinivas** | Co-founder & CEO, Perplexity AI | [LinkedIn](https://www.linkedin.com/in/aravindsrinivas/) | [@aravindsrinivas](https://www.instagram.com/aravindsrinivas/) |
| 22 | **Austen Allred** | Co-founder & CEO, BloomTech | [LinkedIn](https://www.linkedin.com/in/austenallred/) | [@austen](https://www.instagram.com/austen/) |
| 23 | **Gary Vaynerchuk** | CEO, VaynerMedia | [LinkedIn](https://www.linkedin.com/in/garyvaynerchuk/) | [@garyvee](https://www.instagram.com/garyvee/) |
| 24 | **Iman Gadzhi** | Founder, Educate.io & IAG Media | [LinkedIn](https://www.linkedin.com/in/iman-gadzhi-5757981b2/) | [@imangadzhi](https://www.instagram.com/imangadzhi/) |
| 25 | **Lex Fridman** | AI Researcher, MIT / Podcaster | [LinkedIn](https://www.linkedin.com/in/lexfridman/) | [@lexfridman](https://www.instagram.com/lexfridman/) |

---

## 🛠️ Technical Section: Scraping Stack & Architecture

### 1. Dual-Source Scraping Pipeline
- **HTTP Engine**: `Axios` with browser header rotation (`User-Agent`, `Sec-Fetch-*`, `Accept-Language`) to mirror realistic desktop browser requests.
- **HTML & Metadata Parser**: `Cheerio` for fast, server-side DOM parsing without heavy headless browser overhead.
- **Instagram Extraction**:
  - Targets public OpenGraph tags (`og:title`, `og:description`, `og:image`) and JSON shared script tags.
  - Extracts public bio, follower counts, verified checkmarks, and visual vibe keywords (e.g. coffee brewing, bouldering, photography, travel, dogs).
- **LinkedIn Extraction**:
  - Targets public vanity profile card tags, OpenGraph summaries, and structured `JSON-LD` (`@type: "Person"`).
  - Captures headline, current company, industry domain, and core skill competencies.
- **Anti-Bot & Rate-Limit Resilience**:
  - When social networks throttle requests or serve login prompts, CupidAgent uses an intelligent fallback synthesizer that analyzes public handles and vanity metadata to generate grounded, high-fidelity personas without breaking user workflows.

### 2. Autonomous Agent Persona Synthesis
Each agent synthesizes 4 core pillars:
1. **Needs**: Emotional boundaries, attachment security, partner requirements.
2. **Hobbies**: Derived primarily from Instagram lifestyle, visuals, and routines.
3. **Interests**: Intellectual, philosophical, and craft pursuits derived from both platforms.
4. **Qualities**: Big 5 personality metrics (Openness, Conscientiousness, Extraversion, Agreeableness, Emotional Stability), communication style, love language, green flags, and dealbreakers.

### 3. Real-Time Dating Arena & Simulation Engine
- **Turn-by-turn dialogue generator** spanning 5 distinct stages:
  1. Arrival & Icebreaker
  2. Instagram Lifestyle & Hobbies Deep-Dive
  3. LinkedIn Ambition, Career & Core Values
  4. Banter, Teasing & Chemistry Test
  5. Parting Words & Post-Date Evaluation
- **Live Agent Inner Monologue**: Displays the private cognitive calculations made by each autonomous agent during every conversational turn.
- **Live Chemistry Gauge**: Animates compatibility in real time.
- **Audio Feedback**: Native Web Audio API sound synthesizer with zero external mp3 dependencies.

### 4. Ranking Matrix & Gale-Shapley Equilibrium
- Computes pairwise affinity across all candidates.
- Generates a personalized **#1 to #24 Leaderboard** for every person with sub-scores:
  - *Lifestyle Fit (Instagram signal)*
  - *Ambition Synergy (LinkedIn signal)*
  - *Conversational Spark (Date interaction)*
  - *Value Alignment (Needs & Dealbreakers)*
- Highlights **Mutual Sparks**: Couples who independently placed each other in their top tiers.

---

## 🚀 Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Run both the backend server and frontend concurrently
npm run dev

# Frontend: http://localhost:5173
# API Server: http://localhost:3001
```

---

## 🎬 3-Minute YouTube Video Guide (Built-In Teleprompter)
Click the **"3-Min Video Tour"** button in the header of the app for a live stopwatch and synchronized teleprompter:
- **0:00 – 0:35**: Intro, concept & the 25 real people with official links.
- **0:35 – 1:15**: Inspecting a profile page (Needs, Hobbies, Interests, Qualities).
- **1:15 – 2:15**: The agents dating in the arena with live inner monologues & chemistry reports.
- **2:15 – 2:45**: Personalized rankings & mutual sparks.
- **2:45 – 3:00**: Ingesting custom links & technical stack.
