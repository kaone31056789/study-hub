// Brand mark: a vermilion hanko seal holding 学 ("study"), with a blinking terminal cursor and
// dot-matrix corners: ink-wash meets ASCII.
export default function Logo({ size = 36 }) {
  return (
    <svg className="logo-svg" width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
      <rect x="1.5" y="1.5" width="37" height="37" rx="8" fill="#0e0d0c" stroke="#d9452b" strokeWidth="2" />
      <rect x="5" y="5" width="30" height="30" rx="4" fill="none" stroke="#d9452b" strokeWidth="1" strokeDasharray="1.5 2" opacity=".7" />
      <text x="19" y="27.5" textAnchor="middle" fontFamily='"Shippori Mincho B1",serif' fontWeight="800" fontSize="20" fill="#e9e2d4">学</text>
      <rect className="logo-cursor" x="28.5" y="25" width="4" height="5.5" fill="#d9452b" />
      <g fill="#d9452b" opacity=".85">{[[8, 8], [10.5, 8], [8, 10.5], [32, 32], [29.5, 32], [32, 29.5]].map(([x, y]) => <rect key={x + '' + y} x={x - .8} y={y - .8} width="1.6" height="1.6" />)}</g>
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
