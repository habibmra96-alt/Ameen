import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';

const NEON = '#DFFF06';

export const Scene1Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo fades + scales in
  const logoScale = spring({ frame, fps, config: { damping: 14, stiffness: 80 } });
  const logoOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });

  // Title slides up after logo
  const titleY = spring({
    frame: frame - 20,
    fps,
    config: { damping: 16, stiffness: 70 },
  });
  const titleTranslateY = interpolate(titleY, [0, 1], [60, 0]);
  const titleOpacity = interpolate(frame, [20, 45], [0, 1], { extrapolateRight: 'clamp' });

  // Neon underline expands
  const underlineWidth = interpolate(frame, [50, 90], [0, 480], { extrapolateRight: 'clamp' });

  // Tagline
  const taglineOpacity = interpolate(frame, [80, 110], [0, 1], { extrapolateRight: 'clamp' });
  const taglineY = interpolate(frame, [80, 110], [20, 0], { extrapolateRight: 'clamp' });

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
      }}
    >
      {/* Logo circle */}
      <div
        style={{
          width: 140,
          height: 140,
          borderRadius: '50%',
          backgroundColor: NEON,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 40,
          opacity: logoOpacity,
          transform: `scale(${logoScale})`,
        }}
      >
        <span style={{ fontSize: 64, fontWeight: 900, color: '#000', lineHeight: 1 }}>A</span>
      </div>

      {/* Main title */}
      <div
        style={{
          opacity: titleOpacity,
          transform: `translateY(${titleTranslateY}px)`,
          textAlign: 'center',
        }}
      >
        <h1
          style={{
            fontSize: 88,
            fontWeight: 800,
            color: '#ffffff',
            margin: 0,
            letterSpacing: '-2px',
          }}
        >
          Ameen{' '}
          <span style={{ color: NEON }}>Inspection</span>
          {' '}Pro
        </h1>

        {/* Neon underline */}
        <div
          style={{
            height: 4,
            width: underlineWidth,
            backgroundColor: NEON,
            margin: '18px auto 0',
            borderRadius: 2,
          }}
        />
      </div>

      {/* Tagline */}
      <p
        style={{
          opacity: taglineOpacity,
          transform: `translateY(${taglineY}px)`,
          fontSize: 32,
          color: 'rgba(255,255,255,0.6)',
          marginTop: 28,
          letterSpacing: 2,
          fontWeight: 300,
        }}
      >
        Trust in Every Mile Driven
      </p>
    </div>
  );
};
