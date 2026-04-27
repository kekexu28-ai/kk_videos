import type React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {captions} from '../captions';
import {colors, fontFamily, softShadow, textShadow} from '../styles';

export const SceneBackground = ({
  variant = 'tech',
  children,
}: {
  variant?: 'tech' | 'warm' | 'dark';
  children: React.ReactNode;
}) => {
  const frame = useCurrentFrame();
  const drift = interpolate(frame, [0, 120], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'extend',
  });
  const background =
    variant === 'warm'
      ? 'linear-gradient(135deg, #fff8ec 0%, #f0faf0 52%, #eaf7ff 100%)'
      : variant === 'dark'
        ? 'linear-gradient(135deg, #102333 0%, #143a4c 46%, #132f37 100%)'
        : 'linear-gradient(135deg, #eefaff 0%, #f6fbff 48%, #ecfff4 100%)';

  return (
    <AbsoluteFill
      style={{
        background,
        fontFamily,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          width: 680,
          height: 680,
          borderRadius: '50%',
          left: -180 + drift * 22,
          top: -240 + drift * 10,
          background:
            variant === 'warm'
              ? 'radial-gradient(circle, rgba(255,189,111,0.35), rgba(255,189,111,0))'
              : 'radial-gradient(circle, rgba(87,199,255,0.35), rgba(87,199,255,0))',
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: 820,
          height: 820,
          borderRadius: '50%',
          right: -260 - drift * 20,
          bottom: -320,
          background:
            variant === 'warm'
              ? 'radial-gradient(circle, rgba(255,224,156,0.45), rgba(255,224,156,0))'
              : 'radial-gradient(circle, rgba(88,214,200,0.32), rgba(88,214,200,0))',
        }}
      />
      <GridOverlay warm={variant === 'warm'} />
      {children}
    </AbsoluteFill>
  );
};

const GridOverlay = ({warm}: {warm: boolean}) => (
  <svg
    viewBox="0 0 1920 1080"
    style={{position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: warm ? 0.26 : 0.32}}
  >
    <defs>
      <pattern id={warm ? 'warmGrid' : 'techGrid'} width="96" height="96" patternUnits="userSpaceOnUse">
        <path d="M 96 0 L 0 0 0 96" fill="none" stroke={warm ? '#e3c894' : '#8ecce0'} strokeWidth="1.4" />
      </pattern>
    </defs>
    <rect width="1920" height="1080" fill={`url(#${warm ? 'warmGrid' : 'techGrid'})`} />
  </svg>
);

export const SceneTitle = ({
  eyebrow,
  title,
  accent,
}: {
  eyebrow: string;
  title: string;
  accent: string;
}) => {
  const frame = useCurrentFrame();
  const y = interpolate(frame, [0, 18], [28, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const opacity = interpolate(frame, [0, 16], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'absolute',
        left: 88,
        top: 70 + y,
        opacity,
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
      }}
    >
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 12,
          color: colors.muted,
          fontSize: 26,
          fontWeight: 700,
          letterSpacing: 0,
        }}
      >
        <span
          style={{
            width: 13,
            height: 13,
            borderRadius: 99,
            backgroundColor: accent,
            boxShadow: `0 0 26px ${accent}`,
          }}
        />
        {eyebrow}
      </div>
      <div
        style={{
          color: colors.ink,
          fontSize: 66,
          fontWeight: 800,
          letterSpacing: 0,
          textShadow: '0 10px 38px rgba(255,255,255,0.55)',
        }}
      >
        {title}
      </div>
    </div>
  );
};

export const GlassPanel = ({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) => (
  <div
    style={{
      background: colors.panel,
      border: '1px solid rgba(255,255,255,0.72)',
      boxShadow: softShadow,
      backdropFilter: 'blur(12px)',
      borderRadius: 26,
      ...style,
    }}
  >
    {children}
  </div>
);

export const CaptionOverlay = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const nowMs = (frame / fps) * 1000;
  const caption = captions.find((item) => nowMs >= item.startMs && nowMs < item.endMs);
  const fade = caption
    ? Math.min(
        interpolate(nowMs, [caption.startMs, caption.startMs + 260], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        }),
        interpolate(nowMs, [caption.endMs - 260, caption.endMs], [1, 0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        }),
      )
    : 0;

  return (
    <div
      style={{
        position: 'absolute',
        left: 210,
        right: 210,
        bottom: 72,
        minHeight: 98,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: fade,
      }}
    >
      <div
        style={{
          maxWidth: 1340,
          padding: '22px 34px',
          borderRadius: 18,
          background: 'rgba(13, 32, 45, 0.72)',
          color: '#fff',
          fontSize: 42,
          lineHeight: 1.28,
          fontWeight: 700,
          textAlign: 'center',
          textShadow,
          boxShadow: '0 18px 46px rgba(10, 27, 40, 0.28)',
        }}
      >
        {caption?.text}
      </div>
    </div>
  );
};

export const SceneProgress = () => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const width = interpolate(frame, [0, durationInFrames], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 9,
        background: 'rgba(20, 49, 68, 0.12)',
      }}
    >
      <div
        style={{
          width: `${width * 100}%`,
          height: '100%',
          background: `linear-gradient(90deg, ${colors.cyan}, ${colors.green}, ${colors.warm})`,
        }}
      />
    </div>
  );
};
