import {interpolate, useCurrentFrame} from 'remotion';
import {colors} from '../styles';

export const BrainActivity = ({large = false}: {large?: boolean}) => {
  const frame = useCurrentFrame();
  const glow = interpolate(Math.sin(frame / 10), [-1, 1], [0.35, 0.95]);
  const scale = large ? 1.15 : 1;

  return (
    <svg viewBox="0 0 520 430" style={{width: 520 * scale, height: 430 * scale, overflow: 'visible'}}>
      <defs>
        <filter id="brainGlow" x="-40%" y="-40%" width="180%" height="180%">
          <feDropShadow dx="0" dy="0" stdDeviation="14" floodColor="#58d6c8" floodOpacity={glow} />
        </filter>
      </defs>
      <circle cx="260" cy="210" r="176" fill="rgba(255,255,255,0.45)" stroke="rgba(104,184,255,0.35)" strokeWidth="3" />
      <circle cx="260" cy="210" r="222" fill="none" stroke="rgba(104,184,255,0.22)" strokeWidth="3" />
      <path
        d="M235 92 C160 82 115 141 137 205 C96 247 129 333 199 327 C239 378 330 365 350 309 C421 296 438 205 379 169 C377 111 299 74 235 92 Z"
        fill="#fff3ee"
        stroke="#ff8f73"
        strokeWidth="9"
        filter="url(#brainGlow)"
      />
      <path d="M183 164 C227 160 245 191 224 233" fill="none" stroke="#ff8f73" strokeWidth="7" strokeLinecap="round" />
      <path d="M264 124 C246 165 276 198 331 198" fill="none" stroke="#ff8f73" strokeWidth="7" strokeLinecap="round" />
      <path d="M171 264 C222 257 276 279 339 249" fill="none" stroke="#ff8f73" strokeWidth="7" strokeLinecap="round" />
      <path d="M240 320 C266 284 301 279 350 298" fill="none" stroke="#ff8f73" strokeWidth="7" strokeLinecap="round" />
      <SignalNode cx={216} cy={183} delay={0} />
      <SignalNode cx={308} cy={200} delay={12} />
      <SignalNode cx={268} cy={272} delay={24} />
    </svg>
  );
};

const SignalNode = ({cx, cy, delay}: {cx: number; cy: number; delay: number}) => {
  const frame = useCurrentFrame();
  const local = (frame + delay) % 54;
  const radius = interpolate(local, [0, 54], [8, 46]);
  const opacity = interpolate(local, [0, 54], [0.8, 0]);

  return (
    <g>
      <circle cx={cx} cy={cy} r={radius} fill="none" stroke="#58d6c8" strokeWidth="4" opacity={opacity} />
      <circle cx={cx} cy={cy} r="9" fill="#58d6c8" />
    </g>
  );
};

export const NeuralPathway = () => {
  const frame = useCurrentFrame();
  const dash = 480 - (frame * 8) % 480;

  return (
    <svg viewBox="0 0 760 260" style={{width: 760, height: 260, overflow: 'visible'}}>
      <path d="M48 130 C160 26 270 26 382 130 S600 236 712 130" fill="none" stroke="rgba(55,104,132,0.18)" strokeWidth="34" strokeLinecap="round" />
      <path
        d="M48 130 C160 26 270 26 382 130 S600 236 712 130"
        fill="none"
        stroke="#57c7ff"
        strokeWidth="13"
        strokeLinecap="round"
        strokeDasharray="72 408"
        strokeDashoffset={dash}
      />
      {[48, 208, 382, 550, 712].map((x, index) => (
        <circle key={x} cx={x} cy={index % 2 === 0 ? 130 : index === 1 ? 62 : 198} r="17" fill={index < 2 ? colors.cyan : colors.green} />
      ))}
    </svg>
  );
};

export const TacsVisual = () => {
  const frame = useCurrentFrame();
  const current = interpolate(Math.sin(frame / 9), [-1, 1], [-18, 18]);

  return (
    <svg viewBox="0 0 760 520" style={{width: 760, height: 520, overflow: 'visible'}}>
      <defs>
        <filter id="currentGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="0" stdDeviation="12" floodColor="#58d6c8" floodOpacity="0.68" />
        </filter>
      </defs>
      <path
        d="M388 92 C292 82 220 146 224 249 C228 359 307 430 399 421 C486 411 552 339 543 242 C533 146 468 99 388 92 Z"
        fill="rgba(255,244,238,0.88)"
        stroke="#ff9879"
        strokeWidth="10"
      />
      <path d="M278 249 C330 217 403 217 486 249" stroke="#ff9879" strokeWidth="7" strokeLinecap="round" fill="none" />
      <path d="M317 167 C344 215 337 284 297 339" stroke="#ff9879" strokeWidth="7" strokeLinecap="round" fill="none" />
      <path d="M434 163 C402 224 411 292 468 349" stroke="#ff9879" strokeWidth="7" strokeLinecap="round" fill="none" />
      <path
        d={`M152 254 C218 ${160 + current} 270 ${160 - current} 336 250 S470 ${340 + current} 548 254 S648 ${160 - current} 704 254`}
        stroke="#58d6c8"
        strokeWidth="12"
        strokeLinecap="round"
        fill="none"
        filter="url(#currentGlow)"
      />
      <circle cx="204" cy="256" r="42" fill="rgba(88,214,200,0.18)" stroke="#58d6c8" strokeWidth="7" />
      <circle cx="556" cy="256" r="42" fill="rgba(88,214,200,0.18)" stroke="#58d6c8" strokeWidth="7" />
      <text x="380" y="484" textAnchor="middle" fill="#24485a" fontSize="33" fontWeight="700">
        温和、可控的交流电刺激
      </text>
    </svg>
  );
};

export const NetworkComparison = () => {
  return (
    <svg viewBox="0 0 920 420" style={{width: 920, height: 420, overflow: 'visible'}}>
      <NetworkGraph x={120} title="刺激前" active={false} />
      <NetworkGraph x={570} title="刺激后" active />
      <path d="M428 210 H492" stroke="#6c8898" strokeWidth="9" strokeLinecap="round" />
      <path d="M492 210 L468 188 M492 210 L468 232" stroke="#6c8898" strokeWidth="9" strokeLinecap="round" />
    </svg>
  );
};

const NetworkGraph = ({x, title, active}: {x: number; title: string; active: boolean}) => {
  const frame = useCurrentFrame();
  const pulse = interpolate(Math.sin(frame / 8), [-1, 1], [0.55, 1]);
  const nodes = [
    [x, 118],
    [x - 74, 218],
    [x + 88, 218],
    [x - 22, 310],
    [x + 126, 326],
  ];
  const lineColor = active ? `rgba(85, 211, 152, ${0.35 + pulse * 0.35})` : 'rgba(74, 113, 135, 0.22)';

  return (
    <g>
      <text x={x + 20} y={42} textAnchor="middle" fill="#24485a" fontSize="31" fontWeight="800">
        {title}
      </text>
      <circle cx={x + 22} cy={220} r="174" fill={active ? 'rgba(86,214,164,0.1)' : 'rgba(87,126,148,0.08)'} stroke="rgba(65,110,132,0.18)" strokeWidth="3" />
      {nodes.flatMap(([x1, y1], index) =>
        nodes.slice(index + 1).map(([x2, y2]) => (
          <path key={`${x1}-${y1}-${x2}-${y2}`} d={`M${x1} ${y1} L${x2} ${y2}`} stroke={lineColor} strokeWidth={active ? 7 : 4} strokeLinecap="round" />
        )),
      )}
      {nodes.map(([cx, cy], index) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={active && index % 2 === 0 ? 17 : 14} fill={active ? '#55d398' : '#87a5b4'} stroke="#fff" strokeWidth="5" />
      ))}
    </g>
  );
};
