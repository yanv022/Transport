import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<User | null>;
  logout: () => void;
  loadSession: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
                                                                        children,
                                                                      }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadSession = () => {
    const stored = localStorage.getItem('authSession');

    if (stored) {
      try {
        const session = JSON.parse(stored);
        setUser(session.user);
        setToken(session.token);
      } catch {
        localStorage.removeItem('authSession');
      }
    }

    setIsLoading(false);
  };

  useEffect(() => {
    loadSession();
  }, []);

  const login = async (
      email: string,
      password: string
  ): Promise<User | null> => {
    try {
      const res = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) return null;

      const data = await res.json();

      const loggedUser: User = {
        id: data.id,
        name: data.name,
        email: data.email,
        role: data.role,
      };

      setUser(loggedUser);
      setToken(data.token);

      localStorage.setItem(
          'authSession',
          JSON.stringify({
            user: loggedUser,
            token: data.token,
            timestamp: Date.now(),
          })
      );

      return loggedUser;
    } catch (error) {
      console.error('Login error', error);
      return null;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('authSession');
  };

  return (
      <AuthContext.Provider
          value={{
            user,
            token,
            isAuthenticated: !!user,
            isLoading,
            login,
            logout,
            loadSession,
          }}
      >
        {children}
      </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
