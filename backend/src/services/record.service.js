import prismaClientPackage from "@prisma/client"

import prisma from "../config/db.js"
import { createError } from "../utils/error.js"
import {
  mapRecordResponse,
  mapRecordsResponse,
  parseRupeesToPaise
} from "../utils/money.js"
import { activeRecordsWhere } from "../utils/recordScope.js"

const { RecordType } = prismaClientPackage

const DEFAULT_PAGE = 1
const DEFAULT_LIMIT = 10
const MAX_LIMIT = 100

const parsePositiveInteger = (value, fallbackValue) => {
  const parsedValue = Number.parseInt(value, 10)

  if (Number.isNaN(parsedValue) || parsedValue < 1) {
    return fallbackValue
  }

  return parsedValue
}

const parseLimit = (value) => {
  const parsedLimit = parsePositiveInteger(value, DEFAULT_LIMIT)

  if (parsedLimit > MAX_LIMIT) {
    return MAX_LIMIT
  }

  return parsedLimit
}

const buildRecordWhereFilter = (userId, query) => {
  const where = { ...activeRecordsWhere(userId) }

  if (query.type === RecordType.INCOME || query.type === RecordType.EXPENSE) {
    where.type = query.type
  }

  if (query.category && query.category.trim() !== "") {
    where.category = query.category.trim()
  }

  if (query.startDate || query.endDate) {
    const dateFilter = {}

    if (query.startDate) {
      dateFilter.gte = new Date(query.startDate)
    }

    if (query.endDate) {
      dateFilter.lte = new Date(query.endDate)
    }

    where.date = dateFilter
  }

  const search = query.search

  if (search && search.trim() !== "") {
    const searchTerm = search.trim()
    const searchClause = {
      OR: [
        { category: { contains: searchTerm, mode: "insensitive" } },
        { note: { contains: searchTerm, mode: "insensitive" } }
      ]
    }

    const existingAnd = Array.isArray(where.AND) ? where.AND : []
    where.AND = [...existingAnd, searchClause]
  }

  return where
}

const createRecord = async (userId, data) => {
  const createdRecord = await prisma.record.create({
    data: {
      userId,
      amount: parseRupeesToPaise(data.amount),
      type: data.type,
      category: data.category,
      date: new Date(data.date),
      note: data.note,
      deletedAt: null
    }
  })

  return mapRecordResponse(createdRecord)
}

const getRecords = async (userId, query) => {
  const where = buildRecordWhereFilter(userId, query)

  const page = parsePositiveInteger(query.page, DEFAULT_PAGE)
  const limit = parseLimit(query.limit)
  const skip = (page - 1) * limit

  const total = await prisma.record.count({ where })
  const records = await prisma.record.findMany({
    where,
    orderBy: { date: "desc" },
    skip,
    take: limit
  })

  return {
    data: mapRecordsResponse(records),
    meta: {
      total,
      page,
      limit
    }
  }
}

const updateRecord = async (userId, recordId, data) => {
  const existingRecord = await prisma.record.findFirst({
    where: {
      id: recordId,
      ...activeRecordsWhere(userId)
    }
  })

  if (!existingRecord) {
    throw createError("Record not found", 404)
  }

  const updateData = {}

  if (typeof data.amount === "string") {
    updateData.amount = parseRupeesToPaise(data.amount)
  }

  if (typeof data.type === "string") {
    updateData.type = data.type
  }

  if (typeof data.category === "string") {
    updateData.category = data.category
  }

  if (typeof data.date === "string") {
    updateData.date = new Date(data.date)
  }

  if (typeof data.note === "string") {
    updateData.note = data.note
  }

  const updatedRecord = await prisma.record.update({
    where: { id: recordId },
    data: updateData
  })

  return mapRecordResponse(updatedRecord)
}

const deleteRecord = async (userId, recordId) => {
  const existingRecord = await prisma.record.findFirst({
    where: {
      id: recordId,
      ...activeRecordsWhere(userId)
    }
  })

  if (!existingRecord) {
    throw createError("Record not found", 404)
  }

  await prisma.record.update({
    where: { id: recordId },
    data: {
      deletedAt: new Date()
    }
  })
}

export { createRecord, deleteRecord, getRecords, updateRecord }
