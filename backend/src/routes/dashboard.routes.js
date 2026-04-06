import { Router } from "express"

import {
  getCategoryBreakdown,
  getMonthlyTrends,
  getRecentActivity,
  getSummary,
  getWeeklyTrends
} from "../controllers/dashboard.controller.js"
import { authMiddleware } from "../middleware/auth.middleware.js"
import { authorizeRoles } from "../middleware/role.middleware.js"

const dashboardRouter = Router()

const allRoles = ["ADMIN", "ANALYST", "VIEWER"]

dashboardRouter.use(authMiddleware)

dashboardRouter.get("/summary", authorizeRoles(allRoles), getSummary)
dashboardRouter.get("/activity", authorizeRoles(allRoles), getRecentActivity)
dashboardRouter.get("/categories", authorizeRoles(allRoles), getCategoryBreakdown)
dashboardRouter.get("/trends/weekly", authorizeRoles(allRoles), getWeeklyTrends)
dashboardRouter.get("/trends", authorizeRoles(allRoles), getMonthlyTrends)

export default dashboardRouter
