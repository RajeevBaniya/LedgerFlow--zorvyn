import React from "react"
import { Navigate } from "react-router-dom"

import { useAuth } from "../../../hooks/useAuth.js"

const RoleRoute = ({ allowedRoles, children }) => {
  const { user, isAuthReady } = useAuth()

  if (!isAuthReady) {
    return null
  }

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />
  }

  return children
}

export default RoleRoute
