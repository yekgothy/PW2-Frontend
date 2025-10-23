// backend/middleware/auth.js
import jwt from 'jsonwebtoken';

function authMiddleware(req, res, next) {
  const header = req.headers.authorization || '';
  const [scheme, token] = header.split(' ');

  const hasBearer = scheme === 'Bearer' && typeof token === 'string' && token.length > 0;
  if (!hasBearer) {
    return res.status(401).json({ message: 'No hay token, autorización denegada' });
  }

  try {
    const secret = process.env.JWT_SECRET || 'devsecret-super-inseguro-no-uses-en-produccion';
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ message: 'Token inválido o expirado' });
  }
}

export default authMiddleware;
