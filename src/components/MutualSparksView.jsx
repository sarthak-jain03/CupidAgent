import React from 'react';
import {
  Sparkles,
  Flame,
  Heart,
  Crown,
  ExternalLink,
  Briefcase,
  Camera,
  ArrowRightLeft
} from 'lucide-react';
import { computeNetworkRankings } from '../data/datingEngineClient';

export default function MutualSparksView({
  people,
  onLaunchDatePair
}) {
  const { mutualSparks } = computeNetworkRankings(people);

  return (
    <div style={{ maxWidth: 1400, margin: '0 auto', padding: '32px 24px' }}>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <span className="glow-pill gold">Reciprocal Equilibrium</span>
          <span className="glow-pill purple">Bilateral Top Pairings</span>
        </div>
        <h1 style={{ fontSize: '2.4rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
          Mutual Sparks: <span className="gradient-text">When Both Agents Choose Each Other</span>
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: 840 }}>
          In an agentic dating network, unilateral admiration is not enough. These couples represent <strong>bilateral mutual sparks</strong>: cases where Agent A placed Person B in their top ranks, and Agent B independently reciprocated.
        </p>
      </div>

      {/* Grid of Mutual Sparks */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(420px, 1fr))',
        gap: 24
      }}>
        {mutualSparks.map((spark, idx) => {
          const personAFull = people.find(p => p.id === spark.personA.id);
          const personBFull = people.find(p => p.id === spark.personB.id);

          return (
            <div
              key={idx}
              className="glass-panel"
              style={{
                padding: 28,
                borderRadius: 24,
                border: '1px solid rgba(244, 63, 94, 0.35)',
                background: 'linear-gradient(135deg, rgba(22, 28, 48, 0.85) 0%, rgba(14, 18, 30, 0.95) 100%)',
                boxShadow: '0 12px 36px rgba(0,0,0,0.4)',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              {/* Top Score Badge */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Sparkles size={16} color="#f59e0b" />
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#fbbf24', textTransform: 'uppercase' }}>
                    Mutual Affinity Match
                  </span>
                </div>
                <div style={{
                  padding: '4px 12px',
                  borderRadius: 9999,
                  background: 'rgba(244, 63, 94, 0.15)',
                  border: '1px solid rgba(244, 63, 94, 0.35)',
                  color: '#fb7185',
                  fontWeight: 800,
                  fontSize: '0.9rem'
                }}>
                  {spark.combinedScore}% Combined
                </div>
              </div>

              {/* Couple Avatars Face-off */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 20px',
                background: 'rgba(0, 0, 0, 0.3)',
                borderRadius: 18,
                marginBottom: 20
              }}>
                {/* Person A */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <img
                    src={spark.personA.avatar}
                    alt={spark.personA.name}
                    style={{
                      width: 54,
                      height: 54,
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '2px solid #f43f5e'
                    }}
                  />
                  <div>
                    <h4 style={{ fontSize: '1rem', fontWeight: 700 }}>{spark.personA.name}</h4>
                    <span style={{ fontSize: '0.72rem', color: '#fb7185' }}>
                      Ranks partner #{spark.personA.rankForOther}
                    </span>
                  </div>
                </div>

                <div style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  background: 'rgba(244, 63, 94, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Heart size={18} color="#f43f5e" fill="#f43f5e" />
                </div>

                {/* Person B */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexDirection: 'row-reverse' }}>
                  <img
                    src={spark.personB.avatar}
                    alt={spark.personB.name}
                    style={{
                      width: 54,
                      height: 54,
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '2px solid #8b5cf6'
                    }}
                  />
                  <div style={{ textAlign: 'right' }}>
                    <h4 style={{ fontSize: '1rem', fontWeight: 700 }}>{spark.personB.name}</h4>
                    <span style={{ fontSize: '0.72rem', color: '#c084fc' }}>
                      Ranks partner #{spark.personB.rankForOther}
                    </span>
                  </div>
                </div>
              </div>

              {/* Spark Reason */}
              <p style={{
                fontSize: '0.85rem',
                color: '#cbd5e1',
                lineHeight: 1.5,
                marginBottom: 24,
                flexGrow: 1
              }}>
                {spark.sparkReason}
              </p>

              {/* Action Button */}
              <button
                onClick={() => onLaunchDatePair(personAFull, personBFull)}
                className="btn-primary"
                style={{ width: '100%', padding: '12px', fontSize: '0.88rem' }}
              >
                <Flame size={16} />
                <span>Simulate Their Date in Arena</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
