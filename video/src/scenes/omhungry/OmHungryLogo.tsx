import React from 'react';

const ORANGE = '#E8461E';

interface OmHungryLogoProps {
  size?: number;
  showText?: boolean;
}

export const OmHungryLogo: React.FC<OmHungryLogoProps> = ({ size = 160, showText = true }) => {
  const s = size;
  const textSize = s * 0.28;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: s * 0.05 }}>
      {/* Cartoon face SVG */}
      <svg
        width={s}
        height={s * 0.95}
        viewBox="0 0 200 190"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Curly hair — dark brown */}
        <ellipse cx="100" cy="38" rx="54" ry="36" fill="#2D1A0E" />
        {/* Hair curls on top */}
        <circle cx="68" cy="22" r="18" fill="#2D1A0E" />
        <circle cx="90" cy="12" r="16" fill="#2D1A0E" />
        <circle cx="112" cy="10" r="18" fill="#2D1A0E" />
        <circle cx="133" cy="18" r="16" fill="#2D1A0E" />
        <circle cx="148" cy="32" r="14" fill="#2D1A0E" />
        <circle cx="54" cy="32" r="14" fill="#2D1A0E" />
        {/* Small curl tuft at top */}
        <circle cx="100" cy="4" r="12" fill="#2D1A0E" />

        {/* Face — warm skin */}
        <ellipse cx="100" cy="112" rx="62" ry="70" fill="#FDDBB4" />

        {/* Left ear */}
        <ellipse cx="40" cy="110" rx="10" ry="14" fill="#FDDBB4" />
        {/* Right ear */}
        <ellipse cx="160" cy="110" rx="10" ry="14" fill="#FDDBB4" />

        {/* Left eye white */}
        <ellipse cx="76" cy="95" rx="18" ry="20" fill="white" />
        {/* Right eye white */}
        <ellipse cx="124" cy="95" rx="18" ry="20" fill="white" />

        {/* Left eye iris */}
        <circle cx="78" cy="97" r="11" fill="#333" />
        {/* Right eye iris */}
        <circle cx="126" cy="97" r="11" fill="#333" />

        {/* Left pupil */}
        <circle cx="80" cy="96" r="6" fill="#111" />
        {/* Right pupil */}
        <circle cx="128" cy="96" r="6" fill="#111" />

        {/* Left eye sparkle */}
        <circle cx="83" cy="91" r="3.5" fill="white" />
        <circle cx="76" cy="88" r="2" fill="white" />
        {/* Right eye sparkle */}
        <circle cx="131" cy="91" r="3.5" fill="white" />
        <circle cx="124" cy="88" r="2" fill="white" />

        {/* Left eyebrow */}
        <path d="M 60 74 Q 76 66 92 70" stroke="#2D1A0E" strokeWidth="4" strokeLinecap="round" fill="none" />
        {/* Right eyebrow */}
        <path d="M 108 70 Q 124 66 140 74" stroke="#2D1A0E" strokeWidth="4" strokeLinecap="round" fill="none" />

        {/* Nose */}
        <ellipse cx="100" cy="116" rx="6" ry="4" fill="#E8A87C" />

        {/* Mouth outer — big smile */}
        <path d="M 68 134 Q 100 162 132 134" stroke="#2D1A0E" strokeWidth="3.5" fill="none" strokeLinecap="round" />

        {/* Teeth */}
        <path d="M 70 136 Q 100 158 130 136 L 128 140 Q 100 160 72 140 Z" fill="white" />

        {/* Tongue / red detail inside */}
        <ellipse cx="100" cy="152" rx="14" ry="8" fill="#E8461E" />

        {/* Cheek blush left */}
        <ellipse cx="58" cy="120" rx="12" ry="8" fill="#FFB8A0" opacity="0.6" />
        {/* Cheek blush right */}
        <ellipse cx="142" cy="120" rx="12" ry="8" fill="#FFB8A0" opacity="0.6" />
      </svg>

      {/* OmHungry text */}
      {showText && (
        <div
          style={{
            fontSize: textSize,
            fontWeight: 900,
            color: ORANGE,
            letterSpacing: '-0.5px',
            lineHeight: 1,
            fontFamily: 'Inter, system-ui, sans-serif',
          }}
        >
          OmHungry
        </div>
      )}
    </div>
  );
};
