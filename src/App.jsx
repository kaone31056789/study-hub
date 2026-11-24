import { useEffect, useState } from 'react';
import { MotionConfig } from 'motion/react';
import ClickSpark from './rb/ClickSpark';
import Home from './pages/Home';
import SubjectApp from './pages/SubjectApp';
import { SUBJECTS } from './subjects';
import UpdatePrompt from './components/UpdatePrompt';

// Hash routing (#/pblj/learn/u1-jvm) so the built site works on any static server with no rewrite rules.
function useHash() {
  const [hash, setHash] = useState(window.location.hash);
  useEffect(() => {
    const on = () => setHash(window.location.hash);
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);
  return hash;
}

export default function App() {
  const hash = useHash();
  const [id, view = 'plan', arg] = hash.replace(/^#\/?/, '').split('/').filter(Boolean);
  const meta = SUBJECTS.find(s => s.id === id);
  useEffect(() => { window.scrollTo(0, 0); }, [hash]);

  return (
    <MotionConfig reducedMotion="user">
    <ClickSpark sparkColor={['#ff7a3d', '#ffb38a']} sparkSize={9} sparkRadius={20} sparkCount={7} duration={420}>
      {meta ? <SubjectApp key={meta.id} meta={meta} view={view} arg={arg} /> : <Home />}
    </ClickSpark>
    <UpdatePrompt />
    </MotionConfig>
  );
}
