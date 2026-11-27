// Handwritten maths: formula runs inside content blocks get <span class="mh"> so they read like
// notes written in pen. Only touches HTML-string containers (never React-managed text).
const ROOTS = '.prose, .bx-how li, .rev-pts li, .face-q, .face-a, .mcq-q, .qbox, .bx-dl dt';
const SKIP = 'pre, code, a, button, th, .mh, .term-card, .eli5';
const OP = /[=≈≤≥⇔⟺∝↔]/;
const SYM = /[√∑∫πσμηλθ∇Δ²³⁻¹ᵀ∞±×∗]|[A-Za-z]\([a-z0-9, ]{1,12}\)|\d\s*[/*^]\s*\d/;
const OK_WORDS = new Set(['otherwise', 'where', 'sqrt', 'then', 'else', 'with', 'mean', 'variance']);
// split prose around formulas: "Gaussian: p(z) = ...; Rayleigh ..." -> label | formula | label
const SPLIT = /(:\s+|;\s+|\.\s+(?=[A-Z])|,\s+(?=[A-Za-z]{4,})|\s+(?=\([A-Za-z]{4,})|(?<=[A-Za-z]{4,})\s+(?=[(\[√]|[A-Za-z]\s*[(=]))/;

const isMath = c => {
  const t = c.trim();
  if (t.replace(/\s/g, '').length < 3 || !(OP.test(t) || SYM.test(t))) return false;
  return (t.match(/[A-Za-z]{4,}/g) || []).filter(w => !OK_WORDS.has(w.toLowerCase())).length === 0;
};

function wrap(node) {
  const parts = node.nodeValue.split(SPLIT);
  if (!parts.some(isMath)) return;
  const frag = document.createDocumentFragment();
  for (const p of parts) {
    if (!p) continue;
    if (!isMath(p)) { frag.append(p); continue; }
    const lead = p.match(/^\s*/)[0], tail = p.match(/\s*$/)[0];
    const s = document.createElement('span');
    s.className = 'mh'; s.textContent = p.trim();
    frag.append(lead, s, tail);
  }
  node.replaceWith(frag);
}

function scan(root) {
  const els = root.matches?.(ROOTS) ? [root] : [...(root.querySelectorAll?.(ROOTS) || [])];
  if (!els.length && root.closest?.(ROOTS)) els.push(root);
  for (const el of els) {
    const w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, { acceptNode: n => n.parentElement.closest(SKIP) ? 2 : 1 });
    const list = [];
    while (w.nextNode()) list.push(w.currentNode);
    list.forEach(wrap);
  }
}

scan(document.body);
new MutationObserver(ms => { for (const m of ms) m.addedNodes.forEach(n => n.nodeType === 1 && scan(n)); })
  .observe(document.body, { childList: true, subtree: true });

// Formula sheet: pull every formula out of an HTML string, keeping its <sup>/<sub> parts.
const GLUE = /^[\s=+\-−×·*/(),[\]|^]*$/;
export function formulasIn(html) {
  const box = document.createElement('div');
  box.innerHTML = html;
  scan(box.matches(ROOTS) ? box : (box.classList.add('prose'), box));
  const out = [];
  box.querySelectorAll('p, li, td, div').forEach(el => {
    let run = null;
    const flush = () => { if (run) { const h = run.map(n => n.outerHTML ?? n.nodeValue).join('').trim(); if (h.replace(/<[^>]+>/g, '').length > 4) out.push(h); } run = null; };
    for (const n of el.childNodes) {
      const isMh = n.nodeType === 1 && n.classList.contains('mh');
      const isSup = n.nodeType === 1 && /^(SUP|SUB)$/.test(n.tagName);
      if (isMh) (run ||= []).push(n);
      else if (run && (isSup || (n.nodeType === 3 && GLUE.test(n.nodeValue)))) run.push(n);
      else flush();
    }
    flush();
  });
  return out;
}
