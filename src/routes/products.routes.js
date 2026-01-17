import express from 'express';
import { NotFoundException } from '#exceptions';
import { HTTP_STATUS } from '#constants';
import { BadRequestException } from '#exceptions';
import { validateProduct } from '#middlewares';
import { ERROR_MESSAGE } from '#constants';
import { Product } from '#models';
import mongoose from 'mongoose';

export const productsRouter = express.Router();

// GET /products - 상품 목록 조회
productsRouter.get('/', async (req, res, next) => {
  try {
    const offset = Number(req.query.offset ?? 0);
    const limit = Number(req.query.limit ?? 10);
    const query = req.query.search ?? '';

    if (Number.isNaN(offset) || offset < 0) {
      throw new BadRequestException(ERROR_MESSAGE.INVALID_OFFSET);
    }

    if (Number.isNaN(limit) || limit <= 0) {
      throw new BadRequestException(ERROR_MESSAGE.INVALID_LIMIT);
    }

    const filter = query
      ? {
          $or: [
            { name: { $regex: query, $options: 'i' } },
            { description: { $regex: query, $options: 'i' } },
          ],
        }
      : {};

    const products = await Product.find(filter)
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit)
      .select('_id name price createdAt');

    const count = await Product.countDocuments(filter);

    res
      .status(HTTP_STATUS.OK)
      .json({ success: true, data: products.map((p) => p.toJSON()), count });
  } catch (error) {
    next(error);
  }
});

// GET /products/:id - 상품 상세 조회
productsRouter.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException(ERROR_MESSAGE.INVALID_PRODUCT_ID);
    }

    const product = await Product.findById(id);

    if (!product) {
      throw new NotFoundException(ERROR_MESSAGE.NOT_FOUND);
    }
    const { name, description, price, tags, createdAt } = product;

    res.status(HTTP_STATUS.OK).json({
      success: true,
      data: { id, name, description, price, tags, createdAt },
    });
  } catch (error) {
    next(error);
  }
});

// POST /products - 새 상품 등록
productsRouter.post('/', validateProduct, async (req, res, next) => {
  try {
    const { name, description, price, tags } = req.body;

    if (!name || !price) {
      throw new BadRequestException('상품 이름과 가격은 필수입니다.');
    }

    const now = new Date().toISOString();

    const newProduct = new Product({
      name,
      description,
      price,
      tags,
      images: [],
      favoriteCount: 0,
      createdAt: now,
      updatedAt: now,
    });

    await newProduct.save();

    res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: '상품이 등록되었습니다.',
      data: newProduct,
    });
  } catch (error) {
    next(error);
  }
});

// PATCH /products/:id - 상품 정보 수정
productsRouter.patch('/:id', validateProduct, async (req, res, next) => {
  try {
    const { name, description, price, tags } = req.body;
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException(ERROR_MESSAGE.INVALID_PRODUCT_ID);
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        name,
        description,
        price,
        tags,
      },
      { new: true },
    );

    if (!updatedProduct) {
      throw new NotFoundException(ERROR_MESSAGE.NOT_FOUND);
    }

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: `상품 ${req.params.id}이(가) 업데이트 되었습니다.`,
      data: updatedProduct,
    });
  } catch (error) {
    next(error);
  }
});

// DELETE /products/:id - 상품 삭제
productsRouter.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException(ERROR_MESSAGE.INVALID_PRODUCT_ID);
    }

    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      throw new NotFoundException(ERROR_MESSAGE.NOT_FOUND);
    }

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: `상품 ${req.params.id}이(가) 삭제되었습니다.`,
    });
  } catch (error) {
    next(error);
  }
});
