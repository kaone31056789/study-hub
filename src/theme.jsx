import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { flushSync } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { HugeiconsIcon } from '@hugeicons/react';
import { Sun03Icon, Moon02Icon } from '@hugeicons/core-free-icons';
import { store } from './store';
import { fxPalette } from './components/sakuga';

// Theme = saved choice, else the notebook light theme. Applied as <html data-theme="...">.
const subs = new Set();
let current = store.get('theme', null) || 'light';

const apply = () => {
  document.documentElement.dataset.theme = current;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', current === 'light' ? '#f7f5f1' : '#0e0d0c');
  fxPalette(current);
};
apply();

export const setTheme = t => { current = t; store.set('theme', t); apply(); subs.forEach(f => f()); };
// Theme switch "trip": the old page warps through colour (hue spin, RGB shear, blur) while the new
// theme opens as a circle from the tap point. View Transitions where supported; instant otherwise.
export function themeReveal(change, e) {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!document.startViewTransition || reduce) return change();
  const r = document.documentElement;
  r.style.setProperty('--vt-x', (e?.clientX ?? innerWidth - 60) + 'px');
  r.style.setProperty('--vt-y', (e?.clientY ?? 30) + 'px');
  r.classList.add('vt-trip');
  document.startViewTransition(() => flushSync(change)).finished.finally(() => r.classList.remove('vt-trip'));
}
export const useTheme = () => useSyncExternalStore(f => { subs.add(f); return () => subs.delete(f); }, () => current);

export function ThemeToggle() {
  const theme = useTheme();
  const light = theme === 'light';
  return (
    <button className="theme-btn" onClick={e => themeReveal(() => setTheme(light ? 'dark' : 'light'), e)} aria-label={light ? 'Switch to dark theme' : 'Switch to light theme'} title={light ? 'Dark theme' : 'Light theme'}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span key={theme} initial={{ rotate: -90, scale: 0.4, opacity: 0 }} animate={{ rotate: 0, scale: 1, opacity: 1 }} exit={{ rotate: 90, scale: 0.4, opacity: 0 }} transition={{ duration: 0.25 }} style={{ display: 'grid' }}>
          <HugeiconsIcon icon={light ? Moon02Icon : Sun03Icon} size={19} strokeWidth={1.9} />
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

// Skins: colour moods that work in both light and dark. [id, kanji, name, note, swatch colours]
const SKINS = [
  ['ink', '墨', 'Ink wash', 'sumi ink · vermilion', ['#0e0d0c', '#e9e2d4', '#d9452b']],
  ['matcha', '茶', 'Matcha', 'tea green · lattice', ['#121a12', '#f2f0e4', '#a3c45a']],
  ['sakura', '桜', 'Sakura', 'blossom pink · petals', ['#1b1217', '#fbf2f3', '#ff8fb1']],
  ['aizome', '藍', 'Aizome', 'indigo · gold rings', ['#0f1628', '#eef1f7', '#e8b64c']],
  ['kohaku', '琥', 'Kohaku', 'amber · dots', ['#1a140c', '#f7f0e2', '#f0a23b']],
];
let skin = store.get('skin', 'ink');
if (!SKINS.some(x => x[0] === skin)) skin = 'ink';   // old crt/blueprint/sepia choices
const applySkin = () => { document.documentElement.dataset.skin = skin; };
applySkin();
const skinSubs = new Set();
export const useSkin = () => useSyncExternalStore(f => { skinSubs.add(f); return () => skinSubs.delete(f); }, () => skin);
export function SkinToggle() {
  const s = useSyncExternalStore(f => { skinSubs.add(f); return () => skinSubs.delete(f); }, () => skin);
  const [open, setOpen] = useState(false);
  const wrap = useRef(null);
  useEffect(() => {
    if (!open) return;
    const off = e => { if (e.type === 'keydown' ? e.key === 'Escape' : !wrap.current?.contains(e.target)) setOpen(false); };
    addEventListener('pointerdown', off); addEventListener('keydown', off);
    return () => { removeEventListener('pointerdown', off); removeEventListener('keydown', off); };
  }, [open]);
  const cur = SKINS.find(x => x[0] === s) || SKINS[0];
  const pick = id => { skin = id; store.set('skin', id); applySkin(); skinSubs.forEach(f => f()); setOpen(false); };
  return (
    <div className="skin-wrap" ref={wrap}>
      <button className="theme-btn skin-btn" title={'Theme colours: ' + cur[2]} aria-label={'Theme colours, now ' + cur[2]} aria-expanded={open} aria-haspopup="true" onClick={() => setOpen(o => !o)}>
        <span aria-hidden="true">{cur[1]}</span>
      </button>
      {open && (
        <div className="skin-menu" role="menu">
          <p>Colours · light &amp; dark</p>
          {SKINS.map(([id, k, name, note, sw]) => (
            <button key={id} role="menuitemradio" aria-checked={id === s} className={'skin-opt' + (id === s ? ' on' : '')} onClick={e => { setOpen(false); themeReveal(() => pick(id), e); }}>
              <b style={{ color: sw[2] }} aria-hidden="true">{k}</b>
              <span><b>{name}</b><small>{note}</small></span>
              <span className="skin-sw" aria-hidden="true">{(current === 'light' ? [sw[1], sw[0], sw[2]] : sw).map(c => <i key={c} style={{ background: c }} />)}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
