import React, { useMemo, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { phones } from '../data';

const Catalog: React.FC = () => {
  const [brand, setBrand] = useState<string>('');
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [query, setQuery] = useState<string>('');

  const brands = Array.from(new Set(phones.map(p => (p.name.split(' ')[0] || '').trim()))).filter(Boolean);

  const results = useMemo(() => {
    const min = Number(minPrice || 0);
    const max = Number(maxPrice || 0);
    return phones.filter(p => {
      const textMatch = query.trim()
        ? (p.name + ' ' + (p.description ?? '')).toLowerCase().includes(query.toLowerCase())
        : true;
      const brandMatch = brand ? p.name.toLowerCase().startsWith(brand.toLowerCase()) : true;
      const minMatch = min > 0 ? p.price >= min : true;
      const maxMatch = max > 0 ? p.price <= max : true;
      return textMatch && brandMatch && minMatch && maxMatch;
    });
  }, [brand, minPrice, maxPrice, query]);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

  <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Catálogo</h1>
            <p className="text-gray-600 mt-1">Explora todos nuestros modelos. Usa los filtros para afinar tu búsqueda.</p>
          </div>
          <div className="hidden sm:flex items-center space-x-3">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar modelo o descripción..."
              className="px-4 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-[#B974F4]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Sidebar filtros */}
          <aside className="lg:col-span-1 bg-white rounded-2xl p-5  border border-gray-100 shadow-sm lg:sticky lg:top-40 self-start h-fit">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Filtros</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Marca</label>
                <select
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-[#B974F4]"
                >
                  <option value="">Todas</option>
                  {brands.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Precio mínimo</label>
                <input
                  type="number"
                  min={0}
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-[#B974F4]"
                  placeholder="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Precio máximo</label>
                <input
                  type="number"
                  min={0}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-[#B974F4]"
                  placeholder="0"
                />
              </div>

              <div className="flex items-center justify-between">
                <button
                  onClick={() => { setBrand(''); setMinPrice(''); setMaxPrice(''); setQuery(''); }}
                  className="text-sm text-gray-600 hover:text-gray-800"
                >
                  Limpiar filtros
                </button>
                <span className="text-sm text-gray-500">{results.length} resultados</span>
              </div>
            </div>
          </aside>

          {/* Grid de productos */}
          <section className="lg:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
              {results.map(p => (
                <ProductCard key={p.id} id={p.id} name={p.name} price={p.price} image={p.image} />
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Catalog;
