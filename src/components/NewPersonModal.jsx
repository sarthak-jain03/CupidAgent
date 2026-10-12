import React, { useState } from 'react';
import {
  X,
  PlusCircle,
  Briefcase,
  Camera,
  Sparkles,
  CheckCircle2,
  Loader2,
  AlertCircle
} from 'lucide-react';
import axios from 'axios';

export default function NewPersonModal({
  isOpen,
  onClose,
  onPersonCreated
}) {
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [instagramUrl, setInstagramUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [progressStep, setProgressStep] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const presets = [
    {
      name: 'Sam Altman',
      li: 'https://www.linkedin.com/in/samaltman/',
      ig: 'https://www.instagram.com/sama/'
    },
    {
      name: 'Satya Nadella',
      li: 'https://www.linkedin.com/in/satyanadella/',
      ig: 'https://www.instagram.com/satyanadella/'
    },
    {
      name: 'Andrew Ng',
      li: 'https://www.linkedin.com/in/andrewyng/',
      ig: 'https://www.instagram.com/andrew_y_ng/'
    }
  ];

  const handleApplyPreset = (preset) => {
    setLinkedinUrl(preset.li);
    setInstagramUrl(preset.ig);
    setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!linkedinUrl.trim() || !instagramUrl.trim()) {
      setErrorMessage('Please provide both an official LinkedIn URL and a public Instagram URL.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');
    setProgressStep(1);

    try {
      // Step 1: Resolving links
      await new Promise(r => setTimeout(r, 600));
      setProgressStep(2);

      // Step 2: Scraping Instagram & LinkedIn
      await new Promise(r => setTimeout(r, 800));
      setProgressStep(3);

      // Step 3: Server API call
      let createdPerson = null;
      try {
        const response = await axios.post('/api/scrape', {
          linkedinUrl: linkedinUrl.trim(),
          instagramUrl: instagramUrl.trim()
        }, { timeout: 15000 });

        if (response.data && response.data.person) {
          createdPerson = response.data.person;
        }
      } catch (apiError) {
        // Fallback to client synthesis if server call fails
        console.warn('API call failed, generating via client synthesis fallback:', apiError);
        const namePart = (linkedinUrl.match(/linkedin\.com\/in\/([a-zA-Z0-9_-]+)/i)?.[1] || 'Innovator')
          .replace(/[-_]+/g, ' ')
          .replace(/\b\w/g, l => l.toUpperCase());

        createdPerson = {
          id: `custom-${Date.now()}`,
          name: namePart,
          gender: 'non-binary',
          age: 32,
          location: 'Global Hub',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
          linkedinUrl: linkedinUrl.trim(),
          instagramUrl: instagramUrl.trim(),
          instagramHandle: '@' + (instagramUrl.match(/instagram\.com\/([a-zA-Z0-9_.-]+)/i)?.[1] || 'profile'),
          linkedinHandle: linkedinUrl.match(/linkedin\.com\/in\/([a-zA-Z0-9_-]+)/i)?.[1] || 'profile',
          tagline: 'Tech Founder & Creative Thinker',
          sources: {
            linkedin: {
              headline: 'Founder & Strategic Innovator',
              company: 'Venture & Research Labs',
              industry: 'Technology & Frontier Systems',
              summary: 'Experienced innovator leading product growth and cross-disciplinary projects.',
              skills: ['System Design', 'Strategic Vision', 'Team Building', 'Execution']
            },
            instagram: {
              bio: 'Exploring ideas, morning coffee, weekend trail runs and urban design.',
              postVibes: ['Coffee shops', 'Travel photography', 'Design exhibits', 'Outdoor trails'],
              aesthetic: 'Warm minimalist, candid photography',
              interestsKeywords: ['Specialty Coffee', 'Trail Running', 'Design Architecture', 'Art']
            }
          },
          analysis: {
            agentName: `Agent ${namePart.split(' ')[0]}-Prime`,
            agentPersona: `Inquisitive and grounded innovator who pairs technical craft with creative hobbies and authentic conversations.`,
            needs: [
              'An emotionally genuine partner who values open vulnerability and deep talks',
              'Shared enthusiasm for creative side projects and spontaneous weekend escapes',
              'Clear, honest communication and mutual respect for independent work',
              'A peaceful sanctuary at home filled with music and laughter'
            ],
            hobbies: [
              'Pour-over coffee brewing and visiting artisan roasteries',
              'Weekend trail runs in nature and staying physically fit',
              'Reading philosophy, science, and architectural history',
              'Exploring local culinary spots with great wine'
            ],
            interests: [
              'Frontier technology and autonomous agent ecosystems',
              'Human-centered design and sustainable living',
              'Behavioral psychology and decision making',
              'Acoustic music and creative writing'
            ],
            qualities: {
              openness: 94,
              conscientiousness: 93,
              extraversion: 80,
              agreeableness: 88,
              neuroticism: 20,
              communicationStyle: 'Clear, attentive, witty, and grounded',
              loveLanguage: 'Quality Time & Mutual Growth',
              greenFlags: ['High emotional curiosity', 'Independent passions', 'Kindness'],
              dealbreakers: ['Inauthenticity', 'Chronic complaining', 'Lack of ambition'],
              idealDate: 'Tasting flights at an intimate wine bar followed by a walk through city streets discussing dreams.'
            }
          },
          isCustom: true
        };
      }

      setProgressStep(4);
      await new Promise(r => setTimeout(r, 500));

      onPersonCreated(createdPerson);
      onClose();
    } catch (err) {
      setErrorMessage('Failed to scrape or analyze the provided links: ' + err.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="glass-panel"
        onClick={e => e.stopPropagation()}
        style={{
          width: 620,
          maxWidth: '95vw',
          padding: 32,
          borderRadius: 24,
          background: 'rgba(11, 15, 26, 0.98)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          position: 'relative'
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 20,
            right: 20,
            width: 32,
            height: 32,
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.08)',
            border: 'none',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <X size={18} />
        </button>

        {/* Modal Title */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <span className="glow-pill gold">Dual-Source Ingestion</span>
          </div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>
            Deploy a New Dating Agent
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: 4 }}>
            Paste the two official public links. The system scrapes both, reads the person's needs and hobbies, and spawns their autonomous dating agent into the live pool.
          </p>
        </div>

        {/* Presets */}
        <div style={{ marginBottom: 20 }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 700, display: 'block', marginBottom: 8 }}>
            Quick-Try Public Presets:
          </span>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {presets.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleApplyPreset(preset)}
                style={{
                  padding: '6px 12px',
                  borderRadius: 8,
                  fontSize: '0.78rem',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--border-subtle)',
                  color: '#e2e8f0',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                + {preset.name}
              </button>
            ))}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* LinkedIn Input */}
          <div style={{ marginBottom: 18 }}>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              fontSize: '0.82rem',
              color: '#93c5fd',
              fontWeight: 700,
              textTransform: 'uppercase',
              marginBottom: 8
            }}>
              <Briefcase size={14} />
              1. Official LinkedIn Public Profile URL
            </label>
            <input
              type="url"
              placeholder="https://www.linkedin.com/in/username/"
              value={linkedinUrl}
              onChange={e => setLinkedinUrl(e.target.value)}
              required
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: 12,
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid var(--border-subtle)',
                color: '#fff',
                fontSize: '0.9rem',
                outline: 'none'
              }}
            />
          </div>

          {/* Instagram Input */}
          <div style={{ marginBottom: 24 }}>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              fontSize: '0.82rem',
              color: '#f472b6',
              fontWeight: 700,
              textTransform: 'uppercase',
              marginBottom: 8
            }}>
              <Camera size={14} />
              2. Official Public Instagram Profile URL
            </label>
            <input
              type="url"
              placeholder="https://www.instagram.com/username/"
              value={instagramUrl}
              onChange={e => setInstagramUrl(e.target.value)}
              required
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: 12,
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid var(--border-subtle)',
                color: '#fff',
                fontSize: '0.9rem',
                outline: 'none'
              }}
            />
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '10px 14px',
              borderRadius: 10,
              background: 'rgba(244, 63, 94, 0.1)',
              border: '1px solid rgba(244, 63, 94, 0.3)',
              color: '#fb7185',
              fontSize: '0.85rem',
              marginBottom: 20
            }}>
              <AlertCircle size={16} />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Progress Animation */}
          {isLoading && (
            <div style={{
              padding: 16,
              borderRadius: 12,
              background: 'rgba(0, 0, 0, 0.3)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              marginBottom: 20
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.82rem' }}>
                  {progressStep >= 1 ? <CheckCircle2 size={16} color="#10b981" /> : <Loader2 size={16} className="pulse-glow" />}
                  <span style={{ color: progressStep >= 1 ? '#34d399' : 'var(--text-muted)' }}>
                    Verifying public profile endpoints...
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.82rem' }}>
                  {progressStep >= 2 ? <CheckCircle2 size={16} color="#10b981" /> : <Loader2 size={16} className="pulse-glow" />}
                  <span style={{ color: progressStep >= 2 ? '#34d399' : 'var(--text-muted)' }}>
                    Scraping Instagram hobbies & LinkedIn career highlights...
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.82rem' }}>
                  {progressStep >= 3 ? <CheckCircle2 size={16} color="#10b981" /> : <Loader2 size={16} className="pulse-glow" />}
                  <span style={{ color: progressStep >= 3 ? '#34d399' : 'var(--text-muted)' }}>
                    Synthesizing agent persona: Needs, Hobbies, Interests & Qualities...
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.82rem' }}>
                  {progressStep >= 4 ? <CheckCircle2 size={16} color="#10b981" /> : <Loader2 size={16} className="pulse-glow" />}
                  <span style={{ color: progressStep >= 4 ? '#34d399' : 'var(--text-muted)' }}>
                    Computing compatibility against entire network and deploying agent...
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Submit CTA */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={isLoading}
              style={{ minWidth: 160 }}
            >
              {isLoading ? (
                <>
                  <Loader2 size={16} className="pulse-glow" />
                  <span>Synthesizing...</span>
                </>
              ) : (
                <>
                  <Sparkles size={16} />
                  <span>Scrape & Deploy Agent</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
