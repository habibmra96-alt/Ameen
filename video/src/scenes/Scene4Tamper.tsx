import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';

const NEON = '#DFFF06';

const Shield: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M12 2L3 6v6c0 5.25 3.75 10.15 9 11.25C17.25 22.15 21 17.25 21 12V6L12 2z"
      fill={NEON}
    />
    <path
      d="M9 12l2 2 4-4"
      stroke="#000"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Scene4Tamper: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Shield pulses in
  const shieldScale = spring({ frame, fps, config: { damping: 10, stiffness: 80 } });
  const shieldOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });

  // Glow pulse
  const glowSize = interpolate(
    frame,
    [40, 80, 120, 160],
    [0, 80, 40, 80],
    { extrapolateRight: 'clamp' }
  );

  // Text entrance
  const titleOpacity = interpolate(frame, [30, 60], [0, 1], { extrapolateRight: 'clamp' });
  const titleY = interpolate(frame, [30, 60], [40, 0], { extrapolateRight: 'clamp' });

  // Feature bullets
  const bullets = [
    'Cryptographically signed reports',
    'Inspector identity verified',
    'Immutable inspection history',
    'QR code authenticity check',
  ];
  const bulletProgress = bullets.map((_, i) =>
    interpolate(frame, [70 + i * 18, 95 + i * 18], [0, 1], { extrapolateRight: 'clamp' })
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
        flexDirection: 'column',
        gap: 0,
        padding: '0 160px',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 100,
          width: '100%',
        }}
      >
        {/* Shield icon with glow */}
        <div
          style={{
            flexShrink: 0,
            position: 'relative',
            width: 260,
            height: 260,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: shieldOpacity,
            transform: `scale(${shieldScale})`,
          }}
        >
          {/* Glow ring */}
          <div
            style={{
              position: 'absolute',
              width: 200 + glowSize,
              height: 200 + glowSize,
              borderRadius: '50%',
              backgroundColor: `rgba(223,255,6,0.08)`,
              transition: 'all 0.1s',
            }}
          />
          <Shield size={200} />
        </div>

        {/* Text block */}
        <div style={{ flex: 1 }}>
          <div
            style={{
              display: 'inline-block',
              border: `2px solid ${NEON}`,
              color: NEON,
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: 3,
              textTransform: 'uppercase',
              padding: '6px 18px',
              borderRadius: 4,
              marginBottom: 24,
              opacity: titleOpacity,
            }}
          >
            Feature 3
          </div>

          <h2
            style={{
              fontSize: 72,
              fontWeight: 800,
              color: '#ffffff',
              margin: '0 0 12px 0',
              lineHeight: 1.05,
              opacity: titleOpacity,
              transform: `translateY(${titleY}px)`,
            }}
          >
            <span style={{ color: NEON }}>Tamper</span> Proof
          </h2>

          <p
            style={{
              fontSize: 24,
              color: 'rgba(255,255,255,0.55)',
              fontWeight: 300,
              margin: '0 0 36px 0',
              opacity: titleOpacity,
            }}
          >
            Every report is sealed and verifiable — forever.
          </p>

          {bullets.map((bullet, i) => (
            <div
              key={bullet}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                marginBottom: 14,
                opacity: bulletProgress[i],
                transform: `translateX(${interpolate(bulletProgress[i], [0, 1], [30, 0])}px)`,
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: NEON,
                  flexShrink: 0,
                }}
              />
              <span style={{ fontSize: 24, color: 'rgba(255,255,255,0.8)', fontWeight: 400 }}>
                {bullet}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
