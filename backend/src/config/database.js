import mongoose from 'mongoose';

let connectionPromise;

export function connectToDatabase() {
  const { MONGODB_URI } = process.env;

  if (!MONGODB_URI) {
    console.warn('MONGODB_URI is not defined. Database connection will fail.');
    return Promise.reject(new Error('Missing MONGODB_URI environment variable.'));
  }

  if (!connectionPromise) {
    connectionPromise = mongoose
      .connect(MONGODB_URI, {
        serverSelectionTimeoutMS: 5000
      })
      .then((mongooseInstance) => {
        console.log('Connected to MongoDB');
        return mongooseInstance;
      })
      .catch((error) => {
        console.error('MongoDB connection error', error);
        connectionPromise = undefined;
        throw error;
      });
  }

  return connectionPromise;
}
