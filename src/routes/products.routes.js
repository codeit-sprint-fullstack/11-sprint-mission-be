import express from 'express';
import { productCommentRepository } from "#repository";
import { HTTP_STATUS, ERROR_MESSAGE } from "#constants";

export const productsRouter = express.Router();


productsRouter.post('/:id/comments', async (req, res) => {
  const { id: productId } = req.params;
  const { content } = req.body;

  if (!content) {
    return res
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({ error: ERROR_MESSAGE.CONTENT_REQUIRED });
  }

  const newComment = await productCommentRepository.createProductComment(
    productId,
    content,
  );

  res.status(HTTP_STATUS.CREATED).json(newComment);
});

productsRouter.patch('/:id/comments/:commentId', async (req, res) => {
  const { commentId } = req.params;
  const { content } = req.body;

  if (!content) {
    return res
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({ error: ERROR_MESSAGE.CONTENT_REQUIRED });
  }

  const updatedComment = await productCommentRepository.updateProductComment(
    commentId,
    content,
  );
  res.status(HTTP_STATUS.OK).json(updatedComment);
});

productsRouter.delete('/:id/comments/:commentId', async (req, res) => {
  const { commentId } = req.params;

  await productCommentRepository.deleteProductComment(commentId);

  res.status(HTTP_STATUS.NO_CONTENT).send();
});

productsRouter.get('/:id/comments', async (req, res) => {
  const { id: productId } = req.params;
  const { cursor, take = 10 } = req.query;

  const rows =
    await productCommentRepository.searchProductCommentsWithPagination(
      productId,
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
