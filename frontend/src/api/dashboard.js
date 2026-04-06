import { apiClient } from "./axios.js"

const DASHBOARD_CHART_ROLES = ["ADMIN", "ANALYST", "VIEWER"]

const getSummary = async () => {
  const response = await apiClient.get("/dashboard/summary")
  return response.data.data
}

const getCategories = async () => {
  const response = await apiClient.get("/dashboard/categories")
  return response.data.data
}

const getTrends = async () => {
  const response = await apiClient.get("/dashboard/trends")
  return response.data.data
}

const getWeeklyTrends = async () => {
  const response = await apiClient.get("/dashboard/trends/weekly")
  return response.data.data
}

const getActivity = async () => {
  const response = await apiClient.get("/dashboard/activity")
  return response.data.data
}

const loadDashboardBundle = async () => {
  const [summaryData, categoriesData, trendsData, weeklyTrendsData, activityData] =
    await Promise.all([
      getSummary(),
      getCategories(),
      getTrends(),
      getWeeklyTrends(),
      getActivity()
    ])

  return {
    summary: summaryData,
    categories: Array.isArray(categoriesData) ? categoriesData : [],
    trends: Array.isArray(trendsData) ? trendsData : [],
    weeklyTrends: Array.isArray(weeklyTrendsData) ? weeklyTrendsData : [],
    activity: Array.isArray(activityData) ? activityData : []
  }
}

export {
  DASHBOARD_CHART_ROLES,
  getActivity,
  getCategories,
  getSummary,
  getTrends,
  getWeeklyTrends,
  loadDashboardBundle
}
