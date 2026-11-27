import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import Prism from 'prismjs';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-sql';
import 'prismjs/themes/prism-tomorrow.css';
import Stepper, { Step } from '../rb/Stepper';
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

// Step-by-step concept walkthrough built on React Bits <Stepper>.
export function Walkthrough({ steps }) {
  const theme = useTheme();
  return (
    <div className="stepper-wrap">
      <Stepper theme={theme} width="100%" accentColor={theme === "light" ? "#e2550a" : "#ff7a3d"} nextButtonText="Next" completeButtonText="Got it"
        completedContent={<div className="done-msg prose"><p><b>Concept clear.</b> Now try the interactive part, then read the exam answer below.</p></div>}>
        {steps.map((s, i) => (
          <Step key={i} title={s.title}><Html className="prose step-body" html={s.body} /></Step>
        ))}
      </Stepper>
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
  en: ['🎯 The idea in one line', '🏠 Real-life story', '📖 Words decoded', '⚙️ How it works', '📝 What to write in the exam', '🧠 Remember it'],
  bhai: ['🎯 Ek line mein', '🏠 Desi example se samjho', '📖 Mushkil words ka matlab', '⚙️ Kaise kaam karta hai', '📝 Exam mein kya likhna hai', '🧠 Yaad rakh'],
  gaali: ['🎯 Seedhi baat, bhosdike', '🏠 Desi example, ab toh samajh ja chutiye', '📖 Bhaari words ka matlab, dictionary mat khol', '⚙️ Kaise chalta hai, dhyan se dekh gadhe', '📝 Exam mein ye chhaap, harami', '🧠 Ratt le ye line, kamine']
};
export function EasyExplain({ e, lang = 'en' }) {
  if (!e?.story) return <BhaiExplain b={e} gaali={lang === 'gaali'} />; // old shape fallback
  const L = EX_LABELS[lang] || EX_LABELS.en;
  const part = (i, cls, body) => (
    <motion.div className={'bx-part ' + cls} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-20px' }} transition={{ duration: 0.35, delay: i * 0.05 }}>
      <div className="bx-h">{L[i]}</div>{body}
    </motion.div>
  );
  return (
    <div className="bx">
      {part(0, 'bx-s', <p className="bx-s">{e.s}</p>)}
      {part(1, 'bx-ex', <p className="bx-body">{e.story}</p>)}
      {e.words?.length > 0 && part(2, 'bx-words', <dl className="bx-dl">{e.words.map(([w, m]) => <div key={w}><dt>{w}</dt><dd>{m}</dd></div>)}</dl>)}
      {e.how?.length > 0 && part(3, 'bx-java', <ol className="bx-how">{e.how.map((h, i) => <li key={i} dangerouslySetInnerHTML={{ __html: h }} />)}</ol>)}
      {part(4, 'bx-exam', <p className="bx-body">{e.exam}</p>)}
      <div className="bx-yaad"><span>{L[5]}</span><b>{e.yaad}</b></div>
    </div>
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
