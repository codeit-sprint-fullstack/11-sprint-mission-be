import express from 'express';
import { commentRepository } from '#repository';
import { HTTP_STATUS } from '#constants';
import { validate } from '#middlewares';
import { paginationQuerySchema } from '../../common/common.schema.js';
import { createCommentSchema } from '../../comments/comments.schema.js';
import { productIdParamSchema } from '../products.schema.js';

export const productCommentsRouter = express.Router();

// GET /api/products/:productId/comments - 특정 상품의 댓글 목록 조회
productCommentsRouter.get(
  '/',
  validate('query', paginationQuerySchema),
  async (req, res, next) => {
    try {
      const { cursorId, limit } = req.query;

      const comments = await commentRepository.getProductCommentsWithCursor({
        cursorId,
        limit,
      });

      res.status(HTTP_STATUS.OK).json(comments);
    } catch (error) {
      next(error);
    }
  },
);

// POST /api/products/:productId/comments - 특정 상품의 댓글 등록
productCommentsRouter.post(
  '/',
  validate('body', createCommentSchema),
  validate('params', productIdParamSchema),
  async (req, res, next) => {
    try {
      const { content } = req.body;
      const { productId } = req.params;

      const newComment = await commentRepository.createComment({
        content,
        productId,
      });

      res.status(HTTP_STATUS.CREATED).json(newComment);
    } catch (error) {
      next(error);
    }
  },
);
