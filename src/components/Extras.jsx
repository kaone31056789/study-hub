import { useEffect, useRef, useState } from 'react';
import AiIcon from './AiIcon';
import { motion, AnimatePresence } from 'motion/react';
import { api } from '../api';
import { useLang } from '../lang';
import { useSpeech } from '../speech';
import { store } from '../store';
import { getCode, createCode, connectCode, disconnect, pullAndMerge } from '../sync';

// Tiny safe markdown: escape first, then **bold**, `code`, bullets, line breaks.
const esc = s => s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
// Code fences are pulled out first so their contents are not touched by the inline rules.
export const miniMd = s => {
  const blocks = [];
  let t = esc(String(s || '')).replace(/```[\w-]*\n?([\s\S]*?)```/g, (_, code) => {
    blocks.push('<pre class="ask-code"><code>' + code.replace(/\n$/, '') + '</code></pre>');
    return '\u0000' + (blocks.length - 1) + '\u0000';
  });
  t = t
    .replace(/^#{1,6}\s+(.*)$/gm, '<b class="ask-h">$1</b>')
    .replace(/\*\*(.+?)\*\*/g, '<b>$1</b>')
    .replace(/(^|[^*\w])\*([^*\n]+)\*(?!\w)/g, '$1<i>$2</i>')
    .replace(/`([^`\n]+)`/g, '<code>$1</code>')
    .replace(/^\s*[-*•]\s+(.*)$/gm, '<li>$1</li>')
    .replace(/^\s*\d+[.)]\s+(.*)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>\n?)+/g, m => '<ul>' + m.replace(/\n/g, '') + '</ul>')
    .replace(/\n{2,}/g, '<br><br>').replace(/\n/g, '<br>');
  return t.replace(/\u0000(\d+)\u0000/g, (_, i) => blocks[+i]);
};

/* ---------------- Ask AI (bottom sheet) ---------------- */
const CHIPS = {
  en: ['Explain this more simply', 'Give a real-life example', 'Write the 5-mark exam answer', 'How do I draw the diagram?'],
  bhai: ['Isko aur simple samjhao', 'Real life example do', '5 marks ka exam answer likh do', 'Diagram kaise banau?'],
  gaali: ['Aur simple samjha saale', 'Desi example de', '5 marks ka answer likh de', 'Diagram kaise banaun be?']
};
export function AskAI({ topic, context }) {
  const lang = useLang();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const [busy, setBusy] = useState(false);
  const [log, setLog] = useState([]);
  const end = useRef();
  useEffect(() => { setLog([]); }, [topic]);
  useEffect(() => { end.current?.scrollIntoView({ block: 'end', behavior: 'smooth' }); }, [log, busy]);
  const send = async text => {
    const question = (text ?? q).trim();
    if (!question || busy) return;
    setQ(''); setBusy(true);
    setLog(l => [...l, { me: true, t: question }]);
    try {
      const j = await api('/ask', { method: 'POST', body: JSON.stringify({ question, lang, topic, context }) });
      setLog(l => [...l, { me: false, t: j.answer || '(empty answer)' }]);
    } catch (e) {
      setLog(l => [...l, { me: false, err: true, t: e.message === 'Failed to fetch' ? 'Server se connect nahi hua. Internet ya server URL check karo.' : e.message }]);
    } finally { setBusy(false); }
  };
  return (
    <>
      <motion.button className="ask-fab" onClick={() => setOpen(true)} whileTap={{ scale: 0.92 }} initial={{ scale: 0 }} animate={{ scale: 1 }} aria-label="Ask AI a doubt">
        <span className="ai-badge"><AiIcon size={20} /></span><span>{lang === 'en' ? 'Ask AI' : 'Doubt?'}</span>
      </motion.button>
      <AnimatePresence>
        {open && (
          <motion.div className="sheet-bg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)}>
            <motion.div className="sheet" role="dialog" aria-label="Ask AI" onClick={e => e.stopPropagation()}
              initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', stiffness: 320, damping: 32 }}>
              <div className="sheet-head">
                <div className="sheet-title"><span className="ai-badge lg"><AiIcon size={22} /></span><div><b>{lang === 'gaali' ? 'Doubt pooch, saale' : lang === 'bhai' ? 'Doubt poochho' : 'Ask AI'}</b><small>{topic}</small></div></div>
                <button className="nudge-x" onClick={() => setOpen(false)} aria-label="Close">✕</button>
              </div>
              <div className="sheet-body">
                {log.length === 0 && <div className="ask-chips">{CHIPS[lang].map(c => <button key={c} className="xp-chip" onClick={() => send(c)}>{c}</button>)}</div>}
                {log.map((m, i) => <div key={i} className={'ask-msg ' + (m.me ? 'me' : m.err ? 'err' : 'ai')} dangerouslySetInnerHTML={{ __html: m.me || m.err ? esc(m.t) : miniMd(m.t) }} />)}
                {busy && <div className="ask-msg ai typing"><i /><i /><i /></div>}
                <div ref={end} />
              </div>
              <form className="ask-form" onSubmit={e => { e.preventDefault(); send(); }}>
                <textarea value={q} onChange={e => setQ(e.target.value)} rows={2} maxLength={1500} placeholder={lang === 'en' ? 'Type your doubt…' : 'Apna doubt likho…'}
                  onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } }} aria-label="Your question" />
                <button className="btn primary" disabled={busy || !q.trim()}>Send</button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ---------------- Audio bar ---------------- */
export function AudioBar({ parts, label = '🔊 Sunao' }) {
  const sp = useSpeech();
  const [rate, setRate] = useState(1);
  if (!sp.ok) return null;
  return (
    <div className="audio-bar">
      {sp.state === 'idle' && <button className="btn sm" onClick={() => sp.play(parts(), rate)}>{label}</button>}
      {sp.state === 'playing' && <button className="btn sm" onClick={sp.pause}>⏸ Pause</button>}
      {sp.state === 'paused' && <button className="btn sm" onClick={sp.resume}>▶ Resume</button>}
      {sp.state !== 'idle' && <button className="btn sm ghost" onClick={sp.stop}>⏹ Stop</button>}
      <select value={rate} onChange={e => setRate(+e.target.value)} aria-label="Speed">{[0.8, 1, 1.2, 1.5].map(r => <option key={r} value={r}>{r}×</option>)}</select>
      {sp.state === 'playing' && <span className="eq" aria-hidden="true"><i /><i /><i /><i /></span>}
    </div>
  );
}

/* ---------------- Sync panel ---------------- */
export function SyncButton() {
  const [open, setOpen] = useState(false);
  const has = !!getCode();
  return (
    <>
      <button className="theme-btn" onClick={() => setOpen(true)} aria-label="Sync across devices" title="Sync across devices">{has ? '☁️' : '⛅'}</button>
      <AnimatePresence>{open && <SyncModal onClose={() => setOpen(false)} />}</AnimatePresence>
    </>
  );
}
function SyncModal({ onClose }) {
  const [code, setCode] = useState(getCode());
  const [input, setInput] = useState('');
  const [server, setServer] = useState(store.get('sync:server', ''));
  const [msg, setMsg] = useState('');
  const [busy, setBusy] = useState(false);
  const run = async f => { setBusy(true); setMsg(''); try { await f(); } catch (e) { setMsg('❌ ' + (e.message === 'Failed to fetch' ? 'Server nahi mila.' : e.message)); } finally { setBusy(false); } };
  const last = store.get('sync:last', 0);
  return (
    <motion.div className="sheet-bg center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.div className="modal" role="dialog" aria-label="Sync" onClick={e => e.stopPropagation()} initial={{ scale: 0.92, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.92, opacity: 0 }}>
        <button className="nudge-x" onClick={onClose} aria-label="Close">✕</button>
        <h3>☁️ Sync phone ⇄ laptop</h3>
        <p className="muted">Progress (ticks, flashcards, mocks, weak topics) dono devices pe same rahega. Bas ek code chahiye.</p>
        {code ? (
          <>
            <div className="sync-code"><span>Your code</span><b>{code}</b><button className="btn sm" onClick={() => navigator.clipboard?.writeText(code).then(() => setMsg('✓ Copied'))}>Copy</button></div>
            <p className="muted small">Doosre device pe ye code daalo. {last ? 'Last synced: ' + new Date(last).toLocaleTimeString() : ''}</p>
            <div className="cta"><button className="btn primary" disabled={busy} onClick={() => run(async () => { const ch = await pullAndMerge(); setMsg(ch ? '✓ Synced, reloading…' : '✓ Up to date'); if (ch) setTimeout(() => location.reload(), 600); })}>Sync now</button>
              <button className="btn" onClick={() => { disconnect(); setCode(null); setMsg('Disconnected on this device.'); }}>Disconnect</button></div>
          </>
        ) : (
          <>
            <button className="btn primary" style={{ width: '100%' }} disabled={busy} onClick={() => run(async () => { setCode(await createCode()); setMsg('✓ Code ready. Isko doosre device pe daalo.'); })}>Naya sync code banao</button>
            <p className="muted small" style={{ textAlign: 'center' }}>ya</p>
            <div className="wg-row"><input value={input} onChange={e => setInput(e.target.value)} placeholder="Doosre device ka code" maxLength={10} style={{ flex: 1 }} aria-label="Sync code" />
              <button className="btn" disabled={busy || !input} onClick={() => run(async () => { const ch = await connectCode(input); setCode(input.trim().toLowerCase()); setMsg('✓ Connected' + (ch ? ', reloading…' : '')); if (ch) setTimeout(() => location.reload(), 600); })}>Connect</button></div>
          </>
        )}
        <details className="sync-adv"><summary>Server URL (sirf app ke liye)</summary>
          <div className="wg-row" style={{ marginTop: 8 }}><input value={server} onChange={e => setServer(e.target.value)} placeholder="https://study.example.com" style={{ flex: 1 }} aria-label="Server URL" />
            <button className="btn sm" onClick={() => { const v = server.trim().replace(/\/$/, ''); if (v && !/^https:\/\//.test(v)) return setMsg('❌ https:// se shuru hona chahiye'); store.set('sync:server', v); setMsg('✓ Saved'); }}>Save</button></div>
        </details>
        {msg && <p className="sync-msg">{msg}</p>}
      </motion.div>
    </motion.div>
  );
}
