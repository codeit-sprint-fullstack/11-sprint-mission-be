import express from 'express';
import { Product } from '../models/Product';

export const productRouter = express.Router();

/**
 * 새로운 상품 등록 -> [POST] /
 */
productRouter.post('/', async (req, res, next) => {
  try {
    const { name, description, price, tags } = req.body;
    const newProduct = await Product.create({ name, description, price, tags });
    res.status(201).json({
      success: true,
      data: newProduct,
      message: '상품이 등록되었습니다.',
    });
  } catch (error) {
    next(error);
  }
});

/**
 * 모든 상품 조회 -> [GET] /
 * offset 방식 페이지네이션, 최신순 정렬, 검색 기능
 */
productRouter.get('/', async (req, res, next) => {
  try {
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
  } catch (error) {
    next(error);
  }
});

/**
 * 상품 상세 조회 -> [GET] /:id
 */
productRouter.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).select(
      'name description price tags createdAt',
    );

    if (!product)
      return res.status(404).json({ message: '상품을 찾을 수 없습니다.' });

    res.json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
});

/**
 * 상품 정보 수정 -> [PATCH] /:id
 */
productRouter.patch('/:id', async (req, res, next) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );

    if (!updatedProduct)
      return res.status(404).json({ message: '상품을 찾을 수 없습니다.' });

    res.json({
      success: true,
      data: updatedProduct,
      message: '상품 정보가 수정되었습니다.',
    });
  } catch (error) {
    next(error);
  }
});

/**
 * 상품 삭제 -> [DELETE] /:id
 */
productRouter.delete('/:id', async (req, res, next) => {
  try {
    const deleteProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deleteProduct)
      return res.status(404).json({ message: '상품을 찾을 수 없습니다.' });

    res.json({ success: true, message: '상품이 삭제되었습니다.' });
  } catch (error) {
    next(error);
  }
});
