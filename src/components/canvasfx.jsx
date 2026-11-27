// Canvas UI effects (src/canvasui, MIT + Commons Clause, github.com/DavidHDev/canvas-ui), tuned for the ink-wash theme.
// Both are WebGL, pause off-screen and respect reduced motion. `off` renders the children plain (used for the light theme).
import { useEffect, useRef, useState } from 'react';
import { Clouds } from '../canvasui/Clouds/Clouds';
import { Ripple } from '../canvasui/Ripple/Ripple';

// ASCII Magic piece (public/ascii-magic, MIT). Halftone dots in one colour read as ink in both themes.
export const Ascii = ({ piece, size = 8, look = 'dots', mono = true, caption, className = '' }) => (
  <div className={'ascii-block ' + className}>
    <ascii-art piece={piece} size={size} look={look || undefined} mono={mono || undefined} />
    {caption && <p>{caption}</p>}
  </div>
);

// Vengeance UI morph-text idea: phrases replace each other through a blur.
export function MorphText({ words, every = 2800 }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (words.length < 2 || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => setI(n => (n + 1) % words.length), every);
    return () => clearInterval(id);
  }, [words.length, every]);
  return <span className="morph" key={i}>{words[i % words.length]}</span>;
}

// Ink dropped on still water: a tap sends rings out, and now and then a drop falls by itself.
// With native html-in-canvas the content lives inside a canvas and can't size the wrapper,
// so we measure the content and hand the wrapper that height.
export function InkPond({ off, children }) {
  const box = useRef(null);
  const [h, setH] = useState();
  useEffect(() => {
    const inner = box.current?.querySelector('[data-fit]');
    if (!inner) return;
    const ro = new ResizeObserver(() => setH(inner.offsetHeight));
    ro.observe(inner);
    return () => ro.disconnect();
  }, [off]);
  if (off) return children;
  return (
    <div ref={box}>
      <Ripple className="ink-pond" style={{ height: h }} trigger="click" interval={5} amplitude={0.7} rings={3} wavelength={46} decay={1.4} refraction={6} dispersion={0} shine={0.35}>
        <div data-fit>{children}</div>
      </Ripple>
    </div>
  );
}

// Mist drifting behind the hero, in washi grey; the pointer parts it.
const MIST = [0.91, 0.89, 0.83], SHADE = [0.3, 0.28, 0.26];
export function InkMist({ off, children }) {
  if (off) return children;
  return (
    <Clouds className="ink-mist" layer="background" speed={0.3} direction={190} cover={0.3} density={1.2} softness={1}
      color={MIST} lightColor={MIST} shadeColor={SHADE} opacity={0.14} shadow={0} wind={0.8} windRadius={260}>
      {children}
    </Clouds>
  );
}
