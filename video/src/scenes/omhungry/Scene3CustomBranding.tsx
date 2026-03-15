import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { OmHungryLogo } from './OmHungryLogo';

const ORANGE = '#E8461E';
const ORANGE_LIGHT = '#FF6B3D';
const BG = '#FFF2E8';

const PALETTE = ['#E8461E', '#2563EB', '#16A34A', '#9333EA', '#F59E0B', '#EC4899'];
const PALETTE_LABELS = ['Brand', 'Ocean', 'Fresh', 'Royal', 'Gold', 'Rose'];

export const Scene3CustomBranding: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 60fps timings
  const headingOpacity = interpolate(frame, [0, 40], [0, 1], { extrapolateRight: 'clamp' });
  const headingY = interpolate(frame, [0, 40], [50, 0], { extrapolateRight: 'clamp' });

  const phoneX = interpolate(
    spring({ frame: frame - 30, fps, config: { damping: 18, stiffness: 80 } }),
    [0, 1],
    [500, 0]
  );
  const phoneOpacity = interpolate(frame, [30, 80], [0, 1], { extrapolateRight: 'clamp' });

  const swatchScales = PALETTE.map((_, i) =>
    spring({ frame: frame - (100 + i * 30), fps, config: { damping: 12, stiffness: 150 } })
  );

  // Active color cycles every 80 frames
  const activeColor = Math.floor(frame / 80) % PALETTE.length;
  const menuColor = PALETTE[activeColor];

  const descOpacity = interpolate(frame, [200, 260], [0, 1], { extrapolateRight: 'clamp' });
  const logoOpacity = interpolate(frame, [120, 160], [0, 1], { extrapolateRight: 'clamp' });

  const sceneOpacity = interpolate(frame, [440, 480], [1, 0], { extrapolateRight: 'clamp' });

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
      {/* Decorative background blob */}
      <div
        style={{
          position: 'absolute',
          top: '35%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 700,
          height: 700,
          borderRadius: '50%',
          backgroundColor: `${menuColor}14`,
          filter: 'blur(60px)',
          transition: 'background-color 0.3s',
        }}
      />

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
        <div style={{
          display: 'inline-block',
          background: `linear-gradient(135deg, ${ORANGE}, ${ORANGE_LIGHT})`,
          borderRadius: 50,
          padding: '12px 32px',
          marginBottom: 24,
        }}>
          <span style={{ fontSize: 28, fontWeight: 700, color: '#fff', textTransform: 'uppercase', letterSpacing: 2 }}>
            Custom Branding
          </span>
        </div>
        <h2
          style={{
            fontSize: 72,
            fontWeight: 900,
            color: '#1A1A1A',
            margin: 0,
            lineHeight: 1.1,
            letterSpacing: '-1.5px',
          }}
        >
          Your brand,{' '}
          <span style={{ background: `linear-gradient(135deg, ${ORANGE}, ${ORANGE_LIGHT})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
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
        }}
      >
        <div
          style={{
            width: 340,
            height: 620,
            backgroundColor: '#1C1C1E',
            borderRadius: 46,
            padding: 14,
            boxShadow: `0 0 0 2.5px #444, 0 50px 100px rgba(0,0,0,0.25), 0 0 80px ${menuColor}40`,
          }}
        >
          <div style={{ width: '100%', height: '100%', backgroundColor: '#FFFCF9', borderRadius: 36, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            {/* Dynamic header */}
            <div style={{ backgroundColor: menuColor, padding: '44px 24px 22px', textAlign: 'center' }}>
              <div style={{ width: 54, height: 54, borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.92)', margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, fontWeight: 900, color: menuColor }}>
                R
              </div>
              <p style={{ color: '#fff', fontWeight: 800, fontSize: 20, margin: 0 }}>Our Menu</p>
              <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 13, margin: '4px 0 0' }}>Tap to explore</p>
            </div>
            {/* Menu items */}
            <div style={{ padding: '16px 20px', flex: 1 }}>
              {['Grilled Salmon', 'Beef Tacos', 'Garden Salad', 'Tiramisu'].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', padding: '12px 0', borderBottom: i < 3 ? '1px solid #f0ede8' : 'none' }}>
                  <div style={{ width: 46, height: 46, borderRadius: 12, backgroundColor: menuColor + '22', marginRight: 14, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>
                    {['🐟', '🌮', '🥗', '🍰'][i]}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 15, fontWeight: 700, color: '#222' }}>{item}</div>
                    <div style={{ fontSize: 11, color: '#aaa', marginTop: 1 }}>Signature dish</div>
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 800, color: menuColor }}>4.500</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Color swatches */}
      <div style={{ display: 'flex', gap: 22, zIndex: 2 }}>
        {PALETTE.map((color, i) => (
          <div
            key={i}
            style={{
              transform: `scale(${swatchScales[i]})`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 10,
            }}
          >
            <div
              style={{
                width: i === activeColor ? 72 : 56,
                height: i === activeColor ? 72 : 56,
                borderRadius: '50%',
                backgroundColor: color,
                boxShadow: i === activeColor ? `0 0 0 5px #fff, 0 0 0 7px ${color}, 0 8px 24px ${color}66` : '0 4px 16px rgba(0,0,0,0.15)',
                transition: 'all 0.1s ease',
              }}
            />
            <span style={{ fontSize: 14, color: i === activeColor ? '#1A1A1A' : '#AAA', fontWeight: i === activeColor ? 800 : 500 }}>
              {PALETTE_LABELS[i]}
            </span>
          </div>
        ))}
      </div>

      {/* Description */}
      <div style={{ opacity: descOpacity, textAlign: 'center', padding: '0 80px', zIndex: 2 }}>
        <p style={{ fontSize: 34, color: '#555', margin: 0, fontWeight: 500, lineHeight: 1.5 }}>
          Match your restaurant's identity perfectly — change colors, fonts, and logo in minutes.
        </p>
      </div>

      {/* Bottom logo */}
      <div style={{ opacity: logoOpacity, zIndex: 2 }}>
        <OmHungryLogo size={100} showText={true} />
      </div>
    </div>
  );
};
