import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { phones } from '../data';

export interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  age?: number | '';
  address?: string;
  newsletter: boolean;
}

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  image: string;
}

export interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  total: number;
}

export interface UserData extends ProfileData {
  id: string;
  wishlist: string[];
  orders: Order[];
}

type AuthResult = { success: boolean; message?: string };

type LoginPayload = { email: string; password: string };
type RegisterPayload = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  newsletter: boolean;
};

type CartItemInput = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

interface UserContextShape {
  user: UserData;
  isAuthenticated: boolean;
  isLoading: boolean;
  authError: string | null;
  showLoginPrompt: boolean;
  login: (input: LoginPayload) => Promise<AuthResult>;
  register: (input: RegisterPayload) => Promise<AuthResult>;
  logout: () => Promise<void>;
  refreshSession: () => Promise<void>;
  requireAuth: () => boolean;
  closeLoginPrompt: () => void;
  updateProfile: (data: Partial<ProfileData>) => void;
  addToWishlist: (id: string) => void;
  removeFromWishlist: (id: string) => void;
  createMockOrder: () => void;
  createOrderFromCart: (items: CartItemInput[], shippingCost: number) => string;
  resetProfile: () => void;
}

const API_BASE_URL = (import.meta.env.VITE_FRONTEND_API_URL as string | undefined) ?? 'http://localhost:4010';
const STORAGE_PREFIX = 'connectel_user_profile_';

const defaultProfile: UserData = {
  id: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  age: '',
  address: '',
  newsletter: false,
  wishlist: [],
  orders: []
};

const UserContext = createContext<UserContextShape | undefined>(undefined);

function loadLocalProfile(userId: string) {
  if (!userId) return null;

  try {
    const raw = localStorage.getItem(`${STORAGE_PREFIX}${userId}`);
    return raw ? (JSON.parse(raw) as Partial<UserData>) : null;
  } catch (error) {
    console.warn('No se pudo recuperar el perfil local', error);
    return null;
  }
}

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserData>(defaultProfile);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  const persistProfile = useCallback((next: UserData) => {
    if (!next.id) return;

    const payload = {
      wishlist: next.wishlist,
      orders: next.orders,
      phone: next.phone,
      address: next.address,
      age: next.age,
      newsletter: next.newsletter,
      firstName: next.firstName,
      lastName: next.lastName,
      email: next.email
    };

    localStorage.setItem(`${STORAGE_PREFIX}${next.id}`, JSON.stringify(payload));
  }, []);

  const applyAuthenticatedUser = useCallback(
    (payload: Partial<UserData> & { id: string }) => {
      const local = loadLocalProfile(payload.id);
      const localWishlistRaw = Array.isArray(local?.wishlist) ? local.wishlist : [];
      const payloadWishlistRaw = Array.isArray(payload.wishlist) ? payload.wishlist : [];
      const mergedWishlist = Array.from(new Set([...localWishlistRaw, ...payloadWishlistRaw].map((item) => String(item))));

      const merged: UserData = {
        ...defaultProfile,
        ...payload,
        id: payload.id,
        firstName: payload.firstName?.trim() ?? '',
        lastName: payload.lastName?.trim() ?? '',
        email: payload.email ?? '',
        phone: payload.phone ?? local?.phone ?? '',
        address: local?.address ?? payload.address ?? '',
        age: (local?.age ?? payload.age) ?? '',
        newsletter: local?.newsletter ?? payload.newsletter ?? false,
        wishlist: mergedWishlist,
        orders: local?.orders ?? []
      };

      setUser(merged);
      setIsAuthenticated(true);
      persistProfile(merged);
    },
    [persistProfile]
  );

  const resetToGuest = useCallback(() => {
    setUser(defaultProfile);
    setIsAuthenticated(false);
  }, []);

  const refreshSession = useCallback(async () => {
    setIsLoading(true);
    setAuthError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
        credentials: 'include'
      });

      if (!response.ok) {
        resetToGuest();
        return;
      }

      const payload = (await response.json()) as { user: Partial<UserData> & { id: string } };
      applyAuthenticatedUser(payload.user);
    } catch (error) {
      console.error('No se pudo validar la sesión', error);
      resetToGuest();
    } finally {
      setIsLoading(false);
    }
  }, [applyAuthenticatedUser, resetToGuest]);

  useEffect(() => {
    void refreshSession();
  }, [refreshSession]);

  useEffect(() => {
    if (isAuthenticated) {
      persistProfile(user);
    }
  }, [isAuthenticated, persistProfile, user]);

  const login = useCallback(
    async ({ email, password }: LoginPayload): Promise<AuthResult> => {
      setAuthError(null);
      setIsLoading(true);

      try {
        const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
          const errorPayload = (await response.json().catch(() => null)) as { message?: string } | null;
          const message = errorPayload?.message ?? 'No se pudo iniciar sesión';
          setAuthError(message);
          return { success: false, message };
        }

        const payload = (await response.json()) as { user: Partial<UserData> & { id: string } };
        applyAuthenticatedUser(payload.user);
        setShowLoginPrompt(false);
        return { success: true };
      } catch (error) {
        console.error('Error al iniciar sesión', error);
        const message = 'Ocurrió un error al iniciar sesión. Inténtalo de nuevo.';
        setAuthError(message);
        return { success: false, message };
      } finally {
        setIsLoading(false);
      }
    },
    [applyAuthenticatedUser]
  );

  const register = useCallback(
    async (input: RegisterPayload): Promise<AuthResult> => {
      setAuthError(null);
      setIsLoading(true);

      try {
        const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify(input)
        });

        if (!response.ok) {
          const errorPayload = (await response.json().catch(() => null)) as { message?: string } | null;
          const message = errorPayload?.message ?? 'No se pudo crear la cuenta';
          setAuthError(message);
          return { success: false, message };
        }

        const payload = (await response.json()) as { user: Partial<UserData> & { id: string } };
        applyAuthenticatedUser(payload.user);
        setShowLoginPrompt(false);
        return { success: true };
      } catch (error) {
        console.error('Error en el registro', error);
        const message = 'Ocurrió un error al registrar la cuenta.';
        setAuthError(message);
        return { success: false, message };
      } finally {
        setIsLoading(false);
      }
    },
    [applyAuthenticatedUser]
  );

  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      await fetch(`${API_BASE_URL}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include'
      });
    } catch (error) {
      console.error('Error al cerrar sesión', error);
    } finally {
      resetToGuest();
      setIsLoading(false);
    }
  }, [resetToGuest]);

  const updateProfile = useCallback((data: Partial<ProfileData>) => {
    if (!isAuthenticated) {
      setShowLoginPrompt(true);
      return;
    }

    setUser((prev) => {
      const next: UserData = {
        ...prev,
        ...data,
        age: data.age ?? prev.age,
        address: data.address ?? prev.address,
        newsletter: data.newsletter ?? prev.newsletter
      };

      if (prev.id) {
        persistProfile(next);
      }

      return next;
    });
  }, [isAuthenticated, persistProfile]);

  const addToWishlist = useCallback(
    (rawId: string) => {
      const id = String(rawId);
      if (!isAuthenticated) {
        setShowLoginPrompt(true);
        return;
      }

      setUser((prev) => {
        if (prev.wishlist.includes(id)) return prev;
        const next: UserData = { ...prev, wishlist: [...prev.wishlist, id] };
        if (next.id) persistProfile(next);
        return next;
      });
    },
    [isAuthenticated, persistProfile]
  );

  const removeFromWishlist = useCallback(
    (rawId: string) => {
      const id = String(rawId);
      if (!isAuthenticated) {
        setShowLoginPrompt(true);
        return;
      }

      setUser((prev) => {
        if (!prev.wishlist.includes(id)) return prev;
        const next: UserData = { ...prev, wishlist: prev.wishlist.filter((item) => item !== id) };
        if (next.id) persistProfile(next);
        return next;
      });
    },
    [isAuthenticated, persistProfile]
  );

  const createMockOrder = useCallback(() => {
    if (!isAuthenticated) {
      setShowLoginPrompt(true);
      return;
    }

    const count = Math.max(1, Math.floor(Math.random() * 3) + 1);
    const shuffled = [...phones].sort(() => 0.5 - Math.random()).slice(0, count);
  const items: OrderItem[] = shuffled.map((p) => ({ id: String(p.id), name: p.name, price: p.price, image: p.image }));
    const total = items.reduce((acc, item) => acc + item.price, 0);
    const newOrder: Order = {
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      date: new Date().toISOString(),
      items,
      total
    };

    setUser((prev) => {
      const next = { ...prev, orders: [newOrder, ...prev.orders] };
      if (next.id) persistProfile(next);
      return next;
    });
  }, [isAuthenticated, persistProfile]);

  const createOrderFromCart = useCallback(
    (items: CartItemInput[], shippingCost: number) => {
      if (!isAuthenticated) {
        setShowLoginPrompt(true);
        return '';
      }

      if (!items.length) return '';

      const orderItems: OrderItem[] = items.map((item) => ({
        id: item.id,
        name: `${item.name} x${item.quantity}`,
        price: item.price * item.quantity,
        image: item.image
      }));

      const total = orderItems.reduce((acc, item) => acc + item.price, 0) + shippingCost;
      const newOrder: Order = {
        id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
        date: new Date().toISOString(),
        items: orderItems,
        total
      };

      setUser((prev) => {
        const next = { ...prev, orders: [newOrder, ...prev.orders] };
        if (next.id) persistProfile(next);
        return next;
      });

      return newOrder.id;
    },
    [isAuthenticated, persistProfile]
  );

  const resetProfile = useCallback(() => {
    if (user.id) {
      localStorage.removeItem(`${STORAGE_PREFIX}${user.id}`);
    }
    resetToGuest();
  }, [resetToGuest, user.id]);

  const requireAuth = useCallback(() => {
    if (isAuthenticated) return true;
    setShowLoginPrompt(true);
    return false;
  }, [isAuthenticated]);

  const closeLoginPrompt = useCallback(() => {
    setShowLoginPrompt(false);
  }, []);

  const value = useMemo<UserContextShape>(
    () => ({
      user,
      isAuthenticated,
      isLoading,
      authError,
      showLoginPrompt,
      login,
      register,
      logout,
      refreshSession,
      requireAuth,
      closeLoginPrompt,
      updateProfile,
      addToWishlist,
      removeFromWishlist,
      createMockOrder,
      createOrderFromCart,
      resetProfile
    }),
    [
      addToWishlist,
      authError,
      closeLoginPrompt,
      createMockOrder,
      createOrderFromCart,
      isAuthenticated,
      isLoading,
      login,
      logout,
      register,
      refreshSession,
      removeFromWishlist,
      requireAuth,
      resetProfile,
      showLoginPrompt,
      updateProfile,
      user
    ]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser debe usarse dentro de UserProvider');
  return ctx;
};
