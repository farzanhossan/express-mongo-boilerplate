import IProduct from './product.interface';

import mongoose from 'mongoose';
const { Schema } = mongoose;

const productSchema = new Schema<IProduct>(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    isActive: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Product = mongoose.model<IProduct>('Product', productSchema);
export default Product;
