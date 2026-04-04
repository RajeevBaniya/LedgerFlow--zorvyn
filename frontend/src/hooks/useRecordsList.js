import { useEffect, useState } from "react"

import { getRecords } from "../api/records.js"
import { buildRecordsQueryParams } from "../utils/buildRecordsQueryParams.js"

const useRecordsList = ({
  page,
  limit,
  search,
  typeFilter,
  categoryFilter,
  startDate,
  endDate,
  refreshKey
}) => {
  const [records, setRecords] = useState([])
  const [meta, setMeta] = useState({ total: 0, page: 1, limit })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      setLoading(true)
      setError("")

      const params = buildRecordsQueryParams({
        page,
        limit,
        search,
        typeFilter,
        categoryFilter,
        startDate,
        endDate
      })

      try {
        const result = await getRecords(params)

        if (cancelled) {
          return
        }

        setRecords(Array.isArray(result.records) ? result.records : [])
        setMeta(result.meta ?? { total: 0, page: 1, limit })
        setLoading(false)
      } catch (err) {
        if (cancelled) {
          return
        }

        const message =
          err.response?.data?.message ?? err.message ?? "Failed to load records"
        setRecords([])
        setMeta({ total: 0, page: 1, limit })
        setError(message)
        setLoading(false)
      }
    }

    void load()

    return () => {
      cancelled = true
    }
  }, [
    page,
    limit,
    search,
    typeFilter,
    categoryFilter,
    startDate,
    endDate,
    refreshKey
  ])

  return { records, meta, loading, error, setError }
}

export { useRecordsList }
