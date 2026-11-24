// Brand mark: a spiral study notebook on a yellow tile (notebook / brutalist style).
export default function Logo({ size = 36 }) {
  return (
    <svg className="logo-svg" width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
      <rect x="4" y="4" width="34" height="34" rx="9" fill="#15142b" />
      <rect x="1.5" y="1.5" width="34" height="34" rx="9" fill="#ffd43b" stroke="#15142b" strokeWidth="2.5" />
      <rect x="10" y="8" width="19" height="22" rx="3" fill="#fff" stroke="#15142b" strokeWidth="2.2" />
      <g stroke="#2f5bff" strokeWidth="2" strokeLinecap="round"><path d="M14.5 15h10" /><path d="M14.5 19.5h10" /><path d="M14.5 24h6.5" /></g>
      <g fill="#15142b">{[11.5, 16, 20.5, 25].map(y => <circle key={y} cx="10" cy={y} r="1.7" />)}</g>
      <path className="logo-ribbon" d="M23 6.5v9l2.4-1.9 2.4 1.9v-9z" fill="#ff5d8f" stroke="#15142b" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

export const Brand = ({ title, sub, href = '#/' }) => {
  const [first, ...rest] = title.split(' ');
  return (
    <a className="brand" href={href} aria-label={title + ' home'}>
      <Logo />
      <span className="brand-txt">
        <b>{first}{rest.length > 0 && <> <mark>{rest.join(' ')}</mark></>}</b>
        <small>{sub}</small>
      </span>
    </a>
  );
};
