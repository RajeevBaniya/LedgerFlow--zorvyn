const createError = (message, statusCode, errors) => {
  const error = new Error(message)
  error.statusCode = statusCode

  if (Array.isArray(errors) && errors.length > 0) {
    error.errors = errors
  }

  return error
}

export { createError }
