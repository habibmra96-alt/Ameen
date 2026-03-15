import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { OmHungryLogo } from './OmHungryLogo';

const ORANGE = '#E8461E';
const ORANGE_LIGHT = '#FF6B3D';

export const SceneEndCard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 60fps timings
  const fadeIn = interpolate(frame, [0, 40], [0, 1], { extrapolateRight: 'clamp' });

  const logoScale = spring({ frame: frame - 10, fps, config: { damping: 14, stiffness: 90 } });
  const logoOpacity = interpolate(frame, [10, 50], [0, 1], { extrapolateRight: 'clamp' });

  const urlOpacity = interpolate(frame, [50, 90], [0, 1], { extrapolateRight: 'clamp' });
  const taglineOpacity = interpolate(frame, [70, 110], [0, 1], { extrapolateRight: 'clamp' });

  const glowIntensity = interpolate(frame, [60, 100, 120], [0, 1, 0.7], { extrapolateRight: 'clamp' });

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: `linear-gradient(160deg, ${ORANGE} 0%, ${ORANGE_LIGHT} 55%, #FF9060 100%)`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Inter, system-ui, sans-serif',
        opacity: fadeIn,
        position: 'relative',
        overflow: 'hidden',
        gap: 36,
      }}
    >
      {/* Decorative rings */}
      <div style={{ position: 'absolute', top: -300, right: -300, width: 800, height: 800, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.15)' }} />
      <div style={{ position: 'absolute', top: -450, right: -450, width: 1100, height: 1100, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.07)' }} />
      <div style={{ position: 'absolute', bottom: -400, left: -300, width: 900, height: 900, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.1)' }} />

      {/* Logo */}
      <div
        style={{
          opacity: logoOpacity,
          transform: `scale(${logoScale})`,
          position: 'relative',
        }}
      >
        {/* Glow ring */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          width: 320 + glowIntensity * 80, height: 320 + glowIntensity * 80,
          borderRadius: '50%',
          backgroundColor: `rgba(255,255,255,${0.15 * glowIntensity})`,
          transform: 'translate(-50%, -50%)',
          filter: 'blur(30px)',
        }} />
        <div style={{
          width: 280, height: 280, borderRadius: '50%',
          backgroundColor: 'rgba(255,255,255,0.96)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: `0 0 80px rgba(255,255,255,${0.35 + glowIntensity * 0.3}), 0 30px 60px rgba(0,0,0,0.2)`,
        }}>
          <OmHungryLogo size={220} showText={false} />
        </div>
      </div>

      {/* Brand name */}
      <div style={{ opacity: logoOpacity, textAlign: 'center' }}>
        <h1 style={{ fontSize: 100, fontWeight: 900, color: '#fff', margin: 0, letterSpacing: '-2px', textShadow: '0 6px 30px rgba(0,0,0,0.15)' }}>
          OmHungry
        </h1>
        <div style={{ width: 80, height: 4, backgroundColor: 'rgba(255,255,255,0.6)', borderRadius: 2, margin: '16px auto 0' }} />
      </div>

      {/* Tagline */}
      <div style={{ opacity: taglineOpacity, textAlign: 'center', padding: '0 80px' }}>
        <p style={{ fontSize: 36, fontWeight: 500, color: 'rgba(255,255,255,0.9)', margin: 0, lineHeight: 1.4 }}>
          Your Restaurant. <strong style={{ fontWeight: 800 }}>Your Brand.</strong> Digital.
        </p>
      </div>

      {/* URL */}
      <div style={{ opacity: urlOpacity, textAlign: 'center' }}>
        <p style={{ fontSize: 38, fontWeight: 800, color: 'rgba(255,255,255,0.95)', margin: 0, letterSpacing: 1 }}>
          omhungry.com
        </p>
      </div>
    </div>
  );
};
