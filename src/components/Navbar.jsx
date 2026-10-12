import React from 'react';
import {
  Heart,
  Users,
  Flame,
  Award,
  Sparkles,
  Plus
} from 'lucide-react';

export default function Navbar({
  activeTab,
  setActiveTab,
  peopleCount,
  onOpenNewPersonModal
}) {
  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'var(--bg-surface)',
      borderBottom: '1px solid var(--border-subtle)',
      padding: '12px 24px'
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
        <div
          onClick={() => setActiveTab('roster')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            cursor: 'pointer'
          }}
        >
          <div style={{
            width: 32,
            height: 32,
            borderRadius: 6,
            background: 'var(--primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Heart size={16} color="#ffffff" fill="#ffffff" />
          </div>
          <div>
            <span style={{
              fontSize: '1.05rem',
              fontWeight: 700,
              color: 'var(--text-main)',
              letterSpacing: '-0.02em'
            }}>
              CupidAgent
            </span>
          </div>
        </div>

        <nav style={{
          display: 'flex',
          alignItems: 'center',
          background: 'var(--bg-main)',
          padding: 3,
          borderRadius: 6,
          border: '1px solid var(--border-subtle)'
        }}>
          <button
            onClick={() => setActiveTab('roster')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 7,
              padding: '6px 14px',
              borderRadius: 4,
              background: activeTab === 'roster' ? 'var(--bg-subtle)' : 'transparent',
              color: activeTab === 'roster' ? 'var(--text-main)' : 'var(--text-muted)',
              fontWeight: activeTab === 'roster' ? 600 : 500,
              fontSize: '0.85rem',
              cursor: 'pointer',
              border: 'none',
              transition: 'all 0.15s ease'
            }}
          >
            <Users size={15} />
            <span>Profiles</span>
            <span style={{
              background: 'rgba(255, 255, 255, 0.08)',
              padding: '1px 6px',
              borderRadius: 10,
              fontSize: '0.7rem',
              color: 'var(--text-muted)'
            }}>{peopleCount}</span>
          </button>

          <button
            onClick={() => setActiveTab('arena')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 7,
              padding: '6px 14px',
              borderRadius: 4,
              background: activeTab === 'arena' ? 'var(--bg-subtle)' : 'transparent',
              color: activeTab === 'arena' ? 'var(--text-main)' : 'var(--text-muted)',
              fontWeight: activeTab === 'arena' ? 600 : 500,
              fontSize: '0.85rem',
              cursor: 'pointer',
              border: 'none',
              transition: 'all 0.15s ease'
            }}
          >
            <Flame size={15} />
            <span>Date Simulator</span>
          </button>

          <button
            onClick={() => setActiveTab('rankings')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 7,
              padding: '6px 14px',
              borderRadius: 4,
              background: activeTab === 'rankings' ? 'var(--bg-subtle)' : 'transparent',
              color: activeTab === 'rankings' ? 'var(--text-main)' : 'var(--text-muted)',
              fontWeight: activeTab === 'rankings' ? 600 : 500,
              fontSize: '0.85rem',
              cursor: 'pointer',
              border: 'none',
              transition: 'all 0.15s ease'
            }}
          >
            <Award size={15} />
            <span>Rankings</span>
          </button>

          <button
            onClick={() => setActiveTab('sparks')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 7,
              padding: '6px 14px',
              borderRadius: 4,
              background: activeTab === 'sparks' ? 'var(--bg-subtle)' : 'transparent',
              color: activeTab === 'sparks' ? 'var(--text-main)' : 'var(--text-muted)',
              fontWeight: activeTab === 'sparks' ? 600 : 500,
              fontSize: '0.85rem',
              cursor: 'pointer',
              border: 'none',
              transition: 'all 0.15s ease'
            }}
          >
            <Sparkles size={15} />
            <span>Mutual Sparks</span>
          </button>
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button
            onClick={onOpenNewPersonModal}
            className="btn-primary"
            style={{ padding: '7px 14px', fontSize: '0.82rem' }}
            title="Add a new profile with LinkedIn and Instagram links"
          >
            <Plus size={15} />
            <span>Add Profile</span>
          </button>
        </div>
      </div>
    </header>
  );
}
