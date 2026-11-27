import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { HugeiconsIcon } from '@hugeicons/react';
import { BrainIcon, Layers01Icon, Target01Icon, Note01Icon, CheckmarkCircle02Icon, ArrowRight01Icon, Calendar03Icon, Task01Icon, CardsIcon, BookOpen01Icon, File01Icon } from '@hugeicons/core-free-icons';
import CountUp from '../rb/CountUp';
import Aurora from '../rb/Aurora';
import Nudge from '../components/Nudge';
import SpotlightCard from '../rb/SpotlightCard';
import { Brand } from '../components/Logo';
import { Reveal } from '../components/ui';
import { InkPond, Ascii, MorphText } from '../components/canvasfx';
import TypeGarden from '../components/TypeGarden';
import { AsciiFooter, AsciiStrip } from '../components/asciiui';
import { RELEASES_URL, useLatestApk } from '../components/UpdatePrompt';
import { SUBJECTS, SEASON } from '../subjects';
import { store } from '../store';
import { ThemeToggle, SkinToggle, useTheme } from '../theme';
import { LangToggle, useLang, useT } from '../lang';

// Shortcuts into a subject's main sections (shown on the next-exam card and every subject card).
const QUICK = [['learn', 'Learn', BookOpen01Icon], ['revise', 'Revise', Task01Icon], ['mock', 'Mock', Note01Icon], ['cram', 'Cram', Target01Icon], ['cards', 'Cards', CardsIcon], ['paper', 'PYQ', File01Icon]];
const QuickLinks = ({ id, className }) => (
  <div className={className}>
    {QUICK.map(([k, label, icon]) => <a key={k} href={`#/${id}/${k}`}><HugeiconsIcon icon={icon} size={18} />{label}</a>)}
  </div>
);

const DAY = 86400000;
const day0 = d => { const x = new Date(d); x.setHours(0, 0, 0, 0); return x; };
const daysBetween = (a, b) => Math.round((day0(b) - day0(a)) / DAY);
const at = d => d + 'T00:00:00';
const fmt = d => new Date(at(d)).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
const fmtLong = d => new Date(at(d)).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' });
const when = n => (n === 0 ? 'Today' : n === 1 ? 'Tomorrow' : n > 1 ? `In ${n} days` : 'Done');

function Ring({ value, size = 60 }) {
  const r = (size - 8) / 2, c = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
      <circle cx={size / 2} cy={size / 2} r={r} stroke="var(--surface-3)" strokeWidth="6" fill="none" />
      <motion.circle cx={size / 2} cy={size / 2} r={r} stroke="var(--accent)" strokeWidth="6" fill="none" strokeLinecap="round"
        strokeDasharray={c} initial={{ strokeDashoffset: c }} animate={{ strokeDashoffset: c * (1 - value) }}
        transition={{ duration: 1.1, ease: [0.2, 0.7, 0.2, 1] }} transform={`rotate(-90 ${size / 2} ${size / 2})`} />
    </svg>
  );
}

const STEPS = [
  [BrainIcon, 'The 30-second idea', 'A plain-language analogy so the concept clicks.'],
  [Layers01Icon, 'Step by step', 'Click through one small idea at a time.'],
  [Target01Icon, 'Try it', 'A simulator to see the concept in action.'],
  [Note01Icon, 'Exam answer', 'The theory answer and the diagram to draw.'],
  [CheckmarkCircle02Icon, 'Check yourself', 'Quick questions, flashcards and a quiz.']
];

export default function Home() {
  const apk = useLatestApk();
  const theme = useTheme();
  const lang = useLang();
  const T = useT();
  const [data, setData] = useState({});
  useEffect(() => { SUBJECTS.forEach(s => s.load().then(m => setData(d => ({ ...d, [s.id]: m.default })))); }, []);

  const all = Object.values(data);
  const sum = f => all.reduce((n, s) => n + f(s), 0);
  const topics = sum(s => s.topics.length);
  const sims = sum(s => s.topics.filter(t => t.widget || t.explore).length);
  const cards = sum(s => s.cards.length);
  const qs = sum(s => s.topics.reduce((m, t) => m + (t.quiz?.length || 0), 0));
  const learned = SUBJECTS.reduce((n, s) => n + store.get(s.id + ':done', []).length, 0);

  const today = new Date();
  const hour = today.getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  const sorted = [...SUBJECTS].sort((a, b) => a.exam.localeCompare(b.exam));
  const next = sorted.find(s => daysBetween(today, at(s.exam)) >= 0);
  const start = sorted[0]?.exam || SEASON.end;
  const span = Math.max(1, daysBetween(at(start), at(SEASON.end)));
  const pos = d => Math.min(100, Math.max(0, (daysBetween(at(start), d) / span) * 100));

  const info = s => {
    const d = data[s.id];
    const doneIds = new Set(store.get(s.id + ':done', []));
    const total = d ? d.topics.length : 0;
    const nextId = d?.plan.flatMap(r => r.ids).find(id => !doneIds.has(id));
    return { d, done: doneIds.size, total, nextTopic: nextId && d.topics.find(t => t.id === nextId), href: nextId ? `#/${s.id}/learn/${nextId}` : `#/${s.id}` };
  };
  const nx = next && info(next);

  return (
    <>
      <header className="top home-top">
        <div className="top-in">
          <Brand title="Study Hub" sub="end-semester prep" />
          <div className="top-actions">
            {!window.Capacitor && <a className="season-chip app-dl" href={apk?.url || RELEASES_URL} title={apk ? 'Latest Android app: v' + apk.n + ', ' + apk.mb + ' MB' : 'Android app'}>📱 <span className="lbl-long">Android app{apk && <> v{apk.n} · {apk.mb} MB</>}</span><span className="lbl-short">App{apk && <> v{apk.n}</>}</span></a>}
            <span className="season-chip hide-sm"><HugeiconsIcon icon={Calendar03Icon} size={15} /> {fmt(start)} – {fmt(SEASON.end)}</span>
            <LangToggle />
            <SkinToggle /><ThemeToggle />
          </div>
        </div>
      </header>

      <div className="dash-aurora" aria-hidden="true"><Aurora key={theme} colorStops={theme === 'light' ? ['#7aa2ff', '#ffd43b', '#ff8fb1'] : ['#2b2723', '#d9452b', '#5e5850']} lightMode={theme === 'light'} amplitude={1.1} blend={0.55} speed={0.55} /></div>
      <main className="wrap wide dash">
        <section className="dash-head">
          <InkPond off={theme === 'light'}>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
            <p className="eyebrow">End-semester exams · {fmt(start)} – {fmt(SEASON.end)}</p>
            <h1 className="dash-title"><MorphText words={lang === 'gaali' ? ['Abe padh le, exam sar pe hai.', 'Phone rakh, bc.', 'Kal paper hai, chutiye.'] : lang === 'bhai' ? ['Aur bhai, ready?', 'Chalo padhte hain.', 'Ek topic, ek baar.'] : [greeting + '.', 'Ready when you are.', 'One topic at a time.']} /> {T('dashTitle')}</h1>
            <p className="lead">{T('dashLead')}</p>
            <p className="hand dash-hand">{lang === 'gaali' ? 'phone rakh aur padh, kamine ✿' : lang === 'bhai' ? 'ek topic at a time, tension nahi lene ka ✿' : 'one topic at a time, no stress ✿'}</p>
          </motion.div>
          </InkPond>

          {next && nx && (
            <motion.div className="next-card" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.08 }}>
              <div className="next-top">
                <span className="next-label">Next exam</span>
                <span className={'pill' + (daysBetween(today, at(next.exam)) <= 1 ? ' hot' : '')}>{when(daysBetween(today, at(next.exam)))}</span>
              </div>
              <b className="next-name">{next.name}</b>
              <span className="muted next-date">{next.code} · {fmtLong(next.exam)}</span>
              <div className="next-prog"><div className="bar"><i style={{ width: nx.total ? (nx.done / nx.total) * 100 + '%' : 0 }} /></div><span>{nx.done}/{nx.total || '…'}</span></div>
              <a className="btn primary" data-portal href={nx.href}>{nx.done ? 'Continue' : 'Start'}{nx.nextTopic ? ': ' + nx.nextTopic.title.split(/[(&]/)[0].trim() : ''} <HugeiconsIcon icon={ArrowRight01Icon} size={16} /></a>
              <QuickLinks id={next.id} className="subj-links quick-grid" />
            </motion.div>
          )}
        </section>

        <Reveal className="garden-band">
          <TypeGarden editable height={300} label="Type a word and watch it bloom"
            words={lang === 'gaali' ? ['padh le bc', 'phone rakh', 'kal paper hai'] : lang === 'bhai' ? ['chal padhte hain', 'ek topic ek baar', 'tension mat le'] : ['study hub', 'one topic at a time', 'you got this']} />
        </Reveal>

        <div className="section-row"><h2 className="section-title">Your subjects</h2><span className="muted">{SUBJECTS.length} {SUBJECTS.length === 1 ? 'subject' : 'subjects'}</span></div>
        <div className="subjects">
          {SUBJECTS.map((s, i) => {
            const { d, done, total, href } = info(s);
            const left = daysBetween(today, at(s.exam));
            return (
              <motion.div key={s.id} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.12 + i * 0.06 }}>
                <SpotlightCard theme={theme} className="subj" spotlightColor={theme === 'light' ? 'rgba(226,85,10,0.18)' : 'rgba(255,122,61,0.35)'} style={{ background: 'var(--surface)' }}>
                  <div className="subj-top">
                    <span className="subj-code">{s.short} · {s.code}</span>
                    <span className={'pill' + (left <= 1 && left >= 0 ? ' hot' : '')}>{left > 1 ? left + ' days left' : when(left)}</span>
                  </div>
                  <div className="subj-mid">
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <a className="subj-name" href={'#/' + s.id}><h2>{s.name}</h2></a>
                      <p>{s.blurb}</p>
                    </div>
                    <div className="ring-wrap"><Ring value={total ? done / total : 0} /><span>{total ? Math.round((done / total) * 100) : 0}%</span></div>
                  </div>
                  {d && <ul className="unit-tree">{Object.entries(d.units).filter(([u]) => +u > 0).map(([u, n], k, a) => <li key={u}><i aria-hidden="true">{k === a.length - 1 ? '└─' : '├─'}</i><b>U{u}</b>{n}</li>)}</ul>}
                  <AsciiStrip pct={total ? done / total : 0} label={`> ${done}/${total} topics learned · ${total - done} to go`} />
                  <QuickLinks id={s.id} className="subj-links" />
                  <a className="btn primary subj-cta" data-portal href={href}>{done ? 'Continue studying' : 'Start studying'} <HugeiconsIcon icon={ArrowRight01Icon} size={16} /></a>
                </SpotlightCard>
              </motion.div>
            );
          })}
          <motion.div className="soon" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            <Ascii piece="ink-in-water" size={5} className="soon-art" /><span className="soon-plus">+</span><b>Next subject</b><span>Every subject gets the same plan, walkthroughs, simulators, revision sheet, flashcards and quiz.</span>
          </motion.div>
        </div>

        <Reveal className="glance card">
          <div className="glance-item"><b><CountUp to={learned} duration={1} /></b><span>topics learned</span></div>
          <div className="glance-item"><b><CountUp to={topics} duration={1.2} /></b><span>topics</span></div>
          <div className="glance-item"><b><CountUp to={sims} duration={1.2} /></b><span>simulators</span></div>
          <div className="glance-item"><b><CountUp to={cards} duration={1.3} /></b><span>flashcards</span></div>
          <div className="glance-item"><b><CountUp to={qs} duration={1.4} /></b><span>quiz questions</span></div>
        </Reveal>

        <Reveal className="season card">
          <div className="season-head">
            <div><p className="eyebrow">Exam timeline</p><h2>{next ? `${next.short}: ${when(daysBetween(today, at(next.exam))).toLowerCase()}` : 'Exam season is over'}</h2></div>
            <div className="season-count"><b>{Math.max(0, daysBetween(today, at(SEASON.end)))}</b><span>days until the last exam</span></div>
          </div>
          <div className="track">
            <div className="track-line"><motion.i initial={{ width: 0 }} whileInView={{ width: pos(today) + '%' }} viewport={{ once: true }} transition={{ duration: 1.1 }} /></div>
            <span className="track-today" style={{ left: pos(today) + '%' }}>Today</span>
            {SUBJECTS.map(s => <a key={s.id} href={'#/' + s.id} className="track-pin" style={{ left: pos(at(s.exam)) + '%' }}><span className="pin-dot" /><b>{s.short}</b><small>{fmt(s.exam)}</small></a>)}
            <span className="track-pin end" style={{ left: '100%' }}><span className="pin-dot" /><b>Last exam</b><small>{fmt(SEASON.end)}</small></span>
          </div>
        </Reveal>

        <h2 className="section-title" style={{ marginTop: 48 }}>How every topic works</h2>
        <div className="flow">
          {STEPS.map(([icon, t, d], i) => (
            <Reveal key={t} delay={i * 0.06} className="flow-step">
              <div className="flow-icon"><HugeiconsIcon icon={icon} size={22} strokeWidth={1.8} /><span>{i + 1}</span></div>
              <b>{t}</b>
              <p>{d}</p>
            </Reveal>
          ))}
        </div>
      </main>
      <AsciiFooter title="Study Hub" line="Ink, ASCII and one topic at a time." />
      <Nudge href={nx ? nx.href : '#/' + SUBJECTS[0].id} />
      <footer className="foot"><span>Study Hub · your progress is saved in this browser</span><span>UI components: React Bits</span></footer>
    </>
  );
}
