import { parseRupeesString } from "./parseRupeesString.js"

const isZeroAmount = (s) => parseRupeesString(s) === 0

const isDashboardEmpty = (
  summary,
  activity,
  categories,
  trends,
  weeklyTrends,
  canLoadCharts
) => {
  if (!summary) {
    return false
  }

  const flat =
    isZeroAmount(summary.totalIncome) &&
    isZeroAmount(summary.totalExpense) &&
    isZeroAmount(summary.netBalance)

  if (!flat) {
    return false
  }

  if (activity && activity.length > 0) {
    return false
  }

  if (!canLoadCharts) {
    return true
  }

  const noCat = !categories || categories.length === 0
  const noMonthlyTrend = !trends || trends.length === 0
  const noWeeklyTrend = !weeklyTrends || weeklyTrends.length === 0
  const noTrend = noMonthlyTrend && noWeeklyTrend

  return noCat && noTrend
}

export { isDashboardEmpty }
