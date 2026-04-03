import { createError } from "../utils/error.js"

const ALLOWED_SOURCES = ["body", "query", "params"]

const validate = (schema, source = "body") => {
  const validationMiddleware = (req, res, next) => {
    if (!ALLOWED_SOURCES.includes(source)) {
      return next(createError("Validation source is invalid", 500))
    }

    const parsedData = schema.safeParse(req[source])

    if (!parsedData.success) {
      return next(parsedData.error)
    }

    if (source === "query") {
      req.validatedQuery = parsedData.data
    } else if (source === "params") {
      req.validatedParams = parsedData.data
    } else {
      req[source] = parsedData.data
    }

    return next()
  }

  return validationMiddleware
}

export { validate }
