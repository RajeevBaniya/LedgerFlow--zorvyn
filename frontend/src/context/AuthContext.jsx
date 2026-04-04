import React, { createContext, useCallback, useMemo, useState } from "react"

import { decodeJwtPayload } from "../utils/jwtDecode.js"

const AuthContext = createContext(null)

const readSessionFromStorage = () => {
  const stored = localStorage.getItem("token")

  if (!stored) {
    return { user: null, token: null }
  }

  const payload = decodeJwtPayload(stored)

  if (!payload?.sub || !payload?.role) {
    localStorage.removeItem("token")
    return { user: null, token: null }
  }

  return {
    token: stored,
    user: { id: payload.sub, role: payload.role }
  }
}

const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(readSessionFromStorage)

  const login = useCallback((newToken) => {
    const payload = decodeJwtPayload(newToken)

    if (!payload?.sub || !payload?.role) {
      return
    }

    localStorage.setItem("token", newToken)
    setSession({
      token: newToken,
      user: { id: payload.sub, role: payload.role }
    })
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem("token")
    setSession({ user: null, token: null })
  }, [])

  const value = useMemo(() => {
    return {
      user: session.user,
      token: session.token,
      isAuthReady: true,
      login,
      logout
    }
  }, [session.user, session.token, login, logout])

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
