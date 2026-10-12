import React, { useState } from 'react';
import {
  Award,
  Crown,
  Flame,
  ExternalLink,
  Briefcase,
  Camera,
  Heart,
  Sparkles,
  SlidersHorizontal,
  Search,
  CheckCircle2
} from 'lucide-react';
import { computeRankingsForPerson } from '../data/datingEngineClient';

export default function RankingsView({
  people,
  initialPersonId,
  onLaunchDatePair
}) {
  const [selectedPersonId, setSelectedPersonId] = useState(initialPersonId || people[0]?.id);
  const [searchFilter, setSearchFilter] = useState('');
  const [sortBy, setSortBy] = useState('overall'); // overall, lifestyle, ambition, chemistry

  const targetPerson = people.find(p => p.id === selectedPersonId) || people[0];
  const rawRankings = computeRankingsForPerson(targetPerson, people);

  // Apply search filter and sorting
  let sortedRankings = [...rawRankings];

  if (sortBy === 'lifestyle') {
    sortedRankings.sort((a, b) => b.lifestyleFit - a.lifestyleFit);
  } else if (sortBy === 'ambition') {
    sortedRankings.sort((a, b) => b.ambitionSynergy - a.ambitionSynergy);
  } else if (sortBy === 'chemistry') {
    sortedRankings.sort((a, b) => b.chemistryScore - a.chemistryScore);
  }

  if (searchFilter) {
    sortedRankings = sortedRankings.filter(r =>
      r.candidate.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      r.candidate.tagline.toLowerCase().includes(searchFilter.toLowerCase()) ||
      r.matchReason.toLowerCase().includes(searchFilter.toLowerCase())
    );
  }

  return (
    <div style={{ maxWidth: 1400, margin: '0 auto', padding: '32px 24px' }}>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <span className="glow-pill gold">Peer Ranking Engine</span>
          <span className="glow-pill cyan">Who Fits Each Person Best</span>
        </div>
        <h1 style={{ fontSize: '2.4rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
          Personalized Rankings: <span className="gradient-text">Who Fits {targetPerson.name.split(' ')[0]} Best</span>
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: 840 }}>
          For every person, the autonomous agent analyzes all 24 candidates across dual-source intelligence (LinkedIn ambition & Instagram lifestyle) and ranks who fits them best.
        </p>
      </div>

      {/* Target Person Selector Card */}
      <div className="glass-panel" style={{
        padding: 24,
        borderRadius: 20,
        marginBottom: 32,
        background: 'linear-gradient(135deg, rgba(20, 26, 42, 0.9) 0%, rgba(12, 16, 26, 0.95) 100%)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          {/* Target Profile Mini */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <img
              src={targetPerson.avatar}
              alt={targetPerson.name}
              style={{
                width: 68,
                height: 68,
                borderRadius: '50%',
                objectFit: 'cover',
                border: '2px solid rgba(244, 63, 94, 0.8)',
                boxShadow: '0 0 20px rgba(244, 63, 94, 0.3)'
              }}
            />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800 }}>{targetPerson.name}</h3>
                <span className="glow-pill purple" style={{ fontSize: '0.7rem' }}>
                  {targetPerson.analysis?.agentName || `Agent ${targetPerson.name}`}
                </span>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                {targetPerson.tagline}
              </p>
              <div style={{ display: 'flex', gap: 12, marginTop: 6 }}>
                <a
                  href={targetPerson.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: '0.75rem', color: '#60a5fa', display: 'flex', alignItems: 'center', gap: 4 }}
                >
                  <Briefcase size={12} />
                  <span>LinkedIn</span>
                  <ExternalLink size={10} />
                </a>
                <a
                  href={targetPerson.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: '0.75rem', color: '#f472b6', display: 'flex', alignItems: 'center', gap: 4 }}
                >
                  <Camera size={12} />
                  <span>Instagram</span>
                  <ExternalLink size={10} />
                </a>
              </div>
            </div>
          </div>

          {/* Person Dropdown Picker */}
          <div style={{ minWidth: 280 }}>
            <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700, marginBottom: 6 }}>
              Switch Person to View Their Rankings:
            </label>
            <select
              value={selectedPersonId}
              onChange={e => setSelectedPersonId(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: 12,
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid var(--border-subtle)',
                color: '#fff',
                fontSize: '0.9rem',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              {people.map(p => (
                <option key={p.id} value={p.id} style={{ background: '#0b0f1a', color: '#fff' }}>
                  {p.name} ({p.tagline.slice(0, 35)}...)
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Sorting & Search Controls */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 16,
        marginBottom: 24
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 700 }}>
            Sort Candidates By:
          </span>
          {[
            { id: 'overall', label: 'Overall Best Fit' },
            { id: 'lifestyle', label: 'Lifestyle (Instagram)' },
            { id: 'ambition', label: 'Ambition & Intellect (LinkedIn)' },
            { id: 'chemistry', label: 'Date Chemistry' }
          ].map(sortBtn => (
            <button
              key={sortBtn.id}
              onClick={() => setSortBy(sortBtn.id)}
              style={{
                padding: '6px 14px',
                borderRadius: 8,
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer',
                border: 'none',
                background: sortBy === sortBtn.id ? 'var(--gradient-brand)' : 'rgba(255, 255, 255, 0.05)',
                color: sortBy === sortBtn.id ? '#fff' : 'var(--text-muted)'
              }}
            >
              {sortBtn.label}
            </button>
          ))}
        </div>

        {/* Filter Input */}
        <div style={{ position: 'relative', width: 280 }}>
          <Search size={16} color="var(--text-dim)" style={{
            position: 'absolute',
            left: 12,
            top: '50%',
            transform: 'translateY(-50%)'
          }} />
          <input
            type="text"
            placeholder="Search ranked matches..."
            value={searchFilter}
            onChange={e => setSearchFilter(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 14px 8px 36px',
              borderRadius: 10,
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid var(--border-subtle)',
              color: '#fff',
              fontSize: '0.85rem',
              outline: 'none'
            }}
          />
        </div>
      </div>

      {/* Ranked Candidate List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {sortedRankings.map((item, index) => {
          const rank = item.rank;
          const isTopMatch = rank === 1;
          const isTopThree = rank <= 3;

          return (
            <div
              key={item.candidate.id}
              className="glass-panel"
              style={{
                padding: '24px 28px',
                borderRadius: 20,
                border: isTopMatch
                  ? '2px solid rgba(245, 158, 11, 0.6)'
                  : isTopThree
                  ? '1px solid rgba(244, 63, 94, 0.4)'
                  : '1px solid rgba(255, 255, 255, 0.08)',
                boxShadow: isTopMatch ? '0 0 30px rgba(245, 158, 11, 0.15)' : 'none',
                display: 'grid',
                gridTemplateColumns: '80px minmax(260px, 1.2fr) minmax(200px, 1fr) 140px',
                gap: 20,
                alignItems: 'center'
              }}
            >
              {/* Rank Column */}
              <div style={{ textAlign: 'center' }}>
                {isTopMatch ? (
                  <div style={{
                    width: 54,
                    height: 54,
                    borderRadius: 16,
                    background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    boxShadow: '0 0 16px rgba(245, 158, 11, 0.4)',
                    margin: '0 auto'
                  }}>
                    <Crown size={20} />
                    <span style={{ fontSize: '0.85rem', fontWeight: 800 }}>#1</span>
                  </div>
                ) : isTopThree ? (
                  <div style={{
                    width: 50,
                    height: 50,
                    borderRadius: 14,
                    background: rank === 2 ? 'rgba(148, 163, 184, 0.2)' : 'rgba(217, 119, 6, 0.2)',
                    border: rank === 2 ? '1px solid #94a3b8' : '1px solid #d97706',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: rank === 2 ? '#e2e8f0' : '#fbbf24',
                    fontWeight: 800,
                    fontSize: '1.2rem',
                    margin: '0 auto'
                  }}>
                    #{rank}
                  </div>
                ) : (
                  <div style={{
                    fontSize: '1.3rem',
                    fontWeight: 700,
                    color: 'var(--text-dim)'
                  }}>
                    #{rank}
                  </div>
                )}
              </div>

              {/* Candidate Info */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <img
                  src={item.candidate.avatar}
                  alt={item.candidate.name}
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '2px solid rgba(244, 63, 94, 0.5)'
                  }}
                />
                <div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                    <h4 style={{ fontSize: '1.15rem', fontWeight: 700 }}>{item.candidate.name}</h4>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{item.candidate.age}</span>
                  </div>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.3, marginBottom: 6 }}>
                    {item.candidate.tagline}
                  </p>
                  <div style={{ display: 'flex', gap: 10 }}>
                    <a
                      href={item.candidate.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontSize: '0.72rem', color: '#60a5fa', display: 'flex', alignItems: 'center', gap: 3 }}
                    >
                      <Briefcase size={11} />
                      <span>LinkedIn</span>
                      <ExternalLink size={9} />
                    </a>
                    <a
                      href={item.candidate.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontSize: '0.72rem', color: '#f472b6', display: 'flex', alignItems: 'center', gap: 3 }}
                    >
                      <Camera size={11} />
                      <span>Instagram</span>
                      <ExternalLink size={9} />
                    </a>
                  </div>
                </div>
              </div>

              {/* Match Reason & Sub-Scores */}
              <div>
                <p style={{ fontSize: '0.82rem', color: '#e2e8f0', lineHeight: 1.4, marginBottom: 8 }}>
                  {item.matchReason}
                </p>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.7rem', padding: '2px 8px', borderRadius: 6, background: 'rgba(236, 72, 153, 0.1)', color: '#f472b6' }}>
                    Lifestyle: {item.lifestyleFit}%
                  </span>
                  <span style={{ fontSize: '0.7rem', padding: '2px 8px', borderRadius: 6, background: 'rgba(139, 92, 246, 0.1)', color: '#c084fc' }}>
                    Ambition: {item.ambitionSynergy}%
                  </span>
                  <span style={{ fontSize: '0.7rem', padding: '2px 8px', borderRadius: 6, background: 'rgba(6, 182, 212, 0.1)', color: '#38bdf8' }}>
                    Chemistry: {item.chemistryScore}%
                  </span>
                </div>
              </div>

              {/* Score & Watch Date Action */}
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: '1.7rem',
                  fontWeight: 800,
                  color: isTopMatch ? '#fbbf24' : isTopThree ? '#f43f5e' : '#e2e8f0',
                  lineHeight: 1,
                  marginBottom: 8
                }}>
                  {item.overallCompatibility}%
                </div>
                <button
                  onClick={() => {
                    const candidateFull = people.find(p => p.id === item.candidate.id);
                    onLaunchDatePair(targetPerson, candidateFull);
                  }}
                  className="btn-primary"
                  style={{
                    padding: '8px 12px',
                    fontSize: '0.78rem',
                    width: '100%',
                    background: isTopMatch ? 'linear-gradient(135deg, #f59e0b, #f43f5e)' : 'var(--gradient-brand)'
                  }}
                  title="Simulate this pair dating in the arena"
                >
                  <Flame size={13} />
                  <span>Watch Date</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
