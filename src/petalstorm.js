// Sakura theme switch: a gust carries a storm of blossoms and petals across the page with a pink
// veil riding behind the front. Once the veil covers the screen the theme changes underneath, the
// veil melts away and the petals drift off and fall. One canvas, ~2 s.
const TAU = Math.PI * 2;
const PETAL = new Path2D('M0 0 C-2.6 -1.6 -3 -5.2 -1.5 -6.8 L0 -5.9 L1.5 -6.8 C3 -5.2 2.6 -1.6 0 0Z');
const PINKS = ['#f7aac4', '#f48fb1', '#ffc1d6', '#fbd3e0', '#f9b8cc'];
const ease = v => (v < 0.5 ? 4 * v ** 3 : 1 - (-2 * v + 2) ** 3 / 2);

// pre-rendered sprites so each frame is just drawImage calls
const sprite = (blossom, fill) => {
  const s = blossom ? 34 : 16, c = document.createElement('canvas'); c.width = c.height = s * 2;
  const g = c.getContext('2d'); g.translate(s, s); g.scale(s / 8.5, s / 8.5);
  if (blossom) {
    for (let i = 0; i < 5; i++) { g.save(); g.rotate(i * TAU / 5); g.fillStyle = fill; g.fill(PETAL); g.strokeStyle = 'rgba(194,24,91,.25)'; g.lineWidth = 0.25; g.stroke(PETAL); g.restore(); }
    g.fillStyle = '#c2185b'; g.beginPath(); g.arc(0, 0, 1.3, 0, TAU); g.fill();
    g.fillStyle = '#fff3f7'; for (let i = 0; i < 5; i++) { const a = i * TAU / 5 + 0.6; g.beginPath(); g.arc(Math.sin(a) * 2.3, -Math.cos(a) * 2.3, 0.4, 0, TAU); g.fill(); }
  } else { g.rotate(Math.PI); g.translate(0, -3.4); g.fillStyle = fill; g.fill(PETAL); }
  return c;
};

export function petalStorm(change, e, { light = false } = {}) {
  const c = document.createElement('canvas');
  c.setAttribute('aria-hidden', 'true');
  c.style.cssText = 'position:fixed;inset:0;width:100vw;height:100vh;z-index:2147483000;pointer-events:none';
  document.body.appendChild(c);
  const dpr = Math.min(1.5, devicePixelRatio || 1), W = innerWidth, H = innerHeight;
  c.width = W * dpr; c.height = H * dpr;
  const g = c.getContext('2d');
  const veil = light ? '251,242,243' : '27,18,23', SK = 0.32;               // sakura page colour; front leans right
  const sprites = PINKS.flatMap(p => [sprite(true, p), sprite(false, p)]);
  const IN = 900, OUT = 900, span = W + SK * H + 500;
  const front = t => -250 + span * ease(Math.min(1, t / IN));

  const n = Math.min(320, Math.round(W * H / 4500));
  const P = Array.from({ length: n }, () => {
    const born = Math.random() * IN * 0.95, y = Math.random() * H, blossom = Math.random() < 0.38;
    return {
      born, y0: y, x0: front(born) - SK * y + SK * H + 40 - Math.random() * 220,
      vx: 900 + Math.random() * 900, vy: 60 + Math.random() * 200, fall: 260 + Math.random() * 320,
      rot: Math.random() * TAU, spin: (Math.random() - 0.5) * 9, flip: 4 + Math.random() * 8, ph: Math.random() * TAU,
      sc: (blossom ? 0.55 : 0.7) + Math.random() * 0.6, img: sprites[Math.floor(Math.random() * PINKS.length) * 2 + (blossom ? 0 : 1)],
    };
  });

  let swapped = false;
  const t0 = performance.now();
  const frame = now => {
    const t = now - t0;
    g.setTransform(dpr, 0, 0, dpr, 0, 0); g.clearRect(0, 0, W, H);
    // the veil: everything behind the slanted front, with a soft leading edge; melts after the swap
    const va = t < IN ? 1 : Math.max(0, 1 - (t - IN) / (OUT * 0.75));
    if (va > 0) {
      g.save(); g.transform(1, 0, -SK, 1, SK * H, 0);
      const f = t < IN ? front(t) : span;
      const gr = g.createLinearGradient(f - 260, 0, f, 0);
      gr.addColorStop(0, `rgba(${veil},${va})`); gr.addColorStop(1, `rgba(${veil},0)`);
      g.fillStyle = `rgba(${veil},${va})`; g.fillRect(-SK * H - 50, 0, Math.max(0, f - 260 + SK * H + 50), H);
      g.fillStyle = gr; g.fillRect(f - 260, 0, 260, H);
      g.restore();
    }
    if (t >= IN && !swapped) { swapped = true; change(); }
    // petals: blown along with the gust, slowing and falling once it passes
    const fade = t < IN ? 1 : Math.max(0, 1 - (t - IN) / OUT);
    for (const p of P) {
      const s = (t - p.born) / 1000; if (s < 0) continue;
      const drag = 1 - Math.exp(-s * 1.4);                                     // the gust dies down
      const x = p.x0 + p.vx * drag / 1.4, y = p.y0 + p.vy * s + p.fall * s * s * 0.5 + Math.sin(s * 3 + p.ph) * 14;
      if (x < -60 || x > W + 60 || y > H + 60) continue;
      g.globalAlpha = fade * Math.min(1, s * 8);
      g.setTransform(dpr, 0, 0, dpr, x * dpr, y * dpr);
      g.rotate(p.rot + p.spin * s); g.scale(p.sc * Math.cos(s * p.flip + p.ph), p.sc);            // fluttering flip
      g.drawImage(p.img, -p.img.width / 2, -p.img.height / 2);
    }
    g.globalAlpha = 1;
    if (t < IN + OUT) requestAnimationFrame(frame); else c.remove();
  };
  requestAnimationFrame(frame);
}
