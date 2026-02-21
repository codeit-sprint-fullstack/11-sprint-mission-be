import express from 'express';
import * as productRepository from '../../repository/product.Repository.js';
import { HTTP_STATUS } from '../../constants/http-status.js';
import { BadRequestException } from '../../exceptions/BadRequsetException.js';
import { NotFoundException } from '../../exceptions/NotFoundException.js';
import { ERROR_MESSAGE } from '../../constants/errors.js';

export const productsRouter = express.Router();

// 1. 상품 등록 API
productsRouter.post('/', async (req, res, next) => {
  try {
    const { name, description, price } = req.body;

    if (!name || !description || price === undefined) {
      throw new BadRequestException(ERROR_MESSAGE.INVALID_INPUT);
    }
    const product = await productRepository.createProduct(req.body);
    res.status(HTTP_STATUS.CREATED).json(product);
  } catch (error) {
    next(error);
  }
});

// 2. 상품 목록 조회 API (페이지네이션, 정렬, 검색)
productsRouter.get('/', async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 10,
      orderBy = 'recent',
      keyword = '',
    } = req.query;

    if (Number(page) < 1 || Number(limit) < 1) {
      throw new BadRequestException(ERROR_MESSAGE.INVALID_INPUT);
    }

    const products = await productRepository.findAllProducts({
      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit),
      orderBy,
      keyword,
    });

    res.status(HTTP_STATUS.OK).json(products);
  } catch (error) {
    next(error);
  }
});

// 3. 상품 상세 조회 API
productsRouter.get('/:id', async (req, res, next) => {
  try {
    const product = await productRepository.findProductById(req.params.id);

    if (!product) {
      throw new NotFoundException(ERROR_MESSAGE.RESOURCE_NOT_FOUND);
    }

    res.status(HTTP_STATUS.OK).json(product);
  } catch (error) {
    next(error);
  }
});

// 4. 상품 수정 API (PATCH)
productsRouter.patch('/:id', async (req, res, next) => {
  try {
    const exists = await productRepository.findProductById(req.params.id);
    if (!exists) {
      throw new NotFoundException(ERROR_MESSAGE.RESOURCE_NOT_FOUND);
    }
    const product = await productRepository.updateProduct(
      req.params.id,
      req.body,
    );
    res.status(HTTP_STATUS.OK).json(product);
  } catch (error) {
    next(error);
  }
});

// 5. 상품 삭제 API
productsRouter.delete('/:id', async (req, res, next) => {
  try {
    const exists = await productRepository.findProductById(req.params.id);
    if (!exists) {
      throw new NotFoundException(ERROR_MESSAGE.RESOURCE_NOT_FOUND);
    }
    await productRepository.deleteProduct(req.params.id);
    res.status(HTTP_STATUS.NO_CONTENT).send();
  } catch (error) {
    next(error);
  }
});
