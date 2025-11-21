import createError from 'http-errors';
import Product from '../models/Product.js';

function buildProductResponse(product) {
  return {
    id: product._id.toString(),
    name: product.name,
    brand: product.brand,
    price: product.price,
    description: product.description ?? '',
    stock: product.stock,
    status: product.status,
    collections: product.collections ?? [],
    image: product.image ?? '',
    features: product.features ?? [],
    onSale: product.onSale ?? false,
    bestSeller: product.bestSeller ?? false,
    newArrival: product.newArrival ?? false,
    isFeatured: product.isFeatured ?? false,
    releaseDate: product.releaseDate ?? null,
    rating: product.rating ?? 0,
    reviews: product.reviews ?? 0,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt
  };
}

export async function listProducts(req, res, next) {
  try {
    const {
      search,
      brand,
      minPrice,
      maxPrice,
      status = 'active',
      onSale,
      bestSeller,
      newArrival,
      isFeatured
    } = req.query;

    const filters = {};

    if (status) {
      filters.status = status;
    }

    if (search) {
      const rex = new RegExp(String(search).trim(), 'i');
      filters.$or = [{ name: rex }, { description: rex }, { brand: rex }];
    }

    if (brand) {
      filters.brand = { $regex: new RegExp(String(brand).trim(), 'i') };
    }

    const priceFilters = {};
    if (minPrice !== undefined) {
      const min = Number(minPrice);
      if (!Number.isNaN(min)) {
        priceFilters.$gte = min;
      }
    }

    if (maxPrice !== undefined) {
      const max = Number(maxPrice);
      if (!Number.isNaN(max)) {
        priceFilters.$lte = max;
      }
    }

    if (Object.keys(priceFilters).length) {
      filters.price = priceFilters;
    }

    if (onSale !== undefined) {
      filters.onSale = onSale === 'true';
    }

    if (bestSeller !== undefined) {
      filters.bestSeller = bestSeller === 'true';
    }

    if (newArrival !== undefined) {
      filters.newArrival = newArrival === 'true';
    }

    if (isFeatured !== undefined) {
      filters.isFeatured = isFeatured === 'true';
    }

    const products = await Product.find(filters).sort({ createdAt: -1 }).lean();
    res.json({ products: products.map(buildProductResponse) });
  } catch (error) {
    next(error);
  }
}

export async function getProduct(req, res, next) {
  try {
    const { id } = req.params;
    const product = await Product.findById(id).lean();

    if (!product || product.status === 'archived') {
      throw createError(404, 'Producto no encontrado');
    }

    res.json({ product: buildProductResponse(product) });
  } catch (error) {
    next(error);
  }
}
