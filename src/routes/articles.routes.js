import express from 'express';
import { prisma } from '#db/prisma.js';

export const articlesRouter = express.Router();

// POST /articles - 게시글 등록
articlesRouter.post('/', async (req, res, next) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res
        .status(400)
        .json({ message: 'title 혹은 content가 없습니다.' });
    }

    const article = await prisma.article.create({
      data: { title, content },
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return res.status(201).json(article);
  } catch (error) {
    console.error('error: ', error);
    next(error);
  }
});

// GET articles/:id - 게시글 조회
articlesRouter.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    const article = await prisma.article.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
      },
    });

    if (!article) {
      return res
        .status(404)
        .json({ message: '요청한 게시물이 존재하지 않습니다.' });
    }

    return res.status(200).json(article);
  } catch (error) {
    console.error('error: ', error);
    next(error);
  }
});

// PATCH /articles/:id - 게시글 수정
articlesRouter.patch('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    if (title === undefined && content === undefined) {
      return res.status(400).json({ message: '수정할 필드가 없습니다.' });
    }

    const exists = await prisma.article.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!exists) {
      return res
        .status(404)
        .json({ message: '요청한 게시물이 존재하지 않습니다.' });
    }

    const updated = await prisma.article.update({
      where: { id },
      data: {
        ...(title !== undefined ? { title } : {}),
        ...(content !== undefined ? { content } : {}),
      },
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return res.status(200).json(updated);
  } catch (error) {
    console.error('error: ', error);
    next(error);
  }
});

//DELETE /articles/:id - 게시글 삭제
articlesRouter.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    const exists = await prisma.article.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!exists) {
      return res
        .status(404)
        .json({ message: '요청한 게시물이 존재하지 않습니다.' });
    }

    await prisma.article.delete({ where: { id } });
    return res.status(204).send();
  } catch (error) {
    console.error('error: ', error);
    next(error);
  }
});

//GET /articles - 게시글 목록 조회
articlesRouter.get('/', async (req, res, next) => {
  try {
    const offset = Number(req.query.offset ?? 0);
    const limit = Number(req.query.limit ?? 10);
    const keyword = String(req.query.keyword ?? '');
    const orderBy = String(req.query.orderBy ?? 'recent');

    const where = keyword
      ? {
          OR: [
            { title: { contains: keyword, mode: 'insensitive' } },
            { content: { contains: keyword, mode: 'insensitive' } },
          ],
        }
      : {};
    const order =
      orderBy === 'recent' ? { createdAt: 'desc' } : { createdAt: 'desc' };

    const [list, totalCount] = await Promise.all([
      prisma.article.findMany({
        where,
        orderBy: order,
        skip: offset,
        take: limit,
        select: {
          id: true,
          title: true,
          content: true,
          createdAt: true,
        },
      }),
      prisma.article.count({ where }),
    ]);

    return res.status(200).json({ list, totalCount });
  } catch (error) {
    console.error('error: ', error);
    next(error);
  }
});
