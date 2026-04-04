import React, { useState } from "react"

import RecordTableRow from "./RecordTableRow.jsx"

const RecordTable = ({ records, isAdmin, onEdit, onDelete }) => {
  const [pendingDeleteId, setPendingDeleteId] = useState(null)

  const handleCancelDelete = () => {
    setPendingDeleteId(null)
  }

  const handleEdit = (row) => {
    setPendingDeleteId(null)
    onEdit(row)
  }

  const handleConfirmDelete = async () => {
    const id = pendingDeleteId

    if (!id) {
      return
    }

    try {
      await onDelete(id)
    } finally {
      setPendingDeleteId(null)
    }
  }

  if (!Array.isArray(records) || records.length === 0) {
    return (
      <div className="glass-surface p-8 text-center text-sm text-gray-900">
        No records found
      </div>
    )
  }

  return (
    <div className="glass-surface overflow-x-auto">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead className="bg-gray-100/80">
          <tr className="border-b border-white/20 text-gray-900">
            <th className="px-4 py-3 font-medium">Amount</th>
            <th className="px-4 py-3 font-medium">Type</th>
            <th className="px-4 py-3 font-medium">Category</th>
            <th className="px-4 py-3 font-medium">Date</th>
            {isAdmin ? (
              <th className="px-4 py-3 font-medium text-right">Actions</th>
            ) : null}
          </tr>
        </thead>
        <tbody>
          {records.map((row) => {
            return (
              <RecordTableRow
                key={row.id}
                row={row}
                isAdmin={isAdmin}
                isConfirming={pendingDeleteId === row.id}
                onEdit={handleEdit}
                onCancelDelete={handleCancelDelete}
                onRequestDelete={setPendingDeleteId}
                onConfirmDelete={handleConfirmDelete}
              />
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default RecordTable
