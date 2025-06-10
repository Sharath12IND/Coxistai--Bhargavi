import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check localStorage for auth state on mount
  useEffect(() => {
    const authState = localStorage.getItem('coexist-auth-state');
    if (authState === 'authenticated') {
      setIsAuthenticated(true);
    }
  }, []);

  const login = () => {
    setIsAuthenticated(true);
    localStorage.setItem('coexist-auth-state', 'authenticated');
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('coexist-auth-state');
    localStorage.removeItem('coexist-user-profile');
  };

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      login,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
};