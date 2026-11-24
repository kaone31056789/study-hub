import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const hash = s => { let h = 7; for (const c of String(s)) h = (h * 31 + c.charCodeAt(0)) >>> 0; return h % 97; };
const Chip = ({ v, cls = '' }) => (
  <motion.span layout initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.6, opacity: 0 }} transition={{ type: 'spring', stiffness: 420, damping: 30 }} className={'chipv ' + cls}>{v}</motion.span>
);

/* ---------- Collections playground ---------- */
const CollBox = ({ name, items, note }) => (
  <div className="box"><b className="mono" style={{ fontSize: 14 }}>{name}</b><small>{note}</small>
    <div className="wg-row" style={{ marginTop: 10, gap: 6, minHeight: 36 }}><AnimatePresence>{items.map((x, i) => <Chip key={x + i} v={x} />)}</AnimatePresence></div>
  </div>
);
export function CollectionPlayground() {
  const [v, setV] = useState('Delhi');
  const [list, setList] = useState(['Pune', 'Agra']);
  const [rej, setRej] = useState(null);
  const add = val => {
    val = (val ?? v).trim(); if (!val) return;
    setRej(list.includes(val) ? val : null);
    setList(l => [...l, val]);
  };
  const set = [...new Set(list)];
  const hashSet = [...set].sort((a, b) => hash(a) - hash(b));
  const treeSet = [...set].sort();
  return (
    <div className="wg">
      <p className="wg-title">Add the same values to a List and two Sets. Try a duplicate</p>
      <div className="wg-row" style={{ marginBottom: 14 }}>
        <input value={v} onChange={e => setV(e.target.value)} onKeyDown={e => e.key === 'Enter' && add()} style={{ width: 140 }} aria-label="value" />
        <button className="btn primary" onClick={() => add()}>.add()</button>
        {['Delhi', 'Agra', 'Mumbai', 'Chennai'].map(x => <button key={x} className="btn sm" onClick={() => add(x)}>{x}</button>)}
        <button className="btn sm" onClick={() => { setList([]); setRej(null); }}>clear</button>
      </div>
      <div style={{ display: 'grid', gap: 10 }}>
        <CollBox name="ArrayList" items={list} note="keeps insertion order · allows duplicates · index-based get(i)" />
        <CollBox name="HashSet" items={hashSet} note="NO duplicates · order not guaranteed (decided by hashCode)" />
        <CollBox name="TreeSet" items={treeSet} note="NO duplicates · always sorted" />
      </div>
      <p className={'wg-note ' + (rej ? 'bad' : '')}>{rej ? <>"{rej}" was added to the ArrayList again, but both Sets <b>ignored</b> it. <code>set.add()</code> returned <b>false</b>.</> : 'List = ordered and duplicates allowed. Set = unique elements. Map = key → value pairs (not a Collection).'}</p>
    </div>
  );
}

/* ---------- ArrayList vs LinkedList: cost of operations ---------- */
export function ListCompare() {
  const base = ['A', 'B', 'C', 'D', 'E'];
  const [hl, setHl] = useState({ arr: [], ll: [] });
  const [msg, setMsg] = useState(null);
  const [items, setItems] = useState(base);
  const t = useRef([]);
  const clear = () => { t.current.forEach(clearTimeout); t.current = []; };
  useEffect(() => clear, []);
  const get3 = () => {
    clear(); setItems(base);
    setHl({ arr: [3], ll: [] });
    [0, 1, 2, 3].forEach((i, k) => t.current.push(setTimeout(() => setHl(h => ({ ...h, ll: [...h.ll, i] })), 350 * (k + 1))));
    setMsg(['get(3)', 'ArrayList jumps straight to index 3: 1 step, O(1).', 'LinkedList must walk node by node from the head: 4 steps, O(n).']);
  };
  const ins = () => {
    clear(); setItems(['A', 'X', 'B', 'C', 'D', 'E']);
    setHl({ arr: [2, 3, 4, 5], ll: [1] });
    setMsg(['add(1, "X")', 'ArrayList had to SHIFT 4 elements right to make room: O(n).', 'LinkedList only changes 2 links (A→X→B): O(1) once at the position.']);
  };
  return (
    <div className="wg">
      <p className="wg-title">Same operation, different cost</p>
      <div className="wg-row" style={{ marginBottom: 14 }}>
        <button className="btn primary" onClick={get3}>list.get(3)</button>
        <button className="btn primary" onClick={ins}>list.add(1, "X")</button>
        <button className="btn sm" onClick={() => { clear(); setItems(base); setHl({ arr: [], ll: [] }); setMsg(null); }}>reset</button>
      </div>
      <div className="box"><b>ArrayList</b><small>dynamic array · contiguous memory, index-based</small>
        <div className="wg-row" style={{ gap: 4, marginTop: 10 }}>{items.map((x, i) => <span key={i} className={'chipv ' + (hl.arr.includes(i) ? 'hl' : '')} style={{ borderRadius: 4 }}>{x}<sub style={{ opacity: .5, marginLeft: 3 }}>{i}</sub></span>)}</div>
        {msg && <small style={{ marginTop: 8, color: 'var(--text)' }}>{msg[1]}</small>}
      </div>
      <div className="box" style={{ marginTop: 10 }}><b>LinkedList</b><small>doubly linked nodes · each node stores prev + next</small>
        <div className="wg-row" style={{ gap: 2, marginTop: 10 }}>{items.map((x, i) => <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 2 }}><span className={'chipv ' + (hl.ll.includes(i) ? 'hl' : '')} style={{ borderRadius: 18 }}>{x}</span>{i < items.length - 1 && <span className="arrow">⇄</span>}</span>)}</div>
        {msg && <small style={{ marginTop: 8, color: 'var(--text)' }}>{msg[2]}</small>}
      </div>
      <p className="wg-note"><b>Rule of thumb:</b> lots of reading by index → ArrayList. Lots of insert/delete → LinkedList.</p>
    </div>
  );
}

/* ---------- HashMap vs TreeMap ---------- */
const MapRow = ({ e }) => <Chip v={`${e[0] === null ? 'null' : e[0]}=${e[1]}`} />;
export function MapCompare() {
  const [entries, setEntries] = useState([['Mango', 40], ['Apple', 120], ['Banana', 30]]);
  const [k, setK] = useState('Cherry');
  const [err, setErr] = useState(null);
  const put = (key, val = Math.floor(Math.random() * 90) + 10) => {
    setErr(key === null ? 'TreeMap.put(null, …) → NullPointerException. TreeMap must compare keys to sort them, and it cannot compare null.' : null);
    setEntries(e => { const m = new Map(e); m.set(key, val); return [...m]; });
  };
  const hm = [...entries].sort((a, b) => (a[0] === null ? -1 : b[0] === null ? 1 : hash(a[0]) - hash(b[0])));
  const tm = entries.filter(e => e[0] !== null).sort((a, b) => a[0].localeCompare(b[0]));
  return (
    <div className="wg">
      <p className="wg-title">put() the same keys into both maps</p>
      <div className="wg-row" style={{ marginBottom: 14 }}>
        <input value={k} onChange={e => setK(e.target.value)} style={{ width: 130 }} aria-label="key" />
        <button className="btn primary" onClick={() => k.trim() && put(k.trim())}>put(key, value)</button>
        <button className="btn sm" onClick={() => put('Apple', 999)}>put("Apple", 999)</button>
        <button className="btn sm" onClick={() => put(null, 0)}>put(null, 0)</button>
      </div>
      <div className="split">
        <div className="box"><b>HashMap</b><small>no order · O(1) · 1 null key allowed</small><div className="wg-row" style={{ gap: 6, marginTop: 10 }}><AnimatePresence>{hm.map(e => <MapRow key={String(e[0])} e={e} />)}</AnimatePresence></div></div>
        <div className={'box ' + (err ? 'bad' : '')}><b>TreeMap</b><small>sorted by key · O(log n) · null key ✗</small><div className="wg-row" style={{ gap: 6, marginTop: 10 }}><AnimatePresence>{tm.map(e => <MapRow key={e[0]} e={e} />)}</AnimatePresence></div></div>
      </div>
      <p className={'wg-note ' + (err ? 'bad' : '')}>{err || 'Same key again (try "Apple") → value is replaced, keys stay unique in both. TreeMap keeps keys alphabetically sorted.'}</p>
    </div>
  );
}

/* ---------- Thread lifecycle state machine ---------- */
export function ThreadLifecycle() {
  const [st, setSt] = useState('NONE');
  const [log, setLog] = useState([]);
  const [why, setWhy] = useState('');
  const ACTIONS = [
    ['new Thread()', ['NONE', 'TERMINATED'], 'NEW', 'Thread object created. Not alive yet.'],
    ['t.start()', ['NEW'], 'RUNNABLE', 'Thread is ready and waiting in the queue for CPU.'],
    ['scheduler picks it', ['RUNNABLE'], 'RUNNING', 'CPU given. run() is executing.'],
    ['time slice over / yield()', ['RUNNING'], 'RUNNABLE', 'Paused by the scheduler, back to ready queue.'],
    ['sleep(1000)', ['RUNNING'], 'WAITING', 'Timed waiting. Wakes automatically after 1 s.'],
    ['wait() / join()', ['RUNNING'], 'WAITING', 'Waiting for notify() or for another thread to finish.'],
    ['needs a locked object', ['RUNNING'], 'BLOCKED', 'Another thread holds the synchronized lock.'],
    ['notify() / time over', ['WAITING'], 'RUNNABLE', 'Woken up. Back to ready, not straight to running.'],
    ['lock released', ['BLOCKED'], 'RUNNABLE', 'Got the lock. Back to ready.'],
    ['run() finishes', ['RUNNING'], 'TERMINATED', 'Dead. It can never be started again.'],
    ['t.start() again', ['TERMINATED'], null, '❌ IllegalThreadStateException: a thread can be started only once.']
  ];
  const STATES = [['NEW', 'created'], ['RUNNABLE', 'ready'], ['RUNNING', 'executing run()'], ['WAITING', 'waiting / timed waiting'], ['BLOCKED', 'waiting for lock'], ['TERMINATED', 'dead']];
  const act = a => {
    if (a[2]) { setLog(l => [...l.slice(-5), `${st === 'NONE' ? '' : st + ' → '}${a[2]}   via ${a[0]}`]); setSt(a[2]); }
    else setLog(l => [...l.slice(-5), a[3]]);
    setWhy(a[3]);
  };
  return (
    <div className="wg">
      <p className="wg-title">Drive a thread through its life. Only valid moves are enabled</p>
      <div className="state-map">{STATES.map(([s, d]) => <div key={s} className={'state ' + (st === s ? 'on' : '')}>{s}<small>{d}</small></div>)}</div>
      <div className="wg-row" style={{ gap: 8 }}>{ACTIONS.map(a => <button key={a[0]} className="btn sm" disabled={!a[1].includes(st)} onClick={() => act(a)}><span className="mono" style={{ fontSize: 12.5 }}>{a[0]}</span></button>)}</div>
      <p className={'wg-note ' + (why.startsWith('❌') ? 'bad' : '')}>{why || 'Start with new Thread().'}</p>
      {log.length > 0 && <div className="console" style={{ marginTop: 10 }}>{log.join('\n')}</div>}
    </div>
  );
}

/* ---------- Synchronization: ticket booking race ---------- */
export function SyncDemo() {
  const [sync, setSync] = useState(false);
  const [steps, setSteps] = useState([]);
  const t = useRef([]);
  useEffect(() => () => t.current.forEach(clearTimeout), []);
  const run = () => {
    t.current.forEach(clearTimeout); t.current = []; setSteps([]);
    const S = sync ? [
      ['info', 'Asha (VIP thread)', '🔒 acquires lock on TicketCounter'],
      ['warn', 'Ravi thread', 'tries to enter book() → BLOCKED, waits for lock'],
      ['info', 'Asha (VIP thread)', 'checks: seats = 1 ✓'],
      ['ok', 'Asha (VIP thread)', 'books seat → seats = 0'],
      ['info', 'Asha (VIP thread)', '🔓 releases lock'],
      ['info', 'Ravi thread', '🔒 acquires lock, checks: seats = 0'],
      ['ok', 'Ravi thread', '"Sorry, sold out." No double booking ✓']
    ] : [
      ['info', 'Asha thread', 'checks: seats = 1 ✓'],
      ['info', 'Ravi thread', 'checks: seats = 1 ✓   (at the same time!)'],
      ['ok', 'Asha thread', 'books seat → seats = 0'],
      ['bad', 'Ravi thread', 'books seat → seats = -1'],
      ['bad', 'Result', '💥 DOUBLE BOOKING: 2 tickets for 1 seat. Race condition.']
    ];
    S.forEach((s, i) => t.current.push(setTimeout(() => setSteps(x => [...x, s]), 650 * (i + 1))));
  };
  return (
    <div className="wg">
      <p className="wg-title">1 seat left. Two threads call book() at the same time</p>
      <div className="wg-row">
        <label className="toggle"><input type="checkbox" checked={sync} onChange={e => { setSync(e.target.checked); setSteps([]); }} /><span className="mono">synchronized</span> void book()</label>
        <button className="btn primary" onClick={run}>Run both threads ▶</button>
      </div>
      <div className="log">{steps.map((s, i) => <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className={s[0]}><b>{s[1]}:</b> {s[2]}</motion.div>)}</div>
      <p className="wg-note">{sync ? <><b>synchronized</b> lets only one thread inside <code>book()</code> at a time (it holds the object's <b>lock/monitor</b>). The other thread is <b>BLOCKED</b> until the lock is free.</> : <>Without synchronization both threads read the shared variable before either updates it. Turn <b>synchronized</b> on and run again.</>}</p>
    </div>
  );
}

/* ---------- Lambda: shrink an anonymous class ---------- */
export function LambdaShrink() {
  const STAGES = [
    ['Anonymous class (before Java 8)', 'Comparator<Student> byMarks = new Comparator<Student>() {\n    @Override\n    public int compare(Student a, Student b) {\n        return a.marks - b.marks;\n    }\n};'],
    ['Remove the boilerplate: keep only parameters → body', 'Comparator<Student> byMarks = (Student a, Student b) -> {\n    return a.marks - b.marks;\n};'],
    ['Types are inferred, so drop them', 'Comparator<Student> byMarks = (a, b) -> {\n    return a.marks - b.marks;\n};'],
    ['One expression → no braces, no return', 'Comparator<Student> byMarks = (a, b) -> a.marks - b.marks;'],
    ['Or use a method reference', 'Comparator<Student> byMarks = Comparator.comparingInt(Student::getMarks);']
  ];
  const [i, setI] = useState(0);
  return (
    <div className="wg">
      <p className="wg-title">Watch 6 lines become 1. Same behaviour</p>
      <input type="range" min="0" max={STAGES.length - 1} value={i} onChange={e => setI(+e.target.value)} style={{ width: '100%', padding: 0, accentColor: 'var(--accent)' }} aria-label="stage" />
      <p style={{ fontWeight: 600, margin: '10px 0' }}>Step {i + 1}: {STAGES[i][0]}</p>
      <AnimatePresence mode="wait"><motion.pre key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="console" style={{ margin: 0 }}>{STAGES[i][1]}</motion.pre></AnimatePresence>
      <p className="wg-note">This works only because <code>Comparator</code> is a <b>functional interface</b>: exactly one abstract method (<code>compare</code>), so Java knows which method the lambda implements.</p>
    </div>
  );
}

/* ---------- Stream pipeline ---------- */
export function StreamPipeline() {
  const SRC = [45, 80, 92, 70, 88, 12, 63];
  const F = { 'x > 60': x => x > 60, 'x % 2 == 0': x => x % 2 === 0, 'x > 85': x => x > 85 };
  const M = { 'x * 2': x => x * 2, 'x + 5': x => x + 5, 'x / 10': x => Math.floor(x / 10) };
  const [f, setF] = useState('x > 60'); const [m, setM] = useState('x * 2'); const [srt, setSrt] = useState('asc'); const [term, setTerm] = useState('reduce');
  const [stage, setStage] = useState(0);
  const t = useRef(); useEffect(() => () => clearInterval(t.current), []);
  const s1 = SRC.filter(F[f]); const s2 = s1.map(M[m]); const s3 = [...s2].sort((a, b) => srt === 'asc' ? a - b : b - a);
  const res = term === 'reduce' ? s3.reduce((a, b) => a + b, 0) : term === 'count' ? s3.length : '[' + s3.join(', ') + ']';
  const run = () => { clearInterval(t.current); setStage(0); let k = 0; t.current = setInterval(() => { k++; setStage(k); if (k >= 4) clearInterval(t.current); }, 750); };
  const rows = [['source', 'list.stream()', SRC], ['filter', `.filter(x -> ${f})`, s1], ['map', `.map(x -> ${m})`, s2], ['sorted', srt === 'asc' ? '.sorted()' : '.sorted(Comparator.reverseOrder())', s3]];
  const Sel = ({ v, set, opts }) => <select value={v} onChange={e => { set(e.target.value); setStage(0); }}>{opts.map(o => <option key={o}>{o}</option>)}</select>;
  return (
    <div className="wg">
      <p className="wg-title">Build a pipeline, then run it</p>
      <div className="wg-row" style={{ gap: 8, marginBottom: 14, fontSize: 14 }}>
        filter <Sel v={f} set={setF} opts={Object.keys(F)} /> map <Sel v={m} set={setM} opts={Object.keys(M)} /> sort <Sel v={srt} set={setSrt} opts={['asc', 'desc']} /> end with <Sel v={term} set={setTerm} opts={['reduce', 'count', 'collect']} />
        <button className="btn primary" onClick={run}>Run ▶</button>
      </div>
      <div style={{ display: 'grid', gap: 8 }}>
        {rows.map(([k, code, arr], i) => (
          <div key={k} className={'box ' + (stage >= i ? (stage === i ? 'on' : '') : 'dim')}>
            <small className="mono">{code}</small>
            <div className="wg-row" style={{ gap: 6, marginTop: 6, minHeight: 36 }}><AnimatePresence>{stage >= i && arr.map((x, j) => <Chip key={k + x + j} v={x} />)}</AnimatePresence></div>
          </div>
        ))}
        <div className={'box ' + (stage >= 4 ? 'good' : 'dim')}><small className="mono">{term === 'reduce' ? '.reduce(0, (a, b) -> a + b)' : term === 'count' ? '.count()' : '.collect(Collectors.toList())'}  ← terminal operation</small><div className="money" style={{ marginTop: 4 }}>{stage >= 4 ? res : '…'}</div></div>
      </div>
      <p className="wg-note"><b>filter, map, sorted</b> are <i>intermediate</i> (lazy, return a new Stream). Nothing actually runs until the <b>terminal</b> operation (reduce / count / collect). The original list is <b>never modified</b>.</p>
    </div>
  );
}

/* ---------- JDBC: Statement vs PreparedStatement ---------- */
export function SqlInjection() {
  const [name, setName] = useState("asha");
  const attack = name.includes("'");
  return (
    <div className="wg">
      <p className="wg-title">Type a username for a login query. Then try the attack</p>
      <div className="wg-row" style={{ marginBottom: 14 }}>
        <input value={name} onChange={e => setName(e.target.value)} style={{ width: 220 }} className="mono" aria-label="username" />
        <button className="btn sm" onClick={() => setName("' OR '1'='1")}>Try: ' OR '1'='1</button>
        <button className="btn sm" onClick={() => setName('asha')}>reset</button>
      </div>
      <div className="split">
        <div className={'box ' + (attack ? 'bad' : '')}><b>Statement</b><small>query built by string joining</small>
          <div className="console" style={{ marginTop: 8, fontSize: 12.5 }}>{"SELECT * FROM users\nWHERE name = '"}<span style={{ color: attack ? 'var(--bad)' : 'var(--ok)' }}>{name}</span>{"'"}</div>
          <small style={{ marginTop: 8, color: 'var(--text)' }}>{attack ? "💥 '1'='1' is always true → returns ALL users. SQL injection!" : 'Works, but the input becomes part of the SQL itself.'}</small></div>
        <div className="box good"><b>PreparedStatement</b><small>precompiled with a ? placeholder</small>
          <div className="console" style={{ marginTop: 8, fontSize: 12.5 }}>{'SELECT * FROM users\nWHERE name = ?\n'}<span className="dim">{'ps.setString(1, '}</span><span className="okc">"{name}"</span><span className="dim">)</span></div>
          <small style={{ marginTop: 8, color: 'var(--text)' }}>✓ Input is treated as plain <b>data</b>, never as SQL. {attack ? 'Finds no user with that weird name.' : ''}</small></div>
      </div>
    </div>
  );
}

/* ---------- Byte stream vs character stream ---------- */
export function ByteVsChar() {
  const [s, setS] = useState('Hi ₹5');
  const bytes = [...new TextEncoder().encode(s)];
  return (
    <div className="wg">
      <p className="wg-title">Type anything (try ₹ or an emoji)</p>
      <input value={s} onChange={e => setS(e.target.value)} style={{ width: '100%', marginBottom: 14 }} aria-label="text" />
      <div className="split">
        <div className="box"><b>Character stream</b><small>Reader / Writer · reads characters · {[...s].length} chars</small><div className="wg-row" style={{ gap: 5, marginTop: 8 }}>{[...s].map((c, i) => <span key={i} className="chipv">{c === ' ' ? '␣' : c}</span>)}</div></div>
        <div className="box"><b>Byte stream</b><small>InputStream / OutputStream · raw 8-bit bytes · {bytes.length} bytes</small><div className="wg-row" style={{ gap: 4, marginTop: 8 }}>{bytes.map((b, i) => <span key={i} className="chipv" style={{ minWidth: 34, fontSize: 12 }}>{b.toString(16).toUpperCase().padStart(2, '0')}</span>)}</div></div>
      </div>
      <p className="wg-note">"₹" is <b>1 character</b> but <b>3 bytes</b>. Character streams decode bytes into Unicode characters for you, which is why they're used for <b>text</b>. Byte streams are for <b>binary</b> data: images, audio, serialized objects.</p>
    </div>
  );
}

/* ---------- Serialization: file-based employee manager ---------- */
export function SerializationDemo() {
  const [file, setFile] = useState([{ id: 1, name: 'Asha', designation: 'Developer', salary: 60000, password: 'secret' }]);
  const [f, setF] = useState({ id: 2, name: 'Ravi', designation: 'Tester', salary: 45000, password: 'ravi@123' });
  const [log, setLog] = useState([]);
  const [shown, setShown] = useState(null);
  const say = (c, m) => setLog(l => [...l.slice(-4), [c, m]]);
  const hex = [...new TextEncoder().encode(JSON.stringify(file.map(({ password, ...e }) => e)))].slice(0, 48).map(b => b.toString(16).padStart(2, '0').toUpperCase()).join(' ');
  return (
    <div className="wg">
      <p className="wg-title">Employee Manager. The "file" is employees.dat</p>
      <div className="wg-row" style={{ gap: 6 }}>
        {['id', 'name', 'designation', 'salary'].map(k => <input key={k} value={f[k]} onChange={e => setF({ ...f, [k]: k === 'id' || k === 'salary' ? +e.target.value || 0 : e.target.value })} style={{ width: k === 'designation' ? 120 : 90 }} aria-label={k} placeholder={k} />)}
        <input value={f.password} onChange={e => setF({ ...f, password: e.target.value })} style={{ width: 100 }} aria-label="password (transient)" placeholder="password" />
      </div>
      <div className="wg-row" style={{ marginTop: 10 }}>
        <button className="btn primary" onClick={() => { if (file.some(e => e.id === f.id)) return say('bad', 'ID already exists'); setFile([...file, f]); say('ok', `1. Add → list.add(emp) → oos.writeObject(list)  (SERIALIZED to employees.dat)`); setF({ ...f, id: f.id + 1 }); }}>1 · Add</button>
        <button className="btn" onClick={() => { setShown(file.map(e => ({ ...e, password: null }))); say('info', '2. View → ois.readObject() → (List<Employee>)  (DESERIALIZED)'); }}>2 · View all</button>
        <button className="btn" onClick={() => { const id = file[file.length - 1]?.id; if (id == null) return; setFile(file.slice(0, -1)); setShown(null); say('warn', `3. Delete → list.removeIf(e -> e.id == ${id}) → writeObject(list) again`); }}>3 · Delete last</button>
      </div>
      <div className="box" style={{ marginTop: 12 }}><b className="mono" style={{ fontSize: 13 }}>📄 employees.dat ({file.length} objects)</b><small className="mono" style={{ wordBreak: 'break-all', marginTop: 6 }}>AC ED 00 05 {hex} …</small></div>
      {shown && <table className="tblmini" style={{ marginTop: 10 }}><thead><tr><th>id</th><th>name</th><th>designation</th><th>salary</th><th>password</th></tr></thead><tbody>{shown.map(e => <tr key={e.id}><td>{e.id}</td><td>{e.name}</td><td>{e.designation}</td><td>{e.salary}</td><td style={{ color: 'var(--bad)' }}>null</td></tr>)}</tbody></table>}
      {log.length > 0 && <div className="log">{log.map((x, i) => <div key={i} className={x[0]}>{x[1]}</div>)}</div>}
      <p className="wg-note">The object becomes a <b>byte stream</b> (starting with the magic number <code>AC ED</code>) on <code>writeObject()</code> and is rebuilt on <code>readObject()</code>. <b>password is transient</b>, so it is never written and comes back as <b>null</b>.</p>
    </div>
  );
}
