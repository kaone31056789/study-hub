// Weak-topic tracker: wrong answers / low mock scores push a topic up the "revise first" list.
import { store } from './store';

const key = sid => sid + ':weak';
export function bumpWeak(sid, id, delta) {
  if (!id) return;
  const w = store.get(key(sid), {});
  const v = Math.max(0, Math.round(((w[id] || 0) + delta) * 10) / 10);
  if (v) w[id] = v; else delete w[id];
  store.set(key(sid), w);
}
export const weakList = sid => Object.entries(store.get(key(sid), {})).filter(([, v]) => v > 0).sort((a, b) => b[1] - a[1]);
export const clearWeak = sid => store.set(key(sid), {});

// Spaced repetition (Leitner boxes) for flashcards.
export const SRS_STEPS = [10 * 60e3, 864e5, 3 * 864e5, 7 * 864e5, 15 * 864e5]; // 10 min, 1, 3, 7, 15 days
const srsKey = sid => sid + ':srs';
export const getSrs = sid => store.get(srsKey(sid), {});
export function gradeCard(sid, q, knewIt) {
  const s = getSrs(sid);
  const box = knewIt ? Math.min((s[q]?.box ?? 0) + 1, SRS_STEPS.length - 1) : 0;
  s[q] = { box, due: Date.now() + SRS_STEPS[knewIt ? box : 0] };
  store.set(srsKey(sid), s);
  return s;
}

// Quiz mistakes become flashcards ("Fix these" deck in Cards). A right answer later removes it.
const mk = sid => sid + ':mistakes';
export const getMistakes = sid => store.get(mk(sid), []);
export function noteMistake(sid, q, unit, ok) {
  let m = getMistakes(sid).filter(x => x.q !== q.q);
  if (!ok) m = [{ q: q.q, a: `<b>${q.o[q.a]}</b>${q.why ? '<br>' + q.why : ''}`, u: unit, tid: q.tid }, ...m].slice(0, 80);
  store.set(mk(sid), m);
}
export const dropMistake = (sid, q) => store.set(mk(sid), getMistakes(sid).filter(x => x.q !== q));
