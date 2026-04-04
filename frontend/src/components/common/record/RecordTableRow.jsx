import React from "react"

import { formatRupee } from "../../../utils/formatCurrency.js"

const formatDate = (iso) => {
  if (!iso) {
    return "—"
  }

  try {
    return new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric"
    })
  } catch {
    return "—"
  }
}

const RecordTableRow = ({
  row,
  isAdmin,
  isConfirming,
  onEdit,
  onCancelDelete,
  onRequestDelete,
  onConfirmDelete
}) => {
  const typeClass =
    row.type === "INCOME" ? "text-finance-success" : "text-finance-danger"

  const handleCancelClick = () => {
    onCancelDelete()
  }

  const handleConfirmClick = () => {
    void onConfirmDelete()
  }

  const handleEditClick = () => {
    onEdit(row)
  }

  const handleDeleteClick = () => {
    onRequestDelete(row.id)
  }

  return (
    <tr className="border-b border-white/15 transition-all duration-200 last:border-0 hover:bg-white/20">
      <td className="px-4 py-3 text-gray-900">{formatRupee(row.amount)}</td>
      <td className={`px-4 py-3 font-medium ${typeClass}`}>{row.type}</td>
      <td className="px-4 py-3 text-gray-900">{row.category}</td>
      <td className="px-4 py-3 text-gray-900">{formatDate(row.date)}</td>
      {isAdmin ? (
        <td className="px-4 py-3 text-right align-top">
          {isConfirming ? (
            <div className="flex flex-col items-end gap-2">
              <p className="text-xs text-gray-900">Delete this record?</p>
              <div className="flex flex-wrap justify-end gap-2">
                <button
                  type="button"
                  onClick={handleCancelClick}
                  className="rounded border border-white/30 px-2 py-1 text-xs text-gray-700 transition-all duration-200 hover:bg-white/40"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmClick}
                  className="rounded bg-finance-danger px-2 py-1 text-xs text-white transition-all duration-200 hover:opacity-90"
                >
                  Delete
                </button>
              </div>
            </div>
          ) : (
            <div>
              <button
                type="button"
                onClick={handleEditClick}
                className="mr-2 rounded-md px-2 py-1 text-sm text-finance-primary transition-all duration-200 hover:bg-white/50"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={handleDeleteClick}
                className="rounded-md px-2 py-1 text-sm text-finance-danger transition-all duration-200 hover:bg-red-50/80"
              >
                Delete
              </button>
            </div>
          )}
        </td>
      ) : null}
    </tr>
  )
}

export default RecordTableRow
