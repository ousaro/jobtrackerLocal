import { UserProfile } from "./profile";

// Auth Request Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone:string;
}


// Auth Response Types
export interface AuthResponse {
  token: string;
  profile: UserProfile;
}

export interface User {
  _id: string;
  email: string;
  fullName: string;
  phone:string;
  
}

// Auth Error Types
export interface AuthError {
  code: string;
  message: string;
  field?: string;
}

// Auth State Types
export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: AuthError | null;
}

// Auth Context Types
export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: AuthError | null;
  login: (data: LoginRequest) => Promise<void>;
  logout: () => Promise<void>;
  //refreshToken: () => Promise<void>;
} 