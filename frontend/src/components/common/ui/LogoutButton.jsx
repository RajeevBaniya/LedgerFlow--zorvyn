import React from "react"

import { useAuth } from "../../../hooks/useAuth.js"

const LogoutButton = () => {
  const { logout } = useAuth()

  const handleClick = () => {
    logout()
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="w-auto rounded-lg border border-finance-border px-4 py-2 text-sm text-finance-secondary transition-all duration-200 hover:bg-white/10"
    >
      Log out
    </button>
  )
}

export default LogoutButton
