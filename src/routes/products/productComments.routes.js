import express from 'express';
import { productCommentRepository } from '#repository';
import { asyncHandler } from '#utils';
import { HTTP_STATUS, ERROR_MESSAGE } from '#constants';

export const productCommentsRouter = express.Router();

// GET /api/products/:productId/comments - 상품별 댓글 목록 조회 (Cursor 페이징)
productCommentsRouter.get(
  '/:productId/comments',
  asyncHandler(async (req, res) => {
    const { productId } = req.params;
    const { cursor, limit } = req.query;

    const comments = await productCommentRepository.findAllCommentsByProductId(
      productId,
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

// POST /api/products/:productId/comments - 상품 댓글 등록
productCommentsRouter.post(
  '/:productId/comments',
  asyncHandler(async (req, res) => {
    const { productId } = req.params;
    const { content } = req.body;

    if (!content)
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ error: ERROR_MESSAGE.COMMENT_CONTENT_REQUIRED });

    const newComment = await productCommentRepository.createProductComment(
      productId,
      content,
    );
    res.status(HTTP_STATUS.CREATED).json(newComment);
  }),
);

// PATCH /api/comments/product/:id - 댓글 수정
productCommentsRouter.patch(
  '/product/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;

    const updatedComment = await productCommentRepository.updateProductComment(
      id,
      content,
    );
    res.status(HTTP_STATUS.OK).json(updatedComment);
  }),
);

// DELETE /api/comments/product/:id - 댓글 삭제
productCommentsRouter.delete(
  '/product/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    await productCommentRepository.deleteProductComment(id);
    res.status(HTTP_STATUS.NO_CONTENT).send();
  }),
);
