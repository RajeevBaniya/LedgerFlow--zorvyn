const startOfDayIso = (dateStr) => {
  if (!dateStr || typeof dateStr !== "string") {
    return ""
  }

  return `${dateStr}T00:00:00.000Z`
}

const endOfDayIso = (dateStr) => {
  if (!dateStr || typeof dateStr !== "string") {
    return ""
  }

  return `${dateStr}T23:59:59.999Z`
}

const isoFromDatetimeLocal = (local) => {
  if (!local || typeof local !== "string") {
    return ""
  }

  const parsed = new Date(local)

  if (Number.isNaN(parsed.getTime())) {
    return ""
  }

  return parsed.toISOString()
}

const datetimeLocalFromIso = (iso) => {
  if (!iso) {
    return ""
  }

  const parsed = new Date(iso)

  if (Number.isNaN(parsed.getTime())) {
    return ""
  }

  const pad = (n) => String(n).padStart(2, "0")

  return `${parsed.getFullYear()}-${pad(parsed.getMonth() + 1)}-${pad(parsed.getDate())}T${pad(parsed.getHours())}:${pad(parsed.getMinutes())}`
}

export { datetimeLocalFromIso, endOfDayIso, isoFromDatetimeLocal, startOfDayIso }
