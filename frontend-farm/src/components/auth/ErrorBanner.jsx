// components/auth/ErrorBanner.jsx
// Shows server-side errors at the top of the form.

export default function ErrorBanner({ message }) {
  if (!message) return null;
  return (
    <div className="flex items-start gap-3 bg-red-500/10 border border-red-500/25 rounded-md px-4 py-3">
      <span className="text-red-400 mt-0.5 mb-1 text-base leading-none">⚠</span>
      <p className="text-red-400 text-sm leading-snug">{message}</p>
    </div>
  );
}
