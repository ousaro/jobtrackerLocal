export enum Services{
    // Auth
    AUTH = 'auth-service/auth',
    AUTH_LOGIN = 'login',
    AUTH_REGISTER = 'register',

    
    // User
    USER = 'user-service/users/profile',
    USER_PROFILE = '',
    USER_PROFILE_BY_EMAIL = 'email',
    USER_PROFILE_BY_IDS = 'search',
    
    // Search
    SEARCH = 'search-service/search',
    SEARCH_REINDEX = 'reindex-all',
    SEARCH_DELETE = '',
    SEARCH_BY_TYPE = '',
    SEARCH_BY_TYPE_ID = '',

    // Contact
    CONTACT = 'contact-service/contacts',
    CONTACT_BY_IDS = 'ids',

    // Application 
    APPLICATION = 'application-service/applications',
    APPLICATION_BY_IDS = 'ids',

    // Interview
    INTERVIEW = 'interview-service/interviews',
    INTERVIEW_BY_IDS = 'ids',

    // Analytics
    ANALYTICS = 'analytics-service/analytics',
    ANALYTICS_SUMMARY = 'summary',
    
}