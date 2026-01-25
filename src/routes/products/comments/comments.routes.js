import express from 'express';
import { productRepository } from '#repository';
import { HTTP_STATUS, ERROR_MESSAGE } from '#constants';
import { commentRepository } from '#repository';
import { validate } from '#middlewares';
import { NotFoundException } from '#exceptions';
import { cursorQuerySchema, createProductCommentSchema } from './comments.schema.js';
import { idParamSchema } from '../products.schema.js';

export const productCommentsRouter = express.Router({
  mergeParams: true,
});

//POST /api/articles - 특정 게시글 댓글 등록
productCommentsRouter.post(
  '/',
  validate('body', createProductCommentSchema),
  async (req, res, next) => {
    try {
      const { content } = req.body;

      const newComment = await commentRepository.createProductComment({
        content,
      });

      res.status(HTTP_STATUS.CREATED).json(newComment);
    } catch (error) {
      next(error);
    }
  },
);


//GET /api/articles/:id/comments - 특정 게시글 댓글목록 조회
productCommentsRouter.get(
  '/',
  validate('params', idParamSchema),
  validate('query', cursorQuerySchema),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { limit, cursor } = req.query;

      const product = await productRepository.findProductById(id);
      if (!product) {
        throw new NotFoundException(ERROR_MESSAGE.PRODUCT_NOT_FOUND);
      }
    
      const result = await commentRepository.findProductComments(
        id,
        limit,
        cursor,
      );
      
      res.status(HTTP_STATUS.OK).json(result);
    } catch (error) {
      next(error);
    }
  },
);

