import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ProductFrontend',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
      default: 1
    },
    priceSnapshot: {
      type: Number,
      min: 0
    }
  },
  {
    _id: false
  }
);

const customerCartSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
      required: true,
      unique: true
    },
    items: {
      type: [cartItemSchema],
      default: []
    }
  },
  {
    timestamps: true,
    collection: 'customerCart'
  }
);

const CustomerCart = mongoose.models.CustomerCart || mongoose.model('CustomerCart', customerCartSchema, 'customerCart');

export default CustomerCart;
