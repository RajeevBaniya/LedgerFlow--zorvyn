import { z } from "zod"

const roleSchema = z.enum(["VIEWER", "ANALYST", "ADMIN"])
const statusSchema = z.enum(["ACTIVE", "INACTIVE"])

const userIdParamSchema = z.object({
  id: z.string().cuid()
})

const updateUserRoleSchema = z.object({
  role: roleSchema
})

const updateUserStatusSchema = z.object({
  status: statusSchema
})

export {
  updateUserRoleSchema,
  updateUserStatusSchema,
  userIdParamSchema
}
