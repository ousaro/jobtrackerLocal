import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth';

// Login function
export const login = async (email: string, password: string) => {
    try {
        const response = await axios.post(`${API_URL}/login`, {email, password });
        // Store the token in localStorage or handle it as needed
        localStorage.setItem('token', response.data.token);
        return response.data; // Return the token or user data
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Login failed');
    }
};

// Register function
export const register = async (fullName: string, email: string, password: string, confirmPassword: string, phoneNumber: string) => {
    if(fullName === '' || email === '' || password === '' || confirmPassword === '' || phoneNumber === '') {
        throw new Error('All fields are required');
    }
    if( password !== confirmPassword) {
        throw new Error('Passwords do not match');
    }
    if( phoneNumber.length !== 10) {
        throw new Error('Phone number must be 10 digits long');
    }

    try {
        const response = await axios.post(`${API_URL}/register`, { fullName, email, password,phoneNumber });
        return response.data; // Return the created user data
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Registration failed');
    }
};

export const logout = () => {
    // Remove the token from localStorage or handle logout logic as needed
    localStorage.removeItem('token');
}