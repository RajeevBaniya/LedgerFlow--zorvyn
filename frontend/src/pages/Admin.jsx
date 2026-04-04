import React from "react"

import PageLoading from "../components/common/ui/PageLoading.jsx"
import UserTable from "../components/common/user/UserTable.jsx"
import { useAdminUsers } from "../hooks/useAdminUsers.js"

const Admin = () => {
  const {
    users,
    loading,
    error,
    flashMessage,
    busyUserId,
    currentUserId,
    onRoleChange,
    onStatusToggle,
    reload
  } = useAdminUsers()

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <h1 className="text-lg font-medium text-finance-light md:text-xl">Users</h1>
        <div className="flex w-full justify-end md:mt-0">
          <button
            type="button"
            onClick={reload}
            className="w-auto rounded-lg bg-finance-primary px-4 py-2 text-sm text-white transition-all duration-200 hover:bg-finance-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-finance-primary"
          >
            Refresh
          </button>
        </div>
      </div>

      {flashMessage ? (
        <p className="text-sm text-finance-warning md:text-base" role="status">
          {flashMessage}
        </p>
      ) : null}

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
        <PageLoading label="Loading users…" />
      ) : (
        <UserTable
          users={users}
          currentUserId={currentUserId}
          busyUserId={busyUserId}
          onRoleChange={onRoleChange}
          onStatusToggle={onStatusToggle}
        />
      )}
    </div>
  )
}

export default Admin
