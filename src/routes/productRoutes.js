import express from 'express';
import { Product } from '../models/Product.js';
import { NotFoundError } from '../errors/errors.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import {validateProduct} from '../middlewares/validateProduct.js';

export const productRouter = express.Router();

/**
 * 새로운 상품 등록 -> [POST] /
 */
productRouter.post(
  '/',
  validateProduct,
  asyncHandler(async (req, res) => {
    const { name, description, price, tags } = req.body;
    const newProduct = await Product.create({ name, description, price, tags });

    res.status(201).json({
      success: true,
      data: newProduct,
      message: '상품이 등록되었습니다.',
    });
  }),
);

/**
 * 모든 상품 조회 -> [GET] /
 * 페이지네이션, 최신순 정렬, 검색 기능
 */
productRouter.get(
  '/',
  asyncHandler(async (req, res) => {
    const {
      page = 1,
      pageSize = 10,
      keyword = '',
      sort = 'recent',
    } = req.query;

    // 검색 조건 : name, description
    const filter = {};
    if (keyword !== '') {
      filter.$or = [
        { name: { $regex: keyword, $options: 'i' } },
        { description: { $regex: keyword, $options: 'i' } },
      ];
    }

    // 정렬 조건
    const sortOption = {
      recent: { createdAt: -1 }, // 최신순,, 나중에 추가될 수도..?
    };
    const sortBy = sortOption[sort] || sortOption.recent; // 기본 최신순

    // 정보 가져오기
    const limit = Number(pageSize);
    const skip = (Number(page) - 1) * limit;

    const products = await Product.find(filter)
      .select('name price createdAt')
      .sort(sortBy)
      .skip(skip)
      .limit(limit);

    const total = await Product.countDocuments(filter); // 전체 개수

    res.json({
      success: true,
      list: products,
      totalCount: total,
    });
  }),
);

/**
 * 상품 상세 조회 -> [GET] /:id
 */
productRouter.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id).select(
      'name description price tags createdAt',
    );

    if (!product) throw new NotFoundError('상품을 찾을 수 없습니다.');

    res.json({ success: true, data: product });
  }),
);

/**
 * 상품 정보 수정 -> [PATCH] /:id
 */
productRouter.patch(
  '/:id',
  validateProduct,
  asyncHandler(async (req, res) => {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );

    if (!updatedProduct) throw new NotFoundError('상품을 찾을 수 없습니다.');

    res.json({
      success: true,
      data: updatedProduct,
      message: '상품 정보가 수정되었습니다.',
    });
  }),
);

/**
 * 상품 삭제 -> [DELETE] /:id
 */
productRouter.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    const deleteProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deleteProduct) throw new NotFoundError('상품을 찾을 수 없습니다.');

    res.json({ success: true, message: '상품이 삭제되었습니다.' });
  }),
);
