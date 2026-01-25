import express from 'express';
import { productRepository } from '#repository';
import { HTTP_STATUS, ERROR_MESSAGE } from '#constants';
import { commentRepository } from '#repository';
import { validate } from '#middlewares';
import { NotFoundException } from '#exceptions';
import {
  cursorQuerySchema,
  createProductCommentSchema,
  productIdParamSchema,
} from './comments.schema.js';

export const productCommentsRouter = express.Router({
  mergeParams: true,
});

//POST products/:productId/comments - 특정 상품 댓글 등록
productCommentsRouter.post(
  '/',
  validate('body', createProductCommentSchema),
  async (req, res, next) => {
    try {
      const { content } = req.body;
      const { productId } = req.params;
      const newComment = await commentRepository.createProductComment(
        productId,
        { content },
      );
      res.status(HTTP_STATUS.CREATED).json(newComment);
    } catch (error) {
      next(error);
    }
  },
);

//GET /products/:productsId/comments - 특정 상품 댓글목록 조회
productCommentsRouter.get(
  '/',
  validate('params', productIdParamSchema),
  validate('query', cursorQuerySchema),
  async (req, res, next) => {
    try {
      const { productId } = req.params;
      const { limit, cursor } = req.query;

      const product = await productRepository.findProductById(productId);
      if (!product) {
        throw new NotFoundException(ERROR_MESSAGE.PRODUCT_NOT_FOUND);
      }

      const result = await commentRepository.findProductComments(
        productId,
        Number(limit),
        cursor,
      );

      res.status(HTTP_STATUS.OK).json(result);
    } catch (error) {
      next(error);
    }
  },
);
