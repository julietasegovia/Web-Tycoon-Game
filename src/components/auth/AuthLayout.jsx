// ─────────────────────────────────────────────────────────────────────────────
//  components/auth/AuthLayout.jsx
//
//  Two-column shell:  left = branding art,  right = form slot (children).
//  On mobile it collapses to a single centered column.
// ─────────────────────────────────────────────────────────────────────────────

// Animated background hex grid (pure CSS/SVG, no deps)

import background from '../../assets/bg2.gif';


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

      {/* ── LEFT: Branding panel with background image ───────────────────── */}
      <div 
        className="hidden lg:flex lg:w-[52%] flex-col justify-between
                   border-r border-ink-700 p-16 relative overflow-hidden"
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Dark overlay for better text contrast */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Glowing radial blob */}
        <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full
                        bg-gold-400/5 blur-3xl pointer-events-none" />

        {/* Logo */}
        <div className="relative z-10">
          <div className="flex items-center gap-2">
            <span className="text-gold-400 text-2xl leading-none">𖧧</span>
            <span className=" text-3xl text-slate-100 tracking-widest">
              FARM TYCOON
            </span>
          </div>
        </div>

        {/* Hero copy */}
        <div className="relative z-10 space-y-7">
          <h1 className=" text-[5.1rem] leading-[0.9] text-slate-100 tracking-wide">
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
              { v: "0", l: "Players" },
              { v: "0", l: "Virtual revenue" },
              { v: "0", l: "Uptime" },
            ].map(({ v, l }) => (
              <div key={l} className="border-l-2 border-gold-500/40 pl-3">
                <div className=" text-xl text-gold-400 tracking-wider">{v}</div>
                <div className="text-[11px] text-slate-600 uppercase tracking-widest mt-0.5">{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom tagline */}
        <div className="flex">
          <p className="pt-4 pr-2 relative z-10 text-[11px] text-ink-600 tracking-widest uppercase">
            Grow your dreams.
          </p> 
          <p className='text-[20px] ls'>𓀚 𓃔𓃽</p>
        </div>
      </div>

      {/* ── RIGHT: Form panel ────────────────────────────────────────────── */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 relative bg-amber-100">
        {/* Mobile logo */}
        <div className="absolute top-6 left-6 lg:hidden flex items-center gap-1.5">
          <span className="text-gold-400">𖧧</span>
          <span className=" text-xl text-slate-100 tracking-widest">FARM TYCOON</span>
        </div>

        <div className="w-full max-w-[400px] animate-slide-up">
          {children}
        </div>
      </div>

    </div>
  );
}
