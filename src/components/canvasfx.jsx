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

// ASCII wind scene (original; same idea as ascii-knight.vercel.app: brightness -> character,
// colour per cell, everything on one looping wind). A vermilion banner flies over a grass
// field under ink mountains and a red sun. Pauses off-screen; still frame for reduced motion.
const RAMP = ' .:-=+*%#@';
export function AsciiWind({ height = 220, text = '合格', className = '' }) {
  const cv = useRef(null);
  useEffect(() => {
    const c = cv.current, g = c.getContext('2d'), CW = 6, CH = 9;
    let raf = 0, cols = 0, rows = 0, dpr = 1, W = 0, H = 0;
    const size = () => {
      W = c.offsetWidth; H = c.offsetHeight; const r = c.getBoundingClientRect();
      dpr = Math.min(2, devicePixelRatio || 1) * (r.width / W || 1);
      c.width = W * dpr; c.height = H * dpr; cols = Math.ceil(W / CW); rows = Math.ceil(H / CH);
    };
    const light = () => document.documentElement.dataset.theme === 'light';
    const n1 = (x, s) => Math.sin(x * 1.7 + s) * 0.5 + Math.sin(x * 4.3 + s * 2.1) * 0.25 + Math.sin(x * 9.1 + s * .7) * 0.12;
    const farF = u => 0.46 + 0.11 * n1(u * 3, 1), nearF = u => 0.6 + 0.07 * n1(u * 5, 4);
    const draw = now => {
      const t = now / 1000, L = light();
      const ink = L ? '27,25,23' : '233,226,212', red = '217,69,43', gold = L ? '140,110,40' : '214,186,120', grass = L ? '70,90,60' : '120,140,110';
      g.setTransform(dpr, 0, 0, dpr, 0, 0); g.clearRect(0, 0, W, H);
      g.font = '700 9px "JetBrains Mono",ui-monospace,monospace'; g.textBaseline = 'top';
      const hz = 0.7, poleU = 0.24, fl0 = 0.2, fl1 = 0.46, flLen = 0.3;
      for (let y = 0; y < rows; y++) {
        const v = y / rows;
        for (let x = 0; x < cols; x++) {
          const u = x / cols;
          let I = 0, col = ink, ch = null;
          // sky: a few stars that breathe
          const st = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453 % 1;
          if (v < hz && st > 0.985) { I = 0.15 + 0.15 * Math.sin(t * 2 + x); }
          // red sun
          const d = Math.hypot((u - 0.74) * W, (v - 0.32) * H) / H;   // in px, so the sun stays round
          if (d < 0.2) { I = 0.55 + 0.3 * (1 - d / 0.2); col = red; }
          else if (d < 0.3) { I = Math.max(I, 0.16 * (1 - (d - 0.2) / 0.1)); col = red; }
          // two mountain ridges
          const far = farF(u), near = nearF(u);
          const ridge = (r, base, du) => {          // ridge line in slashes, mist fading downwards
            if (v <= r || v >= hz) return;
            const top = v - r < 1.2 / rows, sl = (r - (base(u + du))) ;
            I = top ? 0.75 : base === farF ? 0.32 - 0.18 * (v - r) / (hz - r) : 0.5 - 0.2 * (v - r) / (hz - r);
            ch = top ? (Math.abs(sl) < 0.004 ? '_' : sl > 0 ? '/' : '\\') : null; col = ink;
          };
          ridge(far, farF, 1 / cols); ridge(near, nearF, 1 / cols);
          // grass: blades lean with a wave of wind rolling right
          if (v >= hz) {
            const k = (v - hz) / (1 - hz), wind = Math.sin(u * 14 - t * 2.4 + Math.sin(u * 3 + t) * 0.8);
            I = 0.25 + 0.45 * k + 0.15 * wind;
            ch = wind > 0.35 ? '/' : wind < -0.35 ? '\\' : (x + y) % 3 ? '|' : ',';
            col = k < 0.25 && wind > 0.5 ? gold : grass;
          }
          // pole + banner
          const s = u - poleU - 1 / cols;
          if (s > 0 && s < flLen) {
            const q = s / flLen, wave = Math.sin(q * 7 - t * 4.2) * 0.05 * q + Math.sin(q * 13 - t * 6) * 0.012 * q;
            const top = fl0 + wave, bot = fl1 + wave - q * 0.04;
            const torn = q > 0.86 && ((y * 7 + x) % 5 < 2);  // ragged tail
            if (v > top && v < bot && !torn) {
              const shade = Math.cos(q * 7 - t * 4.2);     // folds catch light
              I = 0.5 + 0.35 * shade; col = red; ch = null;
            }
          }
          if (Math.abs(u - poleU) < 0.5 / cols && v > fl0 - 0.06 && v < hz + 0.08) { I = 0.8; col = ink; ch = '|'; }
          if (I <= 0.04) continue;
          const c2 = ch || RAMP[Math.min(RAMP.length - 1, Math.max(1, Math.round(I * (RAMP.length - 1))))];
          g.fillStyle = `rgba(${col},${Math.min(1, 0.35 + I)})`;
          g.fillText(c2, x * CW, y * CH);
        }
      }
      // the banner's word, painted over the fabric's middle
      const q = 0.42, wave = Math.sin(q * 7 - t * 4.2) * 0.05 * q;
      g.fillStyle = L ? '#fff6e8' : '#f6f0e4'; g.font = `800 ${Math.round(H * 0.1)}px "Shippori Mincho B1",serif`; g.textAlign = 'center'; g.textBaseline = 'middle';
      g.save(); g.translate((poleU + flLen * q) * W, ((fl0 + fl1) / 2 + wave) * H); g.rotate(Math.cos(q * 7 - t * 4.2) * 0.06);
      g.fillText(text, 0, 0); g.restore(); g.textAlign = 'start';
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
  if (off) return children;
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
