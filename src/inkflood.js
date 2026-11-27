// Ink wash theme switch: vermilion drops fall onto the page, splash, and bloom into sumi-ink blots
// with wavy bleeding edges and tendrils. Once the ink has covered the screen the theme changes
// underneath, then the ink soaks away from the first drop to reveal it. One canvas, ~1.9 s.
const TAU = Math.PI * 2;
const easeOut = v => 1 - (1 - v) ** 3;

export function inkFlood(change, e, { accent = '#d9452b', light = false } = {}) {
  const c = document.createElement('canvas');
  c.setAttribute('aria-hidden', 'true');
  c.style.cssText = 'position:fixed;inset:0;width:100vw;height:100vh;z-index:2147483000;pointer-events:none';
  document.body.appendChild(c);
  const dpr = Math.min(1.5, devicePixelRatio || 1), W = innerWidth, H = innerHeight, diag = Math.hypot(W, H);
  c.width = W * dpr; c.height = H * dpr;
  const g = c.getContext('2d'); g.setTransform(dpr, 0, 0, dpr, 0, 0);
  const sumi = light ? 'rgba(18,15,13,.96)' : '#0b0a09', fibre = light ? 'rgba(18,15,13,.55)' : 'rgba(11,10,9,.7)';

  // five drops: the first where you tapped, the rest scattered; each lands a little later
  const p0 = e ? [e.clientX, e.clientY] : [W / 2, H / 2];
  const drops = [0, 1, 2, 3, 4].map(i => {
    const x = i ? W * (0.1 + Math.random() * 0.8) : p0[0], y = i ? H * (0.12 + Math.random() * 0.76) : p0[1];
    return {
      x, y, land: 240 + i * 120 + Math.random() * 40,
      harm: [...Array.from({ length: 4 }, () => ({ k: 3 + Math.floor(Math.random() * 7), a: 0.025 + Math.random() * 0.05, p: Math.random() * TAU, s: (Math.random() - 0.5) * 2 })),
        ...Array.from({ length: 3 }, () => ({ k: 13 + Math.floor(Math.random() * 12), a: 0.008 + Math.random() * 0.012, p: Math.random() * TAU, s: (Math.random() - 0.5) * 4 }))],   // fine feathering
      specks: Array.from({ length: 9 }, () => ({ a: Math.random() * TAU, d: 18 + Math.random() * 34, r: 1.2 + Math.random() * 2.6 })),
      fib: Array.from({ length: 12 }, () => ({ a: Math.random() * TAU, L: 0.12 + Math.random() * 0.22, j: Array.from({ length: 5 }, () => (Math.random() - 0.5) * 0.5) })),
    };
  });
  const G = 1100, cover = drops[0].land + G, OUT = 560;
  const radius = (d, t) => { const u = Math.max(0, (t - d.land) / G); return 7 + 22 * Math.min(1, u * 5) + diag * 1.25 * u ** 2.5; };
  const blob = (d, R, t, s = 1) => {
    g.beginPath();
    for (let i = 0; i <= 120; i++) {
      const th = i / 120 * TAU; let k = 1;
      for (const h of d.harm) k += h.a * Math.sin(h.k * th + h.p + t / 1000 * h.s);
      const r = R * k * s, x = d.x + Math.cos(th) * r, y = d.y + Math.sin(th) * r;
      i ? g.lineTo(x, y) : g.moveTo(x, y);
    }
    g.closePath();
  };

  let swapped = false;
  const t0 = performance.now();
  const frame = now => {
    const t = now - t0;
    g.clearRect(0, 0, W, H);
    if (t < cover) {
      for (const d of drops) {
        const dt = t - d.land;
        if (dt < 0) {                                         // falling: a stretched vermilion bead
          const f = 1 - Math.min(1, -dt / 240), y = d.y - (1 - f * f) * Math.min(260, d.y + 30);
          if (-dt < 240) { g.fillStyle = accent; g.beginPath(); g.ellipse(d.x, y, 4.5, 9, 0, 0, TAU); g.fill(); }
          continue;
        }
        const R = radius(d, t), soft = Math.min(1, dt / 160);
        g.globalAlpha = 0.35; g.fillStyle = sumi; blob(d, R, t, 1.07); g.fill();      // wet halo
        g.globalAlpha = 1; blob(d, R, t); g.fill();
        if (R < diag * 0.7) {                                                         // vermilion rim + fibres
          g.globalAlpha = 0.75 * (1 - R / (diag * 0.7)); g.strokeStyle = accent; g.lineWidth = 2.2; blob(d, R, t, 1.01); g.stroke();
          g.globalAlpha = 0.8; g.strokeStyle = fibre; g.lineWidth = 1.1; g.beginPath();
          for (const f of d.fib) {
            let x = d.x + Math.cos(f.a) * R * 0.98, y = d.y + Math.sin(f.a) * R * 0.98; g.moveTo(x, y);
            for (const j of f.j) { const L = (f.L * R + 6) / 5; x += Math.cos(f.a + j) * L; y += Math.sin(f.a + j) * L; g.lineTo(x, y); }
          }
          g.stroke();
        }
        if (dt < 320) {                                                               // splash: ripple + specks
          const q = dt / 320;
          g.globalAlpha = 1 - q; g.strokeStyle = accent; g.lineWidth = 2; g.beginPath(); g.ellipse(d.x, d.y, 14 + q * 46, (14 + q * 46) * 0.55, 0, 0, TAU); g.stroke();
          g.fillStyle = accent; g.globalAlpha = soft;
          for (const s of d.specks) { const r = s.d * easeOut(q); g.beginPath(); g.arc(d.x + Math.cos(s.a) * r, d.y + Math.sin(s.a) * r * 0.7, s.r, 0, TAU); g.fill(); }
        }
        if (dt < 260) { g.globalAlpha = 1 - dt / 260; g.fillStyle = accent; g.beginPath(); g.arc(d.x, d.y, R * 0.55, 0, TAU); g.fill(); }  // vermilion heart
        g.globalAlpha = 1;
      }
    } else {
      if (!swapped) { swapped = true; change(); }
      const v = Math.min(1, (t - cover) / OUT);
      g.fillStyle = sumi; g.fillRect(0, 0, W, H);
      g.globalCompositeOperation = 'destination-out';                                 // the ink soaks away
      drops.forEach((d, i) => {
        const w = easeOut(Math.max(0, Math.min(1, (v - i * 0.06) / 0.76))), R = diag * 1.15 * w + 1;
        const gr = g.createRadialGradient(d.x, d.y, R * 0.7, d.x, d.y, R);
        gr.addColorStop(0, '#000'); gr.addColorStop(1, 'rgba(0,0,0,0)');
        g.fillStyle = gr; g.beginPath(); g.arc(d.x, d.y, R, 0, TAU); g.fill();
      });
      g.globalCompositeOperation = 'source-over';
      if (v >= 1) { c.remove(); return; }
    }
    requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
}
