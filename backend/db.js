// backend/db.js
// Conexión MongoDB con Mongoose en ESM.

import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/CELTEL_DB';

export default async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI, { autoIndex: true });
    console.log('✅ MongoDB conectado:', MONGO_URI);
  } catch (err) {
    console.error('❌ Error conectando a MongoDB:', err.message);
    process.exit(1);
  }
}
