import { Router } from "express"

import {
  createRecord,
  deleteRecord,
  getRecords,
  updateRecord
} from "../controllers/record.controller.js"
import { authMiddleware } from "../middleware/auth.middleware.js"
import { authorizeRoles } from "../middleware/role.middleware.js"
import { validate } from "../middleware/validate.middleware.js"
import {
  createRecordSchema,
  getRecordsQuerySchema,
  idParamSchema,
  updateRecordSchema
} from "../validators/record.validator.js"

const recordRouter = Router()

const recordReadRoles = ["ADMIN", "ANALYST"]
const recordMutateRoles = ["ADMIN"]

recordRouter.use(authMiddleware)

recordRouter.post(
  "/",
  authorizeRoles(recordMutateRoles),
  validate(createRecordSchema),
  createRecord
)

recordRouter.get(
  "/",
  authorizeRoles(recordReadRoles),
  validate(getRecordsQuerySchema, "query"),
  getRecords
)

recordRouter.patch(
  "/:id",
  authorizeRoles(recordMutateRoles),
  validate(idParamSchema, "params"),
  validate(updateRecordSchema),
  updateRecord
)

recordRouter.delete(
  "/:id",
  authorizeRoles(recordMutateRoles),
  validate(idParamSchema, "params"),
  deleteRecord
)

export default recordRouter
