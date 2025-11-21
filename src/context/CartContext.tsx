import React, { createContext, useCallback, useContext, useEffect, useReducer, useState } from 'react';
import type { ReactNode } from 'react';
import { useUser } from './UserContext';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  quantity: number;
  brand?: string;
}

interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
}

interface ServerCartItem {
  productId: string;
  quantity: number;
  priceSnapshot?: number | null;
  product?: {
    name?: string;
    brand?: string;
    price?: number;
    image?: string;
  } | null;
}

interface CartApiResponse {
  cart?: {
    items?: ServerCartItem[];
  };
}

type CartAction =
  | { type: 'SET_CART'; payload: CartItem[] }
  | { type: 'ADD_OR_INCREMENT'; payload: Omit<CartItem, 'quantity'> }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'RESET' };

interface CartContextType {
  state: CartState;
  addItem: (item: Omit<CartItem, 'quantity'>) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  updateQuantity: (id: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  refreshCart: () => Promise<void>;
  isSyncing: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const API_BASE_URL = (import.meta.env.VITE_FRONTEND_API_URL as string | undefined) ?? 'http://localhost:4010';

const applyTotals = (items: CartItem[]): CartState => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  return { items, total, itemCount };
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'SET_CART':
      return applyTotals(action.payload);
    case 'ADD_OR_INCREMENT': {
      const existing = state.items.find((item) => item.id === action.payload.id);
      if (existing) {
        const updated = state.items.map((item) =>
          item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
        );
        return applyTotals(updated);
      }
      return applyTotals([...state.items, { ...action.payload, quantity: 1 }]);
    }
    case 'REMOVE_ITEM':
      return applyTotals(state.items.filter((item) => item.id !== action.payload));
    case 'UPDATE_QUANTITY': {
      if (action.payload.quantity <= 0) {
        return applyTotals(state.items.filter((item) => item.id !== action.payload.id));
      }
      const updated = state.items.map((item) =>
        item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item
      );
      return applyTotals(updated);
    }
    case 'CLEAR_CART':
      return applyTotals([]);
    case 'RESET':
      return applyTotals([]);
    default:
      return state;
  }
};

const initialState: CartState = {
  items: [],
  total: 0,
  itemCount: 0
};

function mapServerCartItems(items: ServerCartItem[]): CartItem[] {
  return items.map((item) => {
    const product = item.product ?? null;
    const productPrice = product?.price;
    const currentPrice = typeof productPrice === 'number' ? productPrice : item.priceSnapshot ?? 0;
    const snapshot = item.priceSnapshot ?? currentPrice;
    return {
      id: item.productId,
      name: product?.name ?? 'Producto',
      brand: product?.brand ?? '',
      price: currentPrice,
      originalPrice: snapshot > currentPrice ? snapshot : undefined,
      image: product?.image || '/iphone.jpg',
      quantity: item.quantity
    };
  });
}

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const [isSyncing, setIsSyncing] = useState(false);
  const { isAuthenticated } = useUser();

  const refreshCart = useCallback(async () => {
    if (!isAuthenticated) {
      dispatch({ type: 'RESET' });
      return;
    }

    setIsSyncing(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/cart`, {
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('No se pudo obtener el carrito');
      }

      const payload = (await response.json()) as CartApiResponse;

      const mapped = mapServerCartItems(payload.cart?.items ?? []);
      dispatch({ type: 'SET_CART', payload: mapped });
    } catch (error) {
      console.error('Error al cargar el carrito', error);
    } finally {
      setIsSyncing(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      void refreshCart();
    } else {
      dispatch({ type: 'RESET' });
    }
  }, [isAuthenticated, refreshCart]);

  const addItem = useCallback(
    async (item: Omit<CartItem, 'quantity'>) => {
      dispatch({ type: 'ADD_OR_INCREMENT', payload: item });

      if (!isAuthenticated) {
        return;
      }

      setIsSyncing(true);
      try {
        const response = await fetch(`${API_BASE_URL}/api/cart/items`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ productId: item.id, quantity: 1 })
        });

        if (!response.ok) {
          throw new Error('No se pudo actualizar el carrito');
        }

        const payload = (await response.json()) as CartApiResponse;
        dispatch({ type: 'SET_CART', payload: mapServerCartItems(payload.cart?.items ?? []) });
      } catch (error) {
        console.error('Error al agregar producto al carrito', error);
        await refreshCart();
      } finally {
        setIsSyncing(false);
      }
    },
    [isAuthenticated, refreshCart]
  );

  const removeItem = useCallback(
    async (id: string) => {
      dispatch({ type: 'REMOVE_ITEM', payload: id });

      if (!isAuthenticated) {
        return;
      }

      setIsSyncing(true);
      try {
        const response = await fetch(`${API_BASE_URL}/api/cart/items/${id}`, {
          method: 'DELETE',
          credentials: 'include'
        });

        if (!response.ok) {
          throw new Error('No se pudo eliminar el producto del carrito');
        }

        const payload = (await response.json()) as CartApiResponse;
        dispatch({ type: 'SET_CART', payload: mapServerCartItems(payload.cart?.items ?? []) });
      } catch (error) {
        console.error('Error al eliminar del carrito', error);
        await refreshCart();
      } finally {
        setIsSyncing(false);
      }
    },
    [isAuthenticated, refreshCart]
  );

  const updateQuantity = useCallback(
    async (id: string, quantity: number) => {
      if (quantity <= 0) {
        await removeItem(id);
        return;
      }

      dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });

      if (!isAuthenticated) {
        return;
      }

      setIsSyncing(true);
      try {
        const response = await fetch(`${API_BASE_URL}/api/cart/items/${id}`, {
          method: 'PATCH',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ quantity })
        });

        if (!response.ok) {
          throw new Error('No se pudo actualizar la cantidad');
        }

        const payload = (await response.json()) as CartApiResponse;
        dispatch({ type: 'SET_CART', payload: mapServerCartItems(payload.cart?.items ?? []) });
      } catch (error) {
        console.error('Error al actualizar cantidad del carrito', error);
        await refreshCart();
      } finally {
        setIsSyncing(false);
      }
    },
    [isAuthenticated, refreshCart, removeItem]
  );

  const clearCart = useCallback(async () => {
    dispatch({ type: 'CLEAR_CART' });

    if (!isAuthenticated) {
      return;
    }

    setIsSyncing(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/cart`, {
        method: 'DELETE',
        credentials: 'include'
      });

      if (!response.ok && response.status !== 204) {
        throw new Error('No se pudo limpiar el carrito');
      }
    } catch (error) {
      console.error('Error al limpiar el carrito', error);
      await refreshCart();
    } finally {
      setIsSyncing(false);
    }
  }, [isAuthenticated, refreshCart]);

  return (
    <CartContext.Provider
      value={{
        state,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        refreshCart,
        isSyncing
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
