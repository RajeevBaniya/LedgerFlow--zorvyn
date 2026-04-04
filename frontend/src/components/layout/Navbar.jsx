import React from "react"
import { Menu } from "lucide-react"

import LedgerFlowBrand from "../common/LedgerFlowBrand.jsx"
import LogoutButton from "../common/ui/LogoutButton.jsx"
import { useAuth } from "../../hooks/useAuth.js"

const Navbar = ({ onOpenMenu }) => {
  const { user } = useAuth()

  return (
    <header className="sticky top-0 flex h-14 shrink-0 items-center justify-between gap-2 border-b border-white/10 bg-white/10 px-4 backdrop-blur-md md:h-16 md:px-6">
      <div className="flex min-w-0 flex-1 items-center gap-2 md:gap-3">
        <button
          type="button"
          className="shrink-0 rounded-md p-2 text-finance-light transition-all duration-200 hover:bg-white/10 md:hidden"
          onClick={onOpenMenu}
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" aria-hidden />
        </button>
        <LedgerFlowBrand
          layout="inline"
          className="min-w-0 md:hidden"
        />
      </div>
      <div className="flex shrink-0 items-center gap-2 md:gap-4">
        <span className="max-w-[5.5rem] truncate text-xs text-finance-secondary sm:max-w-none sm:text-sm">
          {user?.role ?? "—"}
        </span>
        <LogoutButton />
      </div>
    </header>
  )
}

export default Navbar
