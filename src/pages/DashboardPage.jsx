// ─────────────────────────────────────────────────────────────────────────────
//  pages/DashboardPage.jsx
//  Placeholder — replace with your actual game UI.
// ─────────────────────────────────────────────────────────────────────────────

import { useAuth } from "../hooks/useAuth";

export default function DashboardPage() {
  const { user, handleLogout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6">
      <p className="text-gold-400 font-display text-2xl tracking-widest animate-flicker">◈ WEB TYCOON</p>
      <h1 className="font-display text-6xl text-slate-100 tracking-wide">
        WELCOME, {user?.username?.toUpperCase() ?? "TYCOON"}
      </h1>
      <p className="text-slate-500 text-sm">Your game dashboard goes here.</p>
      <button
        onClick={handleLogout}
        className="mt-4 text-xs text-slate-600 hover:text-red-400 transition-colors tracking-widest uppercase"
      >
        Log out
      </button>
    </div>
  );
}
