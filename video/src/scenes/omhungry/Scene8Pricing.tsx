import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { OmHungryLogo } from './OmHungryLogo';

const ORANGE = '#E8461E';
const ORANGE_LIGHT = '#FF6B3D';
const BG = '#FFF2E8';

export const Scene8Pricing: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 60fps timings
  const headingOpacity = interpolate(frame, [0, 40], [0, 1], { extrapolateRight: 'clamp' });
  const headingY = interpolate(frame, [0, 40], [50, 0], { extrapolateRight: 'clamp' });

  const cardY = interpolate(
    spring({ frame: frame - 40, fps, config: { damping: 16, stiffness: 80 } }),
    [0, 1],
    [400, 0]
  );
  const cardOpacity = interpolate(frame, [40, 100], [0, 1], { extrapolateRight: 'clamp' });

  const badgeScale = spring({ frame: frame - 120, fps, config: { damping: 8, stiffness: 200 } });
  const badgeOpacity = interpolate(frame, [120, 150], [0, 1], { extrapolateRight: 'clamp' });

  const featureOpacities = [0, 1, 2, 3, 4].map((i) =>
    interpolate(frame, [160 + i * 25, 200 + i * 25], [0, 1], { extrapolateRight: 'clamp' })
  );

  const urlOpacity = interpolate(frame, [240, 280], [0, 1], { extrapolateRight: 'clamp' });
  const urlScale = interpolate(
    frame,
    [280, 310, 340, 370, 400, 430],
    [1, 1.06, 1, 1.06, 1, 1.06],
    { extrapolateRight: 'clamp' }
  );
  const urlGlow = interpolate(frame, [280, 310, 340, 370], [0, 1, 0, 1], { extrapolateRight: 'clamp' });

  const guaranteeOpacity = interpolate(frame, [350, 400], [0, 1], { extrapolateRight: 'clamp' });

  const sceneOpacity = interpolate(frame, [450, 480], [1, 0], { extrapolateRight: 'clamp' });

  const FEATURES = [
    { icon: '🍽️', text: 'Unlimited menu items' },
    { icon: '📱', text: 'QR code generation' },
    { icon: '🌐', text: 'Arabic & English support' },
    { icon: '📊', text: 'Analytics dashboard' },
    { icon: '🎨', text: 'Full custom branding' },
  ];

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
        opacity: sceneOpacity,
        paddingTop: 120,
        paddingBottom: 80,
        boxSizing: 'border-box',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Warm background radial */}
      <div style={{ position: 'absolute', bottom: -200, left: '50%', transform: 'translateX(-50%)', width: 900, height: 600, background: `radial-gradient(ellipse, ${ORANGE}14 0%, transparent 70%)`, filter: 'blur(40px)' }} />

      {/* Heading */}
      <div style={{ opacity: headingOpacity, transform: `translateY(${headingY}px)`, textAlign: 'center', padding: '0 70px', zIndex: 2 }}>
        <div style={{ display: 'inline-block', background: `linear-gradient(135deg, ${ORANGE}, ${ORANGE_LIGHT})`, borderRadius: 50, padding: '12px 32px', marginBottom: 24 }}>
          <span style={{ fontSize: 28, fontWeight: 700, color: '#fff', textTransform: 'uppercase', letterSpacing: 2 }}>Pricing</span>
        </div>
        <h2 style={{ fontSize: 72, fontWeight: 900, color: '#1A1A1A', margin: 0, lineHeight: 1.1, letterSpacing: '-1.5px' }}>
          Simple,{' '}
          <span style={{ background: `linear-gradient(135deg, ${ORANGE}, ${ORANGE_LIGHT})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            transparent
          </span>
          {' '}pricing
        </h2>
      </div>

      {/* Pricing card */}
      <div
        style={{
          opacity: cardOpacity,
          transform: `translateY(${cardY}px)`,
          width: 520,
          backgroundColor: '#FFFFFF',
          borderRadius: 32,
          overflow: 'hidden',
          boxShadow: `0 0 0 1.5px ${ORANGE}20, 0 40px 80px rgba(232,70,30,0.18)`,
          zIndex: 2,
          position: 'relative',
        }}
      >
        {/* Badge */}
        <div
          style={{
            opacity: badgeOpacity,
            position: 'absolute',
            top: -22,
            left: '50%',
            transform: `translateX(-50%) scale(${badgeScale})`,
            backgroundColor: '#16A34A',
            color: '#fff',
            fontSize: 18,
            fontWeight: 900,
            padding: '10px 32px',
            borderRadius: 40,
            boxShadow: '0 6px 24px rgba(22,163,74,0.4)',
            whiteSpace: 'nowrap',
            zIndex: 10,
          }}
        >
          🎁 14-Day Free Trial — No Card Needed
        </div>

        {/* Card top */}
        <div style={{ background: `linear-gradient(135deg, ${ORANGE}, ${ORANGE_LIGHT})`, padding: '56px 44px 36px', textAlign: 'center' }}>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 20, fontWeight: 700, margin: '0 0 10px', textTransform: 'uppercase', letterSpacing: 2 }}>Pro Plan</p>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', gap: 4 }}>
            <span style={{ fontSize: 30, fontWeight: 700, color: 'rgba(255,255,255,0.75)', paddingTop: 14 }}>OMR</span>
            <span style={{ fontSize: 100, fontWeight: 900, color: '#fff', lineHeight: 1 }}>3.99</span>
            <span style={{ fontSize: 22, color: 'rgba(255,255,255,0.7)', paddingTop: 60 }}>/mo</span>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 18, margin: '6px 0 0', fontWeight: 500 }}>After your free trial</p>
        </div>

        {/* Features */}
        <div style={{ padding: '28px 44px 36px' }}>
          {FEATURES.map((f, i) => (
            <div key={i} style={{ opacity: featureOpacities[i], display: 'flex', alignItems: 'center', gap: 16, marginBottom: 18, fontSize: 20, color: '#333', fontWeight: 600 }}>
              <span style={{ fontSize: 26 }}>{f.icon}</span>
              {f.text}
            </div>
          ))}
          <div style={{ marginTop: 30, background: `linear-gradient(135deg, ${ORANGE}, ${ORANGE_LIGHT})`, borderRadius: 18, padding: '22px', textAlign: 'center', boxShadow: `0 10px 30px ${ORANGE}44` }}>
            <span style={{ color: '#fff', fontSize: 24, fontWeight: 900 }}>Start Free Trial →</span>
          </div>
        </div>
      </div>

      {/* Guarantee */}
      <div style={{ opacity: guaranteeOpacity, textAlign: 'center', zIndex: 2 }}>
        <p style={{ fontSize: 26, color: '#888', margin: 0, fontWeight: 600 }}>
          🔒 Cancel anytime · No setup fees · Instant access
        </p>
      </div>

      {/* URL */}
      <div style={{ opacity: urlOpacity, transform: `scale(${urlScale})`, zIndex: 2, textAlign: 'center' }}>
        <div style={{ fontSize: 40, fontWeight: 900, color: ORANGE, letterSpacing: 1, textShadow: urlGlow > 0.5 ? `0 0 40px ${ORANGE_LIGHT}, 0 0 80px ${ORANGE}66` : 'none' }}>
          omhungry.com
        </div>
      </div>

      {/* Bottom logo */}
      <div style={{ zIndex: 2 }}>
        <OmHungryLogo size={110} showText={true} />
      </div>
    </div>
  );
};
