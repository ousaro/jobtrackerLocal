// utils/apiClient.ts
import axiosInstance from './axios';
import axios from 'axios';

export const apiClient = (baseURL: string) => {
  return {
    get: <T>(url: string, config = {}) => axiosInstance.get<T>(`${baseURL}${url}`, config),
    post: <T>(url: string, data: any, config = {}) => axiosInstance.post<T>(`${baseURL}${url}`, data, config),
    put: <T>(url: string, data: any, config = {}) => axiosInstance.put<T>(`${baseURL}${url}`, data, config),
    delete: <T>(url: string, config = {}) => axiosInstance.delete<T>(`${baseURL}${url}`, config),
  };
};

// Not using axiosInstance because we need to add the token to the request
export const authClient = (baseURL: string) => {
  return {
    get: <T>(url: string, config = {}) => axios.get<T>(`${baseURL}${url}`, config),
    post: <T>(url: string, data: any, config = {}) => axios.post<T>(`${baseURL}${url}`, data, config),
  };
};


