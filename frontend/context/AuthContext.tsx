'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { getToken, getTokenClaims } from '../utils/tokenService';
import { getProfileByEmail } from '../api/userApi/userApi';

interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string, userData: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const getAuthUser = async () => {
      try {
        const { sub: userEmail } = getTokenClaims();
  
        if (!userEmail) {
          setIsLoading(false);
          return;
        }
  
        const userProfile = await getProfileByEmail(userEmail);
  
        setUser({
          id: userProfile._id,
          fullName: userProfile.fullName,
          email: userProfile.email,
          phone: userProfile.phone,
        });
  
        console.log("User context setup");
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
        logout(); // force logout if token is bad
      } finally {
        setIsLoading(false);
      }
    };
  
    getAuthUser();
  }, []);
  

  const login = (token: string, userData: User) => {
    localStorage.setItem('token', token);
    setUser(userData);
    router.push('/dashboard');
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    router.push('/login');
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 