import axios from "axios";
import { clearUser } from "./localStorageIntermediate";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axios.interceptors.request.use(
  (config) => {
    const sessionToken = localStorage.getItem("sessionToken");
    if (sessionToken) {
      config.headers.Authorization = `Bearer ${sessionToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      console.log("Token expirado. Cerrando sesión...");
      clearUser()
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default apiClient;
