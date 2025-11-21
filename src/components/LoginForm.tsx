import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Iconos de Material UI
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LoginIcon from '@mui/icons-material/Login';
import { useUser } from '../context/UserContext';

const LoginForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [formError, setFormError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login, isLoading } = useUser();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const result = await login({
      email: formData.email,
      password: formData.password
    });

    if (result.success) {
      navigate('/');
      return;
    }

    setFormError(result.message ?? 'No se pudo iniciar sesión.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center px-4 py-8 relative overflow-hidden">
      
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-[#B974F4]/5"></div>
      <div className="absolute top-20 right-20 w-40 h-40 bg-gradient-to-r from-red-500/10 to-[#B974F4]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-32 h-32 bg-gradient-to-r from-[#B974F4]/10 to-red-500/10 rounded-full blur-2xl"></div>
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-r from-red-500/5 to-[#B974F4]/5 rounded-full blur-xl"></div>

      <div className="relative max-w-md w-full">
        
        {/* Contenedor principal */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-8 space-y-8">
          
          {/* Header con logo */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center mb-4">
              <img 
                src="/logoSolo.svg" 
                alt="Connectel" 
                className="h-12 w-auto"
              />
            </div>
            
            <h1 className="text-2xl font-bold text-white">Iniciar Sesión</h1>
            <p className="text-gray-300">Accede a tu cuenta para continuar</p>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {formError ? (
              <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {formError}
              </div>
            ) : null}
            
            {/* Campo Email */}
            <div className="space-y-2">
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

            {/* Campo Contraseña */}
            <div className="space-y-2">
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

            {/* Recordarme y Olvidé contraseña */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="rememberMe"
                  name="rememberMe"
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-[#B974F4] focus:ring-[#B974F4] border-white/20 rounded bg-white/5"
                />
                <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-300">
                  Recordarme
                </label>
              </div>
              <Link
                to="/forgot-password"
                className="text-sm text-[#B974F4] hover:text-red-500 transition-colors duration-300"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            {/* Botón de inicio de sesión */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-red-500 to-[#B974F4] text-white font-semibold py-3 px-4 rounded-lg hover:shadow-xl hover:shadow-red-500/25 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <LoginIcon fontSize="small" />
              <span>{isLoading ? 'Validando...' : 'Iniciar Sesión'}</span>
            </button>
          </form>

          {/* Divisor */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/20"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-transparent text-gray-400">O continúa con</span>
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

          {/* Enlace para registrarse */}
          <div className="text-center">
            <p className="text-gray-400 text-sm">
              ¿No tienes una cuenta?{' '}
              <Link
                to="/register"
                className="text-[#B974F4] hover:text-red-500 font-semibold transition-colors duration-300 inline-flex items-center space-x-1"
              >
                <PersonAddIcon fontSize="small" />
                <span>Regístrate aquí</span>
              </Link>
            </p>
          </div>
        </div>

        {/* Texto adicional debajo */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            Al iniciar sesión, aceptas nuestros{' '}
            <Link to="/terms" className="text-[#B974F4] hover:text-red-500 transition-colors duration-300">
              Términos y Condiciones
            </Link>
            {' '}y{' '}
            <Link to="/privacy" className="text-[#B974F4] hover:text-red-500 transition-colors duration-300">
              Política de Privacidad
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
