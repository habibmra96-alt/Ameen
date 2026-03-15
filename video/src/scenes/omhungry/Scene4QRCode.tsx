import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';

const ORANGE = '#E8461E';
const ORANGE_LIGHT = '#FF6B3D';

// Simple QR code grid (static pattern)
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

  // Heading
  const headingOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });

  // QR code draws itself row by row
  const rowsVisible = interpolate(frame, [15, 90], [0, 21], { extrapolateRight: 'clamp' });

  // Phone swoops in
  const phoneScale = spring({ frame: frame - 95, fps, config: { damping: 14, stiffness: 90 } });
  const phoneOpacity = interpolate(frame, [95, 115], [0, 1], { extrapolateRight: 'clamp' });

  // Shimmer on phone screen after phone enters
  const shimmerX = interpolate(frame, [120, 160], [-300, 300], { extrapolateRight: 'clamp' });
  const shimmerOpacity = interpolate(
    frame,
    [118, 125, 155, 165],
    [0, 0.6, 0.6, 0],
    { extrapolateRight: 'clamp' }
  );

  // Scanner line on QR code
  const scannerY = interpolate(frame, [15, 90], [0, 200], { extrapolateRight: 'clamp' });
  const scannerOpacity = interpolate(frame, [15, 25, 85, 95], [0, 1, 1, 0], { extrapolateRight: 'clamp' });

  // Exit
  const sceneOpacity = interpolate(frame, [160, 180], [1, 0], { extrapolateRight: 'clamp' });

  const CELL = 10; // pixels per QR cell

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#0D0D0D',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        fontFamily: 'Inter, system-ui, sans-serif',
        opacity: sceneOpacity,
        paddingTop: 100,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 50% 40%, rgba(232,70,30,0.12) 0%, transparent 65%)',
        }}
      />

      {/* Heading */}
      <div
        style={{
          opacity: headingOpacity,
          textAlign: 'center',
          marginBottom: 60,
          padding: '0 60px',
          zIndex: 2,
        }}
      >
        <p style={{ fontSize: 28, fontWeight: 600, color: ORANGE_LIGHT, margin: '0 0 12px', textTransform: 'uppercase', letterSpacing: 3 }}>
          QR Code Menu
        </p>
        <h2 style={{ fontSize: 64, fontWeight: 800, color: '#ffffff', margin: 0 }}>
          Scan.{' '}
          <span style={{ background: `linear-gradient(135deg, ${ORANGE}, ${ORANGE_LIGHT})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Browse.
          </span>{' '}
          Done.
        </h2>
      </div>

      {/* QR code container */}
      <div
        style={{
          position: 'relative',
          backgroundColor: '#FFFFFF',
          padding: 20,
          borderRadius: 16,
          boxShadow: `0 0 40px ${ORANGE}44`,
          zIndex: 2,
          marginBottom: 50,
        }}
      >
        {/* Scanner line */}
        <div
          style={{
            position: 'absolute',
            left: 20,
            right: 20,
            top: 20 + scannerY,
            height: 3,
            background: `linear-gradient(90deg, transparent, ${ORANGE}, transparent)`,
            opacity: scannerOpacity,
            zIndex: 5,
            borderRadius: 2,
          }}
        />
        {/* QR Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {QR_GRID.map((row, rowIdx) => (
            <div key={rowIdx} style={{ display: 'flex', gap: 1, opacity: rowIdx < rowsVisible ? 1 : 0 }}>
              {row.map((cell, colIdx) => (
                <div
                  key={colIdx}
                  style={{
                    width: CELL,
                    height: CELL,
                    backgroundColor: cell === 1 ? '#1A0A05' : '#FFFFFF',
                    borderRadius: cell === 1 ? 1 : 0,
                  }}
                />
              ))}
            </div>
          ))}
        </div>
        {/* OmHungry label below QR */}
        <div
          style={{
            textAlign: 'center',
            marginTop: 12,
            fontSize: 14,
            fontWeight: 700,
            color: ORANGE,
            letterSpacing: 1,
          }}
        >
          omhungry.com
        </div>
      </div>

      {/* Phone with menu loaded */}
      <div
        style={{
          opacity: phoneOpacity,
          transform: `scale(${phoneScale})`,
          zIndex: 2,
          position: 'relative',
        }}
      >
        <div
          style={{
            width: 200,
            height: 340,
            backgroundColor: '#1C1C1E',
            borderRadius: 28,
            padding: 8,
            boxShadow: '0 30px 60px rgba(0,0,0,0.5), 0 0 40px rgba(232,70,30,0.3)',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: '#FFFCF9',
              borderRadius: 22,
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            {/* Shimmer */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: shimmerX,
                width: 80,
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)',
                opacity: shimmerOpacity,
                zIndex: 10,
                transform: 'skewX(-15deg)',
              }}
            />
            <div style={{ backgroundColor: ORANGE, padding: '28px 14px 14px', textAlign: 'center' }}>
              <p style={{ color: '#fff', fontWeight: 700, fontSize: 14, margin: 0 }}>🍽️ Menu Loaded!</p>
            </div>
            <div style={{ padding: 12 }}>
              {['Starter', 'Main', 'Dessert'].map((item, i) => (
                <div
                  key={i}
                  style={{
                    height: 32,
                    backgroundColor: i % 2 === 0 ? '#FFF4F0' : '#f5f5f5',
                    borderRadius: 8,
                    marginBottom: 8,
                    display: 'flex',
                    alignItems: 'center',
                    paddingLeft: 10,
                    fontSize: 12,
                    color: '#555',
                    fontWeight: 600,
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
