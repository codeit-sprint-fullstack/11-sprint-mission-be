import express from 'express';
import { articleRepository } from '#repository';
import { HTTP_STATUS, ERROR_MESSAGE } from '#constants';
import { commentRepository } from '#repository';
import { validate } from '#middlewares';
import { NotFoundException } from '#exceptions';
import { 
  cursorQuerySchema, 
  createArticleCommentSchema, 
  articleIdParamSchema 
} from './comments.schema.js';

export const articleCommentsRouter = express.Router({
  mergeParams: true,
});

//POST products/:articleId/comments - 특정 게시글 댓글 등록
articleCommentsRouter.post(
  '/',
  validate('body', createArticleCommentSchema),
  async (req, res, next) => {
    try {
      const { content } = req.body;
      const { articleId } = req.params;
      const newComment = await commentRepository.createArticleComment(
        articleId,
        { content },
    );
      res.status(HTTP_STATUS.CREATED).json(newComment);
    } catch (error) {
      next(error);
    }
  },
);


//GET articles/:articleId/comments - 특정 게시글 댓글목록 조회
articleCommentsRouter.get(
  '/',
  validate('params', articleIdParamSchema),
  validate('query', cursorQuerySchema),
  async (req, res, next) => {
    try {
      const { articleId } = req.params;
      const { limit, cursor } = req.query;

      const article = await articleRepository.findArticleById(articleId );
      if (!article) {
        throw new NotFoundException(ERROR_MESSAGE.ARTICLE_NOT_FOUND);
      }
    
      const result = await commentRepository.findArticleComments(
        articleId, 
        Number(limit),
        cursor,
      );
      
      res.status(HTTP_STATUS.OK).json(result);
    } catch (error) {
      next(error);
    }
  },
);

