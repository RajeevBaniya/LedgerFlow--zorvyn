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

const summaryRoles = ["ADMIN", "ANALYST", "VIEWER"]
const categoryAndTrendRoles = ["ADMIN", "ANALYST"]

dashboardRouter.use(authMiddleware)

dashboardRouter.get("/summary", authorizeRoles(summaryRoles), getSummary)
dashboardRouter.get("/activity", authorizeRoles(summaryRoles), getRecentActivity)
dashboardRouter.get("/categories", authorizeRoles(categoryAndTrendRoles), getCategoryBreakdown)
dashboardRouter.get("/trends/weekly", authorizeRoles(categoryAndTrendRoles), getWeeklyTrends)
dashboardRouter.get("/trends", authorizeRoles(categoryAndTrendRoles), getMonthlyTrends)

export default dashboardRouter
