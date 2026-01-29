import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { authenticate } from '../data/mockData';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  loadSession: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const loadSession = () => {
    const stored = localStorage.getItem('authSession');
    if (stored) {
      try {
        const session = JSON.parse(stored);
        setUser(session.user);
      } catch {
        localStorage.removeItem('authSession');
      }
    }
  };

  useEffect(() => {
    loadSession();
  }, []);

  const login = (email: string, password: string): boolean => {
    const authenticatedUser = authenticate(email, password);
    if (authenticatedUser) {
      setUser(authenticatedUser);
      localStorage.setItem('authSession', JSON.stringify({ user: authenticatedUser, timestamp: Date.now() }));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('authSession');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, loadSession }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
