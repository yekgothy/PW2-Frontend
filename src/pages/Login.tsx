// src/pages/Login.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../components/LoginForm';

const LoginPage: React.FC = () => (
  <div className=" flex items-center justify-center py-16 px-4">
    <div>
      <LoginForm />
      {/* Texto de registro debajo del formulario */}
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          ¿Aún no tienes una cuenta?{' '}
          <Link to="/register" className="font-semibold text-[#B974F4] hover:text-red-500">
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  </div>
);

export default LoginPage;
