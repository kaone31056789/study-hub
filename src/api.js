// API base: same origin on the website; the Android app is built with VITE_API_BASE=https://your-domain.
// A user-set server URL (Sync panel) overrides both.
import { store } from './store';
export const apiBase = () => (store.get('sync:server', '') || import.meta.env.VITE_API_BASE || '').replace(/\/$/, '') + '/api';
export async function api(path, opts = {}) {
  const r = await fetch(apiBase() + path, { ...opts, headers: { 'Content-Type': 'application/json', ...(opts.headers || {}) } });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(j.error || 'Server error ' + r.status);
  return j;
}
