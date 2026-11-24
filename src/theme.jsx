import { useSyncExternalStore } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HugeiconsIcon } from '@hugeicons/react';
import { Sun03Icon, Moon02Icon } from '@hugeicons/core-free-icons';
import { store } from './store';

// Theme = saved choice, else the notebook light theme. Applied as <html data-theme="...">.
const subs = new Set();
let current = store.get('theme', null) || 'light';

const apply = () => {
  document.documentElement.dataset.theme = current;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', current === 'light' ? '#f7f5f1' : '#09090b');
};
apply();

export const setTheme = t => { current = t; store.set('theme', t); apply(); subs.forEach(f => f()); };
export const useTheme = () => useSyncExternalStore(f => { subs.add(f); return () => subs.delete(f); }, () => current);

export function ThemeToggle() {
  const theme = useTheme();
  const light = theme === 'light';
  return (
    <button className="theme-btn" onClick={() => setTheme(light ? 'dark' : 'light')} aria-label={light ? 'Switch to dark theme' : 'Switch to light theme'} title={light ? 'Dark theme' : 'Light theme'}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span key={theme} initial={{ rotate: -90, scale: 0.4, opacity: 0 }} animate={{ rotate: 0, scale: 1, opacity: 1 }} exit={{ rotate: 90, scale: 0.4, opacity: 0 }} transition={{ duration: 0.25 }} style={{ display: 'grid' }}>
          <HugeiconsIcon icon={light ? Moon02Icon : Sun03Icon} size={19} strokeWidth={1.9} />
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
