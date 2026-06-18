// ─────────────────────────────────────────────────────────────────────────────
//  hooks/useAuth.js
//
//  Exposes auth actions (handleLogin, handleSignup, handleLogout) together
//  with request-level loading and error state.
//
//  Components call these instead of touching the service or context directly.
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import * as authService from "../services/authService"
import { useGameStore } from "../store/UseGameStore"

export function useAuth() {
  const { saveSession, clearSession, updateUser, ...authState } = useContext(AuthContext)

  const loadGameState = useGameStore((s) => s.loadGameState)
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState(null)

  async function handleSignup(formData) {
    setError(null)
    setLoading(true)
    try {
      const result = await authService.signup(formData)
      saveSession(result)
      return result        
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleLogin(formData) {
  setError(null)
  setLoading(true)
  try {
    const result = await authService.login(formData)
    saveSession(result)

    // Load saved game state after login
    const { state } = await fetch('/api/game/state', {
      headers: { Authorization: `Bearer ${result.token}` }
    }).then(r => r.json())

    if (state) loadGameState(state)

    return result
  } catch (err) {
    setError(err.message)
  } finally {
    setLoading(false)
  }
}

  async function handleLogout() {
    try {
      await authService.logout(authState.token)
    } finally {
      clearSession()
    }
  }

  async function handleUpdateProfilePicture(base64Image) {
    setError(null)
    setLoading(true)
    try {
      const result = await authService.updateProfilePicture(authState.token, base64Image)
      updateUser(result.user)
      return result
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return { ...authState, loading, error, setError, handleSignup, handleLogin, handleLogout, handleUpdateProfilePicture }
}