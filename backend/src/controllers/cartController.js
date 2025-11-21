import createError from 'http-errors';
import mongoose from 'mongoose';
import CustomerCart from '../models/CustomerCart.js';
import Product from '../models/Product.js';

function mapCartItem(item) {
  const productDoc = item.product || {};

  return {
    productId: item.product?._id ? item.product._id.toString() : item.product?.toString?.() ?? '',
    quantity: item.quantity,
    priceSnapshot: item.priceSnapshot ?? null,
    product: productDoc && productDoc.name
      ? {
          id: productDoc._id.toString(),
          name: productDoc.name,
          brand: productDoc.brand,
          price: productDoc.price,
          image: productDoc.image ?? '',
          description: productDoc.description ?? '',
          stock: productDoc.stock,
          status: productDoc.status,
          onSale: productDoc.onSale ?? false,
          bestSeller: productDoc.bestSeller ?? false,
          newArrival: productDoc.newArrival ?? false,
          isFeatured: productDoc.isFeatured ?? false
        }
      : null
  };
}

async function resolveCart(customerId) {
  const cart = await CustomerCart.findOne({ customer: customerId }).populate('items.product').exec();
  return cart;
}

async function ensureCart(customerId) {
  const cart = await resolveCart(customerId);
  if (cart) return cart;

  return CustomerCart.create({ customer: customerId, items: [] });
}

export async function getCart(req, res, next) {
  try {
    const cart = await ensureCart(req.user.id);
    await cart.populate('items.product');
    const items = cart.items.map(mapCartItem);
    const subtotal = items.reduce((acc, item) => acc + (item.product?.price ?? item.priceSnapshot ?? 0) * item.quantity, 0);

    res.json({
      cart: {
        id: cart._id.toString(),
        items,
        subtotal
      }
    });
  } catch (error) {
    next(error);
  }
}

export async function addOrIncrementItem(req, res, next) {
  try {
    const { productId, quantity = 1 } = req.body;

    if (!productId) {
      throw createError(400, 'productId es requerido');
    }

    const parsedQty = Number(quantity);
    if (!Number.isFinite(parsedQty) || parsedQty <= 0) {
      throw createError(400, 'quantity debe ser mayor a 0');
    }

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      throw createError(400, 'productId inválido');
    }

    const product = await Product.findById(productId).lean();
    if (!product || product.status !== 'active') {
      throw createError(404, 'Producto no disponible');
    }

    const cart = await ensureCart(req.user.id);
    const existing = cart.items.find((item) => item.product.toString() === productId);

    if (existing) {
      existing.quantity += parsedQty;
      existing.priceSnapshot = product.price;
    } else {
      cart.items.push({ product: product._id, quantity: parsedQty, priceSnapshot: product.price });
    }

    await cart.save();
    await cart.populate('items.product');

    const items = cart.items.map(mapCartItem);
    const subtotal = items.reduce((acc, item) => acc + (item.product?.price ?? item.priceSnapshot ?? 0) * item.quantity, 0);

    res.status(existing ? 200 : 201).json({
      cart: {
        id: cart._id.toString(),
        items,
        subtotal
      }
    });
  } catch (error) {
    next(error);
  }
}

export async function updateItemQuantity(req, res, next) {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      throw createError(400, 'productId inválido');
    }

    const parsedQty = Number(quantity);
    if (!Number.isFinite(parsedQty) || parsedQty <= 0) {
      throw createError(400, 'quantity debe ser mayor a 0');
    }

    const product = await Product.findById(productId).lean();
    if (!product || product.status !== 'active') {
      throw createError(404, 'Producto no disponible');
    }

    const cart = await ensureCart(req.user.id);
    const existing = cart.items.find((item) => item.product.toString() === productId);

    if (!existing) {
      throw createError(404, 'El producto no está en el carrito');
    }

    existing.quantity = parsedQty;
    existing.priceSnapshot = product.price;

    await cart.save();
    await cart.populate('items.product');

    const items = cart.items.map(mapCartItem);
    const subtotal = items.reduce((acc, item) => acc + (item.product?.price ?? item.priceSnapshot ?? 0) * item.quantity, 0);

    res.json({
      cart: {
        id: cart._id.toString(),
        items,
        subtotal
      }
    });
  } catch (error) {
    next(error);
  }
}

export async function removeItem(req, res, next) {
  try {
    const { productId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      throw createError(400, 'productId inválido');
    }

    const cart = await ensureCart(req.user.id);
    cart.items = cart.items.filter((item) => item.product.toString() !== productId);
    await cart.save();
    await cart.populate('items.product');

    const items = cart.items.map(mapCartItem);
    const subtotal = items.reduce((acc, item) => acc + (item.product?.price ?? item.priceSnapshot ?? 0) * item.quantity, 0);

    res.json({
      cart: {
        id: cart._id.toString(),
        items,
        subtotal
      }
    });
  } catch (error) {
    next(error);
  }
}

export async function clearCart(req, res, next) {
  try {
    const cart = await ensureCart(req.user.id);
    cart.items = [];
    await cart.save();

    res.status(204).send();
  } catch (error) {
    next(error);
  }
}
