import axios from "axios"

export const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "API-KEY": import.meta.env.VITE_API_KEY,
  },
})

instance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken") || import.meta.env.VITE_AUTH_TOKEN

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }

  return config
})
