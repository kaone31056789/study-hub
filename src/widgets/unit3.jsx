import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

/* ---------- IoC / DI ---------- */
export function IocDemo() {
  const [mode, setMode] = useState('ioc');
  const [engine, setEngine] = useState('PetrolEngine');
  const [inj, setInj] = useState('constructor');
  const [out, setOut] = useState('');
  const START = { PetrolEngine: 'Petrol engine: vroom', DieselEngine: 'Diesel engine: rumble', ElectricEngine: 'Electric motor: hmmm (silent)' };
  const CODE = {
    constructor: 'private final Engine engine;\n\n@Autowired\nCar(Engine engine) {          // injected when Car is created\n    this.engine = engine;\n}',
    setter: 'private Engine engine;\n\n@Autowired\nvoid setEngine(Engine engine) {   // injected after creation\n    this.engine = engine;\n}',
    field: '@Autowired\nprivate Engine engine;         // injected straight into the field'
  };
  return (
    <div className="wg">
      <div className="seg" style={{ marginBottom: 14 }}>
        <button className={mode === 'no' ? 'on' : ''} onClick={() => { setMode('no'); setOut(''); }}>Without IoC</button>
        <button className={mode === 'ioc' ? 'on' : ''} onClick={() => { setMode('ioc'); setOut(''); }}>With IoC (Spring)</button>
      </div>
      {mode === 'no' ? <>
        <div className="console">{'class Car {\n    Engine engine = '}<span style={{ color: 'var(--bad)' }}>new PetrolEngine();</span>{'   // Car creates its own dependency\n}'}</div>
        <div className="wg-row" style={{ marginTop: 12 }}><button className="btn" onClick={() => setOut('bad')}>I want an ElectricEngine now</button></div>
        {out && <p className="wg-note bad">You must <b>open Car.java, edit it and recompile</b>. Car is <b>tightly coupled</b> to PetrolEngine, and it's hard to test with a fake engine too.</p>}
      </> : <>
        <div className="split">
          <div className="box on"><b>Spring IoC Container</b><small>ApplicationContext · creates & manages beans</small>
            <div style={{ marginTop: 10, display: 'grid', gap: 6 }}>
              {Object.keys(START).map(k => <label key={k} className="toggle"><input type="radio" name="eng" checked={engine === k} onChange={() => { setEngine(k); setOut(''); }} /><span className="mono" style={{ fontSize: 13 }}>@Component {k}</span></label>)}
            </div>
          </div>
          <div className="box"><b>Car</b><small>never says new. Just asks for an Engine</small>
            <div className="seg" style={{ marginTop: 8 }}>{Object.keys(CODE).map(k => <button key={k} className={inj === k ? 'on' : ''} onClick={() => setInj(k)}>{k}</button>)}</div>
            <pre className="console" style={{ marginTop: 8, fontSize: 12 }}>{CODE[inj]}</pre>
          </div>
        </div>
        <div className="wg-row" style={{ marginTop: 12 }}><button className="btn primary" onClick={() => setOut('ok')}>ctx.getBean(Car.class).drive()</button></div>
        {out && <motion.p key={engine + inj} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="wg-note ok">Container created <b>{engine}</b> and injected it into Car by <b>{inj} injection</b> → "{START[engine]}". <b>Car's code did not change.</b> That's loose coupling.</motion.p>}
      </>}
    </div>
  );
}

/* ---------- JPA relationships ---------- */
export function JpaRelations() {
  const R = {
    '@OneToOne': {
      t: [['person', [['id', 'pk'], ['name'], ['passport_id', 'fk']], [[1, 'Asha', 101], [2, 'Ravi', 102]]], ['passport', [['id', 'pk'], ['number']], [[101, 'P-88321'], [102, 'P-55102']]]],
      note: 'One person has exactly one passport. The FK passport_id lives in person (@JoinColumn).',
      code: '@OneToOne\n@JoinColumn(name = "passport_id")\nprivate Passport passport;'
    },
    '@OneToMany / @ManyToOne': {
      t: [['department', [['id', 'pk'], ['name']], [[1, 'CSE'], [2, 'IT']]], ['employee', [['id', 'pk'], ['name'], ['dept_id', 'fk']], [[11, 'Asha', 1], [12, 'Ravi', 1], [13, 'Neha', 2]]]],
      note: 'One department → many employees. The FK dept_id sits on the MANY side (employee). Department uses mappedBy.',
      code: '// Department\n@OneToMany(mappedBy = "department")\nprivate List<Employee> employees;\n\n// Employee  (owning side)\n@ManyToOne\n@JoinColumn(name = "dept_id")\nprivate Department department;'
    },
    '@ManyToMany': {
      t: [['student', [['id', 'pk'], ['name']], [[1, 'Asha'], [2, 'Ravi']]], ['student_course', [['student_id', 'fk'], ['course_id', 'fk']], [[1, 10], [1, 20], [2, 10]]], ['course', [['id', 'pk'], ['title']], [[10, 'Java'], [20, 'DBMS']]]],
      note: 'Many students ↔ many courses. Needs a third JOIN TABLE holding two foreign keys (@JoinTable).',
      code: '@ManyToMany\n@JoinTable(name = "student_course",\n   joinColumns = @JoinColumn(name = "student_id"),\n   inverseJoinColumns = @JoinColumn(name = "course_id"))\nprivate Set<Course> courses;'
    }
  };
  const [k, setK] = useState('@OneToMany / @ManyToOne');
  const r = R[k];
  return (
    <div className="wg">
      <p className="wg-title">Pick a relationship and see the tables Hibernate creates</p>
      <div className="seg" style={{ marginBottom: 14 }}>{Object.keys(R).map(x => <button key={x} className={k === x ? 'on' : ''} onClick={() => setK(x)}>{x}</button>)}</div>
      <AnimatePresence mode="wait">
        <motion.div key={k} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="wg-grid">
          {r.t.map(([name, cols, rows]) => (
            <div key={name}><b className="mono" style={{ fontSize: 13 }}>{name}</b>
              <table className="tblmini" style={{ marginTop: 6 }}><thead><tr>{cols.map(([c, f]) => <th key={c} className={f || ''}>{c}{f === 'pk' ? ' 🔑' : f === 'fk' ? ' →' : ''}</th>)}</tr></thead>
                <tbody>{rows.map((row, i) => <tr key={i}>{row.map((v, j) => <td key={j} className={cols[j][1] || ''}>{v}</td>)}</tr>)}</tbody></table>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
      <pre className="console" style={{ marginTop: 12, fontSize: 12.5 }}>{r.code}</pre>
      <p className="wg-note"><span style={{ color: 'var(--warn)' }}>🔑 primary key</span> · <span style={{ color: 'var(--accent)' }}>→ foreign key</span>. {r.note}</p>
    </div>
  );
}

/* ---------- REST simulator (mini Postman) ---------- */
export function RestSimulator() {
  const seed = [{ id: 1, name: 'Asha', course: 'CSE' }, { id: 2, name: 'Ravi', course: 'IT' }];
  const [db, setDb] = useState(seed);
  const [method, setMethod] = useState('GET');
  const [path, setPath] = useState('/students');
  const [body, setBody] = useState('{"id": 3, "name": "Neha", "course": "ECE"}');
  const [res, setRes] = useState(null);
  const PRESETS = [['GET', '/students'], ['GET', '/students/1'], ['GET', '/students/9'], ['POST', '/students'], ['PUT', '/students/2'], ['DELETE', '/students/1']];
  const send = (m = method, p = path) => {
    const id = Number((p.match(/^\/students\/(\d+)$/) || [])[1]);
    const coll = p === '/students';
    let b; try { b = JSON.parse(body); } catch { b = null; }
    const R = (status, data, handler) => setRes({ status, data, handler, m, p });
    if (m === 'GET' && coll) return R(200, db, '@GetMapping  getAll()');
    if (m === 'GET' && id) { const s = db.find(x => x.id === id); return s ? R(200, s, '@GetMapping("/{id}")  getById(@PathVariable id)') : R(404, { error: 'Student ' + id + ' not found' }, '@GetMapping("/{id}")  getById(@PathVariable id)'); }
    if (m === 'POST' && coll) { if (!b) return R(400, { error: 'Invalid JSON body' }, '@PostMapping  create(@RequestBody s)'); setDb(d => [...d.filter(x => x.id !== b.id), b]); return R(201, b, '@PostMapping  create(@RequestBody Student s)'); }
    if (m === 'PUT' && id) { const s = db.find(x => x.id === id); if (!s) return R(404, { error: 'Student ' + id + ' not found' }, '@PutMapping("/{id}")'); if (!b) return R(400, { error: 'Invalid JSON body' }, '@PutMapping("/{id}")'); const u = { ...s, ...b, id }; setDb(d => d.map(x => x.id === id ? u : x)); return R(200, u, '@PutMapping("/{id}")  update(@PathVariable id, @RequestBody s)'); }
    if (m === 'DELETE' && id) { const ex = db.some(x => x.id === id); setDb(d => d.filter(x => x.id !== id)); return ex ? R(204, null, '@DeleteMapping("/{id}")  delete(@PathVariable id)') : R(404, { error: 'Student ' + id + ' not found' }, '@DeleteMapping("/{id}")'); }
    return R(405, { error: 'Method not allowed on this URL' }, 'no matching mapping');
  };
  const TXT = { 200: 'OK', 201: 'Created', 204: 'No Content', 400: 'Bad Request', 404: 'Not Found', 405: 'Method Not Allowed' };
  return (
    <div className="wg">
      <p className="wg-title">Send requests to a StudentController running in memory</p>
      <div className="wg-row" style={{ gap: 6, marginBottom: 10 }}>{PRESETS.map(([m, p]) => <button key={m + p} className="btn sm" onClick={() => { setMethod(m); setPath(p); send(m, p); }}><span className="mono" style={{ fontSize: 12 }}>{m} {p}</span></button>)}</div>
      <div className="wg-row" style={{ gap: 6 }}>
        <select value={method} onChange={e => setMethod(e.target.value)} className="mono">{['GET', 'POST', 'PUT', 'DELETE'].map(m => <option key={m}>{m}</option>)}</select>
        <input value={path} onChange={e => setPath(e.target.value)} className="mono" style={{ flex: 1, minWidth: 160 }} aria-label="URL path" />
        <button className="btn primary" onClick={() => send()}>Send</button>
        <button className="btn sm" onClick={() => { setDb(seed); setRes(null); }}>reset data</button>
      </div>
      {(method === 'POST' || method === 'PUT') && <textarea value={body} onChange={e => setBody(e.target.value)} rows={2} className="mono" style={{ width: '100%', marginTop: 8, fontSize: 13 }} aria-label="JSON body (@RequestBody)" />}
      {res && (
        <div style={{ marginTop: 12 }}>
          <div className="wg-row" style={{ gap: 8 }}><span className={'status s' + String(res.status)[0]}>{res.status} {TXT[res.status]}</span><span className="mono muted" style={{ fontSize: 12.5 }}>handled by {res.handler}</span></div>
          <pre className="console" style={{ marginTop: 8 }}>{res.data === null ? '(empty body)' : JSON.stringify(res.data, null, 2)}</pre>
        </div>
      )}
      <p className="wg-note">Jackson converts the Java object ⇄ <b>JSON</b> automatically. <code>@PathVariable</code> reads <code>{'{id}'}</code> from the URL; <code>@RequestBody</code> reads the JSON body. Status codes come from <code>ResponseEntity</code>.</p>
    </div>
  );
}

/* ---------- Design patterns ---------- */
export function PatternsDemo() {
  const [tab, setTab] = useState('Singleton');
  const [calls, setCalls] = useState([]);
  const [newErr, setNewErr] = useState(false);
  const [shape, setShape] = useState(null);
  const [subs, setSubs] = useState({ Inventory: true, Email: true, SMS: false });
  const [notes, setNotes] = useState([]);
  const [veh, setVeh] = useState('car');
  const RATE = { car: 0.05, bike: 0.02, truck: 0.08 };
  const SH = { circle: '●', square: '■', triangle: '▲' };
  return (
    <div className="wg">
      <div className="seg" style={{ marginBottom: 14 }}>{['Singleton', 'Factory', 'Observer', 'Strategy'].map(k => <button key={k} className={tab === k ? 'on' : ''} onClick={() => setTab(k)}>{k}</button>)}</div>
      {tab === 'Singleton' && <>
        <p style={{ marginTop: 0 }}><span className="pill u">Creational</span> Only <b>one object</b> of the class can ever exist.</p>
        <div className="wg-row"><button className="btn primary" onClick={() => setCalls(c => [...c, 'DBConnection@1b6d3586'])}>DBConnection.getInstance()</button><button className="btn" onClick={() => setNewErr(true)}>new DBConnection()</button></div>
        {newErr && <p className="wg-note bad">Compile error: <code>DBConnection()</code> has <b>private</b> access. Nobody outside can create a second object.</p>}
        {calls.length > 0 && <div className="console" style={{ marginTop: 10 }}>{calls.map((c, i) => `call ${i + 1} → ${c}${i === 0 ? '   (created now)' : '   (same object returned)'}`).join('\n')}</div>}
        {calls.length > 1 && <p className="wg-note ok">Every call returns the <b>same</b> object. <code>a == b</code> is <b>true</b>.</p>}
      </>}
      {tab === 'Factory' && <>
        <p style={{ marginTop: 0 }}><span className="pill u">Creational</span> The client asks the factory for an object by name and never calls <code>new</code> itself.</p>
        <div className="wg-row">{Object.keys(SH).map(k => <button key={k} className="btn" onClick={() => setShape(k)}>ShapeFactory.getShape("{k}")</button>)}</div>
        <AnimatePresence mode="wait">{shape && <motion.div key={shape} initial={{ scale: .6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="box on" style={{ marginTop: 12, display: 'flex', gap: 14, alignItems: 'center' }}><span style={{ fontSize: 40, color: 'var(--accent)' }}>{SH[shape]}</span><span className="mono">returns new {shape[0].toUpperCase() + shape.slice(1)}()  →  shape.draw()</span></motion.div>}</AnimatePresence>
      </>}
      {tab === 'Observer' && <>
        <p style={{ marginTop: 0 }}><span className="pill u">Behavioral</span> When the subject changes, <b>every subscribed observer</b> is notified automatically.</p>
        <div className="wg-row">{Object.keys(subs).map(k => <label key={k} className="toggle"><input type="checkbox" checked={subs[k]} onChange={e => setSubs({ ...subs, [k]: e.target.checked })} />{k}Service subscribed</label>)}</div>
        <div className="wg-row" style={{ marginTop: 10 }}><button className="btn primary" onClick={() => setNotes(['ProductService: saved "Laptop"', ...Object.keys(subs).filter(k => subs[k]).map(k => `  → ${k}Service.onProductAdded("Laptop")`)])}>productService.addProduct("Laptop")</button></div>
        {notes.length > 0 && <div className="console" style={{ marginTop: 10 }}>{notes.join('\n')}</div>}
      </>}
      {tab === 'Strategy' && <>
        <p style={{ marginTop: 0 }}><span className="pill u">Behavioral</span> Swap the <b>algorithm at runtime</b>. Each insurance type is a separate strategy class.</p>
        <div className="seg">{Object.keys(RATE).map(k => <button key={k} className={veh === k ? 'on' : ''} onClick={() => setVeh(k)}>{k}</button>)}</div>
        <div className="console" style={{ marginTop: 10 }}>{`strategy = strategies.get("${veh}");   // ${veh[0].toUpperCase() + veh.slice(1)}Insurance bean\npremium  = strategy.premium(100000);\n`}<span className="okc">{`→ ₹${100000 * RATE[veh]}   (${RATE[veh] * 100}% rate)`}</span></div>
      </>}
    </div>
  );
}

/* ---------- Servlet lifecycle ---------- */
export function ServletLifecycle() {
  const [n, setN] = useState({ init: 0, service: 0, destroy: 0 });
  const [loaded, setLoaded] = useState(false);
  const [name, setName] = useState('Asha');
  const [log, setLog] = useState([]);
  const [page, setPage] = useState(null);
  const add = (...l) => setLog(x => [...x, ...l].slice(-7));
  const request = () => {
    if (!loaded) { setLoaded(true); setN(c => ({ ...c, init: c.init + 1, service: c.service + 1 })); add(['info', 'Container loads WelcomeServlet class & creates ONE object'], ['ok', 'init() called (first request only)']); }
    else setN(c => ({ ...c, service: c.service + 1 }));
    add(['warn', `service() → doPost()   request.getParameter("studentName") = "${name}"`]);
    setPage(name);
  };
  const stop = () => { if (!loaded) return; setLoaded(false); setN(c => ({ ...c, destroy: c.destroy + 1 })); add(['bad', 'destroy() called: server shutting down, servlet removed']); setPage(null); };
  return (
    <div className="wg">
      <p className="wg-title">Submit the form a few times, then shut the server down</p>
      <div className="split">
        <div className="box"><b>Browser · index.html</b><small>&lt;form action="welcome" method="post"&gt;</small>
          <div className="wg-row" style={{ marginTop: 10 }}><input value={name} onChange={e => setName(e.target.value)} style={{ width: 130 }} aria-label="studentName" /><button className="btn primary" onClick={request}>Submit</button></div>
          {page && <div className="box good" style={{ marginTop: 10 }}><b>Welcome, {page}!</b><small>HTML written by response.getWriter()</small></div>}
        </div>
        <div className="box"><b>Tomcat · WelcomeServlet</b><small>{loaded ? 'loaded & alive' : 'not loaded'}</small>
          <div className="wg-grid" style={{ marginTop: 10, gridTemplateColumns: 'repeat(3,1fr)' }}>{Object.entries(n).map(([k, v]) => <div key={k} className="cell" style={{ padding: 8 }}><b>{v}</b>{k}()</div>)}</div>
          <button className="btn sm" style={{ marginTop: 10 }} onClick={stop} disabled={!loaded}>Shut down server</button>
        </div>
      </div>
      {log.length > 0 && <div className="log">{log.map((x, i) => <div key={i} className={x[0]}>{x[1]}</div>)}</div>}
      <p className="wg-note"><b>init()</b> and <b>destroy()</b> run once. <b>service()</b> runs for <b>every request</b> on the same object. <code>HttpServletRequest</code> = input (form data), <code>HttpServletResponse</code> = output (HTML).</p>
    </div>
  );
}

/* ---------- Layered architecture request flow ---------- */
export function LayeredFlow() {
  const L = [
    ['Client', 'Postman / browser', 'GET /api/products/1'],
    ['Controller', '@RestController', 'productController.one(1): reads @PathVariable, calls service'],
    ['Service', '@Service', 'productService.getById(1): business rules, @Transactional'],
    ['Repository', '@Repository / JpaRepository', 'repo.findById(1): Spring Data generates this method'],
    ['Hibernate', 'JPA provider (ORM)', 'select p.id, p.name, p.price from products p where p.id=?'],
    ['Database', 'MySQL', 'row (1, "Laptop", 60000)']
  ];
  const [k, setK] = useState(-1);
  const [back, setBack] = useState(false);
  const t = useRef(); useEffect(() => () => clearInterval(t.current), []);
  const run = () => {
    clearInterval(t.current); setBack(false); setK(0); let i = 0, dir = 1;
    t.current = setInterval(() => { i += dir; if (i === L.length - 1) { dir = -1; setBack(true); } if (i < 0) { clearInterval(t.current); setK(-2); return; } setK(i); }, 600);
  };
  return (
    <div className="wg">
      <p className="wg-title">Follow one request down the layers and back</p>
      <button className="btn primary" onClick={run}>Send GET /api/products/1 ▶</button>
      <div style={{ marginTop: 14 }}>
        {L.map(([n, a, d], i) => (
          <div key={n}>
            <div className={'layer ' + (k === i ? 'on' : '')} onClick={() => setK(i)}><b>{n}</b><div><div style={{ fontSize: 13.5, fontWeight: 600 }}>{a}</div><div className="mono">{d}</div></div></div>
            {i < L.length - 1 && <div className="vline" />}
          </div>
        ))}
      </div>
      <p className={'wg-note ' + (k === -2 ? 'ok' : '')}>{k === -2 ? <>Response: <code>{'{"id":1,"name":"Laptop","price":60000}'}</code> (Entity → JSON by Jackson). Each layer only talks to the one below it. That's <b>separation of concerns</b>.</> : back ? 'Data now travels back up: Entity object → Service → Controller → JSON.' : 'Spring injects Repository → Service → Controller (DI). Hibernate turns method calls into SQL.'}</p>
    </div>
  );
}

/* ---------- JSP: components + attendance portal ---------- */
export function JspDemo() {
  const [tab, setTab] = useState('portal');
  const [rows, setRows] = useState([{ roll: 101, name: 'Asha', date: '2026-11-24', status: 'Present' }]);
  const [f, setF] = useState({ roll: 102, name: 'Ravi', date: '2026-11-24', status: 'Absent' });
  const [msg, setMsg] = useState(null);
  const PARTS = [
    ['<%@ page import="java.util.*" %>', 'Directive', 'Instruction to the container at translation time. page / include / taglib.'],
    ['<%@ include file="header.jsp" %>', 'Include directive', 'Pastes header.jsp in at translation time. Write once, reuse on every page.'],
    ['<%! int visits = 0; %>', 'Declaration', 'Declares a variable/method at class level of the generated servlet.'],
    ['<% visits++; %>', 'Scriptlet', 'Plain Java statements that go inside _jspService(). Mixing logic with HTML hurts reusability.'],
    ['<p>Visits: <%= visits %></p>', 'Expression', 'Evaluates and prints a value into the page. No semicolon.'],
    ['<jsp:include page="footer.jsp" />', 'Include action', 'Includes another page at request time (dynamic). Reusable components.'],
    ['<h3>${msg}  ${param.name}</h3>', 'Expression Language (EL)', 'Reads data (request/session attributes, form params) without any Java code. Cleaner and more reusable than scriptlets.']
  ];
  const [p, setP] = useState(0);
  return (
    <div className="wg">
      <div className="seg" style={{ marginBottom: 14 }}><button className={tab === 'portal' ? 'on' : ''} onClick={() => setTab('portal')}>Attendance portal</button><button className={tab === 'parts' ? 'on' : ''} onClick={() => setTab('parts')}>JSP components</button></div>
      {tab === 'portal' ? <>
        <div className="box"><b>attendance.jsp</b><small>HTML form → POST → AttendanceServlet</small>
          <div className="wg-row" style={{ gap: 6, marginTop: 10 }}>
            <input type="number" value={f.roll} onChange={e => setF({ ...f, roll: +e.target.value })} style={{ width: 80 }} aria-label="roll" />
            <input value={f.name} onChange={e => setF({ ...f, name: e.target.value })} style={{ width: 110 }} aria-label="name" />
            <input type="date" value={f.date} onChange={e => setF({ ...f, date: e.target.value })} aria-label="date" />
            <select value={f.status} onChange={e => setF({ ...f, status: e.target.value })}><option>Present</option><option>Absent</option></select>
            <button className="btn primary" onClick={() => { setRows([...rows, f]); setMsg(f); setF({ ...f, roll: f.roll + 1 }); }}>Mark</button>
          </div>
        </div>
        {msg && <div className="log">
          <div className="info">Servlet: <code>req.getParameter("roll" / "name" / "date" / "status")</code></div>
          <div className="warn">JDBC: <code>INSERT INTO attendance VALUES (?, ?, ?, ?)</code> → setInt / setString / setDate → executeUpdate()</div>
          <div className="ok">forward → success.jsp shows <code>{'${msg}'}</code>: "Attendance saved for {msg.name} ({msg.status})"</div>
        </div>}
        <table className="tblmini" style={{ marginTop: 12 }}><thead><tr><th>roll_no</th><th>name</th><th>att_date</th><th>status</th></tr></thead><tbody>{rows.map((r, i) => <tr key={i}><td>{r.roll}</td><td>{r.name}</td><td>{r.date}</td><td style={{ color: r.status === 'Present' ? 'var(--ok)' : 'var(--bad)' }}>{r.status}</td></tr>)}</tbody></table>
        <p className="wg-note"><b>MVC:</b> JSP = View (form + result page), Servlet = Controller (reads request, calls JDBC), MySQL table = Model/data.</p>
      </> : <>
        <div className="codeview">{PARTS.map((x, i) => <div key={i} className={p === i ? 'cur' : ''} style={{ cursor: 'pointer' }} onClick={() => setP(i)}>{x[0]}</div>)}</div>
        <p className="wg-note"><b>{PARTS[p][1]}</b>: {PARTS[p][2]}</p>
      </>}
    </div>
  );
}

/* ---------- Bank transfer with @Transactional ---------- */
export function TransferSim() {
  const START = { A: 5000, B: 2000 };
  const [bal, setBal] = useState(START);
  const [amt, setAmt] = useState(1000);
  const [tx, setTx] = useState(true);
  const [crash, setCrash] = useState(true);
  const [log, setLog] = useState([]);
  const [json, setJson] = useState(null);
  const go = () => {
    const a = Number(amt); const L = []; setJson(null);
    if (tx) L.push(['info', 'BEGIN TRANSACTION (@Transactional proxy)']);
    if (a > bal.A) {
      L.push(['bad', `balance ${bal.A} < ${a} → throw InsufficientFundsException`]);
      if (tx) L.push(['warn', 'ROLLBACK (nothing was changed)']);
      L.push(['info', '@ControllerAdvice → @ExceptionHandler builds a JSON error']);
      setJson({ status: 400, error: 'Insufficient Funds', message: `Balance ${bal.A} is less than ${a}` });
      return setLog(L);
    }
    L.push(['ok', `debit A: ${bal.A} → ${bal.A - a}`]);
    if (crash) {
      L.push(['bad', '💥 RuntimeException: server crashed before credit!']);
      if (tx) { L.push(['warn', 'ROLLBACK → debit undone. A is back to ' + bal.A]); L.push(['ok', 'Money safe. Both or nothing (Atomicity)']); }
      else { setBal({ A: bal.A - a, B: bal.B }); L.push(['bad', `No transaction: A lost ₹${a}, B got nothing. ₹${a} vanished!`]); }
    } else {
      L.push(['ok', `credit B: ${bal.B} → ${bal.B + a}`]);
      if (tx) L.push(['ok', 'COMMIT: both changes saved together']);
      setBal({ A: bal.A - a, B: bal.B + a });
    }
    setLog(L);
  };
  const total = bal.A + bal.B;
  return (
    <div className="wg">
      <p className="wg-title">Transfer money from A to B. Break it on purpose</p>
      <div className="split">
        <div className="box"><small>Account A</small><div className="money">₹{bal.A}</div></div>
        <div className="box"><small>Account B</small><div className="money">₹{bal.B}</div></div>
      </div>
      <p style={{ margin: '8px 0', fontSize: 14 }} className={total !== 7000 ? '' : 'muted'}>Total money in bank: <b style={{ color: total !== 7000 ? 'var(--bad)' : 'var(--ok)' }}>₹{total}</b> {total !== 7000 && '(should be ₹7000!)'}</p>
      <div className="wg-row">
        <label>₹ <input type="number" value={amt} onChange={e => setAmt(e.target.value)} style={{ width: 100 }} aria-label="amount" /></label>
        <label className="toggle"><input type="checkbox" checked={tx} onChange={e => setTx(e.target.checked)} /><span className="mono">@Transactional</span></label>
        <label className="toggle"><input type="checkbox" checked={crash} onChange={e => setCrash(e.target.checked)} />crash after debit</label>
        <button className="btn primary" onClick={go}>transfer(A, B, ₹{amt})</button>
        <button className="btn sm" onClick={() => { setBal(START); setLog([]); setJson(null); }}>reset</button>
      </div>
      {log.length > 0 && <div className="log">{log.map((x, i) => <motion.div key={i + x[1]} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.12 }} className={x[0]}>{x[1]}</motion.div>)}</div>}
      {json && <><div style={{ marginTop: 10 }}><span className="status s4">400 Bad Request</span></div><pre className="console" style={{ marginTop: 6 }}>{JSON.stringify(json, null, 2)}</pre></>}
      <p className="wg-note">Try: crash ON + @Transactional OFF → money disappears. Turn @Transactional ON → <b>rollback</b>. Try ₹9000 → custom exception → clean JSON from <code>@ControllerAdvice</code>.</p>
    </div>
  );
}
