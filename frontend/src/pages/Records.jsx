import React from "react"

import RecordFilters from "../components/common/record/RecordFilters.jsx"
import RecordFormModal from "../components/common/record/RecordFormModal.jsx"
import RecordTable from "../components/common/record/RecordTable.jsx"
import PageLoading from "../components/common/ui/PageLoading.jsx"
import Pagination from "../components/common/ui/Pagination.jsx"
import { useRecordsPage } from "../hooks/useRecordsPage.js"

const Records = () => {
  const {
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
    onSearchChange,
    onTypeFilterChange,
    onCategoryFilterChange,
    onStartDateChange,
    onEndDateChange,
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
    onDelete,
    reload
  } = useRecordsPage()

  return (
    <div className="space-y-6">
      {isAdmin ? (
        <div className="flex justify-end">
          <button
            type="button"
            onClick={openCreate}
            className="w-auto rounded-lg bg-finance-primary px-4 py-2 text-sm text-white transition-all duration-200 hover:bg-finance-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-finance-primary"
          >
            Add record
          </button>
        </div>
      ) : null}

      <RecordFilters
        search={search}
        typeFilter={typeFilter}
        categoryFilter={categoryFilter}
        startDate={startDate}
        endDate={endDate}
        onSearchChange={onSearchChange}
        onTypeFilterChange={onTypeFilterChange}
        onCategoryFilterChange={onCategoryFilterChange}
        onStartDateChange={onStartDateChange}
        onEndDateChange={onEndDateChange}
      />

      {error ? (
        <div className="glass-surface-interactive space-y-3 p-4">
          <p className="text-sm text-finance-danger md:text-base" role="alert">
            {error}
          </p>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={reload}
              className="w-auto rounded-lg bg-finance-primary px-4 py-2 text-sm text-white transition-all duration-200 hover:bg-finance-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-finance-primary"
            >
              Retry
            </button>
          </div>
        </div>
      ) : null}

      {loading ? (
        <PageLoading label="Loading records…" />
      ) : (
        <RecordTable
          records={records}
          isAdmin={isAdmin}
          onEdit={openEdit}
          onDelete={onDelete}
        />
      )}

      {!loading ? (
        <Pagination
          page={meta.page ?? page}
          limit={meta.limit ?? limit}
          total={meta.total ?? 0}
          onPageChange={goToPage}
        />
      ) : null}

      <RecordFormModal
        isOpen={modalOpen}
        mode={modalMode}
        snapshot={formSnapshot}
        formKey={formKey}
        onClose={closeModal}
        onSubmit={onFormSubmit}
        errorMessage={formError}
        isSubmitting={formSubmitting}
      />
    </div>
  )
}

export default Records
