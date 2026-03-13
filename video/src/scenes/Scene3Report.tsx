import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';

const NEON = '#DFFF06';

// Simulated report card
const ReportCard: React.FC<{ label: string; value: string; delay: number; frame: number }> = ({
  label,
  value,
  delay,
  frame,
}) => {
  const opacity = interpolate(frame, [delay, delay + 25], [0, 1], { extrapolateRight: 'clamp' });
  const y = interpolate(frame, [delay, delay + 25], [30, 0], { extrapolateRight: 'clamp' });

  return (
    <div
      style={{
        backgroundColor: 'rgba(255,255,255,0.06)',
        border: `1px solid rgba(223,255,6,0.2)`,
        borderRadius: 12,
        padding: '20px 28px',
        opacity,
        transform: `translateY(${y}px)`,
      }}
    >
      <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 2 }}>
        {label}
      </div>
      <div style={{ fontSize: 22, color: '#ffffff', fontWeight: 600 }}>{value}</div>
    </div>
  );
};

export const Scene3Report: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const slideIn = spring({ frame, fps, config: { damping: 14, stiffness: 70 } });
  const titleX = interpolate(slideIn, [0, 1], [-100, 0]);
  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });

  const reportSlide = spring({ frame: frame - 30, fps, config: { damping: 16, stiffness: 60 } });
  const reportX = interpolate(reportSlide, [0, 1], [120, 0]);
  const reportOpacity = interpolate(frame, [30, 55], [0, 1], { extrapolateRight: 'clamp' });

  // Score circle progress
  const score = Math.round(interpolate(frame, [40, 100], [0, 94], { extrapolateRight: 'clamp' }));
  const scoreOpacity = interpolate(frame, [40, 65], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#000000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Inter, sans-serif',
        gap: 100,
        padding: '0 120px',
        boxSizing: 'border-box',
      }}
    >
      {/* Left: text */}
      <div style={{ flex: 1 }}>
        <div
          style={{
            display: 'inline-block',
            backgroundColor: NEON,
            color: '#000',
            fontSize: 14,
            fontWeight: 700,
            letterSpacing: 3,
            textTransform: 'uppercase',
            padding: '8px 20px',
            borderRadius: 4,
            marginBottom: 28,
            opacity: titleOpacity,
            transform: `translateX(${titleX}px)`,
          }}
        >
          Feature 2
        </div>

        <h2
          style={{
            fontSize: 72,
            fontWeight: 800,
            color: '#ffffff',
            margin: '0 0 20px 0',
            lineHeight: 1.05,
            opacity: titleOpacity,
            transform: `translateX(${titleX}px)`,
          }}
        >
          Instant<br />
          <span style={{ color: NEON }}>Digital Report</span>
        </h2>

        <p
          style={{
            fontSize: 24,
            color: 'rgba(255,255,255,0.55)',
            fontWeight: 300,
            margin: '0 0 40px 0',
            opacity: titleOpacity,
          }}
        >
          Get a full professional PDF report the moment inspection ends.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <ReportCard label="Vehicle" value="2021 Toyota Camry" delay={70} frame={frame} />
          <ReportCard label="Inspector" value="Ahmed Al-Rashid" delay={85} frame={frame} />
          <ReportCard label="Date" value="13 Mar 2026" delay={100} frame={frame} />
          <ReportCard label="Status" value="✓ Completed" delay={115} frame={frame} />
        </div>
      </div>

      {/* Right: score circle */}
      <div
        style={{
          flexShrink: 0,
          width: 300,
          height: 300,
          borderRadius: '50%',
          border: `8px solid ${NEON}`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: scoreOpacity,
          transform: `translateX(${reportX}px)`,
          boxShadow: `0 0 60px rgba(223,255,6,0.3)`,
        }}
      >
        <div style={{ fontSize: 96, fontWeight: 900, color: NEON, lineHeight: 1 }}>{score}</div>
        <div style={{ fontSize: 20, color: 'rgba(255,255,255,0.5)', marginTop: 4 }}>Health Score</div>
      </div>
    </div>
  );
};
