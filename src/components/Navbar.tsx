import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import MenuIcon from '@mui/icons-material/Menu';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import { useCart } from '../context/CartContext';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { state } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`sticky top-0 z-50 bg-white/95 w-full border-b border-gray-100 backdrop-blur-md transition-all duration-300 ${
        isScrolled 
          ? 'shadow-2xl shadow-black/20 border-b-gray-200' 
          : 'shadow-lg'
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
          <div className="flex flex-1 items-center justify-end space-x-4 pr-4">
            <Link to="/login" aria-label="User account" className="p-3 rounded-full transition-all duration-300 hover:bg-gradient-to-r hover:from-[#B974F4] hover:to-red-500 hover:text-white transform hover:scale-110 hover:shadow-lg">
              <PersonOutlineIcon fontSize="medium" sx={{ color: '#000000' }} />
            </Link>
            <Link to="/cart" aria-label="Shopping cart" className="relative p-3 rounded-full transition-all duration-300 hover:bg-gradient-to-r hover:from-red-500 hover:to-[#B974F4] hover:text-white transform hover:scale-110 hover:shadow-lg">
              <ShoppingCartIcon fontSize="medium" sx={{ color: '#000000' }} />
              {/* Notificación en el carrito */}
              {state.itemCount > 0 && (
                <span 
                  className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-red-500 to-[#B974F4] text-xs font-bold text-white border-2 border-white shadow-md"
                >
                  {state.itemCount}
                </span>
              )}
            </Link>
            <button aria-label="Search" className="p-3 rounded-full transition-all duration-300 hover:bg-gradient-to-r hover:from-[#B974F4] hover:to-red-500 hover:text-white transform hover:scale-110 hover:shadow-lg">
              <SearchIcon fontSize="medium" sx={{ color: '#000000' }} />
            </button>
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