// App.jsx
import { useContext, useMemo } from "react";
import { useShallow } from "zustand/react/shallow"; // ← add this
import { AuthProvider, AuthContext } from "./context/AuthContext";
import AuthPage from "./pages/AuthPage";
import Farm from "./pages/Farm";
import { useGameStore } from "./store/UseGameStore";
import { useAutosave } from "./hooks/useAutosave";

function AppShell() {
  const { isLoggedIn, loading, token } = useContext(AuthContext);

  const gameState = useGameStore(
    useShallow((s) => ({         // ← useShallow does shallow comparison
      oro: s.oro,
      parcelas: s.parcelas,
      boostersActivos: s.boostersActivos,
      cultivoSeleccionado: s.cultivoSeleccionado,
    }))
  );

  useAutosave(token, 5000);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="font-display text-2xl tracking-widest animate-pulse">
          LOADING…
        </span>
      </div>
    );
  }  

  return isLoggedIn ? <Farm /> : <AuthPage />;
}

export default function App() {
  return (
    <AuthProvider>
      <AppShell />
    </AuthProvider>
  );
}