import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import GradientText from '../rb/GradientText';
import { Html } from '../components/ui';
import { store, shuffle } from '../store';
import { bumpWeak } from '../progress';
import { api } from '../api';
import { useLang } from '../lang';
import AiIcon from '../components/AiIcon';

const plain = h => (h || '').replace(/<[^>]+>/g, '').replace(/&[a-z]+;/g, ' ').trim();
const fmt = s => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

// Photo of a handwritten answer -> resized JPEG base64 (no data: prefix)
const toB64 = file => new Promise((res, rej) => {
  const r = new FileReader();
  r.onerror = rej;
  r.onload = () => {
    const im = new Image();
    im.onerror = rej;
    im.onload = () => {
      const k = Math.min(1, 1400 / Math.max(im.width, im.height));
      const c = document.createElement('canvas');
      c.width = Math.round(im.width * k); c.height = Math.round(im.height * k);
      c.getContext('2d').drawImage(im, 0, 0, c.width, c.height);
      res(c.toDataURL('image/jpeg', 0.8).split(',')[1]);
    };
    im.src = r.result;
  };
  r.readAsDataURL(file);
});

function makePaper(bank) {
  const C = shuffle(bank.C).slice(0, 4);
  return {
    A: shuffle(bank.A).slice(0, 5).map(x => ({ ...x, m: 2 })),
    B: shuffle(bank.B).slice(0, 4).map(x => ({ ...x, m: 5 })),
    C: C.map((x, i) => ({ ...x, m: 10, choice: i >= 2 }))
  };
}
const lastYear = pyq => ({
  A: pyq[0].items.map(([, q, , id]) => ({ q, id, m: 2 })),
  B: pyq[1].items.map(([, q, , id]) => ({ q, id, m: 5 })),
  C: pyq[2].items.map(([, q, , id], i) => ({ q, id, m: 10, choice: i >= 2 }))
});

export default function Mock({ ctx }) {
  const { S, meta, byId } = ctx;
  const lang = useLang();
  const hKey = meta.id + ':mocks';
  const [stage, setStage] = useState('start');
  const [paper, setPaper] = useState(null);
  const [mins, setMins] = useState(120);
  const [endAt, setEndAt] = useState(0);
  const [now, setNow] = useState(Date.now());
  const [ans, setAns] = useState({});      // k -> text
  const [pics, setPics] = useState({});    // k -> base64
  const [orPick, setOrPick] = useState(2);
  const [res, setRes] = useState({});      // k -> {score, good, missing, feedback} | {err}
  const [checks, setChecks] = useState({}); // manual fallback
  const [busy, setBusy] = useState('');
  const [history, setHistory] = useState(() => store.get(hKey, []));
  const fileFor = useRef(null);
  const fileInput = useRef();

  useEffect(() => {
    if (stage !== 'exam') return;
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, [stage]);
  const left = Math.max(0, Math.round((endAt - now) / 1000));
  useEffect(() => { if (stage === 'exam' && left === 0) setStage('check'); }, [left, stage]);

  const begin = p => { setPaper(p); setAns({}); setPics({}); setRes({}); setChecks({}); setOrPick(2); setEndAt(Date.now() + mins * 60e3); setNow(Date.now()); setStage('exam'); window.scrollTo(0, 0); };
  const all = paper ? [...paper.A.map((x, i) => ({ ...x, k: 'A' + i, n: i + 1 })), ...paper.B.map((x, i) => ({ ...x, k: 'B' + i, n: i + 1 })), ...paper.C.map((x, i) => ({ ...x, k: 'C' + i, n: i + 1, idx: i })).filter(x => !x.choice || x.idx === orPick)] : [];

  const points = q => {
    const t = byId[q.id]; if (!t) return [];
    const p = (t.rev || []).map(plain);
    if (q.m >= 5 && t.dg) p.push('Diagram drawn and labelled');
    if (q.m >= 5 && t.code?.length) p.push('Program / code snippet written');
    return q.m === 2 ? p.slice(0, 3) : p;
  };
  const manualScore = q => { const p = points(q); if (!p.length) return 0; const n = p.filter((_, i) => checks[q.k + ':' + i]).length; return Math.round((q.m * n / p.length) * 2) / 2; };
  const scoreOf = q => (res[q.k] && !res[q.k].err ? res[q.k].score : manualScore(q));
  const total = all.reduce((s, q) => s + scoreOf(q), 0);
  const attempted = q => (ans[q.k] || '').trim() || pics[q.k];

  const gradeOne = async q => {
    if (!attempted(q)) { setRes(r => ({ ...r, [q.k]: { score: 0, good: [], missing: ['Not attempted'], feedback: '' } })); return; }
    try {
      const j = await api('/grade', { method: 'POST', body: JSON.stringify({ question: q.q, marks: q.m, keyPoints: points(q), answer: ans[q.k] || '', image: pics[q.k] || undefined, lang }) });
      setRes(r => ({ ...r, [q.k]: j }));
    } catch (e) {
      setRes(r => ({ ...r, [q.k]: { err: e.message === 'Failed to fetch' ? 'Server se connect nahi hua.' : e.message } }));
    }
  };
  const gradeAll = async () => {
    for (let i = 0; i < all.length; i++) { setBusy(`Checking ${i + 1}/${all.length}…`); await gradeOne(all[i]); }
    setBusy('');
  };
  const pick = async e => {
    const f = e.target.files?.[0]; e.target.value = '';
    if (!f || !fileFor.current) return;
    try { const b = await toB64(f); setPics(p => ({ ...p, [fileFor.current]: b })); } catch { /* ignore unreadable image */ }
  };

  const finish = () => {
    all.forEach(q => { const r = scoreOf(q) / q.m; bumpWeak(meta.id, q.id, r < 0.5 ? 2 : r < 0.8 ? 1 : -1); });
    const h = [...history, { at: Date.now(), score: total }].slice(-20);
    store.set(hKey, h); setHistory(h); setStage('result'); window.scrollTo(0, 0);
  };

  if (stage === 'start') return (
    <div className="wrap narrow">
      <p className="eyebrow">Practice like the real thing</p>
      <h1 className="page-h">Mock test</h1>
      <p className="lead">A full 60-mark paper in last year's pattern. Type your answers, or write them on paper and add a photo. Then <b>AI checks every answer</b>, gives marks, and tells you what you missed.</p>
      <div className="card" style={{ marginTop: 20 }}>
        <b>Time</b>
        <div className="seg" style={{ margin: '10px 0 16px' }}>{[30, 60, 120, 180].map(m => <button key={m} className={mins === m ? 'on' : ''} onClick={() => setMins(m)}>{m < 60 ? m + ' min' : m / 60 + ' hr'}</button>)}</div>
        <div className="cta" style={{ marginTop: 0 }}>
          <button className="btn primary" onClick={() => begin(makePaper(S.mock))}>Start random paper</button>
          <button className="btn" onClick={() => begin(lastYear(S.pyq))}>Last year's paper</button>
        </div>
      </div>
      {history.length > 0 && <History h={history} />}
    </div>
  );

  if (stage === 'exam') return (
    <div className="wrap">
      <input ref={fileInput} type="file" accept="image/*" capture="environment" hidden onChange={pick} />
      <div className={'mock-timer' + (left < 300 ? ' low' : '')}><span>⏱ {fmt(left)}</span><button className="btn sm primary" onClick={() => { setStage('check'); window.scrollTo(0, 0); }}>Submit for checking</button></div>
      <h1 className="page-h">Mock paper · 60 marks</h1>
      <p className="lead">Type the answer, or write it on paper and tap 📷. Short notes are fine; the AI checks concepts, not English.</p>
      {[['A', 'Section A · 5 × 2 = 10', paper.A], ['B', 'Section B · 4 × 5 = 20', paper.B], ['C', 'Section C · 3 × 10 = 30 (Q1 & Q2 compulsory, then Q3 OR Q4)', paper.C]].map(([s, title, list]) => (
        <section className="paper-sec" key={s}><h2>{title}</h2>
          {list.map((q, i) => {
            const k = s + i, off = q.choice && orPick !== i;
            return (
              <div className={'pq mock-pq' + (off ? ' dimmed' : '')} key={k}>
                <div className="pq-no">Q{i + 1}</div>
                <div className="pq-body"><p>{q.q}</p>
                  <div className="pq-meta"><span className="tag">{q.m} marks</span>
                    {q.choice && <label className="toggle"><input type="radio" name="or" checked={orPick === i} onChange={() => setOrPick(i)} />Attempt this one</label>}
                  </div>
                  {!off && <>
                    <textarea className="mock-ans" rows={q.m === 2 ? 3 : q.m === 5 ? 6 : 9} value={ans[k] || ''} onChange={e => setAns({ ...ans, [k]: e.target.value })} placeholder="Type your answer here…" aria-label={'Answer for question ' + (i + 1)} />
                    <div className="wg-row">
                      <button className="btn sm" onClick={() => { fileFor.current = k; fileInput.current?.click(); }}>📷 {pics[k] ? 'Change photo' : 'Photo of written answer'}</button>
                      {pics[k] && <><img className="mock-thumb" src={'data:image/jpeg;base64,' + pics[k]} alt="Your answer" /><button className="btn sm ghost" onClick={() => setPics(p => { const n = { ...p }; delete n[k]; return n; })}>Remove</button></>}
                    </div>
                  </>}
                </div>
              </div>
            );
          })}
        </section>
      ))}
      <div className="cta"><button className="btn primary" onClick={() => { setStage('check'); window.scrollTo(0, 0); }}>Submit for checking</button></div>
    </div>
  );

  if (stage === 'check') return (
    <div className="wrap">
      <div className="mock-timer"><span>Score: <b>{total}</b> / 60</span><button className="btn sm primary" onClick={finish}>Finish & save</button></div>
      <h1 className="page-h">Checking</h1>
      <p className="lead">AI marks each answer against the key points. If the AI is unavailable, tick the points you wrote yourself.</p>
      <div className="cta"><button className="btn primary" disabled={!!busy} onClick={gradeAll}>{busy || <><AiIcon size={18} /> Check all answers with AI</>}</button></div>
      {all.map(q => {
        const t = byId[q.id], r = res[q.k], p = points(q);
        return (
          <motion.div layout className="card mock-q" key={q.k}>
            <div className="mock-q-head"><span className="tag">{q.m} marks</span><b>{q.q}</b><span className={'mock-score' + (r && !r.err ? ' ai' : '')}>{scoreOf(q)}/{q.m}</span></div>
            {r && !r.err && (
              <div className="ai-grade">
                {r.good?.length > 0 && <ul className="good">{r.good.map((g, i) => <li key={i}>✅ {g}</li>)}</ul>}
                {r.missing?.length > 0 && <ul className="miss">{r.missing.map((g, i) => <li key={i}>❌ {g}</li>)}</ul>}
                {r.feedback && <p className="fb">🤖 {r.feedback}</p>}
              </div>
            )}
            {r?.err && <p className="mi-err">AI: {r.err} Use the checklist below.</p>}
            {(!r || r.err) && <div className="mock-checks">{p.map((pt, i) => (
              <label key={i} className="toggle"><input type="checkbox" checked={!!checks[q.k + ':' + i]} onChange={e => setChecks({ ...checks, [q.k + ':' + i]: e.target.checked })} />{pt}</label>
            ))}</div>}
            <div className="wg-row" style={{ marginTop: 10 }}>
              <button className="btn sm" disabled={!!busy} onClick={async () => { setBusy('Checking…'); await gradeOne(q); setBusy(''); }}>🤖 {r ? 'Re-check' : 'Check this'}</button>
              {t && <details className="model-ans"><summary>Model answer</summary>{q.m === 2 && t.short ? <Html className="prose short" html={t.short} /> : <Html className="prose" html={t.answer} />}</details>}
            </div>
          </motion.div>
        );
      })}
      <div className="cta"><button className="btn primary" onClick={finish}>Finish & save ({total}/60)</button></div>
    </div>
  );

  const pct = Math.round((total / 60) * 100);
  return (
    <div className="wrap narrow">
      <p className="eyebrow">Mock result</p>
      <div className="score-big"><GradientText colors={pct >= 60 ? ['#4cc777', '#9be15d', '#4cc777'] : ['#ff7a3d', '#ffb38a', '#ff7a3d']}>{total}/60</GradientText></div>
      <p>{pct >= 75 ? 'Excellent. You are exam-ready.' : pct >= 50 ? 'Pass zone. Fix the weak topics below and you will score big.' : 'Not yet. Revise the topics below, then take another mock.'}</p>
      <div className="rows">{all.filter(q => scoreOf(q) / q.m < 0.6 && byId[q.id]).map(q => (
        <a key={q.k} className="row" href={`#/${meta.id}/learn/${q.id}`}><span className="row-main"><span className="row-title">{byId[q.id].title}</span><span className="row-meta">{scoreOf(q)}/{q.m} marks · revise this</span></span><span className="row-go">→</span></a>
      ))}</div>
      <div className="cta"><button className="btn primary" onClick={() => setStage('start')}>Take another mock</button><a className="btn" href={`#/${meta.id}/revise`}>Revise weak topics</a></div>
      <History h={history} />
    </div>
  );
}

function History({ h }) {
  return (
    <div className="card mock-hist">
      <b>Your mock scores</b>
      <div className="hist-bars">{h.map((x, i) => (
        <motion.div key={i} className="hist-bar" title={new Date(x.at).toLocaleString()} initial={{ height: 0 }} animate={{ height: Math.max(4, (x.score / 60) * 100) + '%' }} transition={{ delay: i * 0.04 }}><span>{x.score}</span></motion.div>
      ))}</div>
    </div>
  );
}
