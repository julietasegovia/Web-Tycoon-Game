// ─────────────────────────────────────────────────────────────────────────────
//  components/auth/AuthLayout.jsx
//
//  Two-column shell:  left = branding art,  right = form slot (children).
//  On mobile it collapses to a single centered column.
// ─────────────────────────────────────────────────────────────────────────────

// Animated background hex grid (pure CSS/SVG, no deps)
function HexGrid() {
  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-[0.07] pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="hex" x="0" y="0" width="56" height="48" patternUnits="userSpaceOnUse">
          <polygon
            points="28,2 54,14 54,34 28,46 2,34 2,14"
            fill="none"
            stroke="#f59e0b"
            strokeWidth="0.8"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#hex)" />
    </svg>
  );
}

// Rotating golden ring decoration
function GoldenRing({ size, className }) {
  return (
    <div
      className={`rounded-full border border-gold-400/20 animate-spin-slow ${className}`}
      style={{ width: size, height: size }}
    />
  );
}

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex">

      {/* ── LEFT: Branding panel ─────────────────────────────────────────── */}
      <div className="hidden lg:flex lg:w-[52%] flex-col justify-between
                      bg-ink-900 border-r border-ink-700 p-16 relative overflow-hidden">

        <HexGrid />

        {/* Glowing radial blob */}
        <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full
                        bg-gold-400/5 blur-3xl pointer-events-none" />

        {/* Decorative rings */}
        <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <GoldenRing size={480} className="" />
          <GoldenRing size={340} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 [animation-direction:reverse] [animation-duration:12s]" />
          <GoldenRing size={200} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 [animation-duration:7s]" />
        </div>

        {/* Logo */}
        <div className="relative z-10">
          <div className="flex items-center gap-2">
            <span className="text-gold-400 text-2xl leading-none">◈</span>
            <span className="font-display text-3xl text-slate-100 tracking-widest">
              FARM TYCOON
            </span>
          </div>
        </div>

        {/* Hero copy */}
        <div className="relative z-10 space-y-7">
          <h1 className="font-display text-[5.5rem] leading-[0.9] text-slate-100 tracking-wide">
            BUILD<br />
            <span className="text-gold-400 animate-flicker">YOUR</span><br />
            OWN BARN
          </h1>

          <p className="text-slate-400 text-base leading-relaxed max-w-xs font-light">
            Start with a simple farm house. Scale into an full barn with chickens, cows, fishing and more!
          </p>

          {/* Stat pills */}
          <div className="flex gap-6 pt-1">
            {[
              { v: "12K+", l: "Players" },
              { v: "$4.2B", l: "Virtual revenue" },
              { v: "99.9%", l: "Uptime" },
            ].map(({ v, l }) => (
              <div key={l} className="border-l-2 border-gold-500/40 pl-3">
                <div className="font-display text-xl text-gold-400 tracking-wider">{v}</div>
                <div className="text-[11px] text-slate-600 uppercase tracking-widest mt-0.5">{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom tagline */}
        <p className="relative z-10 text-[11px] text-ink-600 tracking-widest uppercase">
          Grow your dreams.
        </p>
      </div>

      {/* ── RIGHT: Form panel ────────────────────────────────────────────── */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 relative bg-amber-100">
        {/* Mobile logo */}
        <div className="absolute top-6 left-6 lg:hidden flex items-center gap-1.5">
          <span className="text-gold-400">◈</span>
          <span className="font-display text-xl text-slate-100 tracking-widest">FARM TYCOON</span>
        </div>

        <div className="w-full max-w-[400px] animate-slide-up">
          {children}
        </div>
      </div>

    </div>
  );
}
