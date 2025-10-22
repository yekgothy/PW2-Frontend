import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import { useCart } from '../context/CartContext';
import { phones } from '../data';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { state } = useCart();

  // Search state
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [brand, setBrand] = useState<string>('');
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement | null>(null);

  // derive brands from data
  const brands = Array.from(new Set(phones.map(p => p.name.split(' ')[0]))).filter(Boolean);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // close search on outside click or Esc
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    };
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSearchOpen(false);
    };
    if (searchOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEsc);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, [searchOpen]);

  const submitSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set('q', query.trim());
    if (minPrice) params.set('min', minPrice);
    if (maxPrice) params.set('max', maxPrice);
    if (brand) params.set('brand', brand);
    navigate(`/search?${params.toString()}`);
    setSearchOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-50 bg-white/95 w-full border-b border-gray-100 backdrop-blur-md transition-all duration-300 ${
        isScrolled ? 'shadow-2xl shadow-black/20 border-b-gray-200' : 'shadow-lg'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Sección Superior del Navbar */}
        <div className=" flex items-center justify-between py-4">
          {/* Lado Izquierdo: Menú Hamburguesa */}
          <div className="flex-1 flex justify-start pl-4">
            <button aria-label="Open menu" className="p-3 rounded-full transition-all duration-300 hover:bg-gradient-to-r hover:from-red-500 hover:to-[#B974F4] hover:text-white transform hover:scale-110 hover:shadow-lg">
              <MenuIcon fontSize="medium" sx={{ color: '#000000' }} />
            </button>
          </div>

          {/* Centro: Logo */}
          <div className="flex-1 flex justify-center">
            <Link to="/" className="flex flex-col items-center gap-1 select-none">
              <img src="/logoName.svg" alt="Logo" className="h-14 w-auto" />
            </Link>
          </div>

          {/* Lado Derecho: Íconos de Usuario, Carrito y Búsqueda */}
          <div className="flex flex-1 items-center justify-end space-x-4 pr-4 relative">
            <Link to="/login" aria-label="User account" className="p-3 rounded-full transition-all duration-300 hover:bg-gradient-to-r hover:from-[#B974F4] hover:to-red-500 hover:text-white transform hover:scale-110 hover:shadow-lg">
              <PersonOutlineIcon fontSize="medium" sx={{ color: '#000000' }} />
            </Link>
            <Link to="/cart" aria-label="Shopping cart" className="relative p-3 rounded-full transition-all duration-300 hover:bg-gradient-to-r hover:from-red-500 hover:to-[#B974F4] hover:text-white transform hover:scale-110 hover:shadow-lg">
              <ShoppingCartIcon fontSize="medium" sx={{ color: '#000000' }} />
              {state.itemCount > 0 && (
                <span
                  className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-red-500 to-[#B974F4] text-xs font-bold text-white border-2 border-white shadow-md"
                >
                  {state.itemCount}
                </span>
              )}
            </Link>

            {/* Search toggle */}
            <button
              aria-label="Search"
              onClick={() => setSearchOpen(v => !v)}
              className="p-3 rounded-full transition-all duration-300 hover:bg-gradient-to-r hover:from-[#B974F4] hover:to-red-500 hover:text-white transform hover:scale-110 hover:shadow-lg"
            >
              <SearchIcon fontSize="medium" sx={{ color: '#000000' }} />
            </button>

            {/* Search Panel */}
            {searchOpen && (
              <div ref={searchRef} className="absolute right-4 top-full mt-3 w-[360px] bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 z-50">
                <form onSubmit={(e) => submitSearch(e)} className="space-y-3">
                  <div>
                    <label className="sr-only">Buscar</label>
                    <input
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-[#B974F4]"
                      placeholder="Buscar por modelo, marca o palabra clave..."
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      autoFocus
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      min={0}
                      placeholder="Precio mínimo"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                      className="px-3 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-[#B974F4]"
                    />
                    <input
                      type="number"
                      min={0}
                      placeholder="Precio máximo"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                      className="px-3 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-[#B974F4]"
                    />
                  </div>

                  <div>
                    <select
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-[#B974F4]"
                    >
                      <option value="">Todas las marcas</option>
                      {brands.map((b) => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>

                  <div className="flex items-center justify-between">
                    <button type="submit" className="inline-flex items-center space-x-2 bg-gradient-to-r from-red-500 to-[#B974F4] text-white px-4 py-2 rounded-lg font-semibold">
                      Buscar
                    </button>
                    <button
                      type="button"
                      onClick={() => { setQuery(''); setMinPrice(''); setMaxPrice(''); setBrand(''); }}
                      className="text-sm text-gray-600 hover:text-gray-800"
                    >
                      Limpiar
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>

        {/* Sección Inferior: Enlaces de Navegación */}
        <div className="flex justify-center items-center space-x-10 py-4">
          <Link to="/" className="text-sm font-semibold text-gray-700 hover:text-red-500 transition-colors duration-300 hover:scale-105 transform px-3 py-2">Inicio</Link>
          <a href="#" className="text-sm font-semibold text-gray-700 hover:text-[#B974F4] transition-colors duration-300 hover:scale-105 transform px-3 py-2">Celulares</a>
          <a href="#" className="text-sm font-semibold text-gray-700 hover:text-red-500 transition-colors duration-300 hover:scale-105 transform px-3 py-2">Accesorios</a>
          <a href="#" className="text-sm font-semibold text-red-500 hover:text-[#B974F4] transition-colors duration-300 hover:scale-105 transform px-3 py-2">Ofertas</a>
          <a href="#" className="text-sm font-semibold text-gray-700 hover:text-[#B974F4] transition-colors duration-300 hover:scale-105 transform px-3 py-2">Servicios</a>
          <Link to="/contact" className="text-sm font-semibold text-gray-700 hover:text-red-500 transition-colors duration-300 hover:scale-105 transform px-3 py-2">Contacto</Link>
          <Link to="/profile" className="text-sm font-semibold text-gray-700 hover:text-red-500 transition-colors duration-300 hover:scale-105 transform px-3 py-2">Perfil</Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;