import { BadRequestException } from '#exceptions';

export const validateProductPost = (req, res, next) => {
  const { name, price } = req.body;
  if (!name || price === undefined) {
    throw new BadRequestException('상품 이름과 가격은 필수입니다.');
  }
  if (typeof name !== 'string') {
    throw new BadRequestException('상품 이름은 문자열이어야 합니다.');
  }
  if (typeof price !== 'number' || Number.isNaN(price)) {
    throw new BadRequestException('가격은 숫자여야 합니다.');
  }
  if (price < 0) {
    throw new BadRequestException('가격은 0 이상이어야 합니다.');
  }
  next();
};

export const validateProductPatch = (req, res, next) => {
  const { name, price } = req.body;

  if (name !== undefined && typeof name !== 'string') {
    throw new BadRequestException('상품 이름은 문자열이어야 합니다.');
  }
  if (price !== undefined) {
    if (typeof price !== 'number' || Number.isNaN(price)) {
      throw new BadRequestException('가격은 숫자여야 합니다.');
    }
    if (price < 0) {
      throw new BadRequestException('가격은 0 이상이어야 합니다.');
    }
  }
  next();
};
