import React, { useState } from 'react';
import {
  Heart,
  Users,
  Flame,
  Award,
  Sparkles,
  PlusCircle,
  Video,
  FileCode2,
  Volume2,
  VolumeX,
  Cpu
} from 'lucide-react';
import { toggleMute, getMuteState } from '../utils/soundEffects';

export default function Navbar({
  activeTab,
  setActiveTab,
  peopleCount,
  onOpenNewPersonModal,
  onOpenVideoWalkthrough,
  onOpenTechDocs
}) {
  const [muted, setMuted] = useState(getMuteState());

  const handleToggleSound = () => {
    const isMuted = toggleMute();
    setMuted(isMuted);
  };

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'rgba(6, 8, 14, 0.85)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      padding: '12px 24px',
    }}>
      <div style={{
        maxWidth: 1400,
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 16
      }}>
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            background: 'linear-gradient(135deg, #f43f5e, #8b5cf6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 20px rgba(244, 63, 94, 0.4)',
            cursor: 'pointer'
          }} onClick={() => setActiveTab('roster')}>
            <Heart size={24} color="#fff" fill="#fff" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.35rem',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                background: 'linear-gradient(90deg, #fff 0%, #f43f5e 50%, #c084fc 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                CupidAgent
              </span>
              <span className="glow-pill" style={{ fontSize: '0.65rem', padding: '2px 8px' }}>
                Multi-Agent
              </span>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Dual-Source Autonomous Dating System
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          background: 'rgba(255, 255, 255, 0.04)',
          padding: 4,
          borderRadius: 14,
          border: '1px solid rgba(255, 255, 255, 0.06)'
        }}>
          <button
            onClick={() => setActiveTab('roster')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '8px 16px',
              borderRadius: 10,
              background: activeTab === 'roster' ? 'rgba(244, 63, 94, 0.2)' : 'transparent',
              color: activeTab === 'roster' ? '#fda4af' : 'var(--text-muted)',
              fontWeight: activeTab === 'roster' ? 700 : 500,
              fontSize: '0.88rem',
              cursor: 'pointer',
              transition: 'all 0.2s',
              border: activeTab === 'roster' ? '1px solid rgba(244, 63, 94, 0.35)' : '1px solid transparent'
            }}
          >
            <Users size={16} />
            <span>Roster</span>
            <span style={{
              background: 'rgba(255, 255, 255, 0.1)',
              padding: '1px 6px',
              borderRadius: 8,
              fontSize: '0.72rem'
            }}>{peopleCount}</span>
          </button>

          <button
            onClick={() => setActiveTab('arena')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '8px 16px',
              borderRadius: 10,
              background: activeTab === 'arena' ? 'rgba(244, 63, 94, 0.2)' : 'transparent',
              color: activeTab === 'arena' ? '#fda4af' : 'var(--text-muted)',
              fontWeight: activeTab === 'arena' ? 700 : 500,
              fontSize: '0.88rem',
              cursor: 'pointer',
              transition: 'all 0.2s',
              border: activeTab === 'arena' ? '1px solid rgba(244, 63, 94, 0.35)' : '1px solid transparent'
            }}
          >
            <Flame size={16} />
            <span>Dating Arena</span>
            <span className="glow-pill" style={{ fontSize: '0.65rem', padding: '1px 5px', color: '#f43f5e' }}>Live</span>
          </button>

          <button
            onClick={() => setActiveTab('rankings')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '8px 16px',
              borderRadius: 10,
              background: activeTab === 'rankings' ? 'rgba(244, 63, 94, 0.2)' : 'transparent',
              color: activeTab === 'rankings' ? '#fda4af' : 'var(--text-muted)',
              fontWeight: activeTab === 'rankings' ? 700 : 500,
              fontSize: '0.88rem',
              cursor: 'pointer',
              transition: 'all 0.2s',
              border: activeTab === 'rankings' ? '1px solid rgba(244, 63, 94, 0.35)' : '1px solid transparent'
            }}
          >
            <Award size={16} />
            <span>Rankings</span>
          </button>

          <button
            onClick={() => setActiveTab('sparks')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '8px 16px',
              borderRadius: 10,
              background: activeTab === 'sparks' ? 'rgba(244, 63, 94, 0.2)' : 'transparent',
              color: activeTab === 'sparks' ? '#fda4af' : 'var(--text-muted)',
              fontWeight: activeTab === 'sparks' ? 700 : 500,
              fontSize: '0.88rem',
              cursor: 'pointer',
              transition: 'all 0.2s',
              border: activeTab === 'sparks' ? '1px solid rgba(244, 63, 94, 0.35)' : '1px solid transparent'
            }}
          >
            <Sparkles size={16} />
            <span>Mutual Sparks</span>
          </button>
        </nav>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button
            onClick={onOpenNewPersonModal}
            className="btn-primary"
            style={{ padding: '8px 14px', fontSize: '0.85rem' }}
            title="Deploy a new dating agent by pasting LinkedIn and Instagram URLs"
          >
            <PlusCircle size={16} />
            <span>Deploy Agent</span>
          </button>

          <button
            onClick={onOpenVideoWalkthrough}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '8px 12px',
              borderRadius: 10,
              background: 'rgba(236, 72, 153, 0.15)',
              border: '1px solid rgba(236, 72, 153, 0.3)',
              color: '#f472b6',
              fontSize: '0.82rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
            title="3-Minute YouTube Video Recording Walkthrough Guide"
          >
            <Video size={15} />
            <span>3-Min Video Tour</span>
          </button>

          <button
            onClick={onOpenTechDocs}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '8px 12px',
              borderRadius: 10,
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-main)',
              fontSize: '0.82rem',
              fontWeight: 500,
              cursor: 'pointer'
            }}
            title="Technical Section: Scraper stack and agent architecture"
          >
            <FileCode2 size={15} />
            <span>Tech Specs</span>
          </button>

          <button
            onClick={handleToggleSound}
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid var(--border-subtle)',
              color: muted ? 'var(--text-dim)' : 'var(--primary-rose)',
              cursor: 'pointer'
            }}
            title={muted ? 'Unmute Sound Effects' : 'Mute Sound Effects'}
          >
            {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
        </div>
      </div>
    </header>
  );
}
