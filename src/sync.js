// Sync progress across devices with a short code. Strategy: merge (union arrays, merge objects), newest wins for the rest.
import { store, onStoreChange, isSyncable } from './store';
import { api } from './api';

let timer;
export const getCode = () => store.get('sync:code', null);
const snapshot = () => {
  const out = {};
  try { for (const k of Object.keys(localStorage)) if (isSyncable(k)) out[k] = localStorage.getItem(k); } catch { /* ignore */ }
  return out;
};
const merge = (local, remote) => {
  try {
    const a = JSON.parse(local), b = JSON.parse(remote);
    if (Array.isArray(a) && Array.isArray(b)) return JSON.stringify([...new Set([...a, ...b])]);
    if (a && b && typeof a === 'object' && typeof b === 'object') return JSON.stringify({ ...b, ...a });
  } catch { /* fall through */ }
  return remote;
};
function applyRemote(data) {
  let changed = false;
  for (const [k, v] of Object.entries(data || {})) {
    if (!isSyncable(k)) continue;
    const cur = localStorage.getItem(k);
    const next = cur == null ? v : merge(cur, v);
    if (next !== cur) { localStorage.setItem(k, next); changed = true; }
  }
  return changed;
}
export async function push() {
  const code = getCode(); if (!code) return;
  const updated = Date.now();
  await api('/sync/' + code, { method: 'PUT', body: JSON.stringify({ data: snapshot(), updated }) });
  store.set('sync:updated', updated);
  store.set('sync:last', updated);
}
export async function pullAndMerge(code = getCode()) {
  if (!code) return false;
  const j = await api('/sync/' + code);
  const changed = applyRemote(j.data);
  await push();
  return changed;
}
export async function createCode() {
  const { code } = await api('/sync', { method: 'POST' });
  store.set('sync:code', code);
  await push();
  return code;
}
export async function connectCode(code) {
  code = String(code || '').trim().toLowerCase();
  if (!/^[a-z0-9]{10}$/.test(code)) throw new Error('Code 10 letters/numbers ka hota hai');
  await api('/sync/' + code);
  store.set('sync:code', code);
  return pullAndMerge(code);
}
export const disconnect = () => { try { localStorage.removeItem('sync:code'); } catch { /* ignore */ } };

export function initSync() {
  onStoreChange(() => {
    if (!getCode()) return;
    clearTimeout(timer);
    timer = setTimeout(() => push().catch(() => {}), 2500);
  });
  if (getCode()) pullAndMerge().then(changed => { if (changed) window.location.reload(); }).catch(() => {});
}
