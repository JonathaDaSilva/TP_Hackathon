export function HeroIllustration() {
  return (
    <svg
      viewBox="0 0 500 440"
      className="w-full max-w-md"
      role="img"
      aria-label="Ilustração de uma galinha saudável com selo de verificação e relatório de triagem"
    >
      <defs>
        <linearGradient id="blobGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#dcfce7" />
          <stop offset="100%" stopColor="#fef3c7" />
        </linearGradient>
        <linearGradient id="shieldGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#14532d" />
        </linearGradient>
      </defs>

      <circle cx="250" cy="220" r="200" fill="url(#blobGrad)" />

      <circle cx="88" cy="118" r="9" fill="#fcd34d" opacity="0.85" />
      <circle cx="424" cy="332" r="13" fill="#86efac" opacity="0.7" />
      <circle cx="432" cy="86" r="6" fill="#16a34a" opacity="0.6" />
      <circle cx="60" cy="300" r="7" fill="#f59e0b" opacity="0.6" />

      <g transform="translate(300,108) rotate(8)">
        <rect x="0" y="0" width="120" height="150" rx="12" fill="white" stroke="#e5e7eb" strokeWidth="2" />
        <rect x="0" y="0" width="120" height="28" rx="12" fill="#166534" />
        <rect x="16" y="48" width="88" height="8" rx="4" fill="#e5e7eb" />
        <rect x="16" y="68" width="88" height="8" rx="4" fill="#e5e7eb" />
        <rect x="16" y="88" width="60" height="8" rx="4" fill="#e5e7eb" />
        <circle cx="30" cy="122" r="14" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" />
        <path d="M24 122 l4 5 l9 -10" stroke="#16a34a" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      <g>
        <path d="M120 270 q-35 0 -55 -25 q30 -5 50 5 z" fill="#bbf7d0" stroke="#166534" strokeWidth="3" strokeLinejoin="round" />
        <path d="M110 250 q-30 -10 -40 -45 q25 5 40 25 z" fill="#86efac" stroke="#166534" strokeWidth="3" strokeLinejoin="round" />

        <ellipse cx="210" cy="270" rx="95" ry="75" fill="white" stroke="#166534" strokeWidth="5" />
        <path d="M150 250 q40 10 45 70 q-45 5 -60 -35 q0 -20 15 -35 z" fill="#dcfce7" stroke="#166534" strokeWidth="3" strokeLinejoin="round" />

        <circle cx="270" cy="205" r="42" fill="white" stroke="#166534" strokeWidth="5" />
        <path d="M255 168 q5 -18 12 -2 q5 -16 12 0 q5 -14 10 2" fill="#f87171" stroke="#166534" strokeWidth="3" strokeLinejoin="round" />
        <path d="M308 205 l22 -6 l0 16 z" fill="#f59e0b" stroke="#166534" strokeWidth="3" strokeLinejoin="round" />
        <circle cx="282" cy="198" r="4.5" fill="#166534" />

        <line x1="200" y1="340" x2="195" y2="375" stroke="#f59e0b" strokeWidth="5" strokeLinecap="round" />
        <line x1="230" y1="340" x2="235" y2="375" stroke="#f59e0b" strokeWidth="5" strokeLinecap="round" />
      </g>

      <g transform="translate(150,330)">
        <circle cx="0" cy="0" r="34" fill="url(#shieldGrad)" stroke="white" strokeWidth="5" />
        <path d="M-14 0 l9 10 l20 -22" stroke="white" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
}
