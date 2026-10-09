import React from 'react';

export function Mandala({ className = '', stroke = '#D8A642', opacity = 0.5 }: { className?: string; stroke?: string; opacity?: number }) {
  const petals = Array.from({ length: 24 });
  const spokes = Array.from({ length: 48 });
  return (
    <svg viewBox="0 0 400 400" className={className} aria-hidden style={{ opacity }}>
      <g fill="none" stroke={stroke} strokeWidth="1">
        <circle cx="200" cy="200" r="196" />
        <circle cx="200" cy="200" r="168" strokeWidth="2" />
        <circle cx="200" cy="200" r="120" />
        <circle cx="200" cy="200" r="78" />
        <circle cx="200" cy="200" r="36" strokeWidth="2" />
        {spokes.map((_, i) => {
          const a = (i * Math.PI * 2) / spokes.length;
          return <line key={i} x1={200 + 120 * Math.cos(a)} y1={200 + 120 * Math.sin(a)} x2={200 + 168 * Math.cos(a)} y2={200 + 168 * Math.sin(a)} />;
        })}
        {petals.map((_, i) => {
          const a = (i * 360) / petals.length;
          return (
            <path key={i} transform={`rotate(${a} 200 200)`} d="M200 82 C224 118 224 150 200 164 C176 150 176 118 200 82 Z" />
          );
        })}
        {petals.slice(0, 12).map((_, i) => {
          const a = (i * 360) / 12;
          return <path key={`i${i}`} transform={`rotate(${a} 200 200)`} d="M200 168 C214 186 214 196 200 200 C186 196 186 186 200 168 Z" />;
        })}
      </g>
    </svg>
  );
}

export function Divider({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`} aria-hidden>
      <span className="goldline h-px w-full max-w-[14rem] opacity-80" />
      <svg width="54" height="22" viewBox="0 0 54 22" className="shrink-0">
        <g fill="none" stroke="#D8A642" strokeWidth="1.3">
          <path d="M27 2 C33 8 33 14 27 20 C21 14 21 8 27 2Z" fill="#F4A62333" />
          <circle cx="27" cy="11" r="2.2" fill="#D8A642" stroke="none" />
          <path d="M18 11 C12 5 8 5 2 11" />
          <path d="M36 11 C42 5 46 5 52 11" />
        </g>
      </svg>
      <span className="goldline h-px w-full max-w-[14rem] opacity-80" />
    </div>
  );
}

export function Emblem({ size = 38 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden>
      <defs>
        <linearGradient id="emg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F4A623" />
          <stop offset="55%" stopColor="#D8A642" />
          <stop offset="100%" stopColor="#C94735" />
        </linearGradient>
      </defs>
      <circle cx="24" cy="24" r="22" fill="url(#emg)" opacity=".16" />
      <g fill="none" stroke="url(#emg)" strokeWidth="1.6">
        <circle cx="24" cy="24" r="21" />
        <circle cx="24" cy="24" r="13" />
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i * Math.PI) / 4;
          return <line key={i} x1={24 + 13 * Math.cos(a)} y1={24 + 13 * Math.sin(a)} x2={24 + 21 * Math.cos(a)} y2={24 + 21 * Math.sin(a)} />;
        })}
        <path d="M24 12 L33 24 L24 36 L15 24 Z" stroke="#087F8C" />
      </g>
      <circle cx="24" cy="24" r="3" fill="#C94735" />
    </svg>
  );
}

/** Layered cinematic Kurukshetra sunrise with chariot — pure SVG, parallax-ready */
export function KurukshetraScene({ px = 0, py = 0 }: { px?: number; py?: number }) {
  const banners = [60, 150, 250, 330, 430, 520, 620, 700, 800, 890, 980, 1070, 1160];
  return (
    <svg viewBox="0 0 1200 620" className="h-full w-full" preserveAspectRatio="xMidYMax slice" aria-label="Illustration: sunrise over the field of Kurukshetra with a chariot">
      <defs>
        <linearGradient id="sky2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFF8E8" />
          <stop offset="40%" stopColor="#FFE3AB" />
          <stop offset="75%" stopColor="#F7BC6C" />
          <stop offset="100%" stopColor="#E89457" />
        </linearGradient>
        <radialGradient id="sunGlow" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#FFF6D8" stopOpacity="1" />
          <stop offset="45%" stopColor="#F4A623" stopOpacity=".55" />
          <stop offset="100%" stopColor="#F4A623" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="far" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D79A64" />
          <stop offset="100%" stopColor="#C98A58" />
        </linearGradient>
        <linearGradient id="mid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C57F4C" />
          <stop offset="100%" stopColor="#A96539" />
        </linearGradient>
        <linearGradient id="near" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9A5730" />
          <stop offset="100%" stopColor="#7A4224" />
        </linearGradient>
        <linearGradient id="ray" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFF3CE" stopOpacity=".85" />
          <stop offset="100%" stopColor="#FFF3CE" stopOpacity="0" />
        </linearGradient>
      </defs>

      <rect width="1200" height="620" fill="url(#sky2)" />

      {/* sun + glow */}
      <g transform={`translate(${600 + px * 6} ${300 + py * 4})`}>
        <circle r="300" fill="url(#sunGlow)" />
        <circle r="78" fill="#FFF2C9" />
        <circle r="78" fill="none" stroke="#F4A623" strokeWidth="2" opacity=".7" />
      </g>

      {/* light rays */}
      <g opacity=".5">
        {Array.from({ length: 11 }).map((_, i) => (
          <polygon key={i} fill="url(#ray)" points={`${600 + (i - 5) * 16},300 ${520 + (i - 5) * 110},-40 ${560 + (i - 5) * 110},-40`} />
        ))}
      </g>

      {/* clouds */}
      <g opacity=".55" transform={`translate(${-px * 4} ${-py * 2})`}>
        <path d="M80 120 q40 -34 92 -16 q36 -40 92 -14 q48 -6 56 30 q-120 12 -240 10 Z" fill="#FFF6DC" />
        <path d="M820 92 q46 -38 104 -14 q42 -30 86 4 q44 2 46 28 q-130 10 -236 -18 Z" fill="#FFF6DC" />
      </g>

      {/* distant mandala in the sky */}
      <g transform={`translate(600 270) scale(1.05)`} opacity=".22">
        <g className="anim-spin-slow" style={{ transformOrigin: 'center' }}>
          <g transform="translate(-200,-200)">
            <Mandala className="" stroke="#B4761B" opacity={1} />
          </g>
        </g>
      </g>

      {/* far ridge + distant army */}
      <g transform={`translate(${px * 2} 0)`}>
        <path d="M0 400 q150 -34 300 -10 q180 28 320 -16 q200 -60 580 10 L1200 620 L0 620 Z" fill="url(#far)" opacity=".85" />
        {Array.from({ length: 70 }).map((_, i) => (
          <rect key={i} x={20 + i * 17} y={386 + ((i * 7) % 9)} width="4" height="12" rx="2" fill="#8E5B33" opacity=".5" />
        ))}
      </g>

      {/* middle ground with banners */}
      <g transform={`translate(${px * 5} 0)`}>
        <path d="M0 462 q180 -40 360 -8 q220 38 420 -14 q220 -56 420 16 L1200 620 L0 620 Z" fill="url(#mid)" />
        {banners.map((x, i) => {
          const c = ['#C94735', '#087F8C', '#792E3A', '#1769AA', '#668653'][i % 5];
          return (
            <g key={x} transform={`translate(${x} ${430 + (i % 3) * 8})`}>
              <rect x="-1.4" y="0" width="2.8" height="70" fill="#5C3418" />
              <path d="M1 2 q26 8 40 -2 q-6 16 0 30 q-18 10 -40 2 Z" fill={c} opacity=".92">
                <animateTransform attributeName="transform" type="skewX" values="0;6;0;-5;0" dur={`${4 + (i % 4)}s`} repeatCount="indefinite" />
              </path>
              <circle cx="0" cy="0" r="3" fill="#D8A642" />
            </g>
          );
        })}
      </g>

      {/* chariot — foreground, respectfully stylised silhouette in golden light */}
      <g transform={`translate(${600 + px * 10} ${492 + py * 3})`}>
        <ellipse cx="0" cy="96" rx="250" ry="20" fill="#5C3418" opacity=".25" />
        {/* horses */}
        <g fill="#FFF3D4" stroke="#8E5B33" strokeWidth="2">
          {[-250, -205, -160].map((hx, i) => (
            <g key={hx} transform={`translate(${hx} ${10 + i * 4})`}>
              <path d="M0 60 q-6 -34 14 -44 q22 -12 44 -4 q16 6 20 -6 q10 10 2 22 q-10 14 -30 16 q-4 20 -8 36 q-16 6 -22 -4 q4 -12 2 -22 q-12 6 -22 6 Z" />
              <path d="M18 72 l-4 20 M44 70 l2 22 M-6 68 l-6 22" strokeLinecap="round" />
            </g>
          ))}
        </g>
        {/* chariot body */}
        <g>
          <path d="M-130 70 L80 70 L96 16 Q20 2 -116 14 Z" fill="#B9842F" stroke="#7A4A14" strokeWidth="2.5" />
          <path d="M-116 24 Q20 12 90 26 L84 44 Q16 30 -112 42 Z" fill="#F4CE7A" opacity=".85" />
          {Array.from({ length: 9 }).map((_, i) => (
            <circle key={i} cx={-100 + i * 22} cy={34} r="3.4" fill="#C94735" />
          ))}
          {/* canopy pole + flag */}
          <rect x="70" y="-110" width="5" height="130" fill="#7A4A14" />
          <path d="M75 -108 q52 12 76 -2 q-10 26 0 46 q-34 14 -76 2 Z" fill="#087F8C" stroke="#055C66" strokeWidth="1.5">
            <animateTransform attributeName="transform" type="skewX" values="0;7;0;-6;0" dur="5s" repeatCount="indefinite" />
          </path>
          {/* wheels */}
          {[-92, 46].map((wx) => (
            <g key={wx} transform={`translate(${wx} 74)`}>
              <circle r="30" fill="none" stroke="#7A4A14" strokeWidth="6" />
              <circle r="6" fill="#D8A642" />
              {Array.from({ length: 12 }).map((_, i) => {
                const a = (i * Math.PI) / 6;
                return <line key={i} x1={0} y1={0} x2={27 * Math.cos(a)} y2={27 * Math.sin(a)} stroke="#9A6520" strokeWidth="2.4" />;
              })}
            </g>
          ))}
          {/* two figures: charioteer and archer, reverent silhouettes with halo light */}
          <g>
            <circle cx="-56" cy="-34" r="34" fill="#FFF2C9" opacity=".55" />
            <path d="M-56 -46 q12 0 13 13 q10 6 10 22 l-46 0 q0 -16 10 -22 q1 -13 13 -13 Z" fill="#1769AA" />
            <circle cx="-56" cy="-54" r="11" fill="#2E86C8" />
            <path d="M-56 -66 q10 -10 16 -2 q-8 2 -16 2Z" fill="#D8A642" />
            <path d="M-96 -20 q40 -10 72 4" stroke="#7A4A14" strokeWidth="3" fill="none" />
          </g>
          <g>
            <circle cx="16" cy="-40" r="32" fill="#FFF2C9" opacity=".4" />
            <path d="M16 -50 q12 0 13 13 q10 6 10 24 l-46 0 q0 -18 10 -24 q1 -13 13 -13 Z" fill="#792E3A" />
            <circle cx="16" cy="-58" r="10.5" fill="#B6675C" />
            <path d="M44 -74 q16 32 0 64" stroke="#5C3418" strokeWidth="3" fill="none" />
            <line x1="44" y1="-74" x2="44" y2="-10" stroke="#D8A642" strokeWidth="1.2" />
          </g>
        </g>
      </g>

      {/* near ground */}
      <path d="M0 560 q220 -26 420 -4 q240 26 420 -10 q200 -40 360 12 L1200 620 L0 620 Z" fill="url(#near)" />

      {/* drifting dust motes */}
      <g>
        {Array.from({ length: 26 }).map((_, i) => (
          <circle key={i} cx={30 + i * 45} cy={520 - ((i * 37) % 160)} r={1 + (i % 3) * 0.8} fill="#FFF3CE" opacity=".0">
            <animate attributeName="opacity" values="0;.85;0" dur={`${6 + (i % 5)}s`} begin={`${(i % 7) * 0.8}s`} repeatCount="indefinite" />
            <animate attributeName="cy" values={`${520 - ((i * 37) % 160)};${420 - ((i * 37) % 160)}`} dur={`${6 + (i % 5)}s`} begin={`${(i % 7) * 0.8}s`} repeatCount="indefinite" />
          </circle>
        ))}
      </g>
    </svg>
  );
}

export function LotusCorner({ className = '', flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden style={{ transform: flip ? 'scaleX(-1)' : undefined }}>
      <g fill="none" stroke="#D8A642" strokeWidth="1.2" opacity=".75">
        <path d="M4 4 H52 M4 4 V52" />
        <path d="M12 12 q30 0 36 36" />
        <path d="M12 44 q14 -18 32 -14" />
        <circle cx="16" cy="16" r="3.4" fill="#F4A623" stroke="none" />
      </g>
    </svg>
  );
}

export const Section: React.FC<React.PropsWithChildren<{ id?: string; className?: string }>> = ({ id, className = '', children }) => (
  <section id={id} className={`relative mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-24 ${className}`}>{children}</section>
);
