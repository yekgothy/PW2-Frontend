// backend/server.js
// Servidor Express (ESM) + Healthchecks de API y BD

import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import connectDB from './db.js';
import authRoutes from './routes/auth.js';

const app = express();

// --- Middlewares base ---
app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true
  })
);

// --- Endpoints públicos “siempre vivos” ---
app.get('/', (_req, res) => {
  res.type('text').send('PW2 API corriendo. Usa /api/health o /api/health/db');
});

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', at: new Date().toISOString() });
});

// Helper para mostrar el estado de Mongoose en texto
function mongoReadyStateToText(state) {
  return ['disconnected', 'connected', 'connecting', 'disconnecting'][state] ?? 'unknown';
}

// --- Arranque seguro (sin top-level await) ---
async function start() {
  // Conectar a Mongo
  await connectDB();

  // Rutas de negocio
  app.use('/api/auth', authRoutes);

  // (Opcional) productos: montamos si existe el archivo, ESM o CJS
  try {
    const mod = await import('./routes/productos.js');
    const productosRoutes = mod.default ?? mod;
    app.use('/api/productos', productosRoutes);
    console.log('🧩 Rutas /api/productos montadas');
  } catch {
    console.log('ℹ️ No se encontró ./routes/productos.js (opcional).');
  }

  // Health de BD (requiere conexión lista)
  app.get('/api/health/db', async (_req, res) => {
    try {
      const conn = mongoose.connection;
      const state = conn.readyState;
      const t0 = Date.now();
      await conn.db.admin().command({ ping: 1 });
      const pingMs = Date.now() - t0;

      const collections = await conn.db.listCollections().toArray();
      const names = collections.map(c => c.name).sort();

      async function safeCount(name) {
        try { return await conn.db.collection(name).countDocuments(); }
        catch { return null; }
      }

      const usersCount = await safeCount('users');
      const productosCount = await safeCount('productos');

      res.json({
        ok: state === 1,
        uri: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/CELTEL_DB',
        readyState: state,
        stateText: mongoReadyStateToText(state),
        pingMs,
        collections: names,
        counts: { users: usersCount, productos: productosCount },
        at: new Date().toISOString()
      });
    } catch (err) {
      console.error('[health/db] error:', err);
      res.status(500).json({ ok: false, error: String(err) });
    }
  });

  const PORT = process.env.PORT ?? 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Backend escuchando en http://localhost:${PORT}`);
  });
}

start().catch((e) => {
  console.error('❌ No se pudo iniciar el servidor:', e);
  process.exit(1);
});
