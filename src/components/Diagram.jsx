// Data-driven diagrams. A spec is an array of blocks:
//   { h }                       section heading
//   { note }                    caption
//   { t, s, tone, kids, col }   box (kids = nested boxes, col = stack vertically)
//   { flow:[...], labels:[...], col, both }   boxes joined by labelled arrows
//   { tree:{ t, s, tone, kids } }            hierarchy with connectors
//   { grid:[ blocks with optional cap ] }    side-by-side panels
//   { merge:{ from:[...], to, label, bad } } many → one
//   { cells:[...], cap, hl } / { chain:[...] } array cells / linked list
//   { table:{ name, cols:[...] } }           ER table ('id*' = PK, 'x>' = FK)
//   { branch:{ down, up, node } }            side loop under a flow
import { Fragment, useEffect, useRef, useState } from 'react';

const tone = n => (n.tone ? ' t-' + n.tone : '');

// Label rises word by word out of a mask (technique ported from Vengeance UI's staggerText, MIT).
const Words = ({ t }) => String(t).split(' ').map((w, k) => <Fragment key={k}>{k > 0 && ' '}<span className="w" style={{ '--w': k }}><span>{w}</span></span></Fragment>);

function Node({ n, i = 0 }) {
  if (typeof n === 'string') n = { t: n };
  if (n.table) return <Table tb={n.table} i={i} />;
  return (
    <div className={'dg-node' + tone(n) + (n.kids ? ' has-kids' : '')} style={{ '--i': i }}>
      <b><Words t={n.t} /></b>
      {n.s && <small>{n.s}</small>}
      {n.kids && <div className={'dg-kids' + (n.col ? ' col' : '')}>{n.kids.map((k, j) => <Node key={j} n={k} i={i + j + 1} />)}</div>}
    </div>
  );
}

function Table({ tb, i }) {
  return (
    <div className="dg-tbl" style={{ '--i': i, '--c': tb.c || '#6d9cff' }}>
      <b>{tb.name}</b>
      {tb.cols.map(c => {
        const pk = c.endsWith('*'), fk = c.endsWith('>');
        return <span key={c} className={pk ? 'pk' : fk ? 'fk' : ''}>{c.replace(/[*>]$/, '')}{pk ? ' 🔑' : fk ? ' → FK' : ''}</span>;
      })}
    </div>
  );
}

function Flow({ b }) {
  const out = [];
  b.flow.forEach((n, j) => {
    if (j) out.push(<div key={'a' + j} className={'dg-arrow' + (b.both ? ' both' : '')} style={{ '--i': j }}><i />{b.labels?.[j - 1] && <span>{b.labels[j - 1]}</span>}</div>);
    out.push(<Node key={j} n={n} i={j} />);
  });
  return <div className={'dg-flow' + (b.col ? ' col' : '')}>{out}</div>;
}

function Tree({ n, depth = 0 }) {
  return (
    <div className="dg-tree">
      <Node n={{ ...n, kids: undefined }} i={depth} />
      {n.kids && <div className="dg-tkids">{n.kids.map((k, j) => <div className="dg-tkid" key={j}><Tree n={typeof k === 'string' ? { t: k } : k} depth={depth + 1} /></div>)}</div>}
    </div>
  );
}

// { matrix:[[..]], cap, heat:max (grayscale shading), bin:true (binary image, no numbers), sign:true (+green/−red mask), hl:['r,c',...] }
function Matrix({ b }) {
  const rows = b.matrix, cols = rows[0].length;
  return (
    <figure className="dg-fig">
      <div className={'dg-mx' + (b.bin ? ' bin' : '') + (b.small ? ' sm' : '')} style={{ '--cols': cols }}>
        {rows.flat().map((v, k) => {
          const r = Math.floor(k / cols), c = k % cols, n = typeof v === 'number' ? v : parseFloat(v);
          const st = { '--i': k };
          let cls = b.hl?.includes(r + ',' + c) ? 'hl' : '';
          if (b.bin) cls += v ? ' on' : '';
          else if (b.heat && !isNaN(n)) { const g = Math.round((n / b.heat) * 100); st['--g'] = g + '%'; cls += ' heat' + (g > 55 ? ' lite' : ''); }
          else if (b.sign && !isNaN(n)) cls += n > 0 ? ' pos' : n < 0 ? ' neg' : '';
          return <span key={k} className={cls} style={st}>{b.bin ? '' : v}</span>;
        })}
      </div>
      {b.cap && <figcaption className="dg-cap">{b.cap}</figcaption>}
    </figure>
  );
}

// { bars:[counts], labels:[..], cap, split:index (threshold line after that bar), tone }
function Bars({ b }) {
  const max = Math.max(...b.bars, 1);
  return (
    <figure className="dg-fig">
      <div className={'dg-bars' + (b.tone ? ' t-' + b.tone : '')}>
        {b.bars.map((v, k) => (
          <div key={k} className={b.split === k ? 'split' : ''} style={{ '--h': v / max, '--i': k }}>
            <em>{v || ''}</em><i /><span>{b.labels?.[k] ?? k}</span>
          </div>
        ))}
      </div>
      {b.cap && <figcaption className="dg-cap">{b.cap}</figcaption>}
    </figure>
  );
}

// { plot:{ xmax, xlabel, ylabel, lines:[{ name, tone, f:x=>y (0..1) }], mark:{ x, label } }, cap }
const W = 320, H = 130;
function Plot({ b }) {
  const p = b.plot, N = 90;
  return (
    <figure className="dg-fig dg-plot">
      <svg viewBox={`-28 -10 ${W + 40} ${H + 40}`} role="img" aria-label={b.cap || 'plot'}>
        <path className="ax" d={`M0 0V${H}H${W}`} />
        {p.mark && <><path className="mk" d={`M${(p.mark.x / p.xmax) * W} 0V${H}`} /><text className="mkt" x={(p.mark.x / p.xmax) * W} y={H + 14}>{p.mark.label}</text></>}
        <text className="axt" x={W} y={H + 28} textAnchor="end">{p.xlabel}</text>
        <text className="axt" x={-6} y={4} textAnchor="end">{p.ylabel ?? 1}</text>
        <text className="axt" x={-6} y={H} textAnchor="end">0</text>
        {p.lines.map((ln, j) => {
          const pts = Array.from({ length: N + 1 }, (_, k) => { const x = (k / N) * p.xmax; const y = Math.max(0, Math.min(1, ln.f(x))); return `${((x / p.xmax) * W).toFixed(1)},${(H - y * H).toFixed(1)}`; }).join(' ');
          return <polyline key={j} className={'ln t-' + (ln.tone || 'a')} pathLength="1" points={pts} style={{ '--i': j }} />;
        })}
      </svg>
      <div className="dg-legend">{p.lines.map((ln, j) => <span key={j} className={'t-' + (ln.tone || 'a')}><i />{ln.name}</span>)}</div>
      {b.cap && <figcaption className="dg-cap">{b.cap}</figcaption>}
    </figure>
  );
}

function Block({ b }) {
  if (b.h) return <div className="dg-h">{b.h}</div>;
  if (b.matrix) return <Matrix b={b} />;
  if (b.bars) return <Bars b={b} />;
  if (b.plot) return <Plot b={b} />;
  if (b.note) return <p className="dg-note">{b.note}</p>;
  if (b.flow) return <Flow b={b} />;
  if (b.tree) return <div className="dg-tree-wrap"><Tree n={b.tree} /></div>;
  if (b.grid) return <div className="dg-grid">{b.grid.map((c, j) => <div className="dg-cell" key={j}>{c.cap && <div className="dg-cap">{c.cap}</div>}<Block b={{ ...c, cap: undefined }} /></div>)}</div>;
  if (b.merge) return (
    <div className={'dg-merge' + (b.merge.bad ? ' bad' : '')}>
      <div className="dg-merge-from">{b.merge.from.map((n, j) => <Node key={j} n={n} i={j} />)}</div>
      <div className="dg-merge-mid"><i />{b.merge.label}</div>
      <Node n={b.merge.to} i={b.merge.from.length} />
    </div>
  );
  if (b.cells) return (
    <div className="dg-cells">
      <div className={'dg-cells-row' + (b.hl ? ' hl' : '')}>{b.cells.map((c, j) => <span key={j} style={{ '--i': j }}>{c}{b.idx && <sub>{j}</sub>}</span>)}</div>
      {b.note2 && <p className="dg-note" style={{ margin: 0 }}>{b.note2}</p>}
    </div>
  );
  if (b.chain) return (
    <div className="dg-chain"><small>null</small><em>⇠</em>{b.chain.map((c, j) => <Fragment key={j}><span style={{ '--i': j }}>{c}</span>{j < b.chain.length - 1 && <em>⇄</em>}</Fragment>)}<em>⇢</em><small>null</small></div>
  );
  if (b.table) return <Table tb={b.table} i={0} />;
  if (b.branch) return (
    <div className="dg-branch">
      <div className="dg-branch-arrows"><div className="dn"><i />{b.branch.down}</div><div className="up"><i />{b.branch.up}</div></div>
      <Node n={b.branch.node} i={2} />
    </div>
  );
  return <Node n={b} />;
}

// Animations wait (paused) until the diagram scrolls into view, then play once.
export default function Diagram({ spec }) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } }, { rootMargin: '0px 0px -15% 0px' });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className={'dg' + (seen ? ' in' : '')}>{spec.map((b, i) => <Block key={i} b={b} />)}</div>;
}
