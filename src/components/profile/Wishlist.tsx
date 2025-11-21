import React, { useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useUser } from '../../context/UserContext';
import { phones } from '../../data';

const Wishlist: React.FC = () => {
  const { user, addToWishlist, removeFromWishlist } = useUser();
  const [addId, setAddId] = useState<string>('');

  const available = phones.filter((p) => !user.wishlist.includes(String(p.id)));
  const wishlistPhones = phones.filter((p) => user.wishlist.includes(String(p.id)));

  const handleAdd = () => {
    if (addId) {
  addToWishlist(addId);
      setAddId('');
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="p-6 flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-900 flex items-center space-x-2">
          <FavoriteIcon className="text-red-500" />
          <span>Mi Wishlist</span>
        </h3>
        <div className="flex items-center space-x-2">
          <select
            value={addId}
            onChange={e => setAddId(e.target.value)}
            className="text-sm px-2 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-[#B974F4]"
          >
            <option value="">Agregar producto...</option>
            {available.map((p) => (
              <option key={p.id} value={String(p.id)}>{p.name}</option>
            ))}
          </select>
          <button
            onClick={handleAdd}
            disabled={!addId}
            className="inline-flex items-center space-x-1 text-sm bg-gradient-to-r from-red-500 to-[#B974F4] disabled:opacity-40 disabled:cursor-not-allowed text-white px-3 py-2 rounded-lg hover:shadow-md transition"
          >
            <AddIcon fontSize="small" />
            <span>Agregar</span>
          </button>
        </div>
      </div>
      <div className="p-6 space-y-4">
        {wishlistPhones.length === 0 && (
          <p className="text-sm text-gray-500">Tu wishlist está vacía. Agrega productos para verlos aquí.</p>
        )}
        <div className="grid sm:grid-cols-2 gap-4">
          {wishlistPhones.map(p => (
            <div key={p.id} className="group relative flex items-center space-x-4 bg-gray-50 rounded-xl p-4 border border-gray-100 hover:bg-gray-100 transition">
              <img src={p.image} alt={p.name} className="h-16 w-16 object-contain" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 truncate group-hover:text-[#B974F4] transition">{p.name}</p>
                <p className="text-xs text-gray-500">${p.price.toLocaleString()}</p>
              </div>
              <button
                onClick={() => removeFromWishlist(String(p.id))}
                className="p-2 rounded-lg hover:bg-white hover:shadow-md transition"
                title="Eliminar"
              >
                <DeleteIcon fontSize="small" className="text-gray-400 hover:text-red-500" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
