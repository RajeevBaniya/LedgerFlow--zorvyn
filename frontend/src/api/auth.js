import { apiClient } from "./axios.js"

const postLogin = async (body) => {
  return apiClient.post("/auth/login", body)
}

const postSignup = async (body) => {
  return apiClient.post("/auth/signup", body)
}

export { postLogin, postSignup }
