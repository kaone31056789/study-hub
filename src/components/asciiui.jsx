// Small ASCII-flavoured UI pieces for the ink theme.
import { useEffect, useRef, useState } from 'react';

const calm = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
const dark = () => document.documentElement.dataset.theme !== 'light';

/* Tap Reveal (VengeanceUI idea): content hidden under a shimmering pixel field; a tap dissolves it
   cell by cell outwards from the finger, then onReveal() fires. */
export function TapReveal({ onReveal, label = 'Recall the points first · tap to reveal' }) {
  const cv = useRef(null);
  useEffect(() => {
    const c = cv.current, g = c.getContext('2d'), B = 6;
    let raf = 0, W = 0, H = 0, cells = null, tap = null;
    const size = () => {
      const r = c.getBoundingClientRect(); W = c.offsetWidth; H = c.offsetHeight;
      const dpr = Math.min(2, devicePixelRatio || 1) * (r.width / W || 1);
      c.width = W * dpr; c.height = H * dpr; g.setTransform(dpr, 0, 0, dpr, 0, 0);
      cells = []; for (let y = 0; y < H; y += B) for (let x = 0; x < W; x += B) cells.push({ x, y, s: Math.random() * 6.28, k: Math.random() });
    };
    size();
    const draw = now => {
      raf = requestAnimationFrame(draw);
      const D = dark(), t = now / 1000;
      g.clearRect(0, 0, W, H);
      let alive = false;
      for (const q of cells) {
        let a = 0.55 + 0.35 * Math.sin(t * 3 + q.s);
        if (tap) {
          const d = Math.hypot(q.x - tap.x, q.y - tap.y) / Math.hypot(W, H) + q.k * 0.15, p = (now - tap.t) / 650;
          if (d < p) continue;
          if (d - p < 0.04) { g.fillStyle = 'rgba(217,69,43,.9)'; g.fillRect(q.x, q.y, B - 1, B - 1); alive = true; continue; }
        }
        alive = true;
        const v = D ? 30 + q.k * 40 : 200 + q.k * 40;
        g.fillStyle = `rgba(${v},${v - 3},${v - 6},${a})`;
        g.fillRect(q.x, q.y, B - 1, B - 1);
      }
      if (tap && !alive) { cancelAnimationFrame(raf); onReveal(); }
    };
    raf = requestAnimationFrame(draw);
    const down = e => {
      if (tap) return;
      const r = c.getBoundingClientRect(), z = r.width / W || 1;
      tap = { x: (e.clientX - r.left) / z, y: (e.clientY - r.top) / z, t: performance.now() };
      if (calm()) onReveal();
    };
    c.addEventListener('pointerdown', down);
    return () => { cancelAnimationFrame(raf); c.removeEventListener('pointerdown', down); };
  }, []);
  return (
    <div className="tap-reveal">
      <canvas ref={cv} role="button" tabIndex={0} aria-label={label} onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onReveal(); } }} />
      <span className="tap-label"><i aria-hidden="true">▒</i>{label}</span>
    </div>
  );
}

/* ASCII "thinking" loader for Ask AI: a kaomoji putting on its shades, a braille spinner and a
   bar of rising blocks. */
const FACES = ['( •_•)', '( •_•)>⌐■-■', '(⌐■_■)', '(⌐■_■)  ', '( •_•)  '];
const SPIN = '⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏', BARS = '▁▂▃▄▅▆▇█';
export function AsciiThinking({ label = 'Thinking', detail }) {
  const [t, setT] = useState(0);
  useEffect(() => { const id = setInterval(() => setT(n => n + 1), 90); return () => clearInterval(id); }, []);
  const bar = Array.from({ length: 18 }, (_, i) => BARS[Math.floor((Math.sin(t * 0.35 + i * 0.6) * 0.5 + 0.5) * 7.99)]).join('');
  return (
    <div className="ascii-think" role="status" aria-live="polite">
      <pre aria-hidden="true">{FACES[Math.floor(t / 9) % FACES.length].padEnd(12)}  {SPIN[t % SPIN.length]}{'\n'}{bar}</pre>
      <div><b>{label}{'.'.repeat(t % 4)}</b>{detail && <small>{detail}</small>}</div>
    </div>
  );
}

/* ASCII sync animation: phone ⇄ laptop with packets crossing both ways. */
export function SyncArt({ on = false }) {
  const [t, setT] = useState(0);
  useEffect(() => { if (calm()) return; const id = setInterval(() => setT(n => n + 1), 110); return () => clearInterval(id); }, []);
  const L = 16, a = t % L, b = L - 1 - ((t + 7) % L);
  const lane = p => Array.from({ length: L }, (_, i) => (i === p ? '◆' : i % 2 ? '·' : ' ')).join('');
  return (
    <pre className={'sync-art' + (on ? ' on' : '')} aria-hidden="true">{
`┌─────┐                  ┌───────────┐
│ ▓▓▓ │  ${lane(a)}  │ ▓▓▓▓▓▓▓▓▓ │
│ ▓▓▓ │  ${lane(b)}  │ ▓▓▓▓▓▓▓▓▓ │
│  ●  │                  └─────┬─────┘
└─────┘                  ══════╧══════`}</pre>
  );
}

/* Animated footer (VengeanceUI idea): an ASCII ink landscape lit by the cursor, big title below. */
const RAMP = ' .:-=+*#%@';
export function AsciiFooter({ title = 'Study Hub', line }) {
  const cv = useRef(null);
  useEffect(() => {
    const c = cv.current, g = c.getContext('2d'), CW = 7, CH = 11;
    let W = 0, H = 0, dpr = 1, raf = 0, mx = -999, my = -999, vis = false;
    const size = () => {
      const r = c.getBoundingClientRect(); W = c.offsetWidth; H = c.offsetHeight;
      dpr = Math.min(2, devicePixelRatio || 1) * (r.width / W || 1); c.width = W * dpr; c.height = H * dpr;
    };
    const draw = now => {
      const t = now / 1000, D = dark(), cols = Math.ceil(W / CW), rows = Math.ceil(H / CH);
      g.setTransform(dpr, 0, 0, dpr, 0, 0); g.clearRect(0, 0, W, H);
      g.font = '700 10px "JetBrains Mono",monospace'; g.textBaseline = 'top';
      for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) {
        const u = x / cols, v = y / rows;
        const ridge = 0.35 + 0.18 * Math.sin(u * 5 + 1) * Math.sin(u * 2.3) + 0.08 * Math.sin(u * 17 + t * 0.3);
        if (v < ridge) continue;
        const depth = (v - ridge) / (1 - ridge);
        let I = 0.18 + 0.3 * (1 - depth) + 0.1 * Math.sin(u * 40 + v * 30 + t);
        const d = Math.hypot(x * CW - mx, y * CH - my), lit = Math.max(0, 1 - d / 140);
        I += lit * 0.6;
        const ch = RAMP[Math.max(1, Math.min(RAMP.length - 1, Math.round(I * (RAMP.length - 1))))];
        g.fillStyle = lit > 0.05 ? `rgba(217,69,43,${0.4 + lit * 0.6})` : D ? `rgba(233,226,212,${0.12 + I * 0.4})` : `rgba(27,25,23,${0.12 + I * 0.4})`;
        g.fillText(ch, x * CW, y * CH);
      }
    };
    const loop = now => { raf = requestAnimationFrame(loop); if (now - (loop.l || 0) > 40) { loop.l = now; draw(now); } };
    const ro = new ResizeObserver(() => { size(); draw(performance.now()); }); ro.observe(c);
    const move = e => { const r = c.getBoundingClientRect(), z = r.width / W || 1; mx = (e.clientX - r.left) / z; my = (e.clientY - r.top) / z; };
    const leave = () => { mx = my = -999; };
    c.parentElement.addEventListener('pointermove', move); c.parentElement.addEventListener('pointerleave', leave);
    const io = new IntersectionObserver(([e]) => { vis = e.isIntersecting; cancelAnimationFrame(raf); if (vis && !calm()) raf = requestAnimationFrame(loop); });
    io.observe(c);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); };
  }, []);
  return (
    <footer className="ascii-foot">
      <canvas ref={cv} aria-hidden="true" />
      <div className="af-title">{title}</div>
      {line && <p className="af-line">{line}</p>}
    </footer>
  );
}

/* Small ASCII strip for subject cards: a drifting wave over an ASCII progress bar. */
const WAVE = ' .·:-=+*%@';
export function AsciiStrip({ pct = 0, label = '' }) {
  const el = useRef(null);
  const [t, setT] = useState(0);
  useEffect(() => {
    if (calm()) return;
    let id = 0;
    const io = new IntersectionObserver(([e]) => { clearInterval(id); if (e.isIntersecting) id = setInterval(() => setT(n => n + 1), 120); });
    io.observe(el.current);
    return () => { clearInterval(id); io.disconnect(); };
  }, []);
  const N = 46, fill = Math.round(pct * N);
  const wave = Array.from({ length: N }, (_, i) => WAVE[Math.max(0, Math.min(9, Math.round((Math.sin(i * 0.35 - t * 0.3) * 0.5 + 0.5) * (Math.sin(i * 0.11 + t * 0.07) * 0.3 + 0.7) * 9)))]).join('');
  return (
    <pre ref={el} className="ascii-strip" aria-hidden="true">
      <span className="as-w">{wave}</span>{'\n'}<span className="as-b">{'█'.repeat(fill)}</span><span className="as-e">{'░'.repeat(N - fill)}</span>{'\n'}<span className="as-l">{label}</span>
    </pre>
  );
}
