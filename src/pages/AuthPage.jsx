// ─────────────────────────────────────────────────────────────────────────────
//  pages/AuthPage.jsx
//
//  Renders either LoginForm or SignupForm inside AuthLayout.
//  Uses local state to switch views — no router required.
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from "react";
import AuthLayout from "../components/auth/AuthLayout";
import LoginForm  from "../components/auth/LoginForm";
import SignupForm from "../components/auth/SignupForm";

export default function AuthPage({ onAuthSuccess }) {
  const [view, setView] = useState("login"); // "login" | "signup"

  return (
    <AuthLayout>
      {view === "login" ? (
        <LoginForm
          onSuccess={onAuthSuccess}
          onSwitch={() => setView("signup")}
        />
      ) : (
        <SignupForm
          onSuccess={onAuthSuccess}
          onSwitch={() => setView("login")}
        />
      )}
    </AuthLayout>
  );
}
