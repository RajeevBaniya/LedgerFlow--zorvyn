import React from "react"
import { Wallet } from "lucide-react"

const gradientTextClass =
  "bg-gradient-to-r from-sky-300 via-blue-400 to-emerald-400 bg-clip-text text-transparent"

const LedgerFlowBrand = ({ layout = "stacked", className = "" }) => {
  const isStacked = layout === "stacked"

  const iconShell = (
    <div
      className={
        isStacked
          ? "mx-auto flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 via-sky-500 to-emerald-500 shadow-lg ring-1 ring-white/10 sm:h-11 sm:w-11 md:h-12 md:w-12"
          : "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 via-sky-500 to-emerald-500 shadow-lg ring-1 ring-white/10 sm:h-10 sm:w-10 md:h-11 md:w-11"
      }
      aria-hidden
    >
      <Wallet
        className={
          isStacked
            ? "h-5 w-5 text-white drop-shadow-sm sm:h-[1.35rem] sm:w-[1.35rem] md:h-6 md:w-6"
            : "h-[1.125rem] w-[1.125rem] text-white drop-shadow-sm sm:h-5 sm:w-5 md:h-[1.35rem] md:w-[1.35rem]"
        }
        strokeWidth={2}
      />
    </div>
  )

  const wordmark = (
    <p
      className={
        isStacked
          ? "text-center text-xl font-bold tracking-tight sm:text-2xl"
          : "min-w-0 truncate text-base font-bold tracking-tight sm:text-lg md:text-xl"
      }
    >
      <span className={`inline-block ${gradientTextClass}`}>LedgerFlow</span>
    </p>
  )

  if (isStacked) {
    return (
      <div
        className={`flex flex-col items-center space-y-2 sm:space-y-3 ${className}`.trim()}
      >
        {iconShell}
        {wordmark}
      </div>
    )
  }

  return (
    <div
      className={`flex min-w-0 items-center gap-2 sm:gap-3 ${className}`.trim()}
    >
      {iconShell}
      {wordmark}
    </div>
  )
}

export default LedgerFlowBrand
