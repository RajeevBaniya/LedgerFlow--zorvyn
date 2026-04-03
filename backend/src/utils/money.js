const MAX_INTEGER_DIGITS = 15
const MAX_FRACTION_DIGITS = 2

const parseRupeesToPaise = (value) => {
  const trimmed = String(value).trim()
  const match = /^(\d+)(?:\.(\d{0,2}))?$/.exec(trimmed)

  if (!match) {
    throw new Error("invalid_amount")
  }

  const whole = match[1]
  let frac = match[2] ?? ""

  if (whole.length > MAX_INTEGER_DIGITS) {
    throw new Error("invalid_amount")
  }

  if (frac.length > MAX_FRACTION_DIGITS) {
    throw new Error("invalid_amount")
  }

  frac = (frac + "00").slice(0, 2)

  return BigInt(whole) * 100n + BigInt(frac)
}

const formatPaiseAsRupees = (paise) => {
  if (paise === null || paise === undefined) {
    return "0.00"
  }

  let p = BigInt(paise)
  const negative = p < 0n

  if (negative) {
    p = -p
  }

  const rupees = p / 100n
  const rem = p % 100n
  const frac = rem.toString().padStart(2, "0")
  const sign = negative ? "-" : ""

  return `${sign}${rupees.toString()}.${frac}`
}

const mapRecordResponse = (record) => {
  return {
    id: record.id,
    userId: record.userId,
    amount: formatPaiseAsRupees(record.amount),
    type: record.type,
    category: record.category,
    date: record.date,
    note: record.note,
    createdAt: record.createdAt
  }
}

const mapRecordsResponse = (records) => {
  return records.map((record) => {
    return mapRecordResponse(record)
  })
}

const mapRecentActivityItem = (record) => {
  return {
    id: record.id,
    amount: formatPaiseAsRupees(record.amount),
    type: record.type,
    category: record.category,
    date: record.date,
    createdAt: record.createdAt
  }
}

const mapRecentActivityResponse = (records) => {
  return records.map((record) => {
    return mapRecentActivityItem(record)
  })
}

export {
  MAX_FRACTION_DIGITS,
  MAX_INTEGER_DIGITS,
  formatPaiseAsRupees,
  mapRecordResponse,
  mapRecordsResponse,
  mapRecentActivityResponse,
  parseRupeesToPaise
}
