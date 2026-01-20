import express from 'express';
import { Product } from '../models/product.js';
import { createProductSchema } from '../schemas/product.schema.js';
import { BadRequestException } from '../errors/badRequestException.js';
import { NotFoundException } from '../errors/notFoundException.js';

export const productRouter = express.Router();

productRouter.post('/items', async (req, res, next) => {
  try {
    const result = createProductSchema.safeParse(req.body);
    if (!result.success) {
      console.log("실제 Zod 메시지:", result.error.issues[0].message);
      throw new BadRequestException(result.error.issues[0].message);
    }

    const newProduct = new Product(result.data);
    await newProduct.save();

    res.status(201).json({
      success: true,
      data: newProduct,
      message: '상품이 성공적으로 등록되었습니다.',
    });
  } catch (error) {
    next(error);
  }
});

productRouter.get('/items', async (req, res, next) => {
  try {
    const { offset = 0, limit = 10, recent, keyword } = req.query;

    const query = keyword
      ? {
          $or: [
            { name: { $regex: keyword, $options: 'i' } },
            { description: { $regex: keyword, $options: 'i' } },
          ],
        }
      : undefined;

    const sortOption = recent === 'true' ? { createdAt: -1 } : undefined;

    const totalCount = await Product.countDocuments(query);

    const products = await Product.find(query)
      .sort(sortOption)
      .skip(Number(offset))
      .limit(Number(limit))
      .select('id name price createdAt');

    res.json({
      success: true,
      data: products,
      totalCount: totalCount,
    });
  } catch (error) {
    next(error);
  }
});

productRouter.get('/items/:id', async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) throw new NotFoundException('상품을 찾을 수 없습니다.');

    res.json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
});

productRouter.patch('/items/:id', async (req, res, next) => {
  try {
    const result = createProductSchema.partial().safeParse(req.body);
    if (!result.success) {
      throw new BadRequestException(result.error.issues[0].message);
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      result.data,
      { new: true, runValidators: true },
    );

    if (!updatedProduct)
      throw new NotFoundException('상품을 찾을 수 없습니다.');

    res.json({
      success: true,
      data: updatedProduct,
      message: '상품 정보가 수정되었습니다.',
    });
  } catch (error) {
    next(error);
  }
});

productRouter.delete('/items/:id', async (req, res, next) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct)
      throw new NotFoundException('상품을 찾을 수 없습니다.');

    res.json({ success: true, message: '상품이 삭제되었습니다.' });
  } catch (error) {
    next(error);
  }
});
