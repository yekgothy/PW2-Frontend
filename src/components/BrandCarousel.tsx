import React from 'react';

// Logos de marcas con placeholders temporales
const brands = [
  { name: 'Apple', logo: 'apple.svg' },
  { name: 'Samsung', logo: 'samsung.svg' },
  { name: 'Xiaomi', logo: 'xiaomi.svg' },
  { name: 'Huawei', logo: 'huawei.svg' },
  { name: 'OnePlus', logo: 'oneplus.svg' },
  { name: 'Google', logo: 'google.svg' },
  { name: 'Sony', logo: 'sony.svg' },
  { name: 'Motorola', logo: 'motorola.svg' },
  { name: 'Nokia', logo: 'nokia.svg' },
  { name: 'Oppo', logo: 'oppo.svg' },
];

const BrandCarousel: React.FC = () => {

  return (
    <section className="bg-white py-8 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Título de la sección */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Marcas de Confianza
          </h2>
          <p className="text-gray-600">
            Trabajamos con las mejores marcas del mercado
          </p>
        </div>

        {/* Contenedor del carrusel */}
        <div className="relative">
          {/* Gradientes en los bordes para efecto de desvanecimiento */}
          <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
          
          {/* Carrusel infinito */}
          <div className="flex overflow-hidden">
            <div 
              className="flex"
              style={{
                animation: 'scroll 20s linear infinite',
                minWidth: 'max-content'
              }}
            >
              {/* Primera ronda de logos */}
              {brands.concat(brands).map((brand, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 mx-6 flex items-center justify-center bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-300 hover:scale-105"
                  style={{ minWidth: '140px', height: '80px' }}
                >
                  <div className="text-center">
                    <div className="text-2xl mb-1">
                      📱
                    </div>
                    <div className="text-sm font-semibold text-gray-700">
                      {brand.name}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* CSS inline para la animación */}
          <style dangerouslySetInnerHTML={{
            __html: `
              @keyframes scroll {
                0% {
                  transform: translateX(0);
                }
                100% {
                  transform: translateX(-50%);
                }
              }
            `
          }} />
        </div>
      </div>


    </section>
  );
};

export default BrandCarousel;
