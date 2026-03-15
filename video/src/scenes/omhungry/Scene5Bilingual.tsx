import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { OmHungryLogo } from './OmHungryLogo';

const ORANGE = '#E8461E';
const ORANGE_LIGHT = '#FF6B3D';
const BG = '#FFF2E8';

const EN_ITEMS = [
  { name: 'Mixed Grill', desc: 'Beef & Lamb', price: '7.500' },
  { name: 'Grilled Fish', desc: 'With lemon sauce', price: '6.000' },
  { name: 'Hummus', desc: 'Traditional starter', price: '1.500' },
  { name: 'Baklava', desc: 'Honey & pistachio', price: '1.200' },
];

const AR_ITEMS = [
  { name: 'مشويات مشكلة', desc: 'لحم بقري وضأن', price: '٧٫٥٠٠' },
  { name: 'سمك مشوي', desc: 'مع صلصة الليمون', price: '٦٫٠٠٠' },
  { name: 'حمص بالطحينة', desc: 'مقبلات تقليدية', price: '١٫٥٠٠' },
  { name: 'بقلاوة', desc: 'عسل وفستق', price: '١٫٢٠٠' },
];

export const Scene5Bilingual: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 60fps timings
  const headingOpacity = interpolate(frame, [0, 40], [0, 1], { extrapolateRight: 'clamp' });
  const headingY = interpolate(frame, [0, 40], [50, 0], { extrapolateRight: 'clamp' });

  // Show Arabic from frame 80-290, English otherwise
  const showArabic = frame >= 80 && frame < 290;

  const enCardX = spring({ frame: frame - 40, fps, config: { damping: 16, stiffness: 80 } });
  const arCardX = spring({ frame: frame - 50, fps, config: { damping: 16, stiffness: 80 } });
  const enTranslate = interpolate(enCardX, [0, 1], [-400, 0]);
  const arTranslate = interpolate(arCardX, [0, 1], [400, 0]);

  const flagOpacity = interpolate(frame, [80, 120], [0, 1], { extrapolateRight: 'clamp' });
  const logoOpacity = interpolate(frame, [120, 160], [0, 1], { extrapolateRight: 'clamp' });
  const noteOpacity = interpolate(frame, [200, 260], [0, 1], { extrapolateRight: 'clamp' });

  const sceneOpacity = interpolate(frame, [320, 360], [1, 0], { extrapolateRight: 'clamp' });

  const MenuCard: React.FC<{ isArabic: boolean; translateX: number }> = ({ isArabic, translateX }) => {
    const items = isArabic ? AR_ITEMS : EN_ITEMS;
    return (
      <div
        style={{
          width: 480,
          backgroundColor: '#FFFFFF',
          borderRadius: 24,
          overflow: 'hidden',
          boxShadow: `0 24px 60px rgba(232,70,30,0.15), 0 4px 16px rgba(0,0,0,0.08)`,
          transform: `translateX(${translateX}px)`,
          direction: isArabic ? 'rtl' : 'ltr',
        }}
      >
        <div style={{ background: `linear-gradient(135deg, ${ORANGE}, ${ORANGE_LIGHT})`, padding: '28px 28px 22px', textAlign: isArabic ? 'right' : 'left' }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 8 }}>
            {isArabic ? 'قائمة الطعام' : 'Our Menu'}
          </div>
          <div style={{ fontSize: 28, fontWeight: 900, color: '#fff' }}>
            {isArabic ? 'مطعم النخيل' : 'Al Nakheel Restaurant'}
          </div>
        </div>
        <div style={{ padding: '18px 28px' }}>
          {items.map((item, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: i < items.length - 1 ? '1px solid #f0ece8' : 'none' }}>
              <div>
                <div style={{ fontSize: 18, fontWeight: 700, color: '#222' }}>{item.name}</div>
                <div style={{ fontSize: 13, color: '#999', marginTop: 3 }}>{item.desc}</div>
              </div>
              <div style={{ fontSize: 18, fontWeight: 800, color: ORANGE }}>{item.price}</div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', padding: '12px 28px 18px' }}>
          <span style={{ display: 'inline-block', fontSize: 15, fontWeight: 700, color: ORANGE, backgroundColor: `${ORANGE}12`, padding: '6px 20px', borderRadius: 24, letterSpacing: 1 }}>
            {isArabic ? '🇸🇦 العربية — RTL' : '🇬🇧 English — LTR'}
          </span>
        </div>
      </div>
    );
  };

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
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 50% 45%, ${ORANGE}08 0%, transparent 65%)` }} />

      {/* Heading */}
      <div style={{ opacity: headingOpacity, transform: `translateY(${headingY}px)`, textAlign: 'center', padding: '0 70px', zIndex: 2 }}>
        <div style={{ display: 'inline-block', background: `linear-gradient(135deg, ${ORANGE}, ${ORANGE_LIGHT})`, borderRadius: 50, padding: '12px 32px', marginBottom: 24 }}>
          <span style={{ fontSize: 28, fontWeight: 700, color: '#fff', textTransform: 'uppercase', letterSpacing: 2 }}>Bilingual</span>
        </div>
        <h2 style={{ fontSize: 74, fontWeight: 900, color: '#1A1A1A', margin: 0, lineHeight: 1.1, letterSpacing: '-1.5px' }}>
          <span style={{ background: `linear-gradient(135deg, ${ORANGE}, ${ORANGE_LIGHT})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Arabic & English
          </span>
          <br />
          — built in
        </h2>
      </div>

      {/* Card display */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ opacity: showArabic ? 0 : 1, position: showArabic ? 'absolute' : 'relative', top: 0 }}>
          <MenuCard isArabic={false} translateX={enTranslate} />
        </div>
        <div style={{ opacity: showArabic ? 1 : 0, position: showArabic ? 'relative' : 'absolute', top: 0 }}>
          <MenuCard isArabic={true} translateX={arTranslate} />
        </div>
      </div>

      {/* Language toggle */}
      <div style={{ display: 'flex', gap: 20, opacity: flagOpacity, zIndex: 2 }}>
        {['🇬🇧  English', '🇸🇦  العربية'].map((lang, i) => (
          <div key={i} style={{
            padding: '14px 32px',
            borderRadius: 30,
            backgroundColor: (i === 0 && !showArabic) || (i === 1 && showArabic) ? ORANGE : '#fff',
            color: (i === 0 && !showArabic) || (i === 1 && showArabic) ? '#fff' : '#888',
            fontSize: 22,
            fontWeight: 800,
            boxShadow: (i === 0 && !showArabic) || (i === 1 && showArabic) ? `0 8px 24px ${ORANGE}44` : '0 2px 8px rgba(0,0,0,0.08)',
          }}>
            {lang}
          </div>
        ))}
      </div>

      {/* RTL note */}
      <div style={{ opacity: noteOpacity, textAlign: 'center', zIndex: 2 }}>
        <p style={{ fontSize: 30, color: '#888', margin: 0, fontWeight: 500 }}>
          Full RTL support for Arabic menus ✨
        </p>
      </div>

      {/* Bottom logo */}
      <div style={{ opacity: logoOpacity, zIndex: 2 }}>
        <OmHungryLogo size={100} showText={true} />
      </div>
    </div>
  );
};
