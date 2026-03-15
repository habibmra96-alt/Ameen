import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';

const ORANGE = '#E8461E';
const ORANGE_LIGHT = '#FF6B3D';

export const SceneEndCard: React.FC = () => {
  const frame = useCurrentFrame();

  // Fade in from black
  const fadeIn = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });

  // Logo fades in
  const logoOpacity = interpolate(frame, [10, 30], [0, 1], { extrapolateRight: 'clamp' });

  // URL fades in after logo
  const urlOpacity = interpolate(frame, [25, 45], [0, 1], { extrapolateRight: 'clamp' });

  // Subtle glow pulse on logo
  const glowIntensity = interpolate(frame, [30, 50, 60], [0, 1, 0.7], { extrapolateRight: 'clamp' });

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: `linear-gradient(160deg, ${ORANGE} 0%, ${ORANGE_LIGHT} 50%, #FF8C60 100%)`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Inter, system-ui, sans-serif',
        opacity: fadeIn,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative circles */}
      <div
        style={{
          position: 'absolute',
          top: -300,
          right: -300,
          width: 700,
          height: 700,
          borderRadius: '50%',
          border: '2px solid rgba(255,255,255,0.12)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: -400,
          left: -250,
          width: 800,
          height: 800,
          borderRadius: '50%',
          border: '2px solid rgba(255,255,255,0.08)',
        }}
      />

      {/* Logo mark */}
      <div
        style={{
          opacity: logoOpacity,
          position: 'relative',
          marginBottom: 32,
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: 200 + glowIntensity * 60,
            height: 200 + glowIntensity * 60,
            borderRadius: '50%',
            backgroundColor: `rgba(255,255,255,${0.15 * glowIntensity})`,
            transform: 'translate(-50%, -50%)',
            filter: 'blur(20px)',
          }}
        />
        <div
          style={{
            width: 160,
            height: 160,
            borderRadius: '50%',
            backgroundColor: 'rgba(255,255,255,0.95)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: `0 0 60px rgba(255,255,255,${0.3 + glowIntensity * 0.3}), 0 20px 40px rgba(0,0,0,0.2)`,
          }}
        >
          <span
            style={{
              fontSize: 64,
              fontWeight: 900,
              background: `linear-gradient(135deg, ${ORANGE}, ${ORANGE_LIGHT})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              lineHeight: 1,
            }}
          >
            Om
          </span>
        </div>
      </div>

      {/* Brand name */}
      <div style={{ opacity: logoOpacity, marginBottom: 12, textAlign: 'center' }}>
        <h1
          style={{
            fontSize: 72,
            fontWeight: 900,
            color: '#ffffff',
            margin: 0,
            letterSpacing: '-1px',
            textShadow: '0 4px 24px rgba(0,0,0,0.15)',
          }}
        >
          OmHungry
        </h1>
      </div>

      {/* Divider */}
      <div
        style={{
          opacity: logoOpacity,
          width: 60,
          height: 3,
          backgroundColor: 'rgba(255,255,255,0.6)',
          borderRadius: 2,
          marginBottom: 24,
        }}
      />

      {/* URL */}
      <div
        style={{
          opacity: urlOpacity,
          textAlign: 'center',
        }}
      >
        <p
          style={{
            fontSize: 32,
            fontWeight: 700,
            color: 'rgba(255,255,255,0.9)',
            margin: 0,
            letterSpacing: 1,
          }}
        >
          omhungry.com
        </p>
      </div>
    </div>
  );
};
