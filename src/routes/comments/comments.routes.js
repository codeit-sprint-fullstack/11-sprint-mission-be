import express from 'express';
import { commentRepository } from '#repository';
import { ERROR_MESSAGE, HTTP_STATUS } from '#constants';
import { checkExists } from '#utils';
import { validate } from '#middlewares';
import {
  commentIdParamSchema,
  updateCommentSchema,
} from './comments.schema.js';

export const commentsRouter = express.Router();

// PATCH /api/comments/:id - 댓글 수정
commentsRouter.patch(
  '/:id',
  validate('params', commentIdParamSchema),
  validate('body', updateCommentSchema),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { content } = req.body;

      const existingComment = await commentRepository.findCommentById(id);
      checkExists(existingComment, ERROR_MESSAGE.COMMENT_NOT_FOUND);

      const updateComment = await commentRepository.updateComment(id, {
        content,
      });

      res.status(HTTP_STATUS.OK).json(updateComment);
    } catch (error) {
      next(error);
    }
  },
);

// DELETE /api/comments/:id - 댓글 삭제
commentsRouter.delete(
  '/:id',
  validate('params', commentIdParamSchema),
  async (req, res, next) => {
    try {
      const { id } = req.params;

      const existingComment = await commentRepository.findCommentById(id);
      checkExists(existingComment, ERROR_MESSAGE.COMMENT_NOT_FOUND);

      await commentRepository.deleteComment(id);
      res.sendStatus(HTTP_STATUS.NO_CONTENT);
    } catch (error) {
      next(error);
    }
  },
);
