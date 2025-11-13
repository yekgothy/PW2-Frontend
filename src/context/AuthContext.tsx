// src/context/AuthContext.tsx
// Contexto de autenticación con persistencia en localStorage + header Authorization global.

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { loginUser, registerUser, setAuthToken } from '../services/auth';
import type { SafeUser, AuthResponse } from '../services/auth';
type AuthContextType = {
  user: SafeUser | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'auth_token_v1';
const STORAGE_USER = 'auth_user_v1';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<SafeUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Cargar sesión desde localStorage al iniciar
  useEffect(() => {
    const t = localStorage.getItem(STORAGE_KEY);
    const u = localStorage.getItem(STORAGE_USER);
    if (t && u) {
      setToken(t);
      setAuthToken(t); // importante: inyecta el token en Axios
      try {
        setUser(JSON.parse(u));
      } catch {
        setUser(null);
      }
    } else {
      setAuthToken(null);
    }
    setLoading(false);
  }, []);

  // Guardar cambios en localStorage
  useEffect(() => {
    if (token && user) {
      localStorage.setItem(STORAGE_KEY, token);
      localStorage.setItem(STORAGE_USER, JSON.stringify(user));
      setAuthToken(token);
    } else {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(STORAGE_USER);
      setAuthToken(null);
    }
  }, [token, user]);

  async function login(email: string, password: string) {
    const res: AuthResponse = await loginUser(email, password);
    setToken(res.token);
    setUser(res.user);
  }

  async function register(name: string, email: string, password: string) {
    const res: AuthResponse = await registerUser(name, email, password);
    setToken(res.token);
    setUser(res.user);
  }

  function logout() {
    setToken(null);
    setUser(null);
  }

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(token && user),
      loading,
      login,
      register,
      logout
    }),
    [user, token, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe usarse dentro de <AuthProvider>');
  return ctx;
}
