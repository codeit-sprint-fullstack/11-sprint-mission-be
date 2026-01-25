import { ERROR_MESSAGE, HTTP_STATUS } from '#constants';
import { articleRepository } from '#repository';
import { asyncHandler } from '#utils';
import express from 'express';

export const articlesRouter = express.Router();

articlesRouter.get(
  '/',
  asyncHandler(async (req, res) => {
    const { page, limit, keyword } = req.query;
    const offset = page ? (Number(page) - 1) * Number(limit) : 0;

    const result = await articleRepository.findAllArticles({
      offset,
      limit: Number(limit) || 10,
      keyword,
    });

    res.status(HTTP_STATUS.OK).json(result);
  }),
);

articlesRouter.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const article = await articleRepository.findArticleById(id);

    if (!article) {
      return res
        .status(HTTP_STATUS.NOT_FOUND)
        .json({ error: ERROR_MESSAGE.ARTICLE_NOT_FOUND });
    }

    res.status(HTTP_STATUS.OK).json(article);
  }),
);

articlesRouter.post(
  '/',
  asyncHandler(async (req, res) => {
    const { title, content } = req.body;

    if (!title)
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ error: ERROR_MESSAGE.ARTICLE_TITLE_REQUIRED });
    if (!content)
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ error: ERROR_MESSAGE.ARTICLE_CONTENT_REQUIRED });

    const newArticle = await articleRepository.createArticle({
      title,
      content,
    });
    res.status(HTTP_STATUS.CREATED).json(newArticle);
  }),
);

articlesRouter.patch(
  '/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;

    const updatedArticle = await articleRepository.updateArticle(id, {
      title,
      content,
    });
    res.status(HTTP_STATUS.OK).json(updatedArticle);
  }),
);

articlesRouter.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    await articleRepository.deleteArticle(id);
    res.status(HTTP_STATUS.NO_CONTENT).send();
  }),
);
