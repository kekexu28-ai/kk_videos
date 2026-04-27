export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;

export const secondsToFrames = (seconds: number) => Math.round(seconds * FPS);

export const scenes = [
  {
    id: 'opening',
    title: '想动，却动不了？',
    start: 0,
    duration: 15,
    accent: '#57c7ff',
  },
  {
    id: 'stroke-eeg',
    title: '脑卒中与脑电',
    start: 15,
    duration: 20,
    accent: '#5ed6a2',
  },
  {
    id: 'motor-imagery',
    title: '运动想象脑电',
    start: 35,
    duration: 25,
    accent: '#68b8ff',
  },
  {
    id: 'tacs',
    title: '经颅交流电刺激',
    start: 60,
    duration: 20,
    accent: '#69d8d0',
  },
  {
    id: 'analysis',
    title: '刺激前后对比',
    start: 80,
    duration: 32,
    accent: '#74e08b',
  },
  {
    id: 'ending',
    title: '医工融合，服务康复',
    start: 112,
    duration: 20,
    accent: '#ffbd6f',
  },
] as const;

export const TOTAL_SECONDS = 132;
export const TOTAL_FRAMES = secondsToFrames(TOTAL_SECONDS);

export const sceneFrame = (scene: (typeof scenes)[number]) => ({
  from: secondsToFrames(scene.start),
  durationInFrames: secondsToFrames(scene.duration),
});

export const narration = [
  {
    start: 0,
    end: 5,
    text: '脑卒中后，为什么有些患者明明想动，却很难完成动作？',
  },
  {
    start: 5,
    end: 10,
    text: '很多时候，不是患者没有努力。',
  },
  {
    start: 10,
    end: 15,
    text: '而是大脑和肢体之间的信息通路，出现了问题。',
  },
  {
    start: 15,
    end: 21,
    text: '脑卒中可能损伤与运动控制相关的脑区或神经通路。',
  },
  {
    start: 21,
    end: 27,
    text: '大脑活动会产生微弱电信号。',
  },
  {
    start: 27,
    end: 35,
    text: '这些信号，可以通过脑电技术被记录下来。',
  },
  {
    start: 35,
    end: 42,
    text: '运动想象脑电，记录患者想象动作时的大脑反应。',
  },
  {
    start: 42,
    end: 50,
    text: '屏幕提示想象握拳、想象伸开手。',
  },
  {
    start: 50,
    end: 60,
    text: '即使手部没有明显动作，大脑仍可能产生与运动意图相关的信号。',
  },
  {
    start: 60,
    end: 67,
    text: '经颅交流电刺激，是一种非侵入性神经调控技术。',
  },
  {
    start: 67,
    end: 80,
    text: '它通过温和、可控的交流电刺激，作用于特定脑区。',
  },
  {
    start: 80,
    end: 87,
    text: '实验先采集患者运动想象期脑电信号。',
  },
  {
    start: 87,
    end: 94,
    text: '随后进行温和、可控的经颅交流电刺激。',
  },
  {
    start: 94,
    end: 102,
    text: '再观察刺激前后脑电波形、频段能量和脑网络连接的变化。',
  },
  {
    start: 102,
    end: 112,
    text: '这些数据，用于辅助理解运动功能恢复情况。',
  },
  {
    start: 112,
    end: 119,
    text: '科研数据与临床评估结合，可以让康复判断更精细。',
  },
  {
    start: 119,
    end: 126,
    text: '这些数据，为后续精准康复评估与训练方案调整提供支持。',
  },
  {
    start: 126,
    end: 132,
    text: '让技术读懂大脑，让创新服务康复。',
  },
];
