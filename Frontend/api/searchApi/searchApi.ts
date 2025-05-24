
import { SearchResponse, SearchResult } from '../../app/types';
import { Services } from '../../constants/services';
import { apiClient } from '../../utils/appClient';


const SEARCH_API_URL = `${process.env.NEXT_PUBLIC_API_URL}/${Services.SEARCH}` ||`http://localhost:8000/api/${Services.SEARCH}`;
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

export const searchByTypeId = async (
  type: string,
  id: string
): Promise<SearchResult> => {
  try {
    const response = await searchApi.get<SearchResult>(`/${type}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error searching by type and ID:', error);
    throw error;
  }
}


export const reindexAll = async (): Promise<void> => {
  try {
    await searchApi.get<void>(`/${Services.SEARCH_REINDEX}`);
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