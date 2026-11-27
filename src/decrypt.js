// Decrypt reveal: page headings arrive as scrambled glyphs that resolve left to right.
// Plain JS on the heading's own text nodes, so it works on every page and on Android
// (Canvas UI's version needs html-in-canvas, which the app's WebView doesn't have).
const SEL = 'h1.page-h, .topic > h1, .paper-sec-h h2, .unit-sec-head h2, .dash-title';
const GLYPHS = 'アイウエオカキクケコサシスセソタチツテトナニヌネノ01#%&*+=<>/';
const seen = new WeakSet();
const reduce = matchMedia('(prefers-reduced-motion: reduce)');

function run(el) {
  if (seen.has(el)) return;
  seen.add(el);
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) if (walker.currentNode.nodeValue.trim()) nodes.push(walker.currentNode);
  if (!nodes.length) return;
  const items = nodes.map(n => ({ n, to: n.nodeValue, last: null }));
  const total = items.reduce((s, x) => s + x.to.length, 0);
  const dur = Math.min(900, 300 + total * 14), t0 = performance.now();
  const step = now => {
    const p = Math.min(1, (now - t0) / dur);
    let off = 0, live = false;
    for (const it of items) {
      if (it.last !== null && it.n.nodeValue !== it.last) { it.dead = true; continue; } // React re-rendered: leave it
      if (it.dead) continue;
      let s = '';
      for (let i = 0; i < it.to.length; i++) {
        const c = it.to[i], done = (off + i) / total < p * 1.15 - 0.15;
        s += done || c === ' ' ? c : GLYPHS[(Math.random() * GLYPHS.length) | 0];
      }
      off += it.to.length;
      it.n.nodeValue = it.last = p >= 1 ? it.to : s;
      live = true;
    }
    if (p < 1 && live) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

if (!reduce.matches) {
  const scan = root => root.querySelectorAll?.(SEL).forEach(run);
  new MutationObserver(ms => { for (const m of ms) for (const n of m.addedNodes) if (n.nodeType === 1) { if (n.matches(SEL)) run(n); scan(n); } })
    .observe(document.getElementById('root'), { childList: true, subtree: true });
}
