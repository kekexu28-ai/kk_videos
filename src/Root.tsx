import {Composition} from 'remotion';
import {StrokeRehabExplainer} from './video/StrokeRehabExplainer';
import {FPS, HEIGHT, TOTAL_FRAMES, WIDTH} from './video/script';

export const RemotionRoot = () => {
  return (
    <Composition
      id="StrokeRehabExplainer"
      component={StrokeRehabExplainer}
      durationInFrames={TOTAL_FRAMES}
      fps={FPS}
      width={WIDTH}
      height={HEIGHT}
    />
  );
};
