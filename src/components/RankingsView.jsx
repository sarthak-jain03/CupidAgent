import React, { useState } from 'react';
import Avatar from './Avatar';
import {
  Award,
  Flame,
  ExternalLink,
  Linkedin,
  Instagram,
  Search
} from 'lucide-react';
import { computeRankingsForPerson } from '../data/datingEngineClient';

export default function RankingsView({
  people,
  initialPersonId,
  onLaunchDatePair
}) {
  const [selectedPersonId, setSelectedPersonId] = useState(initialPersonId || people[0]?.id);
  const [searchFilter, setSearchFilter] = useState('');
  const [sortBy, setSortBy] = useState('overall'); 

  const targetPerson = people.find(p => p.id === selectedPersonId) || people[0];
  const rawRankings = computeRankingsForPerson(targetPerson, people);

  
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
            <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: 6 }}>
          Candidate Match Rankings
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: 840 }}>
          Rankings computed across dual-source intelligence: LinkedIn ambition & Instagram lifestyle signals.
        </p>
      </div>

            <div className="glass-panel" style={{
        padding: 20,
        borderRadius: 10,
        marginBottom: 24,
        background: 'var(--bg-surface)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <Avatar name={targetPerson.name} size={52} />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 600 }}>{targetPerson.name}</h3>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>
                  {targetPerson.age} · {targetPerson.location}
                </span>
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: 2 }}>
                {targetPerson.tagline}
              </p>
              <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
                <a
                  href={targetPerson.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: '0.75rem', color: '#60a5fa', display: 'flex', alignItems: 'center', gap: 4 }}
                >
                  <Linkedin size={11} />
                  <span>LinkedIn</span>
                  <ExternalLink size={9} />
                </a>
                <a
                  href={targetPerson.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: '0.75rem', color: '#f472b6', display: 'flex', alignItems: 'center', gap: 4 }}
                >
                  <Instagram size={11} />
                  <span>Instagram</span>
                  <ExternalLink size={9} />
                </a>
              </div>
            </div>
          </div>

                    <div style={{ minWidth: 260 }}>
            <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 600, marginBottom: 4 }}>
              Select Candidate:
            </label>
            <select
              value={selectedPersonId}
              onChange={e => setSelectedPersonId(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px',
                borderRadius: 6,
                background: 'var(--bg-main)',
                border: '1px solid var(--border-subtle)',
                color: '#fff',
                fontSize: '0.85rem',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              {people.map(p => (
                <option key={p.id} value={p.id} style={{ background: '#0b0f1a', color: '#fff' }}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

            <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 14,
        marginBottom: 20
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)', fontWeight: 600 }}>
            Sort:
          </span>
          {[
            { id: 'overall', label: 'Overall Best Fit' },
            { id: 'lifestyle', label: 'Lifestyle Fit' },
            { id: 'ambition', label: 'Career Synergy' },
            { id: 'chemistry', label: 'Chemistry' }
          ].map(sortBtn => (
            <button
              key={sortBtn.id}
              onClick={() => setSortBy(sortBtn.id)}
              style={{
                padding: '5px 10px',
                borderRadius: 6,
                fontSize: '0.78rem',
                fontWeight: 500,
                cursor: 'pointer',
                border: '1px solid',
                borderColor: sortBy === sortBtn.id ? 'var(--primary)' : 'var(--border-subtle)',
                background: sortBy === sortBtn.id ? 'var(--primary)' : 'var(--bg-surface)',
                color: sortBy === sortBtn.id ? '#fff' : 'var(--text-muted)',
                transition: 'all 0.15s ease'
              }}
            >
              {sortBtn.label}
            </button>
          ))}
        </div>

                <div style={{ position: 'relative', width: 260 }}>
          <Search size={14} color="var(--text-dim)" style={{
            position: 'absolute',
            left: 10,
            top: '50%',
            transform: 'translateY(-50%)'
          }} />
          <input
            type="text"
            placeholder="Filter matches..."
            value={searchFilter}
            onChange={e => setSearchFilter(e.target.value)}
            style={{
              width: '100%',
              padding: '7px 12px 7px 32px',
              borderRadius: 6,
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              color: '#fff',
              fontSize: '0.82rem',
              outline: 'none'
            }}
          />
        </div>
      </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {sortedRankings.map((item) => {
          const rank = item.rank;
          const isTopMatch = rank === 1;

          return (
            <div
              key={item.candidate.id}
              className="glass-panel"
              style={{
                padding: '16px 20px',
                borderRadius: 8,
                display: 'grid',
                gridTemplateColumns: '50px minmax(240px, 1.2fr) minmax(200px, 1fr) 130px',
                gap: 16,
                alignItems: 'center'
              }}
            >
                            <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: '1rem',
                  fontWeight: 700,
                  color: isTopMatch ? '#fbbf24' : 'var(--text-muted)'
                }}>
                  #{rank}
                </div>
              </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <Avatar name={item.candidate.name} size={44} />
                <div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 600 }}>{item.candidate.name}</h4>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>{item.candidate.age}</span>
                  </div>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.3, marginBottom: 4 }}>
                    {item.candidate.tagline}
                  </p>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <a
                      href={item.candidate.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontSize: '0.72rem', color: '#60a5fa', display: 'flex', alignItems: 'center', gap: 3 }}
                    >
                      <Linkedin size={10} />
                      <span>LinkedIn</span>
                      <ExternalLink size={8} />
                    </a>
                    <a
                      href={item.candidate.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontSize: '0.72rem', color: '#f472b6', display: 'flex', alignItems: 'center', gap: 3 }}
                    >
                      <Instagram size={10} />
                      <span>Instagram</span>
                      <ExternalLink size={8} />
                    </a>
                  </div>
                </div>
              </div>

                            <div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.4, marginBottom: 6 }}>
                  {item.matchReason}
                </p>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.7rem', padding: '1px 6px', borderRadius: 4, background: 'var(--bg-main)', color: 'var(--text-dim)' }}>
                    Lifestyle: {item.lifestyleFit}%
                  </span>
                  <span style={{ fontSize: '0.7rem', padding: '1px 6px', borderRadius: 4, background: 'var(--bg-main)', color: 'var(--text-dim)' }}>
                    Ambition: {item.ambitionSynergy}%
                  </span>
                  <span style={{ fontSize: '0.7rem', padding: '1px 6px', borderRadius: 4, background: 'var(--bg-main)', color: 'var(--text-dim)' }}>
                    Chemistry: {item.chemistryScore}%
                  </span>
                </div>
              </div>

                            <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: '1.3rem',
                  fontWeight: 700,
                  color: isTopMatch ? '#fbbf24' : 'var(--text-main)',
                  lineHeight: 1,
                  marginBottom: 6
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
                    padding: '6px 10px',
                    fontSize: '0.75rem',
                    width: '100%'
                  }}
                  title="Simulate date with this candidate"
                >
                  <Flame size={12} />
                  <span>Simulate Date</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
