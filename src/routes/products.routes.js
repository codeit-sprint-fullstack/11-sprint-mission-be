import express from 'express';
import { prisma } from '#db/prisma.js';
import { tr } from 'zod/locales';

export const productsRouter = express.Router();

// POST /products - 상품 등록
productsRouter.post('/', async (req, res, next) => {
  try {
    const { name, description, price, tags } = req.body;

    if (!name || !description || !price || !tags) {
      return res.status(400).json({ message: 'Body 내용을 확인해주십시오.' });
    }

    const product = await prisma.product.create({
      data: { name, description, price, tags },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        tags: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return res.status(201).json(product);
  } catch (error) {
    console.error('error: ', error);
    next(error);
  }
});

//GET products/:id - 특정 상품 조회
productsRouter.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await prisma.product.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        tags: true,
        createdAt: true,
      },
    });

    if (!product) {
      return res
        .status(404)
        .json({ message: '요청한 게시물이 존재하지 않습니다.' });
    }

    return res.status(200).json(product);
  } catch (error) {
    next(error);
    console.error('error: ', error);
  }
});

//PATCH /products/:id - 게시물 수정
productsRouter.patch('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, price, tags } = req.body;

    if (
      name === undefined &&
      description === undefined &&
      price === undefined &&
      tags === undefined
    ) {
      return res.status(400).json({ message: '수정할 필드가 없습니다.' });
    }

    const exists = await prisma.product.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!exists) {
      return res
        .status(404)
        .json({ message: '요청한 게시물이 존재하지 않습니다.' });
    }

    const updated = await prisma.product.update({
      where: { id },
      data: {
        ...(name !== undefined ? { name } : {}),
        ...(description !== undefined ? { description } : {}),
        ...(price !== undefined ? { price } : {}),
        ...(tags !== undefined ? { tags } : {}),
      },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        tags: true,
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

//DELETE /products/:id - 게시글 삭제
productsRouter.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    const exists = await prisma.product.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!exists) {
      return res
        .status(404)
        .json({ message: '요청한 게시물이 존재하지 않습니다.' });
    }

    await prisma.product.delete({
      where: { id },
    });

    return res.status(204).send();
  } catch (error) {
    console.error('error: ', error);
    next(error);
  }
});

//GET /articles - 게시글 목록 조회
productsRouter.get('/', async (req, res, next) => {
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
      prisma.product.findMany({
        where,
        orderBy: order,
        skip: offset,
        take: limit,
        select: {
          id: true,
          name: true,
          description: true,
          price: true,
          tags: true,
          createdAt: true,
        },
      }),
      prisma.product.count({ where }),
    ]);

    return res.status(200).json({ list, totalCount });
  } catch (error) {
    console.error('error: ', error);
    next(error);
  }
});
