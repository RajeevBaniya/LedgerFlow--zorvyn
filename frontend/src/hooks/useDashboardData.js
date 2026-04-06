import { useCallback, useEffect, useState } from "react"

import { loadDashboardBundle } from "../api/dashboard.js"

const useDashboardData = () => {
  const [summary, setSummary] = useState(null)
  const [categories, setCategories] = useState([])
  const [trends, setTrends] = useState([])
  const [weeklyTrends, setWeeklyTrends] = useState([])
  const [activity, setActivity] = useState([])
  const [status, setStatus] = useState("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      setStatus("loading")
      setErrorMessage("")

      try {
        const data = await loadDashboardBundle()

        if (cancelled) {
          return
        }

        setSummary(data.summary)
        setCategories(data.categories)
        setTrends(data.trends)
        setWeeklyTrends(data.weeklyTrends)
        setActivity(data.activity)
        setStatus("success")
      } catch (error) {
        if (cancelled) {
          return
        }

        const message =
          error.response?.data?.message ??
          error.message ??
          "Failed to load dashboard"
        setErrorMessage(message)
        setStatus("error")
      }
    }

    void load()

    return () => {
      cancelled = true
    }
  }, [reloadKey])

  const reload = useCallback(() => {
    setReloadKey((key) => key + 1)
  }, [])

  return {
    summary,
    categories,
    trends,
    weeklyTrends,
    activity,
    status,
    errorMessage,
    reload
  }
}

export { useDashboardData }
