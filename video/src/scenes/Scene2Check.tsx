import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';

const NEON = '#DFFF06';

export const Scene2Check: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Icon entrance
  const iconScale = spring({ frame, fps, config: { damping: 12, stiffness: 90 } });
  const iconOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' });

  // Counter animates from 0 to 150
  const count = Math.round(interpolate(frame, [20, 90], [0, 150], { extrapolateRight: 'clamp' }));

  // Headline entrance
  const headlineOpacity = interpolate(frame, [30, 60], [0, 1], { extrapolateRight: 'clamp' });
  const headlineX = interpolate(frame, [30, 60], [-80, 0], { extrapolateRight: 'clamp' });

  // Sub-text
  const subOpacity = interpolate(frame, [70, 100], [0, 1], { extrapolateRight: 'clamp' });

  // Checklist items stagger
  const items = ['Engine & Mechanical', 'Suspension & Brakes', 'Electrical & AC', 'Interior & Structural'];
  const itemProgress = items.map((_, i) =>
    interpolate(frame, [90 + i * 15, 110 + i * 15], [0, 1], { extrapolateRight: 'clamp' })
  );

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#000000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Inter, sans-serif',
        gap: 120,
        padding: '0 120px',
        boxSizing: 'border-box',
      }}
    >
      {/* Left: counter */}
      <div style={{ textAlign: 'center', flexShrink: 0 }}>
        <div
          style={{
            opacity: iconOpacity,
            transform: `scale(${iconScale})`,
          }}
        >
          <div
            style={{
              fontSize: 180,
              fontWeight: 900,
              color: NEON,
              lineHeight: 1,
            }}
          >
            {count}+
          </div>
          <div
            style={{
              fontSize: 28,
              color: 'rgba(255,255,255,0.5)',
              fontWeight: 300,
              letterSpacing: 4,
              textTransform: 'uppercase',
              marginTop: 8,
            }}
          >
            Point Check
          </div>
        </div>
      </div>

      {/* Right: details */}
      <div style={{ flex: 1 }}>
        <h2
          style={{
            fontSize: 64,
            fontWeight: 800,
            color: '#ffffff',
            margin: '0 0 16px 0',
            opacity: headlineOpacity,
            transform: `translateX(${headlineX}px)`,
            lineHeight: 1.1,
          }}
        >
          Every Detail.<br />
          <span style={{ color: NEON }}>Inspected.</span>
        </h2>

        <p
          style={{
            fontSize: 24,
            color: 'rgba(255,255,255,0.55)',
            margin: '0 0 40px 0',
            fontWeight: 300,
            opacity: subOpacity,
          }}
        >
          Our certified inspectors cover every corner of your vehicle.
        </p>

        {/* Checklist */}
        {items.map((item, i) => (
          <div
            key={item}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              marginBottom: 16,
              opacity: itemProgress[i],
              transform: `translateX(${interpolate(itemProgress[i], [0, 1], [40, 0])}px)`,
            }}
          >
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                backgroundColor: NEON,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <span style={{ fontSize: 16, color: '#000', fontWeight: 700 }}>✓</span>
            </div>
            <span style={{ fontSize: 26, color: '#ffffff', fontWeight: 500 }}>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
