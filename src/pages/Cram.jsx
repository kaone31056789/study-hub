import { useState } from 'react';
import { Html } from '../components/ui';
import Diagram from '../components/Diagram';
import { AudioBar } from '../components/Extras';
import { useLang, desiOf } from '../lang';
import { weakList } from '../progress';
import { SkTabs, SkCheck } from '../components/sakuga';
import { AsciiWind } from '../components/canvasfx';

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
      <AsciiWind height={230} text="合格" />
      <p className="lead">Only what you must write: key points, 2-mark answers, diagrams and memory hooks. Read it top to bottom, or print it.</p>
      <div className="rev-bar cram-bar">
        <SkTabs label="Unit" value={unit} onChange={setUnit} options={['all', 1, 2, 3].map(u => [u, u === 'all' ? 'All' : 'Unit ' + u])} />
        <SkCheck checked={pyqOnly} onChange={setPyqOnly}>{ctx.lbl?.filter || "Last year's"} only</SkCheck>
        <SkCheck checked={diagrams} onChange={setDiagrams}>Diagrams</SkCheck>
        <button className="btn sm" onClick={() => window.print()}>🖨 Print / PDF</button>
      </div>
      <AudioBar parts={audio} label="🔊 Play whole cram sheet" />
      {list.map(t => (
        <article key={t.id} className={'cram-card' + (weak.has(t.id) ? ' weak' : '')} style={{ '--uc': UCOL[t.unit] }}>
          <header>
            <a href={`#/${meta.id}/learn/${t.id}`}>{t.title}</a>
            <span className="tag">{t.marks} marks</span>
            {t.pyq && <span className="tag pyq">{ctx.lbl?.pyq || 'last year'}</span>}
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
