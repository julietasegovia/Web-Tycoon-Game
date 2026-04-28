// ─────────────────────────────────────────────────────────────────────────────
//  services/authService.js
//
//  All authentication HTTP calls live here and ONLY here.
//  Components never touch fetch() directly — they go through this module.
//
//  To connect your backend: set VITE_API_URL in a .env file.
//  Expected endpoints:
//    POST  /auth/signup  → { user, token }
//    POST  /auth/login   → { user, token }
//    GET   /auth/me      → { user }          (requires Bearer token)
//    POST  /auth/logout  → { ok: true }      (requires Bearer token)
// ─────────────────────────────────────────────────────────────────────────────

const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:4000/api";

// ── Internal helper ───────────────────────────────────────────────────────────

/**
 * Sends a JSON request and returns the parsed response.
 * Throws an Error with the server's message on non-2xx status.
 */
async function request(endpoint, { method = "GET", body, token } = {}) {
  const headers = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message ?? "Something went wrong");
  return data;
}

// ── Public API ────────────────────────────────────────────────────────────────

/** Create a new account. Returns { user, token }. */
export const signup = (fields) =>
  request("/auth/signup", { method: "POST", body: fields });

/** Log in with email + password. Returns { user, token }. */
export const login = (fields) =>
  request("/auth/login", { method: "POST", body: fields });

/** Fetch the logged-in user's profile. Returns { user }. */
export const getMe = (token) =>
  request("/auth/me", { token });

/** Invalidate the session server-side. */
export const logout = (token) =>
  request("/auth/logout", { method: "POST", token });
