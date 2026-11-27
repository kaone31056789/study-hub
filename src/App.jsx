import { useEffect, useState } from 'react';
import { flushSync } from 'react-dom';
import { MotionConfig } from 'motion/react';
import ClickSpark from './rb/ClickSpark';
import Home from './pages/Home';
import SubjectApp from './pages/SubjectApp';
import { SUBJECTS } from './subjects';
import UpdatePrompt from './components/UpdatePrompt';
import { useTheme } from './theme';

// Remember where the last tap was, so the page transition can bleed out from that point (see ink.css).
addEventListener('pointerdown', e => {
  document.documentElement.style.setProperty('--vx', e.clientX + 'px');
  document.documentElement.style.setProperty('--vy', e.clientY + 'px');
}, { capture: true, passive: true });

// Pointer-lit cards: tell the hovered card where the pointer is (ink.css paints the light).
const LIT = '.card,.subj,.row,.tcard,.rev-card,.gl-item,.quick a';
addEventListener('pointermove', e => {
  const el = e.pointerType === 'mouse' && e.target.closest?.(LIT);
  if (!el) return;
  const r = el.getBoundingClientRect();
  el.style.setProperty('--mx', e.clientX - r.left + 'px');
  el.style.setProperty('--my', e.clientY - r.top + 'px');
}, { passive: true });

// Hash routing (#/pblj/learn/u1-jvm) so the built site works on any static server with no rewrite rules.
function useHash() {
  const [hash, setHash] = useState(window.location.hash);
  useEffect(() => {
    const on = () => {
      const next = window.location.hash;
      const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!document.startViewTransition || calm) return setHash(next);
      document.startViewTransition(() => flushSync(() => setHash(next)));
    };
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);
  return hash;
}

export default function App() {
  const hash = useHash();
  const theme = useTheme();
  const [id, view = 'plan', arg] = hash.replace(/^#\/?/, '').split('/').filter(Boolean);
  const meta = SUBJECTS.find(s => s.id === id);
  useEffect(() => { window.scrollTo(0, 0); }, [hash]);

  return (
    <MotionConfig reducedMotion="user">
    <ClickSpark sparkColor={theme === 'light' ? ['#ff7a3d', '#ffb38a'] : ['#e9e2d4', '#d9452b']} sparkSize={9} sparkRadius={20} sparkCount={7} duration={420}>
      {meta ? <SubjectApp key={meta.id} meta={meta} view={view} arg={arg} /> : <Home />}
    </ClickSpark>
    <UpdatePrompt />
    </MotionConfig>
  );
}
