import React from 'react';
import { ArrowForward } from '@mui/icons-material';

const Banner: React.FC = () => {
  return (
    <section className="bg-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl shadow-lg">
          {/* Imagen de fondo del banner */}
          <div className="relative h-32 sm:h-40 md:h-48">
            <img
              src="/bannerS1.png"
              alt="Oferta especial"
              className="w-full h-full object-cover"
            />
            
            {/* Overlay con gradiente para mejor legibilidad */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>
            
            {/* Contenido del banner */}
            <div className="absolute inset-0 flex items-center">
              <div className="px-6 sm:px-8 md:px-12">
                <div className="max-w-md">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
                    ¡Ofertas Increíbles!
                  </h3>
                  <p className="text-sm sm:text-base text-gray-200 mb-4">
                    Descuentos de hasta 40% en celulares seleccionados
                  </p>
                  <button className="inline-flex items-center bg-gradient-to-r from-red-500 to-[#B974F4] text-white px-4 py-2 sm:px-6 sm:py-3 rounded-xl font-semibold hover:scale-105 transition-all duration-300 shadow-lg text-sm sm:text-base">
                    <span>Ver Ofertas</span>
                    <ArrowForward className="ml-2" fontSize="small" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
