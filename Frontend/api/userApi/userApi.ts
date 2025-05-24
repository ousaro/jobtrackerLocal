import { ProfileFormData, UserProfile } from '../../app/types';
import { Services } from '../../constants/services';
import { apiClient } from '../../utils/appClient';

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/${Services.USER}` ||  `http://localhost:8000/api/${Services.USER}`;
const SEARCH_API_URL = `${process.env.API_URL}/${Services.SEARCH}` ||  `http://localhost:8000/api/${Services.SEARCH}`;;
const userApi = apiClient(API_URL);

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
        const response = await userApi.post<UserProfile[]>(`/${Services.USER_PROFILE_BY_IDS}`,{ids});
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
        const response = await userApi.get<UserProfile>(`/${Services.USER_PROFILE_BY_EMAIL}/${email}`);
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

export const updateProfile = async (uid: string, profile: ProfileFormData): Promise<UserProfile> => {
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
        return response.data;
    } catch(error) {
        console.error('Error deleting profile:', error);
        throw error;
    }
}       


