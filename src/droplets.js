// Ink drops on the whole page: a tap anywhere sends rings out in the skin's accent, and now and then
// a drop falls by itself. In the Ink wash skin a drop is sumi ink instead: it blooms and feathers out. One fixed canvas behind the content; idle (no frames) when nothing moves.
import { sfx } from './sound';
const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!calm) {
  const c = document.createElement('canvas');
  c.className = 'ink-drops'; c.setAttribute('aria-hidden', 'true');
  document.body.prepend(c);
  const g = c.getContext('2d');
  let W = 0, H = 0, dpr = 1, raf = 0, col = '217,69,43', light = false, ink = true;
  const drops = [];
  const size = () => { dpr = Math.min(2, devicePixelRatio || 1); W = innerWidth; H = innerHeight; c.width = W * dpr; c.height = H * dpr; };
  const colour = () => {
    const v = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();
    const m = /^#([0-9a-f]{6})$/i.exec(v); if (m) { const n = parseInt(m[1], 16); col = [n >> 16, (n >> 8) & 255, n & 255].join(','); }
    light = document.documentElement.dataset.theme === 'light';
    ink = (document.documentElement.dataset.skin || 'ink') === 'ink';
  };
  size(); colour();
  addEventListener('resize', size);
  new MutationObserver(colour).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme', 'data-skin'] });

  const frame = now => {
    g.setTransform(dpr, 0, 0, dpr, 0, 0); g.clearRect(0, 0, W, H);
    for (let i = drops.length - 1; i >= 0; i--) {
      const d = drops[i], t = (now - d.t) / 1000;
      if (d.blobs) { if (t > 3.6) drops.splice(i, 1); else bloom(d, t); continue; }
      if (t > 2.4) { drops.splice(i, 1); continue; }
      for (let k = 0; k < 3; k++) {                       // three rings, each a little later and fainter
        const tk = t - k * 0.22; if (tk <= 0) continue;
        const r = d.s * (1 - Math.exp(-tk * 1.6)) * (1 + k * 0.18), a = Math.max(0, 1 - tk / 2) * (light ? 0.32 : 0.38) * (1 - k * 0.25);
        g.strokeStyle = `rgba(${col},${a})`; g.lineWidth = Math.max(0.6, 2.4 - tk * 1.1 - k * 0.4);
        g.beginPath(); g.ellipse(d.x, d.y, r, r * 0.42, 0, 0, Math.PI * 2); g.stroke();   // flattened: water seen at an angle
      }
      if (t < 0.35) { g.fillStyle = `rgba(${col},${(1 - t / 0.35) * 0.55})`; g.beginPath(); g.arc(d.x, d.y, 3 + t * 10, 0, Math.PI * 2); g.fill(); }
    }
    raf = drops.length ? requestAnimationFrame(frame) : 0;
  };
  // ink bloom: soft blots drift out from the drop and fade, with a vermilion heart (the seal colour)
  const bloom = (d, t) => {
    const grow = 1 - Math.exp(-t * 1.3), fade = Math.min(1, t * 6) * (1 - t / 3.6), sumi = light ? '24,20,18' : '236,228,214';
    for (const b of d.blobs) {
      const x = d.x + Math.cos(b.a) * b.d * grow * d.s, y = d.y + Math.sin(b.a) * b.d * grow * d.s * 0.8, r = Math.max(1, b.r * d.s * (0.25 + grow));
      const gr = g.createRadialGradient(x, y, 0, x, y, r), a = fade * b.k * (light ? 0.34 : 0.3);
      gr.addColorStop(0, `rgba(${sumi},${a})`); gr.addColorStop(0.55, `rgba(${sumi},${a * 0.45})`); gr.addColorStop(1, `rgba(${sumi},0)`);
      g.fillStyle = gr; g.beginPath(); g.arc(x, y, r, 0, Math.PI * 2); g.fill();
    }
    // feathered tendrils creeping along the paper fibres
    g.lineCap = 'round';
    for (const f of d.fib) {
      g.strokeStyle = `rgba(${sumi},${fade * (light ? 0.4 : 0.32)})`; g.lineWidth = f.w * (1 - grow * 0.5);
      g.beginPath(); let x = d.x, y = d.y; g.moveTo(x, y);
      for (let k = 1; k <= 6; k++) { const L = f.L * d.s * grow / 6; x += Math.cos(f.a + f.j[k]) * L; y += Math.sin(f.a + f.j[k]) * L * 0.8; g.lineTo(x, y); }
      g.stroke();
    }
    const hr = 6 + grow * 16, hg = g.createRadialGradient(d.x, d.y, 0, d.x, d.y, hr);
    hg.addColorStop(0, `rgba(${col},${fade * 0.5})`); hg.addColorStop(1, `rgba(${col},0)`);
    g.fillStyle = hg; g.beginPath(); g.arc(d.x, d.y, hr, 0, Math.PI * 2); g.fill();
  };
  const blots = () => Array.from({ length: 9 }, (_, i) => ({ a: i / 9 * 6.28 + Math.random() * 0.6, d: 0.15 + Math.random() * 0.5, r: 0.18 + Math.random() * 0.24, k: 0.5 + Math.random() * 0.5 }));
  const fibres = () => Array.from({ length: 11 }, () => ({ a: Math.random() * 6.28, L: 0.35 + Math.random() * 0.55, w: 0.6 + Math.random() * 1.4, j: Array.from({ length: 7 }, () => (Math.random() - 0.5) * 0.7) }));
  const drop = (x, y, s = 120 + Math.random() * 60) => { drops.push({ x, y, s, t: performance.now(), blobs: ink ? blots() : null, fib: ink ? fibres() : null }); if (!raf) raf = requestAnimationFrame(frame); };
  addEventListener('pointerdown', e => { if (e.pointerType !== 'mouse' || e.button === 0) { drop(e.clientX, e.clientY); sfx('drop'); } }, { passive: true });
  setInterval(() => { if (!document.hidden && drops.length < 2) drop(W * (0.1 + Math.random() * 0.8), H * (0.25 + Math.random() * 0.65), 90 + Math.random() * 80); }, 5200);
}
