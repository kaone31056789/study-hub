// Ink wash theme switch: a big calligraphy brush repaints the page. Broad sumi strokes sweep across
// in the new page's paper colour, with dry-brush ink bristles along their edges; once the page is
// covered a vermilion 学 seal is stamped, the theme changes underneath and the strokes melt away.
const TAU = Math.PI * 2;
const easeOut = v => 1 - (1 - v) ** 3;
const clamp = v => Math.max(0, Math.min(1, v));

export function inkFlood(change, e, { accent = '#d9452b', light = false } = {}) {
  const c = document.createElement('canvas');
  c.setAttribute('aria-hidden', 'true');
  c.style.cssText = 'position:fixed;inset:0;width:100vw;height:100vh;z-index:2147483000;pointer-events:none';
  document.body.appendChild(c);
  const dpr = Math.min(1.5, devicePixelRatio || 1), W = innerWidth, H = innerHeight;
  c.width = W * dpr; c.height = H * dpr;
  const g = c.getContext('2d'); g.setTransform(dpr, 0, 0, dpr, 0, 0);
  const paper = light ? '#f5f4ef' : '#0e0d0c', ink = light ? '27,23,20' : '233,226,212';

  // six broad strokes, alternating direction, each slightly tilted and overlapping the next
  const N = 6, band = H / N;
  const strokes = Array.from({ length: N }, (_, i) => {
    const ltr = i % 2 === 0;
    return {
      y: (i + 0.5) * band, w: band * 1.45, tilt: (Math.random() - 0.5) * 0.06, ltr, at: i * 105, dur: 420 + Math.random() * 80,
      wob: Array.from({ length: 3 }, () => ({ k: 1 + Math.random() * 3, a: band * (0.04 + Math.random() * 0.05), p: Math.random() * TAU })),
      hairs: Array.from({ length: 22 }, () => ({ o: (Math.random() < 0.5 ? -1 : 1) * (0.42 + Math.random() * 0.1), len: 0.55 + Math.random() * 0.45, a: 0.15 + Math.random() * 0.4, lw: 0.6 + Math.random() * 1.6 })),
    };
  });
  const COVER = (N - 1) * 105 + 500, SEAL = COVER + 40, OUT = 520;
  const edge = (s, x, side) => s.y + side * s.w / 2 + s.wob.reduce((v, q) => v + q.a * Math.sin(q.k * x / W * TAU + q.p + side), 0);

  let swapped = false;
  const t0 = performance.now();
  const frame = now => {
    const t = now - t0;
    g.setTransform(dpr, 0, 0, dpr, 0, 0); g.clearRect(0, 0, W, H);
    const fade = t < SEAL + 180 ? 1 : 1 - clamp((t - SEAL - 180) / OUT);
    g.globalAlpha = fade;
    for (const s of strokes) {
      const u = clamp((t - s.at) / s.dur); if (u <= 0) continue;
      const head = -120 + (W + 240) * easeOut(u), x0 = s.ltr ? -120 : W + 120, x1 = s.ltr ? head : W - head;
      const lo = Math.min(x0, x1), hi = Math.max(x0, x1);
      g.save(); g.translate(W / 2, s.y); g.rotate(s.tilt); g.translate(-W / 2, -s.y);
      // the body of the stroke: paper colour with a wavy top and bottom edge, rounded brush head
      g.fillStyle = paper; g.beginPath();
      for (let x = lo; x <= hi; x += 24) g.lineTo(x, edge(s, x, -1));
      g.lineTo(hi, edge(s, hi, -1));
      g.quadraticCurveTo(s.ltr ? hi + s.w * 0.35 : hi, s.y, hi, edge(s, hi, 1));
      for (let x = hi; x >= lo; x -= 24) g.lineTo(x, edge(s, x, 1));
      if (!s.ltr) g.quadraticCurveTo(lo - s.w * 0.35, s.y, lo, edge(s, lo, -1));
      g.closePath(); g.fill();
      // dry-brush bristles along both edges, trailing behind the head
      g.lineCap = 'round';
      for (const h of s.hairs) {
        const yy = s.y + h.o * s.w, from = s.ltr ? Math.max(lo, hi - (hi - lo) * h.len) : lo, to = s.ltr ? hi : Math.min(hi, lo + (hi - lo) * h.len);
        if (to - from < 4) continue;
        g.strokeStyle = `rgba(${ink},${h.a})`; g.lineWidth = h.lw; g.beginPath(); g.moveTo(from, yy + (edge(s, from, Math.sign(h.o)) - s.y - Math.sign(h.o) * s.w / 2)); g.lineTo(to, yy + (edge(s, to, Math.sign(h.o)) - s.y - Math.sign(h.o) * s.w / 2)); g.stroke();
      }
      g.restore();
    }
    // once covered: the theme changes underneath and a vermilion seal is stamped in the middle
    if (t >= COVER && !swapped) { swapped = true; g.fillStyle = paper; g.fillRect(0, 0, W, H); change(); }
    if (t >= SEAL) {
      const q = clamp((t - SEAL) / 220), sc = 1.6 - 0.6 * easeOut(q), S = Math.min(120, W * 0.22);
      g.save(); g.translate(W / 2, H / 2); g.rotate(-0.08); g.scale(sc, sc); g.globalAlpha = fade * Math.min(1, q * 3);
      g.fillStyle = accent; g.beginPath(); g.roundRect(-S / 2, -S / 2, S, S, S * 0.16); g.fill();
      g.fillStyle = paper; g.font = `800 ${S * 0.62}px "Shippori Mincho B1","Yu Mincho",serif`; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('学', 0, S * 0.04);
      g.restore();
    }
    g.globalAlpha = 1;
    if (fade > 0) requestAnimationFrame(frame); else c.remove();
  };
  requestAnimationFrame(frame);
}
