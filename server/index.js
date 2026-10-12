import express from 'express';
import cors from 'cors';
import { INITIAL_PEOPLE } from '../src/data/people.js';
import { scrapeAndAnalyzePerson } from './scraper.js';
import {
  VENUES,
  simulateDateConversation,
  computeRankingsForPerson,
  computeNetworkRankings
} from './datingEngine.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// In-memory state of active people
let activePeople = [...INITIAL_PEOPLE];

// Cache of network rankings
let cachedRankings = computeNetworkRankings(activePeople);

function refreshRankings() {
  cachedRankings = computeNetworkRankings(activePeople);
}

// 1. Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    peopleCount: activePeople.length,
    timestamp: new Date().toISOString()
  });
});

// 2. Get all people
app.get('/api/people', (req, res) => {
  res.json({
    success: true,
    total: activePeople.length,
    people: activePeople
  });
});

// 3. Get single person
app.get('/api/people/:id', (req, res) => {
  const person = activePeople.find(p => p.id === req.params.id);
  if (!person) {
    return res.status(404).json({ success: false, error: 'Person not found' });
  }
  res.json({ success: true, person });
});

// 4. Scrape & Analyze new person from LinkedIn + Instagram
app.post('/api/scrape', async (req, res) => {
  const { linkedinUrl, instagramUrl } = req.body;

  if (!linkedinUrl || !instagramUrl) {
    return res.status(400).json({
      success: false,
      error: 'Both a valid LinkedIn URL and a public Instagram URL are required.'
    });
  }

  try {
    const { person, scrapeReport } = await scrapeAndAnalyzePerson(linkedinUrl, instagramUrl);

    // Insert at beginning of active roster
    activePeople.unshift(person);
    refreshRankings();

    res.json({
      success: true,
      message: 'Agent created and deployed into active dating pool!',
      person,
      scrapeReport
    });
  } catch (error) {
    console.error('Scrape error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to scrape and analyze profile: ' + error.message
    });
  }
});

// 5. Simulate date between two agents
app.post('/api/date', (req, res) => {
  const { personAId, personBId, venueId } = req.body;

  const personA = activePeople.find(p => p.id === personAId);
  const personB = activePeople.find(p => p.id === personBId);

  if (!personA || !personB) {
    return res.status(404).json({
      success: false,
      error: 'One or both individuals could not be found.'
    });
  }

  if (personA.id === personB.id) {
    return res.status(400).json({
      success: false,
      error: 'An agent cannot date themselves.'
    });
  }

  const dateResult = simulateDateConversation(personA, personB, venueId);
  res.json({
    success: true,
    date: dateResult
  });
});

// 6. Get available venues
app.get('/api/venues', (req, res) => {
  res.json({
    success: true,
    venues: VENUES
  });
});

// 7. Get rankings for a specific person
app.get('/api/rankings/:id', (req, res) => {
  const targetPerson = activePeople.find(p => p.id === req.params.id);
  if (!targetPerson) {
    return res.status(404).json({ success: false, error: 'Person not found' });
  }

  const rankings = computeRankingsForPerson(targetPerson, activePeople);
  res.json({
    success: true,
    personId: targetPerson.id,
    personName: targetPerson.name,
    rankings
  });
});

// 8. Get all network rankings and mutual sparks
app.get('/api/all-rankings', (req, res) => {
  res.json({
    success: true,
    totalPeople: activePeople.length,
    rankingsByPerson: cachedRankings.rankingsByPerson,
    mutualSparks: cachedRankings.mutualSparks
  });
});

// 9. Reset to default 25 people
app.post('/api/reset', (req, res) => {
  activePeople = [...INITIAL_PEOPLE];
  refreshRankings();
  res.json({
    success: true,
    message: 'Reset active pool to initial 25 verified individuals.',
    total: activePeople.length
  });
});

app.listen(PORT, () => {
  console.log(`CupidAgent API server running on http://localhost:${PORT}`);
});
