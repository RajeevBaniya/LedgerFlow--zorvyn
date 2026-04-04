import React from "react"

const ROLE_OPTIONS = ["VIEWER", "ANALYST", "ADMIN"]

const UserTableRow = ({
  row,
  currentUserId,
  busyUserId,
  onRoleChange,
  onStatusToggle
}) => {
  const isSelf = row.id === currentUserId
  const isBusy = busyUserId === row.id
  const nextStatus = row.status === "ACTIVE" ? "INACTIVE" : "ACTIVE"

  const handleRoleChange = (event) => {
    onRoleChange(row.id, event.target.value)
  }

  const handleStatusClick = () => {
    onStatusToggle(row.id, nextStatus)
  }

  return (
    <tr className="border-b border-white/15 transition-all duration-200 last:border-0 hover:bg-white/20">
      <td className="px-4 py-3 text-gray-900">{row.email}</td>
      <td className="px-4 py-3">
        <select
          value={row.role}
          disabled={isSelf || isBusy}
          title={isSelf ? "You cannot change your own role" : undefined}
          onChange={handleRoleChange}
          className="w-full max-w-[160px] rounded border border-gray-200/80 bg-white/80 px-2 py-1.5 text-gray-900 backdrop-blur-sm transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {ROLE_OPTIONS.map((role) => {
            return (
              <option key={role} value={role}>
                {role}
              </option>
            )
          })}
        </select>
      </td>
      <td className="px-4 py-3 text-gray-900">{row.status}</td>
      <td className="px-4 py-3 text-right">
        <button
          type="button"
          disabled={isBusy || (isSelf && row.status === "ACTIVE")}
          title={
            isSelf && row.status === "ACTIVE"
              ? "Cannot deactivate yourself"
              : undefined
          }
          onClick={handleStatusClick}
          className={
            row.status === "ACTIVE"
              ? "rounded-md border border-finance-danger px-3 py-1 text-xs text-finance-danger transition-all duration-200 hover:bg-red-50/80 disabled:opacity-50"
              : "rounded-md bg-finance-success px-3 py-1 text-xs text-white transition-all duration-200 hover:opacity-90 disabled:opacity-50"
          }
        >
          {row.status === "ACTIVE" ? "Deactivate" : "Activate"}
        </button>
      </td>
    </tr>
  )
}

export default UserTableRow
