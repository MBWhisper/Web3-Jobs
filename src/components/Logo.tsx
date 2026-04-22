export function Logo({ className = '' }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 220 48"
      fill="none"
      aria-label="Web3 Jobs"
      role="img"
      className={className}
      style={{ width: 160, height: 36 }}
    >
      <defs>
        <linearGradient id="hexGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff1493" />
          <stop offset="100%" stopColor="#00ffff" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="1.2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Hexagon — blockchain node */}
      <g filter="url(#glow)">
        <polygon
          points="24,3 41,13 41,31 24,41 7,31 7,13"
          stroke="url(#hexGrad)"
          strokeWidth="1.8"
          fill="#0a0a0a"
        />
        <polygon
          points="24,10 35,16.5 35,29.5 24,36 13,29.5 13,16.5"
          stroke="#ff1493"
          strokeWidth="0.7"
          fill="none"
          opacity="0.35"
        />
        {/* Center node */}
        <circle cx="24" cy="22" r="2.8" fill="url(#hexGrad)" />
        {/* Connector lines */}
        <line x1="24" y1="10"  x2="24" y2="19.2" stroke="#ff1493" strokeWidth="1" opacity="0.75" />
        <line x1="24" y1="24.8" x2="24" y2="36"  stroke="#00ffff" strokeWidth="1" opacity="0.75" />
        <line x1="13" y1="16.5" x2="21.3" y2="21" stroke="#ff1493" strokeWidth="1" opacity="0.75" />
        <line x1="35" y1="16.5" x2="26.7" y2="21" stroke="#00ffff" strokeWidth="1" opacity="0.75" />
        <line x1="13" y1="29.5" x2="21.3" y2="23" stroke="#00ffff" strokeWidth="1" opacity="0.5" />
        <line x1="35" y1="29.5" x2="26.7" y2="23" stroke="#ff1493" strokeWidth="1" opacity="0.5" />
        {/* Corner dots */}
        <circle cx="24" cy="3"  r="1.2" fill="#ff1493" opacity="0.9" />
        <circle cx="41" cy="13" r="1.2" fill="#00ffff" opacity="0.9" />
        <circle cx="41" cy="31" r="1.2" fill="#ff1493" opacity="0.9" />
        <circle cx="24" cy="41" r="1.2" fill="#00ffff" opacity="0.9" />
        <circle cx="7"  cy="31" r="1.2" fill="#ff1493" opacity="0.9" />
        <circle cx="7"  cy="13" r="1.2" fill="#00ffff" opacity="0.9" />
      </g>

      {/* WEB3 */}
      <text
        x="52" y="21"
        fontFamily="'Orbitron', monospace"
        fontSize="13"
        fontWeight="700"
        fill="url(#hexGrad)"
        letterSpacing="3"
      >
        WEB3
      </text>

      {/* divider */}
      <line x1="52" y1="25.5" x2="213" y2="25.5" stroke="#ff1493" strokeWidth="0.4" opacity="0.25" />

      {/* JOBS */}
      <text
        x="52" y="39"
        fontFamily="'Orbitron', monospace"
        fontSize="10.5"
        fontWeight="400"
        fill="#ffffff"
        letterSpacing="7"
        opacity="0.88"
      >
        JOBS
      </text>

      {/* accent dot */}
      <circle cx="210" cy="22" r="1.5" fill="#ff1493" opacity="0.7" />
    </svg>
  );
}
