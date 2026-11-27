import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import AiIcon from './AiIcon';
import { motion, AnimatePresence } from 'motion/react';
import { api } from '../api';
import { useLang } from '../lang';
import { useSpeech } from '../speech';
import { store } from '../store';
import { SkSlider } from './sakuga';
import { AsciiThinking, SyncArt } from './asciiui';
import TypeGarden from './TypeGarden';
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
const CHIP_ICONS = ['◇', '⌂', '✎', '△'];
// Chats are kept as sessions (last 30) so you can go back to an earlier doubt.
const loadSess = () => store.get('ask:sessions', []);
const ago = t => { const m = Math.round((Date.now() - t) / 60000); return m < 1 ? 'now' : m < 60 ? m + 'm' : m < 1440 ? Math.round(m / 60) + 'h' : Math.round(m / 1440) + 'd'; };
export function AskAI({ topic, context }) {
  const lang = useLang();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const [busy, setBusy] = useState(false);
  const [sessions, setSessions] = useState(loadSess);
  const [sid, setSid] = useState(null);
  const [view, setView] = useState('chat');
  const end = useRef();
  const cur = sessions.find(x => x.id === sid);
  const log = cur ? cur.log : [];
  useEffect(() => { setSid(null); setView('chat'); }, [topic]);
  useEffect(() => { end.current?.scrollIntoView({ block: 'end', behavior: 'smooth' }); }, [log.length, busy]);
  const save = (id, fn) => setSessions(all => {
    const old = all.find(x => x.id === id) || { id, topic, log: [] };
    const next = [{ ...old, at: Date.now(), log: fn(old.log) }, ...all.filter(x => x.id !== id)].slice(0, 30);
    store.set('ask:sessions', next); return next;
  });
  const send = async text => {
    const question = (text ?? q).trim();
    if (!question || busy) return;
    const id = sid || Date.now().toString(36);
    setSid(id); setQ(''); setBusy(true);
    save(id, l => [...l, { me: true, t: question }]);
    try {
      const j = await api('/ask', { method: 'POST', body: JSON.stringify({ question, lang, topic, context }) });
      save(id, l => [...l, { me: false, t: j.answer || '(empty answer)' }]);
    } catch (e) {
      save(id, l => [...l, { me: false, err: true, t: e.message === 'Failed to fetch' ? 'Server se connect nahi hua. Internet ya server URL check karo.' : e.message }]);
    } finally { setBusy(false); }
  };
  const remove = id => setSessions(all => { const n = all.filter(x => x.id !== id); store.set('ask:sessions', n); if (id === sid) setSid(null); return n; });
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
                {view === 'list'
                  ? <button className="ask-back" onClick={() => setView('chat')} aria-label="Back to chat">←</button>
                  : <button className="ask-back" onClick={() => setView('list')} aria-label="All chats" title="All chats">☰<i>{sessions.length || ''}</i></button>}
                <div className="sheet-title"><span className="ai-badge lg ascii" aria-hidden="true">&gt;_</span><div><b>{view === 'list' ? 'Your chats' : lang === 'gaali' ? 'Doubt pooch, saale' : lang === 'bhai' ? 'Doubt poochho' : 'Ask AI'}</b><small>{view === 'list' ? sessions.length + ' saved · tap one to continue' : cur ? cur.topic : topic}</small></div></div>
                {view === 'chat' && log.length > 0 && <button className="ask-new" onClick={() => setSid(null)}>+ New</button>}
                <button className="nudge-x" onClick={() => setOpen(false)} aria-label="Close">✕</button>
              </div>
              {view === 'list' ? (
                <div className="sheet-body ask-list">
                  <button className="ask-sess new" onClick={() => { setSid(null); setView('chat'); }}><b>+ New chat</b><small>{topic}</small></button>
                  {sessions.length === 0 && <p className="ask-empty">No chats yet. Ask something and it will be saved here.</p>}
                  {sessions.map(x => (
                    <div key={x.id} className={'ask-sess' + (x.id === sid ? ' on' : '')}>
                      <button onClick={() => { setSid(x.id); setView('chat'); }}>
                        <b>{(x.log.find(m => m.me) || {}).t || 'Chat'}</b>
                        <small>{x.topic} · {Math.ceil(x.log.length / 2)} Q · {ago(x.at)}</small>
                      </button>
                      <button className="ask-del" onClick={() => remove(x.id)} aria-label="Delete this chat">✕</button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="sheet-body">
                  {log.length === 0 && <>
                    <TypeGarden text={q || undefined} words={[lang === 'en' ? 'ask anything' : lang === 'bhai' ? 'doubt poochho' : 'pooch na be']} height={150} className="ask-garden" />
                    <div className="ask-chips">{CHIPS[lang].map((c, i) => <button key={c} className="xp-chip ask-chip" onClick={() => send(c)}><span className="chip-g" aria-hidden="true">{CHIP_ICONS[i]}</span>{c}</button>)}</div>
                  </>}
                  {log.map((m, i) => <div key={i} className={'ask-msg ' + (m.me ? 'me' : m.err ? 'err' : 'ai')} dangerouslySetInnerHTML={{ __html: m.me || m.err ? esc(m.t) : miniMd(m.t) }} />)}
                  {busy && <div className="ask-msg ai pw-sage"><AsciiThinking label={lang === 'en' ? 'Thinking' : 'Soch raha hai'} detail={topic} /></div>}
                  <div ref={end} />
                </div>
              )}
              {view === 'chat' && <form className="ask-form" onSubmit={e => { e.preventDefault(); send(); }}>
                <textarea value={q} onChange={e => setQ(e.target.value)} rows={2} maxLength={1500} placeholder={lang === 'en' ? 'Type your doubt…' : 'Apna doubt likho…'}
                  onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } }} aria-label="Your question" />
                <button className="ask-send" disabled={busy || !q.trim()} aria-label={lang === 'en' ? 'Send' : 'Bhejo'}>
                  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M4 12h13M12 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              </form>}
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
      <span className="sk-speed"><span aria-hidden="true">Speed</span><SkSlider label="Speed" value={rate} onChange={setRate} min={0.6} max={1.6} step={0.1} unit="×" /></span>
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
      <button className="theme-btn" onClick={() => setOpen(true)} aria-label="Sync across devices" title="Sync across devices"><span className={'sync-ic' + (has ? ' on' : '')}><svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12a8 8 0 0 1 13.7-5.6L20 8.5"/><path d="M20 4v4.5h-4.5"/><path d="M20 12a8 8 0 0 1-13.7 5.6L4 15.5"/><path d="M4 20v-4.5h4.5"/></svg></span></button>
      {createPortal(<AnimatePresence>{open && <SyncModal onClose={() => setOpen(false)} />}</AnimatePresence>, document.body)}
    </>
  );
}
function SyncModal({ onClose }) {
  const [code, setCode] = useState(getCode());
  const [input, setInput] = useState('');
  const [server, setServer] = useState(store.get('sync:server', ''));
  const [msg, setMsg] = useState('');
  const [busy, setBusy] = useState(false);
  const run = async f => { setBusy(true); setMsg(''); try { await f(); } catch (e) { setMsg('✗ ' + (e.message === 'Failed to fetch' ? 'Could not reach the server.' : e.message)); } finally { setBusy(false); } };
  const last = store.get('sync:last', 0);
  return (
    <motion.div className="sheet-bg center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.div className="modal sync-modal" role="dialog" aria-label="Sync" onClick={e => e.stopPropagation()} initial={{ scale: 0.92, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.92, opacity: 0 }}>
        <button className="nudge-x" onClick={onClose} aria-label="Close">✕</button>
        <SyncArt on={!!code} />
        <h3>Sync phone ⇄ laptop</h3>
        <p className="muted">Ticks, flashcards, mocks and weak topics stay the same on both devices. One short code links them.</p>
        {code ? (
          <div className="sync-step on">
            <span className="sync-k">[✓] linked</span>
            <div className="sync-code"><span>Your code</span><b>{code}</b><button className="btn sm" onClick={() => navigator.clipboard?.writeText(code).then(() => setMsg('✓ Copied'))}>Copy</button></div>
            <p className="muted small">Type this code on the other device. {last ? 'Last synced ' + new Date(last).toLocaleTimeString() + '.' : ''}</p>
            <div className="cta"><button className="btn primary" disabled={busy} onClick={() => run(async () => { const ch = await pullAndMerge(); setMsg(ch ? '✓ Synced, reloading…' : '✓ Already up to date'); if (ch) setTimeout(() => location.reload(), 600); })}>{busy ? 'Syncing…' : 'Sync now'}</button>
              <button className="btn" onClick={() => { disconnect(); setCode(null); setMsg('Disconnected on this device.'); }}>Disconnect</button></div>
          </div>
        ) : (
          <div className="sync-steps">
            <div className="sync-step">
              <span className="sync-k">[01] first device</span>
              <button className="btn primary" disabled={busy} onClick={() => run(async () => { setCode(await createCode()); setMsg('✓ Code ready. Type it on the other device.'); })}>{busy ? 'Making code…' : 'Make a sync code'}</button>
            </div>
            <div className="sync-or" aria-hidden="true">── or ──</div>
            <div className="sync-step">
              <span className="sync-k">[02] other device</span>
              <div className="wg-row"><input value={input} onChange={e => setInput(e.target.value)} placeholder="enter code" maxLength={10} aria-label="Sync code" />
                <button className="btn" disabled={busy || !input} onClick={() => run(async () => { const ch = await connectCode(input); setCode(input.trim().toLowerCase()); setMsg('✓ Connected' + (ch ? ', reloading…' : '')); if (ch) setTimeout(() => location.reload(), 600); })}>Connect</button></div>
            </div>
          </div>
        )}
        <details className="sync-adv"><summary>Server URL (only for the Android app)</summary>
          <div className="wg-row" style={{ marginTop: 8 }}><input value={server} onChange={e => setServer(e.target.value)} placeholder="https://study.example.com" style={{ flex: 1 }} aria-label="Server URL" />
            <button className="btn sm" onClick={() => { const v = server.trim().replace(/\/$/, ''); if (v && !/^https:\/\//.test(v)) return setMsg('✗ Must start with https://'); store.set('sync:server', v); setMsg('✓ Saved'); }}>Save</button></div>
        </details>
        {msg && <p className="sync-msg">{msg}</p>}
      </motion.div>
    </motion.div>
  );
}
