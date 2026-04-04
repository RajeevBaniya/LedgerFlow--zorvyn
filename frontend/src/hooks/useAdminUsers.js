import { useCallback, useEffect, useState } from "react"

import {
  getUsers,
  updateUserRole,
  updateUserStatus
} from "../api/users.js"
import { useAuth } from "./useAuth.js"

const useAdminUsers = () => {
  const { user } = useAuth()
  const currentUserId = user?.id

  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [flashMessage, setFlashMessage] = useState("")
  const [busyUserId, setBusyUserId] = useState(null)

  useEffect(() => {
    if (!flashMessage) {
      return
    }

    const timerId = window.setTimeout(() => {
      setFlashMessage("")
    }, 4000)

    return () => {
      window.clearTimeout(timerId)
    }
  }, [flashMessage])

  const loadUsers = useCallback(async () => {
    setLoading(true)
    setError("")

    try {
      const data = await getUsers()
      const list = data?.users
      setUsers(Array.isArray(list) ? list : [])
      setLoading(false)
    } catch (err) {
      const message =
        err.response?.data?.message ?? err.message ?? "Failed to load users"
      setError(message)
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void loadUsers()
  }, [loadUsers])

  const handleRoleChange = useCallback(
    async (targetId, role) => {
      if (targetId === currentUserId) {
        setFlashMessage("You cannot change your own role.")
        return
      }

      setBusyUserId(targetId)
      setError("")

      try {
        await updateUserRole(targetId, role)
        await loadUsers()
      } catch (err) {
        const message =
          err.response?.data?.message ?? err.message ?? "Role update failed"
        setError(message)
      } finally {
        setBusyUserId(null)
      }
    },
    [currentUserId, loadUsers]
  )

  const handleStatusToggle = useCallback(
    async (targetId, nextStatus) => {
      if (targetId === currentUserId && nextStatus === "INACTIVE") {
        setFlashMessage("You cannot deactivate your own account.")
        return
      }

      setBusyUserId(targetId)
      setError("")

      try {
        await updateUserStatus(targetId, nextStatus)
        await loadUsers()
      } catch (err) {
        const message =
          err.response?.data?.message ?? err.message ?? "Status update failed"
        setError(message)
      } finally {
        setBusyUserId(null)
      }
    },
    [currentUserId, loadUsers]
  )

  return {
    users,
    loading,
    error,
    flashMessage,
    busyUserId,
    currentUserId,
    onRoleChange: handleRoleChange,
    onStatusToggle: handleStatusToggle,
    reload: loadUsers
  }
}

export { useAdminUsers }
