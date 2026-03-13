import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';

const NEON = '#DFFF06';

export const Scene5Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Background neon circle expands
  const bgScale = spring({ frame, fps, config: { damping: 20, stiffness: 40 } });

  // Logo badge
  const logoScale = spring({ frame, fps, config: { damping: 14, stiffness: 90 } });
  const logoOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });

  // Main tagline
  const taglineOpacity = interpolate(frame, [20, 50], [0, 1], { extrapolateRight: 'clamp' });
  const taglineY = interpolate(frame, [20, 50], [30, 0], { extrapolateRight: 'clamp' });

  // Feature pills
  const features = ['150+ Point Check', 'Instant Report', 'Tamper Proof'];
  const pillProgress = features.map((_, i) =>
    interpolate(frame, [60 + i * 20, 85 + i * 20], [0, 1], { extrapolateRight: 'clamp' })
  );

  // CTA button
  const ctaScale = spring({ frame: frame - 110, fps, config: { damping: 12, stiffness: 100 } });
  const ctaOpacity = interpolate(frame, [110, 130], [0, 1], { extrapolateRight: 'clamp' });

  // Fade out at end
  const fadeOut = interpolate(frame, [160, 180], [1, 0], { extrapolateRight: 'clamp' });

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#000000',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Inter, sans-serif',
        position: 'relative',
        overflow: 'hidden',
        opacity: fadeOut,
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: 'absolute',
          width: 800 * bgScale,
          height: 800 * bgScale,
          borderRadius: '50%',
          backgroundColor: `rgba(223,255,6,0.05)`,
          pointerEvents: 'none',
        }}
      />

      {/* Logo badge */}
      <div
        style={{
          width: 120,
          height: 120,
          borderRadius: '50%',
          backgroundColor: NEON,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 32,
          opacity: logoOpacity,
          transform: `scale(${logoScale})`,
          boxShadow: `0 0 80px rgba(223,255,6,0.4)`,
        }}
      >
        <span style={{ fontSize: 56, fontWeight: 900, color: '#000', lineHeight: 1 }}>A</span>
      </div>

      {/* Brand name */}
      <h1
        style={{
          fontSize: 72,
          fontWeight: 800,
          color: '#ffffff',
          margin: '0 0 8px 0',
          opacity: taglineOpacity,
          transform: `translateY(${taglineY}px)`,
          letterSpacing: '-1px',
        }}
      >
        Ameen <span style={{ color: NEON }}>Inspection</span> Pro
      </h1>

      {/* Tagline */}
      <p
        style={{
          fontSize: 28,
          color: 'rgba(255,255,255,0.5)',
          fontWeight: 300,
          margin: '0 0 56px 0',
          opacity: taglineOpacity,
          letterSpacing: 3,
        }}
      >
        Trust in Every Mile Driven
      </p>

      {/* Feature pills */}
      <div style={{ display: 'flex', gap: 20, marginBottom: 64 }}>
        {features.map((feature, i) => (
          <div
            key={feature}
            style={{
              backgroundColor: 'rgba(223,255,6,0.1)',
              border: `1.5px solid rgba(223,255,6,0.4)`,
              borderRadius: 50,
              padding: '12px 28px',
              fontSize: 20,
              color: NEON,
              fontWeight: 500,
              opacity: pillProgress[i],
              transform: `scale(${interpolate(pillProgress[i], [0, 1], [0.8, 1])})`,
            }}
          >
            {feature}
          </div>
        ))}
      </div>

      {/* CTA */}
      <div
        style={{
          backgroundColor: NEON,
          color: '#000000',
          fontSize: 28,
          fontWeight: 800,
          padding: '22px 72px',
          borderRadius: 8,
          letterSpacing: 1,
          opacity: ctaOpacity,
          transform: `scale(${ctaScale})`,
          boxShadow: `0 0 40px rgba(223,255,6,0.5)`,
        }}
      >
        Get Your Inspection Today
      </div>
    </div>
  );
};
