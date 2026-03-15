import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { OmHungryLogo } from './OmHungryLogo';

const ORANGE = '#E8461E';
const ORANGE_LIGHT = '#FF6B3D';

export const Scene2BrandIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 60fps timings
  const logoScale = spring({ frame, fps, config: { damping: 12, stiffness: 100 } });
  const logoOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: 'clamp' });

  // Glow pulse
  const glowSize = interpolate(
    frame,
    [40, 120, 200, 280],
    [0, 80, 50, 80],
    { extrapolateRight: 'clamp' }
  );

  const taglineOpacity = interpolate(frame, [80, 140], [0, 1], { extrapolateRight: 'clamp' });
  const taglineY = interpolate(frame, [80, 140], [50, 0], { extrapolateRight: 'clamp' });

  const subtitleOpacity = interpolate(frame, [140, 200], [0, 1], { extrapolateRight: 'clamp' });
  const subtitleY = interpolate(frame, [140, 200], [40, 0], { extrapolateRight: 'clamp' });

  // Feature pills stagger in
  const pillOpacities = [0, 1, 2, 3].map((i) =>
    interpolate(frame, [180 + i * 30, 220 + i * 30], [0, 1], { extrapolateRight: 'clamp' })
  );
  const pillYs = [0, 1, 2, 3].map((i) =>
    interpolate(frame, [180 + i * 30, 220 + i * 30], [30, 0], { extrapolateRight: 'clamp' })
  );

  const sceneOpacity = interpolate(frame, [260, 300], [1, 0], { extrapolateRight: 'clamp' });

  const PILLS = ['🍽 Custom Menus', '📱 QR Codes', '🌐 Bilingual', '📊 Analytics'];

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: `linear-gradient(160deg, ${ORANGE} 0%, ${ORANGE_LIGHT} 55%, #FF9060 100%)`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontFamily: 'Inter, system-ui, sans-serif',
        opacity: sceneOpacity,
        position: 'relative',
        overflow: 'hidden',
        paddingTop: 160,
        paddingBottom: 130,
        boxSizing: 'border-box',
      }}
    >
      {/* Decorative rings */}
      <div style={{ position: 'absolute', top: -250, right: -250, width: 700, height: 700, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.15)' }} />
      <div style={{ position: 'absolute', top: -350, right: -350, width: 900, height: 900, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.08)' }} />
      <div style={{ position: 'absolute', bottom: -300, left: -250, width: 800, height: 800, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.1)' }} />

      {/* Big logo hero */}
      <div
        style={{
          opacity: logoOpacity,
          transform: `scale(${logoScale})`,
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* Glow */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: 280 + glowSize,
            height: 280 + glowSize,
            borderRadius: '50%',
            backgroundColor: 'rgba(255,255,255,0.18)',
            transform: 'translate(-50%, -50%)',
            filter: 'blur(30px)',
          }}
        />
        <div
          style={{
            width: 260,
            height: 260,
            borderRadius: '50%',
            backgroundColor: 'rgba(255,255,255,0.97)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 80px rgba(255,255,255,0.5), 0 30px 60px rgba(0,0,0,0.2)',
            position: 'relative',
          }}
        >
          <OmHungryLogo size={200} showText={false} />
        </div>
      </div>

      {/* Brand name + tagline */}
      <div style={{ zIndex: 2, textAlign: 'center', padding: '0 60px' }}>
        <div
          style={{
            opacity: taglineOpacity,
            transform: `translateY(${taglineY}px)`,
          }}
        >
          <h1
            style={{
              fontSize: 96,
              fontWeight: 900,
              color: '#ffffff',
              margin: '0 0 16px',
              letterSpacing: '-3px',
              textShadow: '0 4px 30px rgba(0,0,0,0.2)',
            }}
          >
            OmHungry
          </h1>
          <div style={{ width: 100, height: 4, backgroundColor: 'rgba(255,255,255,0.6)', borderRadius: 2, margin: '0 auto 30px' }} />
        </div>
        <div
          style={{
            opacity: subtitleOpacity,
            transform: `translateY(${subtitleY}px)`,
          }}
        >
          <p
            style={{
              fontSize: 40,
              fontWeight: 400,
              color: 'rgba(255,255,255,0.92)',
              margin: 0,
              lineHeight: 1.4,
            }}
          >
            Your Restaurant.{' '}
            <strong style={{ fontWeight: 800 }}>Your Brand.</strong>
            {' '}Digital.
          </p>
        </div>
      </div>

      {/* Feature pills */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 16,
          justifyContent: 'center',
          padding: '0 60px',
          zIndex: 2,
        }}
      >
        {PILLS.map((pill, i) => (
          <div
            key={i}
            style={{
              opacity: pillOpacities[i],
              transform: `translateY(${pillYs[i]}px)`,
              backgroundColor: 'rgba(255,255,255,0.22)',
              border: '1.5px solid rgba(255,255,255,0.4)',
              borderRadius: 50,
              padding: '16px 30px',
              fontSize: 26,
              fontWeight: 700,
              color: '#fff',
            }}
          >
            {pill}
          </div>
        ))}
      </div>
    </div>
  );
};
