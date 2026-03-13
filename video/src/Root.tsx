import React from 'react';
import { Composition } from 'remotion';
import { AmeenPromo } from './scenes/AmeenPromo';

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
    </>
  );
};
