import React from "react"

const PageLoading = ({ label = "Loading…" }) => {
  return (
    <div
      className="flex flex-col items-center justify-center gap-3 py-16 text-finance-secondary"
      role="status"
      aria-live="polite"
    >
      <span
        className="h-9 w-9 animate-spin rounded-full border-2 border-finance-border border-t-finance-primary"
        aria-hidden
      />
      <span className="text-sm md:text-base">{label}</span>
    </div>
  )
}

export default PageLoading
