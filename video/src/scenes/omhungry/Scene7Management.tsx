import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';

const ORANGE = '#E8461E';
const ORANGE_LIGHT = '#FF6B3D';

const MENU_ITEMS = [
  { name: 'Grilled Salmon', price: 6.5, emoji: '🐟' },
  { name: 'Beef Burger', price: 4.8, emoji: '🍔' },
  { name: 'Caesar Salad', price: 2.8, emoji: '🥗' },
  { name: 'Pasta Carbonara', price: 5.2, emoji: '🍝' },
];

export const Scene7Management: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Heading
  const headingOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });

  // Admin panel slides up
  const panelY = interpolate(
    spring({ frame: frame - 15, fps, config: { damping: 18, stiffness: 80 } }),
    [0, 1],
    [200, 0]
  );
  const panelOpacity = interpolate(frame, [15, 40], [0, 1], { extrapolateRight: 'clamp' });

  // Drag animation — item 1 moves down past item 2 (frames 50–90)
  const dragY = interpolate(frame, [50, 90], [0, 72], { extrapolateRight: 'clamp' });
  const dragScale = interpolate(frame, [50, 60, 90, 100], [1, 1.03, 1.03, 1], { extrapolateRight: 'clamp' });
  const isDragging = frame >= 50 && frame < 100;

  // Price tick up for item 2 (frames 100–130)
  const priceProgress = interpolate(frame, [100, 130], [0, 1], { extrapolateRight: 'clamp' });
  const displayPrice = 4.8 + priceProgress * 0.7; // 4.80 → 5.50

  // New item appears (frames 135–155)
  const newItemScale = spring({ frame: frame - 135, fps, config: { damping: 12, stiffness: 150 } });
  const newItemOpacity = interpolate(frame, [135, 150], [0, 1], { extrapolateRight: 'clamp' });

  // Checkmark (frames 155–170)
  const checkOpacity = interpolate(frame, [155, 165], [0, 1], { extrapolateRight: 'clamp' });
  const checkScale = spring({ frame: frame - 155, fps, config: { damping: 12, stiffness: 200 } });

  // Exit
  const sceneOpacity = interpolate(frame, [160, 180], [1, 0], { extrapolateRight: 'clamp' });

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
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 50% 35%, rgba(232,70,30,0.1) 0%, transparent 65%)',
        }}
      />

      {/* Heading */}
      <div
        style={{
          opacity: headingOpacity,
          textAlign: 'center',
          marginBottom: 50,
          padding: '0 60px',
          zIndex: 2,
        }}
      >
        <p style={{ fontSize: 28, fontWeight: 600, color: ORANGE_LIGHT, margin: '0 0 12px', textTransform: 'uppercase', letterSpacing: 3 }}>
          Easy Management
        </p>
        <h2 style={{ fontSize: 60, fontWeight: 800, color: '#ffffff', margin: 0, lineHeight: 1.2 }}>
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
          width: 500,
          backgroundColor: '#1A1A1A',
          borderRadius: 20,
          overflow: 'hidden',
          boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
          zIndex: 2,
          position: 'relative',
        }}
      >
        {/* Panel header */}
        <div
          style={{
            background: `linear-gradient(135deg, ${ORANGE}, ${ORANGE_LIGHT})`,
            padding: '18px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span style={{ color: '#fff', fontWeight: 700, fontSize: 18 }}>Menu Manager</span>
          <div style={{ display: 'flex', gap: 8 }}>
            {['#FF5F57', '#FEBC2E', '#28C840'].map((c) => (
              <div key={c} style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: c }} />
            ))}
          </div>
        </div>

        {/* Items list */}
        <div style={{ padding: '12px 0' }}>
          {MENU_ITEMS.map((item, i) => {
            // Drag transform for item 0
            const itemY = i === 0 && isDragging ? dragY : 0;
            const itemScale = i === 0 && isDragging ? dragScale : 1;
            const itemShadow = i === 0 && isDragging ? '0 8px 24px rgba(0,0,0,0.5)' : 'none';
            const itemBg = i === 0 && isDragging ? '#2A2A2A' : 'transparent';

            // Animated price for item 1
            const priceDisplay = i === 1 ? displayPrice.toFixed(3) : item.price.toFixed(3);
            const priceColor = i === 1 && frame >= 100 && frame < 145 ? ORANGE_LIGHT : 'rgba(255,255,255,0.8)';

            return (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '14px 24px',
                  backgroundColor: itemBg,
                  transform: `translateY(${itemY}px) scale(${itemScale})`,
                  boxShadow: itemShadow,
                  borderRadius: 8,
                  zIndex: i === 0 && isDragging ? 10 : 1,
                  position: 'relative',
                }}
              >
                {/* Drag handle */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 4,
                    marginRight: 16,
                    cursor: 'grab',
                  }}
                >
                  {[0, 1, 2].map((j) => (
                    <div
                      key={j}
                      style={{
                        width: 20,
                        height: 2,
                        backgroundColor: i === 0 && isDragging ? ORANGE_LIGHT : 'rgba(255,255,255,0.25)',
                        borderRadius: 1,
                      }}
                    />
                  ))}
                </div>
                {/* Emoji */}
                <div style={{ fontSize: 24, marginRight: 16, width: 36 }}>{item.emoji}</div>
                {/* Name */}
                <div style={{ flex: 1, fontSize: 16, fontWeight: 600, color: '#fff' }}>{item.name}</div>
                {/* Price */}
                <div
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    color: priceColor,
                    backgroundColor: i === 1 && frame >= 100 && frame < 145 ? `${ORANGE}22` : 'transparent',
                    padding: '2px 8px',
                    borderRadius: 8,
                    border: i === 1 && frame >= 100 && frame < 145 ? `1px solid ${ORANGE}44` : '1px solid transparent',
                  }}
                >
                  {priceDisplay}
                </div>
              </div>
            );
          })}

          {/* New item appearing */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '14px 24px',
              opacity: newItemOpacity,
              transform: `scale(${newItemScale})`,
              backgroundColor: `${ORANGE}15`,
              borderLeft: `3px solid ${ORANGE}`,
            }}
          >
            <div style={{ fontSize: 24, marginRight: 16, width: 36 }}>✨</div>
            <div style={{ flex: 1, fontSize: 16, fontWeight: 600, color: ORANGE_LIGHT }}>
              New: Truffle Fries
            </div>
            <div style={{ fontSize: 16, fontWeight: 700, color: ORANGE }}>3.200</div>
          </div>
        </div>
      </div>

      {/* Checkmark confirmation */}
      <div
        style={{
          opacity: checkOpacity,
          transform: `scale(${checkScale})`,
          marginTop: 32,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          backgroundColor: 'rgba(34,197,94,0.15)',
          border: '1px solid rgba(34,197,94,0.4)',
          padding: '12px 28px',
          borderRadius: 30,
          zIndex: 2,
        }}
      >
        <span style={{ fontSize: 24 }}>✅</span>
        <span style={{ fontSize: 18, fontWeight: 700, color: '#22C55E' }}>Menu updated!</span>
      </div>
    </div>
  );
};
