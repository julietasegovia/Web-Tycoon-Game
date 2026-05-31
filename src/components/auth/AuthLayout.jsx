// ─────────────────────────────────────────────────────────────────────────────
//  components/auth/AuthLayout.jsx
//
//  Two-column shell:  left = branding art,  right = form slot (children).
//  On mobile it collapses to a single centered column.
// ─────────────────────────────────────────────────────────────────────────────

// Animated background hex grid (pure CSS/SVG, no deps)

import background from '../../assets/bg-farm.gif';


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
        <div className="absolute inset-0 bg-black/40" />

        {/* Glowing radial blob */}
        <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full
                        bg-gold-400/5 blur-3xl pointer-events-none" />

        {/* Logo */}
        <div className="relative z-10">
          <div className="flex items-center gap-2">
            <span className="text-gold-400 text-2xl leading-none h-10 font-bold">𖧧</span>
            <span className=" text-3xl text-slate-100 tracking-widest">
              FARM TYCOON
            </span>
          </div>
        </div>

        {/* Hero copy */}
        <div className="relative z-10 space-y-7">
          <h1 className=" text-[5.1rem] leading-[0.9] text-zinc-100 tracking-wide">
            BUILD<br /><br />
            <span className="text-amber-400 animate-flicker">YOUR</span><br /><br />
            OWN BARN
          </h1>

          <p className="text-amber-200 text-base leading-relaxed max-w-xs font-light">
            Start with a simple farm house. Scale into an full barn with chickens, cows, fishing and more!
          </p>
        </div>

        {/* Bottom tagline */}
        <div className="flex">
          <p className="pt-4 pr-2 relative z-10 text-[11px] text-ink-600 tracking-widest uppercase">
            Grow your dreams!
          </p> 
          <p className='text-[20px] ls font-bold mt-1'>𓀚 𓃔𓃽</p>
        </div>
      </div>

      {/* ── RIGHT: Form panel ────────────────────────────────────────────── */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 relative bg-amber-100">
        {/* Mobile logo */}
        <div className="absolute top-4 left-6 lg:hidden flex items-center gap-1.5">
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
