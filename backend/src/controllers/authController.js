import createError from 'http-errors';
import jwt from 'jsonwebtoken';
import Customer from '../models/Customer.js';

function createToken(customer) {
  if (!process.env.JWT_SECRET) {
    throw createError(500, 'JWT_SECRET no está configurado');
  }

  const payload = {
    sub: customer.id,
    email: customer.email
  };

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  });
}

function buildCustomerResponse(customer) {
  return {
    id: customer.id,
    firstName: customer.firstName,
    lastName: customer.lastName,
    email: customer.email,
    phone: customer.phone ?? '',
    address: customer.address ?? '',
    age: customer.age ?? null,
    newsletter: customer.newsletter ?? false
  };
}

function setAuthCookie(res, token) {
  return res.cookie('token', token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.COOKIE_SECURE === 'true',
    maxAge: 1000 * 60 * 60 * 24 * 7
  });
}

export async function register(req, res, next) {
  try {
    const { firstName, lastName, email, password, phone, newsletter } = req.body;

    if (!firstName || !lastName || !email || !password) {
      throw createError(400, 'Nombre, apellido, correo y contraseña son obligatorios');
    }

    if (password.length < 8) {
      throw createError(400, 'La contraseña debe tener al menos 8 caracteres');
    }

    const normalizedEmail = email.trim().toLowerCase();

    const existing = await Customer.findOne({ email: normalizedEmail });
    if (existing) {
      throw createError(409, 'El correo ya está registrado');
    }

    const customer = await Customer.create({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: normalizedEmail,
      password,
      phone: phone?.trim() ?? '',
      newsletter: Boolean(newsletter)
    });

    const token = createToken(customer);

    setAuthCookie(res, token).status(201).json({
      user: buildCustomerResponse(customer),
      token
    });
  } catch (error) {
    next(error);
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw createError(400, 'Correo y contraseña son obligatorios');
    }

    const normalizedEmail = email.trim().toLowerCase();
    const customer = await Customer.findOne({ email: normalizedEmail });

    if (!customer) {
      throw createError(401, 'Credenciales incorrectas');
    }

    const matches = await customer.comparePassword(password);
    if (!matches) {
      throw createError(401, 'Credenciales incorrectas');
    }

    if (!customer.isActive) {
      throw createError(403, 'La cuenta está deshabilitada.');
    }

    const token = createToken(customer);

    setAuthCookie(res, token).json({
      user: buildCustomerResponse(customer),
      token
    });
  } catch (error) {
    next(error);
  }
}

export async function logout(_req, res) {
  res.clearCookie('token').status(200).json({ message: 'Sesión cerrada' });
}

export async function me(req, res) {
  res.json({ user: req.user });
}
