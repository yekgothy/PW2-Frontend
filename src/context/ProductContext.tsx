import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  description: string;
  stock: number;
  status: string;
  collections: string[];
  image: string;
  features: string[];
  onSale: boolean;
  bestSeller: boolean;
  newArrival: boolean;
  isFeatured: boolean;
  releaseDate: string | null;
  rating: number;
  reviews: number;
}

interface ProductContextValue {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  getProductById: (id: string) => Product | undefined;
  brands: string[];
}

const ProductContext = createContext<ProductContextValue | undefined>(undefined);

const API_BASE_URL = (import.meta.env.VITE_FRONTEND_API_URL as string | undefined) ?? 'http://localhost:4010';

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadProducts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 15000);
      const response = await fetch(`${API_BASE_URL}/api/products`, {
        method: 'GET',
        signal: controller.signal
      });
      clearTimeout(timeout);

      if (!response.ok) {
        throw new Error('No se pudieron obtener los productos');
      }

      const payload = (await response.json()) as { products: Product[] };
      setProducts(payload.products ?? []);
    } catch (err) {
      console.error('Error al cargar productos', err);
      setError('No se pudieron cargar los productos. Intenta nuevamente.');
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadProducts();
  }, [loadProducts]);

  const getProductById = useCallback(
    (id: string) => products.find((product) => product.id === id),
    [products]
  );

  const brands = useMemo(() => {
    const unique = new Set<string>();
    products.forEach((product) => {
      if (product.brand) {
        unique.add(product.brand);
      } else {
        const inferred = product.name.split(' ')[0];
        if (inferred) {
          unique.add(inferred);
        }
      }
    });
    return Array.from(unique).sort();
  }, [products]);

  const value = useMemo(
    () => ({
      products,
      isLoading,
      error,
      refresh: loadProducts,
      getProductById,
      brands
    }),
    [brands, error, getProductById, isLoading, loadProducts, products]
  );

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useProducts = (): ProductContextValue => {
  const ctx = useContext(ProductContext);
  if (!ctx) {
    throw new Error('useProducts debe usarse dentro de ProductProvider');
  }
  return ctx;
};
