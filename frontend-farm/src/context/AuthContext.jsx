// ─────────────────────────────────────────────────────────────────────────────
//  context/AuthContext.jsx
//
//  Provides { user, token, loading, isLoggedIn, saveSession, clearSession }
//  to the entire app via useContext(AuthContext).
//
//  Token is persisted in localStorage so the session survives page refresh.
//  On mount it calls getMe() to verify the saved token is still valid.
// ─────────────────────────────────────────────────────────────────────────────

import { createContext, useState, useEffect } from "react";
import { getMe } from "../services/authService";
import { useGameStore } from "../store/UseGameStore";

export const AuthContext = createContext(null);

const TOKEN_KEY = "tycoon_token";

export function AuthProvider({ children }) {
  const [user,    setUser]    = useState(null);
  const [token,   setToken]   = useState(() => localStorage.getItem(TOKEN_KEY));
  const [loading, setLoading] = useState(!!localStorage.getItem(TOKEN_KEY));

  // Restore session on first load if a token exists
  useEffect(() => {
  const token = localStorage.getItem(TOKEN_KEY); // ← use the constant

  if (!token) {
    setLoading(false); // ← must set false here too
    return;
  }

  getMe(token)
    .then(async ({ user }) => {
      saveSession({ user, token });

      const { state } = await fetch('/api/game/state', {
        headers: { Authorization: `Bearer ${token}` }
      }).then(r => r.json());

      if (state) useGameStore.getState().loadGameState(state);
    })
    .catch(() => clearSession())
    .finally(() => setLoading(false));
}, []);
  // ── Helpers ──────────────────────────────────────────────────────────────────

  function saveSession({ user, token }) {
    localStorage.setItem(TOKEN_KEY, token);
    setToken(token);
    setUser(user);
  }

  function clearSession() {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setUser(null);
  }

  // ── Value exposed to consumers ────────────────────────────────────────────────

  return (
    <AuthContext.Provider value={{ user, token, loading, isLoggedIn: !!user, saveSession, clearSession }}>
      {children}
    </AuthContext.Provider>
  );
}
