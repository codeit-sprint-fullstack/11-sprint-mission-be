import express from 'express';
import { NotFoundException } from '../errors/notFoundException.js';
import { BadRequestException } from '../errors/badRequestException.js';
import { Product } from '../models/product.js';

export const itemRouter = express.Router();

//상품 목록 조회
itemRouter.get('/', async (req, res, next) => {
  try {
    const items = await Product.find();

    res.json({
      success: true,
      data: items,
    });
  } catch (error) {
    next(error);
  }
});

//상품 상세 조회
itemRouter.get('/:id', async (req, res, next) => {
  try {
    const id = await Product.findById(req.params.id);
    const item = Product.find((i) => i.id === id);

    if (!item) {
      throw new NotFoundException('상품을 찾을 수 없습니다.');
    }

    res.status(200).json({
      success: true,
      data: item,
      message: '짜잔',
    });
  } catch (error) {
    next(error);
  }
});

//상품등록
itemRouter.post('/', (req, res, next) => {
  try {
    const { name, description, price, tags } = req.body;

    if (!name || !price) {
      throw new BadRequestException('이름과 가격은 필수 입니다.');
    }

    const newItem = {
      id: nextId++,
      name,
      price,
      description,
      tags,
    };

    items.push(newItem);

    res.status(201).json({
      seccess: true,
      data: newItem,
      message: '상품 등록 완료',
    });
  } catch (error) {
    next(error);
  }
});

//상품 수정
itemRouter.patch('/:id', (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const { name, description, price, tags } = req.body;

    const itemIndex = Product.findIndex((i) => i.id === id);

    if (itemIndex === -1) {
      throw new NotFoundException('상품을 찾을 수 없습니다.');
    }

    items[itemIndex] = {
      ...items[itemIndex],
      ...(name !== undefined ? { name } : {}),
      ...(price !== undefined ? { price } : {}),
      description,
      tags,
    };

    res.json({
      success: true,
      data: items[itemIndex],
      message: '상품 수정 완료',
    });
  } catch (error) {
    next(error);
  }
});

//상품삭제
itemRouter.delete('/:id', (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const itemIndex = Product.findIndex((i) => i.id === id);

    if (itemIndex === -1) {
      throw new NotFoundException('상품을 찾을 수 없습니다.');
    }

    items.splice(itemIndex, 1);

    res.json({
      success: true,
      message: '상품 삭제 완료',
    });
  } catch (error) {
    next(error);
  }
});
