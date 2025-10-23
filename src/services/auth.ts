// src/services/auth.ts
// Cliente Axios para Auth: register, login, getMe y manejo de token global.

import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  withCredentials: true
});

// ---- Tipos ----
export type SafeUser = {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  createdAt?: string;
};

export type AuthResponse = {
  token: string;
  user: SafeUser;
};

// ---- Token global (Authorization) ----
let currentToken: string | null = null;

/**
 * setAuthToken: inyecta o quita el header Authorization en axios
 */
export function setAuthToken(token: string | null) {
  currentToken = token;
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
}

// Interceptor por si cambia currentToken entre requests
api.interceptors.request.use((config) => {
  if (currentToken) {
    config.headers = config.headers || {};
    config.headers['Authorization'] = `Bearer ${currentToken}`;
  }
  return config;
});

// ---- Llamadas ----
export async function registerUser(name: string, email: string, password: string): Promise<AuthResponse> {
  const { data } = await api.post<AuthResponse>('/api/auth/register', { name, email, password });
  return data;
}

export async function loginUser(email: string, password: string): Promise<AuthResponse> {
  const { data } = await api.post<AuthResponse>('/api/auth/login', { email, password });
  return data;
}

export async function getMe(): Promise<SafeUser> {
  const { data } = await api.get<SafeUser>('/api/auth/me');
  return data;
}

export default api;
