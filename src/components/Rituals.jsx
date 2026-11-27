// Study rituals: the daily seal (stamp + calendar + streak), the sumi-e progress scroll, the focus
// timer with an ASCII campfire, the shareable progress card and the sound toggle.
import { useEffect, useMemo, useState, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import { store } from '../store';
import { sfx, haptic, useSound, setSound } from '../sound';
import { toast } from './sakuga';

/* ── daily seal ── */
const iso = d => { const x = new Date(d); return x.getFullYear() + '-' + String(x.getMonth() + 1).padStart(2, '0') + '-' + String(x.getDate()).padStart(2, '0'); };
const DAY = 864e5;
export const sealDays = () => store.get('seal:days', []);
export function streak(days = sealDays()) {
  const has = new Set(days); let n = 0, d = Date.now();
  if (!has.has(iso(d))) d -= DAY;                       // today not stamped yet: count up to yesterday
  while (has.has(iso(d))) { n++; d -= DAY; }
  return n;
}
// First bit of study each day stamps the seal (big stamp animation once a day).
export function stampToday() {
  const t = iso(Date.now()), days = sealDays();
  if (days.includes(t)) return;
  store.set('seal:days', [...days, t].slice(-400));
  window.dispatchEvent(new CustomEvent('seal', { detail: { streak: streak([...days, t]) } }));
}

const Seal = ({ size = 40, className = '' }) => (
  <svg className={'seal-mark ' + className} width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
    <rect x="2" y="2" width="36" height="36" rx="7" fill="var(--accent)" />
    <rect x="5" y="5" width="30" height="30" rx="4" fill="none" stroke="var(--bg)" strokeWidth="1.2" strokeDasharray="2 1.6" opacity=".55" />
    <text x="20" y="28" textAnchor="middle" fontFamily='"Shippori Mincho B1",serif' fontWeight="800" fontSize="21" fill="var(--bg)">学</text>
  </svg>
);

export function StampOverlay() {
  const [s, setS] = useState(null);
  useEffect(() => {
    let tm;
    const on = e => {
      setS({ n: e.detail.streak, k: Date.now() });
      setTimeout(() => { sfx('stamp'); haptic(35); }, 260);
      clearTimeout(tm); tm = setTimeout(() => setS(null), 1900);
    };
    addEventListener('seal', on);
    return () => { removeEventListener('seal', on); clearTimeout(tm); };
  }, []);
  if (!s) return null;
  return createPortal(
    <div className="stamp-ov" key={s.k} role="status" aria-live="polite">
      <div className="stamp-hit"><span className="stamp-ink" /><Seal size={150} /></div>
      <p><b>Today's seal</b>{s.n > 1 ? ` · ${s.n}-day streak` : ' · day one, keep it going'}</p>
    </div>, document.body);
}

export function SealCalendar() {
  const days = useMemo(() => new Set(sealDays()), []);
  const n = streak();
  const cells = Array.from({ length: 14 }, (_, i) => { const d = new Date(Date.now() - (13 - i) * DAY); return { d, k: iso(d) }; });
  return (
    <section className="card seal-cal">
      <div className="seal-head"><b>Study seals</b><span><i className="seal-k">連</i>{n ? `${n}-day streak` : 'Study today to start a streak'}</span></div>
      <div className="seal-row">
        {cells.map(({ d, k }, i) => (
          <div key={k} className={'seal-day' + (i === 13 ? ' today' : '')} title={d.toDateString()}>
            <small>{'SMTWTFS'[d.getDay()]}</small>
            {days.has(k) ? <Seal size={30} className={'r' + (d.getDate() % 3)} /> : <span className="seal-empty">{d.getDate()}</span>}
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── sumi-e scroll: each learned topic paints a little more of the landscape ── */
const STROKES = [
  { d: 'M0 170 L60 122 L110 150 L170 96 L230 140 L290 112 L350 150 L420 100 L480 140 L540 116 L600 150 L600 240 L0 240Z', fill: 0.07, w: 0 },
  { d: 'M0 205 Q70 122 130 160 Q170 186 210 150 Q250 122 300 192', w: 3.2, fill: 0.1 },
  { d: 'M320 205 Q380 112 450 150 Q500 176 600 132', w: 3.2, fill: 0.1 },
  { d: 'M40 176 Q150 168 260 177', w: 1.4, o: 0.45 },
  { d: 'M360 184 Q470 173 580 181', w: 1.4, o: 0.45 },
  { d: 'M120 60 m-22 0 a22 22 0 1 0 44 0 a22 22 0 1 0 -44 0', w: 0, accent: 1 },
  { d: 'M262 240 Q300 212 282 202 Q262 192 302 186', w: 2.2, o: 0.7 },
  { d: 'M198 208 Q250 178 302 208', w: 3.4 },
  { d: 'M205 196 Q250 168 295 196 M215 201 v-12 M235 192 v-12 M250 189 v-12 M265 192 v-12 M285 199 v-12', w: 1.6 },
  { d: 'M522 240 Q515 200 525 160 Q530 130 522 100', w: 4 },
  { d: 'M522 120 q-30 -6 -50 4 M524 140 q32 -8 52 2 M520 165 q-36 -4 -56 8 M526 185 q30 -6 46 4', w: 2.4 },
  { d: 'M468 124 q26 -16 54 -6 M574 142 q-24 -16 -52 -3 M462 172 q30 -14 58 -6 M572 190 q-20 -12 -46 -4', w: 5, o: 0.6 },
  { d: 'M300 62 q8 -8 16 0 q8 -8 16 0 M342 46 q6 -6 12 0 q6 -6 12 0 M366 72 q5 -5 10 0 q5 -5 10 0', w: 1.6 },
  { d: 'M150 224 q30 8 60 0 l-8 -8 h-44z M180 216 v-22 l14 16', w: 1.8 },
  { d: 'M20 240 q4 -20 10 -30 M32 240 q2 -14 -4 -24 M560 240 q-2 -18 6 -28 M576 240 q4 -12 12 -18', w: 1.6 },
];
export function InkScroll({ done, total }) {
  const k = total ? Math.round((done / total) * STROKES.length) : 0, full = total > 0 && done >= total;
  return (
    <figure className="ink-scroll card">
      <svg viewBox="0 0 600 240" role="img" aria-label={`Ink landscape: ${k} of ${STROKES.length} strokes painted`}>
        {STROKES.map((s, i) => {
          const on = i < k, col = s.accent ? 'var(--accent)' : 'var(--text)';
          return (
            <g key={i} className={on ? 'is-on' : 'is-off'} style={{ '--i': i }}>
              {(s.fill || s.accent) && <path d={s.d} fill={col} fillOpacity={s.accent ? 0.9 : s.fill} stroke="none" className="is-fill" />}
              {s.w > 0 && <path d={s.d} pathLength="1" fill="none" stroke={col} strokeWidth={s.w} strokeOpacity={s.o || 0.85} strokeLinecap="round" strokeLinejoin="round" className="is-stroke" />}
            </g>
          );
        })}
        {full && <g className="is-seal" transform="translate(548 18)"><rect width="36" height="36" rx="6" fill="var(--accent)" /><text x="18" y="26" textAnchor="middle" fontFamily='"Shippori Mincho B1",serif' fontWeight="800" fontSize="20" fill="var(--bg)">学</text></g>}
      </svg>
      <figcaption><b>Your ink scroll</b><span>{full ? 'Finished and sealed. Frame it.' : `${k} of ${STROKES.length} strokes · every topic you learn paints more`}</span></figcaption>
    </figure>
  );
}

/* ── focus mode: exam countdown, brush-ring timer, ASCII campfire ── */
const FIRE = ' .,:;*^%#';
function campfire(t, lit) {
  const W = 17, rows = [];
  for (let y = 5; y >= 0; y--) {
    let r = '';
    for (let x = 0; x < W; x++) {
      const h = (lit ? 5.2 : 1.6) - Math.abs(x - 8) * 0.62 + Math.sin(t * 0.9 + x * 1.7) * 0.8 + (Math.random() - 0.5) * (lit ? 1.2 : 0.4);
      const v = h - y; r += v <= 0 ? ' ' : FIRE[Math.min(FIRE.length - 1, Math.floor(v * 1.8 + 1))];
    }
    rows.push(r);
  }
  return rows.join('\n') + '\n   /\\_/\\_/\\_/\\   \n  ~~~~~~~~~~~~~  ';
}
const MODES = [[25, 5], [50, 10]];
// One focus timer for the whole app (kept in storage, so it survives reloads and page changes).
const FK = 'focus:state';
let F = { sid: null, mode: 0, phase: 'focus', end: 0, left: null, ...store.get(FK, {}) };
const fsubs = new Set();
let ftimer = 0;
const flen = s => MODES[s.mode][s.phase === 'focus' ? 0 : 1] * 60e3;
const fleft = (s, now = Date.now()) => (s.end ? Math.max(0, s.end - now) : s.left ?? flen(s));
const femit = () => { store.set(FK, F); fsubs.forEach(f => f()); };
function arm() { clearInterval(ftimer); if (F.end) ftimer = setInterval(() => { if (Date.now() >= F.end) complete(); }, 250); }
const fset = patch => { F = { ...F, ...patch }; femit(); arm(); };
function complete() {
  clearInterval(ftimer); sfx('chime'); haptic([60, 80, 60]);
  if (F.phase === 'focus') { const k = F.sid + ':focus'; store.set(k, store.get(k, 0) + MODES[F.mode][0]); stampToday(); toast('Session done. Take a break.'); F = { ...F, phase: 'break', end: 0, left: null }; }
  else { toast('Break over. Ready for the next one?'); F = { ...F, phase: 'focus', end: 0, left: null }; }
  femit();
}
arm();
const useFocus = () => useSyncExternalStore(f => { fsubs.add(f); return () => fsubs.delete(f); }, () => F);
const useNow = on => { const [n, setN] = useState(Date.now()); useEffect(() => { if (!on) return; const id = setInterval(() => setN(Date.now()), 200); return () => clearInterval(id); }, [on]); return n; };
const fStart = sid => { sfx('tick'); fset({ sid: sid || F.sid, end: Date.now() + fleft(F) }); };
const fPause = () => fset({ left: fleft(F), end: 0 });

export function Focus({ ctx }) {
  const { S, meta, done, byId, order } = ctx;
  const st = useFocus(), running = st.end > 0, now = useNow(running);
  const len = flen(st), left = fleft(st, now), p = 1 - left / len;
  const mins = store.get(meta.id + ':focus', 0);
  const exam = new Date(meta.exam + 'T00:00:00'), dLeft = exam - now;
  const nextId = order.find(id => !done.has(id));
  return (
    <div className="wrap narrow focus">
      <p className="eyebrow">Exam-day focus</p>
      <h1 className="page-h">Focus</h1>
      <p className="lead">{dLeft > DAY ? `${Math.floor(dLeft / DAY)} days ${Math.floor((dLeft % DAY) / 36e5)} hours until the ${meta.short} exam.` : dLeft > 0 ? `${Math.floor(dLeft / 36e5)} hours to go. Light revision only.` : `${meta.short} exam is today. Breathe, you've got this.`} The timer keeps running while you study on other pages.</p>
      <div className="focus-stage">
        <svg className="focus-ring" viewBox="0 0 260 260" aria-hidden="true">
          <defs><filter id="brush"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="4" /><feDisplacementMap in="SourceGraphic" scale="5" /></filter></defs>
          <circle cx="130" cy="130" r="110" fill="none" stroke="var(--line)" strokeWidth="2" />
          <circle cx="130" cy="130" r="110" fill="none" stroke="var(--accent)" strokeWidth="14" strokeLinecap="round" pathLength="1" strokeDasharray={`${p} 1`} transform="rotate(-90 130 130)" filter="url(#brush)" />
        </svg>
        <div className="focus-mid">
          <pre className={'campfire' + (running ? ' lit' : '')} aria-hidden="true">{campfire(now / 800, running && st.phase === 'focus')}</pre>
          <b className="focus-time" role="timer" aria-live="off">{fmt(left)}</b>
          <span className="focus-phase">{st.phase}</span>
        </div>
      </div>
      <div className="cta focus-ctl">
        {running ? <button className="btn" onClick={fPause}>Pause</button> : <button className="btn primary" onClick={() => fStart(meta.id)}>{left < len ? 'Resume' : st.phase === 'focus' ? 'Start focus' : 'Start break'}</button>}
        <button className="btn" onClick={() => fset({ end: 0, left: null })}>Reset</button>
        {MODES.map(([f, b], i) => <button key={f} className={'btn sm' + (st.mode === i ? ' on' : '')} disabled={running} onClick={() => fset({ mode: i, phase: 'focus', left: null })}>{f} / {b}</button>)}
      </div>
      <p className="muted focus-stats">{mins ? `${Math.floor(mins / 60) ? Math.floor(mins / 60) + 'h ' : ''}${mins % 60}m focused on ${meta.short} so far.` : 'Your first session starts the count.'}</p>
      {nextId && <a className="card focus-next" href={'#/' + meta.id + '/learn/' + nextId}><span className="eyebrow">This session</span><b>{byId[nextId].title}</b><span className="muted">{byId[nextId].mins} min · open the topic, a small timer follows you</span></a>}
      {!nextId && <a className="card focus-next" href={'#/' + meta.id + '/revise'}><span className="eyebrow">This session</span><b>Revise in Test-me mode</b><span className="muted">All {S.topics.length} topics learned</span></a>}
    </div>
  );
}

// The small floating timer shown on every other page while a session is running or paused mid-way.
export function FocusMini() {
  const st = useFocus(), running = st.end > 0, now = useNow(running);
  const [hash, setHash] = useState(location.hash);
  useEffect(() => { const on = () => setHash(location.hash); addEventListener('hashchange', on); return () => removeEventListener('hashchange', on); }, []);
  const len = flen(st), left = fleft(st, now), active = running || left < len;
  useEffect(() => { document.title = running ? `${fmt(left)} · ${st.phase === 'focus' ? 'Focus' : 'Break'}` : 'Study Hub'; }, [running, left, st.phase]);
  if (!active || !st.sid || /\/focus$/.test(hash)) return null;
  const C = 2 * Math.PI * 15, p = 1 - left / len;
  return (
    <div className={'focus-mini' + (running ? ' on' : '')} role="timer" aria-label={`${st.phase} timer, ${fmt(left)} left`}>
      <svg width="40" height="40" viewBox="0 0 40 40" aria-hidden="true">
        <circle cx="20" cy="20" r="15" fill="none" stroke="var(--line)" strokeWidth="3" />
        <circle cx="20" cy="20" r="15" fill="none" stroke="var(--accent)" strokeWidth="3.5" strokeLinecap="round" strokeDasharray={`${p * C} ${C}`} transform="rotate(-90 20 20)" />
      </svg>
      <a className="fm-time" href={'#/' + st.sid + '/focus'} title="Open focus"><b>{fmt(left)}</b><small>{st.phase}</small></a>
      <button className="fm-btn" onClick={() => (running ? fPause() : fStart())} aria-label={running ? 'Pause timer' : 'Resume timer'}>
        {running ? <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><rect x="2" y="1" width="3.5" height="12" rx="1" fill="currentColor" /><rect x="8.5" y="1" width="3.5" height="12" rx="1" fill="currentColor" /></svg>
          : <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M3 1.5v11l9.5-5.5z" fill="currentColor" /></svg>}
      </button>
    </div>
  );
}
const fmt = ms => { const s = Math.ceil(ms / 1000); return String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0'); };

/* ── shareable progress card ── */
const cssVar = k => getComputedStyle(document.documentElement).getPropertyValue(k).trim();
async function drawCard({ name, short, done, total }) {
  await document.fonts?.ready;
  const c = document.createElement('canvas'); c.width = 1080; c.height = 1350;
  const g = c.getContext('2d'), bg = cssVar('--bg') || '#0e0d0c', fg = cssVar('--text') || '#e9e2d4', acc = cssVar('--accent') || '#d9452b', mut = cssVar('--muted') || '#9a9184';
  const serif = '"Shippori Mincho B1", "Fraunces", Georgia, serif', mono = '"JetBrains Mono", Consolas, monospace';
  g.fillStyle = bg; g.fillRect(0, 0, 1080, 1350);
  g.strokeStyle = acc; g.globalAlpha = 0.35; g.lineWidth = 2; g.setLineDash([6, 8]); g.strokeRect(48, 48, 984, 1254); g.setLineDash([]); g.globalAlpha = 1;
  g.fillStyle = mut; g.font = `600 30px ${mono}`; g.fillText('STUDY HUB · ' + short, 96, 140);
  g.fillStyle = fg; g.font = `800 74px ${serif}`;
  const words = name.split(' '); let line = '', y = 250;
  for (const w of words) { if (g.measureText(line + w).width > 880) { g.fillText(line.trim(), 96, y); line = ''; y += 88; } line += w + ' '; }
  g.fillText(line.trim(), 96, y);
  const pct = total ? Math.round((done / total) * 100) : 0;
  g.fillStyle = acc; g.font = `800 300px ${serif}`; g.fillText(pct + '%', 84, y + 340);
  g.fillStyle = fg; g.font = `500 40px ${serif}`; g.fillText(`${done} of ${total} topics learned`, 96, y + 420);
  const cells = 20, on = Math.round((pct / 100) * cells);
  g.font = `700 46px ${mono}`; g.fillStyle = acc; g.fillText('█'.repeat(on), 96, y + 520); g.fillStyle = mut; g.fillText('░'.repeat(cells - on), 96 + g.measureText('█'.repeat(on)).width, y + 520);
  const n = streak(); g.fillStyle = fg; g.font = `600 38px ${mono}`; g.fillText(n ? `連 ${n}-day streak` : '連 streak starts today', 96, y + 610);
  g.save(); g.translate(880, 1160); g.rotate(-0.12); g.fillStyle = acc; g.beginPath(); g.roundRect(-90, -90, 180, 180, 26); g.fill();
  g.fillStyle = bg; g.font = `800 120px ${serif}`; g.textAlign = 'center'; g.fillText('学', 0, 44); g.restore();
  g.fillStyle = mut; g.font = `500 30px ${mono}`; g.fillText('study.kaone.in · one topic at a time', 96, 1250);
  return c;
}
export function ShareProgress({ meta, done, total }) {
  const [img, setImg] = useState(null);
  const open = async () => { const c = await drawCard({ name: meta.name, short: meta.short, done, total }); c.toBlob(b => setImg({ url: URL.createObjectURL(b), blob: b }), 'image/png'); };
  useEffect(() => () => img && URL.revokeObjectURL(img.url), [img]);
  const file = img && new File([img.blob], `study-hub-${meta.id}.png`, { type: 'image/png' });
  const canShare = file && navigator.canShare?.({ files: [file] });
  return (
    <>
      <button className="btn" onClick={open}>Share progress</button>
      {img && createPortal(
        <div className="share-ov" role="dialog" aria-modal="true" aria-label="Share your progress" onClick={e => e.target === e.currentTarget && setImg(null)}>
          <div className="share-box">
            <img src={img.url} alt={`${meta.short} progress card`} />
            <div className="cta">
              {canShare && <button className="btn primary" onClick={() => navigator.share({ files: [file], title: meta.short + ' progress' }).catch(() => {})}>Share</button>}
              <a className={'btn' + (canShare ? '' : ' primary')} href={img.url} download={`study-hub-${meta.id}.png`}>Save image</a>
              <button className="btn" onClick={() => setImg(null)}>Close</button>
            </div>
          </div>
        </div>, document.body)}
    </>
  );
}

/* ── sound toggle (header) ── */
export function SoundToggle() {
  const on = useSound();
  return (
    <button className="theme-btn" onClick={() => { setSound(!on); if (!on) setTimeout(() => sfx('drop')); }} aria-label={on ? 'Mute sounds' : 'Turn sounds on'} title={on ? 'Sounds on' : 'Sounds off'} aria-pressed={on}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" />
        {on ? <><path d="M15.5 9a4 4 0 0 1 0 6" /><path d="M18 6.5a7.5 7.5 0 0 1 0 11" /></> : <path d="M16 9.5l5 5M21 9.5l-5 5" />}
      </svg>
    </button>
  );
}
