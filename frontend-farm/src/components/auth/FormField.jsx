/**
 * @fileoverview Campo de formulario reutilizable con label, input y mensaje de error.
 * Centraliza los estilos de inputs para mantener consistencia visual en todos
 * los formularios de autenticación.
 *
 * @author Farm Tycoon
 * @version 1.0.0
 */

// ─────────────────────────────────────────────────────────────────────────────

/**
 * Campo de formulario compuesto por label + input + mensaje de error opcional.
 *
 * Acepta todas las props nativas de `<input>` a través de `...inputProps`,
 * por lo que puede usarse para cualquier tipo (text, email, password, etc.).
 * Cuando se pasa `error`, el borde del input se torna rojo y se muestra
 * el mensaje debajo del campo.
 *
 * @component
 * @param {Object}      props
 * @param {string}      props.label       - Texto de la etiqueta visible sobre el input.
 * @param {string}      [props.error]     - Mensaje de error a mostrar debajo del input.
 *                                          Si es falsy no se muestra nada.
 * @param {string}      [props.className] - Clases Tailwind adicionales para el contenedor.
 * @param {...*}        props.inputProps  - Cualquier prop nativa de `<input>` (name, type,
 *                                          placeholder, value, onChange, required, etc.).
 * @returns {JSX.Element}
 *
 * @example
 * // Campo simple sin error
 * <FormField
 *   label="Email"
 *   name="email"
 *   type="email"
 *   placeholder="vos@ejemplo.com"
 *   value={form.email}
 *   onChange={onChange}
 * />
 *
 * @example
 * // Campo con error de validación
 * <FormField
 *   label="Username"
 *   name="username"
 *   type="text"
 *   value={form.username}
 *   onChange={onChange}
 *   error={fieldErrors.username}
 * />
 */
export default function FormField({ label, error, className = "", ...inputProps }) {
  return (
    <div className={`space-y-1 ${className}`}>
      <label className="field-label">{label}</label>
      <input
        className={`field ${error ? "border-red-500/60 focus:border-red-400 focus:ring-red-400/20" : ""}`}
        {...inputProps}
      />
      {error && <p className="text-xs text-red-400 mt-1 pl-0.5">{error}</p>}
    </div>
  );
}