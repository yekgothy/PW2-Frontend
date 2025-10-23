import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <nav className="site-nav">
      <Link to="/">Inicio</Link>
      <Link to="/catalog">Catálogo</Link>
      <Link to="/offers">Ofertas</Link>

      <div className="spacer" />

      {isAuthenticated ? (
        <>
          <Link to="/profile">Perfil</Link>
          <span style={{ marginLeft: 12 }}>Hola, <strong>{user?.name}</strong></span>
          <button className="button" onClick={handleLogout} style={{ marginLeft: 8 }}>Salir</button>
        </>
      ) : (
        <>
          <Link to="/login">Entrar</Link>
          <Link to="/register" style={{ marginLeft: 12 }}>Crear cuenta</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
