import { AnalyticsDataSummary } from '../../app/types';
import { Services } from '../../constants/services';
import { apiClient } from '../../utils/appClient';

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/${Services.ANALYTICS}` ||  `http://localhost:8000/api/${Services.ANALYTICS}`;
const analyticsApi = apiClient(API_URL);

export const getSummary = async (): Promise<AnalyticsDataSummary> => {
    try {
        const response = await analyticsApi.get<AnalyticsDataSummary>(`/${Services.ANALYTICS_SUMMARY}`);
        return response.data;
    } catch(error) {
        console.error('Error fetching Applications:', error);
        throw error;
    }
}



