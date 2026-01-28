import express from 'express';
import { validateProduct } from '../middlewares/validateProduct.js';
import { NotFoundException } from '../errors/notFoundException.js';
// import { ConflictException } from '../errors/conflictException.js';
import { Product } from '../models/product.model.js';

export const productRouter = express.Router();

productRouter.get('/', async (req, res, next) => {
  try {
    const { offset = 0, limit = 10, order = 'recent', keyword } = req.query;

    const query = {};

    if (keyword) {
      query.$or = [
        { name: { $regex: keyword, $options: 'i' } },
        { description: { $regex: keyword, $options: 'i' } },
      ];
    }

    const products = await Product.find(query)
      .select('name price createdAt')
      .sort(order === 'recent' ? { createdAt: -1 } : {})
      .skip(Number(offset))
      .limit(Number(limit));

    res.json({
      success: true,
      data: products,
      count: products.length,
    });
  } catch (error) {
    next(error);
  }
});

productRouter.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) throw new NotFoundException('사용자를 찾을 수 없습니다.');
    res.json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
});

productRouter.post('/', validateProduct, async (req, res, next) => {
  try {
    const { name, description, price, tags } = req.body;

    const newProduct = new Product({ name, description, price, tags });
    await newProduct.save();

    res.status(201).json({
      success: true,
      data: newProduct,
      message: '상품이 생성되었습니다',
    });
  } catch (error) {
    next(error);
  }
});

productRouter.get('/:userId/posts/:postId', (req, res) => {
  const { userId, postId } = req.params;
  res.json({ userId, postId });
});

productRouter.patch('/:id', validateProduct, async (req, res, next) => {
  try {
    const { id: productId } = req.params;

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      req.body,
      {
        new: true,
      },
    );

    if (!updatedProduct) {
      throw new NotFoundException('상품을 찾을 수 없습니다.');
    }

    res.json({
      success: true,
      data: updatedProduct,
      message: '상품이 수정되었습니다',
    });
  } catch (error) {
    next(error);
  }
});

productRouter.delete('/:id', async (req, res, next) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      throw new NotFoundException('상품을 찾을 수 없습니다.');
    }

    res.json({ success: true, message: '상품이 삭제되었습니다' });
  } catch (error) {
    next(error);
  }
});
