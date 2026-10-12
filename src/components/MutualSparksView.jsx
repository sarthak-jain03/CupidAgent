import React from 'react';
import {
  Heart,
  Flame
} from 'lucide-react';
import { computeNetworkRankings } from '../data/datingEngineClient';
import Avatar from './Avatar';

export default function MutualSparksView({
  people,
  onLaunchDatePair
}) {
  const { mutualSparks } = computeNetworkRankings(people);

  return (
    <div style={{ maxWidth: 1400, margin: '0 auto', padding: '32px 24px' }}>
            <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: 6 }}>
          Mutual Sparks
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: 840 }}>
          Pairs where both agents independently ranked each other among their top choices, indicating reciprocal compatibility.
        </p>
      </div>

            <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
        gap: 18
      }}>
        {mutualSparks.map((spark, idx) => {
          const personAFull = people.find(p => p.id === spark.personA.id);
          const personBFull = people.find(p => p.id === spark.personB.id);

          return (
            <div
              key={idx}
              className="glass-panel"
              style={{
                padding: 22,
                borderRadius: 8,
                display: 'flex',
                flexDirection: 'column'
              }}
            >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-main)' }}>
                  Reciprocal Match
                </span>
                <span style={{
                  padding: '2px 8px',
                  borderRadius: 4,
                  background: 'var(--primary-subtle)',
                  color: '#fda4af',
                  fontWeight: 600,
                  fontSize: '0.82rem'
                }}>
                  {spark.combinedScore}% Compatibility
                </span>
              </div>

                            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 16px',
                background: 'var(--bg-main)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 6,
                marginBottom: 16
              }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Avatar name={spark.personA.name} size={42} />
                  <div>
                    <h4 style={{ fontSize: '0.88rem', fontWeight: 600 }}>{spark.personA.name}</h4>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>
                      Ranks partner #{spark.personA.rankForOther}
                    </span>
                  </div>
                </div>

                <Heart size={16} color="var(--primary)" fill="var(--primary)" />

                                <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexDirection: 'row-reverse' }}>
                  <Avatar name={spark.personB.name} size={42} />
                  <div style={{ textAlign: 'right' }}>
                    <h4 style={{ fontSize: '0.88rem', fontWeight: 600 }}>{spark.personB.name}</h4>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>
                      Ranks partner #{spark.personB.rankForOther}
                    </span>
                  </div>
                </div>
              </div>

                            <p style={{
                fontSize: '0.82rem',
                color: 'var(--text-muted)',
                lineHeight: 1.4,
                marginBottom: 18,
                flexGrow: 1
              }}>
                {spark.sparkReason}
              </p>

                            <button
                onClick={() => onLaunchDatePair(personAFull, personBFull)}
                className="btn-primary"
                style={{ width: '100%', padding: '8px', fontSize: '0.82rem' }}
              >
                <Flame size={13} />
                <span>Simulate Their Date</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
