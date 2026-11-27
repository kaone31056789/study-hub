// Formula sheet: a notebook page of the formulas worth memorising (curated per subject in S.formulas);
// subjects without a curated list fall back to formulas pulled from the topics.
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

// fallback: [{ unit, title, items: [[topic title, html]] }]
function extracted(S) {
  return Object.entries(S.units).map(([u, name]) => ({
    unit: +u, title: name,
    items: S.topics.filter(t => t.unit === +u).flatMap(t => {
      const seen = new Set();
      return strings(t).flatMap(formulasIn).map(tidy).filter(good)
        .filter(f => { const k = plain(f).replace(/\s/g, ''); return !seen.has(k) && seen.add(k); })
        .slice(0, 4).map(f => [t.title, f.replace(/<span class="mh">|<\/span>/g, '')]);
    }),
  })).filter(u => u.items.length);
}

export default function Formulas({ ctx }) {
  const { S, meta } = ctx;
  const [q, setQ] = useState('');
  const [test, setTest] = useState(false);
  const [shown, setShown] = useState(() => new Set());
  const units = useMemo(() => S.formulas || extracted(S), [S]);
  const total = units.reduce((n, u) => n + u.items.length, 0);
  const match = ([label, f]) => !q || (label + ' ' + plain(f)).toLowerCase().includes(q.toLowerCase());
  const flip = k => setShown(s => { const n = new Set(s); n.has(k) ? n.delete(k) : n.add(k); return n; });
  return (
    <div className="wrap fsheet">
      <div className="fs-bar">
        <input className="fsheet-q" type="search" placeholder="Find a formula…" value={q} onChange={e => setQ(e.target.value)} aria-label="Search formulas" />
        <button className={'btn sm' + (test ? ' primary' : '')} onClick={() => { setTest(t => !t); setShown(new Set()); }} aria-pressed={test}>
          {test ? '✓ Test me: on' : 'Test me'}
        </button>
        <span className="fs-count">{total} formulas</span>
      </div>
      <article className={'fs-note' + (test ? ' testing' : '')}>
        <h1 className="fs-title"><u>{meta.name}</u> <small>(formula sheet)</small></h1>
        {test && <p className="fs-hint">Say each formula out loud, then tap it to check.</p>}
        {units.map(u => {
          const items = u.items.filter(match);
          if (!items.length) return null;
          return (
            <section key={u.unit} className="fs-u">
              <h2><span>{u.unit ? 'Unit ' + u.unit : 'Start'}:</span> {u.title}</h2>
              <ul>
                {items.map(([label, f, key]) => {
                  const k = u.unit + label + f.length;
                  return (
                    <li key={k} className={key ? 'key' : ''}>
                      <span className="fs-l">{label}:</span>
                      <button className={'fs-f' + (test && !shown.has(k) ? ' hid' : '')} onClick={() => test && flip(k)} tabIndex={test ? 0 : -1}>
                        <span className="mh" dangerouslySetInnerHTML={{ __html: f }} />
                      </button>
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </article>
    </div>
  );
}
