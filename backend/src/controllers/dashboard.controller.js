import {
  getCategoryBreakdown as getCategoryBreakdownService,
  getMonthlyTrends as getMonthlyTrendsService,
  getRecentActivity as getRecentActivityService,
  getSummary as getSummaryService,
  getWeeklyTrends as getWeeklyTrendsService
} from "../services/dashboard.service.js"

const getSummary = async (req, res, next) => {
  try {
    const summary = await getSummaryService()

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
    const categories = await getCategoryBreakdownService()

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
    const trends = await getMonthlyTrendsService()

    return res.status(200).json({
      success: true,
      data: trends
    })
  } catch (error) {
    return next(error)
  }
}

const getWeeklyTrends = async (req, res, next) => {
  try {
    const trends = await getWeeklyTrendsService()

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
    const activity = await getRecentActivityService()

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
  getSummary,
  getWeeklyTrends
}
