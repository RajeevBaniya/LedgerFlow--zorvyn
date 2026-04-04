import { apiClient } from "./axios.js"

const buildQueryParams = (raw) => {
  const params = {}

  Object.entries(raw).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") {
      return
    }

    params[key] = value
  })

  return params
}

const getRecords = async (params) => {
  const query = buildQueryParams(params)
  const response = await apiClient.get("/records", { params: query })

  return {
    records: response.data.data,
    meta: response.data.meta
  }
}

const createRecord = async (data) => {
  const response = await apiClient.post("/records", data)
  return response.data.data
}

const updateRecord = async (id, data) => {
  const response = await apiClient.patch(`/records/${id}`, data)
  return response.data.data
}

const deleteRecord = async (id) => {
  const response = await apiClient.delete(`/records/${id}`)
  return response.data.data
}

export { createRecord, deleteRecord, getRecords, updateRecord }
