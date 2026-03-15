import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';

const ORANGE = '#E8461E';
const ORANGE_LIGHT = '#FF6B3D';

export const Scene5Bilingual: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Heading
  const headingOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });

  // Card flip effect — rotateY from 0 to 180 over cycle
  const flipProgress = interpolate(frame, [40, 100], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const flipBack = interpolate(frame, [110, 160], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Alternate showing EN / AR card
  const showArabic = frame >= 70 && frame < 145;
  const cardRotate = showArabic
    ? interpolate(frame, [40, 70], [0, 180], { extrapolateRight: 'clamp' })
    : interpolate(frame, [110, 140], [180, 360], { extrapolateRight: 'clamp' });

  // Cards slide in from sides
  const enCardX = spring({ frame: frame - 20, fps, config: { damping: 16, stiffness: 80 } });
  const arCardX = spring({ frame: frame - 30, fps, config: { damping: 16, stiffness: 80 } });
  const enTranslate = interpolate(enCardX, [0, 1], [-300, 0]);
  const arTranslate = interpolate(arCardX, [0, 1], [300, 0]);

  // Flag indicators
  const flagOpacity = interpolate(frame, [40, 60], [0, 1], { extrapolateRight: 'clamp' });

  // Exit
  const sceneOpacity = interpolate(frame, [160, 180], [1, 0], { extrapolateRight: 'clamp' });

  const MenuCard: React.FC<{
    isArabic: boolean;
    translateX: number;
  }> = ({ isArabic, translateX }) => (
    <div
      style={{
        width: 380,
        backgroundColor: '#FFFCF9',
        borderRadius: 20,
        overflow: 'hidden',
        boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
        transform: `translateX(${translateX}px)`,
        direction: isArabic ? 'rtl' : 'ltr',
      }}
    >
      {/* Header */}
      <div
        style={{
          background: `linear-gradient(135deg, ${ORANGE}, ${ORANGE_LIGHT})`,
          padding: '24px 24px 20px',
          textAlign: isArabic ? 'right' : 'left',
        }}
      >
        <div
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: 'rgba(255,255,255,0.8)',
            textTransform: 'uppercase',
            letterSpacing: 2,
            marginBottom: 6,
          }}
        >
          {isArabic ? 'قائمة الطعام' : 'Our Menu'}
        </div>
        <div style={{ fontSize: 22, fontWeight: 800, color: '#fff' }}>
          {isArabic ? 'مطعم النخيل' : 'Al Nakheel Restaurant'}
        </div>
      </div>
      {/* Items */}
      <div style={{ padding: '16px 24px' }}>
        {(isArabic
          ? [
              { name: 'مشويات مشكلة', desc: 'لحم بقري وضأن', price: '٧٫٥٠٠' },
              { name: 'سمك مشوي', desc: 'مع صلصة الليمون', price: '٦٫٠٠٠' },
              { name: 'حمص بالطحينة', desc: 'مقبلات تقليدية', price: '١٫٥٠٠' },
            ]
          : [
              { name: 'Mixed Grill', desc: 'Beef & Lamb', price: '7.500' },
              { name: 'Grilled Fish', desc: 'With lemon sauce', price: '6.000' },
              { name: 'Hummus', desc: 'Traditional starter', price: '1.500' },
            ]
        ).map((item, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '12px 0',
                borderBottom: i < 2 ? '1px solid #f0ece8' : 'none',
              }}
            >
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#222' }}>{item.name}</div>
                <div style={{ fontSize: 12, color: '#888', marginTop: 2 }}>{item.desc}</div>
              </div>
              <div style={{ fontSize: 15, fontWeight: 800, color: ORANGE }}>{item.price}</div>
            </div>
          ))}
      </div>
      {/* Lang badge */}
      <div
        style={{
          textAlign: 'center',
          padding: '10px 24px 16px',
        }}
      >
        <span
          style={{
            display: 'inline-block',
            fontSize: 12,
            fontWeight: 700,
            color: ORANGE,
            backgroundColor: `${ORANGE}15`,
            padding: '4px 16px',
            borderRadius: 20,
            letterSpacing: 1,
          }}
        >
          {isArabic ? '🇴🇲 العربية — RTL' : '🇬🇧 English — LTR'}
        </span>
      </div>
    </div>
  );

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
          background: 'radial-gradient(ellipse at 50% 40%, rgba(232,70,30,0.1) 0%, transparent 65%)',
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
          Bilingual Support
        </p>
        <h2 style={{ fontSize: 60, fontWeight: 800, color: '#ffffff', margin: 0, lineHeight: 1.2 }}>
          <span style={{ background: `linear-gradient(135deg, ${ORANGE}, ${ORANGE_LIGHT})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Arabic & English
          </span>
          {' '}— built in
        </h2>
      </div>

      {/* Cards — alternating display */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        {/* EN Card */}
        <div
          style={{
            opacity: showArabic ? 0 : 1,
            position: showArabic ? 'absolute' : 'relative',
            top: 0,
          }}
        >
          <MenuCard isArabic={false} translateX={enTranslate} />
        </div>
        {/* AR Card */}
        <div
          style={{
            opacity: showArabic ? 1 : 0,
            position: showArabic ? 'relative' : 'absolute',
            top: 0,
          }}
        >
          <MenuCard isArabic={true} translateX={arTranslate} />
        </div>
      </div>

      {/* Toggle indicator */}
      <div
        style={{
          display: 'flex',
          gap: 16,
          marginTop: 40,
          opacity: flagOpacity,
          zIndex: 2,
        }}
      >
        {['🇬🇧 EN', '🇸🇦 AR'].map((lang, i) => (
          <div
            key={i}
            style={{
              padding: '8px 24px',
              borderRadius: 24,
              backgroundColor: (i === 0 && !showArabic) || (i === 1 && showArabic) ? ORANGE : 'rgba(255,255,255,0.1)',
              color: '#fff',
              fontSize: 18,
              fontWeight: 700,
              transition: 'background-color 0.3s',
            }}
          >
            {lang}
          </div>
        ))}
      </div>
    </div>
  );
};
