// models/Producto.js
import mongoose from 'mongoose';

const ProductoSchema = new mongoose.Schema({
  nombre:         { type: String, required: true, trim: true },
  modelo:         { type: String, required: true, trim: true },

  // Si de momento tienes un solo proveedor, puedes dejarlo como string:
  proveedor:      { type: String, default: 'ÚNICO', trim: true },
  // Alternativa (cuando tengas colección de proveedores):
  // proveedorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Proveedor' },

  precio:         { type: Number, required: true, min: 0 },

  // Campos “técnicos” del teléfono
  almacenamiento: { type: String, trim: true },  // ej. '128GB'
  descripcion:    { type: String, default: '', trim: true },
  ram:            { type: String, trim: true },  // ej. '8GB'
  color:          { type: String, trim: true },

  // Multimedia
  imagen:         { type: String, trim: true },  // URL principal
  // Si quieres varias imágenes: imagenes: [{ type: String }]

  // Inventario
  existencia:     { type: Number, default: 0, min: 0 },

}, { timestamps: true });

// Búsqueda de texto: nombre, modelo y descripción
ProductoSchema.index({ nombre: 'text', modelo: 'text', descripcion: 'text' });

// Campo virtual útil para saber si hay stock
ProductoSchema.virtual('enStock').get(function () {
  return this.existencia > 0;
});

export default mongoose.model('Producto', ProductoSchema);
