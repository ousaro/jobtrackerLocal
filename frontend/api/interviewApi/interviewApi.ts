import { InterviewFormData, Interview } from '../../app/types';
import { Services } from '../../constants/services';
import { apiClient } from '../../utils/appClient';

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/${Services.INTERVIEW}` ||  `http://localhost:8000/api/${Services.INTERVIEW}`;
const interviewApi = apiClient(API_URL);

export const getInterviews = async (): Promise<Interview[]> => {
    try {
        const response = await interviewApi.get<Interview[]>('/');
        return response.data;
    } catch(error) {
        console.error('Error fetching Interviews:', error);
        throw error;
    }
}

export const getInterviewsByIds = async (ids:string[]): Promise<Interview[]> => {
    try {
        const response = await interviewApi.post<Interview[]>(`/${Services.INTERVIEW_BY_IDS}`,ids);
        return response.data;
    } catch(error) {
        console.error('Error fetching Interviews:', error);
        throw error;
    }
}


export const getInterview = async (uid: string): Promise<Interview> => {
    try {
        const response = await interviewApi.get<Interview>(`/${uid}`);
        return response.data;
    } catch(error) {
        console.error('Error fetching Interview:', error);
        throw error;
    }
}

export const addInterview = async (Interview: InterviewFormData): Promise<Interview> => {
    try {
        const response = await interviewApi.post<Interview>('/', Interview);
        return response.data;
    } catch(error) {
        console.error('Error adding Interview:', error);
        throw error;
    }
}

export const updateInterview = async (uid: string, Interview: InterviewFormData): Promise<Interview> => {
    try {
        const response = await interviewApi.put<Interview>(`/${uid}`, Interview);
        return response.data;
    } catch(error) {
        console.error('Error updating Interview:', error);
        throw error;
    }
}

export const deleteInterview = async (uid: string): Promise<string> => {
    try {
        // Delete user Interview
        const response = await interviewApi.delete<string>(`/${uid}`);
        return response.data;
    } catch(error) {
        console.error('Error deleting Interview:', error);
        throw error;
    }
}       


