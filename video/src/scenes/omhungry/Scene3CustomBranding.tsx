import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';

const ORANGE = '#E8461E';
const ORANGE_LIGHT = '#FF6B3D';

const PALETTE = ['#E8461E', '#2563EB', '#16A34A', '#9333EA', '#F59E0B'];
const PALETTE_LABELS = ['Orange', 'Blue', 'Green', 'Purple', 'Amber'];

export const Scene3CustomBranding: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Heading
  const headingOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  const headingY = interpolate(frame, [0, 20], [30, 0], { extrapolateRight: 'clamp' });

  // Phone slides in from right
  const phoneX = interpolate(
    spring({ frame: frame - 15, fps, config: { damping: 18, stiffness: 80 } }),
    [0, 1],
    [400, 0]
  );
  const phoneOpacity = interpolate(frame, [15, 40], [0, 1], { extrapolateRight: 'clamp' });

  // Color swatches pop in sequentially
  const swatchScales = PALETTE.map((_, i) =>
    spring({ frame: frame - (50 + i * 18), fps, config: { damping: 12, stiffness: 150 } })
  );

  // Active color index cycles
  const activeColor = Math.floor(frame / 48) % PALETTE.length;

  // Menu color morphs
  const menuColor = PALETTE[activeColor];

  // Exit
  const sceneOpacity = interpolate(frame, [220, 240], [1, 0], { extrapolateRight: 'clamp' });

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
      {/* Background glow */}
      <div
        style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: `radial-gradient(ellipse, ${menuColor}22 0%, transparent 70%)`,
          transition: 'background 0.3s',
          filter: 'blur(40px)',
        }}
      />

      {/* Heading */}
      <div
        style={{
          opacity: headingOpacity,
          transform: `translateY(${headingY}px)`,
          textAlign: 'center',
          marginBottom: 60,
          padding: '0 60px',
          zIndex: 2,
        }}
      >
        <p
          style={{
            fontSize: 28,
            fontWeight: 600,
            color: ORANGE_LIGHT,
            margin: '0 0 12px',
            textTransform: 'uppercase',
            letterSpacing: 3,
          }}
        >
          Custom Branding
        </p>
        <h2
          style={{
            fontSize: 58,
            fontWeight: 800,
            color: '#ffffff',
            margin: 0,
            lineHeight: 1.15,
          }}
        >
          Your brand,{' '}
          <span
            style={{
              background: `linear-gradient(135deg, ${ORANGE}, ${ORANGE_LIGHT})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            your colors,
          </span>
          {' '}your style
        </h2>
      </div>

      {/* Phone mockup */}
      <div
        style={{
          opacity: phoneOpacity,
          transform: `translateX(${phoneX}px)`,
          zIndex: 2,
          marginBottom: 50,
        }}
      >
        {/* Phone frame */}
        <div
          style={{
            width: 280,
            height: 500,
            backgroundColor: '#1C1C1E',
            borderRadius: 36,
            padding: 12,
            boxShadow: `0 0 0 2px #333, 0 40px 80px rgba(0,0,0,0.6), 0 0 60px ${menuColor}44`,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Notch */}
          <div
            style={{
              position: 'absolute',
              top: 16,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 80,
              height: 22,
              backgroundColor: '#1C1C1E',
              borderRadius: 12,
              zIndex: 10,
            }}
          />
          {/* Screen */}
          <div
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: '#FFFCF9',
              borderRadius: 28,
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Menu header — color changes */}
            <div
              style={{
                backgroundColor: menuColor,
                padding: '36px 20px 20px',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255,255,255,0.9)',
                  margin: '0 auto 10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 22,
                  fontWeight: 800,
                  color: menuColor,
                }}
              >
                R
              </div>
              <p style={{ color: '#fff', fontWeight: 700, fontSize: 16, margin: 0 }}>
                Restaurant Menu
              </p>
            </div>
            {/* Menu items */}
            <div style={{ padding: '14px 16px', flex: 1 }}>
              {['Grilled Salmon', 'Beef Tacos', 'Garden Salad'].map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '10px 0',
                    borderBottom: i < 2 ? '1px solid #f0f0f0' : 'none',
                  }}
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 10,
                      backgroundColor: menuColor + '22',
                      marginRight: 12,
                      flexShrink: 0,
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#222' }}>{item}</div>
                    <div style={{ fontSize: 11, color: '#888', marginTop: 2 }}>Signature dish</div>
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: menuColor }}>4.500</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Color swatches */}
      <div
        style={{
          display: 'flex',
          gap: 20,
          zIndex: 2,
        }}
      >
        {PALETTE.map((color, i) => (
          <div
            key={i}
            style={{
              transform: `scale(${swatchScales[i]})`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <div
              style={{
                width: i === activeColor ? 60 : 48,
                height: i === activeColor ? 60 : 48,
                borderRadius: '50%',
                backgroundColor: color,
                boxShadow:
                  i === activeColor
                    ? `0 0 0 4px #fff, 0 0 20px ${color}88`
                    : '0 4px 12px rgba(0,0,0,0.3)',
                transition: 'all 0.15s ease',
              }}
            />
            <span
              style={{
                fontSize: 11,
                color: i === activeColor ? '#fff' : 'rgba(255,255,255,0.4)',
                fontWeight: i === activeColor ? 700 : 400,
              }}
            >
              {PALETTE_LABELS[i]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
