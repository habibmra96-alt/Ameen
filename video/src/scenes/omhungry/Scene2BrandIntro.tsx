import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';

const ORANGE = '#E8461E';
const ORANGE_LIGHT = '#FF6B3D';

export const Scene2BrandIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance from wipe — background already orange from wipe
  // Logo scales up with spring
  const logoScale = spring({ frame, fps, config: { damping: 12, stiffness: 100 } });
  const logoOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' });

  // Glow pulse
  const glowSize = interpolate(
    frame,
    [20, 60, 100, 140],
    [0, 60, 40, 60],
    { extrapolateRight: 'clamp' }
  );

  // Tagline fades in after logo
  const taglineOpacity = interpolate(frame, [40, 70], [0, 1], { extrapolateRight: 'clamp' });
  const taglineY = interpolate(frame, [40, 70], [30, 0], { extrapolateRight: 'clamp' });

  // Subtitle line
  const subtitleOpacity = interpolate(frame, [70, 100], [0, 1], { extrapolateRight: 'clamp' });

  // Exit fade
  const sceneOpacity = interpolate(frame, [130, 150], [1, 0], { extrapolateRight: 'clamp' });

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
        opacity: sceneOpacity,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative circles */}
      <div
        style={{
          position: 'absolute',
          top: -200,
          right: -200,
          width: 600,
          height: 600,
          borderRadius: '50%',
          border: '2px solid rgba(255,255,255,0.15)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: -300,
          left: -200,
          width: 700,
          height: 700,
          borderRadius: '50%',
          border: '2px solid rgba(255,255,255,0.1)',
        }}
      />

      {/* Logo mark */}
      <div
        style={{
          opacity: logoOpacity,
          transform: `scale(${logoScale})`,
          position: 'relative',
          marginBottom: 48,
        }}
      >
        {/* Glow ring */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: 180 + glowSize,
            height: 180 + glowSize,
            borderRadius: '50%',
            backgroundColor: 'rgba(255,255,255,0.15)',
            transform: 'translate(-50%, -50%)',
            filter: 'blur(20px)',
          }}
        />
        <div
          style={{
            width: 180,
            height: 180,
            borderRadius: '50%',
            backgroundColor: 'rgba(255,255,255,0.95)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 60px rgba(255,255,255,0.4), 0 20px 40px rgba(0,0,0,0.2)',
            position: 'relative',
          }}
        >
          <span
            style={{
              fontSize: 72,
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
      <div
        style={{
          opacity: taglineOpacity,
          transform: `translateY(${taglineY}px)`,
          textAlign: 'center',
          marginBottom: 20,
        }}
      >
        <h1
          style={{
            fontSize: 84,
            fontWeight: 900,
            color: '#ffffff',
            margin: 0,
            letterSpacing: '-2px',
            textShadow: '0 4px 24px rgba(0,0,0,0.2)',
          }}
        >
          OmHungry
        </h1>
      </div>

      {/* Divider line */}
      <div
        style={{
          opacity: taglineOpacity,
          width: 80,
          height: 3,
          backgroundColor: 'rgba(255,255,255,0.6)',
          borderRadius: 2,
          marginBottom: 24,
        }}
      />

      {/* Tagline */}
      <div
        style={{
          opacity: subtitleOpacity,
          textAlign: 'center',
          padding: '0 60px',
        }}
      >
        <p
          style={{
            fontSize: 36,
            fontWeight: 400,
            color: 'rgba(255,255,255,0.9)',
            margin: 0,
            lineHeight: 1.4,
            letterSpacing: 1,
          }}
        >
          Your Restaurant.{' '}
          <strong style={{ fontWeight: 700 }}>Your Brand.</strong>
          {' '}Digital.
        </p>
      </div>
    </div>
  );
};
