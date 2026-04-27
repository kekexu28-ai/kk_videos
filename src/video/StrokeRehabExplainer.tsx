import {AbsoluteFill, Sequence, interpolate, useCurrentFrame} from 'remotion';
import {BrainActivity, NetworkComparison, NeuralPathway, TacsVisual} from './components/BrainVisuals';
import {PatientCharacter, ResearcherCharacter} from './components/Characters';
import {AnalysisPanel, EEGMonitor, FlowSteps, TaskPrompt} from './components/DataDisplays';
import {CaptionOverlay, GlassPanel, SceneBackground, SceneProgress, SceneTitle} from './components/Layout';
import {sceneFrame, scenes} from './script';
import {colors, fontFamily, textShadow} from './styles';

export const StrokeRehabExplainer = () => {
  return (
    <AbsoluteFill style={{fontFamily, backgroundColor: '#eefaff'}}>
      <Sequence {...sceneFrame(scenes[0])}>
        <OpeningScene />
      </Sequence>
      <Sequence {...sceneFrame(scenes[1])}>
        <StrokeEegScene />
      </Sequence>
      <Sequence {...sceneFrame(scenes[2])}>
        <MotorImageryScene />
      </Sequence>
      <Sequence {...sceneFrame(scenes[3])}>
        <TacsScene />
      </Sequence>
      <Sequence {...sceneFrame(scenes[4])}>
        <AnalysisScene />
      </Sequence>
      <Sequence {...sceneFrame(scenes[5])}>
        <EndingScene />
      </Sequence>
      <CaptionOverlay />
      <SceneProgress />
    </AbsoluteFill>
  );
};

const fadeIn = (frame: number, start = 0, end = 24) =>
  interpolate(frame, [start, end], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

const rise = (frame: number, start = 0, end = 26, distance = 40) =>
  interpolate(frame, [start, end], [distance, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

const OpeningScene = () => {
  const frame = useCurrentFrame();
  const titleOpacity = fadeIn(frame, 8, 36);
  const questionScale = interpolate(frame, [30, 72], [0.92, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <SceneBackground>
      <SceneTitle eyebrow="脑卒中康复研究" title="想动，却动不了？" accent={scenes[0].accent} />
      <div style={{position: 'absolute', left: 160, bottom: 120, transform: `translateY(${rise(frame, 4, 36)}px)`, opacity: fadeIn(frame, 4, 36)}}>
        <PatientCharacter scale={1.18} mood="thinking" />
      </div>
      <div style={{position: 'absolute', right: 150, bottom: 155, opacity: fadeIn(frame, 42, 70), transform: `translateY(${rise(frame, 42, 70)}px)`}}>
        <ResearcherCharacter scale={0.92} />
      </div>
      <GlassPanel
        style={{
          position: 'absolute',
          right: 190,
          top: 250,
          width: 660,
          padding: '38px 44px',
          opacity: titleOpacity,
          transform: `scale(${questionScale})`,
        }}
      >
        <div style={{fontSize: 34, color: colors.muted, fontWeight: 800, marginBottom: 20}}>核心问题</div>
        <div style={{fontSize: 62, lineHeight: 1.22, color: colors.ink, fontWeight: 900}}>
          为什么明明想动，
          <br />
          却很难完成动作？
        </div>
      </GlassPanel>
      <ThoughtSignals />
    </SceneBackground>
  );
};

const ThoughtSignals = () => {
  const frame = useCurrentFrame();
  return (
    <svg viewBox="0 0 1920 1080" style={{position: 'absolute', inset: 0, width: '100%', height: '100%'}}>
      {[0, 1, 2].map((index) => {
        const local = (frame + index * 18) % 72;
        const opacity = interpolate(local, [0, 18, 72], [0, 0.75, 0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
        const r = interpolate(local, [0, 72], [12, 78]);
        return <circle key={index} cx="520" cy="356" r={r} fill="none" stroke="#57c7ff" strokeWidth="5" opacity={opacity} />;
      })}
      <path d="M650 352 C760 302 894 310 996 372" fill="none" stroke="#58d6c8" strokeWidth="7" strokeDasharray="18 24" opacity="0.45" />
    </svg>
  );
};

const StrokeEegScene = () => {
  const frame = useCurrentFrame();
  return (
    <SceneBackground>
      <SceneTitle eyebrow="第一步" title="理解大脑信号" accent={scenes[1].accent} />
      <div style={{position: 'absolute', left: 105, top: 250, opacity: fadeIn(frame, 8, 32), transform: `translateY(${rise(frame, 8, 32)}px)`}}>
        <BrainActivity large />
      </div>
      <div style={{position: 'absolute', left: 620, top: 315, opacity: fadeIn(frame, 28, 56)}}>
        <NeuralPathway />
      </div>
      <GlassPanel
        style={{
          position: 'absolute',
          right: 110,
          top: 210,
          width: 600,
          padding: '36px 42px',
          opacity: fadeIn(frame, 42, 70),
        }}
      >
        <InfoLine accent="#ff8f73" title="脑卒中" body="可能影响运动控制相关脑区或神经通路。" />
        <InfoLine accent="#57c7ff" title="脑电信号" body="大脑活动产生的微弱电信号，可以被脑电技术记录。" />
      </GlassPanel>
      <div style={{position: 'absolute', right: 140, bottom: 155, opacity: fadeIn(frame, 72, 100)}}>
        <EEGMonitor compact />
      </div>
    </SceneBackground>
  );
};

const InfoLine = ({accent, title, body}: {accent: string; title: string; body: string}) => (
  <div style={{display: 'grid', gridTemplateColumns: '18px 1fr', gap: 18, marginBottom: 28}}>
    <div style={{width: 18, height: 18, borderRadius: 99, background: accent, marginTop: 12, boxShadow: `0 0 22px ${accent}`}} />
    <div>
      <div style={{fontSize: 34, color: colors.ink, fontWeight: 900, marginBottom: 8}}>{title}</div>
      <div style={{fontSize: 27, lineHeight: 1.45, color: colors.muted, fontWeight: 650}}>{body}</div>
    </div>
  </div>
);

const MotorImageryScene = () => {
  const frame = useCurrentFrame();
  const promptMode = frame % 180 < 90 ? '握拳' : '伸开手';

  return (
    <SceneBackground>
      <SceneTitle eyebrow="第二步" title="记录运动想象脑电" accent={scenes[2].accent} />
      <div style={{position: 'absolute', left: 70, bottom: 112, opacity: fadeIn(frame, 0, 26)}}>
        <PatientCharacter scale={1.04} mood="neutral" />
      </div>
      <div style={{position: 'absolute', left: 515, top: 285, opacity: fadeIn(frame, 22, 48)}}>
        <TaskPrompt mode={promptMode} />
      </div>
      <div style={{position: 'absolute', right: 95, top: 218, opacity: fadeIn(frame, 46, 76)}}>
        <EEGMonitor />
      </div>
      <GlassPanel
        style={{
          position: 'absolute',
          left: 580,
          bottom: 165,
          width: 505,
          padding: '28px 34px',
          opacity: fadeIn(frame, 82, 112),
        }}
      >
        <div style={{fontSize: 30, fontWeight: 900, color: colors.ink, marginBottom: 12}}>身体未明显动作</div>
        <div style={{fontSize: 25, color: colors.muted, lineHeight: 1.45, fontWeight: 650}}>
          大脑仍可能产生与运动意图相关的信号。
        </div>
      </GlassPanel>
    </SceneBackground>
  );
};

const TacsScene = () => {
  const frame = useCurrentFrame();
  return (
    <SceneBackground>
      <SceneTitle eyebrow="第三步" title="温和可控的神经调控" accent={scenes[3].accent} />
      <div style={{position: 'absolute', left: 120, top: 260, opacity: fadeIn(frame, 6, 34), transform: `translateY(${rise(frame, 6, 34)}px)`}}>
        <TacsVisual />
      </div>
      <GlassPanel
        style={{
          position: 'absolute',
          right: 130,
          top: 262,
          width: 620,
          padding: '40px 46px',
          opacity: fadeIn(frame, 48, 76),
        }}
      >
        <div style={{fontSize: 34, fontWeight: 900, color: colors.ink, marginBottom: 20}}>经颅交流电刺激</div>
        <div style={{fontSize: 29, color: colors.muted, lineHeight: 1.55, fontWeight: 650}}>
          一种非侵入性神经调控技术，通过温和、可控的交流电刺激作用于特定脑区。
        </div>
      </GlassPanel>
    </SceneBackground>
  );
};

const AnalysisScene = () => {
  const frame = useCurrentFrame();
  return (
    <SceneBackground>
      <SceneTitle eyebrow="第四步" title="看见刺激前后的变化" accent={scenes[4].accent} />
      <div style={{position: 'absolute', left: 115, top: 195, opacity: fadeIn(frame, 4, 32)}}>
        <FlowSteps />
      </div>
      <div style={{position: 'absolute', left: 95, bottom: 150, opacity: fadeIn(frame, 44, 74)}}>
        <NetworkComparison />
      </div>
      <div style={{position: 'absolute', right: 96, top: 300, opacity: fadeIn(frame, 74, 104), transform: `translateY(${rise(frame, 74, 104)}px)`}}>
        <AnalysisPanel />
      </div>
    </SceneBackground>
  );
};

const EndingScene = () => {
  const frame = useCurrentFrame();
  const warmGlow = interpolate(frame, [0, 80], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <SceneBackground variant="warm">
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(circle at 72% 22%, rgba(255,189,111,${0.16 + warmGlow * 0.32}), transparent 42%)`,
        }}
      />
      <SceneTitle eyebrow="结尾" title="为精准康复提供支持" accent={scenes[5].accent} />
      <div style={{position: 'absolute', left: 180, bottom: 112, opacity: fadeIn(frame, 4, 32)}}>
        <PatientCharacter scale={1.12} mood="hopeful" gentleHand />
      </div>
      <div style={{position: 'absolute', right: 255, bottom: 132, opacity: fadeIn(frame, 22, 50)}}>
        <ResearcherCharacter scale={0.96} />
      </div>
      <GlassPanel
        style={{
          position: 'absolute',
          right: 500,
          top: 238,
          width: 650,
          padding: '42px 48px',
          opacity: fadeIn(frame, 64, 95),
        }}
      >
        <div style={{fontSize: 34, color: colors.muted, fontWeight: 800, marginBottom: 20}}>评估中的轻微伸指</div>
        <div style={{fontSize: 46, lineHeight: 1.28, color: colors.ink, fontWeight: 900}}>
          数据支持评估，
          <br />
          也支持训练方案调整。
        </div>
      </GlassPanel>
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 790,
          textAlign: 'center',
          fontSize: 58,
          fontWeight: 950,
          color: '#214052',
          textShadow,
          opacity: fadeIn(frame, 120, 158),
        }}
      >
        让技术读懂大脑，让创新服务康复
      </div>
    </SceneBackground>
  );
};
