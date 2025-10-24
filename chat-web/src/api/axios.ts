import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || "http://localhost:8000/api",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

// Variable to store the token getter function
let getAuthToken: (() => string | null) | null = null;

// Function to set the token getter (called from store setup)
export const setTokenGetter = (getter: () => string | null) => {
  getAuthToken = getter;
};

api.interceptors.request.use((config) => {
  if (getAuthToken) {
    const token = getAuthToken();
    if (token) {
      config.headers.set('Authorization', `Bearer ${token}`);
    }
  }
  return config;
});

export default api;
