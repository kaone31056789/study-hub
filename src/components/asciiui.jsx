// Small ASCII-flavoured UI pieces for the ink theme.
import { useEffect, useRef, useState } from 'react';

const calm = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
const dark = () => document.documentElement.dataset.theme !== 'light';
// the active skin's accent / text colour as "r,g,b" for canvas fills
const rgbVar = (k, fb) => { const m = /^#([0-9a-f]{6})$/i.exec(getComputedStyle(document.documentElement).getPropertyValue(k).trim()); if (!m) return fb; const n = parseInt(m[1], 16); return [n >> 16, (n >> 8) & 255, n & 255].join(','); };

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
          if (d - p < 0.04) { g.fillStyle = `rgba(${rgbVar('--accent', '217,69,43')},.9)`; g.fillRect(q.x, q.y, B - 1, B - 1); alive = true; continue; }
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
      const t = now / 1000, D = dark(), cols = Math.ceil(W / CW), rows = Math.ceil(H / CH), A = rgbVar('--accent', '217,69,43'), T = rgbVar('--text', D ? '233,226,212' : '27,25,23');
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
        g.fillStyle = lit > 0.05 ? `rgba(${A},${0.4 + lit * 0.6})` : `rgba(${T},${0.12 + I * 0.4})`;
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

/* ASCII readout for subject cards: a braille waveform, one ⅛-block progress row per unit with a
   sweeping highlight, and a blinking terminal line. Animates only while on screen. */
const BR = '⠀⣀⣤⣶⣿', PART = ' ▏▎▍▌▋▊▉█';
export function AsciiStrip({ units = [], done = 0, total = 0 }) {
  const el = useRef(null);
  const [t, setT] = useState(0);
  useEffect(() => {
    if (calm()) return;
    let id = 0;
    const io = new IntersectionObserver(([e]) => { clearInterval(id); if (e.isIntersecting) id = setInterval(() => setT(n => n + 1), 110); });
    io.observe(el.current);
    return () => { clearInterval(id); io.disconnect(); };
  }, []);
  const [N, setN] = useState(22);
  useEffect(() => {                                   // bars span the whole row: chars = row width / glyph width
    const bar = el.current?.querySelector('.as-bar'); if (!bar) return;
    const g = document.createElement('canvas').getContext('2d');
    const fit = () => { g.font = getComputedStyle(bar).font; const cw = g.measureText('█').width || 7; setN(Math.max(8, Math.floor(bar.clientWidth / cw))); };
    const ro = new ResizeObserver(fit); ro.observe(bar); document.fonts?.ready.then(fit);
    return () => ro.disconnect();
  }, [units.length]);
  const sweep = t % (N + 12);
  const wave = Array.from({ length: 34 }, (_, i) => BR[Math.round((Math.sin(i * 0.42 - t * 0.35) * 0.5 + 0.5) * (Math.sin(i * 0.13 + t * 0.05) * 0.35 + 0.65) * 4)]).join('');
  const bar = p => { const f = p * N, full = Math.floor(f), rem = Math.round((f - full) * 8); return '█'.repeat(full) + (full < N ? PART[rem] : '') + '·'.repeat(Math.max(0, N - full - 1)); };
  const pct = total ? Math.round(done / total * 100) : 0;
  return (
    <div ref={el} className="ascii-strip" aria-label={`${done} of ${total} topics learned`}>
      <div className="as-top" aria-hidden="true"><span className="as-w">{wave}</span><span className="as-p">{String(pct).padStart(3, ' ')}%</span></div>
      {units.map(u => (
        <div key={u.u} className="as-row" aria-hidden="true">
          <b>U{u.u}</b>
          <span className="as-bar">{bar(u.total ? u.done / u.total : 0).split('').map((c, i) => <i key={i} className={Math.abs(i - sweep + 6) < 2 ? 'hi' : ''}>{c}</i>)}</span>
          <span className="as-n">{String(u.done).padStart(2, '0')}/{String(u.total).padStart(2, '0')}</span>
        </div>
      ))}
      <div className="as-l" aria-hidden="true">&gt; {done === total && total ? 'all topics learned. revise & rest' : `${total - done} topics to go`}<span className="as-cur">▌</span></div>
    </div>
  );
}

/* ASCII sketch for a flashcard, picked from the question's keywords (first match wins). */
const ART = [
  [/wavelet|haar|v_?j|v<sub>j|scaling fun|multiresolution|subband|sub-band/i,
`┌──┬──┬─────┐
│LL│LH│     │
├──┼──┤ LH  │
│HL│HH│     │
├──┴──┼─────┤
│ HL  │ HH  │
└─────┴─────┘`],
  [/histogram|equali[sz]|cdf/i,
`      ▃▆█▆▃
   ▂▅███████▅▂   ▁▃▂
 ▁▃█████████████▅███▃▁
 └─────────────────────▶ r`],
  [/split|merge|quadtree/i,
`┌─────┬─────┐
│     ├──┬──┤
│     ├──┼──┤
├─────┼──┴──┤
│     │     │
└─────┴─────┘`],
  [/hough/i,
`  y│    ╱  ρ = x cosθ + y sinθ
   │  ╱
   │╱ θ
───┼───────▶ x`],
  [/segment|threshold|otsu|region/i,
`  ▂▅█▅▂     │     ▂▄█▄▂
 ▅█████▅▂   │   ▂▅█████▅
 ───────────T───────────▶`],
  [/morpholog|dilat|erosi|opening|closing|structuring|hit.or.miss|boundar/i,
` . . . . .      . # # # .
 . # # # .  ⊕   # # # # #
 . # # # .  B   # # # # #
 . . . . .      . # # # .`],
  [/noise|gaussian|rayleigh|impulse|salt|pepper|erlang/i,
` ·˙ :▪ ·.˙ ▫ :·.˙▪ ·
 ˙:· ·▫ ˙.▪: ·˙ ▫.: ˙
 ▪·.˙ : ·▫˙ ▪.: ·˙ ·▪
      f + η  =  g`],
  [/restor|wiener|inverse filter|degrad|blur|deconv/i,
` f ─▶[ H ]─▶( + )─▶ g
              ▲
              η`],
  [/edge|gradient|sobel|prewitt|roberts|laplac|derivative|sharpen|canny/i,
` ▁▁▁▁▁▁▁╱▔▔▔▔▔▔▔   f
 ───────╱╲───────   f′
 ───────╲╱───────   f″`],
  [/filter|mask|kernel|convol|averag|median|smooth|low.pass|high.pass/i,
`┌───┬───┬───┐
│ 1 │ 1 │ 1 │
├───┼───┼───┤
│ 1 │ 1 │ 1 │ × 1/9
├───┼───┼───┤
│ 1 │ 1 │ 1 │
└───┴───┴───┘`],
  [/dft|fft|fourier|frequency|spectrum/i,
` ∿∿∿∿∿∿  ─DFT─▶  │   ║   │
 f(x,y)          ▁▁▁█▁▁▁
                  F(u,v)`],
  [/dct|walsh|hadamard|cosine|basis|kl |karhunen|hotelling|transform/i,
` ▓▓▓▓ ▓▓░░ ▓░▓░ ▓░░▓
 ▓▓▓▓ ▓▓░░ ▓░▓░ ░▓▓░
 ▓▓▓▓ ░░▓▓ ░▓░▓ ░▓▓░
 ▓▓▓▓ ░░▓▓ ░▓░▓ ▓░░▓`],
  [/colou?r|rgb|hsi|cmy|hue|saturation/i,
`      R
     ╱ ╲
    ╱ ● ╲
   ╱  I  ╲
  G───────B`],
  [/compress|huffman|entropy|redundan|lzw|run.?length|jpeg|arithmetic cod|bit.?plane|coding/i,
`       (1.0)
       ╱   ╲
    (.6)   a .4
    ╱  ╲
  b .3  c .3`],
  [/pixel|neighbo|adjacen|connect|m-path|path|distance|d4|d8|d<sub>[48e]/i,
`    q        q q q
  q p q      q p q
    q        q q q
  N4(p)      N8(p)`],
  [/sampl|quantiz|resolution|gray.?level|bits per/i,
`        ┌──┐
     ┌──┘  └──┐
  ┌──┘        └──┐
──┘              └──`],
  [/thread|concurren|synchroni|runnable|executor|deadlock|race/i,
` T1 ━━━━━╸   ━━━━━━━▶
 T2 ━━╸  ━━━━━━━━━━━▶
        └─ lock ─┘`],
  [/jdbc|sql|database|resultset|statement|connection|jpa|hibernate|entity/i,
`  ╭────────╮
  │╲______╱│
  │  SQL   │
  │  ▤▤▤▤  │
  ╰────────╯`],
  [/spring|rest|http|controller|servlet|jsp|endpoint|request|response|api/i,
` client ──GET /api──▶ server
        ◀──200 JSON──`],
  [/collection|arraylist|hashmap|hashset|linkedlist|list|map|set|queue|stack|iterator/i,
` [k1]──▶[v1]
 [k2]──▶[v2]
 [k3]──▶[v3]`],
  [/exception|try|catch|throw|finally/i,
` try ──✗──▶ catch
  └────────▶ finally`],
  [/class|object|inherit|interface|polymorph|abstract|encapsul|oop|constructor/i,
` ┌─────────┐
 │ Animal  │
 └────△────┘
   ┌──┴──┐
  Dog   Cat`],
];
const ENSO = `   .-~~~-.
  /       \\
 |    ?    |
  \\       /
   '-...-'`;
export const cardArt = text => { const t = text.replace(/<sub>|<\/sub>/g, ''); return (ART.find(([re]) => re.test(t) || re.test(text)) || [0, ENSO])[1]; };
export function CardArt({ text }) {
  return <pre className="card-art" aria-hidden="true">{cardArt(text || '')}</pre>;
}

/* Header art for the Cards page: a small deck whose top card keeps flipping ? ⇄ ! */
export function AsciiDeck() {
  const [t, setT] = useState(0);
  useEffect(() => { if (calm()) return; const id = setInterval(() => setT(n => n + 1), 900); return () => clearInterval(id); }, []);
  const m = ['?', '?', '…', '!'][t % 4];
  return (
    <pre className="ascii-deck" aria-hidden="true">{
` ┌────────┐
 │┌────────┐
 ││┌────────┐
 └││        │
  └│   ${m}    │
   │        │
   └────────┘`}</pre>
  );
}
