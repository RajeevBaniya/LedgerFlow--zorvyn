import { apiClient } from "./axios.js"

const getUsers = async () => {
  const response = await apiClient.get("/users")
  return response.data.data
}

const updateUserRole = async (id, role) => {
  const response = await apiClient.patch(`/users/${id}/role`, { role })
  return response.data.data
}

const updateUserStatus = async (id, status) => {
  const response = await apiClient.patch(`/users/${id}/status`, { status })
  return response.data.data
}

export { getUsers, updateUserRole, updateUserStatus }
