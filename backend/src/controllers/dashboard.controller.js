import {
  getCategoryBreakdown as getCategoryBreakdownService,
  getMonthlyTrends as getMonthlyTrendsService,
  getRecentActivity as getRecentActivityService,
  getSummary as getSummaryService
} from "../services/dashboard.service.js"

const getSummary = async (req, res, next) => {
  try {
    const userId = req.user.id
    const summary = await getSummaryService(userId)

    return res.status(200).json({
      success: true,
      data: summary
    })
  } catch (error) {
    return next(error)
  }
}

const getCategoryBreakdown = async (req, res, next) => {
  try {
    const userId = req.user.id
    const categories = await getCategoryBreakdownService(userId)

    return res.status(200).json({
      success: true,
      data: categories
    })
  } catch (error) {
    return next(error)
  }
}

const getMonthlyTrends = async (req, res, next) => {
  try {
    const userId = req.user.id
    const trends = await getMonthlyTrendsService(userId)

    return res.status(200).json({
      success: true,
      data: trends
    })
  } catch (error) {
    return next(error)
  }
}

const getRecentActivity = async (req, res, next) => {
  try {
    const userId = req.user.id
    const activity = await getRecentActivityService(userId)

    return res.status(200).json({
      success: true,
      data: activity
    })
  } catch (error) {
    return next(error)
  }
}

export {
  getCategoryBreakdown,
  getMonthlyTrends,
  getRecentActivity,
  getSummary
}
