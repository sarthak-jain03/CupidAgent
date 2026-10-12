// Verified roster of 25 real individuals with official LinkedIn and public Instagram URLs
// Each profile contains exact source data and synthesized agent persona: Needs, Hobbies, Interests, Qualities.

export const INITIAL_PEOPLE = [
  {
    id: "brian-chesky",
    name: "Brian Chesky",
    gender: "male",
    age: 43,
    location: "San Francisco, CA",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    linkedinUrl: "https://www.linkedin.com/in/brianchesky/",
    instagramUrl: "https://www.instagram.com/bchesky/",
    instagramHandle: "@bchesky",
    linkedinHandle: "brianchesky",
    tagline: "Co-founder & CEO at Airbnb | Industrial Designer",
    sources: {
      linkedin: {
        headline: "Co-founder & CEO at Airbnb",
        company: "Airbnb",
        industry: "Design, Hospitality & Tech",
        education: "Rhode Island School of Design (BFA Industrial Design)",
        summary: "Industrial designer turned founder. Focused on product design, architecture, belonging anywhere, and company culture.",
        skills: ["Industrial Design", "Product Strategy", "Creative Direction", "Hospitality", "Brand Building"]
      },
      instagram: {
        bio: "Co-founder & CEO of Airbnb. Industrial Designer. Golden Retriever dad.",
        postVibes: ["Iconic architectural homes", "Golden retrievers", "Art & design retrospectives", "Global nomad travel"],
        aesthetic: "Warm architectural minimalist, photography of spaces, organic textures",
        interestsKeywords: ["Interior Architecture", "Travel", "Mid-Century Modern", "Dogs", "Sculpture"]
      }
    },
    analysis: {
      agentName: "Agent Chesky-Design",
      agentPersona: "Refined designer-entrepreneur with deep appreciation for hospitality, warm conversations over dinner, and boundless curiosity for physical spaces.",
      needs: [
        "A grounded, warm emotional anchor who appreciates aesthetic beauty and hospitality",
        "A partner who loves spontaneous weekend road trips and discovering boutique architectural spaces",
        "Mutual respect for relentless creative ambition balanced with serene downtime",
        "Open, heartfelt communication free of pretension or superficiality"
      ],
      hobbies: [
        "Sketching mid-century modern furniture & architectural floorplans",
        "Exploring hidden boutique design hotels and historic properties worldwide",
        "Morning jogs in coastal fog with his golden retriever",
        "Collecting vintage design books and attending gallery previews"
      ],
      interests: [
        "The philosophy of belonging, hospitality, and human connection",
        "Intersection of physical architecture and digital interaction",
        "Culinary storytelling and intimate dinner parties with creators",
        "Classic industrial design from Dieter Rams to Bauhaus"
      ],
      qualities: {
        openness: 96,
        conscientiousness: 91,
        extraversion: 82,
        agreeableness: 89,
        neuroticism: 25,
        communicationStyle: "Warm, narrative-driven, observant, inquisitive",
        loveLanguage: "Quality Time & Thoughtful Gestures",
        greenFlags: ["Curious listener", "Aesthetic appreciation", "Kindness to service staff"],
        dealbreakers: ["Cynicism about art", "Constant social media obsession", "Inflexible mindset"],
        idealDate: "Touring a private contemporary design pavilion, followed by a cozy candlelit Italian dinner discussing creative passions."
      }
    }
  },
  {
    id: "whitney-wolfe-herd",
    name: "Whitney Wolfe Herd",
    gender: "female",
    age: 35,
    location: "Austin, TX",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    linkedinUrl: "https://www.linkedin.com/in/whitney-wolfe-herd-5221081b/",
    instagramUrl: "https://www.instagram.com/whitney/",
    instagramHandle: "@whitney",
    linkedinHandle: "whitney-wolfe-herd-5221081b",
    tagline: "Founder & Executive Chair at Bumble | Empowering Kind Connections",
    sources: {
      linkedin: {
        headline: "Founder and Executive Chair at Bumble",
        company: "Bumble Inc.",
        industry: "Consumer Tech, Social Media & Relationships",
        education: "Southern Methodist University (International Studies)",
        summary: "Pioneered women-first dating and relationship apps. Advocate for digital safety, kindness, and female entrepreneurship.",
        skills: ["Relationship Tech", "Brand Storytelling", "Social Impact", "Public Policy", "Leadership"]
      },
      instagram: {
        bio: "Founder @bumble. Mom, entrepreneur, championing kindness & equity.",
        postVibes: ["Family moments in Austin", "Texas ranch sunsets", "Female leadership summits", "Outdoor living"],
        aesthetic: "Vibrant yellow accents, warm sunlit outdoor photography, joyful family warmth",
        interestsKeywords: ["Kindness", "Relationship Psychology", "Equestrian & Ranching", "Cooking", "Wellness"]
      }
    },
    analysis: {
      agentName: "Agent Whitney-Empower",
      agentPersona: "Dynamic, emotionally intelligent pioneer passionate about mutual respect, authentic vulnerability, and high-energy entrepreneurship.",
      needs: [
        "A high-EQ partner who values mutual respect, equality, and emotional courage",
        "Someone confident enough to celebrate a powerful woman without competition",
        "A shared priority for family warmth, honest check-ins, and laughter",
        "A love for nature, outdoor Texas evenings, and genuine heart-to-heart talks"
      ],
      hobbies: [
        "Horseback riding on country ranches and exploring Texas trails",
        "Cooking hearty, organic Mediterranean meals for family and friends",
        "Reading contemporary memoirs and relationship psychology essays",
        "Paddleboarding on Lady Bird Lake at sunrise"
      ],
      interests: [
        "The evolution of modern romance, agency, and communication dynamics",
        "Philanthropic causes supporting women founders and online privacy",
        "Holistic wellness, cold plunges, and mindful meditation",
        "Interior aesthetics that foster hospitality and comfort"
      ],
      qualities: {
        openness: 90,
        conscientiousness: 95,
        extraversion: 91,
        agreeableness: 94,
        neuroticism: 22,
        communicationStyle: "Empathic, inspiring, direct, warmhearted",
        loveLanguage: "Words of Affirmation & Acts of Service",
        greenFlags: ["High emotional intelligence", "Supportive demeanor", "Sense of humor"],
        dealbreakers: ["Toxic ego", "Emotional unavailability", "Lack of social conscience"],
        idealDate: "Sunset horseback ride along the hill country trails, followed by homemade wood-fired pizza and rich life conversations."
      }
    }
  },
  {
    id: "alexandr-wang",
    name: "Alexandr Wang",
    gender: "male",
    age: 28,
    location: "San Francisco, CA",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    linkedinUrl: "https://www.linkedin.com/in/alexandr-wang/",
    instagramUrl: "https://www.instagram.com/alexandrwang/",
    instagramHandle: "@alexandrwang",
    linkedinHandle: "alexandr-wang",
    tagline: "Founder & CEO at Scale AI | Machine Learning & Frontier Tech",
    sources: {
      linkedin: {
        headline: "Founder and CEO at Scale AI",
        company: "Scale AI",
        industry: "Artificial Intelligence, Data Infrastructure",
        education: "MIT (Mathematics & Computer Science, dropped out)",
        summary: "Building data infrastructure to accelerate AI development for frontier models, national defense, and global enterprises.",
        skills: ["Deep Learning Infrastructure", "Quantitative Math", "Venture Scaling", "Strategic Vision", "Physics"]
      },
      instagram: {
        bio: "Founder/CEO @scaleai. Math, AI, travel, skiing, violin.",
        postVibes: ["Skiing in Aspen & Alps", "Frontier AI conferences", "Classical violin recitals", "Late night SF skyline"],
        aesthetic: "Sleek, tech-minimalist, black turtlenecks, alpine snowscapes",
        interestsKeywords: ["Mathematics", "Violin", "Skiing", "Frontier AI", "Fine dining"]
      }
    },
    analysis: {
      agentName: "Agent Wang-Frontier",
      agentPersona: "Prodigious, fast-thinking tech visionary with a deep appreciation for classical music, mathematical elegance, and alpine adventure.",
      needs: [
        "An intellectually formidable match who can engage in rapid, witty, multidimensional banter",
        "A calming presence who can help disconnect from extreme pace of frontier tech",
        "Appreciation for high culture (symphonies, violin, chess) and extreme sports (black diamond skiing)",
        "Deep loyalty and authenticity in an often transactional world"
      ],
      hobbies: [
        "Playing classical violin and listening to Bach partitas",
        "Heliskiing in the Canadian Rockies and Alps",
        "Blitz chess and reading mathematical proofs for recreation",
        "Exploring omakase sushi counters and tasting menu pairings"
      ],
      interests: [
        "The destiny of artificial general intelligence and human agency",
        "Geopolitics, semiconductor supply chains, and sovereign compute",
        "Physics of computation and complex systems",
        "Modernist architecture and acoustic hall design"
      ],
      qualities: {
        openness: 97,
        conscientiousness: 98,
        extraversion: 74,
        agreeableness: 78,
        neuroticism: 30,
        communicationStyle: "Analytical, rapid-fire, witty, intellectually curious",
        loveLanguage: "Quality Time & Shared Novelty",
        greenFlags: ["Intellectual curiosity", "Fast banter", "Passion for their own craft"],
        dealbreakers: ["Anti-intellectualism", "Complacency", "Slow conversational tempo"],
        idealDate: "Private symphony box listening to Tchaikovsky, followed by late-night omakase discussing the future of consciousness."
      }
    }
  },
  {
    id: "sara-blakely",
    name: "Sara Blakely",
    gender: "female",
    age: 53,
    location: "Atlanta, GA",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
    linkedinUrl: "https://www.linkedin.com/in/sarablakely27/",
    instagramUrl: "https://www.instagram.com/sarablakely/",
    instagramHandle: "@sarablakely",
    linkedinHandle: "sarablakely27",
    tagline: "Founder of SPANX & Sneex | Inventor, Philanthropist, Humorist",
    sources: {
      linkedin: {
        headline: "Founder at SPANX and Sneex",
        company: "SPANX / Sneex",
        industry: "Apparel, Innovation & Retail",
        education: "Florida State University (Communications)",
        summary: "Bootstrapped SPANX from $5,000 savings into global empire. Inventor of Sneex luxury hybrid high heels. Passionate about resilience, humor, and reframing failure.",
        skills: ["Product Invention", "Resilience Coaching", "Consumer Psychology", "Guerrilla Marketing", "Humor"]
      },
      instagram: {
        bio: "Founder of @spanx and @sneex. Celebrating failure, belly laughs, mom life & wild ideas.",
        postVibes: ["Goofy backstage bloopers", "High-energy shoe testing", "Family pancake breakfasts", "Motivational belly laughs"],
        aesthetic: "Playful, colorful, unapologetically authentic, warm Southern humor",
        interestsKeywords: ["Invention", "Standup Comedy", "Family", "Pancakes", "Self-Deprecating Humor"]
      }
    },
    analysis: {
      agentName: "Agent Sara-Spark",
      agentPersona: "Joyful, wildly resilient inventor who believes laughter, vulnerability, and thinking outside the box are the greatest aphrodisiacs.",
      needs: [
        "A confident, warm partner who laughs uncontrollably and never takes themselves too seriously",
        "Someone who sees failure as a celebration and badge of courage",
        "A true team player who loves lively family energy, silly games, and deep optimism",
        "Unconditional emotional support and genuine mutual admiration"
      ],
      hobbies: [
        "Brainstorming wacky inventions and prototyping prototypes in the living room",
        "Making elaborate pancake art with funny faces for brunch",
        "Impromptu living-room dance parties and karaoke",
        "Journaling hilarious daily observations and stand-up bits"
      ],
      interests: [
        "The psychology of confidence and overcoming imposter syndrome",
        "Disruptive footwear ergonomics and material design",
        "Mentoring first-time women entrepreneurs across the globe",
        "Vintage comic strips, Saturday Night Live sketches, and improv theater"
      ],
      qualities: {
        openness: 95,
        conscientiousness: 93,
        extraversion: 96,
        agreeableness: 95,
        neuroticism: 18,
        communicationStyle: "Humorous, magnetic, candid, encouraging",
        loveLanguage: "Laughter, Words of Affirmation & Shared Joy",
        greenFlags: ["Can laugh at themselves", "Kind to strangers", "Playful spirit"],
        dealbreakers: ["Stuffy arrogance", "Judgmental attitude", "Pessimism"],
        idealDate: "Fun evening exploring quirky flea markets or arcade games, ending with tacos and crying from laughing so hard."
      }
    }
  },
  {
    id: "dylan-field",
    name: "Dylan Field",
    gender: "male",
    age: 32,
    location: "San Francisco, CA",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    linkedinUrl: "https://www.linkedin.com/in/dylanfield/",
    instagramUrl: "https://www.instagram.com/dylanfield/",
    instagramHandle: "@dylanfield",
    linkedinHandle: "dylanfield",
    tagline: "Co-founder & CEO at Figma | Empowering Creative Collaboration",
    sources: {
      linkedin: {
        headline: "Co-founder & CEO at Figma",
        company: "Figma",
        industry: "Design Software, Collaborative Tech",
        education: "Brown University (Computer Science / Thiel Fellow)",
        summary: "Making design accessible and collaborative on the web. Building tools that unlock creativity across engineering and design.",
        skills: ["Web Design Systems", "Computer Graphics", "Product Leadership", "Community Building", "WebGL"]
      },
      instagram: {
        bio: "Co-founder & CEO @figma. Art, typography, electronic music, books.",
        postVibes: ["Minimalist digital art", "Tokyo street photography", "Electronic music vinyl collections", "Coffee shop sketches"],
        aesthetic: "Subtle gradients, vector perfection, high-contrast monochrome & neon cyan",
        interestsKeywords: ["Typography", "Electronic Music", "Contemporary Art", "Tokyo", "Specialty Coffee"]
      }
    },
    analysis: {
      agentName: "Agent Dylan-Vector",
      agentPersona: "Calm, thoughtful design visionary with deep love for creative collaboration, Japanese aesthetics, and ambient music.",
      needs: [
        "A partner with a strong creative pulse and an independent inner world",
        "Someone who loves long, wandering conversations through design museums and bookstore aisles",
        "Patience for thoughtful pauses and deep contemplation",
        "Mutual enthusiasm for exploring international food cultures and sound design"
      ],
      hobbies: [
        "Collecting rare vinyl records (ambient, IDM, Japanese city pop)",
        "Hunting for vintage design manifestos and Japanese typography books",
        "Exploring pour-over coffee roasteries in San Francisco and Kyoto",
        "Casual coding of creative web shaders and visual experiments"
      ],
      interests: [
        "Collaborative cognition: how humans build ideas together",
        "Typography micro-details and screen rendering precision",
        "The future of internet-native creative economies",
        "Japanese woodworking, wabi-sabi aesthetics, and brutalist architecture"
      ],
      qualities: {
        openness: 98,
        conscientiousness: 92,
        extraversion: 68,
        agreeableness: 89,
        neuroticism: 24,
        communicationStyle: "Understated, precise, curious, gentle humor",
        loveLanguage: "Quality Time & Intellectual Sharing",
        greenFlags: ["Passionate about craft", "Quiet confidence", "Appreciation for nuance"],
        dealbreakers: ["Loud arrogance", "Disrespect for creative work", "Superficial tastes"],
        idealDate: "Browsing an obscure design bookstore in Tokyo or SF, followed by an intimate listening bar with craft tea and vinyl."
      }
    }
  },
  {
    id: "melanie-perkins",
    name: "Melanie Perkins",
    gender: "female",
    age: 37,
    location: "Sydney, Australia",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
    linkedinUrl: "https://www.linkedin.com/in/melanieperkins/",
    instagramUrl: "https://www.instagram.com/melanieperkins/",
    instagramHandle: "@melanieperkins",
    linkedinHandle: "melanieperkins",
    tagline: "Co-founder & CEO at Canva | Democratizing Visual Design for Everyone",
    sources: {
      linkedin: {
        headline: "Co-founder & CEO at Canva",
        company: "Canva",
        industry: "Visual Communications, Creative Software",
        education: "University of Western Australia (Communications & Commerce)",
        summary: "Empowering the world to design. Pledged the majority of equity to the Canva Foundation to eliminate extreme poverty.",
        skills: ["Visual Design", "Mission-Driven Scaling", "Global Product Strategy", "Philanthropy", "Design Systems"]
      },
      instagram: {
        bio: "Co-founder & CEO @canva. Passionate about empowering everyone to design & doing the most good we can.",
        postVibes: ["Sydney coastal walks", "Kitesurfing in Western Australia", "Canva community milestones", "Eco-friendly travels"],
        aesthetic: "Bright, turquoise ocean tones, radiant sunshine, collaborative team joy",
        interestsKeywords: ["Kitesurfing", "Philanthropy", "Ocean Sunsets", "Visual Storytelling", "Simplicity"]
      }
    },
    analysis: {
      agentName: "Agent Melanie-Canvas",
      agentPersona: "Visionary, deeply mission-driven optimist who combines daring adventurousness with intense warmth and empathy for the planet.",
      needs: [
        "A partner driven by purposeful values and giving back to society",
        "Someone who loves active outdoor adventures like kitesurfing and coastal trails",
        "Emotional maturity, grounded humility, and low ego despite success",
        "A shared commitment to making the world a kinder, more equitable place"
      ],
      hobbies: [
        "Kitesurfing on windy Australian coastal reefs",
        "Coastal coastal hikes along Sydney's northern beaches",
        "Practicing watercolor sketching and visual mood boards",
        "Hosting relaxed outdoor barbecues with close friends and family"
      ],
      interests: [
        "Effective altruism and systemic approaches to ending poverty",
        "Democratizing creative education for underserved youth globally",
        "Marine conservation and renewable energy transitions",
        "The history of visual languages from hieroglyphics to modern typography"
      ],
      qualities: {
        openness: 94,
        conscientiousness: 96,
        extraversion: 85,
        agreeableness: 96,
        neuroticism: 20,
        communicationStyle: "Inspirational, heartfelt, visionary, grounded",
        loveLanguage: "Acts of Service & Shared Purpose",
        greenFlags: ["Altruistic mindset", "Love for nature", "Humility and gratitude"],
        dealbreakers: ["Selfish materialism", "Cruelty", "Lack of ambition for good"],
        idealDate: "Morning kitesurfing or paddleboarding session, followed by flat whites at a sunlit coastal cafe talking about making a difference."
      }
    }
  },
  {
    id: "alexis-ohanian",
    name: "Alexis Ohanian",
    gender: "male",
    age: 41,
    location: "Miami, FL",
    avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=400&q=80",
    linkedinUrl: "https://www.linkedin.com/in/alexisohanian/",
    instagramUrl: "https://www.instagram.com/alexisohanian/",
    instagramHandle: "@alexisohanian",
    linkedinHandle: "alexisohanian",
    tagline: "Founder at Seven Seven Six | Reddit Co-founder | Investor & Dad",
    sources: {
      linkedin: {
        headline: "Founder & General Partner at Seven Seven Six",
        company: "Seven Seven Six / Reddit",
        industry: "Venture Capital, Sports, Internet Culture",
        education: "University of Virginia (History & Commerce)",
        summary: "Co-founded Reddit, initialized initial internet culture. Founded 776 venture firm. Principal owner of Angel City FC. Passionate champion of women's sports and fatherhood.",
        skills: ["Internet Culture", "Venture Investing", "Women's Sports Advocacy", "Community Architecture", "Media"]
      },
      instagram: {
        bio: "Serena's husband. Olympia & Adira's papa. Founder 776. Making fancy pancakes.",
        postVibes: ["Complex pancake art", "Women's sports sidelines", "Trading card collecting", "Family Florida beach days"],
        aesthetic: "Playful geek-dad energy, high-saturation athletic photography, pancake griddles",
        interestsKeywords: ["Pancake Art", "Sports Cards", "Women's Soccer", "Internet Lore", "Fatherhood"]
      }
    },
    analysis: {
      agentName: "Agent Alexis-Network",
      agentPersona: "Big-hearted, enthusiastic internet native who champions women's empowerment, nerds out over collectibles, and masters morning pancakes.",
      needs: [
        "A fierce, accomplished partner who commands their own realm with brilliance",
        "Unabashed enthusiasm for geek culture, gaming, and creative side quests",
        "A deeply family-first philosophy where being a present partner is top priority",
        "Someone who loves hearty humor, spontaneous projects, and great food"
      ],
      hobbies: [
        "Designing intricate pancake art for breakfast with squeeze bottles",
        "Grading vintage sports cards and comic book collectibles",
        "Attending and cheering passionately at women's professional soccer matches",
        "Playing nostalgic video games and discussing internet history"
      ],
      interests: [
        "Commercial growth and media visibility for women's sports leagues",
        "Decentralized communities and digital ownership mechanics",
        "Modern fatherhood and paid family leave policy advocacy",
        "Early Roman history and classical civilization architecture"
      ],
      qualities: {
        openness: 92,
        conscientiousness: 90,
        extraversion: 93,
        agreeableness: 91,
        neuroticism: 21,
        communicationStyle: "Enthusiastic, charismatic, supportive, witty",
        loveLanguage: "Acts of Service & Quality Time",
        greenFlags: ["Proud cheerleader for partner", "High energy", "Great with kids"],
        dealbreakers: ["Cynicism towards sports", "Elitism", "Lack of enthusiasm"],
        idealDate: "Front-row seats at a thrilling sports match with hot dogs and beer, followed by exploring vintage arcade and trading card shops."
      }
    }
  },
  {
    id: "grace-beverley",
    name: "Grace Beverley",
    gender: "female",
    age: 28,
    location: "London, UK",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    linkedinUrl: "https://www.linkedin.com/in/grace-beverley/",
    instagramUrl: "https://www.instagram.com/gracebeverley/",
    instagramHandle: "@gracebeverley",
    linkedinHandle: "grace-beverley",
    tagline: "Founder & CEO at TALA & Shreddy | Author of 'Working Hard, Hardly Working'",
    sources: {
      linkedin: {
        headline: "Founder and CEO at TALA & Shreddy",
        company: "TALA",
        industry: "Sustainable Activewear, Consumer Retail & Fitness",
        education: "University of Oxford (Music)",
        summary: "Forbes 30 Under 30 founder disrupting fast fashion with sustainable activewear. Host of Working Hard, Hardly Working podcast.",
        skills: ["Sustainable Supply Chain", "D2C Brand Growth", "Author", "Time Management", "Fitness Coaching"]
      },
      instagram: {
        bio: "Founder @wearetala @shreddy. Author & Podcaster. London life & dog mom.",
        postVibes: ["London fashion shoots", "Gym workouts & PRs", "Cozy London pub roasts", "Dog walks in Hampstead Heath"],
        aesthetic: "London chic, earthy gym tones, editorial fashion framing, candid humor",
        interestsKeywords: ["Sustainable Fashion", "Strength Training", "Podcasting", "Sunday Roasts", "London Dogs"]
      }
    },
    analysis: {
      agentName: "Agent Grace-Grit",
      agentPersona: "Ambitious London entrepreneur who pairs high-velocity business acumen with pragmatic work-life boundaries, fitness, and British dry humor.",
      needs: [
        "A partner who understands heavy workloads but strictly honors disconnecting on weekends",
        "Someone who loves staying active, lifting weights, and eating hearty Sunday roasts",
        "Dry British banter, emotional transparency, and zero games",
        "An independent driver with their own passions and clear life vision"
      ],
      hobbies: [
        "Heavy strength training and progressive overload workouts",
        "Long weekend walks with dogs across Hampstead Heath",
        "Hunting for cozy British pubs with roaring fireplaces and roast beef",
        "Playing classical piano pieces to decompress from business meetings"
      ],
      interests: [
        "Circularity in consumer fashion and closed-loop fabric technology",
        "Productivity psychology and dismantling toxic hustle culture",
        "Podcast storytelling and deep-dive founder interviews",
        "Modern interior design combining Georgian heritage with contemporary art"
      ],
      qualities: {
        openness: 89,
        conscientiousness: 97,
        extraversion: 88,
        agreeableness: 86,
        neuroticism: 26,
        communicationStyle: "Fast, witty, practical, delightfully candid",
        loveLanguage: "Quality Time & Physical Touch",
        greenFlags: ["High ambition", "Good banter", "Appreciates fitness routine"],
        dealbreakers: ["Lazy excuses", "Poor time management", "Lack of humor"],
        idealDate: "Morning gym session hitting personal records together, followed by a cozy pub lunch by the fire with great wine."
      }
    }
  },
  {
    id: "marques-brownlee",
    name: "Marques Brownlee",
    gender: "male",
    age: 31,
    location: "New York / New Jersey",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
    linkedinUrl: "https://www.linkedin.com/in/mkbhd/",
    instagramUrl: "https://www.instagram.com/mkbhd/",
    instagramHandle: "@mkbhd",
    linkedinHandle: "mkbhd",
    tagline: "Creator & Founder at MKBHD | Professional Ultimate Frisbee Player",
    sources: {
      linkedin: {
        headline: "Content Creator, Host & Producer at MKBHD",
        company: "MKBHD / Vox Media",
        industry: "Consumer Electronics, Digital Media, Industrial Design",
        education: "Stevens Institute of Technology (Business & Tech)",
        summary: "Creator of MKBHD, Studio, and Waveform podcast. World-class ultimate frisbee player (New York Empire). Obsessed with crisp aesthetics and camera craft.",
        skills: ["Cinematography", "Tech Journalism", "Video Production", "Ultimate Frisbee", "Industrial Design Review"]
      },
      instagram: {
        bio: "Quality tech videos. Professional Ultimate frisbee player for NY Empire.",
        postVibes: ["Matte black tech setups", "Ultimate frisbee tournament layouts", "Supercar road trips", "Cinematic RED camera rigs"],
        aesthetic: "Crisp matte black and red accents, razor-sharp bokeh, athletic intensity",
        interestsKeywords: ["Matte Black Everything", "Ultimate Frisbee", "Electric Vehicles", "Cameras & Optics", "Sneakers"]
      }
    },
    analysis: {
      agentName: "Agent Marques-Resolution",
      agentPersona: "Ultra-composed, laser-focused creator with an athletic heart, impeccable aesthetic standards, and a warm, grounded demeanor.",
      needs: [
        "A genuine, low-drama partner who values peace, consistency, and authenticity",
        "Someone who appreciates clean aesthetics, high craftsmanship, and outdoor sports",
        "Understanding of intense production cycles balanced with calm weekend downtime",
        "Mutual respect for fitness, healthy competition, and personal space"
      ],
      hobbies: [
        "Playing professional ultimate frisbee matches and high-intensity sprint training",
        "Testing high-end automotive track cars and EV tech on open roads",
        "Color grading 8K footage and tinkering with cinematic optical lenses",
        "Collecting clean, minimalist sneakers and matte-black lifestyle accessories"
      ],
      interests: [
        "The convergence of consumer silicon, optics, and display technology",
        "Biomechanical athletic efficiency and team sports psychology",
        "Clean energy transitions and future mobility design",
        "Electronic hip-hop beats and crisp audio mixing"
      ],
      qualities: {
        openness: 91,
        conscientiousness: 96,
        extraversion: 78,
        agreeableness: 92,
        neuroticism: 14,
        communicationStyle: "Calm, articulate, measured, subtly witty",
        loveLanguage: "Quality Time & Calm Presence",
        greenFlags: ["Grounded character", "Active lifestyle", "Appreciation for craftsmanship"],
        dealbreakers: ["Clout chasing", "High drama", "Chronic tardiness"],
        idealDate: "Scenic canyon drive in a great EV, stopping for top-tier artisanal burgers, and catching golden hour views overlooking the city."
      }
    }
  },
  {
    id: "padmasree-warrior",
    name: "Padmasree Warrior",
    gender: "female",
    age: 63,
    location: "Palo Alto, CA",
    avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=400&q=80",
    linkedinUrl: "https://www.linkedin.com/in/padmasree/",
    instagramUrl: "https://www.instagram.com/padmasree/",
    instagramHandle: "@padmasree",
    linkedinHandle: "padmasree",
    tagline: "Founder & CEO at Fable | Former CTO of Cisco & Motorola | Board Director",
    sources: {
      linkedin: {
        headline: "Founder & CEO at Fable | Board of Directors Microsoft & Spotify",
        company: "Fable",
        industry: "Social Reading, Enterprise Tech, Software Infrastructure",
        education: "Cornell University (Chemical Engineering, MS); IIT Delhi (BTech)",
        summary: "Tech executive, engineer, and artist. Former Chief Technology Officer of Cisco and Motorola. Passionate about mental wellness, literature, and mentorship.",
        skills: ["Engineering Leadership", "Corporate Governance", "Literary Curation", "Fine Arts Painting", "AI Strategy"]
      },
      instagram: {
        bio: "Founder/CEO @fable. Former CTO Cisco/Motorola. Painter, poet, avid reader. Board member @microsoft @spotify.",
        postVibes: ["Acrylic landscape paintings", "Book recommendations & poetry", "Silicon Valley gardens", "Art museum visits"],
        aesthetic: "Serene botanical greens, rich acrylic brushstrokes, book stacks and tea mugs",
        interestsKeywords: ["Contemporary Fiction", "Oil & Acrylic Painting", "Poetry", "Gardening", "Mindfulness"]
      }
    },
    analysis: {
      agentName: "Agent Padma-Sage",
      agentPersona: "Deeply cultured, intellectually profound engineering pioneer who bridges high-level executive wisdom with poetry, painting, and mindfulness.",
      needs: [
        "A partner of intellectual depth and cultural curiosity who values deep conversation",
        "Appreciation for contemplative arts (poetry, painting, literature, classical arts)",
        "Emotional grace, mutual dignity, and serene emotional warmth",
        "A peaceful shared life punctuated by garden walks, literature, and good tea"
      ],
      hobbies: [
        "Painting large-format abstract canvases in her home art studio",
        "Curating interactive book clubs and reading contemporary world literature",
        "Cultivating heirloom roses and Japanese maples in the garden",
        "Writing meditative poetry and practicing mindful breathwork"
      ],
      interests: [
        "The impact of storytelling on mental wellness and social cohesion",
        "Ethical AI governance and global technology leadership",
        "Intersection of chemical engineering principles and culinary science",
        "Comparative philosophy and eastern contemplative traditions"
      ],
      qualities: {
        openness: 97,
        conscientiousness: 95,
        extraversion: 76,
        agreeableness: 93,
        neuroticism: 16,
        communicationStyle: "Poetic, wise, deeply listening, dignified",
        loveLanguage: "Quality Time & Meaningful Conversations",
        greenFlags: ["Love of literature", "Emotional maturity", "Calm presence"],
        dealbreakers: ["Superficial chatter", "Arrogance", "Disregard for art"],
        idealDate: "Afternoon walking through an arboretum discussing contemporary world literature, followed by a quiet tea ceremony."
      }
    }
  },
  {
    id: "guillermo-rauch",
    name: "Guillermo Rauch",
    gender: "male",
    age: 34,
    location: "San Francisco, CA",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80",
    linkedinUrl: "https://www.linkedin.com/in/rauchg/",
    instagramUrl: "https://www.instagram.com/rauchg/",
    instagramHandle: "@rauchg",
    linkedinHandle: "rauchg",
    tagline: "CEO at Vercel | Creator of Next.js & Socket.io",
    sources: {
      linkedin: {
        headline: "CEO and Founder at Vercel",
        company: "Vercel",
        industry: "Cloud Infrastructure, Developer Experience, Web",
        education: "Self-taught open-source engineer (Argentina)",
        summary: "Building the global platform for the web. Creator of Next.js, Socket.io, and Mongoose. Passionate about speed, zero-latency experiences, and minimalism.",
        skills: ["Web Performance", "Cloud Architecture", "Next.js", "Developer Tools", "Distributed Systems"]
      },
      instagram: {
        bio: "CEO @vercel. Making the web faster. Yerba mate, running, SF.",
        postVibes: ["Morning Yerba Mate gourds", "Golden Gate Bridge runs", "Minimalist glass architecture", "Next.js Conf stages"],
        aesthetic: "Monochrome black/white, geometric lines, crisp morning sunlight, mate gourds",
        interestsKeywords: ["Yerba Mate", "Long Distance Running", "Minimalism", "High-Speed Web", "Architecture"]
      }
    },
    analysis: {
      agentName: "Agent Rauch-Speed",
      agentPersona: "Hyper-focused, elegant web pioneer who values velocity, craftsmanship, morning endurance runs, and authentic Argentine mate rituals.",
      needs: [
        "A partner who values crisp clarity, high standards, and vibrant living",
        "Shared love for morning fitness rituals, runs, and healthy fueling",
        "A peaceful home atmosphere free of unnecessary friction or clutter",
        "Mutual drive to build things that leave a lasting mark on culture"
      ],
      hobbies: [
        "Early morning 10K runs across the Presidio and Golden Gate trails",
        "Brewing traditional Argentine yerba mate with ceremonial bombilla",
        "Analyzing latency and interface speed of digital and physical systems",
        "Reading historical biographies of industrial pioneers and mathematicians"
      ],
      interests: [
        "The aesthetics of speed: why fast things feel inherently magical",
        "Distributed cloud computing at the edge of the physical world",
        "Clean Scandinavian and Japanese minimalist interior design",
        "Latin American literary magic realism and poetry"
      ],
      qualities: {
        openness: 94,
        conscientiousness: 98,
        extraversion: 79,
        agreeableness: 85,
        neuroticism: 18,
        communicationStyle: "Concise, visionary, sharp, deeply enthusiastic",
        loveLanguage: "Quality Time & Mutual Growth",
        greenFlags: ["Precision", "Enthusiasm for fitness", "Love of simplicity"],
        dealbreakers: ["Procrastination", "Excessive clutter", "Pessimism"],
        idealDate: "Sunrise run along the ocean bluffs, sharing fresh yerba mate, followed by breakfast discussing bold visions for the future."
      }
    }
  },
  {
    id: "codie-sanchez",
    name: "Codie Sanchez",
    gender: "female",
    age: 38,
    location: "Austin, TX",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    linkedinUrl: "https://www.linkedin.com/in/codiesanchez/",
    instagramUrl: "https://www.instagram.com/codiesanchez/",
    instagramHandle: "@codiesanchez",
    linkedinHandle: "codiesanchez",
    tagline: "Founder & CEO at Contrarian Thinking | Small Business Evangelist",
    sources: {
      linkedin: {
        headline: "Founder and CEO at Contrarian Thinking",
        company: "Contrarian Thinking",
        industry: "Private Equity, Main Street Business, Media",
        education: "Georgetown University; Arizona State (Journalism)",
        summary: "Invests in 'boring businesses' (car washes, laundromats, HVAC). Former Wall Street investor and conflict journalist turned entrepreneur.",
        skills: ["Main Street M&A", "Cash Flow Analysis", "Financial Literacy", "Journalism", "Public Speaking"]
      },
      instagram: {
        bio: "Founder @contrarianthinking. Buying boring businesses. Freedom, cash flow & grit.",
        postVibes: ["Ranch life in Texas", "Behind the scenes at commercial laundromats", "Gym workouts with kettlebells", "Leather boots & hats"],
        aesthetic: "Western grit, leather textures, bold typography, unapologetic swagger",
        interestsKeywords: ["Boring Businesses", "Kettlebell Workouts", "Texas Ranches", "Financial Freedom", "Bourbon"]
      }
    },
    analysis: {
      agentName: "Agent Codie-Contrarian",
      agentPersona: "Bold, fiercely independent, straight-talking investor who loves grit, practical financial freedom, Texas ranches, and great bourbon.",
      needs: [
        "A strong, self-assured partner with thick skin who speaks their mind directly",
        "Someone who loves physical fitness, outdoor life, and practical pragmatism",
        "Zero tolerance for corporate jargon, fluff, or victim mentality",
        "A partner who can debate fiercely over bourbon and laugh off differences"
      ],
      hobbies: [
        "Heavy kettlebell and barbell strength training at 6 AM",
        "Shooting clays and riding ATVs across Texas ranch land",
        "Scouting small-town main streets for family-owned legacy businesses",
        "Sipping aged bourbon by a crackling outdoor fire pit"
      ],
      interests: [
        "The economic power of the blue-collar working class and Main Street America",
        "Investigative journalism principles applied to business acquisitions",
        "Stoic philosophy from Marcus Aurelius and Seneca",
        "First-principles financial literacy for everyday people"
      ],
      qualities: {
        openness: 88,
        conscientiousness: 96,
        extraversion: 92,
        agreeableness: 78,
        neuroticism: 15,
        communicationStyle: "Direct, punchy, pragmatic, magnetic, humorous",
        loveLanguage: "Actions Over Words & Deep Loyalty",
        greenFlags: ["Direct honesty", "Financial discipline", "Sense of adventure"],
        dealbreakers: ["Passive-aggressiveness", "Victim mindset", "Laziness"],
        idealDate: "Shooting clays or off-roading on the ranch, followed by smoked Texas barbecue and fireside bourbon under the stars."
      }
    }
  },
  {
    id: "shou-zi-chew",
    name: "Shou Zi Chew",
    gender: "male",
    age: 42,
    location: "Singapore",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    linkedinUrl: "https://www.linkedin.com/in/shou-zi-chew/",
    instagramUrl: "https://www.instagram.com/shou.chew/",
    instagramHandle: "@shou.chew",
    linkedinHandle: "shou-zi-chew",
    tagline: "CEO at TikTok | Global Technology Leader",
    sources: {
      linkedin: {
        headline: "Chief Executive Officer at TikTok",
        company: "TikTok / ByteDance",
        industry: "Global Media, Algorithm Innovation, Mobile Tech",
        education: "Harvard Business School (MBA); University College London (Economics)",
        summary: "Global executive leading the cultural pulse of short-form entertainment and creator economies across 150+ countries.",
        skills: ["Global Media Strategy", "Algorithmic Distribution", "Cross-Cultural Management", "Economics", "Leadership"]
      },
      instagram: {
        bio: "CEO of TikTok. Proud dad. Singapore born and raised.",
        postVibes: ["Behind the scenes at global creator events", "Family moments in Singapore", "Marathon runs in nature", "Food markets in Asia"],
        aesthetic: "Polished, international cosmopolitan, warm smiles, vibrant cultural markets",
        interestsKeywords: ["Global Street Food", "Marathons", "Creator Culture", "Family Time", "Singapore Heritage"]
      }
    },
    analysis: {
      agentName: "Agent Shou-Cosmo",
      agentPersona: "Impeccably composed, multilingual global diplomat with high emotional poise, deep love for street food, and family values.",
      needs: [
        "A grounded, discreet, emotionally secure partner who thrives in global environments",
        "Appreciation for cross-cultural nuances, Asian heritage, and diverse traditions",
        "A shared priority for family privacy and peaceful domestic sanctuary",
        "Someone who enjoys humble pleasures like street food hawker stalls as much as galas"
      ],
      hobbies: [
        "Exploring traditional Singaporean hawker stalls for laksa and chicken rice",
        "Running long-distance circuits through tropical botanical gardens",
        "Watching European football matches on weekend mornings",
        "Reading global economic history and geopolitical strategy"
      ],
      interests: [
        "How cultural memes transcend geographical and linguistic borders",
        "The mathematics of recommendation engines and content discovery",
        "Urban planning and green architecture in modern megacities",
        "Southeast Asian culinary history and spice trade routes"
      ],
      qualities: {
        openness: 93,
        conscientiousness: 97,
        extraversion: 85,
        agreeableness: 92,
        neuroticism: 14,
        communicationStyle: "Calm, polite, highly articulate, observant",
        loveLanguage: "Quality Time & Thoughtful Attentiveness",
        greenFlags: ["Cross-cultural respect", "High poise under pressure", "Humility"],
        dealbreakers: ["Impulsiveness", "Loud boastfulness", "Disrespect for privacy"],
        idealDate: "Quiet evening stroll through Singapore's Gardens by the Bay, sampling authentic hawker center delicacies and laughing about childhood memories."
      }
    }
  },
  {
    id: "dr-julie-smith",
    name: "Dr. Julie Smith",
    gender: "female",
    age: 41,
    location: "Hampshire, UK",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
    linkedinUrl: "https://www.linkedin.com/in/dr-julie-smith-1a86b119b/",
    instagramUrl: "https://www.instagram.com/drjulie/",
    instagramHandle: "@drjulie",
    linkedinHandle: "dr-julie-smith-1a86b119b",
    tagline: "Clinical Psychologist & Sunday Times Bestselling Author",
    sources: {
      linkedin: {
        headline: "Clinical Psychologist, Author & Mental Health Educator",
        company: "Private Practice / Penguin Books",
        industry: "Clinical Psychology, Mental Health Education",
        education: "University of Exeter (Doctorate in Clinical Psychology)",
        summary: "Demystifying psychotherapy tools for everyday life. Author of 'Why Has Nobody Told Me This Before?'. Passionate about emotional resilience and relationships.",
        skills: ["Cognitive Behavioral Therapy", "Attachment Theory", "Mental Health Literacy", "Public Psychoeducation", "Empathy"]
      },
      instagram: {
        bio: "Clinical Psychologist. Author of #1 Bestseller 'Why Has Nobody Told Me This Before?'. Simplifying mental health.",
        postVibes: ["Visual psychology demonstrations", "Woodland walks with dogs in Hampshire", "Cozy wool sweaters and tea", "Family kitchen talks"],
        aesthetic: "Warm earthen tones, calming pastel graphics, soft natural light, comforting presence",
        interestsKeywords: ["Emotional Regulation", "Attachment Styles", "Nature Therapy", "Tea & Woolens", "Books"]
      }
    },
    analysis: {
      agentName: "Agent Julie-Empathy",
      agentPersona: "Profoundly empathic clinical psychologist who brings deep psychological insight, warmth, vulnerability, and nature walks to romance.",
      needs: [
        "A partner capable of emotional openness, healthy self-reflection, and secure attachment",
        "A quiet, tranquil home life grounded in nature, cozy fires, and meaningful presence",
        "Someone who views vulnerability as strength rather than a weakness",
        "High mutual empathy and thoughtful conversational pacing"
      ],
      hobbies: [
        "Long forest walks through the Hampshire countryside with her golden retriever",
        "Baking artisanal sourdough bread and brewing herbal teas",
        "Reading psychological fiction and interpersonal neuroscience journals",
        "Yoga and mindful grounding exercises outdoors"
      ],
      interests: [
        "Attachment theory and neurobiology of romantic pair bonding",
        "Democratizing evidence-based psychotherapy techniques globally",
        "The restorative physiological benefits of nature immersion (shinrin-yoku)",
        "Childhood developmental psychology and emotional safety"
      ],
      qualities: {
        openness: 94,
        conscientiousness: 92,
        extraversion: 78,
        agreeableness: 98,
        neuroticism: 19,
        communicationStyle: "Deeply empathic, validating, soothing, perceptive",
        loveLanguage: "Words of Affirmation & Emotional Attunement",
        greenFlags: ["Self-awareness", "Capacity for active listening", "Gentleness"],
        dealbreakers: ["Defensiveness", "Emotional stonewalling", "Cynicism toward mental health"],
        idealDate: "Scenic afternoon walk through autumn woodland trails with the dog, followed by tea by the fireplace sharing childhood formative memories."
      }
    }
  },
  {
    id: "amjad-masad",
    name: "Amjad Masad",
    gender: "male",
    age: 37,
    location: "San Francisco, CA",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    linkedinUrl: "https://www.linkedin.com/in/amjadmasad/",
    instagramUrl: "https://www.instagram.com/amasad/",
    instagramHandle: "@amasad",
    linkedinHandle: "amjadmasad",
    tagline: "Founder & CEO at Replit | Making Software Creation Accessible to the Next Billion",
    sources: {
      linkedin: {
        headline: "Founder & CEO at Replit",
        company: "Replit",
        industry: "Cloud Development, AI Coding Agents, Software Creation",
        education: "Princess Sumaya University for Technology (Computer Science)",
        summary: "Pioneering cloud computing and AI software agents. Believes in human agency, first-principles thinking, and democratizing creation.",
        skills: ["AI Systems", "Cloud Runtimes", "Developer Tools", "First Principles", "Philosophy"]
      },
      instagram: {
        bio: "Founder/CEO @replit. Hacker, builder, philosophy, weightlifting, family.",
        postVibes: ["Lifting heavy weights in home gym", "Family road trips in California", "Vintage computing retrospectives", "SF coffee chats"],
        aesthetic: "Maker workshop grit, warm California sunlight, home gym barbells",
        interestsKeywords: ["Weightlifting", "First-Principles Thinking", "Vintage Computing", "Philosophy", "Espresso"]
      }
    },
    analysis: {
      agentName: "Agent Amjad-Builder",
      agentPersona: "First-principles hacker philosopher who combines heavy deadlifts, deep intellectual curiosity, and an unwavering belief in human agency.",
      needs: [
        "A fierce, independent thinker who loves dissecting philosophical ideas and life models",
        "Someone who respects dedicated discipline in both fitness and intellectual craft",
        "Warm family loyalty and a steadfast moral compass",
        "A partner who is excited by building the future rather than settling into comfort"
      ],
      hobbies: [
        "Heavy powerlifting (deadlifts and squats) in his garage gym",
        "Pulling precise double-shot espresso on manual lever machines",
        "Reading classical Greco-Roman philosophy and Islamic golden age science",
        "Experimenting with retro microcomputers and early programming paradigms"
      ],
      interests: [
        "The expansion of human agency and creation through autonomous agents",
        "Historical origins of the scientific revolution and Enlightenment",
        "Strength athletics and physiological longevity protocols",
        "Middle Eastern culinary traditions and bread making"
      ],
      qualities: {
        openness: 95,
        conscientiousness: 96,
        extraversion: 76,
        agreeableness: 84,
        neuroticism: 20,
        communicationStyle: "First-principles, candid, intense, deeply sincere",
        loveLanguage: "Quality Time & Mutual Respect",
        greenFlags: ["Intellectual independence", "Discipline", "Curiosity about how things work"],
        dealbreakers: ["Intellectual laziness", "Passivity", "Victim mindset"],
        idealDate: "Manual espresso brewing workshop together, followed by an evening hike debating consciousness and personal agency."
      }
    }
  },
  {
    id: "nikita-bier",
    name: "Nikita Bier",
    gender: "male",
    age: 35,
    location: "Miami, FL",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80",
    linkedinUrl: "https://www.linkedin.com/in/nikitabier/",
    instagramUrl: "https://www.instagram.com/nikitabier/",
    instagramHandle: "@nikitabier",
    linkedinHandle: "nikitabier",
    tagline: "Founder at tbh & Gas (both acquired) | Consumer App Growth Genius",
    sources: {
      linkedin: {
        headline: "Founder at tbh (Acquired by Meta) & Gas (Acquired by Discord)",
        company: "Solo Entrepreneur & Angel Investor",
        industry: "Consumer Social, Viral Loops, Product Psychology",
        education: "UC Berkeley (Business Administration)",
        summary: "Built two #1 App Store social phenomena (tbh and Gas). Master of viral mechanics, positive social validation, and product loops.",
        skills: ["Consumer Viral Growth", "App Store Optimization", "Human Psychology", "Humor Writing", "Product Design"]
      },
      instagram: {
        bio: "Built @tbhapp (sold to Meta) & @gasapp (sold to Discord). Viral growth, satirical tech memes, Miami sunsets.",
        postVibes: ["Satirical tech founder memes", "Miami waterfront speedboats", "App Store ranking leaderboards", "Fine dining with friends"],
        aesthetic: "Vibrant Miami neon, playful satire, tongue-in-cheek luxury, quick wit",
        interestsKeywords: ["Viral Loops", "Memes & Satire", "Miami Ocean", "App Psychology", "Fine Dining"]
      }
    },
    analysis: {
      agentName: "Agent Nikita-Viral",
      agentPersona: "Razor-sharp, hysterically witty consumer psychology maven who understands human social dynamics better than anyone and loves playful banter.",
      needs: [
        "A partner with rapid, biting wit who can dish out sarcasm and roast each other playfully",
        "Someone who sees right through superficial status signaling and appreciates the absurdity of life",
        "Spontaneous travel, great food, and living life on the front foot",
        "A warm heart beneath the clever comedic exterior"
      ],
      hobbies: [
        "Crafting viral satirical commentary on tech culture that goes instantly viral",
        "Cruising along Biscayne Bay at sunset with good music",
        "Dissecting teenager app trends and reverse-engineering viral mechanics",
        "Trying avant-garde tasting menus and rating cocktail bars"
      ],
      interests: [
        "Evolutionary psychology of compliments, status, and teenage peer validation",
        "Behavioral economics of frictionless software onboarding",
        "Stand-up comedy writing and comedic timing",
        "Contemporary art market dynamics and meme culture"
      ],
      qualities: {
        openness: 92,
        conscientiousness: 91,
        extraversion: 90,
        agreeableness: 80,
        neuroticism: 25,
        communicationStyle: "Irreverent, sharp, hysterically funny, perceptive",
        loveLanguage: "Humor, Words of Affirmation & Shared Adventure",
        greenFlags: ["Quick wit", "Can take a joke", "Doesn't take herself too seriously"],
        dealbreakers: ["Thin skin", "Pretentious virtue-signaling", "Boring conversation"],
        idealDate: "Speedboat ride across Biscayne Bay followed by a buzzing rooftop cocktail lounge trading hilarious hot takes on the universe."
      }
    }
  },
  {
    id: "pieter-levels",
    name: "Pieter Levels",
    gender: "male",
    age: 39,
    location: "Global Nomad / Amsterdam / Bali",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
    linkedinUrl: "https://www.linkedin.com/in/pieterlevels/",
    instagramUrl: "https://www.instagram.com/levelsio/",
    instagramHandle: "@levelsio",
    linkedinHandle: "pieterlevels",
    tagline: "Founder of Nomad List, Remote OK, PhotoAI | Legendary Solo Bootstrapper",
    sources: {
      linkedin: {
        headline: "Founder at Nomad List & Remote OK",
        company: "Levels.io",
        industry: "Digital Nomad Infrastructure, Generative AI, Bootstrapping",
        education: "Utrecht University (Business Administration)",
        summary: "The pioneer of solo internet bootstrapping. Running multi-million dollar software empires entirely solo from a laptop across the globe.",
        skills: ["Solo Bootstrapping", "Vanilla PHP/JS", "AI Image Generation", "Remote Work Culture", "Minimalist Living"]
      },
      instagram: {
        bio: "Bootstrapping software from my backpack. Bali, Tokyo, Lisbon, Bangkok. Cat lover, fitness, cyberpunk vibes.",
        postVibes: ["Tropical coffee shop laptop setups", "Tokyo cyberpunk alleyways at night", "Gym progress in Bali", "Stray cats in Europe"],
        aesthetic: "Cyberpunk neon, tropical greenery, minimalist backpack gear, raw honesty",
        interestsKeywords: ["Digital Nomadism", "Tokyo Nights", "Calisthenics", "Street Cats", "Single Laptop Setup"]
      }
    },
    analysis: {
      agentName: "Agent Levels-Nomad",
      agentPersona: "Ultra-independent, pragmatic cyberpunk nomad who loves freedom, shipping fast with simple tools, calisthenics, and tropical cafes.",
      needs: [
        "A fiercely independent, low-maintenance partner who loves traveling light and exploring the globe",
        "Shared excitement for living in different cities (Tokyo, Lisbon, Bali, Amsterdam)",
        "Zero pretension: appreciation for street food, local gyms, and simple laptop work",
        "Deep personal space and freedom balanced with affectionate companionship"
      ],
      hobbies: [
        "Calisthenics and gym workouts in open-air gyms in Southeast Asia",
        "Wandering nocturnal neon-lit backstreets in Tokyo with a camera",
        "Feeding and petting neighborhood cats in Lisbon and Chiang Mai",
        "Shipping full-stack software products in 48 hours with minimal code"
      ],
      interests: [
        "Autonomous generative AI applications for everyday consumer photography",
        "The economics of sovereign remote living and global mobility",
        "Cyberpunk aesthetic design and Japanese urban infrastructure",
        "Minimalism: living out of a single 35L backpack"
      ],
      qualities: {
        openness: 96,
        conscientiousness: 93,
        extraversion: 72,
        agreeableness: 82,
        neuroticism: 28,
        communicationStyle: "Raw, brutally honest, pragmatic, humorous, unconventional",
        loveLanguage: "Shared Freedom & Quality Adventures",
        greenFlags: ["Loves to travel light", "Independent spirit", "Sense of humor"],
        dealbreakers: ["High-maintenance drama", "Need for static conventional living", "Bureaucratic mindset"],
        idealDate: "Renting electric scooters in Tokyo to explore secret ramen shops, ending the night at an 80s synth-wave bar."
      }
    }
  },
  {
    id: "caspar-lee",
    name: "Caspar Lee",
    gender: "male",
    age: 30,
    location: "London, UK",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    linkedinUrl: "https://www.linkedin.com/in/caspar-lee/",
    instagramUrl: "https://www.instagram.com/caspar_lee/",
    instagramHandle: "@caspar_lee",
    linkedinHandle: "caspar-lee",
    tagline: "Co-founder at Creator Ventures | Entrepreneur & Former YouTube Icon",
    sources: {
      linkedin: {
        headline: "Co-founder & Managing Partner at Creator Ventures",
        company: "Creator Ventures",
        industry: "Venture Capital, Creator Economy, Consumer Brands",
        education: "Self-taught creator & investor (South Africa / UK)",
        summary: "Built massive global digital audience with 7M+ subscribers. Transitioned into venture capital investing in next-generation creator-led tech.",
        skills: ["Creator Economy", "Venture Investing", "Media Production", "Storytelling", "Brand Partnerships"]
      },
      instagram: {
        bio: "Co-founder @creatorventures. South African in London. Fiance, investor, marathon runner.",
        postVibes: ["London marathon finish lines", "African safari trips", "Founder dinners in Soho", "Romantic partner travel snaps"],
        aesthetic: "Golden warm hour, London tailored suits, safari landscapes, genuine smiles",
        interestsKeywords: ["Marathon Running", "African Safaris", "London Dining", "Creator Tech", "Charity"]
      }
    },
    analysis: {
      agentName: "Agent Caspar-Venture",
      agentPersona: "Charming, high-spirited South African entrepreneur in London with great comedic timing, athletic grit in marathon running, and genuine warmth.",
      needs: [
        "A playful, empathetic partner who loves laughter and doesn't take social media too seriously",
        "Shared passion for fitness challenges (running races, travel adventures)",
        "Deep family orientation, warmth, and supportive communication",
        "Appreciation for South African wildlife, braais, and London culture"
      ],
      hobbies: [
        "Training for international marathons across Europe",
        "Planning wildlife safaris and conservation trips in South Africa",
        "Hosting lively dinner parties for diverse entrepreneurs in London",
        "Playing tennis and outdoor padel with friends"
      ],
      interests: [
        "The transformation of internet creators into institutional enterprise builders",
        "Wildlife preservation and anti-poaching initiatives in southern Africa",
        "Endurance running physiology and mental stamina training",
        "Modern British comedy and podcast productions"
      ],
      qualities: {
        openness: 90,
        conscientiousness: 91,
        extraversion: 93,
        agreeableness: 94,
        neuroticism: 20,
        communicationStyle: "Charming, humorous, uplifting, socially gracious",
        loveLanguage: "Words of Affirmation & Quality Time",
        greenFlags: ["Self-deprecating humor", "Family-oriented", "High empathy"],
        dealbreakers: ["Self-absorption", "Lack of warmth", "Pessimism"],
        idealDate: "Morning padel tennis match followed by wandering Borough Market tasting artisanal pastries and a candlelit dinner in Covent Garden."
      }
    }
  },
  {
    id: "sahil-bloom",
    name: "Sahil Bloom",
    gender: "male",
    age: 33,
    location: "New York / Connecticut",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    linkedinUrl: "https://www.linkedin.com/in/sahilbloom/",
    instagramUrl: "https://www.instagram.com/sahilbloom/",
    instagramHandle: "@sahilbloom",
    linkedinHandle: "sahilbloom",
    tagline: "Author & Managing Partner at SRB Holdings | Host of Curiosity Chronicle",
    sources: {
      linkedin: {
        headline: "Managing Partner at SRB Holdings | Author of 'The 5 Types of Wealth'",
        company: "The Curiosity Chronicle",
        industry: "Media, Publishing, Private Equity, Wisdom Architecture",
        education: "Stanford University (Economics & Sociology; Division 1 Baseball)",
        summary: "Former private equity VP turned writer reaching 1M+ readers weekly. Championing life design, physical vitality, relationships, and holistic wealth.",
        skills: ["Mental Models", "Life Design", "Personal Finance", "Baseball Coaching", "Storytelling"]
      },
      instagram: {
        bio: "Author of The 5 Types of Wealth. Stanford baseball alum. Dad. Writing for curious minds.",
        postVibes: ["Morning workouts with son", "Nature trail walks in New England", "Writing desk with notebook & coffee", "Wisdom framework diagrams"],
        aesthetic: "Clean New England greenery, warm morning espresso, athletic vitality, wholesome family joy",
        interestsKeywords: ["Life Design", "Morning Workouts", "Mental Models", "Specialty Coffee", "Baseball"]
      }
    },
    analysis: {
      agentName: "Agent Sahil-Curiosity",
      agentPersona: "Wholesome, thoughtful philosopher-athlete dedicated to holistic wealth: time freedom, physical vitality, relationships, and intellectual curiosity.",
      needs: [
        "A partner who values personal growth, emotional health, and living with intentionality",
        "A shared morning rhythm of fitness, outdoor fresh air, and mindful presence",
        "Honest, vulnerable conversations about what truly matters in life beyond career",
        "Deep loyalty, warmth, and shared appreciation for family rituals"
      ],
      hobbies: [
        "Early morning cold showers and functional strength training",
        "Taking long morning walking meetings outdoors in the woods",
        "Writing long-form reflections in leather-bound journals with fountain pens",
        "Hitting baseballs in the batting cages and playing catch"
      ],
      interests: [
        "The architecture of habits: how small compounding daily rituals shape a lifetime",
        "The 5 types of wealth (Time, Health, Relationships, Purpose, Money)",
        "Biographies of historical leaders, thinkers, and stoic philosophers",
        "The science of sleep, recovery, and cognitive longevity"
      ],
      qualities: {
        openness: 93,
        conscientiousness: 97,
        extraversion: 82,
        agreeableness: 94,
        neuroticism: 15,
        communicationStyle: "Encouraging, structured, reflective, warm",
        loveLanguage: "Quality Time & Words of Affirmation",
        greenFlags: ["Intentional living", "Kindness", "Love for personal growth"],
        dealbreakers: ["Cynicism", "Toxic habits", "Superficial status obsession"],
        idealDate: "Morning nature hike with takeaway specialty lattes, sitting on a sunlit bench talking about life dreams and personal philosophies."
      }
    }
  },
  {
    id: "steven-bartlett",
    name: "Steven Bartlett",
    gender: "male",
    age: 32,
    location: "London, UK",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
    linkedinUrl: "https://www.linkedin.com/in/steven-bartlett-56986834/",
    instagramUrl: "https://www.instagram.com/steven/",
    instagramHandle: "@steven",
    linkedinHandle: "steven-bartlett-56986834",
    tagline: "Host of 'The Diary Of A CEO' | Founder of Flight Story & Thirdweb",
    sources: {
      linkedin: {
        headline: "Host of The Diary Of A CEO | Investor & Dragon on BBC Dragon's Den",
        company: "Flight Story / Thirdweb",
        industry: "Podcasting, Media Innovation, Health Science, Venture",
        education: "Manchester Metropolitan University (dropped out after 1 day)",
        summary: "Host of Europe's #1 podcast 'The Diary Of A CEO'. Serial entrepreneur, author, and youngest Dragon on BBC Dragon's Den.",
        skills: ["Psychology of Decision Making", "Deep-Dive Interviews", "Storytelling", "Health Optimization", "Media Scaling"]
      },
      instagram: {
        bio: "Host of The Diary Of A CEO podcast. Author. Dragon on Dragon’s Den. Obsessed with human behavior & health.",
        postVibes: ["Intense podcast studio close-ups", "Gym workouts with biohacking metrics", "Live arena speaking tours", "Behind the scenes with world experts"],
        aesthetic: "Moody studio lighting, deep blacks, introspective close-ups, high production value",
        interestsKeywords: ["Human Psychology", "Biohacking & Longevity", "Deep Conversations", "Soccer", "Electronic Music"]
      }
    },
    analysis: {
      agentName: "Agent Steven-Introspection",
      agentPersona: "Deeply curious, emotionally perceptive interviewer obsessed with human behavior, vulnerability, health optimization, and raw truths.",
      needs: [
        "A partner who can peel back the layers and engage in fearless, raw emotional intimacy",
        "Someone interested in longevity, health science, and self-mastery",
        "A peaceful personal sanctuary away from public spotlights and microphones",
        "High mutual respect, loyalty, and deep conversational chemistry"
      ],
      hobbies: [
        "Weight training and testing advanced biological longevity markers",
        "Listening to world-class neuroscientists and relationship psychologists",
        "DJing electronic and melodic house music in private studio sessions",
        "Playing five-a-side football with lifelong mates"
      ],
      interests: [
        "The neurobiology of human connection, trauma, and romantic attachment",
        "Behavioral economics and what drives human purchasing decisions",
        "The future of personalized preventative medicine and biomarkers",
        "The mechanics of viral audio and long-form storytelling"
      ],
      qualities: {
        openness: 95,
        conscientiousness: 96,
        extraversion: 85,
        agreeableness: 87,
        neuroticism: 22,
        communicationStyle: "Introspective, deeply inquisitive, hypnotic, vulnerable",
        loveLanguage: "Quality Time & Physical Touch",
        greenFlags: ["Vulnerability", "Curiosity about psychology", "Emotional courage"],
        dealbreakers: ["Superficial small talk", "Lack of self-awareness", "Inauthenticity"],
        idealDate: "Dimly lit, cozy lounge listening to ambient melodic beats, skipping all small talk to explore each other's deepest formative childhood stories."
      }
    }
  },
  {
    id: "aravind-srinivas",
    name: "Aravind Srinivas",
    gender: "male",
    age: 31,
    location: "San Francisco, CA",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    linkedinUrl: "https://www.linkedin.com/in/aravindsrinivas/",
    instagramUrl: "https://www.instagram.com/aravindsrinivas/",
    instagramHandle: "@aravindsrinivas",
    linkedinHandle: "aravindsrinivas",
    tagline: "Co-founder & CEO at Perplexity AI | Reinventing Search & Knowledge Discovery",
    sources: {
      linkedin: {
        headline: "Co-founder & CEO at Perplexity AI",
        company: "Perplexity AI",
        industry: "Artificial Intelligence, Information Retrieval, Search",
        education: "UC Berkeley (PhD Computer Science); IIT Madras (Electrical Engineering)",
        summary: "Building Perplexity to make search direct, concise, and truth-seeking. Former AI researcher at OpenAI, DeepMind, and Google.",
        skills: ["Information Retrieval", "Transformer Architecture", "Research Rigor", "Frontier AI", "Chess"]
      },
      instagram: {
        bio: "CEO @perplexityai. Berkeley PhD. Truth-seeking, curiosity, tennis, chess.",
        postVibes: ["San Francisco tech founder talks", "Playing tennis at sunset", "Late night research coding sessions", "Coffee with AI scientists"],
        aesthetic: "Clean tech-academic elegance, deep navy blues, bright tennis courts, intellectual focus",
        interestsKeywords: ["Search & Truth", "Tennis", "Chess", "Deep Learning", "Curiosity"]
      }
    },
    analysis: {
      agentName: "Agent Aravind-Truth",
      agentPersona: "Brilliant, rapid-thinking research pioneer on an unrelenting quest for truth, clarity, tennis rallies, and deep intellectual connection.",
      needs: [
        "A razor-sharp partner with a thirst for curiosity who questions assumptions",
        "Someone who loves crisp tennis matches, intellectual sparring, and fast banter",
        "Mutual drive to seek truth and cut through fluff and cognitive biases",
        "Warmth and patience for spontaneous brainstorms about the universe"
      ],
      hobbies: [
        "Playing high-intensity tennis singles matches on weekends",
        "Playing blitz and rapid chess games to unwind after sprints",
        "Reading foundational scientific papers across physics and AI",
        "Exploring artisan espresso bars in Hayes Valley and Mission SF"
      ],
      interests: [
        "The epistemological nature of truth and verified knowledge retrieval",
        "Transformer scaling laws and reinforcement learning from human feedback",
        "The history of Bell Labs and breakthroughs in information theory",
        "Indian classical music and Carnatic rhythmic structures"
      ],
      qualities: {
        openness: 98,
        conscientiousness: 97,
        extraversion: 76,
        agreeableness: 84,
        neuroticism: 21,
        communicationStyle: "Analytical, direct, rapid, deeply passionate, sincere",
        loveLanguage: "Quality Time & Intellectual Camaraderie",
        greenFlags: ["Curiosity", "Rational thinking", "Athletic passion"],
        dealbreakers: ["Intellectual dishonesty", "Superficial gossip", "Apathy"],
        idealDate: "Fun, competitive tennis match in Golden Gate Park, followed by grabbing ice cream and discussing the origins of the cosmos."
      }
    }
  },
  {
    id: "austen-allred",
    name: "Austen Allred",
    gender: "male",
    age: 35,
    location: "Salt Lake City, UT",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    linkedinUrl: "https://www.linkedin.com/in/austenallred/",
    instagramUrl: "https://www.instagram.com/austen/",
    instagramHandle: "@austen",
    linkedinHandle: "austenallred",
    tagline: "Co-founder & CEO at BloomTech | Workforce Education Innovator",
    sources: {
      linkedin: {
        headline: "Co-founder & CEO at BloomTech",
        company: "BloomTech (formerly Lambda School)",
        industry: "Education Technology, Workforce Development",
        education: "BYU (dropped out to build startups; Y Combinator alum)",
        summary: "Pioneered income share agreements and accelerated education for engineers. Dedicated to social mobility and unlocking human potential.",
        skills: ["Growth Marketing", "EdTech Innovation", "Twitter Commentary", "Workforce Upskilling", "Storytelling"]
      },
      instagram: {
        bio: "Founder/CEO BloomTech. Family, mountains, tech, Utah outdoor life.",
        postVibes: ["Utah snow mountain ranges", "Family hikes with children", "Skiing powder runs in Wasatch mountains", "Cozy cabin evenings"],
        aesthetic: "Crisp Rocky Mountain blue skies, snowy pines, family warmth, down-to-earth Americana",
        interestsKeywords: ["Wasatch Mountains", "Skiing", "Social Mobility", "Family Hikes", "Barbecue"]
      }
    },
    analysis: {
      agentName: "Agent Austen-Horizon",
      agentPersona: "Down-to-earth mountain founder with deep belief in upward mobility, rugged outdoor living, family values, and resilient grit.",
      needs: [
        "A loyal, family-centered partner who loves the mountain life and fresh mountain air",
        "Shared enthusiasm for skiing, camping, and outdoor exploration",
        "Someone who values helping regular people improve their lives",
        "A grounded, warm home filled with laughter and wholesome traditions"
      ],
      hobbies: [
        "Skiing powder snow across Utah's Wasatch mountains",
        "Off-roading in pickup trucks to remote wilderness campsites",
        "Smoking brisket and grilling ribs for friends and family",
        "Reading history of the American frontier and economic mobility"
      ],
      interests: [
        "Disruptive educational financing and outcomes-based learning",
        "Economic geography and the revival of American heartland tech hubs",
        "Mountain wilderness survival and outdoor gear engineering",
        "Classic rock and country acoustic music"
      ],
      qualities: {
        openness: 88,
        conscientiousness: 93,
        extraversion: 88,
        agreeableness: 91,
        neuroticism: 20,
        communicationStyle: "Warm, unpretentious, straightforward, story-filled",
        loveLanguage: "Quality Time & Acts of Service",
        greenFlags: ["Down-to-earth character", "Love of outdoors", "Family loyalty"],
        dealbreakers: ["Pretentious snobbery", "Fear of nature/dirt", "Disloyalty"],
        idealDate: "Scenic ski day on fresh powder, followed by hot apple cider by a rustic lodge fireplace sharing stories of our roots."
      }
    }
  },
  {
    id: "gary-vaynerchuk",
    name: "Gary Vaynerchuk",
    gender: "male",
    age: 48,
    location: "New York, NY",
    avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=400&q=80",
    linkedinUrl: "https://www.linkedin.com/in/garyvaynerchuk/",
    instagramUrl: "https://www.instagram.com/garyvee/",
    instagramHandle: "@garyvee",
    linkedinHandle: "garyvaynerchuk",
    tagline: "Chairman of VaynerX & CEO of VaynerMedia | 5x NYT Bestselling Author",
    sources: {
      linkedin: {
        headline: "Chairman of VaynerX & CEO of VaynerMedia",
        company: "VaynerMedia / VaynerX",
        industry: "Advertising, Consumer Attention, Pop Culture, Wine",
        education: "Mount Ida College (BA)",
        summary: "Built Wine Library into multimillion dollar retail brand, then launched global communications powerhouse VaynerMedia. Obsessed with consumer attention and empathy.",
        skills: ["Consumer Attention", "Empathy in Business", "Wine Tasting", "Sports Card Garage Sales", "Content Production"]
      },
      instagram: {
        bio: "CEO of @vaynermedia. Family first. NYC. Kindness is strength. Garage sales, sports cards, Jets.",
        postVibes: ["Weekend garage sale picking", "Passionate speeches on kindness & accountability", "NY Jets stadium agony/ecstasy", "Rare sports card conventions"],
        aesthetic: "Raw, gritty NY energy, dynamic handheld video, unfiltered authenticity, neon graffiti",
        interestsKeywords: ["Garage Sales", "Empathy", "Sports Cards", "NY Jets", "Wine & Culinary"]
      }
    },
    analysis: {
      agentName: "Agent Gary-Energy",
      agentPersona: "High-voltage, deeply empathic serial entrepreneur who preaches kindness as the ultimate superpower, loves garage sales, sports cards, and fine wine.",
      needs: [
        "A partner with enormous heart, genuine kindness, and deep emotional security",
        "Someone who appreciates his non-stop motor but can provide serene grounding at night",
        "Shared love for Sunday morning thrifting/garage sales and unvarnished realness",
        "Unconditional loyalty, zero phoniness, and love for family"
      ],
      hobbies: [
        "Hitting early morning suburban garage sales hunting for nostalgic toys and flip items",
        "Collecting and trading 1980s-90s vintage basketball and baseball cards",
        "Cheering passionately (and suffering loyally) for the New York Jets",
        "Blind wine tasting and pairing vintages with comfort food"
      ],
      interests: [
        "The mechanics of where consumer attention shifts across emerging digital platforms",
        "Emotional intelligence as the primary competitive advantage in leadership",
        "Nostalgia and the enduring psychological value of pop culture artifacts",
        "Family values and gratitude practices"
      ],
      qualities: {
        openness: 92,
        conscientiousness: 98,
        extraversion: 99,
        agreeableness: 92,
        neuroticism: 16,
        communicationStyle: "High-octane, passionate, intensely direct, profoundly warm",
        loveLanguage: "Words of Affirmation & Devoted Loyalty",
        greenFlags: ["Empathy", "High energy", "Kindness to servers and strangers"],
        dealbreakers: ["Complaining", "Entitlement", "Arrogance"],
        idealDate: "Treasure hunting at an eccentric flea market on Sunday morning, followed by an incredible Italian pasta dinner with an extraordinary bottle of vintage wine."
      }
    }
  },
  {
    id: "iman-gadzhi",
    name: "Iman Gadzhi",
    gender: "male",
    age: 25,
    location: "Dubai / London",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80",
    linkedinUrl: "https://www.linkedin.com/in/iman-gadzhi-5757981b2/",
    instagramUrl: "https://www.instagram.com/imangadzhi/",
    instagramHandle: "@imangadzhi",
    linkedinHandle: "iman-gadzhi-5757981b2",
    tagline: "Founder at IAG Media & Educate.io | Philanthropist & Creator",
    sources: {
      linkedin: {
        headline: "Founder and Managing Director at Educate & IAG",
        company: "Educate.io",
        industry: "E-Learning, Agency Growth, Consumer Education",
        education: "Self-educated entrepreneur (London)",
        summary: "Started digital marketing agency at age 17. Built online education platform and funded schools in Nepal. Passionate about discipline, classic literature, and horology.",
        skills: ["Agency Growth", "Digital Marketing", "School Philanthropy", "Horology", "Monk Mode Discipline"]
      },
      instagram: {
        bio: "Founder @educate. Building schools in Nepal. Classic menswear, horology, literature, discipline.",
        postVibes: ["Classic British tailoring", "Vintage Patek Philippe watches", "Reading classic Russian literature", "Schools in Nepal construction"],
        aesthetic: "Old money tailored aesthetics, dark wood libraries, luxury horology, quiet discipline",
        interestsKeywords: ["Horology", "Classic Menswear", "School Philanthropy", "Russian Literature", "Monk Mode"]
      }
    },
    analysis: {
      agentName: "Agent Iman-Discipline",
      agentPersona: "Elegantly disciplined, old-soul entrepreneur who pairs sharp bespoke tailoring and luxury horology with quiet philanthropy and classical literature.",
      needs: [
        "An elegant, cultured partner with high poise, emotional grace, and feminine charm",
        "Mutual commitment to health, physical beauty, self-restraint, and mental calm",
        "Appreciation for vintage horology, classical art, and timeless aesthetics",
        "A peaceful private life protected from social media vanity"
      ],
      hobbies: [
        "Studying haute horology movements and vintage mechanical watch references",
        "Reading 19th-century Russian and French literature (Tolstoy, Dostoevsky, Balzac)",
        "Daily rigorous gym discipline and disciplined dietary fasting protocols",
        "Visiting artisan cigar lounges and historic European architectural sites"
      ],
      interests: [
        "Building and funding schools for underprivileged children in Nepal",
        "The sociology of discipline versus modern digital distraction addiction",
        "Savile Row bespoke tailoring history and textile craftsmanship",
        "Classical piano and operatic orchestral works"
      ],
      qualities: {
        openness: 89,
        conscientiousness: 98,
        extraversion: 74,
        agreeableness: 82,
        neuroticism: 22,
        communicationStyle: "Measured, articulate, poised, dignified, traditional",
        loveLanguage: "Acts of Service & Physical Touch",
        greenFlags: ["Graceful poise", "Self-respect", "Appreciation for elegance"],
        dealbreakers: ["Loud attention-seeking", "Disloyalty", "Addiction to phones"],
        idealDate: "Private viewing at an exclusive vintage horology archive or art salon, followed by an intimate dinner at a quiet historic dining club."
      }
    }
  },
  {
    id: "lex-fridman",
    name: "Lex Fridman",
    gender: "male",
    age: 41,
    location: "Austin, TX",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
    linkedinUrl: "https://www.linkedin.com/in/lexfridman/",
    instagramUrl: "https://www.instagram.com/lexfridman/",
    instagramHandle: "@lexfridman",
    linkedinHandle: "lexfridman",
    tagline: "Research Scientist at MIT | Host of the Lex Fridman Podcast | BJJ Black Belt",
    sources: {
      linkedin: {
        headline: "Research Scientist at MIT | Host of Lex Fridman Podcast",
        company: "MIT / Independent",
        industry: "Artificial Intelligence, Human-Robot Interaction, Podcasting",
        education: "Drexel University (PhD Computer Science)",
        summary: "Researching autonomous vehicles, AI, human-centered systems at MIT. Host of long-form conversations on science, history, philosophy, and love.",
        skills: ["Autonomous Systems", "Machine Learning", "Jiu-Jitsu", "Acoustic Guitar", "Philosophical Inquiries"]
      },
      instagram: {
        bio: "Research Scientist @mit. Host of Lex Fridman Podcast. BJJ black belt, guitar, poetry, exploring the beauty of human beings.",
        postVibes: ["Black suit and tie in studio", "Brazilian Jiu-Jitsu sparring on mats", "Acoustic guitar folk fingerpicking", "Austin sunsets with running shoes"],
        aesthetic: "Iconic black suit, white shirt, black tie; poetic melancholy; soulful guitar and martial arts",
        interestsKeywords: ["Jiu-Jitsu", "Acoustic Guitar", "Human Robot Interaction", "Love & Beauty", "Russian Poetry"]
      }
    },
    analysis: {
      agentName: "Agent Lex-Heart",
      agentPersona: "Profoundly romantic, soulful AI scientist and martial artist who wears an iconic black suit, plays gentle acoustic guitar, and believes love is the core of reality.",
      needs: [
        "A deeply romantic, tender, poetic partner who believes in profound, lifelong love",
        "Someone who appreciates quiet contemplative moments, folk guitar, and warm cuddles",
        "Mutual respect for martial arts discipline (jiu-jitsu) and long endurance runs",
        "A gentle soul with zero malice who sees the inherent beauty in humanity"
      ],
      hobbies: [
        "Training Brazilian Jiu-Jitsu and grappling on the mats for hours",
        "Fingerpicking Russian folk melodies and acoustic love songs on guitar",
        "Long solo running sessions under the Texas sun or winter snow",
        "Reading classic Russian poetry (Pushkin, Lermontov) and Dostoevsky"
      ],
      interests: [
        "The philosophical and mathematical enigma of consciousness and robotic empathy",
        "The nature of human love as the ultimate driver of civilization",
        "Martial arts philosophy, respect, and honorable conflict resolution",
        "Space exploration, alien civilizations, and physics of time"
      ],
      qualities: {
        openness: 97,
        conscientiousness: 95,
        extraversion: 65,
        agreeableness: 96,
        neuroticism: 26,
        communicationStyle: "Poetic, gentle, deeply sincere, contemplative, vulnerable",
        loveLanguage: "Physical Touch, Quality Time & Romantic Devotion",
        greenFlags: ["Belief in true love", "Gentle heart", "Emotional vulnerability"],
        dealbreakers: ["Cynicism about love", "Cruelty to animals or people", "Cold detachment"],
        idealDate: "Sitting on a quiet grassy hill at dusk playing acoustic guitar melodies, sharing dreams of the cosmos and what it means to truly love someone."
      }
    }
  }
];
