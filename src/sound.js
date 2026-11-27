// Tiny synthesized sounds (Web Audio, no files) + phone vibration. On by default, quiet, with a
// mute toggle in the header. Sounds: drop (ink drop on tap), flip (paper card), stamp (seal thud),
// chime (something done), tick (timer). haptic() vibrates on Android.
import { useSyncExternalStore } from 'react';
import { store } from './store';

let on = store.get('sound', true), ac = null;
const subs = new Set();
export const setSound = v => { on = v; store.set('sound', v); subs.forEach(f => f()); };
export const useSound = () => useSyncExternalStore(f => { subs.add(f); return () => subs.delete(f); }, () => on);

const ctx = () => {
  if (!ac) { const A = window.AudioContext || window.webkitAudioContext; if (!A) return null; ac = new A(); }
  if (ac.state === 'suspended') ac.resume();
  return ac;
};
const tone = (a, { f0, f1 = f0, dur, vol, type = 'sine', at = 0 }) => {
  const o = a.createOscillator(), g = a.createGain(), t = a.currentTime + at;
  o.type = type; o.frequency.setValueAtTime(f0, t); o.frequency.exponentialRampToValueAtTime(f1, t + dur);
  g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + 0.008); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g).connect(a.destination); o.start(t); o.stop(t + dur + 0.02);
};
let noiseBuf = null;
const noise = (a, { dur, vol, freq, q = 0.8, type = 'bandpass' }) => {
  if (!noiseBuf) { noiseBuf = a.createBuffer(1, a.sampleRate * 0.5, a.sampleRate); const d = noiseBuf.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1; }
  const s = a.createBufferSource(), fl = a.createBiquadFilter(), g = a.createGain(), t = a.currentTime;
  s.buffer = noiseBuf; fl.type = type; fl.frequency.value = freq; fl.Q.value = q;
  g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  s.connect(fl).connect(g).connect(a.destination); s.start(t); s.stop(t + dur);
};

export function sfx(kind) {
  if (!on) return;
  const a = ctx(); if (!a) return;
  if (kind === 'drop') { tone(a, { f0: 1100 + Math.random() * 300, f1: 320, dur: 0.16, vol: 0.05 }); }
  else if (kind === 'flip') { noise(a, { dur: 0.14, vol: 0.12, freq: 2600 }); noise(a, { dur: 0.08, vol: 0.06, freq: 900, q: 0.5 }); }
  else if (kind === 'stamp') { tone(a, { f0: 150, f1: 55, dur: 0.22, vol: 0.3 }); noise(a, { dur: 0.12, vol: 0.15, freq: 400, type: 'lowpass' }); }
  else if (kind === 'chime') { tone(a, { f0: 880, dur: 0.5, vol: 0.06 }); tone(a, { f0: 1320, dur: 0.6, vol: 0.04, at: 0.07 }); }
  else if (kind === 'tick') { tone(a, { f0: 2000, f1: 1800, dur: 0.03, vol: 0.03, type: 'square' }); }
}
export const haptic = ms => { if (on) navigator.vibrate?.(ms); };
