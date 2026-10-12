import React from 'react';

export default function Avatar({ name = '', size = 48, style = {} }) {
  const getInitials = (n = '') => {
    const parts = n.trim().split(/\s+/);
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return (n.slice(0, 2) || '??').toUpperCase();
  };

  const getBgColor = (n = '') => {
    const tones = [
      '#1c1917', '#18181b', '#1e293b', '#0f172a',
      '#172554', '#1e1b4b', '#311042', '#2a1215',
      '#14251f', '#242424', '#1f1f23', '#2b2319'
    ];
    let hash = 0;
    for (let i = 0; i < n.length; i++) {
      hash = n.charCodeAt(i) + ((hash << 5) - hash);
    }
    return tones[Math.abs(hash) % tones.length];
  };

  return (
    <div
      style={{
        width: size,
        height: size,
        minWidth: size,
        minHeight: size,
        borderRadius: 6,
        background: getBgColor(name),
        border: '1px solid var(--border-subtle)',
        color: 'var(--text-main)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 600,
        fontSize: Math.max(11, Math.round(size * 0.38)),
        letterSpacing: '0.04em',
        userSelect: 'none',
        flexShrink: 0,
        ...style
      }}
      title={name}
    >
      {getInitials(name)}
    </div>
  );
}
