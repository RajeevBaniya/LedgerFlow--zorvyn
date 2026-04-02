import { Router } from "express"

import { login, signup } from "../controllers/auth.controller.js"
import { validate } from "../middleware/validate.middleware.js"
import { loginSchema, signupSchema } from "../validators/auth.validator.js"

const authRouter = Router()

authRouter.post("/signup", validate(signupSchema), signup)
authRouter.post("/login", validate(loginSchema), login)

export default authRouter
