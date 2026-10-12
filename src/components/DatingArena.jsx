import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Avatar from './Avatar';
import {
  Flame,
  Play,
  Pause,
  RotateCcw,
  FastForward,
  Heart,
  MapPin,
  CheckCircle2,
  FileText,
  MessageCircle,
  Award
} from 'lucide-react';
import { VENUES, simulateDateConversation } from '../data/datingEngineClient';

export default function DatingArena({
  people,
  preselectedA,
  preselectedB,
  onViewRankingsForPerson
}) {
  const [personAId, setPersonAId] = useState(preselectedA?.id || people[0]?.id);
  const [personBId, setPersonBId] = useState(preselectedB?.id || people[1]?.id);
  const [venueId, setVenueId] = useState(VENUES[0].id);

  const [currentDateData, setCurrentDateData] = useState(null);
  const [currentTurnIndex, setCurrentTurnIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isCompleted, setIsCompleted] = useState(false);

  const dialogueContainerRef = useRef(null);

  useEffect(() => {
    if (preselectedA) setPersonAId(preselectedA.id);
  }, [preselectedA]);

  useEffect(() => {
    if (preselectedB) setPersonBId(preselectedB.id);
  }, [preselectedB]);

  const personA = people.find(p => p.id === personAId) || people[0];
  const personB = people.find(p => p.id === personBId) || people[1];
  const selectedVenue = VENUES.find(v => v.id === venueId) || VENUES[0];

  const handleStartNewDate = async (pA = personA, pB = personB, vId = venueId) => {
    if (pA.id === pB.id) {
      alert("Please select two different people for the dating simulation.");
      return;
    }
    try {
      const res = await axios.post('/api/date', {
        personAId: pA.id,
        personBId: pB.id,
        venueId: vId
      });
      if (res.data && res.data.dialogue && res.data.dialogue.length > 0) {
        setCurrentDateData(res.data);
        setCurrentTurnIndex(0);
        setIsCompleted(false);
        setIsPlaying(true);
        playPop();
        return;
      }
    } catch (err) {
      console.log('Using client engine fallback:', err);
    }

    const newDate = simulateDateConversation(pA, pB, vId);
    setCurrentDateData(newDate);
    setCurrentTurnIndex(0);
    setIsCompleted(false);
    setIsPlaying(true);
    playPop();
  };

  const handlePickRecommendedPair = (pairType) => {
    let id1 = 'raj-striver';
    let id2 = 'shradha-khapra';

    if (pairType === 'intellectual') {
      id1 = 'raj-striver';
      id2 = 'love-babbar';
    } else if (pairType === 'creators') {
      id1 = 'abhishek-upmanyu';
      id2 = 'the-rebel-kid';
    } else if (pairType === 'high-energy') {
      id1 = 'aman-gupta';
      id2 = 'vineeta-singh';
    }

    const p1 = people.find(p => p.id === id1) || people[0];
    const p2 = people.find(p => p.id === id2) || people[1];
    setPersonAId(p1.id);
    setPersonBId(p2.id);
    handleStartNewDate(p1, p2, venueId);
  };

  useEffect(() => {
    if (!isPlaying || !currentDateData) return;

    if (currentTurnIndex >= currentDateData.dialogue.length) {
      setIsPlaying(false);
      setIsCompleted(true);
      return;
    }

    const intervalTime = playbackSpeed === 2 ? 1400 : 2400;
    const timer = setTimeout(() => {
      setCurrentTurnIndex(prev => prev + 1);
    }, intervalTime);

    return () => clearTimeout(timer);
  }, [isPlaying, currentTurnIndex, currentDateData, playbackSpeed]);

  useEffect(() => {
    if (dialogueContainerRef.current) {
      dialogueContainerRef.current.scrollTop = dialogueContainerRef.current.scrollHeight;
    }
  }, [currentTurnIndex]);

  const handleJumpToVerdict = () => {
    if (!currentDateData) return;
    setCurrentTurnIndex(currentDateData.dialogue.length);
    setIsPlaying(false);
    setIsCompleted(true);
  };

  const activeTurns = currentDateData
    ? currentDateData.dialogue.slice(0, currentTurnIndex)
    : [];

  const currentChemistry = currentDateData
    ? (activeTurns.length > 0 ? activeTurns[activeTurns.length - 1].chemistryTick : 50)
    : 50;

  return (
    <div style={{ maxWidth: 1400, margin: '0 auto', padding: '32px 24px' }}>
            <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: 6 }}>
          Date Simulator
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: 840 }}>
          Simulate a conversation between two candidate agents across dating stages with real-time dialogue and compatibility scoring.
        </p>
      </div>

            <div className="glass-panel" style={{ padding: 24, borderRadius: 20, marginBottom: 28 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 20,
          alignItems: 'center'
        }}>
                    <div>
            <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700, marginBottom: 8 }}>
              First Person (Agent A)
            </label>
            <select
              value={personAId}
              onChange={e => setPersonAId(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: 12,
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--border-subtle)',
                color: '#fff',
                fontSize: '0.92rem',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              {people.map(p => (
                <option key={p.id} value={p.id} style={{ background: '#0b0f1a', color: '#fff' }}>
                  {p.name} — {p.analysis?.agentName || `Agent ${p.name}`}
                </option>
              ))}
            </select>
          </div>

                    <div>
            <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700, marginBottom: 8 }}>
              Second Person (Agent B)
            </label>
            <select
              value={personBId}
              onChange={e => setPersonBId(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: 12,
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--border-subtle)',
                color: '#fff',
                fontSize: '0.92rem',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              {people.map(p => (
                <option key={p.id} value={p.id} style={{ background: '#0b0f1a', color: '#fff' }}>
                  {p.name} — {p.analysis?.agentName || `Agent ${p.name}`}
                </option>
              ))}
            </select>
          </div>

                    <div>
            <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700, marginBottom: 8 }}>
              Date Venue & Atmosphere
            </label>
            <select
              value={venueId}
              onChange={e => setVenueId(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: 12,
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--border-subtle)',
                color: '#fff',
                fontSize: '0.92rem',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              {VENUES.map(v => (
                <option key={v.id} value={v.id} style={{ background: '#0b0f1a', color: '#fff' }}>
                  {v.name} ({v.location})
                </option>
              ))}
            </select>
          </div>

                    <div style={{ display: 'flex', alignItems: 'flex-end' }}>
            <button
              onClick={() => handleStartNewDate()}
              className="btn-primary"
              style={{ width: '100%', padding: '14px', fontSize: '1rem' }}
            >
              <Flame size={18} />
              <span>{currentDateData ? 'Restart Date' : 'Launch Date Simulation'}</span>
            </button>
          </div>
        </div>

                <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          marginTop: 18,
          paddingTop: 16,
          borderTop: '1px solid rgba(255, 255, 255, 0.06)',
          flexWrap: 'wrap'
        }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 700 }}>
            Curated Matchups:
          </span>
          <button
            onClick={() => handlePickRecommendedPair('founders')}
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
            Raj Vikramaditya & Shradha Khapra
          </button>
          <button
            onClick={() => handlePickRecommendedPair('intellectual')}
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
            Raj Vikramaditya & Love Babbar
          </button>
          <button
            onClick={() => handlePickRecommendedPair('creators')}
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
            Abhishek Upmanyu & Apoorva (Rebel Kid)
          </button>
          <button
            onClick={() => handlePickRecommendedPair('high-energy')}
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
            Aman Gupta & Vineeta Singh
          </button>
        </div>
      </div>

            {currentDateData && (
        <div style={{
          background: selectedVenue.backdrop,
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: 24,
          overflow: 'hidden',
          boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
          marginBottom: 32
        }}>
                    <div style={{
            padding: '20px 28px',
            background: 'rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 16
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <MapPin size={16} color="#f43f5e" />
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#fff' }}>{selectedVenue.name}</h3>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>({selectedVenue.location})</span>
              </div>
              <p style={{ fontSize: '0.8rem', color: '#cbd5e1', fontStyle: 'italic' }}>
                {selectedVenue.vibe}
              </p>
            </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ textAlign: 'right' }}>
                <span style={{ display: 'block', fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700 }}>
                  Real-Time Chemistry Gauge
                </span>
                <span style={{
                  fontSize: '1.25rem',
                  fontWeight: 800,
                  color: currentChemistry >= 80 ? '#f43f5e' : '#38bdf8'
                }}>
                  {currentChemistry}%
                </span>
              </div>

              <div style={{
                width: 140,
                height: 10,
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: 5,
                overflow: 'hidden'
              }}>
                <div style={{
                  height: '100%',
                  width: `${currentChemistry}%`,
                  background: 'var(--gradient-brand)',
                  borderRadius: 5,
                  transition: 'width 0.4s ease'
                }} />
              </div>
            </div>
          </div>

                    <div style={{
            padding: '24px 32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            background: 'rgba(0, 0, 0, 0.2)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
          }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <Avatar name={personA.name} size={50} />
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: 600 }}>{personA.name}</h4>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>
                  {personA.tagline?.slice(0, 30)}...
                </div>
              </div>
            </div>

                        <div style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              background: 'var(--primary-subtle)',
              border: '1px solid var(--primary-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Heart size={18} color="var(--primary)" fill="var(--primary)" />
            </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ textAlign: 'right' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 600 }}>{personB.name}</h4>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>
                  {personB.tagline?.slice(0, 30)}...
                </div>
              </div>
              <Avatar name={personB.name} size={50} />
            </div>
          </div>

                    <div
            ref={dialogueContainerRef}
            style={{
              height: 440,
              overflowY: 'auto',
              padding: '28px 32px',
              display: 'flex',
              flexDirection: 'column',
              gap: 20
            }}
          >
            {activeTurns.length === 0 && (
              <div style={{ textAlign: 'center', margin: 'auto', color: 'var(--text-muted)' }}>
                <p style={{ fontSize: '1.1rem', marginBottom: 8 }}>Agents are taking their seats at {selectedVenue.name}...</p>
                <button
                  onClick={() => setIsPlaying(true)}
                  className="btn-primary"
                  style={{ padding: '8px 18px', fontSize: '0.9rem' }}
                >
                  <Play size={16} />
                  <span>Begin Dialogue</span>
                </button>
              </div>
            )}

            {activeTurns.map((turn, tIdx) => {
              const isSpeakerA = turn.speakerId === personA.id;
              return (
                <div
                  key={tIdx}
                  className="animate-slide-up"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: isSpeakerA ? 'flex-start' : 'flex-end',
                    maxWidth: '85%',
                    alignSelf: isSpeakerA ? 'flex-start' : 'flex-end'
                  }}
                >
                                    <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    marginBottom: 6,
                    flexDirection: isSpeakerA ? 'row' : 'row-reverse'
                  }}>
                    <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#e2e8f0' }}>
                      {turn.speaker}
                    </span>
                    <span style={{
                      fontSize: '0.68rem',
                      padding: '1px 6px',
                      borderRadius: 6,
                      background: 'rgba(255, 255, 255, 0.08)',
                      color: 'var(--text-dim)'
                    }}>
                      {turn.phase}
                    </span>
                    <span style={{
                      fontSize: '0.68rem',
                      color: '#fb7185',
                      fontWeight: 600,
                      textTransform: 'capitalize'
                    }}>
                      • {turn.emotion}
                    </span>
                  </div>

                                    <div style={{
                    padding: '14px 18px',
                    borderRadius: 12,
                    background: isSpeakerA ? 'var(--bg-subtle)' : '#1a2333',
                    border: '1px solid var(--border-subtle)',
                    color: '#f8fafc',
                    fontSize: '0.9rem',
                    lineHeight: 1.5,
                    borderBottomLeftRadius: isSpeakerA ? 2 : 12,
                    borderBottomRightRadius: isSpeakerA ? 12 : 2
                  }}>
                    {turn.text}
                  </div>

                                    <div style={{
                    marginTop: 6,
                    padding: '6px 12px',
                    borderRadius: 6,
                    background: 'var(--bg-main)',
                    border: '1px solid var(--border-subtle)',
                    fontSize: '0.75rem',
                    color: 'var(--text-dim)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    maxWidth: '95%'
                  }}>
                    <FileText size={12} color="var(--text-dim)" />
                    <span>
                      {turn.internalThought}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

                    <div style={{
            padding: '16px 32px',
            background: 'rgba(0, 0, 0, 0.5)',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 12
          }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '8px 16px',
                  borderRadius: 10,
                  background: 'var(--gradient-brand)',
                  border: 'none',
                  color: '#fff',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  cursor: 'pointer'
                }}
              >
                {isPlaying ? <Pause size={15} /> : <Play size={15} />}
                <span>{isPlaying ? 'Pause' : 'Play'}</span>
              </button>

              <button
                onClick={() => {
                  if (currentTurnIndex < currentDateData.dialogue.length) {
                    setCurrentTurnIndex(prev => prev + 1);
                    playPop();
                  }
                }}
                className="btn-secondary"
                style={{ padding: '8px 12px', fontSize: '0.85rem' }}
                disabled={currentTurnIndex >= currentDateData.dialogue.length}
              >
                <span>Next Turn ({currentTurnIndex}/{currentDateData.dialogue.length})</span>
              </button>

              <button
                onClick={() => {
                  setCurrentTurnIndex(0);
                  setIsCompleted(false);
                  setIsPlaying(false);
                }}
                className="btn-secondary"
                style={{ padding: '8px 12px', fontSize: '0.85rem' }}
                title="Restart conversation from beginning"
              >
                <RotateCcw size={15} />
              </button>
            </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ display: 'flex', background: 'rgba(255, 255, 255, 0.05)', borderRadius: 8, padding: 2 }}>
                <button
                  onClick={() => setPlaybackSpeed(1)}
                  style={{
                    padding: '4px 10px',
                    borderRadius: 6,
                    border: 'none',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    background: playbackSpeed === 1 ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                    color: '#fff'
                  }}
                >
                  1x Speed
                </button>
                <button
                  onClick={() => setPlaybackSpeed(2)}
                  style={{
                    padding: '4px 10px',
                    borderRadius: 6,
                    border: 'none',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    background: playbackSpeed === 2 ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                    color: '#fff'
                  }}
                >
                  2x Turbo
                </button>
              </div>

              <button
                onClick={handleJumpToVerdict}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '8px 14px',
                  borderRadius: 10,
                  background: 'rgba(245, 158, 11, 0.15)',
                  border: '1px solid rgba(245, 158, 11, 0.35)',
                  color: '#fbbf24',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                <FastForward size={15} />
                <span>Jump to Verdict</span>
              </button>
            </div>
          </div>
        </div>
      )}

            {isCompleted && currentDateData?.evaluation && (
        <div
          className="glass-panel animate-slide-up"
          style={{
            padding: 36,
            borderRadius: 24,
            border: '2px solid rgba(244, 63, 94, 0.4)',
            boxShadow: '0 0 35px rgba(244, 63, 94, 0.2)'
          }}
        >
          <div style={{ textAlign: 'center', maxWidth: 700, margin: '0 auto 32px auto' }}>
            <span className="glow-pill gold" style={{ marginBottom: 12 }}>
              Official Agent Date Evaluation
            </span>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: 8 }}>
              {currentDateData.evaluation.verdict}
            </h2>
            <div style={{
              fontSize: '3.5rem',
              fontWeight: 800,
              lineHeight: 1,
              margin: '16px 0',
              background: 'var(--gradient-brand)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              {currentDateData.evaluation.overallCompatibility}%
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              Autonomous mutual compatibility score calculated from dual-source profile synthesis and live multi-turn date dynamics.
            </p>
          </div>

                    <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 16,
            marginBottom: 32
          }}>
            {[
              {
                title: 'Lifestyle Synergy (Instagram)',
                score: currentDateData.evaluation.lifestyleFit,
                desc: 'Aesthetic, hobbies, weekend pacing',
                color: '#ec4899'
              },
              {
                title: 'Ambition & Intellect (LinkedIn)',
                score: currentDateData.evaluation.ambitionSynergy,
                desc: 'Career drive, mission, velocity',
                color: '#8b5cf6'
              },
              {
                title: 'Conversational Spark',
                score: currentDateData.evaluation.chemistryScore,
                desc: 'Humor, vulnerability & banter',
                color: '#06b6d4'
              },
              {
                title: 'Core Value Alignment',
                score: currentDateData.evaluation.valueAlignment,
                desc: 'Emotional safety & long-term goals',
                color: '#10b981'
              }
            ].map((metric, mIdx) => (
              <div
                key={mIdx}
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  borderRadius: 16,
                  padding: 20
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
                  <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 600 }}>{metric.title}</span>
                  <span style={{ fontSize: '1.2rem', fontWeight: 800, color: metric.color }}>{metric.score}%</span>
                </div>
                <div style={{
                  height: 6,
                  background: 'rgba(255, 255, 255, 0.08)',
                  borderRadius: 3,
                  overflow: 'hidden',
                  marginBottom: 8
                }}>
                  <div style={{
                    height: '100%',
                    width: `${metric.score}%`,
                    background: metric.color,
                    borderRadius: 3
                  }} />
                </div>
                <p style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>{metric.desc}</p>
              </div>
            ))}
          </div>

                    <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: 20,
            marginBottom: 32
          }}>
                        <div style={{
              background: 'rgba(244, 63, 94, 0.06)',
              border: '1px solid rgba(244, 63, 94, 0.2)',
              borderRadius: 16,
              padding: 20
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <Avatar name={personA.name} size={36} />
                <div>
                  <h4 style={{ fontSize: '0.88rem', fontWeight: 600 }}>{personA.name}</h4>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>Agent Debrief</span>
                </div>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-main)', fontStyle: 'italic', lineHeight: 1.4 }}>
                {currentDateData.evaluation.agentAQuote}
              </p>
            </div>

                        <div style={{
              background: 'var(--bg-main)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 8,
              padding: 16
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <Avatar name={personB.name} size={36} />
                <div>
                  <h4 style={{ fontSize: '0.88rem', fontWeight: 600 }}>{personB.name}</h4>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>Agent Debrief</span>
                </div>
              </div>
              <p style={{ fontSize: '0.88rem', color: '#e0f2fe', fontStyle: 'italic', lineHeight: 1.4 }}>
                {currentDateData.evaluation.agentBQuote}
              </p>
            </div>
          </div>

                    <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
            <button
              onClick={() => onViewRankingsForPerson(personA)}
              className="btn-secondary"
            >
              <Award size={16} />
              <span>Inspect Rankings for {personA.name.split(' ')[0]}</span>
            </button>
            <button
              onClick={() => onViewRankingsForPerson(personB)}
              className="btn-secondary"
            >
              <Award size={16} />
              <span>Inspect Rankings for {personB.name.split(' ')[0]}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
