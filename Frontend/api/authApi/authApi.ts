import { authClient } from '../../utils/appClient';
import { LoginRequest, RegisterRequest, AuthResponse, UserProfile } from '../../app/types';
import { AxiosError } from 'axios';
import { Services } from '../../constants/services';

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/${Services.AUTH}` || `http://localhost:8000/api/${Services.AUTH}`;
const authApi = authClient(API_URL);

const mockUser = {_id: '',email: '',fullName: '',phone: ''}

// Login function
export const login = async (request: LoginRequest): Promise<AuthResponse> => {
    try {
        const response = await authApi.post<AuthResponse>(`/${Services.AUTH_LOGIN}`, request);
        localStorage.setItem('token', response.data.token);
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError<{ message: string }>;
        throw new Error(axiosError.response?.data?.message || 'Login failed');
    }
};

// Register function
export const register = async (request: RegisterRequest): Promise<AuthResponse> => {
    if (request.fullName === '' || request.email === '' || request.password === '' || request.confirmPassword === '' || request.phone === '') {
        throw new Error('All fields are required');
    }
    if (request.password !== request.confirmPassword) {
        throw new Error('Passwords do not match');
    }
    if (request.phone.length !== 10) {
        throw new Error('Phone number must be 10 digits long');
    }

    try {
        const response = await authApi.post<AuthResponse>(`/${Services.AUTH_REGISTER}`, request);
        localStorage.setItem('token', response.data.token);
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError<{ message: string }>;
        throw new Error(axiosError.response?.data?.message || 'Registration failed');
    }
};

