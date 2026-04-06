import React, { useState } from "react"

import CategoryChart from "../components/charts/CategoryChart.jsx"
import TrendChart from "../components/charts/TrendChart.jsx"
import RecentActivity from "../components/common/dashboard/RecentActivity.jsx"
import SummaryCard from "../components/common/dashboard/SummaryCard.jsx"
import PageLoading from "../components/common/ui/PageLoading.jsx"
import { useDashboardData } from "../hooks/useDashboardData.js"
import { formatRupee } from "../utils/formatCurrency.js"
import { isDashboardEmpty } from "../utils/dashboardEmpty.js"
import { parseRupeesString } from "../utils/parseRupeesString.js"
import { spendingMonthOverMonth } from "../utils/spendingMonthOverMonth.js"

const Dashboard = () => {
  const {
    summary,
    categories,
    trends,
    weeklyTrends,
    activity,
    status,
    errorMessage,
    reload
  } = useDashboardData()

  const [trendType, setTrendType] = useState("monthly")

  const spendingCompare = spendingMonthOverMonth(trends)

  const netValueClass =
    parseRupeesString(summary?.netBalance ?? 0) < 0
      ? "text-finance-danger"
      : "text-finance-success"

  if (status === "loading" || status === "idle") {
    return <PageLoading label="Loading dashboard…" />
  }

  if (status === "error") {
    return (
      <div className="glass-surface-interactive space-y-4 p-4">
        <p className="text-sm text-finance-danger md:text-base" role="alert">
          {errorMessage}
        </p>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={reload}
            className="w-auto rounded-lg bg-finance-primary px-4 py-2 text-sm text-white transition-all duration-200 hover:bg-finance-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-finance-primary"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  const showEmptyHint = isDashboardEmpty(
    summary,
    activity,
    categories,
    trends,
    weeklyTrends,
    true
  )

  return (
    <div className="space-y-6 md:space-y-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <SummaryCard title="Total income" value={formatRupee(summary?.totalIncome ?? 0)} />
        <SummaryCard title="Total expense" value={formatRupee(summary?.totalExpense ?? 0)} />
        <SummaryCard
          title="Net balance"
          value={formatRupee(summary?.netBalance ?? 0)}
          valueClassName={netValueClass}
        />
      </div>

      {showEmptyHint ? (
        <p className="text-sm text-finance-secondary md:text-base">No data available yet.</p>
      ) : null}

      <>
        {spendingCompare ? (
            <p
              className={`text-sm md:text-base ${
                spendingCompare.kind === "up"
                  ? "text-finance-danger"
                  : spendingCompare.kind === "down"
                    ? "text-finance-success"
                    : "text-finance-secondary"
              }`}
            >
              {spendingCompare.text}
            </p>
          ) : (
            <p className="text-sm text-finance-secondary md:text-base">
              Add at least two months of data to compare spending.
            </p>
          )}

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-stretch">
            <div className="flex h-full min-w-0 flex-col">
              <div className="glass-surface flex h-full min-h-[320px] flex-col p-4 transition-all duration-200 hover:shadow-lg">
                <h2 className="mb-4 text-lg font-semibold text-gray-900">
                  Income &amp; expense trends
                </h2>
                <div className="mb-2 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setTrendType("monthly")}
                    className={`rounded-lg px-3 py-1 text-sm transition-all duration-200 ${
                      trendType === "monthly"
                        ? "bg-finance-primary text-white"
                        : "border border-white/20 bg-white/40 text-gray-800 hover:bg-white/60"
                    }`}
                  >
                    Monthly
                  </button>
                  <button
                    type="button"
                    onClick={() => setTrendType("weekly")}
                    className={`rounded-lg px-3 py-1 text-sm transition-all duration-200 ${
                      trendType === "weekly"
                        ? "bg-finance-primary text-white"
                        : "border border-white/20 bg-white/40 text-gray-800 hover:bg-white/60"
                    }`}
                  >
                    Weekly
                  </button>
                </div>
                <div className="min-h-[240px] flex-1">
                  <TrendChart
                    trends={trendType === "monthly" ? trends : weeklyTrends}
                  />
                </div>
              </div>
            </div>
            <div className="flex h-full min-w-0 flex-col">
              <div className="glass-surface flex h-full min-h-[320px] flex-col p-4 transition-all duration-200 hover:shadow-lg">
                <h2 className="mb-4 text-lg font-semibold text-gray-900">By category</h2>
                <div className="min-h-[240px] flex-1">
                  <CategoryChart categories={categories} />
                </div>
              </div>
            </div>
          </div>
      </>

      <div className="min-w-0">
        <RecentActivity items={activity} />
      </div>
    </div>
  )
}

export default Dashboard
