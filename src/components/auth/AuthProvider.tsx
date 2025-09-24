// AuthProvider for context-based authentication (multi-role)

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { api } from '../../utils/api';

interface AuthContextType {
  user: any;
  role: string | null;
  login: (email: string, password: string, role: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [role, setRole] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);



  const login = async (email: string, password: string, role: string) => {
    try {
      const res = await api.post('/api/login', { email, password, role });
      if (res.data.token) {
        localStorage.setItem('jwt', res.data.token);
      }
      setUser(res.data.user);
      setRole(res.data.user.role);
      setIsAuthenticated(true);
    } catch (err) {
      throw new Error('Login failed');
    }
  };

  const register = async (name: string, email: string, password: string, role: string) => {
    try {
      const res = await api.post('/api/signup', { name, email, password, role });
      // Backend does not return token on signup, so just set user and role
      setUser(res.data.user);
      setRole(res.data.user.role);
      setIsAuthenticated(true);
    } catch (err) {
      throw new Error('Registration failed');
    }
  };


  const logout = () => {
    localStorage.removeItem('jwt');
    setUser(null);
    setRole(null);
    setIsAuthenticated(false);
  };

  // On mount, check for JWT and try to fetch user profile
  React.useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token && !user) {
      api.get('/api/profile', { headers: { Authorization: `Bearer ${token}` } })
        .then(res => {
          setUser(res.data.user);
          setRole(res.data.user.role);
          setIsAuthenticated(true);
        })
        .catch(() => logout());
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, role, login, register, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuthContext must be used within AuthProvider');
  return ctx;
};
