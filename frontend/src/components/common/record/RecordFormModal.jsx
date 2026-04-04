import React from "react"
import { createPortal } from "react-dom"

import RecordFormBody from "./RecordFormBody.jsx"

const RecordFormModal = ({
  isOpen,
  mode,
  snapshot,
  formKey,
  onClose,
  onSubmit,
  errorMessage,
  isSubmitting
}) => {
  const handleBackdropClick = () => {
    onClose()
  }

  if (!isOpen || !snapshot) {
    return null
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="record-form-title"
      onClick={handleBackdropClick}
    >
      <RecordFormBody
        key={formKey}
        mode={mode}
        snapshot={snapshot}
        onClose={onClose}
        onSubmit={onSubmit}
        errorMessage={errorMessage}
        isSubmitting={isSubmitting}
      />
    </div>,
    document.body
  )
}

export default RecordFormModal
