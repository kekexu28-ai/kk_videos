import {interpolate, useCurrentFrame} from 'remotion';
import {colors, fontFamily} from '../styles';

export const EEGMonitor = ({compact = false}: {compact?: boolean}) => {
  const frame = useCurrentFrame();
  const offset = -((frame * 5) % 180);
  const rows = compact ? 8 : 13;

  return (
    <div
      style={{
        width: compact ? 520 : 700,
        height: compact ? 300 : 430,
        borderRadius: 24,
        background: 'linear-gradient(180deg, #ffffff 0%, #f3fbff 100%)',
        border: '8px solid #20394e',
        boxShadow: '0 22px 55px rgba(20, 47, 66, 0.2)',
        padding: 24,
        position: 'relative',
        overflow: 'hidden',
        fontFamily,
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 16,
          left: 22,
          right: 22,
          height: 38,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          color: colors.muted,
          fontSize: 18,
          fontWeight: 700,
        }}
      >
        <span>EEG ACQUIRE</span>
        <span>运动想象期</span>
      </div>
      <svg viewBox={`0 0 ${compact ? 472 : 652} ${compact ? 240 : 350}`} style={{position: 'absolute', left: 24, top: 68, right: 24}}>
        {Array.from({length: rows}).map((_, index) => {
          const y = 22 + index * (compact ? 25 : 25);
          const phase = (index % 5) * 18;
          return (
            <path
              key={index}
              d={wavePath(compact ? 472 : 652, y, phase + offset, index)}
              fill="none"
              stroke={index % 4 === 0 ? '#2d4a9a' : '#516b78'}
              strokeWidth={index % 4 === 0 ? 2.8 : 2}
              opacity={index % 4 === 0 ? 0.82 : 0.54}
            />
          );
        })}
      </svg>
      <div
        style={{
          position: 'absolute',
          left: compact ? 150 : 210,
          right: compact ? 150 : 210,
          bottom: 18,
          height: 14,
          borderRadius: 99,
          background: 'linear-gradient(90deg, #57c7ff, #58d6c8)',
        }}
      />
    </div>
  );
};

const wavePath = (width: number, baseY: number, phase: number, row: number) => {
  const step = 22;
  let path = `M0 ${baseY}`;
  for (let x = 0; x <= width + step; x += step) {
    const spike = Math.sin((x + phase) / 18) * (row % 3 === 0 ? 8 : 5);
    const slow = Math.sin((x + phase) / 47) * 5;
    const artifact = (x + phase + row * 23) % 180 < 12 ? 22 : 0;
    path += ` L${x} ${baseY + spike + slow - artifact}`;
  }
  return path;
};

export const TaskPrompt = ({mode}: {mode: '握拳' | '伸开手'}) => {
  const frame = useCurrentFrame();
  const scale = interpolate(Math.sin(frame / 9), [-1, 1], [0.96, 1.04]);

  return (
    <div
      style={{
        width: 430,
        height: 280,
        borderRadius: 26,
        background: 'linear-gradient(180deg, #ffffff 0%, #f6fbff 100%)',
        border: '5px solid rgba(50, 94, 116, 0.22)',
        boxShadow: '0 24px 58px rgba(19, 54, 72, 0.16)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
        fontFamily,
      }}
    >
      <div style={{fontSize: 26, color: colors.muted, fontWeight: 700}}>屏幕提示</div>
      <div
        style={{
          transform: `scale(${scale})`,
          padding: '18px 34px',
          borderRadius: 18,
          background: 'linear-gradient(90deg, #57c7ff, #58d6c8)',
          color: '#fff',
          fontSize: 56,
          fontWeight: 900,
          boxShadow: '0 16px 38px rgba(58, 166, 190, 0.28)',
        }}
      >
        想象{mode}
      </div>
      <HandIcon open={mode === '伸开手'} />
    </div>
  );
};

const HandIcon = ({open}: {open: boolean}) => (
  <svg viewBox="0 0 150 92" style={{width: 150, height: 92}}>
    {open ? (
      <g fill="none" stroke="#24485a" strokeWidth="12" strokeLinecap="round">
        <path d="M58 74 V24" />
        <path d="M78 74 V14" />
        <path d="M98 76 V24" />
        <path d="M118 78 V36" />
        <path d="M58 74 C76 88 102 88 124 76" />
        <path d="M44 76 L24 46" />
      </g>
    ) : (
      <path d="M40 52 C40 26 67 18 80 36 C98 16 124 34 113 59 C105 86 51 89 40 52 Z" fill="#24485a" />
    )}
  </svg>
);

export const AnalysisPanel = () => {
  const frame = useCurrentFrame();
  const reveal = interpolate(frame, [12, 60], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        width: 650,
        height: 500,
        borderRadius: 28,
        background: 'rgba(255,255,255,0.9)',
        border: '1px solid rgba(255,255,255,0.8)',
        boxShadow: '0 26px 70px rgba(22, 49, 70, 0.18)',
        padding: 34,
        fontFamily,
      }}
    >
      <div style={{fontSize: 30, fontWeight: 900, color: colors.ink, marginBottom: 28}}>刺激前后数据分析</div>
      <Metric label="脑电波形" value={78} color="#57c7ff" reveal={reveal} />
      <Metric label="频段能量" value={62} color="#58d6c8" reveal={reveal} />
      <Metric label="脑网络连接" value={86} color="#68da94" reveal={reveal} />
      <div style={{marginTop: 36, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18}}>
        <MiniChart color="#57c7ff" active={false} />
        <MiniChart color="#68da94" active />
      </div>
    </div>
  );
};

const Metric = ({
  label,
  value,
  color,
  reveal,
}: {
  label: string;
  value: number;
  color: string;
  reveal: number;
}) => (
  <div style={{marginBottom: 22}}>
    <div style={{display: 'flex', justifyContent: 'space-between', fontSize: 23, color: colors.muted, fontWeight: 700}}>
      <span>{label}</span>
      <span>{Math.round(value * reveal)}%</span>
    </div>
    <div style={{height: 14, borderRadius: 99, background: 'rgba(69,100,120,0.13)', marginTop: 10, overflow: 'hidden'}}>
      <div style={{height: '100%', width: `${value * reveal}%`, borderRadius: 99, background: color}} />
    </div>
  </div>
);

const MiniChart = ({color, active}: {color: string; active: boolean}) => (
  <div style={{height: 126, borderRadius: 18, background: active ? 'rgba(104,218,148,0.12)' : 'rgba(87,199,255,0.1)', padding: 16}}>
    <svg viewBox="0 0 250 90" style={{width: '100%', height: '100%'}}>
      <path
        d={active ? 'M8 70 C44 42 70 62 101 28 S165 18 238 30' : 'M8 62 C45 52 82 70 116 46 S178 50 238 44'}
        fill="none"
        stroke={color}
        strokeWidth="8"
        strokeLinecap="round"
      />
      <path d="M8 78 H238" stroke="rgba(70,96,110,0.18)" strokeWidth="4" />
    </svg>
  </div>
);

export const FlowSteps = () => {
  const frame = useCurrentFrame();
  const steps = ['刺激前采集', 'tACS', '刺激后观察', '数据分析'];

  return (
    <div style={{display: 'flex', alignItems: 'center', gap: 16, fontFamily}}>
      {steps.map((step, index) => {
        const active = frame > index * 42;
        return (
          <div key={step} style={{display: 'flex', alignItems: 'center', gap: 16}}>
            <div
              style={{
                width: 184,
                height: 82,
                borderRadius: 20,
                background: active ? 'linear-gradient(90deg, #57c7ff, #58d6c8)' : 'rgba(255,255,255,0.74)',
                color: active ? '#fff' : colors.muted,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 27,
                fontWeight: 900,
                boxShadow: active ? '0 16px 40px rgba(59, 176, 194, 0.24)' : 'none',
              }}
            >
              {step}
            </div>
            {index < steps.length - 1 ? <div style={{fontSize: 38, color: colors.muted, fontWeight: 900}}>→</div> : null}
          </div>
        );
      })}
    </div>
  );
};
