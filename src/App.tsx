// src/App.tsx
// Enrutador principal con Navbar y rutas públicas/protegidas.

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar';
import ProtectedRoute from './routes/ProtectedRoute';

// Páginas reales del proyecto
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import CartPage from './pages/CartPage';
import ContactPage from './pages/ContactPage';

// Auth / Perfil
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import Profile from './pages/Profile';

// Ofertas (asegúrate que exista el archivo y el export por defecto)
import Offers from './pages/Offers';

const App: React.FC = () => {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/offers" element={<Offers />} />  {/* ⬅️ AQUÍ LA RUTA QUE FALTABA */}

        {/* Auth */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protegidas */}
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>

        {/* Fallback: cualquier otra ruta te manda a Inicio */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default App;
