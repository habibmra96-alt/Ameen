import React from 'react';
import { Series } from 'remotion';
import { Scene1Hook } from './omhungry/Scene1Hook';
import { Scene2BrandIntro } from './omhungry/Scene2BrandIntro';
import { Scene3CustomBranding } from './omhungry/Scene3CustomBranding';
import { Scene4QRCode } from './omhungry/Scene4QRCode';
import { Scene5Bilingual } from './omhungry/Scene5Bilingual';
import { Scene6Analytics } from './omhungry/Scene6Analytics';
import { Scene7Management } from './omhungry/Scene7Management';
import { Scene8Pricing } from './omhungry/Scene8Pricing';
import { SceneEndCard } from './omhungry/SceneEndCard';

// 60fps — 52s × 60 = 3120 frames total
// Scene durations (seconds × 60):
//   S1 Hook:         5s → 300f
//   S2 Brand Intro:  5s → 300f
//   S3 Branding:     8s → 480f
//   S4 QR Code:      6s → 360f
//   S5 Bilingual:    6s → 360f
//   S6 Analytics:    6s → 360f
//   S7 Management:   6s → 360f
//   S8 Pricing:      8s → 480f
//   End Card:        2s → 120f
//   Total:          52s → 3120f

export const OmHungryPromo: React.FC = () => {
  return (
    <div style={{ width: '100%', height: '100%', backgroundColor: '#FFF2E8' }}>
      <Series>
        <Series.Sequence durationInFrames={300}>
          <Scene1Hook />
        </Series.Sequence>
        <Series.Sequence durationInFrames={300}>
          <Scene2BrandIntro />
        </Series.Sequence>
        <Series.Sequence durationInFrames={480}>
          <Scene3CustomBranding />
        </Series.Sequence>
        <Series.Sequence durationInFrames={360}>
          <Scene4QRCode />
        </Series.Sequence>
        <Series.Sequence durationInFrames={360}>
          <Scene5Bilingual />
        </Series.Sequence>
        <Series.Sequence durationInFrames={360}>
          <Scene6Analytics />
        </Series.Sequence>
        <Series.Sequence durationInFrames={360}>
          <Scene7Management />
        </Series.Sequence>
        <Series.Sequence durationInFrames={480}>
          <Scene8Pricing />
        </Series.Sequence>
        <Series.Sequence durationInFrames={120}>
          <SceneEndCard />
        </Series.Sequence>
      </Series>
    </div>
  );
};
