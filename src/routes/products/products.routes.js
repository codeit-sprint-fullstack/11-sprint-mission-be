import express from 'express';
import { HTTP_STATUS, ERROR_MESSAGE } from '#constants';
import { validate } from '#middlewares';
import { productsRepository } from '#repository';
import { checkExists } from '#utils';
import {
  paginationQuerySchema,
  searchQuerySchema,
} from '../common/common.schema.js';
import {
  createProductSchema,
  productIdParamSchema,
  updateProductSchema,
} from './products.schema.js';

export const productsRouter = express.Router();

// GET /api/products - 전체 상품 목록 조회 ( 페이지네이션 )
productsRouter.get(
  '/',
  validate('query', paginationQuerySchema),
  async (req, res, next) => {
    try {
      const { page = 1, limit = 10 } = req.query;
      // 검색어 없이 전체 목록 조회
      const products = await productsRepository.getProducts({
        undefined,
        page,
        limit,
      });
      res.status(HTTP_STATUS.OK).json({ products });
    } catch (error) {
      next(error);
    }
  },
);

// GET /api/products/search?q={검색어}&page={번호}&limit={개수} - 상품 목록 조회 ( 쿼리 + 페이지네이션 )
// 요청 예시: /api/products?q=노트북&page=1&limit=10
productsRouter.get(
  '/search',
  validate('query', paginationQuerySchema),
  validate('query', searchQuerySchema),
  async (req, res, next) => {
    try {
      const { q: search, page = 1, limit = 10 } = req.query;

      const products = await productsRepository.getProducts({
        search,
        page,
        limit,
      });
      res.status(HTTP_STATUS.OK).json({ products });
    } catch (error) {
      next(error);
    }
  },
);

// GET /api/products/:id - 상품 상세 조회
productsRouter.get(
  '/:id',
  validate('params', productIdParamSchema),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await productsRepository.findProductById(id);

      const existingProduct = await productsRepository.findProductById(id);
      checkExists(existingProduct, ERROR_MESSAGE.PRODUCT_NOT_FOUND);

      res.status(HTTP_STATUS.OK).json(product);
    } catch (error) {
      next(error);
    }
  },
);

// POST /api/products - 새 상품 등록
productsRouter.post(
  '/',
  validate('body', createProductSchema),
  async (req, res, next) => {
    try {
      const { name, description, price, tags } = req.body;

      const newProduct = await productsRepository.createProduct({
        name,
        description,
        price,
        tags,
      });

      res.status(HTTP_STATUS.CREATED).json(newProduct);
    } catch (error) {
      next(error);
    }
  },
);

// PATCH /api/products/:id - 상품 정보 수정
productsRouter.patch(
  '/:id',
  validate('params', productIdParamSchema),
  validate('body', updateProductSchema),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, description, price, tags } = req.body;

      const existingProduct = await productsRepository.findProductById(id);
      checkExists(existingProduct, ERROR_MESSAGE.PRODUCT_NOT_FOUND);

      const updateProduct = await productsRepository.updateProduct(id, {
        name,
        description,
        price,
        tags,
      });

      res.status(HTTP_STATUS.OK).json(updateProduct);
    } catch (error) {
      next(error);
    }
  },
);

// DELETE /api/products/:id - 상품 삭제
productsRouter.delete(
  '/:id',
  validate('params', productIdParamSchema),
  async (req, res, next) => {
    try {
      const { id } = req.params;

      const existingProduct = await productsRepository.findProductById(id);
      checkExists(existingProduct, ERROR_MESSAGE.PRODUCT_NOT_FOUND);

      await productsRepository.deleteProduct(id);
      res.sendStatus(HTTP_STATUS.NO_CONTENT);
    } catch (error) {
      next(error);
    }
  },
);
