import React from "react"
import { FileText, LayoutDashboard, Shield } from "lucide-react"
import { NavLink } from "react-router-dom"

import LedgerFlowBrand from "../common/LedgerFlowBrand.jsx"
import { useAuth } from "../../hooks/useAuth.js"

const navItems = [
  {
    to: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    roles: ["ADMIN", "ANALYST", "VIEWER"]
  },
  {
    to: "/records",
    label: "Records",
    icon: FileText,
    roles: ["ADMIN", "ANALYST"]
  },
  {
    to: "/admin",
    label: "Admin",
    icon: Shield,
    roles: ["ADMIN"]
  }
]

const linkClass = ({ isActive }) => {
  const base =
    "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-all duration-200"
  if (isActive) {
    return `${base} bg-finance-primary text-white`
  }
  return `${base} text-finance-secondary hover:bg-finance-hover hover:text-finance-light`
}

const Sidebar = ({ isMobileOpen, onNavigate }) => {
  const { user } = useAuth()
  const role = user?.role

  const visibleItems = navItems.filter((item) => {
    return role && item.roles.includes(role)
  })

  const panelClass =
    isMobileOpen === true
      ? "translate-x-0"
      : "-translate-x-full md:translate-x-0"

  return (
    <aside
      className={`fixed left-0 top-0 z-40 flex h-full w-64 shrink-0 flex-col border-r border-finance-border bg-finance-surface transition-transform duration-200 ease-out md:relative md:z-auto md:h-screen ${panelClass}`}
    >
      <div className="shrink-0 border-b border-finance-border px-3 py-3 sm:px-4 sm:py-4">
        <LedgerFlowBrand layout="inline" />
      </div>
      <nav className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto p-3">
        {visibleItems.map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/dashboard"}
              className={linkClass}
              onClick={onNavigate}
            >
              <Icon className="h-4 w-4 shrink-0" aria-hidden />
              {item.label}
            </NavLink>
          )
        })}
      </nav>
    </aside>
  )
}

export default Sidebar
