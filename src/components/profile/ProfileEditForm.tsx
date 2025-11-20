import React, { useState } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SaveIcon from '@mui/icons-material/Save';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { useUser } from '../../context/UserContext';

interface Props {
  onClose?: () => void;
}

const ProfileEditForm: React.FC<Props> = ({ onClose }) => {
  const { user, updateProfile, resetProfile } = useUser();
  const [local, setLocal] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
    age: user.age ?? '',
    address: user.address ?? '',
    newsletter: user.newsletter
  });
  const [saved, setSaved] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setLocal(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : (name === 'age' ? (value === '' ? '' : Number(value)) : value)
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!local.firstName || !local.lastName || !local.email) {
      alert('Por favor completa nombre, apellido y correo.');
      return;
    }
    updateProfile(local);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
    if (onClose) onClose();
  };

  const handleReset = () => {
    resetProfile();
    setLocal({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      age: '',
      address: '',
      newsletter: false
    });
  };

  return (
    <form onSubmit={handleSave} className="space-y-6">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-bold text-gray-900">Editar Perfil</h3>
        <div className="flex items-center space-x-3">
          {saved && <span className="text-sm text-green-600 font-medium">Guardado</span>}
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center space-x-2 bg-white/5 hover:bg-white/10 border border-gray-200 text-gray-700 px-3 py-2 rounded-lg transition"
          >
            <RestartAltIcon fontSize="small" />
            <span className="hidden sm:inline">Restablecer</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
          <div className="relative">
            <PersonIcon className="absolute left-3 top-3 text-gray-400" />
            <input
              name="firstName"
              value={local.firstName}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-[#B974F4] transition"
              placeholder="Juan"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Apellido</label>
          <div className="relative">
            <PersonIcon className="absolute left-3 top-3 text-gray-400" />
            <input
              name="lastName"
              value={local.lastName}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-[#B974F4] transition"
              placeholder="Pérez"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Correo Electrónico</label>
          <div className="relative">
            <EmailIcon className="absolute left-3 top-3 text-gray-400" />
            <input
              name="email"
              type="email"
              value={local.email}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-[#B974F4] transition"
              placeholder="tu@email.com"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono</label>
          <div className="relative">
            <PhoneIcon className="absolute left-3 top-3 text-gray-400" />
            <input
              name="phone"
              type="tel"
              value={local.phone}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-[#B974F4] transition"
              placeholder="+52 (81) 1234-5678"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Edad</label>
          <div className="relative">
            <CalendarTodayIcon className="absolute left-3 top-3 text-gray-400" />
            <input
              name="age"
              type="number"
              min={0}
              value={local.age ?? ''}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-[#B974F4] transition"
              placeholder="30"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Dirección</label>
          <div className="relative">
            <LocationOnIcon className="absolute left-3 top-3 text-gray-400" />
            <input
              name="address"
              value={local.address}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-[#B974F4] transition"
              placeholder="Av. Constitución 2450, Monterrey"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <label className="flex items-center space-x-3">
          <input
            name="newsletter"
            type="checkbox"
            checked={local.newsletter}
            onChange={handleChange}
            className="h-4 w-4 text-[#B974F4] border-gray-300 rounded"
          />
          <span className="text-sm text-gray-700">Recibir newsletter y ofertas</span>
        </label>

        <div className="flex items-center space-x-3">
          <button
            type="submit"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-red-500 to-[#B974F4] text-white px-4 py-2 rounded-lg font-semibold hover:scale-105 transition"
          >
            <SaveIcon fontSize="small" />
            <span>Guardar</span>
          </button>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center space-x-2 border border-gray-200 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-50 transition"
            >
              <RestartAltIcon fontSize="small" />
              <span>Cerrar</span>
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default ProfileEditForm;
