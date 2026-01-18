import express from "express";
import { Product } from "../models/product.model.js";

import { notFoundException } from "../errors/notFoundException.js";

export const productRouter = express.Router();

productRouter.get("/", async (req, res, next) => {
  //상품 목록 조회
  try {
    const products = await Product.find().select("_id name price createdAt"); //SELECT id, name, price, created_at FROM products;

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
//상품목록 상세조회
productRouter.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id)
      .select("_id name description price tags createdAt") //SELECT id, name, price, created_at FROM products;
      .sort({ createdAt: -1 });

    if (!product) {
      throw new notFoundException("해당 상품을 찾을 수 없습니다.");
    }

    res.json({
      success: true,
      data: product,
      message: "상품 목록 조회",
    });
  } catch (error) {
    next(error);
  }
});

//상품등록, 중복확인?
productRouter.post("/", async (req, res, next) => {
  try {
    const { name, description, price, tags } = req.body;
    const newProduct = new Product({ name, description, price, tags });
    await newProduct.save();
    res.json({ success: true, data: newProduct, message: "상품 생성됨" });
  } catch (error) {
    next(error);
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
    if (!updateProduct) {
      throw new notFoundException("상품을 찾을 수 없습니다.");
    }
    res.json({ success: true, data: updateProduct, message: "상품 수정됨." });
  } catch (error) {
    next(error);
  }
});

productRouter.delete("/:id", async (req, res, next) => {
  try {
    const deleteProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deleteProduct) {
      throw new notFoundException("해당 상품을 찾을 수 없습니다.");
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

//상품찾기 들어오는 쿼리값
productRouter.get("/", async (req, res, next) => {
  try {
    const { search } = req.query;
    const query = {};
    if (search) {
      query.$or = [
        { name: { $regex: search, $option: "i" } },
        { description: { $regex: search, $option: "i" } },
      ];
    }
    const products = await Product.find(query)
      .select("_id name price createdAt")
      .sort({ createdAt: -1 });
    res.json({ success: true, data: products, count: products.length });
  } catch (error) {
    next(error);
  }
});
