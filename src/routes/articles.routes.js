import express from 'express';
import { articleRepository, articleCommentRepository } from '#repository';
import { HTTP_STATUS, ERROR_MESSAGE } from '#constants';

export const articlesRouter = express.Router();

articlesRouter.get('/search', async (req, res) => {
  const { q: search } = req.query;

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const result = await articleRepository.searchArticlesWithPagination(
    search,
    page,
    limit,
  );
  res.json(result);
});

articlesRouter.post('/', async (req, res) => {
  const { title, content } = req.body;

  if (!title) {
    return res
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({ error: ERROR_MESSAGE.TITLE_REQUIRED });
  }

  if (!content) {
    return res
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({ error: ERROR_MESSAGE.CONTENT_REQUIRED });
  }

  const newArticle = await articleRepository.createArticle({
    title,
    content,
  });

  res.status(HTTP_STATUS.CREATED).json(newArticle);
});

articlesRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  const article = await articleRepository.findArticleById(id);

  if (!article) {
    return res
      .status(HTTP_STATUS.NOT_FOUND)
      .json({ error: ERROR_MESSAGE.ARTICLE_NOT_FOUND });
  }

  res.json(article);
});

articlesRouter.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  const updatedArticle = await articleRepository.updateArticle(id, {
    title,
    content,
  });
  res.json(updatedArticle);
});

articlesRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;

  await articleRepository.deleteArticle(id);

  res.status(HTTP_STATUS.NO_CONTENT).send();
});

/* <--- comments ---> */

articlesRouter.post('/:id/comments', async (req, res) => {
  const { id: articleId } = req.params;
  const { content } = req.body;

  if (!content) {
    return res
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({ error: ERROR_MESSAGE.CONTENT_REQUIRED });
  }

  const newComment = await articleCommentRepository.createArticleComment(
    articleId,
    content,
  );

  res.status(HTTP_STATUS.CREATED).json(newComment);
});

articlesRouter.patch('/:id/comments/:commentId', async (req, res) => {
  const { commentId } = req.params;
  const { content } = req.body;

  if (!content) {
    return res
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({ error: ERROR_MESSAGE.CONTENT_REQUIRED });
  }

  const updatedComment = await articleCommentRepository.updateArticleComment(
    commentId,
    content,
  );
  res.status(HTTP_STATUS.OK).json(updatedComment);
});

articlesRouter.delete('/:id/comments/:commentId', async (req, res) => {
  const { commentId } = req.params;

  await articleCommentRepository.deleteArticleComment(commentId);

  res.status(HTTP_STATUS.NO_CONTENT).send();
});

articlesRouter.get('/:id/comments', async (req, res) => {
  const { id: articleId } = req.params;
  const { cursor, take = 10 } = req.query;

  const rows =
    await articleCommentRepository.searchArticleCommentsWithPagination(
      articleId,
      cursor,
      take,
    );

  const hasNext = rows.length > Number(take);
  const comments = hasNext ? rows.slice(0, Number(take)) : rows;
  const nextCursor = hasNext ? comments[comments.length - 1].id : null;

  res.status(HTTP_STATUS.OK).json({
    comments,
    nextCursor,
    hasNext,
  });
});
