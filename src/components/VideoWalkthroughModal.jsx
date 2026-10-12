import React, { useState, useEffect } from 'react';
import {
  X,
  Video,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  Sparkles
} from 'lucide-react';

export default function VideoWalkthroughModal({
  isOpen,
  onClose,
  onNavigateToTab,
  onOpenProfileDemo
}) {
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  if (!isOpen) return null;

  // Stopwatch effect
  useEffect(() => {
    let interval = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setSecondsElapsed(sec => sec + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const steps = [
    {
      act: "Act 1: The Core Concept & The 25 People",
      timestamp: "0:00 – 0:35",
      title: "The Problem & The Two Sources",
      script: "Welcome to CupidAgent! Here, humans don't date—autonomous AI agents date on their behalf. For every person, there are exactly two sources: their official LinkedIn and their public Instagram. We found 25 real people—CEOs, founders, creators, and psychologists—each with verified links. Watch as each agent reads their person.",
      actionLabel: "Show 25 Profile Roster",
      onAction: () => onNavigateToTab('roster')
    },
    {
      act: "Act 2: Agent Analysis & Profile Page",
      timestamp: "0:35 – 1:15",
      title: "Needs · Hobbies · Interests · Qualities",
      script: "Let's open a profile page. The agent doesn't just copy text—it synthesizes a complete psychological model: what this person Needs in love, their daily Hobbies from Instagram, their intellectual Interests from LinkedIn, and Big 5 personality traits. This forms the agent's core dating directive.",
      actionLabel: "Open Sample Profile Analysis",
      onAction: () => onOpenProfileDemo()
    },
    {
      act: "Act 3: The Agents Dating in the Arena",
      timestamp: "1:15 – 2:15",
      title: "Watch Them Actually Date on Their Behalf",
      script: "Now, let's step into the Dating Arena. We pick two agents and place them in an ambient venue. As they converse across five stages, observe the live dialogue, emotion tags, and crucial: each agent's private inner monologue calculating chemistry in real-time. At the end, both agents deliver a mutual compatibility report.",
      actionLabel: "Launch Dating Arena",
      onAction: () => onNavigateToTab('arena')
    },
    {
      act: "Act 4: Personalized Rankings & Mutual Sparks",
      timestamp: "2:15 – 2:45",
      title: "Who Fits Each Person Best",
      script: "Every person receives a comprehensive ranking of all candidates from #1 to #24. For Brian Chesky, Whitney Wolfe Herd ranks #1 based on dual-source lifestyle and ambition alignment. In our Mutual Sparks section, we see couples where both agents independently chose each other at the top.",
      actionLabel: "Explore Rankings & Mutual Sparks",
      onAction: () => onNavigateToTab('rankings')
    },
    {
      act: "Act 5: Live Ingestion & Tech Stack",
      timestamp: "2:45 – 3:00",
      title: "Paste Your Own Links & Conclusion",
      script: "The site works completely live: anyone can paste a new LinkedIn and Instagram link to spawn an agent instantly. Built using Node.js, Cheerio OpenGraph scrapers, and autonomous agent reasoning. That is CupidAgent—real people, dual sources, autonomous dating.",
      actionLabel: "Go to Deploy New Agent",
      onAction: () => onNavigateToTab('roster')
    }
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="glass-panel"
        onClick={e => e.stopPropagation()}
        style={{
          width: 800,
          maxWidth: '95vw',
          maxHeight: '90vh',
          overflowY: 'auto',
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

        {/* Header with Stopwatch */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, marginBottom: 24, paddingBottom: 20, borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <span className="glow-pill gold">Submission Tool</span>
              <span className="glow-pill pink">3 Minutes Max</span>
            </div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>
              YouTube Recording Teleprompter & Tour
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              Follow this exact timed script to record your passing 3-minute video submission. Click buttons to auto-navigate!
            </p>
          </div>

          {/* Timer Display */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            background: 'rgba(0, 0, 0, 0.4)',
            padding: '10px 18px',
            borderRadius: 16,
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <div style={{ textAlign: 'right' }}>
              <span style={{ display: 'block', fontSize: '0.68rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700 }}>
                Video Timer (3:00 Max)
              </span>
              <span style={{
                fontSize: '1.5rem',
                fontWeight: 800,
                color: secondsElapsed > 180 ? '#f43f5e' : '#38bdf8',
                fontFamily: 'monospace'
              }}>
                {formatTime(secondsElapsed)} / 3:00
              </span>
            </div>

            <button
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              style={{
                width: 38,
                height: 38,
                borderRadius: 10,
                background: isTimerRunning ? '#f43f5e' : '#10b981',
                border: 'none',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
              title={isTimerRunning ? 'Pause Stopwatch' : 'Start Stopwatch'}
            >
              {isTimerRunning ? <Pause size={18} /> : <Play size={18} />}
            </button>

            <button
              onClick={() => {
                setIsTimerRunning(false);
                setSecondsElapsed(0);
              }}
              style={{
                width: 38,
                height: 38,
                borderRadius: 10,
                background: 'rgba(255, 255, 255, 0.08)',
                border: 'none',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
              title="Reset Stopwatch"
            >
              <RotateCcw size={16} />
            </button>
          </div>
        </div>

        {/* Script Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {steps.map((step, idx) => {
            const isActive = activeStep === idx;
            return (
              <div
                key={idx}
                style={{
                  background: isActive ? 'rgba(244, 63, 94, 0.08)' : 'rgba(255, 255, 255, 0.02)',
                  border: isActive ? '1px solid rgba(244, 63, 94, 0.4)' : '1px solid rgba(255, 255, 255, 0.06)',
                  borderRadius: 16,
                  padding: 20,
                  transition: 'all 0.2s'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{
                      width: 24,
                      height: 24,
                      borderRadius: '50%',
                      background: isActive ? '#f43f5e' : 'rgba(255, 255, 255, 0.1)',
                      color: '#fff',
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {idx + 1}
                    </span>
                    <h4 style={{ fontSize: '1rem', fontWeight: 700, color: isActive ? '#fff' : 'var(--text-muted)' }}>
                      {step.act}
                    </h4>
                  </div>
                  <span style={{ fontSize: '0.78rem', color: '#fbbf24', fontWeight: 700, fontFamily: 'monospace' }}>
                    {step.timestamp}
                  </span>
                </div>

                <p style={{
                  fontSize: '0.88rem',
                  color: '#e2e8f0',
                  lineHeight: 1.5,
                  marginBottom: 16,
                  paddingLeft: 32
                }}>
                  "{step.script}"
                </p>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
                  <button
                    onClick={() => {
                      setActiveStep(idx);
                      step.onAction();
                    }}
                    className="btn-primary"
                    style={{ padding: '8px 16px', fontSize: '0.8rem' }}
                  >
                    <span>{step.actionLabel}</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
