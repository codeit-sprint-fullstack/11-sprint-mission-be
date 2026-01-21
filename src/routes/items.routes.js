import express from 'express';
import { HTTP_STATUS } from '../constants/httpStatus.js';
import { Item } from '../models/item.model.js';
import { NotFoundException } from '#exceptions';
import { validate } from '#middlewares';
import {
  createitemSchema,
  idParamSchema,
  updateitemSchema,
} from './item.schema.js';
import { ERROR_MESSAGE } from '#constants';

export const itemsRouter = express.Router();

//GET 상품 목록 조회  (페이지네이션, 정렬,)
itemsRouter.get('/', async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const offset = (page - 1) * pageSize;
    const keyword = req.query.keyword || '';
    const orderby = req.query.orderby || 'recent';

    const query = keyword
      ? {
          $or: [
            { name: { $regex: keyword } },
            { description: { $regex: keyword } },
          ],
        }
      : {};

    const sortOption = orderby === 'recent' ? { createdAt: -1 } : {};

    const items = await Item.find(query)
      .sort(sortOption)
      .skip(offset)
      .limit(pageSize)
      .select('name price createdAt');

    const total = await Item.countDocuments(query);

    res.status(HTTP_STATUS.OK).json({
      list: items,
      totalCount: total,
    });
  } catch (error) {
    next(error);
  }
});

//GET 상품 상세 조회
itemsRouter.get(
  '/:id',
  validate('params', idParamSchema),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const item = await Item.findById(id);

      if (!item) {
        throw new NotFoundException(ERROR_MESSAGE.ITEM_NOT_FOUND);
      }

      res.status(HTTP_STATUS.OK).json(item);
    } catch (error) {
      next(error);
    }
  },
);

//POST 상품 등록
itemsRouter.post(
  '/',
  validate('body', createitemSchema),
  async (req, res, next) => {
    try {
      const { name, description, price, tags } = req.body;
      const newItem = await Item.create({
        name,
        description,
        price,
        tags,
      });
      res.status(HTTP_STATUS.CREATED).json(newItem);
    } catch (error) {
      next(error);
    }
  },
);

//PATCH 상품 수정
itemsRouter.patch(
  '/:id',
  validate('params', idParamSchema),
  validate('body', updateitemSchema),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, description, price, tags } = req.body;

      const existingItem = await Item.findById(id);
      if (!existingItem) {
        throw new NotFoundException(ERROR_MESSAGE.ITEM_NOT_FOUND);
      }

      const updatedItem = await Item.findByIdAndUpdate(
        id,
        { name, description, price, tags },
        { new: true },
      );
      res.status(HTTP_STATUS.OK).json(updatedItem);
    } catch (error) {
      next(error);
    }
  },
);

//DELETE 상품 삭제
itemsRouter.delete(
  '/:id',
  validate('params', idParamSchema),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const existingProduct = await Item.findById(id);
      if (!existingProduct) {
        throw new NotFoundException(ERROR_MESSAGE.ITEM_NOT_FOUND);
      }

      await Item.findByIdAndDelete(id);
      res.sendStatus(HTTP_STATUS.NO_CONTENT);
    } catch (error) {
      next(error);
    }
  },
);
