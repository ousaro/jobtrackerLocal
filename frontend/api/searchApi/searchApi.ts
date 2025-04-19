
import { SearchResponse, SearchResult } from '../../app/types';
import { apiClient } from '../../utils/appClient';


const SEARCH_API_URL = process.env.REACT_APP_SEARCH_SERVICE_URL || 'http://localhost:5000/api/search';
const searchApi = apiClient(SEARCH_API_URL);


export const searchByType = async (
  type: string,
  query: string,
  page: number = 1,
  limit: number = 10
): Promise<SearchResponse> => {
  try {
    const response = await searchApi.get<SearchResult[]>(`/${type}`, {
      params: {
        q: query,
        page,
        limit,
      },
    });
    const results : SearchResult[] = response.data;
    return {results , total: results.length};
  } catch (error) {
    console.error('Error searching:', error);
    throw error;
  }
}


export const reindexAll = async (): Promise<void> => {
  try {
    await searchApi.get<void>(`/reindex-all`);
  } catch (error) {
    console.error('Error reindexing:', error);
    throw error;
  }
}

export const deleteDocument = async (type: string, id: string): Promise<void> => {
  try {
    await searchApi.delete<void>(`/${type}/${id}`);
  } catch (error) {
    console.error('Error deleting document:', error);
    throw error;
  }
}