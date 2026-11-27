// Beginner layer for the exam answers.
//  1. Hard words in answers become tappable: a card (Vengeance UI "cursor card" idea) gives the
//     plain meaning first, then the exam definition. Works offline.
//  2. Every heading of the full answer gets "Samajh nahi aaya?": AI re-explains that part for a
//     total beginner, in the chosen language.
import { useEffect, useRef, useState } from 'react';
import { api } from '../api';
import { miniMd } from './Extras';

// plain meaning, with a tiny everyday picture where it helps
export const PLAIN = {
  'pixel': 'One tiny square of the picture. Zoom a photo a lot and you see these boxes.',
  'intensity': 'How bright a pixel is, as a number. 0 = black, 255 = white.',
  'gray level': 'Same as intensity: the brightness number of a pixel.',
  'resolution': 'How much detail. More pixels (or more gray levels) = more detail.',
  'sampling': 'Choosing WHERE to measure: cutting the scene into a grid of pixels.',
  'quantization': 'Choosing HOW EXACT the brightness is: rounding it to fixed levels (e.g. 256).',
  'histogram': 'A bar chart: how many pixels have each brightness. Tall bar on the left = dark image.',
  'pdf': 'Probability density function: a curve showing which values are common and which are rare.',
  'probability density': 'A curve showing which values happen often (high) and which rarely (low).',
  'mean': 'The average value.',
  'variance': 'How spread out values are. Small = all close to average, big = all over the place.',
  'standard deviation': 'Square root of variance: typical distance from the average.',
  'noise': 'Random unwanted dots/grain that spoil the picture, like static on an old TV.',
  'gaussian': 'Bell-shaped curve: most values near the middle, few far away. Normal sensor grain.',
  'rayleigh': 'A lopsided hump curve (rises fast, falls slowly). Seen in range/radar imaging.',
  'erlang': 'Gamma curve: a skewed hump. Seen in laser imaging.',
  'gamma': 'A skewed hump-shaped curve (also called Erlang).',
  'exponential': 'Curve that starts high and drops quickly. Special case of gamma.',
  'uniform': 'Every value in a range is equally likely: a flat box-shaped curve.',
  'impulse': 'Salt & pepper noise: random pure white and pure black dots.',
  'salt & pepper': 'Random white (salt) and black (pepper) dots, like sprinkled spices.',
  'salt and pepper': 'Random white (salt) and black (pepper) dots, like sprinkled spices.',
  'periodic noise': 'Noise that repeats in a pattern (stripes), usually from electrical interference.',
  'spectrum': 'The picture described as a mix of waves: how much of each frequency it has.',
  'frequency': 'How fast brightness changes. Smooth sky = low frequency; sharp edges = high frequency.',
  'fourier': 'A way to write any image as a sum of simple waves.',
  'dft': 'Discrete Fourier Transform: turns pixels into "how much of each wave" numbers.',
  'fft': 'Fast Fourier Transform: a quick way to compute the DFT.',
  'dct': 'Discrete Cosine Transform: like DFT but uses only cosine waves; packs info into few numbers (used in JPEG).',
  'transform': 'Rewriting the same image in a different form (e.g. as waves) where some jobs become easy.',
  'coefficient': 'One number in the transformed version, saying how much of one pattern/wave is present.',
  'energy compaction': 'Most of the important information squeezed into a few numbers, so the rest can be thrown away.',
  'basis': 'The set of building-block patterns that every image is made from in a transform.',
  'orthogonal': 'Patterns that do not overlap at all (independent), like north and east.',
  'low-pass': 'Filter that keeps smooth parts and removes fine detail/noise. Result: blur.',
  'low pass': 'Filter that keeps smooth parts and removes fine detail/noise. Result: blur.',
  'high-pass': 'Filter that keeps edges and fine detail, removes smooth parts. Result: sharp outline.',
  'high pass': 'Filter that keeps edges and fine detail, removes smooth parts. Result: sharp outline.',
  'filter': 'A rule that changes each pixel using its neighbours (to blur, sharpen or clean noise).',
  'kernel': 'Small grid of weights (like 3×3) slid over the image to filter it. Also called mask.',
  'mask': 'Small grid of weights slid over the image to filter it. Also called kernel.',
  'convolution': 'Sliding a small mask over the image and taking a weighted sum at each place.',
  'spatial domain': 'Working directly on pixels (the normal picture).',
  'frequency domain': 'Working on the image after turning it into waves (Fourier).',
  'degradation': 'Damage to the image: blur plus noise.',
  'restoration': 'Undoing known damage (blur/noise) using a model. Objective, measurable.',
  'enhancement': 'Making the image look nicer to a human. Subjective, no model needed.',
  'blur': 'Smudging: sharp details spread out.',
  'inverse filter': 'Undo blur by dividing by the blur function. Fails when that is near zero (noise explodes).',
  'inverse filtering': 'Undo blur by dividing by the blur function. Fails when that is near zero (noise explodes).',
  'wiener': 'Smart restoration filter: undoes blur but holds back where noise is strong. Minimises error.',
  'mmse': 'Minimum mean square error: make the average squared mistake as small as possible.',
  'mean square error': 'Average of (mistake)²: a single number for how wrong the result is.',
  'eigenvector': 'A special direction the data naturally spreads along.',
  'eigenvalue': 'How much the data spreads along that special direction.',
  'covariance': 'How two things change together (both go up together = positive).',
  'hotelling': 'KL transform: rotates the data to its main directions so few numbers hold most info.',
  'kl transform': 'Rotates data to its main directions (eigenvectors) so few numbers hold most info.',
  'wavelet': 'Small wave that lives only in one place; studies an image at many zoom levels at once.',
  'multiresolution': 'Looking at the image at several zoom levels (coarse to fine).',
  'haar': 'Simplest wavelet: average and difference of neighbouring pairs.',
  'walsh': 'Transform built from +1/−1 square waves (no multiplication, very fast).',
  'hadamard': 'Square matrix of +1/−1 used for the Walsh-Hadamard transform.',
  'morphology': 'Shape-based processing of (mostly black-and-white) images.',
  'dilation': 'Grow the white shapes (fills small holes, joins gaps).',
  'erosion': 'Shrink the white shapes (removes small dots, thins).',
  'opening': 'Erosion then dilation: removes small specks, keeps big shapes.',
  'closing': 'Dilation then erosion: fills small holes and gaps.',
  'structuring element': 'Small shape (like a 3×3 square) used to probe the image in morphology.',
  'segmentation': 'Splitting the image into meaningful parts (object vs background).',
  'threshold': 'A cut-off value: brighter than it = white, darker = black.',
  'thresholding': 'Turning an image black-and-white using a cut-off brightness.',
  'edge': 'Place where brightness changes suddenly (object outline).',
  'gradient': 'How fast and in which direction brightness changes. Big at edges.',
  'laplacian': 'Second-derivative operator: highlights edges in all directions.',
  'compression': 'Making the file smaller.',
  'redundancy': 'Repeated / unnecessary information that can be removed to save space.',
  'entropy': 'Average information per symbol: the smallest bits/symbol any code can reach.',
  'huffman': 'Coding trick: common symbols get short codes, rare ones long codes.',
  'jpeg': 'Photo compression: 8×8 blocks → DCT → round off small numbers → code them.',
  'run-length': 'Store "5 whites, 3 blacks" instead of every pixel.',
  'zig-zag': 'Reading the 8×8 DCT block diagonally so the zeros come together at the end.',
  'rgb': 'Red, Green, Blue light mixed to make colours (screens).',
  'cmy': 'Cyan, Magenta, Yellow inks (printers). CMY = 1 − RGB.',
  'hsi': 'Hue (which colour), Saturation (how pure), Intensity (how bright). Close to how humans think.',
  'hue': 'Which colour it is (red, green, blue…).',
  'saturation': 'How pure/strong the colour is (vivid vs washed out).',
  'pseudocolour': 'Giving colours to gray levels so details stand out (like heat maps).',
  'adjacency': 'Whether two pixels count as neighbours (and have allowed values).',
  'connectivity': 'Whether you can walk from one pixel to another through neighbours.',
  'median': 'The middle value after sorting. Great at removing salt & pepper dots.',
  'ringing': 'Ripples/echoes around edges, caused by a sharp-cutoff (ideal) filter.',
  'butterworth': 'Smooth filter between ideal and Gaussian; little ringing at low order.',
  'cutoff': 'The frequency where a filter starts blocking.',
  'sharpening': 'Making edges crisper by adding back edge detail.',
  'unsharp masking': 'Sharpen = original + k × (original − blurred).',
  'aliasing': 'Fake patterns/jaggies from sampling too sparsely.',
  'nyquist': 'Sample at least twice the highest frequency, or you get aliasing.',
  'false contouring': 'Fake bands/steps in smooth areas when there are too few gray levels.'
};

const KEYS = Object.keys(PLAIN).sort((a, b) => b.length - a.length);
const RX = new RegExp('(^|[^\\w])(' + KEYS.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|') + ')(?![\\w])', 'i');

// Wrap the first time each term appears in this block (not inside code/tables headers/links).
function markTerms(root, examDefs) {
  const seen = new Set();
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode: n => n.parentElement.closest('pre,code,a,.term,.eli5,th,button') ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT
  });
  const nodes = []; while (walker.nextNode()) nodes.push(walker.currentNode);
  for (let n of nodes) {
    let m;
    while (n && (m = RX.exec(n.nodeValue))) {
      const word = m[2], key = word.toLowerCase();
      if (seen.has(key)) { // only first mention: split past it and keep scanning
        const after = n.splitText(m.index + m[1].length + word.length); n = after; continue;
      }
      seen.add(key);
      const start = n.splitText(m.index + m[1].length), rest = start.splitText(word.length);
      const span = document.createElement('span');
      span.className = 'term'; span.tabIndex = 0; span.dataset.k = key;
      if (examDefs[key]) span.dataset.exam = examDefs[key];
      start.replaceWith(span); span.append(start);
      n = rest;
    }
  }
}

// One floating card for the whole page; follows the pointer on desktop, sits under the word on touch.
export function TermCards({ scope, glossary = [] }) {
  const [c, setC] = useState(null);
  useEffect(() => {
    const root = document.querySelector(scope); if (!root) return;
    const exam = Object.fromEntries(glossary.map(([t, d]) => [t.toLowerCase(), d]));
    const run = () => root.querySelectorAll('.prose:not([data-terms])').forEach(p => { p.dataset.terms = 1; markTerms(p, exam); });
    run();
    const mo = new MutationObserver(run); mo.observe(root, { childList: true, subtree: true });
    const show = (el, x, y) => setC({ k: el.dataset.k, exam: el.dataset.exam, x, y });
    const over = e => { const t = e.target.closest?.('.term'); if (t && e.pointerType === 'mouse') show(t, e.clientX, e.clientY); };
    const move = e => { if (e.pointerType === 'mouse' && e.target.closest?.('.term')) setC(o => o && { ...o, x: e.clientX, y: e.clientY }); };
    const out = e => { if (e.pointerType === 'mouse' && e.target.closest?.('.term') && !e.relatedTarget?.closest?.('.term')) setC(null); };
    const tap = e => {
      const t = e.target.closest?.('.term');
      if (!t) { if (!e.target.closest?.('.term-card')) setC(null); return; }
      const r = t.getBoundingClientRect(); show(t, r.left + r.width / 2, r.bottom);
    };
    root.addEventListener('pointerover', over); root.addEventListener('pointermove', move); root.addEventListener('pointerout', out);
    document.addEventListener('click', tap);
    return () => { mo.disconnect(); root.removeEventListener('pointerover', over); root.removeEventListener('pointermove', move); root.removeEventListener('pointerout', out); document.removeEventListener('click', tap); };
  }, [scope, glossary]);
  if (!c) return null;
  const w = 300, left = Math.min(innerWidth - w - 12, Math.max(12, c.x - w / 2)), below = c.y + 18 + 200 < innerHeight;
  return (
    <div className="term-card" role="tooltip" style={{ left, top: below ? c.y + 18 : undefined, bottom: below ? undefined : innerHeight - c.y + 18, width: w }}>
      <div className="tc-head"><span className="tc-glyph" aria-hidden="true">?</span><b>{c.k}</b></div>
      <p className="tc-plain">{PLAIN[c.k]}</p>
      {c.exam && <p className="tc-exam"><small>Exam line</small>{c.exam}</p>}
    </div>
  );
}

// Full-answer prose with a "Samajh nahi aaya?" button closing each heading's part.
const LABEL = { en: 'Didn’t get this? Explain like I’m new', bhai: 'Samajh nahi aaya? Simple mein samjhao', gaali: 'Kuch nahi ghusa? Ekdum simple bata' };
const ASK = {
  en: 'Explain this part of my exam answer to a total beginner who knows NOTHING about image processing. Use very simple words, one everyday example, and explain every technical word in brackets. Then give "What to write in the exam" in 2-3 short lines. Keep it short.',
  bhai: 'Ye exam answer ka part ekdum beginner ko samjhao jisko image processing ka kuch nahi pata. Hinglish mein, bahut simple words, ek desi real-life example, har technical word ka matlab bracket mein. Phir 2-3 lines mein "Exam mein kya likhna hai" (English mein). Chhota rakhna.',
  gaali: 'Ye exam answer ka part ekdum zero-knowledge bande ko samjha, Hinglish mein, thodi gaali ke saath, bahut simple words, desi example, har technical word ka matlab bracket mein. Phir 2-3 lines "Exam mein ye likh" (English mein). Chhota rakh.'
};
export function BeginnerProse({ html, topic, lang = 'en', className = 'prose' }) {
  const ref = useRef(null);
  useEffect(() => {
    const root = ref.current; if (!root) return;
    root.querySelectorAll('.eli5').forEach(x => x.remove());
    const hs = [...root.children].filter(el => el.tagName === 'H3');
    const parts = hs.length ? hs : [root.firstElementChild].filter(Boolean);
    parts.forEach((h, i) => {
      const end = hs[i + 1] || null;   // insert before the next heading (or at the end)
      const box = document.createElement('div'); box.className = 'eli5';
      box.innerHTML = `<button type="button" class="eli5-btn"><span aria-hidden="true">?</span>${LABEL[lang] || LABEL.en}</button><div class="eli5-out" hidden></div>`;
      root.insertBefore(box, end);
      box.firstChild.onclick = async () => {
        const out = box.lastChild, btn = box.firstChild;
        let text = ''; for (let el = h; el && el !== end && el !== box; el = el.nextElementSibling) text += el.innerText + '\n';
        btn.disabled = true; out.hidden = false; out.className = 'eli5-out busy'; out.textContent = '';
        try {
          const j = await api('/ask', { method: 'POST', body: JSON.stringify({ question: (ASK[lang] || ASK.en) + '\n\n---\n' + text.slice(0, 2500), lang, topic, context: text.slice(0, 2500) }) });
          out.className = 'eli5-out'; out.innerHTML = miniMd(j.answer || '');
        } catch (e) {
          out.className = 'eli5-out err'; out.textContent = e.message === 'Failed to fetch' ? 'No internet / server. Try the word cards: tap any underlined word.' : e.message;
        } finally { btn.disabled = false; }
      };
    });
  }, [html, lang, topic]);
  return <div ref={ref} className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}
