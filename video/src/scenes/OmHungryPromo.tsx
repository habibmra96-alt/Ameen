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

// Total: 1560 frames @ 30fps = 52 seconds
export const OmHungryPromo: React.FC = () => {
  return (
    <div style={{ width: '100%', height: '100%', backgroundColor: '#1A0A05' }}>
      <Series>
        <Series.Sequence durationInFrames={150}>
          <Scene1Hook />
        </Series.Sequence>
        <Series.Sequence durationInFrames={150}>
          <Scene2BrandIntro />
        </Series.Sequence>
        <Series.Sequence durationInFrames={240}>
          <Scene3CustomBranding />
        </Series.Sequence>
        <Series.Sequence durationInFrames={180}>
          <Scene4QRCode />
        </Series.Sequence>
        <Series.Sequence durationInFrames={180}>
          <Scene5Bilingual />
        </Series.Sequence>
        <Series.Sequence durationInFrames={180}>
          <Scene6Analytics />
        </Series.Sequence>
        <Series.Sequence durationInFrames={180}>
          <Scene7Management />
        </Series.Sequence>
        <Series.Sequence durationInFrames={240}>
          <Scene8Pricing />
        </Series.Sequence>
        <Series.Sequence durationInFrames={60}>
          <SceneEndCard />
        </Series.Sequence>
      </Series>
    </div>
  );
};
