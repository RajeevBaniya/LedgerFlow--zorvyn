import prismaClientPackage from "@prisma/client"

import prisma from "../config/db.js"
import {
  formatPaiseAsRupees,
  mapRecentActivityResponse
} from "../utils/money.js"
import { activeRecordsWhere } from "../utils/recordScope.js"

const { RecordType } = prismaClientPackage

const RECENT_ACTIVITY_LIMIT = 10

const zeroPaise = 0n

const getUtcMonthKey = (value) => {
  const year = value.getUTCFullYear()
  const month = String(value.getUTCMonth() + 1).padStart(2, "0")

  return `${year}-${month}`
}

const getSummary = async (userId) => {
  const incomeResult = await prisma.record.aggregate({
    where: {
      ...activeRecordsWhere(userId),
      type: RecordType.INCOME
    },
    _sum: {
      amount: true
    }
  })

  const expenseResult = await prisma.record.aggregate({
    where: {
      ...activeRecordsWhere(userId),
      type: RecordType.EXPENSE
    },
    _sum: {
      amount: true
    }
  })

  const totalIncome = incomeResult._sum.amount ?? zeroPaise
  const totalExpense = expenseResult._sum.amount ?? zeroPaise
  const netBalance = totalIncome - totalExpense

  return {
    totalIncome: formatPaiseAsRupees(totalIncome),
    totalExpense: formatPaiseAsRupees(totalExpense),
    netBalance: formatPaiseAsRupees(netBalance)
  }
}

const getCategoryBreakdown = async (userId) => {
  const rows = await prisma.record.groupBy({
    by: ["category"],
    where: activeRecordsWhere(userId),
    _sum: {
      amount: true
    },
    orderBy: {
      category: "asc"
    }
  })

  const breakdown = rows.map((row) => {
    return {
      category: row.category,
      total: formatPaiseAsRupees(row._sum.amount ?? zeroPaise)
    }
  })

  return breakdown
}

const getMonthlyTrends = async (userId) => {
  const records = await prisma.record.findMany({
    where: activeRecordsWhere(userId),
    select: {
      date: true,
      type: true,
      amount: true
    },
    orderBy: {
      date: "asc"
    }
  })

  const monthMap = new Map()

  records.forEach((record) => {
    const month = getUtcMonthKey(record.date)

    if (!monthMap.has(month)) {
      monthMap.set(month, {
        month,
        income: zeroPaise,
        expense: zeroPaise
      })
    }

    const current = monthMap.get(month)
    const recordAmount = record.amount ?? zeroPaise

    if (record.type === RecordType.INCOME) {
      current.income = current.income + recordAmount
    } else {
      current.expense = current.expense + recordAmount
    }
  })

  const trends = Array.from(monthMap.values())
    .sort((left, right) => {
      if (left.month < right.month) return -1
      if (left.month > right.month) return 1
      return 0
    })
    .map((row) => {
      return {
        month: row.month,
        income: formatPaiseAsRupees(row.income),
        expense: formatPaiseAsRupees(row.expense)
      }
    })

  return trends
}

const getRecentActivity = async (userId) => {
  const records = await prisma.record.findMany({
    where: activeRecordsWhere(userId),
    orderBy: { createdAt: "desc" },
    take: RECENT_ACTIVITY_LIMIT
  })

  return mapRecentActivityResponse(records)
}

export {
  getCategoryBreakdown,
  getMonthlyTrends,
  getRecentActivity,
  getSummary
}
