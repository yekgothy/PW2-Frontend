import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Iconos de Material UI
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LoginIcon from '@mui/icons-material/Login';

const RegisterForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
    newsletter: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Register attempt:', formData);
    // Aquí iría la lógica de registro
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center px-4 py-8 relative overflow-hidden">
      
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-[#B974F4]/5"></div>
      <div className="absolute top-20 right-20 w-40 h-40 bg-gradient-to-r from-red-500/10 to-[#B974F4]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-32 h-32 bg-gradient-to-r from-[#B974F4]/10 to-red-500/10 rounded-full blur-2xl"></div>
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-r from-red-500/5 to-[#B974F4]/5 rounded-full blur-xl"></div>
      <div className="absolute bottom-1/3 right-1/3 w-20 h-20 bg-gradient-to-r from-[#B974F4]/8 to-red-500/8 rounded-full blur-lg"></div>

      <div className="relative max-w-3xl w-full">
        
        {/* Contenedor principal */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-6 space-y-4">
          
          {/* Header con logo */}
          <div className="text-center space-y-3">
            <div className="flex items-center justify-center mb-2">
              <img 
                src="/logoSolo.svg" 
                alt="Connectel" 
                className="h-12 w-auto"
              />
            </div>
            
            <h1 className="text-2xl font-bold text-white">Crear Cuenta</h1>
            <p className="text-gray-300">Únete a la mejor tienda de celulares</p>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Nombres en fila */}
            <div className="grid grid-cols-2 gap-6">
              {/* Nombre */}
              <div className="space-y-1">
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-300">
                  Nombre
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <PersonIcon className="text-gray-400" fontSize="small" />
                  </div>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#B974F4] focus:border-transparent transition-all duration-300"
                    placeholder="Juan"
                  />
                </div>
              </div>

              {/* Apellido */}
              <div className="space-y-1">
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-300">
                  Apellido
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <PersonIcon className="text-gray-400" fontSize="small" />
                  </div>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#B974F4] focus:border-transparent transition-all duration-300"
                    placeholder="Pérez"
                  />
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Correo Electrónico
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <EmailIcon className="text-gray-400" fontSize="small" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#B974F4] focus:border-transparent transition-all duration-300"
                  placeholder="tu@email.com"
                />
              </div>
            </div>

            {/* Teléfono */}
            <div className="space-y-1">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-300">
                Teléfono
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <PhoneIcon className="text-gray-400" fontSize="small" />
                </div>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#B974F4] focus:border-transparent transition-all duration-300"
                  placeholder="+52 (555) 123-4567"
                />
              </div>
            </div>

            {/* Contraseña */}
            <div className="space-y-1">
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                Contraseña
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockIcon className="text-gray-400" fontSize="small" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-12 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#B974F4] focus:border-transparent transition-all duration-300"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white transition-colors duration-300"
                >
                  {showPassword ? <VisibilityOffIcon fontSize="small" /> : <VisibilityIcon fontSize="small" />}
                </button>
              </div>
            </div>

            {/* Confirmar Contraseña */}
            <div className="space-y-1">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300">
                Confirmar Contraseña
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockIcon className="text-gray-400" fontSize="small" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-12 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#B974F4] focus:border-transparent transition-all duration-300"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white transition-colors duration-300"
                >
                  {showConfirmPassword ? <VisibilityOffIcon fontSize="small" /> : <VisibilityIcon fontSize="small" />}
                </button>
              </div>
            </div>

            {/* Checkboxes */}
            <div className="space-y-3">
              {/* Términos y condiciones */}
              <div className="flex items-start">
                <input
                  id="acceptTerms"
                  name="acceptTerms"
                  type="checkbox"
                  required
                  checked={formData.acceptTerms}
                  onChange={handleInputChange}
                  className="h-4 w-4 mt-1 text-[#B974F4] focus:ring-[#B974F4] border-white/20 rounded bg-white/5"
                />
                <label htmlFor="acceptTerms" className="ml-3 block text-sm text-gray-300">
                  Acepto los{' '}
                  <Link to="/terms" className="text-[#B974F4] hover:text-red-500 transition-colors duration-300">
                    Términos y Condiciones
                  </Link>
                  {' '}y la{' '}
                  <Link to="/privacy" className="text-[#B974F4] hover:text-red-500 transition-colors duration-300">
                    Política de Privacidad
                  </Link>
                </label>
              </div>

              {/* Newsletter */}
              <div className="flex items-center">
                <input
                  id="newsletter"
                  name="newsletter"
                  type="checkbox"
                  checked={formData.newsletter}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-[#B974F4] focus:ring-[#B974F4] border-white/20 rounded bg-white/5"
                />
                <label htmlFor="newsletter" className="ml-3 block text-sm text-gray-300">
                  Quiero recibir ofertas exclusivas y noticias por email
                </label>
              </div>
            </div>

            {/* Botón de registro */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-red-500 to-[#B974F4] text-white font-semibold py-3 px-4 rounded-lg hover:shadow-xl hover:shadow-red-500/25 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <PersonAddIcon fontSize="small" />
              <span>Crear Cuenta</span>
            </button>
          </form>

          {/* Divisor */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/20"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-transparent text-gray-400">O regístrate con</span>
            </div>
          </div>

          {/* Botones de redes sociales */}
          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center space-x-2 bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white/40 text-white py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105">
              <GoogleIcon fontSize="small" />
              <span className="text-sm font-medium">Google</span>
            </button>
            <button className="flex items-center justify-center space-x-2 bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white/40 text-white py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105">
              <FacebookIcon fontSize="small" />
              <span className="text-sm font-medium">Facebook</span>
            </button>
          </div>

          {/* Enlace para iniciar sesión */}
          <div className="text-center">
            <p className="text-gray-400 text-sm">
              ¿Ya tienes cuenta?{' '}
              <Link
                to="/login"
                className="text-[#B974F4] hover:text-red-500 font-semibold transition-colors duration-300 inline-flex items-center space-x-1"
              >
                <LoginIcon fontSize="small" />
                <span>Inicia sesión aquí</span>
              </Link>
            </p>
          </div>
        </div>

        {/* Beneficios de registrarse */}
        <div className="mt-8 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
          <h3 className="text-lg font-semibold text-white mb-4 text-center">
            Al registrarte obtienes:
          </h3>
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-300">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>Envío gratis</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>Ofertas exclusivas</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>Historial de compras</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>Soporte prioritario</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
