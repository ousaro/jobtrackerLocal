import { ProfileFormData, UserProfile } from '../../app/types';
import { apiClient } from '../../utils/appClient';

const API_URL = 'http://localhost:5001/api/users/profile';
const SEARCH_API_URL = 'http://localhost:5000/api/search';
const userApi = apiClient(API_URL);
const searchApi = apiClient(SEARCH_API_URL);

export const getProfiles = async (): Promise<UserProfile[]> => {
    try {
        const response = await userApi.get<UserProfile[]>('/');
        return response.data;
    } catch(error) {
        console.error('Error fetching profiles:', error);
        throw error;
    }
}

export const getProfilesByIds = async (ids:string[]): Promise<UserProfile[]> => {
    try {
        const response = await userApi.post<UserProfile[]>('/search',{ids});
        return response.data;
    } catch(error) {
        console.error('Error fetching profiles:', error);
        throw error;
    }
}


export const getProfile = async (uid: string): Promise<UserProfile> => {
    try {
        const response = await userApi.get<UserProfile>(`/${uid}`);
        return response.data;
    } catch(error) {
        console.error('Error fetching profile:', error);
        throw error;
    }
}

export const getProfileByEmail = async (email: string): Promise<UserProfile> => {
    try {
        const response = await userApi.get<UserProfile>(`/email/${email}`);
        return response.data;
    } catch(error) {
        console.error('Error fetching profile by email:', error);
        throw error;
    }
}

export const addProfile = async (profile: ProfileFormData): Promise<UserProfile> => {
    try {
        const response = await userApi.post<UserProfile>('/', profile);
        return response.data;
    } catch(error) {
        console.error('Error adding profile:', error);
        throw error;
    }
}

export const updateProfile = async (uid: string, profile: UserProfile): Promise<UserProfile> => {
    try {
        const response = await userApi.put<UserProfile>(`/${uid}`, profile);
        return response.data;
    } catch(error) {
        console.error('Error updating profile:', error);
        throw error;
    }
}

export const deleteProfile = async (uid: string): Promise<string> => {
    try {
        // Delete user profile
        const response = await userApi.delete<string>(`/${uid}`);
        
        // Delete user from search index
        await searchApi.delete(`/users/${uid}`);
        
        return response.data;
    } catch(error) {
        console.error('Error deleting profile:', error);
        throw error;
    }
}       


