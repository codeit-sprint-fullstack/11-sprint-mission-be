import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, '상품명은 필수입니다.'],
      minlength: [1, '상품명은 최소 1자 이상이어야 합니다.'],
      maxlength: [10, '상품명은 최대 10자 이내여야 합니다.'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, '상품 소개는 필수입니다.'],
      minlength: [10, '상품 소개는 최소 10자 이상이어야 합니다.'],
      maxlength: [100, '상품 소개는 최대 100자 이내여야 합니다.'],
    },
    price: {
      type: Number,
      required: [true, '판매 가격은 필수입니다.'],
      min: [0, '가격은 0원 이상이어야 합니다.'],
    },
    tags: [
      {
        type: String,
        maxlength: [5, '태그는 5글자 이내여야 합니다.'],
        trim: true,
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    versionKey: false,
  },
);

export const Product = mongoose.model('Product', productSchema);
