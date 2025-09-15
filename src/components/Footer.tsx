import React from 'react';
import { Link } from 'react-router-dom';

// Iconos de Material UI
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import SecurityIcon from '@mui/icons-material/Security';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PaymentIcon from '@mui/icons-material/Payment';

// --- Datos organizados para mantenibilidad ---
const quickLinks = [
  { name: 'Inicio', href: '/' },
  { name: 'Celulares', href: '#' },
  { name: 'Accesorios', href: '#' },
  { name: 'Ofertas', href: '#' },
  { name: 'Servicios', href: '#' },
  { name: 'Contacto', href: '/contact' }
];

const categories = [
  { name: 'iPhone', href: '#' },
  { name: 'Samsung Galaxy', href: '#' },
  { name: 'Xiaomi', href: '#' },
  { name: 'Huawei', href: '#' },
  { name: 'OnePlus', href: '#' },
  { name: 'Google Pixel', href: '#' }
];

const support = [
  { name: 'Centro de Ayuda', href: '#' },
  { name: 'Garantías', href: '#' },
  { name: 'Devoluciones', href: '#' },
  { name: 'Envíos', href: '#' },
  { name: 'Términos y Condiciones', href: '#' },
  { name: 'Política de Privacidad', href: '#' }
];

const socialLinks = [
  { name: 'Facebook', icon: FacebookIcon, href: '#', color: 'hover:text-blue-500' },
  { name: 'Instagram', icon: InstagramIcon, href: '#', color: 'hover:text-pink-500' },
  { name: 'Twitter', icon: TwitterIcon, href: '#', color: 'hover:text-blue-400' },
  { name: 'WhatsApp', icon: WhatsAppIcon, href: '#', color: 'hover:text-green-500' }
];

// Métodos de pago (usando placeholders temporales)
const paymentMethods = [
  { 
    name: 'Visa',
    logo: 'visa.svg',  // ← Tu logo real aquí
    alt: 'Visa'
  },
  { 
    name: 'Mastercard',
    logo: 'mastercard.svg',  // ← Tu logo real aquí
    alt: 'Mastercard'
  },
  { 
    name: 'PayPal',
    logo: 'paypal.svg',  // ← Tu logo real aquí
    alt: 'PayPal'
  },
  { 
    name: 'Apple Pay',
    logo: 'applepay.svg',  // ← Tu logo real aquí
    alt: 'Apple Pay'
  }
];

const features = [
  { icon: SecurityIcon, text: 'Compra 100% Segura' },
  { icon: LocalShippingIcon, text: 'Envío Gratis' },
  { icon: SupportAgentIcon, text: 'Soporte 24/7' },
  { icon: CreditCardIcon, text: 'Pagos Flexibles' }
];

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden">
      {/* Fondo decorativo */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-[#B974F4]/5"></div>
      
      {/* Elementos decorativos */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-r from-red-500/10 to-[#B974F4]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-24 h-24 bg-gradient-to-r from-[#B974F4]/10 to-red-500/10 rounded-full blur-2xl"></div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Sección de características destacadas */}
        <div className="border-b border-white/10 py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-3 group">
                <div className="p-3 bg-gradient-to-r from-red-500/20 to-[#B974F4]/20 rounded-lg group-hover:from-red-500/30 group-hover:to-[#B974F4]/30 transition-all duration-300">
                  <feature.icon className="text-white" fontSize="medium" />
                </div>
                <span className="font-semibold text-gray-300 group-hover:text-white transition-colors duration-300">
                  {feature.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Sección principal del footer */}
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            
            {/* Información de la empresa */}
            <div className="lg:col-span-1 space-y-6">
              <div className="flex items-center space-x-2">
                <img 
                  src="/logoNameW.svg" 
                  alt="Connectel Logo" 
                  className="h-12 w-auto hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              <p className="text-gray-400 leading-relaxed">
                Tu tienda de confianza en Monterrey para celulares y accesorios. 
                Ofrecemos la mejor tecnología con garantía oficial y 
                precios competitivos en todo Nuevo León.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors duration-300">
                  <PhoneIcon fontSize="small" />
                  <span>+52 (81) 8347-5629</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors duration-300">
                  <EmailIcon fontSize="small" />
                  <span>contacto@connectel.com</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors duration-300">
                  <LocationOnIcon fontSize="small" />
                  <span>Monterrey, Nuevo León</span>
                </div>
              </div>
            </div>

            {/* Enlaces rápidos */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white">Enlaces Rápidos</h3>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <Link 
                      to={link.href}
                      className="text-gray-400 hover:text-[#B974F4] transition-colors duration-300 hover:translate-x-1 transform inline-block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Categorías */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white">Marcas Populares</h3>
              <ul className="space-y-3">
                {categories.map((category, index) => (
                  <li key={index}>
                    <Link 
                      to={category.href}
                      className="text-gray-400 hover:text-red-500 transition-colors duration-300 hover:translate-x-1 transform inline-block"
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Soporte */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white">Soporte</h3>
              <ul className="space-y-3">
                {support.map((item, index) => (
                  <li key={index}>
                    <Link 
                      to={item.href}
                      className="text-gray-400 hover:text-white transition-colors duration-300 hover:translate-x-1 transform inline-block"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        

        {/* Métodos de pago */}
        <div className="border-t border-white/10 py-6">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            
            {/* Métodos de pago */}
            <div className="flex items-center space-x-4">
              <span className="text-gray-400 font-medium">Métodos de pago:</span>
              <div className="flex space-x-3">
                {paymentMethods.map((method, index) => (
                  <div
                    key={index}
                    className="bg-white/10 hover:bg-white/20 rounded-lg p-2 transition-all duration-300 transform hover:scale-105"
                  >
                    <img
                      src={method.logo}
                      alt={method.alt}
                      className="h-6 w-auto object-contain"
                      onError={(e) => {
                        // Fallback si no encuentra la imagen
                        const target = e.target as HTMLImageElement;
                        target.src = `https://via.placeholder.com/60x30/374151/ffffff?text=${method.name}`;
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Iconos de seguridad */}
            <div className="flex items-center space-x-3 text-gray-400">
              <PaymentIcon fontSize="small" />
              <span className="text-sm">Pagos 100% seguros</span>
            </div>
          </div>
        </div>

        {/* Redes sociales y copyright */}
        <div className="border-t border-white/10 py-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
            
            {/* Redes sociales */}
            <div className="flex items-center space-x-6">
              <span className="text-gray-400 font-medium">Síguenos:</span>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.name}
                    className={`p-3 bg-white/5 hover:bg-white/10 rounded-full transition-all duration-300 transform hover:scale-110 ${social.color}`}
                  >
                    <social.icon fontSize="medium" />
                  </a>
                ))}
              </div>
            </div>

            {/* Copyright */}
            <div className="flex items-center space-x-2 text-gray-400">
              <span>© {currentYear} Connectel. Hecho con</span>
              <FavoriteIcon className="text-red-500 animate-pulse" fontSize="small" />
              <span>en Monterrey, México</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
