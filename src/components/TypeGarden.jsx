// Type Garden, ported from Akshat Agarwal's type-garden.vercel.app (source shared via its "Copy code"
// button, offered for making your own). Stems and roses grow out of the letters as they appear;
// space cuts the stem, backspace withers. Trimmed to the growth engine (no butterflies, live
// cursors or poster export) and recoloured in ink: washi stems, vermilion roses.
import { useEffect, useRef, useState } from 'react';
import { useTheme } from '../theme';

const F = '"Shippori Mincho B1","Playfair Display",Georgia,serif';
// Colours come from the live theme: roses in the skin's accent, letters in the text colour.
const hex = v => { const m = /^#?([0-9a-f]{6})$/i.exec(v.trim()); const n = m ? parseInt(m[1], 16) : 0xd9452b; return [n >> 16, (n >> 8) & 255, n & 255]; };
const mix = (a, b, t) => '#' + a.map((x, i) => Math.round(x + (b[i] - x) * t).toString(16).padStart(2, '0')).join('');
const pal = () => {
  const cs = getComputedStyle(document.documentElement), v = k => cs.getPropertyValue(k).trim();
  const light = document.documentElement.dataset.theme === 'light', acc = hex(v('--accent') || '#d9452b');
  return { red: mix(acc, [0, 0, 0], 0), line: mix(acc, [255, 255, 255], light ? 0.8 : 0.6), blue: v('--muted') || (light ? '#3d3a36' : '#a89f90'),
    text: v('--strong') || v('--text') || (light ? '#1b1917' : '#e9e2d4'), vein: v('--bg') || (light ? '#f6f1e7' : '#0e0d0c'),
    ...(document.documentElement.dataset.skin === 'sakura' ? { sakura: true, red: light ? '#f48fb1' : '#f7aac4', core: '#c2185b', line: '#fff3f7' } : {}) };
};

const h = n => { const x = Math.sin(n) * 43758.5453; return x - Math.floor(x); };
const spr = (t, k = 7, w = 16) => t <= 0 ? 0 : 1 - Math.exp(-t * k) * Math.cos(t * w);
const eo = t => t <= 0 ? 0 : t >= 1 ? 1 : 1 - Math.pow(1 - t, 3);
const rng = seed => {
  let s = seed | 0;
  return () => { s = (s + 0x6D2B79F5) | 0; let t = Math.imul(s ^ (s >>> 15), 1 | s); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
};
const bez = (a, b, c, d, n) => {
  const P = [];
  for (let i = 0; i <= n; i++) { const t = i / n, u = 1 - t;
    P.push([u*u*u*a[0] + 3*u*u*t*b[0] + 3*u*t*t*c[0] + t*t*t*d[0], u*u*u*a[1] + 3*u*u*t*b[1] + 3*u*t*t*c[1] + t*t*t*d[1]]); }
  return P;
};
const at = (P, u) => {
  const n = P.length, i = Math.min(n - 2, Math.max(1, Math.round(u * (n - 1))));
  return [P[i], Math.atan2(P[i+1][1] - P[i-1][1], P[i+1][0] - P[i-1][0])];
};
const jit = (id, f, amp) => !amp ? [0, 0, 0] :
  [(h(id*1.37 + f*7.13)*2 - 1)*amp, (h(id*2.71 + f*3.11)*2 - 1)*amp, (h(id*5.3 + f*1.7)*2 - 1)*0.035];
const path = (c, p, closed) => {
  const n = p.length; if (n < 2) return;
  const m = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
  if (closed) {
    const s = m(p[n-1], p[0]); c.moveTo(s[0], s[1]);
    for (let i = 0; i < n; i++) { const q = m(p[i], p[(i+1) % n]); c.quadraticCurveTo(p[i][0], p[i][1], q[0], q[1]); }
    c.closePath();
  } else {
    c.moveTo(p[0][0], p[0][1]);
    for (let i = 1; i < n - 1; i++) { const q = m(p[i], p[i+1]); c.quadraticCurveTo(p[i][0], p[i][1], q[0], q[1]); }
    c.lineTo(p[n-1][0], p[n-1][1]);
  }
};
const vine = (base, dir, len, amp, waves, ph, bend, n = 40) => {
  const P = [[base[0], base[1]]], step = len / n; let x = base[0], y = base[1];
  for (let i = 1; i <= n; i++) {
    const u = i / n, a = dir + bend * u + amp * Math.sin(u * Math.PI * waves + ph) * Math.min(1, u * 3);
    x += Math.cos(a) * step; y += Math.sin(a) * step; P.push([x, y]);
  }
  return P;
};
const curl = (P, sign, rad) => {
  const n = P.length, e = P[n - 1], a = Math.atan2(e[1] - P[n - 2][1], e[0] - P[n - 2][0]);
  const c = [e[0] - Math.sin(a) * sign * rad, e[1] + Math.cos(a) * sign * rad], a0 = Math.atan2(e[1] - c[1], e[0] - c[0]);
  for (let i = 1; i <= 14; i++) { const u = i / 14, t = a0 + sign * u * Math.PI * 1.6, rr = rad * (1 - 0.5 * u); P.push([c[0] + Math.cos(t) * rr, c[1] + Math.sin(t) * rr]); }
  return P;
};
const weave = (r, startLayer) => {
  const cuts = [], nc = 1 + Math.floor(r() * 3);
  for (let i = 0; i < nc; i++) cuts.push(0.15 + r() * 0.7);
  cuts.sort((a, b) => a - b);
  const segs = []; let u0 = 0, layer = startLayer;
  for (const c of cuts) {
    if (c <= u0) continue;
    segs.push({ u0, u1: c, layer });
    u0 = r() < 0.3 ? Math.min(0.98, c + 0.02 + r() * 0.03) : c;
    layer = 1 - layer;
  }
  segs.push({ u0, u1: 1, layer });
  return segs;
};
const layerAt = (segs, u) => { for (const s of segs) if (u >= s.u0 && u <= s.u1) return s.layer; return segs[segs.length - 1].layer; };

class Garden {
  constructor(canvas, C) {
    this.cv = canvas; this.g = canvas.getContext('2d'); this.C = C;
    this.letters = []; this.uid = 1; this.cache = {}; this.rand = rng((Math.random() * 1e9) | 0);
    this.lastKey = 0; this.caret = false;
  }
  B() {
    const g = this.g;
    return {
      fill: (p, col) => { g.beginPath(); path(g, p, true); g.fillStyle = col; g.fill(); },
      stroke: (p, col, w) => { g.beginPath(); path(g, p, false); g.strokeStyle = col; g.lineWidth = w; g.lineCap = 'round'; g.lineJoin = 'round'; g.stroke(); },
      text: (ch, x, y, S, col) => { g.font = `700 ${S}px ${F}`; g.textAlign = 'center'; g.textBaseline = 'alphabetic'; g.fillStyle = col; g.fillText(ch, x, y); }
    };
  }
  resize() {
    const r = this.cv.getBoundingClientRect(), d = Math.min(2, window.devicePixelRatio || 1);
    if (!r.width) return;
    // the canvas may sit inside a CSS-zoomed page: draw in its own CSS px, not the zoomed rect
    this.W = this.cv.offsetWidth; this.H = this.cv.offsetHeight; this.dpr = d * (r.width / this.W || 1);
    this.cv.width = Math.round(this.W * this.dpr); this.cv.height = Math.round(this.H * this.dpr);
    this.cache = {}; this.layout(true);
  }
  mw(ch) {
    if (this.cache[ch] != null) return this.cache[ch];
    this.g.font = `700 100px ${F}`;
    let w = this.g.measureText(ch).width / 100;
    if (ch === ' ') w *= 1.4;
    return (this.cache[ch] = w);
  }
  layoutCore(A, W, H, prevWrapped) {
    const maxW = W * 0.84, S0 = H * 0.3, LH = 2.1, ws = A.map(l => this.mw(l.ch)), words = []; let cur = null;
    A.forEach((l, i) => {
      if (l.ch === ' ') { if (cur) { words.push(cur); cur = null; } words.push({ sp: true, idx: [i] }); }
      else { if (!cur) cur = { idx: [] }; cur.idx.push(i); }
    });
    if (cur) words.push(cur);
    const lineW = (li, S) => { let e = li.length; while (e > 0 && A[li[e-1]].ch === ' ') e--; let w = 0; for (let k = 0; k < e; k++) w += ws[li[k]]; return w * S; };
    const wrap = S => {
      const lines = [[]]; let lw = 0;
      for (const w of words) {
        const ww = w.idx.reduce((s, i) => s + ws[i], 0) * S;
        if (!w.sp && lw > 0 && lw + ww > maxW) { lines.push([]); lw = 0; }
        lines[lines.length - 1].push(...w.idx); lw += ww;
      }
      return lines;
    };
    let lines = [A.map((_, i) => i)];
    const unit = lineW(lines[0], 1);
    let S = unit > 0 ? Math.min(S0, maxW / unit) : S0;
    const multi = words.filter(w => !w.sp).length > 1;
    let wrapped = multi && (S < H * 0.1 || (prevWrapped && S < H * 0.14));
    if (wrapped) {
      let lo = H * 0.03, hi = H * 0.15;
      for (let k = 0; k < 22; k++) {
        const mid = (lo + hi) / 2, ls = wrap(mid);
        if (ls.every(li => lineW(li, mid) <= maxW) && ls.length * LH * mid <= H * 0.82) lo = mid; else hi = mid;
      }
      S = lo; lines = wrap(S);
      if (lines.length < 2) wrapped = false;
    }
    const n = lines.length, lh = LH * S;
    lines.forEach((li, k) => {
      let x = W / 2 - lineW(li, S) / 2;
      const y = H / 2 + (k - (n - 1) / 2) * lh + 0.33 * S;
      li.forEach(i => { const l = A[i], w = ws[i] * S; l.tx = x + w / 2; l.ty = y; l.tw = w; x += w; });
    });
    return { S, wrapped };
  }
  layout(snap) {
    if (!this.W) return;
    const A = this.letters.filter(l => !l.dead), res = this.layoutCore(A, this.W, this.H, this.wrapped);
    this.wrapped = res.wrapped;
    A.forEach(l => { if (l.x == null) { l.x = l.tx; l.y = l.ty; } });
    const S = res.S, last = A[A.length - 1];
    this.St = S;
    this.ctx_ = last ? last.tx + last.tw / 2 + 0.07 * S : this.W / 2;
    this.cty = last ? last.ty - 0.33 * S : this.H / 2;
    if (snap || !this.Sd) { this.Sd = S; this.cx = this.ctx_; this.cy = this.cty; A.forEach(l => { l.x = l.tx; l.y = l.ty; }); }
  }
  text() { return this.letters.filter(l => !l.dead).map(l => l.ch).join(''); }
  // make the garden spell `s`: wither what no longer matches, grow the rest
  set(s, now = performance.now()) {
    const old = this.text(); let p = 0;
    while (p < old.length && p < s.length && old[p] === s[p]) p++;
    for (let i = old.length; i > p; i--) this.wither(now);
    for (const ch of s.slice(p)) this.add(ch, now);
    this.lastKey = now;
  }
  wither(now) {
    const A = this.letters.filter(l => !l.dead), last = A[A.length - 1];
    if (!last) return;
    last.dead = now;
    const pv = A[A.length - 2];
    if (pv && pv.ch !== ' ') { pv.cut = null; pv.endEls = null; pv.tb = now; }
    this.layout();
  }
  add(ch, now) {
    const A = this.letters.filter(l => !l.dead), last = A[A.length - 1];
    if (ch === ' ') {
      if (last && last.ch !== ' ') { last.cut = now; this.genEnd(last, now - last.birth); }
      this.letters.push({ ch: ' ', id: this.uid++, birth: now, els: [] });
      this.layout(); return;
    }
    const same = last && last.ch !== ' ';
    const l = { ch, id: this.uid++, birth: now, tb: now, ws: same ? last.ws : Math.floor(this.rand() * 1e9), wi: same ? last.wi + 1 : 0, prev: same ? last : null };
    this.gen(l);
    this.letters.push(l);
    this.layout();
  }
  wordParams(ws) {
    const r = rng(ws * 7 + 13);
    return { roseP: 0.3 + r() * 0.3, leafy: 0.6 + r() * 0.8, dens: 1, lean: (r() - 0.5) * 0.6, big: 0.85 + r() * 0.45, curvy: 0.8 + r() * 0.6, bridgeP: Math.min(0.95, 0.45 + r() * 0.35), w: 0.5 };
  }
  grow(r, E, nid, p, o) {
    const tip = o.tip || (r() < p.roseP ? 'rose' : r() < 0.45 ? 'fan' : r() < 0.6 ? 'leaf' : 'curl');
    let P = o.pts || vine(o.base, o.dir, o.len, (0.35 + r() * 0.45) * p.curvy, 1 + r() * 1.6, r() * 6.28, (r() - 0.5) * 1.2, 40);
    if (tip === 'curl') P = curl(P, r() < 0.5 ? -1 : 1, 0.05 + r() * 0.05);
    const segs = weave(r, o.layer0 != null ? o.layer0 : (r() < 0.5 ? 0 : 1));
    const dur = Math.max(320, (o.len || 0.8) * 620);
    const thorns = [], nt = Math.floor(r() * 2.5);
    for (let i = 0; i < nt; i++) thorns.push({ u: 0.15 + r() * 0.65, s: r() < 0.5 ? -1 : 1 });
    E.push({ t: 'stem', id: nid(), pts: P, segs, d0: o.d0, dur, w: o.depth ? 0.82 : 1, thorns });
    const nl = Math.floor(r() * 2.8 * p.leafy);
    let sd = r() < 0.5 ? -1 : 1;
    for (let i = 0; i < nl; i++) {
      const u = 0.25 + r() * 0.6, [q, a] = at(P, u); sd = -sd;
      E.push({ t: 'leaf', id: nid(), x: q[0], y: q[1], a: a + sd * (0.55 + r() * 0.5), L: (0.14 + r() * 0.2) * (o.depth ? 0.8 : 1), bend: (r() - 0.5) * 1.2, layer: layerAt(segs, u), d0: o.d0 + dur * u });
    }
    const [tp, ta] = at(P, 1), td = o.d0 + dur * 0.8, tl = layerAt(segs, 1);
    if (tip === 'rose') {
      const R = (0.13 + r() * 0.15) * p.big * (o.depth ? 0.75 : 1);
      const over = tp[1] > -0.78 && tp[1] < 0.05 && Math.abs(tp[0]) < p.w * 0.5; // keep letters readable
      const layer = over ? (r() < 0.22 ? 1 : 0) : (r() < 0.6 ? 1 : tl);
      E.push({ t: 'rose', id: nid(), x: tp[0], y: tp[1], R, rot: (r() - 0.5), ph1: r() * 6.28, ph2: r() * 6.28, turns: 1.8 + r(), layer, d0: td });
      if (r() < 0.2) { const oo = ta + (r() < 0.5 ? 1 : -1) * 1.3; E.push({ t: 'rose', id: nid(), x: tp[0] + Math.cos(oo) * R * 1.4, y: tp[1] + Math.sin(oo) * R * 1.4, R: R * (0.6 + r() * 0.3), rot: (r() - 0.5) * 1.2, ph1: r() * 6.28, ph2: r() * 6.28, turns: 1.8 + r(), layer, d0: td + 120 }); }
    } else if (tip === 'fan') {
      const spread = 0.6 + r() * 0.3;
      for (let j = 0; j < 2; j++) E.push({ t: 'leaf', id: nid(), x: tp[0], y: tp[1], a: ta + (j - 0.5) * spread, L: 0.2 + r() * 0.2, bend: (j - 0.5) * 0.8, layer: tl, d0: td + j * 60 });
    } else if (tip === 'leaf') {
      E.push({ t: 'leaf', id: nid(), x: tp[0], y: tp[1], a: ta + (r() - 0.5) * 0.3, L: 0.16 + r() * 0.16, bend: r() - 0.5, layer: tl, d0: td });
    }
    if (!o.depth && r() < 0.3) {
      const u = 0.35 + r() * 0.35, [q, a] = at(P, u);
      this.grow(r, E, nid, p, { base: q, dir: a + (r() < 0.5 ? -1 : 1) * (0.7 + r() * 0.4), len: (o.len || 0.8) * (0.35 + r() * 0.2), d0: o.d0 + dur * u, depth: 1, layer0: layerAt(segs, u) });
    }
    return P;
  }
  gen(l) {
    const r = rng((l.ws ^ Math.imul(l.wi + 1, 2654435761)) + Math.floor(this.rand() * 1e6));
    const p = this.wordParams(l.ws), E = []; let k0 = 0; const nid = () => l.id * 100 + (k0++);
    const w = this.mw(l.ch), inX = () => (r() - 0.5) * w * 0.7; p.w = w;
    const nUp = 1 + (r() < 0.45 ? 1 : 0);
    for (let i = 0; i < nUp; i++)
      this.grow(r, E, nid, p, { base: [inX(), -r() * 0.3], dir: -Math.PI / 2 + p.lean * 0.5 + (r() - 0.5) * 0.7, len: 0.6 + r() * 0.5, d0: 40 + i * 130, tip: l.wi === 0 && i === 0 ? 'rose' : null });
    if (r() < 0.4) this.grow(r, E, nid, p, { base: [inX(), -0.1 - r() * 0.35], dir: Math.PI / 2 + (r() - 0.5) * 0.8, len: 0.35 + r() * 0.35, d0: 160 });
    if (l.prev && r() < p.bridgeP) {
      const px = -(this.mw(l.prev.ch) + w) / 2;
      const a = [inX(), -0.05 - r() * 0.55], b = [px + (r() - 0.5) * 0.25, -0.05 - r() * 0.55];
      const bulge = (r() < 0.55 ? -1 : 1) * (0.4 + r() * 0.4), dx = b[0] - a[0];
      let P = bez(a, [a[0] + dx * 0.15, a[1] + bulge], [b[0] - dx * 0.15, b[1] + bulge * 0.9], b, 40);
      if (r() < 0.45) P = P.slice(0, Math.floor(P.length * (0.7 + r() * 0.2)));
      this.grow(r, E, nid, p, { pts: P, len: Math.abs(dx) + Math.abs(bulge), d0: 90, tip: r() < 0.5 ? 'curl' : r() < 0.5 ? 'leaf' : 'rose' });
    }
    if (l.wi === 0) this.grow(r, E, nid, p, { base: [-w * 0.3, -0.15 - r() * 0.4], dir: Math.PI + (r() - 0.5) * 1.2, len: 0.45 + r() * 0.3, d0: 120, tip: 'curl' });
    l.els = E; l.endEls = null;
    const T = [], tr = rng(l.id * 977 + Math.floor(this.rand() * 1e6));
    this.grow(tr, T, () => l.id * 100 + 90 + T.length, p, { base: [w * 0.25, -0.1 - tr() * 0.45], dir: (tr() - 0.5) * 1.4, len: 0.45 + tr() * 0.25, d0: 0, tip: 'curl', depth: 1 });
    l.tend = T.filter(e => e.t === 'stem').slice(0, 1);
  }
  genEnd(l, rel) {
    const r = rng(l.ws + l.wi * 31 + Math.floor(this.rand() * 1e6)), p = this.wordParams(l.ws), E = [];
    let k0 = 50; const nid = () => l.id * 100 + (k0++);
    const w = this.mw(l.ch), n = 1 + Math.floor(r() * 2.5); p.w = w;
    for (let i = 0; i < n; i++) {
      const dir = -Math.PI / 2 + 0.6 + (i - (n - 1) / 2) * 0.9 + (r() - 0.5) * 0.4;
      this.grow(r, E, nid, p, { base: [(r() - 0.2) * w * 0.6, -r() * 0.5], dir, len: 0.4 + r() * 0.45, d0: rel + 40 + i * 90, depth: 1, tip: i === 0 || r() < 0.5 ? 'rose' : 'fan' });
    }
    l.endEls = E;
  }
  strokeRange(B, P, a, b, col, w) {
    const n = P.length - 1, ia = a * n, ib = b * n;
    const lerp = t => { const i = Math.min(n - 1, Math.floor(t)), f = t - i; return [P[i][0] + (P[i+1][0] - P[i][0]) * f, P[i][1] + (P[i+1][1] - P[i][1]) * f]; };
    const pts = [lerp(ia)];
    for (let i = Math.floor(ia) + 1; i < ib; i++) pts.push(P[i]);
    pts.push(lerp(ib));
    if (pts.length >= 2) B.stroke(pts, col, w);
  }
  thorn(B, P, u, s, S) {
    const [p, a] = at(P, u), d = a + s * 2.3, L = S * 0.045;
    B.stroke([p, [p[0] + Math.cos(d) * L, p[1] + Math.sin(d) * L]], this.C.blue, S * 0.022);
  }
  leaf(B, bx, by, a, L, bend) {
    if (L < 0.5) return;
    const ca = Math.cos(a), sa = Math.sin(a), px = -sa, py = ca;
    const ax = u => { const b = Math.sin(Math.PI * u) * bend * 0.15 * L; return [bx + ca * u * L + px * b, by + sa * u * L + py * b]; };
    const hw = u => L * 0.18 * Math.sin(Math.PI * Math.pow(u, 0.8));
    const N = 12, s1 = [], s2 = [];
    for (let i = 0; i <= N; i++) { const u = i / N, c = ax(u), w = hw(u); s1.push([c[0] + px * w, c[1] + py * w]); s2.push([c[0] - px * w, c[1] - py * w]); }
    const tip = ax(1), base = ax(0);
    B.fill([base, ...s1.slice(1, N), tip, tip, ...s2.slice(1, N).reverse(), base], this.C.blue);
    if (L > 6) { const v = []; for (let i = 0; i <= 8; i++) v.push(ax(0.08 + 0.72 * i / 8)); B.stroke(v, this.C.vein, Math.max(0.8, L * 0.03)); }
  }
  // cherry blossom (sakura skin): five notched petals open one after another, then the centre and stamens
  blossom(B, cx, cy, R, rot, e, a) {
    const st = 70;
    for (let i = 0; i < 5; i++) {
      const s = spr((a - i * st) / 1000, 8, 13); if (s <= 0.001) continue;
      const pa = rot + i * Math.PI * 0.4 - Math.PI / 2, pts = [[cx, cy]];
      for (let k = 0; k <= 22; k++) {
        const f = -1 + 2 * k / 22, rr = R * Math.min(1.1, s) * (0.3 + 0.7 * Math.pow(Math.cos(f * Math.PI / 2), 0.55)) * (1 - 0.2 * Math.exp(-((f / 0.16) ** 2)));
        const an = pa + f * 0.58; pts.push([cx + Math.cos(an) * rr, cy + Math.sin(an) * rr]);
      }
      B.fill(pts, this.C.red);
    }
    const fr = eo((a - 5 * st - 60) / 420); if (fr <= 0) return;
    const core = []; for (let k = 0; k < 16; k++) { const an = k / 16 * Math.PI * 2; core.push([cx + Math.cos(an) * R * 0.2 * fr, cy + Math.sin(an) * R * 0.2 * fr]); }
    B.fill(core, this.C.core);
    if (R < 9) return;
    for (let k = 0; k < 8; k++) {
      const an = rot + k * Math.PI / 4 + e.ph1 * 0.2, x2 = cx + Math.cos(an) * R * 0.5 * fr, y2 = cy + Math.sin(an) * R * 0.5 * fr;
      B.stroke([[cx, cy], [x2, y2]], this.C.core, Math.max(0.6, R * 0.035));
      const d = []; for (let j = 0; j < 8; j++) { const b = j / 8 * Math.PI * 2; d.push([x2 + Math.cos(b) * R * 0.05, y2 + Math.sin(b) * R * 0.05]); }
      B.fill(d, this.C.core);
    }
  }
  // other flowers, same colour as the roses: camellia, tulip, daisy (picked per stem, stable)
  ell(cx, cy, rx, ry, ang, n = 20) { const c = Math.cos(ang), s = Math.sin(ang), p = []; for (let k = 0; k < n; k++) { const t = k / n * Math.PI * 2, x = Math.cos(t) * rx, y = Math.sin(t) * ry; p.push([cx + x * c - y * s, cy + x * s + y * c]); } return p; }
  camellia(B, cx, cy, R, rot, e, a) {
    const ring = (n, r, rr, off, d0) => { for (let i = 0; i < n; i++) { const s = spr((a - d0 - i * 50) / 1000, 8, 13); if (s <= 0.001) continue;
      const an = rot + off + i * Math.PI * 2 / n; B.fill(this.ell(cx + Math.cos(an) * r * R * s, cy + Math.sin(an) * r * R * s, rr * R * s, rr * R * 0.8 * s, an), this.C.red);
      if (R >= 12 && s > 0.5) B.stroke(this.ell(cx + Math.cos(an) * r * R * s, cy + Math.sin(an) * r * R * s, rr * R * s * 0.7, rr * R * 0.5 * s, an, 12).slice(2, 9), this.C.line, Math.max(0.6, R * 0.03)); } };
    ring(6, 0.55, 0.5, 0, 0); ring(5, 0.28, 0.38, 0.4, 300);
    const fr = eo((a - 620) / 400); if (fr > 0) B.fill(this.ell(cx, cy, R * 0.18 * fr, R * 0.18 * fr, 0, 14), this.C.line);
  }
  tulip(B, cx, cy, R, rot, e, a) {
    const up = rot - Math.PI / 2, P = [[-0.42, -0.25], [0.42, 0.25], [0, 0]];
    P.forEach(([dx, tilt], i) => { const s = spr((a - i * 90) / 1000, 8, 12); if (s <= 0.001) return;
      const an = up + tilt, ox = Math.cos(up + Math.PI / 2) * dx * R * 0.6, oy = Math.sin(up + Math.PI / 2) * dx * R * 0.6;
      const pts = this.ell(cx + ox + Math.cos(an) * R * 0.45 * s, cy + oy + Math.sin(an) * R * 0.45 * s, R * 0.62 * s, R * (i === 2 ? 0.36 : 0.3) * s, an, 22);
      B.fill(pts, this.C.red);
      if (R >= 12 && s > 0.5) B.stroke(pts.slice(14, 21), this.C.line, Math.max(0.6, R * 0.035)); });
  }
  daisy(B, cx, cy, R, rot, e, a) {
    for (let i = 0; i < 14; i++) { const s = spr((a - i * 28) / 1000, 9, 14); if (s <= 0.001) continue;
      const an = rot + i * Math.PI * 2 / 14; B.fill(this.ell(cx + Math.cos(an) * R * 0.55 * s, cy + Math.sin(an) * R * 0.55 * s, R * 0.45 * s, R * 0.11 * s, an, 14), this.C.red); }
    const fr = eo((a - 450) / 400); if (fr <= 0) return;
    B.fill(this.ell(cx, cy, R * 0.24 * fr, R * 0.24 * fr, 0, 16), this.C.line);
    if (R >= 12) for (let k = 0; k < 7; k++) { const an = k * 2.4 + e.ph1; B.fill(this.ell(cx + Math.cos(an) * R * 0.12 * fr, cy + Math.sin(an) * R * 0.12 * fr, R * 0.03, R * 0.03, 0, 6), this.C.red); }
  }
  rose(B, cx, cy, R, rot, e, a) {
    if (this.C.sakura) return this.blossom(B, cx, cy, R, rot, e, a);
    const kind = Math.floor(h((e.ph1 || 0) * 13.7 + (e.ph2 || 0)) * 4);   // 0 rose · 1 camellia · 2 tulip · 3 daisy
    if (kind === 1) return this.camellia(B, cx, cy, R, rot, e, a);
    if (kind === 2) return this.tulip(B, cx, cy, R, rot, e, a);
    if (kind === 3) return this.daisy(B, cx, cy, R, rot, e, a);
    const cr = Math.cos(rot), sr = Math.sin(rot), T = (x, y) => [cx + x * cr - y * sr, cy + x * sr + y * cr];
    // petals, back to front: [cx, cy, rx, ry, angle, depth, edge]
    const P = [[0, -0.36, 0.56, 0.54, 0, 0, 0], [-0.5, -0.06, 0.6, 0.6, -0.35, 0, 0], [0.52, -0.06, 0.6, 0.6, 0.35, 0, 0],
      [-0.42, 0.3, 0.62, 0.48, 0.2, 0.12, 1], [0.47, 0.3, 0.62, 0.48, -0.2, 0.12, 1], [0.05, 0.42, 0.56, 0.38, 0, 0.14, 0]];
    const ay0 = 0.5, lw = Math.max(0.8, R * 0.045), st = 85;
    P.forEach((q, i) => {
      const s = spr((a - i * st) / 1000, 8, 14); if (s <= 0.001) return;
      const open = (1 - Math.min(1, s)) * (q[0] < 0 ? 0.5 : -0.5), ang = q[4] + open, ca = Math.cos(ang), sa = Math.sin(ang);
      const pt = th => {
        const rr = 1 + 0.08 * Math.sin(3 * th + e.ph1 + i) + 0.04 * Math.sin(5 * th + e.ph2);
        const lx = Math.cos(th) * q[2] * rr, ly = Math.sin(th) * q[3] * rr;
        const px = q[0] + lx * ca - ly * sa, py = q[1] + lx * sa + ly * ca;
        return T(px * s * R, (ay0 + (py - ay0) * s) * R);
      };
      const pts = []; for (let k = 0; k < 26; k++) pts.push(pt(k / 26 * Math.PI * 2));
      B.fill(pts, this.C.red);
      if (q[6] && R >= 12 && s > 0.4) {
        const arc = []; for (let k = 0; k <= 14; k++) arc.push(pt(Math.PI * (1.18 + 0.64 * k / 14)));
        this.strokeRange(B, arc, 0, Math.min(1, (s - 0.4) / 0.5), this.C.line, lw * 0.8);
      }
    });
    const fr = eo((a - P.length * st - 80) / 520);
    if (fr > 0 && R > 3) {
      const sp = [], scl = [], turns = R < 20 ? Math.min(e.turns, 1.3) : R < 32 ? e.turns * 0.8 : e.turns;
      for (let i = 0; i <= 70; i++) { const u = i / 70, th = e.ph1 + u * turns * Math.PI * 2, rr = R * (0.08 + 0.57 * u); sp.push(T(Math.cos(th) * rr * 1.05, Math.sin(th) * rr * 0.72 - 0.12 * R)); }
      this.strokeRange(B, sp, 0, fr, this.C.line, lw);
      if (R >= 14) {
        for (let i = 0; i <= 36; i++) { const u = i / 36; scl.push(T((-0.72 + 1.5 * u) * R, 0.36 * R + 0.16 * R * Math.abs(Math.sin(u * Math.PI * 3)))); }
        this.strokeRange(B, scl, 0, fr, this.C.line, lw);
      }
    }
  }
  wpt(l, x, y, S, now) {
    const t = (now - l.birth) / 1000;
    if (t > 0 && t < 2.5) { // fresh growth sways and settles
      const hh = Math.max(0, (l.y - y) / S), dmp = Math.exp(-t * 3.2), dir = l.id % 2 ? 1 : -1;
      x += S * 0.07 * hh * dmp * Math.sin(t * 11) * dir;
      y += S * 0.035 * hh * dmp * Math.sin(t * 11 + 1.2);
    }
    return [x, y];
  }
  drawStem(B, e, l, age, kk, S, f, amp, layer, now, frO) {
    const fr = frO != null ? frO : eo((age - e.d0) / e.dur) * kk; if (fr <= 0) return;
    const j = jit(e.id, f, amp), P = e.pts.map(p => this.wpt(l, l.x + p[0] * S + j[0], l.y + p[1] * S + j[1], S, now));
    for (const sg of e.segs) {
      if (sg.layer !== layer) continue;
      const b = Math.min(sg.u1, fr); if (b <= sg.u0) continue;
      this.strokeRange(B, P, sg.u0, b, this.C.blue, S * 0.022 * (e.w || 1));
    }
    for (const th of e.thorns) if (fr > th.u && layerAt(e.segs, th.u) === layer) this.thorn(B, P, th.u, th.s, S);
  }
  drawEl(B, e, l, age, kk, S, f, amp, now) {
    const j = jit(e.id, f, amp), wx = (x, y) => this.wpt(l, l.x + x * S + j[0], l.y + y * S + j[1], S, now);
    if (e.t === 'leaf') {
      const sc = spr((age - e.d0) / 1000, 7, 15) * kk; if (sc <= 0) return;
      const p = wx(e.x, e.y); this.leaf(B, p[0], p[1], e.a + j[2], e.L * S * sc, e.bend);
    } else if (e.t === 'rose') {
      const a = age - e.d0; if (a < 0 || kk <= 0.001) return;
      const p = wx(e.x, e.y); this.rose(B, p[0], p[1], e.R * S * kk, e.rot + j[2], e, a);
    }
  }
  frame(now) {
    const dt = Math.min(64, now - (this.lt || now)); this.lt = now;
    const k = 1 - Math.exp(-dt / 80);
    this.Sd += (this.St - this.Sd) * k;
    this.cx += (this.ctx_ - this.cx) * k; this.cy += (this.cty - this.cy) * k;
    for (const l of this.letters) if (!l.dead && l.tx != null) { l.x += (l.tx - l.x) * k; l.y += (l.ty - l.y) * k; }
    this.letters = this.letters.filter(l => !(l.dead && now - l.dead > 300));
    const g = this.g, B = this.B(), S = this.Sd, L = this.letters, act = L.filter(l => !l.dead);
    g.setTransform(this.dpr, 0, 0, this.dpr, 0, 0); g.clearRect(0, 0, this.W, this.H);
    const f = Math.floor(now / 120), amp = Math.max(0.8, S * 0.01);   // "boil": hand-drawn line jitter
    const kd = l => l.dead ? 1 - eo((now - l.dead) / 260) : 1;
    const draw = layer => {
      for (const l of L) {
        if (l.ch === ' ' || !l.els) continue;
        const age = now - l.birth, kk = kd(l);
        const each = e => e.t === 'stem' ? this.drawStem(B, e, l, age, kk, S, f, amp, layer, now) : e.layer === layer && this.drawEl(B, e, l, age, kk, S, f, amp, now);
        l.els.forEach(each);
        if (l.endEls) l.endEls.forEach(each);
        const i = act.indexOf(l), nx = i >= 0 ? act[i + 1] : null;
        if (l.tend && (l.dead || !nx || nx.ch === ' ')) {
          let fr = eo((now - l.tb - 150) / 450);
          if (l.cut != null) fr *= 1 - eo((now - l.cut) / 150) * Math.min(0.85, 20 / (0.6 * S));
          for (const e of l.tend) this.drawStem(B, e, l, age, kk, S, f, amp, layer, now, fr * kk);
        }
      }
    };
    draw(0);
    for (const l of L) if (l.ch !== ' ' && !l.dead) B.text(l.ch, l.x, l.y, S, this.C.text);
    draw(1);
    if (this.caret && (now - this.lastKey < 500 || Math.floor(now / 530) % 2 === 0)) {
      const hh = 0.8 * S, w = Math.max(2, S * 0.03); g.fillStyle = this.C.red; g.fillRect(this.cx - w / 2, this.cy - hh / 2, w, hh);
    }
  }
}

/* `words`: phrases it types out by itself, one after another (type, hold, wither).
   `editable`: tap it and type your own; your text replaces the loop until it is empty again.
   `text`: drive it from outside instead (e.g. mirror a text box). */
export default function TypeGarden({ words, text, editable, height = 300, label, className = '' }) {
  const cv = useRef(null), eng = useRef(null), inp = useRef(null);
  const theme = useTheme();
  const [own, setOwn] = useState('');
  const [focus, setFocus] = useState(false);

  useEffect(() => {
    const c = cv.current, G = (eng.current = new Garden(c, pal()));
    const mo = new MutationObserver(() => requestAnimationFrame(() => { G.C = pal(); G.cache = {}; }));
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme', 'data-skin'] });
    let raf = 0, vis = true;
    const loop = now => { raf = requestAnimationFrame(loop); G.frame(now); };
    const ro = new ResizeObserver(() => G.resize()); ro.observe(c);
    const io = new IntersectionObserver(([e]) => { vis = e.isIntersecting; cancelAnimationFrame(raf); if (vis) raf = requestAnimationFrame(loop); });
    io.observe(c);
    document.fonts?.ready.then(() => { G.cache = {}; G.layout(true); });
    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); mo.disconnect(); };
  }, []);
  useEffect(() => { if (eng.current) { eng.current.C = pal(); eng.current.cache = {}; } }, [theme]);
  useEffect(() => { if (eng.current) eng.current.caret = focus; }, [focus]);

  // outside text / own typing
  useEffect(() => { if (text != null) eng.current?.set(text.slice(0, 48)); }, [text]);
  useEffect(() => { if (own) eng.current?.set(own); }, [own]);

  // the self-typing loop, paused while the user's own words are on screen
  useEffect(() => {
    if (!words?.length || text != null || own) return;
    const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let w = 0, i = 0, dir = 1, t;
    const G = eng.current;
    G.set('');
    const tick = () => {
      const s = words[w % words.length];
      if (calm) { G.set(s); w++; t = setTimeout(tick, 4000); return; }
      if (dir > 0) { G.set(s.slice(0, ++i)); t = setTimeout(tick, i >= s.length ? (dir = -1, 3200) : 95 + Math.random() * 60); }
      else { G.set(s.slice(0, --i)); t = setTimeout(tick, i <= 0 ? (dir = 1, w++, 500) : 38); }
    };
    t = setTimeout(tick, 400);
    return () => clearTimeout(t);
  }, [words?.join('|'), text, own]);

  return (
    <div className={'type-garden ' + className + (focus ? ' on' : '')} style={{ height }} onClick={() => inp.current?.focus()}>
      <canvas ref={cv} aria-hidden="true" />
      <span className="sr-only">{text ?? (own || words?.[0])}</span>
      {editable && <>
        <input ref={inp} className="tg-input" value={own} maxLength={40} aria-label={label || 'Type to grow a garden'} autoComplete="off" spellCheck={false}
          onChange={e => setOwn(e.target.value)} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
          onKeyDown={e => { if (e.key === 'Enter') { setOwn(''); eng.current?.set(''); } }} />
        <p className="tg-hint">{focus ? 'type to grow · space cuts · backspace withers · enter clears' : 'tap and type to grow your own'}</p>
      </>}
    </div>
  );
}
