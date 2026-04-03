import { createError } from "../utils/error.js"

const authorizeRoles = (allowedRoles) => {
  const roleMiddleware = (req, res, next) => {
    if (!req.user || !req.user.role) {
      return next(createError("Unauthorized", 401))
    }

    const isAllowed = allowedRoles.includes(req.user.role)

    if (!isAllowed) {
      return next(createError("Forbidden", 403))
    }

    return next()
  }

  return roleMiddleware
}

export { authorizeRoles }
