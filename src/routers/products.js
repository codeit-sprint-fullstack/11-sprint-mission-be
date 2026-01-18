import express from "express";
import { Product } from "../models/Product.model";

export const productRouter = express.Router();

productRouter.get("/", async (req, res, next) => {
  //상품 목록 조회
  try {
    const products = await Product.find()
      .select("_id name price createdAt") //SELECT id, name, price, created_at FROM products;
      .sort({ createdAt: -1 });
    res.json({
      success: true,
      data: products,
      count: products.length,
      message: "상품 목록 조회",
    });
  } catch (error) {
    next(error);
  }
});
//상품등록, 중복확인필요 _id
productRouter.post("/", async (req, res, next) => {
  try {
    const { name, description, price, tags } = req.body;
    const newProduct = new Product({ name, description, price, tags });
    await newProduct.save();
    res.json({ success: true, data: newProduct, message: "상품 생성됨" });
  } catch (error) {
    next(error);
    return;
  }
});

//상품 수정
productRouter.patch("/:id", async (req, res, next) => {
  try {
    const { name, description, price, tags } = req.body;
    const { id } = req.params;
    const updateProduct = await Product.findByIdAndUpdate(
      id,
      {
        name,
        description,
        price,
        tags,
      },
      { new: true, runValidators: true },
    );
    res.json({ success: true, data: updateProduct, message: "상품 수정됨." });
  } catch (error) {
    next(error);
    return;
  }
});

productRouter.delete("/:id", async (req, res, next) => {
  try {
    const deleteProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deleteProduct) {
      console.log("상품을 찾을 수 없습니다.");
      return res.status(404).json({
        success: false,
        message: "상품을 찾을 수 없습니다.",
      });
    }
    res.status(204).send();
  } catch (error) {
    next(error);
    return;
  }
});
