import { Router } from "express"

import { loginRateLimiter } from "../config/rateLimit.js"
import { login, me, signup } from "../controllers/auth.controller.js"
import { authMiddleware } from "../middleware/auth.middleware.js"
import { validate } from "../middleware/validate.middleware.js"
import { loginSchema, signupSchema } from "../validators/auth.validator.js"

const authRouter = Router()

authRouter.post("/signup", validate(signupSchema), signup)
authRouter.post("/login", loginRateLimiter, validate(loginSchema), login)
authRouter.get("/me", authMiddleware, me)

export default authRouter
