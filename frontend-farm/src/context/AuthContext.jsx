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

export const AuthContext = createContext(null);

const TOKEN_KEY = "tycoon_token";

export function AuthProvider({ children }) {
  const [user,    setUser]    = useState(null);
  const [token,   setToken]   = useState(() => localStorage.getItem(TOKEN_KEY));
  const [loading, setLoading] = useState(!!localStorage.getItem(TOKEN_KEY));

  // Restore session on first load if a token exists
  useEffect(() => {
    if (!token) return;

    getMe(token)
      .then(({ user }) => setUser(user))
      .catch(() => clearSession())   // expired or invalid → wipe it
      .finally(() => setLoading(false));
  }, []);               // eslint-disable-line react-hooks/exhaustive-deps

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
