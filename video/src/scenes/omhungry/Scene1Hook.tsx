import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';

const ORANGE = '#E8461E';
const ORANGE_LIGHT = '#FF6B3D';

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // "Still using paper menus?" fades in
  const textOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  const textY = interpolate(frame, [0, 20], [40, 0], { extrapolateRight: 'clamp' });

  // Paper menu fades in after text
  const menuOpacity = interpolate(frame, [25, 45], [0, 1], { extrapolateRight: 'clamp' });

  // Crumple effect: starts at frame 70
  const crumpleScale = interpolate(frame, [70, 110], [1, 0.05], { extrapolateRight: 'clamp' });
  const crumpleRotate = interpolate(frame, [70, 110], [0, 45], { extrapolateRight: 'clamp' });
  const crumpleOpacity = interpolate(frame, [90, 115], [1, 0], { extrapolateRight: 'clamp' });

  // Particle dots from crumple
  const particleOpacity = interpolate(frame, [80, 120], [0, 1], { extrapolateRight: 'clamp' });
  const particleFade = interpolate(frame, [110, 140], [1, 0], { extrapolateRight: 'clamp' });

  // Transition wipe at the end
  const wipeWidth = interpolate(frame, [130, 150], [0, 1080], { extrapolateRight: 'clamp' });

  const particles = Array.from({ length: 12 }, (_, i) => {
    const angle = (i / 12) * Math.PI * 2;
    const distance = interpolate(frame, [80, 130], [0, 120 + (i % 3) * 40], { extrapolateRight: 'clamp' });
    return {
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
      size: 6 + (i % 4) * 4,
    };
  });

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#1A0A05',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Inter, system-ui, sans-serif',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background gradient radial */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 50% 50%, rgba(232,70,30,0.15) 0%, transparent 70%)',
        }}
      />

      {/* Hook text */}
      <div
        style={{
          opacity: textOpacity,
          transform: `translateY(${textY}px)`,
          textAlign: 'center',
          padding: '0 60px',
          marginBottom: 80,
          zIndex: 2,
        }}
      >
        <h1
          style={{
            fontSize: 72,
            fontWeight: 800,
            color: '#ffffff',
            margin: 0,
            lineHeight: 1.15,
            letterSpacing: '-1px',
          }}
        >
          Still using{' '}
          <span
            style={{
              background: `linear-gradient(135deg, ${ORANGE}, ${ORANGE_LIGHT})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            paper menus?
          </span>
        </h1>
      </div>

      {/* Paper menu mockup */}
      <div
        style={{
          position: 'relative',
          opacity: menuOpacity * crumpleOpacity,
          transform: `scale(${crumpleScale}) rotate(${crumpleRotate}deg)`,
          zIndex: 2,
        }}
      >
        <div
          style={{
            width: 340,
            backgroundColor: '#FFF8F0',
            borderRadius: 12,
            padding: '36px 32px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
            border: '1px solid rgba(232,70,30,0.2)',
          }}
        >
          <div style={{ fontSize: 28, fontWeight: 700, color: '#333', marginBottom: 8 }}>
            Restaurant Menu
          </div>
          <div style={{ width: '60%', height: 3, backgroundColor: ORANGE, marginBottom: 24 }} />
          {['Grilled Chicken — 4.500', 'Caesar Salad — 2.800', 'Beef Burger — 5.200', 'Pasta Carbonara — 4.000'].map(
            (item, i) => (
              <div
                key={i}
                style={{
                  fontSize: 20,
                  color: '#555',
                  marginBottom: 14,
                  paddingBottom: 14,
                  borderBottom: i < 3 ? '1px solid #e5e5e5' : 'none',
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <span>{item.split(' — ')[0]}</span>
                <span style={{ color: ORANGE, fontWeight: 600 }}>{item.split(' — ')[1]}</span>
              </div>
            )
          )}
        </div>
      </div>

      {/* Particles */}
      <div
        style={{
          position: 'absolute',
          top: '55%',
          left: '50%',
          opacity: particleOpacity * particleFade,
          zIndex: 3,
        }}
      >
        {particles.map((p, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: p.size,
              height: p.size,
              borderRadius: 2,
              backgroundColor: i % 2 === 0 ? ORANGE : ORANGE_LIGHT,
              transform: `translate(${p.x - p.size / 2}px, ${p.y - p.size / 2}px)`,
            }}
          />
        ))}
      </div>

      {/* Transition wipe */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: wipeWidth,
          height: '100%',
          background: `linear-gradient(135deg, ${ORANGE}, ${ORANGE_LIGHT})`,
          zIndex: 10,
        }}
      />
    </div>
  );
};
