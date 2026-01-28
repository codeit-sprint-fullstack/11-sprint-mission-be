import express from 'express';
import { commentRepository } from '#repository';
import { HTTP_STATUS } from '#constants';
import { validate } from '#middlewares';
import { paginationQuerySchema } from '../../common/common.schema.js';
import { createCommentSchema } from '../../comments/comments.schema.js';
import { articleIdParamSchema } from '../articles.schema.js';

export const articleCommentsRouter = express.Router();

// GET /api/articles/:articleId/comments - 특정 게시글의 댓글 목록 조회
articleCommentsRouter.get(
  '/',
  validate('query', paginationQuerySchema),
  async (req, res, next) => {
    try {
      const { cursorId, limit } = req.query;

      const comments = await commentRepository.getArticleCommentsWithCursor({
        cursorId,
        limit,
      });

      res.status(HTTP_STATUS.OK).json(comments);
    } catch (error) {
      next(error);
    }
  },
);

// POST /api/articles/:articleId/comments - 특정 게시글의 댓글 등록
articleCommentsRouter.post(
  '/',
  validate('body', createCommentSchema),
  validate('params', articleIdParamSchema),
  async (req, res, next) => {
    try {
      const { content } = req.body;
      const { articleId } = req.params;

      const newComment = await commentRepository.createComment({
        content,
        articleId,
      });

      res.status(HTTP_STATUS.CREATED).json(newComment);
    } catch (error) {
      next(error);
    }
  },
);
