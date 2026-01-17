import { BadRequestException } from '#exceptions';

export const validateProduct = (req, res, next) => {
  const { name, price } = req.body;
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
