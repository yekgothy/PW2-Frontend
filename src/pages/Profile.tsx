// src/pages/Profile.tsx
import React from 'react';
import { getMe } from '../services/auth';
import type { SafeUser } from '../services/auth';

const Profile: React.FC = () => {
  const [me, setMe] = React.useState<SafeUser | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      try {
        const data = await getMe();
        setMe(data);
      } catch (err: any) {
        setError(err?.response?.data?.message || 'No se pudo cargar el perfil.');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div style={{ padding: 24 }}>Cargando perfil…</div>;
  if (error) return <div style={{ padding: 24, color: 'crimson' }}>{error}</div>;

  return (
    <div style={{ padding: 24 }}>
      <h2>Mi perfil</h2>
      <pre style={{ background: '#f8f8f8', padding: 12, borderRadius: 8 }}>
        {JSON.stringify(me, null, 2)}
      </pre>
    </div>
  );
};

export default Profile;
