import express from 'express';
import { ERROR_MESSAGE, HTTP_STATUS } from '#constants';
import { validate } from '#middlewares';
import { articleRepository } from '#repository';
import { checkExists } from '#utils';
import {
  articleIdParamSchema,
  createArticleSchema,
  updateArticleSchema,
} from './articles.schema.js';
import {
  paginationQuerySchema,
  searchQuerySchema,
} from '../common/common.schema.js';

export const articlesRouter = express.Router();

// GET /api/ariticles - 전체 게시글 목록 조회 ( 페이지네이션 )
articlesRouter.get(
  '/',
  validate('query', paginationQuerySchema),
  async (req, res, next) => {
    try {
      const { page = 1, limit = 10 } = req.query;
      // 검색어 없이 전체 목록 조회
      const articles = await articleRepository.getArticles({
        undefined,
        page,
        limit,
      });
      res.status(HTTP_STATUS.OK).json({ articles });
    } catch (error) {
      next(error);
    }
  },
);

// GET /api/ariticles/search?q={검색어}&page={번호}&limit={개수} - 게시글 목록 조회 ( 쿼리 + 페이지네이션 )
// 요청 예시: /api/articles/search?q=아이폰&page=1&limit=10
articlesRouter.get(
  '/search',
  validate('query', paginationQuerySchema),
  validate('query', searchQuerySchema),
  async (req, res, next) => {
    try {
      const { q: search, page = 1, limit = 10 } = req.query;

      const articles = await articleRepository.getArticles({
        search,
        page,
        limit,
      });
      res.status(HTTP_STATUS.OK).json({ articles });
    } catch (error) {
      next(error);
    }
  },
);

// GET /api/ariticles/:id - 특정 게시글 조회
articlesRouter.get(
  '/:id',
  validate('params', articleIdParamSchema),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const article = await articleRepository.findArticleById(id);

      const existingArticle = await articleRepository.findArticleById(id);
      checkExists(existingArticle, ERROR_MESSAGE.ARTICLE_NOT_FOUND);

      res.status(HTTP_STATUS.OK).json(article);
    } catch (error) {
      next(error);
    }
  },
);

// POST /api/ariticles - 새 게시글 등록
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

// PATCH /api/ariticles/:id - 게시글 수정
articlesRouter.patch(
  '/:id',
  validate('params', articleIdParamSchema),
  validate('body', updateArticleSchema),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { title, content } = req.body;

      const existingArticle = await articleRepository.findArticleById(id);
      checkExists(existingArticle, ERROR_MESSAGE.ARTICLE_NOT_FOUND);

      const updateArticle = await articleRepository.updateArticle(id, {
        title,
        content,
      });

      res.status(HTTP_STATUS.OK).json(updateArticle);
    } catch (error) {
      next(error);
    }
  },
);

// DELETE /api/ariticles/:id - 게시글 삭제
articlesRouter.delete(
  '/:id',
  validate('params', articleIdParamSchema),
  async (req, res, next) => {
    try {
      const { id } = req.params;

      const existingArticle = await articleRepository.findArticleById(id);
      checkExists(existingArticle, ERROR_MESSAGE.ARTICLE_NOT_FOUND);

      await articleRepository.deleteArticle(id);
      res.sendStatus(HTTP_STATUS.NO_CONTENT);
    } catch (error) {
      next(error);
    }
  },
);
