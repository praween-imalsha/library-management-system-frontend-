import axios, { AxiosError } from "axios" // Import axios and AxiosError type

export const BASE_URL = "http://localhost:3000/api" // Define the base API URL

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
})

export const setHeader = (token: string | null) => {
  if (token) {
    apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`
  } else {
    delete apiClient.defaults.headers.common["Authorization"]
  }
}


apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config
      if (error.response?.status === 403 && !originalRequest._retry) {

        originalRequest._retry = true // Mark request as retried
        try {
          const res = await apiClient.post("/auth/refresh-token")
          const newAccessToken = res.data.accessToken
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`
          return apiClient(originalRequest)

        } catch (refreshError) {
          if (refreshError instanceof AxiosError) {
            if (refreshError.response?.status === 401) {
              window.location.href = "/login"
            }
          }
        }
      }
      return Promise.reject(error)
    }
)

export default apiClient
