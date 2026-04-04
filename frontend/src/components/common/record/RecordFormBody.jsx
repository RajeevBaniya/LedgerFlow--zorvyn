import React, { useState } from "react"

const RecordFormBody = ({
  mode,
  snapshot,
  onClose,
  onSubmit,
  errorMessage,
  isSubmitting
}) => {
  const [amount, setAmount] = useState(snapshot.amount)
  const [type, setType] = useState(snapshot.type)
  const [category, setCategory] = useState(snapshot.category)
  const [dateLocal, setDateLocal] = useState(snapshot.dateLocal)
  const [note, setNote] = useState(snapshot.note)

  const title = mode === "create" ? "New record" : "Edit record"

  const handleBackdropStop = (event) => {
    event.stopPropagation()
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit({
      amount,
      type,
      category,
      dateLocal,
      note
    })
  }

  const handleAmountChange = (event) => {
    setAmount(event.target.value)
  }

  const handleTypeChange = (event) => {
    setType(event.target.value)
  }

  const handleCategoryChange = (event) => {
    setCategory(event.target.value)
  }

  const handleDateLocalChange = (event) => {
    setDateLocal(event.target.value)
  }

  const handleNoteChange = (event) => {
    setNote(event.target.value)
  }

  return (
    <div
      className="glass-surface-interactive w-full max-w-md p-4 shadow-lg"
      onClick={handleBackdropStop}
    >
      <h2 id="record-form-title" className="mb-4 text-lg text-gray-900">
        {title}
      </h2>

      {errorMessage ? (
        <p className="mb-3 text-sm text-finance-danger" role="alert">
          {errorMessage}
        </p>
      ) : null}

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label htmlFor="rf-amount" className="mb-1 block text-xs text-gray-500">
            Amount (rupees)
          </label>
          <input
            id="rf-amount"
            value={amount}
            onChange={handleAmountChange}
            required
            className="w-full rounded border border-gray-200 bg-white px-3 py-2 text-gray-900"
          />
        </div>
        <div>
          <label htmlFor="rf-type" className="mb-1 block text-xs text-gray-500">
            Type
          </label>
          <select
            id="rf-type"
            value={type}
            onChange={handleTypeChange}
            required
            className="w-full rounded border border-gray-200 bg-white px-3 py-2 text-gray-900"
          >
            <option value="INCOME">Income</option>
            <option value="EXPENSE">Expense</option>
          </select>
        </div>
        <div>
          <label htmlFor="rf-category" className="mb-1 block text-xs text-gray-500">
            Category
          </label>
          <input
            id="rf-category"
            value={category}
            onChange={handleCategoryChange}
            required
            className="w-full rounded border border-gray-200 bg-white px-3 py-2 text-gray-900"
          />
        </div>
        <div>
          <label htmlFor="rf-date" className="mb-1 block text-xs text-gray-500">
            Date & time
          </label>
          <input
            id="rf-date"
            type="datetime-local"
            value={dateLocal}
            onChange={handleDateLocalChange}
            required
            className="w-full rounded border border-gray-200 bg-white px-3 py-2 text-gray-900"
          />
        </div>
        <div>
          <label htmlFor="rf-note" className="mb-1 block text-xs text-gray-500">
            Note (optional)
          </label>
          <input
            id="rf-note"
            value={note}
            onChange={handleNoteChange}
            className="w-full rounded border border-gray-200 bg-white px-3 py-2 text-gray-900"
          />
        </div>
        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="w-auto rounded-lg border border-white/30 px-4 py-2 text-sm text-gray-700 transition-all duration-200 hover:bg-white/40"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-auto rounded-lg bg-finance-primary px-4 py-2 text-sm text-white transition-all duration-200 hover:bg-finance-hover disabled:opacity-50"
          >
            {isSubmitting ? "Saving…" : "Save"}
          </button>
        </div>
      </form>
    </div>
  )
}

export default RecordFormBody
