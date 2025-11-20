import React, { createContext, useContext, useEffect, useCallback, useState } from 'react';
import { phones } from '../data';

// Perfil básico (similar al existente) + wishlist + orders
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
  id: number;
  name: string;
  price: number;
  image: string;
}

export interface Order {
  id: string; // uuid simple
  date: string; // ISO
  items: OrderItem[];
  total: number;
}

export interface UserData extends ProfileData {
  wishlist: number[]; // array de IDs de phones
  orders: Order[];
}

const STORAGE_KEY = 'connectel_user_profile';

const defaultProfile: UserData = {
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

interface UserContextShape {
  user: UserData;
  updateProfile: (data: Partial<ProfileData>) => void;
  addToWishlist: (id: number) => void;
  removeFromWishlist: (id: number) => void;
  createMockOrder: () => void; // para demo
  createOrderFromCart: (items: { id: number; name: string; price: number; image: string; quantity: number }[], shippingCost: number) => string; // retorna id
  resetProfile: () => void;
}

const UserContext = createContext<UserContextShape | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserData>(defaultProfile);

  // Cargar de localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Mezclar con default para campos nuevos
        setUser({ ...defaultProfile, ...parsed });
      } catch {
        // ignore
      }
    }
  }, []);

  // Guardar en localStorage cada vez que cambia
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  }, [user]);

  const updateProfile = useCallback((data: Partial<ProfileData>) => {
    setUser(prev => ({ ...prev, ...data }));
  }, []);

  const addToWishlist = useCallback((id: number) => {
    setUser(prev => prev.wishlist.includes(id) ? prev : { ...prev, wishlist: [...prev.wishlist, id] });
  }, []);

  const removeFromWishlist = useCallback((id: number) => {
    setUser(prev => ({ ...prev, wishlist: prev.wishlist.filter(w => w !== id) }));
  }, []);

  const createMockOrder = useCallback(() => {
    // generar orden demo con 1-3 productos
    const count = Math.max(1, Math.floor(Math.random() * 3) + 1);
    const shuffled = [...phones].sort(() => 0.5 - Math.random()).slice(0, count);
    const items: OrderItem[] = shuffled.map(p => ({ id: p.id, name: p.name, price: p.price, image: p.image }));
    const total = items.reduce((acc, it) => acc + it.price, 0);
    const order: Order = {
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      date: new Date().toISOString(),
      items,
      total
    };
    setUser(prev => ({ ...prev, orders: [order, ...prev.orders] }));
  }, []);

  const createOrderFromCart = useCallback((items: { id: number; name: string; price: number; image: string; quantity: number }[], shippingCost: number) => {
    if (!items.length) return '';
    const flat: OrderItem[] = items.map(it => ({ id: it.id, name: `${it.name} x${it.quantity}`, price: it.price * it.quantity, image: it.image }));
    const total = flat.reduce((acc, it) => acc + it.price, 0) + shippingCost;
    const order: Order = {
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      date: new Date().toISOString(),
      items: flat,
      total
    };
    setUser(prev => ({ ...prev, orders: [order, ...prev.orders] }));
    return order.id;
  }, []);

  const resetProfile = useCallback(() => {
    setUser(defaultProfile);
  }, []);

  return (
    <UserContext.Provider value={{ user, updateProfile, addToWishlist, removeFromWishlist, createMockOrder, createOrderFromCart, resetProfile }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextShape => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser debe usarse dentro de <UserProvider>');
  return ctx;
};
