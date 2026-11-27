// ASCII page transition: a field of glyphs sweeps over the screen, the page changes while it is
// covered, then the glyphs clear. Every run picks a different pattern than the last one.
const GLYPHS = '░▒▓█#%&@*+=-:.アイウエオカキクケコ01';
const MODES = [
  (u, v) => u,                                            // wipe right
  (u, v) => v * 0.85 + ((u * 7.3) % 1) * 0.15,            // rain (columns at different speeds)
  (u, v, ox, oy) => Math.hypot(u - ox, (v - oy) * 0.7) / 1.1, // radial from the click
  (u, v) => (u + v) / 2,                                  // diagonal
  (u, v, ox, oy, h) => h,                                 // scatter
  (u, v) => { const a = Math.atan2(v - 0.5, u - 0.5) / 6.283 + 0.5; return (a + Math.hypot(u - 0.5, v - 0.5)) % 1; }, // spiral
  (u, v) => 1 - v                                         // scan up
];
let last = -1, busy = false, ox = 0.5, oy = 0.5;
addEventListener('pointerdown', e => { ox = e.clientX / innerWidth; oy = e.clientY / innerHeight; }, { capture: true, passive: true });

export function asciiSwap(update) {
  if (busy) { update(); return; }
  busy = true;
  let m; do { m = (Math.random() * MODES.length) | 0; } while (m === last); last = m;
  const order = MODES[m];
  const c = document.createElement('canvas');
  c.className = 'ascii-swap'; c.setAttribute('aria-hidden', 'true');
  document.body.append(c);
  const dpr = Math.min(2, devicePixelRatio || 1), W = innerWidth, H = innerHeight, CW = 16, CH = 20;
  c.width = W * dpr; c.height = H * dpr;
  const g = c.getContext('2d'); g.scale(dpr, dpr);
  const cols = Math.ceil(W / CW), rows = Math.ceil(H / CH);
  const css = getComputedStyle(document.documentElement);
  const bg = css.getPropertyValue('--bg').trim() || '#0e0d0c', ink = css.getPropertyValue('--text').trim() || '#e9e2d4';
  const acc = css.getPropertyValue('--accent').trim() || '#d9452b';
  const cells = [];
  for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) {
    const h = Math.abs(Math.sin(x * 12.9898 + y * 78.233) * 43758.5453 % 1);
    cells.push({ x, y, h, d: Math.min(1, Math.max(0, order(x / cols, y / rows, ox, oy, h) * 0.8 + h * 0.2)) });
  }
  const IN = 300, OUT = 460, t0 = performance.now(), F = 0.22;           // F = width of the soft front
  const ease = t => t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;  // in-out cubic for the cover
  const out = t => 1 - (1 - t) ** 3;                                     // ease-out for the reveal
  let swapped = false;
  g.font = `700 ${CH - 5}px "JetBrains Mono",ui-monospace,monospace`; g.textBaseline = 'top';
  const frame = now => {
    const t = now - t0, cover = t < IN, p = cover ? ease(t / IN) : out(Math.min(1, (t - IN) / OUT));
    if (!cover && !swapped) { swapped = true; update(); }
    const tick = (t / 70) | 0;                                           // glyphs change ~14×/s, not every frame
    g.clearRect(0, 0, W, H);
    for (const k of cells) {
      const e = cover ? p * (1 + F) - k.d : k.d - (p * (1 + F) - F);
      if (e <= 0) continue;
      const a = Math.min(1, e / F);                                     // 0 at the front → 1 behind it
      g.globalAlpha = a; g.fillStyle = bg; g.fillRect(k.x * CW, k.y * CH, CW, CH);
      if (a < 1 || ((k.h * 97 + tick) | 0) % 23 === 0) {
        g.globalAlpha = a < 0.35 ? 0.95 : (1 - a) * 0.8 + 0.12;
        g.fillStyle = a < 0.35 ? acc : ink;
        g.fillText(GLYPHS[((k.h * 1e4) + tick) % GLYPHS.length | 0], k.x * CW + 2, k.y * CH + 3);
      }
    }
    g.globalAlpha = 1;
    if (t < IN + OUT) requestAnimationFrame(frame); else { c.remove(); busy = false; }
  };
  requestAnimationFrame(frame);
}
