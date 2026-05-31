// ─────────────────────────────────────────────────────────────────────────────
//  components/auth/LoginForm.jsx
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import FormField from "./FormField";
import ErrorBanner from "./ErrorBanner";

const EMPTY = { email: "", password: "" };

export default function LoginForm({ onSuccess, onSwitch }) {
  const [form, setForm]     = useState(EMPTY);
  const { handleLogin, loading, error } = useAuth();

  function onChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    const result = await handleLogin(form);
    if (result) onSuccess?.();
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <p className="text-[11px] text-yellow-900 tracking-[0.2em] uppercase mb-2">
          Welcome back!
        </p>
        <h2 className="text-yellow-950  text-5xl text-slate-100 tracking-wide leading-none">
          LOG IN
        </h2>
      </div>

      {/* Form */}
      <form onSubmit={onSubmit} className="space-y-4">
        <ErrorBanner message={error} />

        <FormField
          label="Email"
          name="email"
          type="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={onChange}
          autoComplete="email"
          required
        />

        <div className="space-y-1">
          <div className="flex justify-between items-center mb-1.5">
            <label className="field-label">Password</label>
            <button type="button" className="btn-link text-[11px]">
              Forgot password?
            </button>
          </div>
          <input
            className="field"
            name="password"
            type="password"
            placeholder="Min. 8 characters"
            value={form.password}
            onChange={onChange}
            autoComplete="current-password"
            required
          />
        </div>

        <div className="pt-2">
          <button type="submit" className="btn-gold" disabled={loading}>
            {loading ? "Logging in…" : "⚘⋆˚࿔ Login ࿔˚⋆⚘"}
          </button>
        </div>
      </form>

      {/* Divider */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-ink-700" />
        <span className="text-[11px] text-yellow-900 tracking-widest uppercase">or</span>
        <div className="flex-1 h-px bg-ink-700" />
      </div>

      {/* Switch */}
      <p className="text-center text-sm text-slate-500 text-yellow-950">
        New here?{" "}
        <button type="button" onClick={onSwitch} className="btn-link">
          Create an account
        </button>
      </p>
    </div>
  );
}
