// client/src/api/client.ts
import axios from "axios";
import { clearToken } from "../auth/auth";

const rawBase = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

const API_BASE = rawBase.replace(/\/$/, "") + "/api";

const api = axios.create({
  baseURL: API_BASE,
});
;

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error?.response?.status === 401) {
      clearToken();
    }
    return Promise.reject(error); // ✅ IMPORTANT
  }
);
export default api;
