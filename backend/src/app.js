import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import createError from 'http-errors';
import { connectToDatabase } from './config/database.js';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';

dotenv.config();

connectToDatabase().catch((error) => {
  console.error('Failed to initialize database connection', error);
  process.exit(1);
});

const app = express();

const defaultLocalOrigins = ['http://localhost:5173', 'http://127.0.0.1:5173'];
const allowedOrigins = [
  ...defaultLocalOrigins,
  ...(process.env.CLIENT_ORIGIN ? process.env.CLIENT_ORIGIN.split(',') : [])
]
  .map((origin) => origin.trim())
  .filter(Boolean);

const isLocalhostOrigin = (origin = '') => /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin) || isLocalhostOrigin(origin)) {
        return callback(null, true);
      }

      console.warn(`Bloqueando petición CORS desde origen no permitido: ${origin}`);
      return callback(createError(403, 'Origen no permitido por CORS'));
    },
    credentials: true
  })
);
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use((_req, _res, next) => {
  next(createError(404, 'Ruta no encontrada'));
});

app.use((err, _req, res, _next) => {
  const status = err.status || 500;
  res.status(status).json({
    message: err.message || 'Error interno del servidor',
    status
  });
});

export default app;
