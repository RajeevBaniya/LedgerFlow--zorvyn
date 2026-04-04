const parseRupeesString = (value) => {
  const raw = String(value ?? "0").trim().replace(/₹/g, "").replace(/\s/g, "")
  const parsed = Number.parseFloat(raw)

  if (!Number.isFinite(parsed)) {
    return 0
  }

  return parsed
}

export { parseRupeesString }
