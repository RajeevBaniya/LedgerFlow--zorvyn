import React, { useCallback, useState } from "react"

import Navbar from "./Navbar.jsx"
import Sidebar from "./Sidebar.jsx"

const Layout = ({ children }) => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  const openMobileNav = useCallback(() => {
    setMobileNavOpen(true)
  }, [])

  const closeMobileNav = useCallback(() => {
    setMobileNavOpen(false)
  }, [])

  return (
    <div className="flex h-full min-h-0 overflow-hidden bg-transparent">
      <Sidebar isMobileOpen={mobileNavOpen} onNavigate={closeMobileNav} />

      <div className="relative flex min-h-0 min-w-0 flex-1 flex-col">
        {mobileNavOpen ? (
          <button
            type="button"
            className="absolute inset-0 z-20 bg-black/50 md:hidden"
            aria-label="Close menu"
            onClick={closeMobileNav}
          />
        ) : null}

        <div className="relative z-30 shrink-0">
          <Navbar onOpenMenu={openMobileNav} />
        </div>

        <main className="relative z-10 min-h-0 flex-1 overflow-y-auto px-4 py-4 md:px-6 md:py-6">
          {children}
        </main>
      </div>
    </div>
  )
}

export default Layout
