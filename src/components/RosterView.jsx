import React, { useState } from 'react';
import Avatar from './Avatar';
import {
  Search,
  ExternalLink,
  Flame,
  Award,
  User,
  Linkedin,
  Instagram
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
        p.tagline.toLowerCase().includes('podcast') ||
        p.tagline.toLowerCase().includes('comedian')
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
            <div style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 12,
        padding: '28px 24px',
        marginBottom: 28
      }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: 8, letterSpacing: '-0.02em' }}>
          Autonomous Agentic Dating Network
        </h1>

        <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', maxWidth: 800, lineHeight: 1.5, margin: 0 }}>
          Each person is represented by an autonomous agent. The agents analyze their public profile sources (Needs, Hobbies, Interests, and Qualities) and date each other to determine personalized compatibility rankings.
        </p>
      </div>

            <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 14,
        marginBottom: 24
      }}>
                <div style={{
          position: 'relative',
          width: 320,
          maxWidth: '100%'
        }}>
          <Search size={16} color="var(--text-dim)" style={{
            position: 'absolute',
            left: 12,
            top: '50%',
            transform: 'translateY(-50%)'
          }} />
          <input
            type="text"
            placeholder="Search candidates by name, hobby, role..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: '100%',
              padding: '9px 14px 9px 36px',
              borderRadius: 8,
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              color: '#fff',
              fontSize: '0.85rem',
              outline: 'none',
              fontFamily: 'inherit'
            }}
          />
        </div>

                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {[
            { id: 'all', label: `All (${people.length})` },
            { id: 'founders', label: 'Founders & Leaders' },
            { id: 'creators', label: 'Creators & Comedians' },
            { id: 'women', label: 'Women' },
            { id: 'men', label: 'Men' }
          ].map(btn => (
            <button
              key={btn.id}
              onClick={() => setFilterTag(btn.id)}
              style={{
                padding: '6px 12px',
                borderRadius: 6,
                fontSize: '0.8rem',
                fontWeight: 500,
                cursor: 'pointer',
                border: '1px solid',
                borderColor: filterTag === btn.id ? 'var(--primary)' : 'var(--border-subtle)',
                background: filterTag === btn.id ? 'var(--primary)' : 'var(--bg-surface)',
                color: filterTag === btn.id ? '#ffffff' : 'var(--text-muted)',
                transition: 'all 0.15s ease'
              }}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

            <div className="cards-grid-3">
        {filteredPeople.map((person) => (
          <div
            key={person.id}
            className="glass-panel"
            style={{
              padding: 20,
              display: 'flex',
              flexDirection: 'column',
              borderRadius: 10
            }}
          >
                        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <Avatar name={person.name} size={48} />
                <div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-main)' }}>
                    {person.name}
                  </h3>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>
                    {person.age} · {person.location}
                  </div>
                </div>
              </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'flex-end' }}>
                <a
                  href={person.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                    padding: '3px 8px',
                    borderRadius: 4,
                    background: 'rgba(10, 102, 194, 0.1)',
                    border: '1px solid rgba(10, 102, 194, 0.25)',
                    color: '#60a5fa',
                    fontSize: '0.72rem',
                    fontWeight: 500
                  }}
                  title="Official LinkedIn Profile"
                >
                  <Linkedin size={11} />
                  <span>LinkedIn</span>
                  <ExternalLink size={9} />
                </a>

                <a
                  href={person.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                    padding: '3px 8px',
                    borderRadius: 4,
                    background: 'rgba(225, 48, 108, 0.1)',
                    border: '1px solid rgba(225, 48, 108, 0.25)',
                    color: '#f472b6',
                    fontSize: '0.72rem',
                    fontWeight: 500
                  }}
                  title="Official Public Instagram"
                >
                  <Instagram size={11} />
                  <span>Instagram</span>
                  <ExternalLink size={9} />
                </a>
              </div>
            </div>

                        <p style={{
              fontSize: '0.82rem',
              color: 'var(--text-muted)',
              marginBottom: 12,
              lineHeight: 1.4,
              minHeight: 36
            }}>
              {person.tagline}
            </p>

                        <div style={{
              padding: '8px 10px',
              borderRadius: 6,
              background: 'var(--bg-main)',
              border: '1px solid var(--border-subtle)',
              marginBottom: 14
            }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', marginBottom: 2, fontWeight: 600, textTransform: 'uppercase' }}>
                Top Core Need
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-main)', lineHeight: 1.3 }}>
                {person.analysis?.needs?.[0] || 'Genuine intellectual & emotional connection'}
              </div>
            </div>

                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 16 }}>
              {(person.analysis?.hobbies || []).slice(0, 3).map((hobby, hIdx) => (
                <span
                  key={hIdx}
                  style={{
                    fontSize: '0.72rem',
                    padding: '2px 7px',
                    borderRadius: 4,
                    background: 'var(--bg-subtle)',
                    color: 'var(--text-muted)',
                    border: '1px solid var(--border-subtle)'
                  }}
                >
                  {hobby}
                </span>
              ))}
            </div>

                        <div style={{ display: 'flex', gap: 6, marginTop: 'auto' }}>
              <button
                onClick={() => onSelectPersonForProfile(person)}
                className="btn-secondary"
                style={{ flex: 1, padding: '7px 8px', fontSize: '0.78rem' }}
                title="View full profile: Needs, Hobbies, Interests, Qualities"
              >
                <User size={13} />
                <span>Profile</span>
              </button>

              <button
                onClick={() => onLaunchDateWithPerson(person)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 5,
                  padding: '7px 11px',
                  borderRadius: 8,
                  background: 'var(--primary-subtle)',
                  border: '1px solid var(--primary-border)',
                  color: '#fda4af',
                  fontWeight: 500,
                  fontSize: '0.78rem',
                  cursor: 'pointer'
                }}
                title="Launch a date simulation"
              >
                <Flame size={13} />
                <span>Date</span>
              </button>

              <button
                onClick={() => onViewRankingsForPerson(person)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 5,
                  padding: '7px 11px',
                  borderRadius: 8,
                  background: 'var(--bg-subtle)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-main)',
                  fontWeight: 500,
                  fontSize: '0.78rem',
                  cursor: 'pointer'
                }}
                title="View match rankings for this person"
              >
                <Award size={13} />
                <span>Rankings</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
