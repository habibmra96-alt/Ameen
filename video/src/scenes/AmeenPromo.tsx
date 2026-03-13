import React from 'react';
import { Series } from 'remotion';
import { Scene1Intro } from './Scene1Intro';
import { Scene2Check } from './Scene2Check';
import { Scene3Report } from './Scene3Report';
import { Scene4Tamper } from './Scene4Tamper';
import { Scene5Outro } from './Scene5Outro';

export const AmeenPromo: React.FC = () => {
  return (
    <div style={{ width: '100%', height: '100%', backgroundColor: '#000000' }}>
      <Series>
        <Series.Sequence durationInFrames={180}>
          <Scene1Intro />
        </Series.Sequence>
        <Series.Sequence durationInFrames={180}>
          <Scene2Check />
        </Series.Sequence>
        <Series.Sequence durationInFrames={180}>
          <Scene3Report />
        </Series.Sequence>
        <Series.Sequence durationInFrames={180}>
          <Scene4Tamper />
        </Series.Sequence>
        <Series.Sequence durationInFrames={180}>
          <Scene5Outro />
        </Series.Sequence>
      </Series>
    </div>
  );
};
