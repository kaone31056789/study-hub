import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { build } from '../appVersion.json';

// Latest APK = newest GitHub release (tag "v<build>", asset "StudyHub-v<build>.apk").
export const REPO = 'kaone31056789/study-hub';
export const RELEASES_URL = `https://github.com/${REPO}/releases/latest`;

let pending;
export const latestApk = () => (pending ||= fetch(`https://api.github.com/repos/${REPO}/releases/latest`)
  .then(r => (r.ok ? r.json() : null))
  .then(j => {
    const a = j?.assets?.find(x => x.name.endsWith('.apk'));
    return a ? { n: Number(String(j.tag_name).replace(/^v/, '')), url: a.browser_download_url, mb: (a.size / 1048576).toFixed(1), notes: (j.body || '').slice(0, 400) } : null;
  })
  .catch(() => null));

export function useLatestApk() {
  const [apk, setApk] = useState(null);
  useEffect(() => { latestApk().then(setApk); }, []);
  return apk;
}

// Android app only: if GitHub has a newer build than this APK, offer to download it.
export default function UpdatePrompt() {
  const [rel, setRel] = useState(null);
  useEffect(() => { if (window.Capacitor) latestApk().then(a => a && a.n > build && setRel(a)); }, []);
  return (
    <AnimatePresence>
      {rel && (
        <motion.div className="sheet-bg center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div className="modal" role="dialog" aria-label="Update available" initial={{ scale: 0.92, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.92, opacity: 0 }}>
            <h3>🚀 New version available</h3>
            <p className="muted">Version {rel.n} aa gaya (you have {build}). Download karo, phir install pe tap karo. Progress safe rahega.</p>
            {rel.notes && <p className="small" style={{ whiteSpace: 'pre-line' }}>{rel.notes}</p>}
            <div className="cta">
              <a className="btn primary" href={rel.url}>Download v{rel.n} · {rel.mb} MB</a>
              <button className="btn" onClick={() => setRel(null)}>Later</button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
