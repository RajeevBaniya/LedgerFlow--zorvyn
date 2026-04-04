import { useCallback, useState } from "react"

import { createRecord, updateRecord } from "../api/records.js"
import {
  datetimeLocalFromIso,
  isoFromDatetimeLocal
} from "../utils/recordDates.js"

const useRecordModalForm = ({ onSaved }) => {
  const [modalOpen, setModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState("create")
  const [editingRecord, setEditingRecord] = useState(null)
  const [formSnapshot, setFormSnapshot] = useState(null)
  const [createFormKey, setCreateFormKey] = useState(0)
  const [formError, setFormError] = useState("")
  const [formSubmitting, setFormSubmitting] = useState(false)

  const openCreate = useCallback(() => {
    setModalMode("create")
    setEditingRecord(null)
    setFormError("")
    setFormSnapshot({
      amount: "",
      type: "EXPENSE",
      category: "",
      dateLocal: datetimeLocalFromIso(new Date().toISOString()),
      note: ""
    })
    setCreateFormKey((key) => key + 1)
    setModalOpen(true)
  }, [])

  const openEdit = useCallback((record) => {
    setModalMode("edit")
    setEditingRecord(record)
    setFormError("")
    setFormSnapshot({
      amount: record.amount ?? "",
      type: record.type ?? "EXPENSE",
      category: record.category ?? "",
      dateLocal: datetimeLocalFromIso(record.date),
      note: record.note ?? ""
    })
    setModalOpen(true)
  }, [])

  const closeModal = useCallback(() => {
    setModalOpen(false)
    setEditingRecord(null)
    setFormSnapshot(null)
    setFormError("")
  }, [])

  const handleFormSubmit = useCallback(
    async (fields) => {
      setFormSubmitting(true)
      setFormError("")

      const dateIso = isoFromDatetimeLocal(fields.dateLocal)

      if (!dateIso) {
        setFormError("Valid date and time required")
        setFormSubmitting(false)
        return
      }

      const payload = {
        amount: fields.amount.trim(),
        type: fields.type,
        category: fields.category.trim(),
        date: dateIso
      }

      const trimmedNote = fields.note.trim()

      if (trimmedNote) {
        payload.note = trimmedNote
      }

      try {
        if (modalMode === "create") {
          await createRecord(payload)
        } else if (editingRecord?.id) {
          await updateRecord(editingRecord.id, payload)
        }

        closeModal()
        onSaved()
      } catch (err) {
        const message =
          err.response?.data?.message ?? err.message ?? "Request failed"
        setFormError(message)
      } finally {
        setFormSubmitting(false)
      }
    },
    [modalMode, editingRecord, closeModal, onSaved]
  )

  const formKey =
    modalMode === "edit" && editingRecord?.id
      ? `edit-${editingRecord.id}`
      : `create-${createFormKey}`

  return {
    modalOpen,
    modalMode,
    formError,
    formSubmitting,
    formSnapshot,
    formKey,
    openCreate,
    openEdit,
    closeModal,
    onFormSubmit: handleFormSubmit
  }
}

export { useRecordModalForm }
