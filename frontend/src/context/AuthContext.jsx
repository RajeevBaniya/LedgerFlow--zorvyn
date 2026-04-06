import React, { createContext, useCallback, useEffect, useMemo, useState } from "react"

import { apiClient } from "../api/axios.js"
import { decodeJwtPayload } from "../utils/jwtDecode.js"

const AuthContext = createContext(null)

const readSessionFromStorage = () => {
  const stored = localStorage.getItem("token")

  if (!stored) {
    return { user: null, token: null }
  }

  const payload = decodeJwtPayload(stored)

  if (!payload?.sub) {
    localStorage.removeItem("token")
    return { user: null, token: null }
  }

  return {
    token: stored,
    user: null
  }
}

const loadCurrentUser = async () => {
  const response = await apiClient.get("/auth/me")
  const user = response.data?.data

  if (!user?.id || !user?.role) {
    throw new Error("invalid_me_response")
  }

  return {
    id: user.id,
    role: user.role
  }
}

const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(readSessionFromStorage)
  const [isAuthReady, setIsAuthReady] = useState(false)

  useEffect(() => {
    let cancelled = false

    const syncUserFromBackend = async () => {
      if (!session.token) {
        setIsAuthReady(true)
        return
      }

      setIsAuthReady(false)

      try {
        const user = await loadCurrentUser()

        if (cancelled) {
          return
        }

        setSession((current) => {
          if (!current.token) {
            return current
          }

          return {
            token: current.token,
            user
          }
        })
      } catch (_error) {
        if (cancelled) {
          return
        }

        localStorage.removeItem("token")
        setSession({ user: null, token: null })
      } finally {
        if (!cancelled) {
          setIsAuthReady(true)
        }
      }
    }

    void syncUserFromBackend()

    return () => {
      cancelled = true
    }
  }, [session.token])

  const login = useCallback((newToken) => {
    const payload = decodeJwtPayload(newToken)

    if (!payload?.sub) {
      return
    }

    localStorage.setItem("token", newToken)
    setSession({
      token: newToken,
      user: null
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
      isAuthReady,
      login,
      logout
    }
  }, [session.user, session.token, isAuthReady, login, logout])

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
