export enum Services{
    // Auth
    AUTH = 'auth_service/auth',
    AUTH_LOGIN = 'login',
    AUTH_REGISTER = 'register',

    
    // User
    USER = 'user_service/users/profile',
    USER_PROFILE = '',
    USER_PROFILE_BY_EMAIL = 'email',
    USER_PROFILE_BY_IDS = 'search',
    
    // Search
    SEARCH = 'search_service/search',
    SEARCH_REINDEX = 'reindex-all',
    SEARCH_DELETE = '',
    SEARCH_BY_TYPE = '',
    SEARCH_BY_TYPE_ID = '',
    
}