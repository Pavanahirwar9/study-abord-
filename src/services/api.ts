// src/services/api.ts
import axios from "axios";

/**
 * Centralized Axios instance for all DummyJSON API calls.
 * Setting baseURL here means every service only needs relative paths.
 */
const api = axios.create({
  baseURL: "https://dummyjson.com",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

/**
 * Request interceptor — attaches auth token from localStorage if present.
 * This ensures authenticated endpoints receive the Bearer token automatically.
 */
api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      try {
        const authStorage = localStorage.getItem("auth-storage");
        if (authStorage) {
          const parsed = JSON.parse(authStorage);
          const token = parsed?.state?.token;
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        }
      } catch {
        // Silently ignore parse errors
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Response interceptor — centralized error logging.
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("[API Error]", error?.response?.status, error?.message);
    return Promise.reject(error);
  }
);

export default api;
