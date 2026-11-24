// Audio mode: read text aloud with the browser's built-in voices.
import { useEffect, useState } from 'react';

const plainText = h => String(h || '').replace(/<[^>]+>/g, ' ').replace(/&[a-z]+;/g, ' ').replace(/[`*]/g, '').replace(/\s+/g, ' ').trim();
// Chrome stops long utterances, so speak sentence-sized chunks.
const chunks = text => plainText(text).match(/[^.!?।]+[.!?।]*/g)?.map(s => s.trim()).filter(Boolean) || [];

export function useSpeech() {
  const ok = typeof window !== 'undefined' && 'speechSynthesis' in window;
  const [state, setState] = useState('idle'); // idle | playing | paused
  useEffect(() => () => { if (ok) window.speechSynthesis.cancel(); }, [ok]);
  const play = (parts, rate = 1) => {
    if (!ok) return;
    const ss = window.speechSynthesis;
    ss.cancel();
    const voices = ss.getVoices();
    const voice = voices.find(v => v.lang === 'en-IN') || voices.find(v => v.lang === 'hi-IN') || voices.find(v => v.lang.startsWith('en'));
    const list = parts.flatMap(chunks);
    if (!list.length) return;
    list.forEach((t, i) => {
      const u = new SpeechSynthesisUtterance(t);
      if (voice) { u.voice = voice; u.lang = voice.lang; }
      u.rate = rate;
      if (i === list.length - 1) u.onend = () => setState('idle');
      ss.speak(u);
    });
    setState('playing');
  };
  const pause = () => { if (!ok) return; window.speechSynthesis.pause(); setState('paused'); };
  const resume = () => { if (!ok) return; window.speechSynthesis.resume(); setState('playing'); };
  const stop = () => { if (!ok) return; window.speechSynthesis.cancel(); setState('idle'); };
  return { ok, state, play, pause, resume, stop };
}
export { plainText };
