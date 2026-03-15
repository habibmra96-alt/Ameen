import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { OmHungryLogo } from './OmHungryLogo';

const ORANGE = '#E8461E';
const ORANGE_LIGHT = '#FF6B3D';
const BG = '#FFF2E8';

const MENU_ITEMS = [
  { name: 'Grilled Salmon', price: 6.5, emoji: '🐟' },
  { name: 'Beef Burger', price: 4.8, emoji: '🍔' },
  { name: 'Caesar Salad', price: 2.8, emoji: '🥗' },
  { name: 'Pasta Carbonara', price: 5.2, emoji: '🍝' },
  { name: 'Chocolate Cake', price: 2.2, emoji: '🍰' },
];

export const Scene7Management: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 60fps timings
  const headingOpacity = interpolate(frame, [0, 40], [0, 1], { extrapolateRight: 'clamp' });
  const headingY = interpolate(frame, [0, 40], [50, 0], { extrapolateRight: 'clamp' });

  const panelY = interpolate(
    spring({ frame: frame - 30, fps, config: { damping: 18, stiffness: 80 } }),
    [0, 1],
    [280, 0]
  );
  const panelOpacity = interpolate(frame, [30, 80], [0, 1], { extrapolateRight: 'clamp' });

  // Drag: frames 100–180
  const dragY = interpolate(frame, [100, 180], [0, 80], { extrapolateRight: 'clamp' });
  const dragScale = interpolate(frame, [100, 120, 180, 200], [1, 1.03, 1.03, 1], { extrapolateRight: 'clamp' });
  const isDragging = frame >= 100 && frame < 200;

  // Price tick: frames 200–260
  const priceProgress = interpolate(frame, [200, 260], [0, 1], { extrapolateRight: 'clamp' });
  const displayPrice = 4.8 + priceProgress * 0.7;

  // New item: frames 270–310
  const newItemScale = spring({ frame: frame - 270, fps, config: { damping: 12, stiffness: 150 } });
  const newItemOpacity = interpolate(frame, [270, 300], [0, 1], { extrapolateRight: 'clamp' });

  // Checkmark: frames 310–340
  const checkOpacity = interpolate(frame, [310, 330], [0, 1], { extrapolateRight: 'clamp' });
  const checkScale = spring({ frame: frame - 310, fps, config: { damping: 12, stiffness: 200 } });

  // Info row
  const infoOpacity = interpolate(frame, [180, 240], [0, 1], { extrapolateRight: 'clamp' });

  const logoOpacity = interpolate(frame, [120, 160], [0, 1], { extrapolateRight: 'clamp' });
  const sceneOpacity = interpolate(frame, [320, 360], [1, 0], { extrapolateRight: 'clamp' });

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
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 50% 40%, ${ORANGE}08 0%, transparent 65%)` }} />

      {/* Heading */}
      <div style={{ opacity: headingOpacity, transform: `translateY(${headingY}px)`, textAlign: 'center', padding: '0 70px', zIndex: 2 }}>
        <div style={{ display: 'inline-block', background: `linear-gradient(135deg, ${ORANGE}, ${ORANGE_LIGHT})`, borderRadius: 50, padding: '12px 32px', marginBottom: 24 }}>
          <span style={{ fontSize: 28, fontWeight: 700, color: '#fff', textTransform: 'uppercase', letterSpacing: 2 }}>Easy Management</span>
        </div>
        <h2 style={{ fontSize: 72, fontWeight: 900, color: '#1A1A1A', margin: 0, lineHeight: 1.1, letterSpacing: '-1.5px' }}>
          Update your menu{' '}
          <span style={{ background: `linear-gradient(135deg, ${ORANGE}, ${ORANGE_LIGHT})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            in seconds
          </span>
        </h2>
      </div>

      {/* Admin panel */}
      <div
        style={{
          opacity: panelOpacity,
          transform: `translateY(${panelY}px)`,
          width: 560,
          backgroundColor: '#FFFFFF',
          borderRadius: 24,
          overflow: 'hidden',
          boxShadow: `0 30px 70px rgba(232,70,30,0.15), 0 4px 16px rgba(0,0,0,0.06)`,
          zIndex: 2,
        }}
      >
        {/* Header */}
        <div style={{ background: `linear-gradient(135deg, ${ORANGE}, ${ORANGE_LIGHT})`, padding: '22px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ color: '#fff', fontWeight: 800, fontSize: 22 }}>⚙️  Menu Manager</span>
          <div style={{ display: 'flex', gap: 8 }}>
            {['#FF5F57', '#FEBC2E', '#28C840'].map((c) => (
              <div key={c} style={{ width: 14, height: 14, borderRadius: '50%', backgroundColor: c }} />
            ))}
          </div>
        </div>

        {/* Items */}
        <div style={{ padding: '10px 0' }}>
          {MENU_ITEMS.map((item, i) => {
            const itemYt = i === 0 && isDragging ? dragY : 0;
            const itemSc = i === 0 && isDragging ? dragScale : 1;
            const itemBg = i === 0 && isDragging ? '#FFF5F0' : 'transparent';
            const priceDisplay = i === 1 ? displayPrice.toFixed(3) : item.price.toFixed(3);
            const priceColor = i === 1 && frame >= 200 && frame < 280 ? ORANGE : '#666';

            return (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '16px 28px',
                  backgroundColor: itemBg,
                  transform: `translateY(${itemYt}px) scale(${itemSc})`,
                  boxShadow: i === 0 && isDragging ? `0 8px 30px rgba(232,70,30,0.2)` : 'none',
                  borderRadius: 10,
                  position: 'relative',
                  zIndex: i === 0 && isDragging ? 10 : 1,
                  borderBottom: i < MENU_ITEMS.length - 1 ? '1px solid #F5EDE8' : 'none',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginRight: 18, cursor: 'grab' }}>
                  {[0, 1, 2].map((j) => (
                    <div key={j} style={{ width: 22, height: 2.5, backgroundColor: i === 0 && isDragging ? ORANGE_LIGHT : '#DDD', borderRadius: 1.5 }} />
                  ))}
                </div>
                <div style={{ fontSize: 26, marginRight: 16, width: 38 }}>{item.emoji}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 18, fontWeight: 700, color: '#1A1A1A' }}>{item.name}</div>
                  <div style={{ fontSize: 12, color: '#AAA', marginTop: 2 }}>Main course</div>
                </div>
                <div style={{
                  fontSize: 18, fontWeight: 800, color: priceColor,
                  backgroundColor: i === 1 && frame >= 200 && frame < 280 ? `${ORANGE}12` : 'transparent',
                  padding: '3px 10px', borderRadius: 10,
                  border: i === 1 && frame >= 200 && frame < 280 ? `1.5px solid ${ORANGE}30` : '1.5px solid transparent',
                }}>
                  {priceDisplay} OMR
                </div>
              </div>
            );
          })}

          {/* New item */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            padding: '16px 28px',
            opacity: newItemOpacity,
            transform: `scale(${newItemScale})`,
            backgroundColor: `${ORANGE}10`,
            borderLeft: `4px solid ${ORANGE}`,
          }}>
            <div style={{ fontSize: 26, marginRight: 16, width: 38 }}>✨</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: ORANGE }}>New: Truffle Fries</div>
              <div style={{ fontSize: 12, color: '#AAA', marginTop: 2 }}>Just added</div>
            </div>
            <div style={{ fontSize: 18, fontWeight: 800, color: ORANGE }}>3.200 OMR</div>
          </div>
        </div>
      </div>

      {/* Quick info */}
      <div style={{ opacity: infoOpacity, display: 'flex', gap: 20, zIndex: 2 }}>
        {['No coding needed', 'Changes go live instantly', 'Unlimited updates'].map((t, i) => (
          <div key={i} style={{ backgroundColor: '#fff', borderRadius: 14, padding: '14px 20px', boxShadow: '0 4px 16px rgba(232,70,30,0.08)', border: `1.5px solid ${ORANGE}20` }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: '#444' }}>✅ {t}</span>
          </div>
        ))}
      </div>

      {/* Checkmark */}
      <div style={{ opacity: checkOpacity, transform: `scale(${checkScale})`, display: 'flex', alignItems: 'center', gap: 14, backgroundColor: 'rgba(34,197,94,0.12)', border: '2px solid rgba(34,197,94,0.3)', padding: '18px 36px', borderRadius: 40, zIndex: 2 }}>
        <span style={{ fontSize: 32 }}>✅</span>
        <span style={{ fontSize: 24, fontWeight: 800, color: '#16A34A' }}>Menu updated successfully!</span>
      </div>

      {/* Bottom logo */}
      <div style={{ opacity: logoOpacity, zIndex: 2 }}>
        <OmHungryLogo size={100} showText={true} />
      </div>
    </div>
  );
};
