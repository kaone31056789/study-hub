import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { build } from '../appVersion.json';

// Android app only: on launch, ask GitHub for the latest release (tag "v<build>").
// If it is newer than the build baked into this APK, offer to download it.
export const REPO = 'kaone31056789/study-hub';
export const APK_URL = `https://github.com/${REPO}/releases/latest/download/StudyHub.apk`;

export default function UpdatePrompt() {
  const [rel, setRel] = useState(null);
  useEffect(() => {
    if (!window.Capacitor) return;
    fetch(`https://api.github.com/repos/${REPO}/releases/latest`)
      .then(r => (r.ok ? r.json() : null))
      .then(j => {
        const n = Number(String(j?.tag_name || '').replace(/^v/, ''));
        if (n > build) setRel({ n, notes: (j.body || '').slice(0, 400) });
      })
      .catch(() => {}); // offline: just skip
  }, []);
  return (
    <AnimatePresence>
      {rel && (
        <motion.div className="sheet-bg center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div className="modal" role="dialog" aria-label="Update available" initial={{ scale: 0.92, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.92, opacity: 0 }}>
            <h3>🚀 New version available</h3>
            <p className="muted">Version {rel.n} aa gaya (you have {build}). Download karo, phir install pe tap karo. Progress safe rahega.</p>
            {rel.notes && <p className="small" style={{ whiteSpace: 'pre-line' }}>{rel.notes}</p>}
            <div className="cta">
              <a className="btn primary" href={APK_URL}>Download update</a>
              <button className="btn" onClick={() => setRel(null)}>Later</button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
