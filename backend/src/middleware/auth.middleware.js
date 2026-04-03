import jwt from "jsonwebtoken"

import { createError } from "../utils/error.js"

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(createError("Unauthorized", 401))
  }

  const token = authHeader.slice("Bearer ".length).trim()

  const jwtSecret = process.env.JWT_SECRET

  if (!jwtSecret) {
    return next(createError("Server configuration error", 500))
  }

  try {
    const payload = jwt.verify(token, jwtSecret)

    req.user = {
      id: payload.sub,
      role: payload.role
    }

    return next()
  } catch {
    return next(createError("Unauthorized", 401))
  }
}

export { authMiddleware }
