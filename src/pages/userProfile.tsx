import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SaveIcon from '@mui/icons-material/Save';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  age?: number | '';
  address?: string;
  newsletter: boolean;
}

const STORAGE_KEY = 'connectel_user_profile';

const defaultProfile: ProfileData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  age: '',
  address: '',
  newsletter: false,
};

const UserProfile: React.FC = () => {
  const [profile, setProfile] = useState<ProfileData>(defaultProfile);
  const [saved, setSaved] = useState<boolean>(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setProfile(JSON.parse(stored));
      } catch {
        // ignore parse errors
      }
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : (name === 'age' ? (value === '' ? '' : Number(value)) : value)
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // validación mínima
    if (!profile.firstName || !profile.lastName || !profile.email) {
      alert('Por favor completa nombre, apellido y correo.');
      return;
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
    // Aquí queda listo para reemplazar por llamada a API
  };

  const handleReset = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setProfile(JSON.parse(stored));
    } else {
      setProfile(defaultProfile);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Mi Perfil</h1>
                <p className="text-gray-600">Edita tus datos personales. Los cambios se guardarán localmente (simula backend).</p>
              </div>
              <div className="flex items-center space-x-3">
                {saved && (
                  <span className="text-sm text-green-600 font-medium">Guardado</span>
                )}
                <button
                  onClick={handleReset}
                  className="inline-flex items-center space-x-2 bg-white/5 hover:bg-white/10 border border-gray-200 text-gray-700 px-3 py-2 rounded-lg transition"
                  title="Restablecer"
                >
                  <RestartAltIcon fontSize="small" />
                  <span className="hidden sm:inline">Restablecer</span>
                </button>
              </div>
            </div>

            <form onSubmit={handleSave} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
                  <div className="relative">
                    <PersonIcon className="absolute left-3 top-3 text-gray-400" />
                    <input
                      name="firstName"
                      value={profile.firstName}
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
                      value={profile.lastName}
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
                      value={profile.email}
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
                      value={profile.phone}
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
                      value={profile.age ?? ''}
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
                      value={profile.address}
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
                    checked={profile.newsletter}
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
                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center space-x-2 border border-gray-200 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                  >
                    <RestartAltIcon fontSize="small" />
                    <span>Cancelar</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default UserProfile;
