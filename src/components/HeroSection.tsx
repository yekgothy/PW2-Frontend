import React from 'react';
// Iconos actualizados para mayor claridad
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import StarIcon from '@mui/icons-material/Star';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'; // Icono mejorado
import { Link } from 'react-router-dom';


// --- Datos definidos fuera del componente para mantenibilidad ---
const features = [
  { text: 'Envío gratis a todo México' },
  { text: 'Garantía oficial de 1 año' },
  { text: 'Hasta 12 meses sin intereses' },
];

const stats = [
  { value: '500+', label: 'Modelos Disponibles', color: 'text-[#B974F4]' },
  { value: '98%', label: 'Clientes Satisfechos', color: 'text-red-500' },
  { 
    valueComponent: (
      <div className="flex items-center justify-center space-x-1 text-yellow-400">
        <StarIcon fontSize="small" />
        <span className="text-3xl font-bold text-white">4.9</span>
      </div>
    ),
    label: 'Calificación Promedio' 
  },
];

const HeroSection: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden">
      {/* Fondo decorativo */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-[#B974F4]/10"></div>
      
      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 py-20 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Contenido Principal */}
          <div className="space-y-8">
            <div className="space-y-4">
              
              
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Los mejores{' '}
                <span className="bg-gradient-to-r from-red-500 to-[#B974F4] bg-clip-text text-transparent">
                  celulares
                </span>
                {' '}al mejor precio
              </h1>
              
              <p className="text-xl text-gray-300 leading-relaxed max-w-lg">
                Descubre la última tecnología en smartphones. Encuentra tu dispositivo perfecto con garantía, 
                envío gratis y los mejores precios del mercado.
              </p>
            </div>

            {/* Refactorización: Mapeo de un array para mantenibilidad */}
            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-x-6 gap-y-3 text-base">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <CheckCircleOutlineIcon className="text-green-400" fontSize="small" />
                  <span>{feature.text}</span>
                </div>
              ))}
            </div>

            {/* Botones de acción (Sin cambios, ya están muy bien) */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/catalog">
              <button className="group bg-gradient-to-r from-red-500 to-[#B974F4] text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:shadow-xl hover:shadow-red-500/25 transform hover:scale-105 flex items-center justify-center space-x-2">
                <span>Ver catálogo</span>
                <ArrowForwardIcon className="group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              </Link>
              
              <button className="group border-2 border-white/20 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:bg-white/10 hover:border-white/40 flex items-center justify-center space-x-2">
                <LocalOfferIcon />
                <span>Ver ofertas</span>
              </button>
            </div>

            {/* Refactorización: Mapeo de un array para las estadísticas */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  {stat.valueComponent ? stat.valueComponent : (
                    <div className={`text-3xl font-bold ${stat.color}`}>{stat.value}</div>
                  )}
                  <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Imagen/Visual */}
          <div className="relative">
            <div className="relative z-10">
              {/* Imagen principal del hero */}
              <img 
                src="/imgHero.svg" 
                alt="Últimos modelos de smartphones disponibles en Connectel" 
                className="w-full h-auto max-w-7xl mx-auto drop-shadow-2xl transform hover:scale-105 transition-transform duration-500"
              />
            </div>
            
            {/* Elementos decorativos */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-red-500 to-[#B974F4] rounded-full opacity-20 blur-xl"></div>
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-to-r from-[#B974F4] to-red-500 rounded-full opacity-15 blur-2xl"></div>
          </div>
        </div>
      </div>

      {/* --- SUGERENCIA: Reemplazar este div con un SVG para una transición más limpia --- */}
      {/* <div className="absolute bottom-0 left-0 right-0"> <WaveSVGComponent /> </div> */}
    </section>
  );
};

export default HeroSection;