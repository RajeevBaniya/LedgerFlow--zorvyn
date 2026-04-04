import React from "react"

const SummaryCard = ({ title, value, valueClassName = "" }) => {
  return (
    <div className="glass-surface-interactive p-4">
      <p className="text-sm text-gray-900 md:text-base">{title}</p>
      <p
        className={`mt-2 text-lg font-semibold text-gray-900 md:text-xl ${valueClassName}`}
      >
        {value}
      </p>
    </div>
  )
}

export default SummaryCard
