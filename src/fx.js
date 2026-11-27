// Desktop-only flourishes. Each is off for touch and for reduced motion.
const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;

if (fine && !calm) {
  /* ---- ink brush trail: stroke gets thinner the faster you move, then dries away ---- */
  const c = document.createElement('canvas');
  c.className = 'ink-trail'; c.setAttribute('aria-hidden', 'true');
  document.body.append(c);
  const g = c.getContext('2d');
  let pts = [], raf = 0, dpr = 1;
  const size = () => { dpr = Math.min(2, devicePixelRatio || 1); c.width = innerWidth * dpr; c.height = innerHeight * dpr; };
  size(); addEventListener('resize', size);
  const tick = () => {
    const now = performance.now();
    pts = pts.filter(p => now - p.t < 520);
    g.setTransform(dpr, 0, 0, dpr, 0, 0); g.clearRect(0, 0, innerWidth, innerHeight);
    const light = document.documentElement.dataset.theme === 'light';
    g.lineCap = g.lineJoin = 'round';
    for (let i = 1; i < pts.length; i++) {
      const a = pts[i - 1], b = pts[i], age = (now - b.t) / 520;
      g.strokeStyle = light ? `rgba(27,25,23,${0.28 * (1 - age)})` : `rgba(233,226,212,${0.22 * (1 - age)})`;
      g.lineWidth = Math.max(0.6, b.w * (1 - age));
      g.beginPath(); g.moveTo(a.x, a.y); g.lineTo(b.x, b.y); g.stroke();
    }
    raf = pts.length ? requestAnimationFrame(tick) : 0;
  };
  addEventListener('pointermove', e => {
    if (e.pointerType !== 'mouse') return;
    const last = pts[pts.length - 1], sp = last ? Math.hypot(e.clientX - last.x, e.clientY - last.y) : 0;
    pts.push({ x: e.clientX, y: e.clientY, t: performance.now(), w: Math.max(1, 7 - sp * 0.12) });
    if (!raf) raf = requestAnimationFrame(tick);
  }, { passive: true });

  /* ---- nav labels scramble briefly on hover ---- */
  const G = 'アイウエオカキクケコサシスセソ#%&*+=';
  addEventListener('pointerover', e => {
    const a = e.target.closest?.('.top .tabs a');
    if (!a || a.dataset.scr || a.contains(e.relatedTarget)) return;
    const n = [...a.childNodes].find(x => x.nodeType === 3 && x.nodeValue.trim());
    if (!n) return;
    const to = n.nodeValue, t0 = performance.now(); a.dataset.scr = 1;
    const step = now => {
      const p = Math.min(1, (now - t0) / 320);
      if (n.nodeValue !== (n._l ?? to)) { delete a.dataset.scr; return; }   // React changed it
      n.nodeValue = n._l = p >= 1 ? to : [...to].map((ch, i) => i / to.length < p || ch === ' ' ? ch : G[(Math.random() * G.length) | 0]).join('');
      if (p < 1) requestAnimationFrame(step); else { delete a.dataset.scr; n._l = undefined; }
    };
    requestAnimationFrame(step);
  });

  /* ---- magnetic primary buttons ---- */
  addEventListener('pointermove', e => {
    const b = e.target.closest?.('.btn.primary, .ask-send');
    if (!b) return;
    const r = b.getBoundingClientRect();
    b.style.setProperty('--mgx', ((e.clientX - r.left) / r.width - 0.5) * 8 + 'px');
    b.style.setProperty('--mgy', ((e.clientY - r.top) / r.height - 0.5) * 6 + 'px');
  }, { passive: true });
  addEventListener('pointerout', e => {
    const b = e.target.closest?.('.btn.primary, .ask-send');
    if (b && !b.contains(e.relatedTarget)) { b.style.removeProperty('--mgx'); b.style.removeProperty('--mgy'); }
  });
}
