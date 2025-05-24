// utils/axios.ts
import axios from 'axios';

const axiosInstance = axios.create(); // No baseURL here

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
