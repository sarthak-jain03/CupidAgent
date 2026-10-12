import React, { useState } from 'react';
import {
  Search,
  ExternalLink,
  Flame,
  Award,
  Sparkles,
  Compass,
  Briefcase,
  Camera,
  HeartHandshake,
  CheckCircle2
} from 'lucide-react';

export default function RosterView({
  people,
  onSelectPersonForProfile,
  onLaunchDateWithPerson,
  onViewRankingsForPerson
}) {
  const [search, setSearch] = useState('');
  const [filterTag, setFilterTag] = useState('all');

  const filteredPeople = people.filter(p => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.tagline.toLowerCase().includes(search.toLowerCase()) ||
      (p.analysis?.hobbies || []).some(h => h.toLowerCase().includes(search.toLowerCase())) ||
      (p.sources?.linkedin?.industry || '').toLowerCase().includes(search.toLowerCase());

    if (!matchesSearch) return false;

    if (filterTag === 'all') return true;
    if (filterTag === 'founders') {
      return (
        p.tagline.toLowerCase().includes('ceo') ||
        p.tagline.toLowerCase().includes('founder')
      );
    }
    if (filterTag === 'creators') {
      return (
        p.tagline.toLowerCase().includes('creator') ||
        p.tagline.toLowerCase().includes('author') ||
        p.tagline.toLowerCase().includes('podcast')
      );
    }
    if (filterTag === 'women') {
      return p.gender === 'female';
    }
    if (filterTag === 'men') {
      return p.gender === 'male';
    }
    return true;
  });

  return (
    <div style={{ maxWidth: 1400, margin: '0 auto', padding: '32px 24px' }}>
      {/* Hero Header */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(244, 63, 94, 0.08) 0%, rgba(139, 92, 246, 0.08) 100%)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: 24,
        padding: '36px 32px',
        marginBottom: 36,
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: -100,
          right: -100,
          width: 300,
          height: 300,
          background: 'radial-gradient(circle, rgba(244, 63, 94, 0.2) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none'
        }} />

        <div style={{ maxWidth: 840, position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <span className="glow-pill gold">25 Verified Individuals</span>
            <span className="glow-pill cyan">Two Official Sources Only</span>
            <span className="glow-pill emerald">Autonomous Agent Harness</span>
          </div>

          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 800,
            lineHeight: 1.2,
            marginBottom: 16,
            letterSpacing: '-0.03em'
          }}>
            Every person has an agent. The agents <span className="gradient-text">date on their behalf</span>.
          </h1>

          <p style={{
            fontSize: '1.05rem',
            color: 'var(--text-muted)',
            lineHeight: 1.6,
            marginBottom: 24
          }}>
            For every individual, there are exactly two sources of information: their <strong>official LinkedIn</strong> and their <strong>public Instagram</strong>. The agent reads both, derives their <em>Needs, Hobbies, Interests, and Qualities</em>, and conducts multi-turn dates to determine who fits them best.
          </p>

          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <CheckCircle2 size={18} color="#10b981" />
              <span style={{ fontSize: '0.9rem', color: '#e2e8f0' }}>25 Real Public Profiles</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <CheckCircle2 size={18} color="#10b981" />
              <span style={{ fontSize: '0.9rem', color: '#e2e8f0' }}>Needs · Hobbies · Interests Analysis</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <CheckCircle2 size={18} color="#10b981" />
              <span style={{ fontSize: '0.9rem', color: '#e2e8f0' }}>Full Peer Ranking Matrix</span>
            </div>
          </div>
        </div>
      </div>

      {/* Controls: Search and Filter */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 16,
        marginBottom: 28
      }}>
        {/* Search */}
        <div style={{
          position: 'relative',
          width: 360,
          maxWidth: '100%'
        }}>
          <Search size={18} color="var(--text-dim)" style={{
            position: 'absolute',
            left: 14,
            top: '50%',
            transform: 'translateY(-50%)'
          }} />
          <input
            type="text"
            placeholder="Search by name, hobby, company, skill..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 16px 12px 42px',
              borderRadius: 14,
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid var(--border-subtle)',
              color: '#fff',
              fontSize: '0.9rem',
              outline: 'none',
              fontFamily: 'inherit'
            }}
          />
        </div>

        {/* Filter Chips */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {[
            { id: 'all', label: 'All 25' },
            { id: 'founders', label: 'Founders & CEOs' },
            { id: 'creators', label: 'Creators & Authors' },
            { id: 'women', label: 'Women' },
            { id: 'men', label: 'Men' }
          ].map(btn => (
            <button
              key={btn.id}
              onClick={() => setFilterTag(btn.id)}
              style={{
                padding: '8px 14px',
                borderRadius: 10,
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                border: 'none',
                background: filterTag === btn.id ? 'var(--gradient-brand)' : 'rgba(255, 255, 255, 0.05)',
                color: filterTag === btn.id ? '#fff' : 'var(--text-muted)',
                transition: 'all 0.2s'
              }}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of 25 Profiles */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: 24
      }}>
        {filteredPeople.map((person, idx) => (
          <div
            key={person.id}
            className="glass-panel"
            style={{
              padding: 24,
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              borderRadius: 20
            }}
          >
            {/* Top row: Avatar + Beacon + Official Links */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 }}>
              <div style={{ position: 'relative' }}>
                <img
                  src={person.avatar}
                  alt={person.name}
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '2px solid rgba(244, 63, 94, 0.5)',
                    boxShadow: '0 0 16px rgba(244, 63, 94, 0.2)'
                  }}
                />
                <span style={{
                  position: 'absolute',
                  bottom: 2,
                  right: 2,
                  width: 14,
                  height: 14,
                  borderRadius: '50%',
                  background: '#10b981',
                  border: '2px solid #06080e',
                  boxShadow: '0 0 8px #10b981'
                }} title="Autonomous Agent Active & Ready to Date" />
              </div>

              {/* Official Links Badges */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'flex-end' }}>
                <a
                  href={person.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 5,
                    padding: '4px 10px',
                    borderRadius: 8,
                    background: 'rgba(10, 102, 194, 0.15)',
                    border: '1px solid rgba(10, 102, 194, 0.35)',
                    color: '#60a5fa',
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    transition: 'all 0.2s'
                  }}
                  title="View official public LinkedIn profile"
                >
                  <Briefcase size={12} />
                  <span>LinkedIn</span>
                  <ExternalLink size={10} />
                </a>

                <a
                  href={person.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 5,
                    padding: '4px 10px',
                    borderRadius: 8,
                    background: 'rgba(225, 48, 108, 0.15)',
                    border: '1px solid rgba(225, 48, 108, 0.35)',
                    color: '#f472b6',
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    transition: 'all 0.2s'
                  }}
                  title="View official public Instagram profile"
                >
                  <Camera size={12} />
                  <span>Instagram</span>
                  <ExternalLink size={10} />
                </a>
              </div>
            </div>

            {/* Name, Age, Location */}
            <div style={{ marginBottom: 12 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>{person.name}</h3>
                <span style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>{person.age}</span>
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>{person.location}</p>
            </div>

            {/* Headline */}
            <p style={{
              fontSize: '0.85rem',
              color: 'var(--text-muted)',
              marginBottom: 16,
              lineHeight: 1.4,
              flexGrow: 1
            }}>
              {person.tagline}
            </p>

            {/* Agent Persona Pill */}
            <div style={{
              padding: '8px 12px',
              borderRadius: 10,
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              marginBottom: 16
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                <Sparkles size={12} color="#ec4899" />
                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#ec4899', textTransform: 'uppercase' }}>
                  {person.analysis?.agentName || `Agent ${person.name}`}
                </span>
              </div>
              <p style={{ fontSize: '0.75rem', color: '#cbd5e1', fontStyle: 'italic', lineHeight: 1.3 }}>
                "{person.analysis?.agentPersona ? person.analysis.agentPersona.slice(0, 85) + '...' : 'Autonomous dating persona ready.'}"
              </p>
            </div>

            {/* Top Hobbies Chips */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20 }}>
              {(person.analysis?.hobbies || []).slice(0, 2).map((hobby, hIdx) => (
                <span
                  key={hIdx}
                  style={{
                    fontSize: '0.72rem',
                    padding: '3px 8px',
                    borderRadius: 6,
                    background: 'rgba(139, 92, 246, 0.1)',
                    color: '#c084fc',
                    border: '1px solid rgba(139, 92, 246, 0.2)'
                  }}
                >
                  {hobby.length > 28 ? hobby.slice(0, 26) + '...' : hobby}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: 8, marginTop: 'auto' }}>
              <button
                onClick={() => onSelectPersonForProfile(person)}
                className="btn-secondary"
                style={{ flex: 1, padding: '8px 10px', fontSize: '0.8rem' }}
                title="Open deep profile analysis: Needs, Hobbies, Interests, Qualities"
              >
                <Compass size={14} />
                <span>Profile</span>
              </button>

              <button
                onClick={() => onLaunchDateWithPerson(person)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '8px 12px',
                  borderRadius: 12,
                  background: 'rgba(244, 63, 94, 0.15)',
                  border: '1px solid rgba(244, 63, 94, 0.35)',
                  color: '#fb7185',
                  fontWeight: 600,
                  fontSize: '0.8rem',
                  cursor: 'pointer'
                }}
                title="Take this agent into the Dating Arena"
              >
                <Flame size={14} />
                <span>Date</span>
              </button>

              <button
                onClick={() => onViewRankingsForPerson(person)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '8px 12px',
                  borderRadius: 12,
                  background: 'rgba(245, 158, 11, 0.15)',
                  border: '1px solid rgba(245, 158, 11, 0.35)',
                  color: '#fbbf24',
                  fontWeight: 600,
                  fontSize: '0.8rem',
                  cursor: 'pointer'
                }}
                title="View who fits this person best across the network"
              >
                <Award size={14} />
                <span>Rankings</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
