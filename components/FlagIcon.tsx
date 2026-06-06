export default function FlagIcon({ code }: { code: 'tr' | 'gb' | 'sa' }) {
  const flags = {
    tr: (
      <svg viewBox="0 0 640 480" className="w-full h-full">
        <rect width="640" height="480" fill="#e30a17"/>
        <circle cx="280" cy="240" r="120" fill="#fff"/>
        <circle cx="300" cy="240" r="96" fill="#e30a17"/>
        <path d="m380 200 30 92.4-78.4-57h96.8l-78.4 57z" fill="#fff"/>
      </svg>
    ),
    gb: (
      <svg viewBox="0 0 640 480" className="w-full h-full">
        <path fill="#012169" d="M0 0h640v480H0z"/>
        <path fill="#FFF" d="m75 0 244 181L562 0h78v62L400 241l240 178v61h-80L320 301 81 480H0v-60l239-178L0 64V0h75z"/>
        <path fill="#C8102E" d="m424 281 216 159v40L369 281h55zm-184 20 6 35L54 480H0l240-179zM640 0v3L391 191l2-44L590 0h50zM0 0l239 176h-60L0 42V0z"/>
        <path fill="#FFF" d="M241 0v480h160V0H241zM0 160v160h640V160H0z"/>
        <path fill="#C8102E" d="M0 193v96h640v-96H0zM273 0v480h96V0h-96z"/>
      </svg>
    ),
    sa: (
      <svg viewBox="0 0 900 600" className="w-full h-full">
        <rect width="900" height="600" fill="#165b33"/>
        {/* Sword */}
        <g fill="#fff">
          <rect x="150" y="380" width="280" height="8"/>
          <rect x="420" y="365" width="12" height="38"/>
          <path d="M440 365 l20 0 l5 10 l-5 10 l-20 0 z"/>
          <rect x="145" y="378" width="8" height="12"/>
        </g>
        {/* Shahada text - simplified representation */}
        <g fill="#fff" transform="translate(450, 240)">
          <text fontSize="85" fontFamily="Arial, sans-serif" fontWeight="bold" textAnchor="middle">
            لا إله إلا الله
          </text>
          <text fontSize="70" fontFamily="Arial, sans-serif" fontWeight="bold" textAnchor="middle" y="80">
            محمد رسول الله
          </text>
        </g>
      </svg>
    ),
  };

  return (
    <div className="w-full h-full rounded-lg overflow-hidden shadow-md border border-gray-200">
      {flags[code]}
    </div>
  );
}
