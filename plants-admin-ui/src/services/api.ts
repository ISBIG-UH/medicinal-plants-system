import axios from "axios";
import { clearUser } from "../localStorageIntermediate";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});


apiClient.interceptors.request.use(
  (config) => {
    const sessionToken = localStorage.getItem("sessionToken");
    if (sessionToken) {
      config.headers.Authorization = `Bearer ${sessionToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      alert("Sesión expirada. Inicie sesión nuevamente.");
      clearUser()
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

