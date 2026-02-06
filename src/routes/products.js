import express from 'express';
import Product from '../models/Product.js';
import { AppError } from '../exceptions/AppError.js';
import { HTTP_STATUS, ERROR_MESSAGES } from '../constants/statusCodes.js';

const router = express.Router();

const validateProductData = (data) => {
  const { name, description, price, tags } = data;
  if (!name?.trim())
    throw new AppError('상품명은 필수입니다', HTTP_STATUS.BAD_REQUEST);
  if (!description?.trim())
    throw new AppError('상품 설명은 필수입니다', HTTP_STATUS.BAD_REQUEST);
  if (!price || price < 1000)
    throw new AppError(
      '가격은 1,000원 이상이어야 합니다',
      HTTP_STATUS.BAD_REQUEST,
    );
  if (!tags?.length)
    throw new AppError('태그는 1개 이상 입력하세요', HTTP_STATUS.BAD_REQUEST);
};

// 상품 목록 조회 (페이지네이션 + 검색 + 정렬)
router.get('/', async (req, res, next) => {
  try {
    const { page = 1, limit = 10, search, sort = 'recent' } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // 검색 쿼리
    const searchQuery = search
      ? {
          $or: [
            { name: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } },
          ],
        }
      : {};

    // 정렬
    const sortOrder = sort === 'recent' ? { createdAt: -1 } : { createdAt: -1 };

    // 조회
    const products = await Product.find(searchQuery)
      .select('name description price tags thumbnail createdAt')
      .sort(sortOrder)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Product.countDocuments(searchQuery);

    res.json({
      products,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    next(error);
  }
});

// 상품 등록
router.post('/', async (req, res, next) => {
  try {
    validateProductData(req.body);
    const product = new Product(req.body);
    await product.save();
    res.status(HTTP_STATUS.CREATED).json(product);
  } catch (error) {
    next(error);
  }
});

// 상품 상세 조회
router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      throw new AppError(
        ERROR_MESSAGES.PRODUCT_NOT_FOUND,
        HTTP_STATUS.NOT_FOUND,
      );
    res.json(product);
  } catch (error) {
    next(error);
  }
});

// 상품 수정
router.patch('/:id', async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!product)
      throw new AppError(
        ERROR_MESSAGES.PRODUCT_NOT_FOUND,
        HTTP_STATUS.NOT_FOUND,
      );
    res.json(product);
  } catch (error) {
    next(error);
  }
});

// 상품 삭제
router.delete('/:id', async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product)
      throw new AppError(
        ERROR_MESSAGES.PRODUCT_NOT_FOUND,
        HTTP_STATUS.NOT_FOUND,
      );
    res.json({ message: '상품이 삭제되었습니다' });
  } catch (error) {
    next(error);
  }
});

export default router;
