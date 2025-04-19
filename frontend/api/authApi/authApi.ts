import { authClient } from '../../utils/appClient';
import { LoginRequest, RegisterRequest, AuthResponse, UserProfile } from '../../app/types';
import { AxiosError } from 'axios';

const API_URL = 'http://localhost:8080/api/auth';
const authApi = authClient(API_URL);

const mockUser = {_id: '',email: '',fullName: '',phone: ''}

// Login function
export const login = async (request: LoginRequest): Promise<AuthResponse> => {
    try {
        const response = await authApi.post<AuthResponse>('/login', request);
        localStorage.setItem('token', response.data.token);
        return {user:mockUser , token : response.data.token};
    } catch (error) {
        const axiosError = error as AxiosError<{ message: string }>;
        throw new Error(axiosError.response?.data?.message || 'Login failed');
    }
};

// Register function
export const register = async (request: RegisterRequest): Promise<AuthResponse> => {
    if (request.fullName === '' || request.email === '' || request.password === '' || request.confirmPassword === '' || request.phoneNumber === '') {
        throw new Error('All fields are required');
    }
    if (request.password !== request.confirmPassword) {
        throw new Error('Passwords do not match');
    }
    if (request.phoneNumber.length !== 10) {
        throw new Error('Phone number must be 10 digits long');
    }

    try {
        const response = await authApi.post<AuthResponse>('/register', request);
        localStorage.setItem('token', response.data.token);
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError<{ message: string }>;
        throw new Error(axiosError.response?.data?.message || 'Registration failed');
    }
};

export const rollback = async (): Promise<string> => {
    try {
        const response = await authApi.get<{ message: string }>('/rollback');
        return response.data.message;
    } catch (error) {
        const axiosError = error as AxiosError<{ message: string }>;
        throw new Error(axiosError.response?.data?.message || 'Rollback failed');
    }
};
