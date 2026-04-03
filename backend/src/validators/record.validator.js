import { z } from "zod"

import { parseRupeesToPaise } from "../utils/money.js"

const recordTypeSchema = z.enum(["INCOME", "EXPENSE"])

const isValidPositiveMoneyString = (value) => {
  if (typeof value !== "string") {
    return false
  }

  try {
    return parseRupeesToPaise(value.trim()) > 0n
  } catch {
    return false
  }
}

const moneyAmountSchema = z.string().trim().refine(isValidPositiveMoneyString, {
  message: "Amount must be a positive rupees string (paise stored); up to 2 decimal places"
})
const dateStringSchema = z.string().datetime()
const idParamSchema = z.object({
  id: z.string().cuid()
})
const getRecordsQuerySchema = z.object({
  type: recordTypeSchema.optional(),
  category: z.string().trim().min(1).optional(),
  search: z.string().trim().optional(),
  startDate: dateStringSchema.optional(),
  endDate: dateStringSchema.optional(),
  page: z.coerce.number().int().min(1).optional(),
  limit: z.coerce.number().int().min(1).max(100).optional()
})

const createRecordSchema = z.object({
  amount: moneyAmountSchema,
  type: recordTypeSchema,
  category: z.string().trim().min(1),
  date: dateStringSchema,
  note: z.string().trim().min(1).optional()
})

const updateRecordSchema = z
  .object({
    amount: moneyAmountSchema.optional(),
    type: recordTypeSchema.optional(),
    category: z.string().trim().min(1).optional(),
    date: dateStringSchema.optional(),
    note: z.string().trim().min(1).optional()
  })
  .refine((value) => Object.keys(value).length > 0, {
    message: "At least one field is required"
  })

export { createRecordSchema, getRecordsQuerySchema, idParamSchema, updateRecordSchema }
