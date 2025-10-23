import React, { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { phones } from '../data';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SearchResults: React.FC = () => {
  const query = useQuery();
  const q = query.get('q') ?? '';
  const min = Number(query.get('min') ?? '');
  const max = Number(query.get('max') ?? '');
  const brand = query.get('brand') ?? '';
  const navigate = useNavigate();

  const results = useMemo(() => {
    return phones.filter(p => {
      // text match
      const textMatch = q.trim()
        ? (p.name + ' ' + (p.description ?? '')).toLowerCase().includes(q.toLowerCase())
        : true;
      // brand match (first word of name)
      const pBrand = (p.name.split(' ')[0] || '').toLowerCase();
      const brandMatch = brand ? pBrand === brand.toLowerCase() : true;
      // price match
      const minMatch = !isFinite(min) || min <= 0 ? true : p.price >= min;
      const maxMatch = !isFinite(max) || max <= 0 ? true : p.price <= max;
      return textMatch && brandMatch && minMatch && maxMatch;
    });
  }, [q, min, max, brand]);

  const clearFilters = () => navigate('/search');

  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Resultados de búsqueda</h1>
            <p className="text-gray-600 mt-1">
              {results.length} {results.length === 1 ? 'resultado' : 'resultados'} para{" "}
              <span className="font-medium text-[#B974F4]">{q || 'todas las búsquedas'}</span>
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button onClick={clearFilters} className="text-sm text-gray-600 hover:text-gray-800">Limpiar filtros</button>
          </div>
        </div>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.length > 0 ? (
            results.map(p => (
              <ProductCard key={p.id} id={p.id} name={p.name} price={p.price} image={p.image} />
            ))
          ) : (
            <div className="col-span-full bg-white rounded-2xl p-8 text-center border border-gray-100 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">No encontramos productos</h2>
              <p className="text-gray-600 mb-4">Prueba con otros términos o ajusta los filtros.</p>
              <button onClick={() => navigate('/')} className="bg-gradient-to-r from-red-500 to-[#B974F4] text-white px-5 py-2 rounded-lg">
                Volver al inicio
              </button>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default SearchResults;
