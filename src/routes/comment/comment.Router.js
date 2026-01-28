import express from 'express';
import { commentRepository } from '../../repository/commentRepository.js';
import { HTTP_STATUS, ERROR_MESSAGE } from '../../constants/index.js';
import { BadRequestException } from '../../exceptions/BadRequsetException.js';
import { NotFoundException } from '../../exceptions/NotFoundException.js';

export const commentsRouter = express.Router();

// 1. 자유게시판 댓글 등록
commentsRouter.post('/articles/:articleId', async (req, res, next) => {
  try {
    const { content } = req.body;
    const { articleId } = req.params;
    if (!content) throw new BadRequestException(ERROR_MESSAGE.INVALID_INPUT);

    const comment = await commentRepository.createComment({
      content,
      articleId,
    });
    res.status(HTTP_STATUS.CREATED).json(comment);
  } catch (error) {
    next(error);
  }
});

// 2. 중고마켓 댓글 등록
commentsRouter.post('/products/:productId', async (req, res, next) => {
  try {
    const { content } = req.body;
    const { productId } = req.params;
    if (!content) throw new BadRequestException(ERROR_MESSAGE.INVALID_INPUT);

    const comment = await commentRepository.createComment({
      content,
      productId,
    });
    res.status(HTTP_STATUS.CREATED).json(comment);
  } catch (error) {
    next(error);
  }
});

// 3. 자유게시판 댓글 목록 조회 (Cursor 방식)
commentsRouter.get('/articles/:articleId', async (req, res, next) => {
  try {
    const { cursor, limit = 10 } = req.query;
    const comments = await commentRepository.findAllComments({
      articleId: req.params.articleId,
      cursor,
      take: Number(limit),
    });
    res.status(HTTP_STATUS.OK).json(comments);
  } catch (error) {
    next(error);
  }
});

// 4. 중고마켓 댓글 목록 조회 (Cursor 방식)
commentsRouter.get('/products/:productId', async (req, res, next) => {
  try {
    const { cursor, limit = 10 } = req.query;
    const comments = await commentRepository.findAllComments({
      productId: req.params.productId,
      cursor,
      take: Number(limit),
    });
    res.status(HTTP_STATUS.OK).json(comments);
  } catch (error) {
    next(error);
  }
});

// 5. 댓글 수정 (PATCH)
commentsRouter.patch('/:id', async (req, res, next) => {
  try {
    const exists = await commentRepository.findCommentById(req.params.id);
    if (!exists) throw new NotFoundException(ERROR_MESSAGE.RESOURCE_NOT_FOUND);

    const comment = await commentRepository.updateComment(
      req.params.id,
      req.body,
    );
    res.status(HTTP_STATUS.OK).json(comment);
  } catch (error) {
    next(error);
  }
});

// 6. 댓글 삭제
commentsRouter.delete('/:id', async (req, res, next) => {
  try {
    const exists = await commentRepository.findCommentById(req.params.id);
    if (!exists) throw new NotFoundException(ERROR_MESSAGE.RESOURCE_NOT_FOUND);

    await commentRepository.deleteComment(req.params.id);
    res.status(HTTP_STATUS.NO_CONTENT).send();
  } catch (error) {
    next(error);
  }
});
