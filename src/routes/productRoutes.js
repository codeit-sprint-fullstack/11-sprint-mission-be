import express from 'express';
import { NotFoundException } from '../errors/notFoundException.js';
import { BadRequestException } from '../errors/badRequestException.js';
import { Product } from '../models/product.js';

export const productRouter = express.Router();

//상품 목록 조회
productRouter.get('/', async (req, res, next) => {
  try {
    const offset = parseInt(req.query.offset, 10) || 0;
    const limit = parseInt(req.query.limit, 10) || 0;
    const { name, description } = req.query;
    const filter = {};

    //포함된....뭘까요...어떻게 해야할까요 ..ㅠㅠㅠ
    if (name) {
      filter.name = name
    }

    if (description) {
      filter.description =description
    }
  
    const items = await Product.find()
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit)


    
    res.json({
      success: true,
      data: items,
    });
  } catch (error) {
    next(error);
  }
});

//상품 상세 조회
productRouter.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const item = await Product.findById(id);

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
productRouter.post('/', async (req, res, next) => {
  try {
    const { name, description, price, tags } = req.body;

    if (!name || !price) {
      throw new BadRequestException('이름과 가격은 필수 입니다.');
    }

    const newItem = await Product.create({
      name,
      price,
      description,
      tags,
    });

    res.status(201).json({
      success: true,
      data: newItem,
      message: '상품 등록 완료',
    });
  } catch (error) {
    next(error);
  }
});

//상품 수정
productRouter.patch('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const item = await Product.findById(id);

    const { name, description, price, tags } = req.body;

    if (item === null) {
      throw new NotFoundException('상품을 찾을 수 없습니다.');
    }

    const updateItem = {
      name,
      description,
      price,
      tags,
    };

    const updatedItem = await Product.findByIdAndUpdate(id, updateItem);

    res.json({
      success: true,
      data: updatedItem,
      message: '상품 수정 완료',
    });
  } catch (error) {
    next(error);
  }
});

//상품삭제
productRouter.delete('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const item = await Product.findByIdAndDelete(id);

    if (item === null) {
      throw new NotFoundException('상품을 찾을 수 없습니다.');
    }

    res.json({
      success: true,
      message: '상품 삭제 완료',
    });
  } catch (error) {
    next(error);
  }
});
