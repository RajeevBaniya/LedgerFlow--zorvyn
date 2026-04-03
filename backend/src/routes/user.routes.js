import { Router } from "express"

import { getUsers, updateRole, updateStatus } from "../controllers/user.controller.js"
import { authMiddleware } from "../middleware/auth.middleware.js"
import { authorizeRoles } from "../middleware/role.middleware.js"
import { validate } from "../middleware/validate.middleware.js"
import {
  updateUserRoleSchema,
  updateUserStatusSchema,
  userIdParamSchema
} from "../validators/user.validator.js"

const userRouter = Router()

const adminOnly = ["ADMIN"]

userRouter.use(authMiddleware)
userRouter.use(authorizeRoles(adminOnly))

userRouter.get("/", getUsers)

userRouter.patch(
  "/:id/role",
  validate(userIdParamSchema, "params"),
  validate(updateUserRoleSchema),
  updateRole
)

userRouter.patch(
  "/:id/status",
  validate(userIdParamSchema, "params"),
  validate(updateUserStatusSchema),
  updateStatus
)

export default userRouter
