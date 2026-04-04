import React from "react"

import { formatRupee } from "../../../utils/formatCurrency.js"

const RecentActivity = ({ items }) => {
  const rows = Array.isArray(items) ? items.slice(0, 10) : []

  if (rows.length === 0) {
    return (
      <div className="glass-surface-interactive">
        <h2 className="border-b border-white/20 px-4 py-3 text-sm font-medium text-gray-900 md:text-base">
          Recent activity
        </h2>
        <div
          className="flex min-h-[120px] items-center justify-center px-4 py-8 text-sm text-gray-900 md:text-base"
          aria-live="polite"
        >
          No data
        </div>
      </div>
    )
  }

  return (
    <div className="glass-surface-interactive">
      <h2 className="border-b border-white/20 px-4 py-3 text-sm font-medium text-gray-900 md:text-base">
        Recent activity
      </h2>
      <ul className="divide-y divide-white/20">
        {rows.map((row) => {
          const typeClass =
            row.type === "INCOME" ? "text-finance-success" : "text-finance-danger"
          const when = row.date
            ? new Date(row.date).toLocaleDateString(undefined, {
                year: "numeric",
                month: "short",
                day: "numeric"
              })
            : "—"

          return (
            <li
              key={row.id}
              className="flex flex-wrap items-baseline justify-between gap-2 px-4 py-3 transition-colors duration-200 hover:bg-white/15"
            >
              <div>
                <p className="text-sm text-gray-900">{row.category}</p>
                <p className="text-xs text-gray-900">{when}</p>
              </div>
              <div className="text-right">
                <p className={`text-sm font-medium ${typeClass}`}>
                  {formatRupee(row.amount)}
                </p>
                <p className="text-xs text-gray-900">{row.type}</p>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default RecentActivity
