import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },         // 상품명
    description: { type: String, required: true },  // 소개
    price: { type: Number, required: true },        // 가격
    tags: { type: String, default: '' },            // 태그
  },
  {
    timestamps: true,        // createdAt, updatedAt 자동
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

export const Product = mongoose.model('Product', productSchema);
