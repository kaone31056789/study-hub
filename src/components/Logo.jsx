// Brand mark: a vermilion hanko seal holding 学 ("study"), with a blinking terminal cursor and
// dot-matrix corners: ink-wash meets ASCII.
import { useSkin } from '../theme';

// colours come from the active skin; the sakura skin adds a five-petal blossom to the seal
const petal = 'M0 0 C-2.6 -1.6 -3 -5.2 -1.5 -6.8 L0 -5.9 L1.5 -6.8 C3 -5.2 2.6 -1.6 0 0Z';
export default function Logo({ size = 36 }) {
  const skin = useSkin();
  const A = 'var(--accent)';
  return (
    <svg className="logo-svg" width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
      <rect x="1.5" y="1.5" width="37" height="37" rx="8" style={{ fill: 'var(--logo-bg, #0e0d0c)', stroke: A }} strokeWidth="2" />
      <rect x="5" y="5" width="30" height="30" rx="4" fill="none" style={{ stroke: A }} strokeWidth="1" strokeDasharray="1.5 2" opacity=".7" />
      <text x="19" y="27.5" textAnchor="middle" fontFamily='"Shippori Mincho B1",serif' fontWeight="800" fontSize="20" style={{ fill: 'var(--logo-ink, #e9e2d4)' }}>学</text>
      <rect className="logo-cursor" x="28.5" y="25" width="4" height="5.5" style={{ fill: A }} />
      {skin === 'sakura'
        ? <g transform="translate(9.5 9.5) scale(.72)">{[0, 72, 144, 216, 288].map(r => <path key={r} d={petal} transform={`rotate(${r})`} style={{ fill: '#f7aac4' }} />)}<circle r="1.6" fill="#c2185b" /></g>
        : <g style={{ fill: A }} opacity=".85">{[[8, 8], [10.5, 8], [8, 10.5], [32, 32], [29.5, 32], [32, 29.5]].map(([x, y]) => <rect key={x + '' + y} x={x - .8} y={y - .8} width="1.6" height="1.6" />)}</g>}
    </svg>
  );
}

export const Brand = ({ title, sub, href = '#/', back }) => {
  const [first, ...rest] = title.split(' ');
  return (
    <a className="brand" href={href} aria-label={title + ' home'}>
      <Logo />
      <span className="brand-txt">
        <b>{first}{rest.length > 0 && <> <mark>{rest.join(' ')}</mark></>}</b>
        <small>{back && <span className="brand-back">← subjects</span>}<span className="brand-code">{sub}</span></small>
      </span>
    </a>
  );
};
