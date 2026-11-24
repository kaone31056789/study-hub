// "AI sparkle" mark: a big four-point star + a small one. Uses currentColor.
export default function AiIcon({ size = 20, className = '' }) {
  return (
    <svg className={'ai-icon ' + className} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path className="ai-star-big" d="M10 2.5c.5 3.9 2.6 6 6.5 6.5-3.9.5-6 2.6-6.5 6.5-.5-3.9-2.6-6-6.5-6.5 3.9-.5 6-2.6 6.5-6.5z" fill="currentColor" />
      <path className="ai-star-small" d="M18 13.5c.3 2 1.3 3 3.3 3.3-2 .3-3 1.3-3.3 3.3-.3-2-1.3-3-3.3-3.3 2-.3 3-1.3 3.3-3.3z" fill="currentColor" />
      <circle className="ai-dot" cx="5" cy="18.5" r="1.4" fill="currentColor" />
    </svg>
  );
}
