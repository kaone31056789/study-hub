// Scroll dissolve (VengeanceUI "scroll dissolve reveal" idea, done in 2D): blocks enter covered by
// page-coloured pixels that burn away along a noisy front with a vermilion edge. Once per block.
const SEL = '.pq, .sec > .bx, .sec > .prose, .sec > .wt, .sec > .dg, .rev-card, .paper-sec-h';
const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
const done = new WeakSet();

function burn(el) {
  const r = el.getBoundingClientRect();
  const W = el.offsetWidth, H = el.offsetHeight;
  if (W < 40 || H < 20 || H > 2600) return;
  const c = document.createElement('canvas');
  c.className = 'dissolve'; c.setAttribute('aria-hidden', 'true');
  const z = r.width / W || 1, dpr = Math.min(2, devicePixelRatio || 1) * z, B = 7;
  c.width = Math.ceil(W * dpr); c.height = Math.ceil(H * dpr);
  if (getComputedStyle(el).position === 'static') el.style.position = 'relative';
  el.append(c);
  const g = c.getContext('2d'); g.scale(dpr, dpr);
  // cover with whatever is really behind the block (its own card colour, else the page), burn in the accent
  let bg = '', a = el;
  while (a && a !== document.documentElement) { const b = getComputedStyle(a).backgroundColor; if (b && !/rgba\(.*,\s*0\)$|transparent/.test(b)) { bg = b; break; } a = a.parentElement; }
  const css = getComputedStyle(document.documentElement);
  bg ||= css.getPropertyValue('--bg').trim() || '#0e0d0c';
  const acc = css.getPropertyValue('--accent').trim() || '#d9452b';
  const cols = Math.ceil(W / B), rows = Math.ceil(H / B), n = new Float32Array(cols * rows);
  // smooth-ish noise + a top-to-bottom bias so it reads as "arriving"
  for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) {
    const v = Math.sin(x * 0.35 + y * 0.21) * 0.25 + Math.sin(x * 0.13 - y * 0.47) * 0.25 + Math.abs(Math.sin(x * 91.7 + y * 37.3) * 437.5 % 1) * 0.5;
    n[y * cols + x] = v * 0.7 + (y / rows) * 0.3;
  }
  const t0 = performance.now(), D = 650;
  const frame = now => {
    const p = Math.min(1, (now - t0) / D) * 1.2;
    g.clearRect(0, 0, W, H);
    for (let i = 0; i < n.length; i++) {
      const d = n[i] - p; if (d < 0) continue;
      const x = (i % cols) * B, y = ((i / cols) | 0) * B;
      g.globalAlpha = d < 0.05 ? 0.9 : d < 0.1 ? 0.45 : 1;
      g.fillStyle = d < 0.1 ? acc : bg;
      g.fillRect(x, y, B, B);
    }
    g.globalAlpha = 1;
    if (p < 1.2) requestAnimationFrame(frame); else c.remove();
  };
  requestAnimationFrame(frame);
}

if (!calm) {
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    io.unobserve(e.target); burn(e.target);
  }), { rootMargin: '0px 0px -8% 0px' });
  const scan = root => root.querySelectorAll?.(SEL).forEach(el => { if (!done.has(el)) { done.add(el); io.observe(el); } });
  new MutationObserver(ms => { for (const m of ms) for (const nd of m.addedNodes) if (nd.nodeType === 1) { if (nd.matches(SEL) && !done.has(nd)) { done.add(nd); io.observe(nd); } scan(nd); } })
    .observe(document.getElementById('root'), { childList: true, subtree: true });
}
