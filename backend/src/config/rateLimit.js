import rateLimit from "express-rate-limit"

const LOGIN_WINDOW_MS = 15 * 60 * 1000
const LOGIN_MAX_PER_WINDOW = 5

const loginRateLimiter = rateLimit({
  windowMs: LOGIN_WINDOW_MS,
  max: LOGIN_MAX_PER_WINDOW,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many login attempts, please try again later"
  }
})

export { loginRateLimiter }
