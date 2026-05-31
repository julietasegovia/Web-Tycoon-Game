/**
 * @fileoverview Formulario de registro para Farm Tycoon.
 * Incluye validación del lado del cliente antes de enviar al servidor,
 * y delega la lógica de creación de cuenta al hook `useAuth`.
 *
 * @author Farm Tycoon
 * @version 1.0.0
 */

import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import FormField from "./FormField";
import ErrorBanner from "./ErrorBanner";

// ─────────────────────────────────────────────────────────────────────────────

/** @type {{ username: string, email: string, password: string, confirm: string }} */
const EMPTY = { username: "", email: "", password: "", confirm: "" };

// ─────────────────────────────────────────────────────────────────────────────

/**
 * Valida los campos del formulario de registro en el lado del cliente.
 *
 * @param {Object} fields
 * @param {string} fields.username - Nombre de usuario.
 * @param {string} fields.email    - Correo electrónico.
 * @param {string} fields.password - Contraseña.
 * @param {string} fields.confirm  - Confirmación de contraseña.
 * @returns {Object.<string, string>} Objeto con los errores encontrados,
 *   donde la clave es el nombre del campo y el valor es el mensaje de error.
 *   Retorna `{}` si no hay errores.
 *
 * @example
 * const errors = validate({ username: "ab", email: "mal", password: "1234", confirm: "4321" })
 * // { username: "At least 3 characters", email: "Enter a valid email",
 * //   password: "At least 8 characters", confirm: "Passwords don't match" }
 */
function validate({ username, email, password, confirm }) {
  const errors = {};
  if (username.trim().length < 3)     errors.username = "At least 3 characters";
  if (!/\S+@\S+\.\S+/.test(email))    errors.email    = "Enter a valid email";
  if (password.length < 8)            errors.password = "At least 8 characters";
  if (password !== confirm)           errors.confirm  = "Passwords don't match";
  return errors;
}

// ─────────────────────────────────────────────────────────────────────────────

/**
 * Formulario de registro con validación client-side por campo.
 *
 * - Valida los datos antes de llamar al servidor.
 * - Muestra errores por campo bajo cada input.
 * - Muestra errores globales del servidor con `<ErrorBanner>`.
 * - El campo `confirm` no se envía al servidor (solo validación local).
 * - Llama a `onSuccess` si el registro fue exitoso.
 *
 * @component
 * @param {Object}     props
 * @param {() => void} [props.onSuccess] - Callback ejecutado tras registro exitoso.
 *                                         Típicamente redirige al juego.
 * @param {() => void} [props.onSwitch]  - Callback para navegar al formulario de login.
 * @returns {JSX.Element}
 *
 * @example
 * <SignupForm
 *   onSuccess={() => navigate('/farm')}
 *   onSwitch={() => setView('login')}
 * />
 */
export default function SignupForm({ onSuccess, onSwitch }) {
  const [form,        setForm]        = useState(EMPTY);
  const [fieldErrors, setFieldErrors] = useState({});
  const { handleSignup, loading, error } = useAuth();

  /**
   * Actualiza un campo del formulario y limpia su error previo si existía.
   * @param {React.ChangeEvent<HTMLInputElement>} e
   */
  function onChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) setFieldErrors((prev) => ({ ...prev, [name]: null }));
  }

  /**
   * Valida el formulario y, si es válido, llama a `handleSignup`.
   * El campo `confirm` se omite del payload enviado al servidor.
   * @param {React.FormEvent<HTMLFormElement>} e
   */
  async function onSubmit(e) {
    e.preventDefault();
    const errors = validate(form);
    if (Object.keys(errors).length) return setFieldErrors(errors);

    const { confirm, ...payload } = form; // no enviar `confirm` al servidor
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
      <form onSubmit={onSubmit} className="space-y-3 pb-5">
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
          placeholder="Same as above"
          value={form.confirm}
          onChange={onChange}
          error={fieldErrors.confirm}
          autoComplete="new-password"
          required
        />

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

      {/* Switch to login */}
      <p className="text-center text-sm text-yellow-950 text-slate-500 pt-0">
        Already have a tycoon?{" "}
        <button type="button" onClick={onSwitch} className="btn-link">
          Log in
        </button>
      </p>
    </div>
  );
}