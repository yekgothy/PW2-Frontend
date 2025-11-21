import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    brand: {
      type: String,
      required: true,
      trim: true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    description: {
      type: String,
      default: '',
      trim: true
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0
    },
    status: {
      type: String,
      enum: ['active', 'draft', 'archived'],
      default: 'active'
    },
    collections: {
      type: [String],
      default: [],
      set: (values) => values.map((value) => value.trim()).filter(Boolean)
    },
    image: {
      type: String,
      default: '',
      trim: true
    },
    features: {
      type: [String],
      default: []
    },
    onSale: {
      type: Boolean,
      default: false
    },
    bestSeller: {
      type: Boolean,
      default: false
    },
    newArrival: {
      type: Boolean,
      default: false
    },
    isFeatured: {
      type: Boolean,
      default: false
    },
    releaseDate: {
      type: Date
    },
    rating: {
      type: Number,
      default: 0,
      min: 0
    },
    reviews: {
      type: Number,
      default: 0,
      min: 0
    }
  },
  {
    timestamps: true,
    collection: 'productAdm'
  }
);

const Product = mongoose.models.ProductFrontend || mongoose.model('ProductFrontend', productSchema, 'productAdm');

export default Product;
