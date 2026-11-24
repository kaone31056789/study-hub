// Per-browser progress. Wrapped in try/catch: private windows can block storage.
// Keys like "pblj:done" are synced across devices (see sync.js); local-only keys are skipped.
const LOCAL_ONLY = /^(memeimg:|nudge:|sync:)|^(theme|lang)$/;
let listener = null;
export const onStoreChange = f => { listener = f; };
export const isSyncable = k => k.includes(':') && !LOCAL_ONLY.test(k);
export const store = {
  get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch { return d; } },
  set(k, v) {
    try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* ignore */ }
    if (isSyncable(k)) listener?.(k);
  }
};
export const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
