import { BadRequestError } from '../errors/errors.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const validateProduct = asyncHandler(async (req, res, next) => {
  const { name, description, price, tags } = req.body;

  // 상품명 검사
  if (!name || name.trim().length < 1 || name.trim().length > 10) {
    throw new BadRequestError('상품명은 1자 이상, 10자여야 합니다.');
  }

  // 상품 소개 검사
  if (
    !description ||
    description.trim().length < 10 ||
    description.trim().length > 100
  ) {
    throw new BadRequestError('상품 소개는 10자 이상, 100자여야 합니다.');
  }

  // 판매 가격 검사
  if (price == null || isNaN(price) || Number(price) < 0) {
    throw new BadRequestError('올바른 판매 가격을 입력해주세요.');
  }

  //태그 검사
  if (tags && Array.isArray(tags)) {
    if (!tags.every((tag) => tag.trim().length <= 5)) {
      throw new BadRequestError('태그는 5글자 이내여야 합니다.');
    }
  }

  next();
});
