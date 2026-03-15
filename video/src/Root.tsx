import React from 'react';
import { Composition } from 'remotion';
import { AmeenPromo } from './scenes/AmeenPromo';
import { OmHungryPromo } from './scenes/OmHungryPromo';

export const Root: React.FC = () => {
  return (
    <>
      <Composition
        id="AmeenPromo"
        component={AmeenPromo}
        durationInFrames={900}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="OmHungryPromo"
        component={OmHungryPromo}
        durationInFrames={3120}
        fps={60}
        width={1080}
        height={1920}
      />
    </>
  );
};
