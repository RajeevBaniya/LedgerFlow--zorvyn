import React, { useMemo } from "react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts"

import { formatRupee } from "../../utils/formatCurrency.js"
import { parseRupeesString } from "../../utils/parseRupeesString.js"

const tooltipBox = {
  backgroundColor: "#FFFFFF",
  border: "1px solid rgba(229, 231, 235, 0.9)",
  borderRadius: "8px",
  color: "#111827",
  boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.08), 0 4px 6px -4px rgb(0 0 0 / 0.08)"
}

const TrendChart = ({ trends }) => {
  const data = useMemo(() => {
    if (!Array.isArray(trends)) {
      return []
    }

    return trends.map((row) => {
      const label = row.month ?? row.week ?? ""

      return {
        label,
        income: parseRupeesString(row.income),
        expense: parseRupeesString(row.expense)
      }
    })
  }, [trends])

  const isEmpty = data.length === 0

  const formatTrendTick = (value) => {
    if (typeof value !== "string") {
      return value
    }
    if (/^\d{4}-W\d{2}$/.test(value)) {
      return value.replace(/^\d{4}-/, "")
    }
    return value
  }

  return (
    <div className="relative h-full min-h-[240px] w-full min-w-0">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" strokeOpacity={0.3} />
          <XAxis
            dataKey="label"
            tick={{ fontSize: 12 }}
            interval="preserveStartEnd"
            minTickGap={20}
            tickFormatter={formatTrendTick}
          />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip
            contentStyle={tooltipBox}
            labelStyle={{ color: "#111827" }}
            formatter={(value, name) => [formatRupee(value), name]}
          />
          <Legend wrapperStyle={{ color: "#374151" }} />
          <Bar dataKey="income" name="Income" fill="#16A34A" radius={[4, 4, 0, 0]} barSize={20} />
          <Bar dataKey="expense" name="Expense" fill="#DC2626" radius={[4, 4, 0, 0]} barSize={20} />
        </BarChart>
      </ResponsiveContainer>
      {isEmpty ? (
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-xl bg-white/50 px-4 text-center text-sm text-gray-500 backdrop-blur-sm"
          aria-live="polite"
        >
          No data
        </div>
      ) : null}
    </div>
  )
}

export default TrendChart
