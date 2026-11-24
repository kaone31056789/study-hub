import { useEffect, useRef, useState } from 'react';

/* ---------- JVM: compile once, run anywhere ---------- */
export function JvmFlow() {
  const [compiled, setCompiled] = useState(false);
  const [ran, setRan] = useState({});
  const [box, setBox] = useState('jvm');
  const OS = ['Windows', 'Linux', 'macOS'];
  const INFO = {
    jdk: <><b>JDK = JRE + development tools.</b> javac (compiler), java (launcher), javadoc, jar, jdb (debugger). Needed to <b>write and compile</b> programs.</>,
    jre: <><b>JRE = JVM + core libraries</b> (java.lang, java.util, java.io…). Enough to <b>run</b> a program, but not to compile one.</>,
    jvm: <><b>JVM = the engine.</b> Class Loader → Memory areas (Heap, Stack, Method area…) → Execution Engine (Interpreter + JIT + Garbage Collector). It <b>executes bytecode</b>.</>
  };
  const sel = (k, e) => { e.stopPropagation(); setBox(k); };
  return (
    <>
      <div className="wg">
        <p className="wg-title">Step 1: compile. Step 2: run the same file on 3 different OS</p>
        <div className="wg-row">
          <div className="box on"><b>Hello.java</b><small>source code you write</small></div>
          <button className="btn primary" disabled={compiled} onClick={() => setCompiled(true)}>javac Hello.java →</button>
          <div className={'box ' + (compiled ? 'good' : 'dim')}><b>Hello.class</b><small className="mono">{compiled ? 'CA FE BA BE 00 41 …  (bytecode)' : 'not compiled yet'}</small></div>
        </div>
        {compiled && (
          <div className="wg-grid" style={{ marginTop: 14 }}>
            {OS.map(os => (
              <button key={os} className={'box ' + (ran[os] ? 'good' : '')} style={{ textAlign: 'left' }} onClick={() => setRan(r => ({ ...r, [os]: true }))}>
                <b>{os} JVM</b><small className="mono">{ran[os] ? '> Hello, JVM!' : '▶ click: java Hello'}</small>
              </button>
            ))}
          </div>
        )}
        {Object.keys(ran).length === 3
          ? <p className="wg-note ok">The <b>same .class file</b> ran on 3 operating systems. The bytecode never changed; only the JVM is different per OS. That is <b>platform independence (WORA)</b>.</p>
          : <p className="wg-note">{compiled ? 'Now click each JVM to run the same bytecode.' : 'Click javac to turn source code into bytecode.'}</p>}
      </div>
      <div className="wg">
        <p className="wg-title">Tap a box: JDK ⊃ JRE ⊃ JVM</p>
        <div className={'nest ' + (box === 'jdk' ? 'sel' : '')} onClick={e => sel('jdk', e)}>JDK <span className="muted" style={{ fontWeight: 400 }}>· javac, javadoc, jar, jdb</span>
          <div className={'nest ' + (box === 'jre' ? 'sel' : '')} onClick={e => sel('jre', e)}>JRE <span className="muted" style={{ fontWeight: 400 }}>· libraries</span>
            <div className={'nest ' + (box === 'jvm' ? 'sel' : '')} onClick={e => sel('jvm', e)}>JVM <span className="muted" style={{ fontWeight: 400 }}>· runs bytecode</span></div>
          </div>
        </div>
        <p className="wg-note">{INFO[box]}</p>
      </div>
    </>
  );
}

/* ---------- OOP: four pillars, each with a mini experiment ---------- */
export function OopPillars() {
  const [tab, setTab] = useState('Encapsulation');
  const [bal, setBal] = useState(1000);
  const [val, setVal] = useState('-500');
  const [msg, setMsg] = useState(null);
  const [showHidden, setShowHidden] = useState(false);
  const [animal, setAnimal] = useState('Dog');
  const [out, setOut] = useState([]);
  const SOUND = { Dog: 'Woof! (Dog.sound)', Cat: 'Meow! (Cat.sound)', Cow: 'Moo! (Cow.sound)' };
  return (
    <div className="wg">
      <div className="seg" style={{ marginBottom: 16 }}>
        {['Encapsulation', 'Abstraction', 'Inheritance', 'Polymorphism'].map(k => <button key={k} className={tab === k ? 'on' : ''} onClick={() => setTab(k)}>{k}</button>)}
      </div>
      {tab === 'Encapsulation' && <>
        <p style={{ marginTop: 0 }}><code>private double balance</code> can only be changed through a method that <b>checks</b> the value.</p>
        <div className="wg-row"><span className="money">₹{bal}</span><input value={val} onChange={e => setVal(e.target.value)} style={{ width: 110 }} aria-label="Amount" />
          <button className="btn" onClick={() => setMsg(['bad', 'Compile error: balance has private access in Account. Nobody outside can touch it directly.'])}>acc.balance = {val}</button>
          <button className="btn primary" onClick={() => { const v = Number(val); if (isNaN(v) || v < 0) setMsg(['bad', 'setBalance() rejected it: validation says balance cannot be negative. Data is protected.']); else { setBal(v); setMsg(['ok', 'setBalance() checked the value and updated it.']); } }}>acc.setBalance({val})</button>
        </div>
        {msg && <p className={'wg-note ' + msg[0]}>{msg[1]}</p>}
      </>}
      {tab === 'Abstraction' && <>
        <p style={{ marginTop: 0 }}>You only see <b>what</b> a car does: <code>start()</code>. <b>How</b> it works stays hidden.</p>
        <div className="wg-row"><button className="btn primary" onClick={() => setOut(['car.start() → Engine running 🚗'])}>car.start()</button><label className="toggle"><input type="checkbox" checked={showHidden} onChange={e => setShowHidden(e.target.checked)} />Show what's hidden</label></div>
        <div className="console" style={{ marginTop: 12 }}>{out[0] || 'click start()'}{showHidden && <span className="dim">{'\n\n// hidden inside (abstract method implemented by subclass):\n// checkFuel(); injectFuel(); igniteSpark(); rotateCrankshaft();'}</span>}</div>
      </>}
      {tab === 'Inheritance' && <>
        <p style={{ marginTop: 0 }}><code>class Dog extends Animal</code>. A Dog object gets Animal's methods for free.</p>
        <div className="wg-row">
          <button className="btn" onClick={() => setOut(o => [...o, 'dog.eat()   → eating...   (inherited from Animal)'])}>dog.eat()</button>
          <button className="btn" onClick={() => setOut(o => [...o, 'dog.sleep() → sleeping... (inherited from Animal)'])}>dog.sleep()</button>
          <button className="btn primary" onClick={() => setOut(o => [...o, 'dog.bark()  → Woof!       (Dog\'s own method)'])}>dog.bark()</button>
        </div>
        <div className="console" style={{ marginTop: 12 }}>{out.length ? out.slice(-4).join('\n') : 'call a method'}</div>
      </>}
      {tab === 'Polymorphism' && <>
        <p style={{ marginTop: 0 }}>Same line of code, different behaviour. The <b>object</b> decides at runtime.</p>
        <div className="console">Animal a = new <select value={animal} onChange={e => setAnimal(e.target.value)} style={{ padding: '2px 6px' }}>{Object.keys(SOUND).map(k => <option key={k}>{k}</option>)}</select>();{'\n'}a.sound();   <span className="okc">// → {SOUND[animal]}</span></div>
        <p className="wg-note">Reference type is always <code>Animal</code>, but the JVM runs the <b>overridden</b> method of the actual object. That's <b>runtime polymorphism</b>. Overloading (same name, different params) is <b>compile-time</b> polymorphism.</p>
      </>}
    </div>
  );
}

/* ---------- Overloading vs overriding resolver ---------- */
export function OverloadResolver() {
  const METHODS = ['int add(int a, int b)', 'int add(int a, int b, int c)', 'double add(double a, double b)', 'String add(String a, int b)'];
  const CALLS = [
    ['add(2, 3)', 0, '5', '2 arguments, both int → exact match.'],
    ['add(2, 3, 4)', 1, '9', 'Only one method takes 3 arguments.'],
    ['add(2.5, 3.5)', 2, '6.0', 'Arguments are double → the double version.'],
    ['add("Java", 21)', 3, 'Java21', 'Type and order: (String, int).']
  ];
  const [c, setC] = useState(null);
  const [obj, setObj] = useState(null);
  return (
    <>
      <div className="wg">
        <p className="wg-title">Overloading: the compiler picks by parameters (compile time)</p>
        <div className="wg-row">{CALLS.map((x, i) => <button key={i} className={'btn sm ' + (c === i ? 'primary' : '')} onClick={() => setC(i)}><span className="mono">calc.{x[0]}</span></button>)}</div>
        <div className="log">{METHODS.map((m, i) => <div key={i} className={c !== null && CALLS[c][1] === i ? 'ok' : ''} style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, opacity: c === null || CALLS[c][1] === i ? 1 : 0.4 }}>{m}{c !== null && CALLS[c][1] === i && <span style={{ color: 'var(--ok)' }}>   ← chosen, returns {CALLS[c][2]}</span>}</div>)}</div>
        {c !== null && <p className="wg-note">{CALLS[c][3]} Decided by the <b>compiler</b> from the number, type and order of arguments. This is <b>static binding</b>.</p>}
      </div>
      <div className="wg">
        <p className="wg-title">Overriding: the JVM picks by object type (runtime)</p>
        <div className="console">Animal a = new {obj || '___'}();{'\n'}a.sound();</div>
        <div className="wg-row" style={{ marginTop: 10 }}>{['Animal', 'Dog', 'Cat'].map(k => <button key={k} className={'btn sm ' + (obj === k ? 'primary' : '')} onClick={() => setObj(k)}>new {k}()</button>)}</div>
        <div className="wg-grid" style={{ marginTop: 12 }}>
          {[['Animal', 'Animal makes a sound'], ['Dog', 'Dog barks'], ['Cat', 'Cat meows']].map(([k, s]) => <div key={k} className={'box ' + (obj === k ? 'on' : 'dim')}><b>{k}.sound()</b><small>"{s}"</small></div>)}
        </div>
        {obj && <p className="wg-note">The reference is <code>Animal</code>, but the <b>{obj}</b> object's version ran. The decision is made at <b>runtime</b> (dynamic method dispatch).</p>}
      </div>
    </>
  );
}

/* ---------- Access modifiers ---------- */
export function AccessChecker() {
  const [m, setM] = useState('protected');
  const PLACES = ['Same class', 'Same package', 'Subclass (other package)', 'Other package'];
  const RULE = { private: [1, 0, 0, 0], default: [1, 1, 0, 0], protected: [1, 1, 1, 0], public: [1, 1, 1, 1] };
  const NOTE = {
    private: 'Only inside its own class. Used to hide data (encapsulation).',
    default: 'No keyword. Visible only inside the same package ("package-private").',
    protected: 'Same package, plus subclasses in other packages (through inheritance).',
    public: 'Visible everywhere.'
  };
  return (
    <div className="wg">
      <p className="wg-title">Pick a modifier and see where the member is visible</p>
      <div className="seg" style={{ marginBottom: 14 }}>{Object.keys(RULE).map(k => <button key={k} className={m === k ? 'on' : ''} onClick={() => setM(k)}>{k}</button>)}</div>
      <div className="matrix">{PLACES.map((p, i) => <div key={p} className={'cell ' + (RULE[m][i] ? 'yes' : 'no')}><b>{RULE[m][i] ? '✓' : '✗'}</b>{p}</div>)}</div>
      <p className="wg-note"><code>{m}</code>: {NOTE[m]}  Order from most to least restrictive: <b>private → default → protected → public</b>.</p>
    </div>
  );
}

/* ---------- Exception flow: watch which lines run ---------- */
const EX_CODE = [
  'try {',
  '    int n = Integer.parseInt(input);',
  '    int r = 100 / n;',
  '    System.out.println("Result: " + r);',
  '} catch (NumberFormatException e) {',
  '    System.out.println("Not a number!");',
  '} catch (ArithmeticException e) {',
  '    System.out.println("Cannot divide by zero!");',
  '} finally {',
  '    System.out.println("finally always runs");',
  '}',
  'System.out.println("Program continues...");'
];
export function ExceptionFlow() {
  const [input, setInput] = useState('5');
  const [path, setPath] = useState([]);
  const [k, setK] = useState(-1);
  const [thrown, setThrown] = useState(null);
  const timer = useRef();
  useEffect(() => () => clearInterval(timer.current), []);
  const run = (val = input) => {
    setInput(val);
    const isNum = /^-?\d+$/.test(val.trim());
    const n = isNum ? parseInt(val, 10) : NaN;
    let p, th = null, out;
    if (!isNum) { p = [0, 1, 4, 5, 8, 9, 10, 11]; th = [1, 'NumberFormatException']; out = ['Not a number!']; }
    else if (n === 0) { p = [0, 1, 2, 6, 7, 8, 9, 10, 11]; th = [2, 'ArithmeticException: / by zero']; out = ['Cannot divide by zero!']; }
    else { p = [0, 1, 2, 3, 8, 9, 10, 11]; out = ['Result: ' + Math.trunc(100 / n)]; }
    out.push('finally always runs', 'Program continues...');
    setPath(p.map((l, i) => [l, i])); setThrown(th); setK(0);
    clearInterval(timer.current);
    let i = 0;
    timer.current = setInterval(() => { i++; setK(i); if (i >= p.length) clearInterval(timer.current); }, 420);
    setOutput(out);
  };
  const [output, setOutput] = useState([]);
  const ran = new Set(path.slice(0, k).map(x => x[0]));
  const cur = path[k - 1]?.[0];
  const finished = k >= path.length && path.length > 0;
  return (
    <div className="wg">
      <p className="wg-title">Type an input and run. Watch which lines execute</p>
      <div className="wg-row" style={{ marginBottom: 12 }}>
        <input value={input} onChange={e => setInput(e.target.value)} aria-label="input" style={{ width: 120 }} />
        <button className="btn primary" onClick={() => run()}>Run ▶</button>
        <span className="muted" style={{ fontSize: 13 }}>Try:</span>
        {['5', '0', 'abc'].map(v => <button key={v} className="btn sm" onClick={() => run(v)}>"{v}"</button>)}
      </div>
      <div className="codeview">
        {EX_CODE.map((line, i) => {
          const cls = i === cur ? (thrown && thrown[0] === i ? 'thr' : 'cur') : ran.has(i) ? (thrown && thrown[0] === i ? 'thr' : 'run') : finished ? 'skip' : '';
          return <div key={i} className={cls}>{line}{thrown && thrown[0] === i && ran.has(i) && <span style={{ color: 'var(--bad)' }}>   ⚡ throws {thrown[1].split(':')[0]}</span>}</div>;
        })}
      </div>
      {finished && <>
        <div className="console" style={{ marginTop: 12 }}>{output.join('\n')}</div>
        <p className={'wg-note ' + (thrown ? 'bad' : 'ok')}>{thrown
          ? <>An exception was <b>thrown</b> at line {thrown[0] + 1}. The rest of <code>try</code> was <b>skipped</b>, the matching <code>catch</code> ran, then <code>finally</code>. The program did <b>not crash</b>.</>
          : <>No exception: <code>try</code> finished, every <code>catch</code> was skipped, and <code>finally</code> still ran.</>}</p>
      </>}
    </div>
  );
}

/* ---------- Custom exception: AgeException ---------- */
export function AgeChecker() {
  const [age, setAge] = useState(15);
  const [res, setRes] = useState(null);
  const go = () => setRes(Number(age) < 18 ? 'throw' : 'ok');
  return (
    <div className="wg">
      <p className="wg-title">register("Ravi", age) throws AgeException if age &lt; 18</p>
      <div className="wg-row"><label>age = <input type="number" value={age} onChange={e => { setAge(e.target.value); setRes(null); }} style={{ width: 90 }} /></label><button className="btn primary" onClick={go}>Call register()</button></div>
      {res && (
        <div className="log">
          <div className="info">1. register() checks: is {age} &lt; 18? <b>{res === 'throw' ? 'yes' : 'no'}</b></div>
          {res === 'throw' ? <>
            <div className="bad">2. <code>throw new AgeException("Ravi is only {age}. Minimum age is 18.")</code></div>
            <div className="bad">3. register() stops immediately. Its <code>throws AgeException</code> passes the exception to the caller</div>
            <div className="ok">4. Caller's <code>catch (AgeException e)</code> prints e.getMessage()</div>
          </> : <div className="ok">2. Prints "Ravi registered successfully!"</div>}
          <div className="warn">{res === 'throw' ? 5 : 3}. <code>finally</code> runs: "Registration process finished."</div>
        </div>
      )}
    </div>
  );
}
