// Ink drops on the whole page: a tap anywhere sends rings out in the skin's accent, and now and then
// a drop falls by itself. One fixed canvas behind the content; idle (no frames) when nothing moves.
const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!calm) {
  const c = document.createElement('canvas');
  c.className = 'ink-drops'; c.setAttribute('aria-hidden', 'true');
  document.body.prepend(c);
  const g = c.getContext('2d');
  let W = 0, H = 0, dpr = 1, raf = 0, col = '217,69,43', light = false;
  const drops = [];
  const size = () => { dpr = Math.min(2, devicePixelRatio || 1); W = innerWidth; H = innerHeight; c.width = W * dpr; c.height = H * dpr; };
  const colour = () => {
    const v = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();
    const m = /^#([0-9a-f]{6})$/i.exec(v); if (m) { const n = parseInt(m[1], 16); col = [n >> 16, (n >> 8) & 255, n & 255].join(','); }
    light = document.documentElement.dataset.theme === 'light';
  };
  size(); colour();
  addEventListener('resize', size);
  new MutationObserver(colour).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme', 'data-skin'] });

  const frame = now => {
    g.setTransform(dpr, 0, 0, dpr, 0, 0); g.clearRect(0, 0, W, H);
    for (let i = drops.length - 1; i >= 0; i--) {
      const d = drops[i], t = (now - d.t) / 1000;
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
  const drop = (x, y, s = 120 + Math.random() * 60) => { drops.push({ x, y, s, t: performance.now() }); if (!raf) raf = requestAnimationFrame(frame); };
  addEventListener('pointerdown', e => { if (e.pointerType !== 'mouse' || e.button === 0) drop(e.clientX, e.clientY); }, { passive: true });
  setInterval(() => { if (!document.hidden && drops.length < 2) drop(W * (0.1 + Math.random() * 0.8), H * (0.25 + Math.random() * 0.65), 90 + Math.random() * 80); }, 5200);
}
