import React, { useMemo } from 'react';
import ProductCard from '../components/ProductCard';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import BrandCarousel from '../components/BrandCarousel';
import Banner from '../components/Banner';
import Footer from '../components/Footer';

import { phones } from '../data'; // <-- importar


const Home: React.FC = () => {
  const { featured, bestSellers, newArrivals } = useMemo(() => {
    const fallback = phones.slice(0, 4);
    const featuredPhones = phones.filter(phone => phone.isFeatured);
    const bestSellerPhones = phones.filter(phone => phone.bestSeller);
    const newArrivalPhones = phones.filter(phone => phone.newArrival);

    return {
      featured: featuredPhones.length ? featuredPhones : fallback,
      bestSellers: bestSellerPhones.length ? bestSellerPhones : fallback,
      newArrivals: newArrivalPhones.length ? newArrivalPhones : fallback
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <BrandCarousel />
      <Banner />

      {/* Productos destacados */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Productos Destacados</h2>
            <p className="text-xl text-gray-600">Los celulares más populares de nuestra tienda</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featured.map(phone => (
              <ProductCard
                key={`featured-${phone.id}`}
                id={phone.id}
                name={phone.name}
                price={phone.price}
                image={phone.image}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Más vendidos */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Más vendidos</h2>
            <p className="text-xl text-gray-600">Top en reseñas y pedidos durante las últimas semanas</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {bestSellers.map(phone => (
              <ProductCard
                key={`bestseller-${phone.id}`}
                id={phone.id}
                name={phone.name}
                price={phone.price}
                image={phone.image}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Más nuevos */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Más nuevos</h2>
            <p className="text-xl text-gray-600">Lanzamientos recientes listos para llegar a tus manos</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {newArrivals.map(phone => (
              <ProductCard
                key={`new-${phone.id}`}
                id={phone.id}
                name={phone.name}
                price={phone.price}
                image={phone.image}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
