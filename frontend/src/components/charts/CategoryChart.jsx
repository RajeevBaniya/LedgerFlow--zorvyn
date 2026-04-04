import React, { useEffect, useMemo, useState } from "react"
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

import { formatRupee } from "../../utils/formatCurrency.js"
import { parseRupeesString } from "../../utils/parseRupeesString.js"

const TOP_SLICES = 5

const SLICE_COLORS = [
  "#2563EB",
  "#16A34A",
  "#D97706",
  "#64748B",
  "#7C3AED",
  "#0D9488"
]

const tooltipSurface = {
  backgroundColor: "#FFFFFF",
  borderRadius: "8px",
  border: "1px solid #E5E7EB",
  color: "#111827",
  boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.08), 0 4px 6px -4px rgb(0 0 0 / 0.08)"
}

const buildChartRows = (categories) => {
  if (!Array.isArray(categories) || categories.length === 0) {
    return []
  }

  const rows = categories
    .map((row) => {
      return {
        name: row.category,
        total: parseRupeesString(row.total)
      }
    })
    .filter((row) => row.total > 0)

  if (rows.length === 0) {
    return []
  }

  rows.sort((a, b) => b.total - a.total)

  if (rows.length <= TOP_SLICES) {
    return rows
  }

  const top = rows.slice(0, TOP_SLICES)
  const restTotal = rows.slice(TOP_SLICES).reduce((sum, row) => sum + row.total, 0)

  if (restTotal > 0) {
    top.push({ name: "Others", total: restTotal })
  }

  return top
}

const useMinWidth = (query) => {
  const [matches, setMatches] = useState(() => {
    if (typeof window === "undefined") {
      return false
    }

    return window.matchMedia(query).matches
  })

  useEffect(() => {
    const media = window.matchMedia(query)

    const onChange = () => {
      setMatches(media.matches)
    }

    onChange()
    media.addEventListener("change", onChange)

    return () => {
      media.removeEventListener("change", onChange)
    }
  }, [query])

  return matches
}

const CategoryChart = ({ categories }) => {
  const data = useMemo(() => {
    return buildChartRows(categories)
  }, [categories])

  const isLgUp = useMinWidth("(min-width: 1024px)")
  const isEmpty = data.length === 0

  const legendProps = isLgUp
    ? {
        layout: "vertical",
        align: "right",
        verticalAlign: "middle",
        wrapperStyle: { paddingLeft: 8 }
      }
    : {
        layout: "horizontal",
        align: "center",
        verticalAlign: "bottom",
        wrapperStyle: { paddingTop: 8 }
      }

  return (
    <div className="relative h-full min-h-[240px] w-full min-w-0">
      <div className="flex h-full w-full flex-col lg:flex-row lg:items-center">
        <div className="h-full min-h-0 w-full min-w-0 flex-1">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart margin={{ top: 8, right: 12, bottom: 8, left: 12 }}>
              <Pie
                data={data}
                dataKey="total"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={1}
              >
                {data.map((entry, index) => {
                  return (
                    <Cell
                      key={`${entry.name}-${index}`}
                      fill={SLICE_COLORS[index % SLICE_COLORS.length]}
                    />
                  )
                })}
              </Pie>
              <Tooltip
                contentStyle={tooltipSurface}
                formatter={(value) => {
                  return [formatRupee(value), "Total"]
                }}
              />
              <Legend
                {...legendProps}
                formatter={(value) => {
                  return <span className="text-xs text-gray-700 sm:text-sm">{value}</span>
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
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

export default CategoryChart
