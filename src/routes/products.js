import express from 'express';
import { Product } from '../models/product.model.js';
import { success } from 'zod';

export const productsRouter = express.Router();

//GET 상품 목록 조회  (페이지네이션, 정렬,)
productsRouter.get('/', async (req, res, next) => {
  try {
    const products = await Product.find();
    res.json({
      success: true,
      data: products,
      count: products.length,
    });
  } catch (error) {
    next(error);
    return;
  }
});

//GET 상품 목록 검색
productsRouter.get('/search', async (req, res, next) => {});

//GET 상품 상세 조회
productsRouter.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.json({
      success: true,
      data: product,
    });
  } catch (error) {
    next(error);
    return;
  }
});

//POST 상품 등록
productsRouter.post('/', async (req, res, next) => {
  try {
    const { name, description, price, tags } = req.body;
    const newPorduct = new Product({ name, description, price, tags });
    await newPorduct.save();
    res.json({
      success: true,
      data: newPorduct,
    });
  } catch (error) {
    next(error);
    return;
  }
});

//PATCH 상품 수정
productsRouter.patch('/:id', async (req, res, next) => {
  try {
    const { name, description, price, tags } = req.body;
    const { id } = req.params;
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, description, price, tags },
      { new: true },
    );
    res.json({
      success: true,
      data: updatedProduct,
      message: '',
    });
  } catch (error) {
    next(error);
    return;
  }
});

//DELETE 상품 삭제
productsRouter.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    res.json({ success: true, message: '' });
  } catch (error) {
    next(error);
    return;
  }
});
