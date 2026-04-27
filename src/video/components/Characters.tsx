import {interpolate, useCurrentFrame} from 'remotion';

type CharacterProps = {
  scale?: number;
  mood?: 'neutral' | 'hopeful' | 'thinking';
  showCap?: boolean;
  gentleHand?: boolean;
};

export const PatientCharacter = ({
  scale = 1,
  mood = 'neutral',
  showCap = true,
  gentleHand = false,
}: CharacterProps) => {
  const frame = useCurrentFrame();
  const breathe = Math.sin(frame / 24) * 3;
  const handLift = gentleHand
    ? interpolate(frame % 90, [0, 48, 90], [0, -24, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      })
    : interpolate(frame % 80, [0, 42, 80], [0, -8, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      });

  return (
    <svg
      viewBox="0 0 520 620"
      style={{
        width: 520 * scale,
        height: 620 * scale,
        overflow: 'visible',
      }}
    >
      <defs>
        <linearGradient id="skinPatient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffd9c2" />
          <stop offset="1" stopColor="#f2ad91" />
        </linearGradient>
        <linearGradient id="patientTop" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffd8e2" />
          <stop offset="1" stopColor="#f6a7bf" />
        </linearGradient>
        <linearGradient id="wheelMetal" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7f94a4" />
          <stop offset="1" stopColor="#405667" />
        </linearGradient>
        <filter id="patientSoft" x="-20%" y="-20%" width="140%" height="150%">
          <feDropShadow dx="0" dy="20" stdDeviation="18" floodColor="#123147" floodOpacity="0.22" />
        </filter>
      </defs>

      <ellipse cx="250" cy="570" rx="190" ry="28" fill="#8ea2ad" opacity="0.2" />

      <g filter="url(#patientSoft)">
        <circle cx="230" cy="430" r="104" fill="none" stroke="url(#wheelMetal)" strokeWidth="18" />
        <circle cx="230" cy="430" r="64" fill="none" stroke="#c9d8e0" strokeWidth="8" />
        <path d="M156 430 H316" stroke="#5a7282" strokeWidth="12" strokeLinecap="round" />
        <path d="M316 412 L392 488" stroke="#5a7282" strokeWidth="11" strokeLinecap="round" />
        <path d="M158 528 H330" stroke="#5a7282" strokeWidth="12" strokeLinecap="round" />
        <path d="M300 526 L365 585" stroke="#425968" strokeWidth="10" strokeLinecap="round" />
      </g>

      <g transform={`translate(0 ${breathe})`}>
        <path
          d="M163 257 C132 303 128 370 174 409 C211 438 292 438 330 404 C377 360 354 297 316 255 Z"
          fill="url(#patientTop)"
          stroke="#e78ca8"
          strokeWidth="7"
        />
        <path
          d="M174 276 C206 301 285 306 320 277"
          fill="none"
          stroke="#f2bbcb"
          strokeWidth="11"
          strokeLinecap="round"
        />
        <path d="M206 399 C226 428 270 429 292 400" fill="none" stroke="#dc7f9a" strokeWidth="8" strokeLinecap="round" />

        <path
          d="M171 316 C116 334 83 381 76 440"
          fill="none"
          stroke="#f0a8b6"
          strokeWidth="26"
          strokeLinecap="round"
        />
        <path
          d={`M315 316 C360 342 390 374 412 ${424 + handLift}`}
          fill="none"
          stroke="#f0a8b6"
          strokeWidth="26"
          strokeLinecap="round"
        />
        <circle cx="74" cy="445" r="17" fill="url(#skinPatient)" />
        <g transform={`translate(412 ${424 + handLift})`}>
          <ellipse cx="0" cy="0" rx="19" ry="15" fill="url(#skinPatient)" />
          <path d="M8 -8 C25 -18 34 -9 20 2" stroke="#f2ad91" strokeWidth="5" fill="none" strokeLinecap="round" />
          <path d="M9 1 C28 -5 34 7 17 12" stroke="#f2ad91" strokeWidth="5" fill="none" strokeLinecap="round" />
        </g>

        <circle cx="250" cy="158" r="78" fill="url(#skinPatient)" stroke="#df9b80" strokeWidth="6" />
        <path
          d="M179 160 C168 84 306 68 327 150 C298 120 226 116 179 160 Z"
          fill="#654136"
        />
        <path d="M190 126 C218 90 284 90 316 128" fill="none" stroke="#8b5a47" strokeWidth="9" strokeLinecap="round" opacity="0.7" />
        <circle cx="220" cy="170" r="8" fill="#473640" />
        <circle cx="282" cy="170" r="8" fill="#473640" />
        <path
          d={mood === 'hopeful' ? 'M225 198 C242 213 269 213 285 198' : 'M228 200 C244 210 266 210 282 200'}
          fill="none"
          stroke="#b96b6a"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path d="M249 176 C244 188 245 193 255 195" fill="none" stroke="#d8947b" strokeWidth="4" strokeLinecap="round" />

        {showCap ? <EegCap /> : null}
      </g>
    </svg>
  );
};

const EegCap = () => {
  const frame = useCurrentFrame();
  const pulse = interpolate(Math.sin(frame / 8), [-1, 1], [0.82, 1.08]);
  const electrodes = [
    [194, 130],
    [219, 108],
    [250, 101],
    [282, 108],
    [307, 130],
    [204, 158],
    [234, 148],
    [268, 148],
    [297, 158],
    [218, 184],
    [250, 188],
    [282, 184],
  ];

  return (
    <g>
      <path
        d="M176 156 C176 84 326 84 326 156 L321 196 C285 178 215 178 181 196 Z"
        fill="#172536"
        opacity="0.96"
      />
      <path d="M188 145 C219 112 283 112 313 145" fill="none" stroke="#7d95a8" strokeWidth="5" strokeLinecap="round" />
      <path d="M184 172 C223 151 280 151 318 172" fill="none" stroke="#7d95a8" strokeWidth="5" strokeLinecap="round" />
      <path d="M209 108 C196 139 196 169 204 197" fill="none" stroke="#7d95a8" strokeWidth="5" strokeLinecap="round" />
      <path d="M251 94 C247 130 247 165 251 201" fill="none" stroke="#7d95a8" strokeWidth="5" strokeLinecap="round" />
      <path d="M293 108 C307 140 306 170 299 197" fill="none" stroke="#7d95a8" strokeWidth="5" strokeLinecap="round" />
      {electrodes.map(([cx, cy], index) => (
        <circle
          key={`${cx}-${cy}`}
          cx={cx}
          cy={cy}
          r={index % 3 === 0 ? 9 * pulse : 8}
          fill="#f7cb4b"
          stroke="#fff3b7"
          strokeWidth="3"
        />
      ))}
      <path d="M177 190 C168 239 181 282 212 316" fill="none" stroke="#263949" strokeWidth="7" strokeLinecap="round" />
      <path d="M323 188 C348 234 345 281 310 318" fill="none" stroke="#263949" strokeWidth="7" strokeLinecap="round" />
      <path d="M317 136 C370 133 402 154 428 192" fill="none" stroke="#263949" strokeWidth="7" strokeLinecap="round" />
      <path d="M428 192 C448 224 460 256 470 295" fill="none" stroke="#2d9ad0" strokeWidth="5" strokeLinecap="round" />
      <circle cx="470" cy="298" r="9" fill="#2d9ad0" />
    </g>
  );
};

export const ResearcherCharacter = ({scale = 1}: {scale?: number}) => {
  const frame = useCurrentFrame();
  const bob = Math.sin(frame / 30) * 2.4;

  return (
    <svg
      viewBox="0 0 430 620"
      style={{
        width: 430 * scale,
        height: 620 * scale,
        overflow: 'visible',
      }}
    >
      <defs>
        <linearGradient id="skinResearcher" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffd8c0" />
          <stop offset="1" stopColor="#efa98c" />
        </linearGradient>
        <linearGradient id="coat" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#e6f1f6" />
        </linearGradient>
        <filter id="researcherSoft" x="-20%" y="-20%" width="140%" height="150%">
          <feDropShadow dx="0" dy="20" stdDeviation="18" floodColor="#123147" floodOpacity="0.18" />
        </filter>
      </defs>

      <ellipse cx="210" cy="576" rx="132" ry="24" fill="#7e98a7" opacity="0.18" />
      <g transform={`translate(0 ${bob})`} filter="url(#researcherSoft)">
        <path d="M137 260 C105 320 96 430 119 532 L297 532 C321 430 310 319 277 260 Z" fill="url(#coat)" stroke="#bfd2dd" strokeWidth="7" />
        <path d="M175 268 L212 374 L249 268" fill="none" stroke="#58a9bc" strokeWidth="8" strokeLinecap="round" />
        <path d="M162 264 L210 530" stroke="#d4e3eb" strokeWidth="5" />
        <path d="M257 264 L214 530" stroke="#d4e3eb" strokeWidth="5" />
        <rect x="258" y="346" width="72" height="90" rx="14" fill="#173548" stroke="#5e8395" strokeWidth="5" />
        <rect x="271" y="360" width="46" height="10" rx="5" fill="#6fd6f6" />
        <rect x="271" y="382" width="32" height="8" rx="4" fill="#83e2aa" />

        <path d="M139 308 C80 335 55 384 47 450" stroke="url(#coat)" strokeWidth="36" fill="none" strokeLinecap="round" />
        <path d="M279 309 C328 335 358 384 377 451" stroke="url(#coat)" strokeWidth="36" fill="none" strokeLinecap="round" />
        <circle cx="47" cy="452" r="20" fill="url(#skinResearcher)" />
        <circle cx="378" cy="453" r="20" fill="url(#skinResearcher)" />

        <path d="M144 532 L112 604" stroke="#49505a" strokeWidth="20" strokeLinecap="round" />
        <path d="M276 532 L305 604" stroke="#49505a" strokeWidth="20" strokeLinecap="round" />

        <circle cx="210" cy="154" r="76" fill="url(#skinResearcher)" stroke="#dc9679" strokeWidth="6" />
        <path d="M139 149 C153 63 268 54 292 143 C263 109 193 110 139 149 Z" fill="#7a4636" />
        <path d="M159 118 C190 76 254 78 280 119" fill="none" stroke="#a7654c" strokeWidth="10" strokeLinecap="round" opacity="0.72" />
        <path d="M146 176 C118 195 119 241 154 249" fill="#7a4636" />
        <path d="M278 174 C306 196 303 239 270 250" fill="#7a4636" />
        <circle cx="183" cy="161" r="9" fill="#382c34" />
        <circle cx="238" cy="161" r="9" fill="#382c34" />
        <path d="M187 193 C204 209 229 208 245 193" fill="none" stroke="#bc6868" strokeWidth="5" strokeLinecap="round" />
        <path d="M210 168 C204 181 205 187 215 190" fill="none" stroke="#d69179" strokeWidth="4" strokeLinecap="round" />
        <path d="M162 229 C184 250 237 251 261 229" fill="none" stroke="#4f8ea7" strokeWidth="5" strokeLinecap="round" />
        <rect x="128" y="95" width="164" height="22" rx="9" fill="#edf7fb" stroke="#4f9bb6" strokeWidth="5" />
      </g>
    </svg>
  );
};
