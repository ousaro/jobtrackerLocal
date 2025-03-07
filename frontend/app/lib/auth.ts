// Mock user data
export const mockUser = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  role: 'USER' as const,
  createdAt: new Date(),
  updatedAt: new Date(),
};

// Mock authentication state
let isAuthenticated = false;

export const login = async (email: string, password: string) => {
  // Mock login logic
  if (email && password) {
    isAuthenticated = true;
    return mockUser;
  }
  throw new Error('Invalid credentials');
};

export const logout = async () => {
  isAuthenticated = false;
};

export const getUser = () => {
  if (isAuthenticated) {
    return mockUser;
  }
  return null;
};

export const useAuth = () => {
  return {
    user: isAuthenticated ? mockUser : null,
    login,
    logout,
    isAuthenticated,
  };
};