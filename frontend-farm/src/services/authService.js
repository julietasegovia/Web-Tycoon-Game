// ─────────────────────────────────────────────────────────────────────────────
//  services/authService.js
// ─────────────────────────────────────────────────────────────────────────────

// ── Configuration ─────────────────────────────────────────────────────────────

<<<<<<< HEAD
// Get the backend URL
const getApiBaseUrl = () => {
  // Env var takes priority
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  // In dev, Vite proxy handles forwarding to port 3005
  // In production, use relative URLs (same origin as frontend)
  return '';
=======
// Get the backend URL - point to your actual backend server
const getApiBaseUrl = () => {
  // If you have an environment variable, use it
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  
  // For production - change this to your actual backend IP and port
  // Since your frontend is at 200.3.127.46:3005, backend should be at 200.3.127.46:3005
  return 'http://localhost:3005';
>>>>>>> 1ce596e15df1a418ce8dc22c2d3b84e6f0cfda9a
};

export const API_BASE = getApiBaseUrl();

// ── Internal helper ───────────────────────────────────────────────────────────

async function request(endpoint, { method = "GET", body, token } = {}) {
  const headers = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  // Ensure endpoint starts with /api
  const fullEndpoint = endpoint.startsWith('/api') ? endpoint : `/api${endpoint}`;
  
  // Construct full URL
  const url = `${API_BASE}${fullEndpoint}`;
  
  console.log(`📡 ${method} request to: ${url}`);

  try {
    const res = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
      mode: 'cors',  // Explicitly enable CORS
    });

    let data = null;
    const text = await res.text();
    
    try {
      data = text ? JSON.parse(text) : null;
    } catch {
      if (!res.ok) {
        throw new Error(`Server error ${res.status}: unexpected response format`);
      }
    }

    if (!res.ok) {
      throw new Error(data?.message ?? `Request failed with status ${res.status}`);
    }
    
    return data;
  } catch (error) {
    console.error(`❌ Request failed:`, error);
    throw error;
  }
}

// ── Public API ────────────────────────────────────────────────────────────────

export const signup = (fields) =>
  request("/auth/signup", { method: "POST", body: fields });

export const login = (fields) =>
  request("/auth/login", { method: "POST", body: fields });

export const getMe = (token) =>
  request("/auth/me", { token });

export const logout = (token) =>
  request("/auth/logout", { method: "POST", token });