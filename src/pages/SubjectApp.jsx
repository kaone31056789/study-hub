import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HugeiconsIcon } from '@hugeicons/react';
import { Calendar03Icon, BookOpen01Icon, CardsIcon, Quiz01Icon, File01Icon, Task01Icon, ArrowRight01Icon, Target01Icon, Note01Icon, Menu01Icon, MathIcon, Fire03Icon } from '@hugeicons/core-free-icons';
import Mock from './Mock';
import Cram from './Cram';
import Formulas from './Formulas';
import { AskAI, AudioBar, SyncButton } from '../components/Extras';
import { bumpWeak, weakList, clearWeak, getSrs, gradeCard, getMistakes, noteMistake, dropMistake } from '../progress';
import { stampToday, InkScroll, ShareProgress, Focus, SoundToggle } from '../components/Rituals';
import { sfx, haptic } from '../sound';
import { Brand } from '../components/Logo';
import { ThemeToggle, SkinToggle, useTheme } from '../theme';
import { LangToggle, useLang, useT, desiOf } from '../lang';
import Diagram from '../components/Diagram';
import GradientText from '../rb/GradientText';
import { Html, CodeBlock, MCQ, Walkthrough, Explorer, Reveal, MemeCard, EasyExplain, GaaliCoach } from '../components/ui';
import { BeginnerProse, TermCards } from '../components/Beginner';
import { TapReveal, AsciiFooter, CardArt } from '../components/asciiui';
import { WIDGETS } from '../widgets';
import { store, shuffle } from '../store';
import { InkMist, Ascii } from '../components/canvasfx';
import { SkTabs, SkCheck, SkToggle, SkInput, SkProgress, SkRating, SkTooltip, SkButton, PwHoard, PwSigil, toast, fxHit, fx } from '../components/sakuga';

const UCOL = ['var(--warn)', 'var(--u1)', 'var(--u2)', 'var(--u3)', 'var(--u1)', 'var(--u2)'];

export default function SubjectApp({ meta, view, arg }) {
  const [S, setS] = useState(null);
  const [done, setDone] = useState(() => new Set(store.get(meta.id + ':done', [])));
  useEffect(() => { meta.load().then(m => setS(m.default)); }, [meta]);

  const toggleDone = (id, e) => {
    const adding = !done.has(id);
    const n = new Set(done); adding ? n.add(id) : n.delete(id);
    store.set(meta.id + ':done', [...n]);
    setDone(n);
    if (adding && S) {
      sfx('chime'); haptic(20); stampToday();
      const el = e?.currentTarget;
      // <sakuga-button> plays its own impact; anything else (the tick circles) gets a small hit.
      if (el && el.tagName !== 'SAKUGA-BUTTON') { const r = el.getBoundingClientRect(); fxHit(r.left + r.width / 2, r.top + r.height / 2); }
      const k = S.topics.filter(t => n.has(t.id)).length;
      toast(k === S.topics.length ? 'All topics learned!' : `${k}/${S.topics.length} learned`);
    }
  };

  if (!S) return <><Header meta={meta} view={view} done={0} total={0} /><div className="subj-loading"><PwSigil label={'Loading ' + meta.short} /><p>Opening {meta.short}…</p></div><BottomNav meta={meta} view={view} /></>;
  const lbl = { pyq: 'last year', asked: 'Asked last year', filter: "Last year's", paper: "Last year's paper", paperSub: 'with answers', paperLead: 'Every question from last year, linked to its answer. The 2-mark answers are right here, so tap to reveal them.', ...S.lbl };
  const ctx = { S, meta, done, toggleDone, lbl, byId: Object.fromEntries(S.topics.map(t => [t.id, t])), order: S.plan.flatMap(r => r.ids) };
  const n = S.topics.filter(t => done.has(t.id)).length;

  return (
    <>
      <Header meta={meta} view={view} done={n} total={S.topics.length} />
      {/* Topic changes inside Learn keep the page mounted so the sidebar keeps its scroll position. */}
      <motion.main key={view === 'learn' ? (arg ? 'learn:topic' : 'learn') : view + (arg || '')}initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: [0.2, 0.7, 0.2, 1] }}>
        {view === 'learn' ? (arg ? <Learn ctx={ctx} id={arg} /> : <TopicsIndex ctx={ctx} />)
          : view === 'cards' ? <Cards ctx={ctx} />
          : view === 'quiz' ? <Quiz ctx={ctx} />
          : view === 'paper' ? <Paper ctx={ctx} />
          : view === 'revise' ? <Revise ctx={ctx} />
          : view === 'mock' ? <Mock ctx={ctx} />
          : view === 'cram' ? <Cram ctx={ctx} />
          : view === 'formulas' ? <Formulas ctx={ctx} />
          : view === 'focus' ? <Focus ctx={ctx} />
          : <Plan ctx={ctx} />}
      </motion.main>
      <AsciiFooter title={meta.short} line={meta.name + ' · ' + meta.code + ' · one topic at a time'} />
      <BottomNav meta={meta} view={view} />
    </>
  );
}

function Header({ meta, view, done, total }) {
  return (
    <header className="top">
      <div className="top-in">
        <Brand title={meta.short} sub={meta.code} back />
        <nav className="tabs" aria-label="Sections">
          {TABS.slice(0, MAIN_TABS).map(([k, l]) => (
            <a key={k} href={'#/' + meta.id + '/' + k} className={view === k ? 'on' : ''}>
              {view === k && <motion.span layoutId="tabpill" className="tab-pill" transition={{ type: 'spring', stiffness: 420, damping: 34 }} />}
              <span className="tab-txt">{l}</span>
            </a>
          ))}
          <TabMore meta={meta} view={view} />
        </nav>
        <div className="prog"><span>{done}/{total} done</span><div className="bar"><i style={{ width: total ? (done / total) * 100 + '%' : 0 }} /></div></div>
        <LangToggle />
        <SyncButton />
        <SoundToggle /><SkinToggle /><ThemeToggle />
      </div>
    </header>
  );
}

// the last four sit under "More" in the header; Cram is still reachable by link but has no tab
const MAIN_TABS = 5;
function TabMore({ meta, view }) {
  const [open, setOpen] = useState(false);
  const extra = TABS.slice(MAIN_TABS), cur = extra.find(([k]) => k === view);
  useEffect(() => setOpen(false), [view]);
  useEffect(() => {
    if (!open) return;
    const off = e => { if (!e.target.closest?.('.tab-more')) setOpen(false); };
    const esc = e => e.key === 'Escape' && setOpen(false);
    addEventListener('pointerdown', off); addEventListener('keydown', esc);
    return () => { removeEventListener('pointerdown', off); removeEventListener('keydown', esc); };
  }, [open]);
  return (
    <div className="tab-more">
      <button className={'tab-more-btn' + (cur ? ' on' : '')} onClick={() => setOpen(o => !o)} aria-expanded={open} aria-haspopup="menu">
        {cur && <motion.span layoutId="tabpill" className="tab-pill" transition={{ type: 'spring', stiffness: 420, damping: 34 }} />}
        <span className="tab-txt">{cur ? cur[1] : 'More'}</span>
        <svg className={'tm-arrow' + (open ? ' up' : '')} width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div className="tab-more-menu" role="menu" initial={{ opacity: 0, y: -6, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -4, scale: 0.98 }} transition={{ duration: 0.16, ease: [0.23, 1, 0.32, 1] }}>
            {extra.map(([k, l, icon]) => (
              <a key={k} role="menuitem" href={'#/' + meta.id + '/' + k} className={view === k ? 'on' : ''}><HugeiconsIcon icon={icon} size={17} strokeWidth={1.8} />{l}</a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const TABS = [['plan', 'Plan', Calendar03Icon], ['learn', 'Learn', BookOpen01Icon], ['revise', 'Revise', Task01Icon], ['mock', 'Mock', Target01Icon], ['cards', 'Cards', CardsIcon], ['quiz', 'Quiz', Quiz01Icon], ['paper', 'PYQ', File01Icon], ['formulas', 'Formulas', MathIcon], ['focus', 'Focus', Fire03Icon]];
const SHORT = { plan: 'Plan', learn: 'Learn', revise: 'Revise', mock: 'Mock', cram: 'Cram', cards: 'Cards', quiz: 'Quiz', paper: 'PYQ', formulas: 'Formulas', focus: 'Focus' };
const PRIMARY = ['plan', 'learn', 'revise', 'mock'];

// Phone tab bar (shown under 760px via CSS)
function BottomNav({ meta, view }) {
  const [more, setMore] = useState(false);
  useEffect(() => setMore(false), [view]);
  const inMore = !PRIMARY.includes(view);
  return (
    <>
      <nav className="bottom-nav" aria-label="Sections">
        {TABS.filter(([k]) => PRIMARY.includes(k)).map(([k, , icon]) => (
          <a key={k} href={'#/' + meta.id + '/' + k} className={view === k ? 'on' : ''} aria-current={view === k ? 'page' : undefined}>
            {view === k && <motion.span layoutId="bnpill" className="bn-pill" transition={{ type: 'spring', stiffness: 420, damping: 34 }} />}
            <HugeiconsIcon icon={icon} size={22} strokeWidth={1.8} />
            <span>{SHORT[k]}</span>
          </a>
        ))}
        <button className={inMore ? 'on' : ''} onClick={() => setMore(m => !m)} aria-expanded={more} aria-label="More sections">
          {inMore && <motion.span layoutId="bnpill" className="bn-pill" transition={{ type: 'spring', stiffness: 420, damping: 34 }} />}
          <HugeiconsIcon icon={Menu01Icon} size={22} strokeWidth={1.8} />
          <span>{inMore ? SHORT[view] || 'More' : 'More'}</span>
        </button>
      </nav>
      <AnimatePresence>
        {more && (
          <motion.div className="sheet-bg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMore(false)}>
            <motion.div className="more-sheet" initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', stiffness: 340, damping: 32 }} onClick={e => e.stopPropagation()}>
              {TABS.filter(([k]) => !PRIMARY.includes(k)).map(([k, l, icon]) => (
                <a key={k} href={'#/' + meta.id + '/' + k} className={view === k ? 'on' : ''}><HugeiconsIcon icon={icon} size={22} strokeWidth={1.8} /><span>{l}</span></a>
              ))}
              <a href="#/"><HugeiconsIcon icon={Calendar03Icon} size={22} strokeWidth={1.8} /><span>All subjects</span></a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

const metaLine = t => (t.unit ? 'Unit ' + t.unit + ' · ' + t.marks + ' marks' : 'Foundation · read this first');
const plain = h => (h || '').replace(/<[^>]+>/g, ' ').replace(/&[a-z]+;/g, ' ').replace(/\s+/g, ' ').trim();
const clip = (txt, n) => (txt.length > n ? txt.slice(0, n).replace(/\s\S*$/, '') + '…' : txt);

function Ring({ value, size = 92, stroke = 8 }) {
  const r = (size - stroke) / 2, c = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} viewBox={'0 0 ' + size + ' ' + size} aria-hidden="true">
      <circle cx={size / 2} cy={size / 2} r={r} stroke="var(--surface-3)" strokeWidth={stroke} fill="none" />
      <motion.circle cx={size / 2} cy={size / 2} r={r} stroke="var(--accent)" strokeWidth={stroke} fill="none" strokeLinecap="round"
        strokeDasharray={c} initial={{ strokeDashoffset: c }} animate={{ strokeDashoffset: c * (1 - value) }}
        transition={{ duration: 1, ease: [0.2, 0.7, 0.2, 1] }} transform={'rotate(-90 ' + size / 2 + ' ' + size / 2 + ')'} />
    </svg>
  );
}

function Check({ ctx, id }) {
  const d = ctx.done.has(id);
  return (
    <motion.button className={'check' + (d ? ' on' : '')} whileTap={{ scale: 0.8 }} onClick={e => { e.preventDefault(); ctx.toggleDone(id, e); }}
      aria-label={d ? 'Mark as not learned' : 'Mark as learned'} title={d ? 'Learned (click to undo)' : 'Mark as learned'}>
      {d ? '✓' : ''}
    </motion.button>
  );
}

function TopicRow({ ctx, id, i = 0 }) {
  const t = ctx.byId[id]; if (!t) return null;
  const d = ctx.done.has(id);
  const href = '#/' + ctx.meta.id + '/learn/' + id;
  return (
    <motion.div className={'row' + (d ? ' done' : '')}
      initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.35, delay: Math.min(i, 12) * 0.035, ease: [0.2, 0.7, 0.2, 1] }}>
      <Check ctx={ctx} id={id} />
      <a className="row-main" href={href}>
        <span className="row-title">{t.title}</span>
        <span className="row-meta">{metaLine(t)}{t.pyq && <> · <span className="pyq-txt">{ctx.lbl.asked.toLowerCase()}</span></>}{(t.widget || t.explore) && <> · simulator</>}</span>
      </a>
      <span className="row-time">{t.mins} min</span>
      <a className="row-go" href={href} tabIndex={-1} aria-hidden="true">→</a>
    </motion.div>
  );
}

/* ---------------- PLAN ---------------- */
function Plan({ ctx }) {
  const { S, meta, done, byId, order } = ctx;
  const theme = useTheme();
  const lang = useLang();
  const light = theme === 'light';
  const nextId = order.find(id => !done.has(id));
  const total = S.topics.length;
  const n = S.topics.filter(t => done.has(t.id)).length;
  const minsLeft = S.topics.filter(t => !done.has(t.id)).reduce((m, t) => m + (t.mins || 0), 0);
  const nt = nextId && byId[nextId];
  return (
    <div className="wrap">
      <InkMist off={light}>
        <h1 className="page-h"><GradientText colors={light ? ['#c2410c', '#e2550a', '#7c3aed', '#c2410c'] : ['#e9e2d4', '#9a9184', '#d9452b', '#e9e2d4']} animationSpeed={6}>{(lang === 'gaali' && S.hero.titleGaali) || (lang !== 'en' && S.hero.titleBhai) || S.hero.title}</GradientText></h1>
        <p className="lead">{(lang === 'gaali' && S.hero.textGaali) || (lang !== 'en' && S.hero.textBhai) || S.hero.text}</p>
      </InkMist>

      {total > 0 && n === total && <Ascii piece="empty-all-caught-up" size={7} look="" mono={false} caption="Everything learned. Now revise and take a mock." />}
      <section className="plan-top">
        <Reveal className="card plan-progress">
          <div className="ring-wrap big"><Ring value={total ? n / total : 0} /><span>{total ? Math.round((n / total) * 100) : 0}%</span></div>
          <div className="pp-body">
            <b>{n} of {total} topics learned</b>
            <span className="muted">{minsLeft ? '≈ ' + Math.floor(minsLeft / 60) + 'h ' + (minsLeft % 60) + 'm of study left' : 'Everything covered. Time to revise!'}</span>
            <div className="unit-bars">
              {Object.entries(S.units).map(([u, name]) => {
                const ut = S.topics.filter(t => t.unit === +u), ud = ut.filter(t => done.has(t.id)).length;
                return (
                  <a key={u} className="unit-bar" href={'#/' + meta.id + '/learn'} title={name}>
                    <span>{+u ? 'U' + u : 'Start'}</span>
                    <div className="bar"><i style={{ width: ut.length ? (ud / ut.length) * 100 + '%' : 0, background: UCOL[u] }} /></div>
                    <small>{ud}/{ut.length}</small>
                  </a>
                );
              })}
            </div>
          </div>
        </Reveal>
        {nt ? (
          <Reveal delay={0.06}>
            <a className="card next-up" data-portal href={'#/' + meta.id + '/learn/' + nextId}>
              <span className="eyebrow">Up next</span>
              <b>{nt.title}</b>
              <p>{clip(desiOf(nt, lang)?.s || plain(nt.simple), 150)}</p>
              <span className="next-up-meta">{metaLine(nt)} · {nt.mins} min</span>
              <span className="btn primary">{n ? 'Continue' : 'Start'} this topic <HugeiconsIcon icon={ArrowRight01Icon} size={16} /></span>
            </a>
          </Reveal>
        ) : (
          <Reveal delay={0.06}><a className="card next-up" href={'#/' + meta.id + '/revise'}><span className="eyebrow">All done</span><b>Switch to revision</b><p>Go through the revision sheet in Test-me mode, then take a quiz.</p><span className="btn ok">Open Revise →</span></a></Reveal>
        )}
      </section>

      <section className="plan-scroll">
        <InkScroll done={n} total={total} />
        <div className="plan-share"><ShareProgress meta={meta} done={n} total={total} /><a className="btn" href={'#/' + meta.id + '/focus'}>Focus timer</a></div>
      </section>

      <WeakCard ctx={ctx} />

      <div className="quick">
        <a href={'#/' + meta.id + '/mock'}><HugeiconsIcon icon={Target01Icon} size={18} /><b>Mock test</b><small>AI checks your answers</small></a>
        <a href={'#/' + meta.id + '/learn'}><HugeiconsIcon icon={BookOpen01Icon} size={18} /><b>All topics</b><small>browse & tick off</small></a>
        <a href={'#/' + meta.id + '/revise'}><HugeiconsIcon icon={Task01Icon} size={18} /><b>Revise</b><small>key points per topic</small></a>
        <a href={'#/' + meta.id + '/cards'}><HugeiconsIcon icon={CardsIcon} size={18} /><b>Flashcards</b><small>{S.cards.length} cards</small></a>
        <a href={'#/' + meta.id + '/quiz'}><HugeiconsIcon icon={Quiz01Icon} size={18} /><b>Quiz</b><small>10 random questions</small></a>
        <a href={'#/' + meta.id + '/paper'}><HugeiconsIcon icon={File01Icon} size={18} /><b>{ctx.lbl.paper}</b><small>{ctx.lbl.paperSub}</small></a>
      </div>

      <details className="card pattern">
        <summary><b>{S.pattern.title}</b><span className="muted">tap to see</span></summary>
        <p className="muted" style={{ margin: '10px 0 0' }}>{S.pattern.note}</p>
        <div className="pattern-grid">{S.pattern.boxes.map(([bx, tx]) => <div key={bx}><b>{bx}</b>{tx}</div>)}</div>
      </details>

      <div className="rounds">
        {S.plan.map((r, i) => {
          const rd = r.ids.filter(id => done.has(id)).length;
          return (
            <section className={'round' + (rd === r.ids.length ? ' complete' : '')} key={i}>
              <div className="round-head">
                <span className="round-no">{rd === r.ids.length ? '✓' : i + 1}</span>
                <div className="round-title"><h2>{r.title}</h2><span className="muted">{r.time} · {rd}/{r.ids.length} done</span></div>
              </div>
              <p className="muted round-why">{r.why}</p>
              <div className="rows">{r.ids.map((id, j) => <TopicRow key={id} ctx={ctx} id={id} i={j} />)}</div>
            </section>
          );
        })}
        <section className="round">
          <div className="round-head"><span className="round-no">{S.plan.length + 1}</span><div className="round-title"><h2>Final revision</h2><span className="muted">≈ 30 min</span></div></div>
          <p className="muted round-why">Revise sheet in Test-me mode, every flashcard once, then two quizzes. Re-open any topic you get wrong.</p>
          <div className="cta"><a className="btn" href={'#/' + meta.id + '/revise'}>Revise sheet</a><a className="btn" href={'#/' + meta.id + '/cards'}>Flashcards</a><a className="btn" href={'#/' + meta.id + '/quiz'}>Quiz</a></div>
        </section>
      </div>

      <section className="card tips">
        <h3>How to write theory answers that score</h3>
        <ol>{S.tips.map((t, i) => <li key={i} dangerouslySetInnerHTML={{ __html: t }} />)}</ol>
        <Ascii piece="koi-pond-ripples" size={6} caption="Breathe. One topic at a time." />
      </section>
    </div>
  );
}

function WeakCard({ ctx }) {
  const { meta, byId } = ctx;
  const [w, setW] = useState(() => weakList(meta.id).filter(([id]) => byId[id]).slice(0, 6));
  if (!w.length) return null;
  const max = w[0][1];
  return (
    <Reveal className="card weak-card">
      <div className="weak-head"><b>Revise these first</b></div>
      <p className="muted" style={{ margin: '2px 0 10px', fontSize: 14 }}>From your wrong quiz answers and mock scores.</p>
      {w.map(([id, v]) => (
        <a key={id} className="weak-row" href={'#/' + meta.id + '/learn/' + id}>
          <span>{byId[id].title}</span>
          <div className="bar"><i style={{ width: (v / max) * 100 + '%', background: 'var(--bad)' }} /></div>
        </a>
      ))}
      {/* the card goes after the dragon has finished scorching it */}
      <div className="pw-hoard"><PwHoard label="Hold to clear list" doneLabel="Cleared" onDelete={() => { clearWeak(meta.id); setTimeout(() => setW([]), 1600); }} /></div>
    </Reveal>
  );
}

/* ---------------- ALL TOPICS (learn hub) ---------------- */
function TopicsIndex({ ctx }) {
  const { S, meta, done } = ctx;
  const lang = useLang();
  const preview = t => desiOf(t, lang)?.s || plain(t.simple);
  const [f, setF] = useState('all');
  const [q, setQ] = useState('');
  const FILTERS = [['all', 'All', () => true], ['todo', 'To do', t => !done.has(t.id)], ['pyq', ctx.lbl.filter, t => t.pyq], ['done', 'Done', t => done.has(t.id)]];
  const test = FILTERS.find(x => x[0] === f)[2];
  const match = t => test(t) && (!q || (t.title + ' ' + plain(t.q) + ' ' + plain(t.simple)).toLowerCase().includes(q.toLowerCase()));
  const shown = S.topics.filter(match);
  return (
    <div className="wrap wide">
      <p className="eyebrow">Learn</p>
      <h1 className="page-h">All topics</h1>
      <p className="lead">Every topic in one place. Open one to learn it, or tick the circle when you're done.</p>
      <div className="ti-bar">
        <SkTabs label="Show topics" value={f} onChange={setF} options={FILTERS.map(([k, l, fn]) => [k, `${l} ${S.topics.filter(fn).length}`])} />
        <div className="ti-search"><SkInput label="Search topics" placeholder="Search topics, e.g. thread, JSP, @Entity" value={q} onChange={setQ} /></div>
      </div>
      {shown.length === 0 && <Ascii piece="empty-no-results" size={7} look="" mono={false} caption="No topics match. Try another filter." />}
      {Object.entries(S.units).map(([u, name]) => {
        const list = S.topics.filter(t => t.unit === +u && match(t));
        if (!list.length) return null;
        const ut = S.topics.filter(t => t.unit === +u), ud = ut.filter(t => done.has(t.id)).length;
        return (
          <section key={u} className="unit-sec">
            <div className="unit-sec-head">
              <span className="dot" style={{ background: UCOL[u] }} />
              <h2>{+u ? 'Unit ' + u + ' · ' + name : name}</h2>
              <span className="muted">{ud}/{ut.length} learned</span>
              <div className="bar"><i style={{ width: (ud / ut.length) * 100 + '%', background: UCOL[u] }} /></div>
            </div>
            <div className="topic-grid">
              {list.map((t, i) => {
                const d = done.has(t.id), href = '#/' + meta.id + '/learn/' + t.id;
                return (
                  <motion.div key={t.id} className={'tcard' + (d ? ' done' : '')} style={{ '--uc': UCOL[t.unit] }}
                    initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-20px' }}
                    transition={{ duration: 0.35, delay: Math.min(i, 8) * 0.04 }} whileHover={{ y: -3 }}>
                    <div className="tcard-top">
                      <span className="tag">{t.unit ? t.marks + ' marks' : 'start here'}</span>
                      {t.pyq && <span className="tag pyq">{ctx.lbl.pyq}</span>}
                      <span style={{ flex: 1 }} />
                      <Check ctx={ctx} id={t.id} />
                    </div>
                    <a className="tcard-link" href={href}>
                      <b>{t.title}</b>
                      <p>{clip(preview(t), 120)}</p>
                    </a>
                    <div className="tcard-foot">
                      <span>{t.mins} min{(t.widget || t.explore) ? ' · simulator' : ''}{t.dg ? ' · diagram' : ''}</span>
                      <a href={href}>{d ? 'Review' : 'Open'} →</a>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}

/* ---------------- LEARN ---------------- */
function Learn({ ctx, id }) {
  const { S, meta, done, byId, order, toggleDone } = ctx;
  const T = useT();
  const lang = useLang();
  const t = byId[id] || byId[order.find(x => !done.has(x)) || order[0]];
  const [q, setQ] = useState('');
  const wide = typeof window !== 'undefined' && window.innerWidth > 960;
  const idx = order.indexOf(t.id), next = order[idx + 1], prev = order[idx - 1];
  const W = t.widget && WIDGETS[t.widget];
  const sideRef = useRef();
  // Keep the current topic visible in the sidebar (e.g. after Next/Prev) without moving the page.
  useEffect(() => {
    const side = sideRef.current, el = side?.querySelector('.side-item.on');
    if (!el) return;
    for (const box of [side, side.querySelector('.side-body')]) {
      if (!box || box.scrollHeight <= box.clientHeight) continue;
      const r = el.getBoundingClientRect(), b = box.getBoundingClientRect();
      if (r.top < b.top || r.bottom > b.bottom) box.scrollTop += r.top - b.top - b.height / 3;
    }
  }, [t.id]);
  let n = 0;
  const sec = (title, sub, children) => (
    <Reveal as="section" className="sec" key={title}><h2><span className="n">{++n}</span>{title}</h2>{sub && <p className="sub">{sub}</p>}{children}</Reveal>
  );

  return (
    <div className="learn">
      <aside className="side" ref={sideRef}>
        <details className="side-wrap" open={wide} onClick={e => { if (!wide && e.target.closest('.side-item')) e.currentTarget.open = false; }}>
          <summary>All topics ({S.topics.length})</summary>
          <div className="side-body">
            <input type="search" placeholder="Search topics…" aria-label="Search topics" value={q} onChange={e => setQ(e.target.value)} />
            {Object.entries(S.units).map(([u, name]) => {
              const all = S.topics.filter(x => x.unit === +u), list = all.filter(x => !q || (x.title + ' ' + x.q).toLowerCase().includes(q.toLowerCase()));
              if (!list.length) return null;
              const ud = all.filter(x => done.has(x.id)).length;
              return (
                <div key={u} className="side-unit" style={{ '--uc': UCOL[u] }}>
                  <div className="unit-h">
                    <span className="unit-no">{+u ? u : '★'}</span>
                    <span className="unit-name">{+u ? 'Unit ' + u : name}<small>{+u ? name : 'foundation'}</small></span>
                    <span className="unit-count">{ud}/{all.length}</span>
                    <span className="unit-ascii" aria-hidden="true" style={{ '--p': ud / all.length }} />
                  </div>
                  {list.map((x, xi) => (
                    <a key={x.id} data-tree={xi === list.length - 1 ? '└─' : '├─'} className={'side-item' + (x.id === t.id ? ' on' : '') + (done.has(x.id) ? ' done' : '')} href={`#/${meta.id}/learn/${x.id}`}>
                      <span className="mk" aria-label={done.has(x.id) ? 'learned' : undefined}>{done.has(x.id) ? '✓' : String(S.topics.indexOf(x) + 1).padStart(2, '0')}</span>
                      <span className="si-t">{x.title}</span>
                      {x.pyq && <span className="si-pyq" title={ctx.lbl.asked + ' · ' + x.pyq}>{ctx.lbl.pyq}</span>}
                    </a>
                  ))}
                </div>
              );
            })}
          </div>
        </details>
      </aside>

      <article className="topic" key={t.id}>
        <a className="back-link" href={`#/${meta.id}/learn`}>{T('allTopics')}</a>
        <div className="crumb" style={{ color: UCOL[t.unit] }}>{t.unit ? 'Unit ' + t.unit + ' · ' : ''}{S.units[t.unit]}</div>
        <motion.h1 initial={{ opacity: 0, y: 10, filter: 'blur(8px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ duration: 0.55, ease: [0.2, 0.7, 0.2, 1] }}>{t.title}</motion.h1>
        <div className="tags">
          <span className="tag">{t.unit ? t.marks + ' marks' : 'foundation'}</span><span className="tag">≈ {t.mins} min</span>
          {t.pyq && <span className="tag pyq">{ctx.lbl.asked} · {t.pyq}</span>}
          {t.imp && <span className="tag imp">On your important list</span>}
        </div>
        {lang === 'gaali' && <GaaliCoach id={t.id} />}
        <div className="qbox"><small>Exam question</small><span dangerouslySetInnerHTML={{ __html: t.q }} /></div>
        <AudioBar key={t.id + lang} label={lang === 'en' ? '🔊 Listen to this topic' : '🔊 Topic suno'} parts={() => {
          const d = desiOf(t, lang);
          return [t.title + '.', ...(d ? [d.s, d.ex, d.java, d.yaad] : [t.simple]), ...(t.rev || []), t.short || '', t.meme ? t.meme.line + '. ' + t.meme.punch : ''];
        }} />
        <AskAI topic={t.title} context={(t.rev || []).join(' ').replace(/<[^>]+>/g, '') + ' ' + (t.simple || '').replace(/<[^>]+>/g, '')} />

        {sec(T('idea'), lang === 'gaali' ? 'Pehle concept samajh, phir exam wala answer neeche English mein hai. Aur sun bhosdike, ye gaaliyan exam mein mat likh dena.' : lang === 'bhai' ? 'Pehle concept samjho. Exam wala answer neeche English mein hai.' : (S.ideaSub?.en || 'No Java knowledge needed. Read this first, the exam answer is further down.'), <>{desiOf(t, lang) ? <EasyExplain e={desiOf(t, lang)} lang={lang} /> : <Html className="prose simple" html={t.simple} />}{t.meme && <MemeCard m={t.meme} unit={t.unit} id={t.id} />}</>)}
        {(lang !== 'en' ? t.bhaiLearn || t.learn : t.learn) && sec(T('steps'), T('stepsSub'), <Walkthrough key={lang} steps={lang !== 'en' ? t.bhaiLearn || t.learn : t.learn} />)}
        {(W || t.explore) && (
          sec(T('try'), T('trySub'), <>
            {W && <W />}
            {t.explore && <div style={{ marginTop: W ? 14 : 0 }}><Explorer items={t.explore} title={t.exploreTitle} /></div>}
          </>)
        )}
        {t.short && sec(T('short'), T('shortSub'), <BeginnerProse className="prose short" html={t.short} topic={t.title} lang={lang} />)}
        {sec(T('answer'), T('answerSub'), <BeginnerProse html={t.answer} topic={t.title} lang={lang} />)}
        {(t.dg || t.diagram) && sec(T('diagram'), T('diagramSub'), t.dg ? <Diagram spec={t.dg} /> : <pre className="diagram">{t.diagram}</pre>)}
        {t.code?.length > 0 && sec(T('code'), T('codeSub'), t.code.map((c, i) => <CodeBlock key={i} {...c} />))}
        {t.trick && sec(T('trick'), null, <Html className="trick" html={t.trick} />)}
        {t.quiz?.length > 0 && sec(T('check'), null, t.quiz.map((x, i) => <MCQ key={t.id + i} q={x} onAnswer={ok => bumpWeak(meta.id, t.id, ok ? -0.5 : 1)} />))}

        <div className="actions">
          <SkButton key={t.id} done={done.has(t.id)} onClick={e => toggleDone(t.id, e)}>{done.has(t.id) ? T('learned').replace(/^✓ /, '') : T('markDone')}</SkButton>
          {prev && <a className="btn" href={`#/${meta.id}/learn/${prev}`}>← Previous</a>}
          {next ? <a className="btn" href={`#/${meta.id}/learn/${next}`}>Next: {byId[next].title} →</a> : <a className="btn" href={`#/${meta.id}/cards`}>Revise with flashcards →</a>}
        </div>
        <Confidence sid={meta.id} id={t.id} key={'c' + t.id} />
        <TermCards scope=".topic" glossary={S.glossary} />
      </article>
    </div>
  );
}

// Self-rated confidence per topic. Low stars push the topic up "Revise these first"; high stars pull it down.
function Confidence({ sid, id }) {
  const [v, setV] = useState(() => store.get(sid + ':conf', {})[id] || 0);
  const rate = n => {
    const all = store.get(sid + ':conf', {});
    if (n) all[id] = n; else delete all[id];
    store.set(sid + ':conf', all);
    if (n) bumpWeak(sid, id, n <= 2 ? 1 : n >= 4 ? -0.5 : 0);
    setV(n);
  };
  return (
    <div className="confidence">
      <span>How sure are you about this topic?</span>
      <SkRating label="Confidence" value={v} onChange={rate} />
    </div>
  );
}

/* ---------------- FLASHCARDS ---------------- */
// ASCII Magic scene behind the flashcard deck, one per unit
const UNIT_ART = ['ink-in-water', 'spiral-galaxy', 'koi-pond-ripples', 'sea-torii-sunset'];
function Cards({ ctx }) {
  const { S, meta } = ctx;
  const all = useMemo(() => S.cards.map(([u, q, a]) => ({ u, q, a })), [S]);
  const [unit, setUnit] = useState('all');
  const [deck, setDeck] = useState(all);
  const [i, setI] = useState(0);
  const [flip, setFlip] = useState(false);
  const [srs, setSrs] = useState(() => getSrs(meta.id));
  const [smart, setSmart] = useState(true);
  const known = { has: q => (srs[q]?.box || 0) >= 1 };
  // Smart order: cards due now first (oldest first), then new cards, then ones not due yet.
  const order = (list, s = srs) => {
    const now = Date.now();
    const rank = x => (s[x.q] ? (s[x.q].due <= now ? 0 : 2) : 1);
    return [...list].sort((a, b) => rank(a) - rank(b) || (s[a.q]?.due || 0) - (s[b.q]?.due || 0));
  };
  useEffect(() => { setDeck(d => order(d)); }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const c = deck[i];
  const now = Date.now();
  const dueN = deck.filter(x => srs[x.q] && srs[x.q].due <= now).length;
  const newN = deck.filter(x => !srs[x.q]).length;

  const [fixN] = useState(() => getMistakes(meta.id).length);
  const pickUnit = u => { setUnit(u); const d = u === 'fix' ? getMistakes(meta.id).map(m => ({ ...m, fix: true })) : all.filter(x => u === 'all' || x.u === u); setDeck(smart && u !== 'fix' ? order(d) : d); setI(0); setFlip(false); };
  const move = d => { setFlip(false); setI(x => (x + d + deck.length) % deck.length); };
  const mark = k => { if (c.fix) { if (k) dropMistake(meta.id, c.q); } else setSrs(gradeCard(meta.id, c.q, k)); stampToday(); move(1); };
  useEffect(() => {
    const on = e => {
      if (/INPUT|TEXTAREA|SAKUGA-/.test(e.target.tagName)) return; // sakuga controls own their arrow/space keys
      if (e.key === ' ') { e.preventDefault(); sfx('flip'); setFlip(f => !f); }
      else if (e.key === 'ArrowRight') move(1);
      else if (e.key === 'ArrowLeft') move(-1);
    };
    window.addEventListener('keydown', on);
    return () => window.removeEventListener('keydown', on);
  });

  return (
    <div className="wrap narrow">
      <div className="page-ascii"><Ascii piece="black-hole" size={5} look="dots" /></div>
      <p className="eyebrow">Quick revision</p>
      <h1 className="page-h">Flashcards</h1>
      <p className="lead">Answer in your head, then flip to check. Cards you know come back later (10 min → 1 → 3 → 7 → 15 days); the ones you miss come back soon. Keys: <kbd>Space</kbd> flip · <kbd>←</kbd> <kbd>→</kbd> move.</p>
      <div className="srs-stats"><span><b>{dueN}</b> due now</span><span><b>{newN}</b> new</span><span><b>{deck.length - dueN - newN}</b> scheduled</span>
        <span className="sk-row"><SkCheck checked={smart} onChange={on => { setSmart(on); setDeck(on ? order(deck) : all.filter(x => unit === 'all' || x.u === unit)); setI(0); }}>Smart order</SkCheck>
          <SkTooltip label="What is smart order?" text="Cards due for review come first, then new ones. Cards you already know wait until their day comes." /></span></div>
      <div className="sk-seg"><SkTabs label="Unit" value={unit} onChange={pickUnit} options={[...['all', ...Object.keys(S.units).map(Number)].map(u => [u, u === 'all' ? 'All' : 'Unit ' + u]), ...(fixN ? [['fix', 'Fix these · ' + fixN]] : [])]} /></div>
      {c && (
        <>
          <div className="flash-stage">
          <AnimatePresence mode="wait">
            <motion.div key={UNIT_ART[c.u % UNIT_ART.length]} className="flash-scene" aria-hidden="true"
              initial={{ opacity: 0, scale: 0.96, filter: 'blur(6px)' }} animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }} exit={{ opacity: 0, scale: 1.03, filter: 'blur(6px)' }} transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}>
              <Ascii piece={UNIT_ART[c.u % UNIT_ART.length]} size={5} look="dots" />
            </motion.div>
          </AnimatePresence>
          {[-2, -1, 1, 2].map(o => { const k = i + o; if (k < 0 || k >= deck.length) return null; return (
            <motion.button key={k} className="flash-ghost" onClick={() => move(o)} aria-label={'Go to card ' + (k + 1)} tabIndex={-1}
              initial={{ opacity: 0 }} animate={{ x: o * 210, y: o * 54, rotate: o * 13, scale: 1 - Math.abs(o) * 0.16, opacity: 1 - Math.abs(o) * 0.32 }}
              transition={{ type: 'spring', stiffness: 260, damping: 26 }} style={{ zIndex: 3 - Math.abs(o) }}>
              <span className="fg-n">{String(k + 1).padStart(2, '0')}</span><span dangerouslySetInnerHTML={{ __html: deck[k].q }} />
            </motion.button>); })}
          <motion.div key={i} className={'flash' + (flip ? ' flipped' : '')} tabIndex={0} role="button" aria-label="Flip card (swipe to move)"
            drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={0.6}
            onDragEnd={(e, info) => { if (info.offset.x < -80) move(1); else if (info.offset.x > 80) move(-1); }}
            initial={{ opacity: 0, x: 30, scale: 0.97 }} animate={{ opacity: 1, x: 0, scale: 1 }} transition={{ type: 'spring', stiffness: 320, damping: 30 }}
            onClick={e => { fx.swish(e.currentTarget); sfx('flip'); haptic(8); setFlip(f => !f); }}>
            <div className="flash-inner">
              <div className="face front">
                <span className="face-tag">{c.fix ? <>Fix this · you missed it in a quiz</> : <>Unit {c.u} · Question{known.has(c.q) && <span className="known"> · known</span>}</>}</span>
                <div className="face-q" dangerouslySetInnerHTML={{ __html: c.q }} />
                <CardArt text={c.q} />
                <span className="face-hint">Tap to flip · swipe for next</span>
              </div>
              <div className="face back"><span className="face-tag">Answer</span><div className="face-a" dangerouslySetInnerHTML={{ __html: flip ? c.a : '' }} />
                {flip && <div className="back-art" key={i}><Ascii piece={UNIT_ART[(c.u + 1) % UNIT_ART.length]} size={8} look="dots" className="back-bg" /><span>┌─ picture it</span><CardArt text={c.q + ' ' + c.a} /></div>}</div>
            </div>
          </motion.div>
          </div>
          <div className="flash-pager">
            <button onClick={() => move(-1)} aria-label="Previous">‹</button>
            <span className="fp-dots" aria-hidden="true">{Array.from({ length: Math.min(7, deck.length) }, (_, d) => { const k = Math.max(0, Math.min(deck.length - 7, i - 3)) + d; return <i key={k} className={k === i ? 'on' : ''} />; })}</span>
            <span className="fp-n">{String(i + 1).padStart(2, '0')}/{deck.length}</span>
            <button onClick={() => move(1)} aria-label="Next">›</button>
          </div>
          <div className="flash-bar">
            <button className="btn" onClick={() => mark(false)}>Still learning</button>
            <button className="btn ok" onClick={() => mark(true)}>I know this ✓</button>
          </div>
          <div className="flash-foot">
            <button className="linkbtn" onClick={() => { setDeck(shuffle(deck)); setI(0); setFlip(false); }}>Shuffle deck</button>
            <span className="muted">{deck.filter(x => known.has(x.q)).length} of {deck.length} known</span>
          </div>
        </>
      )}
    </div>
  );
}

/* ---------------- QUIZ ---------------- */
function Quiz({ ctx }) {
  const { S, meta } = ctx;
  const [qz, setQz] = useState(null);
  const [answered, setAnswered] = useState(false);
  const total = S.topics.reduce((s, t) => s + (t.quiz?.length || 0), 0);

  const start = u => {
    const pool = S.topics.filter(t => u === 'all' || t.unit === u).flatMap(t => (t.quiz || []).map(q => ({ ...q, tid: t.id })));
    setQz({ qs: shuffle(pool).slice(0, 10), i: 0, score: 0, wrong: [], u });
    setAnswered(false);
  };

  if (!qz) return (
    <div className="wrap narrow">
      <div className="page-ascii"><ascii-art piece="starfield-warp" size="5" /></div>
      <p className="eyebrow">Test yourself</p><h1 className="page-h">Quiz</h1>
      <p className="lead">10 random questions from a bank of {total}. You see why after each answer, and which topics to revise at the end.</p>
      <div className="quiz-start">
        {['all', ...Object.keys(S.units).map(Number)].map(u => (
          <button key={u} className={'btn' + (u === 'all' ? ' primary' : '')} onClick={() => start(u)}>{u === 'all' ? 'All units' : `Unit ${u} · ${S.units[u]}`}</button>
        ))}
      </div>
    </div>
  );

  if (qz.i >= qz.qs.length) {
    const pct = Math.round((qz.score / qz.qs.length) * 100);
    const wt = [...new Set(qz.wrong.map(q => q.tid))];
    return (
      <div className="wrap narrow">
        <p className="eyebrow">Result</p>
        <div className="score-big" ref={el => { if (el && !el.dataset.fx) { el.dataset.fx = 1; requestAnimationFrame(() => fx.boom(el)); } }}><GradientText colors={pct >= 80 ? ['#4cc777', '#9be15d', '#4cc777'] : ['#ff7a3d', '#ffb38a', '#ff7a3d']}>{qz.score}/{qz.qs.length}</GradientText></div>
        {pct >= 80 && <Ascii piece="empty-task-confetti" size={7} look="" mono={false} />}
        <p>{pct >= 80 ? 'Solid. You know these well.' : pct >= 50 ? 'Getting there. Revisit the topics below.' : 'Go back over the topics below, then try again.'}</p>
        {qz.wrong.length > 0 && <p className="muted">{qz.wrong.length} missed {qz.wrong.length === 1 ? 'question is' : 'questions are'} now in <a href={`#/${meta.id}/cards`}>Cards → Fix these</a>, so they come back until you get them.</p>}
        {wt.length > 0 && <><h3>Revise these</h3><div className="rows">{wt.map(id => <TopicRow key={id} ctx={ctx} id={id} />)}</div></>}
        <div className="cta"><button className="btn primary" onClick={() => start(qz.u)}>New quiz</button><button className="btn" onClick={() => setQz(null)}>Change unit</button><a className="btn" href={`#/${meta.id}/cards`}>Flashcards</a></div>
      </div>
    );
  }

  const q = qz.qs[qz.i];
  return (
    <div className="wrap narrow">
      <div className="qz-top"><span>Question {qz.i + 1} of {qz.qs.length}</span><span>Score {qz.score}</span></div>
      <div className="sk-progress"><SkProgress label="Quiz progress" value={(qz.i + (answered ? 1 : 0)) / qz.qs.length} /></div>
      <MCQ key={qz.i} q={q} big onAnswer={ok => { bumpWeak(meta.id, q.tid, ok ? -0.5 : 1); noteMistake(meta.id, q, ctx.byId[q.tid]?.unit, ok); if (ok) sfx('chime'); stampToday(); setAnswered(true); setQz(z => ({ ...z, score: z.score + (ok ? 1 : 0), wrong: ok ? z.wrong : [...z.wrong, q] })); }} />
      {answered && (
        <div className="cta">
          <button className="btn primary" autoFocus onClick={() => { setAnswered(false); setQz(z => ({ ...z, i: z.i + 1 })); }}>{qz.i + 1 < qz.qs.length ? 'Next question →' : 'See result'}</button>
          <a className="btn" href={`#/${meta.id}/learn/${q.tid}`}>Open topic</a>
        </div>
      )}
    </div>
  );
}

/* ---------------- REVISE ---------------- */
function Revise({ ctx }) {
  const { S, meta } = ctx;
  const [unit, setUnit] = useState('all');
  const [test, setTest] = useState(false);
  const [shown, setShown] = useState(() => new Set());
  const [rev, setRev] = useState(() => new Set(store.get(meta.id + ':revised', [])));
  const [q, setQ] = useState('');
  const list = S.topics.filter(t => t.rev && (unit === 'all' || t.unit === unit));
  const nRev = list.filter(t => rev.has(t.id)).length;
  const toggleRev = id => { const n = new Set(rev); n.has(id) ? n.delete(id) : (n.add(id), stampToday()); store.set(meta.id + ':revised', [...n]); setRev(n); };
  const reveal = id => setShown(x => new Set(x).add(id));
  const terms = (S.glossary || []).filter(([k, v]) => !q || (k + ' ' + v).toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="wrap">
      <div className="page-ascii"><ascii-art piece="torii-gate-tunnel" size="5" /></div>
      <p className="eyebrow">Last-minute revision</p>
      <h1 className="page-h">Revise</h1>
      <p className="lead">Every topic boiled down to the points you must write. Turn on <b>Test me</b> to hide the points, try to recall them, then tap to check.</p>
      <div className="rev-bar">
        <SkTabs label="Unit" value={unit} onChange={setUnit} options={['all', ...Object.keys(S.units).map(Number).filter(u => u > 0)].map(u => [u, u === 'all' ? 'All' : 'Unit ' + u])} />
        <span className="sk-row"><SkToggle label="Test me" checked={test} onChange={on => { setTest(on); setShown(new Set()); }} /><b className="sk-label" aria-hidden="true" onClick={e => e.currentTarget.previousSibling.flip?.()}>Test me</b></span>
        <span className="muted rev-count">{nRev}/{list.length} revised</span>
      </div>
      <div className="bar wide"><i style={{ width: list.length ? (nRev / list.length) * 100 + '%' : 0 }} /></div>
      <AudioBar label="🔊 Listen to all key points" parts={() => list.flatMap(t => [t.title + '.', ...t.rev])} />
      <div className="rev-list">
        {list.map((t, i) => {
          const hidden = test && !shown.has(t.id);
          return (
            <Reveal key={t.id} delay={Math.min(i, 6) * 0.04} className={'rev-card' + (rev.has(t.id) ? ' done' : '')}>
              <div className="rev-head">
                <span className="dot" style={{ background: UCOL[t.unit] }} />
                <a href={`#/${meta.id}/learn/${t.id}`}>{t.title}</a>
                <span className="tag">{t.marks}</span>
                {t.pyq && <span className="tag pyq">{ctx.lbl.pyq}</span>}
              </div>
              <div className="rev-body">
                <ul className={'rev-pts' + (hidden ? ' hidden' : '')} aria-hidden={hidden}>
                  {t.rev.map((x, j) => <li key={j} dangerouslySetInnerHTML={{ __html: x }} />)}
                </ul>
                {hidden && <TapReveal onReveal={() => reveal(t.id)} />}
              </div>
              {t.trick && <Html className="rev-trick" html={t.trick} />}
              {t.meme && <MemeCard m={t.meme} compact />}
              <div className="rev-foot">
                <button className={'btn sm' + (rev.has(t.id) ? ' ok' : '')} onClick={e => { if (!rev.has(t.id)) fx.tick(e.currentTarget); toggleRev(t.id); }}>{rev.has(t.id) ? '✓ Revised' : 'Mark revised'}</button>
                <a className="btn sm ghost" href={`#/${meta.id}/learn/${t.id}`}>Full topic →</a>
              </div>
            </Reveal>
          );
        })}
      </div>

      {S.glossary && (
        <section className="glossary">
          <h2>Jargon buster</h2>
          <p className="muted" style={{ marginTop: 0 }}>Every tricky word in this subject, in one plain line.</p>
          <div className="sk-search"><SkInput label="Search glossary" placeholder="Search a word… e.g. bean, ORM, thread" value={q} onChange={setQ} /></div>
          <div className="gl-grid">
            {terms.map(([k, v]) => <div key={k} className="gl-item"><b>{k}</b><span>{v}</span></div>)}
            {terms.length === 0 && <p className="muted">No match.</p>}
          </div>
        </section>
      )}
    </div>
  );
}

/* ---------------- PAPER ---------------- */
function Paper({ ctx }) {
  const { S, meta, byId, done } = ctx;
  const ids = S.pyq.flatMap(s => s.items.map(i => i[3])).filter(id => byId[id]);
  const got = ids.filter(id => done.has(id)).length;
  const slug = t => 'ps-' + t.replace(/[^a-z0-9]+/gi, '-').toLowerCase();
  return (
    <div className="wrap paper">
      <p className="eyebrow">Previous year · End semester</p>
      <h1 className="page-h">{ctx.lbl.paper}</h1>
      <p className="lead">{ctx.lbl.paperLead}</p>
      <TermCards scope=".paper" glossary={S.glossary} />
      <div className="paper-top">
        <div className="paper-ring"><Ring value={ids.length ? got / ids.length : 0} size={64} stroke={6} /><span>{got}/{ids.length}</span></div>
        <nav className="paper-jump" aria-label="Sections">
          {S.pyq.map(s => <a key={s.title} href={'#/' + meta.id + '/paper'} onClick={e => { e.preventDefault(); document.getElementById(slug(s.title))?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}>{s.title.split(/[·(]/)[0].trim()}<small>{s.items.length}</small></a>)}
        </nav>
      </div>
      <div className="omr" aria-label="Jump to a question">
        <span className="omr-h">┌─ ANSWER SHEET ─ tap a bubble to jump</span>
        <div className="omr-grid">{S.pyq.flatMap((s, si) => s.items.map(([no, , m, id]) => (
          <a key={si + '-' + no} href={'#/' + meta.id + '/paper'} className={'omr-b' + (done.has(id) ? ' on' : '')} data-m={m}
            onClick={e => { e.preventDefault(); document.getElementById('pq-' + si + '-' + no)?.scrollIntoView({ behavior: 'smooth', block: 'center' }); }}
            title={s.title.split(/[·(]/)[0].trim() + ' · Q' + no + ' · ' + m + 'M'}>{no}</a>)))}</div>
      </div>
      {S.pyq.map((s, si) => {
        const sd = s.items.filter(i => done.has(i[3])).length;
        return (
          <section className="paper-sec" key={s.title} id={slug(s.title)}>
            <div className="paper-sec-h"><h2>{s.title}</h2><span className="muted">{sd}/{s.items.length} learned</span><i className="unit-bar" style={{ '--p': sd / s.items.length }} /></div>
            {s.items.map(([no, q, m, id], k) => {
              const t = byId[id], d = t && done.has(id);
              return (
                <motion.div className={'pq' + (d ? ' done' : '')} key={no} id={'pq-' + si + '-' + no} style={{ '--m': m }}
                  initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-30px' }} transition={{ duration: 0.4, delay: Math.min(k, 6) * 0.04 }}>
                  <div className="pq-no"><small>Q.</small>{String(no).padStart(2, '0')}</div>
                  <div className="pq-body">
                    <p className="pq-q">{q}</p>
                    {m === 2 && t?.short && <details className="pq-ans"><summary><span>Show 2-mark answer</span></summary><Html className="prose short" html={t.short} /></details>}
                    <div className="pq-meta">
                      {t && <a className="btn sm pq-open" href={`#/${meta.id}/learn/${id}`}>Open full answer <span aria-hidden="true">→</span></a>}
                      {t && <span className="muted pq-topic">{t.title}</span>}
                    </div>
                  </div>
                  <div className="pq-stamp" aria-label={m + ' marks'}><b>{m}</b><small>marks</small></div>
                  {d && <span className="pq-seal" title="Learned">済</span>}
                </motion.div>
              );
            })}
          </section>
        );
      })}
    </div>
  );
}
