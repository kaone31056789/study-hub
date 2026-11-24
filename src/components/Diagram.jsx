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
import { Fragment } from 'react';

const tone = n => (n.tone ? ' t-' + n.tone : '');

function Node({ n, i = 0 }) {
  if (typeof n === 'string') n = { t: n };
  if (n.table) return <Table tb={n.table} i={i} />;
  return (
    <div className={'dg-node' + tone(n) + (n.kids ? ' has-kids' : '')} style={{ '--i': i }}>
      <b>{n.t}</b>
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

function Block({ b }) {
  if (b.h) return <div className="dg-h">{b.h}</div>;
  if (b.note) return <p className="dg-note">{b.note}</p>;
  if (b.flow) return <Flow b={b} />;
  if (b.tree) return <div className="dg-tree-wrap"><Tree n={b.tree} /></div>;
  if (b.grid) return <div className="dg-grid">{b.grid.map((c, j) => <div className="dg-cell" key={j}>{c.cap && <div className="dg-cap">{c.cap}</div>}<Block b={c} /></div>)}</div>;
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

export default function Diagram({ spec }) {
  return <div className="dg">{spec.map((b, i) => <Block key={i} b={b} />)}</div>;
}
