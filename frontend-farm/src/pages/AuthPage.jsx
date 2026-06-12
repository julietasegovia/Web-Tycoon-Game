// ─────────────────────────────────────────────────────────────────────────────
//  AuthPage.jsx
//
//  Reads auth state from AuthContext.
//  - While the token is being verified on mount → blank screen (avoids flash)
//  - Once verified: if logged in → Farm, otherwise → auth forms
// ─────────────────────────────────────────────────────────────────────────────
// pages/AuthPage.jsx (Simplificado)
import { useState } from "react";
import AuthLayout from "../components/auth/AuthLayout";
import LoginForm  from "../components/auth/LoginForm";
import SignupForm from "../components/auth/SignupForm";

export default function AuthPage() {
  const [view, setView] = useState("login");

  return (
    <AuthLayout>
      {view === "login" ? (
        <LoginForm onSwitch={() => setView("signup")} />
      ) : (
        <SignupForm onSwitch={() => setView("login")} />
      )}
    </AuthLayout>
  );
}