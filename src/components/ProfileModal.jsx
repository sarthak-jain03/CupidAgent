import React from 'react';
import {
  X,
  ExternalLink,
  Briefcase,
  Camera,
  Heart,
  Target,
  Sparkles,
  Flame,
  Award,
  ShieldAlert,
  ShieldCheck,
  CalendarHeart,
  Sliders,
  CheckCircle2
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
          width: 900,
          maxWidth: '95vw',
          maxHeight: '92vh',
          overflowY: 'auto',
          padding: 0,
          borderRadius: 24,
          background: 'rgba(11, 15, 26, 0.95)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          position: 'relative'
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 18,
            right: 18,
            zIndex: 10,
            width: 36,
            height: 36,
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.1)',
            border: 'none',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
        >
          <X size={20} />
        </button>

        {/* Modal Banner & Avatar Header */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(244, 63, 94, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%)',
          padding: '36px 36px 28px 36px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          position: 'relative'
        }}>
          <div style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
            <img
              src={person.avatar}
              alt={person.name}
              style={{
                width: 100,
                height: 100,
                borderRadius: '50%',
                objectFit: 'cover',
                border: '3px solid rgba(244, 63, 94, 0.6)',
                boxShadow: '0 0 25px rgba(244, 63, 94, 0.3)'
              }}
            />

            <div style={{ flex: 1, minWidth: 260 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 6 }}>
                <h2 style={{ fontSize: '2rem', fontWeight: 800 }}>{person.name}</h2>
                <span style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>{person.age}</span>
                <span className="glow-pill purple">
                  <Sparkles size={12} />
                  {analysis.agentName || `Agent ${person.name}`}
                </span>
              </div>

              <p style={{ fontSize: '0.95rem', color: '#e2e8f0', marginBottom: 12, lineHeight: 1.4 }}>
                {person.tagline}
              </p>

              {/* Official Verified Links */}
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <a
                  href={person.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '6px 14px',
                    borderRadius: 10,
                    background: 'rgba(10, 102, 194, 0.2)',
                    border: '1px solid rgba(10, 102, 194, 0.4)',
                    color: '#93c5fd',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    textDecoration: 'none'
                  }}
                >
                  <Briefcase size={14} />
                  <span>LinkedIn Profile ({person.linkedinHandle})</span>
                  <ExternalLink size={12} />
                </a>

                <a
                  href={person.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '6px 14px',
                    borderRadius: 10,
                    background: 'rgba(225, 48, 108, 0.2)',
                    border: '1px solid rgba(225, 48, 108, 0.4)',
                    color: '#f472b6',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    textDecoration: 'none'
                  }}
                >
                  <Camera size={14} />
                  <span>Instagram Profile ({person.instagramHandle})</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div style={{ padding: 36 }}>
          {/* Agent Persona Overview Card */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: 16,
            padding: 20,
            marginBottom: 28
          }}>
            <h4 style={{
              fontSize: '0.82rem',
              textTransform: 'uppercase',
              color: 'var(--primary-pink)',
              fontWeight: 700,
              letterSpacing: '0.05em',
              marginBottom: 8,
              display: 'flex',
              alignItems: 'center',
              gap: 6
            }}>
              <Sparkles size={14} />
              The Agent's Synthesized Persona Directive
            </h4>
            <p style={{ fontSize: '0.95rem', color: '#f1f5f9', fontStyle: 'italic', lineHeight: 1.5 }}>
              "{analysis.agentPersona}"
            </p>
          </div>

          {/* Section 1: The Two Official Data Sources */}
          <div style={{ marginBottom: 32 }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span className="glow-pill cyan" style={{ padding: '2px 8px' }}>Ground Truth</span>
              The Two Official Sources Scraped
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 16 }}>
              {/* LinkedIn Box */}
              <div style={{
                background: 'rgba(10, 102, 194, 0.05)',
                border: '1px solid rgba(10, 102, 194, 0.2)',
                borderRadius: 16,
                padding: 20
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                  <Briefcase size={18} color="#60a5fa" />
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#93c5fd' }}>LinkedIn Intelligence</h4>
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  <p style={{ marginBottom: 6 }}>
                    <strong style={{ color: '#fff' }}>Company / Industry:</strong> {sources.linkedin?.company} · {sources.linkedin?.industry}
                  </p>
                  <p style={{ marginBottom: 6 }}>
                    <strong style={{ color: '#fff' }}>Career Synthesis:</strong> {sources.linkedin?.summary}
                  </p>
                  <div style={{ marginTop: 10 }}>
                    <strong style={{ color: '#fff', display: 'block', marginBottom: 6 }}>Extracted Skills:</strong>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {(sources.linkedin?.skills || []).map((skill, sIdx) => (
                        <span key={sIdx} style={{
                          fontSize: '0.72rem',
                          background: 'rgba(10, 102, 194, 0.15)',
                          color: '#bfdbfe',
                          padding: '2px 8px',
                          borderRadius: 6
                        }}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Instagram Box */}
              <div style={{
                background: 'rgba(225, 48, 108, 0.05)',
                border: '1px solid rgba(225, 48, 108, 0.2)',
                borderRadius: 16,
                padding: 20
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                  <Camera size={18} color="#f472b6" />
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#f472b6' }}>Instagram Intelligence</h4>
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  <p style={{ marginBottom: 6 }}>
                    <strong style={{ color: '#fff' }}>Public Bio:</strong> "{sources.instagram?.bio}"
                  </p>
                  <p style={{ marginBottom: 6 }}>
                    <strong style={{ color: '#fff' }}>Visual Aesthetic:</strong> {sources.instagram?.aesthetic}
                  </p>
                  <div style={{ marginTop: 10 }}>
                    <strong style={{ color: '#fff', display: 'block', marginBottom: 6 }}>Post Vibes:</strong>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {(sources.instagram?.postVibes || []).map((vibe, vIdx) => (
                        <span key={vIdx} style={{
                          fontSize: '0.72rem',
                          background: 'rgba(225, 48, 108, 0.15)',
                          color: '#fbcfe8',
                          padding: '2px 8px',
                          borderRadius: 6
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

          {/* Section 2: Agent Reading Analysis (Needs, Hobbies, Interests) */}
          <div style={{ marginBottom: 32 }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span className="glow-pill gold" style={{ padding: '2px 8px' }}>Agent Analysis</span>
              Needs · Hobbies · Interests
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 16 }}>
              {/* Needs Box */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: 16,
                padding: 20
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                  <Target size={18} color="#f43f5e" />
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#f43f5e' }}>Needs in Love</h4>
                </div>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {(analysis.needs || []).map((need, nIdx) => (
                    <li key={nIdx} style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 8,
                      fontSize: '0.82rem',
                      color: '#e2e8f0',
                      marginBottom: 10,
                      lineHeight: 1.4
                    }}>
                      <span style={{ color: '#f43f5e', fontSize: '1.1rem', lineHeight: 1 }}>•</span>
                      <span>{need}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Hobbies Box */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: 16,
                padding: 20
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                  <Heart size={18} color="#a855f7" />
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#c084fc' }}>Hobbies & Lifestyle</h4>
                </div>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {(analysis.hobbies || []).map((hobby, hIdx) => (
                    <li key={hIdx} style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 8,
                      fontSize: '0.82rem',
                      color: '#e2e8f0',
                      marginBottom: 10,
                      lineHeight: 1.4
                    }}>
                      <span style={{ color: '#a855f7', fontSize: '1.1rem', lineHeight: 1 }}>•</span>
                      <span>{hobby}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Interests Box */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: 16,
                padding: 20
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                  <Sparkles size={18} color="#06b6d4" />
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#38bdf8' }}>Interests & Philosophy</h4>
                </div>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {(analysis.interests || []).map((interest, iIdx) => (
                    <li key={iIdx} style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 8,
                      fontSize: '0.82rem',
                      color: '#e2e8f0',
                      marginBottom: 10,
                      lineHeight: 1.4
                    }}>
                      <span style={{ color: '#06b6d4', fontSize: '1.1rem', lineHeight: 1 }}>•</span>
                      <span>{interest}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Section 3: Qualities & Psychological Model */}
          <div style={{ marginBottom: 32 }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span className="glow-pill emerald" style={{ padding: '2px 8px' }}>Psychology</span>
              Qualities & Dating Dynamics
            </h3>

            <div style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: 16,
              padding: 24
            }}>
              {/* Personality Dimensions Sliders */}
              <div style={{ marginBottom: 20 }}>
                <h4 style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: 14 }}>Big 5 Psychological Dimensions:</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
                  {[
                    { label: 'Openness', val: qualities.openness || 90, color: '#ec4899' },
                    { label: 'Conscientiousness', val: qualities.conscientiousness || 92, color: '#8b5cf6' },
                    { label: 'Extraversion', val: qualities.extraversion || 80, color: '#06b6d4' },
                    { label: 'Agreeableness', val: qualities.agreeableness || 88, color: '#10b981' },
                    { label: 'Emotional Stability', val: 100 - (qualities.neuroticism || 20), color: '#f59e0b' }
                  ].map((dim, dIdx) => (
                    <div key={dIdx}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: 4 }}>
                        <span style={{ color: '#e2e8f0' }}>{dim.label}</span>
                        <span style={{ fontWeight: 700, color: dim.color }}>{dim.val}%</span>
                      </div>
                      <div style={{
                        height: 6,
                        background: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: 3,
                        overflow: 'hidden'
                      }}>
                        <div style={{
                          height: '100%',
                          width: `${dim.val}%`,
                          background: dim.color,
                          borderRadius: 3
                        }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Romantic Dynamics: Love language, Green flags, Dealbreakers */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16, paddingTop: 16, borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
                <div>
                  <h5 style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase', marginBottom: 4 }}>Love Language</h5>
                  <p style={{ fontSize: '0.88rem', color: '#fff', fontWeight: 600 }}>{qualities.loveLanguage || 'Quality Time'}</p>
                </div>
                <div>
                  <h5 style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase', marginBottom: 4 }}>Communication Style</h5>
                  <p style={{ fontSize: '0.88rem', color: '#fff', fontWeight: 600 }}>{qualities.communicationStyle || 'Direct & Warm'}</p>
                </div>
                <div>
                  <h5 style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 4 }}>
                    <ShieldCheck size={14} color="#10b981" />
                    Green Flags
                  </h5>
                  <p style={{ fontSize: '0.82rem', color: '#34d399' }}>
                    {(qualities.greenFlags || []).join(' · ')}
                  </p>
                </div>
                <div>
                  <h5 style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 4 }}>
                    <ShieldAlert size={14} color="#f43f5e" />
                    Dealbreakers
                  </h5>
                  <p style={{ fontSize: '0.82rem', color: '#fb7185' }}>
                    {(qualities.dealbreakers || []).join(' · ')}
                  </p>
                </div>
              </div>

              {/* Ideal Date */}
              {qualities.idealDate && (
                <div style={{ marginTop: 20, padding: 14, background: 'rgba(244, 63, 94, 0.06)', borderRadius: 12, border: '1px solid rgba(244, 63, 94, 0.15)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                    <CalendarHeart size={15} color="#f43f5e" />
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#fb7185', textTransform: 'uppercase' }}>Ideal Date Vision</span>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: '#ffe4e6', fontStyle: 'italic', lineHeight: 1.4 }}>
                    "{qualities.idealDate}"
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Action CTAs */}
          <div style={{
            display: 'flex',
            gap: 16,
            justifyContent: 'flex-end',
            flexWrap: 'wrap',
            paddingTop: 16,
            borderTop: '1px solid rgba(255, 255, 255, 0.08)'
          }}>
            <button
              onClick={() => {
                onClose();
                onViewRankingsForPerson(person);
              }}
              className="btn-secondary"
            >
              <Award size={16} />
              <span>View Match Rankings</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onLaunchDateWithPerson(person);
              }}
              className="btn-primary"
            >
              <Flame size={16} />
              <span>Launch Live Date with {person.name.split(' ')[0]}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
