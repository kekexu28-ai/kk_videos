# Stroke EEG tACS Remotion Video Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a 16:9 1080p Remotion micro-video from the approved stroke EEG + tACS design spec.

**Architecture:** Create a small Remotion project in the repository root. Keep timeline data, captions, scene components, character illustrations, EEG/tACS visualizations, and shared styles in separate focused files so the script can be revised without rewriting animation code.

**Tech Stack:** Remotion, React, TypeScript, CSS-in-TS inline styles/SVG, structured caption JSON.

---

### Task 1: Project Scaffold

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `remotion.config.ts`
- Create: `src/index.ts`
- Create: `src/Root.tsx`

- [ ] Add Remotion scripts for `studio`, `render`, `still`, `typecheck`, and `build`.
- [ ] Register a `StrokeRehabExplainer` composition at 1920x1080, 30 fps, about 132 seconds.

### Task 2: Script And Captions

**Files:**
- Create: `src/video/script.ts`
- Create: `src/video/captions.ts`

- [ ] Encode the approved narration and scene timings from the design document.
- [ ] Store subtitles as objects compatible with Remotion caption timing: `text`, `startMs`, `endMs`, `timestampMs`, `confidence`.
- [ ] Keep deleted narration lines out: no “实验任务以...” and no “本片不展示具体刺激参数”.
- [ ] Use the revised project-flow line: “数据用于辅助理解运动功能恢复情况。”

### Task 3: Visual Components

**Files:**
- Create: `src/video/components/Characters.tsx`
- Create: `src/video/components/BrainVisuals.tsx`
- Create: `src/video/components/DataDisplays.tsx`
- Create: `src/video/components/Layout.tsx`

- [ ] Draw polished anime-style patient and researcher as scalable SVG/HTML components.
- [ ] Patient must be distinct: wheelchair, dignified older look, realistic EEG cap with net/grid electrodes and wire bundle.
- [ ] Researcher must be distinct: white lab coat, badge/tablet, professional posture.
- [ ] Draw animated brain activity, EEG waveforms, tACS current, and brain-network comparison visuals.

### Task 4: Timeline Composition

**Files:**
- Create: `src/video/StrokeRehabExplainer.tsx`
- Create: `src/video/styles.ts`

- [ ] Implement six timed scenes: question opening, stroke/EEG, motor imagery EEG, tACS, pre/post analysis, warm ending.
- [ ] Use blue-green technology palette for main scenes and warm hopeful palette for the ending.
- [ ] Render full-time Chinese subtitles at the bottom with readable contrast.
- [ ] Avoid real human footage and avoid any claim of immediate treatment effect.

### Task 5: Verification And Rendering

**Files:**
- Output: `out/stroke-eeg-tacs-explainer.mp4`
- Output: `out/stills/frame-*.png`

- [ ] Run `npm install` if dependencies are missing.
- [ ] Run `npm run typecheck`.
- [ ] Render at least one still frame from key moments.
- [ ] Render the final MP4 when the project compiles.
- [ ] Inspect output paths and summarize any rendering limitations.
