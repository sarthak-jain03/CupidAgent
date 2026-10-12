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

export default function App() {
  const [people, setPeople] = useState(INITIAL_PEOPLE);
  const [activeTab, setActiveTab] = useState('roster');

  const [selectedPersonForProfile, setSelectedPersonForProfile] = useState(null);
  const [preselectedPair, setPreselectedPair] = useState({ personA: null, personB: null });
  const [rankingTargetPerson, setRankingTargetPerson] = useState(null);
  const [isNewPersonOpen, setIsNewPersonOpen] = useState(false);

  useEffect(() => {
    axios.get('/api/people')
      .then(res => {
        if (res.data && res.data.people && res.data.people.length > 0) {
          setPeople(res.data.people);
        }
      })
      .catch(() => {});
  }, []);

  const handleSelectPersonForProfile = (person) => {
    setSelectedPersonForProfile(person);
  };

  const handleLaunchDateWithPerson = (person) => {
    const other = people.find(p => p.id !== person.id) || people[0];
    setPreselectedPair({ personA: person, personB: other });
    setActiveTab('arena');
  };

  const handleLaunchDatePair = (pA, pB) => {
    setPreselectedPair({ personA: pA, personB: pB });
    setActiveTab('arena');
  };

  const handleViewRankingsForPerson = (person) => {
    setRankingTargetPerson(person);
    setActiveTab('rankings');
  };

  const handlePersonCreated = (newPerson) => {
    setPeople(prev => [newPerson, ...prev]);
    setSelectedPersonForProfile(newPerson);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-main)' }}>
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        peopleCount={people.length}
        onOpenNewPersonModal={() => setIsNewPersonOpen(true)}
      />

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
    </div>
  );
}
