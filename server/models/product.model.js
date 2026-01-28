import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    tags: { type: [String], default: [] },
    images: { type: [String], default: [] },
  },
  {
    timestamps: true, // 만든 시간, 수정 시간 자동기록
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    versionKey: false, //버전 숨기기
  }
);

export const Product = mongoose.model('Product', productSchema);
