import React from 'react';
import Avatar from './Avatar';
import {
  X,
  ExternalLink,
  Linkedin,
  Instagram,
  Target,
  Heart,
  BookOpen,
  Award,
  Flame,
  Check,
  ShieldCheck,
  ShieldAlert,
  Calendar
} from 'lucide-react';

export default function ProfileModal({
  person,
  onClose,
  onLaunchDateWithPerson,
  onViewRankingsForPerson
}) {
  if (!person) return null;

  const analysis = person.analysis || {};
  const qualities = analysis.qualities || {};
  const sources = person.sources || {};

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="glass-panel"
        onClick={e => e.stopPropagation()}
        style={{
          width: 860,
          maxWidth: '95vw',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: 0,
          borderRadius: 12,
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
          position: 'relative'
        }}
      >
                <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 16,
            right: 16,
            zIndex: 10,
            width: 32,
            height: 32,
            borderRadius: 6,
            background: 'var(--bg-subtle)',
            border: '1px solid var(--border-subtle)',
            color: 'var(--text-muted)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <X size={18} />
        </button>

                <div style={{
          background: 'var(--bg-card)',
          padding: '28px',
          borderBottom: '1px solid var(--border-subtle)'
        }}>
          <div style={{ display: 'flex', gap: 18, alignItems: 'center', flexWrap: 'wrap' }}>
            <Avatar name={person.name} size={68} />

            <div style={{ flex: 1, minWidth: 260 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 4 }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-main)' }}>
                  {person.name}
                </h2>
                <span style={{ fontSize: '0.95rem', color: 'var(--text-dim)' }}>
                  {person.age} · {person.location}
                </span>
              </div>

              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: 14, lineHeight: 1.4 }}>
                {person.tagline}
              </p>

                            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <a
                  href={person.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '5px 12px',
                    borderRadius: 6,
                    background: 'rgba(10, 102, 194, 0.1)',
                    border: '1px solid rgba(10, 102, 194, 0.25)',
                    color: '#60a5fa',
                    fontSize: '0.8rem',
                    fontWeight: 500
                  }}
                >
                  <Linkedin size={13} />
                  <span>LinkedIn Profile ({person.linkedinHandle})</span>
                  <ExternalLink size={10} />
                </a>

                <a
                  href={person.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '5px 12px',
                    borderRadius: 6,
                    background: 'rgba(225, 48, 108, 0.1)',
                    border: '1px solid rgba(225, 48, 108, 0.25)',
                    color: '#f472b6',
                    fontSize: '0.8rem',
                    fontWeight: 500
                  }}
                >
                  <Instagram size={13} />
                  <span>Instagram Profile ({person.instagramHandle})</span>
                  <ExternalLink size={10} />
                </a>
              </div>
            </div>
          </div>
        </div>

                <div style={{ padding: 28 }}>
                    <div style={{
            background: 'var(--bg-main)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 8,
            padding: 16,
            marginBottom: 24
          }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-dim)', textTransform: 'uppercase', marginBottom: 4 }}>
              Agent Persona Overview
            </div>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-main)', lineHeight: 1.5 }}>
              "{analysis.agentPersona}"
            </p>
          </div>

                    <div style={{ marginBottom: 24 }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: 12 }}>
              Official Data Sources
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 14 }}>
                            <div style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 8,
                padding: 16
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10, color: '#60a5fa' }}>
                  <Linkedin size={16} />
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 600 }}>LinkedIn Data</h4>
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  <p style={{ marginBottom: 6 }}>
                    <strong style={{ color: 'var(--text-main)' }}>Company & Role:</strong> {sources.linkedin?.company} · {sources.linkedin?.industry}
                  </p>
                  <p style={{ marginBottom: 8 }}>
                    <strong style={{ color: 'var(--text-main)' }}>Background:</strong> {sources.linkedin?.summary}
                  </p>
                  <div>
                    <strong style={{ color: 'var(--text-main)', display: 'block', marginBottom: 6 }}>Skills:</strong>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                      {(sources.linkedin?.skills || []).map((skill, sIdx) => (
                        <span key={sIdx} style={{
                          fontSize: '0.72rem',
                          background: 'rgba(10, 102, 194, 0.1)',
                          color: '#93c5fd',
                          padding: '2px 6px',
                          borderRadius: 4
                        }}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

                            <div style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 8,
                padding: 16
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10, color: '#f472b6' }}>
                  <Instagram size={16} />
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 600 }}>Instagram Data</h4>
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  <p style={{ marginBottom: 6 }}>
                    <strong style={{ color: 'var(--text-main)' }}>Public Bio:</strong> "{sources.instagram?.bio}"
                  </p>
                  <p style={{ marginBottom: 8 }}>
                    <strong style={{ color: 'var(--text-main)' }}>Aesthetic & Lifestyle:</strong> {sources.instagram?.aesthetic}
                  </p>
                  <div>
                    <strong style={{ color: 'var(--text-main)', display: 'block', marginBottom: 6 }}>Post Vibes:</strong>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                      {(sources.instagram?.postVibes || []).map((vibe, vIdx) => (
                        <span key={vIdx} style={{
                          fontSize: '0.72rem',
                          background: 'rgba(225, 48, 108, 0.1)',
                          color: '#fbcfe8',
                          padding: '2px 6px',
                          borderRadius: 4
                        }}>
                          {vibe}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

                    <div style={{ marginBottom: 24 }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: 12 }}>
              Needs, Hobbies & Interests
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 14 }}>
                            <div style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 8,
                padding: 16
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10, color: 'var(--primary)' }}>
                  <Target size={16} />
                  <h4 style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-main)' }}>Needs</h4>
                </div>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {(analysis.needs || []).map((need, nIdx) => (
                    <li key={nIdx} style={{
                      fontSize: '0.8rem',
                      color: 'var(--text-muted)',
                      marginBottom: 8,
                      lineHeight: 1.4,
                      display: 'flex',
                      gap: 6
                    }}>
                      <span style={{ color: 'var(--primary)' }}>•</span>
                      <span>{need}</span>
                    </li>
                  ))}
                </ul>
              </div>

                            <div style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 8,
                padding: 16
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10, color: '#38bdf8' }}>
                  <Heart size={16} />
                  <h4 style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-main)' }}>Hobbies</h4>
                </div>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {(analysis.hobbies || []).map((hobby, hIdx) => (
                    <li key={hIdx} style={{
                      fontSize: '0.8rem',
                      color: 'var(--text-muted)',
                      marginBottom: 8,
                      lineHeight: 1.4,
                      display: 'flex',
                      gap: 6
                    }}>
                      <span style={{ color: '#38bdf8' }}>•</span>
                      <span>{hobby}</span>
                    </li>
                  ))}
                </ul>
              </div>

                            <div style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 8,
                padding: 16
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10, color: '#a855f7' }}>
                  <BookOpen size={16} />
                  <h4 style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-main)' }}>Interests</h4>
                </div>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {(analysis.interests || []).map((interest, iIdx) => (
                    <li key={iIdx} style={{
                      fontSize: '0.8rem',
                      color: 'var(--text-muted)',
                      marginBottom: 8,
                      lineHeight: 1.4,
                      display: 'flex',
                      gap: 6
                    }}>
                      <span style={{ color: '#a855f7' }}>•</span>
                      <span>{interest}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

                    <div style={{ marginBottom: 24 }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: 12 }}>
              Personality & Dating Dynamics
            </h3>

            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 8,
              padding: 20
            }}>
                            <div style={{ marginBottom: 18 }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 14 }}>
                  {[
                    { label: 'Openness', val: qualities.openness || 90 },
                    { label: 'Conscientiousness', val: qualities.conscientiousness || 92 },
                    { label: 'Extraversion', val: qualities.extraversion || 80 },
                    { label: 'Agreeableness', val: qualities.agreeableness || 88 },
                    { label: 'Emotional Stability', val: 100 - (qualities.neuroticism || 20) }
                  ].map((dim, dIdx) => (
                    <div key={dIdx}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: 4 }}>
                        <span style={{ color: 'var(--text-muted)' }}>{dim.label}</span>
                        <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>{dim.val}%</span>
                      </div>
                      <div style={{
                        height: 5,
                        background: 'var(--bg-subtle)',
                        borderRadius: 3,
                        overflow: 'hidden'
                      }}>
                        <div style={{
                          height: '100%',
                          width: `${dim.val}%`,
                          background: 'var(--primary)',
                          borderRadius: 3
                        }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14, paddingTop: 14, borderTop: '1px solid var(--border-subtle)' }}>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase', marginBottom: 2 }}>Love Language</div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-main)', fontWeight: 500 }}>{qualities.loveLanguage || 'Quality Time'}</p>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase', marginBottom: 2 }}>Communication Style</div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-main)', fontWeight: 500 }}>{qualities.communicationStyle || 'Direct & Warm'}</p>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase', marginBottom: 2, display: 'flex', alignItems: 'center', gap: 4 }}>
                    <ShieldCheck size={13} color="#10b981" />
                    <span>Green Flags</span>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: '#34d399' }}>
                    {(qualities.greenFlags || []).join(' · ')}
                  </p>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase', marginBottom: 2, display: 'flex', alignItems: 'center', gap: 4 }}>
                    <ShieldAlert size={13} color="#fb7185" />
                    <span>Dealbreakers</span>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: '#fb7185' }}>
                    {(qualities.dealbreakers || []).join(' · ')}
                  </p>
                </div>
              </div>

                            {qualities.idealDate && (
                <div style={{ marginTop: 16, padding: 12, background: 'var(--bg-main)', borderRadius: 6, border: '1px solid var(--border-subtle)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 2 }}>
                    <Calendar size={13} color="var(--primary)" />
                    <span style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--primary)', textTransform: 'uppercase' }}>Ideal Date Vision</span>
                  </div>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontStyle: 'italic', lineHeight: 1.4 }}>
                    "{qualities.idealDate}"
                  </p>
                </div>
              )}
            </div>
          </div>

                    <div style={{
            display: 'flex',
            gap: 10,
            justifyContent: 'flex-end',
            flexWrap: 'wrap',
            paddingTop: 14,
            borderTop: '1px solid var(--border-subtle)'
          }}>
            <button
              onClick={() => {
                onClose();
                onViewRankingsForPerson(person);
              }}
              className="btn-secondary"
            >
              <Award size={15} />
              <span>View Match Rankings</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onLaunchDateWithPerson(person);
              }}
              className="btn-primary"
            >
              <Flame size={15} />
              <span>Simulate Date with {person.name.split(' ')[0]}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
