import { string } from 'zod';
import { BadRequestException } from '../errors/BadRequestException.js';

export const validateProduct = (req, res, next) => {
  try {
    const { name, price, description, tags } = req.body;

    if (name !== undefined)
      if (typeof name !== 'string' || name.trim().length < 1) {
        throw new BadRequestException('상품명은 1글자 이상이어야 합니다');
      }

    if (price !== undefined)
      if (typeof price !== 'number' || price < 0) {
        throw new BadRequestException('가격은 0 이상의 숫자여야 합니다');
      }

    if (description !== undefined && typeof description !== 'string') {
      throw new BadRequestException(
        '상품 설명은 글자 형태로 입력해 주세요. (숫자만 입력할 수 없습니다)',
      );
    }

    if (tags !== undefined) {
      if (!Array.isArray(tags)) {
        throw new BadRequestException(
          '태그는 ["노트북", "전자제품"] 처럼 입력해 주세요.',
        );
      }
    }

    delete req.body._id;
    delete req.body.id;
    delete req.body.createdAt;
    delete req.body.updatedAt;

    next();
  } catch (error) {
    next(error);
  }
};
