export interface SearchResult {
    id: string;
    _score?: string
    highlight: {id:string, fullName: string}
  }
  
  export interface SearchResponse {
    results: SearchResult[];
    total: number;
  }