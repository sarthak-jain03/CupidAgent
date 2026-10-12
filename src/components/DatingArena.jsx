import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import {
  Flame,
  Play,
  Pause,
  RotateCcw,
  FastForward,
  Heart,
  Sparkles,
  MapPin,
  CheckCircle2,
  Brain,
  MessageCircle,
  Award,
  Volume2
} from 'lucide-react';
import { VENUES, simulateDateConversation } from '../data/datingEngineClient';
import { playPop, playChime, playSparkFanfare } from '../utils/soundEffects';

export default function DatingArena({
  people,
  preselectedA,
  preselectedB,
  onViewRankingsForPerson
}) {
  const [personAId, setPersonAId] = useState(preselectedA?.id || people[0]?.id);
  const [personBId, setPersonBId] = useState(preselectedB?.id || people[1]?.id);
  const [venueId, setVenueId] = useState(VENUES[0].id);

  // Date Simulation State
  const [currentDateData, setCurrentDateData] = useState(null);
  const [currentTurnIndex, setCurrentTurnIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1); // 1 = 2000ms, 2 = 1000ms
  const [isCompleted, setIsCompleted] = useState(false);

  const dialogueContainerRef = useRef(null);

  // Sync if preselected props change
  useEffect(() => {
    if (preselectedA) setPersonAId(preselectedA.id);
  }, [preselectedA]);

  useEffect(() => {
    if (preselectedB) setPersonBId(preselectedB.id);
  }, [preselectedB]);

  const personA = people.find(p => p.id === personAId) || people[0];
  const personB = people.find(p => p.id === personBId) || people[1];
  const selectedVenue = VENUES.find(v => v.id === venueId) || VENUES[0];

  // Initialize or start new date
  const handleStartNewDate = (pA = personA, pB = personB, vId = venueId) => {
    if (pA.id === pB.id) {
      alert("Please select two different people for the dating simulation.");
      return;
    }
    const newDate = simulateDateConversation(pA, pB, vId);
    setCurrentDateData(newDate);
    setCurrentTurnIndex(0);
    setIsCompleted(false);
    setIsPlaying(true);
    playPop();
  };

  // Quick pick recommended pair
  const handlePickRecommendedPair = (pairType) => {
    let id1 = 'brian-chesky';
    let id2 = 'whitney-wolfe-herd';

    if (pairType === 'intellectual') {
      id1 = 'lex-fridman';
      id2 = 'dr-julie-smith';
    } else if (pairType === 'creators') {
      id1 = 'dylan-field';
      id2 = 'melanie-perkins';
    } else if (pairType === 'high-energy') {
      id1 = 'gary-vaynerchuk';
      id2 = 'sara-blakely';
    }

    const p1 = people.find(p => p.id === id1) || people[0];
    const p2 = people.find(p => p.id === id2) || people[1];
    setPersonAId(p1.id);
    setPersonBId(p2.id);
    handleStartNewDate(p1, p2, venueId);
  };

  // Auto-advance turns when isPlaying is true
  useEffect(() => {
    if (!isPlaying || !currentDateData) return;

    if (currentTurnIndex >= currentDateData.dialogue.length) {
      setIsPlaying(false);
      setIsCompleted(true);
      playSparkFanfare();
      if (currentDateData.evaluation?.overallCompatibility >= 80) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
      return;
    }

    const intervalTime = playbackSpeed === 2 ? 1400 : 2600;
    const timer = setTimeout(() => {
      setCurrentTurnIndex(prev => {
        const next = prev + 1;
        playPop();
        if (next % 3 === 0) playChime();
        return next;
      });
    }, intervalTime);

    return () => clearTimeout(timer);
  }, [isPlaying, currentTurnIndex, currentDateData, playbackSpeed]);

  // Auto-scroll dialogue
  useEffect(() => {
    if (dialogueContainerRef.current) {
      dialogueContainerRef.current.scrollTop = dialogueContainerRef.current.scrollHeight;
    }
  }, [currentTurnIndex]);

  // Jump to complete evaluation
  const handleJumpToVerdict = () => {
    if (!currentDateData) return;
    setCurrentTurnIndex(currentDateData.dialogue.length);
    setIsPlaying(false);
    setIsCompleted(true);
    playSparkFanfare();
    if (currentDateData.evaluation?.overallCompatibility >= 80) {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    }
  };

  const activeTurns = currentDateData
    ? currentDateData.dialogue.slice(0, currentTurnIndex)
    : [];

  const currentChemistry = currentDateData
    ? (activeTurns.length > 0 ? activeTurns[activeTurns.length - 1].chemistryTick : 50)
    : 50;

  return (
    <div style={{ maxWidth: 1400, margin: '0 auto', padding: '32px 24px' }}>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <span className="glow-pill gold">Live Multi-Agent Simulation</span>
          <span className="glow-pill cyan">Turn-by-Turn Internal Monologues</span>
        </div>
        <h1 style={{ fontSize: '2.4rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
          The Dating Arena: <span className="gradient-text">Watch Agents Date</span>
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: 840 }}>
          The agents date on their person's behalf. Observe their conversational pacing, body language interpretation, live internal calculations, and final compatibility verdicts.
        </p>
      </div>

      {/* Arena Setup Toolbar */}
      <div className="glass-panel" style={{ padding: 24, borderRadius: 20, marginBottom: 28 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 20,
          alignItems: 'center'
        }}>
          {/* Person A Selector */}
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

          {/* Person B Selector */}
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

          {/* Venue Picker */}
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

          {/* Launch Date Button */}
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

        {/* Quick Pair Recommendations */}
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
              borderRadius: 8,
              fontSize: '0.75rem',
              background: 'rgba(244, 63, 94, 0.1)',
              border: '1px solid rgba(244, 63, 94, 0.25)',
              color: '#fda4af',
              cursor: 'pointer'
            }}
          >
            Brian Chesky & Whitney Wolfe Herd
          </button>
          <button
            onClick={() => handlePickRecommendedPair('intellectual')}
            style={{
              padding: '4px 10px',
              borderRadius: 8,
              fontSize: '0.75rem',
              background: 'rgba(139, 92, 246, 0.1)',
              border: '1px solid rgba(139, 92, 246, 0.25)',
              color: '#c084fc',
              cursor: 'pointer'
            }}
          >
            Lex Fridman & Dr. Julie Smith
          </button>
          <button
            onClick={() => handlePickRecommendedPair('creators')}
            style={{
              padding: '4px 10px',
              borderRadius: 8,
              fontSize: '0.75rem',
              background: 'rgba(6, 182, 212, 0.1)',
              border: '1px solid rgba(6, 182, 212, 0.25)',
              color: '#38bdf8',
              cursor: 'pointer'
            }}
          >
            Dylan Field & Melanie Perkins
          </button>
          <button
            onClick={() => handlePickRecommendedPair('high-energy')}
            style={{
              padding: '4px 10px',
              borderRadius: 8,
              fontSize: '0.75rem',
              background: 'rgba(245, 158, 11, 0.1)',
              border: '1px solid rgba(245, 158, 11, 0.25)',
              color: '#fbbf24',
              cursor: 'pointer'
            }}
          >
            Gary Vaynerchuk & Sara Blakely
          </button>
        </div>
      </div>

      {/* The Live Date Stage */}
      {currentDateData && (
        <div style={{
          background: selectedVenue.backdrop,
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: 24,
          overflow: 'hidden',
          boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
          marginBottom: 32
        }}>
          {/* Stage Top Bar: Venue & Live Chemistry Meter */}
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

            {/* Live Chemistry Gauge */}
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

          {/* Participant Face-off Row */}
          <div style={{
            padding: '24px 32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            background: 'rgba(0, 0, 0, 0.2)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
          }}>
            {/* Person A */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <img
                src={personA.avatar}
                alt={personA.name}
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '2px solid rgba(244, 63, 94, 0.8)',
                  boxShadow: '0 0 16px rgba(244, 63, 94, 0.3)'
                }}
              />
              <div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700 }}>{personA.name}</h4>
                <span className="glow-pill purple" style={{ fontSize: '0.68rem', padding: '1px 6px' }}>
                  {personA.analysis?.agentName || `Agent ${personA.name}`}
                </span>
              </div>
            </div>

            {/* Glowing Heart Pulse */}
            <div style={{
              width: 44,
              height: 44,
              borderRadius: '50%',
              background: 'rgba(244, 63, 94, 0.2)',
              border: '1px solid rgba(244, 63, 94, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Heart size={22} color="#f43f5e" fill="#f43f5e" className="pulse-glow" />
            </div>

            {/* Person B */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ textAlign: 'right' }}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700 }}>{personB.name}</h4>
                <span className="glow-pill cyan" style={{ fontSize: '0.68rem', padding: '1px 6px' }}>
                  {personB.analysis?.agentName || `Agent ${personB.name}`}
                </span>
              </div>
              <img
                src={personB.avatar}
                alt={personB.name}
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '2px solid rgba(6, 182, 212, 0.8)',
                  boxShadow: '0 0 16px rgba(6, 182, 212, 0.3)'
                }}
              />
            </div>
          </div>

          {/* Live Dialogue Stream Container */}
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
                  {/* Speaker Label & Turn Phase */}
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

                  {/* Speech Bubble */}
                  <div style={{
                    padding: '16px 20px',
                    borderRadius: 18,
                    background: isSpeakerA
                      ? 'linear-gradient(135deg, rgba(244, 63, 94, 0.25), rgba(139, 92, 246, 0.2))'
                      : 'linear-gradient(135deg, rgba(6, 182, 212, 0.25), rgba(59, 130, 246, 0.2))',
                    border: isSpeakerA
                      ? '1px solid rgba(244, 63, 94, 0.4)'
                      : '1px solid rgba(6, 182, 212, 0.4)',
                    color: '#fff',
                    fontSize: '0.95rem',
                    lineHeight: 1.5,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
                    borderBottomLeftRadius: isSpeakerA ? 4 : 18,
                    borderBottomRightRadius: isSpeakerA ? 18 : 4
                  }}>
                    {turn.text}
                  </div>

                  {/* Agent Inner Monologue (The Autonomous Brain Reasoning) */}
                  <div style={{
                    marginTop: 8,
                    padding: '8px 14px',
                    borderRadius: 10,
                    background: 'rgba(0, 0, 0, 0.4)',
                    border: '1px dashed rgba(255, 255, 255, 0.15)',
                    fontSize: '0.75rem',
                    color: '#94a3b8',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    maxWidth: '95%'
                  }}>
                    <Brain size={13} color="#a855f7" />
                    <span style={{ fontStyle: 'italic' }}>
                      {turn.internalThought}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Stage Controls Footer */}
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
            {/* Playback Controls */}
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

            {/* Speed & Jump to Verdict */}
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

      {/* Post-Date Compatibility & Final Report Card */}
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

          {/* 4 Compatibility Sub-metrics */}
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

          {/* Direct Agent Quotes */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: 20,
            marginBottom: 32
          }}>
            {/* Agent A Quote */}
            <div style={{
              background: 'rgba(244, 63, 94, 0.06)',
              border: '1px solid rgba(244, 63, 94, 0.2)',
              borderRadius: 16,
              padding: 20
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <img
                  src={personA.avatar}
                  alt={personA.name}
                  style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover' }}
                />
                <div>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 700 }}>{personA.analysis?.agentName || `Agent ${personA.name}`}</h4>
                  <span style={{ fontSize: '0.72rem', color: '#fb7185' }}>Post-Date Intelligence Debrief</span>
                </div>
              </div>
              <p style={{ fontSize: '0.88rem', color: '#ffe4e6', fontStyle: 'italic', lineHeight: 1.4 }}>
                {currentDateData.evaluation.agentAQuote}
              </p>
            </div>

            {/* Agent B Quote */}
            <div style={{
              background: 'rgba(6, 182, 212, 0.06)',
              border: '1px solid rgba(6, 182, 212, 0.2)',
              borderRadius: 16,
              padding: 20
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <img
                  src={personB.avatar}
                  alt={personB.name}
                  style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover' }}
                />
                <div>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 700 }}>{personB.analysis?.agentName || `Agent ${personB.name}`}</h4>
                  <span style={{ fontSize: '0.72rem', color: '#38bdf8' }}>Post-Date Intelligence Debrief</span>
                </div>
              </div>
              <p style={{ fontSize: '0.88rem', color: '#e0f2fe', fontStyle: 'italic', lineHeight: 1.4 }}>
                {currentDateData.evaluation.agentBQuote}
              </p>
            </div>
          </div>

          {/* Action Footer */}
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
