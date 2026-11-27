import { useSyncExternalStore } from 'react';
import { store } from './store';

// UI language: 'en' (simple English) or 'bhai' (casual Hinglish). Exam answers always stay in English.
const subs = new Set();
let current = store.get('lang', 'en');
export const setLang = l => { current = l; store.set('lang', l); subs.forEach(f => f()); };
export const useLang = () => useSyncExternalStore(f => { subs.add(f); return () => subs.delete(f); }, () => current);

const L = {
  en: {
    idea: 'The 30-second idea', steps: 'Learn it step by step', stepsSub: 'Click through. One small idea per step.',
    try: 'Try it yourself', trySub: 'Play with it. This is where the concept sticks.',
    short: '2-mark answer', shortSub: 'Write exactly this for a short question.',
    answer: 'Full exam answer', answerSub: 'The theory answer to write for 5/10 marks. Use these headings.',
    diagram: 'Diagram to draw', diagramSub: 'Copy this onto paper: boxes, arrows and labels. Diagrams earn easy marks.',
    code: 'Code to write on paper', codeSub: 'Short and exam-sized. Comments show what to explain.',
    trick: 'Remember it', check: 'Check yourself',
    markDone: 'Mark as learned', learned: '✓ Learned', allTopics: '← All topics',
    dashTitle: 'Pick a subject and start.',
    dashLead: 'Every topic gives you a plain-language explanation, a step-by-step walkthrough and a simulator, then the exact theory answer and diagram to write in the exam.'
  },
  gaali: {
    idea: 'Seedhi baat, bhosdike: samajh le', steps: 'Step by step padh, chutiye, jaldi kis baat ki hai', stepsSub: 'Ek click, ek cheez. Saare ek saath dabayega toh bheja phat jaayega, bc.',
    try: 'Haath laga ke dekh, gaandu', trySub: 'Isse khel. Reels se zyada mazaa aayega aur marks bhi milenge, harami.',
    short: '2 marks ka answer: ratt le, kamine', shortSub: 'Short question aaye toh bas yahi likh. English mein, Hinglish mein likha toh examiner teri lega.',
    answer: 'Exam mein yahi chhaapna hai, chutiye', answerSub: '5/10 marks ke liye ye likh. Headings same, English mein, aur diagram ke saath. Warna result dekh ke rona mat, bc.',
    diagram: 'Ye diagram bana, free ke marks hain, gadhe', diagramSub: 'Boxes, arrows, labels copy kar. Itna bhi nahi kiya toh kya ukhaad lega zindagi mein, bhosdike?',
    code: 'Paper pe ye code likh', codeSub: 'Chhota sa hai, itna toh likh hi sakta hai, nikamme.',
    trick: 'Aise yaad rakh, bewakoof', check: 'Ab bata, samjha ya phir se padhega, chutiye?',
    markDone: 'Haan bc, samajh gaya', learned: '✓ Samajh gaya, ab agla', allTopics: '← Saare topics dikha',
    dashTitle: 'Subject chun aur padh, bakchodi band kar.',
    dashLead: 'Har topic pehle desi bhasha mein, phir step by step, phir simulator, aur end mein exam mein kya chhaapna hai. Bahane mat bana, phone rakh, padh, harami.'
  },
  bhai: {
    idea: 'Simple bhasha mein samjho', steps: 'Step by step samjho', stepsSub: 'Ek-ek step click karo, ek baar mein ek hi cheez. Jaldi mat karo.',
    try: 'Khud try karke dekho', trySub: 'Isse khelo bhai. Concept yahin dimaag mein pakka baithega.',
    short: '2 marks ka answer', shortSub: 'Short question aaye toh bas ye likh dena (English mein hi).',
    answer: 'Exam wala full answer', answerSub: '5/10 marks ke liye ye likhna hai. Headings same rakhna. Exam mein English mein hi likhna.',
    diagram: 'Ye diagram banana hai', diagramSub: 'Paper pe boxes, arrows aur labels copy kar lo. Diagram = free marks.',
    code: 'Paper pe ye code likhna', codeSub: 'Chhota sa, exam size. Comments mein likha hai kya explain karna hai.',
    trick: 'Yaad kaise rakhein', check: 'Khud ko test karo',
    markDone: 'Ho gaya, samajh aa gaya', learned: '✓ Samajh gaya', allTopics: '← Saare topics',
    dashTitle: 'Subject chuno aur shuru ho jao.',
    dashLead: 'Har topic mein pehle simple bhasha mein samjhaya hai, phir step by step aur ek simulator, aur end mein exam mein kya likhna hai, diagram ke saath.'
  }
};
// Desi explainer for a topic in the current language (gaali falls back to bhai).
export const desiOf = (t, lang) => t.easy?.[lang] || (lang === 'gaali' ? t.gaali || t.bhai : lang === 'bhai' ? t.bhai : null);

export const useT = () => { const l = useLang(); return k => L[l]?.[k] ?? L.en[k]; };

export function LangToggle() {
  const lang = useLang();
  return (
    <div className="lang-toggle" role="group" aria-label="Language">
      <button className={lang === 'en' ? 'on' : ''} onClick={() => setLang('en')} aria-pressed={lang === 'en'}>EN</button>
      <button className={lang === 'bhai' ? 'on' : ''} onClick={() => setLang('bhai')} aria-pressed={lang === 'bhai'}>Bhai</button>
      <button className={lang === 'gaali' ? 'on gaali' : ''} onClick={() => setLang('gaali')} aria-pressed={lang === 'gaali'} title="Gaali mode"><span className="hide-xs">Gaali </span>🤬</button>
    </div>
  );
}
