import { parseRupeesString } from "./parseRupeesString.js"

const spendingMonthOverMonth = (trends) => {
  if (!Array.isArray(trends) || trends.length < 2) {
    return null
  }

  const sorted = [...trends].sort((left, right) => {
    return left.month.localeCompare(right.month)
  })

  const previous = sorted[sorted.length - 2]
  const current = sorted[sorted.length - 1]
  const prevExpense = parseRupeesString(previous.expense)
  const currExpense = parseRupeesString(current.expense)

  if (prevExpense === 0 && currExpense === 0) {
    return {
      kind: "neutral",
      text: "No spending in the last two recorded months."
    }
  }

  if (prevExpense === 0) {
    return {
      kind: "up",
      text: "Increase in spending compared to the previous month."
    }
  }

  const changePct = ((currExpense - prevExpense) / prevExpense) * 100
  const rounded = Math.round(changePct * 10) / 10

  if (currExpense > prevExpense) {
    return {
      kind: "up",
      text: `Increase in spending: ${rounded}% vs previous month.`
    }
  }

  if (currExpense < prevExpense) {
    return {
      kind: "down",
      text: `Decrease in spending: ${Math.abs(rounded)}% vs previous month.`
    }
  }

  return {
    kind: "neutral",
    text: "Spending unchanged vs previous month."
  }
}

export { spendingMonthOverMonth }
