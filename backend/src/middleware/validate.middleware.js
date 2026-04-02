const validate = (schema) => {
  const validationMiddleware = (req, res, next) => {
    const parsedData = schema.safeParse(req.body)

    if (!parsedData.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: parsedData.error.issues
      })
    }

    req.body = parsedData.data
    return next()
  }

  return validationMiddleware
}

export { validate }
