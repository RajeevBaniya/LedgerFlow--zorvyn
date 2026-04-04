import React from "react"

const RecordFilters = ({
  search,
  typeFilter,
  categoryFilter,
  startDate,
  endDate,
  onSearchChange,
  onTypeFilterChange,
  onCategoryFilterChange,
  onStartDateChange,
  onEndDateChange
}) => {
  const handleSearchChange = (event) => {
    onSearchChange(event.target.value)
  }

  const handleTypeChange = (event) => {
    onTypeFilterChange(event.target.value)
  }

  const handleCategoryChange = (event) => {
    onCategoryFilterChange(event.target.value)
  }

  const handleStartChange = (event) => {
    onStartDateChange(event.target.value)
  }

  const handleEndChange = (event) => {
    onEndDateChange(event.target.value)
  }

  return (
    <div className="glass-surface-interactive grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
      <div className="md:col-span-2 lg:col-span-1">
        <label htmlFor="record-search" className="mb-1 block text-xs text-gray-900 md:text-sm">
          Search
        </label>
        <input
          id="record-search"
          type="search"
          value={search}
          onChange={handleSearchChange}
          placeholder="Category or note"
          className="w-full rounded border border-gray-200/80 bg-white/80 px-3 py-2 text-sm text-gray-900 backdrop-blur-sm"
        />
      </div>
      <div>
        <label htmlFor="record-type" className="mb-1 block text-xs text-gray-900 md:text-sm">
          Type
        </label>
        <select
          id="record-type"
          value={typeFilter}
          onChange={handleTypeChange}
          className="w-full rounded border border-gray-200/80 bg-white/80 px-3 py-2 text-sm text-gray-900 backdrop-blur-sm"
        >
          <option value="">All</option>
          <option value="INCOME">Income</option>
          <option value="EXPENSE">Expense</option>
        </select>
      </div>
      <div>
        <label htmlFor="record-category" className="mb-1 block text-xs text-gray-900 md:text-sm">
          Category
        </label>
        <input
          id="record-category"
          type="text"
          value={categoryFilter}
          onChange={handleCategoryChange}
          className="w-full rounded border border-gray-200/80 bg-white/80 px-3 py-2 text-sm text-gray-900 backdrop-blur-sm"
        />
      </div>
      <div>
        <label htmlFor="record-start" className="mb-1 block text-xs text-gray-900 md:text-sm">
          From date
        </label>
        <input
          id="record-start"
          type="date"
          value={startDate}
          onChange={handleStartChange}
          className="w-full rounded border border-gray-200/80 bg-white/80 px-3 py-2 text-sm text-gray-900 backdrop-blur-sm"
        />
      </div>
      <div>
        <label htmlFor="record-end" className="mb-1 block text-xs text-gray-900 md:text-sm">
          To date
        </label>
        <input
          id="record-end"
          type="date"
          value={endDate}
          onChange={handleEndChange}
          className="w-full rounded border border-gray-200/80 bg-white/80 px-3 py-2 text-sm text-gray-900 backdrop-blur-sm"
        />
      </div>
    </div>
  )
}

export default RecordFilters
