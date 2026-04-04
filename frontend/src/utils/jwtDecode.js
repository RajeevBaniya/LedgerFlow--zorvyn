const decodeJwtPayload = (token) => {
  if (typeof token !== "string" || token.length === 0) {
    return null
  }

  const parts = token.split(".")

  if (parts.length !== 3) {
    return null
  }

  const segment = parts[1].replace(/-/g, "+").replace(/_/g, "/")
  const pad = segment.length % 4
  const padded = pad ? segment + "=".repeat(4 - pad) : segment

  try {
    const json = atob(padded)
    return JSON.parse(json)
  } catch {
    return null
  }
}

export { decodeJwtPayload }
