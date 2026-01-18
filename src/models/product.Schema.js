import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 10,
    },
    description: {
      type: String,
      required: true,
      minlength: 10,
      validate: {
        validator: (description) => {
          return description.split(" ").length > 1;
        },
        message: "최소 2단어 이상 작성해주세여 ",
      },
    },
    price: {
      type: Number,
      required: true,
      min: 0,
      validate: {
        validator: (description) => {
          return typeof description === "number";
        },
        message: "숫자만 입력해주세요 ",
      },
    },
    tags: {
      type: [
        {
          type: String,
          required: true,
          maxlength: 5,
          validate: {
            validator: (v) => v.length > 0,
            message: "빈 문자열은 불가",
          },
        },
      ],
      required: true,
      validate: {
        validator: (arr) => Array.isArray(arr) && arr.length > 0,
        message: "tags는 최소 1개 이상 필요합니다.",
      },
    },
  },
  { timestamps: true, versionKey: false },
);
const ProductDbProduct = mongoose.model("ProductDbProduct", ProductSchema);

export default ProductDbProduct;
