import { useContext } from "react";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import AuthPage      from "./pages/AuthPage";
import DashboardPage from "./pages/DashboardPage";

// ── Inner shell (has access to AuthContext) ───────────────────────────────────
function AppShell() {
  const { isLoggedIn, loading, saveSession } = useContext(AuthContext);

  // While restoring a saved session from localStorage, show nothing (avoids flash)
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="font-display text-2xl text-gold-400 tracking-widest animate-pulse">
          LOADING…
        </span>
      </div>
    );
  }

  return isLoggedIn
    ? <DashboardPage />
    : <AuthPage onAuthSuccess={() => {}} />;
}

// ── Root — wraps everything in the auth provider ──────────────────────────────
export default function App() {
  return (
    <AuthProvider>
      <AppShell />
    </AuthProvider>
  );
}
