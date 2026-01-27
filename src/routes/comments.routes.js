import express from 'express';
import { prisma } from '#db/prisma.js';

export const commentsRouter = express.Router();

//PATCH /comments/:id
commentsRouter.patch('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    if (content === undefined) {
      return res.status(400).json({ message: 'content가 없습니다.' });
    }

    const exists = await prisma.comment.findUnique({
      where: { id: id },
      select: { id: true },
    });

    if (!exists) {
      return res.status(404).json({ message: '댓글이 존재하지 않습니다.' });
    }

    const updated = await prisma.comment.update({
      where: { id },
      data: {
        ...(content !== undefined ? { content } : {}),
      },
      select: {
        id: true,
        content: true,
        createdAt: true,
      },
    });

    return res.status(200).json(updated);
  } catch (error) {
    console.error('error: ', error);
    next(error);
  }
});

//DELETE /comments/:id
commentsRouter.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    const exists = await prisma.comment.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!exists) {
      return res.status(404).json({ message: '댓글이 존재하지 않습니다.' });
    }

    await prisma.comment.delete({
      where: { id },
    });

    return res.status(204).send();
  } catch (error) {
    console.error('error: ', error);
    next(error);
  }
});
