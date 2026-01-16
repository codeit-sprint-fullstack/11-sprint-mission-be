import express from 'express';
import { Product } from '../models/product.model.js';
import { BadRequestException } from '../errors/badRequestException.js';
import { NotFoundException } from '../errors/notFoundException.js';

export const productsRouter = express.Router();

// GET - /products - 모든 상품 불러오기
// 이 함수 도저히 모르겠어서 gpt한테 써달라고 했는데 동작 원리가 이해가 안가요...
// 프론트엔드에서 이미 페이지네이션을 구현했는데 여기서 따로 하는 이유가 있나요?
productsRouter.get('/', async (req, res, next) => {
  try {
    const page = Number(req.query.page ?? 1);
    const pageSize = Number(req.query.pageSize ?? 10);
    const keyword = String(req.query.keyword ?? '');
    const orderBy = String(req.query.orderBy ?? 'recent');

    const filter = keyword // 키워드가 있으면 이름이 키워드거나 설명이 키워드인지를 확인한다...?
      ? {
          // 이건 Prisma transaction에서 나오는 OR 연산자와 같은 역할을 한다고 이해하면 될까요?
          $or: [
            { name: { $regex: keyword, $options: 'i' } },
            { description: { $regex: keyword, $options: 'i' } },
          ],
        }
      : {};

    // sort 부분에서 recent 일 때 createdAt을 왜 -1로 주는지, 아닐 때는 뭘 줘야 하는지 궁금합니다
    const sort = orderBy === 'recent' ? { createdAt: -1 } : { createdAt: -1 };
    const skip = (page - 1) * pageSize; // 몇개 스킵할지 계산하는 공식이라고 오늘 (1/15) 배웠습니다

    const [docs, totalCount] = await Promise.all([
      // 이 부분도 transaction 배우면서 배웠습니다
      Product.find(filter).sort(sort).skip(skip).limit(pageSize),
      Product.countDocuments(filter),
    ]);

    res.json({
      list: docs.map((p) => ({
        id: p.id,
        name: p.name,
        price: p.price,
        createdAt: p.createdAt,
      })),
      totalCount,
    });
  } catch (e) {
    console.error('error: ', e);
    next(e);
  }
});

// 여기부터는 특별한 에러가 발생하지 않는 한 최대한 GPT 보지 않고 수업 자료 찾아보며 작성했습니다.

// POST /products - 상품 생성하기
productsRouter.post('/', async (req, res, next) => {
  try {
    const { name, description, price, tags } = req.body;

    if (!name || !description || price === undefined || tags === undefined) {
      throw new BadRequestException('필드 입력이 잘못되었습니다.');
    }

    const product = await Product.create({
      name,
      description,
      price,
      tags,
    });

    res.status(201).json({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      tags: product.tags,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    });
  } catch (e) {
    console.error('error: ', e);
    next(e);
  }
});

//GET /products/:productId - 특정 상품 조회 (id)
productsRouter.get('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.productId);

    if (!product) {
      throw new NotFoundException('상품을 찾을 수 없습니다.');
    }

    res.status(200).json({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      tags: product.tags,
      createdAt: product.createdAt,
    });
  } catch (e) {
    console.error('error: ', e);
    next(e);
  }
});

// PATCH /products/:productId - 특정 상품 수정 (id)
productsRouter.patch('/:productId', async (req, res, next) => {
  try {
    const { name, description, price, tags } = req.body;

    if (
      name === undefined &&
      description === undefined &&
      price === undefined &&
      tags === undefined
    ) {
      throw new BadRequestException('수정할 필드가 없습니다.');
    }

    const product = await Product.findByIdAndUpdate(
      req.params.productId,
      req.body,
      { new: true }
    );

    if (!product) {
      throw new NotFoundException('요청한 상품을 찾을 수 없습니다.');
    }

    res.status(200).json({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      tags: product.tags,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    });
  } catch (e) {
    console.error('error: ', e);
    next(e);
  }
});

// DELETE /products/:productId - 특정 상품 삭제 (id)
productsRouter.delete('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.productId);

    if (!product) {
      throw new NotFoundException('요청한 상품을 찾을 수 없습니다.');
    }

    res.status(200).json({ success: true });
  } catch (e) {
    console.error('error: ', e);
    next(e);
  }
});
