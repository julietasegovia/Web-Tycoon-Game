/**
 * @fileoverview Formulario de inicio de sesión para Farm Tycoon.
 * Gestiona el estado local del formulario y delega la lógica de autenticación
 * al hook `useAuth`.
 *
 * @author Farm Tycoon
 * @version 1.0.0
 */

import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import FormField from "./FormField";
import ErrorBanner from "./ErrorBanner";

// ─────────────────────────────────────────────────────────────────────────────

/** @type {{ email: string, password: string }} Estado inicial vacío del formulario */
const EMPTY = { email: "", password: "" };

// ─────────────────────────────────────────────────────────────────────────────

/**
 * Formulario de login con campos de email y contraseña.
 *
 * - Muestra errores del servidor a través de `<ErrorBanner>`.
 * - Deshabilita el botón de submit mientras `loading` es `true`.
 * - Llama a `onSuccess` si la autenticación fue exitosa.
 * - Ofrece un enlace para cambiar a la vista de registro vía `onSwitch`.
 *
 * @component
 * @param {Object}    props
 * @param {() => void} [props.onSuccess] - Callback ejecutado tras un login exitoso.
 *                                         Típicamente redirige al juego.
 * @param {() => void} [props.onSwitch]  - Callback para navegar al formulario de registro.
 * @returns {JSX.Element}
 *
 * @example
 * <LoginForm
 *   onSuccess={() => navigate('/farm')}
 *   onSwitch={() => setView('signup')}
 * />
 */
export default function LoginForm({ onSuccess, onSwitch }) {
  const [form, setForm] = useState(EMPTY);
  const { handleLogin, loading, error } = useAuth();

  /**
   * Actualiza un campo del formulario en el estado local.
   * @param {React.ChangeEvent<HTMLInputElement>} e
   */
  function onChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  /**
   * Maneja el envío del formulario: llama a `handleLogin` y dispara `onSuccess`
   * si la respuesta es exitosa.
   * @param {React.FormEvent<HTMLFormElement>} e
   */
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
        <h2 className="text-yellow-950 text-5xl text-slate-100 tracking-wide leading-none">
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

      {/* Switch to signup */}
      <p className="text-center text-sm text-slate-500 text-yellow-950">
        New here?{" "}
        <button type="button" onClick={onSwitch} className="btn-link">
          Create an account
        </button>
      </p>
    </div>
  );
}