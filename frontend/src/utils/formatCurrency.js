const toPlainAmountString = (value) => {
  if (value === null || value === undefined) {
    return ""
  }

  if (typeof value === "number") {
    if (!Number.isFinite(value)) {
      return ""
    }

    return value.toFixed(2)
  }

  return String(value).trim()
}

const formatRupee = (value) => {
  const raw = toPlainAmountString(value)

  if (raw === "" || raw === "—") {
    return "—"
  }

  if (raw.startsWith("₹")) {
    return raw
  }

  if (raw.startsWith("-")) {
    const rest = raw.slice(1).trim()

    if (rest === "") {
      return "—"
    }

    return `-₹${rest}`
  }

  return `₹${raw}`
}

export { formatRupee }
