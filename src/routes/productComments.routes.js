import express from 'express';
import { prisma } from '#db/prisma.js';

export const productCommentsRouter = express.Router({ mergeParams: true });

//POST /products/:productId/comments - 중고마켓 댓글 작성
productCommentsRouter.post('/', async (req, res, next) => {
  try {
    const { productId } = req.params;
    const { content } = req.body;

    const product = await prisma.product.findUnique({
      where: { id: productId },
      select: { id: true },
    });

    if (!content) {
      return res.status(400).json({ message: 'content가 없습니다. ' });
    }
    if (!product) {
      return res
        .status(404)
        .json({ message: '요청한 게시물이 존재하지 않습니다.' });
    }

    const comment = await prisma.comment.create({
      data: { content, productId },
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

//GET /products/:productId/comments?cursor=...&limit=20
// 중고마켓 댓글 목록 조회 (cursor pagination)
productCommentsRouter.get('/', async (req, res, next) => {
  try {
    const { productId } = req.params;
    const limit = Number(req.query.limit ?? 10);
    const cursor = req.query.cursor ? String(req.query.cursor) : null;

    const product = await prisma.product.findUnique({
      where: { id: productId },
      select: { id: true },
    });
    if (!product) {
      return res.status(404).json({ message: '상품을 찾을 수 없습니다.' });
    }

    const findArgs = {
      where: { productId },
      orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
      take: limit + 1,
      select: { id: true, content: true, createdAt: true },
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
  } catch (e) {
    console.error('error: ', error);
    next(error);
  }
});
