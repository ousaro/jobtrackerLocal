import { ContactFormData, Contact } from '../../app/types';
import { Services } from '../../constants/services';
import { apiClient } from '../../utils/appClient';

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/${Services.CONTACT}` ||  `http://localhost:8000/api/${Services.CONTACT}`;
const contactApi = apiClient(API_URL);

export const getContacts = async (): Promise<Contact[]> => {
    try {
        const response = await contactApi.get<Contact[]>('/');
        return response.data;
    } catch(error) {
        console.error('Error fetching Contacts:', error);
        throw error;
    }
}

export const getContactsByIds = async (ids:string[]): Promise<Contact[]> => {
    try {
        const response = await contactApi.post<Contact[]>(`/${Services.CONTACT_BY_IDS}`,ids);
        return response.data;
    } catch(error) {
        console.error('Error fetching Contacts:', error);
        throw error;
    }
}


export const getContact = async (uid: string): Promise<Contact> => {
    try {
        const response = await contactApi.get<Contact>(`/${uid}`);
        return response.data;
    } catch(error) {
        console.error('Error fetching Contact:', error);
        throw error;
    }
}

export const addContact = async (Contact: ContactFormData): Promise<Contact> => {
    try {
        const response = await contactApi.post<Contact>('/', Contact);
        return response.data;
    } catch(error) {
        console.error('Error adding Contact:', error);
        throw error;
    }
}

export const updateContact = async (uid: string, Contact: ContactFormData): Promise<Contact> => {
    try {
        const response = await contactApi.put<Contact>(`/${uid}`, Contact);
        return response.data;
    } catch(error) {
        console.error('Error updating Contact:', error);
        throw error;
    }
}

export const deleteContact = async (uid: string): Promise<string> => {
    try {
        // Delete user Contact
        const response = await contactApi.delete<string>(`/${uid}`);
        return response.data;
    } catch(error) {
        console.error('Error deleting Contact:', error);
        throw error;
    }
}       


