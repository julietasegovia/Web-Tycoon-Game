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

// src/config/api.ts
// Prefer build-time VITE_API_URL, then the existing /~hosted-path heuristic,
// finally fall back to a relative `/api` so the browser talks to the same origin.
const viteApi = typeof import.meta !== 'undefined' ? import.meta.env.VITE_API_URL : undefined;
export const BASE_URL = viteApi
  ? (viteApi.endsWith('/') ? viteApi.slice(0, -1) : viteApi) + '/api'
  : window.location.pathname.startsWith('/~')
    ? `/${window.location.pathname.split('/')[1]}/api`
    : '/api';

// ── Internal helper ───────────────────────────────────────────────────────────

/**
 * Sends a JSON request and returns the parsed response.
 */
async function request(endpoint, { method = "GET", body, token } = {}) {
  const headers = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  // Ahora sí, esta línea va a usar la URL dinámica correcta en el servidor
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  // Safely parse JSON — fall back to null if body is empty or not JSON
  let data = null;
  const text = await res.text();
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    // Server sent back HTML (e.g. a 404 page) or nothing at all
    if (!res.ok) throw new Error(`Server error ${res.status}: unexpected response format`);
  }

  if (!res.ok) throw new Error(data?.message ?? "Something went wrong");
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
