// src/routes/ProtectedRoute.tsx
// Componente de protección de rutas con React Router v6.

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute: React.FC = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    // Puedes reemplazar por un spinner de tu UI
    return <div style={{ padding: 24 }}>Cargando…</div>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
