import React from 'react';
// Eliminados iconos no utilizados (PersonIcon, EmailIcon) para limpiar errores TS
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';
import { useUser } from '../../context/UserContext';

const UserProfileInfo: React.FC = () => {
  const { user } = useUser();
  const initials = (user.firstName?.[0] || '?') + (user.lastName?.[0] || '');

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="p-6 flex items-center space-x-6">
        <div className="h-20 w-20 rounded-2xl bg-gradient-to-r from-red-500 to-[#B974F4] text-white flex items-center justify-center text-2xl font-bold shadow-lg">
          {initials.toUpperCase()}
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-bold text-gray-900">{user.firstName || 'Sin nombre'} {user.lastName}</h2>
          <p className="text-sm text-gray-600">{user.email || 'Correo no definido'}</p>
          <div className="mt-3 flex flex-wrap gap-3 text-sm">
            {user.phone && (
              <span className="inline-flex items-center space-x-1 bg-gray-100 px-3 py-1 rounded-full">
                <PhoneIcon fontSize="small" className="text-gray-500" />
                <span>{user.phone}</span>
              </span>
            )}
            {user.age !== '' && user.age !== undefined && (
              <span className="inline-flex items-center space-x-1 bg-gray-100 px-3 py-1 rounded-full">
                <CalendarTodayIcon fontSize="small" className="text-gray-500" />
                <span>{user.age} años</span>
              </span>
            )}
            {user.address && (
              <span className="inline-flex items-center space-x-1 bg-gray-100 px-3 py-1 rounded-full">
                <LocationOnIcon fontSize="small" className="text-gray-500" />
                <span className="truncate max-w-[160px]" title={user.address}>{user.address}</span>
              </span>
            )}
            <span className="inline-flex items-center space-x-1 bg-gray-100 px-3 py-1 rounded-full">
              {user.newsletter ? (
                <MarkEmailReadIcon fontSize="small" className="text-green-600" />
              ) : (
                <MarkEmailUnreadIcon fontSize="small" className="text-gray-500" />
              )}
              <span>{user.newsletter ? 'Recibe newsletter' : 'Sin newsletter'}</span>
            </span>
          </div>
        </div>
      </div>
      <div className="px-6 pb-6 grid grid-cols-3 gap-4 text-center border-t border-gray-100">
        <div className="pt-4">
          <p className="text-2xl font-bold bg-gradient-to-r from-red-500 to-[#B974F4] bg-clip-text text-transparent">{user.orders.length}</p>
          <p className="text-xs text-gray-500">Órdenes</p>
        </div>
        <div className="pt-4">
          <p className="text-2xl font-bold bg-gradient-to-r from-red-500 to-[#B974F4] bg-clip-text text-transparent">{user.wishlist.length}</p>
          <p className="text-xs text-gray-500">Wishlist</p>
        </div>
        <div className="pt-4">
          <p className="text-2xl font-bold bg-gradient-to-r from-red-500 to-[#B974F4] bg-clip-text text-transparent">{user.newsletter ? '✔' : '✖'}</p>
          <p className="text-xs text-gray-500">Newsletter</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfileInfo;
