// src/components/LoginForm.tsx
// Formulario funcional de Login con manejo de errores y redirección.

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginForm: React.FC = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    // Si ya está autenticado, manda al catálogo o home
    if (isAuthenticated) navigate('/catalog');
  }, [isAuthenticated, navigate]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(email, password);
      navigate('/catalog'); // ajusta la ruta de destino a tu preferencia
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        'Error al iniciar sesión. Verifica tus credenciales.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="login-form" style={{ maxWidth: 420, margin: '0 auto' }}>
      <h2>Iniciar sesión</h2>

      <div className="form-group">
        <label htmlFor="email">Correo electrónico</label>
        <input
          id="email"
          type="email"
          placeholder="tu@correo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">Contraseña</label>
        <input
          id="password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
        />
      </div>

      {error && (
        <div style={{ color: 'crimson', marginBottom: 8 }}>
          {error}
        </div>
      )}

      <button type="submit" disabled={loading}>
        {loading ? 'Ingresando…' : 'Entrar'}
      </button>
    </form>
  );
};

export default LoginForm;
