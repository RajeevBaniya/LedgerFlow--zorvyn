import React from "react"

import UserTableRow from "./UserTableRow.jsx"

const UserTable = ({
  users,
  currentUserId,
  busyUserId,
  onRoleChange,
  onStatusToggle
}) => {
  if (!Array.isArray(users) || users.length === 0) {
    return (
      <div className="glass-surface p-8 text-center text-sm text-gray-900">
        No users found.
      </div>
    )
  }

  return (
    <div className="glass-surface overflow-x-auto">
      <table className="w-full min-w-[720px] text-left text-sm">
        <thead className="bg-gray-100/80">
          <tr className="border-b border-white/20 text-gray-900">
            <th className="px-4 py-3 font-medium">Email</th>
            <th className="px-4 py-3 font-medium">Role</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((row) => {
            return (
              <UserTableRow
                key={row.id}
                row={row}
                currentUserId={currentUserId}
                busyUserId={busyUserId}
                onRoleChange={onRoleChange}
                onStatusToggle={onStatusToggle}
              />
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default UserTable
