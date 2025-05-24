import { AxiosRequestConfig, AxiosResponse } from 'axios';

export interface ApiClient {
  get: <T>(url: string, config?: AxiosRequestConfig) => Promise<AxiosResponse<T>>;
  post: <T>(url: string, data?: any, config?: AxiosRequestConfig) => Promise<AxiosResponse<T>>;
  put: <T>(url: string, data?: any, config?: AxiosRequestConfig) => Promise<AxiosResponse<T>>;
  delete: <T>(url: string, config?: AxiosRequestConfig) => Promise<AxiosResponse<T>>;
}

export interface AuthClient {
  get: <T>(url: string, config?: AxiosRequestConfig) => Promise<AxiosResponse<T>>;
  post: <T>(url: string, data?: any, config?: AxiosRequestConfig) => Promise<AxiosResponse<T>>;
}

export function apiClient(baseURL: string): ApiClient;
export function authClient(baseURL: string): AuthClient; 