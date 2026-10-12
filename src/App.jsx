import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { INITIAL_PEOPLE } from './data/people';
import Navbar from './components/Navbar';
import RosterView from './components/RosterView';
import DatingArena from './components/DatingArena';
import RankingsView from './components/RankingsView';
import MutualSparksView from './components/MutualSparksView';
import ProfileModal from './components/ProfileModal';
import NewPersonModal from './components/NewPersonModal';
import VideoWalkthroughModal from './components/VideoWalkthroughModal';
import TechDocsModal from './components/TechDocsModal';
import { playSparkFanfare, playChime } from './utils/soundEffects';

export default function App() {
  const [people, setPeople] = useState(INITIAL_PEOPLE);
  const [activeTab, setActiveTab] = useState('roster'); // roster | arena | rankings | sparks

  // Selection states for cross-view navigation
  const [selectedPersonForProfile, setSelectedPersonForProfile] = useState(null);
  const [preselectedPair, setPreselectedPair] = useState({ personA: null, personB: null });
  const [rankingTargetPerson, setRankingTargetPerson] = useState(null);

  // Modal open states
  const [isNewPersonOpen, setIsNewPersonOpen] = useState(false);
  const [isVideoWalkthroughOpen, setIsVideoWalkthroughOpen] = useState(false);
  const [isTechDocsOpen, setIsTechDocsOpen] = useState(false);

  // Fetch updated list from backend if running
  useEffect(() => {
    axios.get('/api/people')
      .then(res => {
        if (res.data && res.data.people && res.data.people.length >= 25) {
          setPeople(res.data.people);
        }
      })
      .catch(err => {
        // Fallback gracefully to built-in verified people data
        console.log('Operating in standalone mode with verified people dataset.');
      });
  }, []);

  // Handlers for cross-component interactions
  const handleSelectPersonForProfile = (person) => {
    setSelectedPersonForProfile(person);
    playChime();
  };

  const handleLaunchDateWithPerson = (person) => {
    // Pick an optimal match or person B
    const other = people.find(p => p.id !== person.id) || people[0];
    setPreselectedPair({ personA: person, personB: other });
    setActiveTab('arena');
    playChime();
  };

  const handleLaunchDatePair = (pA, pB) => {
    setPreselectedPair({ personA: pA, personB: pB });
    setActiveTab('arena');
    playChime();
  };

  const handleViewRankingsForPerson = (person) => {
    setRankingTargetPerson(person);
    setActiveTab('rankings');
    playChime();
  };

  const handlePersonCreated = (newPerson) => {
    setPeople(prev => [newPerson, ...prev]);
    setSelectedPersonForProfile(newPerson);
    playSparkFanfare();
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        peopleCount={people.length}
        onOpenNewPersonModal={() => setIsNewPersonOpen(true)}
        onOpenVideoWalkthrough={() => setIsVideoWalkthroughOpen(true)}
        onOpenTechDocs={() => setIsTechDocsOpen(true)}
      />

      {/* Main Content Area */}
      <main style={{ flex: 1 }}>
        {activeTab === 'roster' && (
          <RosterView
            people={people}
            onSelectPersonForProfile={handleSelectPersonForProfile}
            onLaunchDateWithPerson={handleLaunchDateWithPerson}
            onViewRankingsForPerson={handleViewRankingsForPerson}
          />
        )}

        {activeTab === 'arena' && (
          <DatingArena
            people={people}
            preselectedA={preselectedPair.personA}
            preselectedB={preselectedPair.personB}
            onViewRankingsForPerson={handleViewRankingsForPerson}
          />
        )}

        {activeTab === 'rankings' && (
          <RankingsView
            people={people}
            initialPersonId={rankingTargetPerson?.id || people[0]?.id}
            onLaunchDatePair={handleLaunchDatePair}
          />
        )}

        {activeTab === 'sparks' && (
          <MutualSparksView
            people={people}
            onLaunchDatePair={handleLaunchDatePair}
          />
        )}
      </main>

      {/* Footer */}
      <footer style={{
        marginTop: 'auto',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '24px',
        textAlign: 'center',
        background: 'rgba(6, 8, 14, 0.95)',
        fontSize: '0.85rem',
        color: 'var(--text-muted)'
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <strong style={{ color: '#fff' }}>CupidAgent</strong> — Autonomous Agentic Dating Platform
          </div>
          <div>
            Dual-Source Ground Truth: LinkedIn + Public Instagram
          </div>
          <div style={{ display: 'flex', gap: 16 }}>
            <button
              onClick={() => setIsVideoWalkthroughOpen(true)}
              style={{ background: 'none', border: 'none', color: '#f472b6', cursor: 'pointer', fontSize: '0.82rem' }}
            >
              🎬 3-Min YouTube Video Guide
            </button>
            <button
              onClick={() => setIsTechDocsOpen(true)}
              style={{ background: 'none', border: 'none', color: '#60a5fa', cursor: 'pointer', fontSize: '0.82rem' }}
            >
              🛠️ Technical Specs
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {selectedPersonForProfile && (
        <ProfileModal
          person={selectedPersonForProfile}
          onClose={() => setSelectedPersonForProfile(null)}
          onLaunchDateWithPerson={handleLaunchDateWithPerson}
          onViewRankingsForPerson={handleViewRankingsForPerson}
        />
      )}

      <NewPersonModal
        isOpen={isNewPersonOpen}
        onClose={() => setIsNewPersonOpen(false)}
        onPersonCreated={handlePersonCreated}
      />

      <VideoWalkthroughModal
        isOpen={isVideoWalkthroughOpen}
        onClose={() => setIsVideoWalkthroughOpen(false)}
        onNavigateToTab={(tab) => {
          setActiveTab(tab);
          setIsVideoWalkthroughOpen(false);
        }}
        onOpenProfileDemo={() => {
          setSelectedPersonForProfile(people[0]);
          setIsVideoWalkthroughOpen(false);
        }}
      />

      <TechDocsModal
        isOpen={isTechDocsOpen}
        onClose={() => setIsTechDocsOpen(false)}
      />
    </div>
  );
}
