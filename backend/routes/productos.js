// routes/productos.js
import { Router } from 'express';
import Producto from '../models/Producto.js';

const router = Router();

// Crear un producto
router.post('/', async (req, res) => {
  try {
    const nuevo = await Producto.create(req.body);
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(400).json({ error: true, message: err.message });
  }
});

// Listar productos
router.get('/', async (_req, res) => {
  const productos = await Producto.find().sort('-createdAt');
  res.json(productos);
});

export default router;
