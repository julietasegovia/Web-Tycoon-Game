// ─────────────────────────────────────────────────────────────────────────────
//  components/auth/SignupForm.jsx
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import FormField from "./FormField";
import ErrorBanner from "./ErrorBanner";

const EMPTY = { username: "", email: "", password: "", confirm: "" };

// Client-side field validation — returns an object of field → error string
function validate({ username, email, password, confirm }) {
  const errors = {};
  if (username.trim().length < 3)       errors.username = "At least 3 characters";
  if (!/\S+@\S+\.\S+/.test(email))      errors.email    = "Enter a valid email";
  if (password.length < 8)              errors.password = "At least 8 characters";
  if (password !== confirm)             errors.confirm  = "Passwords don't match";
  return errors;
}

export default function SignupForm({ onSuccess, onSwitch }) {
  const [form,        setForm]        = useState(EMPTY);
  const [fieldErrors, setFieldErrors] = useState({});
  const { handleSignup, loading, error } = useAuth();

  function onChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (fieldErrors[name]) setFieldErrors((prev) => ({ ...prev, [name]: null }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    const errors = validate(form);
    if (Object.keys(errors).length) return setFieldErrors(errors);

    const { confirm, ...payload } = form;   // don't send confirm to the server
    const result = await handleSignup(payload);
    if (result) onSuccess?.();
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <p className="text-[11px] text-yellow-900 tracking-[0.2em] uppercase mb-2">
          Join the game
        </p>
        <h2 className=" text-yellow-950 text-5xl text-slate-100 tracking-wide leading-none">
          SIGN UP
        </h2>
      </div>

      {/* Form */}
      <form onSubmit={onSubmit} className="space-y-3">
        <ErrorBanner message={error} />

        <FormField
          label="Username"
          name="username"
          type="text"
          placeholder="tycoon_legend"
          value={form.username}
          onChange={onChange}
          error={fieldErrors.username}
          autoComplete="username"
          required
        />

        <FormField
          label="Email"
          name="email"
          type="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={onChange}
          error={fieldErrors.email}
          autoComplete="email"
          required
        />

        <FormField
          label="Password"
          name="password"
          type="password"
          placeholder="Min. 8 characters"
          value={form.password}
          onChange={onChange}
          error={fieldErrors.password}
          autoComplete="new-password"
          required
        />

        <FormField
          label="Confirm Password"
          name="confirm"
          type="password"
          placeholder="••••••••"
          value={form.confirm}
          onChange={onChange}
          error={fieldErrors.confirm}
          autoComplete="new-password"
          required
        />

        <p className="text-[11px] text-slate-600 leading-relaxed pt-0.5 text-yellow-900">
          By signing up you agree to our{" "}
          <button type="button" className="btn-link text-[11px]">Terms of Service</button>
          {" & "}
          <button type="button" className="btn-link text-[11px]">Privacy Policy :)</button>
        </p>

        <button type="submit" className="btn-gold" disabled={loading}>
          {loading ? "Creating account…" : "Build Your Farm!"}
        </button>
      </form>

      {/* Divider */}
      <div className="flex items-center">
        <div className="flex-1 h-px bg-ink-700" />
        <span className="text-[11px] text-ink-600 tracking-widest uppercase text-yellow-900">or</span>
        <div className="flex-1 h-px bg-ink-700" />
      </div>

      {/* Switch */}
      <p className="text-center text-sm text-yellow-950 text-slate-500 pt-0">
        Already have a tycoon?{" "}
        <button type="button" onClick={onSwitch} className="btn-link">
          Log in
        </button>
      </p>
    </div>
  );
}
