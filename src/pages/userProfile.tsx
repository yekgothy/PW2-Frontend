import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import UserProfileInfo from '../components/profile/UserProfileInfo';
import RecentOrders from '../components/profile/RecentOrders';
import Wishlist from '../components/profile/Wishlist';
import ProfileEditForm from '../components/profile/ProfileEditForm';
import EditIcon from '@mui/icons-material/Edit';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import CloseIcon from '@mui/icons-material/Close';
import { UserProvider } from '../context/UserContext';

// Página de perfil mejorada con pestañas
const UserProfile: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'orders' | 'wishlist' | 'datos'>('orders');
  const [editing, setEditing] = useState(false);

  return (
    <UserProvider>
      <div className="min-h-screen bg-white">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Columna izquierda: resumen + edición */}
            <div className="space-y-6 lg:col-span-1">
              <UserProfileInfo />
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900 flex items-center space-x-2">
                    <AssignmentIndIcon className="text-[#B974F4]" />
                    <span>Perfil</span>
                  </h3>
                  <button
                    onClick={() => setEditing(e => !e)}
                    className="inline-flex items-center space-x-1 text-sm px-3 py-2 rounded-lg bg-gradient-to-r from-red-500 to-[#B974F4] text-white hover:shadow-md transition"
                  >
                    {editing ? <CloseIcon fontSize="small" /> : <EditIcon fontSize="small" />}
                    <span>{editing ? 'Cerrar' : 'Editar'}</span>
                  </button>
                </div>
                {editing ? (
                  <ProfileEditForm onClose={() => setEditing(false)} />
                ) : (
                  <p className="text-sm text-gray-600">Usa el botón "Editar" para actualizar tu información personal. Los cambios se guardan localmente y pueden integrarse con un backend futuro.</p>
                )}
              </div>
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Datos Adicionales</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Seguridad de cuenta (2FA) — próximamente.</li>
                  <li>• Preferencias de comunicación.</li>
                  <li>• Integración con facturación.</li>
                </ul>
              </div>
            </div>

            {/* Columna derecha: pestañas dinámicas */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`inline-flex items-center space-x-2 px-4 py-2 rounded-xl border text-sm font-semibold transition ${activeTab === 'orders' ? 'bg-gradient-to-r from-red-500 to-[#B974F4] text-white border-transparent shadow-md' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'}`}
                >
                  <ShoppingBagIcon fontSize="small" />
                  <span>Órdenes</span>
                </button>
                <button
                  onClick={() => setActiveTab('wishlist')}
                  className={`inline-flex items-center space-x-2 px-4 py-2 rounded-xl border text-sm font-semibold transition ${activeTab === 'wishlist' ? 'bg-gradient-to-r from-red-500 to-[#B974F4] text-white border-transparent shadow-md' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'}`}
                >
                  <FavoriteBorderIcon fontSize="small" />
                  <span>Wishlist</span>
                </button>
                <button
                  onClick={() => setActiveTab('datos')}
                  className={`inline-flex items-center space-x-2 px-4 py-2 rounded-xl border text-sm font-semibold transition ${activeTab === 'datos' ? 'bg-gradient-to-r from-red-500 to-[#B974F4] text-white border-transparent shadow-md' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'}`}
                >
                  <AssignmentIndIcon fontSize="small" />
                  <span>Información</span>
                </button>
              </div>

              {activeTab === 'orders' && <RecentOrders />}
              {activeTab === 'wishlist' && <Wishlist />}
              {activeTab === 'datos' && (
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">¿Qué puedo hacer aquí?</h3>
                  <p className="text-sm text-gray-600 mb-4">Esta sección centraliza tu actividad en la tienda. Próximamente podrás ver historial completo, descargas de factura, devoluciones y más.</p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                      <h4 className="text-sm font-semibold text-gray-800 mb-1">Órdenes</h4>
                      <p className="text-xs text-gray-600">Resumen de tus compras y sus productos.</p>
                    </div>
                    <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                      <h4 className="text-sm font-semibold text-gray-800 mb-1">Wishlist</h4>
                      <p className="text-xs text-gray-600">Guarda productos para comparar o comprar luego.</p>
                    </div>
                    <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                      <h4 className="text-sm font-semibold text-gray-800 mb-1">Perfil</h4>
                      <p className="text-xs text-gray-600">Actualiza tus datos de contacto y preferencias.</p>
                    </div>
                    <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                      <h4 className="text-sm font-semibold text-gray-800 mb-1">Mejoras</h4>
                      <p className="text-xs text-gray-600">Integraciones futuras: facturación, soporte y fidelidad.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </UserProvider>
  );
};

export default UserProfile;
