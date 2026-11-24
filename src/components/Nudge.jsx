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
          <svg className="nudge-cup" viewBox="0 0 70 72" aria-hidden="true">
            <g className="steam" fill="none" stroke="#2f5bff" strokeWidth="2.5" strokeLinecap="round">
              <path d="M22 22c-4-5 4-8 0-14" /><path d="M33 20c-4-5 4-8 0-14" /><path d="M44 22c-4-5 4-8 0-14" />
            </g>
            <path d="M12 32h44v14a18 18 0 0 1-18 18h-8A18 18 0 0 1 12 46z" fill="#ffd43b" stroke="#15142b" strokeWidth="3" strokeLinejoin="round" />
            <path d="M56 38h4a7 7 0 0 1 0 14h-5" fill="none" stroke="#15142b" strokeWidth="3" strokeLinecap="round" />
          </svg>
          <div className="nudge-card">
            <button className="nudge-x" onClick={close} aria-label="Close">✕</button>
            <h4>Exam kal hai?</h4>
            <p>Sabse pehle last year's paper wale topics karo, wahi sabse zyada repeat hote hain. Ek-ek topic samjho aur tick karte jao.</p>
            <span className="hand">koi pressure nahi, ek topic at a time ✿</span>
            <div className="nudge-btns">
              <a className="btn primary" href={href} onClick={close}>♥ Shuru karo</a>
              <button className="btn" onClick={close}>Baad mein</button>
            </div>
            <div className="nudge-stripe"><i /><i /></div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
