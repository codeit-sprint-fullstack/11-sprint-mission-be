import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, default: '' },
    price: { type: Number, required: true, min: 0 },
    tags: { type: [String], default: [] },
    images: { type: [String], default: [] },
    ownerId: { type: Number },
    favoriteCount: { type: Number, default: 0 },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    versionKey: false,
  },
);

export const Product = mongoose.model('Product', productSchema);
