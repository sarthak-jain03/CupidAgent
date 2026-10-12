// Dating Simulation Engine: generates multi-turn agent dating dialogue,
// inner monologues, dynamic compatibility scoring, and mutual rankings.

export const VENUES = [
  {
    id: "rooftop-skylounge",
    name: "The Velvet Skylounge",
    location: "Manhattan, NYC",
    vibe: "Soft jazz, panoramic skyline lights, bespoke elderflower cocktails",
    backdrop: "linear-gradient(135deg, rgba(20,20,35,0.95), rgba(40,25,60,0.95))"
  },
  {
    id: "vinyl-cafe",
    name: "Acoustic Vinyl & Pour-Over Bar",
    location: "Shibuya, Tokyo",
    vibe: "Warm vintage McIntosh tube amps, Japanese city pop, single-origin Ethiopian coffee",
    backdrop: "linear-gradient(135deg, rgba(30,25,20,0.95), rgba(50,35,25,0.95))"
  },
  {
    id: "botanical-conservatory",
    name: "The Glass Palm House",
    location: "San Francisco, CA",
    vibe: "Candlelit orchid pavilions, humid tropical greenery, natural pet-nat wines",
    backdrop: "linear-gradient(135deg, rgba(15,30,25,0.95), rgba(25,50,40,0.95))"
  },
  {
    id: "sunset-ocean-deck",
    name: "Pacific Cliffside Deck",
    location: "Malibu, CA",
    vibe: "Pacific breeze, roaring beach fire pit, fresh oysters and smoky mezcal",
    backdrop: "linear-gradient(135deg, rgba(35,20,25,0.95), rgba(65,30,45,0.95))"
  },
  {
    id: "underground-jazz",
    name: "Le Caveau Secret",
    location: "Saint-Germain, Paris",
    vibe: "Intimate stone arches, double bass improvisations, vintage Bordeaux wine",
    backdrop: "linear-gradient(135deg, rgba(25,18,22,0.95), rgba(45,28,38,0.95))"
  }
];

// Helper to calculate affinity score between two agents
export function calculateCompatibility(personA, personB) {
  if (personA.id === personB.id) return { overallCompatibility: 0 };

  const qA = personA.analysis.qualities;
  const qB = personB.analysis.qualities;

  // 1. Psychological & personality complementary resonance
  const opennessResonance = 100 - Math.abs(qA.openness - qB.openness) * 0.4;
  const conscientiousnessFit = 100 - Math.abs(qA.conscientiousness - qB.conscientiousness) * 0.35;
  const extraversionBalance = 85 + (Math.abs(qA.extraversion - qB.extraversion) < 25 ? 10 : 0);
  const agreeablenessResonance = (qA.agreeableness + qB.agreeableness) / 2;

  // 2. Lifestyle & Instagram hobbies overlap
  const hobbiesA = (personA.analysis.hobbies || []).map(h => h.toLowerCase());
  const hobbiesB = (personB.analysis.hobbies || []).map(h => h.toLowerCase());

  let sharedHobbyCount = 0;
  for (const hA of hobbiesA) {
    for (const hB of hobbiesB) {
      const wordsA = hA.split(/\s+/).filter(w => w.length > 3);
      if (wordsA.some(w => hB.includes(w))) {
        sharedHobbyCount++;
        break;
      }
    }
  }

  const lifestyleFit = Math.min(98, Math.max(62, Math.round(72 + sharedHobbyCount * 7.5 + (Math.sin(personA.name.length + personB.name.length) * 5))));

  // 3. Ambition & LinkedIn career synergy
  const indA = (personA.sources?.linkedin?.industry || '').toLowerCase();
  const indB = (personB.sources?.linkedin?.industry || '').toLowerCase();
  const industrySynergyBonus = indA.split(' ').some(w => w.length > 4 && indB.includes(w)) ? 8 : 3;

  const ambitionSynergy = Math.min(99, Math.max(65, Math.round(76 + industrySynergyBonus + (qA.conscientiousness + qB.conscientiousness) * 0.08)));

  // 4. Conversational chemistry
  // Hash-based deterministic variance to keep pairs unique yet consistent
  const pairHash = Math.abs(
    (personA.id.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0) * 31) ^
    (personB.id.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0) * 17)
  );

  const chemistryNoise = (pairHash % 19) - 8;
  const chemistryScore = Math.min(99, Math.max(58, Math.round(74 + chemistryNoise + (qA.openness + qB.openness) * 0.08)));

  // 5. Value alignment
  const valueAlignment = Math.min(98, Math.max(64, Math.round((opennessResonance + conscientiousnessFit + agreeablenessResonance) / 3)));

  // Weighted overall compatibility
  const overallCompatibility = Math.round(
    lifestyleFit * 0.28 +
    ambitionSynergy * 0.24 +
    chemistryScore * 0.28 +
    valueAlignment * 0.20
  );

  let verdict = "Polite Divergence 🍂";
  if (overallCompatibility >= 87) {
    verdict = "Spark! Second Date Confirmed 🥂";
  } else if (overallCompatibility >= 76) {
    verdict = "Strong Intellectual Connection ☕";
  }

  // Derive shared topics
  const sharedTopics = [];
  if (sharedHobbyCount > 0) {
    sharedTopics.push("Shared outdoor & aesthetic lifestyle rituals");
  }
  if (indA || indB) {
    sharedTopics.push("High-agency entrepreneurship and creative craft");
  }
  sharedTopics.push("Mindful habits and balancing high performance with inner peace");

  const frictionPoints = overallCompatibility < 80
    ? ["Pacing differences in personal downtime vs career intensity", "Varying communication styles under pressure"]
    : ["Playful debates over creative philosophies and city living preferences"];

  return {
    overallCompatibility,
    lifestyleFit,
    ambitionSynergy,
    chemistryScore,
    valueAlignment,
    verdict,
    mutualSpark: overallCompatibility >= 85,
    sharedTopics,
    frictionPoints,
  };
}

// Generate realistic multi-round date dialogue between two agents
export function simulateDateConversation(personA, personB, venueId = null) {
  const venue = VENUES.find(v => v.id === venueId) || VENUES[0];
  const compat = calculateCompatibility(personA, personB);

  const nameA = personA.name.split(' ')[0];
  const nameB = personB.name.split(' ')[0];

  const agentAName = personA.analysis?.agentName || `Agent ${nameA}`;
  const agentBName = personB.analysis?.agentName || `Agent ${nameB}`;

  const hobbyA = (personA.analysis?.hobbies && personA.analysis.hobbies[0]) || "crafting creative ideas";
  const hobbyB = (personB.analysis?.hobbies && personB.analysis.hobbies[0]) || "weekend adventures";

  const needA = (personA.analysis?.needs && personA.analysis.needs[0]) || "genuine emotional presence";
  const needB = (personB.analysis?.needs && personB.analysis.needs[0]) || "mutual intellectual respect";

  const companyA = personA.sources?.linkedin?.company || "their creative ventures";
  const companyB = personB.sources?.linkedin?.company || "their company";

  const isHighChemistry = compat.overallCompatibility >= 82;

  const dialogue = [
    {
      turn: 1,
      speaker: nameA,
      speakerId: personA.id,
      agentName: agentAName,
      avatar: personA.avatar,
      phase: "Arrival & First Impression",
      text: `Hey ${nameB}, it's wonderful to meet you in person! I have to say, ${venue.name} was an inspired choice—the ${venue.vibe.toLowerCase().split(',')[0]} sets an incredible tone for the evening.`,
      emotion: "warm",
      internalThought: `Agent ${nameA} Observation: Reading ${nameB}'s body language and presence. There's an unmistakable poise here that matches what I synthesized from their background.`,
      chemistryTick: compat.chemistryScore - 8
    },
    {
      turn: 2,
      speaker: nameB,
      speakerId: personB.id,
      agentName: agentBName,
      avatar: personB.avatar,
      phase: "Arrival & First Impression",
      text: `The pleasure is mine, ${nameA}! I was really looking forward to this. When my agent flagged your passion for ${hobbyA.toLowerCase()}, I knew this wouldn't be just another routine evening.`,
      emotion: "intrigued",
      internalThought: `Agent ${nameB} Calculation: Direct eye contact, warm vocal modulation. They don't hide behind a persona—authenticity index scored at 94%.`,
      chemistryTick: compat.chemistryScore - 5
    },
    {
      turn: 3,
      speaker: nameA,
      speakerId: personA.id,
      agentName: agentAName,
      avatar: personA.avatar,
      phase: "Lifestyle & Instagram Deep-Dive",
      text: `Haha, guilty as charged! But looking at your world, I noticed you're deeply into ${hobbyB.toLowerCase()}. What drew you into that? Is it a way to decompress from everything at ${companyB}?`,
      emotion: "playful",
      internalThought: `Agent ${nameA} Analysis: Probing how they recharge. My person needs someone who can detach from relentless hustle and savor genuine offline rituals.`,
      chemistryTick: compat.chemistryScore - 2
    },
    {
      turn: 4,
      speaker: nameB,
      speakerId: personB.id,
      agentName: agentBName,
      avatar: personB.avatar,
      phase: "Lifestyle & Instagram Deep-Dive",
      text: `Completely. In our world, if you don't fiercely protect your offline sanctuary, the noise consumes you. For me, it's about grounding—feeling the physical world, whether it's through travel, sound, or physical craft. How do you maintain that balance with ${companyA}?`,
      emotion: "reflective",
      internalThought: `Agent ${nameB} Evaluation: Their question wasn't superficial. High lifestyle alignment detected. They understand that peak performance requires restorative stillness.`,
      chemistryTick: compat.chemistryScore + 1
    },
    {
      turn: 5,
      speaker: nameA,
      speakerId: personA.id,
      agentName: agentAName,
      avatar: personA.avatar,
      phase: "Ambition, Values & LinkedIn Synthesis",
      text: `It took me years to learn, honestly. Early on you think non-stop velocity is the only metric. Now I realize true luxury is intentionality. At the end of the day, what I crave most in a partner is ${needA.toLowerCase()}.`,
      emotion: isHighChemistry ? "vulnerable" : "thoughtful",
      internalThought: `Agent ${nameA} Vulnerability Check: Shared core need safely. Monitoring response for deflection vs genuine resonance.`,
      chemistryTick: compat.chemistryScore + 4
    },
    {
      turn: 6,
      speaker: nameB,
      speakerId: personB.id,
      agentName: agentBName,
      avatar: personB.avatar,
      phase: "Ambition, Values & LinkedIn Synthesis",
      text: `That hits home so deeply, ${nameA}. So many people in our circles want the trophy without the depth. For me, having ${needB.toLowerCase()} is non-negotiable. Being able to strip away all titles and just be two curious humans over dinner... that's rare.`,
      emotion: isHighChemistry ? "enamored" : "respectful",
      internalThought: `Agent ${nameB} Synergy Score: High emotional resonance. Mutual vulnerability established without posturing.`,
      chemistryTick: compat.chemistryScore + 6
    },
    {
      turn: 7,
      speaker: nameA,
      speakerId: personA.id,
      agentName: agentAName,
      avatar: personA.avatar,
      phase: "Banter & Chemistry Test",
      text: isHighChemistry
        ? `So tell me the truth—if we snuck out of here right now, are we grabbing late-night street food or finding an obscure record lounge to critique vinyl tracks until 2 AM?`
        : `I'm curious: when you're completely exhausted from a hard week, what is the one comfort meal or guilty pleasure you refuse to apologize for?`,
      emotion: "flirty",
      internalThought: `Agent ${nameA} Playfulness Probe: Testing humor responsiveness and spontaneous adaptability.`,
      chemistryTick: compat.chemistryScore + 8
    },
    {
      turn: 8,
      speaker: nameB,
      speakerId: personB.id,
      agentName: agentBName,
      avatar: personB.avatar,
      phase: "Banter & Chemistry Test",
      text: isHighChemistry
        ? `Why choose? We hit the street food stall first, grab two takeaway skewers, and then sneak into the listening lounge. And I get first pick on the turntable.`
        : `Homemade sourdough grilled cheese with way too much aged cheddar, accompanied by a ridiculously nerdy documentary. No contest!`,
      emotion: "laughing",
      internalThought: `Agent ${nameB} Banter Metric: Chemistry peak reached. Spark confirmed. High playful banter compatibility.`,
      chemistryTick: compat.chemistryScore
    },
    {
      turn: 9,
      speaker: nameA,
      speakerId: personA.id,
      agentName: agentAName,
      avatar: personA.avatar,
      phase: "Parting & Verdict",
      text: isHighChemistry
        ? `Deal. You have yourself a date for round two. This flew by, ${nameB}. I haven't laughed or connected like this in a very long time.`
        : `I've really enjoyed our conversation, ${nameB}. Your perspective on craft and living intentionally is something I truly respect.`,
      emotion: isHighChemistry ? "enamored" : "warm",
      internalThought: `Agent ${nameA} Final Verdict: Recommendation to ${personA.name}: Prioritize this candidate. Compatibility exceeds 85th percentile threshold.`,
      chemistryTick: compat.overallCompatibility
    },
    {
      turn: 10,
      speaker: nameB,
      speakerId: personB.id,
      agentName: agentBName,
      avatar: personB.avatar,
      phase: "Parting & Verdict",
      text: isHighChemistry
        ? `Same here, ${nameA}. Let's make that vinyl and late-night food crawl happen very soon. Goodnight!`
        : `Likewise, ${nameA}. It was a pleasure sharing ideas with you tonight. Have a safe journey home!`,
      emotion: isHighChemistry ? "radiant" : "pleasant",
      internalThought: `Agent ${nameB} Final Verdict: Recommendation to ${personB.name}: Second date strongly endorsed. Mutual affinity confirmed.`,
      chemistryTick: compat.overallCompatibility
    }
  ];

  const agentAQuote = isHighChemistry
    ? `"${nameB} effortlessly combined intellectual depth with spontaneous wit. The way their eyes lit up discussing ${hobbyB.toLowerCase()} felt completely authentic."`
    : `"${nameB} is undeniably brilliant and accomplished. We share deep respect for craft, though our lifestyle paces may diverge slightly in the day-to-day."`;

  const agentBQuote = isHighChemistry
    ? `"${nameA} made me completely forget about work within five minutes. Zero posturing, great conversational rhythm, and genuine emotional maturity."`
    : `"A truly stimulating conversation with ${nameA}. We hold high mutual admiration, making this an inspiring encounter."`;

  return {
    dateId: `date-${personA.id}-${personB.id}-${Date.now()}`,
    venue,
    participants: {
      personA: {
        id: personA.id,
        name: personA.name,
        avatar: personA.avatar,
        agentName: agentAName,
        headline: personA.tagline,
      },
      personB: {
        id: personB.id,
        name: personB.name,
        avatar: personB.avatar,
        agentName: agentBName,
        headline: personB.tagline,
      }
    },
    dialogue,
    evaluation: {
      ...compat,
      agentAQuote,
      agentBQuote,
      venueName: venue.name,
      timestamp: new Date().toISOString(),
    }
  };
}

// Compute full ranking list for a specific person against all other candidates
export function computeRankingsForPerson(targetPerson, allPeople) {
  const candidates = allPeople.filter(p => p.id !== targetPerson.id);

  const rankedList = candidates.map(candidate => {
    const scoreData = calculateCompatibility(targetPerson, candidate);
    return {
      candidate: {
        id: candidate.id,
        name: candidate.name,
        age: candidate.age,
        location: candidate.location,
        avatar: candidate.avatar,
        tagline: candidate.tagline,
        linkedinUrl: candidate.linkedinUrl,
        instagramUrl: candidate.instagramUrl,
        agentName: candidate.analysis?.agentName || `Agent ${candidate.name}`,
        topHobbies: (candidate.analysis?.hobbies || []).slice(0, 2),
      },
      ...scoreData,
      matchReason: generateMatchReason(targetPerson, candidate, scoreData.overallCompatibility)
    };
  });

  // Sort descending by overallCompatibility
  rankedList.sort((a, b) => b.overallCompatibility - a.overallCompatibility);

  // Assign ranks 1 to N
  return rankedList.map((item, index) => ({
    rank: index + 1,
    ...item
  }));
}

// Generate concise explanation for why candidate fits targetPerson
function generateMatchReason(personA, personB, score) {
  const nameA = personA.name.split(' ')[0];
  const nameB = personB.name.split(' ')[0];
  const indA = personA.sources?.linkedin?.industry || 'tech & creative innovation';
  const indB = personB.sources?.linkedin?.industry || 'lifestyle & entrepreneurship';

  if (score >= 88) {
    return `Exceptional dual-source synergy: Shared high-agency mindset from LinkedIn (${indA} & ${indB}) seamlessly fuses with complementary Instagram lifestyle rhythms and emotional openness.`;
  }
  if (score >= 80) {
    return `High intellectual resonance and strong creative appreciation. Both agents identified mutual respect for deep focus, craftsmanship, and grounded offline hobbies.`;
  }
  if (score >= 72) {
    return `Solid foundational compatibility: Shared appreciation for ambition and personal growth, with slight contrasts in day-to-day downtime preferences.`;
  }
  return `Respectful peer match with divergent lifestyle priorities. Excellent for collaborative friendship, with different romantic love languages.`;
}

// Compute pairwise matrix and find mutual top sparks across the entire network
export function computeNetworkRankings(allPeople) {
  const rankingsByPerson = {};
  const mutualSparks = [];

  for (const person of allPeople) {
    rankingsByPerson[person.id] = computeRankingsForPerson(person, allPeople);
  }

  // Find pairs where both are in each other's top 3
  const checkedPairs = new Set();
  for (const person of allPeople) {
    const myTopMatches = rankingsByPerson[person.id].slice(0, 3);
    for (const match of myTopMatches) {
      const otherId = match.candidate.id;
      const pairKey = [person.id, otherId].sort().join(':::');
      if (checkedPairs.has(pairKey)) continue;

      const otherPersonTopMatches = rankingsByPerson[otherId]?.slice(0, 3) || [];
      const reciprocalMatch = otherPersonTopMatches.find(m => m.candidate.id === person.id);

      if (reciprocalMatch) {
        checkedPairs.add(pairKey);
        const otherPerson = allPeople.find(p => p.id === otherId);
        mutualSparks.push({
          personA: {
            id: person.id,
            name: person.name,
            avatar: person.avatar,
            rankForOther: reciprocalMatch.rank,
            score: match.overallCompatibility
          },
          personB: {
            id: otherPerson.id,
            name: otherPerson.name,
            avatar: otherPerson.avatar,
            rankForOther: match.rank,
            score: reciprocalMatch.overallCompatibility
          },
          combinedScore: Math.round((match.overallCompatibility + reciprocalMatch.overallCompatibility) / 2),
          sparkReason: `Mutual Top ${Math.max(match.rank, reciprocalMatch.rank)} Match: Both autonomous agents rated each other with peak chemistry and value resonance.`
        });
      }
    }
  }

  mutualSparks.sort((a, b) => b.combinedScore - a.combinedScore);

  return {
    rankingsByPerson,
    mutualSparks
  };
}
