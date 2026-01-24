import express from 'express';
import { articleRepository } from '#repository';
import { HTTP_STATUS, ERROR_MESSAGE } from '#constants';
import { commentRepository } from '#repository';
import { validate } from '#middlewares';
import { idParamSchema } from '../articles.schema.js';
import { NotFoundException } from '#exceptions';
import { cursorQuerySchema, createArticleCommentSchema } from './comments.schema.js';

export const articleCommentsRouter = express.Router({
  mergeParams: true,
});

//POST /api/articles - 특정 게시글 댓글 등록
articleCommentsRouter.post(
  '/',
  validate('body', createArticleCommentSchema),
  async (req, res, next) => {
    try {
      const { title, content } = req.body;

      const newArticle = await articleRepository.createArticle({
        title,
        content,
      });

      res.status(HTTP_STATUS.CREATED).json(newArticle);
    } catch (error) {
      next(error);
    }
  },
);


//GET /api/articles/:id/comments - 특정 게시글 댓글목록 조회
articleCommentsRouter.get(
  '/',
  validate('params', idParamSchema),
  validate('query', cursorQuerySchema),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { limit, cursor } = req.query;

      const article = await articleRepository.findArticleById(id);
      if (!article) {
        throw new NotFoundException(ERROR_MESSAGE.ARTICLE_NOT_FOUND);
      }
    
      const result = await commentRepository.findArticleComment(
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

