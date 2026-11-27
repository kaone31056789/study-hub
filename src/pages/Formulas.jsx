// Formula sheet: every formula in the subject, pulled from the topics, written like pen notes.
import { useMemo, useState } from 'react';
import { formulasIn } from '../mathhand';

const strings = (o, acc = []) => {
  if (typeof o === 'string') acc.push(o);
  else if (Array.isArray(o)) o.forEach(x => strings(x, acc));
  else if (o && typeof o === 'object') Object.values(o).forEach(x => strings(x, acc));
  return acc;
};
const plain = h => h.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
// keep real formulas: something on both sides of an operator, and a symbol (not just numbers) on the right
const OPS = /[=≈≤≥⇔∝]/;
const good = h => {
  const t = plain(h);
  const i = t.search(OPS);
  if (i <= 0 || t.length < 5) return false;
  const lhs = t.slice(0, i).trim(), rhs = t.slice(i + 1).replace(/^[=≈≤≥⇔∝\s]+/, '');
  if (!/^[A-Za-zα-ωΑ-ΩΣ∑|(]/.test(lhs) || !rhs) return false;
  const bal = (a, b) => t.split(a).length === t.split(b).length;
  if (!bal('(', ')') || !bal('[', ']') || (t.split('|').length - 1) % 2) return false;
  return /[A-Za-zα-ωΑ-ΩΣ∑√∫∇]/.test(rhs);
};
const tidy = h => h.replace(/[\s,.;:]+$/, '').replace(/\s*=\s*$/, '');

export default function Formulas({ ctx }) {
  const { S, meta } = ctx;
  const [q, setQ] = useState('');
  const groups = useMemo(() => S.topics.map(t => {
    const seen = new Set(), list = [];
    for (const f of strings(t).flatMap(formulasIn).map(tidy).filter(good)) {
      const k = plain(f).replace(/\s/g, '');
      if (!seen.has(k)) { seen.add(k); list.push(f); }
    }
    return { t, list };
  }).filter(g => g.list.length), [S]);
  const total = groups.reduce((n, g) => n + g.list.length, 0);
  const shown = groups.map(g => ({ ...g, list: q ? g.list.filter(f => (plain(f) + ' ' + g.t.title).toLowerCase().includes(q.toLowerCase())) : g.list })).filter(g => g.list.length);
  let n = 0;
  return (
    <div className="wrap fsheet">
      <p className="eyebrow">{meta.short} · {total} formulas · {groups.length} topics</p>
      <h1 className="page-h">Formula sheet</h1>
      <p className="lead">Every formula from every topic on one page, written the way you would write it in the exam. Tap a topic name to open its lesson.</p>
      <input className="fsheet-q" type="search" placeholder="Find a formula or topic…" value={q} onChange={e => setQ(e.target.value)} aria-label="Search formulas" />
      {total === 0 && <p className="muted">This subject has no maths formulas.</p>}
      {Object.entries(S.units).map(([u, name]) => {
        const gs = shown.filter(g => g.t.unit === +u);
        if (!gs.length) return null;
        return (
          <section key={u} className="fs-unit">
            <h2 className="fs-uh"><span>{+u ? 'Unit ' + u : '★'}</span>{name}</h2>
            <div className="fs-paper">
              {gs.map(({ t, list }) => (
                <div key={t.id} className="fs-topic">
                  <a className="fs-th" href={`#/${meta.id}/learn/${t.id}`}>{t.title} <i aria-hidden="true">→</i></a>
                  <ol>{list.map((f, i) => <li key={i} data-n={String(++n).padStart(2, '0')}><span className="mh" dangerouslySetInnerHTML={{ __html: f.replace(/<span class="mh">|<\/span>/g, '') }} /></li>)}</ol>
                </div>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
