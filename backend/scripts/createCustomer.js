import dotenv from 'dotenv';
import mongoose from 'mongoose';
import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import Customer from '../src/models/Customer.js';
import { connectToDatabase } from '../src/config/database.js';

dotenv.config();

async function promptForData() {
  const rl = readline.createInterface({ input, output });

  try {
    const firstName = (await rl.question('Nombre: ')).trim();
    const lastName = (await rl.question('Apellido: ')).trim();
    const email = (await rl.question('Correo: ')).trim().toLowerCase();
    const phone = (await rl.question('Teléfono (opcional): ')).trim();
    const password = await rl.question('Contraseña (min 8 caracteres): ');
    const newsletterAnswer = (await rl.question('¿Recibe newsletter? (s/N): ')).trim().toLowerCase();

    return {
      firstName,
      lastName,
      email,
      phone,
      password,
      newsletter: newsletterAnswer === 's' || newsletterAnswer === 'y'
    };
  } finally {
    rl.close();
  }
}

async function main() {
  await connectToDatabase();
  await Customer.init();

  const data = await promptForData();

  if (!data.firstName || !data.lastName || !data.email || !data.password) {
    throw new Error('Nombre, apellido, correo y contraseña son obligatorios.');
  }

  if (data.password.length < 8) {
    throw new Error('La contraseña debe tener al menos 8 caracteres.');
  }

  const existing = await Customer.findOne({ email: data.email });
  if (existing) {
    throw new Error('Ya existe un cliente con ese correo.');
  }

  const customer = await Customer.create(data);

  console.log('Cliente creado correctamente:', {
    id: customer.id,
    email: customer.email,
    nombre: `${customer.firstName} ${customer.lastName}`
  });
}

main()
  .catch((error) => {
    console.error('No se pudo crear el cliente:', error.message);
    process.exitCode = 1;
  })
  .finally(() => {
    mongoose.connection.close();
  });
