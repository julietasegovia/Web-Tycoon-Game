/**
 * @fileoverview Banner de error para los formularios de autenticación.
 * Muestra mensajes de error provenientes del servidor de forma destacada.
 *
 * @author Farm Tycoon
 * @version 1.0.0
 */

// ─────────────────────────────────────────────────────────────────────────────

/**
 * Banner de error con ícono de advertencia.
 * Si `message` es falsy el componente no renderiza nada (`null`),
 * por lo que es seguro incluirlo siempre en el formulario.
 *
 * @component
 * @param {Object}      props
 * @param {string|null} props.message - Mensaje de error a mostrar.
 *                                      Si es `null`, `undefined` o cadena vacía
 *                                      el banner se oculta automáticamente.
 * @returns {JSX.Element|null}
 *
 * @example
 * // Muestra el banner
 * <ErrorBanner message="Credenciales inválidas" />
 *
 * @example
 * // No renderiza nada
 * <ErrorBanner message={null} />
 */
export default function ErrorBanner({ message }) {
  if (!message) return null;

  return (
    <div className="flex items-start gap-3 bg-red-500/10 border border-red-500/25 rounded-md px-4 py-3">
      <span className="text-red-400 mt-0.5 mb-1 text-base leading-none">⚠</span>
      <p className="text-red-400 text-sm leading-snug">{message}</p>
    </div>
  );
}