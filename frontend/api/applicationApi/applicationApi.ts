import { Application, ApplicationFormData } from '../../app/types';
import { Services } from '../../constants/services';
import { apiClient } from '../../utils/appClient';

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/${Services.APPLICATION}` ||  `http://localhost:8000/api/${Services.APPLICATION}`;
const applicationApi = apiClient(API_URL);

export const getApplications = async (): Promise<Application[]> => {
    try {
        const response = await applicationApi.get<Application[]>('/');
        return response.data;
    } catch(error) {
        console.error('Error fetching Applications:', error);
        throw error;
    }
}

export const getApplicationsByIds = async (ids:string[]): Promise<Application[]> => {
    try {
        const response = await applicationApi.post<Application[]>(`/${Services.APPLICATION_BY_IDS}`,ids);
        return response.data;
    } catch(error) {
        console.error('Error fetching Applications:', error);
        throw error;
    }
}


export const getApplication = async (uid: string): Promise<Application> => {
    try {
        const response = await applicationApi.get<Application>(`/${uid}`);
        return response.data;
    } catch(error) {
        console.error('Error fetching Application:', error);
        throw error;
    }
}

export const addApplication = async (Application: ApplicationFormData): Promise<Application> => {
    try {
        const response = await applicationApi.post<Application>('', Application);
        return response.data;
    } catch(error) {
        console.error('Error adding Application:', error);
        throw error;
    }
}

export const updateApplication = async (uid: string, Application: ApplicationFormData): Promise<Application> => {
    try {
        const response = await applicationApi.put<Application>(`/${uid}`, Application);
        return response.data;
    } catch(error) {
        console.error('Error updating Application:', error);
        throw error;
    }
}

export const deleteApplication = async (uid: string): Promise<string> => {
    try {
        // Delete user Application
        const response = await applicationApi.delete<string>(`/${uid}`);
        return response.data;
    } catch(error) {
        console.error('Error deleting Application:', error);
        throw error;
    }
}       


