import express from 'express';
import { commentRepository } from '#repository';
import { BadRequestException } from '../../errors/badRequestException.js';
import { validateUUID } from '../../util/validate.js';

export const commentRouter = express.Router();

// GET /comment/:articleId - 특정 게시글의 댓글 목록 조회 (커서 기반 페이지네이션)
commentRouter.get('/:articleId', async (req, res) => {
  const { articleId } = req.params;
  const { cursorId, take } = req.query;

  validateUUID(articleId);

  const comments = await commentRepository.getCommentsPage({
    articleId,
    cursorId,
    take,
  });

  res.json({ success: true, data: comments });
});

// POST /comment/:articleId - 댓글 등록
commentRouter.post('/:articleId', async (req, res) => {
  const { articleId } = req.params;
  const { content } = req.body;

  validateUUID(articleId);

  if (!content) {
    throw new BadRequestException('content는 필수입니다.');
  }

  const comment = await commentRepository.createComment({ articleId, content });

  res.status(201).json({
    success: true,
    data: comment,
    message: '댓글이 등록되었습니다.',
  });
});

// PATCH /comment/:id - 댓글 수정
commentRouter.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  validateUUID(id);

  if (!content) {
    throw new BadRequestException('content는 필수입니다.');
  }

  const updatedComment = await commentRepository.updateCommnet(id, { content });

  res.json({ success: true, data: updatedComment });
});

// DELETE /comment/:id - 댓글 삭제
commentRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;

  validateUUID(id);
  const deletedComment = await commentRepository.deleteComment(id);

  res.json({
    success: true,
    message: '댓글이 삭제되었습니다.',
    data: deletedComment,
  });
});
