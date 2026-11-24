import { useEffect, useRef, useState } from 'react';
import { store } from '../store';
import { motion } from 'motion/react';

// Original, CSS-drawn meme "photos" in classic formats. No copyrighted stills or real people.
const pop = i => ({ initial: { opacity: 0, scale: 0.9 }, whileInView: { opacity: 1, scale: 1 }, viewport: { once: true }, transition: { delay: i * 0.12, type: 'spring', stiffness: 300, damping: 22 } });

export default function MemeImage({ img, unit = 1 }) {
  if (!img) return null;
  return (
    <div className={'mi mi-' + img.f + ' mi-u' + unit} role="img" aria-label={altText(img)}>
      {img.f === 'drake' && (
        <>
          <motion.div className="mi-dr-row" {...pop(0)}><div className="mi-dr-face no"><span className="mi-anim-shake">🙅</span></div><div className="mi-dr-txt"><span className="mi-strike">{img.no}</span></div></motion.div>
          <motion.div className="mi-dr-row" {...pop(2)}><div className="mi-dr-face yes"><span className="mi-anim-nod">😎</span></div><div className="mi-dr-txt"><span className="mi-hl">{img.yes}</span></div></motion.div>
        </>
      )}
      {img.f === 'brain' && img.rows.map((r, i) => (
        <motion.div key={i} className={'mi-br-row lvl' + i} {...pop(i)}><div className="mi-br-txt">{r}</div><div className="mi-br-pic"><span>🧠</span></div></motion.div>
      ))}
      {img.f === 'buttons' && (
        <>
          <div className="mi-bt-top">
            <motion.div className="mi-bt a" {...pop(0)}><span>{img.a}</span></motion.div>
            <motion.div className="mi-bt b" {...pop(1)}><span>{img.b}</span></motion.div>
          </div>
          <motion.div className="mi-bt-guy" {...pop(2)}><span className="mi-anim-sweat">😰</span><i className="drop d1">💦</i><i className="drop d2">💦</i></motion.div>
          <div className="mi-imp mi-bottom">{img.cap}</div>
        </>
      )}
      {img.f === 'classic' && (
        <>
          <motion.div className="mi-imp mi-top" initial={{ y: -40, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ type: 'spring', stiffness: 260, damping: 18 }}>{img.top}</motion.div>
          <div className="mi-scene">{img.e.split(' ').map((em, i) => <motion.span key={i} className="mi-em" style={{ '--d': i * 0.3 + 's' }} initial={{ y: 30, opacity: 0, scale: 0.4 }} whileInView={{ y: 0, opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.25 + i * 0.15, type: 'spring', stiffness: 300, damping: 14 }}>{em}</motion.span>)}</div>
          <motion.div className="mi-imp mi-bottom mi-slam" initial={{ scale: 2.4, opacity: 0, rotate: -4 }} whileInView={{ scale: 1, opacity: 1, rotate: 0 }} viewport={{ once: true }} transition={{ delay: 0.7, type: 'spring', stiffness: 420, damping: 16 }}>{img.bottom}</motion.div>
        </>
      )}
      <span className="mi-wm">studyhub</span>
    </div>
  );
}

function altText(img) {
  if (img.f === 'drake') return `Meme: no to "${img.no}", yes to "${img.yes}"`;
  if (img.f === 'brain') return 'Expanding brain meme: ' + img.rows.join(', ');
  if (img.f === 'buttons') return `Two buttons meme: "${img.a}" or "${img.b}". ${img.cap}`;
  return `Meme: ${img.top} / ${img.bottom}`;
}

// Real meme photo support (personal use): user-uploaded photo (saved in this browser) →
// file in public/memes/<topic-id>.jpg → drawn fallback.

const resize = file => new Promise((res, rej) => {
  const r = new FileReader();
  r.onerror = rej;
  r.onload = () => {
    const im = new Image();
    im.onerror = rej;
    im.onload = () => {
      const k = Math.min(1, 900 / Math.max(im.width, im.height));
      const c = document.createElement('canvas');
      c.width = Math.round(im.width * k); c.height = Math.round(im.height * k);
      c.getContext('2d').drawImage(im, 0, 0, c.width, c.height);
      res(c.toDataURL('image/jpeg', 0.82));
    };
    im.src = r.result;
  };
  r.readAsDataURL(file);
});

export function MemePhoto({ id, img, unit, line }) {
  const key = 'memeimg:' + id;
  const [own, setOwn] = useState(() => store.get(key, null));
  const [fileOk, setFileOk] = useState(true);
  const [fileLoaded, setFileLoaded] = useState(false);
  const [err, setErr] = useState('');
  const input = useRef();
  useEffect(() => { setOwn(store.get(key, null)); setFileOk(true); setFileLoaded(false); setErr(''); }, [key]);

  const pick = async e => {
    const f = e.target.files?.[0]; e.target.value = '';
    if (!f) return;
    try {
      const url = await resize(f);
      store.set(key, url);
      if (store.get(key, null) !== url) throw new Error('full');
      setOwn(url); setErr('');
    } catch { setErr('Photo save nahi hui (browser storage full?). Chhoti photo try karo.'); }
  };
  const remove = () => { try { localStorage.removeItem(key); } catch { /* ignore */ } setOwn(null); };
  const q = 'https://www.google.com/search?tbm=isch&q=' + encodeURIComponent(line + ' meme');

  return (
    <>
      {own ? <div className="mi-photo-wrap"><img className="mi-photo kb" src={own} alt={'Meme: ' + line} /></div>
        : <>
            {fileOk && <div className="mi-photo-wrap" style={fileLoaded ? undefined : { display: 'none' }}><img className="mi-photo kb" src={'memes/' + id + '.jpg'} alt={'Meme: ' + line}
              onLoad={() => setFileLoaded(true)} onError={() => setFileOk(false)} /></div>}
            {!fileLoaded && <MemeImage img={img} unit={unit} />}
          </>}
      <div className="mi-actions">
        <a className="mi-btn" href={q} target="_blank" rel="noopener noreferrer">🔎 Google pe dhoondo</a>
        <button className="mi-btn" onClick={() => input.current?.click()}>📷 {own ? 'Photo badlo' : 'Apni meme photo lagao'}</button>
        {own && <button className="mi-btn ghost" onClick={remove}>Hatao</button>}
        <input ref={input} type="file" accept="image/*" hidden onChange={pick} />
      </div>
      {err && <p className="mi-err">{err}</p>}
    </>
  );
}
