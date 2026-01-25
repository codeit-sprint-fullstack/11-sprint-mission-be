import express from 'express';
import { articleCommentRepository } from '#repository';
import { asyncHandler } from '#utils';
import { HTTP_STATUS, ERROR_MESSAGE } from '#constants';

export const articleCommentsRouter = express.Router();

// GET /api/articles/:articleId/comments - 게시글별 댓글 목록 조회 (Cursor 페이징)
articleCommentsRouter.get(
  '/:articleId/comments',
  asyncHandler(async (req, res) => {
    const { articleId } = req.params;
    const { cursor, limit } = req.query;

    const comments = await articleCommentRepository.findAllCommentsByArticleId(
      articleId,
      {
        cursor,
        limit: Number(limit) || 10,
      },
    );

    res.status(HTTP_STATUS.OK).json({
      data: comments,
      nextCursor: comments.length > 0 ? comments[comments.length - 1].id : null,
    });
  }),
);

// POST /api/articles/:articleId/comments - 댓글 등록
articleCommentsRouter.post(
  '/:articleId/comments',
  asyncHandler(async (req, res) => {
    const { articleId } = req.params;
    const { content } = req.body;

    if (!content)
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ error: ERROR_MESSAGE.COMMENT_CONTENT_REQUIRED });

    const newComment = await articleCommentRepository.createArticleComment(
      articleId,
      content,
    );
    res.status(HTTP_STATUS.CREATED).json(newComment);
  }),
);

// PATCH /api/comments/article/:id - 댓글 수정
articleCommentsRouter.patch(
  '/article/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;

    const updatedComment = await articleCommentRepository.updateArticleComment(
      id,
      content,
    );
    res.status(HTTP_STATUS.OK).json(updatedComment);
  }),
);

// DELETE /api/comments/article/:id - 댓글 삭제
articleCommentsRouter.delete(
  '/article/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    await articleCommentRepository.deleteArticleComment(id);
    res.status(HTTP_STATUS.NO_CONTENT).send();
  }),
);
