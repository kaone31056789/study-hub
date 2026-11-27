import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import Prism from 'prismjs';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-sql';
import 'prismjs/themes/prism-tomorrow.css';
import SpotlightCard from '../rb/SpotlightCard';
import { useTheme } from '../theme';
import { MemePhoto } from './MemeImage';
import { fx } from './sakuga';

const esc = s => s.replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
// Content files write JSP/EL "${...}" as "#{...}" so JS template literals don't try to interpolate it.
export const fixCode = s => s.replace(/#\{/g, '${');

export const Html = ({ html, className = '' }) => <div className={className} dangerouslySetInnerHTML={{ __html: html }} />;

export function CodeBlock({ t, lang = 'java', src }) {
  const code = fixCode(src);
  const grammar = Prism.languages[lang];
  const html = grammar ? Prism.highlight(code, grammar, lang) : esc(code);
  const [copied, setCopied] = useState(false);
  const copy = () => navigator.clipboard?.writeText(code).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1400); });
  return (
    <div className="code">
      <div className="code-head"><span>{t}</span><button className="copy" onClick={copy}>{copied ? 'Copied' : 'Copy'}</button></div>
      <pre><code className={'language-' + lang} dangerouslySetInnerHTML={{ __html: html }} /></pre>
    </div>
  );
}

export function MCQ({ q, onAnswer, big }) {
  const [pick, setPick] = useState(null);
  useEffect(() => setPick(null), [q]);
  const answered = pick !== null;
  const choose = (i, el) => { if (answered) return; setPick(i); const ok = i === q.a; ok ? fx.right(el) : fx.wrong(el); onAnswer?.(ok); };
  return (
    <div className={'mcq' + (big ? ' big' : '')}>
      <p className="mcq-q" dangerouslySetInnerHTML={{ __html: q.q }} />
      <div className="opts">
        {q.o.map((o, i) => (
          <button key={i} className={'opt' + (answered && i === q.a ? ' right' : '') + (answered && i === pick && i !== q.a ? ' wrong' : '')}
            disabled={answered} onClick={e => choose(i, e.currentTarget)} dangerouslySetInnerHTML={{ __html: o }} />
        ))}
      </div>
      {answered && <p className="why"><b>{pick === q.a ? 'Correct. ' : 'Not quite. '}</b><span dangerouslySetInnerHTML={{ __html: q.why }} /></p>}
    </div>
  );
}

// Step-by-step concept walkthrough: terminal-style tabs, an ASCII progress bar, ink buttons.
// Arrow keys move between steps when it has focus.
export function Walkthrough({ steps }) {
  const [i, setI] = useState(0);
  const [done, setDone] = useState(false);
  const n = steps.length, pad = k => String(k).padStart(2, '0');
  const go = k => { setDone(false); setI(Math.max(0, Math.min(n - 1, k))); };
  const next = () => { if (i < n - 1) { go(i + 1); fx.tick?.(); } else setDone(true); };
  const W = 18, fill = Math.round(((done ? n : i + 1) / n) * W);
  return (
    <div className="wt" tabIndex={0} onKeyDown={e => { if (e.key === 'ArrowRight') next(); if (e.key === 'ArrowLeft') go(i - 1); }}>
      <div className="wt-head">
        <span className="wt-count">STEP {pad(i + 1)}<i>/{pad(n)}</i></span>
        <span className="wt-bar" aria-hidden="true"><b>{'▓'.repeat(fill)}</b>{'░'.repeat(W - fill)}</span>
      </div>
      <div className="wt-tabs" role="tablist">
        {steps.map((st, k) => (
          <button key={k} role="tab" aria-selected={k === i} className={'wt-tab' + (k === i ? ' on' : '') + (k < i || done ? ' seen' : '')} onClick={() => go(k)}>
            <span>{k < i || done ? '✓' : pad(k + 1)}</span>{st.title}
          </button>
        ))}
      </div>
      <div className="wt-body">
        {done ? (
          <motion.div key="done" className="wt-done" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}>
            <span className="wt-seal" aria-hidden="true">済</span>
            <div><b>Concept clear.</b><p>Now try the interactive part, then read the exam answer below.</p></div>
          </motion.div>
        ) : (
          <motion.div key={i} initial={{ opacity: 0, x: 18, filter: 'blur(6px)' }} animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }} transition={{ duration: 0.32, ease: [0.23, 1, 0.32, 1] }}>
            <p className="wt-title"><span>&gt;</span> {steps[i].title}</p>
            <Html className="prose step-body" html={steps[i].body} />
          </motion.div>
        )}
      </div>
      <div className="wt-foot">
        <button className="btn wt-back" onClick={() => (done ? setDone(false) : go(i - 1))} disabled={i === 0 && !done}>← Back</button>
        <span className="wt-hint">← → keys</span>
        {!done && <button className="btn primary wt-next" onClick={next}>{i < n - 1 ? 'Next' : 'Got it'} <span aria-hidden="true">→</span></button>}
      </div>
    </div>
  );
}

// Click a chip to reveal its explanation (used for "explore the parts" style learning).
export function Explorer({ items, title }) {
  const theme = useTheme();
  const [i, setI] = useState(0);
  const it = items[i];
  return (
    <div className="wg">
      {title && <p className="wg-title">{title}</p>}
      <div className="xp-chips">
        {items.map((x, j) => <button key={j} className={'xp-chip' + (i === j ? ' on' : '')} onClick={() => setI(j)}>{x.k}</button>)}
      </div>
      <SpotlightCard key={i} theme={theme} className="xp-panel" spotlightColor="rgba(255,122,61,0.35)" style={{ background: 'var(--surface-2)' }}>
        <Html className="prose xp" html={it.h} />
      </SpotlightCard>
    </div>
  );
}

// Bhai-lang explainer: 5 clear parts instead of one dense paragraph.
const BX = [['🎯', 'Seedhi baat', 's'], ['🏠', 'Desi example se samjho', 'ex'], ['☕', 'Ab Java mein', 'java'], ['📝', 'Exam mein kya likhna hai', 'exam']];
const BXG = [['🎯', 'Seedhi baat, saale', 's'], ['🏠', 'Desi example se samajh', 'ex'], ['☕', 'Ab Java mein dekh', 'java'], ['📝', 'Exam mein ye chhaap', 'exam']];
export function BhaiExplain({ b, gaali }) {
  return (
    <div className="bx">
      {(gaali ? BXG : BX).map(([e, title, k], i) => b[k] && (
        <motion.div key={k} className={'bx-part bx-' + k} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20px' }} transition={{ duration: 0.4, delay: i * 0.06 }}>
          <div className="bx-h"><span aria-hidden="true">{e}</span>{title}</div>
          {k === 's' ? <p className="bx-s">{b.s}</p> : <Html className="prose bx-body" html={b[k]} />}
        </motion.div>
      ))}
      {b.yaad && <div className="bx-yaad"><span>🧠 {gaali ? 'Ratt le ye line' : 'Ek line mein yaad rakh'}</span><b>{b.yaad}</b></div>}
    </div>
  );
}

// Beginner explainer, same layout in every language.
const EX_LABELS = {
  en: ['The idea in one line', 'Real-life story', 'Words decoded', 'How it works', 'What to write in the exam', 'Remember it'],
  bhai: ['Ek line mein', 'Desi example se samjho', 'Mushkil words ka matlab', 'Kaise kaam karta hai', 'Exam mein kya likhna hai', 'Yaad rakh'],
  gaali: ['Seedhi baat, bhosdike', 'Desi example, ab toh samajh ja chutiye', 'Bhaari words ka matlab, dictionary mat khol', 'Kaise chalta hai, dhyan se dekh gadhe', 'Exam mein ye chhaap, harami', 'Ratt le ye line, kamine']
};
const EX_G = ['要', '話', '語', '仕', '試', '記'];   // idea · story · words · mechanism · exam · remember
export function EasyExplain({ e, lang = 'en' }) {
  if (!e?.story) return <BhaiExplain b={e} gaali={lang === 'gaali'} />; // old shape fallback
  const L = EX_LABELS[lang] || EX_LABELS.en;
  const part = (i, cls, body) => (
    <motion.div className={'bx-part ' + cls} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-20px' }} transition={{ duration: 0.35, delay: i * 0.05 }}>
      <div className="bx-h"><i className="bx-g" aria-hidden="true">{EX_G[i]}</i>{L[i]}</div>{body}
    </motion.div>
  );
  return (
    <div className="bx">
      {part(0, 'bx-s', <p className="bx-s"><span className="bx-ink">{e.s}</span></p>)}
      {part(1, 'bx-ex', <p className="bx-body bx-quote">{e.story}</p>)}
      {e.words?.length > 0 && part(2, 'bx-words', <dl className="bx-dl">{e.words.map(([w, m], i) => <div key={w} style={{ '--i': i }}><dt>{w}</dt><dd>{m}</dd></div>)}</dl>)}
      {e.how?.length > 0 && part(3, 'bx-java', <ol className="bx-how">{e.how.map((h, i) => <li key={i} style={{ '--i': i }} dangerouslySetInnerHTML={{ __html: h }} />)}</ol>)}
      {part(4, 'bx-exam', <p className="bx-body">{e.exam}</p>)}
      <Yaad label={<><i className="bx-g" aria-hidden="true">{EX_G[5]}</i>{L[5]}</>} text={e.yaad} />
    </div>
  );
}

// "RENT: Real, Energy compaction, No edge jump, Time-fast" -> one tile per letter, each with its word.
function Yaad({ label, text }) {
  const m = /^([A-Z]{2,9})\s*[:=–-]\s*(.+)$/.exec(text || '');
  const words = m && m[2].replace(/\.\s*$/, '').split(/\s*[,;]\s*/).filter(Boolean);
  const ok = words && words.length === m[1].length;
  return (
    <motion.div className="bx-yaad" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-20px' }} transition={{ duration: 0.4 }}>
      <span>{label}</span>
      {ok ? (
        <div className="yaad-tiles" aria-label={text}>
          {words.map((w, i) => (
            <motion.div key={i} className="yaad-tile" initial={{ opacity: 0, y: 14, rotate: -4 }} whileInView={{ opacity: 1, y: 0, rotate: 0 }} viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 380, damping: 22, delay: 0.15 + i * 0.09 }}>
              <b>{m[1][i]}</b><small>{w}</small>
            </motion.div>
          ))}
        </div>
      ) : <b>{text}</b>}
    </motion.div>
  );
}

// Gaali mode: one savage push per topic (picked by topic id, so it stays the same on every visit).
const COACH = [
  'Kal paper hai aur tu abhi bhi reels dekh raha tha, bc? Chal padh.',
  'Ye topic chhoda toh 10 marks ki maa chud jaayegi. Padh, chutiye.',
  'Diagram bana, formula likh, table bana. Bas itna kar le, harami.',
  'Topper banne ko nahi bol raha, bas fail mat ho, bhosdike.',
  'Ek baar dhyan se padh le, doosri baar padhne ka time nahi milega, gadhe.',
  'Numerical mein steps likh, sirf answer likha toh examiner teri lega.',
  'Phone ulta rakh. Haan, abhi. Ab padh, kamine.',
  'Itna simple topic bhi nahi aaya toh engineering chhod ke chai ki tapri khol le.',
  'Samajh nahi aaya? Simple wala section phir se padh, nalle.',
  'Exam hall mein yaad nahi aayega toh mummy ko kya bolega? Abhi ratt le.',
  'Har topic ke baad tick kar, warna kal subah bolega "ye toh padha hi nahi", chutiye.',
  'Bakchodi kal kar lena, aaj sirf ye topic. Chal, bc.'
];
export function GaaliCoach({ id }) {
  const n = [...String(id)].reduce((a, c) => a + c.charCodeAt(0), 0) % COACH.length;
  return <p className="gaali-coach"><span aria-hidden="true">🤬</span>{COACH[n]}</p>;
}

// Sticky-note "meme moment" that ties a famous meme line to the concept.
export function MemeCard({ m, compact, unit, id }) {
  if (compact) return <p className="rev-meme"><span aria-hidden="true">😂</span> <b>"{m.line}"</b> <span dangerouslySetInnerHTML={{ __html: '· ' + m.punch.replace(/<[^>]+>/g, '').split('. ')[0] }} /></p>;
  return (
    <motion.figure className="meme" initial={{ opacity: 0, rotate: -3, y: 10 }} whileInView={{ opacity: 1, rotate: -1, y: 0 }} viewport={{ once: true }}
      whileHover={{ rotate: 0, scale: 1.01 }} transition={{ type: 'spring', stiffness: 260, damping: 20 }}>
      <span className="meme-tag">😂 Meme moment</span>
      <MemePhoto id={id} img={m.img} unit={unit} line={m.line} />
      <blockquote>"{m.line}"</blockquote>
      {m.from && <figcaption>— {m.from}</figcaption>}
      <p className="meme-punch" dangerouslySetInnerHTML={{ __html: m.punch }} />
    </motion.figure>
  );
}

// Fade + rise into view once, as the user scrolls.
export function Reveal({ as = 'div', children, delay = 0, ...rest }) {
  const M = motion[as];
  return (
    <M initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay, ease: [0.2, 0.7, 0.2, 1] }} {...rest}>{children}</M>
  );
}
