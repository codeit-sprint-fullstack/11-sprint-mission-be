import express from 'express';
import { commentRepository } from '#repository';
import { HTTP_STATUS, ERROR_MESSAGE } from '#constants';
import { NotFoundException } from '#exceptions';
import { validate } from '#middlewares';
import { idParamSchema, updateCommentSchema } from './comments.schema.js';

export const commentsRouter = express.Router();

//PATCH/ comments/:id - 게시글 수정
commentsRouter.patch(
  '/:id',
  validate('params', idParamSchema),
  validate('body', updateCommentSchema),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { content } = req.body;

      const existingComment = await commentRepository.findCommentById(id);
      if (!existingComment) {
        throw new NotFoundException(ERROR_MESSAGE.COMMENT_NOT_FOUND);
      }

      const updatedComment = await commentRepository.updateComment(id, {
        content,
      });
      res.status(HTTP_STATUS.OK).json(updatedComment);
    } catch (error) {
      next(error);
    }
  },
);

// DELETE /comments/:id - 게시글 삭제
commentsRouter.delete(
  '/:id',
  validate('params', idParamSchema),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const existingComment = await commentRepository.findCommentById(id);
      if (!existingComment) {
        throw new NotFoundException(ERROR_MESSAGE.COMMENT_NOT_FOUND);
      }

      await commentRepository.deleteComment(id);
      res.sendStatus(HTTP_STATUS.NO_CONTENT);
    } catch (error) {
      next(error);
    }
  },
);