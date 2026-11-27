import { useEffect, useRef } from 'react';

// React glue for the Sakuga VFX web components (public/sakuga-vfx, loaded in index.html).
// Each wrapper pushes React state into the element as a property ("from code" = no effects)
// and turns the element's DOM event back into a plain callback. Only a person's input plays the anime.

const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const optionsHtml = (opts, value) => opts.map(([v, l]) => `<option value="${esc(v)}"${v === value ? ' selected' : ''}>${esc(l)}</option>`).join('');

function useEl(props, event, handler) {
  const ref = useRef(null), fn = useRef(handler);
  fn.current = handler;
  useEffect(() => {
    const el = ref.current;
    for (const [k, v] of Object.entries(props)) if (v !== undefined && el[k] !== v) el[k] = v;
  });
  useEffect(() => {
    const el = ref.current, on = e => fn.current?.(e, el);
    el.addEventListener(event, on);
    return () => el.removeEventListener(event, on);
  }, [event]);
  return ref;
}

// Segmented filter -> <sakuga-tabs>. options: [[value, label]]. Options are read once, so a label change remounts it.
export function SkTabs({ value, options, onChange, label = 'Filter' }) {
  const idx = Math.max(0, options.findIndex(([v]) => v === value));
  const ref = useEl({ selected: idx }, 'change', e => onChange(options[e.detail.index][0]));
  return <sakuga-tabs key={options.map(o => o[1]).join('|')} ref={ref} label={label} selected={idx} dangerouslySetInnerHTML={{ __html: optionsHtml(options) }} />;
}

export function SkRadio({ value, options, onChange, label }) {
  const ref = useEl({ value: String(value) }, 'change', (e, el) => onChange(options.find(([v]) => String(v) === el.value)[0]));
  return <sakuga-radio ref={ref} label={label} dangerouslySetInnerHTML={{ __html: optionsHtml(options.map(([v, l]) => [String(v), l]), String(value)) }} />;
}

export function SkCheck({ checked, onChange, children }) {
  const ref = useEl({ checked }, 'change', (e, el) => onChange(el.checked));
  return <sakuga-checkbox ref={ref}>{children}</sakuga-checkbox>;
}

export function SkToggle({ checked, onChange, label }) {
  const ref = useEl({ checked }, 'change', (e, el) => onChange(el.checked));
  return <sakuga-toggle ref={ref} label={label} />;
}

export function SkInput({ value, onChange, label, placeholder, type = 'search' }) {
  const ref = useEl({ value }, 'input', (e, el) => onChange(el.value));
  return <sakuga-input ref={ref} label={label} placeholder={placeholder} type={type} />;
}

export function SkSlider({ value, onChange, label, min, max, step, unit = '' }) {
  const ref = useEl({ value: String(value) }, 'change', (e, el) => onChange(el.valueAsNumber));
  // value given at creation → the spring starts there (setting it after mount slides the thumb and throws clouds)
  return <sakuga-slider ref={ref} label={label} min={min} max={max} step={step} unit={unit} value={String(value)} />;
}

export function SkRating({ value, onChange, label }) {
  const ref = useEl({ value }, 'change', (e, el) => onChange(+el.value));
  return <sakuga-rating ref={ref} label={label} />;
}

export function SkProgress({ value, label }) {
  const ref = useRef(null);
  useEffect(() => { ref.current?.set?.(value); }, [value]);
  return <sakuga-progress ref={ref} label={label} />;
}

export const SkTooltip = ({ text, label, children }) => <sakuga-tooltip text={text} label={label}>{children}</sakuga-tooltip>;

// Primary action -> <sakuga-button>. `done` lands the check after the impact.
export function SkButton({ onClick, done, variant, children }) {
  const ref = useEl({}, 'click', onClick);
  useEffect(() => { if (done) ref.current?.done?.(0); }, [done]);
  return <sakuga-button ref={ref} variant={variant}>{children}</sakuga-button>;
}

// ---------- Pixel Worlds (public/pixel-worlds, MIT): controls with a living pixel scene inside ----------
// State goes in through attributes and methods only.

// Send button: the raven flies while the request runs and lands when it's back.
export function PwRaven({ onSend, busy, label = 'Send' }) {
  const ref = useRef(null), was = useRef(false), send = useRef(onSend);
  send.current = onSend;
  useEffect(() => {
    const el = ref.current;
    el.setAttribute('progress', '0');
    const click = () => send.current();
    const landed = () => setTimeout(() => { el.reset(); el.setAttribute('progress', '0'); }, 700);
    el.addEventListener('click', click); el.addEventListener('raven:sent', landed);
    return () => { el.removeEventListener('click', click); el.removeEventListener('raven:sent', landed); };
  }, []);
  useEffect(() => {
    if (busy) ref.current.setAttribute('progress', '0.65');
    else if (was.current) ref.current.setAttribute('progress', '1');
    was.current = busy;
  }, [busy]);
  return <raven-send ref={ref} label={label} sent-label="Answered" />;
}

// Agent status: a wizard acting out the state. `state` is getter-only on the element, so go through set().
export function PwSage({ state = 'thinking', label, detail }) {
  const ref = useRef(null);
  useEffect(() => { ref.current?.set?.(state, label, detail); }, [state, label, detail]);
  return <sage-status ref={ref} />;
}

// Value 0..1 drives the scene; without one it would play its demo, so always give one.
function usePwValue(value) {
  const ref = useRef(null);
  useEffect(() => { ref.current?.set?.(value); }, [value]);
  return ref;
}
export function PwRound({ value, label }) { return <round-bar ref={usePwValue(value)} label={label} />; }
export function PwSigil({ value = null, label }) { return <sigil-spinner ref={usePwValue(value)} label={label} />; }

// Hold-to-delete: the dragon's fire is the progress. onDelete fires once, when the hold completes.
export function PwHoard({ onDelete, label, doneLabel }) {
  const ref = useRef(null), fn = useRef(onDelete);
  fn.current = onDelete;
  useEffect(() => {
    const el = ref.current, on = () => fn.current();
    el.addEventListener('hoard:delete', on);
    return () => el.removeEventListener('hoard:delete', on);
  }, []);
  return <hoard-button ref={ref} label={label} done-label={doneLabel} />;
}

// One shared toast for the whole app: toast('Saved!')
let toastEl;
export function toast(msg) {
  if (!toastEl) {
    toastEl = document.createElement('sakuga-toast');
    toastEl.className = 'sk-toast';
    document.body.append(toastEl);
  }
  requestAnimationFrame(() => toastEl.show?.(msg));
}

// Free-standing hit (no control): ink burst + chips + a word, e.g. when a topic circle is ticked.
export function fxHit(x, y, word = 'pon') {
  const fx = window.SakugaFX;
  if (!fx || fx.calm) return;
  const px = x + scrollX, py = y + scrollY;
  fx.burst(px, py, { r: 46, spikes: 13, life: 0.4 });
  fx.shards(px, py, { n: 7, speed: 200, size: 7, life: 0.8, arc: 6.28, grav: 260 });
  fx.sfx(word, px + 26, py - 34, { size: 46 });
}

// Small reactions for everyday interactions, each sized to the moment. All no-ops under reduced motion.
const at = el => { const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2 + scrollX, y: r.top + r.height / 2 + scrollY, w: r.width, h: r.height }; };
export const fx = {
  right(el) { const f = window.SakugaFX; if (!f || f.calm || !el) return; const c = at(el); f.burst(c.x + c.w / 2 - 20, c.y, { r: 34, spikes: 11, life: 0.35 }); f.kira(c.x + c.w / 2 - 20, c.y - 6, {}); f.sfx('pon', c.x + c.w / 2 - 10, c.y - 34, { size: 40 }); },
  wrong(el) { const f = window.SakugaFX; if (!f || f.calm || !el) return; const c = at(el); f.wob(c.x - c.w / 2 - 6, c.y, { dir: -1, r: 10, life: 0.35 }); f.wob(c.x + c.w / 2 + 6, c.y, { dir: 1, r: 10, life: 0.35 }); f.sfx('zuza', c.x + c.w / 2 - 30, c.y - 30, { size: 46, dots: true }); },
  swish(el) { const f = window.SakugaFX; if (!f || f.calm || !el) return; const c = at(el); f.lines(c.x, c.y, { n: 5, dir: 0, len: c.w * 0.35, spread: c.h * 0.35, life: 0.3 }); f.sfx('shu', c.x + c.w / 2 - 30, c.y - c.h / 2, { size: 44 }); },
  tick(el) { const f = window.SakugaFX; if (!f || f.calm || !el) return; const c = at(el); f.ticks(c.x, c.y - c.h / 2 - 4, { dir: -Math.PI / 2, n: 3, r: 4, len: 12, fan: 0.5 }); f.puff(c.x, c.y + c.h / 2, { n: 3, size: 8 }); },
  boom(el) { const f = window.SakugaFX; if (!f || f.calm || !el) return; const c = at(el); f.burst(c.x, c.y, { r: 90, spikes: 17, life: 0.5 }); f.shards(c.x, c.y, { n: 12, speed: 260, size: 9, life: 0.95, arc: 6.28, grav: 300 }); f.sfx('don', c.x + 40, c.y - 70, { size: 70 }); }
};

// Effects palette (drawn on the canvas, so CSS variables can't reach it). Called by the theme switch.
const INK = { fill: '#1b1916', shade: '#48433d', line: '#e9e2d4', accent: '#d9452b', ink: '#e9e2d4', sfx: ['#e9e2d4', '#0e0d0c'] };
const PAPER = { fill: '#ffffff', shade: '#cfd8ff', line: '#15142b', accent: '#ff5d8f', ink: '#15142b', sfx: ['#15142b', '#ffffff'] };
export function fxPalette(theme) {
  const P = window.SakugaFX?.P;
  if (!P) return;
  const src = theme === 'light' ? PAPER : INK;
  Object.assign(P, src, { sfx: [...src.sfx] });
}
