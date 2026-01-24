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
    toJSON: {         // 클라이언트에게 응답 보내는 용도
      virtuals: true, // _id 가상 필드 자동 생성
      transform: (doc, ret) => {    // 커스텀 가공 단계
        delete ret._id; // _id 필드 삭제
        return ret;     // 필터링 된 객체만 리턴
      },
    },
    toObject: {     // 서버 내부에서 js 객체로 다루는 용도
      virtuals: true,
      transform: (doc, ret) => {
        delete ret._id; 
        return ret; 
      },
    },
    versionKey: false,
  },
);

export const Product = mongoose.model('Product', productSchema);
