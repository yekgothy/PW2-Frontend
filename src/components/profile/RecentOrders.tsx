import React from 'react';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import AddIcon from '@mui/icons-material/Add';
import { useUser } from '../../context/UserContext';

const RecentOrders: React.FC = () => {
  const { user, createMockOrder } = useUser();

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="p-6 flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-900 flex items-center space-x-2">
          <ShoppingBagIcon className="text-[#B974F4]" />
          <span>Órdenes Recientes</span>
        </h3>
        <button
          onClick={createMockOrder}
          className="inline-flex items-center space-x-1 text-sm bg-gradient-to-r from-red-500 to-[#B974F4] text-white px-3 py-2 rounded-lg hover:shadow-md transition"
        >
          <AddIcon fontSize="small" />
          <span>Agregar demo</span>
        </button>
      </div>
      <div className="divide-y divide-gray-100">
        {user.orders.length === 0 && (
          <div className="p-6 text-sm text-gray-500 flex items-center space-x-2">
            <ReceiptLongIcon fontSize="small" className="text-gray-400" />
            <span>No tienes órdenes aún. ¡Haz una compra para verlas aquí!</span>
          </div>
        )}
        {user.orders.slice(0, 5).map(order => (
          <div key={order.id} className="p-6 hover:bg-gray-50 transition">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-gray-800">Orden #{order.id.split('-')[0]}</p>
              <p className="text-xs text-gray-500">{new Date(order.date).toLocaleString()}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              {order.items.map(item => (
                <div key={item.id} className="flex items-center space-x-2 bg-gray-100 rounded-lg px-3 py-1 text-xs">
                  <img src={item.image} alt={item.name} className="h-6 w-6 object-contain" />
                  <span className="truncate max-w-[120px]">{item.name}</span>
                  <span className="font-semibold">${item.price.toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 text-right">
              <span className="text-sm font-bold bg-gradient-to-r from-red-500 to-[#B974F4] bg-clip-text text-transparent">Total: ${order.total.toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentOrders;
