import React from "react"
import { Navigate, useLocation } from "react-router-dom"

import { useAuth } from "../../../hooks/useAuth.js"

const ProtectedRoute = ({ children }) => {
  const { token, isAuthReady } = useAuth()
  const location = useLocation()

  if (!isAuthReady) {
    return null
  }

  if (!token) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }

  return children
}

export default ProtectedRoute
