import React from "react"

const Pagination = ({ page, limit, total, onPageChange }) => {
  const totalPages = Math.max(1, Math.ceil(Number(total) / Number(limit)))
  const currentPage = Math.min(Math.max(1, page), totalPages)
  const canPrev = currentPage > 1
  const canNext = currentPage < totalPages

  const handlePrev = () => {
    if (canPrev) {
      onPageChange(currentPage - 1)
    }
  }

  const handleNext = () => {
    if (canNext) {
      onPageChange(currentPage + 1)
    }
  }

  return (
    <div className="flex flex-col gap-3 border-t border-white/10 pt-4 text-sm text-gray-900 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
      <span className="text-xs sm:text-sm">
        Page {currentPage} of {totalPages} · {total} total
      </span>
      <div className="flex w-full justify-end gap-2 sm:w-auto">
        <button
          type="button"
          onClick={handlePrev}
          disabled={!canPrev}
          aria-label="Go to previous page"
          className="w-auto rounded-lg border border-gray-200/90 bg-white/90 px-4 py-2 text-sm font-medium text-gray-900 shadow-sm backdrop-blur-sm transition-all duration-200 hover:bg-white disabled:pointer-events-none disabled:opacity-40"
        >
          Previous
        </button>
        <button
          type="button"
          onClick={handleNext}
          disabled={!canNext}
          aria-label="Go to next page"
          className="w-auto rounded-lg border border-gray-200/90 bg-white/90 px-4 py-2 text-sm font-medium text-gray-900 shadow-sm backdrop-blur-sm transition-all duration-200 hover:bg-white disabled:pointer-events-none disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default Pagination
