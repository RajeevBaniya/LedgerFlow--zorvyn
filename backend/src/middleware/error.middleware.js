import prismaClientPackage from "@prisma/client"
import { PrismaClientUnknownRequestError } from "@prisma/client/runtime/library"
import { ZodError } from "zod"

const { Prisma } = prismaClientPackage

const isProduction = process.env.NODE_ENV === "production"

const formatErrorResponse = (statusCode, message, errors) => {
  const response = {
    success: false,
    message
  }

  if (Array.isArray(errors) && errors.length > 0) {
    response.errors = errors
  }

  return {
    statusCode,
    response
  }
}

const errorHandler = (error, _req, res, _next) => {
  if (error instanceof ZodError) {
    const validationErrors = error.issues.map((issue) => {
      const path = Array.isArray(issue.path) ? issue.path.join(".") : ""

      return {
        path,
        message: issue.message
      }
    })

    const formatted = formatErrorResponse(400, "Validation failed", validationErrors)
    return res.status(formatted.statusCode).json(formatted.response)
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    const statusCode = error.code === "P2002" ? 409 : 400
    const message = error.code === "P2002" ? "Resource already exists" : "Database request failed"
    const formatted = formatErrorResponse(statusCode, message)

    return res.status(formatted.statusCode).json(formatted.response)
  }

  const isPrismaUnknown =
    error instanceof PrismaClientUnknownRequestError || error?.name === "PrismaClientUnknownRequestError"

  if (isPrismaUnknown) {
    const message = isProduction ? "Database request failed" : error.message
    const formatted = formatErrorResponse(500, message)

    return res.status(formatted.statusCode).json(formatted.response)
  }

  if (error.statusCode) {
    const formatted = formatErrorResponse(error.statusCode, error.message, error.errors)
    return res.status(formatted.statusCode).json(formatted.response)
  }

  const fallbackMessage = isProduction ? "Internal server error" : error.message || "Internal server error"
  const formatted = formatErrorResponse(500, fallbackMessage)

  return res.status(formatted.statusCode).json(formatted.response)
}

export { errorHandler }
