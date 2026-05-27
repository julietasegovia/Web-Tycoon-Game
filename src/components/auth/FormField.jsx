// components/auth/FormField.jsx
// Reusable label + input + optional error — keeps form JSX clean.

export default function FormField({ label, error, className = "", ...inputProps }) {
  return (
    <div className={`space-y-1 ${className}`}>
      <label className="field-label">{label}</label>
      <input className={`field ${error ? "border-red-500/60 focus:border-red-400 focus:ring-red-400/20" : ""}`} {...inputProps} />
      {error && <p className="text-xs text-red-400 mt-1 pl-0.5">{error}</p>}
    </div>
  );
}
