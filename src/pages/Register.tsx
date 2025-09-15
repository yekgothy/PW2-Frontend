import React from 'react';
import { Link } from 'react-router-dom';
import RegisterForm from '../components/RegisterForm';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Register: React.FC = () => {
  return (
    <div className="relative">
      {/* Botón de regreso */}
      <div className="absolute top-6 left-6 z-10">
        <Link
          to="/"
          className="inline-flex items-center space-x-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg border border-white/20 hover:border-white/40 transition-all duration-300 transform hover:scale-105"
        >
          <ArrowBackIcon fontSize="small" />
          <span>Volver al inicio</span>
        </Link>
      </div>

      {/* Componente principal de registro */}
      <RegisterForm />
    </div>
  );
};

export default Register;
