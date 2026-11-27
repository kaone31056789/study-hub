import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { store } from '../store';

// Friendly one-time tip (notebook style). Dismissal is remembered for the day.
export default function Nudge({ href }) {
  const key = 'nudge:' + new Date().toDateString();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (store.get(key, false)) return;
    const t = setTimeout(() => setOpen(true), 1400);
    return () => clearTimeout(t);
  }, [key]);
  const close = () => { setOpen(false); store.set(key, true); };

  return (
    <AnimatePresence>
      {open && (
        <motion.aside className="nudge" role="dialog" aria-label="Study tip"
          initial={{ opacity: 0, y: 40, rotate: 2 }} animate={{ opacity: 1, y: 0, rotate: 0 }} exit={{ opacity: 0, y: 30 }}
          transition={{ type: 'spring', stiffness: 320, damping: 24 }}>
          <svg className="nudge-cup" viewBox="0 0 70 60" aria-hidden="true">
            <g className="steam" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" opacity=".8">
              <path d="M26 20c-4-5 4-8 0-14" /><path d="M36 18c-4-5 4-8 0-14" /><path d="M46 20c-4-5 4-8 0-14" />
            </g>
            <path d="M10 28h50c0 15-11 26-25 26S10 43 10 28z" fill="var(--surface)" stroke="var(--text)" strokeWidth="2.2" strokeLinejoin="round" />
            <path d="M14 34c8 3 34 3 42 0" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" opacity=".7" />
            <path d="M27 54h16" stroke="var(--text)" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
          <div className="nudge-card">
            <button className="nudge-x" onClick={close} aria-label="Close">×</button>
            <span className="nudge-k">Tip for today</span>
            <h4>Exam kal hai?</h4>
            <p>Sabse pehle last year's paper wale topics karo, wahi sabse zyada repeat hote hain. Ek-ek topic samjho aur tick karte jao.</p>
            <span className="hand">koi pressure nahi, ek topic at a time ✿</span>
            <div className="nudge-btns">
              <a className="btn primary" href={href} onClick={close}>Shuru karo →</a>
              <button className="btn" onClick={close}>Baad mein</button>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
