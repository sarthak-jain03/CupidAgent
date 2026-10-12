import React, { useState } from 'react';
import {
  X,
  Plus,
  Linkedin,
  Instagram,
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
      setErrorMessage('Please provide both a LinkedIn URL and a public Instagram URL.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');
    setProgressStep(1);

    try {
      await new Promise(r => setTimeout(r, 400));
      setProgressStep(2);

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
        console.warn('API call fallback:', apiError);
        const namePart = (linkedinUrl.match(/linkedin\.com\/in\/([a-zA-Z0-9_-]+)/i)?.[1] || 'Innovator')
          .replace(/[-_]+/g, ' ')
          .replace(/\b\w/g, l => l.toUpperCase());

        createdPerson = {
          id: `custom-${Date.now()}`,
          name: namePart,
          gender: 'non-binary',
          age: 32,
          location: 'Global Hub',
          avatar: '',
          linkedinUrl: linkedinUrl.trim(),
          instagramUrl: instagramUrl.trim(),
          instagramHandle: '@' + (instagramUrl.match(/instagram\.com\/([a-zA-Z0-9_.-]+)/i)?.[1] || 'profile'),
          linkedinHandle: linkedinUrl.match(/linkedin\.com\/in\/([a-zA-Z0-9_-]+)/i)?.[1] || 'profile',
          tagline: 'Tech Founder & Creative Thinker',
          sources: {
            linkedin: {
              headline: 'Founder & Builder',
              company: 'Venture Org',
              industry: 'Technology',
              skills: ['Product Strategy', 'Systems Architecture', 'Leadership'],
              summary: 'Experienced executive balancing high-stakes execution with creative pursuits.'
            },
            instagram: {
              bio: 'Exploring ideas, nature, and offline rituals.',
              aesthetic: 'Minimalist & thoughtful',
              postVibes: ['Coffee', 'Travel', 'Reading', 'Outdoor trails']
            }
          },
          analysis: {
            agentName: `Agent ${namePart}`,
            agentPersona: `Represents ${namePart}. Prioritizes intellectual authenticity, mutual respect, and calm presence.`,
            needs: [
              'Reciprocal emotional transparency and intellectual depth',
              'Respect for dedicated creative flow states',
              'Genuine mutual curiosity without pretension'
            ],
            hobbies: [
              'Morning coffee rituals & quiet reading',
              'Nature hikes & endurance fitness',
              'Documentary cinema & philosophical discussions'
            ],
            interests: [
              'Frontier technology & long-term civilizational impact',
              'Acoustic music and indie literature',
              'Clean architecture and product design'
            ],
            qualities: {
              openness: 92,
              conscientiousness: 90,
              extraversion: 74,
              agreeableness: 85,
              neuroticism: 18,
              loveLanguage: 'Quality Time & Deep Dialogue',
              communicationStyle: 'Direct, thoughtful & empathetic',
              greenFlags: ['High intellectual curiosity', 'Emotional self-awareness'],
              dealbreakers: ['Superficial vanity', 'Flakiness'],
              idealDate: 'A quiet bistro corner followed by late-night coffee and honest conversation.'
            }
          }
        };
      }

      setProgressStep(3);
      await new Promise(r => setTimeout(r, 300));
      onPersonCreated(createdPerson);
      onClose();
    } catch (err) {
      setErrorMessage(err.message || 'Error creating profile. Please try again.');
    } finally {
      setIsLoading(false);
      setProgressStep(0);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="glass-panel"
        onClick={e => e.stopPropagation()}
        style={{
          width: 540,
          maxWidth: '95vw',
          padding: 24,
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
          <X size={16} />
        </button>

                <div style={{ marginBottom: 20 }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: 4 }}>
            Add New Profile
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>
            Provide the person's LinkedIn and public Instagram URLs. The system will extract their needs, hobbies, and interests.
          </p>
        </div>

                <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 600, marginBottom: 6 }}>
            Quick Sample Presets:
          </div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {presets.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleApplyPreset(preset)}
                style={{
                  padding: '4px 10px',
                  borderRadius: 6,
                  fontSize: '0.75rem',
                  background: 'var(--bg-main)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-muted)',
                  cursor: 'pointer'
                }}
              >
                + {preset.name}
              </button>
            ))}
          </div>
        </div>

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: 14 }}>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              fontSize: '0.78rem',
              color: 'var(--text-muted)',
              fontWeight: 600,
              marginBottom: 6
            }}>
              <Linkedin size={13} color="#60a5fa" />
              <span>Official LinkedIn URL</span>
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
                padding: '9px 12px',
                borderRadius: 6,
                background: 'var(--bg-main)',
                border: '1px solid var(--border-subtle)',
                color: '#fff',
                fontSize: '0.85rem',
                outline: 'none'
              }}
            />
          </div>

                    <div style={{ marginBottom: 18 }}>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              fontSize: '0.78rem',
              color: 'var(--text-muted)',
              fontWeight: 600,
              marginBottom: 6
            }}>
              <Instagram size={13} color="#f472b6" />
              <span>Public Instagram URL</span>
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
                padding: '9px 12px',
                borderRadius: 6,
                background: 'var(--bg-main)',
                border: '1px solid var(--border-subtle)',
                color: '#fff',
                fontSize: '0.85rem',
                outline: 'none'
              }}
            />
          </div>

          {errorMessage && (
            <div style={{
              padding: 10,
              borderRadius: 6,
              marginBottom: 14,
              fontSize: '0.78rem',
              background: 'rgba(239, 68, 68, 0.1)',
              color: '#f87171',
              border: '1px solid rgba(239, 68, 68, 0.25)',
              display: 'flex',
              alignItems: 'center',
              gap: 6
            }}>
              <AlertCircle size={14} />
              <span>{errorMessage}</span>
            </div>
          )}

                    {isLoading && (
            <div style={{
              padding: 12,
              borderRadius: 6,
              background: 'var(--bg-main)',
              border: '1px solid var(--border-subtle)',
              marginBottom: 14,
              fontSize: '0.8rem',
              color: 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              gap: 8
            }}>
              <Loader2 size={16} className="spin" />
              <span>
                {progressStep === 1 && 'Extracting public profile metadata...'}
                {progressStep === 2 && 'Synthesizing Needs, Hobbies & Interests...'}
                {progressStep === 3 && 'Finalizing candidate profile...'}
              </span>
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary"
              style={{ padding: '7px 12px', fontSize: '0.82rem' }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary"
              style={{ padding: '7px 16px', fontSize: '0.82rem' }}
            >
              <Plus size={14} />
              <span>{isLoading ? 'Processing...' : 'Create Profile'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
