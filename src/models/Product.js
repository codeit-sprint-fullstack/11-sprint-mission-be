import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, '상품명은 필수입니다'],
      maxlength: [10, '상품명은 10자 이내입니다'],
    },
    description: {
      type: String,
      required: [true, '상품 설명은 필수입니다'],
      minlength: [10, '상품 설명은 10자 이상입니다'],
      maxlength: [100, '상품 설명은 100자 이내입니다'],
    },
    price: {
      type: Number,
      required: [true, '가격은 필수입니다'],
      min: [1000, '가격은 1,000원 이상입니다'],
    },
    tags: [
      {
        type: String,
        maxlength: [5, '태그는 5글자 이내입니다'],
      },
    ],
    images: [String],
    thumbnail: String, 
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Product', productSchema);
