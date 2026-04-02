import jwt from "jsonwebtoken"

const generateToken = (payload) => {
  const jwtSecret = process.env.JWT_SECRET
  const jwtExpiresIn = process.env.JWT_EXPIRES_IN

  if (!jwtSecret) {
    throw new Error("JWT_SECRET is required")
  }

  if (!jwtExpiresIn) {
    throw new Error("JWT_EXPIRES_IN is required")
  }

  const token = jwt.sign(payload, jwtSecret, { expiresIn: jwtExpiresIn })

  return token
}

export { generateToken }
