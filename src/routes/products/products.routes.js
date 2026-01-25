import express from 'express';
import { productRepository } from '#repository';
import { HTTP_STATUS, ERROR_MESSAGE } from '#constants';
import { NotFoundException } from '#exceptions';
import { validate } from '#middlewares';
import {
  createProductSchema,
  idParamSchema,
  ListQuerySchema,
  updateProductSchema,
} from './products.schema.js';

export const productsRouter = express.Router();

//POST /products - 상품 등록
productsRouter.post(
  '/',
  validate('body', createProductSchema),
  async (req, res, next) => {
    try {
      const { name, description, price, tags } = req.body;

      const newProduct = await productRepository.createProduct({
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

//GET /products/:id - 특정 상품 조회
productsRouter.get(
  '/:id',
  validate('params', idParamSchema),
  async (req, res, next) => {
    try {
      const { id } = req.params;

      const product = await productRepository.findProductById(id);
      if (!product) {
        throw new NotFoundException(ERROR_MESSAGE.PRODUCT_NOT_FOUND);
      }

      res.status(HTTP_STATUS.OK).json(product);
    } catch (error) {
      next(error);
    }
  },
);

//PATCH /products/:id - 상품 수정
productsRouter.patch(
  '/:id',
  validate('params', idParamSchema),
  validate('body', updateProductSchema),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, description, price, tags } = req.body;

      const existingProduct = await productRepository.findProductById(id);
      if (!existingProduct) {
        throw new NotFoundException(ERROR_MESSAGE.PRODUCT_NOT_FOUND);
      }

      const updatedProduct = await productRepository.updateProduct(id, {
        name,
        description,
        price,
        tags,
      });
      res.status(HTTP_STATUS.OK).json(updatedProduct);
    } catch (error) {
      next(error);
    }
  },
);

// DELETE /products/:id - 상품 삭제
productsRouter.delete(
  '/:id',
  validate('params', idParamSchema),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const existingProduct = await productRepository.findProductById(id);
      if (!existingProduct) {
        throw new NotFoundException(ERROR_MESSAGE.PRODUCT_NOT_FOUND);
      }

      await productRepository.deleteProduct(id);
      res.sendStatus(HTTP_STATUS.NO_CONTENT);
    } catch (error) {
      next(error);
    }
  },
);

//GET /products - 상품 목록 조회
productsRouter.get(
  '/',
  validate('query', ListQuerySchema),
  async (req, res, next) => {
    try {
      const { page, pageSize, keyword } = req.query;
      const products = await productRepository.findProductsByFilter(
        Number(page),
        Number(pageSize),
        keyword,
      );
      res.status(HTTP_STATUS.OK).json(products);
    } catch (error) {
      next(error);
    }
  },
);
