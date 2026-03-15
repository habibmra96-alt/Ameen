import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';

const ORANGE = '#E8461E';
const ORANGE_LIGHT = '#FF6B3D';

const BAR_DATA = [
  { label: 'Mon', value: 0.6, color: ORANGE_LIGHT },
  { label: 'Tue', value: 0.8, color: ORANGE },
  { label: 'Wed', value: 0.5, color: ORANGE_LIGHT },
  { label: 'Thu', value: 0.95, color: ORANGE },
  { label: 'Fri', value: 0.75, color: ORANGE_LIGHT },
  { label: 'Sat', value: 1.0, color: ORANGE },
  { label: 'Sun', value: 0.7, color: ORANGE_LIGHT },
];

function countUp(frame: number, start: number, end: number, startFrame: number, endFrame: number) {
  const progress = interpolate(frame, [startFrame, endFrame], [0, 1], { extrapolateRight: 'clamp' });
  return Math.round(start + (end - start) * progress);
}

export const Scene6Analytics: React.FC = () => {
  const frame = useCurrentFrame();

  // Heading
  const headingOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });

  // Bar heights animate in
  const barProgress = interpolate(frame, [20, 100], [0, 1], { extrapolateRight: 'clamp' });

  // Donut fill
  const donutAngle = interpolate(frame, [50, 130], [0, 252], { extrapolateRight: 'clamp' }); // 70% of 360

  // Stats count up
  const views = countUp(frame, 0, 12847, 30, 130);
  const clicks = countUp(frame, 0, 3291, 40, 130);
  const popular = countUp(frame, 0, 68, 50, 130);

  // Exit
  const sceneOpacity = interpolate(frame, [160, 180], [1, 0], { extrapolateRight: 'clamp' });

  const BAR_MAX_HEIGHT = 160;

  // Donut arc
  const r = 60;
  const circumference = 2 * Math.PI * r;
  const dashOffset = circumference - (circumference * donutAngle) / 360;

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
          background: 'radial-gradient(ellipse at 50% 30%, rgba(232,70,30,0.12) 0%, transparent 65%)',
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
          Analytics
        </p>
        <h2 style={{ fontSize: 56, fontWeight: 800, color: '#ffffff', margin: 0, lineHeight: 1.2 }}>
          Know what your{' '}
          <span style={{ background: `linear-gradient(135deg, ${ORANGE}, ${ORANGE_LIGHT})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            customers love
          </span>
        </h2>
      </div>

      {/* Stats row */}
      <div
        style={{
          display: 'flex',
          gap: 24,
          marginBottom: 44,
          zIndex: 2,
        }}
      >
        {[
          { label: 'Menu Views', value: views.toLocaleString(), icon: '👁' },
          { label: 'Item Clicks', value: clicks.toLocaleString(), icon: '🖱' },
          { label: 'Top Item %', value: `${popular}%`, icon: '🔥' },
        ].map((stat, i) => (
          <div
            key={i}
            style={{
              backgroundColor: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 16,
              padding: '16px 24px',
              textAlign: 'center',
              minWidth: 140,
            }}
          >
            <div style={{ fontSize: 24, marginBottom: 6 }}>{stat.icon}</div>
            <div style={{ fontSize: 28, fontWeight: 800, color: ORANGE_LIGHT, lineHeight: 1 }}>
              {stat.value}
            </div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 6, fontWeight: 500 }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Bar chart + Donut side by side */}
      <div style={{ display: 'flex', gap: 40, alignItems: 'flex-end', zIndex: 2 }}>
        {/* Bar chart */}
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              gap: 12,
              height: BAR_MAX_HEIGHT + 40,
              paddingBottom: 32,
              position: 'relative',
            }}
          >
            {/* Gridlines */}
            {[0.25, 0.5, 0.75, 1].map((pct) => (
              <div
                key={pct}
                style={{
                  position: 'absolute',
                  bottom: 32 + BAR_MAX_HEIGHT * pct,
                  left: 0,
                  right: 0,
                  height: 1,
                  backgroundColor: 'rgba(255,255,255,0.06)',
                }}
              />
            ))}
            {BAR_DATA.map((bar, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div
                  style={{
                    width: 40,
                    height: BAR_MAX_HEIGHT * bar.value * barProgress,
                    backgroundColor: bar.color,
                    borderRadius: '6px 6px 0 0',
                    transition: 'height 0.1s',
                    boxShadow: `0 0 12px ${bar.color}66`,
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: 8,
                    fontSize: 11,
                    color: 'rgba(255,255,255,0.5)',
                    fontWeight: 600,
                  }}
                >
                  {bar.label}
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', fontSize: 13, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>
            Weekly Views
          </div>
        </div>

        {/* Donut chart */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ position: 'relative', width: 150, height: 150 }}>
            <svg width={150} height={150} viewBox="0 0 150 150">
              {/* Background circle */}
              <circle
                cx={75}
                cy={75}
                r={r}
                fill="none"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth={18}
              />
              {/* Progress arc */}
              <circle
                cx={75}
                cy={75}
                r={r}
                fill="none"
                stroke="url(#donutGrad)"
                strokeWidth={18}
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={dashOffset}
                transform="rotate(-90 75 75)"
              />
              <defs>
                <linearGradient id="donutGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor={ORANGE} />
                  <stop offset="100%" stopColor={ORANGE_LIGHT} />
                </linearGradient>
              </defs>
            </svg>
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span style={{ fontSize: 28, fontWeight: 800, color: '#fff' }}>
                {Math.round((donutAngle / 360) * 100)}%
              </span>
              <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>
                Return
              </span>
            </div>
          </div>
          <div style={{ textAlign: 'center', fontSize: 13, color: 'rgba(255,255,255,0.4)', marginTop: 8 }}>
            Customer Return Rate
          </div>
        </div>
      </div>
    </div>
  );
};
