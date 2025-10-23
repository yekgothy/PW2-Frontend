import React, { useEffect, useMemo, useState } from 'react';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { phones } from '../data';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import StarIcon from '@mui/icons-material/Star';
import { Link } from 'react-router-dom';

const OfferCardHighlight: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br from-[#111827] via-[#1f2937] to-[#111827] text-white shadow-2xl border border-white/10">
    <div className="absolute inset-0 pointer-events-none opacity-20 blur-3xl bg-gradient-to-br from-red-500 to-[#B974F4] mix-blend-screen animate-tilt"></div>
    {children}
  </div>
);

const Offers: React.FC = () => {
  // Deal of the day = random product (stable per mount)
  const [deal] = useState(() => phones[Math.floor(Math.random() * phones.length)]);
  // Countdown to next midnight (local) for urgency effect
  const target = useMemo(() => {
    const t = new Date();
    t.setDate(t.getDate() + 1);
    t.setHours(0, 0, 0, 0);
    return t.getTime();
  }, []);
  const [remaining, setRemaining] = useState<number>(Math.max(0, target - Date.now()));

  useEffect(() => {
    const id = setInterval(() => {
      setRemaining(Math.max(0, target - Date.now()));
    }, 1000);
    return () => clearInterval(id);
  }, [target]);

  const formatTime = (ms: number) => {
    const s = Math.floor(ms / 1000);
    const h = Math.floor(s / 3600).toString().padStart(2, '0');
    const m = Math.floor((s % 3600) / 60).toString().padStart(2, '0');
    const sec = Math.floor(s % 60).toString().padStart(2, '0');
    return `${h}:${m}:${sec}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero intenso */}
      <header className="relative overflow-hidden py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center gap-8">
          <div className="lg:w-1/2 space-y-6">
            <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-red-500 to-[#B974F4] text-white px-4 py-1 rounded-full shadow-lg transform -rotate-1">
              <LocalOfferIcon />
              <span className="font-semibold">SUPER OFERTAS</span>
            </div>

            <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight text-gray-900">
              Ofertas explosivas en celulares <span className="text-red-500">hasta -40%</span>
            </h1>

            <p className="text-gray-700 max-w-xl">
              Seleccionamos las mejores promociones del día con envíos rápidos, garantía oficial y rebajas por tiempo limitado.
              Aprovecha los descuentos y novedades antes de que se terminen.
            </p>

           <div className="flex items-center gap-4">
  {/* Ver todo el catálogo */}
  <Link
    to="/catalog"
  className="hidden sm:inline-flex items-center bg-gradient-to-r from-red-500 to-[#B974F4] !text-white !no-underline px-4 py-2 rounded-lg font-semibold hover:scale-105 transform transition"
  >
    Ver todo el catálogo
  </Link>

  {/* Categorías populares */}
  <Link
    to="/offers"
    className="inline-flex items-center !no-underline !text-gray-700 px-4 py-3 rounded-xl border border-gray-200 hover:shadow transition transform hover:scale-105"
  >
    Categorías populares
  </Link>
</div>


            <div className="mt-4 flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <WhatshotIcon className="text-red-500" />
                <span className="font-medium text-gray-700">Ofertas rotativas</span>
              </div>
              <div className="flex items-center space-x-2">
                <StarIcon className="text-yellow-400" />
                <span className="font-medium text-gray-700">Top valoradas</span>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2">
            <OfferCardHighlight>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Animated floating accents */}
                <div className="relative flex flex-col items-start justify-center p-4">
                  <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-gradient-to-r from-red-500 to-[#B974F4] opacity-30 blur-2xl animate-blob"></div>
                  <div className="text-sm text-white/80">Deal of the Day</div>
                  <h2 className="text-2xl font-bold mt-2">{deal.name}</h2>
                  <p className="text-white/80 mt-2 line-clamp-3">{deal.description}</p>
                  <div className="mt-4 flex items-center gap-3">
                    <div className="text-3xl font-extrabold text-white">${deal.price.toLocaleString()}</div>
                    <div className="px-3 py-1 rounded-full bg-white/10 text-sm text-white">-{Math.floor(10 + Math.random()*30)}%</div>
                  </div>

                  <div className="mt-4 flex items-center space-x-3">
                    <button className="bg-gradient-to-r from-red-500 to-[#B974F4] text-white px-4 py-2 rounded-lg font-semibold hover:scale-105 transform transition">Comprar ahora</button>
                    <button className="text-white/90 px-3 py-2 rounded-lg border border-white/10 hover:bg-white/5 transition">Ver detalle</button>
                  </div>

                  <div className="mt-4 text-sm text-white/90">
                    <span>Tiempo restante: </span>
                    <span className="font-mono font-semibold">{formatTime(remaining)}</span>
                  </div>
                </div>

                <div className="p-4 flex items-center justify-center">
                  <img src={deal.image} alt={deal.name} className="w-48 h-48 object-contain transform hover:scale-105 transition-transform duration-500" />
                </div>
              </div>
            </OfferCardHighlight>
          </div>
        </div>

        {/* Hot badges — centrados y animados */}
        <div className="mt-8">
          <div className="flex justify-center">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="px-6 py-3 rounded-full bg-red-50 text-red-600 font-semibold shadow-lg transform animate-bounce hover:scale-105 transition">
                <span className="mr-2 text-lg">🔥</span>
                <span className="text-sm">Envío gratis en compras mayores a $10,000</span>
              </div>

<div className="px-6 py-3 rounded-full bg-gradient-to-r from-[#B974F4]/10 to-[#7E22CE]/10 text-[#7E22CE] font-semibold shadow-lg animate-pulse hover:scale-105 hover:shadow-[#B974F4]/40 transition relative overflow-hidden">
  <span className="mr-2 text-lg text-[#7E22CE]">⚡</span>
  <span className="text-sm font-medium tracking-tight shimmer text-[#7E22CE] !text-[#7E22CE]">
    Descuentos exclusivos por tiempo limitado
  </span>
</div>


              <div className="px-6 py-3 rounded-full bg-green-50 text-green-700 font-semibold shadow-lg animate-pop hover:scale-105 transition">
                <span className="mr-2 text-lg">🎁</span>
                <span className="text-sm">Regalo sorpresa en pedidos seleccionados</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Ofertas grid */}
      <main className="max-w-7xl mx-auto px-6 lg:px-12 pb-20">
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <h3 className="text-2xl font-bold text-gray-900">Ofertas destacadas</h3>
          <div className="w-full md:w-auto">

          </div>
        </div>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {phones.map((p, idx) => (
            <div key={p.id} className="relative group">
              {/* Animated offer badge */}
              <div className="absolute -top-3 -left-3 z-10">
                <div className={`px-3 py-1 rounded-full text-xs font-bold text-white ${idx % 2 === 0 ? 'bg-red-500' : 'bg-[#B974F4]'} shadow-lg transform rotate-3`}>Oferta</div>
              </div>

              <div className="rounded-2xl overflow-hidden transform transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-2xl">
                <div className="relative bg-gradient-to-b from-white to-gray-50 p-4">
                  {/* animated glow ring */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-red-300 to-[#B974F4] opacity-0 group-hover:opacity-50 blur-2xl transition-opacity duration-500 pointer-events-none"></div>

                  <ProductCard id={p.id} name={p.name} price={p.price} image={p.image} />

                  {/* flash stripe on hover */}
                  <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="w-full h-6 bg-gradient-to-r from-white/10 via-white/30 to-white/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-0 transition-all duration-900"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* CTA bottom */}
        <div className="mt-12 bg-gradient-to-br from-[#fff] to-[#fff] rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-gray-100 shadow-lg">
          <div>
            <h4 className="text-lg font-bold text-gray-900">¿Listo para ahorrar?</h4>
            <p className="text-gray-600">Suscríbete para recibir notificaciones de nuevas ofertas y cupones exclusivos.</p>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <input placeholder="Tu correo" className="flex-1 md:flex-none px-4 py-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-[#B974F4]" />
            <button className="bg-gradient-to-r from-red-500 to-[#B974F4] text-white px-5 py-3 rounded-lg font-semibold">Suscribirme</button>
          </div>
        </div>
      </main>

      <Footer />

      {/* Animations CSS */}
      <style dangerouslySetInnerHTML={{ __html: `
        /* existing animations */
        @keyframes marquee { 0% { transform: translateX(0%); } 100% { transform: translateX(-50%); } }
        .animate-marquee { display: inline-block; animation: marquee 20s linear infinite; }
        @keyframes blob { 0% { transform: translateY(0px) scale(1); } 50% { transform: translateY(-8px) scale(1.05); } 100% { transform: translateY(0px) scale(1); } }
        .animate-blob { animation: blob 6s ease-in-out infinite; }
        @keyframes tilt { 0% { transform: rotate(-2deg); } 50% { transform: rotate(2deg); } 100% { transform: rotate(-2deg); } }
        .animate-tilt { animation: tilt 8s ease-in-out infinite; }

        /* new text/element animations */
        @keyframes pop { 0% { transform: scale(0.98); opacity: 0.9 } 50% { transform: scale(1.03); opacity: 1 } 100% { transform: scale(0.98); opacity: 0.95 } }
        .animate-pop { animation: pop 3s ease-in-out infinite; }

        @keyframes glow {
          0% { text-shadow: 0 0 0px rgba(185,116,244,0.0); }
          50% { text-shadow: 0 0 12px rgba(185,116,244,0.5); }
          100% { text-shadow: 0 0 0px rgba(185,116,244,0.0); }
        }
        .animate-glow { animation: glow 2.8s ease-in-out infinite; }

        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .shimmer {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent);
          background-size: 200% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: shimmer 2.4s linear infinite;
        }

        @keyframes pulse-slow { 0% { transform: translateY(0);} 50% { transform: translateY(-4px);} 100% { transform: translateY(0);} }
        .animate-pulse { animation: pulse-slow 3s ease-in-out infinite; }
      ` }} />
    </div>
  );
};

export default Offers;
