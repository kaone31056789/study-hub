import { useState } from 'react';
import { Html } from '../components/ui';
import Diagram from '../components/Diagram';
import { AudioBar } from '../components/Extras';
import { useLang, desiOf } from '../lang';
import { weakList } from '../progress';

const UCOL = ['var(--warn)', 'var(--u1)', 'var(--u2)', 'var(--u3)'];

// "1 hour left": everything you must write, on one scrollable / printable page.
export default function Cram({ ctx }) {
  const { S, meta } = ctx;
  const lang = useLang();
  const [unit, setUnit] = useState('all');
  const [pyqOnly, setPyqOnly] = useState(false);
  const [diagrams, setDiagrams] = useState(true);
  const weak = new Set(weakList(meta.id).map(([id]) => id));
  const list = S.topics.filter(t => t.unit > 0 && (unit === 'all' || t.unit === unit) && (!pyqOnly || t.pyq));
  const audio = () => list.flatMap(t => [t.title + '.', ...(t.rev || []), desiOf(t, lang)?.yaad || '']);

  return (
    <div className="wrap cram">
      <p className="eyebrow">Last hour before the exam</p>
      <h1 className="page-h">Cram sheet</h1>
      <p className="lead">Only what you must write: key points, 2-mark answers, diagrams and memory hooks. Read it top to bottom, or print it.</p>
      <div className="rev-bar cram-bar">
        <div className="seg">{['all', 1, 2, 3].map(u => <button key={u} className={unit === u ? 'on' : ''} onClick={() => setUnit(u)}>{u === 'all' ? 'All' : 'Unit ' + u}</button>)}</div>
        <label className="toggle"><input type="checkbox" checked={pyqOnly} onChange={e => setPyqOnly(e.target.checked)} />Last year's only</label>
        <label className="toggle"><input type="checkbox" checked={diagrams} onChange={e => setDiagrams(e.target.checked)} />Diagrams</label>
        <button className="btn sm" onClick={() => window.print()}>🖨 Print / PDF</button>
      </div>
      <AudioBar parts={audio} label="🔊 Play whole cram sheet" />
      {list.map(t => (
        <article key={t.id} className={'cram-card' + (weak.has(t.id) ? ' weak' : '')} style={{ '--uc': UCOL[t.unit] }}>
          <header>
            <a href={`#/${meta.id}/learn/${t.id}`}>{t.title}</a>
            <span className="tag">{t.marks} marks</span>
            {t.pyq && <span className="tag pyq">last year</span>}
            {weak.has(t.id) && <span className="tag weak-tag">weak</span>}
          </header>
          {t.rev && <ul className="rev-pts">{t.rev.map((p, i) => <li key={i} dangerouslySetInnerHTML={{ __html: p }} />)}</ul>}
          {t.short && <details className="cram-short"><summary>2-mark answer</summary><Html className="prose" html={t.short} /></details>}
          {diagrams && t.dg && <div className="cram-dg"><Diagram spec={t.dg} /></div>}
          <div className="cram-hooks">
            {t.trick && <Html className="rev-trick" html={t.trick} />}
            {desiOf(t, lang)?.yaad && <p className="rev-meme">🧠 {desiOf(t, lang).yaad}</p>}
            {t.meme && <p className="rev-meme">😂 "{t.meme.line}"</p>}
          </div>
        </article>
      ))}
    </div>
  );
}
