import express from 'express';
import { prisma } from '#db/prisma.js';

export const articleCommentsRouter = express.Router({ mergeParams: true });

//POST /articles/:articleId/comments - 자유게시판 댓글 작성
articleCommentsRouter.post('/', async (req, res, next) => {
  try {
    const { articleId } = req.params;
    const { content } = req.body;
    const article = await prisma.article.findUnique({
      where: { id: articleId },
      select: { id: true },
    });

    if (!content) {
      return res.status(400).json({ message: 'content가 없습니다.' });
    }
    if (!article) {
      return res
        .status(404)
        .json({ message: '요청한 게시물이 존재하지 않습니다.' });
    }

    const comment = await prisma.comment.create({
      data: { content, articleId },
      select: {
        id: true,
        content: true,
        createdAt: true,
      },
    });

    return res.status(201).json(comment);
  } catch (error) {
    console.error('error: ', error);
    next(error);
  }
});

//GET /articles/:articleId/comments?cursor=...&limit=20
// 자유게시판 댓글 목록 조회 (cursor pagination)
articleCommentsRouter.get('/', async (req, res, next) => {
  try {
    const { articleId } = req.params;
    const limit = Number(req.query.limit ?? 10);
    const cursor = req.query.cursor ? String(req.query.cursor) : null;

    const article = await prisma.article.findUnique({
      where: { id: articleId },
      select: { id: true },
    });

    if (!article) {
      return res
        .status(404)
        .json({ message: '요청한 게시물이 존재하지 않습니다.' });
    }

    const findArgs = {
      where: { articleId },
      orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
      take: limit + 1,
      select: {
        id: true,
        content: true,
        createdAt: true,
      },
    };

    if (cursor) {
      findArgs.cursor = { id: cursor };
      findArgs.skip = 1;
    }

    const rows = await prisma.comment.findMany(findArgs);
    const hasNext = rows.length > limit;
    const list = hasNext ? rows.slice(0, limit) : rows;
    const nextCursor = hasNext ? list[list.length - 1].id : null;

    return res.status(200).json({ list, nextCursor });
  } catch (error) {
    console.error('error: ', error);
    next(error);
  }
});
