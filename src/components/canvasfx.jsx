// Canvas UI effects (src/canvasui, MIT + Commons Clause, github.com/DavidHDev/canvas-ui), tuned for the ink-wash theme.
// Both are WebGL, pause off-screen and respect reduced motion. `off` renders the children plain (used for the light theme).
import { useEffect, useRef, useState } from 'react';
import { Clouds } from '../canvasui/Clouds/Clouds';
import { Ripple } from '../canvasui/Ripple/Ripple';

// ASCII Magic piece (public/ascii-magic, MIT). Halftone dots in one colour read as ink in both themes.
export const Ascii = ({ piece, size = 8, look = 'dots', mono = true, caption, className = '' }) => (
  <div className={'ascii-block ' + className}>
    <ascii-art piece={piece} size={size} look={look || undefined} mono={mono || undefined} />
    {caption && <p>{caption}</p>}
  </div>
);

// Vengeance UI morph-text idea: phrases replace each other through a blur.
export function MorphText({ words, every = 2800 }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (words.length < 2 || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => setI(n => (n + 1) % words.length), every);
    return () => clearInterval(id);
  }, [words.length, every]);
  return <span className="morph" key={i}>{words[i % words.length]}</span>;
}

// ASCII scene (original; same idea as ascii-knight.vercel.app: brightness -> character, colour
// per cell). A vermilion moon over a night sea in perspective: rolling waves, a glitter path,
// ink islands, a sailboat crossing, sakura petals drifting. Pauses off-screen; still for reduced motion.
const RAMP = ' .·:-~=+*#%@';
export function AsciiSea({ height = 260, text = '合格', className = '' }) {
  const cv = useRef(null);
  useEffect(() => {
    const c = cv.current, g = c.getContext('2d'), CW = 6, CH = 10;
    let raf = 0, cols = 0, rows = 0, dpr = 1, W = 0, H = 0;
    const size = () => {
      W = c.offsetWidth; H = c.offsetHeight; const r = c.getBoundingClientRect();
      dpr = Math.min(2, devicePixelRatio || 1) * (r.width / W || 1);
      c.width = W * dpr; c.height = H * dpr; cols = Math.ceil(W / CW); rows = Math.ceil(H / CH);
    };
    const hash = (x, y) => { const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453; return s - Math.floor(s); };
    const isl = u => 0.035 * Math.max(0, Math.sin(u * 9 + 1.3)) ** 2 * (u < 0.45 ? 1 : 0) + 0.06 * Math.max(0, 1 - Math.abs(u - 0.12) / 0.1) ** 1.5;
    const petals = Array.from({ length: 14 }, (_, i) => ({ x: hash(i, 1), y: hash(i, 2), s: 0.3 + hash(i, 3) * 0.7, p: hash(i, 4) * 6.28 }));
    const draw = now => {
      const t = now / 1000, L = document.documentElement.dataset.theme === 'light';
      const ink = L ? [27, 25, 23] : [233, 226, 212], red = [217, 69, 43], hot = L ? [190, 60, 30] : [255, 170, 130], sea = L ? [40, 60, 75] : [120, 140, 160];
      g.setTransform(dpr, 0, 0, dpr, 0, 0); g.clearRect(0, 0, W, H);
      g.font = '700 10px "JetBrains Mono",ui-monospace,monospace'; g.textBaseline = 'top';
      const hz = 0.56, mu = 0.7, mv = 0.29, mr = 0.21;              // horizon, moon centre + radius (in H units)
      const boat = ((t * 0.018) % 1.3) - 0.15;                     // drifts left to right, then loops
      const put = (x, y, I, col, ch) => {
        if (I <= 0.03) return;
        const k = Math.min(RAMP.length - 1, Math.max(1, Math.round(I * (RAMP.length - 1))));
        g.fillStyle = `rgba(${col[0]},${col[1]},${col[2]},${Math.min(1, 0.25 + I * 0.9)})`;
        g.fillText(ch || RAMP[k], x * CW, y * CH);
      };
      for (let y = 0; y < rows; y++) {
        const v = y / rows;
        for (let x = 0; x < cols; x++) {
          const u = x / cols, px = (u - mu) * W / H, py = v - mv;
          if (v < hz) {
            // moon: a shaded sphere, lit from the upper left, with a soft halo
            const d = Math.hypot(px, py);
            if (d < mr) {
              const nz = Math.sqrt(1 - (d / mr) ** 2), lit = Math.max(0, (-px * 0.5 - py * 0.6) / mr + nz * 0.8);
              put(x, y, 0.3 + 0.62 * lit, lit > 0.95 ? hot : red); continue;
            }
            if (d < mr * 1.9) { put(x, y, 0.22 * (1 - (d - mr) / (mr * 0.9)) ** 2, red); continue; }
            // islands on the horizon
            if (v > hz - isl(u)) { put(x, y, 0.55, ink, v - (hz - isl(u)) < 1.2 / rows ? '^' : '#'); continue; }
            // stars twinkle; haze thickens towards the horizon
            const st = hash(x, y);
            if (st > 0.988) put(x, y, 0.25 + 0.25 * Math.sin(t * 3 + st * 50), ink, st > 0.996 ? '+' : '.');
            else if (v > hz - 0.1 && st > 0.6) put(x, y, 0.08 * (1 - (hz - v) / 0.1), ink, '.');
            continue;
          }
          // sea in perspective: depth grows towards the horizon
          const z = 1 / (v - hz + 0.02), wx = (u - 0.5) * z;
          const wave = Math.sin(wx * 2.2 + z * 1.4 - t * 1.6) * 0.5 + Math.sin(wx * 5.1 - z * 0.9 + t * 1.1) * 0.3 + Math.sin(z * 3.3 - t * 2.3) * 0.2;
          let I = 0.26 + 0.18 * wave + 0.14 * (1 - Math.min(1, (v - hz) * 3));
          let col = sea, ch = wave > 0.45 ? '~' : wave > 0 ? '-' : wave > -0.45 ? '.' : (x + y) % 2 ? '.' : ' ';
          // the moon's glitter path widens towards the viewer and shimmers
          const path = Math.abs(u - mu) * W / H, wide = 0.03 + (v - hz) * 0.5;
          if (path < wide) {
            const sp = hash(x, Math.floor(t * 8) + y);
            const on = (1 - path / wide) * (0.5 + 0.5 * wave);
            if (on > 0.25 && sp > 0.35) { I = 0.4 + on * 0.6; col = sp > 0.85 ? hot : red; ch = sp > 0.9 ? '*' : sp > 0.6 ? '=' : '-'; }
          }
          put(x, y, I, col, ch);
        }
      }
      // sailboat: hull + sail, bobbing on the swell
      const by = hz + 0.1 + Math.sin(t * 1.6) * 0.008, bx = boat * W;
      g.fillStyle = `rgb(${ink})`; g.font = `700 ${Math.round(H * 0.07)}px "JetBrains Mono",monospace`; g.textBaseline = 'alphabetic';
      g.fillText(' /|', bx, by * H - H * 0.07); g.fillText('/_|\\', bx - 4, by * H); g.fillText('\\___/', bx - 8, by * H + H * 0.05);
      // petals drift down and across
      g.font = '700 11px "JetBrains Mono",monospace';
      for (const p of petals) {
        const yy = (p.y + t * 0.05 * p.s) % 1, xx = (p.x + t * 0.02 + Math.sin(t * p.s + p.p) * 0.02) % 1;
        g.fillStyle = `rgba(${red},${0.5 + 0.5 * p.s})`; g.fillText(Math.sin(t * 2 + p.p) > 0 ? '❀' : '*', xx * W, yy * H);
      }
      // the moon's word
      g.fillStyle = '#fbf3e6'; g.shadowColor = 'rgba(90,20,10,.9)'; g.shadowBlur = 10; g.textAlign = 'center'; g.textBaseline = 'middle';
      g.font = `800 ${Math.round(H * mr * 0.75)}px "Shippori Mincho B1",serif`;
      g.fillText(text, mu * W, mv * H + 1); g.shadowBlur = 0; g.textAlign = 'start';
    };
    const loop = now => { raf = requestAnimationFrame(loop); if (now - (loop.l || 0) > 33) { loop.l = now; draw(now); } };
    const ro = new ResizeObserver(() => { size(); draw(performance.now()); }); ro.observe(c);
    const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const io = new IntersectionObserver(([e]) => { cancelAnimationFrame(raf); if (e.isIntersecting && !calm) raf = requestAnimationFrame(loop); });
    io.observe(c);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); };
  }, [text]);
  return <canvas ref={cv} className={'ascii-wind ' + className} style={{ height }} aria-hidden="true" />;
}

// Ink dropped on still water: a tap sends rings out, and now and then a drop falls by itself.
// With native html-in-canvas the content lives inside a canvas and can't size the wrapper,
// so we measure the content and hand the wrapper that height.
export function InkPond({ off, children }) {
  const box = useRef(null);
  const [h, setH] = useState();
  useEffect(() => {
    const inner = box.current?.querySelector('[data-fit]');
    if (!inner) return;
    const ro = new ResizeObserver(() => setH(inner.offsetHeight));
    ro.observe(inner);
    return () => ro.disconnect();
  }, [off]);
  if (off) return children;
  return (
    <div ref={box}>
      <Ripple className="ink-pond" style={{ height: h }} trigger="click" interval={5} amplitude={0.7} rings={3} wavelength={46} decay={1.4} refraction={6} dispersion={0} shine={0.35}>
        <div data-fit>{children}</div>
      </Ripple>
    </div>
  );
}

// Mist drifting behind the hero, in washi grey; the pointer parts it.
const MIST = [0.91, 0.89, 0.83], SHADE = [0.3, 0.28, 0.26];
export function InkMist({ off, children }) {
  if (off || (document.documentElement.dataset.skin || 'ink') !== 'ink') return children;   // its canvas paints the ink page colour
  return (
    <Clouds className="ink-mist" layer="background" speed={0.3} direction={190} cover={0.3} density={1.2} softness={1}
      color={MIST} lightColor={MIST} shadeColor={SHADE} opacity={0.14} shadow={0} wind={0.8} windRadius={260}>
      {children}
    </Clouds>
  );
}

// ASCII Knight (ascii-knight.vercel.app): embedded live from its own site, not copied, so the
// art stays with its maker. Needs internet; loads lazily and ignores taps.
export const AsciiKnight = ({ height = 300, caption }) => (
  <figure className="ascii-knight" style={{ height }}>
    <iframe src="https://ascii-knight.vercel.app/" title="ASCII Knight: a knight whose red cloak blows in the wind" loading="lazy" sandbox="allow-scripts" tabIndex={-1} />
    <figcaption>{caption}<a href="https://ascii-knight.vercel.app/" target="_blank" rel="noopener">ASCII Knight ↗</a></figcaption>
  </figure>
);
