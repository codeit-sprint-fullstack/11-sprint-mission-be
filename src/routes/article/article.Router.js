import express from 'express';

import { HTTP_STATUS, ERROR_MESSAGE } from '../../constants/index.js';
import { BadRequestException } from '../../exceptions/BadRequsetException.js';
import { NotFoundException } from '../../exceptions/NotFoundException.js';
import { articleRepository } from '../../repository/articleRepository.js';

export const articlesRouter = express.Router();

// 1. 게시글 등록 - title, content를 입력해 게시글을 등록합니다.
articlesRouter.post('/', async (req, res, next) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      throw new BadRequestException(ERROR_MESSAGE.INVALID_INPUT);
    }
    const article = await articleRepository.createArticle({ title, content });
    res.status(HTTP_STATUS.CREATED).json(article);
  } catch (error) {
    next(error);
  }
});

// 2. 게시글 목록 조회 (검색, 정렬, 페이지네이션)
// id, title, content, createdAt를 조회합니다.
// offset 방식의 페이지네이션 기능을 포함해 주세요.
// 최신순(recent)으로 정렬할 수 있습니다.
// title, content에 포함된 단어로 검색할 수 있습니다.
articlesRouter.get('/', async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 10,
      orderBy = 'recent',
      keyword = '',
    } = req.query;
    if (Number(page) < 1)
      throw new BadRequestException(ERROR_MESSAGE.INVALID_INPUT);

    const articles = await articleRepository.findAllArticles({
      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit),
      orderBy,
      keyword,
    });
    res.status(HTTP_STATUS.OK).json(articles);
  } catch (error) {
    next(error);
  }
});

// 3. 게시글 상세 조회
articlesRouter.get('/:id', async (req, res, next) => {
  try {
    const article = await articleRepository.findArticleById(req.params.id);
    if (!article) throw new NotFoundException(ERROR_MESSAGE.RESOURCE_NOT_FOUND);
    res.status(HTTP_STATUS.OK).json(article);
  } catch (error) {
    next(error);
  }
});

// 4. 게시글 수정
articlesRouter.patch('/:id', async (req, res, next) => {
  try {
    const exists = await articleRepository.findArticleById(req.params.id);
    if (!exists) throw new NotFoundException(ERROR_MESSAGE.RESOURCE_NOT_FOUND);

    const article = await articleRepository.updateArticle(
      req.params.id,
      req.body,
    );
    res.status(HTTP_STATUS.OK).json(article);
  } catch (error) {
    next(error);
  }
});

// 5. 게시글 삭제
articlesRouter.delete('/:id', async (req, res, next) => {
  try {
    const exists = await articleRepository.findArticleById(req.params.id);
    if (!exists) throw new NotFoundException(ERROR_MESSAGE.RESOURCE_NOT_FOUND);

    await articleRepository.deleteArticle(req.params.id);
    res.status(HTTP_STATUS.NO_CONTENT).send();
  } catch (error) {
    next(error);
  }
});
