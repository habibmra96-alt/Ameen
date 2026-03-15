import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';

const ORANGE = '#E8461E';
const ORANGE_LIGHT = '#FF6B3D';

export const Scene8Pricing: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Heading
  const headingOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });

  // Pricing card slides up with spring
  const cardY = interpolate(
    spring({ frame: frame - 20, fps, config: { damping: 16, stiffness: 80 } }),
    [0, 1],
    [300, 0]
  );
  const cardOpacity = interpolate(frame, [20, 50], [0, 1], { extrapolateRight: 'clamp' });

  // Free trial badge bounces
  const badgeScale = spring({ frame: frame - 60, fps, config: { damping: 8, stiffness: 200 } });
  const badgeOpacity = interpolate(frame, [60, 75], [0, 1], { extrapolateRight: 'clamp' });

  // Features list items stagger in
  const featureOpacities = [0, 1, 2, 3].map((i) =>
    interpolate(frame, [80 + i * 15, 100 + i * 15], [0, 1], { extrapolateRight: 'clamp' })
  );

  // URL pulse
  const urlScale = interpolate(
    frame,
    [140, 155, 170, 185, 200, 215],
    [1, 1.06, 1, 1.06, 1, 1.06],
    { extrapolateRight: 'clamp' }
  );
  const urlGlow = interpolate(
    frame,
    [140, 155, 170, 185],
    [0, 1, 0, 1],
    { extrapolateRight: 'clamp' }
  );
  const urlOpacity = interpolate(frame, [120, 140], [0, 1], { extrapolateRight: 'clamp' });

  // Exit
  const sceneOpacity = interpolate(frame, [225, 240], [1, 0], { extrapolateRight: 'clamp' });

  const FEATURES = [
    '✅ Unlimited menu items',
    '✅ QR code generation',
    '✅ Arabic & English',
    '✅ Analytics dashboard',
  ];

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: `linear-gradient(180deg, #0D0D0D 0%, #1A0805 100%)`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        fontFamily: 'Inter, system-ui, sans-serif',
        opacity: sceneOpacity,
        paddingTop: 80,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 800,
          height: 500,
          background: `radial-gradient(ellipse, ${ORANGE}22 0%, transparent 70%)`,
          filter: 'blur(40px)',
        }}
      />

      {/* Heading */}
      <div
        style={{
          opacity: headingOpacity,
          textAlign: 'center',
          marginBottom: 40,
          padding: '0 60px',
          zIndex: 2,
        }}
      >
        <h2 style={{ fontSize: 52, fontWeight: 800, color: '#ffffff', margin: 0, lineHeight: 1.2 }}>
          Simple,{' '}
          <span style={{ background: `linear-gradient(135deg, ${ORANGE}, ${ORANGE_LIGHT})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            transparent
          </span>{' '}
          pricing
        </h2>
      </div>

      {/* Pricing card */}
      <div
        style={{
          opacity: cardOpacity,
          transform: `translateY(${cardY}px)`,
          width: 460,
          backgroundColor: '#1C1C1C',
          borderRadius: 28,
          overflow: 'hidden',
          boxShadow: `0 0 0 1px rgba(255,255,255,0.08), 0 40px 80px rgba(0,0,0,0.5), 0 0 60px ${ORANGE}33`,
          zIndex: 2,
          position: 'relative',
        }}
      >
        {/* Free trial badge */}
        <div
          style={{
            opacity: badgeOpacity,
            transform: `scale(${badgeScale})`,
            position: 'absolute',
            top: -18,
            left: '50%',
            transform: `translateX(-50%) scale(${badgeScale})`,
            backgroundColor: '#22C55E',
            color: '#fff',
            fontSize: 16,
            fontWeight: 800,
            padding: '8px 28px',
            borderRadius: 30,
            boxShadow: '0 4px 20px rgba(34,197,94,0.5)',
            whiteSpace: 'nowrap',
            zIndex: 10,
          }}
        >
          🎁 14-Day Free Trial
        </div>

        {/* Card gradient top */}
        <div
          style={{
            background: `linear-gradient(135deg, ${ORANGE}, ${ORANGE_LIGHT})`,
            padding: '48px 36px 32px',
            textAlign: 'center',
          }}
        >
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 18, fontWeight: 600, margin: '0 0 8px', textTransform: 'uppercase', letterSpacing: 2 }}>
            Pro Plan
          </p>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', gap: 4 }}>
            <span style={{ fontSize: 28, fontWeight: 700, color: 'rgba(255,255,255,0.8)', paddingTop: 12 }}>OMR</span>
            <span style={{ fontSize: 88, fontWeight: 900, color: '#fff', lineHeight: 1 }}>3.99</span>
            <span style={{ fontSize: 20, color: 'rgba(255,255,255,0.7)', paddingTop: 52 }}>/mo</span>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 16, margin: '4px 0 0', fontWeight: 500 }}>
            After your free trial
          </p>
        </div>

        {/* Features */}
        <div style={{ padding: '28px 36px 32px' }}>
          {FEATURES.map((feature, i) => (
            <div
              key={i}
              style={{
                opacity: featureOpacities[i],
                fontSize: 18,
                color: 'rgba(255,255,255,0.85)',
                marginBottom: 14,
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                gap: 4,
              }}
            >
              {feature}
            </div>
          ))}

          {/* CTA button */}
          <div
            style={{
              marginTop: 28,
              background: `linear-gradient(135deg, ${ORANGE}, ${ORANGE_LIGHT})`,
              borderRadius: 16,
              padding: '18px',
              textAlign: 'center',
              cursor: 'pointer',
              boxShadow: `0 8px 24px ${ORANGE}55`,
            }}
          >
            <span style={{ color: '#fff', fontSize: 20, fontWeight: 800, letterSpacing: 0.5 }}>
              Start Free Trial →
            </span>
          </div>
        </div>
      </div>

      {/* URL pulse */}
      <div
        style={{
          opacity: urlOpacity,
          transform: `scale(${urlScale})`,
          marginTop: 36,
          zIndex: 2,
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontSize: 32,
            fontWeight: 800,
            color: '#fff',
            letterSpacing: 1,
            textShadow: urlGlow > 0.5
              ? `0 0 30px ${ORANGE_LIGHT}, 0 0 60px ${ORANGE}88`
              : 'none',
          }}
        >
          omhungry.com
        </div>
      </div>
    </div>
  );
};
