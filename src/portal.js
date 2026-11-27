// "Start reading" portal. Clicking a link marked data-portal pulls the page into a black hole
// (ASCII Magic's black-hole piece, MIT) wrapped in an ink spiral, then the new page comes out of it.
// Only on the big Start/Continue buttons: rare, deliberate moments. Ordinary links stay instant.

const reduce = matchMedia('(prefers-reduced-motion: reduce)');

// Five logarithmic spiral arms (r = a·e^(bθ)), the shape of a galaxy falling inwards.
const SPIRAL = (() => {
  let d = '';
  for (let k = 0; k < 5; k++) {
    const off = (k / 5) * Math.PI * 2;
    for (let i = 0; i <= 140; i++) {
      const t = (i / 140) * Math.PI * 4.2, r = 4 * Math.exp(0.24 * t);
      d += (i ? 'L' : 'M') + (r * Math.cos(t + off)).toFixed(1) + ' ' + (r * Math.sin(t + off)).toFixed(1);
    }
  }
  return d;
})();

let busy = false;
export function portal(href, x = innerWidth / 2, y = innerHeight / 2) {
  if (busy) return;
  if (reduce.matches) { location.hash = href; return; }
  busy = true;
  const el = document.createElement('div');
  el.className = 'portal';
  el.setAttribute('aria-hidden', 'true');
  el.style.setProperty('--px', x + 'px');
  el.style.setProperty('--py', y + 'px');
  el.innerHTML = `<svg class="portal-spiral" viewBox="-100 -100 200 200"><path d="${SPIRAL}"/></svg>
    <ascii-art class="portal-hole" piece="black-hole" size="19" mono></ascii-art>
    <svg class="portal-spiral two" viewBox="-100 -100 200 200"><path d="${SPIRAL}"/></svg>`;
  document.body.append(el);
  const root = document.documentElement;
  setTimeout(() => {                       // deep inside: swap the page while nothing is visible
    window.__portalNav = true;
    location.hash = href;
    root.classList.add('portal-emerge');
  }, 950);
  setTimeout(() => el.classList.add('out'), 1000);   // the hole opens and the new page comes through
  setTimeout(() => { el.remove(); root.classList.remove('portal-emerge'); busy = false; }, 1650);
}

addEventListener('click', e => {
  const a = e.target.closest?.('a[data-portal]');
  if (!a || e.defaultPrevented || e.button || e.metaKey || e.ctrlKey || e.shiftKey) return;
  e.preventDefault();
  portal(a.getAttribute('href'), e.clientX, e.clientY);
});

// ASCII Magic runtime (self-hosted in public/ascii-magic, works offline in the app).
const ASCII = new URL('ascii-magic/', document.baseURI).href;
import(/* @vite-ignore */ ASCII + 'runtime/ascii.js').catch(() => {});
// warm the black-hole piece so the portal's first frame is not empty
(window.requestIdleCallback || setTimeout)(() => import(/* @vite-ignore */ ASCII + 'pieces/black-hole.js').catch(() => {}));
