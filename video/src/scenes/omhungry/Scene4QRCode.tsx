import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { OmHungryLogo } from './OmHungryLogo';

const ORANGE = '#E8461E';
const ORANGE_LIGHT = '#FF6B3D';
const BG = '#FFF2E8';

const QR_GRID = [
  [1,1,1,1,1,1,1,0,1,0,0,1,0,0,1,1,1,1,1,1,1],
  [1,0,0,0,0,0,1,0,0,1,1,0,1,0,1,0,0,0,0,0,1],
  [1,0,1,1,1,0,1,0,1,0,1,1,0,0,1,0,1,1,1,0,1],
  [1,0,1,1,1,0,1,0,0,1,0,1,1,0,1,0,1,1,1,0,1],
  [1,0,1,1,1,0,1,0,1,1,0,0,1,0,1,0,1,1,1,0,1],
  [1,0,0,0,0,0,1,0,0,0,1,1,0,0,1,0,0,0,0,0,1],
  [1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,1,1,1,1,1,1],
  [0,0,0,0,0,0,0,0,1,1,0,1,0,0,0,0,0,0,0,0,0],
  [1,0,1,1,0,1,1,0,0,1,1,0,1,0,1,0,1,1,0,1,1],
  [0,1,0,0,1,0,0,0,1,0,0,1,0,0,0,1,0,0,1,0,0],
  [1,1,0,1,0,1,1,0,1,1,0,0,1,0,0,1,0,1,1,0,1],
  [0,0,1,0,1,0,0,0,0,1,1,0,1,0,1,0,1,0,0,1,0],
  [1,0,1,1,0,1,1,0,1,0,1,1,0,0,1,1,0,1,0,1,1],
  [0,0,0,0,0,0,0,0,1,0,0,1,1,0,0,0,1,0,1,0,0],
  [1,1,1,1,1,1,1,0,0,1,0,0,1,0,1,0,1,1,0,1,1],
  [1,0,0,0,0,0,1,0,1,0,1,1,0,0,0,1,0,0,1,0,0],
  [1,0,1,1,1,0,1,0,0,1,1,0,1,0,1,1,0,1,1,0,1],
  [1,0,1,1,1,0,1,0,1,0,0,1,0,0,0,0,1,0,0,1,0],
  [1,0,1,1,1,0,1,0,0,1,0,0,1,0,1,0,1,1,0,1,1],
  [1,0,0,0,0,0,1,0,1,1,1,0,0,0,0,1,0,0,1,0,0],
  [1,1,1,1,1,1,1,0,0,0,1,1,0,0,1,0,1,1,0,1,1],
];

export const Scene4QRCode: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 60fps timings
  const headingOpacity = interpolate(frame, [0, 40], [0, 1], { extrapolateRight: 'clamp' });
  const headingY = interpolate(frame, [0, 40], [50, 0], { extrapolateRight: 'clamp' });

  const rowsVisible = interpolate(frame, [30, 180], [0, 21], { extrapolateRight: 'clamp' });

  const phoneScale = spring({ frame: frame - 190, fps, config: { damping: 14, stiffness: 90 } });
  const phoneOpacity = interpolate(frame, [190, 230], [0, 1], { extrapolateRight: 'clamp' });

  const shimmerX = interpolate(frame, [240, 320], [-300, 350], { extrapolateRight: 'clamp' });
  const shimmerOpacity = interpolate(frame, [236, 250, 310, 330], [0, 0.7, 0.7, 0], { extrapolateRight: 'clamp' });

  const scannerY = interpolate(frame, [30, 180], [0, 240], { extrapolateRight: 'clamp' });
  const scannerOpacity = interpolate(frame, [30, 50, 170, 190], [0, 1, 1, 0], { extrapolateRight: 'clamp' });

  const stepsOpacity = interpolate(frame, [280, 340], [0, 1], { extrapolateRight: 'clamp' });
  const logoOpacity = interpolate(frame, [120, 160], [0, 1], { extrapolateRight: 'clamp' });

  const sceneOpacity = interpolate(frame, [320, 360], [1, 0], { extrapolateRight: 'clamp' });

  const CELL = 13;

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
        paddingBottom: 100,
        boxSizing: 'border-box',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 50% 45%, ${ORANGE}10 0%, transparent 65%)` }} />

      {/* Heading */}
      <div
        style={{
          opacity: headingOpacity,
          transform: `translateY(${headingY}px)`,
          textAlign: 'center',
          padding: '0 70px',
          zIndex: 2,
        }}
      >
        <div style={{ display: 'inline-block', background: `linear-gradient(135deg, ${ORANGE}, ${ORANGE_LIGHT})`, borderRadius: 50, padding: '12px 32px', marginBottom: 24 }}>
          <span style={{ fontSize: 28, fontWeight: 700, color: '#fff', textTransform: 'uppercase', letterSpacing: 2 }}>QR Code Menu</span>
        </div>
        <h2 style={{ fontSize: 80, fontWeight: 900, color: '#1A1A1A', margin: 0, letterSpacing: '-2px' }}>
          Scan.{' '}
          <span style={{ background: `linear-gradient(135deg, ${ORANGE}, ${ORANGE_LIGHT})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Browse.</span>
          {' '}Done.
        </h2>
      </div>

      {/* QR code */}
      <div
        style={{
          position: 'relative',
          backgroundColor: '#FFFFFF',
          padding: 24,
          borderRadius: 20,
          boxShadow: `0 0 50px ${ORANGE}30, 0 20px 50px rgba(0,0,0,0.12)`,
          zIndex: 2,
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: 24,
            right: 24,
            top: 24 + scannerY,
            height: 3,
            background: `linear-gradient(90deg, transparent, ${ORANGE}, transparent)`,
            opacity: scannerOpacity,
            zIndex: 5,
            borderRadius: 2,
            boxShadow: `0 0 12px ${ORANGE}`,
          }}
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          {QR_GRID.map((row, rowIdx) => (
            <div key={rowIdx} style={{ display: 'flex', gap: 1.5, opacity: rowIdx < rowsVisible ? 1 : 0 }}>
              {row.map((cell, colIdx) => (
                <div
                  key={colIdx}
                  style={{
                    width: CELL,
                    height: CELL,
                    backgroundColor: cell === 1 ? '#1A0A05' : '#FFFFFF',
                    borderRadius: cell === 1 ? 2 : 0,
                  }}
                />
              ))}
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 16, fontSize: 18, fontWeight: 800, color: ORANGE, letterSpacing: 1 }}>
          omhungry.com
        </div>
      </div>

      {/* Phone result */}
      <div style={{ opacity: phoneOpacity, transform: `scale(${phoneScale})`, zIndex: 2, position: 'relative' }}>
        <div style={{ width: 240, height: 400, backgroundColor: '#1C1C1E', borderRadius: 34, padding: 10, boxShadow: `0 40px 80px rgba(0,0,0,0.25), 0 0 50px ${ORANGE}30`, overflow: 'hidden' }}>
          <div style={{ width: '100%', height: '100%', backgroundColor: '#FFFCF9', borderRadius: 28, overflow: 'hidden', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 0, bottom: 0, left: shimmerX, width: 100, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.9), transparent)', opacity: shimmerOpacity, transform: 'skewX(-15deg)', zIndex: 10 }} />
            <div style={{ background: `linear-gradient(135deg, ${ORANGE}, ${ORANGE_LIGHT})`, padding: '34px 18px 18px', textAlign: 'center' }}>
              <div style={{ fontSize: 32, marginBottom: 6 }}>🍽️</div>
              <p style={{ color: '#fff', fontWeight: 800, fontSize: 18, margin: 0 }}>Menu Loaded!</p>
            </div>
            <div style={{ padding: '14px 16px' }}>
              {['🥗 Starters', '🍖 Mains', '🍰 Desserts'].map((item, i) => (
                <div key={i} style={{ height: 44, backgroundColor: i % 2 === 0 ? '#FFF4F0' : '#f8f8f8', borderRadius: 10, marginBottom: 10, display: 'flex', alignItems: 'center', paddingLeft: 14, fontSize: 15, color: '#444', fontWeight: 700 }}>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Steps */}
      <div style={{ opacity: stepsOpacity, display: 'flex', gap: 24, zIndex: 2 }}>
        {['📷 Scan QR', '📋 Browse menu', '✅ Order!'].map((step, i) => (
          <div key={i} style={{ textAlign: 'center', backgroundColor: '#fff', borderRadius: 16, padding: '16px 22px', boxShadow: '0 4px 16px rgba(232,70,30,0.12)', border: `1.5px solid ${ORANGE}25` }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: '#1A1A1A' }}>{step}</div>
          </div>
        ))}
      </div>

      {/* Bottom logo */}
      <div style={{ opacity: logoOpacity, zIndex: 2 }}>
        <OmHungryLogo size={100} showText={true} />
      </div>
    </div>
  );
};
