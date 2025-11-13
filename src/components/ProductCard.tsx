import React, { useState } from 'react';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import StarIcon from '@mui/icons-material/Star';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { useCart } from '../context/CartContext';
import { Link } from "react-router-dom";

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  image: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, name, price, image }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const { addItem } = useCart();

  // Generar descuento y precio original aleatorio para demo
  const discount = Math.floor(Math.random() * 30) + 10; // 10-40% descuento
  const originalPrice = Math.floor(price * (1 + discount / 100));
  const rating = (4.2 + Math.random() * 0.7).toFixed(1); // Rating entre 4.2-4.9

  const handleAddToCart = () => {
    addItem({
      id,
      name,
      price,
      originalPrice,
      image
    });
  };

  return (
    <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-gray-100">

      {/* Badge de descuento */}
      <div className="absolute top-4 left-4 z-10">
        <div className="bg-gradient-to-r from-red-500 to-[#B974F4] text-white px-3 py-1 rounded-full text-sm font-bold flex items-center space-x-1">
          <LocalOfferIcon fontSize="small" />
          <span>-{discount}%</span>
        </div>
      </div>

      {/* Botón de favorito */}
      <button
        onClick={() => setIsFavorite(!isFavorite)}
        className="absolute top-4 right-4 z-10 p-2 bg-white/90 hover:bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-110"
      >
        {isFavorite ? (
          <FavoriteIcon className="text-red-500" fontSize="small" />
        ) : (
          <FavoriteBorderIcon className="text-gray-400 hover:text-red-500" fontSize="small" />
        )}
      </button>

      {/* Imagen del producto */}
      <div className="relative p-6 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="aspect-square flex items-center justify-center">
          <img
            src={image}
            alt={name}
            className="w-36 h-36 object-contain group-hover:scale-110 transition-transform duration-500 drop-shadow-lg"
          />
        </div>

        {/* Brillo decorativo */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>

      {/* Información del producto */}
      <div className="p-6 space-y-4">

        {/* Rating */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <StarIcon
                key={i}
                className={`${i < Math.floor(parseFloat(rating)) ? 'text-yellow-400' : 'text-gray-300'}`}
                fontSize="small"
              />
            ))}
          </div>
          <span className="text-sm text-gray-600">({rating})</span>
        </div>

        {/* Nombre del producto */}
        <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#B974F4] transition-colors duration-300 line-clamp-2">
          {name}
        </h3>

        {/* Precios */}
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-red-500 to-[#B974F4] bg-clip-text text-transparent">
              ${price.toLocaleString()}
            </span>
            <span className="text-lg text-gray-500 line-through">
              ${originalPrice.toLocaleString()}
            </span>
          </div>
          <p className="text-sm text-green-600 font-semibold">
            Ahorras ${(originalPrice - price).toLocaleString()}
          </p>
        </div>

        {/* Características rápidas */}
        <div className="flex flex-wrap gap-2">
          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium">
            Envío gratis
          </span>
          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">
            Garantía 1 año
          </span>
        </div>

        {/* Botón de compra */}
        <button
          onClick={handleAddToCart}
          className="w-full bg-gradient-to-r from-red-500 to-[#B974F4] text-white font-bold py-3 px-6 rounded-xl hover:shadow-xl hover:shadow-red-500/25 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 group"
        >
          <AddShoppingCartIcon className="group-hover:animate-bounce" fontSize="small" />
          <span>Agregar al carrito</span>
        </button>

        {/* Opciones adicionales */}
        <div className="flex justify-between text-sm">
          <Link
            to={`/product/${id.toString()}`}
            className="text-[#B974F4] hover:text-red-500 font-semibold transition-colors duration-300"
          >
            Ver detalles
          </Link>
          <button className="text-gray-600 hover:text-[#B974F4] font-semibold transition-colors duration-300">
            Comparar
          </button>
        </div>

      </div> {/* <-- cierra p-6 space-y-4 */}

      {/* Efecto de brillo en hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-all duration-1000"></div>

    </div> // <-- cierra div principal del card
  );
};

export default ProductCard;
