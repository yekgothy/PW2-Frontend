import React from 'react';
import ProductCard from '../components/ProductCard';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import BrandCarousel from '../components/BrandCarousel';
import Banner from '../components/Banner';
import Footer from '../components/Footer';

import { phones } from '../data'; // <-- importar



const Home: React.FC = () => (
  <div className="min-h-screen">
    <Navbar />
    <HeroSection />
    <BrandCarousel />
    <Banner />
    
    {/* Sección de productos destacados */}
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Productos Destacados</h2>
          <p className="text-xl text-gray-600">Los celulares más populares de nuestra tienda</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {phones.map(phone => (
            <ProductCard key={phone.id} {...phone} />
          ))}
        </div>
      </div>
    </section>
    
    <Footer />
  </div>
);

export default Home;
