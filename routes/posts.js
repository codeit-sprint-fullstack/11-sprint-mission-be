import express from 'express';
import { NotFoundException } from '../errors/notFoundException';

export const postRouter = express.Router();

const items = [
  { id: 1, name: '핸드폰', price: 500000 },
  { id: 2, name: '카메라', price: 1000000 },
  { id: 3, name: '노트북', price: 3000000 },
  { id: 4, name: '에어컨', price: 1100000 },
  { id: 5, name: '세탁기', price: 1000000 },
];
let nextId = 5;

//상품 상세 조회
postRouter.get('/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const item = items.find((i) => i.id === id);

    if (!item) {
      throw new NotFoundException('상품을 찾을 수 없습니다.');
    }
  } catch (error) {
    next(error);
  }
});

//상품 목록 조회
postRouter.get('/', (req, res, next) => {
  try {
    res.json({
      success: true,
      data: items,
    });
  } catch (error) {
    next(error);
  }
});

//상품등록
postRouter.post('/', (req, res, next) => {
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
postRouter.patch('/:id', (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const { name, description, price, tags } = req.body;

    const itemIndex = items.findIndex((i) => i.id === id);

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
postRouter.delete('/:id', (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const itemIndex = items.findIndex((i) => i.id === id);

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
