// item 스키마
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true},
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    tags: { type: String },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    versionKey: false,
  },
);

export const Product = mongoose.model('Product', productSchema);
