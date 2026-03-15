import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { OmHungryLogo } from './OmHungryLogo';

const ORANGE = '#E8461E';
const ORANGE_LIGHT = '#FF6B3D';
const BG = '#FFF2E8';

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // All timings at 60fps (2× original)
  const textOpacity = interpolate(frame, [0, 40], [0, 1], { extrapolateRight: 'clamp' });
  const textY = interpolate(frame, [0, 40], [60, 0], { extrapolateRight: 'clamp' });

  const menuOpacity = interpolate(frame, [50, 90], [0, 1], { extrapolateRight: 'clamp' });

  // Crumple effect starts at frame 140
  const crumpleScale = interpolate(frame, [140, 220], [1, 0.04], { extrapolateRight: 'clamp' });
  const crumpleRotate = interpolate(frame, [140, 220], [0, 50], { extrapolateRight: 'clamp' });
  const crumpleOpacity = interpolate(frame, [180, 230], [1, 0], { extrapolateRight: 'clamp' });

  // Particles
  const particleOpacity = interpolate(frame, [160, 240], [0, 1], { extrapolateRight: 'clamp' });
  const particleFade = interpolate(frame, [220, 280], [1, 0], { extrapolateRight: 'clamp' });

  // Transition wipe
  const wipeWidth = interpolate(frame, [262, 300], [0, 1080], { extrapolateRight: 'clamp' });

  // Sub-text fades in after menu
  const subOpacity = interpolate(frame, [100, 140], [0, 1], { extrapolateRight: 'clamp' });

  // Logo at bottom
  const logoOpacity = interpolate(frame, [60, 100], [0, 1], { extrapolateRight: 'clamp' });

  const particles = Array.from({ length: 16 }, (_, i) => {
    const angle = (i / 16) * Math.PI * 2;
    const distance = interpolate(frame, [160, 260], [0, 160 + (i % 4) * 40], { extrapolateRight: 'clamp' });
    return {
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
      size: 8 + (i % 4) * 5,
    };
  });

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: BG,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontFamily: 'Inter, system-ui, sans-serif',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: 140,
        paddingBottom: 100,
        boxSizing: 'border-box',
      }}
    >
      {/* Decorative top arc */}
      <div
        style={{
          position: 'absolute',
          top: -400,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 1400,
          height: 700,
          borderRadius: '50%',
          backgroundColor: `${ORANGE}18`,
        }}
      />

      {/* Top section: hook text */}
      <div
        style={{
          opacity: textOpacity,
          transform: `translateY(${textY}px)`,
          textAlign: 'center',
          padding: '0 80px',
          zIndex: 2,
        }}
      >
        <div
          style={{
            display: 'inline-block',
            backgroundColor: `${ORANGE}15`,
            border: `2px solid ${ORANGE}30`,
            borderRadius: 50,
            padding: '14px 36px',
            marginBottom: 32,
          }}
        >
          <span style={{ fontSize: 32, fontWeight: 700, color: ORANGE, letterSpacing: 2, textTransform: 'uppercase' }}>
            Wait...
          </span>
        </div>
        <h1
          style={{
            fontSize: 88,
            fontWeight: 900,
            color: '#1A1A1A',
            margin: 0,
            lineHeight: 1.1,
            letterSpacing: '-2px',
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

      {/* Middle: paper menu mockup */}
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
            width: 480,
            backgroundColor: '#FFFEF8',
            borderRadius: 20,
            padding: '48px 44px',
            boxShadow: '0 24px 60px rgba(232,70,30,0.15), 0 4px 12px rgba(0,0,0,0.08)',
            border: `2px solid ${ORANGE}20`,
          }}
        >
          <div style={{ fontSize: 34, fontWeight: 800, color: '#2A1A0E', marginBottom: 10 }}>
            Restaurant Menu
          </div>
          <div style={{ width: '50%', height: 4, background: `linear-gradient(90deg, ${ORANGE}, ${ORANGE_LIGHT})`, borderRadius: 2, marginBottom: 32 }} />
          {['Grilled Chicken — 4.500', 'Caesar Salad — 2.800', 'Beef Burger — 5.200', 'Pasta Carbonara — 4.000', 'Chocolate Fondant — 2.500'].map(
            (item, i) => (
              <div
                key={i}
                style={{
                  fontSize: 22,
                  color: '#555',
                  marginBottom: 18,
                  paddingBottom: 18,
                  borderBottom: i < 4 ? '1px dashed #E0D0C4' : 'none',
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <span>{item.split(' — ')[0]}</span>
                <span style={{ color: ORANGE, fontWeight: 700 }}>{item.split(' — ')[1]}</span>
              </div>
            )
          )}
          {/* Handwritten note */}
          <div style={{ fontSize: 16, color: '#AAA', fontStyle: 'italic', marginTop: 8 }}>
            * Prices subject to change without notice
          </div>
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
              borderRadius: i % 3 === 0 ? '50%' : 2,
              backgroundColor: i % 2 === 0 ? ORANGE : ORANGE_LIGHT,
              transform: `translate(${p.x - p.size / 2}px, ${p.y - p.size / 2}px)`,
              opacity: 0.8,
            }}
          />
        ))}
      </div>

      {/* Sub-text */}
      <div
        style={{
          opacity: subOpacity,
          textAlign: 'center',
          padding: '0 80px',
          zIndex: 2,
        }}
      >
        <p style={{ fontSize: 36, color: '#888', margin: 0, fontWeight: 500 }}>
          There's a better way 👇
        </p>
      </div>

      {/* Bottom: logo */}
      <div style={{ opacity: logoOpacity, zIndex: 2 }}>
        <OmHungryLogo size={110} showText={true} />
      </div>

      {/* Transition wipe */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: wipeWidth,
          height: '100%',
          background: `linear-gradient(160deg, ${ORANGE}, ${ORANGE_LIGHT})`,
          zIndex: 10,
        }}
      />
    </div>
  );
};
