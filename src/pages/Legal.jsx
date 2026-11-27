// Privacy policy and terms of use, written plainly. Routes: #/privacy and #/terms.
import { Brand } from '../components/Logo';
import { ThemeToggle, SkinToggle } from '../theme';
import { SoundToggle } from '../components/Rituals';
import { AsciiFooter } from '../components/asciiui';

const UPDATED = '28 November 2026';
const ISSUES = 'https://github.com/kaone31056789/study-hub/issues';

const PRIVACY = {
  title: 'Privacy policy',
  art: 'owl-blink',
  lead: 'Short version: your progress lives on your device. Nothing is tracked, nothing is sold, and you need no account.',
  sections: [
    ['What stays on your device', <>
      <p>Topics you tick, flashcard schedules, quiz mistakes, mock scores, study seals, focus minutes, your theme and language are saved in your browser's local storage (or the app's storage on Android). They never leave your device unless you turn on sync.</p>
      <p>Clearing your browser data, or uninstalling the app, deletes them.</p></>],
    ['Sync (optional)', <>
      <p>If you create a sync code, a copy of that same progress is stored on our server under the code, so another device can fetch it. The code is the only key: there is no name, email or password attached.</p>
      <p>Anyone who has your code can read and change that progress, so keep it to yourself. Stop syncing on all devices and the copy is no longer updated.</p></>],
    ['AI features', <>
      <p>Ask AI and mock-test checking send what you type (and any photo of a handwritten answer) to our server, which passes it to an AI model hosted by Ollama to produce the reply or the marks. We don't keep these requests after answering them. Don't put personal details in a question or a photo.</p></>],
    ['What we never do', <>
      <ul>
        <li>No analytics, tracking pixels or advertising.</li>
        <li>No cookies used for tracking.</li>
        <li>No selling or sharing of data with anyone.</li>
        <li>No accounts, so no passwords to leak.</li>
      </ul></>],
    ['Third-party bits', <>
      <p>Fonts load from Google Fonts, so Google sees a request from your browser for the font files. The app checks GitHub for the newest Android release. Each has its own privacy policy.</p></>],
    ['Children', <><p>Study Hub is made for college students. It collects no personal information from anyone, including children.</p></>],
    ['Changes and contact', <><p>If this policy changes, the date below changes with it. Questions or a deletion request for a sync code: open an issue on <a href={ISSUES} target="_blank" rel="noreferrer">GitHub</a>.</p></>],
  ],
};

const TERMS = {
  title: 'Terms of use',
  art: 'scroll-banner-frame',
  lead: 'Study Hub is a free study helper. Use it, learn from it, and use your own judgement in the exam.',
  sections: [
    ['Using Study Hub', <><p>The site and the Android app are free for personal study. By using them you agree to these terms. If you don't agree, please don't use them.</p></>],
    ['Study material', <>
      <p>Notes, answers, formulas, flashcards and mock papers are written to help you prepare. They may contain mistakes or differ from what your teacher or university expects. Always check against your syllabus, textbook and class notes.</p>
      <p>Past-paper questions are shown for practice. They belong to their respective university.</p></>],
    ['AI answers and marks', <><p>AI replies and mock marks are automatic and can be wrong. Treat them as a second opinion, not an official grade.</p></>],
    ['Fair use', <>
      <ul>
        <li>Don't try to break, overload or scrape the service or its API.</li>
        <li>Don't use the AI features to produce harmful or abusive content.</li>
        <li>Don't share someone else's sync code without their permission.</li>
      </ul></>],
    ['Open-source parts', <><p>Study Hub uses open-source work, including ASCII Magic art (MIT), React Bits components and Sakuga VFX (MIT). Their licences apply to those parts.</p></>],
    ['No warranty', <><p>The service is provided as is, without any warranty. It may change, pause or stop at any time. We aren't liable for exam results, lost progress or any damage from using it. Use sync if you want a backup.</p></>],
    ['Changes and contact', <><p>These terms may be updated; the date below shows the latest version. Questions: open an issue on <a href={ISSUES} target="_blank" rel="noreferrer">GitHub</a>.</p></>],
  ],
};

export default function Legal({ doc }) {
  const D = doc === 'terms' ? TERMS : PRIVACY;
  return (
    <>
      <header className="top home-top">
        <div className="top-in">
          <Brand title="Study Hub" sub="end-semester prep" />
          <div className="top-actions"><SoundToggle /><SkinToggle /><ThemeToggle /></div>
        </div>
      </header>
      <main className="wrap narrow legal">
        <div className="legal-art" aria-hidden="true"><ascii-art piece={D.art} size="5" /></div>
        <p className="eyebrow">Study Hub · {doc === 'terms' ? 'terms' : 'privacy'}</p>
        <h1 className="page-h">{D.title}</h1>
        <p className="lead">{D.lead}</p>
        <nav className="legal-toc" aria-label="On this page">
          {D.sections.map(([h], i) => <a key={h} href={'#/' + doc} onClick={e => { e.preventDefault(); document.getElementById('s' + i)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}><i>{String(i + 1).padStart(2, '0')}</i>{h}</a>)}
        </nav>
        {D.sections.map(([h, body], i) => (
          <section key={h} id={'s' + i} className="legal-sec">
            <h2><i aria-hidden="true">{String(i + 1).padStart(2, '0')}</i>{h}</h2>
            {body}
          </section>
        ))}
        <div className="legal-divider" aria-hidden="true"><ascii-art piece="stars-divider" size="5" /></div>
        <p className="muted legal-date">Last updated {UPDATED}.</p>
        <div className="cta"><a className="btn primary" href="#/">Back to Study Hub</a><a className="btn" href={doc === 'terms' ? '#/privacy' : '#/terms'}>{doc === 'terms' ? 'Privacy policy' : 'Terms of use'}</a></div>
      </main>
      <AsciiFooter title="Study Hub" line="Your notes stay yours." />
      <LegalLinks />
    </>
  );
}

export const LegalLinks = () => (
  <footer className="foot"><span>Study Hub · your progress is saved in this browser</span><span className="foot-links"><a href="#/privacy">Privacy</a><a href="#/terms">Terms</a></span></footer>
);
