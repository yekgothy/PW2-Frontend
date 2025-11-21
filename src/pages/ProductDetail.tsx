import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import StarIcon from '@mui/icons-material/Star';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';
import { useProducts } from '../context/ProductContext';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getProductById, isLoading } = useProducts();
  const product = useMemo(() => (id ? getProductById(id) : undefined), [getProductById, id]);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const { addItem } = useCart();
  const { requireAuth } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (product?.image) {
      setSelectedImage(product.image);
    }
  }, [product]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto p-8">
          <div className="h-96 bg-gray-100 rounded-2xl animate-pulse" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto p-8">
          <div className="bg-white rounded-2xl shadow-lg p-10 text-center border border-gray-100">
            <h1 className="text-3xl font-bold text-gray-900 mb-3">Producto no encontrado</h1>
            <p className="text-gray-600 mb-6">No encontramos el producto que estás buscando.</p>
            <button
              onClick={() => navigate('/catalog')}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-red-500 to-[#B974F4] text-white px-6 py-3 rounded-xl font-semibold hover:scale-105 transition"
            >
              <span>Volver al catálogo</span>
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Simular más imágenes (pueden ser distintas o la misma por ahora)
  const images = product.image ? Array.from({ length: 4 }, () => product.image) : [];

  const inferredOriginalPrice = product.onSale ? Math.round(product.price * 1.15) : product.price;

  const handleAddToCart = async () => {
    if (!requireAuth()) return;
    await addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: inferredOriginalPrice,
      image: product.image
    });
  };

  const handleBuyNow = async () => {
    if (!requireAuth()) return;
    await addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: inferredOriginalPrice,
      image: product.image
    });
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto p-8 space-y-8">
        {/* Información principal */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row gap-8">
          
          {/* Imagen y slider */}
          <div className="flex-1 p-6 flex flex-col items-center">
            {/* Imagen grande */}
            {selectedImage ? (
              <img src={selectedImage} alt={product.name} className="w-full max-w-md h-auto object-contain rounded-xl shadow-lg" />
            ) : (
              <div className="w-full max-w-md h-[320px] bg-gray-100 rounded-xl" />
            )}

            {/* Carrusel de miniaturas */}
            <div className="flex mt-4 space-x-4 overflow-x-auto py-2">
              {images.map((img, index) => (
                <img 
                  key={index}
                  src={img}
                  alt={`Imagen ${index + 1}`}
                  className={`w-20 h-20 object-contain rounded-lg cursor-pointer border-2 ${selectedImage === img ? 'border-[#B974F4]' : 'border-gray-200'}`}
                  onClick={() => setSelectedImage(img)}
                />
              ))}
            </div>
          </div>

          {/* Información del producto */}
          <div className="flex-1 p-6 space-y-4">
            <h1 className="text-4xl font-bold text-gray-900">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    className={`${i < 4 ? 'text-yellow-400' : 'text-gray-300'}`}
                    fontSize="small"
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">(4.5)</span>
            </div>

            <p className="text-gray-700 text-lg">{product.description}</p>
            <p className="text-3xl font-bold text-[#B974F4]">${product.price.toLocaleString()}</p>

            {/* Botones */}
            <div className="flex flex-col md:flex-row gap-4 mt-4">
              <button
                onClick={() => void handleAddToCart()}
                className="flex-1 bg-gradient-to-r from-red-500 to-[#B974F4] text-white font-bold py-3 px-6 rounded-xl hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center space-x-2"
              >
                <AddShoppingCartIcon fontSize="small" />
                <span>Agregar al carrito</span>
              </button>
              <button
                onClick={() => void handleBuyNow()}
                className="flex-1 border border-[#B974F4] text-[#B974F4] font-bold py-3 px-6 rounded-xl hover:bg-[#B974F4] hover:text-white transition-all"
              >
                Comprar ahora
              </button>
            </div>

            {/* Características rápidas */}
            <div className="flex flex-wrap gap-2 mt-6">
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium">Envío gratis</span>
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">Garantía 1 año</span>
              <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full font-medium">Devolución 30 días</span>
            </div>
          </div>
        </div>

        {/* Descripción extendida */}
        <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Descripción detallada</h2>
          <p className="text-gray-700">
            {product.description} Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vehicula justo quis sapien convallis, at facilisis libero facilisis. Ideal para quienes buscan rendimiento y diseño en un solo dispositivo.
          </p>
        </div>

        {/* Comentarios */}
        <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Comentarios</h2>
          <div className="border-b border-gray-200 pb-4">
            <p className="font-semibold text-gray-800">Juan P.</p>
            <div className="flex items-center space-x-1 text-yellow-400">
              {[...Array(5)].map((_, i) => <StarIcon key={i} fontSize="small" />)}
            </div>
            <p className="text-gray-600 mt-1">Excelente producto, lo recomiendo totalmente.</p>
          </div>
          <div className="border-b border-gray-200 pb-4">
            <p className="font-semibold text-gray-800">Ana M.</p>
            <div className="flex items-center space-x-1 text-yellow-400">
              {[...Array(4)].map((_, i) => <StarIcon key={i} fontSize="small" />)}
            </div>
            <p className="text-gray-600 mt-1">Muy buen rendimiento y diseño atractivo.</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetail;
