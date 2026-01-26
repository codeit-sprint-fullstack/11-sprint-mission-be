import express from 'express';
import { articleRepository } from '#repository';
import { HTTP_STATUS, ERROR_MESSAGE } from '#constants';
import { NotFoundException } from '#exceptions';
import { validate } from '#middlewares';
import {
  createArticleSchema,
  idParamSchema,
  ListQuerySchema,
  updateArticleSchema,
} from './articles.schema.js';

export const articlesRouter = express.Router();

//POST /articles - 게시글 등록
articlesRouter.post(
  '/',
  validate('body', createArticleSchema),
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

//GET /articles/:id - 게시글 조회
articlesRouter.get(
  '/:id',
  validate('params', idParamSchema),
  async (req, res, next) => {
    try {
      const { id } = req.params;

      const article = await articleRepository.findArticleById(id);
      if (!article) {
        throw new NotFoundException(ERROR_MESSAGE.ARTICLE_NOT_FOUND);
      }

      res.status(HTTP_STATUS.OK).json(article);
    } catch (error) {
      next(error);
    }
  },
);

//PATCH/ /articles/:id - 게시글 수정
articlesRouter.patch(
  '/:id',
  validate('params', idParamSchema),
  validate('body', updateArticleSchema),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { title, content } = req.body;

      const existingArticle = await articleRepository.findArticleById(id);
      if (!existingArticle) {
        throw new NotFoundException(ERROR_MESSAGE.ARTICLE_NOT_FOUND);
      }

      const updatedArticle = await articleRepository.updateArticle(id, {
        title,
        content,
      });
      res.status(HTTP_STATUS.OK).json(updatedArticle);
    } catch (error) {
      next(error);
    }
  },
);

// DELETE /api/articles/:id - 게시글 삭제
articlesRouter.delete(
  '/:id',
  validate('params', idParamSchema),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const existingArticle = await articleRepository.findArticleById(id);
      if (!existingArticle) {
        throw new NotFoundException(ERROR_MESSAGE.ARTICLE_NOT_FOUND);
      }

      await articleRepository.deleteArticle(id);
      res.sendStatus(HTTP_STATUS.NO_CONTENT);
    } catch (error) {
      next(error);
    }
  },
);

//GET /api/articles - 게시글 목록 조회
articlesRouter.get(
  '/',
  validate('query', ListQuerySchema),
  async (req, res, next) => {
    try {
      const { page, pageSize, keyword } = req.query;
      const articles = await articleRepository.findArticlesByFilter(
        Number(page),
        Number(pageSize),
        keyword,
      );
      res.status(HTTP_STATUS.OK).json(articles);
    } catch (error) {
      next(error);
    }
  },
);
