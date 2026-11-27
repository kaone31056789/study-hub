// Hand-made theme switches for Matcha, Aizome and Kohaku (Ink and Sakura live in inkflood.js /
// petalstorm.js). Each one paints a canvas over the page until it is covered, calls change() to swap
// the theme underneath, then clears away to show the new look.
const TAU = Math.PI * 2;
const ease = v => (v < 0.5 ? 4 * v ** 3 : 1 - (-2 * v + 2) ** 3 / 2);
const easeOut = v => 1 - (1 - v) ** 3;
const clamp = v => Math.max(0, Math.min(1, v));

function stage() {
  const c = document.createElement('canvas');
  c.setAttribute('aria-hidden', 'true');
  c.style.cssText = 'position:fixed;inset:0;width:100vw;height:100vh;z-index:2147483000;pointer-events:none';
  document.body.appendChild(c);
  const dpr = Math.min(1.5, devicePixelRatio || 1), W = innerWidth, H = innerHeight;
  c.width = W * dpr; c.height = H * dpr;
  const g = c.getContext('2d'); g.setTransform(dpr, 0, 0, dpr, 0, 0);
  const layer = () => { const o = document.createElement('canvas'); o.width = c.width; o.height = c.height; const x = o.getContext('2d'); x.setTransform(dpr, 0, 0, dpr, 0, 0); return [o, x]; };
  return { c, g, W, H, dpr, diag: Math.hypot(W, H), layer };
}
const run = (frame, done) => { const t0 = performance.now(); const f = now => (frame(now - t0) ? requestAnimationFrame(f) : done()); requestAnimationFrame(f); };

/* ── Matcha: we make a bowl of tea on the page. Powder sifts down, hot water pours in and turns it
   green, then a bamboo whisk froths it in a fast zigzag until foam covers everything. The theme
   changes under the foam, and the bubbles pop to reveal it. ── */
export function matchaWhisk(change, e) {
  const { c, g, W, H, dpr, diag, layer } = stage();
  const [foamC, f] = layer();
  const cx = e ? e.clientX : W / 2, cy = e ? e.clientY : H * 0.55;
  const powder = Array.from({ length: Math.min(420, Math.round(W * H / 3500)) }, () => ({
    x: Math.random() * W, y1: H * (0.15 + Math.random() * 0.8), born: Math.random() * 380, r: 0.8 + Math.random() * 1.8, sway: Math.random() * TAU,
  }));
  const FOAM = ['#9cbf55', '#a9c962', '#b8d37a', '#c6dc8f', '#8fb34a'], POOL = '#86a944';
  const pops = Array.from({ length: 70 }, () => ({ x: Math.random() * W, y: Math.random() * H, at: Math.random() * 520, r: 60 + Math.random() * 220 }));
  const whiskAt = u => [W / 2 + Math.sin(u * TAU * 3.5) * W * 0.42, H * 0.18 + u * H * 0.64 + Math.sin(u * TAU * 7) * H * 0.07];
  const drawWhisk = (x, y, tilt) => {                                    // a chasen: bamboo handle + fan of tines
    g.save(); g.translate(x, y); g.rotate(tilt);
    g.strokeStyle = '#e6d6a2'; g.lineWidth = 1.4;
    for (let i = 0; i < 15; i++) { const a = (i / 14 - 0.5) * 1.6; g.beginPath(); g.moveTo(Math.sin(a) * 6, -30); g.quadraticCurveTo(Math.sin(a) * 30, 8, Math.sin(a) * 12, 26); g.stroke(); }
    g.fillStyle = '#c9a964'; g.fillRect(-8, -110, 16, 82);
    g.fillStyle = '#a8864a'; g.fillRect(-8, -78, 16, 4); g.fillRect(-8, -50, 16, 3);
    g.restore();
  };
  let swapped = false;
  run(t => {
    g.clearRect(0, 0, W, H);
    // 1 · hot water: a pale stream from the top-right "kettle", the pool spreads from where it lands
    if (t > 330 && t < 1500) {
      const u = clamp((t - 330) / 1150), R = 20 + diag * 0.95 * u ** 1.7;
      const pg = f.createRadialGradient(cx, cy, 0, cx, cy, R);
      pg.addColorStop(0, '#a9c962'); pg.addColorStop(0.7, POOL); pg.addColorStop(1, '#759838');
      f.fillStyle = pg; f.beginPath(); f.arc(cx, cy, R, 0, TAU); f.fill();
      f.strokeStyle = 'rgba(214,232,160,.35)'; f.lineWidth = 2;                       // the tea swirling
      for (let k = 1; k <= 3; k++) { f.beginPath(); f.arc(cx, cy, R * k / 4, t / 300 + k, t / 300 + k + 1.6); f.stroke(); }
    }
    // 2 · whisk: froth stamped along a fast zigzag
    if (t > 650 && t < 1560) {
      const u = clamp((t - 650) / 900), [x, y] = whiskAt(u);
      f.fillStyle = 'rgba(240,246,214,.7)';                                            // micro-froth
      for (let k = 0; k < 40; k++) { const a = Math.random() * TAU, d = Math.random() * 170; f.beginPath(); f.arc(x + Math.cos(a) * d, y + Math.sin(a) * d, 0.8 + Math.random() * 2.2, 0, TAU); f.fill(); }
      for (let k = 0; k < 18; k++) {
        const a = Math.random() * TAU, d = Math.random() * 150, r = 12 + Math.random() * 48, bx = x + Math.cos(a) * d, by = y + Math.sin(a) * d;
        f.fillStyle = FOAM[k % FOAM.length]; f.beginPath(); f.arc(bx, by, r, 0, TAU); f.fill();
        f.strokeStyle = 'rgba(240,246,214,.55)'; f.lineWidth = 1.2; f.beginPath(); f.arc(bx, by, r * 0.8, -2.2, -0.9); f.stroke();   // bubble shine
      }
    }
    if (t >= 1560 && !swapped) { swapped = true; f.fillStyle = POOL; f.globalCompositeOperation = 'destination-over'; f.fillRect(0, 0, W, H); f.globalCompositeOperation = 'source-over'; change(); }
    // 4 · bubbles pop to reveal the new theme
    if (swapped) {
      const s = t - 1560;
      f.globalCompositeOperation = 'destination-out';
      for (const p of pops) {
        if (s < p.at) continue;
        const q = clamp((s - p.at) / 260), R = p.r * easeOut(q);
        const gr = f.createRadialGradient(p.x, p.y, R * 0.75, p.x, p.y, R + 1);
        gr.addColorStop(0, '#000'); gr.addColorStop(1, 'rgba(0,0,0,0)');
        f.fillStyle = gr; f.beginPath(); f.arc(p.x, p.y, R + 1, 0, TAU); f.fill();
      }
      if (s > 560) { f.fillStyle = `rgba(0,0,0,${clamp((s - 560) / 220)})`; f.fillRect(0, 0, W, H); }
      f.globalCompositeOperation = 'source-over';
    }
    g.setTransform(1, 0, 0, 1, 0, 0); g.drawImage(foamC, 0, 0); g.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (swapped) {                                                                    // each pop: a shiny rim bursting
      const s = t - 1560;
      for (const p of pops) {
        const q = (s - p.at) / 260; if (q < 0 || q > 1) continue;
        g.strokeStyle = `rgba(236,245,206,${0.8 * (1 - q)})`; g.lineWidth = 2.5 * (1 - q) + 0.5;
        g.beginPath(); g.arc(p.x, p.y, p.r * easeOut(q), 0, TAU); g.stroke();
      }
    }
    // powder: fine green dust sifting down (drawn over the pool so it reads as being stirred in)
    if (t < 1100) {
      g.fillStyle = '#5f8a2e';
      for (const p of powder) {
        const s = (t - p.born) / 420; if (s < 0) continue;
        const y = Math.min(p.y1, -10 + (p.y1 + 10) * easeOut(clamp(s))), x = p.x + Math.sin(s * 5 + p.sway) * 6;
        g.globalAlpha = 0.85 * (1 - clamp((t - 700) / 400)); g.beginPath(); g.arc(x, y, p.r, 0, TAU); g.fill();
      }
      g.globalAlpha = 1;
    }
    if (t > 280 && t < 700) {                                                         // the pour itself
      const a = clamp((t - 280) / 80) * (1 - clamp((t - 620) / 80));
      g.strokeStyle = `rgba(214,236,240,${0.75 * a})`; g.lineWidth = 7; g.lineCap = 'round';
      g.beginPath(); g.moveTo(W + 20, -20); g.quadraticCurveTo(W * 0.75, H * 0.05, cx, cy); g.stroke();
      g.strokeStyle = `rgba(255,255,255,${0.5 * a})`; g.lineWidth = 2; g.stroke();
    }
    if (t > 650 && t < 1560) { const u = clamp((t - 650) / 900), [x, y] = whiskAt(u), [x2] = whiskAt(Math.min(1, u + 0.01)); drawWhisk(x, y, Math.max(-0.5, Math.min(0.5, (x2 - x) * 0.02))); }
    return t < 2400;
  }, () => c.remove());
}

/* ── Aizome: the page is dipped in indigo. Dye soaks down the cloth with drips running ahead of the
   line, the theme changes while it is fully dyed, then the dye drains off the bottom. ── */
export function dyeDrip(change) {
  const { c, g, W, H } = stage();
  const N = Math.max(24, Math.round(W / 18)), cols = Array.from({ length: N + 1 }, (_, i) => ({ v: Math.sin(i * 0.7) * 26 + (Math.random() - 0.5) * 40, drip: Math.random() < 0.22 ? 50 + Math.random() * 110 : 0 }));
  const smooth = cols.map((p, i) => ({ ...p, v: (p.v + (cols[i - 1]?.v ?? p.v) + (cols[i + 1]?.v ?? p.v)) / 3 }));
  const IN = 1150, OUT = 900, drops = [];
  const edge = (base, k = 1) => {                                                  // the wavy dye line with drips
    const P = [];
    for (let i = 0; i <= N; i++) { const x = (i / N) * W, s = smooth[i]; P.push([x, base + s.v * k + s.drip * k]); }
    return P;
  };
  const fillBand = (top, bot) => {
    g.beginPath(); g.moveTo(top[0][0], top[0][1]);
    for (let i = 1; i < top.length; i++) { const [x0, y0] = top[i - 1], [x1, y1] = top[i]; g.quadraticCurveTo(x0, y0, (x0 + x1) / 2, (y0 + y1) / 2); }
    g.lineTo(W, top[top.length - 1][1]); g.lineTo(bot[bot.length - 1][0], bot[bot.length - 1][1]);
    for (let i = bot.length - 2; i >= 0; i--) { const [x0, y0] = bot[i + 1], [x1, y1] = bot[i]; g.quadraticCurveTo(x0, y0, (x0 + x1) / 2, (y0 + y1) / 2); }
    g.lineTo(0, bot[0][1]); g.closePath();
  };
  let swapped = false;
  run(t => {
    g.clearRect(0, 0, W, H);
    const front = -170 + (H + 360) * ease(clamp(t / IN));
    const top = t < IN ? -400 : -200 + (H + 420) * ease(clamp((t - IN) / OUT));
    const topEdge = edge(top, 0.8), bot = edge(Math.max(front, top + 10));
    const gr = g.createLinearGradient(0, top, 0, front + 150);
    gr.addColorStop(0, '#101a3e'); gr.addColorStop(0.7, '#1d2d6a'); gr.addColorStop(1, '#34489f');
    g.fillStyle = gr; fillBand(topEdge, bot); g.fill();
    g.save(); g.clip();                                                         // cloth weave + gold thread
    g.globalAlpha = 0.07; g.strokeStyle = '#e8eefc'; g.lineWidth = 1; g.beginPath();
    for (let y = 0; y < H; y += 6) { g.moveTo(0, y); g.lineTo(W, y); }
    for (let x = 0; x < W; x += 6) { g.moveTo(x, 0); g.lineTo(x, H); }
    g.stroke(); g.globalAlpha = 0.5; g.strokeStyle = '#e8b64c'; g.lineWidth = 1.5; g.beginPath();
    for (let x = W * 0.15; x < W; x += W * 0.35) { g.moveTo(x, 0); g.lineTo(x, H); }
    g.stroke(); g.restore();
    g.globalAlpha = 0.35; g.strokeStyle = '#7f95dd'; g.lineWidth = 3; g.beginPath();          // wet leading edge
    bot.forEach(([x, y], i) => (i ? g.lineTo(x, y) : g.moveTo(x, y))); g.stroke(); g.globalAlpha = 1;
    if (t < IN && Math.random() < 0.5) { const i = Math.floor(Math.random() * N); if (smooth[i].drip) drops.push({ x: (i / N) * W, y: bot[i][1], t }); }
    g.fillStyle = '#2b3d88';
    for (const d of drops) { const s = (t - d.t) / 1000, y = d.y + 400 * s * s + 60 * s; g.beginPath(); g.ellipse(d.x, y, 3.2, 5.5, 0, 0, TAU); g.fill(); }
    if (t >= IN && !swapped) { swapped = true; change(); }
    return t < IN + OUT;
  }, () => c.remove());
}

/* ── Kohaku: warm amber resin pours from where you tapped and slowly swallows the page, with
   fireflies glowing inside it. The theme changes under the resin, which then clears like glass
   while the fireflies drift up and fade. ── */
export function amberResin(change, e) {
  const { c, g, W, H, diag } = stage();
  const cx = e ? e.clientX : W / 2, cy = e ? e.clientY : H / 2;
  const lobes = Array.from({ length: 3 }, () => ({ k: 2 + Math.floor(Math.random() * 4), a: 0.05 + Math.random() * 0.07, p: Math.random() * TAU }));
  const flies = Array.from({ length: 46 }, () => ({ x: Math.random() * W, y: Math.random() * H, p: Math.random() * TAU, sp: 0.6 + Math.random() * 1.6, r: 2 + Math.random() * 3.5, up: 40 + Math.random() * 90 }));
  const POUR = 320, IN = 1350, OUT = 1000;
  let swapped = false;
  run(t => {
    g.clearRect(0, 0, W, H);
    const u = clamp((t - POUR) / (IN - POUR)), R = t < POUR ? 0 : 14 + diag * 1.2 * ease(u);
    const clear = swapped ? clamp((t - IN) / (OUT * 0.7)) : 0;
    if (t < POUR + 120) {                                                       // the pour: a thick amber thread
      const a = 1 - clamp((t - POUR) / 120), y = Math.min(cy, -20 + (cy + 20) * easeOut(clamp(t / POUR)));
      g.strokeStyle = `rgba(240,162,59,${a})`; g.lineWidth = 9; g.lineCap = 'round'; g.beginPath(); g.moveTo(cx, -20); g.lineTo(cx, y); g.stroke();
      g.strokeStyle = `rgba(255,226,160,${a * 0.7})`; g.lineWidth = 2.5; g.beginPath(); g.moveTo(cx - 2, -20); g.lineTo(cx - 2, y); g.stroke();
    }
    if (R > 0 && clear < 1) {
      g.beginPath();
      for (let i = 0; i <= 90; i++) { const th = i / 90 * TAU; let k = 1; for (const l of lobes) k += l.a * Math.sin(l.k * th + l.p + t / 900); const r = R * k; i ? g.lineTo(cx + Math.cos(th) * r, cy + Math.sin(th) * r) : g.moveTo(cx + Math.cos(th) * r, cy + Math.sin(th) * r); }
      g.closePath();
      const gr = g.createRadialGradient(cx, cy, 0, cx, cy, Math.max(40, Math.min(R, diag)));
      gr.addColorStop(0, '#ffd27a'); gr.addColorStop(0.55, '#f0a23b'); gr.addColorStop(1, '#b8661a');
      g.globalAlpha = 0.97 * (1 - clear); g.fillStyle = gr; g.fill();
      g.globalAlpha = 0.28 * (1 - clear); g.fillStyle = '#fff6dd';                         // glossy highlight
      g.beginPath(); g.ellipse(cx - R * 0.25, cy - R * 0.3, R * 0.35, R * 0.12, -0.5, 0, TAU); g.fill();
      g.globalAlpha = 1;
    }
    if (t >= IN && !swapped) { swapped = true; change(); }
    // fireflies: glow inside the resin, then rise and fade after it clears
    for (const fl of flies) {
      const inside = Math.hypot(fl.x - cx, fl.y - cy) < R * 0.95;
      if (!inside && !swapped) continue;
      const s = t / 1000, rise = swapped ? fl.up * ((t - IN) / 1000) ** 1.4 : 0;
      const x = fl.x + Math.sin(s * fl.sp + fl.p) * 14, y = fl.y + Math.cos(s * fl.sp * 0.8 + fl.p) * 10 - rise;
      const a = (0.55 + 0.45 * Math.sin(s * 6 * fl.sp + fl.p)) * (swapped ? 1 - clamp((t - IN) / OUT) : 1);
      const gl = g.createRadialGradient(x, y, 0, x, y, fl.r * 5);
      gl.addColorStop(0, `rgba(255,248,190,${a})`); gl.addColorStop(0.3, `rgba(230,240,120,${a * 0.5})`); gl.addColorStop(1, 'rgba(230,240,120,0)');
      g.fillStyle = gl; g.beginPath(); g.arc(x, y, fl.r * 5, 0, TAU); g.fill();
    }
    return t < IN + OUT;
  }, () => c.remove());
}
