import { useContext } from "react";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import AuthPage      from "./pages/AuthPage";
import DashboardPage from "./pages/DashboardPage";

function AppShell() {
  const { isLoggedIn, loading, saveSession } = useContext(AuthContext);

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

export default function App() {
  return (
    <AuthProvider>
      <AppShell />
    </AuthProvider>
  );
}
