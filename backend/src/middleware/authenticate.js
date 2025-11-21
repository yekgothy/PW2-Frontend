import createError from 'http-errors';
import jwt from 'jsonwebtoken';
import Customer from '../models/Customer.js';

export async function authenticate(req, _res, next) {
  try {
    const token = req.cookies?.token || req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      throw createError(401, 'Autenticación requerida');
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (_error) {
      throw createError(401, 'Token inválido o expirado');
    }

    const customer = await Customer.findById(decoded.sub).lean();
    if (!customer) {
      throw createError(401, 'Usuario no encontrado');
    }

    if (!customer.isActive) {
      throw createError(403, 'Cuenta deshabilitada. Contacta al soporte.');
    }

    req.user = {
      id: customer._id.toString(),
      firstName: customer.firstName,
      lastName: customer.lastName,
      email: customer.email,
      phone: customer.phone ?? '',
      address: customer.address ?? '',
      age: customer.age ?? null,
      newsletter: customer.newsletter ?? false
    };

    next();
  } catch (error) {
    next(error);
  }
}
