import type {Caption} from '@remotion/captions';
import {narration} from './script';

export const captions: Caption[] = narration.map((item) => ({
  text: item.text,
  startMs: item.start * 1000,
  endMs: item.end * 1000,
  timestampMs: null,
  confidence: null,
}));
