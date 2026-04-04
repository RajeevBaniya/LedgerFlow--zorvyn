import { useCallback, useState } from "react"

import { deleteRecord } from "../api/records.js"
import { useAuth } from "./useAuth.js"
import { useRecordModalForm } from "./useRecordModalForm.js"
import { useRecordsList } from "./useRecordsList.js"

const DEFAULT_LIMIT = 10

const useRecordsPage = () => {
  const { user } = useAuth()
  const isAdmin = user?.role === "ADMIN"

  const [search, setSearch] = useState("")
  const [typeFilter, setTypeFilter] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [page, setPage] = useState(1)
  const [limit] = useState(DEFAULT_LIMIT)
  const [refreshKey, setRefreshKey] = useState(0)

  const bumpRefresh = useCallback(() => {
    setRefreshKey((key) => key + 1)
  }, [])

  const { records, meta, loading, error, setError } = useRecordsList({
    page,
    limit,
    search,
    typeFilter,
    categoryFilter,
    startDate,
    endDate,
    refreshKey
  })

  const {
    modalOpen,
    modalMode,
    formError,
    formSubmitting,
    formSnapshot,
    formKey,
    openCreate,
    openEdit,
    closeModal,
    onFormSubmit
  } = useRecordModalForm({ onSaved: bumpRefresh })

  const goToPage = useCallback((nextPage) => {
    setPage(nextPage)
  }, [])

  const handleSearchChange = useCallback((value) => {
    setSearch(value)
    setPage(1)
  }, [])

  const handleTypeFilterChange = useCallback((value) => {
    setTypeFilter(value)
    setPage(1)
  }, [])

  const handleCategoryFilterChange = useCallback((value) => {
    setCategoryFilter(value)
    setPage(1)
  }, [])

  const handleStartDateChange = useCallback((value) => {
    setStartDate(value)
    setPage(1)
  }, [])

  const handleEndDateChange = useCallback((value) => {
    setEndDate(value)
    setPage(1)
  }, [])

  const handleDelete = useCallback(
    async (recordId) => {
      try {
        await deleteRecord(recordId)
        bumpRefresh()
      } catch (err) {
        const message =
          err.response?.data?.message ?? err.message ?? "Delete failed"
        setError(message)
      }
    },
    [bumpRefresh, setError]
  )

  return {
    records,
    meta,
    loading,
    error,
    isAdmin,
    search,
    typeFilter,
    categoryFilter,
    startDate,
    endDate,
    onSearchChange: handleSearchChange,
    onTypeFilterChange: handleTypeFilterChange,
    onCategoryFilterChange: handleCategoryFilterChange,
    onStartDateChange: handleStartDateChange,
    onEndDateChange: handleEndDateChange,
    page,
    limit,
    goToPage,
    modalOpen,
    modalMode,
    formError,
    formSubmitting,
    formSnapshot,
    formKey,
    openCreate,
    openEdit,
    closeModal,
    onFormSubmit,
    onDelete: handleDelete,
    reload: bumpRefresh
  }
}

export { useRecordsPage }
