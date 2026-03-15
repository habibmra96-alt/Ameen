import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { OmHungryLogo } from './OmHungryLogo';

const ORANGE = '#E8461E';
const ORANGE_LIGHT = '#FF6B3D';
const BG = '#FFF2E8';

const BAR_DATA = [
  { label: 'Mon', value: 0.60 },
  { label: 'Tue', value: 0.80 },
  { label: 'Wed', value: 0.55 },
  { label: 'Thu', value: 0.95 },
  { label: 'Fri', value: 0.75 },
  { label: 'Sat', value: 1.00 },
  { label: 'Sun', value: 0.70 },
];

const TOP_ITEMS = [
  { name: 'Mixed Grill', pct: 0.68, emoji: '🥩' },
  { name: 'Grilled Fish', pct: 0.52, emoji: '🐟' },
  { name: 'Hummus', pct: 0.44, emoji: '🫘' },
];

function countUp(frame: number, end: number, startF: number, endF: number) {
  const p = interpolate(frame, [startF, endF], [0, 1], { extrapolateRight: 'clamp' });
  return Math.round(end * p);
}

export const Scene6Analytics: React.FC = () => {
  const frame = useCurrentFrame();

  // 60fps timings
  const headingOpacity = interpolate(frame, [0, 40], [0, 1], { extrapolateRight: 'clamp' });
  const headingY = interpolate(frame, [0, 40], [50, 0], { extrapolateRight: 'clamp' });

  const barProgress = interpolate(frame, [40, 200], [0, 1], { extrapolateRight: 'clamp' });

  const donutAngle = interpolate(frame, [100, 260], [0, 252], { extrapolateRight: 'clamp' });

  const views = countUp(frame, 12847, 60, 260);
  const clicks = countUp(frame, 3291, 80, 260);
  const rating = countUp(frame, 98, 100, 260);

  const topItemsOpacity = interpolate(frame, [200, 280], [0, 1], { extrapolateRight: 'clamp' });
  const topItemsY = interpolate(frame, [200, 280], [40, 0], { extrapolateRight: 'clamp' });

  const logoOpacity = interpolate(frame, [120, 160], [0, 1], { extrapolateRight: 'clamp' });

  const sceneOpacity = interpolate(frame, [320, 360], [1, 0], { extrapolateRight: 'clamp' });

  const BAR_MAX_H = 180;
  const r = 70;
  const circ = 2 * Math.PI * r;
  const dash = circ - (circ * donutAngle) / 360;

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
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 50% 35%, ${ORANGE}08 0%, transparent 65%)` }} />

      {/* Heading */}
      <div style={{ opacity: headingOpacity, transform: `translateY(${headingY}px)`, textAlign: 'center', padding: '0 70px', zIndex: 2 }}>
        <div style={{ display: 'inline-block', background: `linear-gradient(135deg, ${ORANGE}, ${ORANGE_LIGHT})`, borderRadius: 50, padding: '12px 32px', marginBottom: 24 }}>
          <span style={{ fontSize: 28, fontWeight: 700, color: '#fff', textTransform: 'uppercase', letterSpacing: 2 }}>Analytics</span>
        </div>
        <h2 style={{ fontSize: 72, fontWeight: 900, color: '#1A1A1A', margin: 0, lineHeight: 1.1, letterSpacing: '-1.5px' }}>
          Know what your{' '}
          <span style={{ background: `linear-gradient(135deg, ${ORANGE}, ${ORANGE_LIGHT})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            customers love
          </span>
        </h2>
      </div>

      {/* Stat cards */}
      <div style={{ display: 'flex', gap: 20, zIndex: 2 }}>
        {[
          { label: 'Menu Views', value: views.toLocaleString(), icon: '👁️', color: ORANGE },
          { label: 'Item Clicks', value: clicks.toLocaleString(), icon: '🖱️', color: '#2563EB' },
          { label: 'Satisfaction', value: `${rating}%`, icon: '⭐', color: '#16A34A' },
        ].map((s, i) => (
          <div key={i} style={{
            backgroundColor: '#fff',
            borderRadius: 20,
            padding: '24px 28px',
            textAlign: 'center',
            minWidth: 170,
            boxShadow: `0 4px 20px rgba(232,70,30,0.10)`,
            border: `1.5px solid ${s.color}20`,
          }}>
            <div style={{ fontSize: 34, marginBottom: 8 }}>{s.icon}</div>
            <div style={{ fontSize: 36, fontWeight: 900, color: s.color, lineHeight: 1 }}>{s.value}</div>
            <div style={{ fontSize: 15, color: '#888', marginTop: 8, fontWeight: 600 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Bar chart + Donut */}
      <div style={{ display: 'flex', gap: 40, alignItems: 'center', zIndex: 2 }}>
        {/* Bar chart */}
        <div style={{ backgroundColor: '#fff', borderRadius: 20, padding: '28px 24px 20px', boxShadow: '0 4px 20px rgba(232,70,30,0.08)' }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: '#888', marginBottom: 16, textAlign: 'center', textTransform: 'uppercase', letterSpacing: 1 }}>
            Weekly Views
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 14, height: BAR_MAX_H + 24, paddingBottom: 28, position: 'relative' }}>
            {[0.25, 0.5, 0.75, 1].map((pct) => (
              <div key={pct} style={{ position: 'absolute', bottom: 28 + BAR_MAX_H * pct, left: 0, right: 0, height: 1, backgroundColor: '#F0EAE4' }} />
            ))}
            {BAR_DATA.map((bar, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
                <div style={{
                  width: 44,
                  height: BAR_MAX_H * bar.value * barProgress,
                  background: `linear-gradient(180deg, ${ORANGE_LIGHT}, ${ORANGE})`,
                  borderRadius: '8px 8px 0 0',
                  boxShadow: `0 0 16px ${ORANGE}44`,
                }} />
                <div style={{ position: 'absolute', bottom: -22, fontSize: 12, color: '#AAA', fontWeight: 700 }}>{bar.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Donut */}
        <div style={{ backgroundColor: '#fff', borderRadius: 20, padding: '28px', boxShadow: '0 4px 20px rgba(232,70,30,0.08)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: 1 }}>
            Return Rate
          </div>
          <div style={{ position: 'relative', width: 170, height: 170 }}>
            <svg width={170} height={170} viewBox="0 0 170 170">
              <circle cx={85} cy={85} r={r} fill="none" stroke="#F0EAE4" strokeWidth={20} />
              <circle cx={85} cy={85} r={r} fill="none" stroke="url(#dg)" strokeWidth={20} strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={dash} transform="rotate(-90 85 85)" />
              <defs>
                <linearGradient id="dg" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor={ORANGE} />
                  <stop offset="100%" stopColor={ORANGE_LIGHT} />
                </linearGradient>
              </defs>
            </svg>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 34, fontWeight: 900, color: '#1A1A1A' }}>{Math.round((donutAngle / 360) * 100)}%</span>
              <span style={{ fontSize: 12, color: '#AAA', marginTop: 2 }}>customers</span>
            </div>
          </div>
        </div>
      </div>

      {/* Top items */}
      <div style={{ opacity: topItemsOpacity, transform: `translateY(${topItemsY}px)`, width: '86%', zIndex: 2 }}>
        <div style={{ fontSize: 22, fontWeight: 800, color: '#888', marginBottom: 14, textTransform: 'uppercase', letterSpacing: 1, textAlign: 'center' }}>
          🔥 Most Popular
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {TOP_ITEMS.map((item, i) => (
            <div key={i} style={{ backgroundColor: '#fff', borderRadius: 14, padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 14, boxShadow: '0 2px 10px rgba(232,70,30,0.07)' }}>
              <span style={{ fontSize: 28 }}>{item.emoji}</span>
              <span style={{ flex: 1, fontSize: 18, fontWeight: 700, color: '#222' }}>{item.name}</span>
              <div style={{ width: 120, height: 10, backgroundColor: '#F0EAE4', borderRadius: 5, overflow: 'hidden' }}>
                <div style={{ width: `${item.pct * 100 * barProgress}%`, height: '100%', background: `linear-gradient(90deg, ${ORANGE}, ${ORANGE_LIGHT})`, borderRadius: 5 }} />
              </div>
              <span style={{ fontSize: 16, fontWeight: 800, color: ORANGE, minWidth: 46, textAlign: 'right' }}>{Math.round(item.pct * 100 * barProgress)}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom logo */}
      <div style={{ opacity: logoOpacity, zIndex: 2 }}>
        <OmHungryLogo size={100} showText={true} />
      </div>
    </div>
  );
};
